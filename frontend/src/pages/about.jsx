import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="w-full px-6 md:px-20 lg:px-28 mt-10">

      {/* ABOUT TITLE */}
      <h2 className="text-center text-3xl font-semibold tracking-wide mb-12">
        ABOUT <span className="text-gray-700">US</span>
        <div className="w-20 h-[2px] bg-gray-800 mx-auto mt-2"></div>
      </h2>

      {/* ABOUT SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT IMAGE */}
        <img
          src={assets.about_img} 
          alt="About"
          className="rounded-md shadow-md w-full object-cover"
        />

        {/* RIGHT CONTENT */}
        <div className="text-gray-700 leading-7">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p className="mt-4">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>

          <h3 className="mt-6 font-semibold text-lg">Our Mission</h3>
          <p className="mt-2">
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We’re dedicated to providing a seamless
            shopping experience that exceeds expectations — from browsing and
            ordering, to delivery and beyond.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold">
          WHY <span className="text-gray-700">CHOOSE US</span>
        </h2>
        <div className="w-20 h-[2px] bg-gray-800 mt-1"></div>
      </div>

      {/* BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 border shadow-sm">
        
        {/* BOX 1 */}
        <div className="p-10 border-r">
          <h3 className="font-semibold mb-2">Quality Assurance:</h3>
          <p className="text-gray-600 leading-6">
            We meticulously select and vet each product to ensure it meets our stringent
            quality standards.
          </p>
        </div>

        {/* BOX 2 */}
        <div className="p-10 border-r">
          <h3 className="font-semibold mb-2">Convenience:</h3>
          <p className="text-gray-600 leading-6">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>

        {/* BOX 3 */}
        <div className="p-10">
          <h3 className="font-semibold mb-2">Exceptional Customer Service:</h3>
          <p className="text-gray-600 leading-6">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>

      </div>

      {/* SUBSCRIBE SECTION */}
      <div className="text-center mt-20 mb-20">
        <h2 className="text-2xl font-semibold mb-2">
          Subscribe now & get <span className="text-black">20% off</span>
        </h2>
        <p className="text-gray-500 mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>

        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-[400px] px-4 py-3 border border-gray-400 rounded-l-md"
          />
          <button className="px-8 py-3 bg-black text-white rounded-r-md">
            SUBSCRIBE
          </button>
        </div>
      </div>

    </div>
  );
};

export default About;
