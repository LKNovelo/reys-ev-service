import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:  "cdn.sanity.io",
        pathname:  "/images/**",
      },
    ],
  },

  // Sanity Studio needs these headers to work inside Next.js
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [
          { key: "X-Frame-Options",        value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options",  value: "nosniff"   },
        ],
      },
    ];
  },
};

export default nextConfig;
