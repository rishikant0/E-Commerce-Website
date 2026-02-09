import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";

const currency = "inr";
const deliverycharge = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// =======================
// PLACE ORDER (COD)
// =======================
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    console.log("\n📋 ===== PLACING ORDER (COD) =====");
    console.log("👤 User ID:", userId);
    console.log("💰 Order amount:", amount);
    console.log("📦 Items count:", items?.length);
    console.log("📍 Address:", address?.city || "N/A");

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMode: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    console.log("✅ Order saved with ID:", newOrder._id);

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    console.log("✅ Cart cleared for user");
    console.log("📋 ===== ORDER PLACED SUCCESSFULLY =====\n");

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("❌ Error placing order:", error.message);
    console.error("Full error:", error);
    res.json({ success: false, message: error.message });
  }
};

// =======================
// PLACE ORDER (STRIPE)
// =======================
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;

    console.log("\n📋 ===== PLACING ORDER (STRIPE) =====");
    console.log("👤 User ID:", userId);
    console.log("💰 Order amount:", amount);
    console.log("📦 Items count:", items?.length);
    console.log("📍 Address:", address?.city || "N/A");

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMode: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    console.log("✅ Order saved with ID:", newOrder._id);

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliverycharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// =======================
// VERIFY STRIPE PAYMENT
// =======================
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// =======================
// GET USER ORDERS
// =======================
const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// =======================
// ADMIN: GET ALL ORDERS
// =======================
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// =======================
// ADMIN: UPDATE STATUS
// =======================
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  getUserOrders,
  getAllOrders,
  updateStatus,
  verifyStripe,
};
