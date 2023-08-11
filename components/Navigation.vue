<script setup lang="ts">
const appConfig = useAppConfig();
const colorMode = useColorMode();

const navigation = {
  Home: "/",
  Projects: "/projects",
};

const nextTheme = () => {
  const modes = ["light", "dark", "system"];
  const theme = colorMode.preference;
  const idx = ((theme ? modes.indexOf(theme) : -1) + 1) % modes.length;
  colorMode.preference = modes[idx];
};
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full border-b border-slate-200 bg-zinc-100/80 backdrop-blur dark:(border-zinc-800 bg-zinc-900/80)"
  >
    <div class="flex items-center px-4 py-2">
      <nav class="max-w-full flex flex-1 items-center gap-2 py-1 text-sm">
        <NuxtLink
          v-for="(link, title) of navigation"
          :key="link"
          :to="link"
          class="rounded px-4 py-2 text-sm font-semibold transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
          active-class="bg-zinc-200 shadow-inner dark:(bg-zinc-800 shadow-zinc-900)"
        >
          {{ title }}
        </NuxtLink>
      </nav>
      <div class="flex gap-2">
        <button
          :data-state="colorMode.preference"
          class="i-heroicons-sun-solid data-[state=dark]:i-heroicons-moon-solid data-[state=system]:i-heroicons-computer-desktop-solid !icon-btn"
          @click="nextTheme()"
        />
        <div class="border-r border-slate-200 dark:border-zinc-800" />
        <NuxtLink :to="appConfig.links.github" class="i-mdi-github icon-btn" />
        <NuxtLink
          :to="appConfig.links.linkedin"
          class="i-mdi-linkedin icon-btn"
        />
        <NuxtLink :to="appConfig.links.kofi" class="i-mdi-coffee icon-btn" />
      </div>
    </div>
  </header>
</template>
