"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_QUOTES, HERO_STATS } from "./data";
import { ArrowRight, SparkStar, ElectricBolt } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

interface MonolithSlab {
  id: number;
  num: string;
  label: string;
  innerLeftPercent: number;
}

const MONOLITH_SLABS: MonolithSlab[] = [
  { id: 0, num: "01", label: "PULSE", innerLeftPercent: 0 },
  { id: 1, num: "02", label: "CAPITAL", innerLeftPercent: -100 },
  { id: 2, num: "03", label: "CORE", innerLeftPercent: -200 },
  { id: 3, num: "04", label: "GOVERNANCE", innerLeftPercent: -300 },
  { id: 4, num: "05", label: "VALUE", innerLeftPercent: -400 },
];

export function HeroSection() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [hoveredSlab, setHoveredSlab] = useState<number | null>(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLElement>(null);
  const slabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const quoteTimer = window.setInterval(() => {
      if (HERO_QUOTES.length > 1) {
        setActiveQuote((current) => (current + 1) % HERO_QUOTES.length);
      }
    }, 6500);

    if (isReducedMotion()) {
      return () => window.clearInterval(quoteTimer);
    }

    const hero = heroRef.current;
    const slabsContainer = slabsContainerRef.current;

    if (!hero || !slabsContainer) {
      return () => window.clearInterval(quoteTimer);
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .fromTo(
          "[data-hero-reveal='eyebrow']",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.65 }
        )
        .fromTo(
          "[data-hero-reveal='title']",
          { autoAlpha: 0, y: 36, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.95 },
          "-=0.35"
        )
        .fromTo(
          "[data-hero-reveal='description']",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.75 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-reveal='actions']",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-reveal='quote-card']",
          { autoAlpha: 0, y: 28, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: "power4.out" },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-reveal='stats']",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out" },
          "-=0.3"
        );

      // Staggered vertical unmask of the 5 full-screen background monoliths
      gsap.fromTo(
        "[data-bg-monolith]",
        { clipPath: "inset(100% 0 0 0)", autoAlpha: 0.2 },
        {
          clipPath: "inset(0% 0 0 0)",
          autoAlpha: 1,
          duration: 1.3,
          stagger: 0.08,
          delay: 0.15,
          ease: "power4.inOut",
          clearProps: "clipPath",
        }
      );

      // Subtle scroll scrub on the monoliths container
      gsap.to(slabsContainer, {
        yPercent: 6,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, hero);

    return () => {
      window.clearInterval(quoteTimer);
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isReducedMotion()) return;
    const { clientX, clientY } = e;
    const x = clientX / window.innerWidth - 0.5;
    const y = clientY / window.innerHeight - 0.5;
    setMouseTilt({ x, y });

    // Smoothly activate the monolith slab corresponding to the cursor's horizontal position
    const slabWidth = window.innerWidth / 5;
    const slabIndex = Math.min(4, Math.max(0, Math.floor(clientX / slabWidth)));
    setHoveredSlab(slabIndex);
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setHoveredSlab(null);
  };

  const quote = HERO_QUOTES[activeQuote];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#060a14] text-[#F3EFE6] flex flex-col justify-between pt-28 pb-8 sm:pt-36 sm:pb-10 lg:pt-36 lg:pb-12 px-5 sm:px-8 lg:px-12 select-none"
    >
      {/* 1. FULL-SCREEN 5 MONOLITH ARCHITECTURAL BACKDROP (Option B Refined) */}
      <div
        ref={slabsContainerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full flex items-stretch gap-1.5 sm:gap-2.5 p-1 sm:p-2 will-change-transform"
        style={{
          perspective: "1200px",
        }}
      >
        {MONOLITH_SLABS.map((slab) => {
          const isHovered = hoveredSlab === slab.id;
          const isAnotherHovered = hoveredSlab !== null && !isHovered;
          const distFromCenter = slab.id - 2;

          // 3D kinetic parallax wave
          const rotateY = mouseTilt.x * (10 + Math.abs(distFromCenter) * 3);
          const translateY = mouseTilt.y * (8 + (slab.id % 2) * 4);
          const translateZ = isHovered ? 28 : -Math.abs(distFromCenter) * 6;

          return (
            <div
              key={slab.id}
              data-bg-monolith
              onMouseEnter={() => setHoveredSlab(slab.id)}
              style={{
                flex: 1,
                transform: `rotateY(${rotateY}deg) translateY(${translateY}px) translateZ(${translateZ}px)`,
                transition:
                  "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                filter: isHovered
                  ? "brightness(1.18) contrast(1.10) saturate(1.22)"
                  : isAnotherHovered
                  ? "brightness(0.72) contrast(0.98) grayscale(40%)"
                  : "brightness(0.98) contrast(1.06) saturate(1.05)",
              }}
              className={`group pointer-events-auto relative min-w-0 h-full overflow-hidden rounded-[12px] sm:rounded-[18px] border transition-all ${
                isHovered
                  ? "border-[#E6C654] shadow-[0_0_48px_rgba(230,198,84,0.40)] z-20 bg-[#091122]"
                  : slab.id === 2 || slab.id === 3
                  ? "border-white/[0.18] shadow-[0_4px_24px_rgba(0,0,0,0.5)] z-10 bg-[#070d1a]"
                  : "border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.4)] z-0 bg-[#070d1a]"
              }`}
            >
              {/* Registered Portrait Slice: Positioned slightly right of center (object-[62%_18%]) */}
              <div
                className="absolute inset-0 h-full max-w-none transition-transform duration-700 ease-out"
                style={{
                  width: "500%",
                  left: `${slab.innerLeftPercent}%`,
                  transform: isHovered ? "scale(1.045)" : "scale(1.01)",
                }}
              >
                <Image
                  src="/sites/helena-marsh/images/fenil-portrait.png"
                  alt={`CA Fenil Shah — Monolith ${slab.num}`}
                  fill
                  priority={slab.id === 2 || slab.id === 3}
                  sizes="20vw"
                  className="object-cover object-[62%_18%]"
                />
              </div>

              {/* Monolith Header Indicator */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-3 sm:top-5 left-3 sm:left-4 z-10 flex items-center gap-1.5"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
                    isHovered
                      ? "bg-[#E6C654] text-[#070b15] shadow-[0_0_12px_#E6C654]"
                      : "bg-black/60 text-[#E6C654]/80 backdrop-blur-md"
                  }`}
                >
                  <SparkStar className="h-2.5 w-2.5" />
                </span>
                <span className="hidden font-mono text-[8px] font-bold uppercase tracking-widest text-[#E6C654]/90 sm:inline-block">
                  {`${slab.num} · ${slab.label}`}
                </span>
              </div>

              {/* Traveling Voltage Surge along the vertical seam */}
              <div
                aria-hidden="true"
                className="animate-voltage-surge right-0"
                style={{
                  animationDelay: `${slab.id * 0.65}s`,
                }}
              />

              {/* Hover Ambient Gold Flare Inside Active Slab */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#E6C654]/25 via-[#1E40AF]/15 to-transparent transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Ambient Dark Gradient Vignette inside each slab */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060a14]/75 via-transparent to-[#060a14]/25" />
            </div>
          );
        })}
      </div>

      {/* 2. DIRECTIONAL LIGHTING MASK: Deep contrast on left (for text), clear luminous view on right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(90deg, rgba(6, 10, 20, 0.94) 0%, rgba(6, 10, 20, 0.82) 36%, rgba(6, 10, 20, 0.34) 65%, rgba(6, 10, 20, 0.58) 100%)",
        }}
      />

      {/* Ambient Top and Bottom Dark Gradient Fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#060a14]/90 via-transparent to-[#060a14]/90"
      />

      {/* Royal Blue & Gold Spark Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 50% at 70% 35%, rgba(30, 64, 175, 0.22) 0%, transparent 70%), radial-gradient(40% 40% at 30% 60%, rgba(230, 198, 84, 0.08) 0%, transparent 65%)",
        }}
      />

      {/* 3. MAIN HERO CONTENT: LEFT-ALIGNED EDITORIAL NARRATIVE + RIGHT FLOATING TESTIMONIAL */}
      <div className="pointer-events-none relative z-20 mx-auto w-full max-w-[1360px] flex flex-col justify-between flex-1">
        {/* UPPER GRID: Left Text + Right-Center Floating Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 my-auto pt-4 sm:pt-6">
          {/* LEFT COLUMN: Asymmetrical Editorial Typography */}
          <div className="pointer-events-auto lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Pill */}
            <div
              data-hero-reveal="eyebrow"
              className="mb-5 sm:mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#E6C654]/40 bg-[#070b15]/90 px-4 py-1.5 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.18em] text-[#E6C654] shadow-[0_0_24px_rgba(230,198,84,0.18)] backdrop-blur-xl"
            >
              <SparkStar className="h-3 w-3 animate-spin-slow text-[#E6C654]" />
              <span>NOW ACCEPTING Q2 · THREE ADVISORY MANDATES REMAINING</span>
            </div>

            {/* Master Headline */}
            <h1
              data-hero-reveal="title"
              className="max-w-[820px] text-left text-[clamp(2.75rem,5.4vw,5.6rem)] font-light leading-[1.02] tracking-[-0.05em] text-[#F3EFE6]"
            >
              The balance sheet changes when{" "}
              <em className="font-serif font-normal italic tracking-[-0.035em] text-[#E6C654]">
                governance
              </em>{" "}
              does.
            </h1>

            {/* Supporting Narrative */}
            <p
              data-hero-reveal="description"
              className="mt-6 max-w-[620px] text-left text-[16px] font-light leading-[1.7] tracking-[-0.015em] text-[#CBD5E1] sm:text-[18px]"
            >
              Strategic corporate finance, M&amp;A due diligence, and boardroom advisory for promoters,
              scaleup CFOs, and audit committees. Fortnightly counsel, twelve months, measured in
              balance sheet resilience.
            </p>

            {/* Actions: Consultation & Mandates Buttons */}
            <div
              data-hero-reveal="actions"
              className="mt-8 flex w-full max-w-[560px] flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3.5 sm:gap-4"
            >
              <Link
                href="/book"
                className="group relative inline-flex min-h-[56px] items-center justify-between gap-5 overflow-hidden rounded-full bg-[#E6C654] py-2 pl-7 pr-2.5 text-[14px] font-medium text-[#070b15] shadow-[0_4px_25px_rgba(230,198,84,0.30)] transition-all duration-300 hover:bg-[#F0D575] hover:shadow-[0_4px_35px_rgba(230,198,84,0.5)] hover:scale-[1.02]"
              >
                <span>Schedule a consultation</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#070b15] text-[#E6C654] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              <Link
                href="/services"
                className="group inline-flex min-h-[56px] items-center justify-between gap-4 rounded-full border border-white/20 bg-[#070b15]/75 py-2 pl-6 pr-2.5 text-[14px] font-medium text-[#F3EFE6] backdrop-blur-xl transition-all duration-300 hover:border-[#E6C654]/60 hover:bg-white/[0.08]"
              >
                <span>Explore three advisory mandates</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#F3EFE6] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Floating Mandate Testimonial Card (Overlapping portrait edge) */}
          <div
            data-hero-reveal="quote-card"
            className="pointer-events-auto lg:col-span-5 xl:col-span-5 flex justify-start lg:justify-end mt-4 lg:mt-0"
          >
            <div className="w-full max-w-[400px] rounded-[22px] border border-white/15 bg-[#080d19]/80 p-6 sm:p-7 shadow-[0_24px_70px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-500 hover:border-[#E6C654]/60 hover:shadow-[0_0_40px_rgba(230,198,84,0.22)]">
              <div className="flex items-center justify-between text-[#E6C654]">
                <span className="text-[36px] font-serif leading-none">“</span>
                <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#E6C654]">
                  <ElectricBolt className="h-3 w-3" />
                  <span>MANDATE TESTIMONIAL</span>
                </div>
              </div>

              <p className="mt-3 text-[14px] sm:text-[15px] font-light leading-[1.65] tracking-[-0.01em] text-[#F3EFE6]">
                “{quote?.quote ?? "Fenil spots the balance sheet risk before the rating agency or audit committee does."}”
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#94A3B8]">
                  {quote?.role ?? "GROUP CFO — SERIES D FINTECH"}
                </span>

                {HERO_QUOTES.length > 1 && (
                  <div className="flex items-center gap-1.5" aria-label="Testimonial selector">
                    {HERO_QUOTES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveQuote(i)}
                        aria-label={`Testimonial ${i + 1}`}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          activeQuote === i
                            ? "w-5 bg-[#E6C654] shadow-[0_0_8px_#E6C654]"
                            : "w-2 bg-white/25 hover:bg-white/45"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM SOVEREIGN STATS ROW (Helena Marsh Inspired Alignment) */}
        <div
          data-hero-reveal="stats"
          className="pointer-events-auto mt-10 sm:mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6"
        >
          {/* STATS TILES */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-14">
            {HERO_STATS.map((stat, idx) => (
              <div key={`${stat.label}-${idx}`} className="flex flex-col">
                <div className="text-[clamp(1.75rem,2.8vw,2.75rem)] font-light leading-none tracking-[-0.05em] text-[#F3EFE6]">
                  {stat.number}
                </div>
                <div className="mt-2 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#94A3B8]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* SPARK BRAND BADGE */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#E6C654]/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E6C654] animate-live-pulse" />
            <span>FENIL SPARK ARCHITECTURAL PLATFORM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
