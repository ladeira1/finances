/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./imports/ui/**/*.{js,jsx,ts,tsx}", "./client/*.html"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
      },
    },
  },
  plugins: [],
};
