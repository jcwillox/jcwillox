<script setup lang="ts">
const appConfig = useAppConfig();

useHead({
  title: "Joshua Cowie-Willox",
  meta: [
    { name: "description", content: "My personal showcase website" },
    {
      property: "og:image",
      content: "https://avatars.githubusercontent.com/jcwillox"
    }
  ]
});
</script>

<template>
  <Columns class="mt-8 gap-y-8 mx-auto" style="gap: 2rem; max-width: 768px">
    <Box>
      <Avatar
        size="96px"
        class="mt-1 mb-4"
        :src="`https://avatars.githubusercontent.com/${appConfig.socials.github}`"
      />

      <div class="text-sky-700 dark:text-sky-500 font-semibold">
        {{ appConfig.fullname }}
      </div>

      <div class="font-medium leading-tight">
        @{{ appConfig.socials.github }}
      </div>

      <div class="inline-flex gap-2 mt-4">
        <NuxtLink :to="appConfig.links.github">
          <IconButton icon="line-md:github-loop" />
        </NuxtLink>
        <NuxtLink :to="appConfig.links.linkedin">
          <IconButton icon="line-md:linkedin" style="color: #0a66c2" />
        </NuxtLink>
        <NuxtLink :to="appConfig.links.kofi">
          <IconButton
            icon="line-md:coffee-half-empty-twotone-loop"
            style="color: #ff5f5f"
          />
        </NuxtLink>
      </div>
    </Box>

    <Box class="flex justify-center">
      <div class="text-center flex justify-center flex-col flex-wrap px-4">
        <div class="flex flex-wrap gap-2 justify-center">
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
        <hr style="margin-top: 2rem; margin-bottom: 2rem" />
        <div class="flex flex-wrap gap-2 justify-center">
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
