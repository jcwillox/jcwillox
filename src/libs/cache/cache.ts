/** biome-ignore-all lint/correctness/useHookAtTopLevel: not hooks */
import "./tracing.ts";
import * as Sentry from "@sentry/tanstackstart-react";
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

bento.on("cache:hit", ({ value, ...info }) => {
  const span = Sentry.getActiveSpan();
  if (span) {
    log.info(
      { info, span: span.spanContext() },
      "[cache:hit] recording cache hit in span",
    );
    span.setAttribute("bento.event", "cache:hit");
    span.setAttribute("cache.hit", true);
    span.setAttribute("cache.key", info.key);
    span.setAttribute("cache.store", info.store);
    span.setAttribute("cache.tier", info.layer);
    span.setAttribute("cache.graced", info.graced);
  }
});

bento.on("cache:miss", (info) => {
  const span = Sentry.getActiveSpan();
  if (span) {
    log.info(
      { info, span: span.spanContext() },
      "[cache:miss] recording cache miss in span",
    );
    span.setAttribute("bento.event", "cache:miss");
    span.setAttribute("cache.hit", false);
    span.setAttribute("cache.key", info.key);
    span.setAttribute("cache.store", info.store);
  }
});

if (bento.defaultStoreName === "filesystem") {
  bento.prune().then(() => log.info("pruned filesystem cache"));
}

bento.getOrSet = new Proxy(bento.getOrSet.bind(bento), {
  apply: (target, _thisArg, args) => {
    const [options] = args as [GetOrSetOptions<unknown>];
    return Sentry.startSpan(
      {
        name: `${options.key}`,
        op: "bento.getOrSet",
        attributes: {
          "cache.key": options.key,
        },
      },
      async (span) => {
        const res = await target(options);
        span.setAttribute("cache.item_size", JSON.stringify(res).length);
        return res;
      },
    );
  },
});
