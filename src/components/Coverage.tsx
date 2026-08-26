import Link from "next/link";
import {
  EXTENDED_HOURS_FEE,
  NORMAL_SERVICE_HOURS,
  SERVICE_RINGS,
} from "@/lib/serviceArea";

export default function Coverage() {
  return (
    <section className="py-16 px-5 bg-brand-surface border-t border-brand-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-9">
          <div>
            <span className="section-label">Where We Go</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide">
              Mobile Coverage up to 100 Miles
            </h2>
            <p className="font-body text-brand-muted text-base mt-2 max-w-2xl leading-relaxed">
              Ray&apos;s EV Service is based in Corona. Travel fees are measured from the Eastvale
              service-area center in 20-mile bands and confirmed before dispatch.
            </p>
          </div>
          <Link href="/coverage" className="font-body font-semibold text-sm text-brand-blue hover:underline shrink-0">
            View coverage map →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {SERVICE_RINGS.map((ring) => (
            <div key={ring.maxMiles} className="bg-white rounded-card border border-brand-border p-4">
              <span className="w-3 h-3 rounded-full block mb-3" style={{ backgroundColor: ring.color }} />
              <p className="font-body text-brand-muted text-xs mb-1">{ring.range}</p>
              <p className="font-display font-semibold text-brand-dark text-2xl tracking-wide">
                ${ring.fee}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-card border border-brand-border p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <p className="font-body font-semibold text-brand-dark text-sm">
            Normal hours: {NORMAL_SERVICE_HOURS}
          </p>
          <span className="hidden sm:block text-brand-border">|</span>
          <p className="font-body text-brand-muted text-sm">
            Extended Service Hours outside that window: <strong className="text-brand-dark">${EXTENDED_HOURS_FEE} flat fee</strong>
          </p>
          <a href="tel:+19516226222" className="font-body font-semibold text-sm text-brand-green hover:underline sm:ml-auto shrink-0">
            Call (951) 622-6222
          </a>
        </div>
      </div>
    </section>
  );
}
