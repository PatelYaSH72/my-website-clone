import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SparkCursor } from "@/components/ui/SparkCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CA Fenil Shah — Chartered Accountant & Strategic Financial Advisory",
  description:
    "Strategic corporate finance, M&A due diligence, boardroom financial governance, and tax structuring for promoters, scaleup CFOs, and audit committees.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F3EFE6] text-[#080F1E] selection:bg-[#E6C654] selection:text-[#080F1E]">
        <SparkCursor />
        {children}
      </body>
    </html>
  );
}
