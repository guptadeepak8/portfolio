import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        bg: {
          primary: "#080b10",
          secondary: "#0e1219",
          tertiary: "#141820",
        },
        accent: {
          green: "#4fffb0",
          cyan: "#00d4ff",
          purple: "#7c6dfa",
        },
        text: {
          primary: "#f0f2f7",
          muted: "#8892a4",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
