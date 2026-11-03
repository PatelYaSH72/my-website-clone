import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sites/helena-marsh/Header";
import { PageHero } from "@/components/sites/helena-marsh/PageHero";
import { MethodSection } from "@/components/sites/helena-marsh/MethodSection";
import { FaqSection } from "@/components/sites/helena-marsh/FaqSection";
import { CtaSection } from "@/components/sites/helena-marsh/CtaSection";
import { Footer } from "@/components/sites/helena-marsh/Footer";
import { PROGRAMS, FAQ_ITEMS } from "@/components/sites/helena-marsh/data";
import { ArrowRight } from "@/components/sites/helena-marsh/Icons";
import { AnimatedImageCard } from "@/components/sites/helena-marsh/AnimatedImageCard";

export const metadata: Metadata = {
  title: "Advisory — Corporate Finance & Boardroom Mandates | CA Fenil Shah",
  description:
    "Three strategic advisory engagements for promoters, newly appointed CFOs, and board audit committees — each tied directly to balance sheet resilience.",
};

export default function CoachingPage() {
  const coachingFaqs = FAQ_ITEMS.filter((f) => f.page === "coaching" || f.page === "all");

  const programMeta = [
    {
      audience: "01 NEWLY APPOINTED CFOS & DIRECTORS",
      image: "/sites/helena-marsh/images/who-ceos.webp",
      bgClass: "bg-white text-[#080F1E] border-[#080F1E]/10",
      accent: "#E6C654",
    },
    {
      audience: "02 PROMOTERS & SITTING EXECUTIVES",
      image: "/sites/helena-marsh/images/fenil-portrait.png",
      bgClass: "bg-[#080F1E] text-[#F3EFE6] border-[#080F1E]",
      accent: "#E6C654",
    },
    {
      audience: "03 BOARDS & M&A BENCH",
      image: "/sites/helena-marsh/images/who-teams.webp",
      bgClass: "bg-[#DAD6CB] text-[#080F1E] border-[#080F1E]/10",
      accent: "#080F1E",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        <PageHero
          badge="03 ADVISORY"
          title="Three ways to"
          italicWord="work together."
          description="Every engagement starts with the same strategic chemistry consultation and the same question: what must be true on your balance sheet twelve months from now for this mandate to have been the right decision?"
          chips={["FROM 14 WEEKS", "CORPORATE RETAINER OR PRIVATE", "MUMBAI · LONDON"]}
          image="/sites/helena-marsh/images/fenil-speaking.webp"
        />

        {/* Detailed Program Panels */}
        <section className="py-24 sm:py-32 px-6 max-w-[1360px] mx-auto space-y-12">
          {PROGRAMS.map((prog, idx) => {
            const meta = programMeta[idx];
            const isDark = idx === 1;
            return (
              <div
                key={prog.slug}
                className={`rounded-[32px] p-8 sm:p-12 lg:p-16 border shadow-sm transition-all duration-300 ${meta.bgClass}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Left Column: Details */}
                  <div className="lg:col-span-7 space-y-6">
                    <p
                      className={`text-xs font-mono tracking-widest uppercase ${
                        isDark ? "text-[#E6C654]" : "text-[#8E9189]"
                      }`}
                    >
                      {meta.audience}
                    </p>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                      {prog.title}
                    </h2>

                    <p
                      className={`text-[17px] sm:text-[19px] font-serif italic ${
                        isDark ? "text-[#E6C654]" : "text-[#080F1E]/80"
                      }`}
                    >
                      {prog.tagline}
                    </p>

                    <p
                      className={`text-[15px] sm:text-[16px] font-light leading-relaxed max-w-xl ${
                        isDark ? "text-[#F3EFE6]/75" : "text-[#080F1E]/75"
                      }`}
                    >
                      {prog.description}
                    </p>

                    <div className="pt-2 pb-4">
                      <span
                        className={`text-2xl sm:text-3xl font-light tracking-tight font-mono ${
                          isDark ? "text-[#E6C654]" : "text-[#080F1E]"
                        }`}
                      >
                        {prog.price}
                      </span>
                      <span
                        className={`text-xs font-mono uppercase ml-3 tracking-widest ${
                          isDark ? "text-[#F3EFE6]/50" : "text-[#080F1E]/50"
                        }`}
                      >
                        · {prog.duration}
                      </span>
                    </div>

                    {/* Includes list */}
                    <div className="space-y-3 pt-4 border-t border-current/15">
                      <p
                        className={`text-xs font-mono tracking-widest uppercase ${
                          isDark ? "text-[#E6C654]" : "text-[#8E9189]"
                        }`}
                      >
                        What is included
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
                        {prog.includes.map((inc, i) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <span
                              className={`w-1.5 h-1.5 rotate-45 shrink-0 ${
                                isDark ? "bg-[#E6C654]" : "bg-[#080F1E]"
                              }`}
                            />
                            <span className={isDark ? "text-[#F3EFE6]/85" : "text-[#080F1E]/85"}>
                              {inc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6">
                      <Link
                        href={prog.href}
                        className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300 ${
                          isDark
                            ? "bg-[#E6C654] text-[#080F1E] hover:bg-[#F0D268]"
                            : "bg-[#080F1E] text-[#F3EFE6] hover:bg-[#132347]"
                        }`}
                      >
                        <span>Full mandate details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Photo */}
                  <div className="lg:col-span-5 relative">
                    <AnimatedImageCard
                      src={meta.image}
                      alt={prog.title}
                      badge={meta.audience.split(" ")[1]}
                      date={prog.duration}
                      title={prog.title}
                      aspectRatio="aspect-[4/5]"
                      index={idx}
                      showCaptionBelow={false}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <MethodSection />
        <FaqSection items={coachingFaqs} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
