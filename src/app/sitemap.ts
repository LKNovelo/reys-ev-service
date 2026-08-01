import type { MetadataRoute } from "next";
import { SITE_URL, STATIC_ROUTES } from "@/lib/siteConfig";
import { sanityFetch } from "@/lib/sanity";

export const revalidate = 3600;

interface SitemapPost {
  slug: string;
  publishedAt: string;
  _updatedAt: string;
}

const POSTS_QUERY = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
  "slug": slug.current, publishedAt, _updatedAt
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  let postEntries: MetadataRoute.Sitemap = [];

  try {
    const posts = await sanityFetch<SitemapPost[]>(POSTS_QUERY);
    postEntries = (posts ?? []).map(({ slug, publishedAt, _updatedAt }) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(_updatedAt ?? publishedAt ?? now),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }));
  } catch {
    // If Sanity is unreachable, still emit the static routes rather than
    // failing the whole sitemap.
  }

  return [...staticEntries, ...postEntries];
}
