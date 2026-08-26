import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import { CTABar } from "@/components/CTABlocks";
import { sanityFetch } from "@/lib/sanity";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/siteConfig";
import JsonLd, { servicesSchema } from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Mobile Tesla Diagnostics and Repair Services",
  description: "Compare prices for mobile Tesla diagnostics, inspections, low-voltage battery service, charging-system diagnosis, and selected repairs.",
  path: "/services",
});

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
  "EV Diagnostics": ["Relevant alerts and diagnostic data reviewed", "Current battery SOH estimate when supported", "Written findings and next steps", "Repair recommendation without an obligation to proceed"],
  "Remote Diagnostics": ["Owner-authorized Toolbox 3 review", "Initial scope and parts planning", "Written pre-visit summary", "Credited toward an eligible on-site repair"],
  "High Voltage Diagnostics": ["Charging and onboard-charger diagnosis", "Charge-port and latch inspection", "Available high-voltage battery data", "DC-to-DC system testing when indicated"],
  "Pre-Purchase Inspection": ["Available Toolbox and Service Mode information", "Visible safety and condition checks", "Available battery-health information", "Written purchase report"],
  "Basic Warranty Inspection": ["Inspection before 4 years or 50,000 miles", "Possible defects documented for Tesla to evaluate", "Maintenance and wear items separated", "Written findings"],
  "Battery & Drivetrain Warranty Inspection": ["Current SOH estimate when supported", "Full Battery Health Test when booked", "Drive-unit and powertrain review", "Written result identifying the method used"],
  "12V/16V LV Battery Replacement": ["Low-voltage system test and replacement", "Same-day service may be available", "Low-voltage wiring diagnosis", "Correct battery confirmed by vehicle"],
  "HVAC Tune-Up": ["Cooling-performance test", "Blower and cabin-airflow check", "Leak and refrigerant-charge diagnosis", "Certified top-off or recharge when indicated"],
};

// Section subtitles keyed by the tag used as the group name.
const groupSubtitles: Record<string, string> = {
  "Diagnostics": "Find the problem",
  "Inspections": "Know before a deadline",
  "Service & Repair": "Fix it and maintain it",
};

const warrantyNotes = [
  { miles: "Basic Vehicle Limited Warranty", note: "Tesla currently lists four years or 50,000 miles for new U.S. vehicles. Tesla decides whether a fault is covered under the warranty issued with the vehicle." },
  { miles: "Battery and drive-unit warranty", note: "Time, mileage, and capacity terms vary by model and configuration. Check the vehicle's warranty document before booking paid work." },
  { miles: "Independent service", note: "Independent service does not automatically void a U.S. warranty, but damage caused by an outside repair, part, or modification may be excluded. Warranty repairs are handled through Tesla." },
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
      <JsonLd data={servicesSchema(services)} />
      <Nav />
      <main>
        {/* Page hero */}
        <div className="bg-brand-surface border-b border-brand-border px-5 py-14">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Services and Starting Prices</span>
            <h1 className="font-display font-semibold text-brand-dark text-4xl sm:text-5xl tracking-wide mb-4">
              Mobile Tesla Diagnostics, Inspections, and Selected Repairs
            </h1>
            <p className="font-body text-brand-muted text-lg leading-relaxed max-w-2xl mb-6">
              Ray services Tesla Model S, Model 3, Model X, and Model Y at homes, offices,
              and safe roadside locations. Scope, price, and travel fees are confirmed before dispatch.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Qualified independent repairer", "Tesla Toolbox 3 access", "EPA Section 609 certified", "Veteran-owned"].map((t) => (
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
            <span className="section-label">Core Services</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-10">
              Services and Prices
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
            <span className="section-label">The Process</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-10">
              How an Appointment Works
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { n: "1", title: "Call, Text, or Send the Form", body: "Share the model, year, location, symptoms, and exact alert text. Ray confirms whether remote review or an on-site visit is the right first step.", tag: "Direct response from Ray" },
                { n: "2", title: "Approve the Scope", body: "You receive the appointment window, service price, and travel fee before dispatch. Parts are quoted before ordering.", tag: "Price confirmed first" },
                { n: "3", title: "Get Written Findings", body: "Ray performs the agreed service and documents the result. Additional work is quoted before you authorize it.", tag: "Clear next steps" },
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
            <span className="section-label">Before You Book</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-3">
              Check the Vehicle Warranty First
            </h2>
            <p className="font-body text-brand-muted text-base mb-8 max-w-2xl">
              Possible warranty items should be evaluated under the document issued with the vehicle. Ray will recommend checking Tesla coverage before independent paid work when appropriate.
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
