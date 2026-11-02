import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/sites/helena-marsh/Header";
import { PageHero } from "@/components/sites/helena-marsh/PageHero";
import { VoicesSection } from "@/components/sites/helena-marsh/VoicesSection";
import { CtaSection } from "@/components/sites/helena-marsh/CtaSection";
import { Footer } from "@/components/sites/helena-marsh/Footer";

export const metadata: Metadata = {
  title: "About — CA Fenil Shah, Chartered Accountant & Strategic Advisor",
  description:
    "Fourteen years inside boardroom finance: statutory audits, M&A due diligence, capital structuring, and corporate governance for promoters and CFOs.",
};

export default function AboutPage() {
  const timeline = [
    {
      year: "2010",
      title: "Audits & Corporate Finance Foundation",
      description:
        "Trained across complex statutory audits, corporate taxation, and forensic accounting for industrial and financial conglomerates. I learned how ledgers conceal operational vulnerabilities.",
      image: "/sites/helena-marsh/images/method-audit.webp",
    },
    {
      year: "2014",
      title: "Fellow Chartered Accountant & DISA",
      description:
        "Earned FCA (Fellow Chartered Accountant) with ICAI and certified in Information Systems Audit (DISA). Began advising high-growth mid-market enterprises on tax optimization and internal controls.",
      image: "/sites/helena-marsh/images/method-structure.webp",
    },
    {
      year: "2018",
      title: "IBBI Registered Valuer & M&A Due Diligence",
      description:
        "Certified Registered Valuer (Securities & Financial Assets). Advised on cross-border equity rounds, corporate debt restructuring, and due diligence for Series C+ scaleups.",
      image: "/sites/helena-marsh/images/case-fintech.webp",
    },
    {
      year: "2022",
      title: "The Sovereign Advisory Practice",
      description:
        "Twelve enterprise mandates at a time, three places per quarter. Advising promoters, unicorn CFOs, and board audit committees on capital defense, M&A structuring, and balance sheet compounding.",
      image: "/sites/helena-marsh/images/fenil-arch.png",
    },
  ];

  const houseRules = [
    {
      num: "01",
      title: "I protect the balance sheet, even when executive egos are tested.",
      desc: "Promoters and boards receive unvarnished fiscal truth. Never sanitized PowerPoint summaries.",
    },
    {
      num: "02",
      title: "No valuation or tax structure without audit verification.",
      desc: "Paper theories dissolve under regulatory inspection. We build structures that withstand sovereign scrutiny.",
    },
    {
      num: "03",
      title: "The balance sheet decides whether the work succeeded.",
      desc: "Every mandate is measured in EBITDA saved, working capital velocity unlocked, and clean audit sign-offs.",
    },
    {
      num: "04",
      title: "If a mandate is outside our core expertise, we say so immediately.",
      desc: "We focus exclusively on high-impact strategic corporate finance, audit defense, and capital architecture.",
    },
    {
      num: "05",
      title: "Twelve enterprise clients. Never thirteen.",
      desc: "Partner-level attention is the foundation of our advisory. We never delegate client mandates to junior associates.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        <PageHero
          badge="02 ABOUT"
          title="Fourteen years inside"
          italicWord="the boardroom."
          description="I audited balance sheets, structured corporate capital, defended tax positions — and now advise the promoters and CFOs building the next decade of industry."
          chips={["MUMBAI · LONDON", "TWELVE MANDATES AT A TIME", "FCA · IBBI VALUER"]}
          image="/sites/helena-marsh/images/fenil-arch.png"
        />

        {/* Timeline Section */}
        <section className="py-24 sm:py-32 px-6 max-w-[1360px] mx-auto">
          <div className="space-y-16">
            <div className="border-b border-[#080F1E]/15 pb-8">
              <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189] mb-3">
                THE CAREER TIMELINE
              </p>
              <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
                How the practice was <span className="font-serif italic text-[#E6C654]">built.</span>
              </h2>
            </div>

            {/* Alternating Timeline */}
            <div className="space-y-12 sm:space-y-16">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 rounded-3xl border border-[#080F1E]/10 ${
                    i % 2 === 0 ? "bg-white" : "bg-[#DAD6CB]/40"
                  }`}
                >
                  <div className={`lg:col-span-7 space-y-4 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <span className="text-3xl sm:text-4xl font-mono text-[#E6C654] tracking-tight block">
                      {item.year}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light text-[#080F1E]">
                      {item.title}
                    </h3>
                    <p className="text-[16px] sm:text-[17px] font-light text-[#080F1E]/75 leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>

                  <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-[#080F1E]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover filter grayscale contrast-105"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* House Rules */}
        <section className="py-24 sm:py-32 px-6 max-w-[1360px] mx-auto border-t border-[#080F1E]/15">
          <div className="space-y-16">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189] mb-3">
                GOVERNANCE PRINCIPLES
              </p>
              <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
                What you can <span className="font-serif italic text-[#E6C654]">hold me to.</span>
              </h2>
            </div>

            <div className="divide-y divide-[#080F1E]/15">
              {houseRules.map((rule) => (
                <div
                  key={rule.num}
                  className="py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-6"
                >
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-sm text-[#E6C654]">{rule.num}</span>
                    <h3 className="text-xl sm:text-2xl font-light text-[#080F1E] max-w-md">
                      {rule.title}
                    </h3>
                  </div>
                  <p className="text-[15px] sm:text-base font-light text-[#080F1E]/70 max-w-md pl-12 md:pl-0">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <VoicesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
