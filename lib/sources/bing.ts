import type { RawArticle } from "../types";

const BASE_URL =
  "https://api.bing.microsoft.com/v7.0/news/search";

interface BingArticle {
  name: string;
  url: string;
  description?: string;
  datePublished: string;
  provider?: Array<{ name?: string }>;
}

interface BingResponse {
  value?: BingArticle[];
  error?: { message: string };
}

export async function fetchBingNews(
  queries: string[]
): Promise<{ articles: RawArticle[]; errors: string[] }> {
  const apiKey = process.env.BING_SEARCH_API_KEY;
  if (!apiKey) {
    // Bing is optional - silently skip
    return { articles: [], errors: [] };
  }

  const articles: RawArticle[] = [];
  const errors: string[] = [];
  const seenUrls = new Set<string>();

  const fetches = queries.map(async (q) => {
    const params = new URLSearchParams({
      q,
      freshness: "Day",
      count: "20",
      mkt: "en-US",
    });

    try {
      const res = await fetch(`${BASE_URL}?${params}`, {
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
        },
        next: { revalidate: 0 },
      });

      const data: BingResponse = await res.json();

      if (data.error) {
        errors.push(`Bing "${q}": ${data.error.message}`);
        return;
      }

      for (const item of data.value ?? []) {
        if (!item.name || !item.url) continue;
        if (seenUrls.has(item.url)) continue;

        seenUrls.add(item.url);
        articles.push({
          title: item.name.trim(),
          url: item.url,
          source: item.provider?.[0]?.name || "Bing News",
          publishedAt: item.datePublished,
          contentSnippet: item.description?.slice(0, 500),
        });
      }
    } catch (err) {
      errors.push(`Bing "${q}": ${String(err)}`);
    }
  });

  await Promise.allSettled(fetches);
  return { articles, errors };
}
