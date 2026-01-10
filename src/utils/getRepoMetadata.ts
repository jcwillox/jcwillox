import { bento } from "@/libs/cache";
import { getRepoHtml } from "@/libs/github.ts";
import { doesRepoFileExists } from "@/utils/doesRepoFileExists.ts";
import { getDependencies } from "@/utils/getDependencies.ts";

const LANGUAGE_ICONS = {
  python: "i-[logos--python]",
  go: "i-[logos--go]",
  typescript: "i-[logos--typescript-icon]",
  javascript: "i-[logos--javascript]",
  vue: "i-[logos--vue]",
  powershell: "i-[vscode-icons--file-type-powershell]",
  java: "i-[logos--java]",
  c: "i-[logos--c]",
};

const getIcon = async (
  repo: string,
  branch: string,
  language?: string | null,
) =>
  bento.getOrSet({
    key: `getIcon:${repo}/${branch}:${language}`,
    ttl: "1h",
    grace: "1d",
    timeout: "250ms",
    factory: async () => {
      // attempt to get dependencies from package.json
      const deps = await getDependencies(repo, branch);

      if (deps?.has("react")) return "i-[logos--react]";
      if (deps?.has("lit")) return "i-[logos--lit-icon]";
      if (deps?.has("vuetify")) return "i-[logos--vuetifyjs]";

      if (await doesRepoFileExists(repo, branch, "hacs.json"))
        return "i-[vscode-icons--file-type-homeassistant]";
      if (await doesRepoFileExists(repo, branch, "repository.json"))
        return "i-[vscode-icons--file-type-homeassistant]";

      // ensure language is lowercase
      language = language?.toLowerCase();

      return language && language in LANGUAGE_ICONS
        ? LANGUAGE_ICONS[language as keyof typeof LANGUAGE_ICONS]
        : null;
    },
  });

export const getMetadata = async (
  repo: string,
  branch: string,
  language?: string | null,
) => {
  try {
    const [icon, data] = await Promise.all([
      getIcon(repo, branch, language),
      getRepoHtml(repo),
    ]);
    // extract og:image
    const image = data.match(
      /<meta property="og:image" content="(.+?)" \/>/,
    )?.[1];
    // extract title
    const title = data.match(/"level":1,"text":"(.+?)"/)?.[1];
    return { image, title, icon };
  } catch (_err) {
    return { image: undefined, title: undefined, icon: undefined };
  }
};
