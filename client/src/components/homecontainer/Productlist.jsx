  import { useState, useEffect, useRef } from "react";
  import { useMediaQuery } from "react-responsive";
  import { Canvas } from '@react-three/fiber';
  import { OrbitControls } from '@react-three/drei';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import { Link } from 'react-router-dom';

  const ProductCard = ({ gltfPath, title, discription, price, positionY, initialScale,_id }) => {
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
        
         <Link to={`/products?gltfPath=${gltfPath}&title=${title}&discription=${discription}&price=${price}&positionY=${positionY}&initialScale=${initialScale}`}>
        <div className="shrink-0 rounded-[20px] bg-zinc-300 h-[282px]">
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
        </Link>
        <div className="flex gap-0.5 items-start mt-10">
          <div className="flex flex-col grow self-start w-fit">
            <h2 className="text-base text-black">{title}</h2>
            <div className="flex gap-8 mt-7 font-bold">
              <p className="my-auto text-xl text-black">Rs.{price}</p>
              <button
                className="flex gap-1.0 px-2.5 py-1.5 text-sm text-white rounded-xl bg-neutral-700 hover:bg-neutral-800"
                style={{ minWidth: '100px' }}
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
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(12);

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 769px) and (max-width: 1024px)" });

    let gridCols = "grid-cols-4";
    if (isMobile) {
      gridCols = "grid-cols-1";
    } else if (isTablet) {
      gridCols = "grid-cols-2";
    }

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/productlist/products');
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
          // Handle error state as needed
        }
      };

      fetchProducts();
    }, []);

    const handlePriceFilterChange = (event) => {
      setPriceFilter(event.target.value);
    };

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const filteredProducts = products.filter((product) => {
      if (searchTerm) {
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    });

    if (priceFilter === "Low to high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "High to low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
      <div className="mt-10">
        <div className="flex justify-center">
          <p className="text-[40px] font-bold text-green-950">Our Products</p>
        </div>
        <div className="flex flex-col mt-[20px] md:flex-row justify-between items-center mb-5 px-5 space-y-4 md:space-y-0 md:space-x-4">
          <select
            className="px-4 py-2 w-full md:w-auto text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-950"
            value={priceFilter}
            onChange={handlePriceFilterChange}
          >
            <option value="">Filter by Price</option>
            <option value="Low to high">Low to high</option>
            <option value="High to low">High to low</option>
          </select>
        </div>

        <div className={`grid ${gridCols} gap-y-5`}>
          {currentProducts.map((product) => (
            <ProductCard
              key={product._id} // Assuming MongoDB ObjectId or similar
              title={product.title}
              price={product.price}
              gltfPath={product.gltfPath}
              initialScale={product.initialScale}
              positionY={product.positionY}
              discription={product.discription}
              _id={product._id}
            />
          ))}
        </div>

        <div className="flex justify-center px-1 mb-3 mt-5">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-4 mx-1 py-2 bg-gray-200 text-black rounded-lg"
            >
              Previous
            </button>
          )}

          <button
            className="px-4 mx-1 py-2 bg-green-900 text-white rounded-lg cursor-default"
          >
            {currentPage}
          </button>

          {currentPage < Math.ceil(products.length / productsPerPage) && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-4 mx-1 py-2 bg-gray-200 text-black rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  };

  export default ProductList;
