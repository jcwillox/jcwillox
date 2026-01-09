import { createClient } from "@vercel/edge-config";
import { isString } from "radashi";
import { z } from "zod";
import { appConfig } from "@/config/appConfig.ts";

const edgeConfigSchema = z.array(
  z.preprocess(
    (val) => (isString(val) ? { repo: val } : val),
    z.object({
      repo: z
        .string()
        .transform((repo) =>
          repo.startsWith(`${appConfig.socials.github}/`)
            ? repo
            : `${appConfig.socials.github}/${repo}`,
        ),
      image: z.string().optional(),
      title: z.string().optional(),
    }),
  ),
);

const client = createClient(import.meta.env.VITE_EDGE_CONFIG);

export const getEdgeConfig = async () => {
  const edgeConfig = await client.get("jcwillox");
  return edgeConfigSchema.parse(edgeConfig);
};
