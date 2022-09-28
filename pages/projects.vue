<script setup lang="ts">
useHead({
  title: "Projects",
  meta: [{ name: "description", content: "A portfolio of my projects" }]
});
</script>

<template>
  <Columns :cols="3">
    <RepoCardGroup title="Python" icon="logos:python" repo="up-bank-api" />
    <RepoCardGroup title="Python" icon="logos:python" repo="hass-auto-backup" />
    <RepoCardGroup
      title="Vuetify + FastAPI"
      icon="logos:vuetifyjs"
      repo="deeplabcut-webui"
    />
    <RepoCardGroup
      title="React + ExpressJS"
      icon="logos:react"
      repo="tasky-todolist"
    />
    <RepoCardGroup
      title="React + ExpressJS"
      icon="logos:react"
      repo="react-poems"
    />
    <RepoCardGroup title="React Native" icon="logos:react" repo="WYB" />
    <RepoCardGroup
      title="Lit Element"
      icon="logos:lit-icon"
      repo="lovelace-paper-buttons-row"
    />
    <RepoCardGroup title="Go" icon="logos:go" repo="dotbot" />
    <RepoCardGroup title="Java" icon="logos:java" repo="ds-client" />
  </Columns>
</template>
