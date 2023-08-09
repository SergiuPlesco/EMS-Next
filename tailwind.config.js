/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
    },
    colors: {
      purple: "#662D91",
      green: "#8DC63F",
      ruby: "#A12064",
      black: "#000000",
      white: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#d3d3d3",
    },
    border: {
      primary: "#efefef",
      secondary: "#d3d3d3",
    },
    background: {
      primary: "#ffffff",
    },
  },
  plugins: [],
};
