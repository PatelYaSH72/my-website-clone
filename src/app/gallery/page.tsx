"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/sites/helena-marsh/Header";
import { PageHero } from "@/components/sites/helena-marsh/PageHero";
import { Footer } from "@/components/sites/helena-marsh/Footer";
import { CtaSection } from "@/components/sites/helena-marsh/CtaSection";
import { GALLERY_ITEMS, GALLERY_COLLECTIONS, GalleryItem } from "@/components/sites/helena-marsh/data";
import { CrossToggle, ArrowRight } from "@/components/sites/helena-marsh/Icons";

export default function GalleryPage() {
  const [selectedCollection, setSelectedCollection] = useState<string>("All Collections");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCollection === "All Collections"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.collection === selectedCollection);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        <PageHero
          badge="06 THE GALLERY ARCHIVE"
          title="Moments from the"
          italicWord="boardroom."
          description="An unvarnished photographic record of closed-door executive boardrooms, sovereign capital keynotes, forensic audit war rooms, and M&A due diligence sessions."
          chips={["MUMBAI · LONDON · SINGAPORE", "CLOSED-DOOR SESSIONS", "FCA ARCHIVE"]}
        />

        {/* Gallery Collection Filter & Grid */}
        <section className="py-20 sm:py-28 px-6 max-w-[1360px] mx-auto">
          {/* Collection Tabs Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sm:mb-16 border-b border-[#080F1E]/15 pb-8">
            <div className="space-y-1">
              <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                FILTER ARCHIVE
              </p>
              <h2 className="text-2xl sm:text-3xl font-light text-[#080F1E]">
                Select collection
              </h2>
            </div>

            {/* Collection Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {GALLERY_COLLECTIONS.map((col) => {
                const isActive = selectedCollection === col;
                return (
                  <button
                    key={col}
                    onClick={() => setSelectedCollection(col)}
                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#080F1E] text-[#F3EFE6] shadow-md scale-[1.02]"
                        : "bg-white/80 text-[#080F1E]/70 border border-[#080F1E]/10 hover:bg-white hover:text-[#080F1E]"
                    }`}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group relative rounded-3xl overflow-hidden bg-[#080F1E] border border-[#080F1E]/10 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end min-h-[380px]"
              >
                {/* Photo */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/95 via-[#080F1E]/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#080F1E]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#E6C654] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#F3EFE6]/80">
                    {item.year}
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-10 p-6 text-[#F3EFE6] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#E6C654] tracking-wider uppercase">
                    <span>{item.location}</span>
                    <span className="text-[#F3EFE6]/50">{item.collection}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-light tracking-tight text-[#F3EFE6] group-hover:text-[#E6C654] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs font-light text-[#F3EFE6]/75 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
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

                  <button
                    onClick={() => setActiveItem(null)}
                    className="w-full py-3 rounded-full bg-[#E6C654] text-[#080F1E] font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#F0D268] transition-colors cursor-pointer"
                  >
                    <span>Close Preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
