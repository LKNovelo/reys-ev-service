import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { href: "/services",   label: "Services"   },
  { href: "/coverage",   label: "Coverage"   },
  { href: "/new-owners", label: "New Owners" },
  { href: "/blog",       label: "Blog"       },
  { href: "/about",      label: "About"      },
  { href: "/contact",    label: "Contact"    },
  { href: "/gear",       label: "Rey's Gear" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white/55 text-xs px-5 py-7">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-6 mb-5">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={32} />
            <div className="leading-tight">
              <span className="text-white text-sm font-semibold block">
                Rey&rsquo;s EV Service
              </span>
              <span className="text-white/40 text-[10px] block">
                raysevservice.com &middot; Corona, CA
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white/55 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <hr className="border-white/8 mb-4" />

        <div className="flex flex-wrap justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} Rey&rsquo;s EV Service</span>
          <div className="flex gap-4">
            <a href="tel:+19516226222" className="hover:text-white transition-colors">
              (951) 622-6222
            </a>
            <a href="mailto:RaysEVService@gmail.com" className="hover:text-white transition-colors">
              RaysEVService@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
