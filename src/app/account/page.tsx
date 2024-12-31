"use client";

import "../../../public/css/account.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function AccountPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPublicKeyVisible, setIsPublicKeyVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);

  const [userData, setUserData] = useState({
    email: "user@gmail.com",
    password: "password",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (publicKey) {
      (async function getBalance() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
      })();
    }
  }, [publicKey, connection]);

  const buttonStyle = {
    backgroundColor: isHovered ? "#8043e0" : "transparent",
    color: isHovered ? "white" : "#8043e0",
    padding: "15px 25px",
    borderRadius: "10px",
    fontSize: "16px",
    border: `1px solid ${isHovered ? "#8043e0" : "#8043e0"}`,
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  };

  const handleUpdateInfo = (e: React.FormEvent) => {
    e.preventDefault();
    alert("User information updated!");
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.1,
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
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 overflow-hidden">
      <motion.div
        className="container mx-auto max-w-2xl pt-12"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden mt-8"
          variants={itemVariants}
        >
          {/* Header with Wallet Button */}
          <motion.div 
            className="p-8 border-b border-white/10 flex justify-between items-center topheader"
            variants={itemVariants}
          >
            <div>
              <motion.h2 
                className=" font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Account Information
              </motion.h2>
              <motion.p 
                className="mt-2 text-gray-400 subtitle"
                variants={itemVariants}
              >
                View and edit your account details
              </motion.p>
            </div>
            <motion.div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <WalletMultiButton style={buttonStyle} />
            </motion.div>
          </motion.div>

          {/* Form Content */}
          <motion.div className="p-8" variants={itemVariants}>
            <form onSubmit={handleUpdateInfo}>
              <motion.div className="space-y-6" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <Label className="text-gray-300 text-sm uppercase tracking-wide">
                    Email
                  </Label>
                  <Input
                    required
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="mt-2 w-full bg-white/5 border-white/10 text-white focus:border-[#8043e0] focus:ring-1 focus:ring-[#8043e0] rounded-lg"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Label className="text-gray-300 text-sm uppercase tracking-wide">
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Input
                    required
                      type={showPassword ? "text" : "password"}
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                      className="w-full bg-white/5 border-white/10 text-white focus:border-[#8043e0] focus:ring-1 focus:ring-[#8043e0] rounded-lg pr-10"
                    />
                    <motion.button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </motion.button>
                  </div>
                </motion.div>

                {publicKey && (
                  <>
                    <motion.div variants={itemVariants}>
                      <Label className="text-gray-300 text-sm uppercase tracking-wide flex items-center justify-between">
                        Wallet Address
                        <motion.span
                          onClick={() => copyToClipboard(publicKey.toString())}
                          className="cursor-pointer text-gray-400 hover:text-white transition-colors"
                          title="Copy to clipboard"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaCopy />
                        </motion.span>
                      </Label>
                      <div className="relative mt-2">
                        <Input
                          type={isPublicKeyVisible ? "text" : "password"}
                          value={publicKey.toString()}
                          readOnly
                          className="w-full bg-white/5 border-white/10 text-white focus:border-[#8043e0] focus:ring-1 focus:ring-[#8043e0] rounded-lg pr-10 font-mono text-sm"
                        />
                        <motion.button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                          onClick={() =>
                            setIsPublicKeyVisible(!isPublicKeyVisible)
                          }
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isPublicKeyVisible ? <FaEyeSlash /> : <FaEye />}
                        </motion.button>
                        <AnimatePresence>
                          {copySuccess && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute right-5 -bottom-6 text-gray-400 text-sm mt-1"
                            >
                              Address copied to clipboard!
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Label className="text-gray-300 text-sm uppercase tracking-wide">
                        Balance
                      </Label>
                      <Input
                        type="text"
                        value={`${balance} SOL`}
                        readOnly
                        className="mt-2 w-full bg-white/5 border-white/10 text-white focus:border-[#8043e0] focus:ring-1 focus:ring-[#8043e0] rounded-lg font-mono text-sm"
                      />
                    </motion.div>
                  </>
                )}
              </motion.div>

              {/* Actions */}
              <motion.div 
                className="mt-8 flex flex-col space-y-4"
                variants={containerVariants}
              >
                <motion.button
                  type="submit"
                  className="w-full bg-[#8043e0] hover:bg-[#6c37bd] text-white py-2.5 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Update Information
                </motion.button> 
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

