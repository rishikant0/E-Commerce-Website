import { motion } from "framer-motion";

const PromoMarquee = () => {
  return (
    <section className="relative bg-[#F5F1EB] overflow-hidden">
      <motion.div
        className="flex items-center whitespace-nowrap py-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-24 px-16">
            <PromoItem />
            <PromoItem />
            <PromoItem />
            <PromoItem />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

const PromoItem = () => (
  <div className="flex items-center gap-6">
    <span className="text-sm tracking-[0.4em] uppercase text-[#C2A878]">
      Limited Time
    </span>

    <span className="text-5xl md:text-6xl font-light text-[#1F1F1F]">
      30% OFF
    </span>

    <span className="italic text-lg text-gray-600">
      Latest Collection
    </span>

    <span className="w-2 h-2 rounded-full bg-black/40" />
  </div>
);

export default PromoMarquee;
