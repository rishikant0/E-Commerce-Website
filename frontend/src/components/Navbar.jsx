import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const { getCartCount, navigate, token } = useContext(ShopContext);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setShowNavbar(window.scrollY < lastScrollY);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-6 md:mx-20 mt-4 rounded-full bg-[#FAFAF8]/90 backdrop-blur border border-black/5 shadow-sm">
        <div className="flex items-center justify-between px-10 py-4">

          {/* Logo */}
          <Link to="/" className="text-lg font-light tracking-widest">
            <img src={assets.logo} className="w-28" alt="logo" />
          </Link>

          {/* Menu */}
          <ul className="hidden md:flex gap-12 text-xs tracking-[0.25em] text-[#1F1F1F]">
            {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item) => (
              <NavLink
                key={item}
                to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-[#C2A878] transition"
              >
                {item}
              </NavLink>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <img src={assets.search_icon} className="w-4 opacity-70" alt="" />
            <img
              src={assets.profile_icon}
              onClick={() => navigate(token ? "/profile" : "/login")}
              className="w-4 opacity-70 cursor-pointer"
              alt="profile"
            />
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} className="w-4 opacity-70" alt="" />
              <span className="absolute -right-2 -top-2 w-4 h-4 bg-[#1F1F1F] text-white text-[10px] rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
