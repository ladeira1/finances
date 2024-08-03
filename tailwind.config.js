/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./imports/ui/**/*.{js,jsx,ts,tsx}", "./client/*.html"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
      },
    },
    translate: {
      x: {
        "50-negative": "translateX(-50%)",
      },
      y: {
        "50-negative": "translateY(-50%)",
      },
    },
  },
  plugins: [],
};
