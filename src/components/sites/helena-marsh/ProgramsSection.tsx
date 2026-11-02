"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { PROGRAMS } from "./data";
import { ArrowRight } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

export function ProgramsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isReducedMotion()) return;
    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-28 sm:py-36 px-6 max-w-[1360px] mx-auto z-10">
      {/* Head */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 border-b border-[#080F1E]/15 pb-8">
        <div>
          <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189] mb-3">
            ADVISORY MANDATES
          </p>
          <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
            Three ways to{" "}
            <span className="font-serif italic text-[#E6C654]">work together.</span>
          </h2>
        </div>
        <p className="text-[#080F1E]/70 text-[16px] max-w-md font-light leading-relaxed">
          Each engagement is confidential, tied to balance sheet resilience, and structured around
          your critical corporate financial milestones.
        </p>
      </div>

      {/* 3 Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROGRAMS.map((prog, idx) => {
          const isFeatured = idx === 1; // The Principal Year
          return (
            <div
              key={prog.slug}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 hover:shadow-2xl ${
                isFeatured
                  ? "bg-[#080F1E] text-[#F3EFE6] border-[#080F1E] lg:-translate-y-3"
                  : "bg-white text-[#080F1E] border-[#080F1E]/10 shadow-sm"
              }`}
            >
              <div className="space-y-6">
                {/* Duration & Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full border ${
                      isFeatured
                        ? "border-[#F3EFE6]/20 text-[#E6C654] bg-[#F3EFE6]/5"
                        : "border-[#080F1E]/15 text-[#8E9189] bg-[#080F1E]/5"
                    }`}
                  >
                    {prog.duration}
                  </span>
                  {isFeatured && (
                    <span className="text-xs font-mono text-[#E6C654] uppercase tracking-wider">
                      Core Mandate
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight">{prog.title}</h3>

                {/* Description */}
                <p
                  className={`text-[15px] font-light leading-relaxed ${
                    isFeatured ? "text-[#F3EFE6]/75" : "text-[#080F1E]/75"
                  }`}
                >
                  {prog.description}
                </p>

                {/* Price */}
                <div className="pt-2 pb-4 border-b border-current/10">
                  <span
                    className={`text-2xl sm:text-3xl font-light tracking-tight ${
                      isFeatured ? "text-[#E6C654]" : "text-[#080F1E]"
                    }`}
                  >
                    {prog.price}
                  </span>
                </div>

                {/* Includes List with Subtle Yellow Bullets */}
                <div className="space-y-3">
                  <p className="text-xs font-mono tracking-widest uppercase opacity-60">Includes</p>
                  <ul className="space-y-2.5 text-sm font-light">
                    {prog.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[#E6C654] rotate-45 shrink-0 mt-1.5" />
                        <span className="opacity-85">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-8 mt-6 border-t border-current/10">
                <Link
                  href={`/coaching/${prog.slug}`}
                  className={`group inline-flex items-center justify-between w-full py-3 px-5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isFeatured
                      ? "bg-[#E6C654] text-[#080F1E] hover:bg-[#F0D268]"
                      : "bg-[#080F1E]/5 hover:bg-[#080F1E] text-[#080F1E] hover:text-[#F3EFE6]"
                  }`}
                >
                  <span>View mandate details</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
