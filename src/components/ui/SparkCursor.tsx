"use client";

import React, { useEffect, useRef, useState } from "react";

export function SparkCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      // Check if hovering an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest("a, button, [role='button'], input, textarea, select, [data-spark-interactive], [data-portrait-panel], [data-voltage-slab]")
        );
        setIsHovered(interactive);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setClickPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setTimeout(() => setClickPos(null), 300);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // RAF loop for smooth interpolated outer ring
    const render = () => {
      const lerp = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Outer Magnetic Spark Ring */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 rounded-full border transition-[width,height,border-color,background-color,box-shadow] duration-200 ease-out will-change-transform ${
          clickPos !== null
            ? "h-7 w-7 border-[#E6C654] bg-[#E6C654]/25 shadow-[0_0_16px_#E6C654]"
            : isHovered
            ? "h-14 w-14 border-[#E6C654] bg-[#E6C654]/10 shadow-[0_0_24px_rgba(230,198,84,0.35)]"
            : "h-8 w-8 border-[#E6C654]/40 bg-transparent shadow-[0_0_10px_rgba(230,198,84,0.15)]"
        }`}
      />

      {/* Center Precision Gold Spark Dot */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 rounded-full bg-[#E6C654] transition-[width,height,box-shadow] duration-150 will-change-transform ${
          clickPos !== null
            ? "h-2 w-2 shadow-[0_0_12px_#ffffff]"
            : isHovered
            ? "h-2.5 w-2.5 shadow-[0_0_10px_#E6C654]"
            : "h-1.5 w-1.5 shadow-[0_0_6px_#E6C654]"
        }`}
      />

      {/* Click Micro-Spark Ripple */}
      {clickPos !== null && (
        <div
          style={{
            transform: `translate3d(${clickPos.x}px, ${clickPos.y}px, 0) translate(-50%, -50%)`,
          }}
          className="fixed left-0 top-0 animate-ping rounded-full border border-[#E6C654] h-10 w-10 opacity-75"
        />
      )}
    </div>
  );
}
