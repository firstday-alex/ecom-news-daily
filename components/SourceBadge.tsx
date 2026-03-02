const SOURCE_COLORS: Record<string, string> = {
  // UX / Design
  "Nielsen Norman Group": "bg-slate-900/60 text-slate-300 border-slate-700/50",
  "UX Collective":        "bg-slate-900/60 text-slate-300 border-slate-700/50",
  "Maze Blog":            "bg-slate-900/60 text-slate-300 border-slate-700/50",
  "Baymard Institute":    "bg-slate-900/60 text-slate-300 border-slate-700/50",
  "LukeW":               "bg-slate-900/60 text-slate-300 border-slate-700/50",
  // CRO
  "CXL Blog":            "bg-yellow-900/40 text-yellow-400 border-yellow-800/50",
  "VWO Blog":            "bg-yellow-900/40 text-yellow-400 border-yellow-800/50",
  "Copy Hackers":        "bg-yellow-900/40 text-yellow-400 border-yellow-800/50",
  "WiderFunnel":         "bg-yellow-900/40 text-yellow-400 border-yellow-800/50",
  "Invesp Blog":         "bg-yellow-900/40 text-yellow-400 border-yellow-800/50",
  // Supplements
  "NutraIngredients USA":  "bg-lime-900/40 text-lime-400 border-lime-800/50",
  "Nutraceuticals World":  "bg-lime-900/40 text-lime-400 border-lime-800/50",
  "Nutritional Outlook":   "bg-lime-900/40 text-lime-400 border-lime-800/50",
  "Supply Side SJ":        "bg-lime-900/40 text-lime-400 border-lime-800/50",
  "Crescent Edge":         "bg-lime-900/40 text-lime-400 border-lime-800/50",
  // Ecommerce news
  "Future Commerce":       "bg-violet-900/40 text-violet-400 border-violet-800/50",
  "2PM":                   "bg-zinc-700/60 text-zinc-300 border-zinc-600/50",
  "9 Operators":           "bg-violet-900/40 text-violet-400 border-violet-800/50",
  "DTC Newsletter":        "bg-violet-900/40 text-violet-400 border-violet-800/50",
  "Shopifreaks":           "bg-violet-900/40 text-violet-400 border-violet-800/50",
  "Digital Commerce 360":  "bg-violet-900/40 text-violet-400 border-violet-800/50",
  "Practical Ecommerce":   "bg-violet-900/40 text-violet-400 border-violet-800/50",
  "Retail Dive":           "bg-violet-900/40 text-violet-400 border-violet-800/50",
  "Modern Retail":         "bg-violet-900/40 text-violet-400 border-violet-800/50",
  "Glossy":                "bg-pink-900/40 text-pink-400 border-pink-800/50",
  "eCommerceFuel":         "bg-violet-900/40 text-violet-400 border-violet-800/50",
  // Marketing
  "Klaviyo Blog":          "bg-green-900/40 text-green-400 border-green-800/50",
  "Triple Whale":          "bg-cyan-900/40 text-cyan-400 border-cyan-800/50",
  "Ahrefs Blog":           "bg-orange-900/40 text-orange-400 border-orange-800/50",
  "Think With Google":     "bg-blue-900/40 text-blue-400 border-blue-800/50",
  "Marketing Examples":    "bg-red-900/40 text-red-400 border-red-800/50",
  "NoGood":                "bg-orange-900/40 text-orange-400 border-orange-800/50",
  "CMI":                   "bg-amber-900/40 text-amber-400 border-amber-800/50",
  "Moz Blog":              "bg-indigo-900/40 text-indigo-400 border-indigo-800/50",
  "Search Engine Journal": "bg-orange-900/40 text-orange-400 border-orange-800/50",
  "Adweek":                "bg-blue-900/40 text-blue-400 border-blue-800/50",
  "Digiday":               "bg-blue-900/40 text-blue-400 border-blue-800/50",
  // Analytics
  "Northbeam":   "bg-purple-900/40 text-purple-400 border-purple-800/50",
  "Rockerbox":   "bg-purple-900/40 text-purple-400 border-purple-800/50",
  "Measured":    "bg-purple-900/40 text-purple-400 border-purple-800/50",
  "Elevar":      "bg-purple-900/40 text-purple-400 border-purple-800/50",
  "eMarketer":   "bg-purple-900/40 text-purple-400 border-purple-800/50",
  // Retention / Loyalty
  "RetentionX":    "bg-rose-900/40 text-rose-400 border-rose-800/50",
  "Yotpo Blog":    "bg-rose-900/40 text-rose-400 border-rose-800/50",
  "Gorgias Blog":  "bg-rose-900/40 text-rose-400 border-rose-800/50",
  "PostPilot":     "bg-rose-900/40 text-rose-400 border-rose-800/50",
  "Omnisend Blog": "bg-rose-900/40 text-rose-400 border-rose-800/50",
  "Postscript Blog": "bg-fuchsia-900/40 text-fuchsia-400 border-fuchsia-800/50",
  // Social Commerce
  "CreatorIQ":           "bg-sky-900/40 text-sky-400 border-sky-800/50",
  "Later Blog":          "bg-sky-900/40 text-sky-400 border-sky-800/50",
  "Social Media Examiner": "bg-sky-900/40 text-sky-400 border-sky-800/50",
  "SARAL":               "bg-sky-900/40 text-sky-400 border-sky-800/50",
  // Shopify
  "Shopify Blog":       "bg-emerald-900/40 text-emerald-400 border-emerald-800/50",
  "Shopify Partners":   "bg-emerald-900/40 text-emerald-400 border-emerald-800/50",
  "Shopify Engineering": "bg-emerald-900/40 text-emerald-400 border-emerald-800/50",
  "Shopify Changelog":  "bg-emerald-900/40 text-emerald-400 border-emerald-800/50",
  // Agency / operator
  "Common Thread Co": "bg-orange-900/40 text-orange-400 border-orange-800/50",
  "Smart Marketer":   "bg-red-900/40 text-red-400 border-red-800/50",
  // Podcasts
  "DTC Pod":                    "bg-teal-900/40 text-teal-400 border-teal-800/50",
  "Unofficial Shopify Podcast": "bg-teal-900/40 text-teal-400 border-teal-800/50",
  "Future Commerce Podcast":    "bg-teal-900/40 text-teal-400 border-teal-800/50",
};

const DEFAULT_COLOR = "bg-zinc-800/60 text-zinc-400 border-zinc-700/50";

// X/Twitter handles get a consistent near-black color
const X_COLOR = "bg-zinc-900/60 text-zinc-100 border-zinc-600/50";

interface SourceBadgeProps {
  source: string;
}

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
