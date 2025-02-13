import "eslint-plugin-only-warn";
import { createConfigForNuxt } from "@nuxt/eslint-config";
import unocss from "@unocss/eslint-config/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default createConfigForNuxt(
  {
    features: {
      tooling: true,
      typescript: true,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  {
    rules: {
      "no-var": "warn",
      "prefer-const": "warn",
      "prettier/prettier": "warn",
      quotes: [
        "warn",
        "double",
        { avoidEscape: true, allowTemplateLiterals: false },
      ],
      "sort-imports": ["warn", { ignoreDeclarationSort: true }],
      "vue/multi-word-component-names": "off",
    },
  },
)
  .prepend(unocss, eslintPluginPrettierRecommended)
  .override("nuxt/import/rules", {
    rules: {
      "import/newline-after-import": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            { pattern: "@/**", group: "internal" },
            { pattern: "~/**", group: "internal" },
          ],
          alphabetize: { order: "asc" },
        },
      ],
    },
  })
  .override("nuxt/typescript/rules", {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { caughtErrors: "none" }],
    },
  });
