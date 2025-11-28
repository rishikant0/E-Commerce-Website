import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (!products || products.length === 0) return;

    const item = products.find((p) => p._id === productId);

    if (item) {
      setProductData(item);

      // image array check
      if (Array.isArray(item.image) && item.image.length > 0) {
        setMainImage(item.image[0]);
      }
    }
  }, [productId, products]);

  if (!productData) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="w-full px-5 md:px-16 py-10">

      <div className="flex flex-col md:flex-row gap-10">

        {/* LEFT THUMBNAILS */}
        <div className="flex md:flex-col gap-3 overflow-auto">
          {productData.image.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 object-cover rounded cursor-pointer border 
                ${mainImage === img ? "border-black" : "border-gray-300"}`}
            />
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src={mainImage}
            className="w-full max-w-[500px] object-cover rounded"
            alt="Product"
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="flex-1">

          <h1 className="text-3xl font-semibold">{productData.name}</h1>

          {/* STAR ICONS */}
          <div className="flex items-center gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-4" />
            ))}
            <p className="ml-2 text-gray-500">(122)</p>
          </div>

          {/* PRICE */}
          <p className="mt-5 text-4xl font-semibold">
            {currency}
            {productData.price}
          </p>

          {/* DESCRIPTION */}
          <p className="mt-5 text-gray-600 leading-relaxed">
            {productData.description}
          </p>

          {/* SIZE SELECT */}
          <p className="mt-7 font-medium">Select Size</p>
          <div className="flex gap-3 mt-2">
            {productData.sizes.map((item, index) => (
              <button
                key={index}
                onClick={() => setSize(item)}
                className={`border py-2 px-5 rounded-md 
                  ${size === item ? "bg-black text-white" : "bg-gray-100"}
                `}
              >
                {item}
              </button>
            ))}
          </div>

          {/* ADD TO CART BUTTON */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="mt-8 bg-black text-white px-7 py-3 rounded-md text-lg hover:bg-gray-900"
          >
            ADD TO CART
          </button>

          {/* EXTRA INFO */}
          <div className="mt-10 text-gray-600 text-sm leading-relaxed">
            <p>✔ 100% Original product.</p>
            <p>✔ Cash on delivery is available on this product.</p>
            <p>✔ Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* description & Review section */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm">Description</p>
          <p className="border px-5 py-3 text-sm" >
                  Reviews (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6  text-sm text-gary-500">
          <p>
An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>
          {/* Display Related Product */}
          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  );
};

export default Product;
