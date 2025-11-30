"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background relative overflow-hidden">

      {/* Background Ambient Glow (Consistent with Hero) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 max-w-2xl mx-auto"
      >
        {/* Icon & Big Text */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="bg-surface border border-border p-6 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.1)]">
             <AlertTriangle className="w-16 h-16 text-accent" />
          </div>
        </motion.div>

        <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter mb-4 opacity-90">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-secondaryText text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Oops! It looks like you've wandered off the pitch. The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" passHref>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-accent hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 cursor-pointer shadow-lg shadow-accent/20"
            >
              <Home size={20} />
              Return Home
            </motion.span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-surface hover:bg-surfaceHover border border-border text-white font-medium py-3 px-8 rounded-full transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

      </motion.div>
    </main>
  );
}
