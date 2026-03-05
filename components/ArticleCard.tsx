import { formatDistanceToNow } from "date-fns";
import type { Article, Category } from "@/lib/types";
import { SourceBadge } from "./SourceBadge";

const CATEGORY_COLORS: Record<Category, string> = {
  CRO: "bg-emerald-900/30 text-emerald-400 border-emerald-800/40",
  Retention: "bg-blue-900/30 text-blue-400 border-blue-800/40",
  Ecommerce: "bg-indigo-900/30 text-indigo-400 border-indigo-800/40",
  Supplements: "bg-green-900/30 text-green-400 border-green-800/40",
  "Paid Ads": "bg-orange-900/30 text-orange-400 border-orange-800/40",
  "Email Marketing": "bg-pink-900/30 text-pink-400 border-pink-800/40",
  "Social Commerce": "bg-purple-900/30 text-purple-400 border-purple-800/40",
  "Industry News": "bg-zinc-800/60 text-zinc-400 border-zinc-700/40",
};

interface ArticleCardProps {
  article: Article;
  onDelete?: (id: string) => void;
}

export function ArticleCard({ article, onDelete }: ArticleCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  return (
    <div className="group relative rounded-lg border border-zinc-800 bg-[#111] p-4 hover:border-zinc-700 transition-colors duration-150">
      {/* Header: source + time */}
      <div className="flex items-center justify-between mb-2 gap-2">
        <SourceBadge source={article.source} />
        <span className="text-xs text-zinc-600 shrink-0">{timeAgo}</span>
      </div>

      {/* Title */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-sm font-medium text-zinc-100 group-hover:text-white leading-snug mb-2 hover:underline decoration-zinc-600"
      >
        {article.title}
      </a>

      {/* AI Summary */}
      {article.summary && (
        <p className="text-xs text-zinc-500 leading-relaxed mb-3">
          {article.summary}
        </p>
      )}

      {/* Category tags + delete */}
      <div className="flex items-end justify-between gap-2">
        {article.categories.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {article.categories.map((cat) => (
              <span
                key={cat}
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${CATEGORY_COLORS[cat]}`}
              >
                {cat}
              </span>
            ))}
          </div>
        ) : (
          <div />
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(article.id)}
            className="shrink-0 p-1 rounded text-zinc-700 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-zinc-800 transition-all duration-150"
            title="Delete article"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
