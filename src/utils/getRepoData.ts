import * as Sentry from "@sentry/tanstackstart-react";
import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { title } from "radashi";
import { z } from "zod";
import { appConfig } from "@/config/appConfig.ts";
import { MONTH_6 } from "@/constants";
import { getRepo } from "@/libs/github.ts";
import { getMetadata } from "./getRepoMetadata.ts";

export const getRepoData = createServerFn()
  .inputValidator(
    z.object({
      repo: z.string().startsWith(`${appConfig.socials.github}/`),
    }),
  )
  .handler(async ({ data: { repo } }) => {
    return Sentry.startSpan({ name: "getRepoData" }, async () => {
      const [owner, name] = repo.split("/");
      const data = await getRepo(owner, name);
      const metadata = await getMetadata(
        repo,
        data.default_branch,
        data.language,
      );
      setResponseHeader(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=86400",
      );
      return {
        homepage: data.homepage,
        description: data.description,
        language: data.language || "unknown",
        license: data.license?.spdx_id,
        stars: data.stargazers_count,
        branch: data.default_branch,
        icon: metadata.icon,
        title: metadata.title || title(data.name),
        image: metadata.image,
        new: new Date(data.created_at) > new Date(Date.now() - MONTH_6),
        url: data.html_url,
        owner,
        name,
        repo,
      };
    });
  });
