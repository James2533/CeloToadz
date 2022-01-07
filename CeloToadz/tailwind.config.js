const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./layouts/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#35d07f",
          200: "#f1f1f1",
          300: "#2E3338",
          400: "#FBCC5C",
        },
      },
      fontFamily: {
        serif: ["Space Grotesk", fontFamily.serif],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
