"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Intro() {
  const [showIntro, setShowIntro] = useState(true);
  const introVideoRef = useRef(null);
  const loopVideoRef = useRef(null);
  const [showLoopVideo, setShowLoopVideo] = useState(false); 

  useEffect(() => {
    const hasIntroBeenShown = localStorage.getItem('introShown')
    if (!hasIntroBeenShown) {
      setShowIntro(true)
      localStorage.setItem('introShown', 'true')
    }
  }, []);

  // useEffect(() => {
  //   // Set a timer to hide the intro after 1 second
  //   const timer = setTimeout(() => {
  //     setShowIntro(false);
  //   }, 1000);

  //   // Cleanup the timer on component unmount
  //   return () => clearTimeout(timer);
  // }, []);

  const handleIntroVideoEnd = () => {
    setShowLoopVideo(true);
  };

  return (
    <motion.div 
      className="absolute w-screen h-screen overflow-hidden"
      initial={{ zIndex: -1, opacity: 1 }}
      animate={{ 
        zIndex: showLoopVideo ? -1 : -1,
        opacity: showLoopVideo ? 1 : 1
      }}
      transition={{ 
        zIndex: { delay: 1 }, // Delay the z-index change
        opacity: { duration: 1 } // 1-second fade transition
      }}
    >
      {/* Intro Video */}
      {showIntro && 
      <video
        ref={introVideoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        autoPlay
        onEnded={handleIntroVideoEnd}
      >
        <source src="/solanaintro1.mp4" type="video/mp4" />
      </video>}

      {/* Loop Video */}
      {showLoopVideo && (
        <video
          ref={loopVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          autoPlay
          loop
        >
          <source src="/solanaloop.mp4" type="video/mp4" />
        </video>
      )}
    </motion.div>
  );
}

