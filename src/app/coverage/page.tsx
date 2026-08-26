import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CTABar } from "@/components/CTABlocks";
import CoverageMap from "@/components/CoverageMap";
import ZipChecker from "@/components/ZipChecker";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/siteConfig";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import {
  EXTENDED_HOURS_FEE,
  NORMAL_SERVICE_HOURS,
  SERVICE_AREA_CENTER,
  SERVICE_RINGS,
} from "@/lib/serviceArea";

export const metadata: Metadata = pageMeta({
  title: "Southern California Mobile Tesla Service Area and Fees",
  description: "Check mobile Tesla service coverage and travel fees within 100 miles of the Eastvale service-area center. Exact fees are confirmed before dispatch.",
  path: "/coverage",
});

const faq = [
  {
    q: "How is my service-area fee calculated?",
    a: `Fees are based on straight-line distance from our service-area center at ${SERVICE_AREA_CENTER.address}. We confirm the exact service address and fee before dispatch.`,
  },
  {
    q: "Is there a fee within 20 miles?",
    a: "No. Appointments within 20 miles of the service-area center have no service-area fee.",
  },
  {
    q: "Is the Eastvale address a customer shop?",
    a: "No walk-in service is offered there. It is the reference point used to calculate mobile-service travel fees. Ray travels to the customer's location.",
  },
  {
    q: "What is the Extended Service Hours fee?",
    a: `Appointments scheduled outside our normal ${NORMAL_SERVICE_HOURS} service window include a flat $${EXTENDED_HOURS_FEE} Extended Service Hours fee.`,
  },
  {
    q: "What if I am more than 100 miles away?",
    a: "Call or text Ray. Locations beyond 100 miles are outside the regular coverage area, but availability may vary depending on the repair and schedule.",
  },
  {
    q: "My car cannot be driven—can you still come?",
    a: "Yes. Call directly so Ray can triage the situation and confirm the service location, timing, and fee before dispatch.",
  },
];

export default function CoveragePage() {
  return (
    <>
      <JsonLd data={faqSchema(faq)} />
      <Nav />
      <main>
        <section className="bg-brand-surface border-b border-brand-border px-5 py-14">
          <div className="max-w-5xl mx-auto">
            <span className="section-label">Mobile Service Area</span>
            <h1 className="font-display font-semibold text-brand-dark text-4xl sm:text-5xl tracking-wide mb-4 max-w-3xl">
              Check Your Mobile-Service Travel Fee
            </h1>
            <p className="font-body text-brand-muted text-lg leading-relaxed max-w-2xl mb-3">
              Ray&apos;s EV Service is based in Corona. Travel fees are calculated in 20-mile
              straight-line bands from the Eastvale service-area center. Enter your ZIP code
              for an estimate; the exact appointment address determines the final fee.
            </p>
            <p className="font-body text-brand-dark text-sm font-semibold mb-8">
              Service-area center: {SERVICE_AREA_CENTER.address}
            </p>
            <ZipChecker />
          </div>
        </section>

        <section className="grid lg:grid-cols-[minmax(0,1fr)_340px] border-b border-brand-border bg-white">
          <div className="lg:border-r border-brand-border">
            <CoverageMap />
          </div>

          <div className="p-5 sm:p-7">
            <span className="section-label">Distance Fees</span>
            <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mb-2">
              Five Simple Coverage Bands
            </h2>
            <p className="font-body text-brand-muted text-sm leading-relaxed mb-5">
              The applicable fee is added to the quoted service price and confirmed before dispatch.
            </p>

            <div className="border border-brand-border rounded-card overflow-hidden">
              {SERVICE_RINGS.map((ring) => (
                <div key={ring.maxMiles} className="flex items-center gap-3 p-4 border-b border-brand-border last:border-0">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: ring.color }}
                  />
                  <div className="min-w-0">
                    <p className="font-body font-semibold text-brand-dark text-sm">{ring.range}</p>
                    <p className="font-body text-brand-muted text-xs">{ring.label}</p>
                  </div>
                  <span className="font-display font-semibold text-brand-dark text-lg ml-auto">
                    ${ring.fee}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-body text-brand-muted text-xs leading-relaxed mt-4">
              Rings show straight-line distance. Your ZIP result is an estimate; the exact appointment address determines the final fee.
            </p>
          </div>
        </section>

        <section className="py-16 px-5 bg-brand-surface border-b border-brand-border">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-card border border-brand-border p-6">
              <span className="section-label">Standard Hours</span>
              <p className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-2">
                {NORMAL_SERVICE_HOURS}
              </p>
              <p className="font-body text-brand-muted text-sm leading-relaxed">
                Regular appointments scheduled within this service window do not have an extended-hours fee.
              </p>
            </div>

            <div className="bg-brand-dark rounded-card border border-brand-dark p-6">
              <span className="font-body text-brand-amber text-xs font-semibold uppercase tracking-widest block mb-2">
                Extended Service Hours
              </span>
              <p className="font-display font-semibold text-white text-3xl tracking-wide mb-2">
                ${EXTENDED_HOURS_FEE} flat fee
              </p>
              <p className="font-body text-white/70 text-sm leading-relaxed">
                Applies to appointments scheduled before 9:00 AM or after 5:00 PM. This is separate from any service-area fee.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-5 bg-white border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Common Questions</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-8">Coverage FAQ</h2>
            <div className="border border-brand-border rounded-card overflow-hidden">
              {faq.map(({ q, a }, index) => (
                <div key={q} className={`bg-white p-5 ${index < faq.length - 1 ? "border-b border-brand-border" : ""}`}>
                  <p className="font-body font-semibold text-brand-dark text-sm mb-2">{q}</p>
                  <p className="font-body text-brand-muted text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABar />
      </main>
      <Footer />
    </>
  );
}
