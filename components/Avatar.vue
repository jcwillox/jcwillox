<script setup lang="ts">
defineProps<{
  size: string;
  src: string;
}>();
</script>

<template>
  <div
    class="rounded-full bg-contain mx-auto"
    :style="{
      width: size,
      height: size,
      'background-image': `url('${src}')`
    }"
  ></div>
</template>
