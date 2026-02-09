import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();

const ShopCartProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backandUrl = import.meta.env.VITE_BACKAND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(() => {
    // Initialize token from localStorage on first load
    const stored = localStorage.getItem('token');
    const token = stored ? stored.trim() : '';
    console.log("📦 Token initialized from localStorage:", token ? token.substring(0, 20) + "..." : "EMPTY");
    return token;
  });
  const navigate = useNavigate();

  // ADD TO CART
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select the size");
      return;
    }

    let cartData = structuredClone(cartItems);

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

    setCartItems(cartData);

    if(token){
      try{
        console.log("\n🛒 ===== ADDING TO CART =====");
        console.log("📦 Item ID:", itemId);
        console.log("📦 Size:", size);
        console.log("🔑 Token exists:", !!token);
        console.log("🔑 Token preview:", token.substring(0, 50) + "...");
        console.log("🔑 Token length:", token.length);
        console.log("📡 Sending to:", backandUrl + "/api/cart/add");
        
        const response = await axios.post(
          backandUrl + "/api/cart/add",
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log("✅ Response received:", response.data);
        console.log("🛒 ===== ADD TO CART SUCCESS =====\n");
        toast.success("Item added to cart!");
      }catch(error){
        console.error("\n❌ ===== ADD TO CART FAILED =====");
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
          console.error("Response headers:", error.response.headers);
        }
        if (error.request) {
          console.error("Request was sent but no response received");
          console.error("Request headers:", error.request._header);
        }
        console.error("Full error:", error);
        console.error("❌ ===== END ERROR =====\n");
        toast.error("Error adding to cart: " + error.message);
      }
    } else {
      console.warn("⚠️ No token available - user not logged in");
      toast.error("Please login to add items to cart");
    }
  };

  // CART COUNT
  const getCartCount = () => {
    let total = 0;

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        total += cartItems[productId][size];
      }
    }

    return total;
  };

  // UPDATE QUANTITY
const updateQuantity = async (itemId, size, quantity) => {
  let cartData = structuredClone(cartItems);
  cartData[itemId][size] = quantity;
  setCartItems(cartData);

  if (token) {
    try {
      await axios.post(
        backandUrl + "/api/cart/update",
        { itemId, size, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.log("Error updating cart:", error);
      toast.error("Error updating cart: " + error.message);
    }
  }
};


  // FIXED CART TOTAL AMOUNT
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {
      const itemInfo = products.find(p => p._id === productId);

      if (!itemInfo) continue;

      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];

        if (qty > 0) {
          totalAmount += itemInfo.price * qty;
        }
      }
    }

    return totalAmount;
  };


  const getProductsData = async() =>{
    try {
      const response = await axios.get(backandUrl + "/api/product/list");
      if (response.data.success) {
        // Normalize backend `images` field to frontend `image` to keep compatibility
        const normalized = response.data.products.map(p => ({
          ...p,
          image: p.images || p.image || [],
        }));
        setProducts(normalized);
      } else {
        console.log("Failed to fetch products:", response.data.message);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      toast.error(error.message);
    }
  }

const getUsercart = async (token) => {
  try {
    console.log("🔍 Attempting to get cart with token:", token ? token.substring(0, 20) + "..." : "NO TOKEN");
    
    if (!token) {
      console.warn("⚠️ No token available for cart request");
      return;
    }

    const response = await axios.post(
      backandUrl + "/api/cart/get",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      console.log("✅ Cart loaded successfully");
      setCartItems(response.data.cartData);
    }
  } catch (error) {
    console.error("❌ Error fetching cart data:", error);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    toast.error("Error fetching cart data: " + error.message);
  }
};

// GET USER PROFILE
const getUserProfile = async (token) => {
  try {
    if (!token) {
      console.warn("⚠️ No token available for profile request");
      return null;
    }

    const response = await axios.post(
      backandUrl + "/api/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      console.log("✅ User profile loaded successfully");
      return response.data.user;
    } else {
      toast.error(response.data.message || "Failed to load profile");
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    toast.error("Error loading profile: " + error.message);
    return null;
  }
};

// UPDATE USER PROFILE
const updateUserProfile = async (token, profileData) => {
  try {
    if (!token) {
      toast.error("Please login first");
      return null;
    }

    const response = await axios.put(
      backandUrl + "/api/user/profile",
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success("Profile updated successfully!");
      return response.data.user;
    } else {
      toast.error(response.data.message || "Failed to update profile");
      return null;
    }
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    toast.error("Error updating profile: " + error.message);
    return null;
  }
};

    
  useEffect(() => {
    getProductsData();
  }, []);

  // Load cart when token is available
  useEffect(() => {
    if (token) {
      console.log("🚀 Token changed, loading cart:", token.substring(0, 20) + "...");
      getUsercart(token);
    } else {
      console.log("⚠️ No token available");
    }
  }, [token]);
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backandUrl,
    setToken,
    token,
    getUserProfile,
    updateUserProfile
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopCartProvider;
