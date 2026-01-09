import { Octokit } from "@octokit/rest";
import { cacheFn } from "./cache.ts";

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const getRepo = async (owner: string, repo: string) =>
  cacheFn(`repo-${owner}-${repo}`, async () => {
    const { data } = await octokit.repos.get({ owner, repo });
    return data;
  });

export const getRepoHtml = async (repo: string) =>
  cacheFn(`repo-html-${repo}`, async () => {
    const res = await fetch(`https://github.com/${repo}`);
    return await res.text();
  });
