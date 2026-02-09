import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
    const temp = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (qty > 0) {
          temp.push({
            _id: productId,
            size,
            quantity: qty,
          });
        }
      }
    }

    setCartData(temp);
  }
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Your cart is empty
        </p>
      )}

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          // 🔐 Safety check
          if (!productData) return null;

          // ✅ IMAGE FIX (THIS IS THE KEY PART)
          const imageSrc =
            productData.image?.[0]?.url ||
            productData.image?.[0] ||
            "/placeholder.png";

          return (
            <div
              key={index}
              className="py-4 border-b text-gray-700 grid gap-4 sm:grid-cols-[2fr_1fr_1fr_1fr]"
            >
              {/* PRODUCT */}
              <div className="flex items-start gap-6">
                <img
                  src={imageSrc}
                  alt={productData.name}
                  className="w-16 sm:w-20 object-cover"
                />

                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* QUANTITY */}
              <input
                type="number"
                min={1}
                value={item.quantity}
                className="border max-w-16 sm:max-w-20 px-2 py-1"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0)
                    updateQuantity(item._id, item.size, value);
                }}
              />

              {/* DELETE */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="delete"
              />

              {/* TOTAL PRICE */}
              <p className="font-medium">
                {currency}
                {productData.price * item.quantity}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white px-6 py-3 mt-4 text-sm"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
