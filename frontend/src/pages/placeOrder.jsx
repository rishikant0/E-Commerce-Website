import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  const {
    backandUrl,
    token,
    cartItems,
    getCartAmount,
    delivery_fee,
    products,
    setCartItems,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const currentToken = token || localStorage.getItem("token");

      console.log("\n📋 ===== PLACING ORDER =====");
      console.log("🔑 Token exists:", !!currentToken);
      console.log("🔑 Token source:", token ? "from context" : "from localStorage");
      console.log("🔑 Token preview:", currentToken ? currentToken.substring(0, 50) + "..." : "NO TOKEN");
      console.log("🔑 Token length:", currentToken ? currentToken.length : 0);

      if (!currentToken) {
        toast.error("Please login to place an order");
        navigate("/login");
        return;
      }
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const productInfo = structuredClone(
              products.find((p) => p._id === productId)
            );

            if (productInfo) {
              productInfo.size = size;
              productInfo.quantity = cartItems[productId][size];
              orderItems.push(productInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      console.log("📦 Order data:", orderData);
      console.log("💰 Total amount:", orderData.amount);
      console.log("📡 Sending to:", backandUrl + "/api/order/place");

      // ✅ CASH ON DELIVERY
      if (method === "cod") {
        console.log("💳 Payment method: COD");
        const res = await axios.post(
          backandUrl + "/api/order/place",
          orderData,
          {
            headers: { Authorization: `Bearer ${currentToken}` },
          }
        );

        console.log("✅ Order response:", res.data);
        if (res.data.success) {
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error(res.data.message);
        }
      }

      // ✅ STRIPE
      if (method === "stripe") {
        console.log("💳 Payment method: Stripe");
        const res = await axios.post(
          backandUrl + "/api/order/stripe",
          orderData,
          {
            headers: { Authorization: `Bearer ${currentToken}` },
          }
        );

        console.log("✅ Stripe response:", res.data);
        if (res.data.success) {
          window.location.replace(res.data.session_url);
        } else {
          toast.error(res.data.message);
        }
      }
      console.log("📋 ===== ORDER PLACED SUCCESSFULLY =====\n");
    } catch (error) {
      console.error("\n❌ ===== PLACE ORDER FAILED =====");
      console.error("Error message:", error?.message);
      console.error("Response status:", error?.response?.status);
      console.error("Response data:", error?.response?.data);
      console.error("Full error:", error);
      console.error("❌ ===== END ERROR =====\n");
      toast.error(error.response?.data?.message || error.message || "Order failed");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full min-h-screen px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-12"
    >
      {/* LEFT */}
      <div>
        <h2 className="text-2xl font-semibold mb-8">
          DELIVERY <span className="text-gray-700">INFORMATION</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} className="border p-3" placeholder="First name" />
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} className="border p-3" placeholder="Last name" />
        </div>

        <input required type="email" name="email" value={formData.email} onChange={onChangeHandler} className="border p-3 w-full mt-4" placeholder="Email" />
        <input required name="street" value={formData.street} onChange={onChangeHandler} className="border p-3 w-full mt-4" placeholder="Street" />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input required name="city" value={formData.city} onChange={onChangeHandler} className="border p-3" placeholder="City" />
          <input required name="state" value={formData.state} onChange={onChangeHandler} className="border p-3" placeholder="State" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input required name="zipcode" value={formData.zipcode} onChange={onChangeHandler} className="border p-3" placeholder="Zipcode" />
          <input required name="country" value={formData.country} onChange={onChangeHandler} className="border p-3" placeholder="Country" />
        </div>

        <input required name="phone" value={formData.phone} onChange={onChangeHandler} className="border p-3 w-full mt-4" placeholder="Phone" />
      </div>

      {/* RIGHT */}
      <div className="mt-8">
        <CartTotal />

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border p-2 cursor-pointer">
              <span className={`h-3 w-3 rounded-full border ${method === "stripe" && "bg-green-500"}`} />
              <img src={assets.stripe_logo} className="h-5 mx-4" />
            </div>

            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 cursor-pointer">
              <span className={`h-3 w-3 rounded-full border ${method === "cod" && "bg-green-500"}`} />
              <p className="text-sm text-gray-600 mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
