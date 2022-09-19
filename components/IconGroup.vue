<script setup lang="ts">
interface Item {
  url: string;
  color?: string;
}

defineProps<{
  icons: Record<string, string | Item>;
}>();

const fromItem = (item: string | Item) => {
  if (typeof item === "string") {
    return { url: item };
  }
  return item;
};
</script>

<template>
  <div class="flex flex-wrap gap-2 justify-center">
    <NuxtLink
      v-for="(item, name) in icons"
      :key="name"
      :to="fromItem(item).url"
    >
      <Icon :icon="name" :style="{ color: fromItem(item).color }" />
    </NuxtLink>
  </div>
</template>

<style scoped></style>
