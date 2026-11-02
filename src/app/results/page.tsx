import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/sites/helena-marsh/Header";
import { PageHero } from "@/components/sites/helena-marsh/PageHero";
import { ResultsSection } from "@/components/sites/helena-marsh/ResultsSection";
import { VoicesSection } from "@/components/sites/helena-marsh/VoicesSection";
import { CtaSection } from "@/components/sites/helena-marsh/CtaSection";
import { Footer } from "@/components/sites/helena-marsh/Footer";

export const metadata: Metadata = {
  title: "Results — Balance Sheet Assurance & Case Notes | CA Fenil Shah",
  description:
    "Verifiable financial outcomes: Big-4 audit clearances, tax optimization, working capital acceleration, and corporate restructuring case notes.",
};

export default function ResultsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        <PageHero
          badge="04 RESULTS & CASE NOTES"
          title="Measured on the balance sheet"
          italicWord="and ledgers."
          description="Every engagement is tied to verified balance sheet improvements, audit clearances, and tax optimization. Here are four case studies from recent enterprise mandates."
          chips={["₹14,800 CR+ ASSETS ASSURED", "99.4% AUDIT SUCCESS", "CONFIDENTIAL CASE DATA"]}
          image="/sites/helena-marsh/images/case-fintech.webp"
        />
        <ResultsSection />
        <VoicesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
