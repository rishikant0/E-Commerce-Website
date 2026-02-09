import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";
import { motion } from "framer-motion";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) {
      console.log("❌ Products not loaded yet");
      return;
    }

    console.log("✅ Products received:", products);

    // Accept different possible flag names used across the codebase/backends
    const bestProduct = products.filter((item) =>
      item.isBestSeller === true || item.bestseller === true || item.BestSeller === true
    );

    console.log("⭐ Best Sellers:", bestProduct);

    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="relative my-20 py-10">

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center text-3xl py-8"
      >
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          Our most loved products—picked by thousands of happy customers.
        </p>
      </motion.div>

      {/* Fallback if no bestseller */}
      {bestSeller.length === 0 && (
        <p className="text-center text-gray-400">
          No bestseller products available
        </p>
      )}

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {bestSeller.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProductItems
              id={item._id}
              image={item.image || item.images}
              name={item.name}
              price={item.price}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
