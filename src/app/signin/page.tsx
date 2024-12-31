"use client"
import "../../../public/css/signin.css";

import { useState } from 'react'
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


export default function Login() {
  const [email, setEmail] = useState('user@gmail.com')
  const [password, setPassword] = useState('password')
  const [showSignUpMessage, setShowSignUpMessage] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    setShowSignUpMessage(true);
    setTimeout(() => {
      setShowSignUpMessage(false);
      router.push("/dashboard");
    }, 3000); // Show the message for 3 seconds
  };
  
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="relative flex h-screen w-screen items-center bg-cover bg-center bg-no-repeat" 
         style={{
           backgroundImage: `url('/signinbg.png')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}> 
      
      {/* Form Container - Positioned to the right */}
      <motion.div 
        className="z-7 formdiv w-[400px] overflow-hidden rounded-xl border border-white/20 bg-black/20 backdrop-blur-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex flex-col items-center justify-center space-y-3 border-b border-white/10 px-8 py-6 pt-8 text-center"
          variants={itemVariants}
        >
          <motion.h3 
            className="text-2xl font-semibold text-white"
            variants={itemVariants}
          >
            Sign In
          </motion.h3>
          <motion.p 
            className="text-sm text-gray-300"
            variants={itemVariants}
          >
            Use your email and password to sign in
          </motion.p>
        </motion.div>
        
        <form className="px-8 py-6">
          <div className="space-y-5">
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="user@gmail.com"
                className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm border border-white/10 outline-none focus:border-[#8043e0] focus:ring-1 focus:ring-[#8043e0] transition-all duration-200"
                onChange={(e) => setEmail(e.target.value)}
                required 
                value={email}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
                className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm border border-white/10 outline-none focus:border-[#8043e0] focus:ring-1 focus:ring-[#8043e0] transition-all duration-200"
                onChange={(e) => setPassword(e.target.value)}
                required 
                value={password}
              />
            </motion.div>
          </div>

          <motion.div className="mt-6" variants={itemVariants}>
            <button
              type="button"
              onClick={handleSignIn}
              className="block w-full rounded-lg bg-[#8043e0] px-4 py-3 text-center text-sm font-medium text-white hover:bg-[#6c37bd] transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8043e0] focus:ring-offset-2 focus:ring-offset-black"
            >
              Sign In
            </button>
          </motion.div>

          <motion.p 
            className="mt-6 text-center text-sm text-gray-400"
            variants={itemVariants}
          >
            {"Don't have an account? "}
            <Link href="/signup" className="font-medium text-[#8043e0] hover:text-[#6c37bd] transition-colors duration-200">
              Sign up
            </Link>
            {" for free."}
          </motion.p>
        </form>
      </motion.div>
      {showSignUpMessage && (
        <div className="signout-message">
          <p>Successful sign in. Redirecting to dashboard page...</p>
        </div>
      )}
    </div>
  );
}