const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // lightMode
      mango: "#FDC929",
      purple: "#7763AB",
      white: "#FFFFFF",
      orchid: "#D19CC7",
      black: "#000001",
      lightBlue: "#7344FF",
      lavender: "#8B44FF",
      blueViolet: "#56418C",
      smoke: "#F9F7FF",
      // darkMode
      deepViolet: { 100: "#300051", 200: "#3B0065" },
      darkGunmetal: "#1D212A",
      CharlestonGreen: "#242831",
      Crayola: "#31353E",
    },
    fontSize: {
      base: "1.4rem",
      xl: "1.5rem",
      "2xl": "1.6rem",
      "3xl": "2rem",
      "4xl": "3.2rem",
      "5xl": "6.4rem",
    },
    borderRadius: {
      none: "0",
      sm: "18px",
      md: "20px",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
    },
  },

  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "10px" },
      });
    }),
  ],
};
