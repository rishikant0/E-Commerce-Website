import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const About = () => {
  return (
    // < className="w-full px-6 md:px-20 lg:px-32 py-24 text-gray-800 overflow-hidden">
    <>

      {/* ================= TITLE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <h2 className="text-4xl md:text-5xl font-light tracking-widest">
          ABOUT <span className="font-semibold">FOREVER</span>
        </h2>
        <div className="w-24 h-[2px] bg-black mx-auto mt-4" />
      </motion.div>

      {/* ================= ABOUT SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <motion.img
          src={assets.about_img}
          alt="About Forever"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="rounded-3xl shadow-2xl"
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="space-y-6 text-gray-600 leading-relaxed"
        >
          <p>
            <span className="font-semibold text-gray-900">Forever</span> was born
            from a passion for innovation and a vision to redefine premium online
            shopping. We blend technology, fashion, and craftsmanship.
          </p>

          <p>
            From fashion and lifestyle essentials to modern luxury collections,
            every product is curated with precision and sourced from trusted
            partners.
          </p>

          <div className="p-6 rounded-2xl bg-gray-100 border border-gray-200">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Our Mission
            </h3>
            <p>
              To empower customers with confidence, convenience, and quality —
              delivering a seamless experience from discovery to delivery.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ================= BRAND STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
        {[
          { value: 50000, label: "Happy Customers" },
          { value: 1200, label: "Premium Products" },
          { value: 4.9, label: "Average Rating", decimals: 1 },
          { value: 8, label: "Years of Excellence" },
        ].map((stat, i) => (
          <div
            key={i}
            className="text-center p-8 rounded-2xl bg-gray-100 border border-gray-200"
          >
            <h3 className="text-3xl font-semibold text-black">
              <CountUp
                end={stat.value}
                decimals={stat.decimals || 0}
                duration={2}
                enableScrollSpy
              />
              {stat.value > 10 ? "+" : ""}
            </h3>
            <p className="text-gray-600 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="mb-32">
        <h2 className="text-3xl font-light tracking-wide mb-4">
          WHY <span className="font-semibold">CHOOSE US</span>
        </h2>
        <div className="w-20 h-[2px] bg-black mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Quality Assurance",
              desc: "Strict quality checks ensure durability, comfort, and premium standards.",
            },
            {
              title: "Seamless Convenience",
              desc: "A fast, intuitive shopping experience built for modern users.",
            },
            {
              title: "Dedicated Support",
              desc: "Customer-first service with real humans ready to help.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12 }}
              className="p-8 rounded-3xl bg-white shadow-xl border border-gray-200 transition"
            >
              <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= BRAND JOURNEY ================= */}
      <div className="mb-32">
        <h2 className="text-3xl font-light tracking-wide mb-12">
          OUR <span className="font-semibold">JOURNEY</span>
        </h2>

        <div className="relative border-l-2 border-gray-300 pl-10 space-y-14">
          {[
            { year: "2018", text: "Founded with a vision for premium fashion." },
            { year: "2020", text: "Expanded nationwide with trusted partners." },
            { year: "2023", text: "Crossed 50,000+ happy customers." },
            { year: "2025", text: "Launched luxury-first digital experience." },
          ].map((item, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-black" />
              <h4 className="text-lg font-semibold">{item.year}</h4>
              <p className="text-gray-600 mt-1 max-w-xl">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= DARK GLASS SECTION ================= */}
      <div className="relative mb-32 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

        <div className="relative z-10 px-10 py-24 text-center text-white">
          <h2 className="text-4xl font-light mb-4">
            Designed for <span className="font-semibold">Modern Luxury</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Every detail — from fabric to digital experience — is crafted with
            precision, purpose, and passion.
          </p>
        </div>
      </div>

      {/* ================= SUBSCRIBE ================= */}
      <div className="rounded-3xl bg-black text-white px-10 py-20 text-center shadow-2xl">
        <h2 className="text-3xl font-light mb-3">
          Join Forever & get <span className="font-semibold">20% off</span>
        </h2>
        <p className="text-gray-300 mb-8">
          Be the first to access new drops, exclusive offers & premium updates.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-gray w-full px-6 py-3 rounded-full text-white outline-none"
          />
          <button className="px-10 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition">
            Subscribe
          </button>
        </div>
      </div>

    </>
  );
};

export default About;
