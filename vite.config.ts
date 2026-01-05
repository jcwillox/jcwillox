import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import autoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const ghRaw = (repo: string, path: string) =>
  `https://github.com/jcwillox/${repo}/raw/main/${path}`;

const config = defineConfig({
  plugins: [
    devtools(),
    nitro({
      routeRules: {
        "/l/syslink": {
          redirect: ghRaw("system-link", "scripts/install-system-link.sh"),
        },
        "/l/syslink-ps1": {
          redirect: ghRaw("system-link", "scripts/install-system-link.ps1"),
        },
        "/l/node-alias": {
          redirect: ghRaw("node-alias", "scripts/install-node-alias.sh"),
        },
        "/l/node-alias-ps1": {
          redirect: ghRaw("node-alias", "scripts/install-node-alias.ps1"),
        },
      },
    }),
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    autoImport({
      dts: "src/types/auto-imports.d.ts",
      imports: ["react"],
    }),
  ],
});

export default config;
