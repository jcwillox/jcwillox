import { createStart } from "@tanstack/react-start";
import { tracingMiddleware } from "@/middleware/tracingMiddleware.ts";

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [tracingMiddleware],
  };
});
