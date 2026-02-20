import React from "react";
import { NavLink } from "react-router-dom";
import { MdAddBox, MdListAlt, MdShoppingCart } from "react-icons/md";

const Sidebar = () => {
  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200";

  const activeStyle = "bg-blue-100 text-blue-700 font-semibold";

  return (
    <div className="w-64 h-screen bg-white shadow-lg border-r p-5">
      
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Admin Panel
      </h2>

      <div className="flex flex-col gap-2">

        {/* Add Product */}
        <NavLink
          to="/products/add"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <MdAddBox size={22} />
          <span>Add Product</span>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <MdListAlt size={22} />
          <span>List Items</span>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <MdShoppingCart size={22} />
          <span>Orders</span>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
