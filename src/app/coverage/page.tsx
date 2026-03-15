import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import { CTABar } from "@/components/CTABlocks";
import CoverageMap from "@/components/CoverageMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coverage Area — Ray's EV Service",
  description: "Mobile Tesla repair serving Corona, Riverside, Anaheim, Santa Ana, Orange County, Los Angeles, Temecula, and San Diego.",
};

const zones = [
  {
    id: "primary",
    dot: "bg-brand-green",
    name: "91 Corridor & Inland Empire",
    fee: "No travel fee",
    feeStyle: "bg-brand-green-lt text-brand-green",
    highway: "Via 91 Freeway from Corona",
    cities: ["Corona ★ home base","Riverside","Anaheim","Santa Ana","Garden Grove","Orange","Fullerton","Irvine","Huntington Beach","Ontario","Rancho Cucamonga"],
    note: "Home base is Corona. The 91 west makes Anaheim and OC quick and predictable.",
    active: true,
  },
  {
    id: "secondary",
    dot: "bg-brand-blue",
    name: "Temecula / LA / wider area",
    fee: "Small travel fee",
    feeStyle: "bg-brand-blue-lt text-brand-blue",
    highway: "I-15 south · I-10 west",
    cities: ["Temecula","Murrieta","Los Angeles","Long Beach","Pasadena","Torrance","Compton","Pomona","Moreno Valley","Hemet","Lake Elsinore"],
    note: "Temecula is south on I-15 — adds meaningful drive time in traffic. Fee confirmed at booking.",
    active: false,
  },
  {
    id: "extended",
    dot: "bg-brand-amber",
    name: "San Diego metro",
    fee: "Call first",
    feeStyle: "bg-amber-50 text-amber-800",
    highway: "I-15 south",
    cities: ["San Diego","Chula Vista","Oceanside","Carlsbad","Escondido","Encinitas","El Cajon","Vista","Santee","Poway","National City"],
    note: "Available depending on scheduling. Ray will give a straight answer on timing and fee.",
    active: false,
  },
];

const faq = [
  { q: "Why is Anaheim no fee but Temecula has a travel fee?", a: "Zones are based on drive time from Corona, not straight-line distance. From Corona, Anaheim is a direct shot west on the 91 — predictable and quick. Temecula is south on the I-15, which adds real time depending on traffic." },
  { q: "My car can't be driven — can you still come?", a: "Yes. Call directly rather than submitting a form — Ray can triage faster over the phone. For completely dead cars (12V failure, won't unlock), he carries replacement units in the van." },
  { q: "How far in advance do I need to book?", a: "Same-day is often available in the primary zone. Secondary zone is usually next day. San Diego depends on the week. For anything affecting your ability to drive, call immediately — Ray will prioritize." },
  { q: "Can you come to my workplace or apartment?", a: "Yes — home, office, or any parking area with safe working space alongside the vehicle. Underground garages can depend on clearance; mention it when you book." },
  { q: "What if I'm just outside the service area?", a: "Call anyway. The zone lines aren't rigid — if the job is right and the route works, Ray will find a way." },
];

