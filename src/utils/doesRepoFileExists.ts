export async function doesRepoFileExists(
  repo: string,
  branch: string,
  path: string,
) {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${repo}/${branch}/${path}`,
      { method: "HEAD" },
    );
    return res.ok;
  } catch (_err) {
    return false;
  }
}
