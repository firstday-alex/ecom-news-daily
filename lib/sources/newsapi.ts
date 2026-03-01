import { subHours, formatISO } from "date-fns";
import type { RawArticle } from "../types";

const BASE_URL = "https://newsapi.org/v2/everything";

interface NewsAPIArticle {
  title: string;
  url: string;
  source: { name: string };
  publishedAt: string;
  description?: string;
}

interface NewsAPIResponse {
  status: string;
  articles: NewsAPIArticle[];
  message?: string;
}

export async function fetchNewsAPI(
  queries: string[],
  maxAgeHours = 25
): Promise<{ articles: RawArticle[]; errors: string[] }> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return { articles: [], errors: ["NEWS_API_KEY not set"] };
  }

  const from = formatISO(subHours(new Date(), maxAgeHours));
  const articles: RawArticle[] = [];
  const errors: string[] = [];
  const seenUrls = new Set<string>();

  const fetches = queries.map(async (q) => {
    const params = new URLSearchParams({
      q,
      from,
      sortBy: "publishedAt",
      language: "en",
      pageSize: "20",
      apiKey,
    });

    try {
      const res = await fetch(`${BASE_URL}?${params}`, {
        next: { revalidate: 0 },
      });
      const data: NewsAPIResponse = await res.json();

      if (data.status !== "ok") {
        errors.push(`NewsAPI "${q}": ${data.message ?? "unknown error"}`);
        return;
      }

      for (const item of data.articles) {
        if (!item.title || !item.url) continue;
        if (seenUrls.has(item.url)) continue;
        if (item.title === "[Removed]") continue;

        seenUrls.add(item.url);
        articles.push({
          title: item.title.trim(),
          url: item.url,
          source: item.source.name || "NewsAPI",
          publishedAt: item.publishedAt,
          contentSnippet: item.description?.slice(0, 500),
        });
      }
    } catch (err) {
      errors.push(`NewsAPI "${q}": ${String(err)}`);
    }
  });

  await Promise.allSettled(fetches);
  return { articles, errors };
}
