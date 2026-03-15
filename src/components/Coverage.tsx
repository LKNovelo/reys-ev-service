import Link from "next/link";

const zones = [
  {
    color: "bg-brand-green",
    name: "91 Corridor & Inland Empire",
    fee: "No travel fee",
    feeStyle: "bg-brand-green-lt text-brand-green",
    cities: "Corona · Riverside · Anaheim · Santa Ana · Orange · Fullerton · Irvine · Huntington Beach",
    note: "Home base is Corona. The 91 freeway makes OC quick and predictable.",
  },
  {
    color: "bg-brand-blue",
    name: "Temecula / LA / wider area",
    fee: "Small travel fee",
    feeStyle: "bg-brand-blue-lt text-brand-blue",
    cities: "Temecula · Murrieta · Los Angeles · Long Beach · Pasadena · Torrance · Moreno Valley",
    note: "Fee confirmed at booking. Temecula's I-15 traffic adds real drive time from Corona.",
  },
  {
    color: "bg-brand-amber",
    name: "San Diego metro",
    fee: "Call first",
    feeStyle: "bg-amber-50 text-amber-800",
    cities: "San Diego · Chula Vista · Oceanside · Carlsbad · Escondido · Encinitas",
    note: "Available depending on scheduling. Ray will give you a straight answer.",
  },
];

export default function Coverage() {
  return (
    <section className="py-16 px-5 bg-brand-surface border-t border-brand-border">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <span className="section-label">Where we go</span>
          <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide">
            Coverage area
          </h2>
          <p className="font-body text-brand-muted text-base mt-2 max-w-xl">
            Zones are based on drive time from Corona — not straight-line distance. The 91 freeway makes Anaheim and OC closer than they look on a map.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {zones.map(({ color, name, fee, feeStyle, cities, note }) => (
            <div key={name} className="bg-white rounded-card border border-brand-border p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <span className={`w-3 h-3 rounded-full ${color} shrink-0`} />
                <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide leading-tight">
                  {name}
                </h3>
              </div>
              <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full inline-block mb-3 ${feeStyle}`}>
                {fee}
              </span>
              <p className="font-body text-brand-muted text-xs leading-relaxed mb-2">{cities}</p>
              <p className="font-body text-brand-muted text-xs italic leading-relaxed">{note}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <p className="font-body text-brand-muted text-sm">
            Not sure if you&apos;re in range?
          </p>
          <div className="flex gap-3">
            <a
              href="tel:+19516226222"
              className="font-body font-semibold text-sm text-brand-green hover:underline"
            >
              Call (951) 622-6222
            </a>
            <span className="text-brand-muted">·</span>
            <Link
              href="/coverage"
              className="font-body font-semibold text-sm text-brand-blue hover:underline"
            >
              View full coverage map →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
