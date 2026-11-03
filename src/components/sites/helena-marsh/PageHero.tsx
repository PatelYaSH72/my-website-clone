"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DiamondMark, SparkStar, ElectricBolt } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

export interface PageHeroProps {
  badge: string;
  title: string;
  italicWord?: string;
  description: string;
  chips?: string[];
  ctaText?: string;
  ctaHref?: string;
  image?: string;
  stats?: { number: string; label: string }[];
}

export function PageHero({
  badge,
  title,
  italicWord,
  description,
  chips = [],
  ctaText,
  ctaHref = "/book",
  image = "/sites/helena-marsh/images/fenil-portrait.png",
  stats,
}: PageHeroProps) {
  const [hoveredSlab, setHoveredSlab] = useState<number | null>(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLElement>(null);
  const slabsContainerRef = useRef<HTMLDivElement>(null);

  const bandCols = 7;
  const bandOffsets = ["0px", "14px", "4px", "18px", "8px", "20px", "6px"];

  useEffect(() => {
    if (isReducedMotion()) return;

    const hero = heroRef.current;
    const slabsContainer = slabsContainerRef.current;
    if (!hero || !slabsContainer) return;

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .fromTo(
          "[data-page-hero='eyebrow']",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.65 }
        )
        .fromTo(
          "[data-page-hero='title']",
          { autoAlpha: 0, y: 34, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 },
          "-=0.35"
        )
        .fromTo(
          "[data-page-hero='description']",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.75 },
          "-=0.5"
        )
        .fromTo(
          "[data-page-hero='actions']",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          "[data-page-hero='bottom-block']",
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out" },
          "-=0.3"
        );

      // Gentle vertical unmask of the background bottom slabs
      gsap.fromTo(
        "[data-bg-slab]",
        { clipPath: "inset(100% 0 0 0)", autoAlpha: 0.1 },
        {
          clipPath: "inset(0% 0 0 0)",
          autoAlpha: 1,
          duration: 1.3,
          stagger: 0.05,
          delay: 0.1,
          ease: "power4.inOut",
          clearProps: "clipPath",
        }
      );

      // Subtle scroll scrub on the bottom slabs container
      gsap.to(slabsContainer, {
        yPercent: 6,
        scale: 1.02,
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
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isReducedMotion()) return;
    const { clientX, clientY } = e;
    // Calmer, gentler mouse tilt
    const x = clientX / window.innerWidth - 0.5;
    const y = clientY / window.innerHeight - 0.5;
    setMouseTilt({ x, y });

    const slabWidth = window.innerWidth / bandCols;
    const slabIndex = Math.min(bandCols - 1, Math.max(0, Math.floor(clientX / slabWidth)));
    setHoveredSlab(slabIndex);
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setHoveredSlab(null);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#060a14] text-[#F3EFE6] flex flex-col justify-between pt-28 pb-8 sm:pt-36 sm:pb-10 lg:pt-36 lg:pb-12 px-5 sm:px-8 lg:px-12 select-none"
    >
      {/* 1. ARCHITECTURAL SLAB ANIMATION AT THE BOTTOM (Blended with soft gradient feathering) */}
      <div
        ref={slabsContainerRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-[44vh] sm:h-[48vh] lg:h-[52vh] -z-20 flex items-stretch gap-1.5 sm:gap-2 px-2 sm:px-4 will-change-transform"
        style={{
          perspective: "1200px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 22%, rgba(0,0,0,0.7) 50%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 22%, rgba(0,0,0,0.7) 50%, black 100%)",
        }}
      >
        {Array.from({ length: bandCols }).map((_, i) => {
          const isHovered = hoveredSlab === i;
          const isAnotherHovered = hoveredSlab !== null && !isHovered;
          const distFromCenter = i - Math.floor(bandCols / 2);

          // Calmer, subtle 3D kinetic tilt (lowered by 65%)
          const rotateY = mouseTilt.x * (3.5 + Math.abs(distFromCenter) * 1.2);
          const translateY = mouseTilt.y * (3 + (i % 2) * 1.5);
          const translateZ = isHovered ? 8 : -Math.abs(distFromCenter) * 2;

          return (
            <div
              key={i}
              data-bg-slab
              onMouseEnter={() => setHoveredSlab(i)}
              style={{
                flex: 1,
                marginTop: bandOffsets[i],
                transform: `rotateY(${rotateY}deg) translateY(${translateY}px) translateZ(${translateZ}px)`,
                transition:
                  "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                filter: isHovered
                  ? "brightness(1.08) contrast(1.04)"
                  : isAnotherHovered
                  ? "brightness(0.85) contrast(0.98) grayscale(20%)"
                  : "brightness(0.96) contrast(1.03)",
              }}
              className={`group pointer-events-auto relative min-w-0 h-full overflow-hidden rounded-t-[14px] sm:rounded-t-[20px] rounded-b-[4px] border transition-all duration-500 ${
                isHovered
                  ? "border-[#E6C654]/60 shadow-[0_0_24px_rgba(230,198,84,0.20)] z-10 bg-[#091122]/60"
                  : "border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.3)] z-0 bg-[#070d1a]/40"
              }`}
            >
              {/* Registered Sliced Image across all 7 bottom slabs */}
              <div
                className="absolute inset-0 h-full max-w-none transition-transform duration-700 ease-out"
                style={{
                  width: `${bandCols * 100}%`,
                  left: `-${i * 100}%`,
                  transform: isHovered ? "scale(1.02)" : "scale(1.0)",
                }}
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  priority={i === 3 || i === 4}
                  sizes="15vw"
                  className="object-cover object-[50%_35%]"
                />
              </div>

              {/* Monolith Slab Top Indicator (Subtle, elegant) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity"
              >
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-full transition-colors ${
                    isHovered
                      ? "bg-[#E6C654] text-[#070b15]"
                      : "bg-black/50 text-[#E6C654]/80 backdrop-blur-md"
                  }`}
                >
                  <SparkStar className="h-2 w-2" />
                </span>
                <span className="hidden font-mono text-[7.5px] font-bold uppercase tracking-widest text-[#E6C654]/80 sm:inline-block">
                  {`0${i + 1}`}
                </span>
              </div>

              {/* Traveling Voltage Surge along the slab edge */}
              <div
                aria-hidden="true"
                className="animate-voltage-surge right-0 opacity-60"
                style={{
                  animationDelay: `${i * 0.7}s`,
                }}
              />

              {/* Active Golden Glow Flare inside slab (Subtle) */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#E6C654]/15 via-transparent to-transparent transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Ambient Dark Gradient Vignette inside each slab (Top fades into deep darkness) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060a14]/60 via-[#060a14]/20 to-[#060a14]/85" />
            </div>
          );
        })}
      </div>

      {/* 2. DIRECTIONAL NAVY BLUE BLEND: Deep solid navy at top, smoothly revealing cards toward bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-15"
        style={{
          background:
            "linear-gradient(180deg, #060a14 0%, #060a14 44%, rgba(6, 10, 20, 0.94) 58%, rgba(6, 10, 20, 0.55) 75%, rgba(6, 10, 20, 0.15) 92%, rgba(6, 10, 20, 0.35) 100%)",
        }}
      />

      {/* Royal Blue & Gold Spark Aurora */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 75% 25%, rgba(30, 64, 175, 0.18) 0%, transparent 70%), radial-gradient(40% 40% at 20% 65%, rgba(230, 198, 84, 0.06) 0%, transparent 65%)",
        }}
      />

      {/* 3. MAIN HERO CONTENT: FULL-PAGE EDITORIAL NARRATIVE */}
      <div className="pointer-events-none relative z-20 mx-auto w-full max-w-[1360px] flex flex-col justify-between flex-1">
        {/* TOP EYEBROW ROW */}
        <div
          data-page-hero="eyebrow"
          className="pointer-events-auto flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E6C654]/40 bg-[#070b15]/90 px-4 py-1.5 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.18em] text-[#E6C654] shadow-[0_0_24px_rgba(230,198,84,0.18)] backdrop-blur-xl">
            <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654]" />
            <span>{badge}</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#94A3B8]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6C654] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6C654]" />
            </span>
            <span>CA FENIL SHAH · ADVISORY ARCHIVE</span>
          </div>
        </div>

        {/* CENTER MAIN EDITORIAL AREA */}
        <div className="my-auto py-8 sm:py-10 flex flex-col items-start text-left">
          {/* Master Headline */}
          <h1
            data-page-hero="title"
            className="max-w-[1050px] text-left text-[clamp(2.75rem,5.6vw,5.8rem)] font-light leading-[1.02] tracking-[-0.05em] text-[#F3EFE6]"
          >
            {title}{" "}
            {italicWord && (
              <em className="font-serif font-normal italic tracking-[-0.035em] text-[#E6C654]">
                {italicWord}
              </em>
            )}
          </h1>

          {/* Description & Chips Row */}
          <div
            data-page-hero="description"
            className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full border-t border-white/10 pt-6"
          >
            <p className="lg:col-span-8 text-[#CBD5E1] text-[16px] sm:text-[19px] font-light leading-[1.7] tracking-[-0.015em] max-w-3xl">
              {description}
            </p>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-4">
              {chips.length > 0 && (
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {chips.map((chip, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full border border-white/15 bg-white/[0.06] text-[10.5px] font-mono tracking-wider text-[#E6C654] uppercase backdrop-blur-md"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions Button */}
          {ctaText && (
            <div data-page-hero="actions" className="pointer-events-auto mt-8 flex items-center">
              <Link
                href={ctaHref}
                className="group relative inline-flex min-h-[56px] items-center justify-between gap-5 overflow-hidden rounded-full bg-[#E6C654] py-2 pl-7 pr-2.5 text-[14px] font-medium text-[#070b15] shadow-[0_4px_25px_rgba(230,198,84,0.30)] transition-all duration-300 hover:bg-[#F0D575] hover:shadow-[0_4px_35px_rgba(230,198,84,0.5)] hover:scale-[1.02]"
              >
                <span>{ctaText}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#070b15] text-[#E6C654] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* 4. BOTTOM DOCK: FLOATING STATS ROW OR BRAND CAPSULE */}
        <div data-page-hero="bottom-block" className="pointer-events-auto mt-auto pt-6">
          {stats && stats.length > 0 ? (
            <div className="rounded-[20px] border border-white/15 bg-[#080d19]/85 p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 gap-4">
              {stats.map((s, idx) => (
                <div key={idx} className="px-3 sm:px-6 py-2 flex flex-col justify-center">
                  <div className="text-[clamp(1.5rem,2.4vw,2.4rem)] font-light leading-none tracking-[-0.04em] text-[#E6C654] font-mono">
                    {s.number}
                  </div>
                  <div className="mt-2 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#94A3B8]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-t border-white/10 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#E6C654]/85">
                <ElectricBolt className="h-3 w-3 text-[#E6C654]" />
                <span>ARCHITECTURAL ADVISORY SLAB ENGINE</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
                <span>CONFIDENTIAL BOARDROOM MANDATES</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
