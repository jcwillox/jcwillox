<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
useServerHead({
  link: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
});
useServerSeoMeta({
  title: "Joshua Cowie-Willox",
  ogTitle: "Joshua Cowie-Willox",
  description: "My personal showcase website",
  ogDescription: "My personal showcase website",
  ogImage: "https://avatars.githubusercontent.com/jcwillox",
});
</script>

<template>
  <SpeedInsights />
  <div class="[--un-default-border-color:#525252] text-white font-sans">
    <NuxtLoadingIndicator />
    <div class="p-4 pb-12 sm:px-12">
      <NuxtPage />
    </div>
  </div>
</template>
