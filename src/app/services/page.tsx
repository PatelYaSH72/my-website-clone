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
  ElectricBolt,
} from "@/components/sites/helena-marsh/Icons";

export default function ServicesPage() {
  const [activeId, setActiveId] = useState<string>(SERVICE_MANDATES[0].id);
  const [viewMode, setViewMode] = useState<"interactive" | "expanded">("interactive");

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

        {/* Dynamic Mandate Architecture Section */}
        <section
          id="services-console"
          className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto scroll-mt-24"
        >
          {/* Section Eyebrow & Mode Controller */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#080F1E]/12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080F1E]/5 border border-[#080F1E]/10 text-xs font-mono tracking-widest uppercase text-[#8E9189] mb-4">
                <SparkStar className="w-3 h-3 text-[#E6C654]" />
                <span>ADVISORY ARCHITECTURE · 04 MANDATES</span>
              </div>
              <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
                Architectural command for{" "}
                <span className="font-serif italic text-[#1E40AF]">
                  critical fiscal crossroads.
                </span>
              </h2>
            </div>

            {/* View Mode Toggle: Interactive Console vs Deep-Dive All */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/80 border border-[#080F1E]/12 shadow-sm self-start lg:self-end">
              <button
                type="button"
                onClick={() => setViewMode("interactive")}
                className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  viewMode === "interactive"
                    ? "bg-[#080F1E] text-[#F3EFE6] shadow-md"
                    : "text-[#080F1E]/70 hover:text-[#080F1E]"
                }`}
              >
                <span>⚡ Interactive Console</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("expanded")}
                className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  viewMode === "expanded"
                    ? "bg-[#080F1E] text-[#F3EFE6] shadow-md"
                    : "text-[#080F1E]/70 hover:text-[#080F1E]"
                }`}
              >
                <span>📋 View All Mandates</span>
              </button>
            </div>
          </div>

          {/* Sticky Interactive Mandate Switcher Bar */}
          <div className="sticky top-20 sm:top-24 z-30 mb-10 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-[#F3EFE6]/90 backdrop-blur-xl border-y sm:border sm:rounded-2xl border-[#080F1E]/10 shadow-[0_8px_30px_rgba(8,15,30,0.04)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {SERVICE_MANDATES.map((mandate) => {
                const isActive = mandate.id === activeId;
                const leadMetric = mandate.metrics[0];

                return (
                  <button
                    key={mandate.id}
                    type="button"
                    onClick={() => {
                      setActiveId(mandate.id);
                      if (viewMode === "expanded") {
                        const el = document.getElementById(mandate.id);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className={`group relative flex flex-col items-start p-3 sm:p-4 rounded-xl text-left transition-all duration-300 ${
                      isActive
                        ? "bg-[#080F1E] text-[#F3EFE6] shadow-lg shadow-[#080F1E]/15 scale-[1.01]"
                        : "bg-white/60 hover:bg-white text-[#080F1E] border border-[#080F1E]/06 hover:border-[#080F1E]/15"
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-[11px] font-mono tracking-wider mb-1.5">
                      <span
                        className={`font-semibold ${
                          isActive ? "text-[#E6C654]" : "text-[#8E9189]"
                        }`}
                      >
                        {mandate.number}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                          isActive
                            ? "bg-white/10 text-[#E6C654]"
                            : "bg-[#080F1E]/5 text-[#080F1E]/70"
                        }`}
                      >
                        {leadMetric.value}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium leading-tight truncate w-full">
                      {mandate.title}
                    </p>

                    {isActive && (
                      <motion.div
                        layoutId="activeTabGlow"
                        className="absolute bottom-0 inset-x-4 h-[2px] bg-[#E6C654] rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MODE 1: INTERACTIVE CONSOLE SHOWCASE */}
          {viewMode === "interactive" && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMandate.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-3xl sm:rounded-[36px] bg-white/95 border border-[#080F1E]/12 shadow-[0_30px_90px_rgba(8,15,30,0.08)] overflow-hidden p-6 sm:p-10 lg:p-14"
              >
                {/* Cockpit Top Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-[#080F1E]/10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#080F1E] text-[#E6C654] font-mono text-xs flex items-center justify-center font-bold shadow-sm">
                      {currentMandate.number}
                    </span>
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#1E40AF] font-semibold">
                      {currentMandate.badge}
                    </span>
                    <span className="hidden sm:inline-block w-[1px] h-4 bg-[#080F1E]/15" />
                    <span className="px-3.5 py-1 rounded-full bg-[#080F1E]/5 border border-[#080F1E]/10 text-xs font-mono text-[#080F1E]/80">
                      DURATION: {currentMandate.duration.toUpperCase()}
                    </span>
                  </div>

                  {/* Previous / Next Mandate Nav Controls */}
                  <div className="flex items-center gap-2 font-mono text-xs text-[#8E9189]">
                    <span>
                      {currentMandate.number} / 0{SERVICE_MANDATES.length}
                    </span>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous Mandate"
                        className="w-8 h-8 rounded-full border border-[#080F1E]/15 flex items-center justify-center text-[#080F1E] hover:bg-[#080F1E] hover:text-[#F3EFE6] transition-colors"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next Mandate"
                        className="w-8 h-8 rounded-full border border-[#080F1E]/15 flex items-center justify-center text-[#080F1E] hover:bg-[#080F1E] hover:text-[#F3EFE6] transition-colors"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2-Column Responsive Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  {/* Left Column: Editorial Core (7 cols) */}
                  <div className="lg:col-span-7 space-y-8">
                    {/* Headline & Tagline */}
                    <div>
                      <h3 className="text-[clamp(32px,3.8vw,52px)] leading-[1.04] tracking-tight font-light text-[#080F1E]">
                        {currentMandate.title}
                      </h3>
                      <p className="mt-2.5 text-lg sm:text-xl font-serif italic text-[#1E40AF]">
                        {currentMandate.tagline}
                      </p>
                    </div>

                    {/* Executive Description */}
                    <p className="text-[#080F1E]/80 text-[16px] sm:text-[18px] font-light leading-relaxed max-w-2xl">
                      {currentMandate.description}
                    </p>

                    {/* Target Audience Pill */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#080F1E]/[0.03] border border-[#080F1E]/10 flex items-start gap-3.5">
                      <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654] shrink-0 mt-1" />
                      <div>
                        <span className="text-[11px] font-mono tracking-wider uppercase text-[#8E9189] block">
                          TARGET MANDATE AUDIENCE
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-[#080F1E] mt-1 leading-snug">
                          {currentMandate.targetAudience}
                        </p>
                      </div>
                    </div>

                    {/* Focus & Deliverables Dual-Card Deck */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                      {/* Strategic Focus Areas */}
                      <div className="p-5 sm:p-6 rounded-2xl bg-[#080F1E]/[0.02] border border-[#080F1E]/08 space-y-4">
                        <div className="flex items-center gap-2">
                          <ElectricBolt className="w-3.5 h-3.5 text-[#1E40AF]" />
                          <h4 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                            STRATEGIC FOCUS
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          {currentMandate.focus.map((item, fIdx) => (
                            <li
                              key={fIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-[13.5px] font-light text-[#080F1E]/85 leading-snug"
                            >
                              <span className="w-4 h-4 rounded-full bg-[#1E40AF]/10 text-[#1E40AF] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Core Deliverables & Artifacts */}
                      <div className="p-5 sm:p-6 rounded-2xl bg-[#080F1E]/[0.02] border border-[#080F1E]/08 space-y-4">
                        <div className="flex items-center gap-2">
                          <SparkStar className="w-3.5 h-3.5 text-[#E6C654]" />
                          <h4 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                            CORE DELIVERABLES
                          </h4>
                        </div>
                        <div className="space-y-2.5">
                          {currentMandate.deliverables.map((del, dIdx) => (
                            <div
                              key={dIdx}
                              className="p-3 rounded-xl bg-white border border-[#080F1E]/08 hover:border-[#1E40AF]/30 shadow-xs transition-colors"
                            >
                              <span className="text-[9.5px] font-mono text-[#8E9189] block uppercase">
                                ARTIFACT 0{dIdx + 1}
                              </span>
                              <p className="text-xs sm:text-[12.5px] font-medium text-[#080F1E] mt-0.5 leading-snug">
                                {del}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Impact Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#080F1E]/10">
                      {currentMandate.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="space-y-1">
                          <p className="text-2xl sm:text-3xl font-light font-mono text-[#1E40AF] tracking-tight">
                            {m.value}
                          </p>
                          <p className="text-[10px] sm:text-[11px] font-mono text-[#8E9189] uppercase tracking-wider">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Direct Action Buttons */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Link
                        href={currentMandate.href}
                        className="inline-flex items-center gap-3 bg-[#080F1E] text-[#F3EFE6] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#1E40AF] transition-all duration-300 shadow-md group cursor-pointer"
                      >
                        <span>{currentMandate.ctaText}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href="/book"
                        className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#080F1E]/20 text-[#080F1E] text-xs font-mono uppercase tracking-wider hover:bg-white transition-colors"
                      >
                        <span>Direct Calendar Line</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Visual Stage & Sovereign Assurance (5 cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="overflow-hidden rounded-3xl border border-[#080F1E]/12 bg-[#080F1E]/05 shadow-md">
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

                    {/* Sovereign Assurance Standard Box */}
                    <div className="p-6 rounded-2xl bg-[#080F1E] text-[#F3EFE6] space-y-3 border border-white/10 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <SparkStar className="w-3.5 h-3.5 text-[#E6C654]" />
                          <span className="text-[10px] font-mono text-[#E6C654] uppercase tracking-wider font-semibold">
                            ASSURANCE STANDARD
                          </span>
                        </div>
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
              </motion.div>
            </AnimatePresence>
          )}

          {/* MODE 2: EXPANDED VIEW (ALL 4 MANDATES) */}
          {viewMode === "expanded" && (
            <div className="space-y-16">
              {SERVICE_MANDATES.map((mandate, mandateIdx) => {
                const isReversed = mandateIdx % 2 !== 0;

                return (
                  <section
                    key={mandate.id}
                    id={mandate.id}
                    className="p-6 sm:p-10 lg:p-12 rounded-3xl sm:rounded-[36px] bg-white/95 border border-[#080F1E]/12 shadow-[0_20px_70px_rgba(8,15,30,0.06)] scroll-mt-28"
                  >
                    {/* Header Eyebrow */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#080F1E]/10">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#080F1E] text-[#E6C654] font-mono text-xs flex items-center justify-center font-bold">
                          {mandate.number}
                        </span>
                        <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#1E40AF] font-semibold">
                          {mandate.badge}
                        </span>
                      </div>

                      <span className="px-3.5 py-1 rounded-full bg-[#080F1E]/5 border border-[#080F1E]/10 text-xs font-mono text-[#080F1E]/80">
                        DURATION: {mandate.duration.toUpperCase()}
                      </span>
                    </div>

                    {/* Content Grid */}
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start ${
                        isReversed ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`space-y-7 ${
                          isReversed ? "lg:col-span-7 lg:order-2" : "lg:col-span-7"
                        }`}
                      >
                        <div>
                          <h3 className="text-[clamp(30px,3.6vw,48px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
                            {mandate.title}
                          </h3>
                          <p className="mt-2 text-lg sm:text-xl font-serif italic text-[#1E40AF]">
                            {mandate.tagline}
                          </p>
                        </div>

                        <p className="text-[#080F1E]/80 text-[16px] sm:text-[17.5px] font-light leading-relaxed">
                          {mandate.description}
                        </p>

                        {/* Audience */}
                        <div className="p-4 rounded-xl bg-[#080F1E]/[0.03] border border-[#080F1E]/10 flex items-start gap-3">
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

                        {/* Focus & Deliverables */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-5 rounded-xl bg-[#080F1E]/[0.02] border border-[#080F1E]/08 space-y-3">
                            <h4 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                              STRATEGIC FOCUS
                            </h4>
                            <ul className="space-y-2.5">
                              {mandate.focus.map((item, fIdx) => (
                                <li
                                  key={fIdx}
                                  className="flex items-start gap-2.5 text-xs sm:text-[13px] font-light text-[#080F1E]/85 leading-snug"
                                >
                                  <span className="w-4 h-4 rounded-full bg-[#1E40AF]/10 text-[#1E40AF] flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                                    ✓
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-5 rounded-xl bg-[#080F1E]/[0.02] border border-[#080F1E]/08 space-y-3">
                            <h4 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                              CORE DELIVERABLES
                            </h4>
                            <div className="space-y-2">
                              {mandate.deliverables.map((del, dIdx) => (
                                <div
                                  key={dIdx}
                                  className="p-2.5 rounded-lg bg-white border border-[#080F1E]/08 text-xs font-medium text-[#080F1E]"
                                >
                                  <span className="text-[9px] font-mono text-[#8E9189] block uppercase">
                                    ARTIFACT 0{dIdx + 1}
                                  </span>
                                  <p className="mt-0.5">{del}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Metrics */}
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

                        <div className="pt-2">
                          <Link
                            href={mandate.href}
                            className="inline-flex items-center gap-3 bg-[#080F1E] text-[#F3EFE6] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#1E40AF] transition-all duration-300 shadow-md group cursor-pointer"
                          >
                            <span>{mandate.ctaText}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>

                      {/* Image Column */}
                      <div
                        className={`${
                          isReversed ? "lg:col-span-5 lg:order-1" : "lg:col-span-5"
                        } space-y-5`}
                      >
                        <div className="overflow-hidden rounded-3xl border border-[#080F1E]/12">
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
                            showCaptionBelow={false}
                            flush
                          />
                        </div>

                        <div className="p-5 rounded-2xl bg-[#080F1E] text-[#F3EFE6] space-y-2 border border-white/10">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#E6C654] uppercase tracking-wider font-semibold">
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
          )}
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
