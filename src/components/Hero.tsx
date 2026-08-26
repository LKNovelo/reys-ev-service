import Link from "next/link";

const credentials = [
  {
    label: "Qualified Independent Repairer",
    desc: "Licensed access to Tesla Toolbox 3 and Service Mode Plus.",
    color: "bg-brand-green-lt text-brand-green border-brand-green",
  },
  {
    label: "Electrical Background",
    desc: "Military, electronics manufacturing, and aerospace electrical experience.",
    color: "bg-brand-blue-lt text-brand-blue border-brand-blue",
  },
  {
    label: "U.S. Marine Veteran",
    desc: "A systematic, documented approach to electrical troubleshooting.",
    color: "bg-brand-blue-lt text-brand-blue border-brand-blue",
  },
  {
    label: "Mobile Service",
    desc: "Home, office, or safe roadside visits across Southern California.",
    color: "bg-brand-green-lt text-brand-green border-brand-green",
  },
];

export default function Hero() {
  return (
    <section className="grid md:grid-cols-[3fr_2fr] min-h-[520px]">

      {/* LEFT — dark green headline panel */}
      <div className="bg-brand-green-dk px-8 py-16 md:px-14 md:py-20 flex flex-col justify-center">
        <p className="font-body text-[10px] font-semibold tracking-[1.4px] uppercase text-white/50 mb-5">
          Veteran-Owned &middot; Qualified Independent Repairer &middot; Southern California
        </p>

        <h1
          className="font-display text-white leading-[1.05] tracking-wide mb-5"
          style={{ fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 600 }}
        >
          Your Tesla, Diagnosed<br />
          <em className="not-italic text-brand-amber">Where It Sits</em>
        </h1>

        <p className="font-body text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
          Mobile diagnostics and selected repairs for Tesla Model S, Model 3, Model X, and Model Y.
          Many appointments can be completed without a tow or service-center wait.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="tel:+19516226222"
            className="bg-brand-amber text-brand-dark font-body font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg hover:brightness-95 transition-all"
          >
            Call (951) 622-6222
          </a>
          <Link
            href="/services"
            className="font-body font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg border border-white/30 text-white hover:border-white/60 hover:bg-white/5 transition-all"
          >
            Services &amp; Pricing
          </Link>
        </div>

        <p className="font-body text-white/35 text-xs mt-7 tracking-wide">
          Mon–Fri 9 AM–5 PM &nbsp;&middot;&nbsp; Sat–Sun by appointment
        </p>
      </div>

      {/* RIGHT — white credential cards */}
      <div className="bg-white px-8 py-12 md:px-10 md:py-16 flex flex-col justify-center gap-4 border-l border-brand-border">
        <p className="section-label">Why Ray</p>
        {credentials.map(({ label, desc, color }) => (
          <div
            key={label}
            className={`rounded-lg border px-4 py-3.5 ${color} border-opacity-40`}
          >
            <p className="font-body font-semibold text-sm mb-0.5">{label}</p>
            <p className="font-body text-xs leading-relaxed opacity-80">{desc}</p>
          </div>
        ))}
        <div className="mt-2">
          <Link
            href="/about"
            className="font-body text-sm text-brand-muted hover:text-brand-green transition-colors"
          >
            About Ray &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
