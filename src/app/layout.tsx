import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/siteConfig";
import JsonLd, { localBusinessSchema } from "@/components/JsonLd";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const DEFAULT_TITLE = "Mobile Tesla Repair in Southern California | Ray's EV Service";
const DEFAULT_DESCRIPTION =
  "Mobile Tesla diagnostics and selected repairs at your home, office, or safe roadside location. " +
  "Qualified independent repairer serving Southern California from Corona.";

export const metadata: Metadata = {
  // Required for relative OG/canonical URLs to resolve correctly.
  metadataBase: new URL(SITE_URL),
  title: {
    // Page titles supply their own text; the brand is appended here only.
    // Pages must NOT repeat "Ray's EV Service" in their own title.
    template: "%s | Ray's EV Service",
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: "Ray's EV Service",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${sourceSans.variable}`}>
      <body>
        {/* Business identity — referenced by @id from the Service and
            BlogPosting schemas on individual pages, so it belongs on every
            page. Google accepts JSON-LD in the body, which is what Next
            recommends over hand-rolling a <head>. */}
        <JsonLd data={localBusinessSchema()} />
        {children}
      </body>
    </html>
  );
}
