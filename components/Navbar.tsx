"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, Lock } from "lucide-react"; // Added User & Lock icons
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="sticky top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-wider text-accent">
              SUCSS
            </Link>
          </div>

          {/* Desktop Menu & Actions Container */}
          <div className="hidden md:flex md:items-center md:gap-8">

            {/* 1. Navigation Links */}
            <div className="flex items-baseline space-x-6">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                      "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative",
                      isActive
                        ? "text-accent"
                        : "text-secondaryText hover:text-white"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* 2. Action Buttons (Admin, Login, Donate) */}
            <div className="flex items-center gap-3 pl-6 border-l border-border">
              {/* Admin (Icon only to save space) */}
              <Link
                href="/admin"
                className="text-secondaryText hover:text-white transition-colors p-2"
                title="Admin Login"
              >
                <Lock size={18} />
              </Link>

              {/* Member Login */}
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border border-border text-white hover:border-accent hover:text-accent transition-all"
              >
                <User size={16} /> Login
              </Link>

              {/* Donate CTA */}
              <Link
                href="/donate"
                className="bg-accent text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-400 transition shadow-lg shadow-accent/20"
              >
                Donate
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondaryText hover:text-white p-2"
              aria-label="Open Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              {navLinks.map((link) => {
                 const isActive = isLinkActive(link.href);
                 return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                      isActive
                        ? "text-accent bg-surfaceHover"
                        : "text-gray-300 hover:text-white hover:bg-surfaceHover"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Actions Section */}
              <div className="pt-4 mt-2 border-t border-border space-y-3 px-1">
                 <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md text-base font-medium text-white border border-border hover:border-accent hover:text-accent"
                 >
                    <User size={18} /> Member Login
                 </Link>

                 <Link
                    href="/donate"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full bg-accent text-black px-4 py-2 rounded-full text-base font-bold hover:bg-yellow-400 transition shadow-lg shadow-accent/20"
                 >
                    Donate
                 </Link>

                 <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full text-sm text-secondaryText hover:text-white py-2"
                 >
                    <Lock size={14} /> Admin Access
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
