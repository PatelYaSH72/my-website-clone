"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DiamondMark } from "./Icons";
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
  ctaText = "Schedule a consultation",
  ctaHref = "/book",
  image,
  stats,
}: PageHeroProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 80);
    if (isReducedMotion()) return () => clearTimeout(timer);

    const { gsap } = initGSAP();
    const card = cardRef.current;
    if (!card) return () => clearTimeout(timer);

    const ctx = gsap.context(() => {
      gsap.to(card, {
        scale: 0.965,
        borderRadius: "44px",
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, card);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const bandCols = 7;
  const bandOffsets = ["0px", "20px", "6px", "26px", "12px", "30px", "8px"];

  return (
    <section className="relative pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-6 max-w-[1440px] mx-auto min-h-[92vh] flex flex-col justify-center">
      <div
        ref={cardRef}
        className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#080F1E] text-[#F3EFE6] overflow-hidden p-6 sm:p-12 lg:p-16 border border-[#F3EFE6]/10 shadow-2xl origin-bottom transform-gpu will-change-transform min-h-[82vh] flex flex-col justify-between"
        style={{
          background:
            "radial-gradient(58% 70% at 78% 38%, rgba(28, 70, 160, 0.85) 0%, transparent 68%), radial-gradient(40% 50% at 8% 100%, rgba(230, 198, 84, 0.12) 0%, transparent 70%), #080F1E",
        }}
      >
        {/* Top Floating Eyebrow Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#F3EFE6]/10 pb-6 mb-8">
          <div
            className={`inline-flex items-center gap-2.5 font-mono text-xs tracking-widest uppercase text-[#E6C654] transition-all duration-700 ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654]" />
            <span>{badge}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6C654] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6C654]" />
            </span>
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#F3EFE6]/70">
              CA FENIL SHAH · ADVISORY ARCHIVE
            </span>
          </div>
        </div>

        {/* Center Main Area: Monumental Title & Description */}
        <div className="relative z-10 space-y-8 my-auto">
          <h1
            className={`text-[clamp(36px,5.8vw,80px)] leading-[1.03] tracking-[-0.03em] font-light max-w-5xl transition-all duration-700 delay-100 ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {title}{" "}
            {italicWord && (
              <span className="font-serif italic text-[#E6C654] font-normal not-italic">
                {italicWord}
              </span>
            )}
          </h1>

          {/* Description & Action Row */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-[#F3EFE6]/10 transition-all duration-700 delay-200 ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="lg:col-span-7 text-[#F3EFE6]/85 text-[17px] sm:text-[20px] font-light leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-6">
              {chips.length > 0 && (
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {chips.map((chip, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full border border-[#F3EFE6]/15 bg-[#F3EFE6]/5 text-[11px] font-mono tracking-wider text-[#F3EFE6]/75 uppercase"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              {ctaText && (
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 bg-[#E6C654] text-[#080F1E] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#F0D268] transition-all duration-300 shadow-lg group cursor-pointer"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Optional Stats Footer or Sliced Portrait Band */}
        {stats && stats.length > 0 ? (
          <div className="relative z-10 pt-10 mt-8 border-t border-[#F3EFE6]/10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-2xl sm:text-3xl font-light text-[#E6C654] font-mono tracking-tight">
                  {s.number}
                </p>
                <p className="text-[11px] font-mono text-[#F3EFE6]/70 uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        ) : image ? (
          <div className="relative z-10 pt-8 mt-6">
            <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[360px] flex gap-1 sm:gap-1.5 overflow-hidden rounded-2xl">
              {Array.from({ length: bandCols }).map((_, i) => {
                const clipStyle = isRevealed
                  ? "inset(0% 0% 0% 0%)"
                  : "inset(100% 0% 0% 0%)";

                return (
                  <div
                    key={i}
                    className="relative flex-1 overflow-hidden rounded-[2px] bg-[#0D1C38]/50 border border-[#F3EFE6]/10"
                    style={{
                      marginTop: bandOffsets[i],
                      clipPath: clipStyle,
                      WebkitClipPath: clipStyle,
                      transition: `clip-path 1.2s cubic-bezier(0.7, 0, 0.2, 1) ${
                        0.15 + i * 0.08
                      }s`,
                    }}
                  >
                    <div
                      className="absolute inset-0 w-[700%] h-full transition-all duration-700"
                      style={{
                        left: `-${i * 100}%`,
                        transform: `scale(${isRevealed ? 1.05 : 1.25})`,
                        filter: "grayscale(1) contrast(1.06) brightness(0.92)",
                      }}
                    >
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover object-[50%_40%]"
                        sizes="100vw"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
