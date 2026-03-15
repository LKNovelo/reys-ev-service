import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import { CTABar } from "@/components/CTABlocks";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New EV Owners Guide — Ray's EV Service",
  description: "A plain-language guide for new Tesla owners. Charging, maintenance, what changes from gas, and what to watch for in your first 90 days.",
};

export default function EvGuidePage() {
  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <div className="bg-brand-green-lt border-b border-brand-border px-5 py-14">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-body text-xs font-semibold bg-brand-green text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
                ⚡ New to EV
              </span>
              <span className="font-body text-xs text-brand-muted">Free guide — no signup required</span>
            </div>
            <h1 className="font-display font-semibold text-brand-dark text-4xl sm:text-5xl tracking-wide mb-4">
              Switching from gas to electric?<br className="hidden lg:block" /> Here&apos;s what actually changes.
            </h1>
            <p className="font-body text-brand-muted text-lg leading-relaxed max-w-2xl mb-6">
              A plain-language guide for new Tesla owners. Written from the field by a Boeing-trained EV specialist
              who has seen what trips people up in the first 90 days.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Tesla S/3/X/Y", "No jargon", "Field-tested advice"].map(t => (
                <span key={t} className="font-body text-xs font-semibold bg-white border border-brand-border text-brand-muted px-3 py-1.5 rounded-full">{t}</span>
              ))}
            </div>
            {/* Scroll pills / jump links */}
            <div className="flex flex-wrap gap-2">
              {[
                { href: "#what-changes", label: "What changes" },
                { href: "#charging",     label: "Home charging" },
                { href: "#maintenance",  label: "Maintenance"   },
                { href: "#tesla-quirks", label: "Tesla quirks"  },
                { href: "#when-to-call", label: "When to call"  },
                { href: "#faq",          label: "FAQ"           },
              ].map(({ href, label }) => (
                <a key={href} href={href} className="font-body text-xs bg-white border border-brand-border text-brand-muted px-3.5 py-2 rounded-full hover:border-brand-green hover:text-brand-green transition-colors">
                  {label} →
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Section 1 — What changes */}
        <section id="what-changes" className="py-16 px-5 bg-white border-b border-brand-border scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">What changes</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-8">
              Gas vs. electric — the real differences
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Habits to drop */}
              <div className="rounded-card border border-brand-border overflow-hidden">
                <div className="bg-brand-surface px-5 py-3 border-b border-brand-border flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-sm">✕</div>
                  <div>
                    <p className="font-display font-semibold text-brand-dark text-base tracking-wide">Gas car habits to drop</p>
                    <p className="font-body text-xs text-brand-muted">Things that no longer apply</p>
                  </div>
                </div>
                {[
                  ["Weekly gas station stops", "You'll charge at home overnight — like a phone"],
                  ["Oil changes every 3,000 miles", "No engine oil in an EV. Not a thing."],
                  ["Warming up the engine", "EVs are ready instantly, hot or cold"],
                  ["Spark plugs, timing belts", "None of these exist on a Tesla"],
                  ["Frequent brake pad replacement", "Regen braking does most of the work"],
                ].map(([title, sub]) => (
                  <div key={title} className="flex items-start gap-3 px-5 py-3 border-b border-brand-border last:border-0">
                    <span className="text-brand-muted mt-0.5 shrink-0">—</span>
                    <div>
                      <p className="font-body font-semibold text-brand-dark text-sm">{title}</p>
                      <p className="font-body text-brand-muted text-xs">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Habits to build */}
              <div className="rounded-card border border-brand-green overflow-hidden">
                <div className="bg-brand-green-lt px-5 py-3 border-b border-brand-green border-opacity-40 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-brand-green-lt border border-brand-green flex items-center justify-center text-sm">✓</div>
                  <div>
                    <p className="font-display font-semibold text-brand-dark text-base tracking-wide">New habits to build</p>
                    <p className="font-body text-xs text-brand-muted">What EV ownership looks like day-to-day</p>
                  </div>
                </div>
                {[
                  ["Plug in at home every night", "Wake up with a full charge, every day"],
                  ["Plan Supercharger stops on long trips", "Tesla navigation does this automatically"],
                  ["Watch for over-the-air updates", "New features arrive while your car sleeps"],
                  ["Check tire pressure more often", "EV weight stresses tires differently"],
                  ["Learn one-pedal driving", "Takes a week to feel natural, then you'll love it"],
                ].map(([title, sub]) => (
                  <div key={title} className="flex items-start gap-3 px-5 py-3 border-b border-brand-border last:border-0">
                    <span className="text-brand-green mt-0.5 shrink-0">✓</span>
                    <div>
                      <p className="font-body font-semibold text-brand-dark text-sm">{title}</p>
                      <p className="font-body text-brand-muted text-xs">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — Charging */}
        <section id="charging" className="py-16 px-5 bg-brand-surface border-b border-brand-border scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Range & charging</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-4">
              Range anxiety is real — here&apos;s how to get past it
            </h2>
            <p className="font-body text-brand-muted text-base leading-relaxed max-w-2xl mb-8">
              Most new EV owners worry about range far more than they need to. Most people drive under 50 miles a day.
              Even entry-level Teslas carry 270+ miles of range.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 items-start">
              {/* Charging table */}
              <div className="bg-white rounded-card border border-brand-border overflow-hidden">
                <div className="px-5 py-3 border-b border-brand-border">
                  <p className="font-display font-semibold text-brand-dark text-base tracking-wide">Charging options — speed comparison</p>
                </div>
                {[
                  { level: "Level 1 — standard outlet", sub: "Any 120V household plug", stat: "3–5 mi/hr", note: "Slow — emergency only", bg: "bg-gray-50" },
                  { level: "Level 2 — home charger", sub: "240V NEMA 14-50 or Wall Connector", stat: "20–30 mi/hr", note: "Recommended for home", bg: "bg-brand-blue-lt" },
                  { level: "Supercharger — Tesla DC fast", sub: "Public Tesla network", stat: "Up to 200 mi", note: "In ~15–20 min (V3)", bg: "bg-brand-green-lt" },
                ].map(({ level, sub, stat, note, bg }) => (
                  <div key={level} className={`flex items-center gap-3 px-5 py-4 border-b border-brand-border last:border-0 ${bg}`}>
                    <div className="flex-1">
                      <p className="font-body font-semibold text-brand-dark text-sm">{level}</p>
                      <p className="font-body text-brand-muted text-xs">{sub}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-display font-semibold text-brand-dark text-sm">{stat}</p>
                      <p className="font-body text-brand-muted text-xs">{note}</p>
                    </div>
                  </div>
                ))}
                <p className="font-body text-xs text-brand-muted px-5 py-3 leading-relaxed">
                  Most owners do 95% of charging at home on Level 2. Superchargers are for road trips, not daily use.
                </p>
              </div>

              {/* Advice col */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-display font-semibold text-brand-dark text-xl tracking-wide mb-3">The honest rule: charge at home, plan for trips</h3>
                  <p className="font-body text-brand-muted text-sm leading-relaxed mb-3">
                    Set your daily charge limit to 80%. Tesla recommends this to preserve long-term battery health.
                    Only charge to 100% the night before a long trip.
                  </p>
                  <p className="font-body text-brand-muted text-sm leading-relaxed">
                    For home charging, a NEMA 14-50 outlet or a dedicated Tesla Wall Connector is the right setup.
                    A licensed electrician installs it — usually $300–600 depending on panel distance.
                  </p>
                </div>
                <div className="bg-brand-green-lt border border-brand-green border-opacity-40 rounded-card p-4">
                  <p className="font-body text-[10px] font-semibold text-brand-green uppercase tracking-wider mb-2">Ray&apos;s field note</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "#1a3a0a" }}>
                    The most common first-year mistake: owners charge to 100% every night thinking it helps. It doesn&apos;t —
                    it stresses the cells. Keep the daily limit at 80% and your battery will thank you in year five.
                    Exception: LFP battery packs (some Model 3s) should charge to 100% regularly. Check your battery chemistry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Maintenance */}
        <section id="maintenance" className="py-16 px-5 bg-white border-b border-brand-border scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Maintenance</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-4">
              What still needs service — and what never will
            </h2>
            <p className="font-body text-brand-muted text-base mb-8 max-w-2xl leading-relaxed">
              EVs have far fewer moving parts. But some maintenance still applies,
              and a few Tesla-specific items catch new owners off guard.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  label: "Never needed", labelStyle: "bg-brand-green-lt text-brand-green",
                  items: ["Oil changes","Spark plugs","Timing belt","Transmission fluid","Exhaust system","Fuel injectors","Catalytic converter"],
                },
                {
                  label: "Still needed — less often", labelStyle: "bg-amber-50 text-amber-800",
                  items: ["Tire rotation — every 6,250 mi","Brake fluid check — every 5 yrs","Cabin air filter — every 2 yrs","HEPA filter (if equipped) — 3 yrs","AC desiccant bag — every 5 yrs","Wiper blades — as needed"],
                },
                {
                  label: "Watch carefully — Tesla-specific", labelStyle: "bg-red-50 text-red-700",
                  items: ["12V battery — fails silently at 3–5 yrs","Tire wear — EVs are heavy, wears faster","Brake calipers — can seize from underuse","Charging port latch — known failure point","Coolant (Model S/X) — check every 4 yrs"],
                },
              ].map(({ label, labelStyle, items }) => (
                <div key={label} className="bg-brand-surface rounded-card border border-brand-border p-5">
                  <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full inline-block mb-4 ${labelStyle}`}>{label}</span>
                  <ul className="flex flex-col gap-2">
                    {items.map(item => (
                      <li key={item} className="font-body text-sm text-brand-muted flex items-start gap-2">
                        <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-brand-muted inline-block" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 — Tesla Quirks */}
        <section id="tesla-quirks" className="py-16 px-5 bg-brand-surface border-b border-brand-border scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Tesla specifics</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-8">
              Things unique to Tesla ownership
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { n: "01", title: "Over-the-air software updates", body: "Tesla pushes updates while your car sleeps. These can change behavior, add features, or fix bugs. Always read the release notes — occasionally an update affects charging speed or regen braking feel." },
                { n: "02", title: "The 12V battery is not your main battery", body: "Teslas have a small 12V battery alongside the main high-voltage pack. When the 12V dies, the car goes completely dead — won't unlock, won't start. It fails silently and often. Most owners don't know it exists." },
                { n: "03", title: "Autopilot is not self-driving", body: "Autopilot and FSD require a fully attentive driver at all times. The car will prompt you to touch the wheel. Treat it as adaptive cruise control — useful but not autonomous." },
                { n: "04", title: "No key — and that's fine until it's not", body: "Your phone is your key. Keep a key card in your wallet as backup. If your phone battery dies and you don't have the card, you're locked out. It's rare but it happens." },
                { n: "05", title: "Sentry mode and vampire drain", body: "Sentry mode camera surveillance draws power. Can drain 10–15 miles of range per day. Disable it when parked at home or in a trusted garage." },
                { n: "06", title: "Service centers vs. mobile service", body: "Tesla's service centers are often booked weeks out. Many repairs and all diagnostics can be done mobile — without towing, without waiting. That's where we come in." },
              ].map(({ n, title, body }) => (
                <div key={n} className="bg-white rounded-card border border-brand-border p-5 flex gap-4">
                  <span className="font-display font-semibold text-brand-green text-2xl shrink-0 leading-none mt-0.5">{n}</span>
                  <div>
                    <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide mb-2">{title}</h3>
                    <p className="font-body text-brand-muted text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 — When to Call */}
        <section id="when-to-call" className="py-16 px-5 bg-white border-b border-brand-border scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">When to call a pro</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-4">
              Don&apos;t troubleshoot these alone
            </h2>
            <p className="font-body text-brand-muted text-base mb-8 max-w-2xl">Some things are fine to handle yourself. Others warrant a call first.</p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-display font-semibold text-brand-muted text-lg tracking-wide mb-4">Handle yourself</h3>
                <div className="flex flex-col gap-3">
                  {[
                    ["Cabin air filter swap", "5-minute job, watch a quick video"],
                    ["Wiper blade replacement", "Standard — any auto shop carries them"],
                    ["Tire inflation check", "More often than a gas car — EV weight matters"],
                    ["Soft reboot", "Hold brake + both scroll wheels. Fixes most screen freezes."],
                    ["Adjusting charge limit", "Do it in the app — no repair needed"],
                  ].map(([title, sub]) => (
                    <div key={title} className="flex items-start gap-3 bg-brand-surface rounded-lg border border-brand-border p-3">
                      <span className="text-brand-green mt-0.5 shrink-0">✓</span>
                      <div>
                        <p className="font-body font-semibold text-brand-dark text-sm">{title}</p>
                        <p className="font-body text-brand-muted text-xs">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display font-semibold text-red-700 text-lg tracking-wide mb-4">Call a pro first</h3>
                <div className="flex flex-col gap-3">
                  {[
                    ["Car won't turn on or unlock", "Likely 12V — don't jump it like a gas car"],
                    ["Won't charge or stops early", "Could be charger, port, or onboard charger fault"],
                    ["Sudden range loss (20%+ overnight)", "Could be cell degradation or BMS issue"],
                    ["Any red warning on the screen", "Red = stop driving. Pull over, call us."],
                    ["Clicking or grinding when braking", "Caliper may be seized — common in SoCal heat"],
                  ].map(([title, sub]) => (
                    <div key={title} className="flex items-start gap-3 bg-red-50 rounded-lg border border-red-200 p-3">
                      <span className="text-red-500 mt-0.5 shrink-0">⚠</span>
                      <div>
                        <p className="font-body font-semibold text-brand-dark text-sm">{title}</p>
                        <p className="font-body text-brand-muted text-xs">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 px-5 bg-brand-surface border-b border-brand-border scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Common questions</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-8">
              FAQ from new Tesla owners
            </h2>
            <div className="border border-brand-border rounded-card overflow-hidden">
              {[
                { q: "Will a software update break something on my car?", a: "Rarely, but it happens. Tesla updates occasionally change charging behavior or adjust regen braking. If something feels different after an update, that's likely why. We can run a Toolbox scan to confirm everything is nominal post-update." },
                { q: "My range says 280 miles but I only get 230. Is something wrong?", a: "Probably not. Tesla's rated range is EPA-tested under ideal conditions. Real-world range varies with temperature, speed, AC/heat use, and elevation. A 15–20% gap is normal. A gap larger than 25% is worth investigating." },
                { q: "Can I take my Tesla to any mechanic?", a: "For basic things like tires and windshields, yes. For anything electrical or battery-related, no — most shops lack the tools to read Tesla's proprietary systems. We use the same Toolbox 3 software Tesla service centers use." },
                { q: "Does mobile service void my warranty?", a: "No. The Magnuson-Moss Warranty Act prohibits manufacturers from voiding a warranty simply because you used a third-party service provider. We document all work and provide written reports for your records." },
                { q: "How do I know if my battery is degrading?", a: "The clearest signal is maximum range at 100% charge compared to when the car was new. A full battery diagnostic with Toolbox 3 shows individual cell health across the pack. We recommend a battery health check every 2 years or if you notice range trending down." },
              ].map(({ q, a }, i, arr) => (
                <div key={q} className={`bg-white p-5 ${i < arr.length - 1 ? "border-b border-brand-border" : ""}`}>
                  <p className="font-body font-semibold text-brand-dark text-sm mb-2">{q}</p>
                  <p className="font-body text-brand-muted text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related from blog */}
        <section className="py-16 px-5 bg-white border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">From the field</span>
            <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mb-6">Recent from the blog</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { slug: "12v-battery-blind-spot", cat: "Battery", title: "The 12V battery — the most dangerous blind spot in Tesla ownership", date: "Mar 2025" },
                { slug: "nmc-vs-lfp-battery",     cat: "EV 101",  title: "NMC vs LFP battery chemistry — which one is in your Tesla",       date: "Jan 2025" },
                { slug: "regen-braking-explained", cat: "EV 101",  title: "Regen braking explained — why your brake pads last 120k miles",   date: "Nov 2024" },
              ].map(({ slug, cat, title, date }) => (
                <Link key={slug} href={`/blog/${slug}`} className="group rounded-card border border-brand-border overflow-hidden hover:border-brand-green transition-colors">
                  <div className="bg-brand-surface h-20 flex items-center justify-center border-b border-brand-border">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div className="p-4">
                    <span className="font-body text-[10px] font-semibold text-brand-blue uppercase tracking-wider block mb-2">{cat}</span>
                    <h3 className="font-display font-semibold text-brand-dark text-sm tracking-wide leading-snug mb-2 group-hover:text-brand-green transition-colors">{title}</h3>
                    <span className="font-body text-xs text-brand-muted">{date}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/blog" className="font-body text-sm text-brand-muted border border-brand-border px-6 py-2.5 rounded-lg hover:border-brand-green hover:text-brand-green transition-colors inline-block">
                View all posts →
              </Link>
            </div>
          </div>
        </section>

        <CTABar />
      </main>
      <Footer />
    </>
  );
}
