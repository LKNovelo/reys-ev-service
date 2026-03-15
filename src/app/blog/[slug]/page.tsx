import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import Link   from "next/link";
import type { Metadata } from "next";

// This will eventually fetch from Sanity using the slug param.
// For now it renders a static demo post so the template is fully built.

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "The 12V Battery Blind Spot — Ray's EV Service",
    description:
      "The 12V auxiliary battery in your Tesla can fail silently — no warning light, no gradual decline. Here's what to watch for.",
  };
}

const relatedPosts = [
  { slug: "tesla-warranty-covers-more",  cat: "Battery",       title: "Your Tesla warranty covers more than you think"              },
  { slug: "40-teslas-what-keeps-failing", cat: "Service finding", title: "We diagnosed 40 Teslas last month — here's what keeps failing" },
  { slug: "regen-braking-explained",      cat: "EV 101",         title: "Regen braking explained — why your brake pads last 120k miles" },
];

const references = [
  {
    group: "Tesla official",
    items: [
      { title: "Tesla Model 3 Owner's Manual — 12V Battery section", source: "tesla.com", desc: "Tesla's own guidance on 12V battery care, jump-starting procedure, and replacement intervals.", url: "https://www.tesla.com/ownersmanual/model3/en_us/" },
      { title: "Tesla Service Manual — Low Voltage Battery System", source: "tesla.com/teslaaccount", desc: "Full service manual section on 12V diagnostics. Free with any Tesla account login.", url: "https://www.tesla.com/teslaaccount" },
    ],
  },
  {
    group: "Parts & ordering",
    items: [
      { title: "Tesla Shop — 12V replacement units", source: "shop.tesla.com", desc: "Tesla's own parts shop for Model 3/Y lithium 12V and Model S/X lead-acid units.", url: "https://shop.tesla.com" },
    ],
  },
  {
    group: "Further reading",
    items: [
      { title: "NHTSA complaint database — Tesla 12V failures", source: "nhtsa.gov", desc: "Public complaint database. Searching Tesla + 12V shows the scale of this issue across model years.", url: "https://www.nhtsa.gov/vehicle/2022/TESLA/MODEL%203/4DR/AWD#complaints" },
      { title: "Tesla Motors Club — 12V battery failure discussion", source: "teslamotorsclub.com", desc: "Long-running thread with owner reports, failure timelines, and notes by model year.", url: "https://teslamotorsclub.com" },
    ],
  },
];

const toc = [
  "What the 12V battery does",
  "Why it fails without warning",
  "Fault codes to watch",
  "Model-specific notes",
  "What to do right now",
];

