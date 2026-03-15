"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/services",   label: "Services"   },
  { href: "/ev-guide",   label: "EV Guide"   },
  { href: "/blog",       label: "Blog"       },
  { href: "/gear",       label: "Ray's Gear" },
  { href: "/about",      label: "About"      },
  { href: "/contact",    label: "Contact"    },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Logo size={38} />
          <div className="leading-tight">
            <span className="text-brand-dark font-semibold text-sm tracking-tight block font-body">
              Ray&rsquo;s EV Service
            </span>
            <span className="text-brand-muted text-[10px] tracking-wide block font-body">
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
              className="text-brand-muted hover:text-brand-green text-sm font-body transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Phone CTA */}
        <a
          href="tel:+19516226222"
          className="hidden md:inline-flex bg-brand-green text-white text-sm font-semibold font-body px-4 py-2 rounded-lg hover:bg-brand-green-dk transition-colors"
        >
          (951) 622-6222
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-brand-dark"
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
        <div className="md:hidden bg-white border-t border-brand-border px-5 pb-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-brand-muted hover:text-brand-green py-3 text-sm font-body border-b border-brand-border last:border-0"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href="tel:+19516226222"
            className="mt-4 flex items-center justify-center bg-brand-green text-white text-sm font-semibold font-body px-4 py-3 rounded-lg"
          >
            Call (951) 622-6222
          </a>
        </div>
      )}
    </header>
  );
}
