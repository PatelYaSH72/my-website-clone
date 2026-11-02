"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, RESULTS_STATS } from "./data";
import { ArrowRight } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

export function ResultsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isReducedMotion()) return;
    const { gsap } = initGSAP();

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Staggered card entrance reveals
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (i % 2) * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="evidence"
      ref={containerRef}
      className="relative bg-[#080F1E] text-[#F3EFE6] py-32 sm:py-44 z-20"
      style={{
        clipPath: "polygon(0 7vw, 100% 0, 100% calc(100% - 7vw), 0 100%)",
        WebkitClipPath: "polygon(0 7vw, 100% 0, 100% calc(100% - 7vw), 0 100%)",
        marginTop: "-7vw",
        marginBottom: "-7vw",
        background:
          "radial-gradient(55% 65% at 20% 40%, rgba(28, 70, 160, 0.45) 0%, transparent 70%), #080F1E",
      }}
    >
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 pt-16 sm:pt-24 pb-20 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Stage at top: 120px */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] space-y-10 self-start z-10">
            <div className="space-y-4">
              {/* Eyebrow */}
              <p className="text-[12px] sm:text-[13px] font-mono tracking-[0.2em] uppercase text-[#E6C654]">
                — EVIDENCE
              </p>

              {/* Heading */}
              <h2 className="text-[clamp(36px,4.6vw,68px)] leading-[1.04] font-light tracking-tight text-[#F3EFE6]">
                Measured by the{" "}
                <span className="block">
                  numbers{" "}
                  <em className="font-serif italic text-[#E6C654] font-normal not-italic">
                    and
                  </em>
                </span>
                auditors.
              </h2>

              {/* Lead copy */}
              <p className="text-[#F3EFE6]/70 text-[15px] sm:text-[17px] font-light leading-relaxed max-w-md pt-2">
                Every engagement is tied directly to audited balance sheets, tax savings, and board sign-offs. These
                are verifiable financial results, not estimates.
              </p>
            </div>

            {/* 3 Stats with clean divider lines */}
            <div className="space-y-6 pt-4 border-t border-[#F3EFE6]/15 max-w-md">
              {RESULTS_STATS.map((stat, i) => (
                <div key={i} className="flex items-baseline justify-between gap-4">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#E6C654]">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-[12px] font-mono tracking-wider text-[#F3EFE6]/60 uppercase text-right max-w-[200px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Case Notes CTA Button */}
            <div className="pt-2">
              <Link
                href="/results"
                className="inline-flex items-center gap-2 border border-[#F3EFE6]/20 bg-[#080F1E] px-5 py-2.5 rounded-full text-[13px] font-medium text-[#F3EFE6] hover:border-[#E6C654] hover:text-[#E6C654] transition-colors"
              >
                <span>Read the case notes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Case Studies with Masonry Offset Scrolling Past Left Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 sm:gap-y-20 lg:pb-36">
            {CASE_STUDIES.map((c, i) => {
              const isEven = i % 2 === 1;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  className={`space-y-6 ${isEven ? "lg:translate-y-36" : ""}`}
                >
                  {/* Photo with rounded-[4px] matching Framer */}
                  <div className="relative w-full aspect-[4/3.5] rounded-[4px] overflow-hidden bg-[#0D1C38] shadow-2xl">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover filter grayscale contrast-105 hover:grayscale-0 hover:scale-105 transition-all duration-700"
                      sizes="(max-width: 640px) 100vw, 400px"
                    />
                  </div>

                  {/* Role Tag in Subtle Yellow */}
                  <p className="text-[11px] sm:text-[12px] font-mono tracking-[0.16em] text-[#E6C654] uppercase">
                    {c.client}
                  </p>

                  {/* Headline Title in White */}
                  <h3 className="text-2xl sm:text-[26px] font-light text-[#F3EFE6] leading-snug tracking-tight">
                    {c.title}
                  </h3>

                  {/* Narrative paragraph */}
                  <p className="text-[14px] sm:text-[15px] font-light text-[#F3EFE6]/70 leading-relaxed">
                    {c.story}
                  </p>

                  {/* 2 Big White Metrics matching video */}
                  <div className="pt-4 border-t border-[#F3EFE6]/15 grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <span className="text-3xl sm:text-4xl font-light text-[#F3EFE6] tracking-tight block">
                        {c.metric1.value}
                      </span>
                      <p className="text-[10px] sm:text-[11px] font-mono text-[#F3EFE6]/55 uppercase leading-tight tracking-wider">
                        {c.metric1.label}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xl sm:text-4xl font-light text-[#F3EFE6] tracking-tight block">
                        {c.metric2.value}
                      </span>
                      <p className="text-[10px] sm:text-[11px] font-mono text-[#F3EFE6]/55 uppercase leading-tight tracking-wider">
                        {c.metric2.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
