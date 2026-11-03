import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FaqSection } from "./FaqSection";
import { CtaSection } from "./CtaSection";
import { Program, FAQ_ITEMS } from "./data";
import { ArrowRight } from "./Icons";

export interface ProgramDetailProps {
  program: Program;
  audienceBadge: string;
  image: string;
}

export function ProgramDetailTemplate({ program, audienceBadge, image }: ProgramDetailProps) {
  const rhythmSteps = [
    {
      number: "01",
      title: "Strategic chemistry consultation",
      desc: "Twenty-five minutes, strictly confidential. We diagnose current fiscal challenges and determine mutual alignment.",
    },
    {
      number: "02",
      title: "Forensic & stakeholder diagnosis",
      desc: "Deep review of balance sheets, tax litigation, banking covenants, and audit committee expectations.",
    },
    {
      number: "03",
      title: "Fortnightly advisory sessions",
      desc: "One-on-one strategic corporate finance sparring structured around active board papers and capital milestones.",
    },
    {
      number: "04",
      title: "Measured financial pulses",
      desc: "Quarterly working capital velocity metrics, tax savings realized, and statutory audit committee sign-offs.",
    },
  ];

  const coachingFaqs = FAQ_ITEMS.filter((f) => f.page === "coaching" || f.page === "all");

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        {/* Programme Hero */}
        <section className="pt-24 sm:pt-28 pb-10 px-4 sm:px-6 max-w-[1440px] mx-auto">
          <div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#080F1E] text-[#F3EFE6] overflow-hidden p-6 sm:p-12 lg:p-16 border border-[#F3EFE6]/10 shadow-2xl">
            <div className="space-y-6">
              <span className="font-mono text-xs tracking-widest uppercase text-[#E6C654]">
                {audienceBadge}
              </span>

              <h1 className="text-[clamp(36px,5.5vw,76px)] leading-[1.04] font-light tracking-tight">
                {program.title}
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-[#F3EFE6]/10">
                <p className="lg:col-span-8 text-[clamp(18px,2.5vw,26px)] font-serif italic text-[#E6C654] font-light leading-snug">
                  {program.tagline}
                </p>

                <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
                  <span className="px-3.5 py-1.5 rounded-full border border-[#F3EFE6]/15 bg-[#F3EFE6]/5 text-xs font-mono tracking-wider text-[#F3EFE6]/80 uppercase">
                    {program.duration}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full border border-[#E6C654]/30 bg-[#E6C654]/10 text-xs font-mono tracking-wider text-[#E6C654] uppercase">
                    {program.price}
                  </span>
                </div>
              </div>

              {/* Wide Program Cover */}
              <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mt-8 border border-[#F3EFE6]/10 bg-[#0D1C38]">
                <Image
                  src={image}
                  alt={program.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-cover filter grayscale contrast-105 hover:grayscale-0 hover:brightness-110 hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Programme Body & Side Card */}
        <section className="py-20 sm:py-28 px-6 max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Main Column */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-4">
                <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                  THE ADVISORY MANDATE
                </p>
                <p className="text-xl sm:text-2xl font-light text-[#080F1E] leading-relaxed">
                  {program.description}
                </p>
              </div>

              {/* What is included */}
              <div className="space-y-6 pt-6 border-t border-[#080F1E]/15">
                <h2 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                  WHAT IS INCLUDED
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-light text-[#080F1E]/85">
                  {program.includes.map((inc, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#E6C654] rotate-45 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target & Outcomes */}
              <div className="space-y-6 pt-6 border-t border-[#080F1E]/15">
                <h2 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                  WHO IT IS FOR & OUTCOMES
                </h2>
                <p className="text-[17px] font-light text-[#080F1E]/80 leading-relaxed">
                  {program.forWhom}
                </p>
                <ul className="space-y-2.5 text-base text-[#080F1E]/75">
                  {program.outcomes.map((out, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-[#E6C654] font-mono text-sm">✓</span>
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Operating Rhythm */}
              <div className="space-y-6 pt-6 border-t border-[#080F1E]/15">
                <h2 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                  THE OPERATING RHYTHM
                </h2>
                <div className="space-y-4">
                  {rhythmSteps.map((step) => (
                    <div
                      key={step.number}
                      className="p-6 rounded-2xl bg-white border border-[#080F1E]/10 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#E6C654] tracking-widest">
                          STEP {step.number}
                        </span>
                        <h3 className="text-lg font-light text-[#080F1E]">{step.title}</h3>
                      </div>
                      <p className="text-sm font-light text-[#080F1E]/70 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Aside Application Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="rounded-3xl bg-[#080F1E] text-[#F3EFE6] p-8 border border-[#F3EFE6]/10 shadow-2xl space-y-6">
                <div>
                  <span className="font-mono text-xs text-[#E6C654] uppercase tracking-wider">
                    {program.duration}
                  </span>
                  <div className="text-3xl font-light tracking-tight mt-1 text-[#F3EFE6]">
                    {program.price}
                  </div>
                </div>

                <p className="text-sm font-light text-[#F3EFE6]/70 leading-relaxed">
                  Most mandates are corporate-retained or board-commissioned. Engagement letters, scope documents, and board progress notes provided.
                </p>

                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#E6C654] text-[#080F1E] font-medium text-sm hover:bg-[#F0D268] transition-all duration-300"
                >
                  <span>Initiate advisory mandate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-[11px] font-mono text-[#F3EFE6]/50 text-center uppercase tracking-wider">
                  Confidential scoping consultation
                </p>
              </div>
            </div>
          </div>
        </section>

        <FaqSection items={coachingFaqs} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
