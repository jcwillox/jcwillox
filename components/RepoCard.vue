<script lang="ts" setup>
const props = defineProps<{
  repo: string;
  title?: string;
  image?: string;
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
});

const image = computed(() => {
  if (props.image?.startsWith("http")) {
    return props.image;
  }
  if (props.image) {
    return `https://raw.githubusercontent.com/${owner.value}/${name.value}/main/${props.image}`;
  }
  if (data.value?.image?.startsWith("https://opengraph.githubassets.com")) {
    return undefined;
  }
  if (data.value?.image) {
    return data.value.image;
  }
});

const hasEmoji = computed(() => data.value && /^\W/.test(data.value.title));
</script>

<template>
  <div
    v-if="data"
    class="max-w-96 min-w-82 flex flex-col b rd-md shadow-lg transition-transform hover:scale-102"
    :class="{
      'b-green-5/50 bg-green-5/10': data.new,
      'bg-neutral-800/60': !data.new,
    }"
  >
    <div class="flex items-center justify-between p-4">
      <div class="flex flex-col">
        <div class="flex items-center gap-2 text-lg font-bold">
          <div
            v-if="data.icon && !hasEmoji"
            :class="data.icon"
            class="shrink-0 text-24px"
          />
          {{ title || data.title }}
        </div>

        <NuxtLink
          :to="`https://github.com/${owner}/${name}`"
          class="mt-1 text-sm text-blue-600 font-medium leading-tight dark:text-blue-500"
        >
          {{ owner }}/{{ name }}
        </NuxtLink>
      </div>

      <NuxtLink
        v-if="data.homepage"
        :to="data.homepage"
        class="i-octicon-home-16 ml-6 mr-2.5 shrink-0 text-20px decoration-none icon-btn"
      />
    </div>

    <div grow b-t p-4 text-sm>
      {{ data.description }}
    </div>

    <div v-if="image">
      <NuxtImg
        :src="image"
        height="192"
        width="382"
        fit="contain"
        loading="lazy"
        class="mx-auto h-192px b-t object-contain"
        placeholder
      />
    </div>

    <div
      class="flex b-t text-sm divide-x"
      un-children="flex items-center p-2 basis-1/3 grow justify-center"
    >
      <div>
        <LangDot :color="data.language" />
        <span class="capitalize">{{ data.language }}</span>
      </div>
      <NuxtLink
        v-if="data.license"
        :to="`https://github.com/${owner}/${name}/blob/${data.branch}/LICENSE`"
        decoration-none
      >
        <div i-octicon-law-16 mr-2 text-21px text-zinc-400 />
        <span>{{ data.license }}</span>
      </NuxtLink>
      <NuxtLink
        v-if="data.stars"
        :to="`https://github.com/${owner}/${name}/stargazers`"
      >
        <div i-octicon-star-16 mr-2 text-21px text-zinc-400 />
        <span>{{ data.stars }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
