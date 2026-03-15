import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | Rey's EV Service",
    default: "Rey's EV Service — Mobile Tesla Repair, LA to San Diego",
  },
  description:
    "Veteran-owned mobile EV diagnostics and repair for Tesla S/3/X/Y. " +
    "Boeing-trained electrical specialist, Tesla Toolbox 3 certified. " +
    "Serving Corona, Riverside, OC, LA, Long Beach, Temecula, and San Diego.",
  keywords: [
    "Tesla repair Southern California",
    "mobile EV repair",
    "Tesla diagnostics",
    "Tesla Toolbox 3",
    "veteran-owned EV service",
    "Corona CA Tesla",
  ],
  openGraph: {
    title: "Rey's EV Service — Mobile Tesla Repair",
    description: "Mobile EV diagnostics & repair, LA to San Diego. Veteran-owned.",
    url: "https://raysevservice.com",
    siteName: "Rey's EV Service",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
