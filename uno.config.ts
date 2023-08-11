import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: {
    icon: "text-24px",
    "icon-inline": "inline-block align-middle",
    "icon-btn":
      "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 text-24px align-middle inline-block",
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetTagify(),
    presetIcons({ cdn: "https://esm.sh/", warn: true }),
    presetTypography(),
    presetWebFonts({ fonts: { sans: "Inter" } }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
