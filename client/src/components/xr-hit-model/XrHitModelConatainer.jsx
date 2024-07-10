// import React, { useRef, useState } from 'react';
// import { useLoader } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from "@react-three/drei";
// import { useThree } from "@react-three/fiber";
// import { Interactive, useHitTest, useXR } from "@react-three/xr";
// import { Canvas } from "@react-three/fiber";
// import { ARButton, XR } from "@react-three/xr";
// import { useLocation } from 'react-router-dom';

// const Model = ({ gltfPath, position }) => {
//   const gltf = useLoader(GLTFLoader, gltfPath);
//   return <primitive position={position} object={gltf.scene} />;
// };

// const XrHitModel = ({ gltfPath }) => {
//   const reticleRef = useRef();
//   const [models, setModels] = useState([]);

//   const { isPresenting } = useXR();

//   useThree(({ camera }) => {
//     if (!isPresenting) {
//       camera.position.z = 3;
//     }
//   });

//   useHitTest((hitMatrix, hit) => {
//     hitMatrix.decompose(
//       reticleRef.current.position,
//       reticleRef.current.quaternion,
//       reticleRef.current.scale
//     );

//     reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
//   });

//   const placeModel = (e) => {
//     let position = e.intersection.object.position.clone();
//     let id = Date.now();
//     setModels([{ position, id }]);
//   };

//   return (
//     <>
//       <OrbitControls />
//       <ambientLight />
//       {isPresenting &&
//         models.map(({ position, id }) => {
//           return <Model key={id} gltfPath={gltfPath} position={position} />;
//         })}
//       {isPresenting && (
//         <Interactive onSelect={placeModel}>
//           <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
//             <ringGeometry args={[0.1, 0.25, 32]} />
//             <meshStandardMaterial color={"white"} />
//           </mesh>
//         </Interactive>
//       )}

//       {!isPresenting && <Model gltfPath={gltfPath} />}
//     </>
//   );
// };

// const XrHitModelContainer = () => {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const gltfPath = params.get('gltfPath') || './models/default.gltf';

//   return (
//     <>
//       <ARButton sessionInit={{
//         requiredFeatures: ["hit-test"]
//       }} />
//       <Canvas>
//         <XR>
//           <XrHitModel gltfPath={gltfPath} />
//         </XR>
//       </Canvas>
//     </>
//   );
// };

// export default XrHitModelContainer;

import React, { useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

const Model = ({ gltfPath, position, scale }) => {
  const gltf = useLoader(GLTFLoader, gltfPath);
  return <primitive position={position} scale={scale} object={gltf.scene} />;
};

const XrHitModel = ({ gltfPath }) => {
  const reticleRef = useRef(null);
  const canvasRef = useRef(null);
  const [models, setModels] = useState([]);
  const [scale, setScale] = useState(new THREE.Vector3(1, 1, 1));
  const { isPresenting } = useXR();

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  });

  useHitTest((hitMatrix, hit) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );

    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  });

  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    let id = Date.now();
    setModels([{ position, id }]);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      handlePinch.startDistance = Math.sqrt(
        (e.touches[0].clientX - e.touches[1].clientX) ** 2 +
        (e.touches[0].clientY - e.touches[1].clientY) ** 2
      );
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const distance = Math.sqrt(
        (e.touches[0].clientX - e.touches[1].clientX) ** 2 +
        (e.touches[0].clientY - e.touches[1].clientY) ** 2
      );

      const scaleFactor = distance / handlePinch.startDistance;
      setScale((prevScale) => prevScale.multiplyScalar(scaleFactor));

      handlePinch.startDistance = distance;
    }
  };

  return (
    <>
      <OrbitControls />
      <ambientLight />
      {isPresenting &&
        models.map(({ position, id }) => {
          return <Model key={id} gltfPath={gltfPath} position={position} scale={scale} />;
        })}
      {isPresenting && (
        <Interactive onSelect={placeModel}>
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}

      {!isPresenting && <Model gltfPath={gltfPath} scale={scale} />}

      <canvas ref={canvasRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} />
    </>
  );
};

const XrHitModelContainer = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const gltfPath = params.get('gltfPath') || './models/default.gltf';

  return (
    <>
      <ARButton sessionInit={{
        requiredFeatures: ["hit-test"]
      }} />
      <Canvas>
        <XR>
          <XrHitModel gltfPath={gltfPath} />
        </XR>
      </Canvas>
    </>
  );
};

export default XrHitModelContainer;