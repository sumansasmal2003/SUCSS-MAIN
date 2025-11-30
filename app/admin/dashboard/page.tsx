"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users, CheckCircle, XCircle, Loader2, Search,
  Phone, MapPin, Calendar, LogOut, UserPlus,
  Mail,
  X
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Member {
  _id: string;
  fullName: string;
  guardianName: string;
  phone: string;
  address: string;
  bloodGroup: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
}

export default function AdminDashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Pending" | "Approved">("Pending");
  const router = useRouter();
  const [showInviteModal, setShowInviteModal] = useState(false);

  // 1. Fetch Data
  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/admin/members");
      const data = await res.json();
      if (data.success) setMembers(data.data);
    } catch (error) {
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // 2. Handle Status Update (Approve/Reject)
  const updateStatus = async (id: string, newStatus: "Approved" | "Rejected") => {
    // Optimistic UI update
    setMembers(prev => prev.map(m => m._id === id ? { ...m, status: newStatus } : m));

    try {
      const res = await fetch("/api/admin/members", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Member ${newStatus} Successfully!`);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Update failed. Reverting changes.");
      fetchMembers(); // Revert on error
    }
  };

  const handleLogout = () => {
    // In a real app, call an API to delete cookie
    router.push("/admin");
  };

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formData = {
      fullName: (form.elements.namedItem("inviteName") as HTMLInputElement).value,
      email: (form.elements.namedItem("inviteEmail") as HTMLInputElement).value,
      phone: (form.elements.namedItem("invitePhone") as HTMLInputElement).value,
      // Optional: Ask for DOB if you want the password logic to be accurate based on birth year
      dob: (form.elements.namedItem("inviteDob") as HTMLInputElement).value,
      designation: (form.elements.namedItem("inviteDesignation") as HTMLSelectElement).value,
    };

    try {
      const res = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Invitation Sent Successfully!");
        setShowInviteModal(false);
        fetchMembers(); // Refresh list
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error("Failed to send invitation.");
    }
  };

  const filteredMembers = members.filter(m => filter === "All" || m.status === filter);

  if (loading) return <div className="h-screen flex items-center justify-center bg-black text-white"><Loader2 className="animate-spin" /></div>;

  return (
    <main className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-secondaryText">Manage club membership applications.</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 bg-accent text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition"
            >
              <UserPlus size={18} /> Invite Member
            </button>

            <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition bg-surface border border-border px-4 py-2 rounded-lg">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 bg-surface p-1 rounded-lg w-fit">
          {(["Pending", "Approved", "All"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                filter === tab ? "bg-accent text-black shadow-lg" : "text-secondaryText hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500">No members found in this category.</div>
          ) : (
            filteredMembers.map((member) => (
              <motion.div
                key={member._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-surface border border-border p-6 rounded-2xl relative overflow-hidden group"
              >
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  member.status === "Pending" ? "bg-yellow-500/20 text-yellow-500" :
                  member.status === "Approved" ? "bg-green-500/20 text-green-500" :
                  "bg-red-500/20 text-red-500"
                }`}>
                  {member.status}
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{member.fullName}</h3>
                  <p className="text-sm text-secondaryText flex items-center gap-1">
                    <span className="opacity-50">S/O</span> {member.guardianName}
                  </p>
                </div>

                <div className="space-y-3 text-sm text-gray-300 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-accent opacity-70" /> {member.phone}
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-accent opacity-70" /> <span className="truncate">{member.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-accent opacity-70" /> Blood Group: <span className="font-bold text-white">{member.bloodGroup || "N/A"}</span>
                  </div>
                </div>

                {/* Actions (Only show for Pending) */}
                {member.status === "Pending" && (
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <button
                      onClick={() => updateStatus(member._id, "Approved")}
                      className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>
                    <button
                      onClick={() => updateStatus(member._id, "Rejected")}
                      className="flex-1 bg-surface hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-border py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                )}

                {member.status === "Approved" && (
                  <div className="pt-4 border-t border-border text-center text-green-500 text-sm font-bold flex items-center justify-center gap-2">
                    <CheckCircle size={16} /> Official Member
                  </div>
                )}

              </motion.div>
            ))
          )}
        </div>

        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface border border-border p-8 rounded-2xl w-full max-w-md relative"
            >
              <button
                onClick={() => setShowInviteModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                title='close'
              >
                <X size={24} />
              </button>

              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Mail className="text-accent" /> Send Special Invite
              </h2>

              <form onSubmit={handleInvite} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondaryText uppercase">Full Name</label>
                  <input name="inviteName" placeholder="Full Name" required type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondaryText uppercase">Email Address</label>
                  <input name="inviteEmail" placeholder="Email" required type="email" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondaryText uppercase">Phone Number</label>
                  <input name="invitePhone" placeholder="Phone Number" type="tel" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondaryText uppercase">Designation</label>
                  <select
                    title="Designation"
                    name="inviteDesignation"
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Member">Member</option>
                    <option value="President">President</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Assistant Secretary">Assistant Secretary</option>
                    <option value="Executive Member">Executive Member</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondaryText uppercase">Date of Birth</label>
                  <p className="text-[10px] text-gray-500 mb-1">Used to generate password (e.g. S1990...)</p>
                  <input name="inviteDob" type="date" placeholder="DOB" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-white [&::-webkit-calendar-picker-indicator]:invert" />
                </div>

                <button type="submit" className="w-full bg-accent hover:bg-yellow-400 text-black font-bold py-3 rounded-lg mt-4">
                  Generate & Send Invite
                </button>
              </form>
            </motion.div>
          </div>
        )}

      </div>
    </main>
  );
}
