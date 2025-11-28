import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";

const Collection = () => {
  const { products, search ,showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [categories, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [sortType, setSortType] = useState("default");

  // FIXED — Detect category
   const detectCategory = (name) => {
    name = name.toLowerCase().trim();

    // Exact Men (avoid "women")
    if (
      name.startsWith("men ") ||
      name.includes(" men ") ||
      name.endsWith(" men") ||
      name === "men"
    ) {
      return "men";
    }

    // Women variations
    if (
      name.includes("women") ||
      name.includes("woman") ||
      name.includes("womens") ||
      name.includes("women's") ||
      name.includes("lady") ||
      name.includes("ladies")
    ) {
      return "women";
    }

    // Kids
    if (
      name.includes("girls") ||
      name.includes("girl") ||
      name.includes("kids") ||
      name.includes("kid")
    ) {
      return "kids";
    }

    return "";
  };

  const applyFilter = () =>{
    let productsCopy = products.slice();
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
  }

  // FIXED — Detect type
  const detectType = (name) => {
    name = name.toLowerCase();

    if (name.includes("t-shirt") || name.includes("tee") || name.includes("top"))
      return "TopWare";

    if (
      name.includes("pant") ||
      name.includes("jeans") ||
      name.includes("trouser")
    )
      return "BottomWare";

    if (
      name.includes("hoodie") ||
      name.includes("jacket") ||
      name.includes("sweatshirt")
    )
      return "WinterWare";

    return "";
  };

  // TOGGLE Category
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  };

  // TOGGLE SubCategory
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  // MAIN FILTERING LOGIC
  useEffect(() => {
  if (!Array.isArray(products)) return;

  let filtered = [...products];

  // SEARCH filter first
  if (showSearch && search.trim() !== "") {
    filtered = filtered.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // CATEGORY filter
  if (categories.length > 0) {
    filtered = filtered.filter((item) =>
      categories.includes(detectCategory(item.name))
    );
  }

  // SUBCATEGORY filter
  if (subCategory.length > 0) {
    filtered = filtered.filter((item) =>
      subCategory.includes(detectType(item.name))
    );
  }

  setFilterProducts(filtered);
}, [products, search, showSearch, categories, subCategory]);

  // FIXED SORTING LOGIC
  useEffect(() => {
    if (filterProducts.length === 0) return;

    let sorted = [...filterProducts];

    if (sortType === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(sorted);
  }, [sortType]);

  // Load all initially
  useEffect(() => {
    if (Array.isArray(products)) setFilterProducts(products);
  }, [products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      
      {/* LEFT FILTERS */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)}
           className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTER
          <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
               src={assets.dropdown_icon} alt="arrow" />
        </p>

        {/* CATEGORIES */}
        <div className={`border border-gray-300 p-5 py-3 mt-6 ${showFilter ? "" : "hidden"}`}>

          <div className="flex justify-between mb-3">
            <p className="text-sm font-medium">CATEGORIES</p>
            <button onClick={clearFilters} className="text-xs text-gray-500 hover:underline">
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <label className="flex gap-2">
              <input type="checkbox" value="men" checked={categories.includes("men")} onChange={toggleCategory} />
              Men
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="women" checked={categories.includes("women")} onChange={toggleCategory} />
              Women
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="kids" checked={categories.includes("kids")} onChange={toggleCategory} />
              Kids
            </label>
          </div>
        </div>

        {/* TYPES */}
        <div className={`border border-gray-300 p-5 py-3 my-5 ${showFilter ? "" : "hidden"}`}>
          <p className="mb-3 text-sm font-medium">TYPES</p>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <label className="flex gap-2">
              <input type="checkbox" value="TopWare"
                     checked={subCategory.includes("TopWare")}
                     onChange={toggleSubCategory} />
              TopWare
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="BottomWare"
                     checked={subCategory.includes("BottomWare")}
                     onChange={toggleSubCategory} />
              BottomWare
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="WinterWare"
                     checked={subCategory.includes("WinterWare")}
                     onChange={toggleSubCategory} />
              WinterWare
            </label>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="Collection" />

          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="default">Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          ) : (
            filterProducts.map((item, index) => (
              <ProductItems
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
