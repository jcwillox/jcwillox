import * as Sentry from "@sentry/tanstackstart-react";
import { createMiddleware } from "@tanstack/react-start";

export const tracingMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const url = new URL(request.url);

    return Sentry.startSpan(
      {
        name: `tracingMiddleware:${request.method} ${url.pathname}`,
        op: "tracingMiddleware.http.server",
        attributes: {
          "http.method": request.method,
          "http.url": request.url,
          "http.route": url.pathname,
          "middleware.name": "tracingMiddleware",
        },
      },
      async (span) => {
        try {
          const result = await next();
          span.setAttribute("http.status_code", result.response.status);
          return result;
        } catch (err) {
          Sentry.captureException(err);
          throw err;
        }
      },
    );
  },
);
