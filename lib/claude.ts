import Anthropic from "@anthropic-ai/sdk";
import type { RawArticle, Article, Category, ALL_CATEGORIES } from "./types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const VALID_CATEGORIES: Category[] = [
  "CRO",
  "Retention",
  "Ecommerce",
  "Supplements",
  "Paid Ads",
  "Email Marketing",
  "Social Commerce",
  "Industry News",
];

const BATCH_SIZE = 10;

interface ClaudeArticleResult {
  summary: string;
  categories: Category[];
}

function generateId(url: string): string {
  // Simple hash for deduplication
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36).padStart(8, "0");
}

async function processBatch(
  articles: RawArticle[]
): Promise<ClaudeArticleResult[]> {
  const input = articles.map((a, i) => ({
    index: i,
    title: a.title,
    source: a.source,
    snippet: a.contentSnippet || "",
  }));

  const prompt = `You are an analyst for a supplement and vitamin ecommerce company.
Analyze these articles and for each one provide:
1. A 2-3 sentence summary focused on what's actionable or relevant for a supplement/vitamin ecommerce operator
2. 1-3 category tags from ONLY this list: ${VALID_CATEGORIES.join(", ")}

Return a JSON array with exactly ${articles.length} objects in the same order as the input.
Each object must have: { "summary": string, "categories": string[] }

Articles:
${JSON.stringify(input, null, 2)}

Return only valid JSON, no markdown, no explanation.`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Strip markdown code fences if present
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned) as Array<{
    summary: string;
    categories: string[];
  }>;

  return parsed.map((item) => ({
    summary: item.summary || "",
    categories: (item.categories || []).filter((c): c is Category =>
      VALID_CATEGORIES.includes(c as Category)
    ),
  }));
}

export async function processArticles(
  rawArticles: RawArticle[],
  fetchedAt: string
): Promise<{ articles: Article[]; errors: string[] }> {
  const articles: Article[] = [];
  const errors: string[] = [];

  // Process in batches
  for (let i = 0; i < rawArticles.length; i += BATCH_SIZE) {
    const batch = rawArticles.slice(i, i + BATCH_SIZE);

    try {
      const results = await processBatch(batch);

      for (let j = 0; j < batch.length; j++) {
        const raw = batch[j];
        const result = results[j] ?? { summary: null, categories: [] };

        articles.push({
          id: generateId(raw.url),
          title: raw.title,
          url: raw.url,
          source: raw.source,
          summary: result.summary || null,
          categories:
            result.categories.length > 0
              ? result.categories
              : ["Industry News"],
          publishedAt: raw.publishedAt,
          fetchedAt,
        });
      }
    } catch (err) {
      errors.push(`Claude batch ${i / BATCH_SIZE + 1}: ${String(err)}`);

      // Store articles without summary rather than dropping them
      for (const raw of batch) {
        articles.push({
          id: generateId(raw.url),
          title: raw.title,
          url: raw.url,
          source: raw.source,
          summary: null,
          categories: ["Industry News"],
          publishedAt: raw.publishedAt,
          fetchedAt,
        });
      }
    }

    // Small delay between batches to avoid rate limits
    if (i + BATCH_SIZE < rawArticles.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return { articles, errors };
}
