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
    class="flex flex-col grow rounded text-sm p-4 bg-zinc-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800"
  >
    <div class="inline-flex items-center mb-3">
      <Icon
        icon="octicon:repo-16"
        class="mr-2 text-slate-600 dark:text-zinc-400"
      />
      <NuxtLink
        :to="`https://github.com/${owner}/${name}`"
        class="text-lg font-semibold leading-tight hover:underline text-blue-600 dark:text-blue-500"
      >
        {{ name }}
      </NuxtLink>
      <div class="grow" />
      <NuxtLink
        v-if="data?.homepage"
        :to="data.homepage"
        class="self-start mt-[-3px]"
      >
        <IconButton icon="octicon:link-external-16" size="16" />
      </NuxtLink>
    </div>
    <div class="grow">
      {{ data?.description }}
    </div>
    <div class="actions flex items-center mt-2">
      <LangDot :color="data?.language" />
      <span class="capitalize">{{ data?.language || "Unknown" }}</span>

      <NuxtLink
        v-if="data?.license"
        :to="`https://github.com/${owner}/${name}/blob/${data.default_branch}/LICENSE`"
      >
        <Icon icon="octicon:law-16" size="21" class="ml-4 mr-2" />
        <span>{{ data.license.spdx_id }}</span>
      </NuxtLink>

      <NuxtLink
        v-if="data?.stargazers_count"
        :to="`https://github.com/${owner}/${name}/stargazers`"
      >
        <Icon icon="octicon:star-16" size="21" class="ml-4 mr-1" />
        <span>{{ data.stargazers_count }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
a {
  @apply no-underline;
}

.actions > a {
  @apply flex items-center;
}

.actions > a > svg {
  @apply text-slate-600 dark:text-zinc-400;
}
</style>
