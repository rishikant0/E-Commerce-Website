    import React, { useContext, useState } from "react";
    import {Link, NavLink } from "react-router-dom";   // <-- Import NavLink here
    import { assets } from "../assets/frontend_assets/assets.js";
import { ShopContext } from "../context/ShopContext.jsx";

    const Navbar = () => {
        const [visible, setVisible] =  useState(false);
        const { setShowSearch, getCartCount } = useContext(ShopContext);
    return (
        <div className="flex items-center justify-between py-5 font-medium m-4">
        <Link to="/"><img src={assets.logo} className="w-36" alt="logo" /></Link>
        <ul className="hidden sm:flex gap-5 text-5m text-gray-700 ">
            <NavLink  to="/"   // <-- Always provide a "to" prop for NavLink
            className="flex flex-col items-center gap-1"
            >
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink  to="/collection"   // <-- Always provide a "to" prop for NavLink
            className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>


        <NavLink  to="/about"   // <-- Always provide a "to" prop for NavLink
            className="flex flex-col items-center gap-1"
            >
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>


            <NavLink  to="/contact"   // <-- Always provide a "to" prop for NavLink
            className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
        </ul>

        <div className="flex items-center gap-6">
            <img onClick={() => setShowSearch(true)} src={assets.search_icon}  className="w-5 cursor-pointer" alt=""/>
            <div className="group relative">
              <Link to='/login'>  <img className="w-5 cursor-pointer" src={assets.profile_icon} alt=""/></Link>
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                    <p className="hover:text-gray-800 cursor-pointer">Profile</p>
                    <p className="hover:text-gray-800 cursor-pointer">Orders</p>
                    <p className="hover:text-gray-800 cursor-pointer">Logout</p>
                </div>
            </div>
        </div>
        <Link to="/cart" className="relative">
            <img className="w-5 min-w-5 " src={assets.cart_icon} alt=""/>
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-8px">{getCartCount()}</p>
        </Link> 
        <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu" className="w-5 cursor-pointer"/>
        </div>
        {/* //side bar menu for small screen */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all shadow-lg transform ${visible ? 'w-full' : 'w-0'}`}>
            <div className="flex flex-col text-gray-600">
                <div onClick={ () => setVisible(false)} className="flex items-center gap-4 p-3">
                    <img className=" h-4 rotate-180" src={assets.dropdown_icon} alt="" />
                    <p>Back</p>
                </div>
                <NavLink onClick={() => setVisible(false)} to="/" className="py-2 px-6 border-b">HOME</NavLink>
                <NavLink onClick={() => setVisible(false)} to="/collection" className="py-2 px-6 border-t">COLLECTION</NavLink>
                <NavLink onClick={() => setVisible(false)} to="/about" className="py-2 px-6 border-t">ABOUT</NavLink>
                <NavLink onClick={() => setVisible(false)} to="/contact" className="py-2 px-6 border-t">CONTACT</NavLink>   
            </div>
        </div>
        </div>
    );
    };

    export default Navbar;