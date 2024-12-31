 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "../../public/css/Navbar.css";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showSignOutMessage, setShowSignOutMessage] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMenuOpen(false); // Ensure menu is open on larger screens
      }
      
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignOut = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      setShowSignOutMessage(true);
      setTimeout(() => {
        setShowSignOutMessage(false);
        router.push("/signin");
      }, 2000); // Show the message for 2 seconds
    }
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        className="navbar z-8"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={navbarVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar-logo">
          <Link
            href="/"
            className="navbar-logo-name flex justify-center items-center"
          >
            <img
              src="/solana3d1.png"
              alt="Logo"
              className="navbar-logo-image"
              draggable="false"
            />
            Solana Wallet
          </Link>
          <button
          className="hamburger-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✖️" : "☰"}
          
        </button>
        </div>
        
        <ul className={`navbar-links ${menuOpen ? "open" : "hidden"}`}>
          {pathname !== "/dashboard" && pathname !== "/account" && (
            <>
              <li>
                <Link
                  href="/price"
                  className={pathname === "/price" ? "active" : ""}
                >
                  Price
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={pathname === "/about" ? "active" : ""}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/signin"
                  className={pathname === "/signin" ? "active" : ""}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className={pathname === "/signup" ? "active" : ""}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
          {(pathname === "/dashboard" || pathname === "/account") && (
            <>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className={pathname === "/dashboard" ? "active" : ""}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className={pathname === "/account" ? "active" : ""}
                >
                  Account
                </Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="signout-button">
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </motion.nav>
      {showSignOutMessage && (
        <div className="signout-message">
          <p>You have signed out successfully.</p>
        </div>
      )}
    </>
  );
};

export default Navbar;
