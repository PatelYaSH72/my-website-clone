"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sites/helena-marsh/Header";
import { PageHero } from "@/components/sites/helena-marsh/PageHero";
import { Footer } from "@/components/sites/helena-marsh/Footer";
import { CtaSection } from "@/components/sites/helena-marsh/CtaSection";
import { AnimatedImageCard } from "@/components/sites/helena-marsh/AnimatedImageCard";
import { ARTICLES } from "@/components/sites/helena-marsh/data";
import { ArrowRight, DiamondMark } from "@/components/sites/helena-marsh/Icons";

export default function BlogsPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All Blogs");

  const tags = [
    "All Blogs",
    "GOVERNANCE",
    "CFO TRANSITIONS",
    "WORKING CAPITAL",
    "CAPITAL ALLOCATION",
    "DEBT COVENANTS",
    "STATUTORY ASSURANCE",
    "FORENSIC AUDIT",
    "EXECUTIVE EQUILIBRIUM",
  ];

  const filteredArticles =
    selectedTag === "All Blogs"
      ? ARTICLES
      : ARTICLES.filter((a) => a.tag.toUpperCase() === selectedTag.toUpperCase());

  // Recent Blogs: sorted by date (newest first)
  const recentBlogs = [...ARTICLES].slice(0, 5);

  // Most Viewed Blogs: sorted by viewsCount descending
  const mostViewedBlogs = [...ARTICLES]
    .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />

      <main className="flex-1">
        {/* Full-Page Majestic Hero Section */}
        <PageHero
          badge="05 THE ADVISORY BLOGS"
          title="Empirical perspectives from the"
          italicWord="audit desk."
          description="Essays on the challenges promoters and CFOs face: why your board paper is being ignored, why EBITDA is not cash, how to defend valuation under diligence, and how to restructure covenants before debt traps snap."
          chips={["CFO ADVISORY", "BOARDROOM GOVERNANCE", "STATUTORY AUDITS", "FORENSIC ANALYSIS"]}
          stats={[
            { number: "8", label: "ADVISORY ESSAYS" },
            { number: "150K+", label: "EXECUTIVE READERS" },
            { number: "FCA", label: "STATUTORY RIGOR" },
            { number: "0", label: "SURPRISES TOLERATED" },
          ]}
          ctaText="Schedule consultation"
          ctaHref="/book"
        />

        {/* Blog Filter & Layout Section */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-[1440px] mx-auto">
          {/* Category Tabs Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sm:mb-16 border-b border-[#080F1E]/15 pb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654]" />
                <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                  FILTER BLOGS BY TOPIC
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-[#080F1E]">
                Select blog focus
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#080F1E] text-[#F3EFE6] shadow-md scale-[1.02]"
                        : "bg-white/80 text-[#080F1E]/70 border border-[#080F1E]/10 hover:bg-white hover:text-[#080F1E]"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 12-Column Responsive Layout: Left Blogs Grid (8) + Right Sidebar (4) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Area: Filtered Blog Cards Grid (Span 8) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredArticles.map((article, idx) => (
                <Link
                  key={article.slug}
                  href={`/blogs/${article.slug}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-white/70 border border-[#080F1E]/10 hover:border-[#1E40AF]/30 hover:bg-white shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="flex flex-col flex-1">
                    <AnimatedImageCard
                      src={article.image}
                      alt={article.title}
                      badge={article.tag}
                      date={article.date}
                      meta={article.readTime}
                      aspectRatio="aspect-[16/10]"
                      index={idx}
                      showCaptionBelow={false}
                      flush
                    />

                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#8E9189] uppercase tracking-wider">
                          <span>
                            {article.date} · {article.readTime}
                          </span>
                          {article.views && (
                            <span className="text-[#1E40AF] font-semibold">{article.views}</span>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-[22px] font-light leading-snug text-[#080F1E] group-hover:text-[#1E40AF] transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-light text-[#080F1E]/75 leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 mt-2 border-t border-[#080F1E]/10 flex items-center justify-between text-xs font-mono tracking-wider uppercase text-[#080F1E] group-hover:text-[#1E40AF] transition-colors">
                        <span>READ ADVISORY BLOG</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Sidebar: Recent Blogs & Most Viewed Blogs (Span 4) */}
            <div className="lg:col-span-4 space-y-8 sticky top-28">
              {/* Box 1: Recent Blogs */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#080F1E]/10 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#080F1E]/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E40AF] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E40AF]" />
                    </span>
                    <h3 className="font-mono text-xs tracking-widest uppercase text-[#080F1E] font-semibold">
                      RECENT BLOGS
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#8E9189]">LATEST POSTS</span>
                </div>

                <div className="divide-y divide-[#080F1E]/10 space-y-4">
                  {recentBlogs.map((blog) => (
                    <Link
                      key={blog.slug}
                      href={`/blogs/${blog.slug}`}
                      className="group flex gap-4 pt-4 first:pt-0 items-start cursor-pointer"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#080F1E] shrink-0 border border-[#080F1E]/10">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          sizes="80px"
                          className="object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-110 transition-all duration-500"
                        />
                      </div>

                      {/* Info */}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-[4px] bg-[#080F1E]/5 text-[9px] font-mono tracking-wider uppercase text-[#1E40AF]">
                            {blog.tag}
                          </span>
                          <span className="text-[10px] font-mono text-[#8E9189]">
                            {blog.readTime}
                          </span>
                        </div>

                        <h5 className="text-[13px] font-medium text-[#080F1E] group-hover:text-[#1E40AF] transition-colors line-clamp-2 leading-snug">
                          {blog.title}
                        </h5>

                        <p className="text-[10px] font-mono text-[#8E9189]">
                          {blog.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Box 2: Most Viewed Blogs */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#080F1E] text-[#F3EFE6] border border-[#F3EFE6]/10 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#F3EFE6]/15 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E6C654]" />
                    <h3 className="font-mono text-xs tracking-widest uppercase text-[#E6C654] font-semibold">
                      MOST VIEWED BLOGS
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#F3EFE6]/50">HIGH IMPACT</span>
                </div>

                <div className="divide-y divide-[#F3EFE6]/10 space-y-4">
                  {mostViewedBlogs.map((blog, idx) => (
                    <Link
                      key={blog.slug}
                      href={`/blogs/${blog.slug}`}
                      className="group flex gap-4 pt-4 first:pt-0 items-start cursor-pointer"
                    >
                      {/* Rank Number */}
                      <span className="font-mono text-xl sm:text-2xl font-light text-[#E6C654] group-hover:text-white transition-colors shrink-0 w-7">
                        0{idx + 1}
                      </span>

                      {/* Info */}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-[#E6C654] tracking-wider uppercase">
                            {blog.tag}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[9px] font-mono text-[#F3EFE6]/80">
                            {blog.views}
                          </span>
                        </div>

                        <h5 className="text-[13px] sm:text-[14px] font-light text-[#F3EFE6] group-hover:text-[#E6C654] transition-colors line-clamp-2 leading-snug">
                          {blog.title}
                        </h5>

                        <span className="text-[10px] font-mono text-[#F3EFE6]/50 block">
                          {blog.readTime} READ · {blog.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Box 3: Retained Advisory Sounding Board Callout */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1E40AF]/15 to-[#E6C654]/10 border border-[#1E40AF]/20 space-y-4">
                <span className="text-[10px] font-mono text-[#1E40AF] tracking-widest uppercase font-semibold">
                  CONFIDENTIAL INQUIRY
                </span>
                <h4 className="text-lg font-light text-[#080F1E] leading-snug">
                  Facing a complex balance sheet or audit dilemma?
                </h4>
                <p className="text-xs font-light text-[#080F1E]/75 leading-relaxed">
                  Every month, CA Fenil Shah holds a limited number of 25-minute exploratory
                  discussions with promoters and enterprise CFOs.
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-[#080F1E] text-[#F3EFE6] px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[#1E40AF] transition-all duration-300 shadow-sm"
                >
                  <span>Book confidential consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
