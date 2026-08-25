"use client";

import { useState } from "react";
import Link from "next/link";
import { loadGoogleMaps } from "@/lib/googleMaps";
import {
  distanceFromServiceCenter,
  formatServiceAreaFee,
  getServiceRing,
  SERVICE_AREA_CENTER,
  SERVICE_RINGS,
} from "@/lib/serviceArea";

type ServiceRing = (typeof SERVICE_RINGS)[number];

interface CoverageResult {
  ring: ServiceRing | null;
  distanceMiles?: number;
  message: string;
}

interface ZipCheckerProps {
  compact?: boolean;
  showCoverageLink?: boolean;
}

export default function ZipChecker({ compact = false, showCoverageLink = false }: ZipCheckerProps) {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [checking, setChecking] = useState(false);

  async function handleCheck() {
    const cleaned = zip.replace(/\s/g, "");
    if (!/^\d{5}$/.test(cleaned)) {
      setResult({ ring: null, message: "Enter a valid 5-digit ZIP code." });
      return;
    }

    setChecking(true);
    setResult(null);

    try {
      const google = await loadGoogleMaps();
      const geocoder = new google.maps.Geocoder();
      const matches: any[] = await new Promise((resolve, reject) => {
        geocoder.geocode(
          {
            address: `${cleaned}, California`,
            componentRestrictions: { country: "US", postalCode: cleaned },
          },
          (geocodeResults: any[], status: string) => {
            if (status === "OK" && geocodeResults?.length) resolve(geocodeResults);
            else reject(new Error(status));
          },
        );
      });

      const location = matches[0].geometry.location;
      const distanceMiles = distanceFromServiceCenter(location.lat(), location.lng());
      const ring = getServiceRing(distanceMiles);

      if (!ring) {
        setResult({
          ring: null,
          distanceMiles,
          message: `This ZIP code is about ${Math.round(distanceMiles)} miles from our Eastvale service-area center and outside our regular 100-mile coverage. Call Ray—availability may vary by job and schedule.`,
        });
      } else {
        setResult({
          ring,
          distanceMiles,
          message: `This ZIP code is about ${Math.round(distanceMiles)} miles from our Eastvale service-area center. Your estimated fee is ${formatServiceAreaFee(ring.fee).toLowerCase()}.`,
        });
      }
    } catch {
      setResult({
        ring: null,
        message: "We couldn’t calculate this ZIP code right now. Call or text (951) 622-6222 and Ray will confirm the fee.",
      });
    } finally {
      setChecking(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" && !checking) void handleCheck();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="Enter your ZIP code"
          aria-label="ZIP code"
          value={zip}
          onChange={(event) => {
            setZip(event.target.value);
            setResult(null);
          }}
          onKeyDown={handleKeyDown}
          className="font-body border border-brand-border rounded-lg px-4 py-2.5 text-sm text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-green w-44"
        />
        <button
          type="button"
          onClick={() => void handleCheck()}
          disabled={checking}
          className="font-body font-semibold text-sm bg-brand-green text-white px-5 py-2.5 rounded-lg hover:bg-brand-green-dk transition-colors disabled:opacity-60"
        >
          {checking ? "Checking…" : "Check coverage"}
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
        <div
          className="mt-3 rounded-lg border p-3.5"
          style={{
            backgroundColor: result.ring?.fillColor ?? "#f5f5f2",
            borderColor: result.ring?.color ?? "#d9d9d2",
          }}
          aria-live="polite"
        >
          <div className="flex items-center gap-2 mb-1">
            {result.ring && (
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: result.ring.color }} />
            )}
            <span className="font-body font-semibold text-sm text-brand-dark">
              {result.ring ? result.ring.range : "Outside regular coverage"}
            </span>
            {result.ring && (
              <span
                className="font-body text-xs font-semibold px-2 py-0.5 rounded-full ml-auto text-white"
                style={{ backgroundColor: result.ring.color }}
              >
                {result.ring.fee === 0 ? "$0 fee" : `$${result.ring.fee} fee`}
              </span>
            )}
          </div>
          <p className="font-body text-sm text-brand-dark leading-relaxed">{result.message}</p>
          {result.ring && (
            <p className="font-body text-[11px] text-brand-muted mt-1">
              Estimate based on the ZIP-code center; the service address is confirmed before dispatch from {SERVICE_AREA_CENTER.address}.
            </p>
          )}
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
