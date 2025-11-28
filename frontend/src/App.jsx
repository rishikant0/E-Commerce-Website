import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ShopCartProvider from "./context/ShopContext.jsx";   // ✅ import the provider
import SearchBar from "./components/searchBar.jsx";

import Home from "./pages/home.jsx";
import Collection from "./pages/collection.jsx";
import About from "./pages/about.jsx";
import Login from "./pages/login.jsx";
import Order from "./pages/Order.jsx";
import Product from "./pages/product.jsx";
import Cart from "./pages/cart.jsx";
import PlaceOrder from "./pages/placeOrder.jsx";
// import Hero from "./components/Hero.jsx";
import Contact from "./pages/contact.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ShopCartProvider>   {/* ✅ use the correct provider */}
      <div className="min-h-screen flex flex-col">
        <ToastContainer/>
        <Navbar />
        <SearchBar/>
        {/* <Hero /> */}
        <main className="flex-1 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/order" element={<Order />} />
           <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ShopCartProvider>
  );
};

export default App;