import { z } from "zod";

const packageJsonSchema = z.object({
  dependencies: z.record(z.string(), z.string()).optional(),
  devDependencies: z.record(z.string(), z.string()).optional(),
});

export async function getDependencies(repo: string, branch: string) {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${repo}/${branch}/package.json`,
    );
    if (!res.ok) return undefined;
    const pkg = packageJsonSchema.parse(await res.json());
    const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
    return new Set(deps);
  } catch (_err) {
    return undefined;
  }
}
