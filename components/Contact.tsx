"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2, Clock } from "lucide-react";
import { toast } from "sonner"; // Ensure you have installed sonner
import SectionTitle from "./SectionTitle";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a network request (Replace this with your actual API call later)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully!", {
      description: "We will get back to you shortly.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 bg-surface/30 relative overflow-hidden">

      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title="Contact Us" subtitle="Get in touch or visit our club premises." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">

          {/* --- Left Column: Contact Info & Map --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Info Card */}
            <div className="bg-surface border border-border p-8 rounded-2xl shadow-xl shadow-black/20 hover:border-accent/30 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-white mb-8">Club Information</h3>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-5">
                  <div className="bg-background p-3 rounded-xl border border-border shrink-0 text-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">Location</h4>
                    <p className="text-secondaryText leading-relaxed">
                      Vill & P.O: Sijgeria, P.S: Debra <br />
                      Dist: Paschim Medinipur <br />
                      PIN: 721139, West Bengal
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="bg-background p-3 rounded-xl border border-border shrink-0 text-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">Phone</h4>
                    <p className="text-secondaryText hover:text-white transition-colors cursor-pointer">
                      +91 99330 12328
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded w-fit">
                      <Clock size={12} /> Available 9:00 AM - 12:00 PM
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="bg-background p-3 rounded-xl border border-border shrink-0 text-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">Email</h4>
                    <p className="text-secondaryText hover:text-white transition-colors cursor-pointer">
                      sijgeria@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="h-64 rounded-2xl overflow-hidden border border-border bg-surface relative group">
              {/* Note: Update this src with the specific embed link for your exact location from Google Maps */}
              <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.0545762324873!2d87.65983197469947!3d22.50213543555042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02af00276f99c7%3A0xe3b6d8441e7b5e46!2sSijgeria%20Umesh%20Chandra%20Smriti%20Sangha!5e0!3m2!1sen!2sin!4v1764386292804!5m2!1sen!2sin"
                 width="100%"
                 height="100%"
                 style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                 allowFullScreen
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
               />
              <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
            </div>
          </motion.div>

          {/* --- Right Column: Form --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface/50 backdrop-blur-sm border border-border p-8 md:p-10 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
            <p className="text-secondaryText text-sm mb-8">
              Have a question about membership, events, or donations? Fill out the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondaryText ml-1">Full Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondaryText ml-1">Email Address</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondaryText ml-1">Subject</label>
                <input
                  required
                  name="subject"
                  type="text"
                  placeholder="Inquiry about..."
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondaryText ml-1">Message</label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <>Sending... <Loader2 className="animate-spin" size={20} /></>
                ) : (
                  <>Send Message <Send size={20} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
