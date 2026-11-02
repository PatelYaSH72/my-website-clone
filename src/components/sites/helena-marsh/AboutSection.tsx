"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const credentials = [
    "FELLOW CHARTERED ACCOUNTANT (FCA) — ICAI",
    "REGISTERED VALUER (SECURITIES & ASSETS) — IBBI",
    "DISA (INFORMATION SYSTEMS AUDIT) CERTIFIED",
    "STRATEGIC CFO & BOARDROOM ADVISOR SINCE 2012",
  ];

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
          setScrollProgress(self.progress);
        },
      });
    });

    return () => {
      mm.revert();
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  // Calculation parameters matching Framer tokens
  // --u: window unmask progress (0 to 0.55 of scroll)
  const u = Math.max(0, Math.min(1, scrollProgress / 0.55));
  // --v: bio copy reveal progress (0.55 to 0.95 of scroll)
  const v = Math.max(0, Math.min(1, (scrollProgress - 0.55) / 0.35));

  // Arch clip path morphing to full stage
  const topInset = (1 - u) * 16;
  const bottomInset = (1 - u) * 14;
  const sideInset = (1 - u) * 34;
  const roundTop = (1 - u) * 44;
  const roundBottom = (1 - u) * 8;
  const archClip = `inset(${topInset}% ${sideInset}% ${bottomInset}% ${sideInset}% round ${roundTop}vw ${roundTop}vw ${roundBottom}px ${roundBottom}px)`;

  // Word slide offsets
  const wordOpacity = Math.max(0, 1 - u * 8);
  const wordLeftY = -u * 14;
  const wordRightY = u * 14;

  return (
    <section
      id="about"
      ref={containerRef}
      className={`relative w-full ${
        isDesktop ? "h-[280vh]" : "py-28 sm:py-36"
      } bg-[#F3EFE6]`}
    >
      {isDesktop ? (
        /* Pinned Desktop Experience */
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Centered Arch Window Morphing to Full Screen */}
          <div
            className="absolute inset-0 w-full h-full bg-[#080F1E] overflow-hidden transition-all duration-75 ease-out"
            style={{
              clipPath: archClip,
              WebkitClipPath: archClip,
            }}
          >
            <Image
              src="/sites/helena-marsh/images/fenil-arch.png"
              alt="CA Fenil Shah portrait"
              fill
              className="object-cover transition-all duration-100 ease-out"
              style={{
                transform: `scale(${1.2 - u * 0.16})`,
                filter: `grayscale(0.3) contrast(1.05) brightness(${0.92 - v * 0.45})`,
              }}
              priority
            />
            {/* Dark Vignette Overlay on Copy Phase */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#080F1E] via-[#080F1E]/80 to-transparent transition-opacity duration-300 pointer-events-none"
              style={{ opacity: v }}
            />
          </div>

          {/* Intro Floating Headline Words ("Meet" and "Fenil") */}
          <div
            className="absolute z-10 pointer-events-none flex items-center gap-16 select-none"
            style={{ opacity: wordOpacity }}
          >
            <span
              className="text-[clamp(44px,6vw,90px)] font-light tracking-tight text-[#080F1E] uppercase"
              style={{
                transform: `translate(-12vw, ${wordLeftY}vh)`,
              }}
            >
              Meet
            </span>
            <span
              className="text-[clamp(52px,7.5vw,110px)] font-serif italic text-[#E6C654] tracking-tight"
              style={{
                transform: `translate(12vw, ${wordRightY}vh)`,
              }}
            >
              Fenil
            </span>
          </div>

          {/* Bio & Credentials Overlay (Rides up as scroll approaches end) */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center px-6 lg:px-12 pointer-events-none"
            style={{
              opacity: v,
              transform: `translateY(${(1 - v) * 80}px)`,
            }}
          >
            <div className="max-w-[1240px] w-full text-[#F3EFE6] pointer-events-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-6">
                <p className="text-xs font-mono tracking-widest uppercase text-[#E6C654]">
                  ABOUT CA FENIL SHAH
                </p>
                <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light">
                  Fourteen years inside{" "}
                  <span className="font-serif italic text-[#E6C654]">boardrooms like yours.</span>
                </h2>
                <p className="text-[#F3EFE6]/80 text-[18px] sm:text-[20px] font-light leading-relaxed max-w-2xl">
                  Before establishing this strategic advisory, I advised enterprise boards, high-growth
                  unicorn CFOs, and family office promoters across India, the UK, and Singapore. I know
                  what Monday morning feels like when debt covenants tighten or tax scrutiny arrives —
                  and I know how to engineer defensive permanence.
                </p>
                <p className="text-[#F3EFE6]/70 text-[15px] sm:text-[16px] font-light leading-relaxed max-w-2xl">
                  My work is grounded in forensic balance sheet analysis, Ind AS / IFRS statutory
                  governance, and working capital optimization. There are no generic templates and no
                  performative bookkeeping: only rigorous auditing, unvarnished fiscal truth, and
                  verifiable EBITDA compounding.
                </p>
                {/* Credentials */}
                <div className="pt-4 border-t border-[#F3EFE6]/15 max-w-2xl">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] sm:text-[13px] font-mono text-[#F3EFE6]/75">
                    {credentials.map((cred, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[#E6C654] rotate-45 shrink-0" />
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-base font-medium text-[#E6C654] hover:text-[#F0D268] transition-colors"
                  >
                    <span>The longer story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile Fallback Layout */
        <div className="max-w-[1360px] mx-auto px-6 grid grid-cols-1 gap-12 items-center">
          <div className="relative w-full max-w-[420px] mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-[#080F1E]/10 bg-[#080F1E]">
            <Image
              src="/sites/helena-marsh/images/fenil-arch.png"
              alt="CA Fenil Shah, Chartered Accountant"
              fill
              className="object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#F3EFE6]">
              <span className="font-serif italic text-2xl">CA Fenil Shah</span>
              <span className="text-xs font-mono uppercase text-[#E6C654] tracking-widest">
                Mumbai · London
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
              ABOUT CA FENIL SHAH
            </p>
            <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
              Fourteen years inside{" "}
              <span className="font-serif italic text-[#E6C654]">boardrooms like yours.</span>
            </h2>
            <p className="text-[#080F1E]/80 text-[18px] font-light leading-relaxed">
              Before establishing this strategic advisory, I advised enterprise boards, high-growth
              unicorn CFOs, and family office promoters across India, the UK, and Singapore. I know how to
              engineer defensive balance sheet permanence.
            </p>
            <div className="pt-4 border-t border-[#080F1E]/15 space-y-3">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] font-mono text-[#080F1E]/75">
                {credentials.map((cred, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#E6C654] rotate-45 shrink-0" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-base font-medium text-[#080F1E] hover:text-[#E6C654] transition-colors"
              >
                <span>The longer story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
