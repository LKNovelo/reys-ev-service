import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";

interface Service {
  _id: string;
  title: string;
  shortDesc: string;
  price: number;
  priceSuffix: string;
  featured: boolean;
  tag?: string;
  footerNote?: string;
  slug: { current: string };
}

const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id, title, shortDesc, price, priceSuffix, featured, tag, footerNote,
  slug
}`;

const icons: Record<string, JSX.Element> = {
  "Full EV Diagnostic": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="9" stroke="#1A5C00" strokeWidth="1.4"/>
      <path d="M7 11l3 3 5-5" stroke="#1A5C00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Battery & BMS Service": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="7" width="14" height="10" rx="2" stroke="#2B5FA6" strokeWidth="1.4"/>
      <path d="M7 7V5a4 4 0 018 0v2" stroke="#2B5FA6" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  "Charging System Repair": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 3L5 10h5l-1 8 8-10h-5z" stroke="#7a4d00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "12V System & Electrical": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="9" stroke="#1A5C00" strokeWidth="1.4"/>
      <path d="M11 7v8M7 11h8" stroke="#1A5C00" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  "Remote Pre-Diagnostic": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 7v8M7 11h8" stroke="#2B5FA6" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="11" cy="11" r="4" stroke="#2B5FA6" strokeWidth="1.4"/>
    </svg>
  ),
  "Pre-Purchase Inspection": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="5" width="16" height="12" rx="2" stroke="#7a4d00" strokeWidth="1.4"/>
      <path d="M7 10h8M7 13h5" stroke="#7a4d00" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
};

export default async function Services() {
  const services = await sanityFetch<Service[]>(SERVICES_QUERY);

  return (
    <section className="py-16 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <span className="section-label">Core services</span>
          <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide">
            What we do
          </h2>
          <p className="font-body text-brand-muted text-base mt-2 max-w-xl">
            All work performed on-site at your location. No shop drop-off, no waiting rooms.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ _id, title, shortDesc, price, priceSuffix, featured, tag, footerNote, slug }) => (
            <div
              key={_id}
              className={`rounded-card border flex flex-col p-5 transition-shadow hover:shadow-sm ${
                featured ? "border-brand-green" : "border-brand-border"
              }`}
            >
              {tag && (
                <span className="font-body text-[10px] font-semibold bg-brand-green text-white px-2.5 py-1 rounded-full mb-3 self-start tracking-wide">
                  {tag}
                </span>
              )}
              <div className="mb-3">{icons[title]}</div>
              <h3 className="font-display font-semibold text-brand-dark text-lg tracking-wide mb-2">
                {title}
              </h3>
              <p className="font-body text-brand-muted text-sm leading-relaxed flex-1 mb-4">
                {shortDesc}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                <div>
                  <span className="font-body font-semibold text-brand-green text-sm">
                    ${price}
                  </span>
                  <span className="font-body text-brand-muted text-xs ml-1">{priceSuffix}</span>
                </div>
                {footerNote && (
                  <span className="font-body text-[10px] text-brand-blue bg-brand-blue-lt px-2 py-1 rounded-full">
                    {footerNote}
                  </span>
                )}
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
