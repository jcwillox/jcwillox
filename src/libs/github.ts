import { Octokit } from "@octokit/rest";
import { bento } from "@/libs/cache";

export const octokit = new Octokit({ auth: import.meta.env.GITHUB_TOKEN });

export const getRepo = async (owner: string, name: string) =>
  bento.getOrSet({
    key: `getRepo:${owner}/${name}`,
    ttl: "1h",
    grace: "1d",
    timeout: "250ms",
    factory: async () => {
      const { data } = await octokit.repos.get({ owner, repo: name });
      return data;
    },
  });

export const getRepoHtml = async (repo: string) =>
  bento.getOrSet({
    key: `getRepoHtml:${repo}`,
    ttl: "1h",
    grace: "1d",
    timeout: "250ms",
    factory: async () => {
      const res = await fetch(`https://github.com/${repo}`);
      return await res.text();
    },
  });
