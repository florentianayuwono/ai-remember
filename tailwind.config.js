/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "primary-purple": "#CDB4DB",
        "primary-lightpink": "#FFC8DD",
        "primary-pink": "#FFAFCC",
        "primary-lightblue": "#BDE0FE",
        "primary-blue": "#A2D2FF",
        "secondary-beige": "#F0EAD2",
        "secondary-lightgreen": "#DDE5B6",
        "secondary-green": "#ADC178",
        "secondary-lightbrown": "#A98467",
        "secondary-brown": "#6C584C",
        "secondary-purple": "#4e5880",
        "black-100": "#0d2518",
        "black-200": "#03250b",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #1e351f",
      },
      screens: {
        xs: "450px",
      },
    }
  },
  plugins: [],
};

