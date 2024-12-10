import  { useState, useEffect } from 'react';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import ProductList from '../product/ProductList';
import FAQ from './FAQ';
// import AboutUs from './AboutUs';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);



    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-green-900">
                <div className="relative flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-4 border-t-2 border-white"></div>
                    <img src="./image/logo.png" alt="Logo" className="absolute shrink-0 max-w-full aspect-[2.5] w-[200px] max-md:w-[150px]" />
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <Hero />
            <section id="productlist">
                <ProductList />
            </section>
            <FAQ />
            <Footer />
        </>
    );
};

export default Home;