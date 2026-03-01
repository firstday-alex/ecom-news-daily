import Parser from "rss-parser";
import { subHours } from "date-fns";
import type { RawArticle } from "../types";
import type { FeedConfig } from "./feeds";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "EcomNewsDaily/1.0 (+https://github.com/ecom-news-daily)",
    Accept: "application/rss+xml, application/xml, text/xml",
  },
});

export async function fetchRSSFeed(
  feed: FeedConfig,
  maxAgeHours = 25
): Promise<RawArticle[]> {
  const cutoff = subHours(new Date(), maxAgeHours);

  try {
    const result = await parser.parseURL(feed.url);
    const articles: RawArticle[] = [];

    for (const item of result.items) {
      if (!item.title || !item.link) continue;

      const pubDate = item.pubDate
        ? new Date(item.pubDate)
        : item.isoDate
          ? new Date(item.isoDate)
          : null;

      // Skip items without a date or older than cutoff
      if (!pubDate || isNaN(pubDate.getTime())) continue;
      if (pubDate < cutoff) continue;

      articles.push({
        title: item.title.trim(),
        url: item.link.trim(),
        source: feed.source,
        publishedAt: pubDate.toISOString(),
        contentSnippet: item.contentSnippet
          ? item.contentSnippet.slice(0, 500)
          : undefined,
      });
    }

    return articles;
  } catch (err) {
    console.error(`[RSS] Failed to fetch ${feed.source} (${feed.url}):`, err);
    return [];
  }
}

export async function fetchAllRSSFeeds(
  feeds: FeedConfig[],
  maxAgeHours = 25
): Promise<{ articles: RawArticle[]; errors: string[] }> {
  const results = await Promise.allSettled(
    feeds.map((feed) => fetchRSSFeed(feed, maxAgeHours))
  );

  const articles: RawArticle[] = [];
  const errors: string[] = [];

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "fulfilled") {
      articles.push(...result.value);
    } else {
      errors.push(`RSS ${feeds[i].source}: ${result.reason}`);
    }
  }

  return { articles, errors };
}
