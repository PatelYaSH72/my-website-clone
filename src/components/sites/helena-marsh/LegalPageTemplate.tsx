import React from "react";
import { Header } from "./Header";
import { PageHero } from "./PageHero";
import { Footer } from "./Footer";

export interface LegalSection {
  number: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalPageProps {
  badge: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export function LegalPageTemplate({
  badge,
  title,
  description,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        <PageHero
          badge={badge}
          title={title}
          description={description}
          chips={[lastUpdated, "BKC · MUMBAI", "CONFIDENTIAL"]}
        />

        <section className="py-20 sm:py-28 px-6 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Contents Rail */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                CONTENTS
              </p>
              <nav className="space-y-2 text-sm font-mono text-[#080F1E]/70">
                {sections.map((sec) => (
                  <a
                    key={sec.number}
                    href={`#sec-${sec.number}`}
                    className="flex items-center gap-3 py-1 hover:text-[#E6C654] transition-colors"
                  >
                    <span className="text-[#E6C654]">{sec.number}</span>
                    <span>{sec.title}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Document Body */}
            <div className="lg:col-span-8 space-y-12">
              <div className="p-4 rounded-xl bg-white/60 border border-[#080F1E]/10 text-xs font-mono text-[#8E9189] uppercase tracking-wider shadow-sm">
                {lastUpdated}
              </div>

              <div className="divide-y divide-[#080F1E]/15 space-y-10">
                {sections.map((sec) => (
                  <div key={sec.number} id={`sec-${sec.number}`} className="pt-8 space-y-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm text-[#E6C654]">{sec.number}</span>
                      <h2 className="text-2xl font-light text-[#080F1E] tracking-tight">
                        {sec.title}
                      </h2>
                    </div>

                    {sec.paragraphs?.map((p, i) => (
                      <p key={i} className="text-base font-light text-[#080F1E]/80 leading-relaxed">
                        {p}
                      </p>
                    ))}

                    {sec.list && (
                      <ul className="space-y-2.5 pt-2 pl-2 text-[15px] font-light text-[#080F1E]/80">
                        {sec.list.map((item, liIdx) => (
                          <li key={liIdx} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#E6C654] rotate-45 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
