const plugin = require("tailwindcss/plugin");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
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
      electricIndigo: "#6C02F3",
      lightBlack: "#000000a8",
      // darkMode
      deepViolet: { 100: "#300051", 200: "#3B0065" },
      darkGunmetal: "#1D212A",
      CharlestonGreen: "#242831",
      Crayola: "#31353E",
      light: "#ffffff14",
      gold: "#FFB400",
      drawerColor: "#1D212AD6",
      lightText: "#FFFFFF80",
      chipColor: "#C5A2FF",
      placeholder: "#ffffff26",
      navLine: "#fdfdfd4d",
      borderColor: "#ffffff8f",
    },
    fontSize: {
      sm: "1.2rem",
      base: "1.4rem",
      xl: "1.5rem",
      "2xl": "1.6rem",
      "3xl": "2rem",
      "4xl": "3.2rem",
      "5xl": "6.4rem",
    },
    borderRadius: {
      none: "0",
      DEFAULT: "10px",
      sm: "18px",
      md: "20px",
      lg: "22px",
      full: "9999px",
      large: "12px",
    },
    fontFamily: {
      sans: ["var(--font-TOMMY)"],
    },
    boxShadow: { "3xl": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" },
  },

  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "10px" },
      });
    }),
  ],
});
