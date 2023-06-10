<script setup lang="ts">
const appConfig = useAppConfig();
const colorMode = useColorMode();

const modes = ["light", "dark", "system"];
const cIdx = computed(() => modes.indexOf(colorMode.preference));
const navigation = {
  Home: "/",
  Projects: "/projects",
};

const nextTheme = () => {
  const nIdx = (((cIdx.value + 1) % 3) + 3) % 3;
  colorMode.preference = modes[nIdx];
};
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full backdrop-blur border-b border-slate-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80"
  >
    <div class="flex items-center px-4 py-2">
      <nav class="flex max-w-full flex-1 items-center gap-2 py-1 text-sm">
        <NuxtLink
          v-for="(link, title) of navigation"
          :key="link"
          :to="link"
          class="px-4 py-2 rounded text-sm font-semibold transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
          active-class="bg-zinc-200 dark:bg-zinc-800 shadow-inner dark:shadow-zinc-900"
        >
          {{ title }}
        </NuxtLink>
      </nav>
      <div class="flex gap-2">
        <IconButton
          v-show="cIdx === 0"
          icon="heroicons-solid:sun"
          class="cursor-pointer"
          @click="nextTheme()"
        />
        <IconButton
          v-show="cIdx === 1"
          icon="heroicons-solid:moon"
          class="cursor-pointer"
          @click="nextTheme()"
        />
        <IconButton
          v-show="cIdx === 2"
          icon="heroicons:computer-desktop-20-solid"
          class="cursor-pointer"
          @click="nextTheme()"
        />
        <div class="border-r border-slate-200 dark:border-zinc-800" />
        <NuxtLink :to="appConfig.links.github">
          <IconButton icon="mdi:github" />
        </NuxtLink>
        <NuxtLink :to="appConfig.links.linkedin">
          <IconButton icon="mdi:linkedin" />
        </NuxtLink>
        <NuxtLink :to="appConfig.links.kofi">
          <IconButton icon="mdi:coffee" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
