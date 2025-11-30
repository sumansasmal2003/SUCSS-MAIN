"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionTitle from "./SectionTitle";

const faqs = [
  { question: "How can I become a member?", answer: "You can apply for membership by visiting the club premises or filling out the form on our Join Us page. Membership is open to all local residents." },
  { question: "Is there an entry fee for the Football Tournament?", answer: "Yes, there is a nominal entry fee per team. Please check the Events page for specific details regarding this year's tournament." },
  { question: "Can I book the club hall for private events?", answer: "Yes, the hall is available for booking. Please contact the secretary at least 2 weeks in advance." },
  { question: "How can I donate?", answer: "We accept donations via Bank Transfer and UPI. Visit our Donate page for details." },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle title="Frequently Asked Questions" />

        <div className="space-y-4 mt-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-surface border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-surfaceHover transition-colors"
              >
                <span className="text-white font-medium">{faq.question}</span>
                {activeIndex === idx ? <Minus className="text-accent" /> : <Plus className="text-secondaryText" />}
              </button>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-6 text-secondaryText text-sm leading-relaxed border-t border-border/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
