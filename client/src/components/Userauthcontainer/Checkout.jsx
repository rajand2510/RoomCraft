import * as React from "react";
import Navbar from "../homecontainer/Navbar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode } from "jwt-decode"; // Correct import statement for jwtDecode
import { useCart } from '../../CartContext'; 


const ProductCard = ({ imgsrc, title, price ,onDelete}) => {
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
                    <img src={imgsrc} alt={title} className="shrink-0 mx-auto rounded-3xl bg-stone-300 h-[167px] w-[202px] max-md:mt-10" />
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
                            <button  aria-label="Add to favorites" className="shrink-0  aspect-[0.74] ml-[10px] w-[25px]"
                             onClick={onDelete}>
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f99db9daf3009b6cc16a764fa43d574f8d4b96e061372877fe25077269a3cff4?apiKey=980db322e33a4a39a5052caa449e1da6&" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

const Checkout = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]); // Add a new state for products
    const { updateCartItems } = useCart();
    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in localStorage');
            }

            const decoded = jwtDecode(token); // Ensure token is a string here
            const userId = decoded.id;

            axios.get(`http://localhost:3000/api/person/users/${userId}`)
                .then(response => {
                    const userData = response.data.user;
                    setUser({
                        name: userData.name,
                        email: userData.email,
                        address: userData.address,
                        mobile: userData.mobile
                    });
                    setLoading(false);

                    // Fetch products from /checkout endpoint
                    axios.get(`http://localhost:3000/api/cart/checkout`, {
                        params: {
                            userId: userId
                        }
                    })
                    .then(response => {
                        setProducts(response.data); // Update products state with fetched data
                    })
                    .catch(error => {
                        setError(error);
                    });
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, []);
console.log(products);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleDeleteProduct = async (productId) => {
        try {
          const response = await axios.delete(`http://localhost:3000/api/cart/cartdelete`, {
            params: {
              _id: productId,
            },
          });
          if (response.status === 200) {
            setProducts(products.filter((product) => product._id!== productId));
            updateCartItems(status.newCartCount);
          }
        } catch (error) {
          console.error(error);
        }
      };

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
                                    {user.name}
                                </p>
                                <p className="mt-6 text-justify">Address</p>
                                <address className="mt-3 text-base text-zinc-600">
                                    {user.address}
                                </address>
                                <p className="mt-5 text-justify">Email Id</p>
                                <p className="mt-4 text-base text-zinc-600">
                                    {user.email}
                                </p>
                                <p className="mt-5 text-justify">Mobile No.</p>
                                <p className="mt-4 text-base text-zinc-600">
                                    {user.mobile}
                                </p>
                            </div>
                            <div className="flex flex-col px-9 py-9 mt-3.5 rounded-3xl bg-zinc-100 max-md:px-5 max-md:max-w-full">
                                <div className="flex gap-5 justify-between text-xl text-black">
                                    <div className="flex flex-col text-justify">
                                        <h3 className="font-bold">Order Summary</h3>
                                        <p className="mt-7 font-semibold">Total</p>
                                    </div>
                                    <p className="self-end mt-12 font-semibold text-right max-md:mt-10">
                                        Rs.
                                    </p>
                                </div>
                                <button className="justify-center items-center px-16 py-4 mt-10 text-2xl font-bold text-center text-white bg-black rounded-3xl max-md:px-5">
                                    Pay Rs.
                                </button>
                            </div>
                        </div>
                    </section>
                    <aside className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col pl-10 pr-10 mt-28 max-md:mt-10 max-md:max-w-full">
                            {products.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    imgsrc={product.imgsrc}
                                    title={product.title}
                                    price={product.price}
                                    onDelete={() => handleDeleteProduct(product._id)}
                                />
                            ))}
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}

export default Checkout;
