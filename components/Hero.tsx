"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* Background Gradient Spotlights */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-4xl"
      >
        <span className="text-accent font-medium tracking-widest text-sm uppercase mb-4 block">
          Est. 1964 • Sijgeria, West Bengal
        </span>

        <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white leading-tight">
          Sijgeria Umesh Chandra <br />
          <span className="bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
            Smriti Sangha
          </span>
        </h1>

        <p className="text-secondaryText text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Uniting the community through culture, sports, and social welfare.
          Join us in our journey of legacy and brotherhood.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/join" passHref>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition cursor-pointer"
            >
              Become a Member
            </motion.span>
          </Link>

          <Link href="/gallery" passHref>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block border border-border text-white px-8 py-3 rounded-full font-semibold hover:bg-surface transition cursor-pointer"
            >
              Explore Gallery
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
