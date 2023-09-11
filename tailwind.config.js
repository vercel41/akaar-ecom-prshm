/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Noto Sans Bengali", ...defaultTheme.fontFamily.sans],
        title: ["Hind Siliguri", ...defaultTheme.fontFamily.serif],
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        primary: "#2980B9",
        secondary: {
          700: "#00B7C9",
          800: "#00A7B8",
        },
        amber: {
          200: "#FFF6EB",
          400: "#FDBE68",
        },
        slate: {
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          700: "#334155",
          900: "#0F172A",
        },
        red: {
          500: "#EF4444",
        },
      },
      maxWidth: {
        "1/2": "50%",
      },
    },
  },
  plugins: [],
};
