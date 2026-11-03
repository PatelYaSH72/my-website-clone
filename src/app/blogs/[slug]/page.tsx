import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetailTemplate } from "@/components/sites/helena-marsh/ArticleDetailTemplate";
import { ARTICLES } from "@/components/sites/helena-marsh/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Blog Not Found | CA Fenil Shah",
    };
  }

  return {
    title: `${article.title} — Blogs by CA Fenil Shah`,
    description: article.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailTemplate article={article} />;
}
