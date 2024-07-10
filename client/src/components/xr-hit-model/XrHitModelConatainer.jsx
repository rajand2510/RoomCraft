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


import React, { useRef, useState, useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "@react-three/drei";
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
  const reticleRef = useRef();
  const [models, setModels] = useState([]);
  const [scale, setScale] = useState(new THREE.Vector3(1, 1, 1));
  const { isPresenting } = useXR();

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  });

  useHitTest((hitMatrix) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );
    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  });

  const placeModel = (e) => {
    const position = reticleRef.current.position.clone();
    const id = Date.now();
    setModels([{ position, id }]);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        (touch1.clientX - touch2.clientX) ** 2 +
        (touch1.clientY - touch2.clientY) ** 2
      );

      if (!handleTouchMove.prevDistance) {
        handleTouchMove.prevDistance = distance;
      }

      const scaleFactor = distance / handleTouchMove.prevDistance;
      setScale((prevScale) => prevScale.multiplyScalar(scaleFactor));
      handleTouchMove.prevDistance = distance;
    }
  };

  const handleTouchEnd = () => {
    handleTouchMove.prevDistance = null;
  };

  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <>
      <OrbitControls />
      <ambientLight />
      {isPresenting &&
        models.map(({ position, id }) => (
          <Model key={id} gltfPath={gltfPath} position={position} scale={scale} />
        ))}
      {isPresenting && (
        <Interactive onSelect={placeModel}>
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}
      {!isPresenting && <Model gltfPath={gltfPath} scale={scale} />}
    </>
  );
};

const XrHitModelContainer = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const gltfPath = params.get('gltfPath') || './models/default.gltf';

  return (
    <>
      <ARButton sessionInit={{ requiredFeatures: ["hit-test"] }} />
      <Canvas>
        <XR>
          <XrHitModel gltfPath={gltfPath} />
        </XR>
      </Canvas>
    </>
  );
};

export default XrHitModelContainer;
