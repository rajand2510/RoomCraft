
import { OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import { useHitTest } from "@react-three/xr";
import { Interactive } from "@react-three/xr";
import { useState } from "react";
import { useXR } from "@react-three/xr";
import Cube from "./Cube";
import { useThree } from "@react-three/fiber";
const XeHitCube = () => {

    const reticleRef=useRef();
    const [cubes, setCubes ]= useState([]);
    const { isPresenting }=useXR();

    useThree(({camera}) => {
        if(!isPresenting){
                camera.position.z = 3;
        }
    })
    useHitTest((hitMatrix) => {
        // use hitMatrix to position any object on the real life surface
        hitMatrix.decompose(reticleRef.current.position, reticleRef.current.quaternion, reticleRef.current.scale);
        reticleRef.current.rotation.set(-Math.PI/2,0,0);
      })

      const placecube = (e) => {
        let position = e.intersection.object.position.clone();
        let id= Date.now();
        setCubes([...cubes,{position,id}])
      };

  return (
  <>
    <OrbitControls />
    <ambientLight />
    {isPresenting && cubes.map(({position,id}) =>{
        return <Cube key={id} position={position}/>
    })}
   
   {isPresenting && ( <Interactive onSelect={placecube}>
    <mesh ref={reticleRef}rotation-x={-Math.PI/2}>
        <ringGeometry args={[0.1,0.25,32]}/>
        <meshStandardMaterial color={"white"}/>
    </mesh>
    </Interactive>
   )}

   {!isPresenting && <Cube />}
  </>
  )
}

export default XeHitCube