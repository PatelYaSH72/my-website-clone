import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/sites/helena-marsh/Header";
import { PageHero } from "@/components/sites/helena-marsh/PageHero";
import { InsightsSection } from "@/components/sites/helena-marsh/InsightsSection";
import { CtaSection } from "@/components/sites/helena-marsh/CtaSection";
import { Footer } from "@/components/sites/helena-marsh/Footer";

export const metadata: Metadata = {
  title: "Insights — Corporate Finance & Governance Perspectives | CA Fenil Shah",
  description:
    "Rigorous perspectives on boardroom reporting, working capital compression, tax structuring, and capital allocation.",
};

export default function InsightsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        <PageHero
          badge="05 INSIGHTS & PERSPECTIVES"
          title="Notes from"
          italicWord="the audit desk."
          description="Essays on the challenges promoters and CFOs face: why your board paper is being ignored, why EBITDA is not cash, and how to defend valuation under diligence."
          chips={["READING TIME 5–8 MIN", "FORENSIC CASE STUDIES", "QUARTERLY"]}
          image="/sites/helena-marsh/images/article-board-paper.webp"
        />
        <InsightsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
