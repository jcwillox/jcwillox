<script setup lang="ts">
const props = defineProps<{
  src: string;
  size: string;
}>();

useHead({ link: [{ rel: "preload", as: "image", href: props.src }] });
</script>

<template>
  <img
    class="rounded-full bg-contain mx-auto h-auto"
    :src="src"
    :style="{ width: size }"
  />
</template>
