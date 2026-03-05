import { DigestHeader } from "@/components/DigestHeader";
import { CategoryFilter } from "@/components/CategoryFilter";
import { format } from "date-fns";
import type { DailyDigest } from "@/lib/types";

export const revalidate = 300; // Revalidate every 5 minutes

async function getDigestData(): Promise<{
  digest: DailyDigest | null;
  allDates: string[];
  isMock: boolean;
}> {
  const hasRedis = !!(
    (process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL) &&
    (process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN)
  );

  // Dev mode: show mock data when Redis isn't configured
  if (!hasRedis) {
    const { MOCK_DIGEST } = await import("@/lib/mock-data");
    return { digest: MOCK_DIGEST, allDates: [MOCK_DIGEST.date], isMock: true };
  }

  const { getLatestDate, getDigest, listDigestDates } = await import(
    "@/lib/kv"
  );
  const latestDate = await getLatestDate();
  if (!latestDate) return { digest: null, allDates: [], isMock: false };

  const digest = await getDigest(latestDate);
  const allDates = await listDigestDates();
  return { digest, allDates, isMock: false };
}

export default async function HomePage() {
  const { digest, allDates, isMock } = await getDigestData();

  if (!digest || digest.articles.length === 0) {
    return <EmptyState />;
  }

  const latestDate = digest.date;

  return (
    <div>
      {isMock && (
        <div className="mb-6 rounded-lg border border-yellow-800/50 bg-yellow-900/10 px-4 py-3 text-xs text-yellow-600 flex items-center gap-2">
          <span>⚠️</span>
          <span>
            <strong>Preview mode</strong> — showing sample data. Connect Upstash
            Redis &amp; add env vars to see real articles.
          </span>
        </div>
      )}

      <DigestHeader
        date={digest.date}
        articleCount={digest.articleCount}
        generatedAt={digest.generatedAt}
      />

      {/* Date navigation */}
      {allDates.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {allDates.slice(0, 7).map((d) => (
            <a
              key={d}
              href={d === latestDate ? "/" : `/${d}`}
              className={`shrink-0 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                d === latestDate
                  ? "bg-zinc-700 text-zinc-200"
                  : "bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800"
              }`}
            >
              {format(new Date(d + "T12:00:00"), "MMM d")}
            </a>
          ))}
        </div>
      )}

      <CategoryFilter articles={digest.articles} date={digest.date} />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="text-4xl mb-4">📡</div>
      <h2 className="text-xl font-semibold text-zinc-300 mb-2">
        No digest yet
      </h2>
      <p className="text-zinc-600 text-sm max-w-md mb-6">
        The daily digest runs automatically at 7 AM UTC. Check back after the
        first run, or trigger it manually.
      </p>
      <p className="text-xs font-mono text-zinc-700">
        GET /api/cron/fetch-news with Authorization: Bearer {"{CRON_SECRET}"}
      </p>
    </div>
  );
}
