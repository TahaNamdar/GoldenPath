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
    screens: {
      "3xl": "1600px",
      "4xl": "1900px",
      "5xl": "1960px",
      "1sm": "440px",
    },

    scale: {
      180: "1.8",
    },

    colors: {
      white: "#FFFFFF",
      orchid: "#D19CC7",
      black: "#000001",
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
      input: "#0d0d0d4d",
      danger: "#EA4335",
      homeColor: "#17191D",
      navBar: "#4a4a4a30",
      homeColor: "#17191d",
      banner: "#070708",
      layoutColor: "#1F1F21",
      customYellow: "#FFB400",
      footerColor: "#ffffff99",
      copyRightColor: "#ffffff5e",
      smallBox: "#3131318a",
      editor: "#ffffff7d",
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
