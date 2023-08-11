<script setup lang="ts">
defineProps<{
  color?: string | null;
}>();

const colors: Record<string, string> = {
  python: "#3572a5",
  typescript: "#3178c6",
  javascript: "#f1e05a",
  go: "#00add8",
  "c#": "#178600",
  powershell: "#012456",
  vue: "#41b883",
  java: "#b07219",
};
</script>

<template>
  <div
    class="mr-2 h-4 w-4 rounded-full bg-gray-600"
    :style="{
      'background-color': color ? colors[color.toLowerCase()] : undefined,
    }"
  />
</template>
