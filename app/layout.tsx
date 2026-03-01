import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecom News Daily — Supplement & DTC Intelligence",
  description:
    "Daily competitive intelligence digest for supplement and vitamin ecommerce operators. CRO, retention, paid ads, and industry news — curated and summarized by AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-zinc-200 antialiased">
        <header className="border-b border-zinc-800 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-emerald-500 text-lg font-bold font-mono">
                ⚡ EcomIntel
              </span>
              <span className="text-xs text-zinc-600 hidden sm:block">
                Daily digest for supplement & DTC operators
              </span>
            </div>
            <nav className="flex items-center gap-4 text-sm text-zinc-500">
              <a href="/" className="hover:text-zinc-200 transition-colors">
                Today
              </a>
              <a
                href="/api/cron/fetch-news"
                className="hidden text-xs font-mono text-zinc-700 hover:text-zinc-500 transition-colors"
                title="Trigger refresh (requires CRON_SECRET)"
              >
                [refresh]
              </a>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-zinc-900 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-zinc-700 flex justify-between items-center">
            <span>EcomIntel — AI-powered daily digest</span>
            <span>Updates daily at 7 AM UTC</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
