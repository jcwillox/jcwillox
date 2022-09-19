const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `components/**/*.vue`,
    `content/**/*.md`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.ts`,
    `plugins/**/*.ts`,
    `app.vue`,
    "nuxt.config.ts",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
