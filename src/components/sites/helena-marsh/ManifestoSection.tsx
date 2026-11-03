"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

const MANIFESTO_WORDS = [
  { text: "Most", isAcc: false },
  { text: "enterprises", isAcc: false },
  { text: "do", isAcc: false },
  { text: "not", isAcc: false },
  { text: "fail", isAcc: false },
  { text: "from", isAcc: false },
  { text: "ambition.", isAcc: true },
  { text: "They", isAcc: false },
  { text: "fail", isAcc: false },
  { text: "from", isAcc: false },
  { text: "an", isAcc: false },
  { text: "absence", isAcc: false },
  { text: "of", isAcc: false },
  { text: "fiscal", isAcc: false },
  { text: "clarity", isAcc: false },
  { text: "—", isAcc: false },
  { text: "and", isAcc: false },
  { text: "a", isAcc: false },
  { text: "partner", isAcc: false },
  { text: "in", isAcc: false },
  { text: "the", isAcc: false },
  { text: "room", isAcc: false },
  { text: "who", isAcc: false },
  { text: "sees", isAcc: false },
  { text: "what", isAcc: false },
  { text: "everyone", isAcc: false },
  { text: "else", isAcc: false },
  { text: "is", isAcc: false },
  { text: "hoping", isAcc: false },
  { text: "to", isAcc: false },
  { text: "avoid.", isAcc: true },
];

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isReducedMotion()) return;

    const { gsap, ScrollTrigger } = initGSAP();
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  // Wipe progress calculation: triggers from 0.64 to 0.96
  const wipeProgress = Math.max(0, Math.min(1, (scrollProgress - 0.64) / 0.32));

  // Framer polygon: left edge ascends first, then right edge sweeps up
  const wipeClip = `polygon(0 calc(175% - ${wipeProgress * 175}%), 100% calc(100% - ${wipeProgress * 175}%), 100% 101%, 0 101%)`;
  const wipeTranslateY = `${(1 - wipeProgress) * 80}px`;

  // Photos Parallax positions
  // Photo 1 (Top notebook): floats upward as you scroll
  const p1Y = `${40 - scrollProgress * 130}vh`;
  const p1Rot = `${1 - scrollProgress * 5}deg`;

  // Photo 2 (Bottom arch stairs): enters from bottom and moves up
  const p2Y = `${115 - scrollProgress * 135}vh`;
  const p2Rot = `${-3 + scrollProgress * 5}deg`;

  return (
    <section
      ref={containerRef}
      className="relative h-[320vh] sm:h-[350vh] w-full bg-[#F3EFE6]"
    >
      {/* Pinned Sticky Stage: 100vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center px-6 sm:px-12 lg:px-16">
        <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Eyebrow, Illumination Text & Signature */}
          <div className="lg:col-span-8 z-10 flex flex-col justify-center space-y-8 pr-4">
            {/* Eyebrow */}
            <p className="text-[12px] sm:text-[13px] font-mono tracking-[0.2em] uppercase text-[#8E9189]">
              — WHAT I BELIEVE
            </p>

            {/* Statement with Word-by-Word Scroll Illumination */}
            <h2 className="text-[clamp(30px,4.3vw,64px)] leading-[1.08] tracking-[-0.035em] font-light max-w-3xl select-none">
              {MANIFESTO_WORDS.map((w, idx) => {
                // Word illumination progress: each word illuminates smoothly in order from progress 0 to 0.60
                const wordT = Math.max(0, Math.min(1, (scrollProgress * 32) / 0.6 - idx));

                // Color calculation: transitions from soft stone grey (#9E9A90) to dark (#080F1E)
                const isLit = wordT >= 0.6;
                const textColor = isLit
                  ? w.isAcc
                    ? "#E6C654"
                    : "#080F1E"
                  : "#9E9A90";

                return (
                  <span
                    key={idx}
                    className="inline-block transition-colors duration-150 mr-[0.26em] last:mr-0"
                    style={{
                      color: textColor,
                      opacity: 0.35 + wordT * 0.65,
                    }}
                  >
                    {w.isAcc ? (
                      <em className="font-serif italic font-normal text-[#E6C654] not-italic">
                        {w.text}
                      </em>
                    ) : (
                      w.text
                    )}
                  </span>
                );
              })}
            </h2>

            {/* Bottom Sub-line */}
            <p className="text-[11px] sm:text-[12px] font-mono tracking-[0.18em] uppercase text-[#8E9189] pt-2">
              CA FENIL SHAH — STRATEGIC ADVISORY SINCE 2012
            </p>
          </div>

          {/* Right Column: Floating Parallax Images */}
          <div className="hidden lg:block lg:col-span-4 relative h-screen pointer-events-none">
            {/* Photo 1: Top Open Notebook with Pen */}
            <div
              className="absolute right-0 w-[clamp(210px,20vw,290px)] aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-[#080F1E]/10 bg-[#080F1E] transition-transform duration-75 ease-out z-[8]"
              style={{
                top: "14vh",
                transform: `translateY(${p1Y}) rotate(${p1Rot})`,
              }}
            >
              <Image
                src="/sites/helena-marsh/images/manifesto-ledger.webp"
                alt="Analytical balance sheet and ledger"
                fill
                className="object-cover filter grayscale contrast-105"
                sizes="(max-width: 1200px) 25vw, 300px"
              />
            </div>

            {/* Photo 2: Bottom Arch-cut Photo of Stairs */}
            <div
              className="absolute right-8 w-[clamp(170px,16vw,230px)] aspect-[3/4] rounded-t-[120px] rounded-b-lg overflow-hidden shadow-2xl border border-[#080F1E]/10 bg-[#080F1E] transition-transform duration-75 ease-out z-[7]"
              style={{
                top: "46vh",
                transform: `translateY(${p2Y}) rotate(${p2Rot})`,
              }}
            >
              <Image
                src="/sites/helena-marsh/images/manifesto-bkc.webp"
                alt="Modern corporate financial towers"
                fill
                className="object-cover filter grayscale contrast-105"
                sizes="(max-width: 1200px) 20vw, 240px"
              />
            </div>
          </div>
        </div>

        {/* Diagonal Section Transition Wipe */}
        <div
          className="absolute inset-0 z-20 bg-[#080F1E] text-[#F3EFE6] pointer-events-none"
          style={{
            clipPath: wipeClip,
            WebkitClipPath: wipeClip,
            background:
              "radial-gradient(65% 75% at 85% 25%, rgba(28, 70, 160, 0.95) 0%, transparent 70%), #080F1E",
          }}
        >
          {/* Inner Content of Wipe: Unveils "Four kinds of principal." */}
          <div
            className="w-full h-full max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-center items-start transition-transform duration-100 ease-out"
            style={{
              transform: `translateY(${wipeTranslateY})`,
            }}
          >
            {/* Eyebrow */}
            <p className="text-[12px] sm:text-[13px] font-mono tracking-[0.2em] uppercase text-[#E6C654] mb-4">
              — WHO I WORK WITH
            </p>

            {/* Heading matching video */}
            <h2 className="text-[clamp(38px,6vw,84px)] leading-[1.02] tracking-tight font-light text-[#F3EFE6] max-w-4xl">
              Four kinds of{" "}
              <span className="font-serif italic text-[#E6C654] font-normal not-italic">
                principal.
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
