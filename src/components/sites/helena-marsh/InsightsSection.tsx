"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "./data";
import { ArrowRight } from "./Icons";

export function InsightsSection() {
  const [filter, setFilter] = useState("ALL");
  const filters = ["ALL", "GOVERNANCE", "CFO TRANSITIONS", "WORKING CAPITAL", "CAPITAL ALLOCATION"];

  const filteredArticles =
    filter === "ALL" ? ARTICLES : ARTICLES.filter((a) => a.tag.toUpperCase() === filter);

  return (
    <section className="relative py-28 sm:py-36 px-6 max-w-[1360px] mx-auto z-10">
      {/* Head */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-[#080F1E]/15 pb-8">
        <div>
          <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189] mb-3">
            INSIGHTS & PERSPECTIVES
          </p>
          <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
            Notes from <span className="font-serif italic text-[#E6C654]">the audit desk.</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                filter === f
                  ? "bg-[#080F1E] text-[#F3EFE6] shadow-sm"
                  : "bg-white/80 hover:bg-white text-[#080F1E]/70 border border-[#080F1E]/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid: First article featured full-width if ALL is active */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredArticles.map((article, idx) => {
          const isFeatured = filter === "ALL" && idx === 0;

          return (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className={`group block rounded-3xl overflow-hidden bg-white border border-[#080F1E]/10 shadow-sm hover:shadow-xl transition-all duration-300 ${
                isFeatured ? "md:col-span-2" : ""
              }`}
            >
              {/* Cover Image */}
              <div
                className={`relative w-full overflow-hidden bg-[#080F1E] ${
                  isFeatured ? "aspect-[21/9]" : "aspect-[16/9]"
                }`}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover filter grayscale contrast-105 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  sizes={isFeatured ? "(max-width: 1200px) 100vw, 1360px" : "(max-width: 768px) 100vw, 680px"}
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-[#080F1E]/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-[#E6C654] tracking-widest uppercase">
                    {article.tag}
                  </span>
                  <span className="bg-[#080F1E]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono text-[#F3EFE6]/70">
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-4">
                <span className="text-xs font-mono text-[#8E9189] block tracking-wider uppercase">
                  {article.date}
                </span>

                <h3
                  className={`font-light text-[#080F1E] group-hover:text-[#E6C654] transition-colors leading-snug ${
                    isFeatured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-2xl"
                  }`}
                >
                  {article.title}
                </h3>

                <p className="text-[#080F1E]/70 text-[15px] sm:text-base font-light leading-relaxed max-w-3xl">
                  {article.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-2 text-sm font-medium text-[#E6C654] group-hover:text-[#F0D268]">
                  <span>Read perspective</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
