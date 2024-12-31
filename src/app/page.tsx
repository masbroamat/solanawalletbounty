"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Intro from "@/components/Intro";

export default function Home() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showSignInMessage, setShowSignInMessage] = useState(false)

  useEffect(() => {
    const hasAnimationPlayed = localStorage.getItem('animationPlayed');

    if (!hasAnimationPlayed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem('animationPlayed', 'true');
      }, 0);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleSignIn = () => {
    setShowSignInMessage(true)
    setTimeout(() => {
      setShowSignInMessage(false)
      router.push('/signin')
    }, 3000) // Show the message for 3 seconds
  }

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
    <div className="flex flex-col items-center justify-center h-screen w-screen overflow-x-hidden ">
      <Intro />

      <main className="relative z-0 flex flex-col items-center justify-start px-4 sm:px-6 md:px-10 w-full md:w-4/5 h-screen divmain">
        <motion.div 
          className="flex flex-col items-center justify-start w-full pt-16 md:pt-32 sm:gap-6 motiondivmain"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1 className="title text-3xl md:text-4xl lg:text-5xl text-center " variants={itemVariants}>
            Solana Wallet
          </motion.h1>
          <motion.p className="subtitle text-lg md:text-xl lg:text-2xl text-center mt-2" variants={itemVariants}>
            Now supports Phantom Wallet!
          </motion.p>
          <motion.div variants={itemVariants} className="w-full flex justify-center">
            <Button
              className="mt-5 connect-wallet w-full sm:w-auto"
              onClick={handleSignIn}
            >
              <img
                src="/phantomlogo.png"
                alt="Phantom-Logo"
                className="object-cover w-6 h-6 mr-2"
                draggable="false"
              />
              Connect Wallet
            </Button>
          </motion.div>
        </motion.div>
        <div className="w-1/2 h-1/2">
          {/* Placeholder for future content */}
        </div>
      </main>
      {showSignInMessage && (
        <div className="signin-message fixed bottom-4 left-4 right-4 md:left-auto md:right-4 bg-white p-4 rounded-md shadow-md">
          <p>Please sign in before connecting your wallet.</p>
        </div>
      )}
    </div>
  );
}

