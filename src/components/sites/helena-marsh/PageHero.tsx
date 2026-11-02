"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./Icons";
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
        scale: 0.97,
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
  const bandOffsets = ["0px", "18px", "6px", "24px", "12px", "28px", "8px"];

  return (
    <section className="relative pt-24 sm:pt-28 pb-10 px-4 sm:px-6 max-w-[1440px] mx-auto">
      <div
        ref={cardRef}
        className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#080F1E] text-[#F3EFE6] overflow-hidden p-6 sm:p-12 lg:p-16 border border-[#F3EFE6]/10 shadow-2xl origin-bottom transform-gpu will-change-transform"
        style={{
          background:
            "radial-gradient(55% 60% at 85% 12%, rgba(28, 70, 160, 0.85) 0%, transparent 70%), radial-gradient(40% 40% at 0 100%, rgba(230, 198, 84, 0.11) 0%, transparent 70%), #080F1E",
        }}
      >
        <div className="relative z-10 space-y-8">
          {/* Badge */}
          <div
            className={`inline-block font-mono text-xs tracking-widest uppercase text-[#E6C654] transition-all duration-700 ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            {badge}
          </div>

          {/* Heading */}
          <h1
            className={`text-[clamp(34px,5.2vw,72px)] leading-[1.05] tracking-[-0.03em] font-light max-w-4xl transition-all duration-700 delay-100 ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            {title}{" "}
            {italicWord && (
              <span className="font-serif italic text-[#E6C654] font-normal not-italic">
                {italicWord}
              </span>
            )}
          </h1>

          {/* Row with text & side chips */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2 border-t border-[#F3EFE6]/10 transition-all duration-700 delay-200 ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <p className="lg:col-span-7 text-[#F3EFE6]/80 text-[17px] sm:text-[19px] font-light leading-relaxed">
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
                  className="inline-flex items-center gap-2 bg-[#E6C654] text-[#080F1E] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#F0D268] transition-all duration-300"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* Sliced Photo Band when image is passed */}
          {image && (
            <div className="pt-6">
              <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[440px] flex gap-1 sm:gap-1.5 overflow-hidden rounded-2xl">
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
                          transform: `scale(${isRevealed ? 1.08 : 1.3})`,
                          filter: "grayscale(1) contrast(1.05) brightness(0.9)",
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
          )}
        </div>
      </div>
    </section>
  );
}
