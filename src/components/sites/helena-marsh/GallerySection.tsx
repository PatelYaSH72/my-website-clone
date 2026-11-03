"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GALLERY_ITEMS, GalleryItem } from "./data";
import { DiamondMark, ArrowRight, CrossToggle } from "./Icons";

export function GallerySection() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Take top 5 featured moments for the home showcase
  const showcaseItems = GALLERY_ITEMS.filter((item) => item.featured).slice(0, 5);

  return (
    <section
      id="gallery"
      className="relative py-28 sm:py-36 px-6 max-w-[1360px] mx-auto z-10 bg-[#F3EFE6] text-[#080F1E]"
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
          <span>View gallery archive</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Curated Editorial Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Large Primary Showcase Card (Span 7) */}
        {showcaseItems[0] && (
          <div
            onClick={() => setActiveItem(showcaseItems[0])}
            className="md:col-span-7 group relative rounded-3xl overflow-hidden bg-[#080F1E] min-h-[380px] sm:min-h-[460px] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <Image
              src={showcaseItems[0].image}
              alt={showcaseItems[0].title}
              fill
              className="object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/90 via-[#080F1E]/30 to-transparent" />

            {/* Top Badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#080F1E]/75 backdrop-blur-md border border-white/15 text-xs font-mono text-[#E6C654] uppercase tracking-wider">
                {showcaseItems[0].category}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-mono text-[#F3EFE6]/80">
                {showcaseItems[0].location}
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-6 left-6 right-6 text-[#F3EFE6] space-y-2">
              <span className="text-xs font-mono text-[#E6C654] tracking-wider uppercase block">
                {showcaseItems[0].year} · {showcaseItems[0].collection}
              </span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight group-hover:text-[#E6C654] transition-colors">
                {showcaseItems[0].title}
              </h3>
              <p className="text-sm font-light text-[#F3EFE6]/75 line-clamp-2 max-w-xl">
                {showcaseItems[0].description}
              </p>
            </div>
          </div>
        )}

        {/* Secondary Showcase Card (Span 5) */}
        {showcaseItems[1] && (
          <div
            onClick={() => setActiveItem(showcaseItems[1])}
            className="md:col-span-5 group relative rounded-3xl overflow-hidden bg-[#080F1E] min-h-[380px] sm:min-h-[460px] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <Image
              src={showcaseItems[1].image}
              alt={showcaseItems[1].title}
              fill
              className="object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 540px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/90 via-[#080F1E]/30 to-transparent" />

            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#080F1E]/75 backdrop-blur-md border border-white/15 text-xs font-mono text-[#E6C654] uppercase tracking-wider">
                {showcaseItems[1].category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-[#F3EFE6] space-y-2">
              <span className="text-xs font-mono text-[#E6C654] tracking-wider uppercase block">
                {showcaseItems[1].year} · {showcaseItems[1].location}
              </span>
              <h3 className="text-xl sm:text-2xl font-light tracking-tight group-hover:text-[#E6C654] transition-colors">
                {showcaseItems[1].title}
              </h3>
              <p className="text-sm font-light text-[#F3EFE6]/75 line-clamp-2">
                {showcaseItems[1].description}
              </p>
            </div>
          </div>
        )}

        {/* 3 Bottom Cards (Span 4 each) */}
        {showcaseItems.slice(2, 5).map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-[#080F1E] min-h-[320px] cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/90 via-[#080F1E]/40 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 rounded-full bg-[#080F1E]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#E6C654] uppercase tracking-wider">
                {item.category}
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-[#F3EFE6] space-y-1.5">
              <span className="text-[11px] font-mono text-[#E6C654] tracking-wider uppercase block">
                {item.year} · {item.location}
              </span>
              <h4 className="text-lg font-light leading-snug group-hover:text-[#E6C654] transition-colors">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal Preview */}
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
            <div className="relative w-full md:w-3/5 aspect-[4/3] md:aspect-auto min-h-[280px]">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>

            {/* Modal Detail Info */}
            <div className="p-8 md:w-2/5 flex flex-col justify-between text-[#F3EFE6] space-y-6">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#E6C654]/15 border border-[#E6C654]/30 text-[#E6C654] font-mono text-xs uppercase tracking-wider">
                    {activeItem.category}
                  </span>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="cursor-pointer text-[#F3EFE6]/60 hover:text-white"
                  >
                    <CrossToggle isOpen={true} className="w-5 h-5 text-white" />
                  </button>
                </div>

                <h3 className="text-2xl font-light tracking-tight text-[#F3EFE6] mb-3">
                  {activeItem.title}
                </h3>

                <p className="text-sm font-light leading-relaxed text-[#F3EFE6]/80 mb-4">
                  {activeItem.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-white/10 text-xs font-mono text-[#F3EFE6]/60">
                  <p>
                    <span className="text-[#E6C654]">COLLECTION:</span> {activeItem.collection}
                  </p>
                  <p>
                    <span className="text-[#E6C654]">LOCATION:</span> {activeItem.location}
                  </p>
                  <p>
                    <span className="text-[#E6C654]">YEAR:</span> {activeItem.year}
                  </p>
                </div>
              </div>

              <Link
                href="/gallery"
                className="w-full py-3 rounded-full bg-[#E6C654] text-[#080F1E] font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#F0D268] transition-colors"
              >
                <span>View All In Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
