"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { WHO_ROWS } from "./data";
import { ArrowRight, ArrowUpRight } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

export function WhoSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, tilt: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const lastMouseX = useRef(0);

  useEffect(() => {
    if (isReducedMotion()) return;
    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      // Staggered entrance for rows
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const deltaX = e.clientX - lastMouseX.current;
    lastMouseX.current = e.clientX;
    const tilt = Math.max(-4, Math.min(4, deltaX * 0.25));

    setMousePos({
      x: e.clientX,
      y: e.clientY,
      tilt,
    });
  };

  return (
    <section
      id="who"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#080F1E] text-[#F3EFE6] pt-16 pb-24 sm:pb-32 px-6 max-w-full z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(65% 75% at 85% 15%, rgba(28, 70, 160, 0.6) 0%, transparent 70%), #080F1E",
      }}
    >
      <div className="max-w-[1360px] mx-auto space-y-8 sm:space-y-12">
        {/* Header matching video */}
        <div className="space-y-4 border-b border-[#F3EFE6]/15 pb-8 sm:pb-12">
          <p className="text-[12px] sm:text-[13px] font-mono tracking-[0.2em] uppercase text-[#E6C654]">
            — WHO I WORK WITH
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-[clamp(38px,6vw,84px)] leading-[1.02] tracking-tight font-light text-[#F3EFE6]">
              Four kinds of{" "}
              <span className="font-serif italic text-[#E6C654] font-normal not-italic">
                principal.
              </span>
            </h2>
            <p className="text-sm font-mono text-[#F3EFE6]/60 max-w-xs">
              Every mandate starts with the fiscal reality you are in — and the capital fortress you need to build.
            </p>
          </div>
        </div>

        {/* 4 Index Rows with Hover Dim & Color Shift */}
        <div className="divide-y divide-[#F3EFE6]/15 border-b border-[#F3EFE6]/15">
          {WHO_ROWS.map((row, idx) => {
            const isHovered = hoveredIdx === idx;
            const isDimmed = hoveredIdx !== null && !isHovered;

            return (
              <Link
                key={row.number}
                href="/coaching"
                ref={(el) => {
                  rowsRef.current[idx] = el;
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative py-9 sm:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 cursor-pointer ${
                  isDimmed ? "opacity-25" : "opacity-100"
                }`}
              >
                {/* Left: Number + Title */}
                <div className="flex items-baseline gap-6 sm:gap-10 lg:gap-14">
                  <span
                    className={`font-mono text-xs sm:text-sm transition-colors duration-300 ${
                      isHovered ? "text-[#E6C654]" : "text-[#8E9189]"
                    }`}
                  >
                    {row.number}
                  </span>
                  <h3
                    className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-colors duration-300 ${
                      isHovered ? "text-[#E6C654]" : "text-[#F3EFE6]"
                    }`}
                  >
                    {row.title}
                  </h3>
                </div>

                {/* Right: Description Line + Dynamic Arrow */}
                <div className="flex items-center justify-between md:justify-end gap-8 sm:gap-14 pl-12 md:pl-0">
                  <p className="text-[15px] sm:text-[16px] text-[#F3EFE6]/70 font-light max-w-md">
                    {row.line}
                  </p>
                  <div className="w-8 flex items-center justify-end text-[#F3EFE6]/60 transition-all duration-300">
                    {isHovered ? (
                      <ArrowRight className="w-5 h-5 text-[#E6C654] transition-all duration-300 translate-x-1" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-[#F3EFE6]/50 transition-all duration-300" />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Floating Centered Cursor Follower Thumbnail Preview on Desktop */}
        {hoveredIdx !== null && (
          <div
            className="hidden lg:block fixed pointer-events-none z-50 transition-transform duration-100 ease-out"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              transform: `translate(-50%, -50%) rotate(${mousePos.tilt}deg)`,
              width: "clamp(240px, 22vw, 320px)",
              aspectRatio: "4/5",
            }}
          >
            <div className="relative w-full h-full rounded-md overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#F3EFE6]/20 bg-[#080F1E] animate-in fade-in zoom-in-95 duration-200">
              <Image
                src={WHO_ROWS[hoveredIdx].image}
                alt={WHO_ROWS[hoveredIdx].title}
                fill
                className="object-cover filter grayscale contrast-105"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-[#080F1E]/10 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Footer Note matching video */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[11px] sm:text-[12px] font-mono tracking-[0.18em] uppercase text-[#8E9189]">
            NOT A FIT: ENTERPRISES LOOKING FOR PERFORMATIVE BOOKKEEPING.
          </p>
          <a
            href="#method"
            className="inline-flex items-center gap-2 border border-[#F3EFE6]/20 bg-[#080F1E] px-5 py-2 rounded-full text-[13px] font-medium text-[#F3EFE6] hover:border-[#E6C654] hover:text-[#E6C654] transition-colors"
          >
            <span>See how the advisory runs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
