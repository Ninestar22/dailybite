// scripts/build.mjs
// Builds the site from deals.json:
//   1. Injects the deals array into index.html (between DEALS:START/END markers)
//   2. Generates a static, crawlable page per chain (<slug>.html, served at /<slug>)
//   3. Generates sitemap.xml
// No network, no key needed. Run: node scripts/build.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { assignDealIds } from "./deal-id.mjs";
import { bestDealUrl } from "./deal-pages.mjs";
import { loadMeals, mealRow, money } from "./meals.mjs";
import { EVERGREEN as INJECTED_DEALS } from "./injected-deals.mjs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://dailybitedeals.com";

// Fixed roster so chain-page URLs never disappear (good for SEO).
// banned: true = chain is excluded by the healthy whitelist and is NEVER refreshed;
// its page stays live as an honest "why we don't list this" page (authenticity
// decision, Jacob, 2026-08-26) but it is dropped from site navigation.
const CHAINS = [
  { slug: "mcdonalds-deals",   name: "McDonald's", banned: true },
  { slug: "taco-bell-deals",   name: "Taco Bell", banned: true },
  { slug: "wendys-deals",      name: "Wendy's", banned: true },
  { slug: "burger-king-deals", name: "Burger King", banned: true },
  { slug: "chipotle-deals",    name: "Chipotle" },
  { slug: "chick-fil-a-deals", name: "Chick-fil-A" },
  { slug: "starbucks-deals",   name: "Starbucks" },
  { slug: "panera-deals",      name: "Panera" },
  { slug: "pizza-hut-deals",   name: "Pizza Hut", banned: true },
  { slug: "popeyes-deals",     name: "Popeyes", banned: true },
  { slug: "dunkin-deals",      name: "Dunkin'", banned: true },
  { slug: "sonic-deals",       name: "Sonic", banned: true },
  { slug: "arbys-deals",       name: "Arby's", banned: true },
  { slug: "kfc-deals",         name: "KFC", banned: true },
  { slug: "dominos-deals",     name: "Domino's", banned: true },
  { slug: "subway-deals",      name: "Subway" },
  { slug: "sweetgreen-deals",  name: "Sweetgreen" },
  { slug: "potbelly-deals",  name: "Potbelly" },
  { slug: "noodles-and-company-deals",  name: "Noodles & Company" },
  { slug: "chilis-deals",  name: "Chili’s", banned: true },     // removed 2026-09-07 (healthy-only roster)
  { slug: "five-guys-deals",  name: "Five Guys", banned: true }, // removed 2026-09-07 (healthy-only roster)
  { slug: "cava-deals",        name: "CAVA" },
  { slug: "smoothie-king-deals", name: "Smoothie King" },
  { slug: "tropical-smoothie-deals", name: "Tropical Smoothie" },
  { slug: "jamba-deals",       name: "Jamba" },
  { slug: "salad-and-go-deals", name: "Salad and Go", banned: true }, // closed all stores 2026-08-05 (Chapter 11); page redirects home
  { slug: "el-pollo-loco-deals", name: "El Pollo Loco" },
  { slug: "halal-guys-deals",  name: "The Halal Guys" },
  { slug: "nazs-halal-deals",  name: "Naz's Halal Food" },
  { slug: "shahs-halal-deals", name: "Shah's Halal Food" },
  { slug: "tijuana-flats-deals", name: "Tijuana Flats", note: "Tijuana Flats runs Taco Tuesdaze (2 tacos, chips and a drink, about $7.99) and Throwback Thursdaze (burrito or bowl, chips and a drink, about $8.99) at participating FL & Southeast locations: each appears below on its day." },
  { slug: "papa-johns-deals",  name: "Papa John's", banned: true },
  { slug: "einstein-bros-deals", name: "Einstein Bros.", banned: true },
  { slug: "jack-in-the-box-deals", name: "Jack in the Box", banned: true },
  { slug: "whataburger-deals",  name: "Whataburger", banned: true },
  { slug: "del-taco-deals",     name: "Del Taco", banned: true },
  { slug: "ihop-deals",         name: "IHOP", banned: true },
  { slug: "dennys-deals",       name: "Denny's", banned: true },
  { slug: "insomnia-cookies-deals", name: "Insomnia Cookies", banned: true },
  { slug: "wingstop-deals",     name: "Wingstop", banned: true },    // removed 2026-09-07 (healthy-only roster)
  { slug: "qdoba-deals",        name: "Qdoba" },
  { slug: "just-salad-deals",   name: "Just Salad" },
  { slug: "naf-naf-grill-deals", name: "Naf Naf Grill" },
  { slug: "krispy-kreme-deals", name: "Krispy Kreme", banned: true },
  { slug: "kura-sushi-deals",   name: "Kura Sushi" },
  { slug: "pokeworks-deals",    name: "Pokeworks" },
  { slug: "sarku-japan-deals",  name: "Sarku Japan" },
  { slug: "shake-shack-deals",  name: "Shake Shack", banned: true }, // removed 2026-09-07 (healthy-only roster)
  { slug: "safeway-deals",      name: "Safeway", note: "Safeway's standing deal is $5 Friday: every Friday the lineup includes fresh sushi rolls for $5 (regularly $8 to $10) plus other prepared foods like an 8-piece chicken bag. The lineup posts Wednesdays in the weekly ad and varies by division; a free Safeway for U account may be needed. It appears below every Friday." },
  { slug: "harris-teeter-deals", name: "Harris Teeter", note: "Harris Teeter's standing deal is $6 Sushi Friday: select Zenshi rolls (California, Vegetable, Spicy Tuna and Spicy Salmon) are $6 every Friday, regularly about $9.49 to $10.49, in store while supplies last. Seen in store on October 2, 2026. It appears below every Friday." },
  { slug: "kroger-deals",       name: "Kroger", note: "Kroger-family stores (Kroger, Fred Meyer, Fry's, King Soopers, Smith's, QFC, Ralphs) run a Wednesday Only sushi promo at their Snowfox and Zenshi counters: select rolls, spicy tuna and Philly included, at a flat promo price of $6 (up from $5 in 2025). It appears below every Wednesday." },
  { slug: "sprouts-deals",      name: "Sprouts", note: "Sprouts runs Sushi Wednesday in most markets: select Oumi rolls from the in-store sushi case for $6 every Wednesday (verified in store October 2026), no coupon or app needed. It appears below every Wednesday, alongside any other verified Sprouts deli deal." },
  { slug: "publix-deals",       name: "Publix", note: "Publix's standing deal is $5 Sushi Wednesday: select fresh-made rolls (spicy tuna, California, spicy shrimp and more) for $5 at stores with a sushi counter across FL & the Southeast, no coupon or app needed. It appears below every Wednesday." },
  { slug: "heb-deals",          name: "H-E-B", note: "H-E-B's Sushiya counters price select rolls at $7 every Wednesday and again on Saturdays across Texas: no coupon or app needed. Each appears below on its day." },
  { slug: "hy-vee-deals",       name: "Hy-Vee", note: "Participating Hy-Vee stores price select Nori Sushi rolls at $6 every Wednesday and run buy one, get one 50% off on Fridays. Store-run specials: they appear below on their day when verified." },
  { slug: "shoprite-deals",     name: "ShopRite", note: "Participating ShopRite stores run $5.99 Sushi Wednesday: select fresh rolls for $5.99 (regularly $8 to $10), in store only. It appears below every Wednesday." },
  { slug: "meijer-deals",       name: "Meijer", note: "Participating Meijer stores run Sushi Wednesday: select fresh rolls for $5.99 (recently $5). It appears below every Wednesday when verified." },
];

const GUIDES_NAV = `<nav class="chains"><strong>Guides:</strong> <a href="/cheap-healthy-meals">Cheapest Healthy Meals</a> &middot; <a href="/sushi-deals">Sushi Deals</a> &middot; <a href="/healthy-food-deals-report">Deals Report</a> &middot; <a href="/cheap-japanese-food">Cheap Japanese Food</a> &middot; <a href="/trader-joes-healthy-meals">Trader Joe&#39;s</a> &middot; <a href="/birthday-freebies">Birthday Freebies</a> &middot; <a href="/best-fast-food-apps">Best Food Apps</a> &middot; <a href="/5-dollar-meal-deals">$5 Meal Deals</a> &middot; <a href="/student-food-deals">Student Guide</a> &middot; <a href="/late-night-food-deals">Late Night</a> &middot; <a href="/fast-food-happy-hours">Happy Hours</a> &middot; <a href="/cheapest-fast-food-orders">Cheapest Orders</a> &middot; <a href="/fast-food-vs-groceries">vs. Groceries</a> &middot; <a href="/back-to-school-food-deals">Back to School</a> &middot; <a href="/delivery-vs-pickup">Delivery Math</a> &middot; <a href="/verification-log">Verification Log</a> &middot; <a href="/food-deals-by-day">Deals by Day</a> &middot; <a href="/publix-5-sushi-wednesday">Publix $5 Sushi</a> &middot; <a href="/safeway-5-friday-sushi">Safeway $5 Friday</a> &middot; <a href="/panera-4-99-mix-and-match">Panera $4.99</a></nav>`;

// Newsletter signup retired 2026-09-18 (owner: nobody used it, it cluttered the pages). Kept as an
// empty slot so the page templates stay unchanged.
const EMAIL_CAPTURE = "";

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
// Canonical brand key: lowercases and folds known naming variants so per-brand
// dedup, golden/healthy/banned lookups, and evergreen injection can't be
// defeated by an alternate spelling of the same chain (e.g. "Panera Bread" vs "Panera").
const BRAND_ALIASES = { "panera bread": "panera", "chipotle mexican grill": "chipotle", "tropical smoothie cafe": "tropical smoothie", "chick fil a": "chick-fil-a", "mcdonalds": "mcdonald's", "wendys": "wendy's", "dennys": "denny's", "dominos": "domino's", "arbys": "arby's", "sonic drive-in": "sonic", "noodles and company": "noodles & company", "chilis": "chili's", "tijuana flats tex-mex": "tijuana flats", "kura revolving sushi bar": "kura sushi", "kura sushi usa": "kura sushi", "rock n' roll sushi": "rock n roll sushi", "rock & roll sushi": "rock n roll sushi", "rock and roll sushi": "rock n roll sushi", "island fin poke co": "island fin poke", "island fin poke co.": "island fin poke", "publix super markets": "publix", "publix supermarkets": "publix", "publix sushi": "publix", "sprouts farmers market": "sprouts", "whole foods": "whole foods market", "heb": "h-e-b", "h-e-b grocery": "h-e-b", "hyvee": "hy-vee", "hy vee": "hy-vee", "fry's food stores": "fry's", "fry's food and drug": "fry's", "smith's food and drug": "smith's", "winn dixie": "winn-dixie", "stop and shop": "stop & shop", "jewel osco": "jewel-osco", "lowes foods": "lowe's foods", "the kroger co": "kroger", "kroger co": "kroger", "harris teeter supermarkets": "harris teeter", "giant food stores": "giant food", "shop rite": "shoprite", "giant eagle market district": "giant eagle", "market district": "giant eagle", "chopt creative salad co.": "chopt", "chopt creative salad": "chopt", "crisp and green": "crisp & green", "modern market": "modern market eatery", "dig inn": "dig", "bibibop asian grill": "bibibop", "zupas": "cafe zupas", "salata salad kitchen": "salata", "naz's halal": "naz's halal food", "nazs halal": "naz's halal food", "nazs halal food": "naz's halal food", "shah's halal": "shah's halal food", "shahs halal": "shah's halal food", "shahs halal food": "shah's halal food", "bolay fresh bold kitchen": "bolay", "little greek": "little greek fresh grill", "the great greek mediterranean grill": "great greek mediterranean grill", "the great greek": "great greek mediterranean grill", "great greek": "great greek mediterranean grill", "clean eats": "clean eatz", "vitality bowl": "vitality bowls", "rushbowls": "rush bowls", "pressed": "pressed juicery", "the flame broiler": "flame broiler", "flame broiler rice bowl": "flame broiler", "roti modern mediterranean": "roti", "roti mediterranean": "roti", "garbanzo mediterranean fresh": "garbanzo", "pita pit usa": "pita pit", "newk's": "newk's eatery", "newks": "newk's eatery", "newks eatery": "newk's eatery" };
const canonBrand = b => { const k = String(b || "").toLowerCase().trim().replace(/[‘’ʼ]/g, "'").replace(/\s+/g, " "); return BRAND_ALIASES[k] || k; };
// GROCERY (owner request, 2026-08-20): good-value prepared-food deals from grocery stores (sushi days,
// deli and hot-bar meal deals, rotisserie specials) are welcome, from these major chains only. Most are
// regional: they never badge as Top Picks unless listed in NATIONAL_GROCERY.
const GROCERY = new Set(["publix","sprouts","kroger","fred meyer","ralphs","fry's","king soopers","smith's","qfc","harris teeter","safeway","albertsons","vons","jewel-osco","acme markets","shaw's","tom thumb","randalls","food lion","lowe's foods","wegmans","h-e-b","hy-vee","meijer","giant eagle","whole foods market","winn-dixie","shoprite","stop & shop","giant food","giant eagle","market district","walmart","weis markets","lowes foods","hannaford","dierbergs"]); // weis/lowes/hannaford/dierbergs added 2026-09-22 (verified sushi days)
const NATIONAL_GROCERY = new Set(["walmart", "whole foods market"]);
const dealsFor = (name, deals) => deals.filter(d => {
  const b = norm(d.brand), n = norm(name);
  return b.includes(n) || n.includes(b);
});

// Real US-Eastern calendar date via the IANA timezone: the day rolls at midnight ET in
// both EST and EDT (the old fixed UTC-4 offset was an hour off all winter).
const ET = { timeZone: "America/New_York" };
const nowDate = new Date();
const iso = nowDate.toLocaleDateString("en-CA", ET); // YYYY-MM-DD
const monthYear = nowDate.toLocaleDateString("en-US", { month: "long", year: "numeric", ...ET });
const prettyDate = nowDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", ...ET });
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dowET = WEEKDAYS.indexOf(nowDate.toLocaleDateString("en-US", { weekday: "long", ...ET }));

// Machine-readable freshness (growth plan Fix 2, 2026-08-28): a WebPage dateModified
// block on every generated page tells Google, in its own language, that the page was
// updated today: the daily-true signal competitors fake.
const freshLdFor = t => `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": t, "dateModified": iso, "isPartOf": { "@type": "WebSite", "name": "DailyBite", "url": SITE } })}</script>`;

function chainNav(current) {
  // Navigation lists only chains the daily refresh actually covers: linking banned
  // chains next to the healthy roster undercut the site's identity (Jacob, 2026-08-26).
  // Banned chains keep their honest standalone pages, reachable via search/sitemap.
  return CHAINS.filter(c => !c.banned || c.slug === current).map(c => c.slug === current
    ? `<strong>${esc(c.name)}</strong>`
    : `<a href="/${c.slug}">${esc(c.name)}</a>`).join(" &middot; ");
}

const BRAND_DOMAIN_OVERRIDES = {
  "noodles & company": "noodles.com",
  "noodles and company": "noodles.com",
  "taziki's mediterranean cafe": "tazikis.com",
  "taziki's": "tazikis.com",
  "nekter juice bar": "nekterjuicebar.com",
  "chick-fil-a": "chick-fil-a.com",
  "dunkin": "dunkindonuts.com",
  "dunkin'": "dunkindonuts.com",
  "the halal guys": "thehalalguys.com",
  "naz's halal food": "nazshalal.com",
  "shah's halal food": "shahshalalfood.com",
  "einstein bros. bagels": "einsteinbros.com",
  "einstein bros.": "einsteinbros.com",
  "tropical smoothie": "tropicalsmoothiecafe.com",
  "chopt": "choptsalad.com",
  "crisp & green": "crispandgreen.com",
  "modern market eatery": "modernmarket.com",
  "dig": "diginn.com",
  "fresh kitchen": "eatfreshkitchen.com",
  "great greek mediterranean grill": "thegreatgreekgrill.com",
  "the great greek mediterranean grill": "thegreatgreekgrill.com",
  "pressed juicery": "pressed.com",
  "flame broiler": "flamebroilerusa.com",
  "roti": "roti.com",
  "roti modern mediterranean": "roti.com",
  "garbanzo": "eatgarbanzo.com",
  "garbanzo mediterranean fresh": "eatgarbanzo.com",
  "pita pit": "pitapitusa.com",
  "newk's eatery": "newks.com",
  "sonic": "sonicdrivein.com",
};
function brandDomain(brand) {
  const key = String(brand).toLowerCase().trim();
  for (const k in BRAND_DOMAIN_OVERRIDES) { if (key === k || key.startsWith(k + " ") || k.startsWith(key)) return BRAND_DOMAIN_OVERRIDES[k]; }
  return key.replace(/['".,!]/g, "").replace(/[^a-z0-9]/g, "") + ".com";
}

// Approved-roster chains that genuinely stay open late (the old list held only banned
// fast-food brands, so the OPEN LATE pill could never render after the healthy whitelist).
const LATE_BRANDS = new Set([]); // emptied 2026-09-07: Wingstop left the roster (healthy-only); add any approved chain that genuinely stays open late
function latePill(d) { return LATE_BRANDS.has(canonBrand(d.brand)) ? '<span class="pill late">OPEN LATE</span>' : ""; }
function codeChip(d) {
  const m = (d.deal + " " + d.desc).match(/\bcode[:\s]+(?!NEEDED\b|REQUIRED\b|NECESSARY\b|ONLY\b)([A-Z0-9]{3,14})\b/);
  if (!m) return "";
  const c = m[1].toUpperCase();
  return `<button class="pill codechip" onclick="navigator.clipboard&&navigator.clipboard.writeText('${c}');this.textContent='\u2713 COPIED!'" title="Tap to copy">CODE: ${c}</button>`;
}

function groupByBrand(list) {
  const m = new Map();
  for (const d of list) { const k = canonBrand(d.brand); if (!m.has(k)) m.set(k, []); m.get(k).push(d); }
  return [...m.values()].map(g => g.sort((a, b) => (b.best ? 1 : 0) - (a.best ? 1 : 0) || (b.value || 0) - (a.value || 0)));
}
// AFFILIATE LINKS (plumbing added 2026-09-08; live the day a network approves). Templates
// come from affiliates.json ({url} = encoded destination, {subid} = the deal's stable id).
// Empty templates mean plain links and no disclosure: the site never claims a program it
// is not in. See the "_how" note in affiliates.json.
let AFF = { doordash: "", ubereats: "", grubhub: "", instacart: "" };
try { AFF = { ...AFF, ...JSON.parse(readFileSync(join(root, "affiliates.json"), "utf8")) }; } catch {}
const AFF_ACTIVE = !!(AFF.doordash || AFF.ubereats || AFF.grubhub || AFF.instacart);
const AFF_NOTE = AFF_ACTIVE ? " Some links pay DailyBite a commission at no cost to you; it never affects which deals are listed." : "";
const affFill = (tpl, url, subid) => tpl.replace("{url}", encodeURIComponent(url)).replace("{subid}", encodeURIComponent(subid || ""));
const INSTACART_URL = AFF.instacart ? affFill(AFF.instacart, "https://www.instacart.com/", "grocery") : "";
function affiliateHost(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, "");
    if (/(^|\.)doordash\.com$/.test(h)) return "doordash";
    if (/(^|\.)ubereats\.com$/.test(h) || /(^|\.)uber\.com$/.test(h)) return "ubereats";
    if (/(^|\.)grubhub\.com$/.test(h)) return "grubhub";
  } catch {}
  return null;
}
// Rewrites a deal's Get deal link to the network's tracking link when (a) the link already
// points at that platform and (b) a template is configured. Never touches restaurant or
// grocery links: those keep pointing at the official source.
function applyAffiliate(d) {
  const key = affiliateHost(d.url);
  if (key && AFF[key]) d.url = affFill(AFF[key], d.url, d.id);
}
const instacartLink = brand => (INSTACART_URL && GROCERY.has(canonBrand(brand))) ? `<a class="near" href="${INSTACART_URL}" target="_blank" rel="noopener sponsored">Order on Instacart</a>` : "";

// One card per restaurant (owner request, 2026-09-07): every deal a chain has is listed
// inside that chain's single card, each offer with its own Get deal button.
function offerHTML(d) {
  const tags = (d.tags || []).map(t =>
    `<span class="pill ${t === "free" ? "free" : "app"}">${t === "free" ? "FREE" : "APP ONLY"}</span>`).join("");
  return `<div class="offer">
    <div class="deal">${esc(d.deal)}</div>
    <div class="desc">${esc(d.desc)}</div>
    <div class="metarow">${d.region && d.region !== "National" ? `<span class="pill region">${esc(d.region.toUpperCase())}</span>` : ""}${codeChip(d)}${tags}${d.via ? `<span class="pill via">VIA ${esc(String(d.via).toUpperCase())}</span>` : ""}${d.fulfillment ? `<span class="pill ful">${esc(String(d.fulfillment).toUpperCase())}</span>` : ""}${Number.isFinite(d.est_savings) && d.est_savings > 0 ? `<span class="pill save" title="Estimated savings vs regular price">SAVE ~$${d.est_savings % 1 ? d.est_savings.toFixed(2) : d.est_savings}</span>` : ""}</div>
    <div class="foot">
      <span class="expires">${esc(d.expires)}</span>
      <a class="cta" href="${esc(d.url)}" target="_blank" rel="noopener">Get deal &rarr;</a>
    </div>
  </div>`;
}
function brandCard(ds) {
  const d = ds[0], best = ds.some(x => x.best);
  const cats = [...new Set(ds.map(x => esc(x.cat)).filter(Boolean))].join(" &middot; ");
  return `<div class="card${best ? " best" : ""}">
  ${best ? `<div class="best-badge">TOP PICK</div>` : ""}
  <div class="brandrow">
    <div class="brand-ic" style="background:${esc(d.color)}"><span>${esc(d.ic)}</span><img class="brand-logo" src="https://www.google.com/s2/favicons?domain=${brandDomain(d.brand)}&amp;sz=128" alt="${esc(d.brand)} logo" loading="lazy" onerror="this.remove()"></div>
    <div class="brandtxt"><div class="brand-name">${esc(d.brand)}</div><div class="brand-cat">${cats}${ds.length > 1 ? ` &middot; ${ds.length} deals` : ""}${latePill(d) ? " " + latePill(d) : ""}</div></div>
    <a class="near" href="https://www.google.com/maps/search/${encodeURIComponent(d.brand)}+near+me" target="_blank" rel="noopener">Nearest</a>${instacartLink(d.brand)}
  </div>
  <div class="offers">
${ds.map(offerHTML).join("\n")}
  </div>
</div>`;
}
const groupCards = list => groupByBrand(list).map(brandCard).join("\n");
function dealCard(d) { return brandCard([d]); }

