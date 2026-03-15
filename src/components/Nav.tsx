"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/services",    label: "Services"    },
  { href: "/coverage",    label: "Coverage"    },
  { href: "/new-owners",  label: "New Owners"  },
  { href: "/blog",        label: "Blog"        },
  { href: "/about",       label: "About"       },
  { href: "/contact",     label: "Contact"     },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#111] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Logo size={36} />
          <div className="leading-tight">
            <span className="text-white font-semibold text-sm tracking-tight block">
              Rey&rsquo;s EV Service
            </span>
            <span className="text-white/50 text-[10px] tracking-wide block">
              Mobile EV Repair &middot; LA to San Diego
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-white/65 hover:text-white text-sm transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Phone CTA */}
        <a
          href="tel:+19516226222"
          className="bg-[#F5A623] text-[#1A1A1A] text-sm font-bold px-3.5 py-2 rounded-md hover:bg-[#e09b1f] transition-colors"
        >
          (951) 622-6222
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-3 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            ) : (
              <>
                <line x1="3" y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-white/10 px-5 pb-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-white/75 hover:text-white py-3 text-sm border-b border-white/[0.07] last:border-0"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
