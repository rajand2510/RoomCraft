import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const Model = ({position}) => {
  const gltf = useLoader(GLTFLoader, '/models/indoor_plant/scene.gltf')
  return <primitive position={position} object={gltf.scene} />
}

export default Model