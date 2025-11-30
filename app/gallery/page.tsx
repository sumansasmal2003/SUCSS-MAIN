"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2, Image as ImageIcon, Loader2, Filter,
  Search, Camera, Calendar
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import clsx from "clsx";

// --- Lightbox Imports ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

// --- Types ---
interface GalleryImage {
  _id: string;
  url: string;
  caption: string;
  category: string;
  uploaderName?: string;
  createdAt?: string;
}

// --- Categories ---
const categories = ["All", "Sports", "Cultural", "Social Welfare", "Meeting", "Awards", "Others"];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1);

  // 1. Fetch Images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (data.success) {
          setImages(data.data);
          setFilteredImages(data.data);
        }
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // 2. Handle Filtering
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === activeCategory));
    }
  }, [activeCategory, images]);

  // 3. Prepare Slides for Lightbox
  const slides = filteredImages.map(img => ({
    src: img.url,
    alt: img.caption,
    title: img.caption,
    description: `Category: ${img.category} • Uploaded by: ${img.uploaderName || 'Admin'}`
  }));

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Photo Gallery"
          subtitle="Reliving our legacy, one frame at a time."
        />

        {/* --- Filter Bar --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-8 mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar mask-gradient">
            <Filter size={18} className="text-secondaryText shrink-0 mr-2 hidden md:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-all whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-accent text-black border-accent shadow-lg shadow-accent/20"
                    : "bg-transparent text-secondaryText border-border hover:border-white/50 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-secondaryText text-xs font-mono">
            Showing {filteredImages.length} photos
          </div>
        </div>

        {/* --- Masonry Gallery Grid --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-accent mb-4" size={48} />
            <p className="text-secondaryText animate-pulse text-sm">Loading Gallery...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-border rounded-3xl bg-surface/30">
            <div className="bg-surface inline-block p-4 rounded-full mb-4">
              <Camera className="text-secondaryText" size={32} />
            </div>
            <h3 className="text-white font-bold text-lg">No photos found</h3>
            <p className="text-secondaryText text-sm">Try selecting a different category.</p>
          </div>
        ) : (
          /* Masonry Layout using Columns */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence>
              {filteredImages.map((image, idx) => (
                <motion.div
                  key={image._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid"
                  onClick={() => setIndex(idx)}
                >
                  <div className="group relative rounded-2xl overflow-hidden bg-surface border border-border cursor-zoom-in">

                    {/* Image with Lazy Load Effect */}
                    <BlurImage src={image.url} alt={image.caption} />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block px-2 py-1 bg-accent text-black text-[10px] font-bold uppercase rounded mb-2">
                          {image.category}
                        </span>
                        <h3 className="text-white font-bold text-sm line-clamp-2 leading-snug">
                          {image.caption}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-gray-400 text-xs">
                           <ImageIcon size={12} />
                           <span>{image.uploaderName?.split(' ')[0] || 'Admin'}</span>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                        <Maximize2 size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- Lightbox --- */}
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={slides}
          plugins={[Thumbnails, Zoom, Captions]}
          animation={{ fade: 300 }}
          carousel={{ padding: 0, spacing: 0 }}
          styles={{
            container: { backgroundColor: "rgba(10, 10, 10, 0.95)", backdropFilter: "blur(10px)" },
            thumbnailsContainer: { backgroundColor: "#0f0f0f", borderTop: "1px solid #333" },
            captionsDescriptionContainer: { backgroundColor: "rgba(0,0,0,0.7)" }
          }}
          zoom={{ maxZoomPixelRatio: 3 }}
        />
      </div>
    </main>
  );
}

// --- Professional Lazy Image Component ---
function BlurImage({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative overflow-hidden bg-gray-900">
      <Image
        src={src}
        alt={alt}
        width={800} // Set a reasonable base width
        height={600} // Aspect ratio will be handled by CSS/Layout
        className={clsx(
          "duration-700 ease-in-out w-full h-auto object-cover group-hover:scale-105 transition-transform",
          isLoading ? "scale-110 blur-xl grayscale" : "scale-100 blur-0 grayscale-0"
        )}
        onLoad={() => setLoading(false)}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
