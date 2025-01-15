/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "0px",
        sm: "600px",
        md: "960px",
        lg: "1280px",
        xl: "1920px",
        "2xl": "2880px",
      },
      width: {
        65: "65%",
        35: "35%",
        50: "50%",
      },
      spacing: {
        65: "65%",
        35: "35%",
      },
      colors: {
        "cc-blue": "#1cbcba",
        primary: "#1cbcba",
        background: "#f5f5f5",
        "background-dark": "#EBEBEB",
        secondary: "#0D1120",
      },
      fontFamily: {
        heading: ["Montserrat", "san-serif"],
        body: ["Montserrat", "sans-serif"],
        h6: ["Montserrat", "sans-serif"],
        h2: ["Montserrat", "sans-serif"],
        h4: ["Montserrat", "sans-serif"],
        p: ["Montserrat", "sans-serif"],
        span: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("daisyui")],
};
