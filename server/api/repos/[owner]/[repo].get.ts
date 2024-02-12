import type { paths } from "@octokit/openapi-types";
import { ofetch } from "ofetch";
import { title } from "radash";
import type { PackageJson } from "type-fest";
import { HOUR_12, HOUR_6, MONTH_6 } from "@/constants";

type Repository =
  paths["/repos/{owner}/{repo}"]["get"]["responses"]["200"]["content"]["application/json"];

export type RepoResponse = {
  // from page
  title: string;
  image?: string;
  // inferred from api and page
  icon?: string;
  // from api
  stars: number;
  branch: string;
  homepage?: string;
  description?: string;
  language?: string;
  license?: string;
  new?: boolean;
};

const LANGUAGE_ICONS = {
  python: "i-logos-python",
  go: "i-logos-go",
  typescript: "i-logos-typescript-icon",
  javascript: "i-logos-javascript",
  vue: "i-logos-vue",
  powershell: "i-vscode-icons-file-type-powershell",
  java: "i-logos-java",
  c: "i-logos-c",
};

const repoFileExists = async (
  owner: string,
  repo: string,
  branch: string,
  path: string,
) => {
  try {
    await ofetch.raw(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`,
      { method: "HEAD" },
    );
    return true;
  } catch (err) {
    return false;
  }
};

const getDependencies = async (owner: string, repo: string, branch: string) => {
  try {
    const data = await ofetch<PackageJson>(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/package.json`,
      { responseType: "json" },
    );

    return new Set(
      Object.keys({ ...data.dependencies, ...data.devDependencies }),
    );
  } catch (err) {
    return undefined;
  }
};

const getIcon = async (
  owner: string,
  repo: string,
  branch: string,
  language?: string | null,
) => {
  // ensure language is lowercase
  language = language?.toLowerCase();

  // attempt to get dependencies from package.json
  const deps = await getDependencies(owner, repo, branch);

  if (deps?.has("react")) return "i-logos-react";
  if (deps?.has("lit")) return "i-logos-lit-icon";
  if (deps?.has("vuetify")) return "i-logos-vuetifyjs";

  if (await repoFileExists(owner, repo, branch, "hacs.json"))
    return "i-vscode-icons-file-type-homeassistant";
  if (await repoFileExists(owner, repo, branch, "repository.json"))
    return "i-vscode-icons-file-type-homeassistant";

  return LANGUAGE_ICONS[language as keyof typeof LANGUAGE_ICONS];
};

const getMetadata = async (owner: string, repo: string) => {
  try {
    const data = await ofetch(`https://github.com/${owner}/${repo}`, {
      responseType: "text",
    });
    // extract og:image
    const image = data.match(
      /<meta property="og:image" content="(.+?)" \/>/,
    )?.[1];
    // extract title
    const title = data.match(/"level":1,"text":"(.+?)"/)?.[1];
    return { image, title };
  } catch (err) {
    return undefined;
  }
};

export default defineCachedEventHandler(
  async (event): Promise<RepoResponse> => {
    const { owner, repo } = getRouterParams(event);
    const data = await ghfetch<Repository>(`/repos/${owner}/${repo}`);
    const metadata = await getMetadata(owner, repo);
    const icon = await getIcon(owner, repo, data.default_branch, data.language);
    return {
      homepage: data.homepage || undefined,
      description: data.description || undefined,
      language: data.language || "unknown",
      license: data.license?.spdx_id || undefined,
      stars: data.stargazers_count,
      branch: data.default_branch,
      icon,
      title: metadata?.title || title(data.name),
      image: metadata?.image,
      new: new Date(data.created_at) > new Date(Date.now() - MONTH_6),
    };
  },
  {
    group: "gh",
    name: "repos",
    swr: true,
    maxAge: HOUR_6,
    staleMaxAge: HOUR_12,
  },
);
