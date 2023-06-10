<script setup lang="ts">
interface Item {
  icon: string;
  link: string;
  props?: Record<string, unknown>;
}

const items = {
  python: {
    icon: "logos:python",
    link: "https://python.org",
  },
  go: {
    icon: "logos:go",
    link: "https://golang.org",
  },
  fastapi: {
    icon: "simple-icons:fastapi",
    link: "https://fastapi.tiangolo.com",
    props: { style: "color: #009485" },
  },
  typescript: {
    icon: "logos:typescript-icon",
    link: "https://typescriptlang.org",
  },
  vue: {
    icon: "logos:vue",
    link: "https://vuejs.org",
  },
  vuetifyjs: {
    icon: "logos:vuetifyjs",
    link: "https://vuetifyjs.com",
  },
  react: {
    icon: "logos:react",
    link: "https://reactjs.org",
  },
  lit: {
    icon: "logos:lit-icon",
    link: "https://lit.dev",
  },
  docker: {
    icon: "logos:docker-icon",
    link: "https://docker.com",
  },
  git: {
    icon: "logos:git-icon",
    link: "https://git-scm.com",
  },
  express: {
    icon: "logos:express",
    link: "https://expressjs.com",
  },
  flask: {
    icon: "logos:flask",
    link: "https://flask.palletsprojects.com",
  },
  powershell: {
    icon: "vscode-icons:file-type-powershell",
    link: "https://microsoft.com/powershell",
  },
  java: {
    icon: "logos:java",
    link: "https://java.com",
  },
  mariadb: {
    icon: "logos:mariadb-icon",
    link: "https://mariadb.org",
  },
  postgresql: {
    icon: "logos:postgresql",
    link: "https://postgresql.org",
  },
  bash: {
    icon: "logos:bash-icon",
    link: "https://gnu.org/software/bash",
  },
  c: {
    icon: "logos:c",
    link: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  mongodb: {
    icon: "logos:mongodb-icon",
    link: "https://mongodb.com",
  },
  scala: {
    icon: "vscode-icons:file-type-scala",
    link: "https://scala-lang.org",
  },
  "google-cloud": {
    icon: "logos:google-cloud",
    link: "https://cloud.google.com",
  },
};

const items_: Record<string, Item> = items;

defineProps<{
  brand: keyof typeof items;
}>();
</script>

<template>
  <NuxtLink :to="items_[brand].link">
    <Icon :icon="items_[brand].icon" v-bind="items_[brand].props" />
  </NuxtLink>
</template>
