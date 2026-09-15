// Best official "go straight to the deal" page per chain (owner request, 2026-09-15:
// "Get deal" was landing on bare homepages for 6 of 10 deals). Used three ways:
//   - build.mjs: a deal whose url is a bare homepage is redirected to this page;
//   - refresh-deals.mjs: the 404 fallback becomes this page instead of the homepage;
//   - the prompt tells the model a specific page always beats a homepage.
// A deep link the model found for the specific offer is NEVER overridden.
// Every URL below was checked 2026-09-15: 200 in a plain fetch, or 403 only for
// non-browser clients (Panera, ShopRite, Meijer bot-block scripts but serve people).
// Re-verify when a chain redesigns; a dead entry here is worse than a homepage.

const PAGES = {
  "panera": "https://www.panerabread.com/en-us/panera-promo-codes-discount-coupons-deals.html",
  "noodles & company": "https://www.noodles.com/coupons",
  "el pollo loco": "https://www.elpolloloco.com/promotions",
  "salad and go": "https://saladandgo.com/menu",
  "rubio's": "https://www.rubios.com/menu",
  "waba grill": "https://www.wabagrill.com/menu",
  "chipotle": "https://www.chipotle.com/rewards",
  "cava": "https://cava.com/rewards",
  "sweetgreen": "https://www.sweetgreen.com/menu",
  "tropical smoothie": "https://www.tropicalsmoothiecafe.com/rewards",
  "smoothie king": "https://www.smoothieking.com/healthy-rewards",
  "jamba": "https://www.jamba.com/menu",
  "qdoba": "https://www.qdoba.com/rewards",
  "potbelly": "https://www.potbelly.com/menu",
  "the halal guys": "https://thehalalguys.com/menu",
  "starbucks": "https://www.starbucks.com/rewards",
  "subway": "https://newsroom.subway.com/2026-04-28-Subway-R-Introduces-Its-First-Ever-Value-Menu-with-15-Entrees-Under-5",
  "tijuana flats": "https://www.tijuanaflats.com/promotions/specials-and-deals",
  "publix": "https://www.publix.com/savings/weekly-ad/deli",
  "sprouts": "https://www.sprouts.com/faqs/what-is-sushi-wednesday/",
  "safeway": "https://www.safeway.com/weeklyad/",
  "hy-vee": "https://www.hy-vee.com/deals/weekly-ads",
  "h-e-b": "https://www.heb.com/category/shop/deli-prepared-food/ready-meals-snacks/sushi/490061/490236",
  "shoprite": "https://www.shoprite.com/categories/prepared-foods/sushi-seafood-id-520585",
  "meijer": "https://www.meijer.com/shopping/deli-prepared-food/sushi.html",
};

const ALIASES = {
  "panera bread": "panera",
  "rubio's coastal grill": "rubio's", "rubios": "rubio's",
  "tropical smoothie cafe": "tropical smoothie",
  "noodles and company": "noodles & company",
  "sprouts farmers market": "sprouts",
  "heb": "h-e-b", "hyvee": "hy-vee",
  "halal guys": "the halal guys",
};

const norm = b => {
  const k = String(b || "").toLowerCase().trim().replace(/[‘’ʼ]/g, "'").replace(/\s+/g, " ");
  return ALIASES[k] || k;
};

export function dealPageFor(brand) { return PAGES[norm(brand)] || null; }

export function isHomepage(url) {
  try { const u = new URL(url); return (u.pathname === "/" || u.pathname === "") && !u.search && !u.hash; } catch { return !url; }
}

// Returns the better url for a deal: the model's specific page if it has one, else the
// chain's known deal page, else the original (possibly a homepage).
export function bestDealUrl(brand, url) {
  if (url && !isHomepage(url)) return url;
  return dealPageFor(brand) || url;
}
