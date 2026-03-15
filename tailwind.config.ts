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
          green:  "#1A5C00",
          blue:   "#2B5FA6",
          amber:  "#F5A623",
          dark:   "#1A1A1A",
          "green-light": "#F2F8EE",
          "blue-light":  "#EEF4FC",
          muted:  "#6B6B6B",
          surface: "#F7F7F5",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
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
