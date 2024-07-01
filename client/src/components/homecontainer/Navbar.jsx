import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavItem = ({ to, children }) => (
  <Link to={to} className="cursor-pointer">
    {children}
  </Link>
);

const Button = ({ children, className }) => (
  <button className={`flex justify-center items-center px-6 py-1 rounded-2xl bg-white bg-opacity-40 border border-white border-opacity-70 hover:bg-white hover:text-green-800 cursor-pointer  max-md:px-5 ${className}`}>
    {children}
  </button>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { text: "Home", path: "/" },
    { text: "Products", path: "/products" },
    { text: "About Us", path: "/about" }
  ];
  const buttons = [
    { text: "Log in", path: "/login", className: "px-8" },
    { text: "Sign up", path: "/signup", className: "" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
            <div className={`flex gap-8 justify-between my-auto md:flex ${isMenuOpen ? 'block' : 'hidden'} max-md:flex-col max-md:items-center`}>
              {navItems.map((item, index) => (
                <NavItem key={index} to={item.path}>{item.text}</NavItem>
              ))}
              <div className="flex flex-col gap-6 font-semibold mt-4 md:hidden">
                {buttons.map((button, index) => (
                  <NavItem key={index} to={button.path}>
                    <Button className={button.className}>
                      {button.text}
                    </Button>
                  </NavItem>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex gap-6 font-semibold">
            {buttons.map((button, index) => (
              <NavItem key={index} to={button.path}>
                <Button className={button.className}>
                  {button.text}
                </Button>
              </NavItem>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
