import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";
import { RSS_FEEDS, NEWS_API_QUERIES, BING_QUERIES } from "@/lib/sources/feeds";
import { fetchAllRSSFeeds } from "@/lib/sources/rss";
import { fetchNewsAPI } from "@/lib/sources/newsapi";
import { fetchBingNews } from "@/lib/sources/bing";
import { fetchXAccounts, X_ACCOUNTS } from "@/lib/sources/twitter";
import { processArticles } from "@/lib/claude";
import { getSeenIds, markSeen, mergeArticles } from "@/lib/kv";
import type { RawArticle, CronResult } from "@/lib/types";

export const maxDuration = 300; // 5 minute timeout for Vercel Pro
export const dynamic = "force-dynamic";

function generateId(url: string): string {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36).padStart(8, "0");
}

export async function GET(req: NextRequest) {
  // Verify cron secret - Vercel sends this automatically when configured
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = format(new Date(), "yyyy-MM-dd");
  const fetchedAt = new Date().toISOString();
  const allErrors: string[] = [];

  console.log(`[Cron] Starting fetch for ${today}`);

  // Fetch from all sources in parallel
  const [rssResult, newsApiResult, bingResult, xResult] = await Promise.all([
    fetchAllRSSFeeds(RSS_FEEDS, 25),
    fetchNewsAPI(NEWS_API_QUERIES, 25),
    fetchBingNews(BING_QUERIES),
    fetchXAccounts(X_ACCOUNTS, 25),
  ]);

  allErrors.push(...rssResult.errors, ...newsApiResult.errors, ...bingResult.errors, ...xResult.errors);

  // Combine and deduplicate by URL
  const allRaw: RawArticle[] = [];
  const seenUrls = new Set<string>();

  for (const article of [
    ...rssResult.articles,
    ...newsApiResult.articles,
    ...bingResult.articles,
    ...xResult.articles,
  ]) {
    if (!seenUrls.has(article.url)) {
      seenUrls.add(article.url);
      allRaw.push(article);
    }
  }

  console.log(`[Cron] Fetched ${allRaw.length} raw articles`);

  // Filter out already-seen articles using KV
  const seenIds = await getSeenIds(today);
  const newArticles = allRaw.filter(
    (a) => !seenIds.has(generateId(a.url))
  );

  const skipped = allRaw.length - newArticles.length;
  console.log(`[Cron] ${newArticles.length} new articles (${skipped} already seen)`);

  if (newArticles.length === 0) {
    const result: CronResult = {
      date: today,
      processed: 0,
      skipped,
      errors: allErrors,
    };
    return NextResponse.json(result);
  }

  // Process with Claude AI
  const { articles, errors: claudeErrors } = await processArticles(
    newArticles,
    fetchedAt
  );
  allErrors.push(...claudeErrors);

  // Mark all as seen and save to KV
  const newIds = articles.map((a) => a.id);
  await markSeen(today, newIds);
  const digest = await mergeArticles(today, articles);

  const result: CronResult = {
    date: today,
    processed: articles.length,
    skipped,
    errors: allErrors,
  };

  console.log(`[Cron] Done. Processed: ${articles.length}, Total in digest: ${digest.articleCount}`);
  return NextResponse.json(result);
}
