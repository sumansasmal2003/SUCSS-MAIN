"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Phone, Mail, MapPin, Calendar, Shield,
  LogOut, Loader2, CreditCard, Camera, Edit2, Save, X,
  CheckCircle, Upload, Plus, Trash2, Megaphone,
  CalendarPlus, ImagePlus, AlertTriangle, Wallet,
  TrendingUp, TrendingDown, DollarSign
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

// ============================================================================
// --- Types & Interfaces ---
// ============================================================================

interface MemberProfile {
  _id: string;
  fullName: string;
  guardianName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  bloodGroup: string;
  createdAt: string;
  status: string;
  designation: string;
}

interface Notice {
  _id: string;
  title: string;
  content: string;
  isImportant: boolean;
  createdAt: string;
}

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
}

interface Transaction {
  _id: string;
  type: "Income" | "Expense";
  category: string;
  amount: number;
  description: string;
  date: string;
  recordedBy?: string;
}

// ============================================================================
// --- Main Component ---
// ============================================================================

export default function Dashboard() {
  const router = useRouter();

  // --- Global State ---
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Modal Visibility States ---
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  // --- Action Loading States ---
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmittingNotice, setIsSubmittingNotice] = useState(false);
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isSubmittingTx, setIsSubmittingTx] = useState(false);

  // --- Admin Panel State ---
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<"Notices" | "Events">("Notices");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [noticeForm, setNoticeForm] = useState({ title: "", content: "", isImportant: false });
  const [eventForm, setEventForm] = useState({
    title: "", date: "", time: "", location: "", category: "Sports",
    shortDesc: "", fullDesc: "", coordinator: "", contact: "",
    entryFee: "Free", isFeatured: false, imageFile: null as File | null,
  });

  // --- Treasurer Panel State ---
  const [showTreasurerPanel, setShowTreasurerPanel] = useState(false);
  const [treasurerTab, setTreasurerTab] = useState<"Overview" | "Ledger">("Overview");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionForm, setTransactionForm] = useState({
    type: "Income", category: "General", amount: "", description: "", date: new Date().toISOString().split('T')[0]
  });

  // --- Payment Config ---
  const upiId = "sasmalsuman04-1@okicici";
  const amount = "25";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    `upi://pay?pa=${upiId}&pn=SijgeriaClub&am=${amount}&cu=INR`
  )}`;

  // --- Derived Financial Stats ---
  const totalIncome = transactions.filter(t => t.type === "Income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);
  const currentBalance = totalIncome - totalExpense;

  // ============================================================================
  // --- Data Fetching ---
  // ============================================================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/member/me");
        const data = await res.json();

        if (data.success) {
          setProfile(data.data);
          const role = data.data.designation;

          // Check Permissions
          if (["President", "Secretary"].includes(role)) {
            setShowAdminPanel(true);
            fetchNotices();
            fetchEvents();
          }
          if (["Treasurer", "President"].includes(role)) {
            setShowTreasurerPanel(true);
            fetchTransactions();
          }
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error(error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const fetchNotices = async () => { try { const res = await fetch("/api/notices"); const data = await res.json(); if (data.success) setNotices(data.data); } catch (e) {} };
  const fetchEvents = async () => { try { const res = await fetch("/api/events"); const data = await res.json(); if (data.success) setEvents(data.data); } catch (e) {} };
  const fetchTransactions = async () => { try { const res = await fetch("/api/treasury/transactions"); const data = await res.json(); if (data.success) setTransactions(data.data); } catch (e) {} };

  // ============================================================================
  // --- Handlers ---
  // ============================================================================

  const handleLogout = () => {
    document.cookie = "member_id=; Max-Age=0; path=/;";
    router.push("/login");
  };

  // 1. Update Profile
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    const form = e.target as HTMLFormElement;
    const formData = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      username: (form.elements.namedItem("username") as HTMLInputElement).value,
      guardianName: (form.elements.namedItem("guardianName") as HTMLInputElement).value,
      dob: (form.elements.namedItem("dob") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      bloodGroup: (form.elements.namedItem("bloodGroup") as HTMLSelectElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
    };
    try {
      const res = await fetch("/api/member/update", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (data.success) { setProfile(data.data); toast.success("Profile Updated!"); setShowEditModal(false); } else { toast.error(data.error); }
    } catch (error) { toast.error("Error updating profile"); } finally { setIsUpdating(false); }
  };

  // 2. Upload Photo
  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const res = await fetch('/api/gallery/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) { toast.success("Photo Uploaded!"); setShowUploadModal(false); form.reset(); } else { throw new Error(data.error); }
    } catch (error) { toast.error("Upload failed"); } finally { setIsUploading(false); }
  };

  // 3. Admin: Publish Notice
  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNotice(true);
    try {
      const res = await fetch("/api/notices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(noticeForm) });
      if (res.ok) { toast.success("Notice Published!"); setShowNoticeModal(false); setNoticeForm({ title: "", content: "", isImportant: false }); fetchNotices(); }
    } catch (err) { toast.error("Failed"); } finally { setIsSubmittingNotice(false); }
  };

  // 4. Admin: Create Event
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEvent(true);
    try {
      let imageUrl = "https://images.unsplash.com/photo-1579952363873-27f3bde9be2b";
      if (eventForm.imageFile) {
        const formData = new FormData(); formData.append("file", eventForm.imageFile);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        if (uploadData.success) imageUrl = uploadData.url;
      }
      const payload = { ...eventForm, image: imageUrl };
      const res = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) { toast.success("Event Created!"); setShowEventModal(false); fetchEvents(); setEventForm({ ...eventForm, title: "", shortDesc: "", imageFile: null }); }
    } catch (error) { toast.error("Error creating event"); } finally { setIsSubmittingEvent(false); }
  };

  // 5. Treasurer: Add Transaction
  const handleTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTx(true);
    try {
      const res = await fetch("/api/treasury/transactions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(transactionForm) });
      const data = await res.json();
      if (data.success) { toast.success("Transaction Saved!"); setShowTransactionModal(false); setTransactionForm({ ...transactionForm, amount: "", description: "" }); fetchTransactions(); }
    } catch (error) { toast.error("Failed"); } finally { setIsSubmittingTx(false); }
  };

  // 6. Deletions
  const deleteNotice = async (id: string) => { if(!confirm("Delete?")) return; await fetch("/api/notices", { method: "DELETE", body: JSON.stringify({ id }) }); toast.success("Deleted"); fetchNotices(); };
  const deleteEvent = async (id: string) => { if(!confirm("Delete?")) return; await fetch("/api/events", { method: "DELETE", body: JSON.stringify({ id }) }); toast.success("Deleted"); fetchEvents(); };
  const deleteTransaction = async (id: string) => { if(!confirm("Delete?")) return; await fetch("/api/treasury/transactions", { method: "DELETE", body: JSON.stringify({ id }) }); toast.success("Deleted"); fetchTransactions(); };


  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-accent" size={48} /></div>;
  if (!profile) return null;

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Member Dashboard</h1>
            <p className="text-secondaryText">Welcome back, {profile.fullName.split(' ')[0]}</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => setShowEditModal(true)} className="flex items-center gap-2 bg-accent text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition"><Edit2 size={16} /> Edit Profile</button>
             <button onClick={handleLogout} className="flex items-center gap-2 bg-surface border border-border px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition"><LogOut size={18} /> Logout</button>
          </div>
        </div>

        {/* ================= MEMBER OVERVIEW ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT: ID Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-1 bg-surface border border-border rounded-3xl p-6 relative overflow-hidden h-fit">
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-accent to-yellow-600 opacity-20" />
             <div className="relative z-10 flex flex-col items-center mt-8">
               <div className="w-24 h-24 bg-black rounded-full border-4 border-surface flex items-center justify-center mb-4"><User size={40} className="text-accent" /></div>
               <h2 className="text-xl font-bold text-white text-center">{profile.fullName}</h2>
               <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider rounded-full mt-2 mb-1">{profile.designation}</span>
               <p className="text-gray-500 text-sm font-mono">@{profile.username}</p>
               <div className="mt-6 w-full space-y-4">
                 <div className="bg-black/40 p-3 rounded-xl flex items-center justify-between"><span className="text-xs text-secondaryText uppercase">Status</span><span className="text-green-500 font-bold text-sm flex items-center gap-1"><Shield size={12} /> Active</span></div>
                 <div className="bg-black/40 p-3 rounded-xl flex items-center justify-between"><span className="text-xs text-secondaryText uppercase">Joined</span><span className="text-white font-bold text-sm">{new Date(profile.createdAt).getFullYear()}</span></div>
               </div>
             </div>
          </motion.div>

          {/* RIGHT: Details & Actions */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 space-y-6">
            <div className="bg-surface/50 border border-border rounded-3xl p-8 relative">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><User size={20} className="text-accent" /> Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                <div><label className="text-xs text-gray-500 uppercase font-bold">Guardian Name</label><p className="text-white mt-1">{profile.guardianName}</p></div>
                <div><label className="text-xs text-gray-500 uppercase font-bold">Blood Group</label><p className="text-white mt-1">{profile.bloodGroup || "N/A"}</p></div>
                <div><label className="text-xs text-gray-500 uppercase font-bold">Phone</label><p className="text-white flex items-center gap-2 mt-1"><Phone size={14} className="text-accent" /> {profile.phone}</p></div>
                <div><label className="text-xs text-gray-500 uppercase font-bold">Email</label><p className="text-white flex items-center gap-2 mt-1"><Mail size={14} className="text-accent" /> {profile.email || "N/A"}</p></div>
                <div className="sm:col-span-2"><label className="text-xs text-gray-500 uppercase font-bold">Address</label><p className="text-white flex items-center gap-2 mt-1"><MapPin size={14} className="text-accent" /> {profile.address}</p></div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-accent/10 border border-accent/20 rounded-3xl p-6 flex flex-col justify-between">
                    <div><h3 className="text-lg font-bold text-white mb-1">Subscription</h3><p className="text-secondaryText text-xs">Renewal: <span className="text-white font-bold">Jan 01, 2026</span></p></div>
                    <button onClick={() => setShowPaymentModal(true)} className="mt-4 w-full bg-accent text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-yellow-400 transition flex items-center justify-center gap-2 shadow-lg shadow-accent/20"><CreditCard size={16} /> Pay ₹25</button>
                </div>
                <div className="bg-surface border border-border rounded-3xl p-6 flex flex-col justify-between">
                    <div><h3 className="text-lg font-bold text-white mb-1">Gallery</h3><p className="text-secondaryText text-xs">Share your moments.</p></div>
                    <button onClick={() => setShowUploadModal(true)} className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-full font-bold text-sm transition flex items-center justify-center gap-2"><Camera size={16} /> Upload Photo</button>
                </div>
            </div>
          </motion.div>
        </div>

        {/* ================= TREASURER PANEL ================= */}
        {showTreasurerPanel && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-12 bg-[#111] border border-blue-900/30 rounded-3xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 relative z-10">
                    <div><h2 className="text-2xl font-bold text-white flex items-center gap-2"><Wallet className="text-blue-400" /> Treasury Management</h2><p className="text-gray-400 text-sm">Financial oversight for <strong>Treasurer</strong>.</p></div>
                    <div className="flex bg-surface border border-border rounded-lg p-1">{(["Overview", "Ledger"] as const).map((tab) => (<button key={tab} onClick={() => setTreasurerTab(tab)} className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${treasurerTab === tab ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}>{tab}</button>))}</div>
                </div>

                {treasurerTab === "Overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-surface border border-border p-6 rounded-2xl"><p className="text-gray-400 text-xs uppercase font-bold mb-2 flex items-center gap-2"><TrendingUp size={14} className="text-green-500" /> Total Income</p><h3 className="text-3xl font-bold text-white">₹{totalIncome.toLocaleString()}</h3></div>
                        <div className="bg-surface border border-border p-6 rounded-2xl"><p className="text-gray-400 text-xs uppercase font-bold mb-2 flex items-center gap-2"><TrendingDown size={14} className="text-red-500" /> Total Expense</p><h3 className="text-3xl font-bold text-white">₹{totalExpense.toLocaleString()}</h3></div>
                        <div className="bg-surface border border-border p-6 rounded-2xl"><p className="text-blue-200 text-xs uppercase font-bold mb-2 flex items-center gap-2"><Wallet size={14} /> Current Balance</p><h3 className="text-3xl font-bold text-white">₹{currentBalance.toLocaleString()}</h3></div>
                    </div>
                )}

                {treasurerTab === "Ledger" && (
                    <div className="space-y-6">
                        <button onClick={() => setShowTransactionModal(true)} className="w-full py-4 border-2 border-dashed border-blue-500/30 rounded-xl text-blue-400 hover:text-blue-300 hover:border-blue-500 hover:bg-blue-500/5 transition flex items-center justify-center gap-2 font-bold"><Plus size={20} /> Record New Transaction</button>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead><tr className="text-gray-500 text-xs border-b border-border"><th className="py-3 font-bold uppercase">Date</th><th className="py-3 font-bold uppercase">Description</th><th className="py-3 font-bold uppercase">Category</th><th className="py-3 font-bold uppercase text-right">Amount</th><th className="py-3 text-right">Action</th></tr></thead>
                                <tbody className="text-sm text-gray-300">
                                    {transactions.map((tx) => (
                                        <tr key={tx._id} className="border-b border-border/50 hover:bg-surface/50">
                                            <td className="py-3">{new Date(tx.date).toLocaleDateString()}</td>
                                            <td className="py-3 font-medium text-white">{tx.description}</td>
                                            <td className="py-3"><span className="bg-black/40 px-2 py-1 rounded text-xs">{tx.category}</span></td>
                                            <td className={`py-3 text-right font-bold ${tx.type === "Income" ? "text-green-500" : "text-red-500"}`}>{tx.type === "Income" ? "+" : "-"}₹{tx.amount}</td>
                                            <td className="py-3 text-right"><button onClick={() => deleteTransaction(tx._id)} className="text-gray-500 hover:text-red-500"><Trash2 size={16} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </motion.div>
        )}

        {/* ================= ADMIN PANEL ================= */}
        {showAdminPanel && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-surface/30 border border-accent/20 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div><h2 className="text-2xl font-bold text-white flex items-center gap-2"><Shield className="text-accent" /> Admin Controls</h2><p className="text-secondaryText text-sm">Privileged access for <strong>{profile.designation}</strong>.</p></div>
              <div className="flex bg-surface border border-border rounded-lg p-1">{(["Notices", "Events"] as const).map((tab) => (<button key={tab} onClick={() => setActiveAdminTab(tab)} className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeAdminTab === tab ? "bg-accent text-black" : "text-gray-400 hover:text-white"}`}>{tab}</button>))}</div>
            </div>
            {activeAdminTab === "Notices" && (
              <div className="space-y-6"><button onClick={() => setShowNoticeModal(true)} className="w-full py-4 border-2 border-dashed border-border rounded-xl text-gray-400 hover:text-accent hover:border-accent transition flex items-center justify-center gap-2 font-bold"><Plus size={20} /> Publish New Notice</button><div className="grid gap-4">{notices.map((notice) => (<div key={notice._id} className="bg-surface border border-border p-5 rounded-xl flex justify-between items-start group hover:border-accent/50 transition"><div><div className="flex items-center gap-2 mb-1">{notice.isImportant && <span className="text-[10px] bg-red-500 text-white px-2 rounded-full font-bold uppercase">Important</span>}<span className="text-xs text-gray-500">{new Date(notice.createdAt).toLocaleDateString()}</span></div><h4 className="text-white font-bold text-lg">{notice.title}</h4><p className="text-secondaryText text-sm mt-1">{notice.content}</p></div><button onClick={() => deleteNotice(notice._id)} className="p-2 text-gray-500 hover:text-red-500 bg-black/20 rounded-lg transition"><Trash2 size={18} /></button></div>))}</div></div>
            )}
            {activeAdminTab === "Events" && (
              <div className="space-y-6"><button onClick={() => setShowEventModal(true)} className="w-full py-4 border-2 border-dashed border-border rounded-xl text-gray-400 hover:text-accent hover:border-accent transition flex items-center justify-center gap-2 font-bold"><CalendarPlus size={20} /> Create New Event</button><div className="grid gap-4">{events.map((event) => (<div key={event._id} className="bg-surface border border-border p-5 rounded-xl flex justify-between items-center group hover:border-accent/30 transition"><div className="flex items-center gap-4"><div className="bg-black/30 p-3 rounded-lg text-center min-w-[60px]"><span className="block text-xs text-gray-400 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span><span className="block text-xl font-bold text-white">{new Date(event.date).getDate()}</span></div><div><h4 className="text-white font-bold">{event.title}</h4><p className="text-secondaryText text-xs flex items-center gap-2"><MapPin size={10} /> {event.location}</p></div></div><button onClick={() => deleteEvent(event._id)} className="p-2 text-gray-500 hover:text-red-500 bg-black/20 rounded-lg transition opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button></div>))}</div></div>
            )}
          </motion.div>
        )}

        {/* ================= MODALS ================= */}
        <AnimatePresence>

          {/* 1. Edit Profile */}
          {showEditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-surface border border-border p-8 rounded-2xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button onClick={() => setShowEditModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Edit2 className="text-accent" /> Update Profile</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="p-4 bg-black/30 rounded-xl border border-white/5 mb-4"><label className="text-xs font-bold text-gray-500 uppercase">Email (Cannot change)</label><p className="text-gray-300 font-mono mt-1">{profile.email}</p></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2"><label className="text-xs text-secondaryText uppercase font-bold">Full Name</label><input name="fullName" defaultValue={profile.fullName} required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" /></div>
                    <div className="space-y-2"><label className="text-xs text-secondaryText uppercase font-bold">Username</label><input name="username" defaultValue={profile.username} required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" /></div>
                    <div className="space-y-2"><label className="text-xs text-secondaryText uppercase font-bold">Guardian Name</label><input name="guardianName" defaultValue={profile.guardianName} required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" /></div>
                    <div className="space-y-2"><label className="text-xs text-secondaryText uppercase font-bold">DOB</label><input name="dob" type="date" defaultValue={profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : ''} required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white [&::-webkit-calendar-picker-indicator]:invert" /></div>
                    <div className="space-y-2"><label className="text-xs text-secondaryText uppercase font-bold">Phone</label><input name="phone" defaultValue={profile.phone} required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" /></div>
                    <div className="space-y-2"><label className="text-xs text-secondaryText uppercase font-bold">Blood Group</label><select name="bloodGroup" defaultValue={profile.bloodGroup} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white"><option value="A+">A+</option><option value="B+">B+</option><option value="O+">O+</option><option value="AB+">AB+</option><option value="A-">A-</option><option value="B-">B-</option><option value="O-">O-</option><option value="AB-">AB-</option></select></div>
                  </div>
                  <div className="space-y-2"><label className="text-xs text-secondaryText uppercase font-bold">Address</label><input name="address" defaultValue={profile.address} required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" /></div>
                  <button type="submit" disabled={isUpdating} className="w-full bg-accent hover:bg-yellow-400 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2">{isUpdating ? <Loader2 className="animate-spin" /> : "Save Changes"}</button>
                </form>
              </motion.div>
            </div>
          )}

          {/* 2. Payment */}
          {showPaymentModal && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"><motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-surface border border-border p-8 rounded-3xl w-full max-w-sm relative text-center"><button onClick={() => setShowPaymentModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button><h2 className="text-2xl font-bold text-white mb-2">Scan to Pay</h2><p className="text-secondaryText text-sm mb-6">Fee: <span className="text-accent font-bold">₹25</span></p><div className="bg-white p-4 rounded-xl mx-auto w-fit mb-6 shadow-xl"><img src={qrCodeUrl} alt="UPI QR" width={200} height={200} className="mix-blend-multiply" /></div><div className="space-y-3 bg-background p-4 rounded-xl border border-border/50"><p className="text-xs text-gray-500 uppercase font-bold">UPI ID</p><div className="flex items-center justify-center gap-2"><span className="text-white font-mono text-sm tracking-wide">{upiId}</span><CheckCircle size={14} className="text-green-500" /></div></div></motion.div></div>)}

          {/* 3. Upload Photo */}
          {showUploadModal && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"><motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-surface border border-border p-8 rounded-2xl w-full max-w-md relative"><button onClick={() => setShowUploadModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button><h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Upload className="text-accent" /> Upload Photo</h2><form onSubmit={handleImageUpload} className="space-y-4"><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Image</label><input name="file" type="file" accept="image/*" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" /></div><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Caption</label><input name="caption" type="text" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" /></div><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Category</label><select name="category" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white"><option value="Sports">Sports</option><option value="Cultural">Cultural</option><option value="Social Welfare">Social Welfare</option><option value="Meeting">Meeting</option><option value="Others">Others</option></select></div><button type="submit" disabled={isUploading} className="w-full bg-accent hover:bg-yellow-400 text-black font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2">{isUploading ? <Loader2 className="animate-spin" /> : "Upload"}</button></form></motion.div></div>)}

          {/* 4. Publish Notice */}
          {showNoticeModal && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"><motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-surface border border-border p-6 rounded-2xl w-full max-w-lg relative"><button onClick={() => setShowNoticeModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button><h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Megaphone className="text-accent" /> Publish Notice</h3><form onSubmit={handleNoticeSubmit} className="space-y-4"><div><label className="text-xs font-bold text-secondaryText uppercase">Title</label><input required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white mt-1" value={noticeForm.title} onChange={e => setNoticeForm({...noticeForm, title: e.target.value})} /></div><div><label className="text-xs font-bold text-secondaryText uppercase">Content</label><textarea required rows={4} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white mt-1 resize-none" value={noticeForm.content} onChange={e => setNoticeForm({...noticeForm, content: e.target.value})} /></div><div className="flex items-center gap-2"><input type="checkbox" id="urgent" className="w-4 h-4 accent-accent" checked={noticeForm.isImportant} onChange={e => setNoticeForm({...noticeForm, isImportant: e.target.checked})} /><label htmlFor="urgent" className="text-sm text-white font-medium">Mark as Urgent</label></div><button type="submit" disabled={isSubmittingNotice} className="w-full bg-accent text-black font-bold py-3 rounded-lg mt-2 flex items-center justify-center gap-2">{isSubmittingNotice ? <Loader2 className="animate-spin" /> : "Publish"}</button></form></motion.div></div>)}

          {/* 5. Create Event */}
          {showEventModal && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"><motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-surface border border-border p-0 rounded-2xl w-full max-w-2xl relative max-h-[90vh] overflow-hidden flex flex-col"><div className="p-6 border-b border-border flex justify-between items-center bg-background/50"><h3 className="text-xl font-bold text-white flex items-center gap-2"><CalendarPlus className="text-accent" /> Create Event</h3><button onClick={() => setShowEventModal(false)} className="text-gray-400 hover:text-white"><X size={24} /></button></div><div className="p-6 overflow-y-auto custom-scrollbar"><form onSubmit={handleEventSubmit} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Event Title</label><input required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} placeholder="Annual Sports 2025" /></div><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Category</label><select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" value={eventForm.category} onChange={e => setEventForm({...eventForm, category: e.target.value})}><option value="Sports">Sports</option><option value="Cultural">Cultural</option><option value="Social">Social</option><option value="Meeting">Meeting</option></select></div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Date</label><input type="date" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white [&::-webkit-calendar-picker-indicator]:invert" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} /></div><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Time</label><input type="time" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white [&::-webkit-calendar-picker-indicator]:invert" value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} /></div></div><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Location</label><input required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} /></div><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Event Banner</label><div className="relative border-2 border-dashed border-border rounded-xl p-4 hover:border-accent transition group"><input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => { if (e.target.files?.[0]) setEventForm({...eventForm, imageFile: e.target.files[0]}); }} /><div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-white"><ImagePlus size={24} className="mb-2" /><span className="text-sm font-medium">{eventForm.imageFile ? eventForm.imageFile.name : "Click to Upload Banner Image"}</span></div></div></div><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Short Description</label><input required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" value={eventForm.shortDesc} onChange={e => setEventForm({...eventForm, shortDesc: e.target.value})} /></div><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Full Details</label><textarea required rows={4} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white resize-none" value={eventForm.fullDesc} onChange={e => setEventForm({...eventForm, fullDesc: e.target.value})} /></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Coordinator</label><input required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" value={eventForm.coordinator} onChange={e => setEventForm({...eventForm, coordinator: e.target.value})} /></div><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Contact No.</label><input required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" value={eventForm.contact} onChange={e => setEventForm({...eventForm, contact: e.target.value})} /></div><div className="space-y-2"><label className="text-xs font-bold text-secondaryText uppercase">Entry Fee</label><input required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" value={eventForm.entryFee} onChange={e => setEventForm({...eventForm, entryFee: e.target.value})} /></div></div><div className="flex items-center gap-2 bg-background p-3 rounded-lg border border-border"><input type="checkbox" id="featured" className="w-4 h-4 accent-accent" checked={eventForm.isFeatured} onChange={e => setEventForm({...eventForm, isFeatured: e.target.checked})} /><label htmlFor="featured" className="text-sm text-white font-medium cursor-pointer">Feature this event on Homepage?</label></div></form></div><div className="p-6 border-t border-border bg-background/50"><button onClick={handleEventSubmit} disabled={isSubmittingEvent} className="w-full bg-accent hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">{isSubmittingEvent ? <Loader2 className="animate-spin" /> : "Publish Event"}</button></div></motion.div></div>)}

          {/* 6. Treasurer: Add Transaction */}
          {showTransactionModal && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"><motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-surface border border-blue-900/50 p-8 rounded-2xl w-full max-w-md relative"><button onClick={() => setShowTransactionModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button><h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><DollarSign className="text-blue-400" /> New Transaction</h2><form onSubmit={handleTransactionSubmit} className="space-y-4"><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Type</label><select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" value={transactionForm.type} onChange={e => setTransactionForm({...transactionForm, type: e.target.value})}><option value="Income">Income (+)</option><option value="Expense">Expense (-)</option></select></div><div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Date</label><input type="date" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white [&::-webkit-calendar-picker-indicator]:invert" value={transactionForm.date} onChange={e => setTransactionForm({...transactionForm, date: e.target.value})} /></div></div><div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Category</label><input required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" placeholder="e.g. Fees, Maintenance" value={transactionForm.category} onChange={e => setTransactionForm({...transactionForm, category: e.target.value})} /></div><div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Description</label><input required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" placeholder="Details..." value={transactionForm.description} onChange={e => setTransactionForm({...transactionForm, description: e.target.value})} /></div><div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Amount (₹)</label><input required type="number" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white text-lg font-bold" placeholder="0.00" value={transactionForm.amount} onChange={e => setTransactionForm({...transactionForm, amount: e.target.value})} /></div><button type="submit" disabled={isSubmittingTx} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2">{isSubmittingTx ? <Loader2 className="animate-spin" /> : "Save Record"}</button></form></motion.div></div>)}

        </AnimatePresence>

      </div>
    </main>
  );
}