const CHAIN_CSS = `:root{--bg:#0e1310;--card:#161f19;--card2:#1d2a21;--ink:#f2f7f3;--muted:#9ab3a3;--line:#27352c;--accent:#31c96e;--accent2:#ffd166;--good:#4cd9a1;--chip:#1f2b23;--blue:#63d3c1;--controlsbg:rgba(14,19,16,.92)}:root[data-theme="light"]{--bg:#f2f6f2;--card:#ffffff;--card2:#eaf1ea;--ink:#18211b;--muted:#54655a;--line:#d9e3da;--accent:#1f9e54;--accent2:#b9830a;--good:#178f52;--chip:#e6efe7;--blue:#0e7f74;--controlsbg:rgba(242,246,242,.92)}:root[data-theme="light"] body{background:radial-gradient(70% 40% at -10% 40%,rgba(31,158,84,.05),transparent 60%),radial-gradient(80% 50% at 110% 105%,rgba(185,131,10,.05),transparent 60%),linear-gradient(180deg,#eaf2ea,var(--bg) 600px)}.themetog{position:fixed;top:14px;right:14px;z-index:60;width:38px;height:38px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--muted);font-size:16px;cursor:pointer;line-height:1}*{box-sizing:border-box}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:radial-gradient(70% 40% at -10% 40%,rgba(76,217,161,.05),transparent 60%),radial-gradient(80% 50% at 110% 105%,rgba(255,209,102,.05),transparent 60%),linear-gradient(180deg,#0b110d,var(--bg) 600px);color:var(--ink)}header{padding:28px 20px 18px;text-align:center;background:radial-gradient(120% 100% at 50% 0%,rgba(49,201,110,.16),transparent 60%)}.logo{font-family:"Poppins",-apple-system,"Segoe UI",Arial,sans-serif;font-size:26px;font-weight:700;letter-spacing:-.3px}.logo a{display:inline-flex;align-items:center;gap:7px}.logo img{width:36px;height:36px}.logo a{color:var(--ink);text-decoration:none}.logo span{color:var(--accent)}.wrap{max-width:920px;margin:0 auto;padding:0 16px 60px}h1{font-size:24px;margin:18px 2px 6px}.tag{color:var(--muted);font-size:14px;margin:0 2px 14px}.date{display:inline-block;background:var(--chip);padding:6px 14px;border-radius:999px;font-size:13px;font-weight:600;margin-bottom:10px}.grid{columns:2;column-gap:14px;margin-top:10px}.grid>.card{break-inside:avoid;-webkit-column-break-inside:avoid;page-break-inside:avoid;margin:0 0 14px;width:100%}.grid.single,.grid:has(>.card:only-child){columns:1}@media(max-width:640px){.grid{columns:1}}.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:10px;position:relative;overflow:hidden}.brandtxt{min-width:0;flex:1}.brandrow .near{margin-left:auto;flex:0 0 auto}.brand-cat .pill{margin-left:4px;vertical-align:middle}.offers{display:flex;flex-direction:column;gap:10px;flex:1}.offer{display:flex;flex-direction:column;gap:8px}.offer+.offer{border-top:1px solid var(--line);padding-top:12px}.offer .foot{margin-top:2px}.card.best{border-color:var(--accent2)}.best-badge{position:absolute;top:0;right:0;background:var(--accent2);color:#1a1200;font-size:11px;font-weight:800;padding:4px 10px;border-bottom-left-radius:10px}.brandrow{display:flex;align-items:center;gap:10px}.brand-ic{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;font-weight:800;font-size:15px;color:#fff;flex:0 0 auto}.brand-name{font-weight:700;font-size:15px}.brand-cat{color:var(--muted);font-size:12px}.deal{font-size:16px;font-weight:700;line-height:1.3}.desc{color:var(--muted);font-size:13px;line-height:1.45}.metarow{display:flex;flex-wrap:wrap;gap:6px}.pill{font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;background:var(--card2);color:var(--muted)}.pill.free{background:rgba(46,193,107,.15);color:var(--good)}.pill.app{background:rgba(255,209,102,.14);color:var(--accent2)}.pill.save{background:rgba(255,209,102,.14);color:var(--accent2);border:1px solid rgba(255,209,102,.35)}.pill.via{background:rgba(99,211,193,.15);color:var(--blue)}.pill.ful{background:var(--card2);color:var(--muted)}.pill.region{background:rgba(99,211,193,.15);color:var(--blue)}.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:8px}.expires{font-size:12px;color:var(--muted)}.cta{background:var(--accent);color:#0a140d;text-decoration:none;font-size:13px;font-weight:700;padding:8px 12px;border-radius:9px;white-space:nowrap}.near{color:var(--blue);text-decoration:none;font-size:12px;font-weight:600;white-space:nowrap}.empty{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:24px;color:var(--muted);line-height:1.5}.note{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;margin-top:16px;color:var(--muted);font-size:13px;line-height:1.6}.chains{margin-top:22px;font-size:13px;color:var(--muted);line-height:2}.chains a{color:var(--accent2);text-decoration:none}footer{max-width:920px;margin:0 auto;padding:24px 16px 50px;color:var(--muted);font-size:12px;line-height:1.6}footer a{color:var(--accent2)}.brand-ic{position:relative;overflow:hidden}.brand-ic .brand-logo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1px var(--line)}.pill.codechip{background:rgba(49,201,110,.14);color:var(--accent);border:1px dashed var(--accent);cursor:pointer;font-family:inherit}.pill.late{background:rgba(99,211,193,.15);color:var(--blue)}.promo{background:linear-gradient(135deg,#20242d,#191c23);border:1px solid var(--line);border-radius:16px;padding:18px;margin-top:20px}.promo h3{margin:0 0 4px;font-size:16px}.promo p{margin:0 0 12px;color:var(--muted);font-size:13px}.aff-row{display:flex;flex-wrap:wrap;gap:10px}.aff-btn{flex:1;min-width:120px;text-align:center;text-decoration:none;color:#fff;font-weight:700;font-size:14px;padding:12px;border-radius:11px}.aff-dd{background:#ff3008}.aff-ue{background:#06c167}.aff-ic{background:#43b02a}`;

// Evergreen layers (growth plan, 2026-08-28): the top healthy chain pages carry
// standing content: how the chain's deals actually work, the typical deal cadence, and
// Q&A that matches what people ask Google (rendered with FAQPage structured data), so
// these pages have substance and rank 365 days a year, deals or no deals. Facts are
// deliberately general and stable (free programs, seasonal patterns): no prices here.
const GUIDES = {
  "chipotle-deals": {
    how: "Chipotle's best offers run through Chipotle Rewards, the free account in the app and at chipotle.com. Deals usually arrive as promo codes entered at digital checkout or as offers loaded straight to your account. Chipotle is one of two chains on this site allowed to list free-account deals, so when a code drops, you'll see it here the same morning.",
    cadence: "Chipotle skips the standing value menu and leans on limited-time codes instead: expect bursts around National Burrito Day (first Thursday of April), Halloween's Boorito tradition, back-to-school, and big sports moments, plus occasional free-delivery windows in between.",
    qa: [
      ["Does Chipotle have a value menu?", "No. Chipotle runs promo codes and app offers instead of a standing value menu, so deals come and go. This page lists whatever is verified as active today, re-checked every morning."],
      ["Is Chipotle Rewards free to join?", "Yes. It's free in the app or at chipotle.com, and it's how most Chipotle deals are claimed. No paid membership is ever required for a deal listed here."],
      ["When do new Chipotle codes usually drop?", "Irregularly, but the reliable big moments are National Burrito Day in early April, Halloween's Boorito deal, and promotions tied to major sporting events."]
    ]
  },
  "chick-fil-a-deals": {
    how: "Chick-fil-A's offers live in the free Chick-fil-A One app: points on every purchase, tiered status, and a rewards tab where the actual deals appear. Chick-fil-A publishes no deals page of its own, which is exactly why we track it daily.",
    cadence: "Most Chick-fil-A One offers are regional: local operators load different freebies in different markets, so the app is worth checking even when nothing national is running. Summers typically bring a chain-wide game with free-food codes, and new-item launches often pair with app offers.",
    qa: [
      ["Does Chick-fil-A have a value menu?", "No, and it rarely discounts publicly. Its deals are almost entirely app offers through Chick-fil-A One, which is why verified chain-wide Chick-fil-A deals are genuinely rare finds."],
      ["Why do my Chick-fil-A app offers look different from a friend's?", "Offers are loaded regionally by local operators, so two cities often see different freebies the same week. We list offers verified as broadly available."],
      ["Can I get Chick-fil-A deals on Sunday?", "No: every location is closed on Sundays, so app offers are redeemable Monday through Saturday only."]
    ]
  },
  "starbucks-deals": {
    how: "Starbucks deals flow through free Starbucks Rewards accounts and the app: member-targeted offers in the app's offers tab, occasional public promotions anyone can claim, and stars that stack on top. We list only the publicly claimable kind: no member-exclusive fine print.",
    cadence: "Promo activity clusters around seasonal launches: fall (pumpkin season) and the winter holiday cups are the two biggest windows, with periodic afternoon-focused deals and bring-back promotions in between.",
    qa: [
      ["Does Starbucks have a value menu?", "No. Starbucks runs rotating promotions instead: seasonal offers, occasional day-specific deals, and app promotions, which is why this page changes through the year."],
      ["Do I need Starbucks Rewards for the deals listed here?", "We only list deals a typical person can claim, and we say plainly when a free account is involved. Paid memberships are never required for anything on this site."],
      ["When is the best time of year for Starbucks deals?", "Early fall and the holiday season: seasonal launches historically bring the most frequent and strongest promotions."]
    ]
  },
  "panera-deals": {
    how: "Panera's everyday anchor is its value menu of mix-and-match items with a free side, and its promo codes for online and app orders through the free MyPanera program. Codes apply at checkout on panerabread.com or in the app.",
    cadence: "The value menu is standing, and promo codes (BOGO-style and percent-off) rotate every few weeks. We list Panera when there is a real limited-time code or promo, not for the everyday value menu.",
    qa: [
      ["Does Panera have a value menu?", "Yes: a standing mix-and-match menu of half sandwiches, soups, and salads, with a free side included per item. Because it is there every day, we do not list it as a deal; this page shows limited-time Panera codes and promos when they are running."],
      ["Is MyPanera free?", "Yes, free to join, and it's where Panera's codes and offers are usable. No paid tier is required for anything listed here."],
      ["How often do Panera codes change?", "Typically every few weeks. When a code expires we drop it the same morning, so anything listed on this page worked as of today's check."]
    ]
  },
  "subway-deals": {
    how: "Subway is the promo-code chain: nearly always at least one working footlong or meal code for app and online orders, layered on top of its rotating Sub of the Day pricing at participating locations.",
    cadence: "National codes rotate roughly monthly, and the Sub of the Day changes daily at a set price that varies by region. Because codes churn fast, this page is worth a daily check: yesterday's code may already be dead.",
    qa: [
      ["What is Subway's Sub of the Day?", "A different featured 6-inch sub each weekday at a discounted price at participating locations. Because it runs every day, we do not list it as a deal; this page shows limited-time Subway codes and promos when they are running."],
      ["Do Subway promo codes work in-store?", "Most codes are app and online-order only. We say in each listing where a code actually works, and every listed code was verified the same morning."],
      ["Why did a Subway code stop working?", "Subway rotates codes frequently and participation varies by franchise. Anything listed here worked at this morning's check; if it's gone tomorrow, so is the listing."]
    ]
  }
};

// Banned-chain pages redirect home (owner decision, Jacob, 2026-09-08): the "honest
// page" experiment (2026-08-26) kept titles like "McDonald's Deals: ..." indexed, so
// Google kept sending fast-food searchers to the old branding. GitHub Pages cannot send
// an HTTP 301, so this is the static equivalent Google treats as permanent: instant
// meta refresh + canonical to the homepage + noindex, and the URL leaves sitemap.xml.
function redirectPage(chain, target = SITE + "/") {
  const title = "DailyBite: Today's Healthy Food Deals";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0; url=${target}">
  <link rel="canonical" href="${target.split("#")[0]}">
  <meta name="robots" content="noindex, follow">
  <title>${esc(title)}</title>
  <script>location.replace("${target}");</script>
</head>
<body>
  <p>This page has moved. Continue to <a href="${target}">${esc(target)}</a>.</p>
</body>
</html>
`;
}

function chainPage(chain, deals) {
  if (chain.banned) return redirectPage(chain);
  const list = dealsFor(chain.name, deals);
  // Banned chains get an honest page: the old copy ("check back tomorrow") implied we
  // might list them, and we never will. Saying so plainly builds more trust than an
  // empty promise (authenticity decision, Jacob, 2026-08-26).
  // "Coupons" added 2026-08-29: GSC shows searchers use coupon language ("chick fil a
  // coupons", 43 impressions) far more than "app offers"; "Verified Daily" is the moat.
  const title = chain.banned
    ? `${chain.name} Deals: Why DailyBite Doesn't List Them`
    : `${chain.name} Deals, Coupons & App Offers: ${monthYear} (Verified Daily)`;
  const desc = chain.banned
    ? `DailyBite verifies deals from healthier, quality chains only, so ${chain.name} isn't listed. See today's verified healthier deals instead: checked ${prettyDate}.`
    : list.length
    ? `${list.length} verified ${chain.name} deal${list.length > 1 ? "s" : ""} today: ${list.slice(0, 2).map(d => d.deal).join("; ")}. Checked ${prettyDate}.`
    : `Current ${chain.name} app deals and rewards offers, checked daily. See today's verified fast-food deals from all major chains.`;
  const alternatives = `<div class="grid">${groupCards([...deals].filter(d => canonBrand(d.brand) !== canonBrand(chain.name)).sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, 6))}</div>`;
  const body = chain.banned
    ? `<div class="empty" style="text-align:left">An honest answer instead of an empty page: <strong style="color:var(--ink)">DailyBite doesn&#39;t list ${esc(chain.name)} deals, on purpose.</strong> We verify deals only from healthier, quality chains, and ${esc(chain.name)} doesn&#39;t meet that bar: no exceptions, even when a promo looks tempting. If you searched for ${esc(chain.name)} deals to eat cheap today, the verified deals below are where we&#39;d spend the same money.</div>
<h2 style="font-size:18px;margin:26px 2px 4px">Today&#39;s verified healthier deals instead</h2>
${alternatives}`
    : list.length
    ? `<div class="grid">${groupCards(list)}</div>`
    : `<div class="empty">No verified ${esc(chain.name)} deals passed our checks today. That usually means nothing solid is running right now: check back tomorrow, or browse <a style="color:var(--accent2)" href="/">all of today&#39;s deals</a>.</div>
<h2 style="font-size:18px;margin:26px 2px 4px">Today&#39;s top deals from other chains</h2>
${alternatives}`;
  const ld = {
    "@context": "https://schema.org", "@type": "ItemList",
    "name": `${chain.name} deals for ${prettyDate}`,
    "numberOfItems": list.length,
    "itemListElement": list.map((d, i) => ({
      "@type": "ListItem", "position": i + 1, "name": d.deal, "url": d.url
    }))
  };
  const g = !chain.banned && GUIDES[chain.slug];
  const faqLd = g ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": g.qa.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) })}</script>` : "";
  const freshLd = `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": title, "dateModified": iso, "isPartOf": { "@type": "WebSite", "name": "DailyBite", "url": SITE } })}</script>`;
  const guideHtml = g ? `
  <h2 style="font-size:18px;margin:26px 2px 4px">How ${esc(chain.name)} deals actually work</h2>
  <p class="tag" style="font-size:13.5px">${esc(g.how)}</p>
  <h2 style="font-size:18px;margin:20px 2px 4px">Deal cadence: when to check back</h2>
  <p class="tag" style="font-size:13.5px">${esc(g.cadence)}</p>
  <h2 style="font-size:18px;margin:20px 2px 4px">Questions, answered</h2>
  ${g.qa.map(([q, a]) => `<details style="background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin-bottom:8px"><summary style="font-weight:700;font-size:14px;cursor:pointer">${esc(q)}</summary><p class="tag" style="font-size:13px;margin:8px 0 0">${esc(a)}</p></details>`).join("\n  ")}
  <p class="tag" style="font-size:12px">Last verified: ${esc(prettyDate)}. Deals above are re-checked every morning; this section covers the standing facts that don't change day to day.</p>` : "";
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="apple-itunes-app" content="app-id=6802622518"><meta name="robots" content="max-image-preview:large">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}/${chain.slug}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/${chain.slug}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" href="/favicon.png"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap"><script>(function(){try{if(localStorage.getItem("db_theme")==="dark")document.documentElement.removeAttribute("data-theme")}catch(e){}})()</script>
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#f2f6f2">
<meta property="og:image" content="https://dailybitedeals.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
${faqLd}${freshLd}
<style>${CHAIN_CSS}</style>
<script data-goatcounter="https://dailybite.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body><button id="themetog" class="themetog" type="button" aria-label="Toggle light or dark mode">◐</button><script>document.getElementById("themetog").onclick=function(){var h=document.documentElement,l=h.getAttribute("data-theme")==="light",m=document.querySelector("meta[name=theme-color]");try{if(l){h.removeAttribute("data-theme");localStorage.setItem("db_theme","dark")}else{h.setAttribute("data-theme","light");localStorage.setItem("db_theme","light")}}catch(e){}if(m)m.content=l?"#0e1310":"#f2f6f2"};</script>
<header><div class="logo"><a href="/"><img src="/logo.svg" alt="DailyBite logo" width="36" height="36"><b>Daily<span>Bite</span></b></a></div></header>
<div class="wrap">
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>${chain.banned ? `${esc(chain.name)} Deals: Not on DailyBite (Here&#39;s Why)` : `${esc(chain.name)} Deals &amp; App Offers: ${esc(monthYear)}`}</h1>
  <p class="tag">${chain.banned ? `DailyBite lists verified deals from healthier, quality chains only. This page exists because people search for ${esc(chain.name)} deals, and we&#39;d rather tell you where the healthier value is than pretend to cover them.` : `Today&#39;s verified ${esc(chain.name)} in-app and rewards deals, re-checked every morning against official sources.`}</p>
  ${chain.note ? `<p class="tag">${esc(chain.note)}</p>` : ""}
  ${body}
  ${guideHtml}
  ${EMAIL_CAPTURE}
    <nav class="chains"><strong>Deals by restaurant:</strong> ${chainNav(chain.slug)} &middot; <a href="/">All deals</a></nav>\n  <nav class="chains"><strong>More:</strong> <a href="/free-food-today">Free Food Today</a> &middot; <a href="/food-deals-by-day">Deals by day of the week</a></nav>\n  ${GUIDES_NAV}
</div>
<footer>DailyBite is updated daily and is not affiliated with ${esc(chain.name)}.${AFF_NOTE} <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">Instagram</a> &middot; <a href="https://www.pinterest.com/dailybitedeals/" target="_blank" rel="noopener">Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">TikTok</a> &middot; <a href="https://apps.apple.com/us/app/dailybite-healthy-food-deals/id6802622518" target="_blank" rel="noopener">Get the iOS app</a></footer>
</body>
</html>`;
}

// Sushi hub (owner request, 2026-08-26): the site's identity page. Every verified weekly
// grocery sushi day in one place, plus today's live sushi/poke deals. Facts below mirror
// the verified GROCERY evidence in refresh-deals.mjs; update both together.
function sushiPage(deals) {
  const SUSHI_CHAINS = new Set(["kura sushi", "sarku japan", "rock n roll sushi", "sushi maki", "pokeworks", "island fin poke"]);
  const todays = deals.filter(d => /sushi|poke/i.test(d.cat || "") || SUSHI_CHAINS.has(canonBrand(d.brand)));
  const title = "$5 Sushi Days: Publix Wednesday, Kroger, Safeway $5 Friday & More (2026)";
  const desc = `$5 Sushi Wednesday at Publix, $6 at Sprouts and Kroger stores; $6 Zenshi rolls at Harris Teeter and $5 Friday sushi at Safeway. Every verified weekly sushi day in one place, re-checked daily. Updated ${prettyDate}.`;
  const ROWS = [
    ["Wednesday", "Publix", "$5 select fresh-made rolls (spicy tuna, California, spicy shrimp and more)", "FL & Southeast; no card or app needed"],
    ["Wednesday", "Sprouts", "$6 select Oumi rolls (regularly $8 to $10; verified in store Oct 2026)", "Most markets; no card needed"],
    ["Wednesday", "Kroger family (Fry's, King Soopers, Fred Meyer, Smith's, QFC)", "Wednesday Only Snowfox promo rolls, $6 (was $5 until 2025)", "Select states; Snowfox counters only"],
    ["Wednesday", "Safeway / Albertsons", "$5.99 to $6 Zenshi rolls in many divisions", "Select states"],
    ["Wednesday", "Food Lion", "$5 select Hissho rolls", "Mid-Atlantic & Southeast; no card needed"],
    ["Wednesday", "Lowes Foods", "$4.99 select hand-rolled sushi", "NC & SC"],
    ["Wednesday", "Weis Markets", "$5 select Snowfox rolls, as marked", "PA, MD, NY, NJ, DE, WV & VA"],
    ["Wednesday", "Hannaford", "$5 California, Spicy California and Classic Vegan rolls (Wago counters)", "ME, NH, VT, MA & NY"],
    ["Tuesday", "Dierbergs", "$6 select hand-rolled Bento sushi", "St. Louis area"],
    ["Thursday", "Fresh Thyme", "Sushi Thursday: select rolls discounted (price varies by store; $5 in past years)", "Midwest"],
    ["Friday", "Safeway / Albertsons", "$5 Friday: fresh sushi rolls for $5, alongside other prepared-food deals", "Select states; free Safeway for U account may be needed"],
    ["Friday", "Harris Teeter", "$6 select Zenshi rolls: California, Vegetable, Spicy Tuna and Spicy Salmon (regularly about $9.49 to $10.49), in store, while supplies last", "Southeast & Mid-Atlantic; seen in store October 2, 2026"],
    ["Wednesday", "Hy-Vee", "Select Nori Sushi rolls $6 (regularly about $8 to $10)", "Midwest; participating stores"],
    ["Wednesday", "H-E-B", "Select Sushiya rolls $7 (repeats on Saturdays)", "Texas"],
    ["Wednesday", "Meijer", "Select rolls $5.99 (recently raised from $5)", "Midwest; participating stores"],
    ["Wednesday", "ShopRite", "Select rolls $5.99", "NJ, NY, PA, CT, DE & MD; store-run"],
    ["Wednesday", "Stop & Shop", "Red Label sushi $5.99", "Northeast; participating stores"],
    ["Wednesday", "Giant Food", "Select Hissho rolls reported at $5.99 (not confirmed by Giant; check your store)", "DC, MD, VA & DE"],
    ["Wednesday", "Giant Eagle / Market District", "Select sushi about $5, some stores 4 to 7 PM only", "PA, OH, WV, MD & IN; participating stores"],
    ["Friday", "Hy-Vee", "Buy one Nori Sushi roll, get one 50% off", "Midwest; participating stores"],
    ["Saturday", "H-E-B", "$7 Saturday: select Sushiya rolls $7", "Texas"],
    ["Every week", "Publix deli", "Sub of the Week: $2 off the featured whole sub", "FL & Southeast; counter, online or app"],
  ];
  const tableRows = ROWS.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("\n");
  const ld = { "@context": "https://schema.org", "@type": "ItemList", "name": "Weekly grocery store sushi days", "numberOfItems": ROWS.length,
    "itemListElement": ROWS.map((r, i) => ({ "@type": "ListItem", "position": i + 1, "name": `${r[0]}: ${r[1]}: ${r[2]}` })) };
  const todaysBlock = todays.length
    ? `<h2 style="font-size:19px;margin:26px 2px 8px">Verified sushi &amp; poke deals live today</h2><div class="grid">${groupCards(todays)}</div>`
    : `<div class="note">No restaurant sushi deals passed verification today: the weekly grocery sushi days above are the reliable baseline, and each one appears in the daily deal list on its day.</div>`;
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="apple-itunes-app" content="app-id=6802622518">
<meta name="robots" content="max-image-preview:large">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}/sushi-deals">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/sushi-deals">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" href="/favicon.png"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap"><script>(function(){try{if(localStorage.getItem("db_theme")==="dark")document.documentElement.removeAttribute("data-theme")}catch(e){}})()</script>
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#f2f6f2">
<meta property="og:image" content="https://dailybitedeals.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
${freshLdFor(title)}
<style>${CHAIN_CSS}
.tblwrap{overflow-x:auto;margin-top:14px}.tbl{width:100%;border-collapse:collapse;font-size:13px;line-height:1.5}.tbl th,.tbl td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}.tbl th{background:var(--card2);color:var(--ink)}.tbl td{color:var(--muted)}.tbl td:first-child{color:var(--accent2);font-weight:700;white-space:nowrap}</style>
<script data-goatcounter="https://dailybite.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body><button id="themetog" class="themetog" type="button" aria-label="Toggle light or dark mode">◐</button><script>document.getElementById("themetog").onclick=function(){var h=document.documentElement,l=h.getAttribute("data-theme")==="light",m=document.querySelector("meta[name=theme-color]");try{if(l){h.removeAttribute("data-theme");localStorage.setItem("db_theme","dark")}else{h.setAttribute("data-theme","light");localStorage.setItem("db_theme","light")}}catch(e){}if(m)m.content=l?"#0e1310":"#f2f6f2"};</script>
<header><div class="logo"><a href="/"><img src="/logo.svg" alt="DailyBite logo" width="36" height="36"><b>Daily<span>Bite</span></b></a></div></header>
<div class="wrap">
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>Grocery Store Sushi Days: $5 Sushi, by Day of the Week</h1>
  <p class="tag">Most big grocery chains run one day a week when fresh-made sushi from the in-store counter drops to about $5: usually a third to half off the everyday price. We verify these weekly and list each one in the daily deal feed on its day. Prices and participation vary by store and division, and rolls sell out: go early, and check your store's weekly ad.</p>
  <div class="tblwrap"><table class="tbl"><tr><th>Day</th><th>Store</th><th>The deal</th><th>Where / what you need</th></tr>
${tableRows}
</table></div>
  <div class="note">Good to know: most grocery sushi counters are run by dedicated sushi companies (AFC, Snowfox, Zenshi, Oumi, Hissho) and rolls are made fresh that day, not factory-packed. Sushi-day pricing is while supplies last, and selection is usually the classics: California, spicy tuna, shrimp, and veggie rolls.</div>
  ${todaysBlock}
  ${EMAIL_CAPTURE}
  <nav class="chains"><strong>Sushi &amp; poke pages:</strong> <a href="/kura-sushi-deals">Kura Sushi</a> &middot; <a href="/pokeworks-deals">Pokeworks</a> &middot; <a href="/sarku-japan-deals">Sarku Japan</a> &middot; <a href="/publix-deals">Publix</a> &middot; <a href="/kroger-deals">Kroger</a> &middot; <a href="/sprouts-deals">Sprouts</a> &middot; <a href="/safeway-deals">Safeway</a> &middot; <a href="/harris-teeter-deals">Harris Teeter</a> &middot; <a href="/">All of today&#39;s deals</a></nav>
  <nav class="chains"><strong>More:</strong> <a href="/food-deals-by-day">Deals by day of the week</a></nav>
  ${GUIDES_NAV}
</div>
<footer>DailyBite is updated daily and is not affiliated with any store or restaurant.${AFF_NOTE} <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">Instagram</a> &middot; <a href="https://www.pinterest.com/dailybitedeals/" target="_blank" rel="noopener">Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">TikTok</a> &middot; <a href="https://apps.apple.com/us/app/dailybite-healthy-food-deals/id6802622518" target="_blank" rel="noopener">Get the iOS app</a></footer>
</body>
</html>`;
}

