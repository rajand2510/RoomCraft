import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Link } from 'react-router-dom';

const ProductCard = ({ gltfPath, title, price, positionY, initialScale }) => {
  const controlsRef = useRef();
  const [model, setModel] = useState(null);
  const [loadModelError, setLoadModelError] = useState(null);

  useEffect(() => {
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
    <div className="flex flex-col px-5 pt-5 pb-5 mx-[15px] my-[20px] bg-white shadow-2xl max-w-[380px] max-h-[480px] rounded-[25px]">
    <div className="shrink-0 rounded-[20px] bg-zinc-300 h-[282px]">
      <Canvas
        className="product-canvas rounded-[15px]"
        camera={{ position: [0, 0, 5] }}
        gl={{ alpha: true }}
        style={{ background: 'linear-gradient(to bottom, #cfd9df, #e2ebf0)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
  
        {/* Controls */}
        <OrbitControls ref={controlsRef} />
  
        {/* Model */}
        {model && <primitive object={model} />}
      </Canvas>
    </div>
  
    <div className="flex gap-0.5 items-start mt-10">
      <div className="flex flex-col grow self-start w-fit">
        <h2 className="text-base text-black">{title}</h2>
        <div className="flex gap-8 mt-7 font-bold">
          <p className="my-auto text-xl text-black">Rs.{price}</p>
          <button
            className="flex gap-1.0 px-2.5 py-1.5 text-sm text-white rounded-xl bg-neutral-700 hover:bg-neutral-800"
            style={{ minWidth: '100px' }} // Adjust the minimum width as needed
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/20da946bd58526d190052f874a3f98dcc8106b31f9cfef97cd2fdf5721a63f2b?apiKey=980db322e33a4a39a5052caa449e1da6&"
              alt=""
              className="shrink-0 aspect-[0.79] w-[15px]"
            />
            <span className="flex-auto my-auto">ADD TO CART</span>
          </button>
        </div>
      </div>
      <div className="self-end mt-11">
        <Link to={`/xr?gltfPath=${gltfPath}`}>
          <button className="flex justify-center items-center px-0.5 rounded-full bg-zinc-300 h-[35px] w-[35px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c3953c11395d39a267a119923443e4f991c370c2e178305152ef11e99f79d659?apiKey=980db322e33a4a39a5052caa449e1da6&"
              alt="AR View"
              className="aspect-square w-[31px]"
            />
          </button>
        </Link>
      </div>
    </div>
  </div>
  
  );
};

const ProductList = () => {
 
  const productData = [
    {
      id: 1,
      title: "Bharat Sales Vinyl Adjustable Height Control Chair",
      price: "29.99",
      gltfPath: "/models/indoor_plant/scene.gltf",
      initialScale: 4,
      positionY: -2.5,
    },
    {
      id: 2,
      title: "Outdoor Chair",
      price: "49.99",
      gltfPath: "/models/indoor_plant/scene.gltf",
      initialScale: 4,
      positionY: -2.5,
    },
    {
      id: 3,
      title: "Smartphone",
      price: "799.99",
      gltfPath: "/models/indoor_plant/scene.gltf",
      initialScale: 4,
      positionY: -2.5,
    },
    {
      id: 4,
      title: "Indoor Plant",
      price: "29.99",
      gltfPath: "/models/indoor_plant/scene.gltf",
      initialScale: 4,
      positionY: -2.5,
    },
    {
      id: 5,
      title: "Outdoor Chair",
      price: "49.99",
      gltfPath: "/models/indoor_plant/scene.gltf",
      initialScale: 4,
      positionY: -2.5,
    },
    {
      id: 6,
      title: "Smartphone",
      price: "799.99",
      gltfPath: "/models/indoor_plant/scene.gltf",
      initialScale: 4,
      positionY: -2.5,
    },
    {
      id: 7,
      title: "Outdoor Chair",
      price: "49.99",
      gltfPath: "/models/indoor_plant/scene.gltf",
      initialScale: 4,
      positionY: -2.5,
    },
    {
      id: 8,
      title: "Smartphone",
      price: "79999",
      gltfPath: "/models/indoor_plant/scene.gltf",
      initialScale: 4,
      positionY: -2.5,
    },
  ];
  
  const [priceFilter, setPriceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const isMobile = useMediaQuery({query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 769px) and (max-width: 1024px)" });

  let gridCols = "grid-cols-4";
  if (isMobile) {
    gridCols = "grid-cols-1";
  } else if (isTablet) {
    gridCols = "grid-cols-2";
  }

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <p className="text-[40px] font-bold text-green-950">Our Products</p>
      </div>
      <div className="flex flex-col mt-[20px] md:flex-row justify-between items-center mb-5 px-5 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-10 py-2 w-full   text-black bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-950"
        />
        <button className="px-4 py-2 w-full  md:w-auto text-white bg-green-900 rounded-lg hover:bg-green-800">
          Search
        </button>
        <select
          className="px-4 py-2 w-full md:w-auto text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-950"
          value={priceFilter}
          onChange={handlePriceFilterChange}
        >
          <option value="">Filter by Price</option>
          <option value="less_than_1000">Less than 1000</option>
          <option value="1000_5000">1000 - 5000</option>
          <option value="5000_10000">5000 - 10000</option>
          <option value="more_than_10000">More than 10000</option>
        </select>
      </div>

      <div className={`grid ${gridCols} gap-y-5`}>
        {productData.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            price={product.price}
            gltfPath={product.gltfPath}
            initialScale={product.initialScale}
            positionY={product.positionY}
          />
        ))}
      </div>

    </div>
  );
};

export default ProductList;