import React from "react";
import type { Metadata } from "next";
import { ArticleDetailTemplate } from "@/components/sites/helena-marsh/ArticleDetailTemplate";
import { ARTICLES } from "@/components/sites/helena-marsh/data";

export const metadata: Metadata = {
  title: "EBITDA Is Not Cash — Insights by CA Fenil Shah",
  description:
    "Profitable on the P&L, asphyxiated on the balance sheet. How rapid scale creates lethal cashflow compression.",
};

export default function FeedbackTravelsUpwardSlowlyPage() {
  const article = ARTICLES[2];
  return <ArticleDetailTemplate article={article} />;
}
