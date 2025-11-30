"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTitle from "./SectionTitle";

const images = [
  // Replace with your real local or hosted images
  "https://images.unsplash.com/photo-1506185386801-3d7bc0ddd2bf?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop",
];

export default function HomeGallery() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Recent Highlights" subtitle="Capturing the spirit of our community." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] md:h-[400px]">
          {/* Large Main Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 relative rounded-2xl overflow-hidden group"
          >
            <Image
              src={images[0]}
              alt="Highlight 1"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white font-medium">Annual Sports Day</span>
            </div>
          </motion.div>

          {/* Side Column with 2 Images */}
          <div className="flex flex-col gap-6">
            {images.slice(1).map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative flex-1 rounded-2xl overflow-hidden group"
              >
                <Image
                  src={img}
                  alt={`Highlight ${idx + 2}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery">
            <button className="inline-flex items-center gap-2 text-white border-b border-accent hover:text-accent transition-colors pb-1">
              View Full Gallery <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
