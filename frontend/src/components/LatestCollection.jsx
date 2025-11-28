import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItems from "./ProductItems.jsx";   // ✅ import your product card component

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="Latest" text2="Collection" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestProducts.map((item, index) => (
        <ProductItems
  key={index}
  id={item.id}
  name={item.name}   // ✅ use name instead of title
  price={item.price}
  image={item.image}
/>

        ))}
      </div>
    </div>
  );
};

export default LatestCollection;