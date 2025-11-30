"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 bg-accent transform -skew-y-2 origin-top-left scale-110 z-0" />
      <div className="absolute inset-0 bg-black/10 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight"
        >
          Ready to make a difference?
        </motion.h2>
        <p className="text-black/80 text-lg max-w-2xl mx-auto mb-10 font-medium">
          Join 150+ members in our journey to uplift Sijgeria through culture and service. Your support matters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/join">
            <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
              Join the Club <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/donate">
            <button className="bg-white text-black border-2 border-black px-8 py-4 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-colors">
              Make a Donation
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
