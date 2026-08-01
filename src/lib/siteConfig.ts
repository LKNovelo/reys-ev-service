/**
 * Single source of truth for site-wide constants used in metadata,
 * structured data, sitemap, and robots.
 */

export const SITE_URL = "https://raysevservice.com";

export const BUSINESS = {
  name: "Ray's EV Service",
  legalName: "Ray's EV Service",
  description:
    "Veteran-owned mobile EV diagnostics and repair for Tesla Model S, 3, X, and Y. " +
    "Tesla Toolbox 3 certified, aerospace-trained electrical specialist. " +
    "Serving Corona, the Inland Empire, Orange County, Los Angeles, and San Diego.",
  phone: "+1-951-622-6222",
  email: "RaysEVService@gmail.com",
  founder: "Ray Novelo",
  // Service-area business — the street address is intentionally not published,
  // matching the Google Business Profile configuration.
  city: "Corona",
  region: "CA",
  postalCode: "92879",
  country: "US",
  latitude: 33.8753,
  longitude: -117.5664,
  priceRange: "$$",
} as const;

/** Cities served, used for areaServed in structured data. */
export const SERVICE_AREA_CITIES = [
  "Corona", "Riverside", "Anaheim", "Santa Ana", "Garden Grove", "Orange",
  "Fullerton", "Irvine", "Huntington Beach", "Ontario", "Rancho Cucamonga",
  "Norco", "Lake Elsinore", "Perris", "Los Angeles", "Long Beach", "Pasadena",
  "Torrance", "Compton", "Pomona", "Glendale", "Alhambra", "Downey", "Whittier",
  "Inglewood", "Temecula", "Murrieta", "San Diego", "Chula Vista", "Oceanside",
  "Carlsbad", "Escondido", "Encinitas", "El Cajon", "Vista", "Santee", "Poway",
  "National City",
] as const;

export const OPENING_HOURS = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "18:00",
  },
] as const;

/**
 * Builds page metadata with a correct canonical URL and page-specific
 * Open Graph / Twitter tags.
 *
 * Next merges `openGraph` shallowly — if a page omits it, the layout's block is
 * used verbatim and every page shares the homepage's title, description, and
 * URL. Every page must therefore supply its own, which this helper guarantees.
 *
 * `title` must NOT include the brand name; the layout template appends it.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}) {
  const fullTitle = `${title} | ${BUSINESS.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}${path}`,
      siteName: BUSINESS.name,
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullTitle,
      description,
    },
  };
}

/** Static routes included in the sitemap, with relative crawl priority. */
export const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { path: "/",          priority: 1.0, changeFrequency: "weekly"  },
  { path: "/services",  priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact",   priority: 0.9, changeFrequency: "monthly" },
  { path: "/coverage",  priority: 0.8, changeFrequency: "monthly" },
  { path: "/about",     priority: 0.7, changeFrequency: "yearly"  },
  { path: "/ev-guide",  priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog",      priority: 0.6, changeFrequency: "weekly"  },
  // /gear is deliberately excluded until the placeholder affiliate links are
  // replaced with real ones.
];
