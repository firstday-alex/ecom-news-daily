import { notFound } from "next/navigation";
import { getDigest, listDigestDates } from "@/lib/kv";
import { DigestHeader } from "@/components/DigestHeader";
import { CategoryFilter } from "@/components/CategoryFilter";
import { format } from "date-fns";

export const revalidate = 300;

interface PageProps {
  params: { date: string };
}

export default async function DatePage({ params }: PageProps) {
  const { date } = params;

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    notFound();
  }

  const digest = await getDigest(date);

  if (!digest) {
    notFound();
  }

  const allDates = await listDigestDates();

  return (
    <div>
      <DigestHeader
        date={digest.date}
        articleCount={digest.articleCount}
        generatedAt={digest.generatedAt}
      />

      {/* Date navigation */}
      {allDates.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          <a
            href="/"
            className="shrink-0 px-3 py-1.5 rounded text-xs font-mono bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800 transition-colors"
          >
            Today
          </a>
          {allDates.slice(0, 7).map((d) => (
            <a
              key={d}
              href={`/${d}`}
              className={`shrink-0 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                d === date
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
