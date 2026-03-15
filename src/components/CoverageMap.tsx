"use client";

import { useEffect, useRef } from "react";

const zones = [
  {
    name: "91 Corridor & Inland Empire",
    fee: "No travel fee",
    feeStyle: "bg-brand-green-lt text-brand-green",
    dot: "bg-brand-green",
    color: "#1A5C00",
    fillOpacity: 0.12,
    coords: [
      { lat: 34.01, lng: -117.93 }, // Rancho Cucamonga
      { lat: 34.09, lng: -117.75 }, // Fontana area
      { lat: 33.98, lng: -117.55 }, // Riverside NE
      { lat: 33.87, lng: -117.55 }, // Riverside SE
      { lat: 33.75, lng: -117.65 }, // Corona S
      { lat: 33.75, lng: -117.85 }, // Yorba Linda area
      { lat: 33.82, lng: -118.00 }, // Fullerton S
      { lat: 33.87, lng: -118.05 }, // Anaheim S
      { lat: 33.90, lng: -117.90 }, // Orange
      { lat: 33.97, lng: -117.72 }, // Corona N
      { lat: 34.01, lng: -117.93 }, // back to start
    ],
  },
  {
    name: "LA / Orange County",
    fee: "Small travel fee",
    feeStyle: "bg-brand-blue-lt text-brand-blue",
    dot: "bg-brand-blue",
    color: "#2B5FA6",
    fillOpacity: 0.08,
    coords: [
      { lat: 34.20, lng: -118.50 }, // Pasadena area
      { lat: 34.05, lng: -118.25 }, // LA downtown
      { lat: 33.95, lng: -118.40 }, // Torrance
      { lat: 33.75, lng: -118.20 }, // Long Beach
      { lat: 33.62, lng: -117.92 }, // Irvine S
      { lat: 33.60, lng: -117.70 }, // Mission Viejo
      { lat: 33.75, lng: -117.55 }, // connects to IE
      { lat: 33.87, lng: -117.55 },
      { lat: 34.01, lng: -117.93 },
      { lat: 34.20, lng: -118.50 },
    ],
  },
  {
    name: "San Diego metro",
    fee: "Call first",
    feeStyle: "bg-amber-50 text-amber-800",
    dot: "bg-brand-amber",
    color: "#F5A623",
    fillOpacity: 0.10,
    coords: [
      { lat: 33.60, lng: -117.70 }, // Mission Viejo
      { lat: 33.62, lng: -117.92 }, // Irvine S
      { lat: 33.45, lng: -118.00 }, // Oceanside
      { lat: 33.25, lng: -117.85 }, // Escondido area
      { lat: 32.90, lng: -117.20 }, // San Diego
      { lat: 32.63, lng: -117.08 }, // Chula Vista
      { lat: 32.80, lng: -116.90 }, // El Cajon
      { lat: 33.10, lng: -117.10 }, // Santee area
      { lat: 33.40, lng: -117.35 }, // Temecula S
      { lat: 33.60, lng: -117.70 },
    ],
  },
];

const cities = [
  { name: "Corona ★", lat: 33.8753, lng: -117.5664, zone: "primary", home: true },
  { name: "Riverside", lat: 33.9806, lng: -117.3755, zone: "primary" },
  { name: "Anaheim", lat: 33.8366, lng: -117.9143, zone: "primary" },
  { name: "Santa Ana", lat: 33.7455, lng: -117.8677, zone: "primary" },
  { name: "Irvine", lat: 33.6846, lng: -117.8265, zone: "primary" },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437, zone: "secondary" },
  { name: "Long Beach", lat: 33.7701, lng: -118.1937, zone: "secondary" },
  { name: "Temecula", lat: 33.4936, lng: -117.1484, zone: "secondary" },
  { name: "San Diego", lat: 32.7157, lng: -117.1611, zone: "extended" },
];

const dotColors: Record<string, string> = {
  primary: "#1A5C00",
  secondary: "#2B5FA6",
  extended: "#F5A623",
};

declare global {
  interface Window {
    google: typeof google;
    initCoverageMap: () => void;
  }
}

export default function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return;

    window.initCoverageMap = () => {
      if (!mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 33.88, lng: -117.75 },
        zoom: 9,
        mapTypeId: "roadmap",
        styles: [
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9e8f5" }] },
          { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f8f8f6" }] },
        ],
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      });

      mapInstance.current = map;

      // Draw zone polygons
      zones.forEach((zone) => {
        new window.google.maps.Polygon({
          paths: zone.coords,
          strokeColor: zone.color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: zone.color,
          fillOpacity: zone.fillOpacity,
          map,
        });
      });

      // Drop city markers
      cities.forEach((city) => {
        const color = dotColors[city.zone];
        const marker = new window.google.maps.Marker({
          position: { lat: city.lat, lng: city.lng },
          map,
          title: city.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: city.home ? 9 : 6,
            fillColor: color,
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="font-family:sans-serif;font-size:13px;font-weight:500;padding:2px 4px">${city.name}</div>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    };

    // Load Maps script if not already loaded
    if (!document.getElementById("google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initCoverageMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if (window.google) {
      window.initCoverageMap();
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="bg-brand-surface flex items-center justify-center h-full min-h-[420px]">
        <p className="font-body text-brand-muted text-sm">Map loading...</p>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full min-h-[420px]" />;
}
