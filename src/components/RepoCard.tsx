import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils.ts";
import type { getRepoData } from "@/utils/getRepoData.ts";
import { LangDot } from "./LangDot.tsx";

type RepoCardProps = Awaited<ReturnType<typeof getRepoData>>;

export const RepoCard = ({
  repo,
  title,
  image,
  icon,
  homepage,
  description,
  language,
  license,
  branch = "main",
  stars,
  ...props
}: RepoCardProps) => {
  const imageUrl = useMemo(() => {
    if (image?.startsWith("https://opengraph.githubassets.com"))
      return undefined;
    if (image?.startsWith("http")) return image;
    if (image?.startsWith("/")) return image;
    if (image) return `https://raw.githubusercontent.com/${repo}/main/${image}`;
    return "";
  }, [image, repo]);

  const hasEmoji = useMemo(() => title && /^\W/.test(title), [title]);
  const repoUrl = `https://github.com/${repo}`;

  return (
    <div
      className={cn(
        "max-w-96 min-w-82 flex flex-col border border-[#525252] rounded-md shadow-lg transition-transform hover:scale-102",
        props.new ? "border-green-500/50 bg-green-500/10" : "bg-neutral-800/60",
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-lg font-bold">
            {icon && !hasEmoji && (
              <i className={cn(icon, "shrink-0 text-[24px]")} aria-hidden />
            )}
            {title}
          </div>

          <Link
            to={repoUrl}
            className="mt-1 text-sm text-blue-600 font-medium leading-tight dark:text-blue-500"
          >
            {repo}
          </Link>
        </div>

        {homepage ? (
          <a
            href={homepage}
            className="i-[octicon--home-16] ml-6 mr-2.5 icon-btn shrink-0 text-[20px] no-underline"
          />
        ) : null}
      </div>

      <div className="grow border-t border-[#525252] p-4 text-sm">
        {description}
      </div>

      {imageUrl ? (
        <div>
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="mx-auto h-48 border-t border-[#525252] object-contain w-95.5"
          />
        </div>
      ) : null}

      <div
        className={cn(
          "flex border-t border-[#525252] text-sm divide-x divide-[#525252]",
          "*:flex *:items-center *:justify-center *:p-2 *:basis-1/3 *:grow",
        )}
      >
        <div>
          <LangDot color={language} />
          <span className="capitalize">{language}</span>
        </div>

        {license ? (
          <a
            href={`${repoUrl}/blob/${branch}/LICENSE`}
            className="no-underline"
          >
            <i className="i-[octicon--law-16] mr-2 text-[21px] text-zinc-400" />
            <span>{license}</span>
          </a>
        ) : null}

        {stars ? (
          <a href={`${repoUrl}/stargazers`} className="no-underline">
            <i className="i-[octicon--star-16] mr-2 text-[21px] text-zinc-400" />
            <span>{stars}</span>
          </a>
        ) : null}
      </div>
    </div>
  );
};
