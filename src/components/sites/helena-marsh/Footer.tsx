"use client";

import React from "react";
import Link from "next/link";
import { NAV_LINKS } from "./data";
import { LinkedInIcon, SubstackIcon, SpotifyIcon } from "./Icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#080F1E] text-[#F3EFE6] pt-24 pb-12 overflow-hidden z-10">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        {/* Top 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#F3EFE6]/10">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block text-2xl font-medium tracking-tight">
              CA Fenil Shah
            </Link>
            <p className="text-[#F3EFE6]/70 text-[15px] sm:text-[16px] max-w-sm leading-relaxed font-light">
              Strategic corporate finance, M&A due diligence, and boardroom advisory for promoters,
              scaleup CFOs, and audit committees. Fortnightly counsel, twelve months, measured in
              balance sheet resilience.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6C654] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E6C654]" />
              </span>
              <span className="text-xs font-mono tracking-wider uppercase text-[#E6C654]">
                Currently taking advisory mandates for Q2
              </span>
            </div>
          </div>

          {/* Column 2: Pages Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
              Pages
            </h3>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <Link
                  href="/"
                  className="text-[#F3EFE6]/80 hover:text-[#E6C654] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#F3EFE6]/80 hover:text-[#E6C654] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book"
                  className="text-[#E6C654] hover:text-[#F0D268] hover:translate-x-1 inline-block transition-all duration-300 font-medium"
                >
                  Book a consultation →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
              Contact
            </h3>
            <div className="space-y-2.5 text-[15px] text-[#F3EFE6]/80">
              <p>
                <a
                  href="mailto:office@cafenilshah.com"
                  className="hover:text-[#E6C654] transition-colors"
                >
                  office@cafenilshah.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+912249680000"
                  className="hover:text-[#E6C654] transition-colors font-mono text-sm"
                >
                  +91 (0)22 4968 0000 / +44 (0)20 7946 0321
                </a>
              </p>
              <p className="text-sm opacity-60">BKC, Mumbai · Mayfair, London</p>
            </div>

            {/* Socials */}
            <div className="pt-4 flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#F3EFE6]/15 flex items-center justify-center text-[#F3EFE6]/70 hover:text-[#E6C654] hover:border-[#E6C654] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#F3EFE6]/15 flex items-center justify-center text-[#F3EFE6]/70 hover:text-[#E6C654] hover:border-[#E6C654] transition-colors"
                aria-label="Substack"
              >
                <SubstackIcon className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#F3EFE6]/15 flex items-center justify-center text-[#F3EFE6]/70 hover:text-[#E6C654] hover:border-[#E6C654] transition-colors"
                aria-label="Spotify"
              >
                <SpotifyIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Wordmark Edge-to-Edge */}
        <div className="py-12 select-none overflow-hidden text-center">
          <p className="font-sans font-extrabold text-[clamp(44px,12.5vw,180px)] leading-none tracking-[-0.05em] text-[#F3EFE6]/15 whitespace-nowrap">
            CA FENIL SHAH
          </p>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-8 border-t border-[#F3EFE6]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8E9189]">
          <p>© {new Date().getFullYear()} CA Fenil Shah & Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#F3EFE6] transition-colors">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-[#F3EFE6] transition-colors">
              Terms of engagement
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-[#E6C654] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <span className="text-base">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
