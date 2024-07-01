import * as React from "react";
import Navbar from "../homecontainer/Navbar";

import { useState } from 'react';

const ProductCard = ({ imageSrc, title, price }) => {
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(price);

    const handleDecrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setTotalPrice(totalPrice - price);
        }
    };

    const handleIncrementQuantity = () => {
        if (quantity < 5) { // <--- Add this check
            setQuantity(quantity + 1);
            setTotalPrice(totalPrice + price);
        }
    };

    return (
        <article className="py-4 pr-16 mb-6 pl-4 bg-white rounded-3xl w-[450px]  shadow-xl max-md:pr-5  max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                    <img src={imageSrc} alt={title} className="shrink-0 mx-auto rounded-3xl bg-stone-300 h-[167px] w-[202px] max-md:mt-10" />
                </div>
                <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col self-stretch my-auto text-justify text-black whitespace-nowrap max-md:mt-10">
                        <div className="flex gap-5 justify-between px-px text-[16px] font-medium">
                            <h3 className="self-start overflow-hidden text-ellipsis">{title}</h3>
                        </div>
                        <div className="mt-2 text-[15px] font-bold">Rs.{totalPrice}</div>
                        <div className="flex mt-3 mr-4 items-center">
                            <button
                                className=" py-1 bg-black text-white rounded-full w-8 h-8"
                                onClick={handleDecrementQuantity}
                            >
                                -
                            </button>
                            <span className="px-2 py-1 rounded-full ">{quantity}</span>
                            <button
                                className="px-2 py-1 bg-black text-white rounded-full w-8 h-8"
                                onClick={handleIncrementQuantity}
                            >
                                +
                            </button>
                            <button aria-label="Add to favorites" className="shrink-0  aspect-[0.74] ml-[10px] w-[25px]">
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f99db9daf3009b6cc16a764fa43d574f8d4b96e061372877fe25077269a3cff4?apiKey=980db322e33a4a39a5052caa449e1da6&" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};
function Checkout() {
    const products = [
        {
            imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f99db9daf3009b6cc16a764fa43d574f8d4b96e061372877fe25077269a3cff4?apiKey=980db322e33a4a39a5052caa449e1da6&",
            title: "Bharat Sales Vinyl Adjustable Height Control Chair",
            price: 7000,
        },
        {
            imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/13eab930f878bbe504f9444beb3ead0704a7ec122fcd268177c29b7dc6d22961?apiKey=980db322e33a4a39a5052caa449e1da6&",
            title: "Bharat Sales Vinyl Adjustable Height Control Chair",
            price: 1000,
        }
        
    ];

    const total = products.reduce((acc, product) => acc + product.price, 0);

    return (
        <>
            <Navbar />
            <main>
                <div className="flex gap-5 ml-28 mt-10 max-md:ml-0 max-md:flex-col max-md:gap-0">
                    <section className="flex flex-col w-5/12 max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-5 pt-14 pb-7 w-full bg-white rounded-3xl shadow-sm max-md:pl-5 max-md:mt-10 max-md:max-w-full">
                            <h1 className="self-center text-2xl font-bold text-justify text-black">
                                Check Out
                            </h1>
                            <div className="flex flex-col items-start pt-8 pr-20 pb-16 pl-9 mt-6 text-lg font-semibold bg-white rounded-3xl border-2 border-solid border-stone-300 text-neutral-400 max-md:px-5 max-md:max-w-full">
                                <h2 className="text-xl font-bold text-justify text-black">
                                    Shipping address
                                </h2>
                                <p className="mt-5 text-justify">Name</p>
                                <p className="mt-3 text-base text-zinc-600">
                                    Rajan Dhariyaparmar
                                </p>
                                <p className="mt-6 text-justify">Address</p>
                                <address className="mt-3 text-base text-zinc-600">
                                    S.G. highway,Gota<br />
                                    Ahmedabad,Gujarat<br />
                                    363001
                                </address>
                                <p className="mt-5 text-justify">Email</p>
                                <p className="mt-4 text-base text-zinc-600">
                                    rajandalvadi2510@gmail.com
                                </p>
                            </div>
                            <div className="flex flex-col px-9 py-9 mt-3.5 rounded-3xl bg-zinc-100 max-md:px-5 max-md:max-w-full">
                                <div className="flex gap-5 justify-between text-xl text-black">
                                    <div className="flex flex-col text-justify">
                                        <h3 className="font-bold">Order Summary</h3>
                                        <p className="mt-7 font-semibold">Total</p>
                                    </div>
                                    <p className="self-end mt-12 font-semibold text-right max-md:mt-10">
                                        Rs.{total}
                                    </p>
                                </div>
                                <button className="justify-center items-center px-16 py-4 mt-10 text-2xl font-bold text-center text-white bg-black rounded-3xl max-md:px-5">
                                    Pay Rs.{total}
                                </button>
                            </div>
                        </div>
                    </section>
                    <aside className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col pl-10 pr-10 mt-28 max-md:mt-10 max-md:max-w-full">
                            {products.map((product, index) => (
                                <ProductCard key={index} {...product} />
                            ))}
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}

export default Checkout;

