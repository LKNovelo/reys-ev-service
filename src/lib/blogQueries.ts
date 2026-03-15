import { sanityFetch } from "./sanity";
import type { PortableTextBlock } from "next-sanity";

/* ── Sanity blog types ─────────────────────────────────────────────────────── */

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string;               // resolved from slug.current
  publishedAt: string;         // ISO datetime
  excerpt: string | null;
  category: string;
  keywords: string[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any | null;      // Sanity image reference
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: (PortableTextBlock | any)[];
  references: {
    group: string;
    title: string;
    url: string;
    source: string | null;
    desc: string | null;
  }[] | null;
  relatedPosts: {
    _id: string;
    title: string;
    slug: string;
    category: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    coverImage: any | null;
  }[] | null;
  seoTitle: string | null;
  seoDesc: string | null;
}

export interface SanityBlogListItem {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string | null;
  category: string;
  keywords: string[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any | null;
  bodyText: string | null;     // plain text for read-time calc
}

/* ── GROQ queries ──────────────────────────────────────────────────────────── */

const blogListQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  category,
  keywords,
  coverImage,
  "bodyText": pt::text(body)
}`;

const blogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  category,
  keywords,
  coverImage,
  body,
  references[] {
    group,
    title,
    url,
    source,
    desc
  },
  relatedPosts[]-> {
    _id,
    title,
    "slug": slug.current,
    category,
    coverImage
  },
  seoTitle,
  seoDesc
}`;

const allSlugsQuery = `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }`;

/* ── Fetch functions ───────────────────────────────────────────────────────── */

export async function fetchAllBlogPosts(): Promise<SanityBlogListItem[]> {
  return sanityFetch<SanityBlogListItem[]>(blogListQuery);
}

export async function fetchBlogPost(slug: string): Promise<SanityBlogPost | null> {
  return sanityFetch<SanityBlogPost | null>(blogPostQuery, { slug });
}

export async function fetchAllSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(allSlugsQuery);
}

/* ── Helpers ───────────────────────────────────────────────────────────────── */

/** Estimate read time from plain text extracted via pt::text() */
export function calcReadTime(bodyText: string | null): string {
  if (!bodyText) return "2 min read";
  const wordCount = bodyText.split(/\s+/).length;
  const minutes = Math.max(2, Math.round(wordCount / 230));
  return `${minutes} min read`;
}

/** Collect all unique keywords across posts */
export function collectKeywords(posts: SanityBlogListItem[]): string[] {
  const set = new Set<string>();
  for (const p of posts) {
    if (p.keywords) p.keywords.forEach((k) => set.add(k));
  }
  return Array.from(set).sort();
}
