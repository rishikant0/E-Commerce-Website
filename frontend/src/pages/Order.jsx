import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title";

const Order = () => {
  const { backandUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backandUrl + "/api/order/userOrders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && Array.isArray(response.data.orders)) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMode: order.paymentMode,
              date: order.date,
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-6">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orderData.length === 0 && (
        <p className="text-center text-gray-500">No orders found</p>
      )}

      {orderData.map((item, index) => (
        <div
          key={index}
          className="py-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <img
            className="w-16 sm:w-20"
            src={item.images?.[0] || "/placeholder.png"}
            alt={item.name}
          />

          <p className="font-medium">{item.name}</p>

           
            <p>{currency}{item.price}</p>
            <p>Qty: {item.quantity}</p>
            <p>Size: {item.size}</p>

            {/* ✅ PAYMENT MODE */}
            <div className="text-sm space-y-1">
            <p className="capitalize">
              PaymentMode: <span className="font-medium">{item.paymentMode}</span>
            </p>

            {/* ✅ PAYMENT STATUS */}
            <p>
              Payment Status:{" "}
              <span
                className={
                  item.payment ? "text-green-600 font-medium" : "text-orange-500 font-medium"
                }
              >
                {item.payment ? "Paid" : "Pending"}
              </span>
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {new Date(item.date).toDateString()}
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <p className="text-sm">{item.status}</p>
          </div>

          <button
            onClick={loadOrderData}
            className="border px-4 py-2 text-sm rounded-sm"
          >
            Track Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default Order;
