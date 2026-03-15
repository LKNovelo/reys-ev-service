import Link from "next/link";

/* ── About / Ray strip ─────────────────────────────────────── */
export function AboutStrip() {
  return (
    <section className="py-16 px-5 bg-white border-t border-brand-border">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <span className="section-label">The person behind the van</span>
          <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-4">
            Aerospace-trained. Marine-disciplined.<br className="hidden sm:block" />
            EV-obsessed since 2018.
          </h2>
          <p className="font-body text-brand-muted text-base leading-relaxed max-w-2xl">
            Ray Novelo was a satellite and radar technician in the U.S. Marine Corps,
            then an Aerospace-trained electrical specialist — before a broken window regulator
            on his own car pulled him into the EV world. He apprenticed at Tesla-specialized
            garages starting in 2018, launched his own mobile service in 2023, and hasn&apos;t
            looked back. Every job gets a written report. Every price is quoted before work begins.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="font-body text-xs font-semibold bg-brand-blue-lt text-brand-blue px-3 py-1.5 rounded-full border border-brand-blue border-opacity-30">
              U.S. Marine veteran
            </span>
            <span className="font-body text-xs font-semibold bg-brand-green-lt text-brand-green px-3 py-1.5 rounded-full border border-brand-green border-opacity-30">
              Tesla Toolbox 3 certified
            </span>
            <span className="font-body text-xs font-semibold bg-brand-blue-lt text-brand-blue px-3 py-1.5 rounded-full border border-brand-blue border-opacity-30">
              Aerospace electrical training
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
        <span className="section-label text-white/40">Ready to book</span>
        <h2 className="font-display font-semibold text-white text-4xl tracking-wide mb-3">
          Get your Tesla back on the road
        </h2>
        <p className="font-body text-white/65 text-base mb-8 max-w-lg mx-auto leading-relaxed">
          Call or text — Ray answers directly. No call center, no hold music.
          Text your fault codes and we&apos;ll pre-screen before dispatch.
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
            Email for a quote
          </a>
        </div>
        <p className="font-body text-white/35 text-xs mt-6">
          Or text your fault codes to (951) 622-6222 — we&apos;ll pre-diagnose before dispatch
        </p>
      </div>
    </section>
  );
}
