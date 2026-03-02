export interface FeedConfig {
  url: string;
  source: string; // Display name
}

export const RSS_FEEDS: FeedConfig[] = [
  // ── Google News targeted searches ─────────────────────────────────────────
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

  // ── UI / UX Design ────────────────────────────────────────────────────────
  {
    url: "https://www.nngroup.com/feed/rss/",
    source: "Nielsen Norman Group",
  },
  {
    url: "https://uxdesign.cc/feed",
    source: "UX Collective",
  },
  {
    url: "https://maze.co/blog/feed/",
    source: "Maze Blog",
  },
  {
    url: "https://baymard.com/blog/atom",
    source: "Baymard Institute",
  },
  {
    url: "https://www.lukew.com/ff/atom.xml",
    source: "LukeW",
  },

  // ── Conversion Rate Optimization ──────────────────────────────────────────
  {
    url: "https://cxl.com/blog/feed/",
    source: "CXL Blog",
  },
  {
    url: "https://vwo.com/blog/feed/",
    source: "VWO Blog",
  },
  {
    url: "https://copyhackers.com/feed/",
    source: "Copy Hackers",
  },
  {
    url: "https://www.widerfunnel.com/feed/",
    source: "WiderFunnel",
  },
  {
    url: "https://www.invespcro.com/blog/feed/",
    source: "Invesp Blog",
  },

  // ── Supplements & Nutraceuticals ──────────────────────────────────────────
  {
    url: "https://www.nutraingredients-usa.com/rss/headlines-rss.asp",
    source: "NutraIngredients USA",
  },
  {
    url: "https://www.nutraceuticalsworld.com/rss/",
    source: "Nutraceuticals World",
  },
  {
    url: "https://www.nutritionaloutlook.com/rss/",
    source: "Nutritional Outlook",
  },
  {
    url: "https://www.supplysidesj.com/rss/",
    source: "Supply Side SJ",
  },
  {
    url: "https://crescentedgeconsulting.com/blog/feed/",
    source: "Crescent Edge",
  },

  // ── Ecommerce — Sites & Newsletters ──────────────────────────────────────
  {
    url: "https://futurecommerce.com/feed",
    source: "Future Commerce",
  },
  {
    url: "https://2pml.com/feed/",
    source: "2PM",
  },
  {
    url: "https://9operators.com/rss",
    source: "9 Operators",
  },
  {
    url: "https://dtcnewsletter.com/feed/",
    source: "DTC Newsletter",
  },
  {
    url: "https://www.shopifreaks.com/feed/",
    source: "Shopifreaks",
  },
  {
    url: "https://www.digitalcommerce360.com/feed/",
    source: "Digital Commerce 360",
  },
  {
    url: "https://www.practicalecommerce.com/feed",
    source: "Practical Ecommerce",
  },
  {
    url: "https://www.retaildive.com/feeds/news/",
    source: "Retail Dive",
  },
  {
    url: "https://www.modernretail.co/feed/",
    source: "Modern Retail",
  },
  {
    url: "https://www.glossy.co/feed/",
    source: "Glossy",
  },
  {
    url: "https://www.ecommercefuel.com/feed/",
    source: "eCommerceFuel",
  },

  // ── Marketing ─────────────────────────────────────────────────────────────
  {
    url: "https://www.klaviyo.com/blog/feed",
    source: "Klaviyo Blog",
  },
  {
    url: "https://www.triplewhale.com/blog/rss.xml",
    source: "Triple Whale",
  },
  {
    url: "https://ahrefs.com/blog/feed/",
    source: "Ahrefs Blog",
  },
  {
    url: "https://www.thinkwithgoogle.com/rss/",
    source: "Think With Google",
  },
  {
    url: "https://marketingexamples.com/rss",
    source: "Marketing Examples",
  },
  {
    url: "https://nogood.io/blog/feed/",
    source: "NoGood",
  },
  {
    url: "https://contentmarketinginstitute.com/feed/",
    source: "CMI",
  },
  {
    url: "https://moz.com/blog/feed",
    source: "Moz Blog",
  },
  {
    url: "https://www.searchenginejournal.com/feed/",
    source: "Search Engine Journal",
  },
  {
    url: "https://www.adweek.com/feed/",
    source: "Adweek",
  },
  {
    url: "https://digiday.com/feed/",
    source: "Digiday",
  },

  // ── Analytics & Attribution ───────────────────────────────────────────────
  {
    url: "https://www.northbeam.io/blog/rss.xml",
    source: "Northbeam",
  },
  {
    url: "https://www.rockerbox.com/blog/rss.xml",
    source: "Rockerbox",
  },
  {
    url: "https://measured.com/blog/feed/",
    source: "Measured",
  },
  {
    url: "https://www.getelevar.com/blog/feed/",
    source: "Elevar",
  },
  {
    url: "https://www.emarketer.com/rss/articles",
    source: "eMarketer",
  },

  // ── Retention, LTV & Loyalty ──────────────────────────────────────────────
  {
    url: "https://newsletter.retentionx.com/feed",
    source: "RetentionX",
  },
  {
    url: "https://www.yotpo.com/blog/feed/",
    source: "Yotpo Blog",
  },
  {
    url: "https://www.gorgias.com/blog/rss.xml",
    source: "Gorgias Blog",
  },
  {
    url: "https://www.postpilot.com/blog/feed/",
    source: "PostPilot",
  },
  {
    url: "https://www.omnisend.com/blog/feed/",
    source: "Omnisend Blog",
  },
  {
    url: "https://www.postscript.io/blog/feed/",
    source: "Postscript Blog",
  },

  // ── Social Commerce & Creator Economy ────────────────────────────────────
  {
    url: "https://creatoriq.com/blog/feed/",
    source: "CreatorIQ",
  },
  {
    url: "https://later.com/blog/feed/",
    source: "Later Blog",
  },
  {
    url: "https://www.socialmediaexaminer.com/feed/",
    source: "Social Media Examiner",
  },
  {
    url: "https://www.getsaral.com/resources/feed/",
    source: "SARAL",
  },

  // ── Shopify Ecosystem ─────────────────────────────────────────────────────
  {
    url: "https://www.shopify.com/blog.atom",
    source: "Shopify Blog",
  },
  {
    url: "https://www.shopify.com/partners/blog.atom",
    source: "Shopify Partners",
  },
  {
    url: "https://shopify.engineering/feed",
    source: "Shopify Engineering",
  },
  {
    url: "https://changelog.shopify.com/rss",
    source: "Shopify Changelog",
  },

  // ── Agency & operator blogs ───────────────────────────────────────────────
  {
    url: "https://commonthreadco.com/blogs/coachs-corner.atom",
    source: "Common Thread Co",
  },
  {
    url: "https://smartmarketer.com/feed/",
    source: "Smart Marketer",
  },

  // ── Podcasts ──────────────────────────────────────────────────────────────
  {
    url: "https://dtcpod.com/rss",
    source: "DTC Pod",
  },
  {
    url: "https://feeds.simplecast.com/RGFJqhzS",
    source: "Unofficial Shopify Podcast",
  },
  {
    url: "https://futurecommerce.com/podcast/feed",
    source: "Future Commerce Podcast",
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
  "email marketing ecommerce 2026",
  "supplement industry news",
];
