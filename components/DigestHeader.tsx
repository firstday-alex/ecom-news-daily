import { format, parseISO } from "date-fns";

interface DigestHeaderProps {
  date: string; // YYYY-MM-DD
  articleCount: number;
  generatedAt: string; // ISO 8601
}

export function DigestHeader({
  date,
  articleCount,
  generatedAt,
}: DigestHeaderProps) {
  const formattedDate = format(parseISO(date), "EEEE, MMMM d, yyyy");
  const updatedTime = format(parseISO(generatedAt), "h:mm a 'UTC'");

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
          Daily Digest
        </span>
      </div>
      <h1 className="text-2xl font-bold text-zinc-100 mb-1">{formattedDate}</h1>
      <p className="text-sm text-zinc-600">
        {articleCount} articles &middot; Last updated {updatedTime}
      </p>
    </div>
  );
}
