<script setup lang="ts">
import { loadIcon } from "@iconify/vue";
import { Icon as Iconify } from "@iconify/vue/offline";

const props = withDefaults(
  defineProps<{
    icon: string;
    size?: string;
  }>(),
  {
    size: "24",
  }
);

const { data } = useAsyncData(`$i${props.icon}`, () => loadIcon(props.icon), {
  watch: [() => props.icon],
});
</script>

<template>
  <Iconify :icon="data" :width="size" :height="size" class="inline-block" />
</template>
