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
}

export function ArticleCard({ article }: ArticleCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  return (
    <div className="group rounded-lg border border-zinc-800 bg-[#111] p-4 hover:border-zinc-700 transition-colors duration-150">
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

      {/* Category tags */}
      {article.categories.length > 0 && (
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
      )}
    </div>
  );
}