function freeFoodPage(deals) {
  const free = deals.filter(d => (d.tags || []).includes("free"));
  const rest = deals.filter(d => !(d.tags || []).includes("free")).sort((a, b) => b.value - a.value).slice(0, 8);
  const title = free.length
    ? `Free Food Today: ${free.length} Verified Freebie${free.length > 1 ? "s" : ""} & Cheap Deals (Updated ${prettyDate})`
    : `Free & Nearly-Free Fast Food Today (Updated ${prettyDate})`;
  const desc = free.length
    ? `${free.length} verified free food deals available today: ${free.slice(0, 2).map(d => d.deal).join("; ")}. Updated every morning: no signups, no points, no fine print.`
    : `Today's best verified food deals, updated every morning. No signups, no points, no fine print.`;
  const sec1 = free.length ? `<h2 style="font-size:19px;margin:20px 2px 8px">Free right now</h2><div class="grid">${groupCards(free)}</div>` : "";
  const sec2 = rest.length ? `<h2 style="font-size:19px;margin:24px 2px 8px">Nearly free: today's best cheap deals</h2><div class="grid">${groupCards(rest)}</div>` : "";
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="apple-itunes-app" content="app-id=6802622518"><meta name="robots" content="max-image-preview:large">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}/free-food-today">
<link rel="alternate" type="application/rss+xml" title="DailyBite Deals" href="${SITE}/feed.xml">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/free-food-today">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" href="/favicon.png"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap"><script>(function(){try{if(localStorage.getItem("db_theme")==="dark")document.documentElement.removeAttribute("data-theme")}catch(e){}})()</script>
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#f2f6f2">
<meta property="og:image" content="https://dailybitedeals.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
${freshLdFor(title)}
<style>${CHAIN_CSS}</style>
<script data-goatcounter="https://dailybite.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body><button id="themetog" class="themetog" type="button" aria-label="Toggle light or dark mode">◐</button><script>document.getElementById("themetog").onclick=function(){var h=document.documentElement,l=h.getAttribute("data-theme")==="light",m=document.querySelector("meta[name=theme-color]");try{if(l){h.removeAttribute("data-theme");localStorage.setItem("db_theme","dark")}else{h.setAttribute("data-theme","light");localStorage.setItem("db_theme","light")}}catch(e){}if(m)m.content=l?"#0e1310":"#f2f6f2"};</script>
<header><div class="logo"><a href="/"><img src="/logo.svg" alt="DailyBite logo" width="36" height="36"><b>Daily<span>Bite</span></b></a></div></header>
<div class="wrap">
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>Free Food Today</h1>
  <p class="tag">${free.length ? "Every freebie below is verified this morning and claimable by anyone on a single visit: no signups, no points, no fine print." : "Nothing is strictly $0 at national chains right now: true freebies appear here the moment they drop. Below: today&#39;s closest-to-free deals, every one verified this morning."}</p>
  ${sec1}
  ${EMAIL_CAPTURE}
  ${sec2}
    <nav class="chains"><strong>More:</strong> <a href="/">All of today&#39;s deals</a> &middot; <a href="/food-deals-by-day">Deals by day of the week</a></nav>\n  ${GUIDES_NAV}
</div>
<footer>DailyBite is updated daily.${AFF_NOTE} <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">Instagram</a> &middot; <a href="https://www.pinterest.com/dailybitedeals/" target="_blank" rel="noopener">Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">TikTok</a> &middot; <a href="https://apps.apple.com/us/app/dailybite-healthy-food-deals/id6802622518" target="_blank" rel="noopener">Get the iOS app</a></footer>
</body>
</html>`;
}

function rssFeed(deals) {
  // This feed doubles as the source for the daily subscriber email (RSS-to-email
  // campaign): date-suffixed GUIDs make each morning's deals count as NEW items,
  // so the campaign sends one digest per day containing the full current list.
  // Top Picks lead, each item links to its chain page, regional deals say so.
  const chainLink = (brand) => {
    const b = norm(brand);
    const c = CHAINS.find(x => { const n = norm(x.name); return b.includes(n) || n.includes(b); });
    return c ? `${SITE}/${c.slug}` : `${SITE}/`;
  };
  const ordered = [...deals].sort((a, b) => (b.best ? 1 : 0) - (a.best ? 1 : 0) || (b.value || 0) - (a.value || 0));
  const items = ordered.map(d => `  <item>
    <title>${d.best ? "Top Pick: " : ""}${esc(d.brand)}: ${esc(d.deal)}</title>
    <link>${chainLink(d.brand)}</link>
    <guid isPermaLink="false">${esc(d.brand)}-${esc(d.deal).slice(0, 40)}-${iso}</guid>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <description>${esc(d.desc)}${d.region && d.region !== "National" ? " (" + esc(d.region) + " only)" : ""} (${esc(d.expires)})</description>
  </item>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>DailyBite: Daily Healthy Food Deals</title>
  <link>${SITE}</link>
  <description>The best verified healthy food deals, updated every morning.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>
`;
}

const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

// Public verification log (growth plan Fix 5, 2026-08-28): nobody in this niche shows
// their work. This page is the crawlable, dated proof of the daily checks: it converts
// skeptical visitors and gives Google a growing record of genuine freshness.
function verificationLogPage(entries) {
  const title = "The DailyBite Verification Log: Every Daily Check, Dated";
  const desc = `Public proof of the daily deal verification: ${entries.length} logged morning checks, newest ${prettyDate}. Every deal on DailyBite is re-verified each morning; this is the record.`;
  const rows = entries.map(e => `<tr><td>${esc(e.d)}</td><td>${esc(e.t)}</td><td>${e.n} deals verified</td></tr>`).join("\n");
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="apple-itunes-app" content="app-id=6802622518">
<meta name="robots" content="max-image-preview:large">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}/verification-log">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/verification-log">
<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" href="/favicon.png"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap"><script>(function(){try{if(localStorage.getItem("db_theme")==="dark")document.documentElement.removeAttribute("data-theme")}catch(e){}})()</script>
<meta name="theme-color" content="#f2f6f2">
${freshLdFor(title)}
<style>${CHAIN_CSS}
.tblwrap{overflow-x:auto;margin-top:14px}.tbl{width:100%;border-collapse:collapse;font-size:13px;line-height:1.5}.tbl th,.tbl td{border:1px solid var(--line);padding:8px 10px;text-align:left}.tbl th{background:var(--card2);color:var(--ink)}.tbl td{color:var(--muted)}.tbl td:first-child{color:var(--accent2);font-weight:700;white-space:nowrap}</style>
<script data-goatcounter="https://dailybite.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body><button id="themetog" class="themetog" type="button" aria-label="Toggle light or dark mode">◐</button><script>document.getElementById("themetog").onclick=function(){var h=document.documentElement,l=h.getAttribute("data-theme")==="light",m=document.querySelector("meta[name=theme-color]");try{if(l){h.removeAttribute("data-theme");localStorage.setItem("db_theme","dark")}else{h.setAttribute("data-theme","light");localStorage.setItem("db_theme","light")}}catch(e){}if(m)m.content=l?"#0e1310":"#f2f6f2"};</script>
<header><div class="logo"><a href="/"><img src="/logo.svg" alt="DailyBite logo" width="36" height="36"><b>Daily<span>Bite</span></b></a></div></header>
<div class="wrap">
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>The Verification Log</h1>
  <p class="tag">Every morning, an automated check re-verifies every deal on DailyBite against official sources: expired offers are dropped, prices are confirmed, and anything that can't be verified never publishes. Most deal sites ask you to trust that. We'd rather show the receipts: below is the dated record of every daily check.</p>
  <div class="tblwrap"><table class="tbl"><tr><th>Date</th><th>Checked at</th><th>Result</th></tr>
${rows}
</table></div>
  <div class="note">How to read this: "deals verified" is the count that passed every check that morning (stated dollars, active today, approved healthier chains only). The count varies day to day because we only list what's verifiably true: a smaller honest list over a padded one, every time.</div>
  <nav class="chains"><strong>More:</strong> <a href="/">Today&#39;s deals</a> &middot; <a href="/sushi-deals">Sushi Deals</a> &middot; <a href="/free-food-today">Free Food Today</a> &middot; <a href="/about">About</a></nav>
</div>
<footer>DailyBite is updated daily and is not affiliated with any restaurant.${AFF_NOTE} <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://apps.apple.com/us/app/dailybite-healthy-food-deals/id6802622518" target="_blank" rel="noopener">Get the iOS app</a></footer>
</body>
</html>`;
}

// Food holidays: pages publish 21 days before the date and stay until 2 days after.
// Healthy-fit calendar only (owner whitelist, 2026-08-10): no burger/dessert holidays.
const HOLIDAYS = [
  // National Coffee Day removed 2026-09-24 (owner): coffee-chain promos are mostly sugary drinks and off-brand here. /national-coffee-day-deals now redirects home.
  { slug: "national-taco-day-deals", name: "National Taco Day", date: "2026-10-06", emoji: "", kw: /taco/i,
    blurb: "National Taco Day now lands on the first Tuesday of October: expect taco specials across chains, and Tijuana Flats' Taco Tuesdaze stacks right on top of it." },
  { slug: "national-sandwich-day-deals", name: "National Sandwich Day", date: "2026-11-03", emoji: "", kw: /sandwich|\bsub\b|footlong|hoagie/i,
    blurb: "November 3 brings sandwich deals from Subway, Potbelly, Panera and more: BOGOs and promo codes are the usual pattern." },
  { slug: "international-sushi-day-deals", name: "International Sushi Day", date: "2027-06-18", emoji: "", kw: /sushi|poke|\broll\b/i,
    blurb: "June 18 is sushi's big day: look for roll specials at sushi chains and grocery sushi counters, on top of the weekly $5 sushi days." },
  { slug: "national-smoothie-day-deals", name: "National Smoothie Day", date: "2027-06-21", emoji: "", kw: /smoothie/i,
    blurb: "June 21 is National Smoothie Day: Smoothie King, Tropical Smoothie Cafe and Jamba have all run freebies or steep discounts on the day in past years." },
  { slug: "national-avocado-day-deals", name: "National Avocado Day", date: "2027-07-31", emoji: "", kw: /avocado|guac/i,
    blurb: "July 31 is National Avocado Day: free guac at Mexican chains and avocado add-ons at bowl and poke spots are the classic offers." },
];

function holidayPage(h, deals) {
  const matched = deals.filter(d => h.kw.test(d.deal + " " + d.desc));
  const rest = deals.filter(d => !matched.includes(d)).sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, 6);
  const dt = new Date(h.date + "T12:00:00");
  const pretty = dt.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const title = `${h.name} ${dt.getFullYear()} Deals & Freebies (${pretty})`;
  const desc = `${h.name} is ${pretty}. ${h.blurb} Verified deals list, updated every morning.`;
  const isDay = iso === h.date;
  const matchedBlock = matched.length
    ? `<h2 style="font-size:18px;margin:26px 2px 4px">Deals live right now</h2><div class="grid">${groupCards(matched)}</div>`
    : `<div class="empty">${isDay ? "We're re-checking deals throughout the morning: check back shortly." : `Chains usually announce their ${esc(h.name)} specials in the final days before ${esc(pretty)}. We re-check every morning and verified deals will appear here the moment they're live.`}</div>`;
  const ld = { "@context": "https://schema.org", "@type": "ItemList", "name": `${h.name} deals`, "numberOfItems": matched.length,
    "itemListElement": matched.map((d, i) => ({ "@type": "ListItem", "position": i + 1, "name": d.deal, "url": d.url })) };
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="apple-itunes-app" content="app-id=6802622518"><meta name="robots" content="max-image-preview:large">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="https://dailybitedeals.com/${h.slug}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" href="/favicon.png"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap"><script>(function(){try{if(localStorage.getItem("db_theme")==="dark")document.documentElement.removeAttribute("data-theme")}catch(e){}})()</script>
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="https://dailybitedeals.com/og.png">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>${CHAIN_CSS}</style>
<script data-goatcounter="https://dailybite.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body><button id="themetog" class="themetog" type="button" aria-label="Toggle light or dark mode">◐</button><script>document.getElementById("themetog").onclick=function(){var h=document.documentElement,l=h.getAttribute("data-theme")==="light",m=document.querySelector("meta[name=theme-color]");try{if(l){h.removeAttribute("data-theme");localStorage.setItem("db_theme","dark")}else{h.setAttribute("data-theme","light");localStorage.setItem("db_theme","light")}}catch(e){}if(m)m.content=l?"#0e1310":"#f2f6f2"};</script>
<header><div class="logo"><a href="/"><img src="/logo.svg" alt="DailyBite logo"><b>Daily<span>Bite</span></b></a></div></header>
<div class="wrap">
<span class="date">Updated ${prettyDate}</span>
<h1>${esc(h.name)} Deals: ${esc(pretty)}</h1>
<p class="tag">${esc(h.blurb)}</p>
${matchedBlock}
<h2 style="font-size:18px;margin:26px 2px 4px">More verified deals today</h2>
<div class="grid">${groupCards(rest)}</div>
<div class="note">Bookmark this page: it re-checks and updates every morning through ${esc(pretty)}. For everything else, see <a style="color:var(--accent2)" href="/">all of today&#39;s deals</a>.</div>
<nav class="chains"><strong>More:</strong> <a href="/">All of today&#39;s deals</a> &middot; <a href="/free-food-today">Free Food Today</a></nav>
</div>
<footer>DailyBite is updated daily.${AFF_NOTE} <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">Instagram</a> &middot; <a href="https://www.pinterest.com/dailybitedeals/" target="_blank" rel="noopener">Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">TikTok</a> &middot; <a href="https://apps.apple.com/us/app/dailybite-healthy-food-deals/id6802622518" target="_blank" rel="noopener">Get the iOS app</a></footer>
</body>
</html>`;
}

const DAY_NOTES = {
  monday: "Mondays are a reset day: weekend bundles disappear and app-only offers take over. Most app deal tabs refresh Monday morning, so check Chipotle and Chick-fil-A first for the week\u2019s new offers.",
  tuesday: "Tuesday is taco night: Tijuana Flats runs Taco Tuesdaze (two tacos, chips, and a drink for about $7.99) at participating FL & Southeast locations, and taco specials across chains make this one of the cheapest dinner nights of the week.",
  wednesday: "Wednesday is grocery sushi day almost everywhere: Publix, Food Lion, Weis and Hannaford run $5 select rolls, Lowes Foods $4.99, Sprouts, Kroger-family and Hy-Vee stores $6, H-E-B $7, and Meijer, ShopRite and Stop & Shop $5.99, all at the in-store counter with no coupon or app. Go before the lunch rush: the $5 selection sells out first.",
  thursday: "Chains tend to preview weekend offers on Thursdays: check the app deal tabs tonight for anything expiring Sunday.",
  friday: "Friday is grocery deal day: many Safeway and Albertsons divisions run $5 Friday on prepared foods like sushi and 8-piece chicken, Harris Teeter sells four Zenshi rolls for $6 on Fridays, and Hy-Vee's Nori Sushi counters go buy one, get one 50% off.",
  saturday: "Weekends skew toward family bundles and delivery-app promos: single-visit value boxes still apply, breakfast deals run later than weekdays, and H-E-B repeats its $7 select-roll sushi price on Saturdays across Texas.",
  sunday: "Sunday is prep-for-the-week day: stack what\u2019s left of weekend offers, and remember most app deal tabs refresh Monday morning.",
};

function dayPage(day) {
  // 2026-09-08: the seven day-of-week pages were near-duplicates that Google left in
  // "discovered, currently not indexed"; they now redirect to the single by-day page.
  return redirectPage(null, `${SITE}/food-deals-by-day#${day}`);
}

