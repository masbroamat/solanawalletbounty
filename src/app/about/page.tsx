"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import "../../../public/css/about.css";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0); // Delay the animation start by 500ms

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <main className="aboutmain">
      <video 
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        muted
        playsInline
        autoPlay
        loop
      >
        <source src="/solanaaboutloop.mp4" type="video/mp4" />
      </video>
      <motion.div 
        className="aboutcontent"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="about" variants={itemVariants}>
          <motion.h1 className=" mb-5" variants={itemVariants}>About</motion.h1>
          <motion.p variants={itemVariants}>
            This project is a comprehensive Solana Wallet Dashboard that
            provides seamless integration with the Phantom Wallet. The dashboard
            allows users to get airdrops and view their Solana balance.
          </motion.p>
        </motion.div>
        
        <motion.div className="container2" variants={itemVariants}>
          <motion.h1 className=" mb-5 mt-10" variants={itemVariants}>Features</motion.h1>
          <motion.ul variants={containerVariants}>
            <motion.li variants={itemVariants}>‣ Connect and disconnect Phantom Wallet.</motion.li>
            <motion.li variants={itemVariants}>‣ View Solana wallet balance.</motion.li>
            <motion.li variants={itemVariants}>
              ‣ Real Time line chart displaying historical SOL/USD & USDT/USD
              price data.
            </motion.li>
            <motion.li variants={itemVariants}>‣ User-friendly interface with real-time updates.</motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>
      <motion.div 
        className="container1"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="authorcontainer" variants={itemVariants}>
          <motion.h1 className=" " variants={itemVariants}>Dev Info</motion.h1>
          <motion.p variants={itemVariants}>
            Name: <br/><strong>Muhammad Syazwan Bin Yacob</strong>
          </motion.p>
          <motion.div className="icons" variants={itemVariants}>
            <motion.p className="mb-2" variants={itemVariants}>Socials:</motion.p>
            <motion.ul variants={containerVariants}>
              <motion.li variants={itemVariants}>
                <Link
                  href="https://github.com/masbroamat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.img
                    src="/githubicon.png"
                    alt="githubicone"
                    className="object-cover w-full h-full"
                    draggable="false"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  href="https://www.linkedin.com/in/syazwan-yacob/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.img
                    src="/linkedinicon.png"
                    alt="linkedinicon"
                    className="object-cover w-full h-full"
                    draggable="false"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
        <motion.div className="container2" variants={itemVariants}>
          <motion.h1 className=" mb-5 mt-10" variants={itemVariants}>Technologies Used</motion.h1>
          <motion.ul variants={containerVariants}>
            <motion.li variants={itemVariants}>‣ Next.js.</motion.li>
            <motion.li variants={itemVariants}>‣ Shadcn/ui.</motion.li>
            <motion.li variants={itemVariants}>‣ Tailwind CSS.</motion.li>
            <motion.li variants={itemVariants}>‣ TradingView Widget.</motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>
    </main>
  );
}