export default function CoveragePage() {
  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <div className="bg-brand-surface border-b border-brand-border px-5 py-14">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Service area</span>
            <h1 className="font-display font-semibold text-brand-dark text-4xl sm:text-5xl tracking-wide mb-4">
              Based in Corona —<br className="hidden sm:block" /> serving the 91 corridor and beyond
            </h1>
            <p className="font-body text-brand-muted text-lg leading-relaxed max-w-xl mb-8">
              Zones are based on drive time, not distance on a map. Not sure if you&apos;re in range?
              Call or text — Ray will confirm before you fill anything out.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <input type="text" placeholder="Enter your zip code"
                className="font-body border border-brand-border rounded-lg px-4 py-2.5 text-sm text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-green w-44" />
              <button className="font-body font-semibold text-sm bg-brand-green text-white px-5 py-2.5 rounded-lg hover:bg-brand-green-dk transition-colors">
                Check coverage
              </button>
              <span className="font-body text-brand-muted text-sm">or</span>
              <a href="tel:+19516226222" className="font-body font-semibold text-brand-green text-sm hover:underline">
                (951) 622-6222
              </a>
            </div>
          </div>
        </div>

        {/* 91 insight */}
        <div className="bg-brand-blue-lt border-b border-brand-blue border-opacity-30 px-5 py-4">
          <div className="max-w-4xl mx-auto flex items-start gap-3">
            <span className="text-brand-blue text-lg shrink-0">→</span>
            <p className="font-body text-brand-blue text-sm leading-relaxed">
              Zones follow real drive times. Anaheim and Santa Ana are quick on the 91 from Corona — no travel fee.
              Temecula is farther south on the 15 — small fee applies.
            </p>
          </div>
        </div>

        {/* Map + zone panel */}
        <div className="grid lg:grid-cols-[1fr_300px] border-b border-brand-border">

          {/* Map */}
          <div className="flex flex-col border-r border-brand-border">
            <CoverageMap />
            <div className="bg-white border-t border-brand-border px-5 py-3 flex flex-wrap gap-4">
              {[
                { dot: "bg-brand-green", label: "Primary — 91 corridor (no fee)" },
                { dot: "bg-brand-blue",  label: "Secondary — Temecula / LA (small fee)" },
                { dot: "bg-brand-amber", label: "San Diego (call first)" },
              ].map(({ dot, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${dot} shrink-0`} />
                  <span className="font-body text-xs text-brand-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Zone panel */}
          <div className="flex flex-col">
            <div className="px-5 py-4 border-b border-brand-border bg-white">
              <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide">Coverage zones</h3>
              <p className="font-body text-xs text-brand-muted mt-1">Based on drive time from Corona</p>
            </div>
            {zones.map(({ id, dot, name, fee, feeStyle, highway, cities, note, active }) => (
              <div key={id} className={`p-5 border-b border-brand-border ${active ? "bg-brand-green-lt" : "bg-white"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full ${dot} shrink-0`} />
                  <span className="font-display font-semibold text-brand-dark text-sm tracking-wide">{name}</span>
                  <span className={`font-body text-[10px] font-semibold px-2 py-0.5 rounded-full ml-auto ${feeStyle}`}>{fee}</span>
                </div>
                <p className="font-body text-[10px] font-semibold text-brand-muted mb-2">{highway}</p>
                <p className="font-body text-xs text-brand-muted leading-relaxed mb-2">
                  {cities.slice(0, 5).join(" · ")}{cities.length > 5 ? ` · +${cities.length - 5} more` : ""}
                </p>
                <p className="font-body text-xs text-brand-muted italic leading-relaxed">{note}</p>
              </div>
            ))}
            <div className="p-5 bg-brand-surface mt-auto">
              <p className="font-body text-xs text-brand-muted mb-3 leading-relaxed">
                Not seeing your city? Text your zip to (951) 622-6222.
              </p>
              <a href="tel:+19516226222"
                className="font-body font-semibold text-sm text-white bg-brand-green px-4 py-2.5 rounded-lg block text-center hover:bg-brand-green-dk transition-colors">
                Call (951) 622-6222
              </a>
            </div>
          </div>
        </div>

        {/* Full city list */}
        <section className="py-16 px-5 bg-white border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Full city list</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-3">Cities we serve</h2>
            <p className="font-body text-brand-muted text-base mb-8 max-w-xl leading-relaxed">
              The 91 corridor makes Anaheim and OC closer in drive time than many IE cities.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {zones.map(({ id, dot, name, fee, feeStyle, cities }) => (
                <div key={id} className="bg-brand-surface rounded-card border border-brand-border p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-3 h-3 rounded-full ${dot} shrink-0`} />
                    <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide">{name}</h3>
                  </div>
                  <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full inline-block mb-3 ${feeStyle}`}>{fee}</span>
                  <ul className="flex flex-col">
                    {cities.map((city) => (
                      <li key={city} className={`font-body text-sm py-1.5 border-b border-brand-border last:border-0 ${city.includes("★") ? "text-brand-green font-semibold" : "text-brand-muted"}`}>
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Travel fees */}
        <section className="py-16 px-5 bg-brand-surface border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Travel fees</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-3">Honest about the costs</h2>
            <p className="font-body text-brand-muted text-base mb-8 max-w-xl">Always confirmed before dispatch. Never added after the fact.</p>
            <div className="grid sm:grid-cols-3 gap-5 mb-6">
              {[
                { v: "$0", name: "91 Corridor & IE", desc: "Corona, Riverside, Anaheim, Santa Ana, OC along the 91.", dot: "bg-brand-green" },
                { v: "TBD", name: "Temecula / LA / wider", desc: "Small flat fee confirmed at booking based on exact location.", dot: "bg-brand-blue" },
                { v: "Call first", name: "San Diego metro", desc: "Available depending on scheduling. Ray will give a straight answer.", dot: "bg-brand-amber" },
              ].map(({ v, name, desc, dot }) => (
                <div key={name} className="bg-white rounded-card border border-brand-border p-5 text-center">
                  <span className={`w-4 h-4 rounded-full ${dot} block mx-auto mb-3`} />
                  <p className="font-display font-semibold text-brand-dark text-2xl tracking-wide mb-1">{v}</p>
                  <p className="font-body font-semibold text-brand-dark text-sm mb-2">{name}</p>
                  <p className="font-body text-brand-muted text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-white border border-brand-border rounded-card p-4 font-body text-sm text-brand-muted leading-relaxed">
              Travel fee is disclosed before dispatch and never added after the fact. If it wasn&apos;t on the quote, it&apos;s not on the invoice.
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-5 bg-white border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Common questions</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-8">Coverage FAQ</h2>
            <div className="border border-brand-border rounded-card overflow-hidden">
              {faq.map(({ q, a }, i) => (
                <div key={q} className={`bg-white p-5 ${i < faq.length - 1 ? "border-b border-brand-border" : ""}`}>
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