export default function BlogPostPage() {
  return (
    <>
      <Nav />
      <main>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-brand-border px-5 py-3 flex items-center gap-2 text-xs font-body text-brand-muted">
          <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
          <span className="text-brand-border">›</span>
          <Link href="/blog" className="hover:text-brand-green transition-colors">Blog</Link>
          <span className="text-brand-border">›</span>
          <span className="text-brand-dark">The 12V battery blind spot</span>
        </div>

        {/* Reading progress indicator */}
        <div className="h-0.5 bg-brand-border sticky top-14 z-30">
          <div className="h-0.5 bg-brand-green w-1/3 transition-all" id="reading-progress" />
        </div>

        {/* Post header */}
        <div className="bg-white px-5 py-12 border-b border-brand-border">
          <div className="max-w-2xl">
            <span className="font-body text-[10px] font-semibold text-brand-blue uppercase tracking-wider block mb-3">
              Battery
            </span>
            <h1 className="font-display font-semibold text-brand-dark text-3xl sm:text-4xl tracking-wide leading-tight mb-4">
              The 12V battery is the most dangerous blind spot in Tesla ownership — and most owners don&apos;t know it exists
            </h1>
            <p className="font-body text-brand-muted text-lg leading-relaxed mb-6">
              It&apos;s not the big battery. It&apos;s the small one. The 12V auxiliary battery can fail
              silently — no warning light, no gradual decline. One morning your car won&apos;t unlock,
              won&apos;t respond to the app, won&apos;t do anything.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-green-lt border-2 border-brand-green flex items-center justify-center font-display font-semibold text-brand-green text-sm shrink-0">
                RN
              </div>
              <div>
                <p className="font-body font-semibold text-brand-dark text-sm">Ray Novelo</p>
                <p className="font-body text-brand-muted text-xs">March 12, 2025 · 6 min read · Updated March 14, 2025</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Battery", "12V", "Model 3", "Model Y", "Maintenance"].map(tag => (
                <span key={tag} className="font-body text-xs border border-brand-border text-brand-muted px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hero image placeholder */}
        <div className="bg-brand-surface border-b border-brand-border h-64 flex flex-col items-center justify-center gap-2">
          <span className="text-4xl">📷</span>
          <p className="font-body text-brand-muted text-sm">Cover photo — uploaded via Sanity CMS</p>
          <p className="font-body text-xs text-brand-border">Recommended: 1200×630px</p>
        </div>

        {/* Article + sidebar */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_240px] gap-0 border-b border-brand-border">

          {/* Article body */}
          <article className="px-5 py-12 lg:px-10 lg:border-r lg:border-brand-border">

            {/* Prose */}
            <div className="font-body text-brand-dark leading-relaxed max-w-2xl">

              <p className="text-base mb-5">
                Every Tesla has two batteries. The one everyone talks about — the big high-voltage pack
                under the floor — and a small 12V auxiliary battery tucked away that most owners don&apos;t
                know exists. The HV battery gets all the attention. The 12V is the one that will leave you stranded.
              </p>

              <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mt-8 mb-4 pt-6 border-t border-brand-border" id="section-1">
                What the 12V battery actually does
              </h2>
              <p className="text-base mb-5">
                The 12V battery powers everything in the car that isn&apos;t the drivetrain — the locks,
                the touchscreen, the sensors that let the car wake up and communicate with the Tesla app.
                When it dies, none of those systems work. The HV pack could be at 100% charge and your
                car will still be completely dead.
              </p>

              {/* Field note callout */}
              <div className="border-l-4 border-brand-green bg-brand-green-lt rounded-r-lg px-5 py-4 my-6">
                <p className="font-body text-[10px] font-semibold text-brand-green uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  ⚡ Field note — Ray Novelo
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#1a3a0a" }}>
                  I&apos;ve pulled dead 12V batteries out of Teslas with fewer than 40,000 miles on them.
                  The failure is usually sudden — owner goes to bed, car is fine, wakes up and nothing
                  works. No warning. This is the most common reason we get &quot;my car is completely dead&quot; calls.
                </p>
              </div>

              <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mt-8 mb-4 pt-6 border-t border-brand-border" id="section-2">
                Why it fails without warning
              </h2>
              <p className="text-base mb-5">
                Gas cars have 12V batteries too, and those fail gradually — slow cranking, dim lights,
                the classic signs. Tesla&apos;s 12V system is different. The car actively manages and charges
                the 12V from the HV pack, which masks degradation until the battery crosses a threshold
                and drops off a cliff. One day it holds charge, the next it doesn&apos;t.
              </p>

              {/* Warning callout */}
              <div className="border-l-4 border-brand-amber bg-amber-50 rounded-r-lg px-5 py-4 my-6">
                <p className="font-body text-[10px] font-semibold text-amber-800 uppercase tracking-wider mb-2">
                  ⚠ Important — don&apos;t jump it like a gas car
                </p>
                <p className="font-body text-sm leading-relaxed text-amber-900">
                  If your Tesla won&apos;t turn on, do not attempt to jump it the way you would a conventional car.
                  Tesla&apos;s 12V system has specific jump procedures. Doing it wrong can damage the HV system.
                  Call us first — we carry Tesla-compatible 12V units in the van.
                </p>
              </div>

              <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mt-8 mb-4 pt-6 border-t border-brand-border" id="section-3">
                How to read the fault codes
              </h2>
              <p className="text-base mb-4">
                If your car is still responding but showing alerts, you may see one of these in the Tesla app
                under Safety &amp; Security → Service Alerts:
              </p>

              {/* Fault code block */}
              <div className="bg-brand-dark rounded-lg p-4 my-5">
                <p className="font-body text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Common 12V-related fault codes
                </p>
                {[
                  { code: "BMS_a066",    desc: "12V battery low — charge or replace soon" },
                  { code: "BMS_w017",    desc: "12V battery needs service" },
                  { code: "VCFRONT_a175", desc: "12V battery power insufficient" },
                ].map(({ code, desc }) => (
                  <div key={code} className="mb-3 last:mb-0">
                    <span className="font-mono text-brand-amber text-sm block">{code}</span>
                    <span className="font-mono text-gray-400 text-xs">{desc}</span>
                  </div>
                ))}
              </div>

              <p className="text-base mb-5">
                If you&apos;re seeing any of these, don&apos;t wait. The window between &quot;warning&quot; and &quot;completely dead&quot;
                can be days or hours, and there&apos;s no reliable way to predict which.
              </p>

              <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mt-8 mb-4 pt-6 border-t border-brand-border" id="section-4">
                Model-specific notes
              </h2>

              {/* Inline service CTA */}
              <div className="border border-brand-green rounded-card p-5 my-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide mb-1">
                    Think your 12V might be failing?
                  </h3>
                  <p className="font-body text-brand-muted text-sm">
                    We carry Tesla-compatible 12V batteries in the van. Text your fault codes to (951) 622-6222 before we roll.
                  </p>
                </div>
                <a
                  href="tel:+19516226222"
                  className="font-body font-semibold text-sm bg-brand-green text-white px-4 py-2.5 rounded-lg hover:bg-brand-green-dk transition-colors whitespace-nowrap shrink-0"
                >
                  Call or text Ray
                </a>
              </div>

              <p className="text-base mb-5">
                Model 3 and Y use a lithium-ion 12V battery — a Tesla improvement over the older
                lead-acid units in Model S and X. The lithium units are better but not immune.
                Model S and X owners running the original lead-acid 12V should replace at 3–4 years
                regardless of symptoms.
              </p>

              {/* Inline image placeholder */}
              <div className="bg-brand-surface border border-brand-border rounded-card h-44 flex items-center justify-center my-6">
                <span className="font-body text-brand-muted text-sm">📷 Field photo — 12V battery location by model</span>
              </div>
              <p className="font-body text-xs text-brand-muted text-center -mt-4 mb-6 px-4">
                12V location varies by model. Model 3/Y: front trunk. Model S/X: under hood near firewall.
                Photo: field removal, Anaheim, Feb 2025.
              </p>

              <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mt-8 mb-4 pt-6 border-t border-brand-border" id="section-5">
                What to do right now
              </h2>
              <ul className="flex flex-col gap-3 mb-6">
                {[
                  "Check your Tesla app for any active service alerts",
                  "If your car is more than 3 years old, ask about a 12V health check at your next service",
                  "If the car won't unlock or respond to the app — call, don't try to jump it",
                  "If you're seeing BMS_a066 or BMS_w017, treat it as urgent",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 font-body text-base">
                    <span className="text-brand-green mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Second field note */}
              <div className="border-l-4 border-brand-green bg-brand-green-lt rounded-r-lg px-5 py-4 my-6">
                <p className="font-body text-[10px] font-semibold text-brand-green uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  ⚡ Field note — Ray Novelo
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#1a3a0a" }}>
                  Replacement takes about 30–45 minutes on-site. We carry the most common units for
                  Model 3, Y, S, and X in the van. If you&apos;re outside warranty and seeing alerts,
                  this is one of the easiest jobs to handle mobile — no tow, no shop visit.
                </p>
              </div>

            </div>

            {/* References section */}
            <div className="border-t border-brand-border pt-8 mt-10">
              <h2 className="font-display font-semibold text-brand-dark text-xl tracking-wide mb-1">
                References & further reading
              </h2>
              <p className="font-body text-brand-muted text-xs mb-6">
                External resources related to this post. We link directly — no paywalls, no affiliate links.
              </p>
              {references.map(({ group, items }) => (
                <div key={group} className="mb-6">
                  <p className="font-body text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-3">{group}</p>
                  <div className="flex flex-col gap-3">
                    {items.map(({ title, source, desc, url }) => (
                      <a
                        key={title}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 bg-white border border-brand-border rounded-lg p-4 hover:border-brand-blue transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-semibold text-brand-blue text-sm mb-0.5 group-hover:underline">{title}</p>
                          <p className="font-body text-brand-muted text-xs mb-1">{source}</p>
                          <p className="font-body text-brand-muted text-xs leading-relaxed">{desc}</p>
                        </div>
                        <span className="text-brand-muted text-sm shrink-0 mt-0.5">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Share bar */}
            <div className="border-t border-brand-border pt-5 mt-6 flex items-center gap-3">
              <span className="font-body text-sm text-brand-muted">Share this post:</span>
              <button className="font-body text-xs border border-brand-border text-brand-muted px-3.5 py-1.5 rounded-full hover:border-brand-green hover:text-brand-green transition-colors">
                Copy link
              </button>
              <button className="font-body text-xs border border-brand-border text-brand-muted px-3.5 py-1.5 rounded-full hover:border-brand-green hover:text-brand-green transition-colors">
                Text to a friend
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-6 px-6 py-10 sticky top-14 self-start">

            {/* Table of contents */}
            <div className="bg-white border border-brand-border rounded-card p-4">
              <h3 className="font-body text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-3">
                In this post
              </h3>
              <div className="flex flex-col">
                {toc.map((item, i) => (
                  <a
                    key={item}
                    href={`#section-${i + 1}`}
                    className={`font-body text-xs py-2 border-b border-brand-border last:border-0 flex items-start gap-2 hover:text-brand-green transition-colors ${i === 0 ? "text-brand-green font-semibold" : "text-brand-muted"}`}
                  >
                    <span className="font-mono text-brand-border text-[10px] mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="bg-brand-green-dk rounded-card p-5 text-center">
              <h3 className="font-display font-semibold text-white text-base tracking-wide mb-2">12V failing?</h3>
              <p className="font-body text-white/60 text-xs leading-relaxed mb-4">
                We carry replacement units in the van. Text your fault codes first.
              </p>
              <a
                href="tel:+19516226222"
                className="font-body font-semibold text-sm bg-brand-amber text-brand-dark px-4 py-2.5 rounded-lg block hover:brightness-95 transition-all"
              >
                Call (951) 622-6222
              </a>
              <span className="font-body text-[10px] text-white/35 mt-2 block">
                Ray answers directly · same-day dispatch
              </span>
            </div>

            {/* Related tags */}
            <div>
              <h3 className="font-body text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-3">
                Related topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Battery", "12V system", "Model 3", "Model Y", "Model S/X", "Fault codes"].map(tag => (
                  <span key={tag} className="font-body text-xs border border-brand-border text-brand-muted px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Author box */}
        <div className="bg-brand-surface border-b border-brand-border px-5 py-8">
          <div className="max-w-3xl mx-auto flex items-start gap-5">
            <div className="w-14 h-14 rounded-full bg-brand-green-lt border-2 border-brand-green flex items-center justify-center font-display font-semibold text-brand-green text-lg shrink-0">
              RN
            </div>
            <div>
              <p className="font-display font-semibold text-brand-dark text-base tracking-wide">Ray Novelo</p>
              <p className="font-body text-xs text-brand-green mb-2">Owner, Ray&apos;s EV Service · Tesla specialist</p>
              <p className="font-body text-brand-muted text-sm leading-relaxed">
                U.S. Marine veteran and Boeing-trained electrical specialist. Ray has been diagnosing and
                repairing Teslas since 2018 — apprenticing at EV-specialized garages before launching his
                own mobile service in 2023. Every post is based on real jobs, real fault codes, and real
                conversations with Tesla owners across Southern California.
              </p>
            </div>
          </div>
        </div>

        {/* Related posts */}
        <div className="bg-white border-b border-brand-border px-5 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mb-6">Related posts</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {relatedPosts.map(({ slug, cat, title }) => (
                <Link key={slug} href={`/blog/${slug}`} className="group rounded-card border border-brand-border overflow-hidden hover:border-brand-green transition-colors">
                  <div className="bg-brand-surface h-20 flex items-center justify-center border-b border-brand-border">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div className="p-4">
                    <span className="font-body text-[10px] font-semibold text-brand-blue uppercase tracking-wider block mb-2">{cat}</span>
                    <h3 className="font-display font-semibold text-brand-dark text-sm tracking-wide leading-snug group-hover:text-brand-green transition-colors">
                      {title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Post-level CTA */}
        <div className="bg-brand-green-dk px-5 py-14 text-center">
          <h2 className="font-display font-semibold text-white text-3xl tracking-wide mb-3">
            Think this applies to your Tesla?
          </h2>
          <p className="font-body text-white/65 text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Text your fault codes to (951) 622-6222 and Ray will pre-screen before rolling the van.
            Remote diagnostic is $100 flat — credited toward repair if you book service.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="tel:+19516226222"
              className="font-body font-semibold text-base bg-brand-amber text-brand-dark px-7 py-3.5 rounded-lg hover:brightness-95 transition-all"
            >
              Call or text Ray
            </a>
            <Link
              href="/services"
              className="font-body font-semibold text-base border border-white/30 text-white px-7 py-3.5 rounded-lg hover:border-white/60 hover:bg-white/5 transition-all"
            >
              View all services
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
