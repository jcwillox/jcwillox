<script setup lang="ts">
import { Icon } from "@iconify/vue";

withDefaults(
  defineProps<{
    icon: string;
    size?: string;
  }>(),
  {
    size: "24"
  }
);
</script>

<template>
  <Icon :icon="icon" :width="size" :height="size" class="inline-block" />
</template>
