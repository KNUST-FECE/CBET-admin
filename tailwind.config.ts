import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      "inter": ["Inter", "sans-serif"],
      "open-sans": ['var(--font-open-sans)'], 
    },
    extend: {
      screens: {
        "xs": "480px"
      },
      colors: {
        bg: {
          100: "hsl(var(--bg-100))",
          200: "hsl(var(--bg-200))",
          300: "hsl(var(--bg-300))",
        },
        fg: {
          100: "hsl(var(--fg-100))",
          200: "hsl(var(--fg-200))",
          300: "hsl(var(--fg-300))",
        },
        ac: {
          100: "hsl(var(--ac-100))",
          200: "hsl(var(--ac-200))",
          300: "hsl(var(--ac-300))",
        },
        ss: {
          100: "hsl(var(--ss-100))",
          200: "hsl(var(--ss-200))",
          300: "hsl(var(--ss-300))",
        },
        dg: {
          100: "hsl(var(--dg-100))",
          200: "hsl(var(--dg-200))",
          300: "hsl(var(--dg-300))",
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
