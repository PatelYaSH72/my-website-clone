"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, SparkStar, ElectricBolt } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

interface AboutPillar {
  id: number;
  tag: string;
  pillarNum: string;
  title: string;
  stat: string;
  statLabel: string;
  desc: string;
  highlight: string;
  image: string;
  imagePosition: string;
}

const ABOUT_PILLARS: AboutPillar[] = [
  {
    id: 0,
    pillarNum: "01",
    tag: "FORENSIC SCRUTINY",
    title: "Balance Sheet Truth",
    stat: "₹14,000+ Cr",
    statLabel: "Capital & Assets Assured",
    desc: "Unvarnished forensic auditing before rating agencies or audit committees inspect.",
    highlight: "Ind AS & IFRS Statutory Rigor",
    image: "/sites/helena-marsh/images/fenil-arch.png",
    imagePosition: "object-[50%_18%]",
  },
  {
    id: 1,
    pillarNum: "02",
    tag: "M&A DILIGENCE",
    title: "Transaction Structuring",
    stat: "40+ Deals",
    statLabel: "Buy-Side Audits Cleared",
    desc: "Spotting undisclosed tax liabilities, EBITDA leakages, and debt covenants pre-signing.",
    highlight: "Defensive Valuation Models",
    image: "/sites/helena-marsh/images/method-board.webp",
    imagePosition: "object-[50%_45%]",
  },
  {
    id: 2,
    pillarNum: "03",
    tag: "CAPITAL ARCHITECTURE",
    title: "Multi-Entity Restructuring",
    stat: "₹42 Cr+",
    statLabel: "EBITDA Leakage Plugged",
    desc: "Engineering defensive permanence across holding companies and family offices.",
    highlight: "Promoter Wealth Protection",
    image: "/sites/helena-marsh/images/fenil-portrait.png",
    imagePosition: "object-[50%_18%]",
  },
  {
    id: 3,
    pillarNum: "04",
    tag: "BOARDROOM COUNSEL",
    title: "Sovereign CFO Advisory",
    stat: "180+",
    statLabel: "Strategic Mandates Delivered",
    desc: "Twelve enterprise clients at a time. Fortnightly boardroom counsel across India & UK.",
    highlight: "FCA ICAI & IBBI Valuer",
    image: "/sites/helena-marsh/images/fenil-speaking.webp",
    imagePosition: "object-[50%_20%]",
  },
];

const CREDENTIALS = [
  {
    badge: "ICAI FELLOW MEMBER",
    title: "Fellow Chartered Accountant (FCA)",
    org: "The Institute of Chartered Accountants of India",
  },
  {
    badge: "IBBI REGISTERED",
    title: "Registered Valuer (Securities & Assets)",
    org: "Insolvency and Bankruptcy Board of India",
  },
  {
    badge: "SYSTEMS & FORENSICS",
    title: "DISA Certified (Systems Audit)",
    org: "Information Systems & Internal Controls Audit",
  },
  {
    badge: "BOARDROOM PRACTICE",
    title: "14+ Years Enterprise Advisory",
    org: "Mumbai · London · Singapore Practice",
  },
];

