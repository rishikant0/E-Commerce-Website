import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  // placeOrderRuzopay,
  getUserOrders,
  getAllOrders,
  updateStatus,
  verifyStripe
} from "../controllers/orderController.js";

import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/authUser.js";

const orderRoute = express.Router();

// Admin features
orderRoute.post("/list", adminAuth, getAllOrders);
orderRoute.post("/status", adminAuth, updateStatus);

// Payment features
orderRoute.post("/place", authUser, placeOrder);
orderRoute.post("/stripe", authUser, placeOrderStripe);
// orderRoute.post("/ruzopay", authUser, placeOrderRuzopay);

// User features
orderRoute.post("/userOrders", authUser, getUserOrders);
//verify payment
orderRoute.post('/verifyStripe',authUser,verifyStripe)

export default orderRoute;
