"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./data";
import { ArrowRight } from "./Icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      // Auto-hide header when scrolling down past 100px; reveal on scroll up
      if (currentY > 100 && currentY > lastY + 5) {
        setHidden(true);
      } else if (currentY < lastY - 5) {
        setHidden(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 py-3 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        hidden && !mobileMenuOpen ? "-translate-y-[120%]" : "translate-y-0"
      }`}
    >
      <div
        className={`w-full max-w-[1360px] h-[54px] sm:h-[60px] rounded-full px-4 sm:px-5 flex items-center justify-between transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? "bg-[#080F1E]/90 backdrop-blur-xl border border-[#F3EFE6]/15 text-[#F3EFE6] shadow-[0_12px_34px_-18px_rgba(4,10,24,0.7)]"
            : "bg-[#080F1E]/10 backdrop-blur-sm border border-[#080F1E]/10 text-[#080F1E]"
        }`}
      >
        {/* Logo with Elastic Hover Rotation */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 group text-current hover:opacity-90 transition-opacity"
        >
          <div className="w-2.5 h-2.5 bg-[#E6C654] rotate-45 group-hover:-rotate-12 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
          <span className="font-medium tracking-tight text-[15px] sm:text-[16px]">
            CA Fenil Shah
          </span>
          <span className="hidden sm:inline-block w-[1px] h-3.5 bg-current opacity-25" />
          <span className="hidden sm:inline-block text-[13px] opacity-60 font-mono tracking-tight">
            Chartered Accountant
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-[14px] font-medium tracking-normal transition-all duration-200 rounded-full hover:bg-current/10 ${
                  isActive ? "text-[#E6C654]" : "text-current opacity-85 hover:opacity-100"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#E6C654] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/book"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 bg-[#E6C654] text-[#080F1E] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[13px] sm:text-[14px] font-medium tracking-tight hover:bg-[#F0D268] transition-all duration-300 shadow-sm"
          >
            <span>Book a call</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-full hover:bg-current/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between items-end">
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5"
                }`}
              />
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "w-3.5"
                }`}
              />
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-4"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Sheet */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-[74px] p-6 rounded-3xl bg-[#080F1E]/95 backdrop-blur-2xl border border-[#F3EFE6]/15 text-[#F3EFE6] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 z-50">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-light py-2 border-b border-[#F3EFE6]/10 flex items-center justify-between transition-colors ${
                    isActive ? "text-[#E6C654]" : "text-[#F3EFE6]/80 hover:text-[#F3EFE6]"
                  }`}
                  style={{
                    animationDelay: `${idx * 40}ms`,
                  }}
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono opacity-50">0{idx + 1}</span>
                </Link>
              );
            })}
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 bg-[#E6C654] text-[#080F1E] py-3.5 rounded-full text-base font-medium hover:bg-[#F0D268] transition-colors"
            >
              <span>Book a consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
