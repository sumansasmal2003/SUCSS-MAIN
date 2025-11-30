"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  QrCode, Copy, CheckCircle,
  Heart, ShieldCheck, Smartphone, IndianRupee
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { toast } from "sonner";

export default function DonatePage() {
  const [amount, setAmount] = useState<string>("501");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // --- Payment Config ---
  const upiId = "sasmalsuman04-1@okicici";
  const payeeName = "Sijgeria UCSS";

  // Generate Dynamic UPI Link & QR Code
  // Format: upi://pay?pa=ADDRESS&pn=NAME&am=AMOUNT&cu=INR
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
  // Using QR Server API for dynamic generation
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&bgcolor=ffffff&data=${encodeURIComponent(upiLink)}`;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const presetAmounts = ["101", "501", "1001", "2001", "5001"];

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">

        <SectionTitle
          title="Support Our Mission"
          subtitle="Your contribution empowers us to sustain our cultural heritage and social welfare initiatives."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">

          {/* --- LEFT COLUMN: Payment Method --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >

            {/* Dynamic UPI / QR Scanner Section */}
            <div className="bg-gradient-to-br from-surface to-black border border-border rounded-3xl p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                <Smartphone className="text-accent" /> Scan & Pay via UPI
              </h3>

              <div className="flex flex-col md:flex-row gap-8 relative z-10">

                {/* QR Code Display */}
                <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl shadow-xl w-fit mx-auto md:mx-0">
                  <div className="relative w-48 h-48">
                    <img
                      src={qrCodeUrl}
                      alt="Payment QR"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white p-1 rounded-full">
                        <IndianRupee size={20} className="text-black font-bold" />
                      </div>
                    </div>
                  </div>
                  <p className="text-black font-bold mt-2 text-lg">₹{amount || "0"}</p>
                </div>

                {/* Amount Controls */}
                <div className="flex-1 space-y-6">
                  <div>
                    <label className="text-xs font-bold text-secondaryText uppercase mb-2 block">Enter Amount (₹)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={20} />
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-4 text-white text-xl font-bold focus:outline-none focus:border-accent transition"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-secondaryText uppercase mb-2 block">Or Select Amount</label>
                    <div className="flex flex-wrap gap-2">
                      {presetAmounts.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setAmount(amt)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                            amount === amt
                              ? "bg-accent text-black border-accent"
                              : "bg-transparent text-gray-400 border-border hover:border-white hover:text-white"
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-secondaryText mb-2">UPI ID</p>
                    <div className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-white/5">
                      <span className="text-white font-mono text-sm tracking-wide select-all">{upiId}</span>
                      <button
                        onClick={() => handleCopy(upiId, "UPI ID")}
                        className="text-gray-400 hover:text-white ml-auto"
                      >
                        {copiedField === "UPI ID" ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
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
            <div className="bg-accent/5 border border-accent/20 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 text-accent/5">
                <Heart size={200} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Heart className="text-accent fill-accent" /> Why Support Us?
              </h3>
              <ul className="space-y-4 relative z-10">
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
            <div className="bg-surface border border-border rounded-3xl p-6 flex gap-4 items-start">
               <ShieldCheck className="text-green-500 shrink-0" size={32} />
               <div>
                 <h4 className="text-white font-bold text-lg">Transparency Promise</h4>
                 <p className="text-secondaryText text-sm mt-1 leading-relaxed">
                   All donations go directly to the registered bank account of Sijgeria UCSS.
                   Our financial records are audited annually and presented to members.
                 </p>
               </div>
            </div>

            {/* Contact for Receipt */}
            <div className="bg-surface border border-border rounded-3xl p-6 text-center">
              <h4 className="text-white font-semibold mb-2">Need a Receipt?</h4>
              <p className="text-secondaryText text-sm mb-4">
                After donation, please share the transaction details (Screenshot / UTR) with our treasurer for a formal receipt.
              </p>
              <a
                href="https://wa.me/919933012328"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors font-medium border-b border-accent/30 hover:border-accent pb-0.5"
              >
                <Smartphone size={16} /> Send Screenshot on WhatsApp
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  );
}
