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

  // Reddit
  {
    url: "https://www.reddit.com/r/ecommerce/.rss",
    source: "r/ecommerce",
  },
  {
    url: "https://www.reddit.com/r/supplements/.rss",
    source: "r/supplements",
  },
  {
    url: "https://www.reddit.com/r/entrepreneur/.rss",
    source: "r/entrepreneur",
  },
  {
    url: "https://www.reddit.com/r/digital_marketing/.rss",
    source: "r/digital_marketing",
  },

  // Shopify
  {
    url: "https://www.shopify.com/blog/topics/marketing/rss",
    source: "Shopify Blog",
  },

  // CXL (Conversion XL)
  {
    url: "https://cxl.com/blog/feed/",
    source: "CXL Blog",
  },

  // Klaviyo
  {
    url: "https://www.klaviyo.com/blog/feed",
    source: "Klaviyo Blog",
  },

  // DTC-focused newsletters on Substack
  {
    url: "https://niksharmahq.substack.com/feed",
    source: "Nik Sharma",
  },
  {
    url: "https://dtcnewsletter.com/feed/",
    source: "DTC Newsletter",
  },
  {
    url: "https://creativeos.substack.com/feed",
    source: "Creative OS",
  },

  // Marketing Operators
  {
    url: "https://marketingoperators.substack.com/feed",
    source: "Marketing Operators",
  },

  // Contrarian Thinking / DTC focused
  {
    url: "https://www.contractornation.com/feed/",
    source: "DTC Feed",
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
