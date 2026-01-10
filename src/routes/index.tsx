import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { ParticlesBackground } from "@/components/ParticlesBackground.tsx";
import { RepoCard } from "@/components/RepoCard.tsx";
import { appConfig } from "@/config/appConfig.ts";
import { getEdgeConfig } from "@/config/edgeConfig.ts";
import { useNearBottom } from "@/hooks/useNearBottom.ts";
import { cn } from "@/utils/common.ts";
import { getRepoData } from "@/utils/getRepoData.ts";

export const Route = createFileRoute("/")({
  loader: async () => {
    const repos = await getEdgeConfig();
    return Promise.all(
      repos.map(async ({ repo, ...overrides }) => {
        const data = await getRepoData({ data: { repo } });
        return { ...data, ...overrides };
      }),
    );
  },
  component: RouteComponent,
  headers: () => ({
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  }),
  staleTime: Infinity,
  gcTime: Infinity,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const isAtBottom = useNearBottom();

  return (
    <div className="text-white">
      <div className="p-4 pb-12 sm:px-12">
        <ClientOnly>
          <ParticlesBackground />
        </ClientOnly>

        <div className="m-auto mt-2 flex max-w-lg items-center rounded-md border border-[#525252] bg-neutral-800/60 p-4 px-4 shadow-lg sm:mt-4 sm:px-8">
          <img
            src={`https://avatars.githubusercontent.com/${appConfig.socials.github}`}
            className="rounded-full bg-contain"
            alt="avatar"
            width="64"
            height="64"
            loading="eager"
          />

          <div className="ml-4 grow">
            <div className="font-semibold text-sky-700 dark:text-sky-500">
              {appConfig.fullname}
            </div>

            <div className="font-medium leading-tight">
              @{appConfig.socials.github}
            </div>
          </div>

          <div className="inline-flex gap-2">
            <a
              href={appConfig.links.github}
              className="i-[line-md--github-loop] icon-btn"
            />
            <a
              href={appConfig.links.kofi}
              className="i-[line-md--coffee-half-empty-twotone-loop] icon-inline text-2xl text-[#ff5f5f]"
            />
            <a
              href={appConfig.links.linkedin}
              className="i-[line-md--linkedin] icon-inline text-2xl text-[#0a66c2]"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((repo) => (
              <RepoCard key={repo.repo} {...repo} />
            ))}
          </div>
        </div>
        <div
          className={cn(
            "pointer-events-none fixed inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent transition-transform duration-200",
            { "translate-y-full": isAtBottom },
          )}
        />
      </div>
    </div>
  );
}
