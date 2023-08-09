<script setup lang="ts">
withDefaults(
  defineProps<{
    cols?: string | number;
  }>(),
  { cols: 2 },
);
</script>

<template>
  <div
    class="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-2"
    :class="{ 'xl:grid-cols-3': Number(cols) > 2 }"
  >
    <slot />
  </div>
</template>

<style scoped></style>
