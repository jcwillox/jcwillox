import type { paths } from "@octokit/openapi-types";
import { ghfetch } from "~/server/utils/github";

type Repository =
  paths["/repos/{owner}/{repo}"]["get"]["responses"]["200"]["content"]["application/json"];

export default defineCachedEventHandler(
  (event) => {
    const { owner, repo } = event.context.params || {};
    return ghfetch<Repository>(`/repos/${owner}/${repo}`);
  },
  {
    group: "gh",
    name: "repos",
    swr: true,
    maxAge: 60 * 60 * 6, // 6 hours
    staleMaxAge: 60 * 60 * 12, // 12 hours
  }
);
