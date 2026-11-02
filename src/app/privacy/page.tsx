import React from "react";
import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/sites/helena-marsh/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Privacy & Data Protection — CA Fenil Shah",
  description: "Professional confidentiality, client data sovereignty, and statutory regulatory adherence.",
};

export default function PrivacyPage() {
  const sections = [
    {
      number: "01",
      title: "Professional scope",
      paragraphs: [
        "This policy outlines how CA Fenil Shah Strategic Advisory handles confidential client data, financial disclosures, and communications across our offices in Bandra Kurla Complex (BKC), Mumbai and Mayfair, London.",
      ],
    },
    {
      number: "02",
      title: "Information gathered",
      list: [
        "Executive contact details and confidential briefing materials submitted via formal engagement inquiries.",
        "Corporate balance sheet summaries, trial balances, and cap-table data supplied under mutual non-disclosure agreements (NDAs).",
        "Encrypted communications and working papers retained strictly in accordance with ICAI mandatory documentation standards.",
      ],
    },
    {
      number: "03",
      title: "Use of information",
      paragraphs: [
        "All data is utilized solely for statutory assurance, financial modeling, tax architecture, and board governance advisory. We never disclose, monetize, or transfer proprietary corporate data to third parties.",
      ],
    },
    {
      number: "04",
      title: "ICAI & legal privilege",
      paragraphs: [
        "Client communications are protected by the Chartered Accountants Act, 1949 statutory confidentiality standards and customary professional privilege. No information is revealed without prior written client mandate or valid judicial order.",
      ],
    },
    {
      number: "05",
      title: "Data retention & rights",
      paragraphs: [
        "Under applicable data protection frameworks including the Digital Personal Data Protection Act (DPDP Act) and UK GDPR, corporate clients retain rights to request audit logs, verify data integrity, or demand certified record purging following engagement conclusion.",
      ],
    },
    {
      number: "06",
      title: "Advisory office",
      paragraphs: [
        "CA Fenil Shah Strategic Advisory · Level 14, Platina, Bandra Kurla Complex (BKC), Mumbai 400051 · Mayfair, London W1 · office@cafenilshah.com",
      ],
    },
  ];

  return (
    <LegalPageTemplate
      badge="08 PRIVACY & PRIVILEGE"
      title="Privacy & confidentiality."
      description="Professional confidentiality, client data sovereignty, and statutory regulatory standards."
      lastUpdated="LAST UPDATED — NOVEMBER 2026"
      sections={sections}
    />
  );
}
