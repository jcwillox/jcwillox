import { pino } from "pino";
import pretty from "pino-pretty";

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

export const log = pino(
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
