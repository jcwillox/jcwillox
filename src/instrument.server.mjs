import * as Sentry from "@sentry/tanstackstart-react";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  // replaysSessionSampleRate: 1.0,
  // replaysOnErrorSampleRate: 1.0,
});
