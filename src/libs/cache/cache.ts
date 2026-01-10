/** biome-ignore-all lint/correctness/useHookAtTopLevel: not hooks */
import { waitUntil } from "@vercel/functions";
import { BentoCache, bentostore } from "bentocache";
import { fileDriver } from "bentocache/drivers/file";
import { pino } from "pino";
import { PinoPretty as pretty } from "pino-pretty";
import { upstashDriver } from "./upstashDriver.ts";

export const bento = new BentoCache({
  default: import.meta.env.DEV ? "filesystem" : "upstash",
  waitUntil: (promise) => {
    console.log("waitUntil waiting for promise");
    return waitUntil(promise);
  },
  logger: pino({ level: "debug" }, pretty()),
  stores: {
    upstash: bentostore().useL2Layer(
      upstashDriver({ prefix: "jcwillox-com:bentocache" }),
    ),
    filesystem: bentostore().useL2Layer(
      fileDriver({ directory: "node_modules/.cache" }),
    ),
  },
  ttl: import.meta.env.PROD ? "1h" : "1d",
  grace: import.meta.env.PROD ? "1d" : undefined,
  timeout: import.meta.env.PROD ? "250ms" : undefined,
});

if (bento.defaultStoreName === "filesystem") {
  bento.prune().then(() => console.log("info: pruned filesystem cache"));
}
