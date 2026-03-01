import type { Article, DailyDigest } from "./types";
import { format } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");

const MOCK_ARTICLES: Article[] = [
  {
    id: "mock001",
    title: "How Momentous Grew Supplement Revenue 3x With Personalized Quiz Funnels",
    url: "#",
    source: "DTC Newsletter",
    summary:
      "Momentous implemented a multi-step Octane AI quiz that segments customers by fitness goal, then delivers personalized product bundles. The result was a 34% lift in AOV and 3x revenue growth over 18 months. Key insight: quiz completion rates improve when you ask about goals before products.",
    categories: ["CRO", "Ecommerce"],
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
  {
    id: "mock002",
    title: "Email Winback Flows That Actually Convert: Lessons from 50 DTC Brands",
    url: "#",
    source: "Klaviyo Blog",
    summary:
      "An analysis of 50 DTC email programs found that 3-step winback flows with a discount in email #2 (not #1) outperform discount-first approaches by 22%. Brands that personalized the subject line with the customer's last purchase saw 41% higher open rates.",
    categories: ["Email Marketing", "Retention"],
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
  {
    id: "mock003",
    title: "FDA Proposes New Labeling Rules for Pre-Workout Supplements",
    url: "#",
    source: "Google News: Regulations",
    summary:
      "The FDA has released draft guidance requiring pre-workout supplements to list all stimulant compounds individually on the Supplement Facts panel. Brands have 18 months to comply. This affects proprietary blends — operators should audit formulations now.",
    categories: ["Supplements", "Industry News"],
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
  {
    id: "mock004",
    title: "Shopify's New A/B Testing Native Feature Is Actually Good",
    url: "#",
    source: "Shopify Blog",
    summary:
      "Shopify launched native storefront A/B testing for Themes, enabling split tests on landing pages, PDPs, and cart flows without third-party apps. The built-in analytics tie directly to revenue attribution — a major win for Shopify merchants running conversion experiments.",
    categories: ["CRO", "Ecommerce"],
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
  {
    id: "mock005",
    title: "Meta Ads CPMs for Supplement Brands Up 18% YoY — What's Working Now",
    url: "#",
    source: "r/ecommerce",
    summary:
      "Supplement brands are seeing rising Meta CPMs, but brands running UGC testimonials vs. studio creative are seeing 2-3x better ROAS. The winning format in Q1 2025: 15-second before/after Reels with a voiceover benefit stack. Advantage+ Shopping Campaigns now outperform manual targeting for cold audiences.",
    categories: ["Paid Ads", "Supplements"],
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
  {
    id: "mock006",
    title: "Subscription Retention Benchmark Report: Supplement Industry 2025",
    url: "#",
    source: "Nik Sharma",
    summary:
      "The average 90-day subscription retention rate for supplement brands sits at 58%, but top performers hit 74%+ by combining 3 tactics: flexible skip/pause flows, loyalty points for consecutive orders, and a results check-in SMS at day 30.",
    categories: ["Retention", "Supplements"],
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
  {
    id: "mock007",
    title: "TikTok Shop Hits $100B GMV Milestone — What DTC Brands Need to Know",
    url: "#",
    source: "Google News: DTC",
    summary:
      "TikTok Shop has crossed $100B in global GMV, with health and wellness as the #1 category by volume. Brands operating affiliate programs on TikTok Shop report up to 40% of their revenue coming from creator-driven organic content. The shop-from-video attribution model is challenging traditional paid social metrics.",
    categories: ["Social Commerce", "Ecommerce"],
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
  {
    id: "mock008",
    title: "CRO Teardown: How AG1's PDP Converts at 6.2% (Industry Average: 2.4%)",
    url: "#",
    source: "CXL Blog",
    summary:
      "A detailed teardown of Athletic Greens' product page reveals 7 conversion levers: persistent add-to-cart bar, social proof counter, benefit-led copy above the fold, side-by-side comparison vs. buying separately, 90-day guarantee, subscription savings callout, and an FAQ that addresses objections inline.",
    categories: ["CRO", "Supplements"],
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
  {
    id: "mock009",
    title: "SMS Marketing Open Rates Hit 98% — But Here's What Kills Opt-In Rates",
    url: "#",
    source: "Marketing Operators",
    summary:
      "SMS remains the highest-engagement channel, but supplement brands are seeing opt-in rates drop as consumers grow wary of text spam. Brands using VIP perks framing see 2.4x higher opt-in rates. Placing the SMS opt-in post-purchase converts at 11% vs. 3% on product pages.",
    categories: ["Email Marketing", "Retention"],
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
  {
    id: "mock010",
    title: "How Seed Rebuilt Their DTC Site for Core Web Vitals — Revenue Up 14%",
    url: "#",
    source: "r/ecommerce",
    summary:
      "Seed Health rebuilt their Shopify theme to achieve LCP under 2.5s across all pages. The performance improvements drove a 14% lift in revenue by reducing bounce rate 22%. Key moves: lazy loading below-fold images, next-gen image formats, and eliminating third-party scripts from the critical path.",
    categories: ["CRO", "Ecommerce"],
    publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
  {
    id: "mock011",
    title: "Amazon FBA vs DTC: Supplement Brands Share What Actually Works in 2025",
    url: "#",
    source: "r/supplements",
    summary:
      "Supplement brand operators report: Amazon FBA generates 60-70% of volume but DTC is 2x more profitable per unit. Winning hybrid strategy: use Amazon for top-of-funnel discovery, DTC for subscription LTV. First-party data from DTC makes Meta ads 30-40% cheaper.",
    categories: ["Ecommerce", "Supplements"],
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
  {
    id: "mock012",
    title: "Loyalty Program Benchmark: Points vs. Tiers vs. VIP Access for Health Brands",
    url: "#",
    source: "Klaviyo Blog",
    summary:
      "Health and wellness brands using tiered VIP loyalty programs retain 31% more subscribers at 12 months vs. points-only programs. The highest-performing mechanic: unlocking exclusive formulations or early product access for top-tier members — not just discounts, which erode margins.",
    categories: ["Retention", "Ecommerce"],
    publishedAt: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(),
    fetchedAt: new Date().toISOString(),
  },
];

export const MOCK_DIGEST: DailyDigest = {
  date: today,
  articles: MOCK_ARTICLES,
  generatedAt: new Date().toISOString(),
  articleCount: MOCK_ARTICLES.length,
};
