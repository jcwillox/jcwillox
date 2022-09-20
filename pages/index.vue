<script setup lang="ts">
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
  <Columns class="mt-8 gap-y-16">
    <ProfileCard />
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
  </Columns>
</template>
