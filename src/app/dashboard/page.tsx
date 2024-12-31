"use client";

import "../../../public/css/dashboard.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPublicKeyVisible, setIsPublicKeyVisible] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const buttonStyle = {
    backgroundColor: isHovered ? "#ab9ff2" : "transparent",
    color: isHovered ? "white" : "#ab9ff2",
    padding: "15px 25px",
    borderRadius: "10px",
    fontSize: "16px",
    border: `1px solid ${isHovered ? "#ab9ff2" : "#ab9ff2"}`,
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  };

  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  };

  const getAirdropOnClick = async () => {
    try {
      if (!publicKey) {
        throw new Error("Wallet is not Connected");
      }
      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL),
      ]);
      const sigResult = await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed"
      );
      if (sigResult) {
        alert("Airdrop was confirmed!");
      }
    } catch {
      alert("You are Rate limited for Airdrop");
    }
  };

  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
        setTimeout(getBalanceEvery10Seconds, 10000);
      })();
    }
  }, [publicKey, connection]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
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
    <motion.main
      className="dashboard-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Image
        src="/solanavault.png"
        alt="Background"
        className="background-image"
        layout="fill"
        objectFit="cover"
        draggable="false"
      />

      <motion.div className="dashboardmain text-5xl z-1" variants={containerVariants}>
        <motion.div className="header" variants={itemVariants}>
          <h1>Dashboard</h1>
          <motion.div
            className="buttondiv"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={itemVariants}
          >
            <WalletMultiButton style={buttonStyle} />
          </motion.div>
        </motion.div>
        <motion.div className="address" variants={itemVariants}>
          {publicKey ? (
            <motion.div className="addresscontent" variants={containerVariants}>
              <motion.div className="infodiv" variants={itemVariants}>
                <div className="publickey">
                  <div className="headerkey">
                    <h2>Wallet Address:</h2>
                    <span
                      onClick={() => copyToClipboard(publicKey.toString())}
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                        color: copySuccess ? "#bebebea0" : "inherit",
                      }}
                      title="Copy to clipboard"
                    >
                      <FaCopy />
                    </span>
                    {copySuccess && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          position: "absolute",
                          color: "white",
                          fontSize: "12px",
                          marginTop: "10px",
                          marginLeft: "5px",
                          top: "-35px",
                          right: "0px", 
                        }}
                      >
                        Address copied to clipboard!
                      </motion.p>
                    )}
                  </div>
                  <div className="input-with-icon">
                    <input
                      type={isPublicKeyVisible ? "text" : "password"}
                      value={publicKey.toString()}
                      className="custom-input"
                      readOnly
                    />
                    <span
                      onClick={() => setIsPublicKeyVisible(!isPublicKeyVisible)}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    >
                      {isPublicKeyVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <div className="balance">
                  <h3>Balance:</h3>
                  <div className="input-with-icon">
                    <input
                      type={isBalanceVisible ? "text" : "password"}
                      value={balance + " SOL"}
                      className="custom-input"
                      readOnly
                    />
                    <span
                      onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    >
                      {isBalanceVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="airdropbuttondiv"
                variants={itemVariants}
              >
                <motion.button
                  onClick={getAirdropOnClick}
                  // style={airdropButtonStyle}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.95 }}
                  className="airdrop-button"
                >
                  Get Airdrop
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div className="notconnect" variants={itemVariants}>
              <h2>Wallet is not connected</h2>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.main>
  );
}

