import { createStart } from "@tanstack/react-start";
import {
  getFunctionTracingMiddleware,
  getTracingMiddleware,
} from "@/middleware/tracingMiddleware.ts";

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [getTracingMiddleware()],
    functionMiddleware: [getFunctionTracingMiddleware()],
  };
});
