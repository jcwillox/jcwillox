<template>
  <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <Link rel="manifest" href="/site.webmanifest" />

  <div class="font-sans">
    <Navigation />
    <NuxtLoadingIndicator />

    <div
      class="m-auto max-w-screen-lg px-4 pb-8 pt-4 line-height-7 prose prose-gray xl:max-w-screen-xl sm:px-8 dark:prose-invert"
    >
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="postcss">
.dark {
  color-scheme: dark;
}

.dark body {
  @apply text-zinc-200 bg-[#0a0a0a];
}

.light pre {
  --tw-prose-pre-bg: theme("colors.slate.50");
}

h2 a,
h3 a,
h4 a {
  @apply no-underline !important;
}
</style>
