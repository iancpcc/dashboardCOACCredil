/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {

      colors: {
        primary: "#18202C",
        secondary: "#4a69bd",
        tertiary: "#2A3F54",
        body_bg:"#f1f2f6",
        text_color: "#ffffff",
        text_alternative: "#ecf0f1",
        text_link_hover : "#e8ba4d"
      },
      spacing:{
        small: "0.5rem", //8px
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        arial: ['Arial', 'sans-serif'],
        serif: ["Georgia", "serif"],
        mono: ["Fira Code", "monospace"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
