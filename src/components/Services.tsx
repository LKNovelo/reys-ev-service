import Link from "next/link";

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="#1A5C00" strokeWidth="1.4"/>
        <path d="M7 11l3 3 5-5" stroke="#1A5C00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    name: "Full EV Diagnostic",
    desc: "Tesla Toolbox 3 scan of all vehicle systems. Fault codes, battery health report, and written findings — on-site.",
    price: "From $149",
    featured: true,
    badge: "Most requested",
    href: "/services#diagnostic",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="7" width="14" height="10" rx="2" stroke="#2B5FA6" strokeWidth="1.4"/>
        <path d="M7 7V5a4 4 0 018 0v2" stroke="#2B5FA6" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    name: "Battery & BMS Service",
    desc: "Cell balancing, state-of-health testing, and battery management system calibration. Range loss diagnosis included.",
    price: "From $299",
    featured: false,
    href: "/services#battery",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3L5 10h5l-1 8 8-10h-5z" stroke="#7a4d00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    name: "Charging System Repair",
    desc: "Won't charge? Slow charging? We diagnose onboard charger faults, charge port issues, and 12V system failures.",
    price: "From $199",
    featured: false,
    href: "/services#charging",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="#1A5C00" strokeWidth="1.4"/>
        <path d="M11 7v8M7 11h8" stroke="#1A5C00" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    name: "12V System & Electrical",
    desc: "12V battery replacement, HV contactor testing, and low-voltage wiring faults. Common Tesla 12V units carried in-van.",
    price: "From $129",
    featured: false,
    href: "/services#electrical",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 11h16M11 3v16" stroke="#2B5FA6" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="4" stroke="#2B5FA6" strokeWidth="1.4"/>
      </svg>
    ),
    name: "Remote Pre-Diagnostic",
    desc: "Send us your fault codes before booking. We review remotely and confirm job scope — no surprise costs on dispatch.",
    price: "$100 flat",
    featured: false,
    href: "/services#remote",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="5" width="16" height="12" rx="2" stroke="#7a4d00" strokeWidth="1.4"/>
        <path d="M7 10h8M7 13h5" stroke="#7a4d00" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    name: "Pre-Purchase Inspection",
    desc: "Buying a used Tesla? We inspect battery health, safety systems, and fault history before you sign anything.",
    price: "From $249",
    featured: false,
    href: "/services#inspection",
  },
];

export default function Services() {
  return (
    <section className="py-16 px-5 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span className="section-label">Core services</span>
          <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide">
            What we do
          </h2>
          <p className="font-body text-brand-muted text-base mt-2 max-w-xl">
            All work performed on-site at your location. No shop drop-off, no waiting rooms.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ icon, name, desc, price, featured, badge, href }) => (
            <div
              key={name}
              className={`rounded-card border flex flex-col p-5 transition-shadow hover:shadow-sm ${
                featured
                  ? "border-brand-green"
                  : "border-brand-border"
              }`}
            >
              {badge && (
                <span className="font-body text-[10px] font-semibold bg-brand-green text-white px-2.5 py-1 rounded-full mb-3 self-start tracking-wide">
                  {badge}
                </span>
              )}
              <div className="mb-3">{icon}</div>
              <h3 className="font-display font-semibold text-brand-dark text-lg tracking-wide mb-2">
                {name}
              </h3>
              <p className="font-body text-brand-muted text-sm leading-relaxed flex-1 mb-4">
                {desc}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                <span className="font-body font-semibold text-brand-green text-sm">{price}</span>
                <Link href={href} className="font-body text-brand-blue text-xs hover:underline">
                  Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="font-body inline-flex items-center gap-2 text-brand-green font-semibold text-sm border border-brand-green px-6 py-3 rounded-lg hover:bg-brand-green-lt transition-colors"
          >
            View all services & pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
