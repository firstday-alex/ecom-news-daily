export type Category =
  | "CRO"
  | "Retention"
  | "Ecommerce"
  | "Supplements"
  | "Paid Ads"
  | "Email Marketing"
  | "Social Commerce"
  | "Industry News";

export const ALL_CATEGORIES: Category[] = [
  "CRO",
  "Retention",
  "Ecommerce",
  "Supplements",
  "Paid Ads",
  "Email Marketing",
  "Social Commerce",
  "Industry News",
];

export interface RawArticle {
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO 8601
  contentSnippet?: string;
}

export interface Article {
  id: string; // SHA-256 hash of URL (first 12 chars)
  title: string;
  url: string;
  source: string;
  summary: string | null; // null if Claude processing failed
  categories: Category[];
  publishedAt: string; // ISO 8601
  fetchedAt: string; // ISO 8601
}

export interface DailyDigest {
  date: string; // YYYY-MM-DD
  articles: Article[];
  generatedAt: string; // ISO 8601
  articleCount: number;
}

export interface CronResult {
  date: string;
  processed: number;
  skipped: number;
  errors: string[];
}
