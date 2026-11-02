"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_QUOTES, HERO_STATS } from "./data";
import { ArrowRight } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

export function HeroSection() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance state
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 100);

    const quoteTimer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % HERO_QUOTES.length);
    }, 6000);

    if (isReducedMotion()) return () => {
      clearTimeout(revealTimer);
      clearInterval(quoteTimer);
    };

    const { gsap } = initGSAP();
    const card = cardRef.current;
    if (!card) return () => {
      clearTimeout(revealTimer);
      clearInterval(quoteTimer);
    };

    const ctx = gsap.context(() => {
      // Scale down card and morph border radius slightly on scroll
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
      clearTimeout(revealTimer);
      clearInterval(quoteTimer);
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const panelOffsets = [
    { top: "0px", bottom: "30px" },
    { top: "24px", bottom: "16px" },
    { top: "8px", bottom: "40px" },
    { top: "32px", bottom: "10px" },
    { top: "16px", bottom: "34px" },
    { top: "40px", bottom: "0px" },
  ];

  return (
    <section className="relative pt-24 sm:pt-28 pb-12 px-3 sm:px-6 max-w-[1440px] mx-auto">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#080F1E] text-[#F3EFE6] overflow-hidden p-6 sm:p-10 lg:p-16 shadow-2xl border border-[#F3EFE6]/10 transform-gpu origin-bottom will-change-transform"
        style={{
          background:
            "radial-gradient(58% 70% at 78% 38%, rgba(28, 70, 160, 0.85) 0%, transparent 68%), radial-gradient(40% 50% at 8% 100%, rgba(230, 198, 84, 0.12) 0%, transparent 70%), #080F1E",
        }}
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Live Intake Badge */}
            <div
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F3EFE6]/10 border border-[#F3EFE6]/15 backdrop-blur-sm transition-all duration-700 ${
                isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6C654] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6C654]" />
              </span>
              <span className="text-[11px] sm:text-[12px] font-mono tracking-widest uppercase text-[#F3EFE6]/90">
                NOW ACCEPTING Q2 · THREE MANDATES REMAINING
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-[clamp(36px,5.4vw,74px)] leading-[1.04] tracking-[-0.035em] font-light transition-all duration-700 delay-100 ${
                isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              The balance sheet changes when{" "}
              <em className="font-serif italic text-[#E6C654] font-normal not-italic">
                governance
              </em>{" "}
              does.
            </h1>

            {/* Lead Paragraph */}
            <p
              className={`text-[#F3EFE6]/75 text-[17px] sm:text-[19px] lg:text-[20px] font-light max-w-xl leading-relaxed transition-all duration-700 delay-200 ${
                isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Strategic corporate finance, M&A due diligence, and boardroom advisory for promoters,
              scaleup CFOs, and audit committees. Fortnightly counsel, twelve months, measured in
              balance sheet resilience.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 transition-all duration-700 delay-300 ${
                isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                href="/book"
                className="group flex items-center justify-center gap-2.5 bg-[#E6C654] text-[#080F1E] px-7 py-4 rounded-full text-base font-medium hover:bg-[#F0D268] transition-all duration-300 shadow-md"
              >
                <span>Schedule a consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/coaching"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-light text-[#F3EFE6]/90 hover:text-[#F3EFE6] border border-[#F3EFE6]/20 hover:border-[#F3EFE6]/40 transition-colors"
              >
                <span>See the three advisory mandates</span>
                <span className="text-xs">↓</span>
              </Link>
            </div>

            {/* Stats Row */}
            <div
              className={`pt-8 border-t border-[#F3EFE6]/10 grid grid-cols-3 gap-6 sm:gap-8 max-w-lg transition-all duration-700 delay-400 ${
                isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {HERO_STATS.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F3EFE6]">
                    {stat.number}
                  </div>
                  <div className="text-[11px] sm:text-[12px] font-mono tracking-wider text-[#F3EFE6]/55 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sliced Portrait & Testimonial Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            {/* Sliced Panels Container with Mouse Parallax & Hover Spotlight */}
            <div
              className="relative w-full max-w-[460px] h-[520px] sm:h-[580px] flex gap-1 sm:gap-1.5 cursor-pointer"
              onMouseLeave={() => setHoveredPanel(null)}
            >
              {panelOffsets.map((offset, i) => {
                const isHovered = hoveredPanel === i;
                const isAnyHovered = hoveredPanel !== null;

                // Staggered clip-path reveal delay: 0.08s per column
                const clipStyle = isRevealed
                  ? "inset(0% 0% 0% 0%)"
                  : "inset(100% 0% 0% 0%)";

                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredPanel(i)}
                    className="relative flex-1 overflow-hidden rounded-[3px] bg-[#0D1C38]/50 border border-[#F3EFE6]/10"
                    style={{
                      marginTop: offset.top,
                      marginBottom: offset.bottom,
                      clipPath: clipStyle,
                      WebkitClipPath: clipStyle,
                      transition: `clip-path 1.25s cubic-bezier(0.7, 0, 0.2, 1) ${
                        i * 0.09
                      }s, transform 0.4s ease`,
                      transform: `translate(${mouseOffset.x * (i - 2.5) * 4}px, ${
                        mouseOffset.y * 6
                      }px)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 w-[600%] h-full transition-all duration-700 ease-out"
                      style={{
                        left: `-${i * 100}%`,
                        transform: `scale(${isRevealed ? 1.05 : 1.25})`,
                        filter: isHovered
                          ? "grayscale(0.1) contrast(1.05) brightness(1.02)"
                          : isAnyHovered
                          ? "grayscale(0.85) contrast(1.04) brightness(0.65)"
                          : "grayscale(0.6) contrast(1.05) brightness(0.92)",
                      }}
                    >
                      <Image
                        src="/sites/helena-marsh/images/fenil-portrait.png"
                        alt="CA Fenil Shah, Chartered Accountant & Strategic Financial Advisor"
                        fill
                        priority
                        className="object-cover object-[50%_18%]"
                      />
                    </div>
                  </div>
                );
              })}

              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 right-4 sm:right-6 bg-[#080F1E]/92 backdrop-blur-xl border border-[#F3EFE6]/15 rounded-2xl p-5 shadow-2xl transition-all duration-500">
                <div className="flex items-center gap-1.5 mb-3">
                  {HERO_QUOTES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveQuote(idx)}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        activeQuote === idx ? "w-8 bg-[#E6C654]" : "w-3 bg-[#F3EFE6]/20"
                      }`}
                      aria-label={`Show quote ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="min-h-[72px] flex flex-col justify-between">
                  <p className="text-[13px] sm:text-[14px] text-[#F3EFE6]/90 font-light italic leading-snug line-clamp-3 transition-opacity duration-300">
                    “{HERO_QUOTES[activeQuote].quote}”
                  </p>
                  <p className="text-[11px] font-mono tracking-widest text-[#E6C654] uppercase pt-2">
                    {HERO_QUOTES[activeQuote].role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
