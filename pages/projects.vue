<script setup lang="ts">
useHead({
  title: "Projects",
  meta: [{ name: "description", content: "A portfolio of my projects" }],
});
</script>

<template>
  <Columns :cols="3">
    <RepoCardGroup title="Python" icon="i-logos-python" repos="up-bank-api" />
    <RepoCardGroup
      title="Python"
      icon="i-logos-python"
      repos="hass-auto-backup"
    />
    <RepoCardGroup
      title="Vuetify + FastAPI"
      icon="i-logos-vuetifyjs"
      repos="deeplabcut-webui"
    />
    <RepoCardGroup
      title="React + ExpressJS"
      icon="i-logos-react"
      repos="tasky-todolist"
    />
    <RepoCardGroup
      title="React + ExpressJS"
      icon="i-logos-react"
      repos="react-poems"
    />
    <RepoCardGroup title="React Native" icon="i-logos-react" repos="WYB" />
    <RepoCardGroup
      title="Lit Element"
      icon="i-logos-lit-icon"
      repos="lovelace-paper-buttons-row"
    />
    <RepoCardGroup title="Go" icon="i-logos-go" repos="dotbot" />
    <RepoCardGroup title="Java" icon="i-logos-java" repos="ds-client" />
  </Columns>
</template>