// ---------------------------------------------------------------------------
// Query-targeted evergreen pages (owner request, 2026-09-08). Search Console's only
// impressions after three months were exact questions ("what is the $4.99 special at
// panera", "$5 sushi wednesday", "safeway $5 sushi", "5 dollar sushi friday"), and the
// daily list cannot rank for them: it changes every morning. Each page below answers ONE
// of those questions with the facts the daily refresh already re-verifies, carries FAQ
// schema, and shows the store's live deal when one is in today's feed.
// ---------------------------------------------------------------------------
function pageHead(title, desc, path, ld, extraCss = "") {
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="apple-itunes-app" content="app-id=6802622518">
<meta name="robots" content="max-image-preview:large">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}/${path}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${SITE}/${path}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" href="/favicon.png"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap"><script>(function(){try{if(localStorage.getItem("db_theme")==="dark")document.documentElement.removeAttribute("data-theme")}catch(e){}})()</script>
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#f2f6f2">
<meta property="og:image" content="https://dailybitedeals.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
${ld.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join("\n")}
${freshLdFor(title)}
<style>${CHAIN_CSS}
.facts{display:grid;grid-template-columns:max-content 1fr;gap:8px 14px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin:14px 0;font-size:14px;line-height:1.5}.facts b{color:var(--accent2)}.facts span{color:var(--ink)}@media(max-width:520px){.facts{grid-template-columns:1fr;gap:4px}}
.faq{margin-top:10px}.faq h3{font-size:15px;margin:16px 2px 4px}.faq p{color:var(--muted);font-size:14px;line-height:1.55;margin:0 2px}.answer{font-size:16px;line-height:1.55;color:var(--ink);margin:12px 2px}
.prose p{color:var(--muted);font-size:14px;line-height:1.6;margin:8px 2px}.prose h2{font-size:19px;margin:24px 2px 6px}${extraCss}</style>
<script data-goatcounter="https://dailybite.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body><button id="themetog" class="themetog" type="button" aria-label="Toggle light or dark mode">◐</button><script>document.getElementById("themetog").onclick=function(){var h=document.documentElement,l=h.getAttribute("data-theme")==="light",m=document.querySelector("meta[name=theme-color]");try{if(l){h.removeAttribute("data-theme");localStorage.setItem("db_theme","dark")}else{h.setAttribute("data-theme","light");localStorage.setItem("db_theme","light")}}catch(e){}if(m)m.content=l?"#0e1310":"#f2f6f2"};</script>
<header><div class="logo"><a href="/"><img src="/logo.svg" alt="DailyBite logo" width="36" height="36"><b>Daily<span>Bite</span></b></a></div></header>
<div class="wrap">`;
}
const PAGE_FOOT = `</div>
<footer>DailyBite is updated daily and is not affiliated with any store or restaurant.${AFF_NOTE} <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">Instagram</a> &middot; <a href="https://www.pinterest.com/dailybitedeals/" target="_blank" rel="noopener">Pinterest</a> &middot; <a href="https://apps.apple.com/us/app/dailybite-healthy-food-deals/id6802622518" target="_blank" rel="noopener">Get the iOS app</a></footer>
</body>
</html>`;

const EXPLAINERS = [
  { slug: "publix-5-sushi-wednesday", brand: "Publix", chainSlug: "publix-deals", day: 3,
    title: "Publix $5 Sushi Wednesday: What's $5, Which Stores & Tips (2026)",
    h1: "Publix $5 Sushi Wednesday",
    desc: "Every Wednesday, Publix stores with a sushi counter sell select fresh-made rolls for $5 (regularly about $8 to $10). No coupon or app needed. Which rolls, which stores, and when to go.",
    answer: "Every Wednesday, Publix stores with an in-store sushi counter sell select fresh-made rolls for <strong>$5 each</strong>, regularly about $8 to $10. The lineup is the classics: spicy tuna, California, spicy shrimp and similar rolls. No coupon, card or app is needed. It runs at participating stores across Florida and the Southeast, while supplies last.",
    facts: [["Day", "Every Wednesday, all day while supplies last"], ["Price", "$5 per select roll (regularly about $8 to $10)"], ["What", "Select fresh-made classic rolls: spicy tuna, California, spicy shrimp and more"], ["Where", "Publix stores with a sushi counter: Florida and the Southeast"], ["What you need", "Nothing: no coupon, card or app"], ["Verified", "Re-checked weekly by DailyBite and listed in the daily deal feed every Wednesday"]],
    faq: [["Is Publix sushi $5 every Wednesday?", "Yes, at participating stores with a sushi counter. It is a standing weekly promotion, not a limited-time offer, though a few stores opt out or run it on different terms, so check the sushi case sign."],
      ["Which rolls are $5?", "Select classic rolls, typically spicy tuna, California and spicy shrimp, plus veggie and similar rolls depending on the store. Premium and specialty rolls and party platters are usually excluded."],
      ["Do I need a coupon or the Publix app?", "No. The $5 price is on the shelf tag at the counter. Nothing to clip or scan."],
      ["What time should I go?", "Counters make rolls fresh that morning and the $5 selection sells out at busy stores by early afternoon. Late morning to lunchtime is the safest window."],
      ["Does every Publix have a sushi counter?", "No. Most larger Florida and Southeast stores do; smaller stores may not. The store locator on publix.com lists departments, or call ahead."]],
    more: `<p>Grocery sushi counters are usually run by dedicated sushi companies, and the rolls are made fresh that day, not factory-packed. The Wednesday price is roughly a third to half off the everyday price, which makes it one of the best value healthy lunches in the Southeast. If Wednesday doesn't suit, <a href="/sushi-deals" style="color:var(--accent2)">other chains run their own sushi days</a>: Sprouts and Kroger on Wednesday, Safeway and Harris Teeter on Friday.</p>` },
  { slug: "sprouts-sushi-wednesday", brand: "Sprouts", chainSlug: "sprouts-deals", day: 3,
    title: "Sprouts Sushi Wednesday: $6 Oumi Rolls Every Week (2026)",
    h1: "Sprouts Sushi Wednesday",
    desc: "Every Wednesday, most Sprouts Farmers Market stores sell select Oumi sushi rolls for $6, regularly $8 to $10. No coupon or app needed. What's included and how it works.",
    answer: "Every Wednesday, most Sprouts Farmers Market locations sell select rolls from the in-store Oumi sushi case for <strong>$6 each</strong>, regularly $8 to $10. Walk in, pick a marked roll, and pay $6 at the register. (The chain's own FAQ, last edited in 2020, still says $5; DailyBite verified the $6 price in store in October 2026.) No coupon, card or app is needed.",
    facts: [["Day", "Every Wednesday, while supplies last"], ["Price", "$6 per select roll (regularly $8 to $10; the 2020 FAQ still says $5)"], ["What", "Select Oumi rolls from the in-store sushi case"], ["Where", "Most Sprouts markets (the chain's own FAQ describes the promotion)"], ["What you need", "Nothing: no coupon, card or app"], ["Verified", "Price checked in store by DailyBite in October 2026; listed in the daily deal feed every Wednesday"]],
    faq: [["Which Sprouts rolls are $6 on Wednesday?", "Select rolls marked in the sushi case, usually the classic California, spicy tuna and veggie-style rolls. The exact selection varies by store and by week."],
      ["Do I need a Sprouts account or coupon?", "No. The Wednesday price is applied at the register for the marked rolls."],
      ["Is it every Sprouts store?", "Most markets participate. A small number of stores without an Oumi counter, or in select regions, may not, so check the case signage or ask the sushi staff."],
      ["When do the $5 rolls sell out?", "Rolls are made fresh in the morning; busy stores can run short of the $5 selection by mid-afternoon, so lunch is the safest time."]],
    more: `<p>Sprouts' sushi counters are run by Oumi, which makes rolls in-store the same day. The Wednesday deal is the healthy-eating equivalent of a lunch special: a full roll for the price of a sandwich. See <a href="/sushi-deals" style="color:var(--accent2)">every grocery sushi day by weekday</a>, and today's live Sprouts deals on the <a href="/sprouts-deals" style="color:var(--accent2)">Sprouts page</a>.</p>` },
  { slug: "kroger-sushi-wednesday", brand: "Kroger", chainSlug: "kroger-deals", day: 3,
    title: "Kroger Sushi Wednesday: 'Wednesday Only' $6 Rolls at Kroger, Fred Meyer, Fry's, King Soopers & More (2026)",
    h1: "Kroger Sushi Wednesday",
    desc: "Kroger-family stores run a Wednesday Only sushi promotion at their Snowfox and Zenshi counters: select rolls at a flat promo price, now $6. Which banners, which rolls, and whether you need a Kroger Plus card.",
    answer: "Kroger and its banner stores (Fred Meyer, Fry's, King Soopers, Smith's, QFC, Ralphs and others) run a <strong>Wednesday Only</strong> sushi promotion at their Snowfox and Zenshi counters: select rolls such as spicy tuna, California and Philly at a flat promo price, <strong>$6 a roll</strong> as of September 2026 (it was $5 through 2025). A free Kroger Plus card may be needed for the promo price in some divisions.",
    facts: [["Day", "Every Wednesday ('Wednesday Only' SKUs on kroger.com and in-store)"], ["Price", "$6 per select roll (was $5 until 2025)"], ["What", "Select Snowfox and Zenshi rolls: spicy tuna, California, Philly and similar"], ["Where", "Kroger, Fred Meyer, Fry's, King Soopers, Smith's, QFC, Ralphs and other Kroger banners with a sushi counter"], ["What you need", "Usually nothing; a free Kroger Plus card is required for the promo price at some stores"], ["Verified", "Re-checked weekly by DailyBite and listed in the daily deal feed every Wednesday"]],
    faq: [["Which Kroger stores have $5 sushi on Wednesday?", "Stores with an in-store Snowfox or Zenshi sushi counter across the Kroger family of banners. The promotion is chain-wide but the price and lineup are set by division, so a King Soopers and a Ralphs may differ."],
      ["Do I need a Kroger Plus card?", "Sometimes. In several divisions the Wednesday price is a card price; the card is free and can be created at the register or in the app in a minute."],
      ["Which rolls are included?", "The 'Wednesday Only' rolls are usually the classics: spicy tuna, California, Philadelphia and a veggie option. Premium rolls and platters are excluded."],
      ["Can I order it online?", "Kroger.com and the app list the Wednesday Only rolls for pickup in many divisions; availability depends on the store's counter hours."]],
    more: `<p>Kroger's counters are operated by Snowfox and Zenshi, two of the largest grocery sushi companies in the country, and rolls are made fresh each morning. Compare it with the other Wednesday sushi days on the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>, and see the <a href="/kroger-deals" style="color:var(--accent2)">Kroger page</a> for anything else verified today.</p>` },
  { slug: "safeway-5-friday-sushi", brand: "Safeway", chainSlug: "safeway-deals", day: 5,
    title: "Safeway $5 Friday Sushi: How $5 Friday Works, Which Rolls & Divisions (2026)",
    h1: "Safeway $5 Friday: Sushi for $5",
    desc: "Safeway and Albertsons run $5 Friday every week: fresh sushi rolls for $5 (regularly $8 to $10) plus other prepared foods like an 8-piece chicken. How it works, what's in the lineup, and whether you need a Safeway for U account.",
    answer: "Every Friday, Safeway and Albertsons stores run <strong>$5 Friday</strong>: a rotating lineup of items priced at $5, which in most divisions includes <strong>fresh sushi rolls for $5</strong> (regularly $8 to $10) alongside other prepared foods such as an 8-piece fried chicken bag. The lineup posts on Wednesdays in the weekly ad, varies by division, and a free Safeway for U account may be needed for the price.",
    facts: [["Day", "Every Friday, while supplies last"], ["Price", "$5 per select sushi roll (regularly $8 to $10)"], ["What", "Select fresh sushi rolls plus other $5 Friday prepared foods; the lineup rotates weekly"], ["Where", "Safeway and Albertsons divisions that run $5 Friday (most of the West, Mountain states and Mid-Atlantic)"], ["What you need", "A free Safeway for U account in some divisions; the ad states it"], ["Verified", "Re-checked weekly by DailyBite and listed in the daily deal feed every Friday"]],
    faq: [["Is Safeway sushi $5 every Friday?", "In divisions that run $5 Friday, sushi is one of the most common items in the lineup, but it is not guaranteed every single week. Check the weekly ad, which posts on Wednesday, for that Friday's list."],
      ["Do I need Safeway for U?", "Often yes: many divisions price $5 Friday items as member prices. The account is free and takes a minute to create in the app or at the register."],
      ["What else is $5 on Fridays?", "Typical lineups include an 8-piece chicken, a family-size salad, bakery items and sometimes a pizza. Sushi and the chicken are the reliable prepared-food picks."],
      ["Is it Safeway or Albertsons?", "Both. $5 Friday runs across the Albertsons Companies banners (Safeway, Albertsons, Vons, Tom Thumb, Randalls, Jewel-Osco, ACME, Shaw's) in the divisions that participate."],
      ["Is there a Wednesday sushi deal too?", "Many Safeway divisions also price Zenshi rolls at $5.99 to $6 on Wednesdays. Friday is the better price when sushi makes the $5 Friday list."]],
    more: `<p>$5 Friday is the single most reliable grocery prepared-food deal in the country because it is built into the weekly ad rather than run at the counter's discretion. If sushi is missing from your division's list one week, the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a> shows the other chains' days, and the <a href="/safeway-deals" style="color:var(--accent2)">Safeway page</a> carries whatever DailyBite verified today.</p>` },
  // Harris Teeter: the $5 price dated from the 2024 launch. The owner saw the current sign in a
  // Reston, VA store on 2026-10-02: Zenshi rolls, $6, four varieties. The slug keeps the old "5"
  // so the indexed URL does not break.
  { slug: "harris-teeter-5-sushi-friday", brand: "Harris Teeter", chainSlug: "harris-teeter-deals", day: 5,
    title: "Harris Teeter Sushi Friday: Four Zenshi Rolls for $6 Each, Was $5 (2026)",
    h1: "Harris Teeter $6 Sushi Friday",
    desc: "On Fridays, Harris Teeter sells four Zenshi rolls for $6 each: California, Vegetable, Spicy Tuna and Spicy Salmon, regularly about $9.49 to $10.49. Seen in store on October 2, 2026. Which rolls, where, and what you need.",
    answer: "On Fridays, Harris Teeter's in-store Zenshi sushi counters sell <strong>four rolls for $6 each: California, Vegetable, Spicy Tuna and Spicy Salmon</strong>. Regular prices on harristeeter.com run about $9.49 to $10.49, so the saving is $3.50 to $4.50 a roll. The price was $5 when the promotion launched in 2024; DailyBite's owner saw the $6 sign at the sushi case in a Reston, Virginia store on October 2, 2026.",
    facts: [["Day", "Every Friday, in store, while supplies last"], ["Price", "$6 per roll (regularly about $9.49 to $10.49)"], ["What", "California, Vegetable, Spicy Tuna and Spicy Salmon rolls from the Zenshi counter"], ["Where", "Harris Teeter stores with a sushi counter: Virginia, North and South Carolina, Maryland, DC, Delaware, Georgia and Florida"], ["What you need", "Harris Teeter promo prices are usually VIC card prices; the card is free and issued at the register"], ["Checked", "October 2, 2026, in store in Reston, Virginia (the sign at the sushi case); regular prices from harristeeter.com the same day"]],
    faq: [["Is Harris Teeter sushi still $5 on Friday?", "No. It is $6 a roll as of October 2026. The $5 price dates from the 2024 launch of Harris Teeter's $5 meal days, and older articles still quote it."],
      ["Which rolls are $6?", "Four Zenshi rolls: California, Vegetable, Spicy Tuna and Spicy Salmon. Other rolls, platters and combos stay at their regular price."],
      ["Do I need the VIC card?", "Harris Teeter's promo prices are normally VIC prices. The card is free, has no fees, and can be created at customer service or in the app in a minute. If the sign in your store says VIC, scan it at checkout."],
      ["Do all Harris Teeter stores do Sushi Friday?", "Stores with a Zenshi sushi counter. The weekly ad does not list it, so the sign at the case is the final word; a few markets may run it on different terms."],
      ["What time does it sell out?", "Counters make rolls in the morning, and Friday lunch is the peak. Late morning is the safest time; evening selection is thin at busy stores."]],
    more: `<p>For Northern Virginia, DC and the Carolinas, Friday is sushi day: Harris Teeter's $6 rolls, and Safeway's $5 Friday where that division runs it. Wednesday belongs to Publix, Sprouts, Hannaford and Kroger. The full weekly calendar is on the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>; today's verified Harris Teeter deals are on the <a href="/harris-teeter-deals" style="color:var(--accent2)">Harris Teeter page</a>.</p>` },
  { slug: "panera-4-99-mix-and-match", brand: "Panera", chainSlug: "panera-deals", day: null,
    title: "What Is the $4.99 Special at Panera? The Mix & Match Value Menu Explained (2026)",
    h1: "Panera's $4.99 Special: Mix & Match",
    desc: "Panera's $4.99 special is the Mix & Match value menu: half-size soups, salads and sandwiches from a set list for $4.99 each, every item with a free side. What's on it, how to order, and how to build a full meal under $10.",
    answer: "Panera's $4.99 special is the <strong>Mix &amp; Match value menu</strong>: half-size soups, half salads and half sandwiches from a set list of roughly ten items, <strong>$4.99 each</strong>, and every item comes with a free side (baguette, chips or an apple). Pair any two for a full meal under $10. It is an everyday menu, not a limited-time promotion, at participating bakery-cafes.",
    facts: [["Price", "$4.99 per item, every item with a free side"], ["What", "Half-size soups, half salads and half sandwiches from a roughly 10-item list (Toasted Italiano, Fuji Apple Chicken and more)"], ["When", "Every day, all day, at participating bakery-cafes"], ["How to order", "In the cafe, at the kiosk, in the Panera app or online; no code needed"], ["Account needed", "No; a free MyPanera account is optional"], ["Verified", "Re-checked every morning by DailyBite as a standing value menu"]],
    faq: [["Is the $4.99 deal at every Panera?", "It is a national menu at participating bakery-cafes. A small number of locations, and some airport and campus cafes, price differently, so check the menu board or app for your cafe."],
      ["Do I need the Panera app or MyPanera?", "No. The $4.99 price shows on the regular menu. The app is convenient for ordering ahead, and MyPanera is free, but neither is required."],
      ["What items are $4.99?", "A set list of half-size soups, half salads and half sandwiches, roughly ten items that rotate seasonally, such as Toasted Italiano and Fuji Apple Chicken salad. Full-size items and premium sandwiches are not included."],
      ["Is a side really free?", "Yes: each Mix & Match item includes a choice of baguette, chips or an apple at no charge."],
      ["What's the cheapest filling meal?", "Two Mix & Match items, for example a half sandwich and a cup of soup with the baguette sides, comes to $9.98 before tax and is a complete lunch."]],
    more: `<p>This is the deal Panera searchers most often ask about, and it is one of the few standing value menus at a healthier chain, which is why it appears in DailyBite's daily list most days. For today's verified Panera promo codes and app offers, which change more often than the value menu, see the <a href="/panera-deals" style="color:var(--accent2)">Panera page</a>.</p>` },
  { slug: "heb-sushi-wednesday", brand: "H-E-B", chainSlug: "heb-deals", day: 3,
    title: "H-E-B $7 Sushi Wednesday (and $7 Saturday): Sushiya Rolls Explained (2026)",
    h1: "H-E-B $7 Sushi Wednesday",
    desc: "Every Wednesday and Saturday, H-E-B stores with a Sushiya counter sell select fresh rolls for $7, regularly $9 to $12. Which rolls, which stores, and when to go.",
    answer: "Every Wednesday, H-E-B stores with an in-store Sushiya counter sell <strong>select fresh rolls for $7</strong>, regularly about $9 to $12, and the same $7 price repeats on <strong>Saturdays</strong>. No coupon or app is needed. H-E-B's own coupon fine print names both promotions ('Sushi Wednesdays' and '$7 Saturdays'), so they are chain-wide, though selection varies by store.",
    facts: [["Days", "Every Wednesday and every Saturday, while supplies last"], ["Price", "$7 per select roll (regularly about $9 to $12)"], ["What", "Select Sushiya rolls made fresh in store: California, spicy tuna, salmon and similar classics"], ["Where", "H-E-B stores across Texas with a Sushiya counter"], ["What you need", "Nothing: no coupon, card or app"], ["Verified", "Re-checked weekly by DailyBite and listed in the daily deal feed on Wednesdays and Saturdays"]],
    faq: [["Is H-E-B sushi $5 or $7 on Wednesday?", "It is $7 in 2026. Older posts mention $5, but the current Sushiya promotion prices select rolls at $7 on Wednesdays and Saturdays."],
      ["Which rolls are $7?", "Select rolls marked in the Sushiya case, usually the classics. Premium rolls, combo packs and party trays are excluded, and the selection differs by store."],
      ["Do I need an H-E-B account or the app?", "No. The $7 price is on the case tag. Digital coupons in the app are separate and usually exclude the Wednesday and Saturday specials."],
      ["When do the $7 rolls sell out?", "Sushiya counters make rolls fresh in the morning; big stores can run short of the $7 selection by dinner, so lunch is the safest time."]],
    more: `<p>H-E-B's Sushiya counters are among the largest in-store sushi programs in the country, and the twice-weekly $7 price is the most consistent sushi deal in Texas. See <a href="/sushi-deals" style="color:var(--accent2)">every grocery sushi day by weekday</a>, and today's verified H-E-B deals on the <a href="/heb-deals" style="color:var(--accent2)">H-E-B page</a>.</p>` },
  { slug: "hy-vee-sushi-wednesday", brand: "Hy-Vee", chainSlug: "hy-vee-deals", day: 3,
    title: "Hy-Vee Sushi Wednesday: $6 Nori Sushi Rolls (and Friday BOGO) Explained (2026)",
    h1: "Hy-Vee Sushi Wednesday",
    desc: "Every Wednesday, participating Hy-Vee stores sell select Nori Sushi rolls for $6, and on Fridays it's buy one roll, get one 50% off. How it works and where.",
    answer: "Every Wednesday, participating Hy-Vee stores with a Nori Sushi counter sell <strong>select rolls for $6</strong>, regularly about $8 to $10, and on <strong>Fridays</strong> Nori Sushi runs <strong>buy one regular roll, get one 50% off</strong>. Both are store-run promotions posted in each store's weekly specials, so participation and selection vary. No coupon or card is needed.",
    facts: [["Days", "Wednesday ($6 select rolls) and Friday (buy one, get one 50% off)"], ["Price", "$6 per select roll on Wednesdays (regularly about $8 to $10)"], ["What", "Select Nori Sushi rolls made fresh in store"], ["Where", "Hy-Vee stores across the Midwest with a Nori Sushi counter; participating stores"], ["What you need", "Nothing: no coupon, card or app"], ["Verified", "Re-checked weekly by DailyBite and listed in the daily deal feed on Wednesdays and Fridays"]],
    faq: [["Is Hy-Vee sushi $5 on Wednesday?", "Most participating stores price the Wednesday special at $6 in 2026. Some stores have run it at $5 or as half price in the past; the store's weekly specials post is the source of truth."],
      ["Does every Hy-Vee do Sushi Wednesday?", "Most stores with a Nori Sushi counter do, but each store publishes its own kitchen specials, so check your store's page on hy-vee.com or the case signage."],
      ["What is the Friday deal?", "Buy one regular Nori Sushi roll and get a second roll at 50% off, at participating stores every Friday."],
      ["Do I need the Hy-Vee app?", "No. Both specials are case prices. The app is only needed for digital coupons, which are separate."]],
    more: `<p>Hy-Vee's kitchens post weekly specials store by store, which is why DailyBite lists the sushi days as participating-store deals rather than chain-wide ones. The full weekly calendar is on the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>; today's verified Hy-Vee deals are on the <a href="/hy-vee-deals" style="color:var(--accent2)">Hy-Vee page</a>.</p>` },
  { slug: "shoprite-sushi-wednesday", brand: "ShopRite", chainSlug: "shoprite-deals", day: 3,
    title: "ShopRite $5.99 Sushi Wednesday: What's Included & Which Stores (2026)",
    h1: "ShopRite $5.99 Sushi Wednesday",
    desc: "Every Wednesday, participating ShopRite stores sell select fresh sushi rolls for $5.99, regularly $8 to $10. Which rolls, which stores, and how it works.",
    answer: "Every Wednesday, participating ShopRite stores sell <strong>select fresh sushi rolls for $5.99</strong>, regularly $8 to $10: spicy crab, California, shrimp and similar rolls from the in-store counter. It is in-store only and needs no coupon or card. ShopRite stores are independently owned, so the deal is run store by store and the selection varies.",
    facts: [["Day", "Every Wednesday, while supplies last"], ["Price", "$5.99 per select roll (regularly $8 to $10)"], ["What", "Select fresh rolls from the in-store sushi counter"], ["Where", "Participating ShopRite stores in New Jersey, New York, Pennsylvania, Connecticut, Delaware and Maryland"], ["What you need", "Nothing: no coupon, card or app"], ["Verified", "Re-checked weekly by DailyBite and listed in the daily deal feed every Wednesday"]],
    faq: [["Is it every ShopRite?", "Most stores with a sushi counter run it, and many post it on their store Facebook pages each week, but because ShopRite is a cooperative of independent owners, a few stores skip it or price differently."],
      ["Which rolls are $5.99?", "Select rolls marked in the case, typically spicy crab, California, shrimp and veggie rolls. Specialty rolls and platters are excluded."],
      ["Do I need a Price Plus card?", "No. The Wednesday price is on the case tag. The free Price Plus card is only needed for digital coupons."],
      ["Is Stop & Shop's deal the same?", "Similar: Stop & Shop prices its Red Label sushi at $5.99 on Wednesdays at participating stores in the Northeast."]],
    more: `<p>Between ShopRite, Stop & Shop and Giant, Wednesday is sushi day across the Northeast and Mid-Atlantic. Compare every chain's day on the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>; today's verified ShopRite deals are on the <a href="/shoprite-deals" style="color:var(--accent2)">ShopRite page</a>.</p>` },
  { slug: "meijer-sushi-wednesday", brand: "Meijer", chainSlug: "meijer-deals", day: 3,
    title: "Meijer Sushi Wednesday: $5.99 Select Rolls Every Week (2026)",
    h1: "Meijer Sushi Wednesday",
    desc: "Every Wednesday, participating Meijer stores sell select fresh sushi rolls for $5.99 (recently raised from $5). What's included and which stores.",
    answer: "Every Wednesday, participating Meijer stores sell <strong>select fresh sushi rolls for $5.99</strong>, a price that was $5 until recently. Rolls are made in store that day, the deal is a case price with no coupon or mPerks needed, and selection varies by store.",
    facts: [["Day", "Every Wednesday, while supplies last"], ["Price", "$5.99 per select roll (regularly $8 to $10); was $5 before the 2025 increase"], ["What", "Select fresh rolls from the in-store sushi counter"], ["Where", "Participating Meijer stores in Michigan, Ohio, Indiana, Illinois, Kentucky and Wisconsin"], ["What you need", "Nothing: no coupon, card or app"], ["Verified", "Re-checked weekly by DailyBite and listed in the daily deal feed every Wednesday"]],
    faq: [["Is Meijer sushi still $5 on Wednesday?", "No. Most stores now price the Wednesday special at $5.99. It is still roughly 40% off the everyday price."],
      ["Which rolls are included?", "Select rolls marked in the case, usually California, spicy tuna, salmon and veggie rolls. Premium rolls and platters are excluded."],
      ["Do I need mPerks?", "No. The Wednesday price is on the shelf tag. mPerks is only for digital coupons and rewards."],
      ["What time should I go?", "Rolls are made fresh in the morning and the $5.99 selection thins out by late afternoon, so lunch is safest."]],
    more: `<p>Meijer's sushi is made in store daily, which is why the Wednesday deal has a loyal following across the Midwest. See <a href="/sushi-deals" style="color:var(--accent2)">every grocery sushi day by weekday</a>, and today's verified Meijer deals on the <a href="/meijer-deals" style="color:var(--accent2)">Meijer page</a>.</p>` },
  { slug: "publix-sub-of-the-week", brand: "Publix", chainSlug: "publix-deals", day: null,
    title: "Publix Sub of the Week: How the $2-Off Deli Sub Deal Works (2026)",
    h1: "Publix Sub of the Week",
    desc: "Every week Publix takes $2 off one featured whole deli sub, in store, online or in the app. How to find this week's sub, example prices, and how to make it a healthy lunch.",
    answer: "Every week, Publix takes <strong>$2 off one featured whole deli sub</strong>: a Boar's Head turkey sub for about $8.99 instead of $10.99, or the Publix Deli Ultimate Sub for about $7.99 instead of $9.99, for example. The featured sub changes with the weekly ad, you can customize it however you like, and it works at the counter, online and in the Publix app with no coupon.",
    facts: [["When", "Every week, all week; the featured sub changes with the weekly ad"], ["Price", "$2 off the featured whole sub (typically $7.99 to $9.99 after the discount)"], ["What", "One featured whole sub each week, fully customizable (bread, cheese, toppings)"], ["Where", "Every Publix deli in Florida and the Southeast"], ["What you need", "Nothing: no coupon, card or app; ordering ahead in the app is optional"], ["Verified", "Re-checked weekly by DailyBite against the deli's weekly specials page"]],
    faq: [["How do I know which sub is on sale this week?", "Publix lists it on the deli weekly specials page at publix.com, in the weekly ad, and in the app's order-ahead deli section. The deal runs for the full ad week."],
      ["Can I customize the sub?", "Yes. The $2 discount applies to the featured sub regardless of bread, cheese and toppings, so you can build it your way."],
      ["Does it work on half subs?", "The discount is on the whole sub. A whole sub is two meals for most people, which is part of the value."],
      ["What's the healthiest way to order it?", "Whole wheat or multigrain bread, turkey or chicken, extra vegetables, and mustard or oil and vinegar instead of mayo keeps it around 600 to 700 calories for a whole sub."]],
    more: `<p>The Pub Sub is the Southeast's favorite lunch, and the weekly $2 discount is the only standing Publix deli deal besides <a href="/publix-5-sushi-wednesday" style="color:var(--accent2)">$5 Sushi Wednesday</a>. Today's verified Publix deals are on the <a href="/publix-deals" style="color:var(--accent2)">Publix page</a>.</p>` },
  // ---- Added 2026-10-02 (owner request: more store-specific pages). Every fact below was
  // checked that day against the source named in its "Checked" row. Chains whose sushi day
  // could NOT be confirmed on a current official page (Food Lion, Weis, Lowes Foods, Giant
  // Food, Stop & Shop) deliberately have no page. ----
  { slug: "hannaford-sushi-wednesday", brand: "Hannaford", day: 3,
    title: "Hannaford $5 Sushi Wednesday: Which Wago Rolls Are $5 (2026)",
    h1: "Hannaford $5 Sushi Wednesday",
    desc: "Every Wednesday, Hannaford's in-store Wago sushi counters sell select rolls for $5: California, Spicy California, Classic Vegan and more. Which rolls, where, and whether you need a card.",
    answer: "Every Wednesday, the Wago sushi counters inside Hannaford supermarkets sell select rolls for <strong>$5 each</strong>. The company that runs the counters names the California, Spicy California and Classic Vegan rolls, and its current promotion also lists California Salad and Crunch California. No card or app is mentioned in the offer.",
    facts: [["Day", "Every Wednesday"], ["Price", "$5 per select roll"], ["What", "Select Wago rolls: California, Spicy California, Classic Vegan, California Salad, Crunch California"], ["Where", "Hannaford stores with a Wago sushi counter (Maine, New Hampshire, Vermont, Massachusetts and New York)"], ["What you need", "Nothing stated: no card or app in the offer"], ["Checked", "October 2, 2026, on wagosushi.com (the counter operator's FAQ and promotion page)"]],
    faq: [["Is Hannaford sushi $5 every Wednesday?", "Yes, for select rolls at stores with a Wago sushi counter. The operator's site shows the $5 Wednesday promotion running all year, starting February 4, 2026."],
      ["Which rolls are $5?", "The operator names California, Spicy California and Classic Vegan in its FAQ, and adds California Salad and Crunch California on the promotion page. Other rolls stay at their regular price."],
      ["Do I need a Hannaford card or app?", "The offer does not mention one. The price is at the sushi case."],
      ["Does my Hannaford have a sushi counter?", "Not every store does. Check the store's departments on hannaford.com or call ahead."],
      ["Who makes Hannaford's sushi?", "Wago Sushi, a private label made for Hannaford by a dedicated grocery sushi company. Older Hannaford listings showed the Snowfox name; the counters now use Wago."]],
    more: `<p>Hannaford's Wednesday price is the Northeast's version of the grocery sushi day that Publix and Sprouts run elsewhere. If you are not near a Hannaford, the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a> lists the other chains by weekday.</p>` },
  { slug: "dierbergs-sushi-tuesday", brand: "Dierbergs", day: 2,
    title: "Dierbergs $6 Sushi Tuesday: Bento Sushi Deal in St. Louis (2026)",
    h1: "Dierbergs $6 Sushi Tuesday",
    desc: "On Tuesdays, Dierbergs Markets sells select varieties of its in-store Bento Sushi for $6. Where it runs in Missouri and Illinois, what is included, and what you need.",
    answer: "On Tuesdays, Dierbergs Markets sells <strong>select varieties of its hand-rolled Bento Sushi for $6</strong>. Dierbergs states the offer on its own deli and prepared foods page. No card, coupon or app is mentioned.",
    facts: [["Day", "Every Tuesday"], ["Price", "$6 for select varieties"], ["What", "Select varieties of Bento Sushi, hand-rolled in store"], ["Where", "Dierbergs stores in Missouri and Illinois (the St. Louis area); the sushi operator lists 27 locations"], ["What you need", "Nothing stated: no card, coupon or app"], ["Checked", "October 2, 2026, on dierbergs.com (deli and prepared foods page)"]],
    faq: [["Is Dierbergs sushi $6 every Tuesday?", "Dierbergs' own deli page says select varieties are $6 on Tuesdays. It is a standing weekly price, not a dated promotion."],
      ["Which rolls are included?", "Dierbergs says select varieties without listing them, so the choice depends on the store and the day. Look for the Tuesday sign at the sushi case."],
      ["Do I need a Dierbergs rewards account?", "The offer does not mention one."],
      ["Which Dierbergs stores have sushi?", "Stores with a Bento Sushi counter. The operator lists 27 locations across the St. Louis area in Missouri and Illinois."]],
    more: `<p>Dierbergs is one of the few chains with a sushi day on Tuesday rather than Wednesday. For other chains and days, see the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a> and <a href="/food-deals-by-day" style="color:var(--accent2)">deals by day of the week</a>.</p>` },
  { slug: "whole-foods-sushi-friday", brand: "Whole Foods Market", day: 5,
    title: "Whole Foods Sushi Friday: It Needs Amazon Prime. No-Membership Alternatives (2026)",
    h1: "Whole Foods Sushi Friday",
    desc: "Whole Foods' Friday sushi deal is buy one, get one 50% off packaged rolls, in store, for Amazon Prime members only. What it covers, what it excludes, and the grocery sushi days that need no paid membership.",
    answer: "On Fridays, Whole Foods Market runs <strong>buy one, get one 50% off packaged sushi rolls</strong>, in store only, and <strong>only for Amazon Prime members</strong>. It is a discount on a pair of rolls, not a fixed $5 price, and Prime is a paid membership. DailyBite does not list paid-membership perks as deals, so this page explains the offer and points to the sushi days anyone can use.",
    facts: [["Day", "Fridays, as part of Whole Foods' weekly Prime deals"], ["Offer", "Buy one packaged sushi roll, get one 50% off (the discount applies to the lower-priced roll)"], ["Who", "Amazon Prime members only, identified at checkout"], ["Excludes", "Made-to-order rolls, sashimi, nigiri, combos, catering trays, spring rolls and in-store restaurants"], ["Where", "U.S. stores, in store only; not Hawaii; varies by store"], ["Checked", "October 2, 2026, on wholefoodsmarket.com (the current offer window is listed through October 6, 2026)"]],
    faq: [["Is Whole Foods sushi $5 on Fridays?", "No. The Friday offer is buy one, get one 50% off packaged rolls for Prime members. Two rolls at $10 each would cost $15, or $7.50 apiece."],
      ["Do I need Amazon Prime?", "Yes. The offer is for Prime members only, and you identify yourself at checkout with the app code. Without Prime, the rolls are regular price."],
      ["Is the deal permanent?", "Whole Foods lists it for a dated window and has renewed it before. The window shown on October 2, 2026 runs through October 6, 2026, so check the Whole Foods deals page for the current dates."],
      ["Where can I get cheap sushi without a paid membership?", "Publix and Hannaford sell select rolls for $5 on Wednesdays with no membership. Sprouts and Kroger-family stores charge $6 on Wednesdays, and Dierbergs $6 on Tuesdays. Wegmans sells a California roll for $5 every day at its Reston, Virginia store."],
      ["Why doesn't DailyBite list this as a deal?", "Because it requires a paid membership. The daily list only includes offers anyone can claim, at most with a free account."]],
    more: `<p>If you already have Prime, the Friday offer is worth using on two higher-priced rolls, since the discount comes off the cheaper one. If you do not, the no-membership sushi days are the better value: see <a href="/publix-5-sushi-wednesday" style="color:var(--accent2)">Publix</a>, <a href="/sprouts-sushi-wednesday" style="color:var(--accent2)">Sprouts</a>, <a href="/hannaford-sushi-wednesday" style="color:var(--accent2)">Hannaford</a> and <a href="/kroger-sushi-wednesday" style="color:var(--accent2)">Kroger</a> on Wednesdays, or the full <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>.</p>` },
  { slug: "smoothie-king-free-upsize-friday", brand: "Smoothie King", chainSlug: "smoothie-king-deals", day: 5,
    title: "Smoothie King Free Upsize Friday: 32 oz for the Price of a 20 oz (2026)",
    h1: "Smoothie King Free Upsize Friday",
    desc: "On Fridays, Smoothie King Healthy Rewards members get a 32 oz smoothie for the price of a 20 oz when they order in the app. Healthy Rewards is free. How it works and what it excludes.",
    answer: "On Fridays, Smoothie King <strong>Healthy Rewards members get a 32 oz smoothie for the price of a 20 oz</strong> when they order through the Smoothie King app, at participating locations. Healthy Rewards is free to join. Smoothie King's rewards terms also call it $1 Up Fridays.",
    facts: [["Day", "Every Friday"], ["Offer", "A 32 oz smoothie for the price of a 20 oz"], ["Who", "Healthy Rewards members (free to join), ordering in the Smoothie King app"], ["Where", "Participating U.S. locations"], ["Catch", "Rewards cannot be redeemed on these Friday orders, though points still accrue"], ["Checked", "October 2, 2026: smoothieking.com rewards pages confirm the promotion and the free membership; the size terms are from Smoothie King's own posts and September 2026 deal trackers"]],
    faq: [["Is Free Upsize Friday still running in 2026?", "Smoothie King's current rewards terms name Free Upsize Fridays, and deal trackers listed it in late September 2026. Participation is by location, so check the app for your store."],
      ["Do I have to pay for Healthy Rewards?", "No. Smoothie King says Healthy Rewards is free to join."],
      ["Do I need the app?", "Yes. The upsize is applied to app orders by rewards members."],
      ["Can I use a reward on a Free Upsize Friday order?", "No. The rewards terms say rewards may not be used on these Friday orders. You still earn points."],
      ["Is it open to non-members?", "Not normally. Smoothie King opened it to all guests for summer 2025 only."]],
    more: `<p>A weekly special like this is listed in DailyBite's daily feed on Fridays only. See the <a href="/smoothie-king-deals" style="color:var(--accent2)">Smoothie King page</a> for anything else running today, and <a href="/food-deals-by-day" style="color:var(--accent2)">deals by day of the week</a> for the rest of the calendar.</p>` },
  { slug: "wegmans-sushi-prices", brand: "Wegmans",
    title: "Wegmans Sushi Prices: The $5 California Roll, No Deal Day Needed (2026)",
    h1: "Wegmans Sushi Prices",
    desc: "Wegmans does not run a weekly sushi deal day. It does sell a California roll for $5 every day at its Reston, Virginia store. Shelf prices for the common rolls, checked on wegmans.com.",
    answer: "Wegmans <strong>does not run a weekly sushi deal day</strong>: no official source shows one, and half-price claims on social media could not be confirmed. What it has instead is a low everyday price. At the Reston, Virginia store, a <strong>California roll is $5.00 every day</strong>, the same as the Wednesday price at chains that discount once a week. Prices vary by store.",
    facts: [["Deal day", "None"], ["California roll (5 oz)", "$5.00"], ["Avocado cucumber roll", "$6.99"], ["Spicy shrimp roll", "$7.00"], ["Crunchy California roll", "$7.49"], ["Philadelphia roll", "$8.49"], ["Spicy tuna roll", "$8.99"], ["Checked", "October 2, 2026, on wegmans.com with the store set to Reston, Virginia. Other stores may differ."]],
    faq: [["Does Wegmans have $5 sushi?", "Yes, for the California roll: $5.00 every day at the Reston, Virginia store when checked on October 2, 2026. Other rolls run from about $7 to $9."],
      ["Does Wegmans have a sushi Wednesday or half-price sushi?", "No official Wegmans source shows a weekly sushi day or a half-price offer. The only claims found were on social media."],
      ["Who makes Wegmans sushi?", "Wegmans sells it under its own name and makes it in house, rather than through an outside sushi company."],
      ["Are the prices the same at every Wegmans?", "No. Wegmans prices by store. Set your store on wegmans.com to see the price near you."]],
    more: `<p>For a single roll, Wegmans' everyday California roll matches the best weekly deal price at other chains, with no need to plan around a day. For the chains that do discount once a week, see the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>.</p>` },
  // Rotisserie chicken comparison (owner request, 2026-10-02). Every price was read that day
  // on the retailer's own site for the store named in the table, except Costco, which does
  // not list the chicken online (Consumer Reports, June 2026). Per-pound figures are
  // calculated only where the retailer states a weight. Lidl could not be verified and is
  // left out. Re-check before changing any number.
  { slug: "rotisserie-chicken-prices", brand: "Rotisserie Chicken",
    title: "Rotisserie Chicken Prices by Store (2026): Costco, Walmart, Kroger, Wegmans and More",
    h1: "Rotisserie Chicken Prices by Store",
    desc: "What a whole hot rotisserie chicken costs at 16 grocery chains, checked on each store's own site on October 2, 2026: the cheapest without a membership, the best price per pound, and which discount days are real.",
    answer: "A whole hot rotisserie chicken costs <strong>from about $5 to $10</strong> depending on the store. The warehouse clubs are cheapest at <strong>$4.98 to $4.99 for about 3 pounds</strong>, but they need a paid membership. Without one, <strong>Walmart is $5.97</strong> nationwide and H-E-B's Hill Country Fare chicken is $4.97 in Texas. Most supermarkets charge $7 to $10 for a smaller bird, so the price per pound varies far more than the sticker price.",
    facts: [["Cheapest overall", "Sam's Club $4.98, Costco $4.99, BJ's $4.99 (about 3 lb each; paid membership)"], ["Cheapest with no membership", "H-E-B Hill Country Fare $4.97 (Texas); Walmart $5.97 (2.25 lb)"], ["Best price per pound", "The warehouse clubs at about $1.66 a pound; Walmart is $2.65"], ["Most expensive per pound", "Sprouts: $9.99 for 25 oz, about $6.39 a pound"], ["On sale when checked", "Giant Food $5.99 (regular $7.99) and Food Lion $5.99 (regular $6.99)"], ["Checked", "October 2, 2026, on each retailer's own site. Prices are for the store named and vary by location."]],
    table: { head: ["Store", "Price", "Size", "Per pound", "Membership", "Store checked"],
      rows: [
        ["H-E-B (Hill Country Fare)", "$4.97", "Not stated", "", "None", "Victoria, TX"],
        ["Sam's Club (Member's Mark)", "$4.98", "Not stated", "", "Paid", "Woodbridge, VA"],
        ["Costco (Kirkland Signature)", "$4.99", "About 3 lb", "$1.66", "Paid", "Per Consumer Reports, June 2026"],
        ["BJ's (Wellsley Farms)", "$4.99", "3 lb", "$1.66", "Paid", "Woodbridge, VA"],
        ["Walmart", "$5.97", "2.25 lb", "$2.65", "None", "walmart.com listing"],
        ["Target (sold cold, fully cooked)", "$5.99", "30 oz", "$3.19", "None", "target.com listing"],
        ["H-E-B (Meal Simple)", "$6.47", "Not stated", "", "None", "Victoria, TX"],
        ["Food Lion", "$6.99 ($5.99 on sale)", "28 oz", "$3.99", "None", "Halifax Rd store, VA"],
        ["Kroger (Private Selection)", "$7.99", "32 oz", "$4.00", "None", "Mechanicsville, VA"],
        ["Giant Food", "$7.99 ($5.99 on sale)", "30 oz", "$4.26", "None", "giantfood.com listing"],
        ["Harris Teeter", "$7.99", "Not stated", "", "None", "Northern Virginia store"],
        ["Publix (delivery and curbside price)", "$8.85", "Not stated", "", "None", "In-store price not published"],
        ["Albertsons", "$8.99", "Not stated", "", "None", "Boise, ID"],
        ["Whole Foods (online, chilled)", "$9.59", "About 1.75 lb", "$5.48", "None", "wholefoodsmarket.com listing"],
        ["Safeway", "$9.99", "Not stated", "", "None", "Oakland, CA"],
        ["Wegmans", "$9.99", "34 oz", "$4.70", "None", "Reston, VA"],
        ["Sprouts", "$9.99", "25 oz", "$6.39", "None", "Manassas, VA"],
      ],
      note: "Per-pound figures are calculated from the weight the retailer lists and are blank where no weight is published. Aldi does not sell a hot whole rotisserie chicken." },
    faq: [["Who has the cheapest rotisserie chicken?", "The warehouse clubs: Sam's Club at $4.98 and Costco and BJ's at $4.99, each for a bird of about 3 pounds. All three require a paid membership. H-E-B's Hill Country Fare chicken is $4.97 with no membership, in Texas."],
      ["What is the cheapest rotisserie chicken without a membership?", "Walmart at $5.97 for 2.25 pounds is the cheapest that is available nationwide. In Texas, H-E-B's Hill Country Fare chicken is $4.97. Target sells a fully cooked chicken for $5.99, but it is refrigerated, not hot."],
      ["Is Costco's rotisserie chicken still $4.99?", "Yes, by the most recent reporting: Consumer Reports listed it at $4.99 for about 3 pounds in June 2026. Costco does not show the price on its website, so this is the one number here that was not read from the retailer's own page."],
      ["Which store gives the most chicken for the money?", "The warehouse clubs, at about $1.66 a pound. Among regular supermarkets with a listed weight, Walmart is $2.65 a pound, Food Lion about $4, Kroger $4, Giant Food $4.26 and Wegmans $4.70. Sprouts is the most expensive per pound at about $6.39."],
      ["Are there discount days for rotisserie chicken?", "Whole Foods takes $2 off on Tuesdays, but only for Amazon Prime members, in store, in an offer window listed through October 6, 2026. Safeway's $5 Friday lineup rotates and did not include rotisserie chicken in the ads checked this week. Reports of a Kroger chicken Thursday could not be confirmed on an official page."],
      ["Why is the same chicken a different price at another store?", "Supermarkets price by store and division. Safeway was $9.99 in Oakland while Albertsons, the same company, was $8.99 in Boise. Set your own store on the retailer's site to see the price near you."]],
    more: `<p>Rotisserie chicken is one of the cheapest sources of cooked protein in a grocery store, and the sticker price hides most of the difference: a $9.99 chicken at one store can weigh half as much as a $4.99 one at a warehouse club. For other ready-to-eat value, see the <a href="/cheap-healthy-meals" style="color:var(--accent2)">cheapest healthy meals index</a>, ranked by protein per dollar, and the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>.</p>` },
  // Cheap Japanese food hub (owner request, 2026-10-03: Japanese-style food is the benchmark for a
  // genuinely healthy meal under $10). Every price was read on the chain's own ordering site or
  // in the source named in the table that day. Chains whose price could not be read (Sarku
  // Japan's app needs a login) say so instead of guessing. Re-check before changing a number.
  { slug: "cheap-japanese-food", brand: "Japanese",
    title: "Cheap Japanese Food in the US: Real Meals Under $10, Priced and Checked (2026)",
    h1: "Cheap Japanese Food: Real Meals Under $10",
    desc: "Where a Japanese-style meal is actually cheap in the US: $5.99 udon at Marugame, Yoshinoya bowls from $4.69, Kura Sushi by the plate, Sarku Japan teriyaki, $4 onigiri in DC, and grocery sushi days. Prices read on each chain's own site on October 3, 2026, with what is and is not near Washington, DC.",
    answer: "Japanese fast casual is where the US comes closest to a cheap meal that is also good for you: broth, rice, grilled protein and vegetables at a fixed everyday price. The catch is geography. The two chains that publish mains under $7, <strong>Marugame Udon ($5.99 kake udon)</strong> and <strong>Yoshinoya ($4.69 vegetable bowl, $8.99 grilled chicken bowl)</strong>, are West Coast only. Near Washington, DC the verified options are <strong>Sarku Japan</strong> (teriyaki bowls, nutrition published, price varies by mall), <strong>Kura Sushi in Tysons</strong> (about $3.79 a plate), <strong>Hana Japanese Market's $4 onigiri</strong> in DC, and the <a href=\"/sushi-deals\" style=\"color:var(--accent2)\">grocery sushi days</a>.",
    facts: [["Cheapest full meal", "Yoshinoya Regular Mixed Vegetables bowl, $4.69 (California only)"], ["Cheapest noodle bowl", "Marugame Udon kake or bukkake udon, regular, $5.99 (California, Hawaii, Washington)"], ["Best protein per dollar", "Yoshinoya grilled chicken bowl, $8.99, 580 calories, 37 g protein"], ["Near Washington, DC", "Sarku Japan (Dulles Town Center, Fairfax, Pentagon City and more), Kura Sushi Tysons, Hana Japanese Market in DC, Wegmans Reston $5 California roll"], ["Not near DC", "Marugame Udon and Yoshinoya have no Virginia, Maryland or DC stores"], ["Checked", "October 3, 2026, on each chain's own ordering site, locator or nutrition page; the Hana price is from the GW Hatchet, April 2026"]],
    table: { head: ["Place", "Item", "Price", "Calories, protein", "Where", "Nearest to Reston, VA"],
      rows: [
        ["Yoshinoya", "Regular Mixed Vegetables bowl", "$4.69", "470 cal, 11 g protein, 530 mg sodium", "California only", "None"],
        ["Marugame Udon", "Kake udon (dashi broth), regular", "$5.99 (large $7.49)", "Not published", "California, Hawaii, Washington (27 stores)", "None"],
        ["Marugame Udon", "Bukkake udon, hot or cold, regular", "$5.99 (large $7.49)", "Not published", "California, Hawaii, Washington", "None"],
        ["Hana Japanese Market", "Onigiri (salmon, chicken mayo, kinpira gobo, ume)", "$4 each, 2 for $7", "Not published", "Washington, DC (one store), Wednesday to Sunday", "2000 17th St NW, Washington, DC"],
        ["Trader Joe's", "Teriyaki Chicken Bowl (frozen)", "$4.79", "370 cal, 18 g protein, 880 mg sodium", "National", "Reston"],
        ["Wegmans", "California roll (5 oz)", "$5.00", "Not published", "Price read at the Reston store", "Reston"],
        ["Kura Sushi", "Revolving sushi, per plate", "About $3.79 average (company filing, 2025)", "60 to 100 cal per nigiri plate", "22 states and DC (88 stores)", "Tysons Corner, 8461 Leesburg Pike"],
        ["Yoshinoya", "Regular grilled chicken bowl (teriyaki or habanero)", "$8.99", "580 cal, 37 g protein, 920 mg sodium", "California only", "None"],
        ["Yoshinoya", "Regular Original Gyudon beef bowl", "$8.99", "Ordering site says 600 cal; the nutrition sheet says more", "California only", "None"],
        ["Marugame Udon", "Kitsune udon or curry udon, regular", "$9.65", "Not published", "California, Hawaii, Washington", "None"],
        ["Sarku Japan","Marugame Udon","Yoshinoya", "Chicken Teriyaki Bowl", "Varies by mall; not published online", "430 cal, 19 g protein, 580 mg sodium", "About 170 mall locations in 34 states", "Dulles Town Center, Suite 238; also Fairfax (Turnpike Shopping Center)"],
      ],
      note: "Prices are for the store named on each chain's ordering site (Marugame: Victoria Gardens, CA; Yoshinoya: Alhambra, CA) and vary by location. Kura Sushi's figure is the average plate price in its fiscal 2025 annual report; the chain raised prices about 3.5% in November 2025 and publishes no 2026 plate price." },
    faq: [["What is the cheapest Japanese meal in the US?", "At a standing price with nutrition published, Yoshinoya's Regular Mixed Vegetables bowl at $4.69 (470 calories). It is California only. Marugame Udon's kake udon is $5.99 in California, Hawaii and Washington, but Marugame publishes no nutrition."],
      ["Is there cheap Japanese food near Washington, DC?", "Sarku Japan has nine Virginia and sixteen Maryland mall locations, including Dulles Town Center and Fairfax, and publishes nutrition for its teriyaki bowls (430 calories and 19 g protein for the chicken bowl); its prices are set by location and were not readable online, so check the counter. Kura Sushi in Tysons prices by the plate, about $3.79 on average. Hana Japanese Market in DC sells onigiri for $4, two for $7. For a sit-down-quality roll under $6, the grocery sushi days are the real answer."],
      ["Is Marugame Udon in Virginia?", "No. As of October 2026 Marugame's own locator lists 27 US stores in California, Hawaii and Washington state. Reports of a Dulles Town Center location are a mix-up: the Japanese counter there is Sarku Japan."],
      ["Is Kura Sushi a cheap meal?", "Only in small amounts. At about $3.79 a plate, two plates (four pieces) are around $7.60 before tax and three plates pass $10. It is a cheap snack or a light lunch, not a full meal under $10."],
      ["Is Japanese fast food healthy?", "The bowls here are mostly rice, broth, grilled chicken or beef and vegetables, with 430 to 600 calories and 19 to 37 g protein. Sodium is the weak point: 530 mg for Yoshinoya's vegetable bowl, 920 mg for its chicken bowl, 880 mg for Trader Joe's teriyaki bowl. Fried items (katsu, tempura) are not counted here."],
      ["Why isn't Sarku Japan's price listed?", "Sarku prices by location and its ordering app requires a login, so no price could be read from an official page. DailyBite does not publish prices from delivery apps or third-party menu sites. If you see the price at a counter, send it in and it will be added with the date and location."]],
    more: `<p>The pattern across every chain here is the same: the cheap, healthy item is the plain one. Kake udon, the vegetable bowl, the onigiri, the California roll. Add protein and the price climbs toward $10; add fried toppings and the nutrition falls apart. For a Japanese-style meal that is cheap everywhere, the frozen <a href="/cheap-healthy-meals" style="color:var(--accent2)">Trader Joe's teriyaki bowl</a> and the weekly <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi days</a> are the two that work in every state. This page will grow as prices verify: Maruichi in Rockville, Mitsuwa, Nijiya, Tokyo Central and H Mart's prepared-food counters are next.</p>` },
];
const EXPLAINER_NAV = `<nav class="chains"><strong>Weekly deals explained:</strong> ${EXPLAINERS.map(x => `<a href="/${x.slug}">${esc(x.h1)}</a>`).join(" &middot; ")} &middot; <a href="/food-deals-by-day">Deals by day</a></nav>`;

