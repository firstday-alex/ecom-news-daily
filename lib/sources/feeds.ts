export interface FeedConfig {
  url: string;
  source: string; // Display name
}

export const RSS_FEEDS: FeedConfig[] = [
  // Google News - targeted searches
  {
    url: "https://news.google.com/rss/search?q=ecommerce+conversion+rate+optimization&hl=en-US&gl=US&ceid=US:en",
    source: "Google News: CRO",
  },
  {
    url: "https://news.google.com/rss/search?q=supplement+vitamin+ecommerce+DTC&hl=en-US&gl=US&ceid=US:en",
    source: "Google News: Supplements",
  },
  {
    url: "https://news.google.com/rss/search?q=customer+retention+ecommerce&hl=en-US&gl=US&ceid=US:en",
    source: "Google News: Retention",
  },
  {
    url: "https://news.google.com/rss/search?q=DTC+direct-to-consumer+marketing&hl=en-US&gl=US&ceid=US:en",
    source: "Google News: DTC",
  },
  {
    url: "https://news.google.com/rss/search?q=email+marketing+ecommerce&hl=en-US&gl=US&ceid=US:en",
    source: "Google News: Email",
  },
  {
    url: "https://news.google.com/rss/search?q=supplement+industry+FDA+regulation&hl=en-US&gl=US&ceid=US:en",
    source: "Google News: Regulations",
  },

  // Shopify
  {
    url: "https://www.shopify.com/blog.atom",
    source: "Shopify Blog",
  },

  // CXL (Conversion XL) — lenient XML parser handles their malformed feed
  {
    url: "https://cxl.com/blog/feed/",
    source: "CXL Blog",
  },

  // Agency & operator blogs
  {
    url: "https://commonthreadco.com/blogs/coachs-corner.atom",
    source: "Common Thread Co",
  },
  {
    url: "https://smartmarketer.com/feed/",
    source: "Smart Marketer",
  },

  // Marketing & CRO publications
  {
    url: "https://www.practicalecommerce.com/feed",
    source: "Practical Ecommerce",
  },
  {
    url: "https://www.ecommercefuel.com/feed/",
    source: "eCommerceFuel",
  },
  {
    url: "https://baymard.com/blog/atom",
    source: "Baymard Institute",
  },
  {
    url: "https://vwo.com/blog/feed/",
    source: "VWO Blog",
  },

  // Email & SMS marketing platforms
  {
    url: "https://www.omnisend.com/blog/feed/",
    source: "Omnisend Blog",
  },
  {
    url: "https://www.postscript.io/blog/feed/",
    source: "Postscript Blog",
  },
];

// NewsAPI.org search queries
export const NEWS_API_QUERIES = [
  '"conversion rate optimization" ecommerce',
  '"supplement" OR "vitamin" ecommerce DTC',
  '"customer retention" ecommerce',
  '"direct to consumer" marketing',
  '"email marketing" ecommerce',
  '"A/B testing" ecommerce',
  '"supplement industry"',
  '"shopify" ecommerce marketing',
];

// Bing News Search queries
export const BING_QUERIES = [
  "ecommerce conversion rate optimization",
  "supplement vitamin DTC marketing",
  "customer retention ecommerce tactics",
  "direct to consumer brand marketing",
  "email marketing ecommerce 2025",
  "supplement industry news",
];
