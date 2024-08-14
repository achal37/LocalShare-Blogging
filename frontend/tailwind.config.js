/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sblue: "#89ABE3FF",
        cwhite: "#FCF6F5FF",
      },
    },
  },
  plugins: [],
};
