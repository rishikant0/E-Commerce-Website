import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Men", "Women", "Kids"];

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // ✅ CLEAN FILTER LOGIC
  useEffect(() => {
    if (!products || products.length === 0) return;

    if (activeCategory === "All") {
      setFilteredProducts(products);
    } else if (activeCategory === "Trending") {
      setFilteredProducts(
        products.filter(
          (p) => p.Trending === true || p.BestSeller === true
        )
      );
    } else {
      setFilteredProducts(
        products.filter(
          (p) =>
            p.category?.toLowerCase() === activeCategory.toLowerCase()
        )
      );
    }
  }, [activeCategory, products]);

  return (
    <section className="relative my-32 px-4 md:px-14 bg-[#F5F1EB] overflow-hidden">

      {/* Decorative Images */}
      <img
        src="/fashion-left.png"
        alt=""
        className="hidden lg:block absolute left-0 top-52 w-40 opacity-70"
      />
      <img
        src="/fashion-right.png"
        alt=""
        className="hidden lg:block absolute right-0 bottom-52 w-48 opacity-70"
      />

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-20"
      >
        <Title text1="Latest" text2="Collection" />

        <p className="mt-5 max-w-2xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
          Carefully curated pieces inspired by modern silhouettes, timeless
          textures, and everyday elegance.
        </p>

        <p className="mt-6 text-xs tracking-[0.35em] text-[#C2A878] uppercase">
          Curated • Minimal • Premium
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat)}
            className={`px-7 py-2 rounded-full text-sm tracking-wide transition-all border
              ${
                activeCategory === cat
                  ? "bg-[#C2A878] text-white border-[#C2A878]"
                  : "bg-transparent text-gray-700 border-gray-400 hover:bg-white"
              }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Products Grid */}
      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 pb-24"
        >
          {filteredProducts.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="bg-[#FAFAF8] rounded-[2rem] overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all">

                {/* Product Image */}
                <motion.img
                  src={item.images?.[0] || "/placeholder.png"}
                  alt={item.name}
                  className="w-full h-72 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Product Content */}
                <div className="p-5 space-y-2">
                  <h3 className="text-gray-900 font-medium truncate">
                    {item.name}
                  </h3>

                  <p className="text-xs tracking-wide text-gray-500">
                    Handcrafted Premium Wear
                  </p>

                  <div className="flex items-center justify-between pt-3">
                    <span className="text-lg font-semibold text-gray-900">
                      ₹{item.price}
                    </span>

                    <button
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="text-xs tracking-widest px-5 py-2 rounded-full border border-black hover:bg-black hover:text-white transition"
                    >
                      VIEW
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

    </section>
  );
};

export default LatestCollection;
