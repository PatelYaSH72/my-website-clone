"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RotatingDiscRing, ArrowUpRight } from "./Icons";

export function CtaSection() {
  return (
    <section
      id="contact"
      className="relative bg-[#080F1E] text-[#F3EFE6] pt-32 sm:pt-44 pb-28 sm:pb-36 px-6 overflow-hidden z-10"
      style={{
        clipPath: "polygon(0 4vw, 100% 0, 100% 100%, 0 100%)",
        WebkitClipPath: "polygon(0 4vw, 100% 0, 100% 100%, 0 100%)",
        marginTop: "-4vw",
      }}
    >
      {/* Background Dim Executive Portrait matching reference frame */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/sites/helena-marsh/images/fenil-speaking.webp"
          alt="CA Fenil Shah advisory"
          fill
          className="object-cover object-center filter grayscale opacity-20 contrast-125"
        />
        {/* Royal Blue & Deep Navy Atmospheric Gradients */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 30%, rgba(28, 70, 160, 0.6) 0%, transparent 65%), linear-gradient(to right, #080F1E 40%, rgba(8, 15, 30, 0.85) 70%, rgba(8, 15, 30, 0.7) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Text */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#E6C654] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#E6C654] animate-pulse" />
              <span>ACCEPTING THREE PRINCIPALS — Q4 2026</span>
            </div>

            <h2 className="text-[clamp(44px,6.8vw,96px)] leading-[1.02] tracking-tight font-light text-[#F3EFE6]">
              Start with<br />
              twenty-five <span className="font-serif italic text-[#E6C654]">minutes.</span>
            </h2>

            <p className="text-[#F3EFE6]/75 text-[17px] sm:text-[20px] max-w-xl font-light leading-relaxed">
              No deck, no pitch. You talk, I listen, and we both find out whether I am
              the right person for the next year of your balance sheet.
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

          {/* Right Column: Rotating Interactive Disc Button matching reference */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <Link
              href="/book"
              className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#E6C654] text-[#080F1E] flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-[#F0D268] group cursor-pointer"
              aria-label="Book a strategic consultation"
            >
              <RotatingDiscRing text="CALL · BOOK A CONSULTATION · CALL · BOOK A CONSULTATION · " />

              {/* Center Crisp Arrow Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 text-[#080F1E] stroke-[2]" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
