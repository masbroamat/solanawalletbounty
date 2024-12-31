"use client"

import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppWalletProvider from "@/components/AppWalletProvider";
import { useEffect } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    const video = document.getElementById("background-video") as HTMLVideoElement;
    if (video) {
      setTimeout(() => {
        video.play();
      }, 11000); // 8.7 seconds
    }
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Solana Wallet App</title>
        <meta name="description" content="A full-featured Solana wallet with Phantom integration" /> 
      </head>
      <body className={montserrat.className}>
      <AppWalletProvider>
      
        {children}
        </AppWalletProvider>
        <Navbar />
      </body>
    </html>
  );
}
