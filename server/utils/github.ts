import { ofetch } from "ofetch";
import { HOUR_12, HOUR_6 } from "~/constants";

const { GITHUB_TOKEN } = useRuntimeConfig();

export const ghfetch = defineCachedFunction(
  ofetch.create({
    baseURL: "https://api.github.com",
    headers: {
      ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
    },
    onResponse({ request, response, options }) {
      const limit = response.headers.get("X-RateLimit-Limit");
      const remaining = response.headers.get("X-RateLimit-Remaining");
      if (limit && remaining) {
        const pathname = request.toString().replace(options.baseURL + "/", "");
        console.debug(`gh: ${pathname} (${remaining}/${limit})`);
      }
    },
  }),
  {
    group: "gh",
    name: "fetch",
    swr: true,
    maxAge: HOUR_6,
    staleMaxAge: HOUR_12,
  },
);
