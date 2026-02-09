import userModel from "../models/userModel.js";

// ADD PRODUCT TO USER CART
const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId; // ✅ Get userId from middleware, not body

    console.log("🛒 Adding to cart - userId:", userId, "itemId:", itemId, "size:", size);

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.json({ success: false, message: error.message });
  }
};

// UPDATE USER CART
const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.userId; // ✅ Get userId from middleware, not body

    console.log("📝 Updating cart - userId:", userId, "itemId:", itemId, "size:", size, "quantity:", quantity);

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.error("❌ Error updating cart:", error);
    res.json({ success: false, message: error.message });
  }
};

// GET USER CART
const getCart = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Get userId from middleware, not body

    console.log("📦 Getting cart for userId:", userId);

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("❌ Error getting cart:", error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getCart };
