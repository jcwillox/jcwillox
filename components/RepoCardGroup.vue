<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
  repo?: string;
  repos?: string[];
}>();
</script>

<template>
  <div class="flex flex-col gap-2 align-middle">
    <div class="flex gap-2 items-center">
      <Icon :icon="icon" />
      <span class="text-lg font-medium">{{ title }}</span>
    </div>
    <RepoCard v-if="repo" :repo="repo" />
    <RepoCard v-if="repos" v-for="repo in repos" :key="repo" :repo="repo" />
  </div>
</template>
