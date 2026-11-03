"use client";

import React from "react";
import Link from "next/link";
import { ARTICLES } from "./data";
import { ArrowRight, DiamondMark } from "./Icons";
import { AnimatedImageCard } from "./AnimatedImageCard";

export function InsightsSection() {
  // Show all 4 core editorial essays in the clean 4-column layout matching reference
  const articles = ARTICLES.slice(0, 4);

  return (
    <section id="insights" className="relative py-28 sm:py-36 px-4 sm:px-6 max-w-[1360px] mx-auto z-10 bg-[#F3EFE6] text-[#080F1E]">
      {/* Header Row matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-[#080F1E]/15 pb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654]" />
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#8E9189]">
              INSIGHTS & ESSAYS
            </p>
          </div>
          <h2 className="text-[clamp(36px,4.5vw,64px)] leading-[1.04] tracking-tight font-light text-[#080F1E]">
            Notes from the{" "}
            <span className="font-serif italic text-[#E6C654]">audit desk.</span>
          </h2>
        </div>

        {/* Top-Right "All insights ->" Pill Button */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#080F1E]/20 bg-white/60 hover:bg-[#080F1E] hover:text-[#F3EFE6] hover:border-[#080F1E] text-sm font-medium transition-all duration-300 self-start sm:self-end shadow-sm cursor-pointer group"
        >
          <span>All insights</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 4-Column Card Grid matching video screenshot & media_1793704213748_4e49cd69.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {articles.map((article, idx) => (
          <Link
            key={article.slug}
            href={`/insights/${article.slug}`}
            className="group flex flex-col justify-between"
          >
            <div>
              <AnimatedImageCard
                src={article.image}
                alt={article.title}
                badge={article.tag}
                date={article.date}
                meta={article.readTime}
                aspectRatio="aspect-[4/3]"
                index={idx}
                showCaptionBelow={false}
              />

              {/* Date & Read Time */}
              <p className="mt-4 text-[11px] font-mono text-[#8E9189] tracking-wider uppercase">
                {article.date} · {article.readTime}
              </p>

              {/* Title */}
              <h3 className="mt-2 text-xl sm:text-[22px] font-light leading-snug text-[#080F1E] group-hover:text-[#1E40AF] transition-colors">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-2 text-sm font-light text-[#080F1E]/70 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            {/* Read Link */}
            <div className="pt-4 mt-2 flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-[#080F1E] group-hover:text-[#1E40AF] transition-colors">
              <span>READ ESSAY</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
