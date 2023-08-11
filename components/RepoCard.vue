<script lang="ts" setup>
const props = defineProps<{
  repo: string;
}>();

const appConfig = useAppConfig();

const owner = computed(() =>
  props.repo.includes("/")
    ? props.repo.split("/", 1)[0]
    : appConfig.socials.github,
);
const name = computed(() =>
  props.repo.includes("/") ? props.repo.split("/", 2)[1] : props.repo,
);

const { data } = await useFetch(`/api/repos/${owner.value}/${name.value}`, {
  key: `gh-${owner.value}-${name.value}`,
  pick: [
    "description",
    "stargazers_count",
    "language",
    "license",
    "homepage",
    "default_branch",
    "html_url",
  ],
});
</script>

<template>
  <div
    class="not-prose flex grow flex-col border border-slate-200 rounded bg-zinc-50 p-4 text-sm dark:(border-zinc-800 bg-zinc-900)"
  >
    <div class="mb-3 inline-flex items-center">
      <span
        class="i-octicon-repo-16 mr-2 text-24px text-slate-600 dark:text-zinc-400"
      />
      <NuxtLink
        :to="`https://github.com/${owner}/${name}`"
        class="text-lg font-semibold leading-tight text-blue-600 dark:text-blue-500 hover:underline"
      >
        {{ name }}
      </NuxtLink>
      <div class="grow" />
      <NuxtLink
        v-if="data?.homepage"
        :to="data.homepage"
        class="i-octicon-link-external-16 self-start text-16px icon-btn"
      />
    </div>
    <div class="grow">
      {{ data?.description }}
    </div>
    <div class="actions mt-2 flex items-center">
      <LangDot :color="data?.language" />
      <span class="capitalize">{{ data?.language || "Unknown" }}</span>

      <NuxtLink
        v-if="data?.license"
        :to="`https://github.com/${owner}/${name}/blob/${data.default_branch}/LICENSE`"
      >
        <span class="i-octicon-law-16 ml-4 mr-2 text-21px" />
        <span>{{ data.license.spdx_id }}</span>
      </NuxtLink>

      <NuxtLink
        v-if="data?.stargazers_count"
        :to="`https://github.com/${owner}/${name}/stargazers`"
      >
        <span class="i-octicon-star-16 ml-4 mr-1 text-21px" />
        <span>{{ data.stargazers_count }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.actions > a {
  @apply flex items-center;
}

.actions > a > span[class^="i-"] {
  @apply text-slate-600 dark:text-zinc-400;
}
</style>
