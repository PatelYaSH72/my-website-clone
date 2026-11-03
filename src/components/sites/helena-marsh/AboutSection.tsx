"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./Icons";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const wordLeftRef = useRef<HTMLSpanElement>(null);
  const wordRightRef = useRef<HTMLSpanElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  const credentials = [
    "FELLOW CHARTERED ACCOUNTANT (FCA) — ICAI",
    "REGISTERED VALUER (SECURITIES & ASSETS) — IBBI",
    "DISA (INFORMATION SYSTEMS AUDIT) CERTIFIED",
    "STRATEGIC CFO & BOARDROOM ADVISOR SINCE 2012",
  ];

  useEffect(() => {
    if (isReducedMotion()) return;

    const { gsap } = initGSAP();
    const container = containerRef.current;
    const arch = archRef.current;
    const portrait = portraitRef.current;
    const wordLeft = wordLeftRef.current;
    const wordRight = wordRightRef.current;
    const bio = bioRef.current;
    const vignette = vignetteRef.current;

    if (!container || !arch || !wordLeft || !wordRight || !bio) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Set initial state
      arch.style.clipPath = "inset(16% 34% 14% 34% round 44vw 44vw 8px 8px)";
      gsap.set(wordLeft, { opacity: 1, y: 0 });
      gsap.set(wordRight, { opacity: 1, y: 0 });
      gsap.set(bio, { opacity: 0, y: 80 });
      if (vignette) gsap.set(vignette, { opacity: 0 });
      if (portrait) gsap.set(portrait, { scale: 1.2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2200",
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
        },
      });

      // Dummy progress object for mathematically perfect clipPath unmasking
      const unmaskObj = { p: 0 };

      // Phase 1: Unmask the arch window to full bleed + words slide away
      tl.to(
        wordLeft,
        {
          y: -140,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.45,
        },
        0
      )
        .to(
          wordRight,
          {
            y: 140,
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.45,
          },
          0
        )
        .to(
          unmaskObj,
          {
            p: 1,
            ease: "power2.inOut",
            duration: 0.6,
            onUpdate: () => {
              const u = unmaskObj.p;
              const top = (1 - u) * 16;
              const side = (1 - u) * 34;
              const bottom = (1 - u) * 14;
              const rTop = (1 - u) * 44;
              const rBot = (1 - u) * 8;
              arch.style.clipPath = `inset(${top}% ${side}% ${bottom}% ${side}% round ${rTop}vw ${rTop}vw ${rBot}px ${rBot}px)`;
            },
          },
          0
        );

      if (portrait) {
        tl.to(
          portrait,
          {
            scale: 1.04,
            ease: "power1.out",
            duration: 0.6,
          },
          0
        );
      }

      // Phase 2: Fade in dark vignette and glide bio overlay into place
      if (vignette) {
        tl.to(
          vignette,
          {
            opacity: 0.9,
            ease: "power2.out",
            duration: 0.4,
          },
          0.55
        );
      }

      tl.to(
        bio,
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.4,
        },
        0.58
      );

      // Plateau hold phase at the end so user reads before unpinning
      tl.to({}, { duration: 0.25 });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-[#F3EFE6] text-[#080F1E] overflow-hidden z-20"
    >
      {/* Pinned Desktop Experience (Shown on lg and above) */}
      <div className="hidden lg:flex relative h-screen w-full overflow-hidden items-center justify-center">
        {/* Centered Arch Window Morphing to Full Screen */}
        <div
          ref={archRef}
          className="absolute inset-0 w-full h-full bg-[#080F1E] overflow-hidden"
          style={{
            clipPath: "inset(16% 34% 14% 34% round 44vw 44vw 8px 8px)",
          }}
        >
          <div ref={portraitRef} className="relative w-full h-full">
            <Image
              src="/sites/helena-marsh/images/fenil-arch.png"
              alt="CA Fenil Shah portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 100vw"
              className="object-cover filter contrast-105"
              priority
            />
          </div>
          {/* Dark Vignette Overlay on Copy Phase */}
          <div
            ref={vignetteRef}
            className="absolute inset-0 bg-gradient-to-t from-[#080F1E] via-[#080F1E]/85 to-transparent pointer-events-none"
            style={{ opacity: 0 }}
          />
        </div>

        {/* Intro Floating Headline Words ("Meet" on Left, "Fenil" on Right) */}
        <span
          ref={wordLeftRef}
          className="absolute top-1/2 right-[calc(50%+16vw)] -translate-y-1/2 text-[clamp(44px,6.2vw,96px)] font-light tracking-tight text-[#080F1E] uppercase select-none pointer-events-none z-10"
        >
          Meet
        </span>
        <span
          ref={wordRightRef}
          className="absolute top-1/2 left-[calc(50%+16vw)] -translate-y-1/2 text-[clamp(52px,7.8vw,114px)] font-serif italic text-[#E6C654] tracking-tight select-none pointer-events-none z-10"
        >
          Fenil
        </span>

        {/* Bio & Credentials Overlay (Rides up as scroll approaches end) */}
        <div
          ref={bioRef}
          className="absolute inset-0 z-20 flex items-center justify-center px-6 lg:px-12 pointer-events-none"
          style={{ opacity: 0, transform: "translateY(80px)" }}
        >
          <div className="max-w-[1240px] w-full text-[#F3EFE6] pointer-events-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <p className="text-xs font-mono tracking-widest uppercase text-[#E6C654]">
                ABOUT CA FENIL SHAH
              </p>
              <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light">
                Fourteen years inside{" "}
                <span className="font-serif italic text-[#E6C654]">boardrooms like yours.</span>
              </h2>
              <p className="text-[#F3EFE6]/80 text-[18px] sm:text-[20px] font-light leading-relaxed max-w-2xl">
                Before establishing this strategic advisory, I advised enterprise boards, high-growth
                unicorn CFOs, and family office promoters across India, the UK, and Singapore. I know
                what Monday morning feels like when debt covenants tighten or tax scrutiny arrives —
                and I know how to engineer defensive permanence.
              </p>
              <p className="text-[#F3EFE6]/70 text-[15px] sm:text-[16px] font-light leading-relaxed max-w-2xl">
                My work is grounded in forensic balance sheet analysis, Ind AS / IFRS statutory
                governance, and working capital optimization. There are no generic templates and no
                performative bookkeeping: only rigorous auditing, unvarnished fiscal truth, and
                verifiable EBITDA compounding.
              </p>
              {/* Credentials */}
              <div className="pt-4 border-t border-[#F3EFE6]/15 max-w-2xl">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] sm:text-[13px] font-mono text-[#F3EFE6]/75">
                  {credentials.map((cred, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-[#E6C654] rotate-45 shrink-0" />
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-base font-medium text-[#E6C654] hover:text-[#F0D268] transition-colors"
                >
                  <span>The longer story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fallback Layout (Shown on screens < lg) */}
      <div className="block lg:hidden py-24 px-6 max-w-[1360px] mx-auto grid grid-cols-1 gap-12 items-center">
        <div className="relative w-full max-w-[420px] mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-[#080F1E]/10 bg-[#080F1E]">
          <Image
            src="/sites/helena-marsh/images/fenil-arch.png"
            alt="CA Fenil Shah, Chartered Accountant"
            fill
            sizes="(max-width: 640px) 100vw, 420px"
            className="object-cover filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#F3EFE6]">
            <span className="font-serif italic text-2xl">CA Fenil Shah</span>
            <span className="text-xs font-mono uppercase text-[#E6C654] tracking-widest">
              Mumbai · London
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
            ABOUT CA FENIL SHAH
          </p>
          <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E]">
            Fourteen years inside{" "}
            <span className="font-serif italic text-[#E6C654]">boardrooms like yours.</span>
          </h2>
          <p className="text-[#080F1E]/80 text-[18px] font-light leading-relaxed">
            Before establishing this strategic advisory, I advised enterprise boards, high-growth
            unicorn CFOs, and family office promoters across India, the UK, and Singapore. I know how to
            engineer defensive balance sheet permanence.
          </p>
          <div className="pt-4 border-t border-[#080F1E]/15 space-y-3">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] font-mono text-[#080F1E]/75">
              {credentials.map((cred, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[#E6C654] rotate-45 shrink-0" />
                  <span>{cred}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-base font-medium text-[#080F1E] hover:text-[#E6C654] transition-colors"
            >
              <span>The longer story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
