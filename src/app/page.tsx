import React from "react";
import { Header } from "@/components/sites/helena-marsh/Header";
import { HeroSection } from "@/components/sites/helena-marsh/HeroSection";
import { Ticker } from "@/components/sites/helena-marsh/Ticker";
import { ManifestoSection } from "@/components/sites/helena-marsh/ManifestoSection";
import { WhoSection } from "@/components/sites/helena-marsh/WhoSection";
import { MethodSection } from "@/components/sites/helena-marsh/MethodSection";
import { ProgramsSection } from "@/components/sites/helena-marsh/ProgramsSection";
import { ResultsSection } from "@/components/sites/helena-marsh/ResultsSection";
import { VoicesSection } from "@/components/sites/helena-marsh/VoicesSection";
import { AboutSection } from "@/components/sites/helena-marsh/AboutSection";
import { InsightsSection } from "@/components/sites/helena-marsh/InsightsSection";
import { FaqSection } from "@/components/sites/helena-marsh/FaqSection";
import { CtaSection } from "@/components/sites/helena-marsh/CtaSection";
import { Footer } from "@/components/sites/helena-marsh/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Ticker />
        <ManifestoSection />
        <WhoSection />
        <MethodSection />
        <ProgramsSection />
        <ResultsSection />
        <VoicesSection />
        <AboutSection />
        <InsightsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
