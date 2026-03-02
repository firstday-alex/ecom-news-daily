const SOURCE_COLORS: Record<string, string> = {
  // Platform blogs
  "Shopify Blog": "bg-emerald-900/40 text-emerald-400 border-emerald-800/50",
  // CRO & UX publications
  "CXL Blog": "bg-yellow-900/40 text-yellow-400 border-yellow-800/50",
  "Baymard Institute": "bg-amber-900/40 text-amber-400 border-amber-800/50",
  "VWO Blog": "bg-teal-900/40 text-teal-400 border-teal-800/50",
  // Ecommerce publications
  "Practical Ecommerce": "bg-blue-900/40 text-blue-400 border-blue-800/50",
  "eCommerceFuel": "bg-indigo-900/40 text-indigo-400 border-indigo-800/50",
  // Agency & operator blogs
  "Common Thread Co": "bg-orange-900/40 text-orange-400 border-orange-800/50",
  "Smart Marketer": "bg-red-900/40 text-red-400 border-red-800/50",
  // Marketing news
  "Adweek": "bg-blue-900/40 text-blue-400 border-blue-800/50",
  "Digiday": "bg-violet-900/40 text-violet-400 border-violet-800/50",
  "Modern Retail": "bg-cyan-900/40 text-cyan-400 border-cyan-800/50",
  "Retail Dive": "bg-teal-900/40 text-teal-400 border-teal-800/50",
  "Glossy": "bg-pink-900/40 text-pink-400 border-pink-800/50",
  "2PM": "bg-zinc-700/60 text-zinc-300 border-zinc-600/50",
  // CRO & SEO
  "Moz Blog": "bg-indigo-900/40 text-indigo-400 border-indigo-800/50",
  "Search Engine Journal": "bg-orange-900/40 text-orange-400 border-orange-800/50",
  "CMI": "bg-amber-900/40 text-amber-400 border-amber-800/50",
  // Email marketing
  "Klaviyo Blog": "bg-green-900/40 text-green-400 border-green-800/50",
  "Litmus Blog": "bg-yellow-900/40 text-yellow-400 border-yellow-800/50",
  "Omnisend Blog": "bg-emerald-900/40 text-emerald-400 border-emerald-800/50",
  "Postscript Blog": "bg-fuchsia-900/40 text-fuchsia-400 border-fuchsia-800/50",
};

const DEFAULT_COLOR = "bg-zinc-800/60 text-zinc-400 border-zinc-700/50";

interface SourceBadgeProps {
  source: string;
}

// X/Twitter handles get a consistent brand color
const X_COLOR = "bg-zinc-900/60 text-zinc-100 border-zinc-600/50";

export function SourceBadge({ source }: SourceBadgeProps) {
  const colorClass =
    SOURCE_COLORS[source] ??
    (source.startsWith("@") ? X_COLOR : DEFAULT_COLOR);
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colorClass}`}
    >
      {source}
    </span>
  );
}
