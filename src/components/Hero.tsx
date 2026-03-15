import Link from "next/link";

const credentials = [
  {
    label: "Tesla Toolbox 3",
    desc: "Factory-level diagnostics — the same software Tesla service centers use",
    color: "bg-brand-green-lt text-brand-green border-brand-green",
  },
  {
    label: "Aerospace-trained",
    desc: "High-voltage electrical specialist. Aerospace precision applied to EVs.",
    color: "bg-brand-blue-lt text-brand-blue border-brand-blue",
  },
  {
    label: "U.S. Marine veteran",
    desc: "Show up when you say you will. Do the job right. Stand behind your work.",
    color: "bg-brand-blue-lt text-brand-blue border-brand-blue",
  },
  {
    label: "Mobile — no tow needed",
    desc: "Ray comes to your home, office, or roadside. LA to San Diego.",
    color: "bg-brand-green-lt text-brand-green border-brand-green",
  },
];

export default function Hero() {
  return (
    <section className="grid md:grid-cols-[3fr_2fr] min-h-[520px]">

      {/* LEFT — dark green headline panel */}
      <div className="bg-brand-green-dk px-8 py-16 md:px-14 md:py-20 flex flex-col justify-center">
        <p className="font-body text-[10px] font-semibold tracking-[1.4px] uppercase text-white/50 mb-5">
          Veteran-Owned &middot; Tesla Toolbox 3 Certified &middot; Southern California
        </p>

        <h1
          className="font-display text-white leading-[1.05] tracking-wide mb-5"
          style={{ fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 600 }}
        >
          Your Tesla.<br />
          Fixed{" "}
          <em className="not-italic text-brand-amber">where you are.</em>
        </h1>

        <p className="font-body text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
          Mobile EV diagnostics and repair from LA to San Diego. No tow truck,
          no dealership waitlist. Ray comes to you — same day in most of the IE and OC.
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
          Mon–Fri 7 am–6 pm &nbsp;&middot;&nbsp; Sat–Sun by appointment
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
