"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionTitle from "./SectionTitle";

const testimonials = [
  {
    text: "Sijgeria Club has given the youth a platform to showcase their talent in sports. The annual tournament is the highlight of our year.",
    author: "Rohan Das",
    role: "Senior Player",
  },
  {
    text: "Their social welfare drives during winter are a blessing for the elderly in our village. True service to humanity.",
    author: "Anjali Roy",
    role: "Local Resident",
  },
  {
    text: "I have been a member for 10 years. The brotherhood and unity here are unmatched. Proud to be part of SUCSS.",
    author: "Amit Mandal",
    role: "Committee Member",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-surface/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Community Voices" subtitle="What people say about our efforts." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-background border border-border p-8 rounded-2xl relative"
            >
              <Quote className="absolute top-6 right-6 text-accent/20" size={40} />
              <p className="text-gray-300 italic mb-6 leading-relaxed">"{item.text}"</p>
              <div>
                <h4 className="text-white font-bold">{item.author}</h4>
                <p className="text-accent text-sm">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
