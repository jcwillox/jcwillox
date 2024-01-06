<script setup lang="ts">
import { get } from "@vercel/edge-config";
import { isString } from "radash";
import { particlesOptions } from "~/utils/particles";

const appConfig = useAppConfig();
const { arrivedState } = useScroll(window, { offset: { bottom: 192 } });

const { data: repos } = await useAsyncData("edge-config-repos", () =>
  get<(string | { repo: string; image?: string; title?: string })[]>(
    "jcwillox",
  ),
);
</script>

<template>
  <div>
    <NuxtParticles id="tsparticles" :options="particlesOptions" />

    <div
      class="m-auto mt-4 max-w-lg flex items-center b rd-md bg-neutral-800/60 p-4 px-8 shadow-lg"
    >
      <NuxtImg
        :src="`https://avatars.githubusercontent.com/${appConfig.socials.github}`"
        class="rounded-full bg-contain"
        alt="avatar"
        width="64"
        height="64"
        preload
      />

      <div ml-4 grow>
        <div class="text-sky-700 font-semibold dark:text-sky-500">
          {{ appConfig.fullname }}
        </div>

        <div class="font-medium leading-tight">
          @{{ appConfig.socials.github }}
        </div>
      </div>

      <div class="inline-flex gap-2">
        <NuxtLink
          :to="appConfig.links.github"
          class="i-line-md-github-loop icon-btn"
        />
        <NuxtLink
          :to="appConfig.links.kofi"
          class="i-line-md-coffee-half-empty-twotone-loop icon-inline icon c-[#ff5f5f]"
        />
        <NuxtLink
          :to="appConfig.links.linkedin"
          class="i-line-md-linkedin icon-inline icon c-[#0a66c2]"
        />
      </div>
    </div>

    <div flex justify-center>
      <div class="grid grid-cols-1 mt-8 gap-6 lg:grid-cols-3 md:grid-cols-2">
        <RepoCard
          v-for="repo in repos"
          :key="isString(repo) ? repo : repo.repo"
          :repo="isString(repo) ? repo : repo.repo"
          :image="isString(repo) ? undefined : repo.image"
          :title="isString(repo) ? undefined : repo.title"
        />
      </div>
    </div>

    <div
      :class="{ 'translate-y-100%': arrivedState.bottom }"
      class="pointer-events-none fixed inset-x-0 bottom-0 h-128px from-black to-transparent bg-gradient-to-t transition-transform duration-200"
    />
  </div>
</template>
