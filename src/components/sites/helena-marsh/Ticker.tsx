"use client";

import React from "react";
import { CLIENT_NAMES } from "./data";

export function Ticker() {
  // Duplicate for seamless loop
  const list = [...CLIENT_NAMES, ...CLIENT_NAMES];

  return (
    <div className="w-full overflow-hidden py-10 bg-[#F3EFE6] ticker-mask border-b border-[#080F1E]/10">
      <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
        {list.map((client, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-[13px] sm:text-[14px] font-mono tracking-widest uppercase text-[#080F1E]/75 hover:text-[#080F1E] transition-colors">
              {client}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6C654]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
