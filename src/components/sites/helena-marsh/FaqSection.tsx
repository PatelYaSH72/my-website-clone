"use client";

import React, { useState } from "react";
import { FAQ_ITEMS, FaqItem } from "./data";
import { CrossToggle } from "./Icons";

export function FaqSection({ items = FAQ_ITEMS.slice(0, 6) }: { items?: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative py-28 sm:py-36 px-6 max-w-[1360px] mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-4">
          <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
            QUESTIONS & ANSWERS
          </p>
          <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
            Frequently <span className="font-serif italic text-[#E6C654]">answered.</span>
          </h2>
          <p className="text-[#080F1E]/70 text-[16px] font-light leading-relaxed">
            Everything you need to know about corporate retainers, audit defense, Big-4 coordination,
            statutory confidentiality, and beginning an engagement.
          </p>
        </div>

        {/* Right Column: Butter-smooth Accordion */}
        <div className="lg:col-span-7 divide-y divide-[#080F1E]/15 border-y border-[#080F1E]/15">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-6 sm:py-8 transition-colors">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-6 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-xl sm:text-2xl font-light text-[#080F1E] group-hover:text-[#E6C654] transition-colors">
                    {item.question}
                  </h3>
                  <CrossToggle isOpen={isOpen} />
                </button>

                {/* CSS Grid Smooth Height Transition */}
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pt-4 text-[#080F1E]/75 text-[16px] sm:text-[17px] font-light leading-relaxed">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
