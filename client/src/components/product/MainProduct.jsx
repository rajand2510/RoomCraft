import { useState, useEffect, useRef } from "react";
import Footer from "../homecontainer/Footer";
import Navbar from "../homecontainer/Navbar";
import { useMediaQuery } from "react-responsive";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const ProductCard = ({ gltfPath, positionY, initialScale }) => {
  const controlsRef = useRef();
  const [model, setModel] = useState(null);
  const [loadModelError, setLoadModelError] = useState(null);

  useEffect(() => {
    if (!gltfPath) {
      console.error('No GLTF path provided');
      setLoadModelError(new Error('No GLTF path provided'));
      return;
    }

    console.log('GLTF Path:', gltfPath);
    const loader = new GLTFLoader();
    loader.load(gltfPath, (gltf) => {
      console.log('Model loaded:', gltf);
      const scene = gltf.scene;
      scene.scale.set(initialScale, initialScale, initialScale);
      scene.position.y = positionY;
      setModel(scene);
    }, (xhr) => {
      console.log('Model loading progress:', xhr.loaded, xhr.total);
    }, (error) => {
      console.error('Error loading model:', error);
      setLoadModelError(error);
    });
  }, [gltfPath, initialScale, positionY]);

  if (loadModelError) {
    return <div>Error loading model: {loadModelError.message}</div>;
  }

  return (
    <div className="flex flex-col mx-[15px] my-[20px] bg-white shadow-lg max-w-[380px] max-h-[480px] rounded-[25px]">
      <div className="shrink-0 rounded-[20px] bg-zinc-300 h-[320px]">
        <Canvas
          className="product-canvas rounded-[15px]"
          camera={{ position: [0, 0, 5] }}
          gl={{ alpha: true }}
          style={{ background: 'linear-gradient(to bottom, #cfd9df, #e2ebf0)' }}
        >
          <ambientLight intensity={0.5} color="#ffffff" />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <OrbitControls ref={controlsRef} />
          {model && <primitive object={model} />}
        </Canvas>
      </div>
    </div>
  );
};

const AddToCartButton = () => {
  return (
    <button className="flex gap-1 px-5 w-2/12 py-1.5 mt-7 text-base font-bold text-justify text-white bg-black rounded-3xl">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e55fa33744fd7794ef2a1b0f03402a432c0dd4869c54a3a6f18449249ad8afe?apiKey=980db322e33a4a39a5052caa449e1da6&"
        alt=""
        className="shrink-0 w-6 aspect-square"
      />
    </button>
  );
};

const ProductDetails = ({ title, discription, price, gltfPath }) => {
  return (
    <section className="flex flex-col self-stretch mt-4 my-auto">
      <h1 className="text-3xl font-medium text-justify text-black">{title}</h1>
      <p className="mt-3 text-lg text-black">{discription}</p>
      <p className="mt-4 text-3xl font-bold text-justify text-black">{price}</p>
      <AddToCartButton />
      
      <div className="">
        <Link to={`/xr?gltfPath=${gltfPath}`}>
          <button className="flex justify-center items-center px-2.5 mt-5 rounded-full bg-zinc-300 h-[60px] w-[60px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/76818322c020459bceba6ecfcc5cbe9a4fb051cb7292cb581d6abfdba2ec72cd?apiKey=980db322e33a4a39a5052caa449e1da6&"
              alt=""
              className="w-full aspect-square"
            />
          </button>
        </Link>
      </div>
    </section>
  );
};

const MainProduct = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const gltfPath = params.get('gltfPath');
  const title = params.get('title');
  const discription = params.get('discription');
  const price = params.get('price');
  const positionY = params.get('positionY');
  const initialScale = params.get('initialScale');
  
 console.log(discription);


  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    console.log('Params:', params);
    console.log('discription'),discription;
  }, [params]);

  return (
    <>
      <Navbar />
      <div
        className={`px-4 py-8 mt-28 mb-20 bg-white rounded-3xl shadow-xl ${
          isMobile ? "max-w-full" : "max-w-[898px] mx-auto"
        }`}
      >
        <div className={`flex gap-5 ${isMobile ? "flex-col" : "flex-row"}`}>
          <div className={`flex flex-col w-full ${isMobile ? "mb-5" : "w-1/2"}`}>
            <ProductCard
              gltfPath={gltfPath}
              positionY={positionY}
              initialScale={initialScale}
            />
          </div>
          <div className={`flex flex-col w-full ${isMobile ? "" : "w-1/2"}`}>
            <ProductDetails
              title={title}
              discription={discription}
              price={price}
              gltfPath={gltfPath}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainProduct;
