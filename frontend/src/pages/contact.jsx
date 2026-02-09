import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";

const Contact = () => {
  return (
    <div className="w-full px-6 md:px-20 lg:px-32 mt-10">

      {/* HEADER */}
      <h2 className="text-center text-3xl font-semibold tracking-wide mb-12">
        CONTACT <span className="text-gray-700">US</span>
        <div className="w-24 h-[2px] bg-gray-900 mx-auto mt-2"></div>
      </h2>

      {/* MAIN WRAPPER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* LEFT IMAGE */}
        <div className="w-full">
          <img
            src={assets.contact_img}
            alt="Contact"
            className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT - PREMIUM BOX */}
        <div className="bg-white border shadow-md rounded-xl p-10 space-y-8">
          
          {/* STORE HEADING */}
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaLocationDot className="text-gray-700" /> Our Store (India)
            </h3>
            <p className="mt-3 text-gray-700 leading-6">
              Forever Lifestyle Pvt. Ltd. <br />
              102/4 MG Road, <br />
              Bengaluru, Karnataka – 560001, India
            </p>
          </div>

          {/* PHONE */}
          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-gray-800 mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Call Us</p>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-start gap-4">
            <HiMail className="text-gray-800 mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <p className="text-gray-600">support@forever.in</p>
            </div>
          </div>

          {/* CAREERS */}
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-lg">
              <MdWork /> Careers at Forever
            </h3>
            <p className="text-gray-600 mt-2">
              Join our passionate teams and build your career with us.
            </p>

            <button className="mt-4 border border-gray-800 px-6 py-2 text-sm font-medium rounded-md hover:bg-gray-900 hover:text-white transition-all">
              Explore Jobs
            </button>
          </div>

        </div>
      </div>

      {/* SUBSCRIBE SECTION */}
      <div className="text-center mt-24 mb-20">
        <h2 className="text-2xl font-semibold mb-2">
          Subscribe now & get <span className="text-black">20% off</span>
        </h2>
        <p className="text-gray-500 mb-6">
          Get updates on new arrivals, special offers & premium deals!
        </p>

        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-[350px] md:w-[450px] px-4 py-3 border border-gray-400 rounded-l-lg focus:outline-none"
          />
          <button className="px-8 py-3 bg-black text-white rounded-r-lg hover:bg-gray-900 transition">
            SUBSCRIBE
          </button>
        </div>
      </div>

    </div>
  );
};

export default Contact;
