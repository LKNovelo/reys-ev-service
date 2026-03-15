import Link from "next/link";
import Logo from "./Logo";

const serviceLinks = [
  { href: "/services#diagnostic",  label: "EV Diagnostic"          },
  { href: "/services#battery",     label: "Battery & BMS"          },
  { href: "/services#charging",    label: "Charging System Repair"  },
  { href: "/services#electrical",  label: "12V & Electrical"        },
  { href: "/services#remote",      label: "Remote Pre-Diagnostic"   },
  { href: "/services#inspection",  label: "Pre-Purchase Inspection" },
];

const resourceLinks = [
  { href: "/ev-guide",  label: "New Owners Guide" },
  { href: "/blog",      label: "Blog"             },
  { href: "/gear",      label: "Ray's Gear"       },
  { href: "/coverage",  label: "Coverage Map"     },
  { href: "/about",     label: "About Ray"        },
  { href: "/contact",   label: "Contact"          },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-5 pt-14 pb-8">

        {/* Top grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand col */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Logo size={38} />
              <div className="leading-tight">
                <span className="font-body text-white font-semibold text-sm block">
                  Ray&apos;s EV Service
                </span>
                <span className="font-body text-white/45 text-[10px] block">
                  Mobile EV Repair
                </span>
              </div>
            </Link>
            <p className="font-body text-white/55 text-sm leading-relaxed mb-4">
              Veteran-owned mobile Tesla diagnostics and repair. Serving LA to San Diego from Corona, CA.
            </p>
            <div className="flex flex-col gap-1.5">
              <a href="tel:+19516226222" className="font-body text-white/70 hover:text-white text-sm transition-colors">
                (951) 622-6222
              </a>
              <a href="mailto:RaysEVService@gmail.com" className="font-body text-white/70 hover:text-white text-sm transition-colors">
                RaysEVService@gmail.com
              </a>
            </div>
          </div>

          {/* Services col */}
          <div>
            <h3 className="font-display font-semibold text-white text-base tracking-wider mb-4 uppercase">
              Services
            </h3>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="font-body text-white/55 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources col */}
          <div>
            <h3 className="font-display font-semibold text-white text-base tracking-wider mb-4 uppercase">
              Resources
            </h3>
            <ul className="flex flex-col gap-2">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="font-body text-white/55 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + contact col */}
          <div>
            <h3 className="font-display font-semibold text-white text-base tracking-wider mb-4 uppercase">
              Availability
            </h3>
            <div className="flex flex-col gap-2 mb-6">
              {[
                { day: "Monday – Friday", time: "7:00 AM – 6:00 PM" },
                { day: "Saturday",        time: "By appointment"    },
                { day: "Sunday",          time: "By appointment"    },
              ].map(({ day, time }) => (
                <div key={day} className="flex justify-between gap-4 text-sm border-b border-white/10 pb-2">
                  <span className="font-body text-white/50">{day}</span>
                  <span className="font-body text-white/80 text-right">{time}</span>
                </div>
              ))}
            </div>
            <a
              href="tel:+19516226222"
              className="font-body inline-flex w-full justify-center items-center bg-brand-amber text-brand-dark font-semibold text-sm px-5 py-2.5 rounded-lg hover:brightness-95 transition-all"
            >
              Call (951) 622-6222
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/35 text-xs">
            &copy; {new Date().getFullYear()} Ray&apos;s EV Service. Corona, CA. All rights reserved.
          </p>
          <p className="font-body text-white/25 text-xs">
            Tesla&reg; is a registered trademark of Tesla, Inc. Ray&apos;s EV Service is an independent service provider and is not affiliated with Tesla, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
