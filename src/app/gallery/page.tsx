"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/sites/helena-marsh/Header";
import { PageHero } from "@/components/sites/helena-marsh/PageHero";
import { Footer } from "@/components/sites/helena-marsh/Footer";
import { CtaSection } from "@/components/sites/helena-marsh/CtaSection";
import { AnimatedImageCard } from "@/components/sites/helena-marsh/AnimatedImageCard";
import { GALLERY_ITEMS, GALLERY_COLLECTIONS, GalleryItem } from "@/components/sites/helena-marsh/data";
import { CrossToggle, DiamondMark } from "@/components/sites/helena-marsh/Icons";

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
        {/* Full-Page Majestic Hero Section */}
        <PageHero
          badge="06 THE GALLERY ARCHIVE"
          title="Moments from the"
          italicWord="boardroom."
          description="An unvarnished photographic record of closed-door executive boardrooms, sovereign capital keynotes, forensic audit war rooms, and M&A due diligence sessions across Mumbai, London, Singapore, and Zurich."
          chips={["MUMBAI · LONDON · SINGAPORE", "15 CONFIDENTIAL SESSIONS", "FCA ARCHIVE"]}
          stats={[
            { number: "15+", label: "ARCHIVED MANDATES" },
            { number: "₹14,000+ Cr", label: "TRANSACTIONS AUDITED" },
            { number: "4", label: "GLOBAL HUBS" },
            { number: "100%", label: "DISCRETION ASSURED" },
          ]}
          ctaText="Inquire on Advisory"
          ctaHref="/book"
        />

        {/* Gallery Collection Filter & 5-Column Grid */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-[1440px] mx-auto">
          {/* Collection Tabs Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sm:mb-16 border-b border-[#080F1E]/15 pb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654]" />
                <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                  FILTER ARCHIVE BY COLLECTION
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-[#080F1E]">
                Select advisory collection
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

          {/* Maximum 5 Images Per Row Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredItems.map((item, idx) => (
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

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
