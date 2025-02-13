import { HOUR_1 } from "./constants";

const ghRaw = (repo: string, path: string) =>
  `https://github.com/jcwillox/${repo}/raw/main/${path}`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vueuse/nuxt", "@unocss/nuxt", "@nuxt/image", "nuxt-particles"],
  devtools: { enabled: true },
  css: ["@unocss/reset/tailwind.css", "~/assets/css/global.css"],
  runtimeConfig: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  routeRules: {
    "/": { isr: HOUR_1 },
    "/l/syslink": {
      redirect: ghRaw("system-link", "scripts/install-system-link.sh"),
    },
    "/l/syslink-ps1": {
      redirect: ghRaw("system-link", "scripts/install-system-link.ps1"),
    },
  },
  features: {
    inlineStyles: false,
  },
  compatibilityDate: "2025-02-13",
  nitro: {
    storage: {
      cache: {
        driver: "vercelKV",
      },
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) =>
            id.includes("/@tsparticles/") ? "tsparticles" : undefined,
        },
      },
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
});
