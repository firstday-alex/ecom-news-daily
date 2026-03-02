import Parser from "rss-parser";
import { subHours } from "date-fns";
import type { RawArticle } from "../types";
import type { FeedConfig } from "./feeds";

// Standard parser for most feeds
const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "EcomNewsDaily/1.0 (+https://github.com/ecom-news-daily)",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});

// Browser-like parser for sites that block bots
const browserParser = new Parser({
  timeout: 10000,
  xml: { strict: false },
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
  },
});

// Lenient parser for feeds with malformed XML (e.g. CXL)
const lenientParser = new Parser({
  timeout: 10000,
  xml: { strict: false },
  headers: {
    "User-Agent": "EcomNewsDaily/1.0 (+https://github.com/ecom-news-daily)",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});

const BROWSER_AGENT_HOSTS: string[] = [];
const LENIENT_XML_HOSTS = ["cxl.com"];

export async function fetchRSSFeed(
  feed: FeedConfig,
  maxAgeHours = 25
): Promise<RawArticle[]> {
  const cutoff = subHours(new Date(), maxAgeHours);

  try {
    const host = new URL(feed.url).hostname;
    const activeParser = BROWSER_AGENT_HOSTS.some((h) => host.includes(h))
      ? browserParser
      : LENIENT_XML_HOSTS.some((h) => host.includes(h))
        ? lenientParser
        : parser;
    const result = await activeParser.parseURL(feed.url);
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
