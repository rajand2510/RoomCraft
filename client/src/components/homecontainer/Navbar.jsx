// src/homecontainer/Navbar.js
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useCart } from '../../CartContext';  // Import the cart context

const NavItem = ({ to, children }) => {
  return (
    <a href={to} className="cursor-pointer">
      {children}
    </a>
  );
};

const Button = ({ children, className, onClick }) => (
  <button
    className={`flex justify-center items-center px-6 py-1 rounded-2xl bg-white bg-opacity-40 border border-white border-opacity-70 hover:bg-white hover:text-green-800 cursor-pointer max-md:px-5 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartItems, updateCartItems } = useCart();  // Consume the cart context
  const { isLoggedIn, handleLogout } = useAuth();

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Products', path: '/#productlist' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  
  useEffect(() => {
    const tokenhandle = localStorage.getItem('token');

    if (tokenhandle) {
      try {
        const decoded = jwtDecode(tokenhandle);
        const userId = decoded.id;

        axios.get('https://room-craft-api.vercel.app/api/cart/cart_count', {
          params: { userId },
          headers: { Authorization: `Bearer ${tokenhandle}` },
        })
       .then(response => {
          updateCartItems(response.data.count);
        })
       .catch(error => {
          console.error(error);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [updateCartItems]);
    // Handle navigation and scrolling behavior for About Us section
    useEffect(() => {
      const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.getElementById(hash.slice(1));
            if (targetElement) {
                const headerOffset = document.querySelector('header')?.offsetHeight || 100; // Dynamically adjust
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
                console.log("Hash:", hash);
                console.log("Target Element:", targetElement);
                console.log("Element Position:", elementPosition);
                console.log("Offset Position:", offsetPosition);
                console.log("ScrollY:", window.scrollY);
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        }
    };
    
  
      // Call function on initial load and whenever the hash changes
      handleHashChange();
  
      // Add an event listener for hash change
      window.addEventListener('hashchange', handleHashChange);
  
      // Cleanup event listener
      return () => {
          window.removeEventListener('hashchange', handleHashChange);
      };
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-green-950 text-white px-16 text-lg">
      <div className="flex gap-5 justify-between w-full max-w-[1473px] max-md:flex-wrap max-md:max-w-full">
        <img
          loading="lazy"
          src="/image/logo.png"
          alt=""
          className={`shrink-0 max-w-full aspect-[2.5] w-[200px] max-md:w-[150px] ${isMenuOpen ? 'hidden' : ''}`}
        />
        <nav className="flex gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-8 justify-between my-auto">
            <button className="md:hidden" onClick={toggleMenu}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <div
              className={`flex gap-8 justify-between my-auto md:flex ${isMenuOpen ? 'block' : 'hidden'} max-md:flex-col max-md:items-center`}
            >
              {navItems.map((item, index) => (
                <NavItem key={index} to={item.path}>
                  {item.text}
                </NavItem>
              ))}
              {isLoggedIn ? (
                <div className="flex gap-6 items-center">
                  <div className="relative">
                    <NavItem >
                    <Link to="/Checkout">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/46a7ade1f639c80316c5fc49416c181e2db3522c89bd63a467f1817d6904d0de?apiKey=980db322e33a4a39a5052caa449e1da6&"
                        alt=""
                      />
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems}
                      </span>
                      </Link>
                    </NavItem>
                  </div>
                  <div className="relative">
                    <div onClick={toggleProfile}>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9fceddc3e284bb92e89a4d15b266974f64f5a881dd56651bce80574f6c4ddbb3?apiKey=980db322e33a4a39a5052caa449e1da6&"
                        alt=""
                        className="w-full aspect-square max-w-[39px]"
                      />
                    </div>
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
                      <Link to="/myorder"> <Button className="w-full text-left px-4 py-2">My Order</Button></Link> 
                        <Button className="w-full text-left px-4 py-2" onClick={handleLogout}>
                          Log out
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6 font-semibold mt-4 md:hidden">
                  <NavItem >
                  <Link to="/login">
                    <Button className="px-5">Log in</Button>
                    </Link>
                  </NavItem>
                  <NavItem >
                  <Link to="/signup">
                    <Button>Sign up</Button>
                    </Link>
                  </NavItem>
                </div>
              )}
            </div>
          </div>
          {!isLoggedIn && (
            <div className="hidden md:flex gap-6 font-semibold">
              <NavItem to="/login">
                <Button className="px-5">Log in</Button>
              </NavItem>
              <NavItem to="/signup">
                <Button>Sign up</Button>
              </NavItem>
            </div>
          )}
        </nav>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </header>
  );
};

export default Navbar;