// Deals report (2026-10-02): a dated, citable snapshot built from report-data.json, which
// scripts/deal-history-report.mjs generates from the repo's own daily history. The page does
// not change day to day: a new edition is a deliberate re-run of that script. Original data
// is the one thing here other sites can cite, which is how the site earns its first links.
const REPORT_SLUG = "healthy-food-deals-report";
function loadReport() {
  try { return JSON.parse(readFileSync(join(root, "report-data.json"), "utf8")); } catch { return null; }
}
function reportPage(R) {
  const fmtDate = d => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  const span = `${fmtDate(R.start)} to ${fmtDate(R.end)}`;
  const daysOf = name => (R.chainDays.find(c => c.chain === name) || { days: 0 }).days;
  const HEADLINE = ["Panera Bread", "Subway", "Noodles & Company", "Chipotle", "Tropical Smoothie Cafe", "Smoothie King", "Potbelly", "Qdoba", "Sweetgreen", "Chick-fil-A", "CAVA", "Starbucks", "Just Salad", "Jamba"];
  const headlineRows = HEADLINE.map(n => [n, daysOf(n)]).sort((a, b) => b[1] - a[1]);
  const bar = n => `<span class="bar"><i style="width:${Math.max(2, Math.round(100 * n / R.days))}%"></i></span>`;
  const sushiRows = R.sushi.filter(s => s.daysSeen >= 2);
  const money = n => "$" + (n % 1 ? n.toFixed(2) : n);
  const best = [...R.byWeekday].sort((a, b) => b.average - a.average);
  const title = `What Healthy Food Deals Actually Exist: ${R.days} Days of Daily Checks (2026 Report)`;
  const desc = `We checked healthy restaurant chains and grocery counters every morning for ${R.days} days and logged ${R.listings} verified deal listings across ${R.chains} chains. Which chains really discount, which days are best, what grocery sushi costs, and the full dataset to download.`;
  const artLd = { "@context": "https://schema.org", "@type": "Article", "headline": title, "datePublished": R.generated, "dateModified": R.generated, "author": { "@type": "Person", "name": "Jacob Elsayed" }, "publisher": { "@type": "Organization", "name": "DailyBite", "url": SITE } };
  const dataLd = { "@context": "https://schema.org", "@type": "Dataset", "name": `DailyBite healthy food deals dataset, ${R.edition}`, "description": `Every verified healthy food deal listed by DailyBite on each of ${R.days} days (${R.listings} rows): date, chain, deal, category, region, expiry, estimated saving, whether it was free and whether it needed a free account.`, "url": `${SITE}/${REPORT_SLUG}`, "temporalCoverage": `${R.start}/${R.end}`, "spatialCoverage": "United States", "creator": { "@type": "Organization", "name": "DailyBite", "url": SITE }, "license": "https://creativecommons.org/licenses/by/4.0/", "isAccessibleForFree": true, "distribution": [{ "@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": `${SITE}/healthy-food-deals-dataset.csv` }] };
  const css = `.tblwrap{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:4px 12px;margin:12px 0}.tbl{width:100%;border-collapse:collapse;font-size:14px}.tbl th,.tbl td{text-align:left;padding:8px 6px;border-bottom:1px solid var(--line);vertical-align:middle}.tbl tr:last-child td{border-bottom:0}.tbl th{color:var(--muted);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em}.tbl td.n,.tbl th.n{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}.bar{display:inline-block;width:120px;max-width:30vw;height:8px;border-radius:99px;background:var(--chip);vertical-align:middle;overflow:hidden}.bar i{display:block;height:100%;background:var(--accent);border-radius:99px}.cite{background:var(--card);border:1px dashed var(--line);border-radius:12px;padding:12px 14px;font-size:13px;line-height:1.55;color:var(--ink);margin:12px 0}.dl{display:inline-block;background:var(--accent);color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:10px 14px;border-radius:10px;margin:6px 0}details.all{margin:10px 2px}details.all summary{cursor:pointer;color:var(--accent2);font-size:14px;font-weight:600}`;
  return pageHead(title, desc, REPORT_SLUG, [artLd, dataLd], css) + `
  <div class="date">Edition: ${esc(span)}</div>
  <h1>What Healthy Food Deals Actually Exist: ${R.days} Days of Daily Checks</h1>
  <p class="answer">Every morning from ${esc(span)}, DailyBite checked healthy restaurant chains and grocery prepared-food counters for deals anyone could claim that day, and listed what passed its checks against official sources. Over <strong>${R.days} days</strong> that produced <strong>${R.listings} deal listings</strong> from <strong>${R.chains} chains</strong>, about ${R.perDay.average} a day. The short version: the best-known healthy chains almost never discount, grocery sushi counters are the most dependable healthy deal in the country, and truly free food is rare.</p>
  <div class="facts">
    <b>Period</b><span>${esc(span)} (${R.days} daily checks)</span>
    <b>Deal listings</b><span>${R.listings}, from ${R.chains} chains</span>
    <b>Per day</b><span>${R.perDay.average} on average (median ${R.perDay.median}, range ${R.perDay.min} to ${R.perDay.max})</span>
    <b>Truly free</b><span>${R.shares.free}% of listings</span>
    <b>Needs a free account</b><span>${R.shares.needsFreeAccount}% of listings (an app, rewards program or store card that costs nothing)</span>
    <b>Standing value menus</b><span>${R.shares.standing}% of listings; dated promotions were ${R.shares.dated}% and weekly day specials ${R.shares.weeklyDay}%</span>
    <b>Regional</b><span>${R.shares.regional}% of listings were not available nationwide</span>
    <b>Typical saving</b><span>About ${money(R.medianStatedSaving)} per order (median of ${R.listingsWithSaving} listings with an estimate)</span>
  </div>
  <div class="prose">
  <h2>1. The best-known healthy chains almost never run a deal</h2>
  <p>The table counts the days, out of ${R.days}, on which the daily check found and verified at least one deal for each chain. CAVA appeared on ${daysOf("CAVA")} day, Starbucks on ${daysOf("Starbucks")}, Chick-fil-A on ${daysOf("Chick-fil-A")} and Sweetgreen on ${daysOf("Sweetgreen")}. Chipotle, which markets promotions heavily, had one on ${daysOf("Chipotle")} days. The chains that show up most are the ones with a permanent value menu or a standing promo code.</p>
  </div>
  <div class="tblwrap"><table class="tbl"><thead><tr><th>Chain</th><th class="n">Days with a verified deal</th><th>Share of ${R.days} days</th></tr></thead><tbody>
  ${headlineRows.map(([n, d]) => `<tr><td>${esc(n)}</td><td class="n">${d}</td><td>${bar(d)}</td></tr>`).join("\n  ")}
  </tbody></table></div>
  <details class="all"><summary>All ${R.chains} chains</summary>
  <div class="tblwrap"><table class="tbl"><thead><tr><th>Chain</th><th class="n">Days</th></tr></thead><tbody>
  ${R.chainDays.map(c => `<tr><td>${esc(c.chain)}</td><td class="n">${c.days}</td></tr>`).join("\n  ")}
  </tbody></table></div></details>
  <div class="prose">
  <h2>2. Grocery sushi counters are the most dependable healthy deal</h2>
  <p>Grocery chains were only ${R.shares.grocery}% of listings, but their weekly sushi days were the one deal that returned on schedule every week at a stated price, with no app in most cases. These are the prices logged, for every chain and weekday seen on at least two check days. Prices are per select roll and vary by store and division.</p>
  <p>The last column is a separate source check made on ${esc(fmtDate(R.recheckDate || R.end))}: it looked for a current official page (the store, its weekly ad, or the company that runs the sushi counter) for each one. Three were confirmed (Harris Teeter in person by the owner, who found the price is now $6), three had no current official source, and Safeway's $5 Friday sushi ran in some divisions and not others that week. Treat every price here as what was logged, not a guarantee: check the sushi case or call the store.</p>
  </div>
  <div class="tblwrap"><table class="tbl"><thead><tr><th>Day</th><th>Chain</th><th class="n">Price logged</th><th>Source re-check</th></tr></thead><tbody>
  ${sushiRows.map(s => `<tr><td>${esc(s.day)}</td><td>${esc(s.chain)}</td><td class="n">${money(s.low)}${s.high !== s.low ? " to " + money(s.high) : ""}</td><td>${esc(s.recheck || "Not re-checked")}</td></tr>`).join("\n  ")}
  </tbody></table></div>
  <div class="prose">
  <p>The full weekday guide, with what each store includes and whether a card is needed, is on the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi days page</a>.</p>
  <h2>3. Wednesday and Friday are the best days to look</h2>
  <p>${esc(best[0].day)} averaged ${best[0].average} verified deals and ${esc(best[1].day)} ${best[1].average}, against ${best[best.length - 1].average} on ${esc(best[best.length - 1].day)}, the thinnest day. The difference is almost entirely the grocery sushi days.</p>
  </div>
  <div class="tblwrap"><table class="tbl"><thead><tr><th>Weekday</th><th class="n">Average verified deals</th><th></th></tr></thead><tbody>
  ${R.byWeekday.map(w => `<tr><td>${esc(w.day)}</td><td class="n">${w.average}</td><td><span class="bar"><i style="width:${Math.round(100 * w.average / best[0].average)}%"></i></span></td></tr>`).join("\n  ")}
  </tbody></table></div>
  <div class="prose">
  <h2>4. Most healthy "deals" are standing menus, not promotions</h2>
  <p>${R.shares.standing}% of listings were everyday value menus that do not expire, ${R.shares.dated}% were dated promotions and ${R.shares.weeklyDay}% were weekly day specials. Only ${R.shares.free}% were free food. About a third (${R.shares.needsFreeAccount}%) needed a free account, which is where healthy chains put most of their offers: inside an app, where web search does not see them.</p>
  <h2>How this was measured, and what it cannot tell you</h2>
  <p>Each morning at about 7 AM Eastern an automated check searches official chain pages, weekly ads and newsrooms, and keeps only deals that pass the site's rules: claimable by anyone that day, a stated price or discount, an official source. Paid memberships, first-order promotions, birthday rewards, points games and targeted offers are excluded. Standing weekly grocery deals that were verified once are listed on their day without a new search. One snapshot per calendar day was taken from the site's public history.</p>
  <p>So this is a record of what one daily check found and listed, not a census of every promotion that ran. Weekly grocery deals that were verified once were carried forward on their day, and the source re-check above shows that some of those could not be confirmed again from an official page. A chain with zero or one day here may have run app-only offers the check could not see. The list of chains covered changed during the period (four casual-dining chains were dropped on September 7, 2026 and more bowl and Mediterranean chains were added), and the saving is an editorial estimate against the regular menu price. The numbers are counts, not rankings of quality.</p>
  <h2>Download and cite</h2>
  <p>The dataset is one row per listing per day: date, weekday, chain, deal, category, region, expiry, estimated saving, free or not, account needed or not, and the source link.</p>
  <p><a class="dl" href="/healthy-food-deals-dataset.csv" download>Download the dataset (CSV, ${R.listings} rows)</a></p>
  <div class="cite">Cite as: DailyBite, "What Healthy Food Deals Actually Exist: ${R.days} Days of Daily Checks", ${esc(span)}. ${SITE}/${REPORT_SLUG}. Data free to reuse with attribution (CC BY 4.0).</div>
  <p>Questions or corrections: jacob@dailybitedeals.com. See also the <a href="/verification-log" style="color:var(--accent2)">daily verification log</a> and the <a href="/cheap-healthy-meals" style="color:var(--accent2)">cheapest healthy meals index</a>.</p>
  </div>
  <nav class="chains"><strong>More:</strong> <a href="/sushi-deals">Grocery sushi days</a> &middot; <a href="/food-deals-by-day">Deals by day of the week</a> &middot; <a href="/">All of today's deals</a></nav>
  ${GUIDES_NAV}
` + PAGE_FOOT;
}

