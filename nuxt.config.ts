// https://nuxt.com/docs/getting-started/configuration#nuxt-configuration

import type { NuxtConfig } from "@nuxt/schema";

const config: NuxtConfig = {
  modules: [
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
  ],
  plugins: [
    {
      src: "~/plugins/vercel.ts",
      mode: "client",
    },
  ],
  googleFonts: {
    families: {
      Inter: true,
    },
  },
  colorMode: {
    classSuffix: "",
  },
};

export default config;
