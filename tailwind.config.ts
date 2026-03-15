import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:      "#1A5C00",
          "green-dk": "#0f3a00",
          "green-lt": "#e8f2e3",
          blue:       "#2B5FA6",
          "blue-lt":  "#e6edf8",
          amber:      "#F5A623",
          dark:       "#1A1A1A",
          muted:      "#6B7280",
          surface:    "#F8F8F6",
          border:     "#E5E7EB",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        body:    ["var(--font-body)", "Source Sans 3", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        pill: "100px",
      },
    },
  },
  plugins: [],
};

export default config;
