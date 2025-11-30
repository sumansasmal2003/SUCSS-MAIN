"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Calendar, MapPin, Clock, ArrowRight, Trophy, Heart,
  Music, Users, X, User, CheckCircle, Info, Filter, Search
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import clsx from "clsx";

// --- Types & Data ---

type EventCategory = "All" | "Sports" | "Cultural" | "Social" | "Meeting";

interface EventSchedule {
  time: string;
  activity: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: Exclude<EventCategory, "All">;
  shortDesc: string;
  fullDesc: string;
  image: string; // Changed from color to image URL
  icon: any;
  schedule: EventSchedule[];
  coordinator: string;
  contact: string;
  entryFee: string;
  isFeatured?: boolean;
}

const eventsData: Event[] = [
  {
    id: 1,
    title: "Annual Football Tournament 2025",
    date: "Jan 26, 2025",
    time: "10:00 AM",
    location: "Club Playground",
    category: "Sports",
    shortDesc: "The biggest knockout football tournament of the district.",
    fullDesc: "Join us for the 25th edition of our prestigious football tournament. 16 teams from across West Bengal will compete for the Championship Trophy and a cash prize of ₹50,000. Food stalls and medical support will be available on-site.",
    image: "https://images.unsplash.com/photo-1660926655155-8b1f8f9079f5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Trophy,
    schedule: [
      { time: "10:00 AM", activity: "Opening Ceremony" },
      { time: "10:30 AM", activity: "First Match Kickoff" },
      { time: "01:00 PM", activity: "Lunch Break" },
      { time: "04:30 PM", activity: "Final Match" },
    ],
    coordinator: "Ramesh Das",
    contact: "+91 98000 12345",
    entryFee: "₹500 / Team",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Mega Blood Donation Camp",
    date: "Feb 14, 2025",
    time: "09:00 AM - 02:00 PM",
    location: "Sijgeria Primary School",
    category: "Social",
    shortDesc: "Give the gift of life. Organized with District Hospital.",
    fullDesc: "Every drop counts. In collaboration with the Medinipur District Hospital, we are organizing a blood donation camp to support Thalassemia patients. All donors will receive a certificate and refreshments.",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop",
    icon: Heart,
    schedule: [
      { time: "09:00 AM", activity: "Doctor's Arrival" },
      { time: "09:30 AM", activity: "Donation Starts" },
    ],
    coordinator: "Suman Ghosh",
    contact: "+91 98000 67890",
    entryFee: "Free",
  },
  {
    id: 3,
    title: "Annual General Meeting",
    date: "March 05, 2025",
    time: "06:00 PM",
    location: "Club Premises",
    category: "Meeting",
    shortDesc: "Quarterly meeting regarding Puja planning.",
    fullDesc: "A mandatory meeting for all registered members. We will discuss the audited financial report of the previous year and form the new committee for the upcoming Durga Puja.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop",
    icon: Users,
    schedule: [
      { time: "06:00 PM", activity: "Financial Report" },
      { time: "07:00 PM", activity: "New Committee Selection" },
    ],
    coordinator: "The Secretary",
    contact: "Club Office",
    entryFee: "Members Only",
  },
  {
    id: 4,
    title: "Durga Puja 2024 (Past)",
    date: "Oct 20, 2024",
    time: "All Day",
    location: "Club Pandal",
    category: "Cultural",
    shortDesc: "5 days of cultural programs and community feast.",
    fullDesc: "Our biggest festival of the year. The theme this year was 'Rural Heritage'. We saw a footfall of over 5,000 people.",
    image: "https://images.unsplash.com/photo-1567593810070-7a3d471b5722?q=80&w=1000&auto=format&fit=crop",
    icon: Music,
    schedule: [],
    coordinator: "Puja Committee",
    contact: "-",
    entryFee: "Free",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Filter Logic
  const currentDate = new Date();
  const filteredEvents = eventsData.filter((event) => {
    // 1. Filter by Time (Simple string comparison for demo, use Date objects in real app)
    const isPast = event.title.includes("(Past)"); // Mock logic for demo
    if (activeTab === "upcoming" && isPast) return false;
    if (activeTab === "past" && !isPast) return false;

    // 2. Filter by Category
    if (activeCategory !== "All" && event.category !== activeCategory) return false;

    return true;
  });

  const featuredEvent = eventsData.find(e => e.isFeatured);

  return (
    <main className="min-h-screen pt-20 pb-20 bg-background text-primaryText">

      {/* --- 1. Featured Event Hero (Only show on Upcoming tab) --- */}
      {activeTab === "upcoming" && featuredEvent && (
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-end pb-12 mb-20 group">
          <Image
            src={featuredEvent.image}
            alt="Featured Event"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-accent text-black font-bold text-xs uppercase tracking-wider rounded-full mb-2">
                Upcoming Highlight
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white leading-tight"
              >
                {featuredEvent.title}
              </motion.h1>
              <p className="text-gray-300 text-lg line-clamp-2">{featuredEvent.shortDesc}</p>

              <div className="flex items-center gap-6 text-sm font-medium text-white/90 pt-2">
                <div className="flex items-center gap-2"><Calendar className="text-accent" size={18} /> {featuredEvent.date}</div>
                <div className="flex items-center gap-2"><MapPin className="text-accent" size={18} /> {featuredEvent.location}</div>
              </div>
            </div>

            <button
              onClick={() => setSelectedEvent(featuredEvent)}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-accent hover:border-accent hover:text-black text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 shrink-0"
            >
              Event Details <ArrowRight size={20} />
            </button>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- 2. Controls Section (Tabs & Filters) --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">

          {/* Main Tabs (Upcoming / Past) */}
          <div className="bg-surface border border-border p-1 rounded-xl flex">
            {(["upcoming", "past"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all",
                  activeTab === tab
                    ? "bg-accent text-black shadow-lg shadow-accent/20"
                    : "text-secondaryText hover:text-white"
                )}
              >
                {tab} Events
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            <Filter size={18} className="text-secondaryText shrink-0 mr-2 hidden md:block" />
            {(["All", "Sports", "Cultural", "Social", "Meeting"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-secondaryText border-border hover:border-white/50 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- 3. Events Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`${activeTab}-${activeCategory}`} // Re-trigger animation on filter change
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  layout
                  className="group bg-surface border border-border rounded-3xl overflow-hidden hover:border-accent/50 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-black/50"
                >
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                       <event.icon size={12} className="text-accent" />
                       <span className="text-xs font-bold text-white uppercase">{event.category}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-accent text-xs font-bold uppercase tracking-wider mb-2">
                      {event.date}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-accent transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-secondaryText text-sm line-clamp-2 mb-6 flex-1">
                      {event.shortDesc}
                    </p>

                    <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock size={14} /> {event.time}
                      </div>
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="text-white text-sm font-medium hover:text-accent transition-colors flex items-center gap-1"
                      >
                        Details <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="bg-surface inline-block p-4 rounded-full mb-4">
                  <Search className="text-secondaryText" size={32} />
                </div>
                <h3 className="text-white font-bold text-lg">No events found</h3>
                <p className="text-secondaryText text-sm">Try changing the filters.</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* --- 4. Enhanced Modal (Popup) --- */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 hover:rotate-90 transition-all"
              >
                <X size={20} />
              </button>

              {/* Modal Left: Image (Hidden on mobile) */}
              <div className="hidden md:block w-1/3 relative bg-gray-900">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-accent text-xs font-bold uppercase mb-1">Entry Fee</p>
                  <p className="text-white font-bold text-xl">{selectedEvent.entryFee}</p>
                </div>
              </div>

              {/* Modal Right: Content */}
              <div className="flex-1 p-8 bg-surface">
                <span className="text-accent text-xs font-bold uppercase tracking-wider mb-2 block">
                  {selectedEvent.category} Event
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">{selectedEvent.title}</h2>
                <p className="text-secondaryText text-sm leading-relaxed mb-8">
                  {selectedEvent.fullDesc}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-bold mb-1">Date & Time</p>
                    <p className="text-white text-sm font-medium flex items-center gap-2">
                       <Calendar size={14} className="text-accent" /> {selectedEvent.date}
                    </p>
                    <p className="text-gray-400 text-xs ml-6">{selectedEvent.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-bold mb-1">Location</p>
                    <p className="text-white text-sm font-medium flex items-center gap-2">
                       <MapPin size={14} className="text-accent" /> {selectedEvent.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-bold mb-1">Coordinator</p>
                    <p className="text-white text-sm font-medium flex items-center gap-2">
                       <User size={14} className="text-accent" /> {selectedEvent.coordinator}
                    </p>
                  </div>
                </div>

                {/* Timeline / Schedule */}
                {selectedEvent.schedule.length > 0 && (
                  <div className="bg-background/50 rounded-2xl p-5 border border-border">
                    <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                      <Clock size={16} className="text-accent" /> Event Schedule
                    </h4>
                    <div className="space-y-3 relative">
                       {/* Line */}
                       <div className="absolute left-[58px] top-2 bottom-2 w-px bg-border" />

                       {selectedEvent.schedule.map((item, i) => (
                         <div key={i} className="flex items-center gap-4 text-sm">
                           <span className="w-12 text-right text-gray-500 text-xs font-mono shrink-0">{item.time}</span>
                           <div className="w-2 h-2 rounded-full bg-accent z-10 shrink-0" />
                           <span className="text-gray-300">{item.activity}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {/* Mobile Entry Fee (Visible only on mobile) */}
                <div className="md:hidden mt-6 pt-6 border-t border-border flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-xs uppercase font-bold">Entry Fee</p>
                      <p className="text-white font-bold">{selectedEvent.entryFee}</p>
                    </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
