// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vueuse/nuxt", "@unocss/nuxt", "@nuxtjs/color-mode"],
  css: ["@unocss/reset/tailwind.css"],
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
