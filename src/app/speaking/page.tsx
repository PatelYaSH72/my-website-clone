import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sites/helena-marsh/Header";
import { PageHero } from "@/components/sites/helena-marsh/PageHero";
import { Ticker } from "@/components/sites/helena-marsh/Ticker";
import { CtaSection } from "@/components/sites/helena-marsh/CtaSection";
import { Footer } from "@/components/sites/helena-marsh/Footer";
import { ArrowUpRight } from "@/components/sites/helena-marsh/Icons";

export const metadata: Metadata = {
  title: "Speaking — Corporate Finance & Boardroom Keynotes | CA Fenil Shah",
  description:
    "Keynotes and executive working sessions for corporate boards, CFO summits, and promoter forums on capital governance and audit defense.",
};

export default function SpeakingPage() {
  const talks = [
    {
      number: "01",
      title: "The Sovereign Balance Sheet",
      description: "How high-growth promoters protect equity, debt covenants, and cashflow during macroeconomic tightening.",
      format: "45 MIN KEYNOTE",
    },
    {
      number: "02",
      title: "Audit Committee Defense",
      description: "Preparing CFOs and corporate boards for institutional investor due diligence and Big-4 audit scrutiny.",
      format: "40 MIN KEYNOTE",
    },
    {
      number: "03",
      title: "Tax Architecture in the Era of Global Scrutiny",
      description: "Moving from reactive tax compliance to resilient structural optimization and transfer pricing permanence.",
      format: "HALF-DAY BOARDROOM WORKSHOP",
    },
    {
      number: "04",
      title: "M&A Diligence & Valuation Defense",
      description: "A confidential executive session de-risking acquisitions, EBITDA leakage, and post-merger fiscal integration.",
      format: "FULL-DAY EXECUTIVE INTENSIVE",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        <PageHero
          badge="06 SPEAKING & BOARD BRIEFINGS"
          title="Keynotes for rooms"
          italicWord="that allocate capital."
          description="Talks and confidential working sessions for corporate boards, CFO conferences, and promoter groups. No generic motivational speeches; just empirical lessons from fourteen years inside boardroom corporate finance."
          chips={["KEYNOTES", "BOARD SESSIONS", "CFO SUMMITS"]}
          ctaText="Enquire about availability"
          ctaHref="/book"
          image="/sites/helena-marsh/images/fenil-speaking.webp"
        />

        {/* Talks List */}
        <section className="py-24 sm:py-32 px-6 max-w-[1360px] mx-auto">
          <div className="space-y-12">
            <div className="border-b border-[#080F1E]/15 pb-8">
              <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189] mb-3">
                KEYNOTE TOPICS & SESSIONS
              </p>
              <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
                What I get <span className="font-serif italic text-[#E6C654]">asked for.</span>
              </h2>
            </div>

            <div className="divide-y divide-[#080F1E]/10">
              {talks.map((talk) => (
                <div
                  key={talk.number}
                  className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300"
                >
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-sm text-[#8E9189] group-hover:text-[#E6C654] transition-colors">
                      {talk.number}
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-light text-[#080F1E] group-hover:text-[#E6C654] transition-colors">
                        {talk.title}
                      </h3>
                      <p className="text-sm font-mono text-[#E6C654] uppercase tracking-wider mt-1">
                        {talk.format}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12 pl-12 md:pl-0">
                    <p className="text-[15px] sm:text-base text-[#080F1E]/70 font-light max-w-sm">
                      {talk.description}
                    </p>
                    <Link
                      href="/book"
                      className="w-10 h-10 rounded-full border border-[#080F1E]/15 flex items-center justify-center text-[#080F1E] group-hover:border-[#E6C654] group-hover:bg-[#E6C654] group-hover:text-[#080F1E] transition-all duration-300 shrink-0"
                      aria-label={`Enquire about ${talk.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Ticker />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
