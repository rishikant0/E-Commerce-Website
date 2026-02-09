import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("default");

  const detectCategory = (name = "") => {
    name = name.toLowerCase();
    if (name.includes("men") && !name.includes("women")) return "men";
    if (name.includes("women") || name.includes("lady")) return "women";
    if (name.includes("kid") || name.includes("girl") || name.includes("boy"))
      return "kids";
    return "";
  };

  const detectType = (name = "") => {
    name = name.toLowerCase();
    if (name.includes("t-shirt") || name.includes("tee") || name.includes("top"))
      return "TopWear";
    if (name.includes("pant") || name.includes("jeans"))
      return "BottomWear";
    if (name.includes("jacket") || name.includes("hoodie"))
      return "WinterWear";
    return "";
  };

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  useEffect(() => {
    if (!Array.isArray(products)) return;
    let filtered = [...products];

    if (showSearch && search.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categories.length) {
      filtered = filtered.filter((item) =>
        categories.includes(detectCategory(item.name))
      );
    }

    if (subCategory.length) {
      filtered = filtered.filter((item) =>
        subCategory.includes(detectType(item.name))
      );
    }

    setFilterProducts(filtered);
  }, [products, search, showSearch, categories, subCategory]);

  useEffect(() => {
    let sorted = [...filterProducts];
    if (sortType === "low-high") sorted.sort((a, b) => a.price - b.price);
    if (sortType === "high-low") sorted.sort((a, b) => b.price - a.price);
    setFilterProducts(sorted);
  }, [sortType]);

  useEffect(() => {
    if (Array.isArray(products)) setFilterProducts(products);
  }, [products]);

  return (
    <section className="w-full min-h-screen bg-[#fafafa] overflow-x-hidden">

      {/* Header */}
      <div className="w-full px-6 sm:px-10 lg:px-16 pt-20 pb-14">
        <h1 className="text-3xl md:text-4xl font-light tracking-widest">
          COLLECTION
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl">
          Thoughtfully designed pieces for everyday wear.
        </p>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col lg:flex-row gap-16 px-6 sm:px-10 lg:px-16 pb-24">

        {/* Filters */}
        <aside className="lg:w-72">
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="lg:hidden flex justify-between items-center mb-6 cursor-pointer"
          >
            <span className="text-sm tracking-wide">FILTER</span>
            <img
              src={assets.dropdown_icon}
              className={`h-3 transition ${showFilter ? "rotate-180" : ""}`}
              alt=""
            />
          </div>

          <div className={`space-y-10 ${showFilter ? "block" : "hidden lg:block"}`}>
            <div>
              <div className="flex justify-between mb-4">
                <p className="text-sm font-medium">Category</p>
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-400 hover:text-black"
                >
                  Clear
                </button>
              </div>

              {["men", "women", "kids"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 mb-3 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    checked={categories.includes(cat)}
                    onChange={toggleCategory}
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
              ))}
            </div>

            <div>
              <p className="text-sm font-medium mb-4">Type</p>
              {["TopWear", "BottomWear", "WinterWear"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 mb-3 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={type}
                    checked={subCategory.includes(type)}
                    onChange={toggleSubCategory}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-10">
            <Title text1="ALL" text2="PRODUCTS" />

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 bg-transparent px-4 py-2 text-sm"
            >
              <option value="default">Default</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filterProducts.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-24">
                No products found
              </div>
            ) : (
              filterProducts.map((item) => (
                <ProductItems
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.images}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
