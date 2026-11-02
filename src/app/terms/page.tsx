import React from "react";
import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/sites/helena-marsh/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Terms of Engagement — CA Fenil Shah",
  description:
    "Terms of engagement for strategic advisory, retainer scopes, statutory standards, and fiduciary obligations.",
};

export default function TermsPage() {
  const sections = [
    {
      number: "01",
      title: "The engagement agreement",
      paragraphs: [
        "These terms govern strategic financial advisory, capital structuring, and board advisory engagements with CA Fenil Shah Strategic Advisory. A formalized Engagement Letter and Statement of Work (SOW) define the specific mandate scope, deliverables, and timelines.",
      ],
    },
    {
      number: "02",
      title: "Confidentiality & non-disclosure",
      paragraphs: [
        "All books of account, financial models, transaction structures, and board deliberations are subject to strict non-disclosure obligations in compliance with ICAI Code of Ethics and executed mutual confidentiality agreements.",
      ],
    },
    {
      number: "03",
      title: "Fee structure & retainers",
      list: [
        "Retained Advisory mandates are billed monthly or quarterly in advance on the first business day of the cycle.",
        "Transaction & Due Diligence Mandates operate on agreed milestone mobilization schedules.",
        "Statutory opinions, valuation reports, and audit workpapers are delivered upon satisfaction of mandate invoices.",
      ],
    },
    {
      number: "04",
      title: "Regulatory compliance & independence",
      paragraphs: [
        "All tax opinions, capital structuring blueprints, and governance positions are prepared strictly within the framework of prevailing tax statutes, Ind AS / IFRS accounting standards, and applicable regulatory directives (SEBI, RBI, MCA). Independence and ethical integrity are maintained without compromise.",
      ],
    },
    {
      number: "05",
      title: "Termination of mandate",
      paragraphs: [
        "Either party may conclude an ongoing retainer upon thirty days' formal written notice. Detailed transition memoranda and completed working papers are delivered promptly upon settlement of accounts.",
      ],
    },
    {
      number: "06",
      title: "Conflict of interest checks",
      paragraphs: [
        "Prior to onboarding any institutional mandate, a thorough conflict check is conducted against active enterprise clients to avoid representation in opposing transaction sides or competing regulatory disputes.",
      ],
    },
    {
      number: "07",
      title: "Advisory office",
      paragraphs: [
        "CA Fenil Shah Strategic Advisory · Level 14, Platina, Bandra Kurla Complex (BKC), Mumbai 400051 · Mayfair, London W1 · office@cafenilshah.com · +91 (022) 6982 4400",
      ],
    },
  ];

  return (
    <LegalPageTemplate
      badge="09 TERMS & GOVERNANCE"
      title="Terms of engagement."
      description="Professional operating standards, retainer structures, statutory ethics, and fiduciary governance."
      lastUpdated="LAST UPDATED — NOVEMBER 2026"
      sections={sections}
    />
  );
}
