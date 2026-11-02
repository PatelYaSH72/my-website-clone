import React from "react";
import type { Metadata } from "next";
import { ProgramDetailTemplate } from "@/components/sites/helena-marsh/ProgramDetailTemplate";
import { PROGRAMS } from "@/components/sites/helena-marsh/data";

export const metadata: Metadata = {
  title: "The First Hundred Days — Strategic Advisory with CA Fenil Shah",
  description: "Take command of the balance sheet before the market tests you.",
};

export default function FirstHundredDaysPage() {
  const program = PROGRAMS[0];
  return (
    <ProgramDetailTemplate
      program={program}
      audienceBadge="01 NEWLY APPOINTED CFOS & DIRECTORS"
      image="/sites/helena-marsh/images/who-ceos.webp"
    />
  );
}
