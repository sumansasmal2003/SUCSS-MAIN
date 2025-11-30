"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- Top Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* 1. Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold tracking-wider text-accent inline-block">
              SUCSS
            </Link>
            <p className="text-secondaryText text-sm leading-relaxed">
              Sijgeria Umesh Chandra Smriti Sangha.<br />
              Est. 1964. Uniting the community through culture, sports, and social welfare.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://www.facebook.com/profile.php?id=61552122930803" icon={<Facebook size={20} />} />
              <SocialLink href="https://www.youtube.com/@sijgeriaucssangha" icon={<Youtube size={20} />} />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/events" label="Events & Activities" />
              <FooterLink href="/gallery" label="Photo Gallery" />
              <FooterLink href="/contact" label="Contact Us" />
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-sm text-secondaryText">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-1" size={18} />
                <span className="leading-relaxed">
                  Vill: Sijgeria, P.O: Sijgeria<br />
                  Paschim Medinipur, WB - 721139
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-accent shrink-0" size={18} />
                <span className="hover:text-white transition-colors cursor-pointer">+91 99330 12328</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={18} />
                <span className="hover:text-white transition-colors cursor-pointer">sijgeria@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* 4. CTA / Join */}
          <div>
            <h3 className="text-white font-semibold mb-6">Join Our Mission</h3>
            <p className="text-secondaryText text-sm mb-6 leading-relaxed">
              Be a part of our legacy. Support us in our social welfare and cultural activities.
            </p>
            <Link href="/join" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm font-medium group">
              Become a Member <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondaryText">
          <p>© {currentYear} Sijgeria Umesh Chandra Smriti Sangha. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
            <span>for the Community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components for clean code ---

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-secondaryText hover:text-white hover:bg-surfaceHover hover:border-accent/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-secondaryText hover:text-accent transition-colors text-sm inline-flex items-center gap-2 group">
        <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-accent transition-colors duration-300" />
        <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
      </Link>
    </li>
  );
}
