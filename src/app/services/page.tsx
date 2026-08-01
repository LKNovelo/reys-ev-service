import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import { CTABar } from "@/components/CTABlocks";
import { sanityFetch } from "@/lib/sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Pricing — Ray's EV Service",
  description: "Mobile Tesla diagnostics, warranty inspections, battery service, and electrical repair. Serving LA to San Diego, from Corona, CA.",
};

interface Service {
  _id: string;
  title: string;
  shortDesc: string;
  price: number;
  priceSuffix: string;
  featured: boolean;
  tag?: string;
  footerNote?: string;
  slug: { current: string };
}

const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id, title, shortDesc, price, priceSuffix, featured, tag, footerNote, slug
}`;

// Bullet lists keyed by the CURRENT service titles.
const includes: Record<string, string[]> = {
  "EV Diagnostics": ["All fault codes read and explained","Battery state-of-health estimate","Written findings document","Repair recommendation (no obligation)"],
  "Remote Diagnostics": ["Remote Toolbox 3 fault code review","Scope and parts confirmation","Written pre-visit summary","Credited toward on-site repair"],
  "High Voltage Diagnostics": ["Onboard charger fault diagnosis","Charge port inspection & latch check","HV battery pack health check","12V charging (DC-DC) circuit test"],
  "Pre-Purchase Inspection": ["Full Toolbox 3 diagnostic scan","Battery degradation assessment","Fault history review","Written PDF report"],
  "Basic Warranty Inspection": ["Full inspection before 4 yr / 50k mi","Flags defects Tesla should fix free","Honest list of wear items (tires, brakes, alignment)","Written report you can act on"],
  "Battery & Drivetrain Warranty Inspection": ["Battery capacity & state-of-health report","Full 24-hour calibration","Drive unit / powertrain scan","Catch claims before the 8-yr window closes"],
  "12V/16V LV Battery Replacement": ["12V/16V battery test and replacement","Same-day pickup and install","Low-voltage wiring diagnosis","Model 3/Y/S/X units sourced"],
  "HVAC Tune-Up": ["Full HVAC system tune-up","Refrigerant top-up","Cooling performance testing","Blower & cabin airflow check"],
};

// Section subtitles keyed by the tag used as the group name.
const groupSubtitles: Record<string, string> = {
  "Diagnostics": "Find the problem",
  "Inspections": "Know before a deadline",
  "Service & Repair": "Fix it and maintain it",
};

const warrantyNotes = [
  { miles: "Under 4 years / 50,000 miles", note: "Your Tesla bumper-to-bumper warranty likely covers it. Use it first — Ray will tell you this himself." },
  { miles: "Under 8 years (battery & drive unit)", note: "Mileage cap is 100k, 120k, or 150k depending on your model, and coverage runs to 70% capacity. Check before booking." },
  { miles: "Outside warranty or not covered", note: "That's where we come in — same Toolbox 3 diagnosis at a fraction of dealer cost." },
];

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>(SERVICES_QUERY);

  // Group services by their tag, preserving order.
  const groups: { tag: string; items: Service[] }[] = [];
  for (const s of services) {
    const key = s.tag ?? "Services";
    let group = groups.find((g) => g.tag === key);
    if (!group) {
      group = { tag: key, items: [] };
      groups.push(group);
    }
    group.items.push(s);
  }

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

            {groups.map(({ tag, items }) => (
              <div key={tag} className="mb-12 last:mb-0">
                <div className="flex items-baseline gap-3 mb-5">
                  <h3 className="font-display font-semibold text-brand-dark text-lg tracking-wide uppercase">
                    {tag}
                  </h3>
                  {groupSubtitles[tag] && (
                    <span className="font-body text-brand-muted text-sm">{groupSubtitles[tag]}</span>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map(({ _id, title, shortDesc, price, priceSuffix, featured, footerNote, slug }) => (
                    <div
                      id={slug?.current}
                      key={_id}
                      className={`rounded-card border flex flex-col p-5 scroll-mt-20 ${
                        featured ? "border-brand-green" : "border-brand-border"
                      }`}
                    >
                      {featured && (
                        <span className="font-body text-[10px] font-semibold bg-brand-green text-white px-2.5 py-1 rounded-full mb-3 self-start">
                          Most requested
                        </span>
                      )}
                      <h4 className="font-display font-semibold text-brand-dark text-xl tracking-wide mb-2">
                        {title}
                      </h4>
                      <p className="font-body text-brand-muted text-sm leading-relaxed mb-4 flex-1">
                        {shortDesc}
                      </p>
                      <ul className="flex flex-col gap-1.5 mb-4">
                        {(includes[title] ?? []).map((item) => (
                          <li key={item} className="flex items-start gap-2 font-body text-xs text-brand-muted">
                            <span className="text-brand-green mt-0.5 shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-3 border-t border-brand-border flex items-center justify-between">
                        <div>
                          <span className="font-display font-semibold text-brand-green text-xl">${price}</span>
                          <span className="font-body text-brand-muted text-xs ml-1">{priceSuffix}</span>
                        </div>
                        {footerNote && (
                          <span className="font-body text-[10px] text-brand-blue bg-brand-blue-lt px-2 py-1 rounded-full">
                            {footerNote}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
