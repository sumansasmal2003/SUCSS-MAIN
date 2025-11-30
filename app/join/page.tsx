"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Calendar, Heart,
  Users, CheckCircle, Shield, Send, Loader2
} from "lucide-react";
import { toast } from "sonner";
import SectionTitle from "@/components/SectionTitle";

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;

    // Explicitly getting values using names to ensure they match the API Model
    const formData = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      guardianName: (form.elements.namedItem("guardianName") as HTMLInputElement).value,
      dob: (form.elements.namedItem("dob") as HTMLInputElement).value,
      bloodGroup: (form.elements.namedItem("bloodGroup") as HTMLSelectElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Submission failed");

      toast.success("Application Submitted Successfully!", {
        description: "We have received your details. Our committee will review and contact you.",
      });

      form.reset();

    } catch (error) {
      console.error(error);
      toast.error("Submission Failed", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">

        <SectionTitle
          title="Membership Application"
          subtitle="Join the Sijgeria UCSS family and contribute to our legacy."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">

          {/* --- LEFT COLUMN: Benefits --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-surface border border-border p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield size={120} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Why Join Us?</h3>
              <ul className="space-y-4">
                {[
                  "Voting rights in the General Body Meeting.",
                  "Priority access to club hall booking.",
                  "Direct participation in social welfare drives.",
                  "Official Club Identity Card.",
                  "Networking with community leaders."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-accent shrink-0 mt-1" size={18} />
                    <span className="text-secondaryText text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-accent/10 border border-accent/20 p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users size={20} className="text-accent" /> Membership Fees
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-secondaryText text-sm">Admission Fee</span>
                  <span className="text-white font-bold">₹200</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-secondaryText text-sm">Monthly Subscription</span>
                  <span className="text-white font-bold">₹20</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  * Fees are subject to change as per committee decisions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: Form --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-surface/50 backdrop-blur-sm border border-border p-8 md:p-10 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Personal Details</h3>

            <form onSubmit={handleSubmit} className="space-y-8">

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondaryText uppercase ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
                      <input name="fullName" required type="text" placeholder="Your Name" className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-accent transition" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondaryText uppercase ml-1">Father's / Husband's Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
                      <input name="guardianName" required type="text" placeholder="Guardian Name" className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-accent transition" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondaryText uppercase ml-1">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 text-gray-500" size={18} />
                      <input
                        name="dob"
                        required
                        type="date"
                        title="Date of Birth"
                        placeholder="Select your date of birth"
                        className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-accent transition [&::-webkit-calendar-picker-indicator]:invert"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondaryText uppercase ml-1">Blood Group</label>
                    <div className="relative">
                      <Heart className="absolute left-4 top-3.5 text-gray-500" size={18} />
                      <select name="bloodGroup" title="Blood Group" className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-accent transition appearance-none">
                        <option value="">Select Group</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="O+">O+</option>
                        <option value="AB+">AB+</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="O-">O-</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="text-white font-semibold">Contact Information</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondaryText uppercase ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 text-gray-500" size={18} />
                      <input name="phone" required type="tel" placeholder="+91 ..." className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-accent transition" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondaryText uppercase ml-1">Email (Optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
                      <input name="email" type="email" placeholder="you@example.com" className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-accent transition" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondaryText uppercase ml-1">Permanent Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-gray-500" size={18} />
                    <textarea name="address" required rows={3} placeholder="Village, Post Office, District, PIN..." className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-accent transition resize-none"></textarea>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group mt-6"
              >
                {isSubmitting ? (
                  <>Processing... <Loader2 className="animate-spin" size={20} /></>
                ) : (
                  <>Submit Application <Send size={20} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