// Optional comparison table on an explainer (2026-10-02, rotisserie chicken prices).
const EXPLAINER_TBL_CSS = `.tblwrap{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:4px 12px;margin:12px 0}.tbl{width:100%;border-collapse:collapse;font-size:14px}.tbl th,.tbl td{text-align:left;padding:8px 6px;border-bottom:1px solid var(--line);vertical-align:top}.tbl tr:last-child td{border-bottom:0}.tbl th{color:var(--muted);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}.tblnote{color:var(--muted);font-size:13px;line-height:1.5;margin:6px 2px}`;
function explainerPage(x, deals) {
  const tableBlock = x.table ? `<div class="tblwrap"><table class="tbl"><thead><tr>${x.table.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${x.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${x.table.note ? `<p class="tblnote">${esc(x.table.note)}</p>` : ""}` : "";
  const live = deals.filter(d => canonBrand(d.brand) === canonBrand(x.brand));
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": x.faq.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) };
  const artLd = { "@context": "https://schema.org", "@type": "Article", "headline": x.title, "dateModified": iso, "author": { "@type": "Organization", "name": "DailyBite" }, "publisher": { "@type": "Organization", "name": "DailyBite", "url": SITE } };
  const todayNote = x.day != null ? (dowET === x.day ? `<div class="note" style="border-color:var(--accent)">Today is ${WEEKDAYS[x.day]}: this deal is on right now.</div>` : `<div class="note">Next ${WEEKDAYS[x.day]} is the next time this deal runs. The daily list shows it on the day.</div>`) : "";
  const liveBlock = live.length ? `<h2 style="font-size:19px;margin:26px 2px 8px">Verified ${esc(x.brand)} deals live today</h2><div class="grid">${groupCards(live)}</div>` : "";
  return pageHead(x.title, x.desc, x.slug, [faqLd, artLd], x.table ? EXPLAINER_TBL_CSS : "") + `
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>${esc(x.h1)}</h1>
  <p class="answer">${x.answer}</p>
  <div class="facts">${x.facts.map(([k, v]) => `<b>${esc(k)}</b><span>${esc(v)}</span>`).join("")}</div>
  ${tableBlock}
  ${todayNote}
  <div class="prose">${x.more}</div>
  <div class="faq"><h2 style="font-size:19px;margin:24px 2px 4px">Questions people ask</h2>${x.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("")}</div>
  ${liveBlock}
  <div class="note">How DailyBite verifies this: the daily refresh re-checks each weekly grocery deal against the store's own site, weekly ad or FAQ, and the owner tests deals in person. Prices vary by store and division, and counters sell out: the price you pay is the one on the shelf tag that day.</div>
  ${EMAIL_CAPTURE}
  ${EXPLAINER_NAV}
  <nav class="chains"><strong>More:</strong> ${x.chainSlug ? `<a href="/${x.chainSlug}">${esc(x.brand)} deals today</a> &middot; ` : ""}<a href="/sushi-deals">Grocery sushi days</a> &middot; <a href="/">All of today's deals</a></nav>
  ${GUIDES_NAV}
` + PAGE_FOOT;
}

// One page for the week (owner request, 2026-09-08): the seven day-of-week pages were
// near-duplicates that Google left in "discovered, not indexed"; they now redirect here.
function byDayPage(deals) {
  const title = "Food Deals by Day of the Week: Sushi Wednesday, $5 Friday, Taco Tuesday & More (2026)";
  const desc = `Which healthy food deals repeat on which weekday: Wednesday sushi days at Publix, Sprouts and Kroger, $5 Friday at Safeway and $6 Zenshi rolls at Harris Teeter, Taco Tuesdaze at Tijuana Flats, and what refreshes on Mondays. Updated ${prettyDate}.`;
  const sections = DAYS.map((day, i) => {
    const cap = day[0].toUpperCase() + day.slice(1);
    const rx = new RegExp(day, "i");
    const todays = deals.filter(d => rx.test(d.expires || "") || rx.test(d.deal || ""));
    const isToday = dowET === (i + 1) % 7;
    const cards = todays.length ? `<div class="grid">${groupCards(todays)}</div>` : "";
    return `<section id="${day}"><h2 style="font-size:19px;margin:26px 2px 4px">${cap}${isToday ? ' <span class="pill todaypill" style="vertical-align:middle">TODAY</span>' : ""}</h2><p class="tag">${esc(DAY_NOTES[day] || "")}</p>${cards}</section>`;
  }).join("\n");
  const everyday = deals.filter(d => /ongoing|every day|daily/i.test(d.expires || "")).slice(0, 8);
  const everydayBlock = everyday.length ? `<h2 style="font-size:19px;margin:26px 2px 8px">Great any day of the week</h2><div class="grid">${groupCards(everyday)}</div>` : "";
  const ld = { "@context": "https://schema.org", "@type": "ItemList", "name": "Recurring food deals by weekday", "itemListElement": DAYS.map((d, i) => ({ "@type": "ListItem", "position": i + 1, "name": d[0].toUpperCase() + d.slice(1), "url": `${SITE}/food-deals-by-day#${d}` })) };
  return pageHead(title, desc, "food-deals-by-day", [ld], ".pill.todaypill{background:rgba(49,201,110,.16);color:var(--accent);font-size:11px}") + `
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>Food Deals by Day of the Week</h1>
  <p class="tag">Healthy chains rarely run day-of-week specials, but grocery prepared-food counters and a few regional chains do, and they repeat every week. This page is the calendar; each deal also appears in the daily list on its day. Jump to: ${DAYS.map(d => `<a href="#${d}" style="color:var(--accent2)">${d[0].toUpperCase() + d.slice(1)}</a>`).join(" &middot; ")}.</p>
  ${sections}
  ${everydayBlock}
  ${EMAIL_CAPTURE}
  ${EXPLAINER_NAV}
  <nav class="chains"><strong>Deals by restaurant:</strong> ${chainNav("")} &middot; <a href="/free-food-today">Free Food Today</a></nav>
  ${GUIDES_NAV}
` + PAGE_FOOT;
}


// ---------------------------------------------------------------------------
// MEAL INDEX page + homepage section (2026-09-18). See scripts/meals.mjs.
// ---------------------------------------------------------------------------

function mealsSectionInner(meals, updated) {
  const top = meals.slice(0, 8);
  return `
  <h2>Cheapest healthy meals, ranked by value</h2>
  <p class="msub">Real orders at real prices, ranked by grams of protein per dollar. No promo needed: these are the best-value healthy meals every day. <span id="mealscount">${meals.length} meals from ${new Set(meals.map(m => m.brand)).size} places</span></p>
  <div class="mealchips" id="mealsorts"></div>
  <div class="meallist" id="meallist">
${top.map((m, i) => mealRow(m, i + 1, { esc, brandDomain })).join("\n")}
  </div>
  <div class="mealsfoot"><button id="mealsmore" type="button">Show all ${meals.length} meals</button><span>Nutrition from each chain&#39;s official data. Prices are typical menu prices${updated ? `, checked ${esc(updated)},` : ""} and vary by location. <a href="/cheap-healthy-meals">How the ranking works</a></span></div>
`;
}

