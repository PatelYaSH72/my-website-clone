"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "./data";
import { ArrowRight, DiamondMark } from "./Icons";
import { AnimatedImageCard } from "./AnimatedImageCard";

export function BlogsSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        setIsRevealed(true);
        return true;
      }
      return false;
    };

    if (checkVisibility()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);

    const handleScroll = () => {
      if (checkVisibility()) {
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Featured top blog
  const featuredBlog =
    ARTICLES.find((a) => a.featured && a.slug === "promoter-debt-defense") || ARTICLES[0];

  // Secondary grid blogs (2 articles)
  const secondaryBlogs = ARTICLES.filter(
    (a) =>
      a.slug === "feedback-travels-upward-slowly" ||
      a.slug === "the-meeting-after-the-meeting"
  );

  // Recent Blogs: sorted by date (newest first)
  const recentBlogs = [...ARTICLES].slice(0, 4);

  // Most Viewed Blogs: sorted by viewsCount descending
  const mostViewedBlogs = [...ARTICLES]
    .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
    .slice(0, 4);

  return (
    <section
      id="blogs"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 max-w-[1440px] mx-auto z-10 bg-[#F3EFE6] text-[#080F1E] overflow-hidden"
    >
      {/* Section Header with Staggered Line Unmask */}
      <div
        className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-[#080F1E]/15 pb-8 transition-all duration-850 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654]" />
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#8E9189]">
              BLOGS & ADVISORY PERSPECTIVES
            </p>
          </div>
          <h2 className="text-[clamp(34px,4.5vw,64px)] leading-[1.04] tracking-tight font-light text-[#080F1E]">
            Notes from the{" "}
            <span className="font-serif italic text-[#E6C654]">audit desk.</span>
          </h2>
          <p className="text-[#080F1E]/75 text-[15px] sm:text-[17px] font-light leading-relaxed max-w-2xl">
            Empirical essays on corporate finance, working capital acceleration, statutory defense,
            and high-stakes boardroom governance.
          </p>
        </div>

        {/* View All Blogs Pill */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#080F1E]/20 bg-white/70 hover:bg-[#080F1E] hover:text-[#F3EFE6] hover:border-[#080F1E] text-sm font-medium transition-all duration-300 self-start sm:self-end shadow-sm cursor-pointer group"
        >
          <span>View all blogs ({ARTICLES.length})</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Main Content: Left Main Blogs (Span 8) + Right Sidebar (Span 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Area: Hero Featured Blog + 2-Column Sub-grid (Span 8) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Primary Featured Blog Hero Card with Reveal */}
          <Link
            href={`/blogs/${featuredBlog.slug}`}
            className={`group block overflow-hidden rounded-3xl bg-white/70 border border-[#080F1E]/10 hover:border-[#1E40AF]/30 shadow-sm hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <div>
              <AnimatedImageCard
                src={featuredBlog.image}
                alt={featuredBlog.title}
                badge={featuredBlog.tag}
                date={featuredBlog.date}
                meta={featuredBlog.readTime}
                aspectRatio="aspect-[16/9]"
                index={0}
                showCaptionBelow={false}
                flush
              />

              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#8E9189] uppercase tracking-wider">
                  <span>
                    {featuredBlog.date} · {featuredBlog.readTime} READ
                  </span>
                  {featuredBlog.views && (
                    <span className="text-[#1E40AF] font-semibold">
                      {featuredBlog.views}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-[#080F1E] group-hover:text-[#1E40AF] transition-colors leading-snug">
                  {featuredBlog.title}
                </h3>

                <p className="text-sm sm:text-base font-light text-[#080F1E]/75 leading-relaxed line-clamp-2">
                  {featuredBlog.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#080F1E] group-hover:text-[#1E40AF] transition-colors">
                  <span>READ FULL ADVISORY BLOG</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* 2-Column Secondary Blogs Grid with Staggered Reveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {secondaryBlogs.map((blog, idx) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl bg-white/50 border border-[#080F1E]/10 hover:border-[#1E40AF]/30 hover:bg-white shadow-sm hover:shadow-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${220 + idx * 120}ms` }}
              >
                <div className="flex flex-col flex-1">
                  <AnimatedImageCard
                    src={blog.image}
                    alt={blog.title}
                    badge={blog.tag}
                    date={blog.date}
                    meta={blog.readTime}
                    aspectRatio="aspect-[16/10]"
                    index={idx + 1}
                    showCaptionBelow={false}
                    flush
                  />

                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#8E9189] uppercase tracking-wider">
                        <span>
                          {blog.date} · {blog.readTime}
                        </span>
                        {blog.views && (
                          <span className="text-[#1E40AF] font-medium">{blog.views}</span>
                        )}
                      </div>

                      <h4 className="text-lg sm:text-xl font-light text-[#080F1E] group-hover:text-[#1E40AF] transition-colors leading-snug">
                        {blog.title}
                      </h4>

                      <p className="text-xs sm:text-sm font-light text-[#080F1E]/70 line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-[#080F1E] group-hover:text-[#1E40AF] transition-colors">
                      <span>READ ARTICLE</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Recent Blogs & Most Viewed Blogs (Span 4) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Box 1: Recent Blogs with Cascade Reveal */}
          <div
            className={`p-6 sm:p-7 rounded-3xl bg-white border border-[#080F1E]/10 shadow-sm space-y-6 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
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
              <span className="text-[10px] font-mono text-[#8E9189]">LATEST UPDATES</span>
            </div>

            <div className="divide-y divide-[#080F1E]/10 space-y-4">
              {recentBlogs.map((blog, bIdx) => (
                <Link
                  key={blog.slug}
                  href={`/blogs/${blog.slug}`}
                  className={`group flex gap-4 pt-4 first:pt-0 items-start cursor-pointer transition-all duration-600 ${
                    isRevealed
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${260 + bIdx * 80}ms` }}
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

          {/* Box 2: Most Viewed Blogs with Gold Accent Reveal */}
          <div
            className={`p-6 sm:p-7 rounded-3xl bg-[#080F1E] text-[#F3EFE6] border border-[#F3EFE6]/10 shadow-xl space-y-6 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "320ms" }}
          >
            <div className="flex items-center justify-between border-b border-[#F3EFE6]/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E6C654]" />
                <h3 className="font-mono text-xs tracking-widest uppercase text-[#E6C654] font-semibold">
                  MOST VIEWED BLOGS
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#F3EFE6]/50">EXECUTIVE TOP PICKS</span>
            </div>

            <div className="divide-y divide-[#F3EFE6]/10 space-y-4">
              {mostViewedBlogs.map((blog, idx) => (
                <Link
                  key={blog.slug}
                  href={`/blogs/${blog.slug}`}
                  className={`group flex gap-4 pt-4 first:pt-0 items-start cursor-pointer transition-all duration-600 ${
                    isRevealed
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${360 + idx * 90}ms` }}
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

          {/* Box 3: Priority Audit Dispatch / Consultation CTA */}
          <div
            className={`p-6 rounded-3xl bg-gradient-to-br from-[#1E40AF]/15 to-[#E6C654]/10 border border-[#1E40AF]/20 space-y-4 transition-all duration-700 ${
              isRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <span className="text-[10px] font-mono text-[#1E40AF] tracking-widest uppercase font-semibold">
              CLOSED-DOOR SESSIONS
            </span>
            <h4 className="text-lg font-light text-[#080F1E] leading-snug">
              Have a balance sheet or audit question?
            </h4>
            <p className="text-xs font-light text-[#080F1E]/75 leading-relaxed">
              Schedule a 25-minute confidential discussion directly with CA Fenil Shah.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#080F1E] text-[#F3EFE6] px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[#1E40AF] transition-all duration-300 shadow-sm"
            >
              <span>Schedule consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
