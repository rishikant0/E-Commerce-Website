import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItems = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
        />
      </div>
      <div className="mt-2">
        <p className="text-gray-500">{name}</p>   {/* ✅ now shows */}
        <p className="text-sm font-medium">
          {currency}{price}
        </p>
      </div>
    </Link>
  );
};



export default ProductItems;