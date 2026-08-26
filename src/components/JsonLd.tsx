import {
  SITE_URL,
  BUSINESS,
  SERVICE_AREA_CITIES,
  OPENING_HOURS,
} from "@/lib/siteConfig";
import { SERVICE_AREA_CENTER } from "@/lib/serviceArea";

/**
 * Renders a JSON-LD block. Next injects this into the HTML as-is, so every
 * value must already be safe — we only ever pass our own structured objects,
 * never raw user input.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* ── Business ──────────────────────────────────────────────────────────────── */

export const BUSINESS_ID = `${SITE_URL}/#business`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/rays-ev-service-logo.webp`,
    founder: {
      "@type": "Person",
      name: BUSINESS.founder,
      jobTitle: "Owner & lead technician",
    },
    // Service-area business: no public street address.
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    areaServed: SERVICE_AREA_CITIES.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: "California",
      },
    })),
    openingHoursSpecification: [
      ...OPENING_HOURS.map(({ days, opens, closes }) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...days],
        opens,
        closes,
      })),
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        description: "By appointment",
      },
    ],
    knowsAbout: [
      "Tesla diagnostics",
      "Tesla Toolbox 3",
      "electric vehicle battery service",
      "high voltage systems",
      "EV pre-purchase inspection",
    ],
    slogan: "Your Tesla, Diagnosed Where It Sits.",
  };
}

/* ── Services ──────────────────────────────────────────────────────────────── */

export interface SchemaService {
  title: string;
  shortDesc?: string;
  price?: number;
  priceSuffix?: string;
  slug?: { current?: string };
}

export function servicesSchema(services: SchemaService[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mobile Tesla services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.shortDesc,
        serviceType: s.title,
        provider: { "@id": BUSINESS_ID },
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: SERVICE_AREA_CENTER.lat,
            longitude: SERVICE_AREA_CENTER.lng,
          },
          geoRadius: "160934.4",
        },
        ...(typeof s.price === "number"
          ? {
              offers: {
                "@type": "Offer",
                price: s.price,
                priceCurrency: "USD",
                // "starting"/"flat" is surfaced as a qualifier, not a range.
                description: s.priceSuffix
                  ? `${s.priceSuffix} price`
                  : undefined,
                availability: "https://schema.org/InStock",
                url: s.slug?.current
                  ? `${SITE_URL}/services#${s.slug.current}`
                  : `${SITE_URL}/services`,
              },
            }
          : {}),
      },
    })),
  };
}

/* ── FAQ ───────────────────────────────────────────────────────────────────── */

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/* ── Blog post ─────────────────────────────────────────────────────────────── */

export function blogPostingSchema(post: {
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: string;
  updatedAt?: string;
  imageUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.slice(0, 110),
    description: post.excerpt ?? undefined,
    image: post.imageUrl ?? `${SITE_URL}/opengraph-image`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: BUSINESS.founder,
      url: `${SITE_URL}/about`,
    },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

/* ── Breadcrumbs ───────────────────────────────────────────────────────────── */

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ name, path }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}
