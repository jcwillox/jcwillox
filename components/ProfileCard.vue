<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="inline-block px-8 py-10 rounded-xl text-center bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur shadow-lg dark:shadow-zinc-900"
    >
      <div
        class="rounded-full w-24 h-24 bg-contain mt-1 mb-4 mx-auto"
        :style="{
          'background-image': `url('https://avatars.githubusercontent.com/${appConfig.socials.github}')`
        }"
      />

      <div class="text-sky-700 dark:text-sky-500 font-semibold">
        {{ appConfig.fullname }}
      </div>

      <div class="font-medium leading-tight">
        @{{ appConfig.socials.github }}
      </div>

      <div class="inline-flex gap-2 mt-4">
        <NuxtLink :to="appConfig.links.github">
          <IconButton icon="mdi:github" size="24" />
        </NuxtLink>
        <NuxtLink :to="appConfig.links.linkedin">
          <IconButton icon="mdi:linkedin" size="24" />
        </NuxtLink>
        <NuxtLink :to="appConfig.links.kofi">
          <IconButton icon="mdi:coffee" size="24" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
