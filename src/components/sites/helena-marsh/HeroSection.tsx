"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_QUOTES, HERO_STATS } from "./data";
import { ArrowRight, SparkStar, ElectricBolt } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

export function HeroSection() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [mouseTilt, setMouseTilt] = useState({ rx: 0, ry: 0, px: 50, py: 50 });

  const heroRef = useRef<HTMLElement>(null);
  const monolithCardRef = useRef<HTMLDivElement>(null);

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
    const monolithCard = monolithCardRef.current;

    if (!hero || !monolithCard) {
      return () => window.clearInterval(quoteTimer);
    }

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .fromTo(
          "[data-hero-reveal='card']",
          { autoAlpha: 0, y: 44, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power4.out" }
        )
        .fromTo(
          "[data-hero-reveal='eyebrow']",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.65 },
          "-=0.7"
        )
        .fromTo(
          "[data-hero-reveal='title']",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-reveal='description']",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          "[data-hero-reveal='actions']",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.65 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-reveal='card-footer']",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.75 },
          "-=0.3"
        );

      // Subtle scroll scrub on the monolith card
      gsap.to(monolithCard, {
        yPercent: -4,
        scale: 0.98,
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
    const xPercent = (clientX / window.innerWidth) * 100;
    const yPercent = (clientY / window.innerHeight) * 100;

    const rx = -(clientY / window.innerHeight - 0.5) * 8;
    const ry = (clientX / window.innerWidth - 0.5) * 10;
    setMouseTilt({ rx, ry, px: xPercent, py: yPercent });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ rx: 0, ry: 0, px: 50, py: 50 });
  };

  const quote = HERO_QUOTES[activeQuote];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#060a14] text-[#F3EFE6] flex items-center justify-center pt-28 pb-12 sm:pt-36 sm:pb-16 px-5 sm:px-8 lg:px-12"
    >
      {/* 1. CINEMATIC BOARDROOM BACKDROP WITH OPTICAL BLUR */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full"
      >
        <Image
          src="/sites/helena-marsh/images/fenil-portrait.png"
          alt="CA Fenil Shah Boardroom Atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_18%] filter blur-[3px] scale-105 brightness-[0.45] contrast-[1.1] grayscale-[30%]"
        />
      </div>

      {/* 2. MULTI-LAYER DARK CINEMATIC VIGNETTE & RADIAL AURORA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-radial from-transparent via-[#060a14]/80 to-[#060a14]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#060a14]/90 via-transparent to-[#060a14]/95"
      />

      {/* Royal Blue & Gold Aurora Flares */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(30, 64, 175, 0.28) 0%, transparent 70%), radial-gradient(40% 40% at 50% 68%, rgba(230, 198, 84, 0.14) 0%, transparent 65%)",
        }}
      />

      {/* Orbiting Ambient Spark Starlets */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute top-[20%] left-[8%] animate-spark-float text-[#E6C654]/45">
          <SparkStar className="h-3.5 w-3.5" />
        </span>
        <span className="absolute top-[28%] right-[10%] animate-spark-float text-[#E6C654]/35" style={{ animationDelay: "1.4s" }}>
          <SparkStar className="h-4 w-4" />
        </span>
        <span className="absolute bottom-[24%] left-[12%] animate-spark-float text-[#E6C654]/30" style={{ animationDelay: "2.2s" }}>
          <SparkStar className="h-3 w-3" />
        </span>
        <span className="absolute bottom-[22%] right-[14%] animate-spark-float text-[#E6C654]/25" style={{ animationDelay: "0.9s" }}>
          <SparkStar className="h-2.5 w-2.5" />
        </span>
      </div>

      {/* 3. CENTER MONUMENTAL GLASSMORPHIC MONOLITH CARD (Option C) */}
      <div
        ref={monolithCardRef}
        data-hero-reveal="card"
        style={{
          transform: `perspective(1200px) rotateX(${mouseTilt.rx}deg) rotateY(${mouseTilt.ry}deg)`,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="group relative z-20 mx-auto w-full max-w-[1140px] overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/20 bg-[#080d19]/80 p-6 sm:p-10 lg:p-14 shadow-[0_36px_120px_rgba(0,0,0,0.75)] backdrop-blur-3xl will-change-transform"
      >
        {/* Dynamic Magnetic Light Sheen on Mouse Movement */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[28px] sm:rounded-[36px] opacity-40 transition-opacity duration-500 group-hover:opacity-75"
          style={{
            background: `radial-gradient(600px circle at ${mouseTilt.px}% ${mouseTilt.py}%, rgba(230, 198, 84, 0.35), transparent 45%)`,
          }}
        />

        {/* 1px Golden Hairline Border Shimmer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[28px] sm:rounded-[36px] border border-[#E6C654]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow Pill */}
          <div
            data-hero-reveal="eyebrow"
            className="mb-6 sm:mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#E6C654]/40 bg-[#080d19]/90 px-4 py-1.5 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.18em] text-[#E6C654] shadow-[0_0_24px_rgba(230,198,84,0.20)] backdrop-blur-xl"
          >
            <SparkStar className="h-3 w-3 animate-spin-slow" />
            <span>NOW ACCEPTING Q2 · THREE ADVISORY MANDATES REMAINING</span>
          </div>

          {/* Master Headline */}
          <h1
            data-hero-reveal="title"
            className="mx-auto max-w-[980px] text-center text-[clamp(2.5rem,5.8vw,5.8rem)] font-light leading-[0.98] tracking-[-0.055em] text-[#F3EFE6]"
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
            className="mx-auto mt-6 sm:mt-7 max-w-[740px] text-center text-[15.5px] font-light leading-[1.7] tracking-[-0.015em] text-[#CBD5E1] sm:text-[18px] lg:text-[19px]"
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
              className="group/btn relative inline-flex w-full sm:w-auto min-h-[56px] items-center justify-center sm:justify-between gap-5 overflow-hidden rounded-full bg-[#E6C654] py-2 pl-7 pr-2.5 text-[14px] font-medium text-[#070b15] shadow-[0_4px_25px_rgba(230,198,84,0.35)] transition-all duration-300 hover:bg-[#F0D575] hover:shadow-[0_4px_35px_rgba(230,198,84,0.55)] hover:scale-[1.02]"
            >
              <span>Schedule a consultation</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#070b15] text-[#E6C654] transition-transform duration-300 group-hover/btn:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/services"
              className="group/btn inline-flex w-full sm:w-auto min-h-[56px] items-center justify-center sm:justify-between gap-4 rounded-full border border-white/20 bg-white/[0.04] py-2 pl-6 pr-2.5 text-[14px] font-medium text-[#F3EFE6] backdrop-blur-xl transition-all duration-300 hover:border-[#E6C654]/60 hover:bg-white/[0.08]"
            >
              <span>Explore advisory mandates</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#F3EFE6] transition-transform duration-300 group-hover/btn:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Integrated Monolith Card Footer: Stats + Live Testimonial */}
          <div
            data-hero-reveal="card-footer"
            className="mt-10 sm:mt-12 w-full pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            {/* 3 Core Stats (8 columns) */}
            <div className="md:col-span-7 lg:col-span-8 grid grid-cols-3 divide-x divide-white/10 text-left">
              {HERO_STATS.map((stat, idx) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className="px-3 sm:px-5 flex flex-col justify-center"
                >
                  <div className="text-[clamp(1.4rem,2.4vw,2.3rem)] font-medium leading-none tracking-[-0.05em] text-[#F3EFE6]">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#94A3B8] line-clamp-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Capsule (5 columns) */}
            <div className="md:col-span-5 lg:col-span-4 rounded-xl border border-white/10 bg-[#0c1426]/90 p-3 sm:p-3.5 flex flex-col justify-between gap-2 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-[#E6C654]">
                  <ElectricBolt className="h-2.5 w-2.5" />
                  <span>MANDATE IMPACT</span>
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

              <p className="text-[12px] sm:text-[12.5px] font-light leading-snug tracking-[-0.01em] text-[#F3EFE6] line-clamp-2">
                “{quote?.quote ?? "Fenil spots the balance sheet risk before the rating agency does."}”
              </p>

              <div className="text-[9px] font-mono uppercase tracking-wider text-[#94A3B8]">
                {quote?.role ?? "GROUP CFO — SERIES D FINTECH"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
