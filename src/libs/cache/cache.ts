/** biome-ignore-all lint/correctness/useHookAtTopLevel: not hooks */
import { waitUntil } from "@vercel/functions";
import { BentoCache, bentostore } from "bentocache";
import { fileDriver } from "bentocache/drivers/file";
import { pino } from "pino";
import pretty from "pino-pretty";
import { upstashDriver } from "./upstashDriver.ts";

const dtf = new Intl.DateTimeFormat("sv-SE", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
  timeZoneName: "longOffset",
  timeZone: "Australia/Sydney",
});

const logger = pino(
  {
    level: "debug",
    ...(import.meta.env.PROD
      ? {
          base: null,
          formatters: { level: (label) => ({ level: label }) },
          timestamp: () => `,"time":"${dtf.format().replaceAll(" GMT", "")}"`,
        }
      : {}),
  },
  import.meta.env.DEV ? pretty({ ignore: "pid,hostname" }) : undefined,
);

export const bento = new BentoCache({
  default: import.meta.env.DEV ? "filesystem" : "upstash",
  waitUntil: (promise) => {
    logger.info("[waitUntil] waiting for promise");
    return waitUntil(promise);
  },
  logger,
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
  bento.prune().then(() => logger.info("pruned filesystem cache"));
}
