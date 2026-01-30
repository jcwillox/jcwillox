import * as Sentry from "@sentry/tanstackstart-react";
import { type CacheOperationMessage, tracingChannels } from "bentocache";
import { log } from "@/libs/logging.ts";

const spans = new WeakMap<CacheOperationMessage, Sentry.Span>();

const start = (message: CacheOperationMessage) => {
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
};

const end = (message: CacheOperationMessage) => {
  const span = spans.get(message);
  if (!span) {
    log.error({ message }, "No span found for cache operation end");
    return;
  }

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
};

const error = ({
  error,
  ...message
}: CacheOperationMessage & { error: unknown }) => {
  const span = spans.get(message);
  if (!span) return;

  span.setAttribute("cache.success", false);
  span.setStatus({ code: 2, message: "internal_error" });
  span.recordException(error);
  span.end();
};

tracingChannels.cacheOperation.subscribe({
  start,
  end,
  asyncStart: start,
  asyncEnd: end,
  error,
});
