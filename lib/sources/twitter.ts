import Parser from "rss-parser";
import { subHours } from "date-fns";
import type { RawArticle } from "../types";

// Nitter instances tried in order — first one that responds wins
const NITTER_INSTANCES = [
  "nitter.privacydev.net",
  "nitter.poast.org",
  "nitter.1d4.us",
  "nitter.mint.lgbt",
];

export interface XAccount {
  username: string;
  displayName: string;
}

// Vetted DTC operators & agency owners — successful businesses, active on X
export const X_ACCOUNTS: XAccount[] = [
  { username: "niksharmaa", displayName: "Nik Sharma" },         // DTC advisor/operator, Sharma Brands
  { username: "chasedimond", displayName: "Chase Dimond" },       // Email marketing, 8-fig DTC brands
  { username: "codyplofker", displayName: "Cody Plofker" },       // CMO, Jones Road Beauty
  { username: "andrewjfaris", displayName: "Andrew Faris" },      // DTC operator & podcast host
  { username: "dara_denney", displayName: "Dara Denney" },        // Performance creative, ex-Thesis
  { username: "taylorholiday", displayName: "Taylor Holiday" },   // CEO, Common Thread Co
  { username: "ezrafirestone", displayName: "Ezra Firestone" },   // Founder, Smart Marketer / BOOM!
  { username: "nschackelford", displayName: "Nick Shackelford" }, // Founder, Structured Social
  { username: "kurtelster", displayName: "Kurt Elster" },         // Shopify consultant, Ethercycle
  { username: "drewsanocki", displayName: "Drew Sanocki" },       // Founder, Nerd Marketing / retention
];

const parser = new Parser({
  timeout: 8000,
  xml: { strict: false },
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});

async function fetchXAccountFeed(
  account: XAccount,
  maxAgeHours: number
): Promise<RawArticle[]> {
  const cutoff = subHours(new Date(), maxAgeHours);

  for (const instance of NITTER_INSTANCES) {
    try {
      const url = `https://${instance}/${account.username}/rss`;
      const result = await parser.parseURL(url);
      const articles: RawArticle[] = [];

      for (const item of result.items) {
        if (!item.title || !item.link) continue;

        // Skip retweets — only original posts from the account
        if (item.title.startsWith("RT by ")) continue;

        const pubDate = item.pubDate
          ? new Date(item.pubDate)
          : item.isoDate
            ? new Date(item.isoDate)
            : null;

        if (!pubDate || isNaN(pubDate.getTime())) continue;
        if (pubDate < cutoff) continue;

        // Rewrite nitter link back to x.com so end users land on the real post
        const xUrl = item.link
          .trim()
          .replace(`https://${instance}/`, "https://x.com/");

        articles.push({
          title: item.title.trim(),
          url: xUrl,
          source: `@${account.username}`,
          publishedAt: pubDate.toISOString(),
          contentSnippet: item.contentSnippet
            ? item.contentSnippet.slice(0, 500)
            : undefined,
        });
      }

      return articles; // success — stop trying other instances
    } catch {
      // try next instance
    }
  }

  return []; // all instances failed for this account
}

export async function fetchXAccounts(
  accounts: XAccount[],
  maxAgeHours = 25
): Promise<{ articles: RawArticle[]; errors: string[] }> {
  const results = await Promise.allSettled(
    accounts.map((account) => fetchXAccountFeed(account, maxAgeHours))
  );

  const articles: RawArticle[] = [];
  const errors: string[] = [];

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "fulfilled") {
      articles.push(...result.value);
    } else {
      errors.push(`X @${accounts[i].username}: ${result.reason}`);
    }
  }

  return { articles, errors };
}
