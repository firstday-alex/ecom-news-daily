"use client";

import { useState } from "react";
import type { Article, Category } from "@/lib/types";
import { ALL_CATEGORIES } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";

interface CategoryFilterProps {
  articles: Article[];
}

export function CategoryFilter({ articles }: CategoryFilterProps) {
  const [active, setActive] = useState<Category | "All">("All");

  const filtered =
    active === "All"
      ? articles
      : articles.filter((a) => a.categories.includes(active));

  // Count per category for badges
  const counts: Partial<Record<Category | "All", number>> = { All: articles.length };
  for (const cat of ALL_CATEGORIES) {
    counts[cat] = articles.filter((a) => a.categories.includes(cat)).length;
  }

  const tabs: Array<Category | "All"> = ["All", ...ALL_CATEGORIES];

  return (
    <div>
      {/* Scrollable tab bar */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {tabs.map((tab) => {
          const count = counts[tab] ?? 0;
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
              }`}
            >
              {tab}
              {count > 0 && (
                <span
                  className={`text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center ${
                    isActive ? "bg-emerald-700 text-emerald-100" : "bg-zinc-700 text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Article grid */}
      {filtered.length === 0 ? (
        <p className="text-zinc-600 text-sm text-center py-12">
          No articles in this category today.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
