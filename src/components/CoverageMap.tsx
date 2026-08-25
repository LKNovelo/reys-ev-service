"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "@/lib/googleMaps";
import { SERVICE_AREA_CENTER, SERVICE_RINGS } from "@/lib/serviceArea";

const METERS_PER_MILE = 1609.344;

export default function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;

    loadGoogleMaps()
      .then((google) => {
        if (!active || !mapRef.current) return;

        const center = {
          lat: SERVICE_AREA_CENTER.lat,
          lng: SERVICE_AREA_CENTER.lng,
        };
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 8,
          mapTypeId: "roadmap",
          styles: [
            { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
            { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
            { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f2" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9e8f5" }] },
            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e8d9a0" }] },
            { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
            { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
          ],
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        });

        let outerCircle: any = null;

        [...SERVICE_RINGS].reverse().forEach((ring) => {
          const circle = new google.maps.Circle({
            center,
            radius: ring.maxMiles * METERS_PER_MILE,
            strokeColor: ring.color,
            strokeOpacity: 0.95,
            strokeWeight: ring.maxMiles === 100 ? 3 : 2,
            fillColor: ring.fillColor,
            fillOpacity: 0.2,
            clickable: false,
            map,
          });

          if (ring.maxMiles === 100) outerCircle = circle;
        });

        const marker = new google.maps.Marker({
          position: center,
          map,
          title: `Service-area center: ${SERVICE_AREA_CENTER.address}`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 9,
            fillColor: "#1A5C00",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 3,
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="font-family:Arial,sans-serif;line-height:1.35;padding:2px 4px"><strong>Service-area center</strong><br>${SERVICE_AREA_CENTER.address}</div>`,
        });
        marker.addListener("click", () => infoWindow.open(map, marker));

        if (outerCircle?.getBounds()) map.fitBounds(outerCircle.getBounds(), 28);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loadError) {
    return (
      <div className="bg-brand-surface flex items-center justify-center h-full min-h-[480px] p-8 text-center">
        <p className="font-body text-brand-muted text-sm">
          The coverage map is temporarily unavailable. Call or text (951) 622-6222 to confirm your service-area fee.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[480px]"
      role="region"
      aria-label="Southern California mobile service coverage map with 20-mile rings centered in Eastvale"
    />
  );
}
