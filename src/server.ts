import "../instrument.server.mjs";
import * as Sentry from "@sentry/tanstackstart-react";
import { wrapFetchWithSentry } from "@sentry/tanstackstart-react";
import {
  createStartHandler,
  defaultStreamHandler,
  defineHandlerCallback,
} from "@tanstack/react-start/server";
import { createServerEntry } from "@tanstack/react-start/server-entry";

const customHandler = defineHandlerCallback((ctx) => {
  const url = new URL(ctx.request.url);
  return Sentry.startSpan(
    {
      name: `customHandler:${ctx.request.method} ${url.pathname}`,
      op: "customHandler.http.server",
      attributes: {
        "http.method": ctx.request.method,
        "http.url": ctx.request.url,
        "http.route": url.pathname,
      },
    },
    async (span) => {
      try {
        const response = await defaultStreamHandler(ctx);
        span.setAttribute("http.status_code", response.status);
        return response;
      } catch (err) {
        Sentry.captureException(err);
        throw err;
      }
    },
  );
});

const fetch = createStartHandler(customHandler);

export default createServerEntry(
  wrapFetchWithSentry({
    fetch(request: Request) {
      return fetch(request);
    },
  }),
);
