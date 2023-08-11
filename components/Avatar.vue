<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();

useHead({ link: [{ rel: "preload", as: "image", href: props.src }] });
</script>

<template>
  <img :src="src" class="mx-auto h-auto rounded-full bg-contain" alt="avatar" />
</template>
