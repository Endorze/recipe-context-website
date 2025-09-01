"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLogout } from "../../../lib/auth";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const logout = useLogout()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="block md:hidden bg-[#E63946] text-white p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">
        🍴 Alexander's Recipes
      </Link>

      <button
        onClick={() => setOpen(true)}
        className="space-y-1.5 focus:outline-none"
      >
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="fixed top-0 left-0 h-full w-64 bg-[#E63946] text-white p-6 z-50 shadow-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="mb-6 text-right w-full"
              >
                ✖
              </button>

              <ul className="flex flex-col gap-4 text-lg">
                <li>
                  <Link href="/" onClick={() => setOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/recipes" onClick={() => setOpen(false)}>
                    All Recipes
                  </Link>
                </li>
                <li>
                  <Link href="/profile" onClick={() => setOpen(false)}>
                    My Profile
                  </Link>
                </li>

                <a target="_blank" href="/alexander_hallgren_cv.pdf">Resume/CV</a>
                <button className="text-left" onClick={logout}>Logout</button>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/alexander-hallgren-5a4a501aa/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-gray-600 hover:opacity-80" size={30} />
                  </a>
                  <a href="https://github.com/Endorze" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-gray-800 hover:opacity-80" size={30} />
                  </a>
                  <a href="mailto:alexander.hallgren@edu.futuregames.se" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope className="text-gray-800 hover:opacity-80" size={30} />
                  </a>
                </div>
            </ul>
          </motion.nav>
      </>
        )}
    </AnimatePresence>
    </header >
  );
}
