import React from "react";
import type { Metadata } from "next";
import { ProgramDetailTemplate } from "@/components/sites/helena-marsh/ProgramDetailTemplate";
import { PROGRAMS } from "@/components/sites/helena-marsh/data";

export const metadata: Metadata = {
  title: "The Institutional Bench — M&A & Restructuring with CA Fenil Shah",
  description: "Architect the financial foundation to carry the next decade of growth.",
};

export default function LeadershipBenchPage() {
  const program = PROGRAMS[2];
  return (
    <ProgramDetailTemplate
      program={program}
      audienceBadge="03 BOARDS & M&A BENCH"
      image="/sites/helena-marsh/images/who-teams.webp"
    />
  );
}
