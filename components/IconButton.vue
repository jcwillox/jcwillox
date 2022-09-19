<script setup lang="ts">
defineProps<{
  icon: string;
  size?: string;
}>();
</script>

<template>
  <Icon
    v-bind="$props"
    class="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
  />
</template>
