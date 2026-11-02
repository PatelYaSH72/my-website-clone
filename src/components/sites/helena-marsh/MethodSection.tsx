"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { METHOD_STEPS } from "./data";
import { DiamondMark } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

export function MethodSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);

    if (isReducedMotion()) {
      return () => window.removeEventListener("resize", checkWidth);
    }

    const { ScrollTrigger } = initGSAP();
    const container = containerRef.current;
    if (!container) return () => window.removeEventListener("resize", checkWidth);

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: false,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Comfortable wide intervals across 560vh
        let current = 0;
        if (p >= 0.74) current = 3;
        else if (p >= 0.49) current = 2;
        else if (p >= 0.24) current = 1;
        else current = 0;

        setActiveStep(current);
      },
    });

    return () => {
      st.kill();
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const scrollToStep = (idx: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    // Map idx (0, 1, 2, 3) to the center of each step's scroll zone
    const targetPercentages = [0.08, 0.36, 0.62, 0.88];
    const targetScroll = containerTop + targetPercentages[idx] * scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section
      id="method"
      ref={containerRef}
      className={`relative w-full ${
        isDesktop ? "h-[560vh]" : "py-24 sm:py-32"
      } bg-[#F3EFE6] text-[#080F1E]`}
    >
      {/* Pinned Stage on Desktop (sticky top: 0, 100vh) */}
      <div
        className={`${
          isDesktop
            ? "sticky top-0 h-screen overflow-hidden flex flex-col justify-center"
            : "relative"
        } max-w-[1360px] mx-auto px-6 py-10 lg:py-0`}
      >
        {/* Section Header */}
        <div className="mb-8 lg:mb-10 max-w-2xl">
          <div className="flex items-center gap-2.5 mb-3">
            <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654]" />
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#8E9189]">
              HOW THE ADVISORY RUNS
            </p>
          </div>
          <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
            Four moves,{" "}
            <span className="font-serif italic text-[#E6C654]">in this order.</span>
          </h2>
          <p className="mt-3 text-[#080F1E]/75 text-[15px] sm:text-[17px] font-light leading-relaxed">
            We do not deal in performative corporate checklists. We execute a disciplined
            four-stage forensic audit and capital architecture that fortifies balance sheet resilience.
          </p>
        </div>

        {/* Interactive Desktop Layout */}
        {isDesktop ? (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Interactive Stepper Tabs & Active Step Card */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              {/* Stepper Navigation Pills with Smooth Progress Bar */}
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2.5">
                  {METHOD_STEPS.map((step, idx) => {
                    const isActive = activeStep === idx;
                    const isPassed = activeStep > idx;
                    return (
                      <button
                        key={step.number}
                        onClick={() => scrollToStep(idx)}
                        className={`text-left p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-[#080F1E] text-[#F3EFE6] border-[#080F1E] shadow-xl scale-[1.02]"
                            : isPassed
                            ? "bg-white/85 text-[#080F1E] border-[#080F1E]/15 hover:bg-white"
                            : "bg-white/40 text-[#080F1E]/60 border-[#080F1E]/10 hover:bg-white/70"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`font-mono text-[10px] tracking-wider uppercase font-medium ${
                              isActive ? "text-[#E6C654]" : "text-[#8E9189]"
                            }`}
                          >
                            STEP {step.number}
                          </span>
                          <span
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              isActive
                                ? "bg-[#E6C654] scale-110 shadow-[0_0_8px_#E6C654]"
                                : isPassed
                                ? "bg-[#080F1E]"
                                : "bg-[#080F1E]/20"
                            }`}
                          />
                        </div>
                        <p
                          className={`text-xs font-medium truncate ${
                            isActive ? "text-[#F3EFE6]" : "text-[#080F1E]"
                          }`}
                        >
                          {step.title}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Smooth Progress Track */}
                <div className="w-full h-[3px] bg-[#080F1E]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1E40AF] via-[#E6C654] to-[#F0D268] origin-left transition-all duration-200 ease-out"
                    style={{
                      width: `${Math.min(100, Math.max(10, scrollProgress * 100))}%`,
                    }}
                  />
                </div>
              </div>

              {/* Active Step Stage Card with Smooth Crossfade */}
              <div className="relative min-h-[320px] w-full">
                {METHOD_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isPassed = activeStep > idx;
                  return (
                    <div
                      key={step.number}
                      className={`absolute inset-0 p-8 sm:p-10 rounded-3xl border border-[#080F1E]/15 shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? "opacity-100 translate-y-0 filter-none z-10 pointer-events-auto"
                          : isPassed
                          ? "opacity-0 -translate-y-6 blur-[4px] z-0 pointer-events-none"
                          : "opacity-0 translate-y-6 blur-[4px] z-0 pointer-events-none"
                      }`}
                      style={{
                        background:
                          "radial-gradient(ellipse at 85% 15%, rgba(30, 64, 175, 0.4) 0%, transparent 65%), #080F1E",
                        color: "#F3EFE6",
                      }}
                    >
                      {/* Top Row: Step Tag & Timeline */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#E6C654]/15 border border-[#E6C654]/30 text-[#E6C654] font-mono text-xs tracking-wider uppercase font-medium">
                            STEP {step.number}
                          </span>
                          <span className="font-mono text-xs tracking-widest uppercase text-[#F3EFE6]/60">
                            {step.tag || "ADVISORY STAGE"}
                          </span>
                        </div>
                        <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F3EFE6]/80">
                          {step.timeline || `Phase 0${idx + 1}`}
                        </span>
                      </div>

                      {/* Middle: Title & Narrative */}
                      <div className="space-y-3">
                        <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#F3EFE6]">
                          {step.title}
                        </h3>
                        <p className="text-[15px] sm:text-[16px] font-light leading-relaxed text-[#F3EFE6]/85 max-w-xl">
                          {step.description}
                        </p>
                      </div>

                      {/* Bottom: Deliverables List */}
                      {step.deliverables && step.deliverables.length > 0 && (
                        <div className="pt-5 mt-5 border-t border-white/10">
                          <p className="text-[11px] font-mono tracking-widest uppercase text-[#E6C654] mb-2.5">
                            KEY DELIVERABLES
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {step.deliverables.map((del, dIdx) => (
                              <span
                                key={dIdx}
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-light text-[#F3EFE6]/90 flex items-center gap-1.5"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C654]" />
                                {del}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Stacked Unmasking Photos with Smooth Clip-path */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div
                className="relative w-full max-w-[440px] aspect-[4/5] sm:h-[64vh] max-h-[580px] rounded-[32px] overflow-hidden shadow-2xl border border-[#080F1E]/20 bg-[#080F1E] transition-transform duration-500 ease-out"
                style={{
                  transform: `rotate(${(scrollProgress - 0.5) * -3}deg)`,
                }}
              >
                {/* Floating Top Badge */}
                <div className="absolute top-5 left-5 z-30 px-3.5 py-1.5 rounded-full bg-[#080F1E]/75 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E6C654] animate-pulse" />
                  <span className="font-mono text-xs text-[#F3EFE6] tracking-wider uppercase">
                    MOVE 0{activeStep + 1} / 04
                  </span>
                </div>

                {/* Stacked Photos unmasking in order */}
                {METHOD_STEPS.map((step, idx) => {
                  const isRevealed = activeStep >= idx;
                  return (
                    <div
                      key={idx}
                      className="absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                      style={{
                        clipPath: isRevealed
                          ? "inset(0% 0% 0% 0%)"
                          : "inset(100% 0% 0% 0%)",
                        WebkitClipPath: isRevealed
                          ? "inset(0% 0% 0% 0%)"
                          : "inset(100% 0% 0% 0%)",
                        zIndex: idx + 1,
                      }}
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover filter contrast-105"
                        sizes="(max-width: 1024px) 100vw, 480px"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/90 via-[#080F1E]/20 to-transparent pointer-events-none" />
                    </div>
                  );
                })}

                {/* Photo Bottom Caption Card */}
                <div className="absolute bottom-5 left-5 right-5 z-30 p-5 rounded-2xl bg-[#080F1E]/80 backdrop-blur-md border border-white/10 flex items-end justify-between text-[#F3EFE6]">
                  <div className="space-y-1">
                    <p className="text-[11px] font-mono uppercase text-[#E6C654] tracking-wider">
                      {METHOD_STEPS[activeStep].tag || "OPERATING DISCIPLINE"}
                    </p>
                    <p className="text-lg sm:text-xl font-light text-[#F3EFE6]">
                      {METHOD_STEPS[activeStep].title}
                    </p>
                    <p className="text-xs font-mono text-[#F3EFE6]/60">
                      {METHOD_STEPS[activeStep].timeline || `Phase 0${activeStep + 1}`}
                    </p>
                  </div>
                  <span className="text-3xl font-light text-[#E6C654]/40 font-mono">
                    {METHOD_STEPS[activeStep].number}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Mobile Layout: Responsive Editorial Cards Sequence */
          <div className="space-y-8">
            {METHOD_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="rounded-3xl border border-[#080F1E]/15 overflow-hidden shadow-xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 85% 15%, rgba(30, 64, 175, 0.4) 0%, transparent 65%), #080F1E",
                  color: "#F3EFE6",
                }}
              >
                {/* Mobile Photo Banner */}
                <div className="relative w-full h-[220px]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#080F1E]/80 backdrop-blur-sm border border-white/10 text-xs font-mono text-[#E6C654]">
                    STEP {step.number} · {step.timeline || `Phase 0${idx + 1}`}
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-[#E6C654] tracking-widest uppercase">
                      {step.tag || "ADVISORY STAGE"}
                    </span>
                    <h3 className="text-2xl font-light tracking-tight text-[#F3EFE6] mt-1">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm font-light leading-relaxed text-[#F3EFE6]/80">
                    {step.description}
                  </p>

                  {step.deliverables && step.deliverables.length > 0 && (
                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <p className="text-[10px] font-mono tracking-widest uppercase text-[#E6C654]">
                        DELIVERABLES
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {step.deliverables.map((del, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-light text-[#F3EFE6]/90 flex items-center gap-1"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#E6C654]" />
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
