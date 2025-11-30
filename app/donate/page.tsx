"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard, QrCode, Copy, CheckCircle,
  Heart, ShieldCheck, Download, Smartphone
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export default function DonatePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Helper to copy text to clipboard
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* --- Header Section --- */}
        <SectionTitle
          title="Support Our Mission"
          subtitle="Your contribution empowers us to sustain our cultural heritage and social welfare initiatives."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">

          {/* --- LEFT COLUMN: Payment Methods --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >

            {/* 1. Bank Transfer Card */}
            <div className="bg-surface border border-border rounded-2xl p-8 relative overflow-hidden group hover:border-accent/30 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition">
                <CreditCard size={120} />
              </div>

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="text-accent" /> Bank Transfer (NEFT/IMPS)
              </h3>

              <div className="space-y-5">
                {[
                  { label: "Account Name", value: "Sijgeria Umesh Chandra Smriti Sangha" },
                  { label: "Account Number", value: "123456789012" },
                  { label: "Bank Name", value: "State Bank of India" },
                  { label: "IFSC Code", value: "SBIN0001234" },
                  { label: "Branch", value: "Debra Bazar" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="text-secondaryText text-sm">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-mono font-medium">{item.value}</span>
                      <button
                        onClick={() => handleCopy(item.value, item.label)}
                        className="p-1.5 rounded-md bg-background border border-border text-gray-400 hover:text-white hover:border-accent transition"
                        title="Copy"
                      >
                        {copiedField === item.label ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. UPI / QR Code Section */}
            <div className="bg-gradient-to-br from-surface to-background border border-border rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8">
              <div className="bg-white p-4 rounded-xl">
                 {/* Replace this div with your actual QR Code Image */}
                 {/* <Image src="/qr-code.png" width={150} height={150} alt="UPI QR" /> */}
                 <div className="w-36 h-36 bg-gray-200 flex flex-col items-center justify-center text-black">
                    <QrCode size={48} className="opacity-20" />
                    <span className="text-xs font-bold mt-2 text-center opacity-40">QR CODE HERE</span>
                 </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center sm:justify-start gap-2">
                  <Smartphone className="text-accent" /> UPI Payment
                </h3>
                <p className="text-secondaryText text-sm mb-4">
                  Scan the QR code using Google Pay, PhonePe, or Paytm.
                </p>
                <div className="bg-black/30 border border-white/10 rounded-lg p-3 inline-flex items-center gap-3">
                  <span className="text-accent font-mono">sijgeriaclub@sbi</span>
                  <button
                    onClick={() => handleCopy("sijgeriaclub@sbi", "upi")}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedField === "upi" ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

          </motion.div>

          {/* --- RIGHT COLUMN: Trust & Info --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >

            {/* Impact Box */}
            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Heart className="text-accent fill-accent" /> Why Support Us?
              </h3>
              <ul className="space-y-4">
                {[
                  "Funding the Annual Football Tournament for local youth.",
                  "Organizing Blood Donation Camps & Health Checkups.",
                  "Winter Blanket Distribution for the needy.",
                  "Cultural Events (Durga Puja, Saraswati Puja)."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-accent shrink-0 mt-1" size={18} />
                    <span className="text-gray-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verification / Trust Badge */}
            <div className="bg-surface border border-border rounded-2xl p-6 flex gap-4 items-start">
               <ShieldCheck className="text-green-500 shrink-0" size={32} />
               <div>
                 <h4 className="text-white font-bold text-lg">Official Club Account</h4>
                 <p className="text-secondaryText text-sm mt-1">
                   All donations go directly to the registered bank account of Sijgeria UCSS.
                   We maintain transparent financial records, audited annually.
                 </p>
               </div>
            </div>

            {/* Contact for Receipt */}
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <h4 className="text-white font-semibold mb-2">Need a Receipt?</h4>
              <p className="text-secondaryText text-sm mb-4">
                After donation, please share the transaction details with our treasurer for a formal receipt.
              </p>
              <a
                href="https://wa.me/919933012328"
                target="_blank"
                className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors font-medium border-b border-accent/30 hover:border-accent pb-0.5"
              >
                Send Screenshot on WhatsApp
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  );
}
