/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: { min: "270px", max: "320px" },
      xms: { min: "321px", max: "375px" },
      xls: { min: "376px", max: "480px" },
      // => @media (min-width: 320px) { ... }

      sm: { min: "481px", max: "768px" },
      // => @media (min-width: 640px) { ... }
      md: { min: "769px", max: "1024px" },
      // => @media (min-width: 768px) { ... }

      lg: { min: "1025px", max: "1440px" },

      // => @media (min-width: 1024px) { ... }
      xl: { min: "1441px", max: "2500px" },
      // => @media (min-width: 1280px) { ... }
      xxl: { min: "2500px", max: "2561px" },
    },
    extend: {
      colors: {
        tahiti: {
          50: "#4b4848",
          100: "#c21d03",
          200: "#fd5732",
          300: "#ffb787",
          400: "#393939",
          500: "#1B427D",
          600: "#fbfbfb",
          700: "#f1f1f1",
          800: "#c8c8c8",
          900: "#232121",
        },
        purple: {
          100: "#445268",
        },
        br: {
          100: "#8EBB4F",
          200: "#5F6368",
        },
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      fontFamily: {
        body: ["AvantGradeBold"],
        // body: ["Raleway"],
      },
      letterSpacing: {
        body: ["0.4px"],
      },
      fontWeight: {
        body: ["400"],
      },
    },
  },
  plugins: [],
};
