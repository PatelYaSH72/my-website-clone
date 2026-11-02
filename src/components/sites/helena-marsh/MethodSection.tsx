"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { METHOD_STEPS } from "./data";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

export function MethodSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 900);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);

    if (isReducedMotion()) return () => window.removeEventListener("resize", checkWidth);

    const { gsap, ScrollTrigger } = initGSAP();
    const container = containerRef.current;
    if (!container) return () => window.removeEventListener("resize", checkWidth);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          // 4 steps distributed across scroll
          const stepIndex = Math.min(3, Math.floor(p * 4));
          setActiveStep(stepIndex);
        },
      });
    });

    return () => {
      mm.revert();
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  return (
    <section
      id="method"
      ref={containerRef}
      className={`relative w-full ${
        isDesktop ? "h-[380vh] sm:h-[420vh]" : "py-24 sm:py-32"
      } bg-[#F3EFE6]`}
    >
      {/* Pinned Stage on Desktop (sticky top: 0, 100vh) */}
      <div
        className={`${
          isDesktop
            ? "sticky top-0 h-screen overflow-hidden flex items-center"
            : "relative"
        } max-w-[1360px] mx-auto px-6`}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Progress Bar & Steps */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189] mb-3">
                HOW THE ADVISORY RUNS
              </p>
              <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
                Four moves,{" "}
                <span className="font-serif italic text-[#E6C654]">in this order.</span>
              </h2>
              <p className="mt-4 text-[#080F1E]/70 text-[16px] sm:text-[18px] max-w-lg leading-relaxed font-light">
                We do not deal in performative corporate checklists. We execute a disciplined
                four-stage forensic audit and capital architecture that fortifies balance sheet resilience.
              </p>
            </div>

            {/* Scroll Progress Bar Indicator on Desktop */}
            <div className="hidden lg:block w-full h-[2px] bg-[#080F1E]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E6C654] transition-all duration-100 origin-left"
                style={{
                  width: `${Math.min(100, Math.max(12, scrollProgress * 100))}%`,
                }}
              />
            </div>

            {/* Desktop: Active Step Display or Mobile: All Steps */}
            {isDesktop ? (
              <div className="relative min-h-[220px]">
                {METHOD_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={step.number}
                      className={`absolute inset-0 p-8 rounded-3xl border transition-all duration-500 flex flex-col justify-between ${
                        isActive
                          ? "opacity-100 translate-y-0 bg-[#080F1E] text-[#F3EFE6] border-[#080F1E] shadow-2xl pointer-events-auto"
                          : "opacity-0 translate-y-6 bg-white/40 text-[#080F1E] border-[#080F1E]/10 pointer-events-none"
                      }`}
                    >
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="font-mono text-xs tracking-widest uppercase text-[#E6C654]">
                          STEP {step.number}
                        </span>
                        <span className="text-xs font-mono text-[#F3EFE6]/50">
                          0{idx + 1} / 04
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-light mb-2 tracking-tight text-[#F3EFE6]">
                          {step.title}
                        </h3>
                        <p className="text-[16px] font-light leading-relaxed text-[#F3EFE6]/80 max-w-xl">
                          {step.description}
                        </p>
                      </div>

                      {/* Small Quick-nav step pills */}
                      <div className="flex items-center gap-2 pt-4">
                        {METHOD_STEPS.map((_, dotIdx) => (
                          <div
                            key={dotIdx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              activeStep === dotIdx
                                ? "w-8 bg-[#E6C654]"
                                : "w-2 bg-[#F3EFE6]/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Mobile fallback: Clean interactive list */
              <div className="space-y-4">
                {METHOD_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={step.number}
                      onClick={() => setActiveStep(idx)}
                      className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-[#080F1E] text-[#F3EFE6] border-[#080F1E] shadow-xl"
                          : "bg-white/60 text-[#080F1E] border-[#080F1E]/10"
                      }`}
                    >
                      <div className="flex items-baseline justify-between mb-2">
                        <span
                          className={`font-mono text-xs tracking-widest uppercase ${
                            isActive ? "text-[#E6C654]" : "text-[#8E9189]"
                          }`}
                        >
                          STEP {step.number}
                        </span>
                        <span
                          className={`text-xs font-mono ${
                            isActive ? "text-[#F3EFE6]/50" : "text-[#080F1E]/40"
                          }`}
                        >
                          0{idx + 1} / 04
                        </span>
                      </div>
                      <h3
                        className={`text-xl font-light mb-1 tracking-tight ${
                          isActive ? "text-[#F3EFE6]" : "text-[#080F1E]"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm font-light leading-relaxed ${
                          isActive ? "text-[#F3EFE6]/80" : "text-[#080F1E]/70"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Stacked Unmasking Photos with Dynamic Rotation */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div
              className="relative w-full max-w-[460px] aspect-[4/5] sm:h-[68vh] rounded-[28px] overflow-hidden shadow-2xl border border-[#080F1E]/15 bg-[#080F1E] transition-transform duration-500 ease-out"
              style={{
                transform: `rotate(${(scrollProgress - 0.5) * -4}deg)`,
              }}
            >
              {/* Stacked Photos unmasking in order */}
              {METHOD_STEPS.map((step, idx) => {
                const isRevealed = activeStep >= idx;
                return (
                  <div
                    key={idx}
                    className="absolute inset-0 w-full h-full transition-all duration-700 ease-out"
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
                      className="object-cover filter grayscale contrast-105"
                      sizes="(max-width: 1024px) 100vw, 480px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/85 via-transparent to-transparent pointer-events-none" />
                  </div>
                );
              })}

              {/* Photo Bottom Caption */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between text-[#F3EFE6]">
                <div>
                  <p className="text-xs font-mono uppercase text-[#E6C654] tracking-wider">
                    Move 0{activeStep + 1}
                  </p>
                  <p className="text-xl sm:text-2xl font-light">
                    {METHOD_STEPS[activeStep].title}
                  </p>
                </div>
                <span className="text-3xl font-light text-[#F3EFE6]/30 font-mono">
                  {METHOD_STEPS[activeStep].number}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
