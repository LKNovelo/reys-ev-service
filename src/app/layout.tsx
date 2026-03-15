import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ray's EV Service",
    default: "Ray's EV Service — Mobile Tesla Repair, LA to San Diego",
  },
  description:
    "Veteran-owned mobile EV diagnostics and repair for Tesla S/3/X/Y. " +
    "Boeing-trained electrical specialist, Tesla Toolbox 3 certified. " +
    "Serving Corona, Riverside, Anaheim, Santa Ana, OC, LA, and San Diego.",
  keywords: [
    "Tesla repair Southern California",
    "mobile EV repair Corona CA",
    "Tesla diagnostics Riverside",
    "Tesla Toolbox 3 certified",
    "veteran-owned EV service",
    "mobile Tesla repair Orange County",
    "Tesla repair Anaheim",
  ],
  openGraph: {
    title: "Ray's EV Service — Mobile Tesla Repair",
    description: "Mobile EV diagnostics & repair, LA to San Diego. Veteran-owned.",
    url: "https://raysevservice.com",
    siteName: "Ray's EV Service",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
