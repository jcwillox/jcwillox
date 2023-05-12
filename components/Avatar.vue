<script setup lang="ts">
const props = defineProps<{
  src: string;
  size: string;
}>();

useHead({ link: [{ rel: "preload", as: "image", href: props.src }] });
</script>

<template>
  <img
    :src="src"
    :style="{ width: size, height: size }"
    class="rounded-full bg-contain mx-auto h-auto"
    alt="avatar"
  />
</template>
