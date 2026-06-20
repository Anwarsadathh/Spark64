import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16241C",
        noir: "#0B1810",
        board: {
          DEFAULT: "#1F3D2E",
          deep: "#122318",
          light: "#2C5440",
        },
        ivory: {
          DEFAULT: "#F6F1E4",
          dim: "#EDE4D0",
          parchment: "#FBF8F0",
        },
        walnut: {
          DEFAULT: "#8B5A2B",
          dark: "#5E3B1C",
          deep: "#5E3B1C",
        },
        brass: {
          DEFAULT: "#C9A227",
          light: "#F0D78C",
          deep: "#7A5E12",
          dim: "#9C7E1F",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "checker-fade":
          "repeating-linear-gradient(45deg, rgba(244,238,223,0.06) 0, rgba(244,238,223,0.06) 1px, transparent 1px, transparent 40px)",
      },
      boxShadow: {
        bevel: "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 3px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;