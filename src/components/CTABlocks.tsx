// ── AboutStrip ────────────────────────────────────────────────────────────────

const creds = [
  "U.S. Marine Corps",
  "Boeing Electrical",
  "Tesla Toolbox 3",
  "Tesla S · 3 · X · Y",
  "EV Only — No Hybrids",
];

export function AboutStrip() {
  return (
    <section className="bg-[#111] text-white px-5 py-12">
      <div className="max-w-6xl mx-auto max-w-2xl">
        <h2 className="font-bold text-xl mb-3">
          Built by someone who fixes things right
        </h2>
        <p className="text-white/72 text-sm leading-relaxed mb-5">
          Rey Novelo is a U.S. Marine veteran with Boeing electrical training
          and years of EV-specific repair experience. He doesn&rsquo;t guess —
          he diagnoses with OEM tools. And he only works on EVs.
        </p>
        <div className="flex flex-wrap gap-2">
          {creds.map((c) => (
            <span
              key={c}
              className="bg-white/9 border border-white/18 text-white text-[11px] font-semibold px-3 py-1.5 rounded-pill"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTABar ────────────────────────────────────────────────────────────────────

import Link from "next/link";

export function CTABar() {
  return (
    <section className="bg-[#F5A623] px-5 py-10 text-center">
      <h2 className="font-extrabold text-xl text-[#1A1A1A] mb-1">
        Ready to get your Tesla sorted?
      </h2>
      <p className="text-[#1A1A1A]/65 text-sm mb-6">
        Mon–Fri 7am–6pm &nbsp;&middot;&nbsp; Sat–Sun by appointment
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <a
          href="tel:+19516226222"
          className="bg-[#1A1A1A] text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-black transition-colors"
        >
          Call (951) 622-6222
        </a>
        <Link
          href="/contact"
          className="text-[#1A1A1A] font-semibold text-sm px-6 py-3 rounded-lg border-2 border-[#1A1A1A]/70 hover:border-[#1A1A1A] transition-colors"
        >
          Send a message
        </Link>
      </div>
    </section>
  );
}
