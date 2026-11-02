import React from "react";
import type { Metadata } from "next";
import { ArticleDetailTemplate } from "@/components/sites/helena-marsh/ArticleDetailTemplate";
import { ARTICLES } from "@/components/sites/helena-marsh/data";

export const metadata: Metadata = {
  title: "Capital Allocation Under Uncertainty — Insights by CA Fenil Shah",
  description:
    "Capital stewardship is a discipline of restraint. Distinguishing reversible vs irreversible balance sheet bets.",
};

export default function DecidingWhatNotToDecidePage() {
  const article = ARTICLES[3];
  return <ArticleDetailTemplate article={article} />;
}
