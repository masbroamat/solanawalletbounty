"use client";
import "../../../public/css/price.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Solusd from "@/components/price/solusd";
import Usdtusd from "@/components/price/Usdtusd";

export default function Page() {
  const [selectedPair, setSelectedPair] = useState("SOL/USD");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <video
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        muted
        playsInline
        autoPlay
        loop
      >
        <source src="/solanapricechart.mp4" type="video/mp4" />
      </video>
      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex  divmain"
      >
        <motion.div className="priceChart " variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPair}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {selectedPair === "SOL/USD" ? <Solusd /> : <Usdtusd />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <motion.div className="sidebar     " variants={itemVariants}>
          <motion.h3 className=" font-bold mb-4" variants={itemVariants}>
            Crypto Pairs
          </motion.h3>
          <ul className="sidebarbuttons space-y-2">
            <motion.li variants={itemVariants}>
              <motion.button
                className={`pair-button w-full py-2 px-4 ${
                  selectedPair === "SOL/USD"
                    ? "bg-gray-600 bg-opacity-25 text-white "
                    : "bg-transparent"
                }`}
                onClick={() => setSelectedPair("SOL/USD")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1 }}
              >
                SOL/USD
              </motion.button>
            </motion.li>
            <motion.li variants={itemVariants}>
              <motion.button
                className={`pair-button w-full py-2 px-4 ${
                  selectedPair === "USDT/USD"
                    ? "bg-gray-600 bg-opacity-25 text-white"
                    : "bg-transparent"
                }`}
                onClick={() => setSelectedPair("USDT/USD")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1 }}
              >
                USDT/USD
              </motion.button>
            </motion.li>
          </ul>
        </motion.div>
      </motion.main>
    </>
  );
}
