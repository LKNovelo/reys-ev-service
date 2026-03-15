"use client";

import { useState } from "react";
import Link from "next/link";

/* ── ZIP → zone mapping ────────────────────────────────────────────────────
   Uses 3-digit ZIP prefix to determine county/region, with specific 5-digit
   overrides for edge cases (e.g. Temecula 925xx zips are in Riverside County
   but fall in the extended zone by drive time).
──────────────────────────────────────────────────────────────────────────── */

type Zone = "primary" | "secondary" | "extended" | null;

interface ZoneInfo {
  zone: Zone;
  label: string;
  fee: string;
  message: string;
  color: string;
}

// Specific 5-digit overrides (checked first)
const zipOverrides: Record<string, Zone> = {
  // Temecula / Murrieta — geographically Riverside County but far south on I-15
  "92589": "extended", "92590": "extended", "92591": "extended",
  "92592": "extended", "92593": "extended",
  // Murrieta
  "92562": "extended", "92563": "extended", "92564": "extended",
  // Wildomar / Menifee — borderline, closer to Temecula
  "92595": "extended", "92596": "extended",
  // Hemet / San Jacinto — far east IE
  "92543": "secondary", "92544": "secondary", "92545": "secondary",
  "92546": "secondary", "92582": "secondary", "92583": "secondary",
};

// 3-digit prefix → zone
const zip3Map: Record<string, Zone> = {
  // ── Primary: 91 Corridor & IE ──
  // Western Riverside County (Corona, Norco, Riverside, Lake Elsinore, Perris)
  "925": "primary",
  // Orange County (Santa Ana, Anaheim, Irvine, Fullerton, HB, etc.)
  "926": "primary",
  "927": "primary",
  "928": "primary",
  // San Bernardino County west (Ontario, Rancho Cucamonga, Fontana, Upland)
  "917": "primary",
  "913": "primary", // Some Pomona/Claremont zips

  // ── Secondary: LA County (small travel fee) ──
  "900": "secondary", "901": "secondary", "902": "secondary",
  "903": "secondary", "904": "secondary", "905": "secondary",
  "906": "secondary", "907": "secondary", "908": "secondary",
  "910": "secondary", "911": "secondary", "912": "secondary",
  "914": "secondary", "915": "secondary", "916": "secondary",
  "918": "secondary",

  // ── Extended: San Diego County (call first) ──
  "919": "extended", "920": "extended", "921": "extended",
};

function lookupZip(zip: string): ZoneInfo {
  const cleaned = zip.replace(/\s/g, "");
  if (!/^\d{5}$/.test(cleaned)) {
    return { zone: null, label: "", fee: "", message: "Enter a valid 5-digit zip code.", color: "" };
  }

  // Check specific overrides first
  const override = zipOverrides[cleaned];
  if (override) return zoneToInfo(override);

  // Then check 3-digit prefix
  const prefix = cleaned.substring(0, 3);
  const zone = zip3Map[prefix] ?? null;

  if (!zone) {
    return {
      zone: null,
      label: "Outside service area",
      fee: "",
      message: "This zip code is outside our regular coverage. Call Ray directly — he may still be able to help depending on scheduling.",
      color: "text-brand-muted",
    };
  }

  return zoneToInfo(zone);
}

function zoneToInfo(zone: Zone): ZoneInfo {
  switch (zone) {
    case "primary":
      return {
        zone: "primary",
        label: "91 Corridor & Inland Empire",
        fee: "No travel fee",
        message: "You're in the primary service zone. No travel fee applies.",
        color: "text-brand-green",
      };
    case "secondary":
      return {
        zone: "secondary",
        label: "LA County",
        fee: "Small travel fee",
        message: "You're in the LA County zone. A small travel fee applies — confirmed at booking.",
        color: "text-brand-blue",
      };
    case "extended":
      return {
        zone: "extended",
        label: "San Diego / Temecula",
        fee: "Call first",
        message: "You're in the extended zone. Call Ray to confirm availability and travel fee.",
        color: "text-amber-700",
      };
    default:
      return { zone: null, label: "", fee: "", message: "", color: "" };
  }
}

interface ZipCheckerProps {
  /** Compact mode for embedding in other pages (no heading, smaller) */
  compact?: boolean;
  /** Show link to full coverage page */
  showCoverageLink?: boolean;
}

export default function ZipChecker({ compact = false, showCoverageLink = false }: ZipCheckerProps) {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<ZoneInfo | null>(null);

  function handleCheck() {
    setResult(lookupZip(zip));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleCheck();
  }

  const dotColors: Record<string, string> = {
    primary: "bg-brand-green",
    secondary: "bg-brand-blue",
    extended: "bg-brand-amber",
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="Enter your zip code"
          value={zip}
          onChange={(e) => { setZip(e.target.value); setResult(null); }}
          onKeyDown={handleKeyDown}
          className="font-body border border-brand-border rounded-lg px-4 py-2.5 text-sm text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-green w-44"
        />
        <button
          onClick={handleCheck}
          className="font-body font-semibold text-sm bg-brand-green text-white px-5 py-2.5 rounded-lg hover:bg-brand-green-dk transition-colors"
        >
          Check coverage
        </button>
        {!compact && (
          <>
            <span className="font-body text-brand-muted text-sm">or</span>
            <a href="tel:+19516226222" className="font-body font-semibold text-brand-green text-sm hover:underline">
              (951) 622-6222
            </a>
          </>
        )}
      </div>

      {result && (
        <div className={`mt-3 rounded-lg border p-3.5 ${
          result.zone === "primary" ? "bg-brand-green-lt border-brand-green border-opacity-40" :
          result.zone === "secondary" ? "bg-brand-blue-lt border-brand-blue border-opacity-40" :
          result.zone === "extended" ? "bg-amber-50 border-amber-300" :
          "bg-brand-surface border-brand-border"
        }`}>
          <div className="flex items-center gap-2 mb-1">
            {result.zone && <span className={`w-2.5 h-2.5 rounded-full ${dotColors[result.zone] ?? "bg-brand-muted"} shrink-0`} />}
            {result.label && (
              <span className={`font-body font-semibold text-sm ${result.color}`}>{result.label}</span>
            )}
            {result.fee && (
              <span className={`font-body text-xs font-semibold px-2 py-0.5 rounded-full ml-auto ${
                result.zone === "primary" ? "bg-brand-green text-white" :
                result.zone === "secondary" ? "bg-brand-blue text-white" :
                "bg-amber-600 text-white"
              }`}>{result.fee}</span>
            )}
          </div>
          <p className="font-body text-sm text-brand-dark leading-relaxed">{result.message}</p>
        </div>
      )}

      {showCoverageLink && (
        <Link href="/coverage" className="font-body text-xs text-brand-green hover:underline mt-2 inline-block">
          View full coverage map →
        </Link>
      )}
    </div>
  );
}
