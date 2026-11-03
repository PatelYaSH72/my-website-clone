"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export interface AnimatedImageCardProps {
  src: string;
  alt: string;
  badge?: string;
  meta?: string;
  date?: string;
  title?: string;
  subtitle?: string;
  aspectRatio?: string;
  index?: number;
  onClick?: () => void;
  className?: string;
  imageClassName?: string;
  showCaptionBelow?: boolean;
}

export function AnimatedImageCard({
  src,
  alt,
  badge,
  meta,
  date,
  title,
  subtitle,
  aspectRatio = "aspect-[4/3]",
  index = 0,
  onClick,
  className = "",
  imageClassName = "",
  showCaptionBelow = true,
}: AnimatedImageCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      // If element is inside or entering viewport
      if (rect.top < window.innerHeight + 60 && rect.bottom > -60) {
        setIsRevealed(true);
        return true;
      }
      return false;
    };

    // Check immediately on mount
    if (checkVisibility()) {
      return;
    }

    // IntersectionObserver with threshold 0 so even clipped elements trigger on intersect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "80px 0px 80px 0px",
      }
    );

    observer.observe(el);

    // Window scroll fallback
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

  const staggerDelay = `${(index % 5) * 80}ms`;

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`group flex flex-col ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Visual Image Container with bottom-to-top unmask reveal */}
      <div
        className={`relative w-full ${aspectRatio} overflow-hidden rounded-2xl bg-[#080F1E] border border-[#080F1E]/10 shadow-[0_4px_20px_-8px_rgba(8,15,30,0.12)] group-hover:shadow-[0_16px_36px_-12px_rgba(8,15,30,0.22)] transition-all duration-500`}
        style={{
          clipPath: isRevealed
            ? "inset(0% 0% 0% 0% round 1rem)"
            : "inset(100% 0% 0% 0% round 1rem)",
          WebkitClipPath: isRevealed
            ? "inset(0% 0% 0% 0% round 1rem)"
            : "inset(100% 0% 0% 0% round 1rem)",
          transform: isRevealed ? "translateY(0)" : "translateY(28px)",
          opacity: isRevealed ? 1 : 0.05,
          transition: `clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}, opacity 0.75s ease-out ${staggerDelay}`,
          willChange: "clip-path, transform, opacity",
        }}
      >
        {/* Floating Pill Badge (matches media_1793704213748_4e49cd69.png) */}
        {badge && (
          <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
            <span className="inline-flex items-center px-2.5 py-1 rounded-[5px] bg-[#FDFBF7]/95 backdrop-blur-md text-[#080F1E] font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase shadow-sm border border-[#080F1E]/10">
              {badge}
            </span>
          </div>
        )}

        {/* Primary Photographic Image: Black & White by default -> vivid & bright on hover */}
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
          className={`object-cover filter grayscale contrast-[1.06] group-hover:grayscale-0 group-hover:brightness-110 group-hover:contrast-[1.08] group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${imageClassName}`}
        />

        {/* Subtle vignette gradient for overlay contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/60 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

        {/* View overlay icon */}
        {onClick && (
          <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-7 h-7 rounded-full bg-[#080F1E]/80 backdrop-blur-sm text-[#E6C654] flex items-center justify-center text-xs shadow-md">
              ↗
            </div>
          </div>
        )}
      </div>

      {/* Caption & Metadata Below the Image */}
      {showCaptionBelow && (title || date || meta) && (
        <div className="pt-3 px-1 space-y-1">
          {(date || meta) && (
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-[#8E9189]">
              {date && <span>{date}</span>}
              {date && meta && <span>·</span>}
              {meta && <span>{meta}</span>}
            </div>
          )}

          {title && (
            <h4 className="text-[13px] sm:text-[14px] font-medium text-[#080F1E] group-hover:text-[#1E40AF] transition-colors line-clamp-1 leading-snug">
              {title}
            </h4>
          )}

          {subtitle && (
            <p className="text-[11px] font-light text-[#080F1E]/70 line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
