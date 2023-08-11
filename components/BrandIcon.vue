<script setup lang="ts">
const items: Record<string, { icon: string; link: string }> = {
  python: {
    icon: "i-logos-python",
    link: "https://python.org",
  },
  go: {
    icon: "i-logos-go",
    link: "https://golang.org",
  },
  fastapi: {
    icon: "i-simple-icons-fastapi c-[#009485]",
    link: "https://fastapi.tiangolo.com",
  },
  typescript: {
    icon: "i-logos-typescript-icon",
    link: "https://typescriptlang.org",
  },
  vue: {
    icon: "i-logos-vue",
    link: "https://vuejs.org",
  },
  vuetifyjs: {
    icon: "i-logos-vuetifyjs",
    link: "https://vuetifyjs.com",
  },
  react: {
    icon: "i-logos-react",
    link: "https://reactjs.org",
  },
  lit: {
    icon: "i-logos-lit-icon",
    link: "https://lit.dev",
  },
  docker: {
    icon: "i-logos-docker-icon",
    link: "https://docker.com",
  },
  git: {
    icon: "i-logos-git-icon",
    link: "https://git-scm.com",
  },
  express: {
    icon: "i-logos-express",
    link: "https://expressjs.com",
  },
  flask: {
    icon: "i-logos-flask",
    link: "https://flask.palletsprojects.com",
  },
  powershell: {
    icon: "i-vscode-icons-file-type-powershell",
    link: "https://microsoft.com/powershell",
  },
  java: {
    icon: "i-logos-java",
    link: "https://java.com",
  },
  mariadb: {
    icon: "i-logos-mariadb-icon",
    link: "https://mariadb.org",
  },
  postgresql: {
    icon: "i-logos-postgresql",
    link: "https://postgresql.org",
  },
  bash: {
    icon: "i-logos-bash-icon",
    link: "https://gnu.org/software/bash",
  },
  c: {
    icon: "i-logos-c",
    link: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  mongodb: {
    icon: "i-logos-mongodb-icon",
    link: "https://mongodb.com",
  },
  scala: {
    icon: "i-vscode-icons-file-type-scala",
    link: "https://scala-lang.org",
  },
  "google-cloud": {
    icon: "i-logos-google-cloud",
    link: "https://cloud.google.com",
  },
};

defineProps<{
  brand: keyof typeof items;
}>();
</script>

<template>
  <NuxtLink
    :to="items[brand].link"
    :class="items[brand].icon"
    class="icon-inline icon"
  />
</template>
