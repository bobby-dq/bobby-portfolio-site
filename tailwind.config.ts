import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pirata: ["var(--font-primary)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        primary: {
          DEFAULT: "#F3191B",
          500: "#F3191B",
          600: "#D61618", // Darker
          400: "#F54346", // Lighter
          300: "#F76E70", // Even lighter
          200: "#FAA7A8", // Much lighter
          100: "#FDD3D4", // Very light
        },
        ink: {
          DEFAULT: "#000000",
          900: "#000000",
          800: "#1A1A1A",
          700: "#333333",
          600: "#4D4D4D",
          500: "#666666",
          400: "#808080",
          300: "#999999",
          200: "#B3B3B3",
          100: "#CCCCCC",
        },
        base: {
          DEFAULT: "#FFFDF4", 
          500: "#FFFDF4",
          400: "#F7F5EC",
          300: "#F0EDE4",
          200: "#E8E5DC",
          600: "#FFFFFA", 
          700: "#FCFAF0", 
        },
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme("colors.ink.DEFAULT"),
            a: {
              color: theme("colors.primary.DEFAULT"),
              "&:hover": {
                color: theme("colors.primary.600"),
              },
            },
            h1: {
              color: theme("colors.primary.DEFAULT"),
            },
            h2: {
              color: theme("colors.primary.DEFAULT"),
            },
            h3: {
              color: theme("colors.primary.DEFAULT"),
            },
            h4: {
              color: theme("colors.primary.DEFAULT"),
            },
            strong: {
              color: theme("colors.ink.900"),
            },
            code: {
              color: theme("colors.ink.700"),
              backgroundColor: theme("colors.base.300"),
            },
            blockquote: {
              color: theme("colors.ink.600"),
              borderLeftColor: theme("colors.primary.300"),
            },
          },
        },
      }),
    },
  },
  plugins: [typography, aspectRatio],
};

export default config;