function mealsPage(meals, updated) {
  const title = "Cheapest Healthy Fast-Casual Meals, Ranked by Protein per Dollar (2026)";
  const desc = `${meals.length} real orders at ${new Set(meals.map(m => m.brand)).size} healthy chains and grocery counters, with price, calories and protein from official sources, ranked by grams of protein per dollar. Updated ${prettyDate}.`;
  const rows = list => list.map((m, i) => `<tr><td>${i + 1}</td><td><strong style="color:var(--ink)">${esc(m.meal)}</strong><br><span style="font-size:12px">${esc(m.brand)}${m.build ? ": " + esc(m.build) : ""}</span></td><td>~${money(m.price)}</td><td>${m.calories}</td><td>${m.protein}g</td><td>${m.sodium != null ? m.sodium + "mg" : "<span style=\"color:var(--muted)\">n/a</span>"}</td><td><strong style="color:var(--accent)">${m.protein_per_dollar.toFixed(1)}</strong>${m.meets_standard ? `<br><span style="font-size:11px;font-weight:700;color:var(--accent)" title="Under $10, 25 g protein or more, 690 mg sodium or less">Standard</span>` : ""}</td><td><a style="color:var(--accent2)" href="${esc(m.order_url)}" target="_blank" rel="noopener">Order</a> &middot; <a style="color:var(--muted)" href="${esc(m.nutrition_url)}" target="_blank" rel="noopener">nutrition</a></td></tr>`).join("\n");
  const table = (h, list) => list.length ? `<h2 style="font-size:19px;margin:26px 2px 8px">${h}</h2><div class="tblwrap"><table class="tbl"><tr><th>#</th><th>Meal</th><th>Price</th><th>Cal</th><th>Protein</th><th>Sodium</th><th>g / $1</th><th>Links</th></tr>\n${rows(list)}\n</table></div>` : "";
  const ld = { "@context": "https://schema.org", "@type": "ItemList", "name": "Cheapest healthy meals ranked by protein per dollar", "numberOfItems": meals.length,
    "itemListElement": meals.slice(0, 25).map((m, i) => ({ "@type": "ListItem", "position": i + 1, "name": `${m.brand}: ${m.meal} (~${money(m.price)}, ${m.calories} cal, ${m.protein}g protein)` })) };
  return pageHead(title, desc, "cheap-healthy-meals", [ld], ".tblwrap{overflow-x:auto;margin-top:6px}.tbl{width:100%;border-collapse:collapse;font-size:13px;line-height:1.45;font-variant-numeric:tabular-nums}.tbl th,.tbl td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}.tbl th{background:var(--card2);color:var(--ink)}.tbl td{color:var(--muted)}") + `
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>Cheapest Healthy Meals, Ranked by Protein per Dollar</h1>
  <p class="answer">Healthy chains rarely run promotions, so the best value is usually a smart order at the regular price. This index lists specific orders, what they cost, and what you get for the money, ranked by <strong>grams of protein per dollar</strong>.</p>
  <div class="facts"><b>Nutrition</b><span>From each chain&#39;s official nutrition page, calculator or PDF (linked on every row). For build-your-own bowls it is the sum of the official per-ingredient numbers.</span><b>Prices</b><span>Typical menu prices${updated ? ` checked ${esc(updated)}` : ""}. Restaurant prices vary by location, so treat them as close, not exact; grocery prices (Trader Joe&#39;s) are national.</span><b>Ranking</b><span>Protein grams divided by price. It rewards filling, high-protein meals and ignores marketing.</span><b>What is excluded</b><span>Desserts, sugary drinks, fried headline items, and anything whose numbers could not be verified from a real source.</span></div>
  ${table("Meets the DailyBite standard: under $10, 25 g protein or more, 690 mg sodium or less", meals.filter(m => m.meets_standard))}
  <p class="tag" style="margin:6px 2px 0">The 690 mg line is the FDA's 2024 sodium limit for a main dish to be labeled healthy. Sodium comes from each chain's own nutrition data, checked October 4, 2026. Most cheap, high-protein restaurant items fail on sodium alone: a typical sandwich or chili runs 750 to 1,300 mg.</p>
  ${table("All meals, best value first", meals)}
  ${table("Full meals at or under 600 calories", meals.filter(m => m.calories <= 600))}
  ${table("30 grams of protein or more", meals.filter(m => m.protein >= 30))}
  ${table("Vegetarian", meals.filter(m => m.vegetarian))}
  <div class="note">Order direct for pickup when you can: delivery apps typically add 15 to 30 percent menu markup plus fees on top of these prices. See <a href="/delivery-vs-pickup" style="color:var(--accent2)">the delivery math</a>, and <a href="/" style="color:var(--accent2)">today&#39;s verified deals</a> for anything that makes these meals cheaper still.</div>
  ${EMAIL_CAPTURE}
  ${EXPLAINER_NAV}
  ${GUIDES_NAV}
` + PAGE_FOOT;
}


