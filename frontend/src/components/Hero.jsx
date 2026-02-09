import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import QuickViewModal from "./QuickViewModal";

const Hero = () => {
  const [quickViewItem, setQuickViewItem] = useState(null);

  return (
    <section className="relative min-h-[90vh] overflow-hidden rounded-[2.5rem] border border-black/5 shadow-[0_40px_120px_rgba(0,0,0,0.15)] text-[#1F1F1F]">

      {/* ===== VIDEO BACKGROUND ===== */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4 }}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </motion.video>

      {/* ===== LIGHT PINK OVERLAY ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDECEC]/90 via-[#F7DCDC]/80 to-[#F3CFCF]/90" />

      {/* NOISE */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04]" />

      {/* PINK AURORA */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-pink-300/40 blur-[180px] rounded-full"
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-rose-200/40 blur-[200px] rounded-full"
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 px-10 lg:px-24 py-28">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="space-y-12 max-w-xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/70 border border-black/10 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="tracking-[0.3em] text-[11px] text-rose-500">
              LUXURY EDIT
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-light leading-[1.1]">
            <span className="block text-[#1F1F1F]/80">Redefine</span>
            <span className="relative inline-block bg-gradient-to-r from-rose-400 via-[#1F1F1F] to-rose-500 bg-clip-text text-transparent">
              Premium Style
              <span className="absolute -bottom-3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent" />
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#444] text-lg leading-relaxed max-w-lg">
            Fashion engineered with elegance and precision — designed for modern
            sophistication and effortless luxury.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-2">
            {[
              { value: "50K+", label: "Customers" },
              { value: "4.9★", label: "Rating" },
              { value: "100%", label: "Quality" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/70 backdrop-blur border border-black/10 p-4 text-center hover:bg-white transition"
              >
                <p className="text-xl font-semibold">{stat.value}</p>
                <p className="text-xs text-gray-600 tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-6 pt-6">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              className="px-12 py-3 rounded-full bg-[#1F1F1F] text-white font-medium tracking-wide shadow-lg"
            >
              Shop Collection
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              className="px-12 py-3 rounded-full border border-black/20 bg-white/60 backdrop-blur"
              onClick={() =>
                setQuickViewItem({
                  name: "Luxury Edition",
                  price: 1499,
                  image: [assets.hero_img],
                })
              }
            >
              Quick View
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT PRODUCT */}
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareEnable
          glareMaxOpacity={0.2}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative"
          >
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-pink-300/30 blur-[80px] rounded-3xl" />

            <img
              src={assets.hero_img}
              alt="Luxury Product"
              className="relative w-[85%] rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.25)]"
            />
          </motion.div>
        </Tilt>
      </div>

      {/* MODAL */}
      <QuickViewModal
        item={quickViewItem}
        onClose={() => setQuickViewItem(null)}
      />
    </section>
  );
};

export default Hero;
