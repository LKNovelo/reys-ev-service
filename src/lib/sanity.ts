import { createClient } from "next-sanity";
import imageUrlBuilder  from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  useCdn:    process.env.NODE_ENV === "production",
};

export const client = createClient(config);

// ── Image URL helper ──────────────────────────────────────────────────────────
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ── Typed GROQ fetcher ────────────────────────────────────────────────────────
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    // Revalidate every 60 s in production; always fresh in dev
    next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
  });
}
