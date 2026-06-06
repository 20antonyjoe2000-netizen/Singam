import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#e6122b",
          2: "#ff2a3c",
        },
        bg: {
          DEFAULT: "#000000",
          2: "#0b0b0b",
        },
        fg: "#ffffff",
        muted: "#a6a6a6",
        faint: "#6e6e6e",
        line: {
          DEFAULT: "rgba(255,255,255,0.14)",
          2: "rgba(255,255,255,0.08)",
        },
        ink: "#0a0500",
        // Keep ShadCN required tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        body: ["var(--font-archivo)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
      },
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
