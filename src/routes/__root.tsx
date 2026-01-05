import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
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
    ],
  }),
  notFoundComponent: () => <div>404 - Page Not Found</div>,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
