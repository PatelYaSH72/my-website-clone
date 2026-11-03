"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { initGSAP, isReducedMotion } from "@/lib/animations/gsap";
import { DiamondMark } from "./Icons";

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image: string;
}

interface CareerTimelineHorizontalProps {
  timeline: TimelineItem[];
}

export function CareerTimelineHorizontal({ timeline }: CareerTimelineHorizontalProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const { gsap } = initGSAP();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Calculate total horizontal scroll distance
      const getScrollDistance = () => track.scrollWidth - window.innerWidth + 120;

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance() + 400}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${Math.max(0.08, self.progress)})`;
            }
            if (progressTextRef.current) {
              const currentStep = Math.min(timeline.length, Math.floor(self.progress * timeline.length) + 1);
              progressTextRef.current.textContent = `0${currentStep} / 0${timeline.length}`;
            }
          },
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [timeline.length]);

  return (
    <section
      id="career-timeline"
      ref={sectionRef}
      className="relative w-full bg-[#F3EFE6] text-[#080F1E] overflow-hidden py-20 lg:py-0"
    >
      <div className="w-full lg:h-screen lg:flex lg:flex-col lg:justify-center max-w-[1400px] mx-auto px-6">
        {/* Header Block */}
        <div className="mb-8 lg:mb-12 max-w-2xl border-b border-[#080F1E]/15 pb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <DiamondMark className="w-2.5 h-2.5 bg-[#E6C654]" />
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#8E9189]">
                THE CAREER TIMELINE
              </p>
            </div>
            {/* Live Step Counter on Desktop */}
            <span
              ref={progressTextRef}
              className="hidden lg:inline-block font-mono text-xs text-[#080F1E]/60 tracking-wider"
            >
              01 / 0{timeline.length}
            </span>
          </div>

          <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[#080F1E] mt-2">
            How the practice was{" "}
            <span className="font-serif italic text-[#E6C654]">built.</span>
          </h2>

          {/* Horizontal Progress Track for Desktop */}
          <div className="hidden lg:block w-full h-[3px] bg-[#080F1E]/10 rounded-full overflow-hidden mt-6">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#1E40AF] via-[#E6C654] to-[#F0D268] origin-left transition-transform duration-100 ease-out"
              style={{ transform: "scaleX(0.08)" }}
            />
          </div>
        </div>

        {/* Horizontal Track on Desktop / Vertical Stack on Mobile */}
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-10 lg:items-stretch lg:w-max pb-6"
        >
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`w-full lg:w-[740px] shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center p-8 sm:p-10 rounded-3xl border border-[#080F1E]/10 shadow-sm hover:shadow-xl transition-all duration-300 ${
                i % 2 === 0 ? "bg-white" : "bg-[#DAD6CB]/40"
              }`}
            >
              {/* Content */}
              <div className={`lg:col-span-7 space-y-4 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-mono text-[#E6C654] tracking-tight font-light">
                    {item.year}
                  </span>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#8E9189]">
                    PHASE 0{i + 1}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-[#080F1E] leading-snug">
                  {item.title}
                </h3>

                <p className="text-[15px] sm:text-[16px] font-light text-[#080F1E]/75 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Photo */}
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-[#080F1E] group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover filter grayscale contrast-105 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                    sizes="(max-width: 1024px) 100vw, 360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
