import { HOUR_1 } from "./constants";

const ghRaw = (repo: string, path: string) =>
  `https://github.com/jcwillox/${repo}/raw/main/${path}`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vueuse/nuxt", "@unocss/nuxt", "@nuxt/image", "nuxt-particles"],
  css: ["@unocss/reset/tailwind.css", "~/assets/css/global.css"],
  features: {
    inlineStyles: false,
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
  routeRules: {
    "/": { isr: HOUR_1 },
    "/l/syslink": {
      redirect: ghRaw("system-link", "scripts/install-system-link.sh"),
    },
    "/l/syslink-ps1": {
      redirect: ghRaw("system-link", "scripts/install-system-link.ps1"),
    },
  },
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
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
});
