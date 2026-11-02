import React from "react";
import type { Metadata } from "next";
import { ArticleDetailTemplate } from "@/components/sites/helena-marsh/ArticleDetailTemplate";
import { ARTICLES } from "@/components/sites/helena-marsh/data";

export const metadata: Metadata = {
  title: "Your First Ninety Days as CFO — Insights by CA Fenil Shah",
  description:
    "New CFOs arrive with grand plans. The ones who succeed arrive with forensic audits and zero assumptions.",
};

export default function FirstNinetyDaysPage() {
  const article = ARTICLES[1];
  return <ArticleDetailTemplate article={article} />;
}
