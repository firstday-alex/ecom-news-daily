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

  // Reddit (old.reddit.com is more permissive with non-browser agents)
  {
    url: "https://old.reddit.com/r/ecommerce/.rss?limit=25",
    source: "r/ecommerce",
  },
  {
    url: "https://old.reddit.com/r/supplements/.rss?limit=25",
    source: "r/supplements",
  },
  {
    url: "https://old.reddit.com/r/entrepreneur/.rss?limit=25",
    source: "r/entrepreneur",
  },
  {
    url: "https://old.reddit.com/r/digital_marketing/.rss?limit=25",
    source: "r/digital_marketing",
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

  // DTC-focused Substacks
  {
    url: "https://niksharma.substack.com/feed",
    source: "Nik Sharma",
  },
  {
    url: "https://creativeos.substack.com/feed",
    source: "Creative OS",
  },
  {
    url: "https://dtcpod.substack.com/feed",
    source: "DTC Podcast",
  },

  // Industry blogs
  {
    url: "https://www.omnisend.com/blog/feed/",
    source: "Omnisend Blog",
  },
  {
    url: "https://commonthreadco.com/blogs/coachs-corner.atom",
    source: "Common Thread Co",
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
