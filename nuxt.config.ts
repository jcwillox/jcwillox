// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
  ],
  googleFonts: {
    families: {
      Inter: true,
    },
  },
  colorMode: {
    classSuffix: "",
  },
  nitro: {
    storage: {
      cache: {
        driver: "vercelKV",
      },
    },
  },
  runtimeConfig: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  devtools: true,
  typescript: {
    strict: true,
    typeCheck: true,
  },
});