export function AboutSection() {
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const section = sectionRef.current;
    const accordion = accordionRef.current;
    if (!section || !accordion) return;

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      // 1. Editorial text reveal on scroll
      gsap.fromTo(
        "[data-about-reveal]",
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        }
      );

      // 2. Horizontal Kinetic Aperture Unfold on the 4 Accordion Pillars
      gsap.fromTo(
        "[data-about-pillar]",
        { scaleX: 0.45, autoAlpha: 0.2, y: 24 },
        {
          scaleX: 1,
          autoAlpha: 1,
          y: 0,
          duration: 1.15,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: accordion,
            start: "top 82%",
          },
        }
      );

      // 3. Staggered credentials reveal
      gsap.fromTo(
        "[data-about-cred]",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-about-creds-grid]",
            start: "top 88%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-24 sm:scroll-mt-32 relative isolate w-full overflow-hidden bg-[#070b15] pt-28 sm:pt-36 pb-24 sm:pb-32 text-[#F3EFE6] z-20"
    >
      {/* Background Aurora: Royal Blue & Electric Gold Fields */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 20%, rgba(30, 64, 175, 0.22) 0%, transparent 72%), radial-gradient(40% 50% at 85% 75%, rgba(230, 198, 84, 0.10) 0%, transparent 70%), radial-gradient(35% 45% at 15% 85%, rgba(30, 64, 175, 0.14) 0%, transparent 70%)",
        }}
      />

      {/* Subtle Micro-Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(230, 198, 84, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(230, 198, 84, 0.4) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* TOP: Editorial Story & Authority */}
        <div className="mb-14 sm:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
            <div
              data-about-reveal
              className="inline-flex items-center gap-2.5 rounded-full border border-[#E6C654]/30 bg-[#E6C654]/10 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest text-[#E6C654]"
            >
              <SparkStar className="h-3 w-3 animate-spin-slow" />
              <span>ABOUT CA FENIL SHAH · CAPITAL ARCHITECT</span>
            </div>

            <h2
              data-about-reveal
              className="text-[clamp(2.35rem,4.6vw,4.4rem)] font-light leading-[1.03] tracking-[-0.04em] text-[#F3EFE6]"
            >
              Fourteen years inside{" "}
              <span className="font-serif italic text-[#E6C654]">boardrooms like yours.</span>
            </h2>

            <p
              data-about-reveal
              className="max-w-2xl text-[16px] sm:text-[18px] lg:text-[19px] font-light leading-[1.7] text-[#CBD5E1]"
            >
              Before establishing this sovereign practice, I advised enterprise boards, high-growth unicorn CFOs, and family office promoters across India, the UK, and Singapore. I know what Monday morning feels like when debt covenants tighten or tax scrutiny arrives — and I know how to engineer defensive permanence.
            </p>
          </div>

          <div
            data-about-reveal
            className="lg:col-span-4 flex flex-col justify-between gap-6 border-l border-white/15 pl-6 sm:pl-8 py-1"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#E6C654]">
                <ElectricBolt className="h-3 w-3" />
                <span>PRACTICE LAW</span>
              </div>
              <p className="text-[13.5px] leading-relaxed text-[#94A3B8]">
                No generic templates and no performative bookkeeping: only rigorous forensic auditing, unvarnished fiscal truth, and verifiable EBITDA compounding.
              </p>
            </div>

            <div>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-[14px] font-medium text-[#E6C654] transition-colors hover:text-[#F0D575]"
              >
                <span>Read the complete career timeline</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* CENTER: Kinetic Boardroom Accordion (4 Forensic Pillars Slabs) */}
        <div className="relative">
          {/* Laser Scanline Beam Sweeping Horizontally */}
          <div aria-hidden="true" className="animate-horizontal-laser z-30" />

          <div
            ref={accordionRef}
            onMouseLeave={() => setActivePillar(null)}
            className="relative flex h-[500px] sm:h-[560px] lg:h-[620px] w-full items-stretch gap-2 sm:gap-3 overflow-hidden rounded-[20px] border border-white/10 bg-[#091122]/80 p-2 sm:p-2.5 shadow-[0_32px_90px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            {ABOUT_PILLARS.map((pillar, index) => {
              const isHovered = activePillar === index;
              const isAnotherHovered = activePillar !== null && !isHovered;

              return (
                <div
                  key={pillar.id}
                  data-about-pillar
                  onMouseEnter={() => setActivePillar(index)}
                  onClick={() => setActivePillar(activePillar === index ? null : index)}
                  style={{
                    flex: isHovered ? "2.3" : isAnotherHovered ? "0.65" : "1",
                    transition:
                      "flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                  }}
                  className={`group relative min-w-0 cursor-pointer overflow-hidden rounded-[14px] border transition-all select-none ${
                    isHovered
                      ? "border-[#E6C654]/85 shadow-[0_0_36px_rgba(230,198,84,0.32)] z-20 bg-[#0d1627]"
                      : "border-white/[0.10] hover:border-white/30 z-10 bg-[#0b1220]"
                  }`}
                >
                  {/* Pillar Visual Layer */}
                  <div className="absolute inset-0 h-full w-full overflow-hidden">
                    <Image
                      src={pillar.image}
                      alt={`CA Fenil Shah — ${pillar.title}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      className={`object-cover transition-all duration-700 ${pillar.imagePosition} ${
                        isHovered
                          ? "grayscale-0 brightness-[1.08] contrast-[1.05] scale-[1.05]"
                          : "grayscale-[60%] brightness-[0.76] scale-[1.01]"
                      }`}
                    />
                  </div>

                  {/* Dark Vignette Overlay for Crisp Readability */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                      isHovered
                        ? "bg-gradient-to-t from-[#070b15]/90 via-[#070b15]/35 to-[#070b15]/40"
                        : "bg-gradient-to-t from-[#070b15]/95 via-[#070b15]/65 to-[#070b15]/50"
                    }`}
                  />

                  {/* TOP: Pillar Number & Spark Node */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 backdrop-blur-md">
                      <SparkStar
                        className={`h-2.5 w-2.5 transition-colors ${
                          isHovered ? "text-[#E6C654] animate-spin-slow" : "text-white/40"
                        }`}
                      />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#E6C654]">
                        {pillar.pillarNum}
                      </span>
                    </div>

                    <span className="hidden sm:inline-block font-mono text-[8px] font-semibold uppercase tracking-wider text-white/50">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* BOTTOM: Accordion Expansion Content */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6 flex flex-col justify-end">
                    {/* Collapsed State Title (Visible when not expanded) */}
                    <div
                      className={`transition-opacity duration-300 ${
                        isHovered ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
                      }`}
                    >
                      <p className="font-serif italic text-[16px] sm:text-[18px] text-[#F3EFE6] leading-tight line-clamp-1">
                        {pillar.title}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-[#E6C654] tracking-wider">
                        {pillar.stat}
                      </p>
                    </div>

                    {/* Expanded State Content (Reveals rich impact metrics on hover/click) */}
                    <div
                      className={`transition-all duration-500 ease-out ${
                        isHovered
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden"
                      }`}
                    >
                      <div className="rounded-xl border border-white/15 bg-[#080F1E]/90 p-4 sm:p-5 shadow-2xl backdrop-blur-xl space-y-3">
                        <div className="flex items-baseline justify-between border-b border-white/10 pb-2.5">
                          <span className="text-[clamp(1.5rem,2.8vw,2.4rem)] font-medium tracking-tight text-[#E6C654] leading-none">
                            {pillar.stat}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8]">
                            {pillar.statLabel}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-serif italic text-[18px] sm:text-[21px] text-[#F3EFE6] leading-tight">
                            {pillar.title}
                          </h3>
                          <p className="mt-1.5 text-[12.5px] sm:text-[13.5px] font-light leading-relaxed text-[#CBD5E1]">
                            {pillar.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-[#E6C654]/90">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#E6C654] animate-live-pulse" />
                          <span>{pillar.highlight}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Micro Helper Text */}
          <div className="mt-3 flex items-center justify-between px-2 text-[10px] font-mono uppercase tracking-widest text-white/40">
            <span>✦ KINETIC ACCORDION · HOVER OR TAP TO EXPAND PILLARS</span>
            <span>MUMBAI · LONDON ADVISORY</span>
          </div>
        </div>

        {/* BOTTOM: Credentials & Statutory Badges Grid */}
        <div
          data-about-creds-grid
          className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 pt-8 sm:pt-10"
        >
          {CREDENTIALS.map((cred, idx) => (
            <div
              key={idx}
              data-about-cred
              className="group flex flex-col justify-between gap-3 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[#E6C654]/40 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E6C654]">
                  {cred.badge}
                </span>
                <SparkStar className="h-2.5 w-2.5 text-white/30 transition-transform group-hover:rotate-45 group-hover:text-[#E6C654]" />
              </div>

              <div>
                <h4 className="text-[15px] font-medium text-[#F3EFE6] leading-snug">
                  {cred.title}
                </h4>
                <p className="mt-1 text-[12px] font-light text-[#94A3B8]">
                  {cred.org}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
