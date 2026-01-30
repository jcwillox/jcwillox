import * as Sentry from "@sentry/tanstackstart-react";
import { createMiddleware } from "@tanstack/react-start";

const tracingMiddleware = createMiddleware().server(({ next, request }) => {
  const url = new URL(request.url);
  return Sentry.startSpan(
    {
      name: `${request.method} ${url.pathname}`,
      op: "http.server",
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
        Sentry.setHttpStatus(span, result.response.status);
        return result;
      } catch (err) {
        Sentry.captureException(err);
        throw err;
      }
    },
  );
});

const functionTracingMiddleware = createMiddleware({ type: "function" }).server(
  ({ next, method, serverFnMeta }) =>
    Sentry.startSpan(
      {
        name: `${method} ${serverFnMeta.name}`,
        op: "function.server",
        attributes: {
          "tanstackstart.function.name": serverFnMeta.name,
          "tanstackstart.function.id": serverFnMeta.id,
          "http.method": method,
          "middleware.name": "functionTracingMiddleware",
        },
      },
      () => next(),
    ),
);

export const getTracingMiddleware = () => tracingMiddleware;
export const getFunctionTracingMiddleware = () => functionTracingMiddleware;
