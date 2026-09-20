'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

interface EventGalleryLightboxProps {
  images: string[];
  title: string;
}

export default function EventGalleryLightbox({ images, title }: EventGalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  return (
    <div>
      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 gold-border-glow transition-all duration-300 hover:scale-[1.02]"
          >
            <img
              src={img}
              alt={`${title} setup ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 group-hover:brightness-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 bg-obsidian-900/90 px-3 py-1.5 rounded-lg border border-gold-500/30">
                <Maximize2 className="w-3.5 h-3.5" />
                View Full Photo
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-slate-900/80 text-white hover:text-gold-400 hover:bg-slate-800 border border-white/20 flex items-center justify-center transition"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation left */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 text-white hover:text-gold-400 hover:bg-slate-800 border border-white/20 flex items-center justify-center transition z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Center Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={images[selectedIndex]}
              alt={`${title} preview`}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-gold-500/30"
            />
            <div className="mt-3 flex items-center justify-between w-full text-xs text-slate-400 px-2">
              <span className="font-semibold text-slate-200">{title}</span>
              <span>
                Photo {selectedIndex + 1} of {images.length}
              </span>
            </div>
          </div>

          {/* Navigation right */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 text-white hover:text-gold-400 hover:bg-slate-800 border border-white/20 flex items-center justify-center transition z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
