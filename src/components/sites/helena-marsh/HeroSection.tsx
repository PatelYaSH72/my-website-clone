"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_QUOTES, HERO_STATS } from "./data";
import { ArrowRight, SparkStar, ElectricBolt } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

interface FrequencySlabConfig {
  id: number;
  flex: string;
  widthPercent: number;
  leftOffsetPercent: number;
  innerImageWidthPercent: number;
  innerImageLeftPercent: number;
  marginTop: string;
  marginBottom: string;
  nodePosition: "top" | "bottom";
  tag: string;
  isPrimaryAnchor?: boolean;
}

// 5 Asymmetric Kinetic Frequency Slabs (Voltage Rhythm Layout)
const FREQUENCY_SLABS: FrequencySlabConfig[] = [
  {
    id: 0,
    flex: "0.75",
    widthPercent: 15,
    leftOffsetPercent: 0,
    innerImageWidthPercent: 666.67,
    innerImageLeftPercent: 0,
    marginTop: "14%",
    marginBottom: "9%",
    nodePosition: "top",
    tag: "01 // PULSE",
  },
  {
    id: 1,
    flex: "1.2",
    widthPercent: 24,
    leftOffsetPercent: 15,
    innerImageWidthPercent: 416.67,
    innerImageLeftPercent: -62.5,
    marginTop: "2%",
    marginBottom: "4%",
    nodePosition: "top",
    tag: "02 // CAPITAL",
  },
  {
    id: 2,
    flex: "0.7",
    widthPercent: 14,
    leftOffsetPercent: 39,
    innerImageWidthPercent: 714.29,
    innerImageLeftPercent: -278.57,
    marginTop: "12%",
    marginBottom: "14%",
    nodePosition: "bottom",
    tag: "03 // SPARK",
  },
  {
    id: 3,
    flex: "1.45",
    widthPercent: 29,
    leftOffsetPercent: 53,
    innerImageWidthPercent: 344.83,
    innerImageLeftPercent: -182.76,
    marginTop: "0%",
    marginBottom: "0%",
    nodePosition: "top",
    tag: "04 // CORE",
    isPrimaryAnchor: true,
  },
  {
    id: 4,
    flex: "0.9",
    widthPercent: 18,
    leftOffsetPercent: 82,
    innerImageWidthPercent: 555.56,
    innerImageLeftPercent: -455.56,
    marginTop: "16%",
    marginBottom: "7%",
    nodePosition: "bottom",
    tag: "05 // ARC",
  },
];

