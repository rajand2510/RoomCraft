import { Canvas } from "@react-three/fiber"
import XeHitCube from "./XrHitCube"
import { ARButton, XR } from "@react-three/xr"


const XrHitCubeConatainer = () => {
  return (
    <>
    <ARButton sessionInit={{
      requiredFeatures:["hit-test"]
    }}/>
    <Canvas>
       <XR>
       <XeHitCube/>
       </XR>
    </Canvas>
    </>
   
  )
}

export default XrHitCubeConatainer