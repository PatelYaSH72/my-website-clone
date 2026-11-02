"use client";

import React from "react";
import { VOICES } from "./data";

export function VoicesSection() {
  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "dark":
        return "bg-[#080F1E] text-[#F3EFE6] border-[#F3EFE6]/15";
      case "stone":
        return "bg-[#DAD6CB] text-[#080F1E] border-[#080F1E]/15";
      case "pine":
        return "bg-[#132347] text-[#F3EFE6] border-[#F3EFE6]/15";
      case "brass":
        return "bg-[#E6C654] text-[#080F1E] border-[#080F1E]/15";
      case "cream":
      default:
        return "bg-white text-[#080F1E] border-[#080F1E]/15";
    }
  };

  return (
    <section className="relative py-28 sm:py-36 px-6 max-w-[1360px] mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Sticky Title & Description */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-4">
          <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
            TESTIMONIALS
          </p>
          <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
            Voices from <span className="font-serif italic text-[#E6C654]">the boardroom.</span>
          </h2>
          <p className="text-[#080F1E]/70 text-[16px] font-light leading-relaxed max-w-sm">
            What promoters, board directors, and audit committees say when the financial mandate is delivered. References are available after a strategic consultation.
          </p>
        </div>

        {/* Right Column: Sticky Piled Cards Stack */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {VOICES.map((v, i) => (
            <div
              key={i}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between border shadow-xl transition-all duration-300 min-h-[260px] sm:min-h-[290px] lg:sticky lg:top-36 ${getThemeClasses(
                v.theme
              )}`}
              style={{
                // Subtle staggered top offset for stacking deck look
                top: `calc(130px + ${i * 8}px)`,
                zIndex: i + 1,
              }}
            >
              <div className="space-y-4">
                <span className="font-serif text-5xl leading-none italic select-none opacity-40 block">
                  “
                </span>
                <p className="text-[17px] sm:text-[19px] font-light leading-relaxed">
                  {v.quote}
                </p>
              </div>

              <div className="pt-6 border-t border-current/15 flex items-baseline justify-between">
                <div>
                  <p className="font-medium text-base tracking-tight">{v.name}</p>
                  <p className="text-xs font-mono tracking-wider opacity-65 uppercase">{v.role}</p>
                </div>
                <span className="text-xs font-mono opacity-40">0{i + 1} / 0{VOICES.length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
