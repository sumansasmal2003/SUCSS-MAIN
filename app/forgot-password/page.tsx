"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, KeyRound, Lock, ArrowRight, Loader2, CheckCircle, ChevronLeft
} from "lucide-react";
import { toast } from "sonner";
import SectionTitle from "@/components/SectionTitle";

export default function ForgotPassword() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  // Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ identifier }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("OTP Sent!", { description: "Check your email inbox." });
        setStep(2);
      } else {
        toast.error(data.error || "Request failed");
      }
    } catch (err) {
      toast.error("Network Error");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 & 3: Verify & Reset
  // We combine verify into the final reset call for simplicity,
  // or you can verify separately. Here we move to UI step 3, then submit all.
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Invalid OTP", { description: "OTP must be 6 digits." });
      return;
    }
    setStep(3);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ identifier, otp, newPassword }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Password Reset Successful!", { description: "Login with your new password." });
        router.push("/login");
      } else {
        toast.error("Reset Failed", { description: data.error });
        // If OTP expired, maybe go back to step 1
        if (data.error.includes("Expired")) setStep(1);
      }
    } catch (err) {
      toast.error("Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center bg-background">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <SectionTitle title="Recovery" subtitle="Reset your account password." />
        </div>

        <div className="bg-surface border border-border p-8 rounded-3xl shadow-2xl relative overflow-hidden min-h-[400px]">

          <AnimatePresence mode="wait">

            {/* --- STEP 1: IDENTIFY --- */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                    <Mail size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Find Account</h3>
                  <p className="text-sm text-secondaryText mt-2">Enter your username or registered email.</p>
                </div>

                <form onSubmit={handleRequestOtp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondaryText uppercase ml-1">Email / Username</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ramesh.das"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent hover:bg-yellow-400 text-black font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <>Send OTP <ArrowRight size={18} /></>}
                  </button>
                </form>
              </motion.div>
            )}

            {/* --- STEP 2: VERIFY OTP --- */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <button onClick={() => setStep(1)} className="text-xs text-gray-500 hover:text-white flex items-center gap-1 mb-2">
                  <ChevronLeft size={14} /> Back
                </button>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                    <KeyRound size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Verify OTP</h3>
                  <p className="text-sm text-secondaryText mt-2">Enter the 6-digit code sent to your email.</p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondaryText uppercase ml-1">One-Time Password</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="XXXXXX"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:border-accent transition"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-yellow-400 text-black font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    Verify Code <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>
            )}

            {/* --- STEP 3: RESET PASSWORD --- */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                 <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white">New Password</h3>
                  <p className="text-sm text-secondaryText mt-2">Create a secure password for your account.</p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondaryText uppercase ml-1">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-accent transition"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                  >
                     {loading ? <Loader2 className="animate-spin" /> : "Update Password"}
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
