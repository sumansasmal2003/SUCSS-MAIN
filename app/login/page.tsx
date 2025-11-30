"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User, Lock, ArrowRight, Loader2, ShieldCheck, HelpCircle
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function MemberLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Welcome back!", {
          description: " securely logging you in...",
          icon: <ShieldCheck className="text-green-500" />,
        });
        // Small delay to let the user see the success message
        setTimeout(() => router.push("/dashboard"), 800);
      } else {
        toast.error("Access Denied", {
          description: data.error || "Please check your credentials.",
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error("Connection Error", {
        description: "Could not connect to the server. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background">

      {/* --- Background Ambient Effects --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10 px-4"
      >
        {/* --- Login Card --- */}
        <div className="bg-surface/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/50 relative overflow-hidden group">

          {/* Top Decoration Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-widest text-white">
                SUCSS<span className="text-accent">.</span>
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Member Portal</h1>
            <p className="text-secondaryText text-sm">Sign in to access your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">

            {/* Username Input */}
            <div className="space-y-2 group/input">
              <label className="text-xs font-bold text-secondaryText uppercase ml-1 transition-colors group-focus-within/input:text-accent">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within/input:text-accent">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter your username"
                  className="w-full bg-black/20 border border-border rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent focus:bg-black/40 transition-all duration-300"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2 group/input">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-secondaryText uppercase transition-colors group-focus-within/input:text-accent">
                  Password
                </label>
                {/* Optional Forgot Password Link */}
                <Link href="/forgot-password" className="text-[10px] text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within/input:text-accent">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/20 border border-border rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent focus:bg-black/40 transition-all duration-300"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.1)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>Sign In <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center space-y-4">
            <p className="text-sm text-secondaryText">
              Not a member yet?{" "}
              <Link href="/join" className="text-white hover:text-accent font-medium transition-colors underline decoration-border hover:decoration-accent underline-offset-4">
                Apply for Membership
              </Link>
            </p>

            <div className="flex justify-center gap-4">
               <Link href="/contact" className="text-xs text-gray-600 hover:text-gray-400 flex items-center gap-1 transition-colors">
                 <HelpCircle size={12} /> Need Help?
               </Link>
            </div>
          </div>

        </div>

        {/* Bottom Secure Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-600"
        >
          <Lock size={12} /> Secure 256-bit Encrypted Connection
        </motion.div>

      </motion.div>
    </main>
  );
}
