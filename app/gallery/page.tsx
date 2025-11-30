"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2, Image as ImageIcon } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

// --- Lightbox Imports ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// import optional plugins
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// --- Data Sample (Replace with real club images later) ---
// We need width/height for Next Image optimization and the Lightbox
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1506185386801-3d7bc0ddd2bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    width: 1920,
    height: 1080,
    alt: "Football Tournament Final Match",
    category: "Sports"
  },
  {
    src: "https://images.unsplash.com/photo-1706777568411-27299edbdb28?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    width: 1920,
    height: 1280,
    alt: "Durga Puja Pandal Decoration",
    category: "Cultural"
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1920&auto=format&fit=crop",
    width: 1920,
    height: 1080,
    alt: "Blood Donation Camp Drive",
    category: "Social Welfare"
  },
  {
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1920&auto=format&fit=crop",
    width: 1920,
    height: 1280,
    alt: "Evening Cultural Performance",
    category: "Cultural"
  },
  {
    src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1920&auto=format&fit=crop",
    width: 1920,
    height: 1080,
    alt: "Youth Cricket Match",
    category: "Sports"
  },
  {
    src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1920&auto=format&fit=crop",
    width: 1920,
    height: 1280,
    alt: "Community Meeting Discussion",
    category: "Meeting"
  },
  {
    src: "https://images.unsplash.com/photo-1661865781226-bdea5c686d51?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    width: 1920,
    height: 1080,
    alt: "Blanket Distribution Event",
    category: "Social Welfare"
  },
  {
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1920&auto=format&fit=crop",
    width: 1920,
    height: 1280,
    alt: "Prize Distribution Ceremony",
    category: "Awards"
  }
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } }
};

export default function GalleryPage() {
  // State for the Lightbox
  const [index, setIndex] = useState(-1);

  // Prepare slides for the lightbox library format
  const slides = galleryImages.map(img => ({
    src: img.src,
    width: img.width,
    height: img.height,
    alt: img.alt,
    // Adding descriptions for the lightbox caption
    description: img.alt
  }));

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Photo Gallery"
          subtitle="A visual journey through our cherished moments and events."
        />

        {/* Thumbnail Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12"
        >
          {galleryImages.map((image, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-surface cursor-pointer hover:border-accent hover:shadow-[0_0_20px_rgba(251,191,36,0.15)] transition-all duration-300"
              onClick={() => setIndex(idx)}
            >
              {/* Next Image Component for optimization */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-lg"
                priority={idx < 4} // Load first few images faster
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-accent/90 p-3 rounded-full text-black">
                  <Maximize2 size={24} />
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white flex items-center gap-1">
                <ImageIcon size={12} className="text-accent" /> {image.category}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* The actual Lightbox Slider */}
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={slides}
          plugins={[Thumbnails, Zoom]}
          // Customizing styles to match our dark theme perfectly
          styles={{
            container: { backgroundColor: "rgba(15, 15, 15, 0.95)", backdropFilter: "blur(10px)" },
            thumbnailsContainer: { backgroundColor: "#1e1e1e", borderTop: "1px solid #333" },
            thumbnail: { border: "1px solid transparent" }
          }}
          zoom={{ maxZoomPixelRatio: 3 }}
        />
      </div>
    </main>
  );
}
