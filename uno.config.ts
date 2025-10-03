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
  safelist: [
    "i-logos-python",
    "i-logos-go",
    "i-logos-typescript-icon",
    "i-logos-javascript",
    "i-logos-vue",
    "i-vscode-icons-file-type-powershell",
    "i-logos-java",
    "i-logos-c",
    "i-logos-react",
    "i-logos-lit-icon",
    "i-logos-vuetifyjs",
    "i-vscode-icons-file-type-homeassistant",
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetTagify(),
    presetIcons({ warn: true }),
    presetTypography(),
    presetWebFonts({ fonts: { sans: "Inter" } }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
