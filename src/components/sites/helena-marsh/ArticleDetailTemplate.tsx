import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CtaSection } from "./CtaSection";
import { Article } from "./data";
import { ArrowRight } from "./Icons";

export function ArticleDetailTemplate({ article }: { article: Article }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        {/* Article Hero */}
        <section className="pt-24 sm:pt-28 pb-10 px-4 sm:px-6 max-w-[1440px] mx-auto">
          <div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#080F1E] text-[#F3EFE6] overflow-hidden p-6 sm:p-12 lg:p-16 border border-[#F3EFE6]/10 shadow-2xl space-y-8">
            <div className="flex items-center gap-3">
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
            </div>

            <h1 className="text-[clamp(34px,5.5vw,72px)] leading-[1.05] tracking-tight font-light max-w-4xl">
              {article.title}
            </h1>

            {article.leadQuote && (
              <p className="text-[clamp(18px,2.2vw,24px)] font-serif italic text-[#E6C654] font-light max-w-3xl leading-snug">
                “{article.leadQuote}”
              </p>
            )}

            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mt-8 border border-[#F3EFE6]/10 bg-[#0D1C38]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover filter grayscale contrast-105"
              />
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-16 sm:py-24 px-6 max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Main Text Content */}
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
                  href="/insights"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#E6C654] transition-colors"
                >
                  <span>← Back to all perspectives</span>
                </Link>
                <span className="text-xs font-mono text-[#8E9189]">CA FENIL SHAH · PERSPECTIVES</span>
              </div>
            </div>

            {/* Sidebar Note */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
              <div className="p-6 rounded-2xl bg-white border border-[#080F1E]/10 space-y-4 shadow-sm">
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
                    <p className="text-xs font-mono text-[#8E9189]">Chartered Accountant, Mumbai · London</p>
                  </div>
                </div>
                <p className="text-xs text-[#080F1E]/70 leading-relaxed font-light">
                  Advising twelve enterprise boards, scaleup CFOs, and family office promoters a year on corporate finance, M&A due diligence, and capital governance.
                </p>
                <div className="pt-2">
                  <Link
                    href="/book"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#E6C654] text-[#080F1E] font-medium text-xs hover:bg-[#F0D268] transition-colors"
                  >
                    <span>Schedule a consultation</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
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
