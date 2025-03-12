/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pirata: ["var(--font-pirata-one)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        black: "#0a0a0a",
        gray: {
          900: "#121212",
          800: "#1a1a1a",
          700: "#2a2a2a",
          600: "#3a3a3a",
          500: "#6b6b6b",
          400: "#858585",
          300: "#a3a3a3",
          200: "#d1d1d1",
          100: "#f5f5f5",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.white"),
              "&:hover": {
                color: theme("colors.gray.300"),
              },
            },
            h1: {
              color: theme("colors.white"),
            },
            h2: {
              color: theme("colors.white"),
            },
            h3: {
              color: theme("colors.white"),
            },
            h4: {
              color: theme("colors.white"),
            },
            strong: {
              color: theme("colors.white"),
            },
            code: {
              color: theme("colors.gray.300"),
              backgroundColor: theme("colors.gray.800"),
            },
            blockquote: {
              color: theme("colors.gray.300"),
              borderLeftColor: theme("colors.gray.700"),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
