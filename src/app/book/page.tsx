"use client";

import React, { useState } from "react";
import { Header } from "@/components/sites/helena-marsh/Header";
import { PageHero } from "@/components/sites/helena-marsh/PageHero";
import { Footer } from "@/components/sites/helena-marsh/Footer";
import { ArrowRight } from "@/components/sites/helena-marsh/Icons";

export default function BookPage() {
  const [selectedTopic, setSelectedTopic] = useState("Pre-IPO & Diligence");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const topics = [
    "Pre-IPO & Diligence",
    "Capital & Tax Restructuring",
    "Strategic CFO Retainer",
    "Forensic Audit & Defense",
    "Boardroom Governance",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE6] text-[#080F1E]">
      <Header />
      <main className="flex-1">
        <PageHero
          badge="07 STRATEGIC CONSULTATION"
          title="Schedule an advisory"
          italicWord="consultation."
          description="Twenty-five minutes, strictly confidential, zero pitch. Discuss your balance sheet architecture, pre-IPO diligence, or retained CFO mandate directly with CA Fenil Shah."
          chips={["CONFIDENTIAL", "DIRECT WITH FENIL", "ZERO OBLIGATION"]}
        />

        <section className="py-20 sm:py-28 px-6 max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Process & Direct Contacts */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <p className="text-xs font-mono tracking-widest uppercase text-[#8E9189]">
                  WHAT HAPPENS NEXT
                </p>
                <h2 className="text-3xl sm:text-4xl font-light text-[#080F1E] leading-tight">
                  Twenty-five minutes.{" "}
                  <span className="font-serif italic text-[#E6C654]">Zero pitch.</span>
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#080F1E] text-[#F3EFE6] flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h3 className="font-medium text-[#080F1E] text-base">Preliminary Context</h3>
                    <p className="text-sm text-[#080F1E]/70 mt-1 font-light leading-relaxed">
                      Outline your company&apos;s stage, revenue, jurisdiction, and the structural or compliance
                      hurdle you are navigating.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#080F1E] text-[#F3EFE6] flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h3 className="font-medium text-[#080F1E] text-base">Strategic Assessment</h3>
                    <p className="text-sm text-[#080F1E]/70 mt-1 font-light leading-relaxed">
                      A focused 25-minute consultation to assess balance sheet exposure, capital requirements,
                      and audit defense readiness.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#080F1E] text-[#F3EFE6] flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h3 className="font-medium text-[#080F1E] text-base">Advisory Roadmap</h3>
                    <p className="text-sm text-[#080F1E]/70 mt-1 font-light leading-relaxed">
                      If there is institutional alignment, Fenil outlines the mandate scope. If another
                      specialist is better positioned, a trusted peer is introduced.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Reach */}
              <div className="p-6 rounded-2xl bg-white/70 border border-[#080F1E]/10 space-y-2 text-sm text-[#080F1E]/80">
                <p className="font-medium text-[#080F1E]">Prefer to write directly?</p>
                <p>
                  <a
                    href="mailto:office@cafenilshah.com"
                    className="text-[#E6C654] hover:underline font-mono"
                  >
                    office@cafenilshah.com
                  </a>
                </p>
                <p className="font-mono text-xs text-[#8E9189]">
                  Bandra Kurla Complex (BKC), Mumbai · Mayfair, London
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Booking Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-[#080F1E]/10 shadow-lg">
              {submitted ? (
                <div className="py-16 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#E6C654]/15 text-[#E6C654] flex items-center justify-center mx-auto text-2xl font-mono">
                    ✓
                  </div>
                  <h3 className="text-3xl font-light text-[#080F1E]">Enquiry received.</h3>
                  <p className="text-[#080F1E]/75 max-w-md mx-auto text-base font-light">
                    Thank you, {form.name || "there"}. CA Fenil Shah personally reviews every
                    briefing and our advisory office will reply within 24 hours to schedule a time.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-xs font-mono tracking-wider text-[#E6C654] uppercase underline underline-offset-4 cursor-pointer"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Topic choice */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono tracking-widest uppercase text-[#8E9189] block">
                      Advisory Domain
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTopic(t)}
                          className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                            selectedTopic === t
                              ? "bg-[#080F1E] text-[#F3EFE6]"
                              : "bg-[#F3EFE6] text-[#080F1E]/80 hover:bg-[#DAD6CB]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#080F1E]/80">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rajesh Singhania"
                        className="w-full px-4 py-3 rounded-xl border border-[#080F1E]/20 bg-[#F3EFE6]/30 text-[#080F1E] placeholder:text-[#8E9189] focus:outline-none focus:border-[#E6C654]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#080F1E]/80">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="r.singhania@group.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#080F1E]/20 bg-[#F3EFE6]/30 text-[#080F1E] placeholder:text-[#8E9189] focus:outline-none focus:border-[#E6C654]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#080F1E]/80">
                      Current Role & Entity
                    </label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      placeholder="e.g. Managing Director / Group CFO, Series C Enterprise"
                      className="w-full px-4 py-3 rounded-xl border border-[#080F1E]/20 bg-[#F3EFE6]/30 text-[#080F1E] placeholder:text-[#8E9189] focus:outline-none focus:border-[#E6C654]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#080F1E]/80">
                      Balance Sheet / Mandate Context
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Brief overview of transaction size, capital structure, or regulatory challenge..."
                      className="w-full px-4 py-3 rounded-xl border border-[#080F1E]/20 bg-[#F3EFE6]/30 text-[#080F1E] placeholder:text-[#8E9189] focus:outline-none focus:border-[#E6C654] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#E6C654] text-[#080F1E] font-medium text-base hover:bg-[#F0D268] transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>Request confidential consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-center text-xs font-mono text-[#8E9189]">
                    Strictly privileged & confidential under professional ethics standards.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
