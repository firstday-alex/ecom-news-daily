import { subHours, format } from "date-fns";
import type { RawArticle } from "../types";

// newsapi.ai (EventRegistry) — uses UUID-format apiKey
const BASE_URL = "https://newsapi.ai/api/v1/article/getArticles";

interface NewsAIArticle {
  title: { value: string };
  url: { value: string };
  source: { title: string };
  dateTimePub: { value: string };
  body?: { value: string };
}

interface NewsAIResponse {
  articles?: {
    results: NewsAIArticle[];
    totalResults?: number;
  };
  error?: string;
}

export async function fetchNewsAPI(
  queries: string[],
  maxAgeHours = 25
): Promise<{ articles: RawArticle[]; errors: string[] }> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return { articles: [], errors: ["NEWS_API_KEY not set"] };
  }

  const dateStart = format(subHours(new Date(), maxAgeHours), "yyyy-MM-dd");

  const articles: RawArticle[] = [];
  const errors: string[] = [];
  const seenUrls = new Set<string>();

  const fetches = queries.map(async (q) => {
    const body = {
      action: "getArticles",
      keyword: q,
      lang: "eng",
      dateStart,
      articlesCount: 25,
      articlesSortBy: "date",
      resultType: "articles",
      apiKey,
    };

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        next: { revalidate: 0 },
      });
      const data: NewsAIResponse = await res.json();

      if (data.error) {
        errors.push(`newsapi.ai "${q}": ${data.error}`);
        return;
      }

      for (const item of data.articles?.results ?? []) {
        const url = item.url?.value;
        const title = item.title?.value;
        if (!title || !url) continue;
        if (seenUrls.has(url)) continue;

        seenUrls.add(url);
        articles.push({
          title: title.trim(),
          url,
          source: item.source?.title || "newsapi.ai",
          publishedAt: item.dateTimePub?.value ?? new Date().toISOString(),
          contentSnippet: item.body?.value?.slice(0, 500),
        });
      }
    } catch (err) {
      errors.push(`newsapi.ai "${q}": ${String(err)}`);
    }
  });

  await Promise.allSettled(fetches);
  return { articles, errors };
}
