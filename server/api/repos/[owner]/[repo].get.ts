import type { paths } from "@octokit/openapi-types";
import { pick } from "radash";
import { HOUR_12, HOUR_6 } from "~/constants";

type Repository =
  paths["/repos/{owner}/{repo}"]["get"]["responses"]["200"]["content"]["application/json"];

export default defineCachedEventHandler(
  async (event) => {
    const { owner, repo } = event.context.params || {};
    const data = await ghfetch<Repository>(`/repos/${owner}/${repo}`);
    return pick(data, [
      "description",
      "stargazers_count",
      "language",
      "license",
      "homepage",
      "default_branch",
      "html_url",
    ]);
  },
  {
    group: "gh",
    name: "repos",
    swr: true,
    maxAge: HOUR_6,
    staleMaxAge: HOUR_12,
  }
);
