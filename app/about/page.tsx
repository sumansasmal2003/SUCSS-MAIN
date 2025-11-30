"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Target, Lightbulb, Users, Award,
  History, Heart, Shield, ArrowRight
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Link from "next/link";

// --- Data: Timeline ---
const historyMilestones = [
  { year: "1964", title: "The Beginning", desc: "Established by a group of visionary youth in Sijgeria, inspired by the ideals of Umesh Chandra." },
  { year: "1985", title: "First Tournament", desc: "Launched our now-famous Annual Football Tournament, drawing teams from across the district." },
  { year: "2000", title: "Golden Era", desc: "Expanded our premises and introduced social welfare programs like blood donation camps." },
  { year: "2024", title: "Modern Legacy", desc: "Celebrating 60 years of brotherhood with over 150+ active members and digital outreach." },
];

// --- Data: Core Values ---
const coreValues = [
  { icon: Heart, title: "Compassion", desc: "We believe in serving the needy and standing by our community in tough times." },
  { icon: Shield, title: "Integrity", desc: "Transparency in funds and honest leadership are the pillars of our trust." },
  { icon: Users, title: "Unity", desc: "A brotherhood that transcends caste, creed, and politics. We are one family." },
];

// --- Data: Leadership ---
const leaders = [
  { name: "Ramesh Das", role: "President", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
  { name: "Suman Ghosh", role: "Secretary", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" },
  { name: "Amit Roy", role: "Treasurer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-primaryText overflow-hidden">

      {/* --- 1. Hero Section --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://scontent.fccu14-1.fna.fbcdn.net/v/t39.30808-6/467429074_122250421988070764_7327866413069692294_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=R98fcZKePmIQ7kNvwGZGHgX&_nc_oc=AdnRiE31Qzgks7CMgpmXqJTuQN5mnb2miJpLPD5_RDmonv6tRKMUvh-5_dp1k2_PKcg&_nc_zt=23&_nc_ht=scontent.fccu14-1.fna&_nc_gid=86Y-vgnJR7Qq6tB1VOQJCg&oh=00_AfgHpcRZTQi0xQwgGRxAPzrYzGd_gplLc35cBd46HaOtZA&oe=69317745"
            alt="Club Community"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Since 1964
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            More Than Just a Club. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">
              A Family.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-secondaryText leading-relaxed"
          >
            Sijgeria Umesh Chandra Smriti Sangha is a movement dedicated to cultural preservation, sportsmanship, and social upliftment.
          </motion.p>
        </div>
      </section>

      {/* --- 2. Mission & Vision (Glassmorphism Cards) --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface/80 backdrop-blur-md border border-border p-10 rounded-3xl hover:border-accent/50 transition duration-500 shadow-2xl"
          >
            <Target className="text-accent w-12 h-12 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-secondaryText leading-relaxed">
              To foster a spirit of unity and cooperation among the youth of Sijgeria through regular sports activities, cultural programs, and community service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface/80 backdrop-blur-md border border-border p-10 rounded-3xl hover:border-accent/50 transition duration-500 shadow-2xl"
          >
            <Lightbulb className="text-accent w-12 h-12 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-secondaryText leading-relaxed">
              We envision a progressive society where every individual is empowered, healthy, and culturally conscious, carrying forward our rural heritage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 3. Our History Timeline --- */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Journey" subtitle="From a humble gathering to a pillar of the community." />

          <div className="relative mt-16">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0" />

            <div className="space-y-12">
              {historyMilestones.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Side */}
                  <div className="flex-1 md:text-right">
                    <div className={`bg-background border border-border p-6 rounded-2xl hover:border-accent/30 transition-all ${
                       idx % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}>
                      <span className="text-accent font-bold text-xl">{item.year}</span>
                      <h4 className="text-white font-bold text-lg mt-1 mb-2">{item.title}</h4>
                      <p className="text-secondaryText text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Dot on Line */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-2 md:-translate-x-2 mt-6 shadow-[0_0_15px_rgba(251,191,36,0.5)] z-10" />

                  {/* Spacer Side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. Our Values --- */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Core Values" subtitle="The principles that guide every decision we make." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {coreValues.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-surface border border-border p-8 rounded-2xl text-center group hover:bg-surfaceHover transition-all duration-300"
              >
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-accent group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                  <val.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                <p className="text-secondaryText leading-relaxed text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. Leadership Preview --- */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Meet the Leaders" subtitle="The dedicated individuals steering our ship." />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {leaders.map((leader, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-background border border-border rounded-2xl overflow-hidden group"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={leader.img}
                    alt={leader.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-white">{leader.name}</h3>
                  <p className="text-accent text-sm font-medium uppercase tracking-wider mt-1">{leader.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. CTA / Join --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
            Be Part of Our Legacy
          </h2>
          <p className="text-black/80 text-lg mb-8 font-medium">
            Whether you want to play, serve, or lead, there is a place for you at Sijgeria UCSS.
          </p>
          <Link href="/join" className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-flex items-center gap-2 shadow-2xl shadow-black/20">
            Become a Member <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </main>
  );
}
