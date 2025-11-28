import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="w-full mt-32 px-6 md:px-20">

      {/* MAIN GRID */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-16 mb-10 text-sm">

        {/* LOGO + TEXT */}
        <div>
          <img src={assets.logo} className="w-32 mb-5" alt="logo" />
          <p className="text-gray-600 w-full md:w-2/3 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <p className="text-xl font-semibold mb-5">COMPANY</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="cursor-pointer hover:text-gray-800">Home</li>
            <li className="cursor-pointer hover:text-gray-800">About us</li>
            <li className="cursor-pointer hover:text-gray-800">Delivery</li>
            <li className="cursor-pointer hover:text-gray-800">Privacy policy</li>
          </ul>
        </div>

        {/* GET IN TOUCH */}
        <div>
          <p className="text-xl font-semibold mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li>+1-000-000-0000</li>
            <li>greatstackdev@gmail.com</li>
            <li className="cursor-pointer hover:text-gray-800">Instagram</li>
          </ul>
        </div>

      </div>

      {/* DIVIDER */}
      <hr />

      {/* COPYRIGHT */}
      <p className="py-5 text-center text-sm text-gray-600">
        Copyright 2024 © greatstack.dev – All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
