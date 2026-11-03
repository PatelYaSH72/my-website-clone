"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/sites/helena-marsh/Header";
import { PageHero } from "@/components/sites/helena-marsh/PageHero";
import { VoicesSection } from "@/components/sites/helena-marsh/VoicesSection";
import { CtaSection } from "@/components/sites/helena-marsh/CtaSection";
import { Footer } from "@/components/sites/helena-marsh/Footer";
import { AnimatedImageCard } from "@/components/sites/helena-marsh/AnimatedImageCard";
import { SERVICE_MANDATES } from "@/components/sites/helena-marsh/data";
import {
  DiamondMark,
  ArrowRight,
  SparkStar,
} from "@/components/sites/helena-marsh/Icons";

export default function ServicesPage() {
  const [activeId, setActiveId] = useState<string>(SERVICE_MANDATES[0].id);

  const activeIndex = SERVICE_MANDATES.findIndex((m) => m.id === activeId);
  const currentMandate = SERVICE_MANDATES[activeIndex] || SERVICE_MANDATES[0];

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + SERVICE_MANDATES.length) % SERVICE_MANDATES.length;
    setActiveId(SERVICE_MANDATES[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % SERVICE_MANDATES.length;
    setActiveId(SERVICE_MANDATES[nextIdx].id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />

      <main className="flex-1">
        {/* Full-Page Majestic Hero Section */}
        <PageHero
          title="Four strategic mandates for"
          italicWord="sovereign fiscal command."
          description="From multi-tier corporate restructuring and buy-side M&A due diligence to executive CFO transitions, next-generation CA fellowship, and boardroom equilibrium under sovereign pressure."
          chips={[
            "BUSINESS CONSULTANCY",
            "CAREER CONSULTATION",
            "MENTORING FELLOWSHIP",
            "LIFE LESSONS & COACHING",
          ]}
          stats={[
            { number: "₹14,000+ Cr", label: "CAPITAL & ASSETS ASSURED" },
            { number: "180+", label: "STATUTORY & STRATEGIC MANDATES" },
            { number: "99.4%", label: "AUDIT COMMITTEE CLEARANCE" },
            { number: "FCA", label: "FELLOW CHARTERED ACCOUNTANT" },
          ]}
          ctaText="Schedule an exploratory discussion"
          ctaHref="/book"
        />

        {/* Dynamic & Open Editorial Services Section (Zero Box Clutter) */}
        <section
          id="services-console"
          className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 max-w-[1400px] mx-auto scroll-mt-24"
        >
          {/* Section Heading & Subtitle */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#080F1E]/15">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189] mb-3">
                STRATEGIC ADVISORY MANDATES
              </p>
              <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
                Architectural command for{" "}
                <span className="font-serif italic text-[#1E40AF]">
                  critical fiscal crossroads.
                </span>
              </h2>
            </div>

            {/* Quick Mandate Cycler Controls */}
            <div className="flex items-center gap-3 font-mono text-xs text-[#8E9189]">
              <span className="tracking-wider">
                MANDATE {currentMandate.number} / 0{SERVICE_MANDATES.length}
              </span>
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Mandate"
                  className="w-9 h-9 rounded-full border border-[#080F1E]/20 flex items-center justify-center text-[#080F1E] hover:border-[#080F1E] hover:bg-[#080F1E] hover:text-[#F3EFE6] transition-all"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Mandate"
                  className="w-9 h-9 rounded-full border border-[#080F1E]/20 flex items-center justify-center text-[#080F1E] hover:border-[#080F1E] hover:bg-[#080F1E] hover:text-[#F3EFE6] transition-all"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Minimalist Editorial Navigation Rail (Clean Horizontal Line Tabs, NO BOXES) */}
          <div className="sticky top-20 z-20 pt-4 pb-2 bg-[#F3EFE6]/95 backdrop-blur-md border-b border-[#080F1E]/12 mb-12 sm:mb-16">
            <nav
              aria-label="Services Mandates"
              className="flex items-center gap-8 sm:gap-14 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {SERVICE_MANDATES.map((mandate) => {
                const isActive = mandate.id === activeId;

                return (
                  <button
                    key={mandate.id}
                    type="button"
                    onClick={() => setActiveId(mandate.id)}
                    className="group relative pb-4 text-left shrink-0 transition-colors focus:outline-none"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className={`font-mono text-xs font-semibold transition-colors ${
                          isActive
                            ? "text-[#1E40AF]"
                            : "text-[#8E9189] group-hover:text-[#080F1E]"
                        }`}
                      >
                        {mandate.number}
                      </span>
                      <span
                        className={`text-base sm:text-lg tracking-tight transition-colors ${
                          isActive
                            ? "font-normal text-[#080F1E]"
                            : "font-light text-[#8E9189] group-hover:text-[#080F1E]"
                        }`}
                      >
                        {mandate.title}
                      </span>
                    </div>

                    {/* Animated Clean Indicator Line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeMandateHairline"
                        className="absolute bottom-0 inset-x-0 h-[2.5px] bg-[#080F1E]"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Fluid Editorial Mandate Showcase (Clean Canvas, NO BOX CLUTTER) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMandate.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              {/* Left Column: Narrative Core & Focus/Deliverables (7 cols) */}
              <div className="lg:col-span-7 space-y-10">
                {/* Eyebrow & Category */}
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-[#8E9189] mb-3">
                    <span className="text-[#1E40AF] font-semibold">{currentMandate.badge}</span>
                    <span>·</span>
                    <span>DURATION: {currentMandate.duration}</span>
                  </div>

                  <h3 className="text-[clamp(36px,4.5vw,60px)] leading-[1.04] tracking-tight font-light text-[#080F1E]">
                    {currentMandate.title}
                  </h3>

                  <p className="mt-2.5 text-xl sm:text-2xl font-serif italic text-[#1E40AF]">
                    {currentMandate.tagline}
                  </p>
                </div>

                {/* Narrative Description */}
                <p className="text-[#080F1E]/80 text-[17px] sm:text-[19px] font-light leading-relaxed max-w-2xl">
                  {currentMandate.description}
                </p>

                {/* Target Audience Metadata Line (Clean Inline Row, NO BOX) */}
                <div className="pt-6 border-t border-[#080F1E]/12 flex items-start gap-3">
                  <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654] shrink-0 mt-1" />
                  <p className="text-sm sm:text-[15px] font-light text-[#080F1E]/80 leading-snug">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#080F1E] font-medium mr-2 block sm:inline">
                      TARGET MANDATE AUDIENCE:
                    </span>
                    {currentMandate.targetAudience}
                  </p>
                </div>

                {/* Open 2-Column Split: Strategic Focus vs Core Deliverables (NO BOXES) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#080F1E]/12">
                  {/* Strategic Focus Areas List */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                      STRATEGIC FOCUS AREAS
                    </h4>
                    <ul className="space-y-3.5">
                      {currentMandate.focus.map((item, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-3 text-sm sm:text-[15px] font-light text-[#080F1E]/85 leading-snug"
                        >
                          <span className="text-[#1E40AF] font-bold text-xs mt-0.5">―</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Deliverables & Artifacts (Hairline Separated, NO BOXES) */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                      CORE DELIVERABLES & ARTIFACTS
                    </h4>
                    <div className="space-y-4">
                      {currentMandate.deliverables.map((del, dIdx) => (
                        <div
                          key={dIdx}
                          className="pb-3 border-b border-[#080F1E]/10 last:border-0"
                        >
                          <span className="text-[10px] font-mono text-[#E6C654] block uppercase font-medium tracking-wider">
                            ARTIFACT 0{dIdx + 1}
                          </span>
                          <p className="text-sm font-medium text-[#080F1E] mt-0.5 leading-snug">
                            {del}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Impact Metrics Row (Open Typography, NO BOXES) */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#080F1E]/12">
                  {currentMandate.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <p className="text-2xl sm:text-3xl font-light font-mono text-[#080F1E] tracking-tight">
                        {m.value}
                      </p>
                      <p className="text-[10px] sm:text-[11px] font-mono text-[#8E9189] uppercase tracking-wider mt-1">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-5">
                  <Link
                    href={currentMandate.href}
                    className="inline-flex items-center gap-3 bg-[#080F1E] text-[#F3EFE6] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#1E40AF] transition-all duration-300 shadow-md group cursor-pointer"
                  >
                    <span>{currentMandate.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#080F1E]/20 text-[#080F1E] text-xs font-mono uppercase tracking-wider hover:border-[#080F1E] transition-colors"
                  >
                    <span>Direct Calendar Line</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Stage & Minimal Assurance (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="overflow-hidden rounded-2xl border border-[#080F1E]/10 shadow-sm">
                  <AnimatedImageCard
                    src={currentMandate.image}
                    alt={currentMandate.title}
                    badge={currentMandate.badge.split("·")[0].trim()}
                    date={`MANDATE ${currentMandate.number}`}
                    meta={currentMandate.duration}
                    title={currentMandate.title}
                    subtitle={currentMandate.tagline}
                    aspectRatio="aspect-[4/5]"
                    index={activeIndex}
                    showCaptionBelow={false}
                    flush
                  />
                </div>

                {/* Minimalist Sovereign Assurance Note (NO HEAVY BOX) */}
                <div className="pt-5 border-t border-[#080F1E]/12 flex items-start gap-3 text-xs text-[#080F1E]/75 leading-relaxed font-light">
                  <SparkStar className="w-3.5 h-3.5 text-[#E6C654] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[11px] text-[#080F1E] font-medium uppercase tracking-wider block mb-1">
                      ASSURANCE STANDARD · ICAI · NFRA · IBBI
                    </span>
                    <p>
                      Every audit defense, valuation model, and executive counsel is backed by
                      Fellow Chartered Accountant (FCA) statutory accountability and complete
                      client confidentiality.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Client Testimonials */}
        <VoicesSection />

        {/* Global CTA Section */}
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
