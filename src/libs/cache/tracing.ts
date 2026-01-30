import * as Sentry from "@sentry/tanstackstart-react";
import { type CacheOperationMessage, tracingChannels } from "bentocache";

const spans = new WeakMap<CacheOperationMessage, Sentry.Span>();

tracingChannels.cacheOperation.subscribe({
  start: (message) => {
    const name = message.key ?? message.keys?.join(",");
    const operation =
      message.operation === "set"
        ? "put"
        : message.operation === "delete" || message.operation === "deleteMany"
          ? "remove"
          : message.operation === "clear"
            ? "flush"
            : message.operation;

    const span = Sentry.startInactiveSpan({
      op: `cache.${operation}`,
      name: `${message.store}:${message.operation}${name ? `:${name}` : ""}`,
      attributes: {
        "cache.key": message.key ? [message.key] : message.keys,
        "network.peer.address": message.store,
      },
    });

    spans.set(message, span);
  },
  asyncEnd: (message) => {
    const span = spans.get(message);
    if (!span) return;

    if (message.hit !== undefined) {
      span.setAttribute("cache.hit", message.hit);
    }
    if (message.tier) {
      span.setAttribute("cache.tier", message.tier);
    }
    if (message.graced) {
      span.setAttribute("cache.graced", message.graced);
    }

    span.end();
  },
  error: ({ error, ...message }) => {
    const span = spans.get(message);
    if (!span) return;
    span.setAttribute("cache.success", false);
    span.setStatus({ code: 2, message: "internal_error" });
    span.recordException(error);
    span.end();
  },
  end: () => {},
  asyncStart: () => {},
});
