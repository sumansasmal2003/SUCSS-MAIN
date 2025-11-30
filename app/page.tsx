import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats"; // New
import Activities from "@/components/Activities";
import HomeGallery from "@/components/HomeGallery"; // New
import Testimonials from "@/components/Testimonials"; // New
import FAQ from "@/components/FAQ"; // Created previously
import CTA from "@/components/CTA"; // New
import Contact from "@/components/Contact"; // The upgraded one

export default function Home() {
  return (
    <main className="bg-background text-primaryText selection:bg-accent selection:text-black overflow-hidden">
      {/* 1. Hero: First Impression */}
      <Hero />

      {/* 2. Stats: Immediate Credibility */}
      <Stats />

      {/* 3. About: Who we are */}
      <About />

      {/* 4. Activities: What we do */}
      <Activities />

      {/* 5. CTA: Break monotony & Encourage Action */}
      <CTA />

      {/* 6. Gallery Preview: Visual Engagement */}
      <HomeGallery />

      {/* 7. Testimonials: Social Proof */}
      <Testimonials />

      {/* 8. FAQ: Answer Doubts */}
      <FAQ />

      {/* 9. Contact: Final Action */}
      <Contact />
    </main>
  );
}
