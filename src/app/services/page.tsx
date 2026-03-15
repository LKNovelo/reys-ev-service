import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import { CTABar } from "@/components/CTABlocks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Pricing — Ray's EV Service",
  description: "Mobile Tesla diagnostics, battery service, charging repair, and pre-purchase inspections. Serving LA to San Diego from Corona, CA.",
};

const services = [
  {
    id: "diagnostic",
    name: "Full EV Diagnostic",
    badge: "Most requested",
    price: "$149",
    priceSuffix: "flat",
    credited: true,
    desc: "Tesla Toolbox 3 scan of all vehicle systems. Fault codes, battery health report, and written findings — all on-site.",
    includes: [
      "All fault codes read and explained",
      "Battery state-of-health report",
      "Written findings document",
      "Repair recommendation (no obligation)",
    ],
  },
  {
    id: "battery",
    name: "Battery & BMS Service",
    price: "$299",
    priceSuffix: "starting",
    credited: false,
    desc: "Cell balancing, state-of-health testing, and battery management system calibration. Range loss diagnosis included.",
    includes: [
      "BMS calibration and reset",
      "Individual cell health check",
      "Range loss root-cause diagnosis",
      "Written report",
    ],
  },
  {
    id: "charging",
    name: "Charging System Repair",
    price: "$199",
    priceSuffix: "starting",
    credited: false,
    desc: "Won't charge? Slow charging? We diagnose onboard charger faults, charge port issues, and 12V system failures.",
    includes: [
      "Onboard charger fault diagnosis",
      "Charge port inspection & latch check",
      "12V charging circuit test",
      "Parts quoted before work begins",
    ],
  },
  {
    id: "electrical",
    name: "12V System & Electrical",
    price: "$129",
    priceSuffix: "starting",
    credited: false,
    desc: "12V battery replacement, HV contactor testing, and low-voltage wiring faults. Common Tesla 12V units carried in-van.",
    includes: [
      "12V battery test and replacement",
      "HV contactor health check",
      "Low-voltage wiring diagnosis",
      "Model 3/Y/S/X units in stock",
    ],
  },
  {
    id: "remote",
    name: "Remote Pre-Diagnostic",
    price: "$100",
    priceSuffix: "flat",
    credited: true,
    desc: "Send us your fault codes before booking. Ray reviews remotely and confirms job scope — no surprise costs on dispatch.",
    includes: [
      "Remote Toolbox 3 fault code review",
      "Scope and parts confirmation",
      "Written pre-visit summary",
      "Credited toward on-site repair",
    ],
  },
  {
    id: "inspection",
    name: "Pre-Purchase Inspection",
    price: "$249",
    priceSuffix: "flat",
    credited: false,
    desc: "Buying a used Tesla? We inspect battery health, safety systems, and fault history before you sign anything.",
    includes: [
      "Full Toolbox 3 diagnostic scan",
      "Battery degradation assessment",
      "Fault history review",
      "Written PDF report",
    ],
  },
];

const warrantyNotes = [
  { miles: "Under 50,000 miles", note: "Use your Tesla bumper-to-bumper warranty first. Ray will tell you this himself." },
  { miles: "Under 120,000 miles (HV battery issues)", note: "Tesla's HV battery warranty may apply. Check before booking." },
  { miles: "Outside warranty or not covered", note: "That's where we come in — same Toolbox 3 diagnosis at a fraction of dealer cost." },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Page hero */}
        <div className="bg-brand-surface border-b border-brand-border px-5 py-14">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">What we fix</span>
            <h1 className="font-display font-semibold text-brand-dark text-4xl sm:text-5xl tracking-wide mb-4">
              EV repair that comes to you
            </h1>
            <p className="font-body text-brand-muted text-lg leading-relaxed max-w-2xl mb-6">
              Diagnostics, battery service, and electrical repair for Tesla Model S, 3, X, and Y.
              We come to your home, office, or roadside — no tow truck needed.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Tesla Toolbox 3 certified", "Remote diagnostics", "Veteran-owned", "Strictly EV — no hybrids"].map((t) => (
                <span key={t} className="font-body text-xs font-semibold bg-white border border-brand-border text-brand-muted px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Service cards */}
        <section className="py-16 px-5 bg-white">
          <div className="max-w-5xl mx-auto">
            <span className="section-label">Core services</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-10">
              What we do
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map(({ id, name, badge, price, priceSuffix, credited, desc, includes }) => (
                <div
                  id={id}
                  key={id}
                  className={`rounded-card border flex flex-col p-5 scroll-mt-20 ${
                    badge ? "border-brand-green" : "border-brand-border"
                  }`}
                >
                  {badge && (
                    <span className="font-body text-[10px] font-semibold bg-brand-green text-white px-2.5 py-1 rounded-full mb-3 self-start">
                      {badge}
                    </span>
                  )}
                  <h3 className="font-display font-semibold text-brand-dark text-xl tracking-wide mb-2">
                    {name}
                  </h3>
                  <p className="font-body text-brand-muted text-sm leading-relaxed mb-4 flex-1">
                    {desc}
                  </p>
                  <ul className="flex flex-col gap-1.5 mb-4">
                    {includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 font-body text-xs text-brand-muted">
                        <span className="text-brand-green mt-0.5 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-brand-border flex items-center justify-between">
                    <div>
                      <span className="font-display font-semibold text-brand-green text-xl">{price}</span>
                      <span className="font-body text-brand-muted text-xs ml-1">{priceSuffix}</span>
                    </div>
                    {credited && (
                      <span className="font-body text-[10px] text-brand-blue bg-brand-blue-lt px-2 py-1 rounded-full">
                        Credited toward repair
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-5 bg-brand-surface border-t border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">The process</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-10">
              How it works
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { n: "1", title: "Call or text", body: "Describe your issue. Share fault codes if you have them. We confirm model and location — remote pre-check available.", tag: "Remote pre-check available" },
                { n: "2", title: "We come to you", body: "Fully equipped mobile van dispatched to your home, office, or roadside — same or next day in the primary zone.", tag: "Corona · OC · IE · LA · SD" },
                { n: "3", title: "Diagnose and fix", body: "Tesla Toolbox 3 on-site scan, written report, repair on the spot when parts are available. Everything quoted first.", tag: "Transparent pricing" },
              ].map(({ n, title, body, tag }) => (
                <div key={n} className="flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-full border-2 border-brand-green flex items-center justify-center font-display font-semibold text-brand-green text-xl">
                    {n}
                  </div>
                  <h3 className="font-display font-semibold text-brand-dark text-xl tracking-wide">{title}</h3>
                  <p className="font-body text-brand-muted text-sm leading-relaxed flex-1">{body}</p>
                  <span className="font-body text-xs font-semibold text-brand-blue">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warranty note */}
        <section className="py-16 px-5 bg-white border-t border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Before you book</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-3">
              Check your warranty first
            </h2>
            <p className="font-body text-brand-muted text-base mb-8 max-w-2xl">
              Ray will tell you this himself. If your car is under warranty and the issue is covered, use it.
              We only step in when it&apos;s not covered or expired.
            </p>
            <div className="flex flex-col gap-3 max-w-2xl">
              {warrantyNotes.map(({ miles, note }) => (
                <div key={miles} className="flex gap-4 bg-brand-surface rounded-lg border border-brand-border p-4">
                  <span className="text-brand-amber text-lg shrink-0 mt-0.5">◈</span>
                  <div>
                    <p className="font-body font-semibold text-brand-dark text-sm mb-1">{miles}</p>
                    <p className="font-body text-brand-muted text-sm leading-relaxed">{note}</p>
                  </div>
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
