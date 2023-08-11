<script setup lang="ts">
const appConfig = useAppConfig();

useHead({
  title: "Joshua Cowie-Willox",
  meta: [
    { name: "description", content: "My personal showcase website" },
    {
      property: "og:image",
      content: "https://avatars.githubusercontent.com/jcwillox",
    },
  ],
});
</script>

<template>
  <Columns class="mx-auto mt-8 max-w-768px gap-8">
    <Box>
      <Avatar
        class="mb-4 mt-1 h-96px w-96px"
        :src="`https://avatars.githubusercontent.com/${appConfig.socials.github}`"
      />

      <div class="font-semibold text-sky-700 dark:text-sky-500">
        {{ appConfig.fullname }}
      </div>

      <div class="font-medium leading-tight">
        @{{ appConfig.socials.github }}
      </div>

      <div class="mt-4 inline-flex gap-2">
        <NuxtLink
          :to="appConfig.links.github"
          class="i-line-md-github-loop icon-btn"
        />
        <NuxtLink
          :to="appConfig.links.linkedin"
          class="icon i-line-md-linkedin icon-inline c-[#0a66c2]"
        />
        <NuxtLink
          :to="appConfig.links.kofi"
          class="icon i-line-md-coffee-half-empty-twotone-loop icon-inline c-[#ff5f5f]"
        />
      </div>
    </Box>

    <Box class="flex justify-center">
      <div class="flex flex-col flex-wrap justify-center px-4 text-center">
        <div class="flex flex-wrap justify-center gap-2">
          <BrandIcon brand="python" />
          <BrandIcon brand="go" />
          <BrandIcon brand="fastapi" />
          <BrandIcon brand="typescript" />
          <BrandIcon brand="vue" />
          <BrandIcon brand="vuetifyjs" />
          <BrandIcon brand="react" />
          <!-- react native -->
          <BrandIcon brand="lit" />
          <BrandIcon brand="docker" />
          <BrandIcon brand="git" />
          <!-- <BrandIcon brand="express" /> -->
          <!-- <BrandIcon brand="flask" /> -->
          <BrandIcon brand="powershell" />
          <BrandIcon brand="java" />
          <BrandIcon brand="mariadb" />
          <BrandIcon brand="postgresql" />
          <BrandIcon brand="bash" />
        </div>
        <hr class="b-0 b-t" />
        <div class="flex flex-wrap justify-center gap-2">
          <BrandIcon brand="c" />
          <!-- assembly -->
          <BrandIcon brand="mongodb" />
          <BrandIcon brand="scala" />
          <BrandIcon brand="google-cloud" />
        </div>
      </div>
    </Box>
  </Columns>
</template>
