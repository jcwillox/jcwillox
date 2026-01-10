/** biome-ignore-all lint/correctness/useHookAtTopLevel: not hooks */
import { waitUntil } from "@vercel/functions";
import { BentoCache, bentostore } from "bentocache";
import { fileDriver } from "bentocache/drivers/file";
import { upstashDriver } from "./upstashDriver.ts";

export const bento = new BentoCache({
  default: import.meta.env.DEV ? "filesystem" : "upstash",
  waitUntil: (promise) => {
    console.log("waitUntil waiting for promise");
    return waitUntil(promise);
  },
  stores: {
    upstash: bentostore().useL2Layer(
      upstashDriver({ prefix: "jcwillox-com:bentocache" }),
    ),
    filesystem: bentostore().useL2Layer(
      fileDriver({ directory: "node_modules/.cache" }),
    ),
  },
});

if (bento.defaultStoreName === "filesystem") {
  bento.prune().then(() => console.log("info: pruned filesystem cache"));
}
