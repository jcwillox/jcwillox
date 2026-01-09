import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Analytics } from "@vercel/analytics/react";
import appCss from "../styles.css?url";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Joshua Cowie-Willox" },
      {
        name: "description",
        content: "My personal showcase website",
      },
      {
        name: "og:title",
        content: "Joshua Cowie-Willox",
      },
      {
        name: "og:description",
        content: "My personal showcase website",
      },
      {
        name: "og:image",
        content: "https://avatars.githubusercontent.com/jcwillox",
      },
      { name: "og:url", content: "https://jcwillox.com" },
      { name: "twitter:title", content: "Joshua Cowie-Willox" },
      {
        name: "twitter:description",
        content: "My personal showcase website",
      },
      {
        name: "twitter:image",
        content: "https://avatars.githubusercontent.com/jcwillox",
      },
      { name: "twitter:url", content: "https://jcwillox.com" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="scheme-dark scrollbar-hide m-0 bg-neutral-900 font-inter text-white"
    >
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Analytics />
        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: "Tanstack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
