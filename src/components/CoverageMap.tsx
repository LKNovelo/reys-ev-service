"use client";

import { useEffect, useRef } from "react";

/* ── Zone polygons ──────────────────────────────────────────────────────────
   Primary:  91 corridor from Riverside west through Corona to Anaheim/Santa Ana/Irvine,
             plus south on I-15 to Lake Elsinore (NOT Temecula).
   Secondary: LA County — broader metro area with small travel fee.
   Extended:  Temecula/Murrieta south through San Diego metro — call first.
──────────────────────────────────────────────────────────────────────────── */

const zones = [
  {
    name: "91 Corridor & Inland Empire",
    color: "#1A5C00",
    fillOpacity: 0.14,
    coords: [
      // NW — Rancho Cucamonga / Ontario
      { lat: 34.12, lng: -117.63 },
      // N — Fontana
      { lat: 34.10, lng: -117.43 },
      // NE — Riverside north
      { lat: 33.99, lng: -117.30 },
      // E — Riverside east
      { lat: 33.92, lng: -117.28 },
      // SE — south on I-15 toward Lake Elsinore
      { lat: 33.75, lng: -117.32 },
      // S — Lake Elsinore (southern boundary — above Temecula)
      { lat: 33.63, lng: -117.35 },
      // SW — swing west toward south OC
      { lat: 33.60, lng: -117.65 },
      // S — Irvine / south OC
      { lat: 33.62, lng: -117.85 },
      // W — Huntington Beach / Garden Grove area
      { lat: 33.72, lng: -118.02 },
      // NW — Buena Park / Fullerton
      { lat: 33.88, lng: -118.02 },
      // N — Brea / Yorba Linda
      { lat: 33.95, lng: -117.85 },
      // back to start
      { lat: 34.12, lng: -117.63 },
    ],
  },
  {
    name: "LA County",
    color: "#2B5FA6",
    fillOpacity: 0.08,
    coords: [
      // NW — San Fernando Valley
      { lat: 34.30, lng: -118.65 },
      // NE — Pasadena / Azusa
      { lat: 34.20, lng: -117.90 },
      // E — connects to primary zone
      { lat: 34.12, lng: -117.63 },
      // SE — Brea
      { lat: 33.95, lng: -117.85 },
      // S — Fullerton / Buena Park
      { lat: 33.88, lng: -118.02 },
      // SW — Huntington Beach coast
      { lat: 33.68, lng: -118.05 },
      // W — Long Beach / Torrance coast
      { lat: 33.72, lng: -118.30 },
      // W — South Bay
      { lat: 33.85, lng: -118.42 },
      // NW — Santa Monica / West LA
      { lat: 34.02, lng: -118.52 },
      // back to start
      { lat: 34.30, lng: -118.65 },
    ],
  },
  {
    name: "San Diego / Temecula",
    color: "#F5A623",
    fillOpacity: 0.08,
    coords: [
      // N — south of Lake Elsinore / Temecula area
      { lat: 33.58, lng: -117.35 },
      // NW — south OC / Camp Pendleton
      { lat: 33.40, lng: -117.60 },
      // W — Oceanside coast
      { lat: 33.20, lng: -117.42 },
      // W — Encinitas / Del Mar coast
      { lat: 32.95, lng: -117.28 },
      // SW — San Diego coast
      { lat: 32.72, lng: -117.20 },
      // S — Chula Vista
      { lat: 32.58, lng: -117.05 },
      // SE — eastern SD
      { lat: 32.70, lng: -116.82 },
      // E — El Cajon
      { lat: 32.85, lng: -116.78 },
      // NE — Ramona / Escondido
      { lat: 33.10, lng: -116.95 },
      // N — Temecula / Murrieta
      { lat: 33.50, lng: -117.12 },
      // back to start
      { lat: 33.58, lng: -117.35 },
    ],
  },
];

const cities = [
  // Primary — 91 corridor & IE
  { name: "Corona ★", lat: 33.8753, lng: -117.5664, zone: "primary", home: true },
  { name: "Riverside", lat: 33.9806, lng: -117.3755, zone: "primary" },
  { name: "Anaheim", lat: 33.8366, lng: -117.9143, zone: "primary" },
  { name: "Santa Ana", lat: 33.7455, lng: -117.8677, zone: "primary" },
  { name: "Irvine", lat: 33.6846, lng: -117.8265, zone: "primary" },
  { name: "Ontario", lat: 34.0633, lng: -117.6509, zone: "primary" },
  { name: "Fullerton", lat: 33.8703, lng: -117.9242, zone: "primary" },
  { name: "Lake Elsinore", lat: 33.6681, lng: -117.3273, zone: "primary" },
  // Secondary — LA
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437, zone: "secondary" },
  { name: "Long Beach", lat: 33.7701, lng: -118.1937, zone: "secondary" },
  { name: "Pasadena", lat: 34.1478, lng: -118.1445, zone: "secondary" },
  // Extended — SD + Temecula
  { name: "Temecula", lat: 33.4936, lng: -117.1484, zone: "extended" },
  { name: "San Diego", lat: 32.7157, lng: -117.1611, zone: "extended" },
  { name: "Oceanside", lat: 33.1959, lng: -117.3795, zone: "extended" },
];

const dotColors: Record<string, string> = {
  primary: "#1A5C00",
  secondary: "#2B5FA6",
  extended: "#F5A623",
};

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google: any;
    initCoverageMap: () => void;
  }
}

export default function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return;

    window.initCoverageMap = () => {
      if (!mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 33.75, lng: -117.55 },
        zoom: 9,
        mapTypeId: "roadmap",
        styles: [
          // Keep POI labels off for cleanliness, but show roads/highways
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
          { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
          // Subtle landscape so polygons stand out
          { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f2" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9e8f5" }] },
          // Highway styling — keep visible and prominent
          { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e8d9a0" }] },
          { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#6b6b6b" }] },
          { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
          { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
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
          strokeOpacity: 0.9,
          strokeWeight: 2,
          fillColor: zone.color,
          fillOpacity: zone.fillOpacity,
          map,
        });
      });

      // Drop city markers
      cities.forEach((city) => {
        const color = dotColors[city.zone];
        const isHome = "home" in city && city.home;
        const marker = new window.google.maps.Marker({
          position: { lat: city.lat, lng: city.lng },
          map,
          title: city.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: isHome ? 9 : 6,
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
