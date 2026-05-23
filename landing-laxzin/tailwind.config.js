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
        primary: {
          100: "#756868",

          300: "#332e2e",

          500: "#000",
        },
      },
      fontFamily: {
        // body: ["Raleway"],
      },
    },
  },
  plugins: [],
};
