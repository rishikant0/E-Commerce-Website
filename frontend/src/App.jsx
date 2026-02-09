import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ShopCartProvider from "./context/ShopContext.jsx";   // ✅ CORRECT
import SearchBar from "./components/SearchBar.jsx";

import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/placeOrder.jsx";
import Contact from "./pages/Contact.jsx";
import Order from "./pages/Order.jsx";   // ✅ CORRECT

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ShopCartProvider>
      <div className="min-h-screen flex flex-col">
        <ToastContainer />
        <Navbar />
        <SearchBar />

        <main className="flex-1 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />

            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />

            <Route path="/orders" element={<Order />} /> {/* ✅ FIXED */}
          </Routes>
        </main>

        <Footer />
      </div>
    </ShopCartProvider>
  );
};

export default App;
