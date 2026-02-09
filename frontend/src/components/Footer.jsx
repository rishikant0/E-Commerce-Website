// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter, FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white mt-24 px-6 md:px-20 lg:px-32 pt-20 pb-10 overflow-hidden">

      {/* Top glass border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* Brand */}
        <div>
          <h2 className="text-4xl font-light tracking-widest bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            FOREVER
          </h2>
          <p className="text-gray-400 mt-4 leading-relaxed">
            Premium clothing designed for elegance, comfort and the modern lifestyle.
          </p>

          <div className="flex gap-5 mt-6">
            {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, index) => (
              <div
                key={index}
                className="p-2 rounded-full border border-white/10 hover:border-white/30 hover:scale-110 transition-all cursor-pointer"
              >
                <Icon className="text-lg hover:text-gray-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-medium mb-5">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li><Link to="/collection" className="hover:text-white transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-medium mb-5">Customer Support</h3>
          <p className="text-gray-400">102/4 MG Road, Bengaluru</p>
          <p className="text-gray-400 mt-3">support@forever.in</p>
          <p className="text-gray-400 mt-1">+91 91765 43210</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-medium mb-5">Stay Updated</h3>
          <p className="text-gray-400 mb-4">
            Subscribe for new drops & exclusive offers.
          </p>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent flex-1 outline-none text-sm text-white placeholder-gray-500"
            />
            <button className="ml-3 text-sm px-4 py-1 rounded-full bg-white text-black hover:bg-gray-200 transition flex items-center gap-2">
              Join <FaArrowRight />
            </button>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="h-[1px] bg-white/10 my-10" />

      {/* Bottom */}
      <div className="text-center text-gray-500 text-sm tracking-wide">
        © {new Date().getFullYear()} FOREVER — Crafted with elegance. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
