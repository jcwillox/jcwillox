import { Link } from "@tanstack/react-router";
import { cn } from "@/utils/common.ts";
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
        "flex min-w-82 max-w-96 flex-col rounded-md border border-[#525252] shadow-lg transition-transform hover:scale-102",
        props.new ? "border-green-500/50 bg-green-500/10" : "bg-neutral-800/60",
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 font-bold text-lg">
            {icon && !hasEmoji && (
              <i className={cn(icon, "shrink-0 text-[24px]")} aria-hidden />
            )}
            {title}
          </div>

          <Link
            to={repoUrl}
            className="mt-1 font-medium text-blue-600 text-sm leading-tight dark:text-blue-500"
          >
            {repo}
          </Link>
        </div>

        {homepage ? (
          <a
            href={homepage}
            className="i-[octicon--home-16] icon-btn mr-2.5 ml-6 shrink-0 text-[20px] no-underline"
          />
        ) : null}
      </div>

      <div className="grow border-[#525252] border-t p-4 text-sm">
        {description}
      </div>

      {imageUrl ? (
        <div>
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="mx-auto h-48 w-95.5 border-[#525252] border-t object-contain"
          />
        </div>
      ) : null}

      <div
        className={cn(
          "flex divide-x divide-[#525252] border-[#525252] border-t text-sm",
          "*:flex *:grow *:basis-1/3 *:items-center *:justify-center *:p-2",
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
