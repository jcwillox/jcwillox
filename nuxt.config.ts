// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  target: "static",
  modules: ["@nuxtjs/color-mode", "@nuxtjs/google-fonts", "@vueuse/nuxt"],
  css: ["@/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  typescript: {
    strict: true
  },
  googleFonts: {
    families: {
      Inter: true
    },
    download: false
  },
  build: {
    postcss: {}
  },
  colorMode: {
    classSuffix: ""
  }
});
