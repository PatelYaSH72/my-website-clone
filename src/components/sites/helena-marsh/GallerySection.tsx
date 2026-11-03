"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GALLERY_ITEMS, GalleryItem } from "./data";
import { DiamondMark, ArrowRight, CrossToggle } from "./Icons";
import { AnimatedImageCard } from "./AnimatedImageCard";

export function GallerySection() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Take top 5 featured moments for the 5-column home showcase
  const showcaseItems = GALLERY_ITEMS.filter((item) => item.featured).slice(0, 5);

  return (
    <section
      id="gallery"
      className="relative py-28 sm:py-36 px-4 sm:px-6 max-w-[1440px] mx-auto z-10 bg-[#F3EFE6] text-[#080F1E]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-[#080F1E]/15 pb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654]" />
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#8E9189]">
              ARCHIVE & ADVISORY MOMENTS
            </p>
          </div>
          <h2 className="text-[clamp(34px,4.5vw,64px)] leading-[1.04] tracking-tight font-light text-[#080F1E]">
            Inside the advisory,{" "}
            <span className="font-serif italic text-[#E6C654]">behind closed doors.</span>
          </h2>
          <p className="mt-3 text-[#080F1E]/75 text-[15px] sm:text-[17px] font-light leading-relaxed max-w-2xl">
            A photographic record of closed-door boardrooms, sovereign finance keynotes, and forensic
            audit defense sessions across Mumbai, London, and Singapore.
          </p>
        </div>

        {/* View Complete Archive Link */}
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#080F1E]/20 bg-white/60 hover:bg-[#080F1E] hover:text-[#F3EFE6] hover:border-[#080F1E] text-sm font-medium transition-all duration-300 self-start sm:self-end shadow-sm cursor-pointer group"
        >
          <span>View complete archive (15)</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 5-Column Grid Matching media_1793704213748_4e49cd69.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {showcaseItems.map((item, idx) => (
          <AnimatedImageCard
            key={item.id}
            src={item.image}
            alt={item.title}
            badge={item.badge || item.category.toUpperCase()}
            date={item.date || `${item.year}`}
            meta={item.location}
            title={item.title}
            subtitle={item.description}
            aspectRatio="aspect-[4/5]"
            index={idx}
            onClick={() => setActiveItem(item)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-[#080F1E]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#080F1E] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative w-full md:w-3/5 aspect-[4/3] md:aspect-auto min-h-[320px]">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>

            {/* Modal Info */}
            <div className="p-8 md:w-2/5 flex flex-col justify-between text-[#F3EFE6] space-y-6">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#E6C654]/15 border border-[#E6C654]/30 text-[#E6C654] font-mono text-xs uppercase tracking-wider">
                    {activeItem.badge || activeItem.category}
                  </span>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="cursor-pointer text-[#F3EFE6]/60 hover:text-white p-1"
                    aria-label="Close modal"
                  >
                    <CrossToggle isOpen={true} className="w-5 h-5 text-white" />
                  </button>
                </div>

                <h3 className="text-2xl font-light tracking-tight text-[#F3EFE6] mb-3">
                  {activeItem.title}
                </h3>

                <div className="space-y-2 text-xs font-mono text-[#F3EFE6]/65 border-t border-b border-white/10 py-3 mb-4">
                  <div className="flex justify-between">
                    <span>COLLECTION:</span>
                    <span className="text-[#E6C654]">{activeItem.collection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LOCATION:</span>
                    <span>{activeItem.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DATE:</span>
                    <span>{activeItem.date || activeItem.year}</span>
                  </div>
                </div>

                <p className="text-sm font-light text-[#F3EFE6]/80 leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#E6C654]">
                  MANDATE CLEARED · CONFIDENTIAL
                </span>
                <button
                  onClick={() => setActiveItem(null)}
                  className="text-xs font-mono tracking-wider text-white hover:text-[#E6C654] cursor-pointer"
                >
                  CLOSE [ESC]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
