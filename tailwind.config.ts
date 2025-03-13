import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

const palettes = {
  crimson: {
    DEFAULT: "#F3191B",
    500: "#F3191B",
    600: "#D61618",
    400: "#F54346",
    300: "#F76E70",
    200: "#FAA7A8",
    100: "#FDD3D4",
  },
  ube: {
    DEFAULT: "#8A56AC",
    500: "#8A56AC",
    600: "#70458A",
    400: "#A078C0",
    300: "#B699D1",
    200: "#CCBAE2",
    100: "#E3DAF0",
  },
  matcha: {
    DEFAULT: "#5D7052",
    500: "#5D7052",
    600: "#4A5A41",
    400: "#7A8C70",
    300: "#97A78D",
    200: "#B5C1AD",
    100: "#D2DACE",
  },
};

const getPalette = (palette?: "crimson" | "ube" | "matcha") => {
  switch (palette) {
    case "crimson":
      return palettes.crimson;
    case "ube":
      return palettes.ube;
    case "matcha":
      return palettes.matcha;
    default:
      return palettes.crimson;
  }
};

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
        primary: getPalette("matcha"),
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
