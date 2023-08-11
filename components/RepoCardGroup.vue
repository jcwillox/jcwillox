<script setup lang="ts">
import { isArray } from "radash";

defineProps<{
  title: string;
  icon: string;
  repos?: string | string[];
}>();

const toArray = (value: string | string[]) =>
  isArray(value) ? value : [value];
</script>

<template>
  <div class="flex flex-col gap-2 align-middle">
    <div class="flex items-center gap-2">
      <div :class="icon" class="icon-inline icon" />
      <span class="text-lg font-medium">{{ title }}</span>
    </div>
    <template v-if="repos">
      <RepoCard v-for="repo in toArray(repos)" :key="repo" :repo="repo" />
    </template>
  </div>
</template>
