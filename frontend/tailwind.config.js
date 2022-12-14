module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.50rem",
      "2xl": "1.75rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    fontFamily: {
      body: ["Barlow Condensed", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        orange: {
          50: "#ea5933",
        },
        green: {
          //laurel
          50: "#a9c4b5",
        },
        brown: {
          //tierra
          50: "#c7baae",
          //arcilla
          100: "#ddbdb0",
        },
        black: {
          //petrol
          50: "#22281B",
        },
        gray: {
          50: "#7F847A",
        },
        white: {
          //sand
          50: "#C7BAAE",
          //camel
          100: "#F5F1E9",
        },
      },
    },
  },
  plugins: [],
};