function main() {
  const data = JSON.parse(readFileSync(join(root, "deals.json"), "utf8"));
  // Meal index (scripts/meals.mjs). Fewer than 5 valid meals = the section stays off.
  const MEALS = loadMeals(process.env.MEALS_DATA || join(root, "meals-data.json"));
  for (const x of MEALS.dropped) console.log("Meal dropped: " + x);
  const mealsOn = MEALS.meals.length >= 5;
  // EVERGREEN FLOOR (owner-verified deals; each self-expires on its date).
  // Injected only when the daily AI refresh did not supply a deal for that brand.
  // Injected deals live in scripts/injected-deals.mjs (shared with the refresh, 2026-09-30).
  const EVERGREEN = INJECTED_DEALS;
  const stripEmoji = (s) => typeof s === "string" ? s.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2300}-\u{23FF}\u{FE0F}]/gu, "").replace(/\s{2,}/g, " ").trim() : s;
  for (const d of (Array.isArray(data) ? data : data.deals) || []) for (const k of ["brand","deal","title","desc","expires","badge","cat","category","region"]) if (d[k]) d[k] = stripEmoji(d[k]);
  let deals = Array.isArray(data) ? data : data.deals;
  if (!Array.isArray(deals)) {
    throw new Error("deals.json has no deals array: refusing to build an empty page.");
  }
  {
    for (const e of EVERGREEN) {
      if (e.dow !== undefined && e.dow !== dowET) continue;
      if (e.from && iso < e.from) continue;   // dated promo that has not started yet
      if (iso > e.until) continue;            // self-expires
      const sameBrand = deals.some((d) => canonBrand(d.brand) === canonBrand(e.deal.brand));
      // Never inject a deal the refresh already found (compare brand + title, not brand alone).
      if (deals.some((d) => canonBrand(d.brand) === canonBrand(e.deal.brand) && String(d.deal || "").trim().toLowerCase() === e.deal.deal.trim().toLowerCase())) continue;
      // Default stays one evergreen per brand; "alongside" lets a dated promo run next to
      // that brand’s standing value-menu entry (2026-09-11).
      if (sameBrand && !e.alongside) continue;
      deals.push({ ...e.deal });
    }
  }
  // The refresh may now legitimately return zero NEW deals (2026-10-02); only a page that is
  // empty even after injection is refused.
  if (deals.length === 0) throw new Error("No deals after injection: refusing to build an empty page.");

  // Owner style rule (Jacob, 2026-08-18): no em dashes anywhere on the site.
  // Paired dashes become parentheses; a single dash becomes a colon.
  // Runs after evergreen injection so every deal from every source is covered.
  const deDash = (s) => {
    if (typeof s !== "string" || !/—|&mdash;|&#8212;|&#x2014;/i.test(s)) return s;
    let t = s.replace(/&mdash;|&#8212;|&#x2014;/gi, "—");
    for (;;) {
      const m = t.match(/ — ([^—]*?) — /);
      if (m && !/[.!?<>:]/.test(m[1])) { t = t.replace(m[0], " (" + m[1] + ") "); continue; }
      break;
    }
    return t.replace(/ — /g, ": ").replace(/\s*—\s*/g, ", ");
  };
  for (const d of deals) for (const k of ["brand", "deal", "title", "desc", "expires", "badge", "cat", "category", "region"]) if (d[k]) d[k] = deDash(d[k]);

  // DEDUPE (2026-08-20): the same offer must never be listed twice anywhere on the
  // site. Two deals are the same offer when they share a brand and a title (after
  // normalizing case, punctuation, and brand aliases), or a brand and a promo code
  // (the AI refresh sometimes describes one code-based deal under two titles).
  // First occurrence wins; Top Picks are recomputed below so nothing is lost.
  {
    const beforeDedupe = deals.length;
    const seen = new Set();
    deals = deals.filter(d => {
      const brand = canonBrand(d.brand);
      const keys = [brand + "|" + norm(d.deal)];
      // Same brand + same dollar amounts in the TITLE = the same offer worded twice
      // (paraphrase duplicates from the refresh's two-sweep merge, 2026-08-27).
      const prices = (String(d.deal || "").match(/\$\s?\d+(?:\.\d{2})?/g) || []).map(p => p.replace(/[^0-9.]/g, "")).sort().join(",");
      if (prices) keys.push(brand + "|$" + prices);
      const code = ((d.deal || "") + " " + (d.desc || "")).match(/\bcode[:\s]+(?!NEEDED\b|REQUIRED\b|NECESSARY\b|ONLY\b)([A-Z0-9]{3,14})\b/);
      if (code) keys.push(brand + "|code:" + code[1].toUpperCase());
      if (keys.some(k => seen.has(k))) return false;
      for (const k of keys) seen.add(k);
      return true;
    });
    // Second pass: same-brand titles sharing most of their words are the same offer
    // even when the stated price conflicts (Throwback Thursdaze $8.99 vs $7.99,
    // 2026-08-27). First listing wins.
    const words = t => new Set(String(t || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length >= 3 && !/^\d+$/.test(w)));
    const kept = [];
    for (const d of deals) {
      const w = words(d.deal), b = canonBrand(d.brand);
      let dupIdx = -1, moreSpecific = false;
      for (let i = 0; i < kept.length && dupIdx === -1; i++) {
        const k = kept[i];
        if (canonBrand(k.brand) !== b) continue;
        const kw = words(k.deal);
        let inter = 0; for (const x of w) if (kw.has(x)) inter++;
        const union = new Set([...w, ...kw]).size;
        const smaller = Math.min(w.size, kw.size);
        // Jaccard catches paraphrases. Containment (2026-09-15) catches a short title that
        // is a subset of a longer one for the same brand: "$7+ Meal Menu" vs "$7+ Meal Menu,
        // Including New Fish & Chips for $7.99" scored 0.29 and shipped as two offers.
        if (union > 0 && (inter / union >= 0.6 || (smaller >= 2 && inter === smaller))) { dupIdx = i; moreSpecific = w.size > kw.size; }
      }
      if (dupIdx === -1) kept.push(d);
      else if (moreSpecific) kept[dupIdx] = d; // keep the more specific title of the pair
    }
    deals = kept;
    if (deals.length < beforeDedupe) console.log(`Removed ${beforeDedupe - deals.length} duplicate deal(s).`);
  }

  // Flag new-since-yesterday and expiring-soon deals (badges rendered client-side)
  let prev = [];
  try {
    const p = JSON.parse(readFileSync(join(root, "deals-prev.json"), "utf8"));
    prev = Array.isArray(p) ? p : (p.deals || []);
  } catch {}
  const prevKeys = new Set(prev.map(d => (d.brand + "|" + d.deal).toLowerCase()));
  const now = Date.now();
  for (const d of deals) {
    d.isNew = prevKeys.size > 0 && !prevKeys.has((d.brand + "|" + d.deal).toLowerCase());
    d.endingSoon = false;
    // (?!\d) stops "August 2026" from being read as "August 20" (Pokeworks, 2026-08-22).
    const m = String(d.expires || "").match(/[A-Z][a-z]+\.? \d{1,2}(?!\d)(, ?\d{4})?/);
    if (m) {
      let ds = m[0].replace(".", "");
      if (!/\d{4}/.test(ds)) ds += ", " + iso.slice(0, 4);
      const t = Date.parse(ds);
      if (!isNaN(t)) {
        const diff = (t - now) / 86400000;
        if (diff >= -0.5 && diff <= 2) d.endingSoon = true;
      }
    }
  }

  // Exclude deals whose end date has fully passed (holiday specials, LTOs).
  // Recurring deals never expire; unparseable dates are kept (the daily AI
  // refresh re-verifies currency) — this filter is the deterministic backstop.
  const beforeCount = deals.length;
  deals = deals.filter(d => {
    const ex = String(d.expires || "");
    if (/every|ongoing|daily|weekly|monthly/i.test(ex)) return true;
    let latest = null;
    for (const m of ex.matchAll(/[A-Z][a-z]+\.? \d{1,2}(?!\d)(, ?\d{4})?/g)) {
      let ds = m[0].replace(".", "");
      if (!/\d{4}/.test(ds)) ds += ", " + iso.slice(0, 4);
      const t = Date.parse(ds);
      if (!isNaN(t) && (latest == null || t > latest)) latest = t;
    }
    if (latest == null) return true;
    return (latest - now) / 86400000 >= -1; // drop only after the end date's full day has passed
  });
  if (deals.length < beforeCount) console.log(`Excluded ${beforeCount - deals.length} expired deal(s).`);

  // STANDING_MENU_BLOCK (owner, 2026-09-21: "remove the recurring Subway, Noodles and Company
  // and Panera Bread deals ... they literally show up every single day"). For these three
  // brands the permanent value menus are not deals: Panera Mix & Match / Value Duets,
  // Subway Sub of the Day / Meal of the Day / Fresh Value Menu, Noodles Delicious Duos.
  // Anything from them that is open-ended ("Ongoing", "every day") is dropped too. A real
  // limited-time promo or code with an end date still gets through. Runs before the
  // write-back, so the iOS feed (deals.json) follows the same rule.
  {
    const STANDING_BRANDS = new Set(["panera", "subway", "noodles & company", "noodles and company", "noodles & co", "noodles"]);
    const STANDING_TITLES = /mixs*(?:&|and|&amp;)s*match|value duets?|sub of the day|meal of the day|fresh value menu|value menu|delicious duos?/i;
    const OPEN_ENDED = /^s*$|ongoing|every ?day|daily|all day|no end date|while supplies|year[- ]round/i;
    const beforeStanding = deals.length;
    deals = deals.filter(d => {
      if (!STANDING_BRANDS.has(canonBrand(d.brand))) return true;
      if (STANDING_TITLES.test(String(d.deal || ""))) return false;
      return !OPEN_ENDED.test(String(d.expires || ""));
    });
    if (deals.length < beforeStanding) console.log(`Excluded ${beforeStanding - deals.length} standing-menu deal(s) (Panera/Subway/Noodles).`);
  }

  // Exclude deals locked behind PAID subscriptions/memberships (DashPass, Uber One, etc.).
  const beforeSub = deals.length;
  deals = deals.filter(d => !/dashpass|uber one|grubhub\+|paid member|subscription|subscriber|prime member|prime[- ]exclusive|amazon prime|with prime\b|costco|sam's club|bj's/i.test(d.deal + " " + d.desc + " " + (d.expires || "")));
  // Delivery-app backstop (2026-09-03): platform promos are welcome only when open to
  // everyone. First-order, new-customer, referral and welcome offers are signup
  // bonuses, not deals - dropped here regardless of what the prompt let through.
  deals = deals.filter(d => !/first[- ]order|new customers? only|for new customers|new users? only|first[- ]time (?:users?|customers?|orders?)|welcome offer|sign[- ]?up bonus|referral (?:code|bonus|credit)/i.test(d.deal + " " + d.desc + " " + (d.expires || "")));

  // Exclude rewards-member-gated deals — every deal must be claimable with no membership of any kind.
  // Golden-brand exception (Jacob, 2026-07-21): Chipotle + Chick-fil-A may run free-app-account deals.
  const APPROVED = new Set(["Sweetgreen","CAVA","Chipotle","Chick-fil-A","Panera","Panera Bread","Potbelly","Noodles & Company","Just Salad","Qdoba","Naf Naf Grill","Smoothie King","Tropical Smoothie","Tropical Smoothie Cafe","Jamba","El Pollo Loco","The Halal Guys","Naz's Halal Food","Naz's Halal","Nazs Halal","Shah's Halal Food","Shah's Halal","Shahs Halal","Kura Sushi","Sarku Japan","Marugame Udon","Yoshinoya","Rock N Roll Sushi","Sushi Maki","Pokeworks","Island Fin Poke","Subway","Starbucks","Tijuana Flats","Publix","DoorDash","Uber Eats","Grubhub","Pollo Tropical","Rubio's","Rubio's Coastal Grill","Rubios","Waba Grill","Pei Wei","Pei Wei Asian Kitchen","Teriyaki Madness","Honeygrow","Playa Bowls","Nekter Juice Bar","Nekter","Jason's Deli","Jasons Deli","McAlister's Deli","McAlisters Deli","Chicken Salad Chick","Taziki's","Taziki's Mediterranean Cafe","Tazikis","Chopt","Chopt Creative Salad","Chopt Creative Salad Co.","Saladworks","Salata","Salata Salad Kitchen","Crisp & Green","Crisp and Green","Bibibop","Bibibop Asian Grill","Cafe Zupas","Zupas","Clean Juice","Robeks","Luna Grill","Modern Market","Modern Market Eatery","Dig","Dig Inn","Bolay","Bolay Fresh Bold Kitchen","Fresh Kitchen","Little Greek Fresh Grill","Little Greek","The Great Greek Mediterranean Grill","Great Greek Mediterranean Grill","The Great Greek","Clean Eatz","Vitality Bowls","Everbowl","Rush Bowls","Pressed Juicery","Pressed","Flame Broiler","The Flame Broiler","Roti","Roti Modern Mediterranean","Garbanzo","Garbanzo Mediterranean Fresh","Pita Pit","Newk's Eatery","Newk's","Newks"].map(canonBrand)); // roster widened 2026-08-27 (healthy fast-casual), 2026-08-29 (salad/bowl expansion) and 2026-09-07 (healthy-only: Five Guys, Shake Shack, Wingstop, Chili's removed; bowl/Mediterranean/acai chains added)
  for (const g of GROCERY) APPROVED.add(g);
  deals = deals.filter(d => APPROVED.has(canonBrand(d.brand))); // owner: approved quality/healthy brands + grocery roster only

  // Deterministic REGIONAL HONESTY backstop (2026-08-29): the refresh prompt forbids
  // labeling these chains "National" and forbids marking them best, but the model can
  // and does slip - Naf Naf Grill shipped with NO region field and best:true today and
  // was shown to a Florida visitor (the chain has no Florida stores). Prompt rules are
  // requests; this map is the law. For each regional brand: a missing or "National"
  // region is replaced with the real footprint, and best is always stripped.
  const REGIONAL_DEFAULTS = Object.fromEntries(Object.entries({
    "Naf Naf Grill": "Midwest & East", "Just Salad": "Northeast & Select states", "El Pollo Loco": "West & Southwest",
    "The Halal Guys": "Select states", "Naz's Halal Food": "Select states", "Shah's Halal Food": "Select states", "Tijuana Flats": "FL & Southeast",
    "Kura Sushi": "Select states", "Marugame Udon": "CA, HI & WA", "Yoshinoya": "California only", "Pokeworks": "Select states",
    "Rock N Roll Sushi": "South & Southeast", "Sushi Maki": "South Florida",
    "Island Fin Poke": "FL & Select states", "Pollo Tropical": "Florida",
    "Weis Markets": "PA, MD, NY, NJ, DE, WV & VA", "Food Lion": "Mid-Atlantic & Southeast", "Lowes Foods": "NC & SC", "Hannaford": "ME, NH, VT, MA & NY", "Dierbergs": "St. Louis area",
    "Rubio's": "CA, AZ & NV", "Waba Grill": "CA & AZ",
    "Honeygrow": "Mid-Atlantic & Northeast", "Playa Bowls": "East Coast",
    "Jason's Deli": "South & Central", "McAlister's Deli": "South & Central",
    "Chicken Salad Chick": "South", "Taziki's": "South",
    "Chopt": "East Coast", "Saladworks": "Northeast & Mid-Atlantic",
    "Salata": "Texas & South", "Crisp & Green": "Midwest & Select states",
    "Bibibop": "Midwest & Select states", "Cafe Zupas": "Mountain West & Midwest",
    "Clean Juice": "South & East", "Robeks": "Select states",
    "Luna Grill": "SoCal & Texas", "Modern Market Eatery": "CO & TX",
    "Dig": "Northeast",
    "Bolay": "Florida", "Fresh Kitchen": "Florida",
    "Little Greek Fresh Grill": "FL & Southeast", "The Great Greek Mediterranean Grill": "Select states",
    "Clean Eatz": "Southeast & Midwest", "Vitality Bowls": "Select states",
    "Everbowl": "Select states", "Rush Bowls": "Select states",
    "Pressed Juicery": "Select states", "Flame Broiler": "CA & Southwest",
    "Roti": "Chicago & DC", "Garbanzo": "Select states",
    "Pita Pit": "Select states", "Newk's Eatery": "South",
  }).map(([b, r]) => [canonBrand(b), r]));
  for (const d of deals) {
    const footprint = REGIONAL_DEFAULTS[canonBrand(d.brand)];
    if (!footprint) continue;
    if (!d.region || /national/i.test(d.region)) {
      console.log(`Regional backstop: ${d.brand} region "${d.region || "(missing)"}" -> "${footprint}"`);
      d.region = footprint;
    }
    if (d.best) { console.log(`Regional backstop: stripped best from ${d.brand}`); d.best = false; }
  }
  deals = deals.filter(d => !/boneless/i.test((d.deal||"") + " " + (d.desc||""))); // owner: no boneless items ever
  // Owner: no dessert deals at all. A cookie or brownie offered as one SIDE OPTION of a meal combo
  // ("chips or a cookie", Subway Sub of the Day, 2026-08-22) is not a dessert deal and is blanked first.
  const SIDE_OPTION = /\b(?:or|and|plus|with|choice of)\s+(?:a\s+|an\s+)?(?:cookies?|brownies?)\b|\b(?:cookies?|brownies?)\s+or\s+(?:chips|fries|a side|apple)/gi;
  deals = deals.filter(d => !(new RegExp("custard|doughnut|donut|cookie|froyo|frozen yogurt|ice cream|milkshake|dessert|cinnamon roll|brownie", "i")).test(((d.deal||"") + " " + (d.desc||"")).replace(SIDE_OPTION, " ")) || (d.cat||"") === "Pickup");
  // Owner rule (Jacob, 2026-08-18): food, smoothies, and NON-alcoholic drinks only — no alcohol deals ever.
  // Phrases that mention alcohol only to say an item is NOT alcoholic are blanked out
  // before the check, so "bottomless non-alcoholic drink" (Chili's 3 For Me, wrongly
  // dropped 2026-08-20), "alcohol-free", "mocktail", "root/ginger beer" and the idiom
  // "for the sake of" never trip the filter. Word boundaries spare "drum", "school spirit".
  const NON_ALCOHOLIC = /\b(?:non|zero|no)[- ]?alcohol(?:ic)?\b|\balcohol[- ]free\b|\bmocktails?\b|\b(?:root|ginger|birch) beer\b|\bfor the sake of\b/gi;
  const ALCOHOL = /\b(?:beer|margaritas?|margs?|cocktails?|sangria|mimosas?|tequila|vodka|whisk(?:e)?y|bourbon|rum|hard seltzer|wines?|prosecco|champagne|spirits|alcohol(?:ic)?|booze|liquor|cerveza|sake)\b/i;
  const beforeAlc = deals.length;
  deals = deals.filter(d => !ALCOHOL.test(((d.deal||"") + " " + (d.desc||"") + " " + (d.cat||"")).replace(NON_ALCOHOLIC, " ")));
  if (deals.length < beforeAlc) console.log(`Excluded ${beforeAlc - deals.length} alcoholic-drink deal(s) (owner rule: no alcohol).`);
  deals = deals.filter(d => !["mcdonalds", "burgerking"].includes(canonBrand(d.brand))); // owner: quality focus - McDonald's and Burger King never listed
  // Grocery stores may require their FREE loyalty card or app (Kroger Plus, VIC, for U): practically
  // every shopper has one, so those deals stay; the paid-membership filter above still applies.
  // Owner decision 2026-08-30: FREE rewards accounts are acceptable from EVERY approved
  // brand (anyone can join free in a minute), so member-phrasing no longer excludes a
  // deal. Referral bonuses and badge/challenge mechanics are still not deals, and the
  // paid-membership filter above still bans anything with a price tag to enter.
  deals = deals.filter(d => !/refer a friend|unlock badges|referral bonus/i.test(d.deal + " " + d.desc + " " + (d.expires || "")));

  // CONCRETE SAVINGS backstop (prompt rule "NOT A DEAL"): a listing must state a price, a percent
  // off, a freebie, a BOGO, a code, or an N-for-$ bundle. Menu launches "at regular pricing"
  // (Kura Sushi x Persona, 2026-08-22) are not deals and must not occupy a card.
  const SAVINGS = /\$\s?\d|\d+\s?%|\bfree\b|\bbogo\b|buy one|\bcode\b|half[- ]price|\b\d+ for \$|\btwo for\b|\b2 for\b|\d+\s?(?:cents?|¢)\b/i;
  const beforeSavings = deals.length;
  deals = deals.filter(d => SAVINGS.test((d.deal || "") + " " + (d.desc || "")));
  if (deals.length < beforeSavings) console.log(`Excluded ${beforeSavings - deals.length} listing(s) with no concrete saving (menu launch / regular price).`);

  // NO MYSTERY REWARDS backstop (owner rule, 2026-08-24): collectible prizes, capsule toys,
  // and surprise/mystery rewards are not savings no matter how the model frames them. The
  // Kura x Persona "Free Bikkura-Pon Prizes" collab (regular-price rolls plus a trinket
  // after 15 plates) passed the SAVINGS regex on the word "free" and became a Top Pick.
  const PRIZE = /\b(mystery|surprise|prizes?|collectibles?|capsule|figurines?|keychains?|plush(?:ie)?s?|merch(?:andise)?|sweepstakes?|giveaway|raffle|spin[- ]?to[- ]?win|scratch[- ]?off)\b/i;
  const beforePrize = deals.length;
  deals = deals.filter(d => !PRIZE.test((d.deal || "") + " " + (d.desc || "")));
  if (deals.length < beforePrize) console.log(`Excluded ${beforePrize - deals.length} mystery-reward/prize listing(s) (owner rule: state the dollars or it isn't a deal).`);

  // Exclude recurring day-of-week / time-window deals ("Every Friday", "Whopper Wednesdays", happy hours).
  // Owner exceptions: Tijuana Flats' published day specials (2026-08-14) and grocery-store day deals such
  // as Publix/Sprouts/Kroger Sushi Wednesday or Safeway $5 Friday (2026-08-20) may run ON their active day only.
  // Golden brands added 2026-08-30: Chipotle's published "SUNDAYS" promo (free entree
  // with two, Sundays through Sept 6) is exactly the day-special the exception exists
  // for - listed ON its day, auto-dropped the rest of the week.
  const DAY_SPECIAL_BRANDS = new Set(["tijuana flats", "chipotle", "chick-fil-a", "island fin poke", ...GROCERY]); // island fin: Topping Tuesday (2026-09-22)
  const DOW_NAME = WEEKDAYS[dowET].toLowerCase();
  // Promo CODES are often named after days ("code SUNDAYS", Chipotle 2026-08-30) without
  // making the deal recurring - a one-day offer whose code is a day word was wrongly
  // dropped, hiding the day's best deal. Blank code tokens before the recurring test.
  const CODE_TOKEN = /\b(?:with |use |promo )?code[:\s]+[A-Z0-9]{3,14}\b|\([A-Z0-9]{3,14} code\)/gi;
  deals = deals.filter(d => {
    const txt = (d.deal + " " + d.desc + " " + (d.expires || "")).replace(CODE_TOKEN, " ").toLowerCase();
    // Day-of-week / time-window patterns scan everything; "happy hour" only the
    // title+expiry — a desc merely COMPARING to happy hours (e.g. "beats most
    // happy hours", Chili's margarita 2026-08-18) must not kill an all-day deal.
    const recurring = /every (?:mon|tues|wednes|thurs|fri|satur|sun)day|\b(?:mon|tues|wednes|thurs|fri|satur|sun)days\b|every day \d|daily \d/i.test(txt)
      || /happy hour/i.test(d.deal + " " + (d.expires || ""));
    // Owner (2026-09-30): any approved healthy chain's published weekly special may run ON
    // its day (Smoothie King Free Upsize Friday and the like), the same treatment the grocery
    // sushi days already get. The roster filter above keeps banned brands out; happy hours
    // and time windows stay excluded whatever the day.
    const happyHour = /happy hour/i.test(d.deal + " " + (d.expires || ""));
    if (recurring && !happyHour && txt.includes(DOW_NAME)) return true;
    if (recurring && DAY_SPECIAL_BRANDS.has(canonBrand(d.brand)) && txt.includes(DOW_NAME)) return true;
    return !recurring;
  });

  // A deal whose TITLE names a weekday is only valid on that weekday: a failed refresh
  // must not leave "Tuna Tuesday Sub of the Day" on the site on a Wednesday (2026-08-25).
  {
    const DAY_STEMS = ["sun", "mon", "tues", "wednes", "thurs", "fri", "satur"];
    const beforeDay = deals.length;
    deals = deals.filter(d => {
      const t = (d.deal || "").replace(CODE_TOKEN, " ").toLowerCase(); // day-named promo CODES don't date a deal
      const named = DAY_STEMS.map((s, i) => ({ s, i })).filter(x => new RegExp(`\\b${x.s}(?:days?|daze)\\b`).test(t));
      return !named.length || named.some(x => x.i === dowET);
    });
    if (deals.length < beforeDay) console.log(`Excluded ${beforeDay - deals.length} wrong-weekday deal(s) (title names a day that is not today).`);
  }

  // Top Picks: recomputed here every build — healthy-first, banned brands never.
  // Jacob's policy: Top Picks must showcase genuinely healthy deals.
  const BEST_BANNED = new Set(["mcdonald's","mcdonalds","kfc","dairy queen","taco bell","domino's","dominos"]);
  const GOLD = new Set(["chipotle", "chick-fil-a"]); // golden-standard brands: always Top Picks when they have a valid deal
  // Sushi/poke chains (owner request, 2026-08-18: sushi is the owner's favorite food) count as
  // healthy here too, so a strong sushi deal can be a Top Pick as the refresh prompt promises.
  const HEALTHY = new Set(["sweetgreen","potbelly","noodles & company","cava","just salad","qdoba","panera","panera bread","chipotle","naf naf grill","smoothie king","tropical smoothie","tropical smoothie cafe","jamba","salad and go","el pollo loco","the halal guys","naz's halal food","shah's halal food","chick-fil-a","kura sushi","sarku japan","rock n roll sushi","sushi maki","pokeworks","island fin poke","pollo tropical","rubio's","rubio's coastal grill","waba grill","pei wei","pei wei asian kitchen","teriyaki madness","honeygrow","playa bowls","nekter juice bar","jason's deli","mcalister's deli","chicken salad chick","taziki's","taziki's mediterranean cafe","chopt","saladworks","salata","crisp & green","bibibop","cafe zupas","clean juice","robeks","luna grill","modern market eatery","dig","bolay","fresh kitchen","little greek fresh grill","great greek mediterranean grill","clean eatz","vitality bowls","everbowl","rush bowls","pressed juicery","flame broiler","roti","garbanzo","pita pit","newk's eatery"]);
  {
    for (const d of deals) d.best = false;
    const byBrand = new Set();
    // Regional-footprint chains never badge (most visitors cannot claim them); the three
    // regional sushi/poke chains from the prompt's REGIONAL HONESTY rule are listed too.
    const REGIONAL_ONLY = new Set(["Whataburger","Del Taco","El Pollo Loco","Marugame Udon","Yoshinoya","Jack in the Box","In-N-Out","The Halal Guys","Naz's Halal Food","Shah's Halal Food","TCBY","Tijuana Flats","Rock N Roll Sushi","Sushi Maki","Island Fin Poke","Pollo Tropical","Rubio's","Rubio's Coastal Grill","Waba Grill","Honeygrow","Chicken Salad Chick","Taziki's","Taziki's Mediterranean Cafe","Bolay","Fresh Kitchen","Little Greek Fresh Grill","The Great Greek Mediterranean Grill","Clean Eatz","Vitality Bowls","Everbowl","Rush Bowls","Pressed Juicery","Flame Broiler","Roti","Garbanzo","Pita Pit","Newk's Eatery"].map(canonBrand));
    for (const g of GROCERY) if (!NATIONAL_GROCERY.has(g)) REGIONAL_ONLY.add(g);
    const isTreatDeal = (d) => (d.cat || "") === "Treats" || /custard|doughnut|donut|cookie|froyo|frozen yogurt|ice cream|milkshake|dessert|cinnamon roll|brownie/i.test((d.deal || "") + " " + (d.desc || ""));
    // A Top Pick's TITLE must state the money (owner rule, 2026-08-24): a price, a percent,
    // a BOGO, or a named free item. Vague titles cannot be the face of the site.
    const TITLE_DOLLARS = /\$\s?\d|\d+\s?%|\bfree\b|\bbogo\b|half[- ]price|\b\d+ for \$|\d+\s?(?:cents?|¢)\b/i;
    const pick = (list, max) => {
      for (const d of list) {
        if (byBrand.size >= max) break;
        const b = canonBrand(d.brand);
        if (byBrand.has(b) || BEST_BANNED.has(b)) continue;
        if (REGIONAL_ONLY.has(b)) continue; // regional-footprint chains never badge - most visitors cannot claim them
        if (isTreatDeal(d)) continue; // owner rule: Top Picks are filling meals, never desserts
        if (!TITLE_DOLLARS.test(d.deal || "")) continue; // owner rule: Top Pick titles state the dollars
        d.best = true; byBrand.add(b);
      }
    };
    const byVal = (a, b) => (b.value || 0) - (a.value || 0);
    const gold = deals.filter(d => GOLD.has(canonBrand(d.brand)) && (d.value || 0) >= 4).sort(byVal);
    pick(gold, 2);
    const goldCount = byBrand.size;
    const isHealthy = d => HEALTHY.has(canonBrand(d.brand)) || (GROCERY.has(canonBrand(d.brand)) && /sushi|poke|salad|bowl/i.test((d.cat || "") + " " + (d.deal || "")));
    const healthy = deals.filter(d => isHealthy(d) && (d.value || 0) >= 4).sort(byVal);
    pick(healthy, goldCount >= 2 ? 4 : 3);
    if (byBrand.size < 2) {
      const rest = deals.filter(d => !HEALTHY.has(canonBrand(d.brand))).sort((a, b) => (b.value || 0) - (a.value || 0));
      pick(rest, 3);
    }
  }
  if (deals.length < beforeSub) console.log(`Excluded ${beforeSub - deals.length} subscription-locked deal(s).`);

  // 1. Homepage injection
  // FEED WRITE-BACK (2026-09-08). Until today deals.json was only what the refresh wrote:
  // evergreen deals (Publix Sushi Wednesday, Sub of the Week, Tijuana Flats Tuesdaze...) and
  // the build's own filters (banned brands, expiry, first-order backstop) reached the site
  // but never the iOS app. The final, filtered, evergreen-merged list is now written back
  // with a stable per-deal id, so the app and the site show the same deals. Additive:
  // every existing field and the updated/updatedAt stamps are preserved.
  // "Get deal" goes straight to the deal (owner request, 2026-09-15): a bare homepage
  // url is swapped for the chain's known offers / value-menu page (scripts/deal-pages.mjs).
  // A specific page the refresh found for the offer is never touched.
  let upgraded = 0;
  for (const d of deals) { const u = bestDealUrl(d.brand, d.url); if (u !== d.url) { d.url = u; upgraded++; } }
  if (upgraded) console.log(`Upgraded ${upgraded} homepage link(s) to the chain's deal page.`);
  const assigned = assignDealIds(deals);
  for (const d of deals) applyAffiliate(d); // platform links become tracking links once a template exists (affiliates.json)
  const feedOut = { ...data, deals };
  delete feedOut.everyday; // field from the removed 2026-10-03 homepage section; keep the feed as it was
  writeFileSync(join(root, "deals.json"), JSON.stringify(feedOut, null, 2) + "\n");
  console.log(`Wrote deals.json: ${deals.length} deals, ${assigned} id(s) assigned (rest already had one).`);

  const htmlPath = join(root, "index.html");
  const html = readFileSync(htmlPath, "utf8");
  const START = "/* DEALS:START */", END = "/* DEALS:END */";
  const s = html.indexOf(START), e = html.indexOf(END);
  if (s === -1 || e === -1 || e < s) throw new Error("DEALS markers missing in index.html");
  writeFileSync(htmlPath, html.slice(0, s) + `${START}\nconst DEALS = ${JSON.stringify(deals, null, 2)};\nconst META = ${JSON.stringify({ verifiedAt: new Date().toISOString() })};\nconst AFFILIATES = ${JSON.stringify({ instacart: INSTACART_URL, grocery: [...GROCERY], active: AFF_ACTIVE })};\n${END}` + html.slice(e + END.length));
  console.log(`Built index.html with ${deals.length} deals.`);
  // Option B (owner, 2026-10-04): one line under the deal list pointing at the meals that meet
  // the DailyBite standard. The homepage itself does not list them.
  {
    const h = readFileSync(htmlPath, "utf8");
    const SS = "<!-- STANDARD:START -->", SE = "<!-- STANDARD:END -->";
    const a = h.indexOf(SS), z = h.indexOf(SE);
    if (a !== -1 && z !== -1 && z > a) {
      const n = mealsOn ? MEALS.meals.filter(m => m.meets_standard).length : 0;
      const line = n ? `<p class="stdline">No deal today where you are? <a href="/cheap-healthy-meals">${n} meals under $10 with 25 g protein and under 690 mg sodium</a>, verified against the chains' own nutrition data.</p>` : "";
      writeFileSync(htmlPath, h.slice(0, a + SS.length) + line + h.slice(z));
    }
  }

  // 1b. Server-render the footer date and a crawlable static deal grid
  {
    let out = readFileSync(htmlPath, "utf8");
    out = out.replace(/(<span id="updated">)[^<]*(<\/span>)/, `$1${prettyDate}$2`);
    // Refresh the homepage's structured-data dateModified daily (growth plan Fix 2).
    out = out.replace(/(<script type="application\/ld\+json" id="freshld">[^<]*"dateModified":")[^"]*(")/, `$1${iso}$2`);
    const GS = "<!-- SSRGRID:START -->", GE = "<!-- SSRGRID:END -->";
    const gs = out.indexOf(GS), ge = out.indexOf(GE);
    if (gs !== -1 && ge !== -1 && ge > gs) {
      out = out.slice(0, gs + GS.length) + "\n" + groupCards(deals) + "\n" + out.slice(ge);
    }
    // Meal index: server-render the top rows (crawlable) and embed the full list for the client.
    {
      // Homepage Meals section removed 2026-09-28 (owner: keep the site simple). The markers
      // are gone from index.html, so these injections are no-ops; meals.json and
      // /cheap-healthy-meals are still built because the iOS app's Meals tab reads meals.json.
      const MS = "<!-- MEALS:START -->", ME = "<!-- MEALS:END -->";
      const a = out.indexOf(MS), z = out.indexOf(ME);
      if (a !== -1 && z !== -1) out = out.slice(0, a + MS.length) + (mealsOn ? mealsSectionInner(MEALS.meals, MEALS.updated) : "") + out.slice(z);
      const J1 = "/* MEALS:START */", J2 = "/* MEALS:END */";
      const b1 = out.indexOf(J1), b2 = out.indexOf(J2);
      if (b1 !== -1 && b2 !== -1) out = out.slice(0, b1 + J1.length) + "\nconst MEALS = " + JSON.stringify(mealsOn ? MEALS.meals : []) + ";\n" + out.slice(b2);
      out = out.replace(/<section class="meals" id="mealswrap"[^>]*>/, mealsOn ? '<section class="meals" id="mealswrap" hidden>' : '<section class="meals" id="mealswrap" hidden style="display:none">');
    }
    // Affiliate disclosure (FTC): filled only while a template is configured.
    const AS = "<!-- AFF:START -->", AE = "<!-- AFF:END -->";
    const as = out.indexOf(AS), ae = out.indexOf(AE);
    if (as !== -1 && ae !== -1) out = out.slice(0, as + AS.length) + (AFF_ACTIVE ? " Some links pay DailyBite a commission at no cost to you; it never affects which deals are listed. See <a href=\"/privacy\">Disclosures</a>." : "") + out.slice(ae);
    try {
      const pp = join(root, "privacy.html");
      let pv = readFileSync(pp, "utf8");
      const DS = "<!-- AFFDISC:START -->", DE = "<!-- AFFDISC:END -->";
      const ds = pv.indexOf(DS), de = pv.indexOf(DE);
      if (ds !== -1 && de !== -1) {
        const active = "<p>DailyBite takes part in affiliate programs run by delivery and grocery platforms (currently: " + [AFF.doordash && "DoorDash", AFF.ubereats && "Uber Eats", AFF.grubhub && "Grubhub", AFF.instacart && "Instacart"].filter(Boolean).join(", ") + "). When you tap a link to one of those platforms and place an order, DailyBite may earn a commission at no extra cost to you. Commissions never influence which deals are listed or how they are ranked: every deal still has to pass the same morning verification, and restaurant and grocery deal links keep pointing at the official source. Links that can earn a commission are marked sponsored in the page code.</p>";
        const inactive = "<p>DailyBite currently participates in no affiliate programs and earns no commissions: deal links point directly to official brand websites. If the site ever joins an affiliate program, this section will be updated before any such links appear.</p>";
        pv = pv.slice(0, ds + DS.length) + (AFF_ACTIVE ? active : inactive) + pv.slice(de);
        writeFileSync(pp, pv);
      }
    } catch (e) { console.log("privacy disclosure not updated: " + e.message); }
    // Holiday banner: shown ONLY on the day itself (owner, 2026-10-04: no countdown banners;
    // the holiday pages still publish ahead, the homepage banner does not).
    const HB_START = "<!-- HOLIDAY:START -->", HB_END = "<!-- HOLIDAY:END -->";
    const hs2 = out.indexOf(HB_START), he2 = out.indexOf(HB_END);
    if (hs2 !== -1 && he2 !== -1) {
      const soon = HOLIDAYS.map(h => ({ h, diff: (new Date(h.date + "T12:00:00") - now) / 86400000 }))
        .filter(x => x.diff < 0.5 && x.diff >= -0.5).sort((a, b) => a.diff - b.diff)[0];
      let banner = "";
      if (soon) {
        const d2 = new Date(soon.h.date + "T12:00:00");
        const when = soon.diff < 0.5 ? "TODAY" : soon.diff < 1.5 ? "tomorrow" : d2.toLocaleDateString("en-US", { weekday: "long" });
        banner = `<a class="holiday-banner" href="/${soon.h.slug}">${soon.h.emoji} ${esc(soon.h.name)} is ${when}: see all the deals &rarr;</a>`;
      }
      out = out.slice(0, hs2 + HB_START.length) + banner + out.slice(he2);
    }
    writeFileSync(htmlPath, out);
    console.log("Server-rendered homepage grid and footer date.");
  }

  // 2. Chain pages
  for (const chain of CHAINS) {
    writeFileSync(join(root, `${chain.slug}.html`), chainPage(chain, deals));
  }
  console.log(`Built ${CHAINS.length} chain pages.`);

  // 2b. Day-of-week pages
  for (const day of DAYS) {
    writeFileSync(join(root, `${day}-food-deals.html`), dayPage(day, deals));
  }
  console.log(`Built ${DAYS.length} day pages.`);

  // 2b-2. Food-holiday pages (within publish window)
  const activeHolidays = HOLIDAYS.filter(h => {
    const diff = (new Date(h.date + "T12:00:00") - now) / 86400000;
    return diff <= 21 && diff >= -2;
  });
  for (const h of activeHolidays) {
    writeFileSync(join(root, `${h.slug}.html`), holidayPage(h, deals));
  }
  console.log(`Built ${activeHolidays.length} holiday pages.`);

  // 2c. Free-food hub + sushi hub + RSS feed
  writeFileSync(join(root, "free-food-today.html"), freeFoodPage(deals));
  writeFileSync(join(root, "sushi-deals.html"), sushiPage(deals));
  for (const x of EXPLAINERS) writeFileSync(join(root, `${x.slug}.html`), explainerPage(x, deals));
  const REPORT = loadReport();
  if (REPORT) { writeFileSync(join(root, `${REPORT_SLUG}.html`), reportPage(REPORT)); console.log(`Built ${REPORT_SLUG}.html (${REPORT.days} days, ${REPORT.listings} listings).`); }
  writeFileSync(join(root, "food-deals-by-day.html"), byDayPage(deals));
  if (mealsOn) {
    writeFileSync(join(root, "meals.json"), JSON.stringify({ updated: MEALS.updated, note: "Nutrition is from official chain sources; prices are typical and vary by location. protein_per_dollar = protein / price.", meals: MEALS.meals }, null, 2) + "\n");
    writeFileSync(join(root, "cheap-healthy-meals.html"), mealsPage(MEALS.meals, MEALS.updated));
    console.log("Built meal index: " + MEALS.meals.length + " meals from " + new Set(MEALS.meals.map(m => m.brand)).size + " places.");
  }
  console.log(`Built ${EXPLAINERS.length} explainer pages and food-deals-by-day.html.`);
  writeFileSync(join(root, "feed.xml"), rssFeed(deals));
  console.log("Built free-food-today.html, sushi-deals.html and feed.xml.");

  // 2d. Public verification log: append today's check, keep 90 days, publish the page.
  let vlog = [];
  try { vlog = JSON.parse(readFileSync(join(root, "verify-log.json"), "utf8")).entries || []; } catch {}
  const checkedAt = data.updatedAt
    ? new Date(data.updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", ...ET }) + " ET"
    : "morning check";
  vlog = [{ d: iso, t: checkedAt, n: deals.length }, ...vlog.filter(e => e && e.d !== iso)].slice(0, 90);
  writeFileSync(join(root, "verify-log.json"), JSON.stringify({ entries: vlog }, null, 2) + "\n");
  writeFileSync(join(root, "verification-log.html"), verificationLogPage(vlog));
  console.log(`Built verification-log.html (${vlog.length} entries).`);

  // 3. Sitemap
  const urls = [`${SITE}/`, `${SITE}/sushi-deals`, `${SITE}/trader-joes-healthy-meals`, `${SITE}/verification-log`, `${SITE}/about`, `${SITE}/privacy`, `${SITE}/birthday-freebies`, `${SITE}/best-fast-food-apps`, `${SITE}/5-dollar-meal-deals`, `${SITE}/student-food-deals`, `${SITE}/late-night-food-deals`, `${SITE}/fast-food-happy-hours`, `${SITE}/cheapest-fast-food-orders`, `${SITE}/fast-food-vs-groceries`, `${SITE}/delivery-vs-pickup`, `${SITE}/back-to-school-food-deals`, ...CHAINS.filter(c => !c.banned).map(c => `${SITE}/${c.slug}`), ...(mealsOn ? [SITE + "/cheap-healthy-meals"] : []), `${SITE}/food-deals-by-day`, `${SITE}/${REPORT_SLUG}`, ...EXPLAINERS.map(x => `${SITE}/${x.slug}`), `${SITE}/free-food-today`, ...activeHolidays.map(h => `${SITE}/${h.slug}`)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u}</loc><lastmod>${iso}</lastmod><changefreq>daily</changefreq></url>`).join("\n") +
    `\n</urlset>\n`;
  writeFileSync(join(root, "sitemap.xml"), sitemap);
  console.log("Built sitemap.xml.");
}

main();
