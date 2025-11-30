"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock, Send,
  Facebook, Instagram, Youtube, CheckCircle, Loader2
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { toast } from 'sonner';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
    toast.success("Message sent successfully!", {
    description: "We will get back to you shortly."
  });
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Get in Touch"
          subtitle="Have a question or want to join? We are here to help."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">

          {/* --- LEFT COLUMN: Info & Map --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-surface border border-border p-6 rounded-2xl hover:border-accent/50 transition duration-300">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border mb-4">
                  <Phone className="text-accent" />
                </div>
                <h3 className="text-white font-semibold text-lg">Phone</h3>
                <p className="text-secondaryText text-sm mt-1">+91 99330 12328</p>
                <p className="text-secondaryText text-sm mt-1">Available (9:00 AM to 12:00 PM)</p>
              </div>

              <div className="bg-surface border border-border p-6 rounded-2xl hover:border-accent/50 transition duration-300">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border mb-4">
                  <Mail className="text-accent" />
                </div>
                <h3 className="text-white font-semibold text-lg">Email</h3>
                <p className="text-secondaryText text-sm mt-1">sijgeria@gmail.com</p>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="bg-surface border border-border p-6 rounded-2xl relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
                   <MapPin className="text-accent" /> Visit Our Club
                 </h3>
                 <p className="text-secondaryText leading-relaxed mb-6">
                   Vill: Sijgeria, P.O: Sijgeria <br />
                   P.S: Debra <br />
                   Dist: Paschim Medinipur <br />
                   PIN: 721139, West Bengal
                 </p>

                 <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                   <Clock className="text-accent" size={18} /> Office Hours
                 </h4>
                 <p className="text-secondaryText text-sm">Every Day: 05:00 PM - 09:00 PM</p>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full pointer-events-none" />
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="bg-surface border border-border p-3 rounded-full text-secondaryText hover:text-white hover:border-accent hover:bg-accent/10 transition-all duration-300">
                  <Icon size={24} />
                </a>
              ))}
            </div>

            {/* Embedded Map (Updated query for Sijgeria, Debra) */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-border relative">
               <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.0545762324873!2d87.65983197469947!3d22.50213543555042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02af00276f99c7%3A0xe3b6d8441e7b5e46!2sSijgeria%20Umesh%20Chandra%20Smriti%20Sangha!5e0!3m2!1sen!2sin!4v1764386292804!5m2!1sen!2sin"
                 width="100%"
                 height="100%"
                 style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                 allowFullScreen
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
               />
            </div>

          </motion.div>

          {/* --- RIGHT COLUMN: Form --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface/50 backdrop-blur-sm border border-border p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondaryText ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondaryText ml-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 ..."
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondaryText ml-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondaryText ml-1">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus !== "idle"}
                className="w-full bg-accent hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formStatus === "idle" && (
                  <>Send Message <Send size={18} /></>
                )}
                {formStatus === "submitting" && (
                  <>Sending... <Loader2 size={18} className="animate-spin" /></>
                )}
                {formStatus === "success" && (
                  <>Message Sent! <CheckCircle size={18} /></>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
