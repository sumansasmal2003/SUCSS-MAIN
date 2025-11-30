"use client";
import { motion } from "framer-motion";
import { Users, Calendar, Trophy, HeartHandshake } from "lucide-react";

const stats = [
  { label: "Active Members", value: "150+", icon: Users },
  { label: "Years of Legacy", value: "60+", icon: Calendar },
  { label: "Events per Year", value: "12+", icon: Trophy },
  { label: "Lives Impacted", value: "5000+", icon: HeartHandshake },
];

export default function Stats() {
  return (
    <section className="py-12 bg-accent/5 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-3 p-3 bg-surface rounded-full border border-border group-hover:border-accent group-hover:bg-accent/10 transition-colors duration-300">
                <stat.icon size={24} className="text-accent" />
              </div>
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</h4>
              <p className="text-secondaryText text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
