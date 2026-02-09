import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // ================= FETCH ALL ORDERS =================
  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("Admin not logged in");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ================= UPDATE ORDER STATUS =================
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Order status updated");
        fetchAllOrders(); // refresh orders
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // ================= UI =================
  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6">Orders</h3>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm p-5 bg-white"
          >
            {/* TOP */}
            <div className="flex items-start gap-4">
              <img
                src={assets.parcel_icon}
                alt="parcel"
                className="w-12 h-12"
              />

              <div className="flex-1">
                {/* ITEMS */}
                <div className="text-sm text-gray-700 space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      <span className="font-medium">{item.name}</span> ×{" "}
                      {item.quantity}
                      <span className="ml-2 text-gray-500">
                        ({item.size})
                      </span>
                    </p>
                  ))}
                </div>

                {/* ADDRESS */}
                <p className="text-sm text-gray-600 mt-3">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country} –{" "}
                  {order.address.zipcode}
                </p>

                <p className="text-sm text-gray-600">
                  📞 {order.address.phone}
                </p>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5 text-sm">
              <p>
                <span className="font-medium">Items:</span>{" "}
                {order.items.length}
              </p>

              <p>
                <span className="font-medium">Mode:</span>{" "}
                {order.paymentMode}
              </p>

              <p>
                <span className="font-medium">Payment:</span>{" "}
                {order.payment ? "Paid" : "Not Paid"}
              </p>

              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>

              <p className="font-semibold">
                {currency}
                {order.amount}
              </p>
            </div>

            {/* STATUS */}
            <div className="mt-4">
              <select
                value={order.status}
                onChange={(event) =>
                  statusHandler(event, order._id)
                }
                className="border px-3 py-2 rounded text-sm w-48"
              >
                <option value="placed">Placed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
