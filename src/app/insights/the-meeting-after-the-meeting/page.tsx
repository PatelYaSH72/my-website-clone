import React from "react";
import type { Metadata } from "next";
import { ArticleDetailTemplate } from "@/components/sites/helena-marsh/ArticleDetailTemplate";
import { ARTICLES } from "@/components/sites/helena-marsh/data";

export const metadata: Metadata = {
  title: "The Board Paper Nobody Reads — Insights by CA Fenil Shah",
  description:
    "If your board only reads the EBITDA summary and ignores the footnotes, governance is theatre. How to bring forensic honesty back into the boardroom.",
};

export default function MeetingAfterTheMeetingPage() {
  const article = ARTICLES[0];
  return <ArticleDetailTemplate article={article} />;
}
