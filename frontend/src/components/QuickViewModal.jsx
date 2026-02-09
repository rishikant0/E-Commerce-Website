// src/components/QuickViewModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const QuickViewModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-6 w-[92%] max-w-2xl shadow-xl"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={item?.image?.[0]} alt={item?.name} className="w-full h-64 object-cover rounded-lg" />
            <div className="py-2">
              <h2 className="text-2xl font-semibold">{item?.name}</h2>
              <p className="text-gray-600 mt-2">₹{item?.price}</p>
              <p className="text-sm text-gray-500 mt-3">{item?.description || "Premium product details."}</p>

              <div className="mt-6 space-y-3">
                <div className="flex gap-2">
                  <button className="flex-1 bg-black text-white py-3 rounded-full">Add to Cart</button>
                  <button className="flex-1 border py-3 rounded-full">Wishlist</button>
                </div>
                <button onClick={onClose} className="w-full mt-2 py-3 text-sm text-gray-600">Close</button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
