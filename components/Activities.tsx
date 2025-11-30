"use client";
import { motion } from "framer-motion";
import { Calendar, Trophy, Heart, Music } from "lucide-react";
import SectionTitle from "./SectionTitle";

const activities = [
  {
    icon: <Trophy className="w-8 h-8 text-accent" />,
    title: "Sports Tournaments",
    desc: "Annual Football and Cricket tournaments fostering local talent and sportsmanship.",
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Social Welfare",
    desc: "Blood donation camps, blanket distribution during winter, and educational support.",
  },
  {
    icon: <Music className="w-8 h-8 text-blue-400" />,
    title: "Cultural Programs",
    desc: "Celebrating Durga Puja, Saraswati Puja, and cultural nights with drama and music.",
  },
  {
    icon: <Calendar className="w-8 h-8 text-green-400" />,
    title: "Community Meetings",
    desc: "Regular discussions to address village issues and development planning.",
  },
];

export default function Activities() {
  return (
    <section id="events" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Our Activities" subtitle="What keeps our club alive throughout the year." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-surface p-6 rounded-2xl border border-border hover:border-accent/50 transition-colors duration-300"
            >
              <div className="bg-background w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-border">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-secondaryText text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
