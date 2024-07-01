import * as React from "react";
import Footer from "../homecontainer/Footer";
import Navbar from "../Userauthcontainer/Loginnav";
import { useMediaQuery } from "react-responsive";

const ProductImage = ({ src, alt }) => {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="w-full aspect-[1.01] object-cover"
    />
  );
};

const AddToCartButton = () => {
  return (
    <button className="flex gap-1 px-5 w-2/12  py-1.5 mt-7 text-base font-bold text-justify text-white bg-black rounded-3xl">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e55fa33744fd7794ef2a1b0f03402a432c0dd4869c54a3a6f18449249ad8afe?apiKey=980db322e33a4a39a5052caa449e1da6&"
        alt=""
        className="shrink-0 w-6 aspect-square"
      />
    
    </button>
  );
};

const ProductDetails = ({ title, description, price }) => {
  return (
    <section className="flex flex-col self-stretch my-auto">
      <h1 className="text-3xl font-medium text-justify text-black">{title}</h1>
      <p className="mt-8 text-lg text-black">{description}</p>
      <p className="mt-9 text-3xl font-bold text-justify text-black">{price}</p>
      <AddToCartButton />
      <div className="flex justify-center items-center px-2.5 mt-5 rounded-full bg-zinc-300 h-[67px] w-[67px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/76818322c020459bceba6ecfcc5cbe9a4fb051cb7292cb581d6abfdba2ec72cd?apiKey=980db322e33a4a39a5052caa449e1da6&"
          alt=""
          className="w-full aspect-square"
        />
      </div>
    </section>
  );
};

const MainProduct = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <Navbar />
      <article
        className={`px-4 py-8 mt-20 mb-20 bg-white rounded-3xl shadow-xl ${
          isMobile ? "max-w-full" : "max-w-[898px] mx-auto"
        }`}
      >
        <div
          className={`flex gap-5 ${isMobile ? "flex-col" : "flex-row"}`}
        >
          <div
            className={`flex flex-col w-full ${isMobile ? "mb-5" : "w-1/2"}`}
          >
            <ProductImage
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/54020e4143530d5895338c555361060b7f2984ffaa8687ea92eb279b6b74076e?apiKey=980db322e33a4a39a5052caa449e1da6&"
              alt="Product image"
            />
          </div>
          <div
            className={`flex flex-col w-full ${isMobile ? "" : "w-1/2"}`}
          >
            <ProductDetails
              title="Title"
              description="Both approaches achieve the same result of adding a row at the top. Choose the method that best suits your project structure"
              price="Rs.7000"
            />
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
};

export default MainProduct;