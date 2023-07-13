/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        posts: "repeat(minmax(0, 500px), 2)",
      },
    },
  },
  plugins: [],
};
