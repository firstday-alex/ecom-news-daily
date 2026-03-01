import { Redis } from "@upstash/redis";
import type { Article, DailyDigest } from "./types";

// Upstash Redis client - supports both Vercel KV naming (KV_REST_API_*)
// and direct Upstash naming (UPSTASH_REDIS_REST_*)
const redis = new Redis({
  url: (process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL)!,
  token: (process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN)!,
});

const TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days

function digestKey(date: string) {
  return `digest:${date}`;
}

function seenKey(date: string) {
  return `seen-urls:${date}`;
}

export async function getLatestDate(): Promise<string | null> {
  return redis.get<string>("digest:latest");
}

export async function getDigest(date: string): Promise<DailyDigest | null> {
  return redis.get<DailyDigest>(digestKey(date));
}

export async function saveDigest(digest: DailyDigest): Promise<void> {
  await redis.set(digestKey(digest.date), digest, { ex: TTL_SECONDS });
  await redis.set("digest:latest", digest.date);
}

export async function mergeArticles(
  date: string,
  newArticles: Article[]
): Promise<DailyDigest> {
  const existing = await getDigest(date);
  const existingArticles = existing?.articles ?? [];

  // Merge, deduplicate by id
  const merged = [...existingArticles];
  const existingIds = new Set(existingArticles.map((a) => a.id));
  for (const article of newArticles) {
    if (!existingIds.has(article.id)) {
      merged.push(article);
      existingIds.add(article.id);
    }
  }

  // Sort by publishedAt descending
  merged.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const digest: DailyDigest = {
    date,
    articles: merged,
    generatedAt: new Date().toISOString(),
    articleCount: merged.length,
  };

  await saveDigest(digest);
  return digest;
}

export async function getSeenIds(date: string): Promise<Set<string>> {
  const members = await redis.smembers<string[]>(seenKey(date));
  return new Set(members);
}

export async function markSeen(date: string, ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  await redis.sadd(seenKey(date), ids[0], ...ids.slice(1));
  await redis.expire(seenKey(date), TTL_SECONDS);
}

export async function listDigestDates(): Promise<string[]> {
  // Scan for all digest:* keys to support date navigation
  const keys: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cursor: any = 0;
  do {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await redis.scan(cursor, {
      match: "digest:20*",
      count: 100,
    });
    cursor = result[0];
    keys.push(...(result[1] as string[]));
  } while (cursor !== 0 && cursor !== "0");

  return keys
    .map((k: string) => k.replace("digest:", ""))
    .filter((d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort()
    .reverse();
}
