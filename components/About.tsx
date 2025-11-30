"use client";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Who We Are"
          subtitle="A legacy of brotherhood and social welfare."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              History of Sijgeria Umesh Chandra Smriti Sangha
            </h3>
            <p className="text-secondaryText mb-6 leading-relaxed">
              Established with the vision of uplifting our local community, our
              club has stood as a pillar of strength in Sijgeria. We believe in
              the power of unity, organizing cultural events, sports tournaments,
              and social drives that bring people together.
            </p>
            <p className="text-secondaryText mb-6 leading-relaxed">
              From Durga Puja celebrations to annual football tournaments, we are
              dedicated to preserving our culture while fostering a modern,
              progressive society.
            </p>
          </motion.div>

          {/* Visual / Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-80 rounded-2xl overflow-hidden bg-surface border border-border group"
          >
            {/* 1. The Image Component (Direct Child) */}
            <Image
              src="https://scontent.fccu14-1.fna.fbcdn.net/v/t39.30808-6/467429074_122250421988070764_7327866413069692294_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=R98fcZKePmIQ7kNvwGZGHgX&_nc_oc=AdnRiE31Qzgks7CMgpmXqJTuQN5mnb2miJpLPD5_RDmonv6tRKMUvh-5_dp1k2_PKcg&_nc_zt=23&_nc_ht=scontent.fccu14-1.fna&_nc_gid=aI68Z0OpJh4UK58IvjjA4g&oh=00_AfgjItaJIND_6j-0Fg6_r8FpidEun6m-0EnQ3CZO1DC1Rg&oe=69305E05"
              alt="Club History"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* 2. Overlay Gradient (Optional: Makes image darker for better contrast if needed) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
