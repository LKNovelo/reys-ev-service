import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /studio is the Sanity CMS login; /api has no crawlable content.
        // /gear is hidden until the placeholder affiliate links are replaced.
        disallow: ["/studio", "/studio/", "/api/", "/gear"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