export function HeroSection() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [hoveredSlab, setHoveredSlab] = useState<number | null>(null);
  const [mouseTilt, setMouseTilt] = useState({ rx: 0, ry: 0 });

  const heroRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

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
    const imageContainer = imageContainerRef.current;

    if (!hero || !imageContainer) {
      return () => window.clearInterval(quoteTimer);
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .fromTo(
          "[data-hero-reveal='eyebrow']",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.65 },
        )
        .fromTo(
          "[data-hero-reveal='title']",
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 0.95 },
          "-=0.32",
        )
        .fromTo(
          "[data-hero-reveal='description']",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.75 },
          "-=0.48",
        )
        .fromTo(
          "[data-hero-reveal='actions']",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          "[data-hero-reveal='stats'] > div",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12 },
          "-=0.25",
        );

      // Kinetic Frequency Slabs Reveal
      gsap.fromTo(
        "[data-voltage-slab]",
        { clipPath: "inset(100% 0 0 0)", y: 28, opacity: 0.2 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          opacity: 1,
          duration: 1.25,
          stagger: 0.1,
          delay: 0.2,
          ease: "power4.inOut",
          clearProps: "clipPath,transform",
        },
      );

      gsap.fromTo(
        "[data-hero-quote]",
        { autoAlpha: 0, y: 26, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.95,
          ease: "power3.out",
          clearProps: "all",
        },
      );

      gsap.to(imageContainer, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.fromTo(
        "[data-hero-scroll-indicator]",
        { autoAlpha: 0, y: -6 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          delay: 1.4,
          ease: "power2.out",
        },
      );
    }, hero);

    return () => {
      window.clearInterval(quoteTimer);
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ rx: -y * 8, ry: x * 10 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ rx: 0, ry: 0 });
    setHoveredSlab(null);
  };

  const quote = HERO_QUOTES[activeQuote];

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-[min(920px,100svh)] w-full overflow-hidden bg-[#080d19] text-[#F3EFE6]"
    >
      {/* Background Aurora: Royal Blue & Champagne Gold Electric Current Fields */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 65% at 76% 40%, rgba(30, 64, 175, 0.28) 0%, transparent 72%), radial-gradient(38% 46% at 88% 58%, rgba(230, 198, 84, 0.12) 0%, transparent 68%), radial-gradient(40% 50% at 5% 95%, rgba(30, 64, 175, 0.16) 0%, transparent 70%)",
        }}
      />

      {/* Subtle Electric Grid Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(230, 198, 84, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(230, 198, 84, 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto grid min-h-[min(920px,100svh)] w-full max-w-[1800px] grid-cols-1 items-center gap-12 px-5 pb-20 pt-28 sm:px-8 sm:pb-24 lg:grid-cols-[1.04fr_.96fr] lg:gap-8 lg:px-[6.35vw] lg:pb-16 lg:pt-24">
        {/* LEFT: Editorial copy and reveal sequence */}
        <div className="relative z-20 flex min-w-0 flex-col items-start">
          <div
            data-hero-reveal="eyebrow"
            className="mb-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#CBD5E1] sm:text-[12px]"
          >
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-[#E6C654]/30 bg-[#E6C654]/10 shadow-[0_0_12px_rgba(230,198,84,0.2)]">
              <SparkStar className="h-3 w-3 text-[#E6C654] animate-spin-slow" />
            </span>
            <span>Now accepting Q2 · Three advisory mandates remaining</span>
          </div>

          <h1
            data-hero-reveal="title"
            className="max-w-[850px] text-[clamp(3.15rem,6.15vw,6.65rem)] font-medium leading-[0.98] tracking-[-0.065em] text-[#F3EFE6]"
          >
            The balance sheet
            <br className="hidden xl:block" /> changes when{" "}
            <em className="font-serif font-normal italic tracking-[-0.045em] text-[#E6C654]">
              governance
            </em>{" "}
            does.
          </h1>

          <p
            data-hero-reveal="description"
            className="mt-8 max-w-[760px] text-[16px] font-normal leading-[1.7] tracking-[-0.02em] text-[#CBD5E1] sm:text-[18px] lg:mt-9 lg:text-[19px]"
          >
            Strategic corporate finance, M&amp;A due diligence, and boardroom advisory for promoters,
            scaleup CFOs, and audit committees. Fortnightly counsel, twelve months, measured in
            balance sheet resilience.
          </p>

          <div
            data-hero-reveal="actions"
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-3.5"
          >
            <Link
              href="/book"
              className="group relative inline-flex min-h-[56px] items-center justify-between gap-5 overflow-hidden rounded-full bg-[#E6C654] py-2 pl-6 pr-2 text-[14px] font-medium text-[#080F1E] shadow-[0_4px_20px_rgba(230,198,84,0.25)] transition-all duration-300 hover:bg-[#F0D575] hover:shadow-[0_4px_28px_rgba(230,198,84,0.4)]"
            >
              <span>Schedule a consultation</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#080F1E] text-[#E6C654] transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/services"
              className="group inline-flex min-h-[56px] items-center justify-between gap-4 rounded-full border border-white/20 bg-white/[0.03] py-2 pl-6 pr-2 text-[14px] font-medium text-[#F3EFE6] backdrop-blur-sm transition-all duration-300 hover:border-[#E6C654]/50 hover:bg-white/[0.08]"
            >
              <span>Explore advisory mandates</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.10] text-[#F3EFE6] transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <div
            data-hero-reveal="stats"
            className="mt-10 grid w-full max-w-[760px] grid-cols-3 border-t border-white/[0.14] pt-5 sm:mt-12 sm:pt-6"
          >
            {HERO_STATS.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className={`min-w-0 pr-3 sm:pr-6 ${
                  index > 0 ? "border-l border-white/[0.14] pl-4 sm:pl-6" : ""
                }`}
              >
                <div className="text-[clamp(1.65rem,3vw,3rem)] font-medium leading-none tracking-[-0.06em] text-[#F3EFE6]">
                  {stat.number}
                </div>
                <div className="mt-3 text-[9px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-[#94A3B8] sm:text-[11px] sm:tracking-[0.15em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Kinetic Voltage Frequency Slabs (Option 1: Electric Rhythm Architecture) */}
        <div className="relative z-10 mx-auto mt-2 w-full max-w-[720px] lg:mt-0 lg:min-h-[740px] lg:max-w-none">
          <div
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1200px) rotateX(${mouseTilt.rx}deg) rotateY(${mouseTilt.ry}deg)`,
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="relative mx-auto flex h-[480px] w-full max-w-[620px] items-stretch gap-2 sm:h-[580px] sm:gap-2.5 lg:absolute lg:inset-x-0 lg:top-[-60px] lg:h-[780px] lg:max-w-[720px]"
          >
            {/* Ambient Voltage Spark Glow behind Slabs */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] opacity-40 blur-3xl transition-opacity duration-700"
              style={{
                background:
                  hoveredSlab !== null
                    ? "radial-gradient(circle at 60% 40%, rgba(230, 198, 84, 0.25) 0%, rgba(30, 64, 175, 0.2) 50%, transparent 80%)"
                    : "radial-gradient(circle at 50% 50%, rgba(30, 64, 175, 0.18) 0%, transparent 70%)",
              }}
            />

            {/* Kinetic Frequency Slabs Map */}
            {FREQUENCY_SLABS.map((slab) => {
              const isHovered = hoveredSlab === slab.id;
              const isAnotherHovered = hoveredSlab !== null && !isHovered;

              return (
                <div
                  key={slab.id}
                  data-voltage-slab
                  onMouseEnter={() => setHoveredSlab(slab.id)}
                  style={{
                    flex: slab.flex,
                    marginTop: slab.marginTop,
                    marginBottom: slab.marginBottom,
                    transform: isHovered ? "translateY(-6px) scale(1.015)" : "translateY(0) scale(1)",
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                    filter: isHovered
                      ? "brightness(1.12) contrast(1.06)"
                      : isAnotherHovered
                      ? "brightness(0.68) contrast(0.92) grayscale(75%)"
                      : "brightness(0.92) contrast(1.02)",
                  }}
                  className={`group relative min-w-0 overflow-hidden rounded-[8px] border transition-all ${
                    isHovered
                      ? "border-[#E6C654]/80 shadow-[0_0_30px_rgba(230,198,84,0.30)] z-20 bg-[#0E1726]"
                      : slab.isPrimaryAnchor
                      ? "border-white/[0.16] shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-10 bg-[#0b1220]"
                      : "border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.4)] z-0 bg-[#0b1220]"
                  }`}
                >
                  {/* Registered Slice of Portrait */}
                  <div
                    className="absolute inset-0 h-full max-w-none transition-transform duration-700 ease-out"
                    style={{
                      width: `${slab.innerImageWidthPercent}%`,
                      left: `${slab.innerImageLeftPercent}%`,
                      transform: isHovered ? "scale(1.05)" : "scale(1.01)",
                    }}
                  >
                    <Image
                      src="/sites/helena-marsh/images/fenil-portrait.png"
                      alt="CA Fenil Shah — Strategic Corporate Finance & Advisory Lead"
                      fill
                      priority={slab.id === 3 || slab.id === 1}
                      sizes="(max-width: 1024px) 25vw, 15vw"
                      className={`object-cover object-[50%_18%] transition-all duration-700 ${
                        isHovered ? "grayscale-0" : "grayscale-[40%]"
                      }`}
                    />
                  </div>

                  {/* High-Voltage Conduit Beam (Travels across the slab edge) */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 h-[2px] transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      top: slab.nodePosition === "top" ? "0px" : "auto",
                      bottom: slab.nodePosition === "bottom" ? "0px" : "auto",
                      background: "linear-gradient(90deg, transparent, #E6C654 50%, transparent)",
                      boxShadow: "0 0 10px #E6C654",
                    }}
                  />

                  {/* Apex/Base Voltage Node Indicator (Spark Star ✦) */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute z-10 flex items-center gap-1.5 px-2 py-1 transition-all duration-300 ${
                      slab.nodePosition === "top" ? "top-2 left-2" : "bottom-2 left-2"
                    } ${isHovered ? "opacity-100 scale-100" : "opacity-50 scale-90"}`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
                        isHovered
                          ? "bg-[#E6C654] text-[#080F1E] shadow-[0_0_8px_#E6C654]"
                          : "bg-black/60 text-[#E6C654] backdrop-blur-md"
                      }`}
                    >
                      <SparkStar className="h-2.5 w-2.5" />
                    </span>
                    <span className="hidden font-mono text-[8px] font-bold uppercase tracking-widest text-[#E6C654] sm:inline-block">
                      {slab.tag}
                    </span>
                  </div>

                  {/* Traveling Electric Spark Current along the vertical seam */}
                  <div
                    aria-hidden="true"
                    className="animate-voltage-surge right-0"
                    style={{
                      animationDelay: `${slab.id * 0.65}s`,
                    }}
                  />

                  {/* Ambient Dark Gradient Vignette for Depth */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080d19]/60 via-transparent to-[#080d19]/25" />
                </div>
              );
            })}

            {/* Testimonial Quote Card (Floating Executive Glass Anchor) */}
            <div
              data-hero-quote
              className="absolute -bottom-8 left-[-1%] z-30 w-[84%] rounded-[20px] border border-white/[0.16] bg-[#091122]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,.6)] backdrop-blur-2xl sm:bottom-[10%] sm:left-[-7%] sm:w-[70%] sm:p-6 lg:bottom-[12%] lg:left-[-8%] lg:w-[68%] lg:rounded-[22px] lg:p-7"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="font-serif text-[42px] leading-[0.75] text-[#E6C654]">“</div>
                <div className="flex items-center gap-1.5 rounded-full border border-[#E6C654]/30 bg-[#E6C654]/10 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#E6C654]">
                  <ElectricBolt className="h-2.5 w-2.5" />
                  <span>MANDATE IMPACT</span>
                </div>
              </div>

              <p className="text-[13.5px] leading-[1.65] tracking-[-0.015em] text-[#F3EFE6] sm:text-[15px]">
                {quote?.quote ?? "Fenil is the only person who spots the balance sheet risk before the rating agency does."}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8] sm:text-[11px]">
                  {quote?.role ?? "GROUP CFO — SERIES D FINTECH"}
                </p>

                {HERO_QUOTES.length > 1 && (
                  <div className="flex items-center gap-1.5" aria-label="Testimonial selector">
                    {HERO_QUOTES.map((item, index) => (
                      <button
                        key={`${item.role}-${index}`}
                        type="button"
                        onClick={() => setActiveQuote(index)}
                        aria-label={`Show testimonial ${index + 1}`}
                        aria-pressed={activeQuote === index}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeQuote === index
                            ? "w-7 bg-[#E6C654] shadow-[0_0_8px_#E6C654]"
                            : "w-2.5 bg-white/20 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        data-hero-scroll-indicator
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40 lg:flex"
      >
        <span className="h-px w-8 bg-white/20" />
        <SparkStar className="h-2.5 w-2.5 text-[#E6C654]/60" />
        Scroll to explore
        <span className="h-px w-8 bg-white/20" />
      </div>
    </section>
  );
}
