"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_QUOTES, HERO_STATS } from "./data";
import { ArrowRight, SparkStar, ElectricBolt } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

export function HeroSection() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, px: 50 });

  const heroRef = useRef<HTMLElement>(null);
  const horizonStageRef = useRef<HTMLDivElement>(null);
  const horizonImageRef = useRef<HTMLDivElement>(null);

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
    const horizonStage = horizonStageRef.current;
    const horizonImage = horizonImageRef.current;

    if (!hero || !horizonStage || !horizonImage) {
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
          "[data-hero-reveal='horizon-line']",
          { scaleX: 0, autoAlpha: 0 },
          { scaleX: 1, autoAlpha: 1, duration: 1.1, ease: "power4.inOut" },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-reveal='dock']",
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, duration: 0.85, ease: "power4.out" },
          "-=0.4"
        );

      // ScrollTrigger: Horizon curtain unmasks as you scroll
      gsap.fromTo(
        horizonImage,
        { scale: 1.02, yPercent: 0 },
        {
          scale: 1.08,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    }, hero);

    return () => {
      window.clearInterval(quoteTimer);
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isReducedMotion()) return;
    const { clientX, clientY } = e;
    const px = (clientX / window.innerWidth) * 100;
    const x = (clientX / window.innerWidth - 0.5) * 18;
    const y = (clientY / window.innerHeight - 0.5) * 14;
    setMousePos({ x, y, px });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, px: 50 });
  };

  const quote = HERO_QUOTES[activeQuote];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#050811] text-[#F3EFE6] flex flex-col justify-between pt-28 pb-8 sm:pt-36 sm:pb-10 lg:pt-38 lg:pb-12 px-5 sm:px-8 lg:px-12"
    >
      {/* 1. HORIZON STAGE: LOWER SPLIT HALF (Option D: Split Horizon Curtain) */}
      <div
        ref={horizonStageRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[73%] -z-30 overflow-hidden"
      >
        {/* Horizon Image with 3D Parallax */}
        <div
          ref={horizonImageRef}
          style={{
            transform: `translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.5}px, 0) scale(1.03)`,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative h-full w-full will-change-transform"
        >
          <Image
            src="/sites/helena-marsh/images/fenil-portrait.png"
            alt="CA Fenil Shah — Boardroom Horizon"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_18%] grayscale-[25%] contrast-[1.08] brightness-[0.72]"
          />
        </div>

        {/* Ambient Dark Gradient Vignette for Horizon Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/75 to-[#050811]/90" />

        {/* Royal Blue & Gold Aurora flares along the Horizon */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 10%, rgba(30, 64, 175, 0.32) 0%, transparent 70%), radial-gradient(40% 35% at 50% 40%, rgba(230, 198, 84, 0.16) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* 2. THE LUMINOUS ELECTRIC HORIZON SEAM (Split Boundary positioned cleanly below buttons) */}
      <div
        data-hero-reveal="horizon-line"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[73%] -z-20 h-[2px] will-change-transform"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(230,198,84,0.4) 25%, #ffffff 50%, rgba(230,198,84,0.4) 75%, transparent 95%)",
          boxShadow: "0 0 24px rgba(230, 198, 84, 0.35), 0 0 8px #ffffff",
        }}
      >
        {/* Dynamic Light Sheen following mouse horizontally */}
        <div
          style={{ left: `${mousePos.px}%` }}
          className="absolute -top-1 h-3 w-24 -translate-x-1/2 rounded-full bg-[#E6C654] blur-sm transition-all duration-150"
        />
      </div>

      {/* Top Half Dark Tone Overlay for Text Readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[76%] -z-10 bg-gradient-to-b from-[#050811] via-[#050811]/98 to-transparent"
      />

      {/* Floating Spark Starlets along the Horizon */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute top-[20%] left-[10%] animate-spark-float text-[#E6C654]/40">
          <SparkStar className="h-3 w-3" />
        </span>
        <span className="absolute top-[26%] right-[12%] animate-spark-float text-[#E6C654]/30" style={{ animationDelay: "1.2s" }}>
          <SparkStar className="h-3.5 w-3.5" />
        </span>
        <span className="absolute top-[37%] left-[22%] animate-spark-float text-[#E6C654]/50" style={{ animationDelay: "2.1s" }}>
          <SparkStar className="h-2.5 w-2.5" />
        </span>
        <span className="absolute top-[37%] right-[24%] animate-spark-float text-[#E6C654]/45" style={{ animationDelay: "0.8s" }}>
          <SparkStar className="h-2.5 w-2.5" />
        </span>
      </div>

      {/* 3. CENTER CONTENT: EDITORIAL POWER TYPOGRAPHY */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1240px] flex-col items-center text-center">
        {/* Eyebrow Pill */}
        <div
          data-hero-reveal="eyebrow"
          className="mb-6 sm:mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#E6C654]/35 bg-[#050811]/90 px-4 py-1.5 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.18em] text-[#E6C654] shadow-[0_0_24px_rgba(230,198,84,0.18)] backdrop-blur-xl"
        >
          <SparkStar className="h-3 w-3 animate-spin-slow" />
          <span>NOW ACCEPTING Q2 · THREE ADVISORY MANDATES REMAINING</span>
        </div>

        {/* Master Headline */}
        <h1
          data-hero-reveal="title"
          className="mx-auto max-w-[1100px] text-center text-[clamp(2.75rem,6.6vw,6.8rem)] font-light leading-[0.97] tracking-[-0.055em] text-[#F3EFE6]"
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
          className="mx-auto mt-6 sm:mt-7 max-w-[760px] text-center text-[16px] font-light leading-[1.7] tracking-[-0.015em] text-[#CBD5E1] sm:text-[18.5px] lg:text-[19.5px]"
        >
          Strategic corporate finance, M&amp;A due diligence, and boardroom advisory for promoters,
          scaleup CFOs, and audit committees. Fortnightly counsel, twelve months, measured in
          balance sheet resilience.
        </p>

        {/* Centered Actions */}
        <div
          data-hero-reveal="actions"
          className="mt-8 sm:mt-9 flex w-full max-w-[560px] flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
        >
          <Link
            href="/book"
            className="group relative inline-flex w-full sm:w-auto min-h-[56px] items-center justify-center sm:justify-between gap-5 overflow-hidden rounded-full bg-[#E6C654] py-2 pl-7 pr-2.5 text-[14px] font-medium text-[#050811] shadow-[0_4px_25px_rgba(230,198,84,0.30)] transition-all duration-300 hover:bg-[#F0D575] hover:shadow-[0_4px_35px_rgba(230,198,84,0.5)] hover:scale-[1.02]"
          >
            <span>Schedule a consultation</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#050811] text-[#E6C654] transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/services"
            className="group inline-flex w-full sm:w-auto min-h-[56px] items-center justify-center sm:justify-between gap-4 rounded-full border border-white/20 bg-[#050811]/70 py-2 pl-6 pr-2.5 text-[14px] font-medium text-[#F3EFE6] backdrop-blur-xl transition-all duration-300 hover:border-[#E6C654]/60 hover:bg-white/[0.08]"
          >
            <span>Explore three advisory mandates</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#F3EFE6] transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>

      {/* 4. BOTTOM FLOATING SOVEREIGN DOCK (Stats + Live Mandate Quote) */}
      <div
        data-hero-reveal="dock"
        className="relative z-20 mx-auto w-full max-w-[1360px] mt-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 rounded-[22px] border border-white/15 bg-[#080d19]/90 p-3 sm:p-4 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
          {/* LEFT 3 STATS */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-3 divide-x divide-white/10 py-1">
            {HERO_STATS.map((stat, idx) => (
              <div
                key={`${stat.label}-${idx}`}
                className="px-3 sm:px-6 flex flex-col justify-center"
              >
                <div className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-medium leading-none tracking-[-0.05em] text-[#F3EFE6]">
                  {stat.number}
                </div>
                <div className="mt-2 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#94A3B8] line-clamp-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT LIVE CLIENT TESTIMONIAL CAPSULE */}
          <div className="md:col-span-5 lg:col-span-4 rounded-xl border border-white/10 bg-[#0c1426]/90 p-3 sm:p-3.5 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-[#E6C654]">
                <ElectricBolt className="h-2.5 w-2.5" />
                <span>MANDATE TESTIMONIAL</span>
              </div>

              {HERO_QUOTES.length > 1 && (
                <div className="flex items-center gap-1" aria-label="Testimonial selector">
                  {HERO_QUOTES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveQuote(i)}
                      aria-label={`Testimonial ${i + 1}`}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        activeQuote === i
                          ? "w-4 bg-[#E6C654] shadow-[0_0_6px_#E6C654]"
                          : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <p className="text-[12px] sm:text-[13px] font-light leading-snug tracking-[-0.01em] text-[#F3EFE6] line-clamp-2">
              “{quote?.quote ?? "Fenil spots the balance sheet risk before the rating agency or audit committee does."}”
            </p>

            <div className="text-[9px] font-mono uppercase tracking-wider text-[#94A3B8]">
              {quote?.role ?? "GROUP CFO — SERIES D FINTECH"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
