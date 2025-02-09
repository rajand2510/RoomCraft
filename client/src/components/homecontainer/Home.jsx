import  { useState, useEffect } from 'react';
import Footer from './Footer';
// import Hero from './Hero';
import Navbar from './Navbar';
import ProductList from '../product/ProductList';
import FAQ from './FAQ';
// import About from './About';
// import AboutUs from './AboutUs';
import Landing from './Landing';
const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);



    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#0A3622]">
                <div className="relative flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-4 border-t-2 border-white"></div>
                    <img src="./image/logo.png" alt="Logo" className="absolute shrink-0 max-w-full aspect-[2.5] w-[200px] max-md:w-[150px]" />
                </div>
            </div>
        );
    }

    return (
        <>
        <div className='bg-gradient-to-b from-slate-50 to-slate-100 '>    
                    <Navbar />
            <Landing/>
            <section className='mt-8' id="productlist">
                <ProductList />
            </section>
            {/* <About/> */}
            <FAQ />
            <Footer />
            </div>

        </>
    );
};

export default Home;