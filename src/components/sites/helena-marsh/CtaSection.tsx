import React from "react";
import Link from "next/link";
import { RotatingDiscRing, ArrowRight } from "./Icons";

export function CtaSection() {
  return (
    <section
      className="relative bg-[#080F1E] text-[#F3EFE6] pt-32 sm:pt-40 pb-28 sm:pb-36 px-6 clip-diagonal-top z-10"
      style={{
        background:
          "radial-gradient(65% 75% at 85% 25%, rgba(28, 70, 160, 0.6) 0%, transparent 70%), #080F1E",
      }}
    >
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Text */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#E6C654] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#E6C654] animate-live-pulse" />
              <span>ACCEPTING THREE ADVISORY MANDATES — Q2 2026</span>
            </div>

            <h2 className="text-[clamp(36px,5.5vw,76px)] leading-[1.04] tracking-[-0.03em] font-light">
              Start with{" "}
              <span className="font-serif italic text-[#E6C654]">twenty-five minutes.</span>
            </h2>

            <p className="text-[#F3EFE6]/75 text-[18px] sm:text-[20px] max-w-xl font-light leading-relaxed">
              No sales pitch, no generic presentations. You outline your financial objectives, debt
              covenants, or M&A plans, I present our structuring strategy, and we establish mutual alignment.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm font-mono text-[#F3EFE6]/60">
              <p>
                Direct:{" "}
                <a
                  href="mailto:office@cafenilshah.com"
                  className="text-[#F3EFE6] hover:text-[#E6C654] transition-colors underline underline-offset-4"
                >
                  office@cafenilshah.com
                </a>
              </p>
              <span className="hidden sm:inline">·</span>
              <p>BKC, Mumbai · Mayfair, London</p>
            </div>
          </div>

          {/* Right Column: Rotating Interactive Disc Button */}
          <div className="lg:col-span-4 flex justify-center">
            <Link
              href="/book"
              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#E6C654] text-[#080F1E] flex items-center justify-center p-3 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-[#F0D268] group cursor-pointer"
              aria-label="Book a strategic consultation"
            >
              <RotatingDiscRing />

              {/* Center Circle Content */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#080F1E] text-[#F3EFE6] flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
                <ArrowRight className="w-6 h-6 text-[#E6C654] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
