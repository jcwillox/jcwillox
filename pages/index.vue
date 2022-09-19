<script setup lang="ts">
useHead({
  title: "Joshua Cowie-Willox",
  meta: [
    { name: "description", content: "My personal showcase website." },
    {
      property: "og:image",
      content: "https://avatars.githubusercontent.com/jcwillox"
    }
  ]
});

const icons = {
  "logos:python": "https://python.org",
  "logos:go": "https://golang.org",
  "simple-icons:fastapi": {
    url: "https://fastapi.tiangolo.com",
    color: "#009485"
  },
  "logos:typescript-icon": "https://typescriptlang.org",
  "logos:vue": "https://vuejs.org",
  "logos:vuetifyjs": "https://vuetifyjs.com",
  "logos:react": "https://reactjs.org",
  // react native
  "logos:lit-icon": "https://lit.dev",
  "logos:docker-icon": "https://docker.com",
  "logos:git-icon": "https://git-scm.com",
  // logos:express: "https://expressjs.com",
  // logos:flask: "https://flask.palletsprojects.com",
  "vscode-icons:file-type-powershell": "https://microsoft.com/powershell",
  "logos:java": "https://java.com",
  "logos:mariadb-icon": "https://mariadb.org",
  "logos:postgresql": "https://postgresql.org",
  "logos:bash-icon": "https://gnu.org/software/bash"
};

const secondaryIcons = {
  "logos:c": "https://en.wikipedia.org/wiki/C_(programming_language)",
  // assembly
  "logos:mongodb-icon": "https://www.mongodb.com",
  "vscode-icons:file-type-scala": "https://www.scala-lang.org",
  "logos:google-cloud": "https://cloud.google.com"
};
</script>

<template>
  <Columns class="mt-8 gap-y-16">
    <ProfileCard />
    <div class="text-center flex justify-center flex-col flex-wrap px-4">
      <IconGroup :icons="icons" />
      <hr />
      <IconGroup :icons="secondaryIcons" />
    </div>
  </Columns>
</template>
