"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CtaSection } from "./CtaSection";
import { Article, ARTICLES } from "./data";
import { ArrowRight } from "./Icons";

export function ArticleDetailTemplate({ article }: { article: Article }) {
  // Other recent blogs
  const recentBlogs = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  // Most viewed blogs
  const mostViewed = [...ARTICLES]
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        {/* Article Hero */}
        <section className="pt-24 sm:pt-28 pb-10 px-4 sm:px-6 max-w-[1440px] mx-auto">
          <div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#080F1E] text-[#F3EFE6] overflow-hidden p-6 sm:p-12 lg:p-16 border border-[#F3EFE6]/10 shadow-2xl space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs tracking-widest uppercase text-[#E6C654]">
                {article.tag}
              </span>
              <span className="text-[#F3EFE6]/30">·</span>
              <span className="font-mono text-xs tracking-wider text-[#F3EFE6]/60 uppercase">
                {article.date}
              </span>
              <span className="text-[#F3EFE6]/30">·</span>
              <span className="font-mono text-xs tracking-wider text-[#F3EFE6]/60">
                {article.readTime}
              </span>
              {article.views && (
                <>
                  <span className="text-[#F3EFE6]/30">·</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-[#E6C654]">
                    {article.views}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-[clamp(34px,5.5vw,72px)] leading-[1.05] tracking-tight font-light max-w-4xl">
              {article.title}
            </h1>

            {article.leadQuote && (
              <p className="text-[clamp(18px,2.2vw,24px)] font-serif italic text-[#E6C654] font-light max-w-3xl leading-snug">
                “{article.leadQuote}”
              </p>
            )}

            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mt-8 border border-[#F3EFE6]/10 bg-[#0D1C38] group">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
          </div>
        </section>

        {/* Article Body + Right Sidebar */}
        <article className="py-16 sm:py-24 px-4 sm:px-6 max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Main Text Content (Span 8) */}
            <div className="lg:col-span-8 space-y-8 text-[17px] sm:text-[18px] font-light text-[#080F1E]/85 leading-relaxed">
              {article.leadParagraph && (
                <p className="text-xl sm:text-2xl font-light text-[#080F1E] leading-relaxed pb-4 border-b border-[#080F1E]/15">
                  {article.leadParagraph}
                </p>
              )}

              {article.sections?.map((sec, i) => (
                <div key={i} className="space-y-6 pt-4">
                  {sec.heading && (
                    <h2 className="text-2xl sm:text-3xl font-light text-[#080F1E] tracking-tight pt-4">
                      {sec.heading}
                    </h2>
                  )}

                  {sec.paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}

                  {sec.quote && (
                    <blockquote className="border-l-2 border-[#E6C654] pl-6 py-2 my-6 font-serif italic text-2xl text-[#080F1E] font-normal">
                      “{sec.quote}”
                    </blockquote>
                  )}

                  {sec.list && (
                    <ul className="space-y-3 pl-2 my-6 text-[16px]">
                      {sec.list.map((li, liIdx) => (
                        <li key={liIdx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-[#E6C654] rotate-45 shrink-0 mt-2.5" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="pt-12 border-t border-[#080F1E]/15 flex items-center justify-between">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#1E40AF] transition-colors"
                >
                  <span>← Back to all blogs</span>
                </Link>
                <span className="text-xs font-mono text-[#8E9189]">
                  CA FENIL SHAH · ADVISORY BLOGS
                </span>
              </div>
            </div>

            {/* Right Sidebar (Span 4) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
              {/* Author Card */}
              <div className="p-6 rounded-3xl bg-white border border-[#080F1E]/10 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#080F1E]">
                    <Image
                      src="/sites/helena-marsh/images/fenil-portrait.png"
                      alt="CA Fenil Shah"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-base text-[#080F1E]">CA Fenil Shah</h3>
                    <p className="text-xs font-mono text-[#8E9189]">
                      Fellow Chartered Accountant (FCA)
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#080F1E]/75 leading-relaxed font-light">
                  Advising enterprise boards, scaleup CFOs, and family office promoters on
                  corporate restructuring, statutory audit defense, and capital governance.
                </p>
                <div className="pt-2">
                  <Link
                    href="/book"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#080F1E] text-[#F3EFE6] font-medium text-xs hover:bg-[#1E40AF] transition-colors"
                  >
                    <span>Schedule an advisory discussion</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Right Side: Recent Blogs */}
              <div className="p-6 rounded-3xl bg-white border border-[#080F1E]/10 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#080F1E]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1E40AF]" />
                    <h4 className="font-mono text-xs tracking-wider uppercase text-[#080F1E] font-semibold">
                      RECENT BLOGS
                    </h4>
                  </div>
                  <Link
                    href="/blogs"
                    className="text-[10px] font-mono text-[#8E9189] hover:text-[#080F1E]"
                  >
                    VIEW ALL
                  </Link>
                </div>

                <div className="divide-y divide-[#080F1E]/10 space-y-3">
                  {recentBlogs.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/blogs/${b.slug}`}
                      className="group flex gap-3 pt-3 first:pt-0 items-start cursor-pointer"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#080F1E] shrink-0 border border-[#080F1E]/10">
                        <Image
                          src={b.image}
                          alt={b.title}
                          fill
                          sizes="56px"
                          className="object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                        />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="text-[9px] font-mono text-[#1E40AF] uppercase block">
                          {b.tag}
                        </span>
                        <h5 className="text-xs font-medium text-[#080F1E] group-hover:text-[#1E40AF] line-clamp-2 leading-snug">
                          {b.title}
                        </h5>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Side: Most Viewed Blogs */}
              <div className="p-6 rounded-3xl bg-[#080F1E] text-[#F3EFE6] border border-[#F3EFE6]/10 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-[#F3EFE6]/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E6C654]" />
                    <h4 className="font-mono text-xs tracking-wider uppercase text-[#E6C654] font-semibold">
                      MOST VIEWED
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#F3EFE6]/50">TOP READS</span>
                </div>

                <div className="divide-y divide-[#F3EFE6]/10 space-y-3">
                  {mostViewed.map((b, idx) => (
                    <Link
                      key={b.slug}
                      href={`/blogs/${b.slug}`}
                      className="group flex gap-3 pt-3 first:pt-0 items-start cursor-pointer"
                    >
                      <span className="font-mono text-lg font-light text-[#E6C654] shrink-0 w-5">
                        0{idx + 1}
                      </span>
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-[#E6C654] uppercase">
                            {b.tag}
                          </span>
                          <span className="text-[9px] font-mono text-[#F3EFE6]/60">
                            {b.views}
                          </span>
                        </div>
                        <h5 className="text-xs font-light text-[#F3EFE6] group-hover:text-[#E6C654] line-clamp-2 leading-snug">
                          {b.title}
                        </h5>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </article>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
