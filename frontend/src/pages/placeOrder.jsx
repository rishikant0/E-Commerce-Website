import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  return (
    <section className="w-full min-h-screen px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* LEFT - Delivery Info */}
      <div>
        <h2 className="text-2xl font-semibold tracking-wide mb-8">
          DELIVERY <span className="text-gray-700">INFORMATION</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input className="border rounded-lg p-3" placeholder="First name" />
          <input className="border rounded-lg p-3" placeholder="Last name" />
        </div>

        <input
          className="border rounded-lg p-3 w-full mt-4"
          type="email"
          placeholder="Email address"
        />
        <input className="border rounded-lg p-3 w-full mt-4" placeholder="Street" />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input className="border rounded-lg p-3" placeholder="City" />
          <input className="border rounded-lg p-3" placeholder="State" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input className="border rounded-lg p-3" placeholder="Zipcode" />
          <input className="border rounded-lg p-3" placeholder="Country" />
        </div>

        <input className="border rounded-lg p-3 w-full mt-4" placeholder="Phone" />
      </div>

      {/* RIGHT - Cart Total + Payment */}
      <div className="mt-8">

        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* PAYMENT METHODS */}
          <div className="flex gap-3 flex-col lg:flex-row">

            {/* STRIPE */}
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-500" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* RAZORPAY */}
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-500" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <div className="w-full text-end mt-8">
            <button
              onClick={() => navigate("/orders")}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
