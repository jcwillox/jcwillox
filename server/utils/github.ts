const { GITHUB_TOKEN } = useRuntimeConfig();

export const ghfetch = $fetch.create({
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
});
