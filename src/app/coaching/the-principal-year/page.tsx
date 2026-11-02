import React from "react";
import type { Metadata } from "next";
import { ProgramDetailTemplate } from "@/components/sites/helena-marsh/ProgramDetailTemplate";
import { PROGRAMS } from "@/components/sites/helena-marsh/data";

export const metadata: Metadata = {
  title: "The Retained Strategic Advisor — Corporate Advisory with CA Fenil Shah",
  description: "One strategic session a fortnight. Twelve months. An unshakeable balance sheet.",
};

export default function PrincipalYearPage() {
  const program = PROGRAMS[1];
  return (
    <ProgramDetailTemplate
      program={program}
      audienceBadge="02 PROMOTERS & SITTING EXECUTIVES"
      image="/sites/helena-marsh/images/fenil-portrait.png"
    />
  );
}
