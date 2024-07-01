import { Canvas } from "@react-three/fiber"
import XrCube from "./xrCube"
import { ARButton, XR } from "@react-three/xr"


const XrCubeConatainer = () => {
  return (
    <>
    <ARButton/>
    <Canvas>
       <XR>
       <XrCube/>
       </XR>
    </Canvas>
    </>
   
  )
}

export default XrCubeConatainer