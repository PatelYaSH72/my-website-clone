"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/sites/helena-marsh/Header";
import { PageHero } from "@/components/sites/helena-marsh/PageHero";
import { VoicesSection } from "@/components/sites/helena-marsh/VoicesSection";
import { CtaSection } from "@/components/sites/helena-marsh/CtaSection";
import { Footer } from "@/components/sites/helena-marsh/Footer";
import { AnimatedImageCard } from "@/components/sites/helena-marsh/AnimatedImageCard";
import { SERVICE_MANDATES } from "@/components/sites/helena-marsh/data";
import { DiamondMark, ArrowRight } from "@/components/sites/helena-marsh/Icons";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>("business-consultancy");

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />

      <main className="flex-1">
        {/* Full-Page Majestic Hero Section */}
        <PageHero
          badge="02 SERVICES & MANDATES"
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

        {/* Quick Anchor Navigation */}
        <section className="sticky top-[70px] z-30 bg-[#F3EFE6]/95 backdrop-blur-md border-y border-[#080F1E]/10 py-3.5 px-4 sm:px-6">
          <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <span className="text-xs font-mono tracking-widest uppercase text-[#8E9189] shrink-0">
              SERVICES INDEX:
            </span>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {SERVICE_MANDATES.map((mandate) => (
                <a
                  key={mandate.id}
                  href={`#${mandate.id}`}
                  onClick={() => setActiveTab(mandate.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === mandate.id
                      ? "bg-[#080F1E] text-[#F3EFE6] shadow-sm"
                      : "bg-white/80 text-[#080F1E]/70 hover:bg-[#080F1E]/10"
                  }`}
                >
                  {mandate.number} · {mandate.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* The 4 Mandates Deep-Dive Sections */}
        <div className="divide-y divide-[#080F1E]/10">
          {SERVICE_MANDATES.map((mandate, mandateIdx) => {
            const isReversed = mandateIdx % 2 !== 0;

            return (
              <section
                key={mandate.id}
                id={mandate.id}
                className="py-24 sm:py-32 px-4 sm:px-6 max-w-[1360px] mx-auto scroll-mt-28"
              >
                {/* Mandate Header Eyebrow */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[#080F1E]/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#080F1E] text-[#E6C654] font-mono text-xs flex items-center justify-center font-medium">
                      {mandate.number}
                    </span>
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#8E9189]">
                      {mandate.badge}
                    </span>
                  </div>

                  <span className="px-3.5 py-1 rounded-full bg-white/70 border border-[#080F1E]/10 text-xs font-mono text-[#080F1E]/80">
                    DURATION: {mandate.duration.toUpperCase()}
                  </span>
                </div>

                {/* 2-Column Content + Visual Layout */}
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text Column */}
                  <div
                    className={`space-y-8 ${
                      isReversed ? "lg:col-span-7 lg:order-2" : "lg:col-span-7"
                    }`}
                  >
                    <div>
                      <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.06] tracking-tight font-light text-[#080F1E]">
                        {mandate.title}
                      </h2>
                      <p className="mt-2 text-lg sm:text-xl font-serif italic text-[#1E40AF]">
                        {mandate.tagline}
                      </p>
                    </div>

                    <p className="text-[#080F1E]/80 text-[16px] sm:text-[18px] font-light leading-relaxed">
                      {mandate.description}
                    </p>

                    {/* Target Audience Pill */}
                    <div className="p-4 rounded-xl bg-white/60 border border-[#080F1E]/10 flex items-start gap-3">
                      <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654] shrink-0 mt-1" />
                      <div>
                        <span className="text-[11px] font-mono tracking-wider uppercase text-[#8E9189] block">
                          TARGET MANDATE AUDIENCE
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-[#080F1E] mt-0.5">
                          {mandate.targetAudience}
                        </p>
                      </div>
                    </div>

                    {/* Key Strategic Focus List */}
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                        STRATEGIC FOCUS AREAS
                      </h3>
                      <ul className="space-y-2.5">
                        {mandate.focus.map((item, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-start gap-3 text-sm sm:text-[15px] font-light text-[#080F1E]/85 leading-snug"
                          >
                            <span className="w-4 h-4 rounded-full bg-[#1E40AF]/10 text-[#1E40AF] flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Deliverables Cards */}
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                        CORE DELIVERABLES & ARTIFACTS
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mandate.deliverables.map((del, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-3.5 rounded-xl bg-white/80 border border-[#080F1E]/10 hover:border-[#1E40AF]/30 transition-colors"
                          >
                            <span className="text-[10px] font-mono text-[#8E9189] block">
                              ARTIFACT 0{dIdx + 1}
                            </span>
                            <p className="text-xs sm:text-[13px] font-medium text-[#080F1E] mt-0.5 leading-snug">
                              {del}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#080F1E]/10">
                      {mandate.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <p className="text-xl sm:text-2xl font-light font-mono text-[#1E40AF]">
                            {m.value}
                          </p>
                          <p className="text-[10px] sm:text-[11px] font-mono text-[#8E9189] uppercase tracking-wider mt-0.5">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Consultation Action Button */}
                    <div className="pt-4">
                      <Link
                        href={mandate.href}
                        className="inline-flex items-center gap-3 bg-[#080F1E] text-[#F3EFE6] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#1E40AF] transition-all duration-300 shadow-md group cursor-pointer"
                      >
                        <span>{mandate.ctaText}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Visual Column: Reveal Card with B&W to Vivid Color */}
                  <div
                    className={`${
                      isReversed ? "lg:col-span-5 lg:order-1" : "lg:col-span-5"
                    }`}
                  >
                    <AnimatedImageCard
                      src={mandate.image}
                      alt={mandate.title}
                      badge={mandate.badge.split("·")[0].trim()}
                      date={`MANDATE ${mandate.number}`}
                      meta={mandate.duration}
                      title={mandate.title}
                      subtitle={mandate.tagline}
                      aspectRatio="aspect-[4/5]"
                      index={mandateIdx}
                      showCaptionBelow={true}
                    />

                    {/* Sovereign Assurance Note */}
                    <div className="mt-5 p-5 rounded-2xl bg-[#080F1E] text-[#F3EFE6] space-y-2 border border-[#F3EFE6]/10">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#E6C654] uppercase tracking-wider">
                          ASSURANCE STANDARD
                        </span>
                        <span className="text-[10px] font-mono text-[#F3EFE6]/50">
                          ICAI · NFRA · IBBI
                        </span>
                      </div>
                      <p className="text-xs font-light text-[#F3EFE6]/80 leading-relaxed">
                        Every audit defense, valuation model, and executive counsel is backed by
                        Fellow Chartered Accountant (FCA) statutory accountability and complete
                        client confidentiality.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Client Testimonials */}
        <VoicesSection />

        {/* Global CTA Section */}
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
