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
  title: "Mobile Tesla Repair in Southern California",
  description: "Mobile Tesla diagnostics and selected repairs at your home, office, or safe roadside location. Serving Southern California from Corona.",
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
