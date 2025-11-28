import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible,setVisible] = useState(false)
  const location = useLocation();


  useEffect (() => {
    if(location.pathname.includes('collection')){
      setVisible(true);
    }else{
      setVisible(false)
    }
  }, [location])
  
  if (!showSearch) return null;

  return (
    <div className="border-t border-b bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">

        {/* SEARCH INPUT BOX */}
        <div className="flex items-center border border-gray-300 px-5 py-3 rounded-full w-full bg-white shadow-sm">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-base"
          />

          <img
            src={assets.search_icon}
            alt="search"
            className="w-5 h-5 opacity-70"
          />
        </div>

        {/* CLOSE ICON */}
        <img
          onClick={() => setShowSearch(false)}
          src={assets.cross_icon}
          alt="close"
          className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default SearchBar;
