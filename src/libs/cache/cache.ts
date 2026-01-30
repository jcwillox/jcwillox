/** biome-ignore-all lint/correctness/useHookAtTopLevel: not hooks */
import "./tracing.ts";
import { waitUntil } from "@vercel/functions";
import { BentoCache, bentostore } from "bentocache";
import { fileDriver } from "bentocache/drivers/file";
import type { GetOrSetOptions } from "bentocache/types";
import { log } from "../logging.ts";
import { upstashDriver } from "./upstashDriver.ts";

export const bento = new BentoCache({
  default: import.meta.env.DEV ? "filesystem" : "upstash",
  waitUntil: (promise) => {
    log.info("[waitUntil] waiting for promise");
    return waitUntil(promise);
  },
  logger: log,
  stores: {
    upstash: bentostore().useL2Layer(upstashDriver({ prefix: "jcwillox" })),
    filesystem: bentostore().useL2Layer(
      fileDriver({ directory: "node_modules/.cache" }),
    ),
  },
  ttl: import.meta.env.PROD ? "1h" : "1d",
  grace: import.meta.env.PROD ? "1d" : undefined,
});

if (bento.defaultStoreName === "filesystem") {
  bento.prune().then(() => log.info("pruned filesystem cache"));
}
