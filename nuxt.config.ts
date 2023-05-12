// https://nuxt.com/docs/getting-started/configuration#nuxt-configuration

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt"
  ],
  googleFonts: {
    families: {
      Inter: true
    }
  },
  colorMode: {
    classSuffix: ""
  }
});
