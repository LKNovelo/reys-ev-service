import Nav          from "@/components/Nav";
import Hero         from "@/components/Hero";
import TrustStrip   from "@/components/TrustStrip";
import Services     from "@/components/Services";
import Coverage     from "@/components/Coverage";
import { AboutStrip, CTABar } from "@/components/CTABlocks";
import Footer       from "@/components/Footer";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/siteConfig";

export const metadata: Metadata = pageMeta({
  title: "Mobile Tesla Repair, LA to San Diego",
  description: "Veteran-owned mobile Tesla diagnostics and repair, LA to San Diego. Tesla Toolbox 3 certified. No tow truck, no dealership waitlist — Ray comes to you.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Coverage />
        <AboutStrip />
        <CTABar />
      </main>
      <Footer />
    </>
  );
}
