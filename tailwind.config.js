/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  // purge: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [
    "./src/**/*.tsx",
    "./src/**/*.ts",
    "./node_modules/keycloakify/**/*.js",
    "./node_modules/keycloakify/**/*.jsx",
    "./.storybook/**/*.{js,jsx,ts,tsx}" // Ensure Storybook files are included
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        battambang: ["var(--font-battambang)", "monospace"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        // NEW THEME
        "theme-violet": "#5613BF",
        "theme-violet-2": "#6b3bc5",
        "theme-violet-light": "#f2eef8",
        "theme-pink": "#EBDAFD",
        "theme-pink-2": "#EDE0F9",
        "theme-pink-3": "#F5EBFF",
        "theme-pink-4": "#F5ECFF",
        "theme-charcoal": "#444444",

        "theme-light": "#FFFFF8",
        "theme-light-dark": "#bfc5cb",

        "theme-blue": "#4B56D2",
        "theme-aqua": "#82C3EC",
        "theme-dark": "#1c252e",
      },
      boxShadow: {
        theme:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        "theme-hover":
          "rgba(145, 158, 171, 0.35) 0px 0px 4px 0px, rgba(145, 158, 171, 0.2) 0px 36px 52px -6px",
        "theme-up":
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px -12px 24px -4px",
        "theme-hover-up":
          "rgba(145, 158, 171, 0.35) 0px 0px 4px 0px, rgba(145, 158, 171, 0.2) 0px -36px 52px -6px",
      },
      backgroundImage: {
        "gradient-theme":
          "linear-gradient(139.09deg, #C343FF 20.53%, #9225FF 57.11%, #6100FF 90.89%)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
};
