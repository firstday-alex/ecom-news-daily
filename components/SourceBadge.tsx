const SOURCE_COLORS: Record<string, string> = {
  "r/ecommerce": "bg-orange-900/40 text-orange-400 border-orange-800/50",
  "r/supplements": "bg-green-900/40 text-green-400 border-green-800/50",
  "r/entrepreneur": "bg-blue-900/40 text-blue-400 border-blue-800/50",
  "r/digital_marketing": "bg-purple-900/40 text-purple-400 border-purple-800/50",
  "Shopify Blog": "bg-emerald-900/40 text-emerald-400 border-emerald-800/50",
  "CXL Blog": "bg-yellow-900/40 text-yellow-400 border-yellow-800/50",
  "Klaviyo Blog": "bg-pink-900/40 text-pink-400 border-pink-800/50",
  "Nik Sharma": "bg-violet-900/40 text-violet-400 border-violet-800/50",
  "Marketing Operators": "bg-cyan-900/40 text-cyan-400 border-cyan-800/50",
};

const DEFAULT_COLOR = "bg-zinc-800/60 text-zinc-400 border-zinc-700/50";

interface SourceBadgeProps {
  source: string;
}

export function SourceBadge({ source }: SourceBadgeProps) {
  const colorClass = SOURCE_COLORS[source] ?? DEFAULT_COLOR;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colorClass}`}
    >
      {source}
    </span>
  );
}
