import Link from "next/link";

/* ── About / Ray strip ─────────────────────────────────────── */
export function AboutStrip() {
  return (
    <section className="py-16 px-5 bg-white border-t border-brand-border">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <span className="section-label">The Person Behind the Van</span>
          <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-4">
            Electrical Troubleshooting Has Been the Thread Through Ray&apos;s Career
          </h2>
          <p className="font-body text-brand-muted text-base leading-relaxed max-w-2xl">
            Ray Novelo served as a satellite and radar technician in the U.S. Marine Corps,
            then worked in electronic component manufacturing and specialized electrical repair
            for a major aerospace manufacturer. He began working around Tesla repair in 2018 and
            launched Ray&apos;s EV Service in 2023.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="font-body text-xs font-semibold bg-brand-blue-lt text-brand-blue px-3 py-1.5 rounded-full border border-brand-blue border-opacity-30">
              U.S. Marine veteran
            </span>
            <span className="font-body text-xs font-semibold bg-brand-green-lt text-brand-green px-3 py-1.5 rounded-full border border-brand-green border-opacity-30">
              Qualified independent repairer
            </span>
            <span className="font-body text-xs font-semibold bg-brand-blue-lt text-brand-blue px-3 py-1.5 rounded-full border border-brand-blue border-opacity-30">
              Aerospace electrical experience
            </span>
            <span className="font-body text-xs font-semibold bg-brand-green-lt text-brand-green px-3 py-1.5 rounded-full border border-brand-green border-opacity-30">
              EV since 2018
            </span>
          </div>
        </div>
        <div className="shrink-0">
          <Link
            href="/about"
            className="font-body inline-flex items-center gap-2 text-brand-green font-semibold text-sm border border-brand-green px-6 py-3 rounded-lg hover:bg-brand-green-lt transition-colors whitespace-nowrap"
          >
            About Ray →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Full-width CTA bar ────────────────────────────────────── */
export function CTABar() {
  return (
    <section className="bg-brand-green-dk py-14 px-5">
      <div className="max-w-6xl mx-auto text-center">
        <span className="section-label text-white/40">Contact Ray</span>
        <h2 className="font-display font-semibold text-white text-4xl tracking-wide mb-3">
          Tell Ray What Your Tesla Is Doing
        </h2>
        <p className="font-body text-white/65 text-base mb-8 max-w-lg mx-auto leading-relaxed">
          Include the model, year, location, and exact alert message if one appears.
          Ray will confirm the next step, availability, and any travel fee before dispatch.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="tel:+19516226222"
            className="bg-brand-amber text-brand-dark font-body font-semibold text-base px-7 py-3.5 rounded-lg hover:brightness-95 transition-all"
          >
            Call (951) 622-6222
          </a>
          <a
            href="mailto:RaysEVService@gmail.com"
            className="font-body font-semibold text-base px-7 py-3.5 rounded-lg border border-white/30 text-white hover:border-white/60 hover:bg-white/5 transition-all"
          >
            Request an Appointment
          </a>
        </div>
        <p className="font-body text-white/35 text-xs mt-6">
          Call or text (951) 622-6222
        </p>
      </div>
    </section>
  );
}
