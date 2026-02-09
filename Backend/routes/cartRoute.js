import express from "express";
import { addToCart, updateCart, getCart } from "../controllers/cartController.js";
import authUser from "../middleware/authUser.js";

const cartRoute = express.Router();

// Add item to cart
cartRoute.post("/add", authUser, addToCart);

// Update cart item quantity
cartRoute.post("/update", authUser, updateCart);

// Get user cart
cartRoute.post("/get", authUser, getCart);

export default cartRoute;
