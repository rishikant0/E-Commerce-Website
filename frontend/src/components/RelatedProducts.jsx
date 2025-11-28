import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category, currentProductId }) => {
  const { products, currency } = useContext(ShopContext);

  // Filter related products based on category and avoid current product
  const related = products
    .filter((item) => item.category === category && item._id !== currentProductId)
    .slice(0, 5); // show only first 5 products

  return (
    <div className="w-full mt-20 px-5 md:px-20">
      
      {/* TITLE */}
      <h2 className="text-center text-3xl font-semibold mb-10">
        <span className="text-gray-700">RELATED </span>
        <span className="text-black">PRODUCTS</span>
      </h2>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {related.map((item) => (
          <Link
            to={`/product/${item._id}`}
            key={item._id}
            className="cursor-pointer"
          >
            <div className="w-full">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-full h-[260px] object-cover rounded-md shadow-sm hover:scale-105 transition"
              />
              <h3 className="mt-3 text-[16px] text-gray-700">
                {item.name}
              </h3>
              <p className="text-[15px] font-semibold mt-1">
                {currency}{item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
