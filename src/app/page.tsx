import Nav          from "@/components/Nav";
import Hero         from "@/components/Hero";
import TrustStrip   from "@/components/TrustStrip";
import Services     from "@/components/Services";
import Coverage     from "@/components/Coverage";
import { AboutStrip, CTABar } from "@/components/CTABlocks";
import Footer       from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Tesla Repair, LA to San Diego — Ray's EV Service",
};

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
