// scripts/build.mjs
// Builds the site from deals.json:
//   1. Injects the deals array into index.html (between DEALS:START/END markers)
//   2. Generates a static, crawlable page per chain (<slug>.html, served at /<slug>)
//   3. Generates sitemap.xml
// No network, no key needed. Run: node scripts/build.mjs
import { readFileSync, writeFileSync } from "node:fs";
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
  { slug: "salad-and-go-deals", name: "Salad and Go" },
  { slug: "el-pollo-loco-deals", name: "El Pollo Loco" },
  { slug: "halal-guys-deals",  name: "The Halal Guys" },
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
  { slug: "harris-teeter-deals", name: "Harris Teeter", note: "Harris Teeter's standing deal is $5 Sushi Friday: most stores sell select fresh sushi entrees for $5 (regularly $7 to $9) every Friday, in-store only, while supplies last, with the free VIC card. It appears below every Friday." },
  { slug: "kroger-deals",       name: "Kroger", note: "Kroger-family stores (Kroger, Fred Meyer, Fry's, King Soopers, Smith's, QFC, Ralphs) run a Wednesday Only sushi promo at their Snowfox and Zenshi counters: select rolls, spicy tuna and Philly included, at a flat promo price that is typically $5. It appears below every Wednesday." },
  { slug: "sprouts-deals",      name: "Sprouts", note: "Sprouts runs Sushi Wednesday in most markets: select Oumi rolls from the in-store sushi case for $5 every Wednesday, no coupon or app needed. It appears below every Wednesday, alongside any other verified Sprouts deli deal." },
  { slug: "publix-deals",       name: "Publix", note: "Publix's standing deal is $5 Sushi Wednesday: select fresh-made rolls (spicy tuna, California, spicy shrimp and more) for $5 at stores with a sushi counter across FL & the Southeast, no coupon or app needed. It appears below every Wednesday." },
];

const GUIDES_NAV = `<nav class="chains"><strong>Guides:</strong> <a href="/sushi-deals">Sushi Deals</a> &middot; <a href="/trader-joes-healthy-meals">Trader Joe&#39;s</a> &middot; <a href="/birthday-freebies">Birthday Freebies</a> &middot; <a href="/best-fast-food-apps">Best Food Apps</a> &middot; <a href="/5-dollar-meal-deals">$5 Meal Deals</a> &middot; <a href="/student-food-deals">Student Guide</a> &middot; <a href="/late-night-food-deals">Late Night</a> &middot; <a href="/fast-food-happy-hours">Happy Hours</a> &middot; <a href="/cheapest-fast-food-orders">Cheapest Orders</a> &middot; <a href="/fast-food-vs-groceries">vs. Groceries</a> &middot; <a href="/back-to-school-food-deals">Back to School</a> &middot; <a href="/delivery-vs-pickup">Delivery Math</a> &middot; <a href="/verification-log">Verification Log</a> &middot; <a href="/food-deals-by-day">Deals by Day</a> &middot; <a href="/publix-5-sushi-wednesday">Publix $5 Sushi</a> &middot; <a href="/safeway-5-friday-sushi">Safeway $5 Friday</a> &middot; <a href="/panera-4-99-mix-and-match">Panera $4.99</a></nav>`;

const EMAIL_CAPTURE = `<div class="note" style="text-align:center"><script>(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);},l=d.createElement(e),l.async=1,l.src=u,n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');ml('account', '2582509');</script><div class="ml-embedded" data-form="phh0LU"></div></div>`;

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
// Canonical brand key: lowercases and folds known naming variants so per-brand
// dedup, golden/healthy/banned lookups, and evergreen injection can't be
// defeated by an alternate spelling of the same chain (e.g. "Panera Bread" vs "Panera").
const BRAND_ALIASES = { "panera bread": "panera", "chipotle mexican grill": "chipotle", "tropical smoothie cafe": "tropical smoothie", "chick fil a": "chick-fil-a", "mcdonalds": "mcdonald's", "wendys": "wendy's", "dennys": "denny's", "dominos": "domino's", "arbys": "arby's", "sonic drive-in": "sonic", "noodles and company": "noodles & company", "chilis": "chili's", "tijuana flats tex-mex": "tijuana flats", "kura revolving sushi bar": "kura sushi", "kura sushi usa": "kura sushi", "rock n' roll sushi": "rock n roll sushi", "rock & roll sushi": "rock n roll sushi", "rock and roll sushi": "rock n roll sushi", "island fin poke co": "island fin poke", "island fin poke co.": "island fin poke", "publix super markets": "publix", "publix supermarkets": "publix", "publix sushi": "publix", "sprouts farmers market": "sprouts", "whole foods": "whole foods market", "heb": "h-e-b", "h-e-b grocery": "h-e-b", "hyvee": "hy-vee", "hy vee": "hy-vee", "fry's food stores": "fry's", "fry's food and drug": "fry's", "smith's food and drug": "smith's", "winn dixie": "winn-dixie", "stop and shop": "stop & shop", "jewel osco": "jewel-osco", "lowes foods": "lowe's foods", "the kroger co": "kroger", "kroger co": "kroger", "harris teeter supermarkets": "harris teeter", "giant food stores": "giant food", "shop rite": "shoprite", "chopt creative salad co.": "chopt", "chopt creative salad": "chopt", "crisp and green": "crisp & green", "modern market": "modern market eatery", "dig inn": "dig", "bibibop asian grill": "bibibop", "zupas": "cafe zupas", "salata salad kitchen": "salata", "bolay fresh bold kitchen": "bolay", "little greek": "little greek fresh grill", "the great greek mediterranean grill": "great greek mediterranean grill", "the great greek": "great greek mediterranean grill", "great greek": "great greek mediterranean grill", "clean eats": "clean eatz", "vitality bowl": "vitality bowls", "rushbowls": "rush bowls", "pressed": "pressed juicery", "the flame broiler": "flame broiler", "flame broiler rice bowl": "flame broiler", "roti modern mediterranean": "roti", "roti mediterranean": "roti", "garbanzo mediterranean fresh": "garbanzo", "pita pit usa": "pita pit", "newk's": "newk's eatery", "newks": "newk's eatery", "newks eatery": "newk's eatery" };
const canonBrand = b => { const k = String(b || "").toLowerCase().trim().replace(/[‘’ʼ]/g, "'").replace(/\s+/g, " "); return BRAND_ALIASES[k] || k; };
// GROCERY (owner request, 2026-08-20): good-value prepared-food deals from grocery stores (sushi days,
// deli and hot-bar meal deals, rotisserie specials) are welcome, from these major chains only. Most are
// regional: they never badge as Top Picks unless listed in NATIONAL_GROCERY.
const GROCERY = new Set(["publix","sprouts","kroger","fred meyer","ralphs","fry's","king soopers","smith's","qfc","harris teeter","safeway","albertsons","vons","jewel-osco","acme markets","shaw's","tom thumb","randalls","food lion","lowe's foods","wegmans","h-e-b","hy-vee","meijer","giant eagle","whole foods market","winn-dixie","shoprite","stop & shop","giant food","walmart"]);
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
    <a class="near" href="https://www.google.com/maps/search/${encodeURIComponent(d.brand)}+near+me" target="_blank" rel="noopener">Nearest</a>
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
    cadence: "The value menu is standing, and promo codes (BOGO-style and percent-off) rotate every few weeks. Panera is one of the most consistently deal-active chains we track, which is why it appears here most mornings.",
    qa: [
      ["Does Panera have a value menu?", "Yes: a standing mix-and-match menu of half sandwiches, soups, and salads, with a free side included per item. We verify its details every morning along with any active codes."],
      ["Is MyPanera free?", "Yes, free to join, and it's where Panera's codes and offers are usable. No paid tier is required for anything listed here."],
      ["How often do Panera codes change?", "Typically every few weeks. When a code expires we drop it the same morning, so anything listed on this page worked as of today's check."]
    ]
  },
  "subway-deals": {
    how: "Subway is the promo-code chain: nearly always at least one working footlong or meal code for app and online orders, layered on top of its rotating Sub of the Day pricing at participating locations.",
    cadence: "National codes rotate roughly monthly, and the Sub of the Day changes daily at a set price that varies by region. Because codes churn fast, this page is worth a daily check: yesterday's code may already be dead.",
    qa: [
      ["What is Subway's Sub of the Day?", "A different featured 6-inch sub each weekday at a discounted price at participating locations. We list it with the verified price whenever it checks out that morning."],
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
<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="robots" content="max-image-preview:large">
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
<footer>DailyBite is updated daily and is not affiliated with ${esc(chain.name)}. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">Instagram</a> &middot; <a href="https://www.pinterest.com/dailybitedeals/" target="_blank" rel="noopener">Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">TikTok</a></footer>
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
  const desc = `$5 Sushi Wednesday at Publix, Sprouts and Kroger stores; $5 Friday sushi at Safeway and Harris Teeter. Every verified weekly sushi day in one place, re-checked daily. Updated ${prettyDate}.`;
  const ROWS = [
    ["Wednesday", "Publix", "$5 select fresh-made rolls (spicy tuna, California, spicy shrimp and more)", "FL & Southeast; no card or app needed"],
    ["Wednesday", "Sprouts", "$5 select Oumi rolls (regularly $7 to $10)", "Most markets; no card needed"],
    ["Wednesday", "Kroger family (Fred Meyer, Fry's, King Soopers, Smith's, QFC, Ralphs)", "Wednesday Only Snowfox and Zenshi promo rolls, typically $5 (some divisions $6)", "Select states; free Kroger Plus card may be needed"],
    ["Wednesday", "Safeway / Albertsons", "$5.99 to $6 Zenshi rolls in many divisions", "Select states"],
    ["Wednesday", "Food Lion & Lowe's Foods", "$5 sushi at select stores", "Carolinas"],
    ["Friday", "Safeway / Albertsons", "$5 Friday: fresh sushi rolls for $5, alongside other prepared-food deals", "Select states; free Safeway for U account may be needed"],
    ["Friday", "Harris Teeter", "$5 select sushi entrees (regularly $7 to $9), in-store, while supplies last", "Southeast & Mid-Atlantic; free VIC card"],
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
<footer>DailyBite is updated daily and is not affiliated with any store or restaurant. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">Instagram</a> &middot; <a href="https://www.pinterest.com/dailybitedeals/" target="_blank" rel="noopener">Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">TikTok</a></footer>
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
<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="robots" content="max-image-preview:large">
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
<footer>DailyBite is updated daily. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">Instagram</a> &middot; <a href="https://www.pinterest.com/dailybitedeals/" target="_blank" rel="noopener">Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">TikTok</a></footer>
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
<footer>DailyBite is updated daily and is not affiliated with any restaurant. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a></footer>
</body>
</html>`;
}

// Food holidays: pages publish 21 days before the date and stay until 2 days after.
// Healthy-fit calendar only (owner whitelist, 2026-08-10): no burger/dessert holidays.
const HOLIDAYS = [
  { slug: "national-coffee-day-deals", name: "National Coffee Day", date: "2026-09-29", emoji: "", kw: /coffee|latte|espresso|cold brew/i,
    blurb: "September 29 is the biggest coffee deal day of the year: expect free and heavily discounted drinks in the major coffee apps, Starbucks included." },
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
<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="robots" content="max-image-preview:large">
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
<footer>DailyBite is updated daily. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">Instagram</a> &middot; <a href="https://www.pinterest.com/dailybitedeals/" target="_blank" rel="noopener">Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">TikTok</a></footer>
</body>
</html>`;
}

const DAY_NOTES = {
  monday: "Mondays are a reset day: weekend bundles disappear and app-only offers take over. Most app deal tabs refresh Monday morning, so check Chipotle and Chick-fil-A first for the week\u2019s new offers.",
  tuesday: "Tuesday is taco night: Tijuana Flats runs Taco Tuesdaze (two tacos, chips, and a drink for about $7.99) at participating FL & Southeast locations, and taco specials across chains make this one of the cheapest dinner nights of the week.",
  wednesday: "Wednesday is sushi day in the Southeast: Publix stores with a sushi counter sell select fresh-made rolls (spicy tuna, California, spicy shrimp and more) for $5 every Wednesday, no coupon or app needed. Elsewhere, mid-week is sleeper-deal territory and app bundles carry the rest.",
  thursday: "Chains tend to preview weekend offers on Thursdays: check the app deal tabs tonight for anything expiring Sunday.",
  friday: "Friday is grocery deal day: many Safeway and Albertsons divisions run $5 Friday on prepared foods like sushi and 8-piece chicken, and Harris Teeter runs $5 sushi Fridays in some markets (free VIC card).",
  saturday: "Weekends skew toward family bundles and delivery-app promos: single-visit value boxes still apply, and breakfast deals run later than weekdays.",
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
<footer>DailyBite is updated daily and is not affiliated with any store or restaurant. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">Instagram</a> &middot; <a href="https://www.pinterest.com/dailybitedeals/" target="_blank" rel="noopener">Pinterest</a></footer>
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
    title: "Sprouts Sushi Wednesday: $5 Oumi Rolls Every Week (2026)",
    h1: "Sprouts Sushi Wednesday",
    desc: "Every Wednesday, most Sprouts Farmers Market stores sell select Oumi sushi rolls for $5, regularly $7 to $10. No coupon or app needed. What's included and how it works.",
    answer: "Every Wednesday, most Sprouts Farmers Market locations sell select rolls from the in-store Oumi sushi case for <strong>$5 each</strong>, regularly $7 to $10. Walk in, pick a marked roll, and pay $5 at the register. No coupon, card or app is needed.",
    facts: [["Day", "Every Wednesday, while supplies last"], ["Price", "$5 per select roll (regularly $7 to $10)"], ["What", "Select Oumi rolls from the in-store sushi case"], ["Where", "Most Sprouts markets (the chain's own FAQ describes the promotion)"], ["What you need", "Nothing: no coupon, card or app"], ["Verified", "Re-checked weekly by DailyBite and listed in the daily deal feed every Wednesday"]],
    faq: [["Which Sprouts rolls are $5 on Wednesday?", "Select rolls marked in the sushi case, usually the classic California, spicy tuna and veggie-style rolls. The exact selection varies by store and by week."],
      ["Do I need a Sprouts account or coupon?", "No. The Wednesday price is applied at the register for the marked rolls."],
      ["Is it every Sprouts store?", "Most markets participate. A small number of stores without an Oumi counter, or in select regions, may not, so check the case signage or ask the sushi staff."],
      ["When do the $5 rolls sell out?", "Rolls are made fresh in the morning; busy stores can run short of the $5 selection by mid-afternoon, so lunch is the safest time."]],
    more: `<p>Sprouts' sushi counters are run by Oumi, which makes rolls in-store the same day. The Wednesday deal is the healthy-eating equivalent of a lunch special: a full roll for the price of a sandwich. See <a href="/sushi-deals" style="color:var(--accent2)">every grocery sushi day by weekday</a>, and today's live Sprouts deals on the <a href="/sprouts-deals" style="color:var(--accent2)">Sprouts page</a>.</p>` },
  { slug: "kroger-sushi-wednesday", brand: "Kroger", chainSlug: "kroger-deals", day: 3,
    title: "Kroger Sushi Wednesday: 'Wednesday Only' $5 Rolls at Kroger, Fred Meyer, Fry's, King Soopers & More (2026)",
    h1: "Kroger Sushi Wednesday",
    desc: "Kroger-family stores run a Wednesday Only sushi promotion at their Snowfox and Zenshi counters: select rolls at a flat promo price, typically $5. Which banners, which rolls, and whether you need a Kroger Plus card.",
    answer: "Kroger and its banner stores (Fred Meyer, Fry's, King Soopers, Smith's, QFC, Ralphs and others) run a <strong>Wednesday Only</strong> sushi promotion at their Snowfox and Zenshi counters: select rolls such as spicy tuna, California and Philly at a flat promo price, <strong>typically $5</strong> (some divisions price at $6). A free Kroger Plus card may be needed for the promo price in some divisions.",
    facts: [["Day", "Every Wednesday ('Wednesday Only' SKUs on kroger.com and in-store)"], ["Price", "Typically $5 per select roll; $6 in some divisions"], ["What", "Select Snowfox and Zenshi rolls: spicy tuna, California, Philly and similar"], ["Where", "Kroger, Fred Meyer, Fry's, King Soopers, Smith's, QFC, Ralphs and other Kroger banners with a sushi counter"], ["What you need", "Usually nothing; a free Kroger Plus card is required for the promo price at some stores"], ["Verified", "Re-checked weekly by DailyBite and listed in the daily deal feed every Wednesday"]],
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
  { slug: "harris-teeter-5-sushi-friday", brand: "Harris Teeter", chainSlug: "harris-teeter-deals", day: 5,
    title: "Harris Teeter $5 Sushi Friday: What's $5, Where & the VIC Card (2026)",
    h1: "Harris Teeter $5 Sushi Friday",
    desc: "Every Friday, most Harris Teeter stores sell select fresh sushi entrees for $5, regularly $7 to $9, in-store with the free VIC card. Which rolls, which states, and when to go.",
    answer: "Every Friday, most Harris Teeter stores sell <strong>select fresh sushi entrees for $5</strong>, regularly $7 to $9. It is in-store only, while supplies last, and the price is a VIC card price: the VIC card is free and can be issued at the register.",
    facts: [["Day", "Every Friday, in-store, while supplies last"], ["Price", "$5 per select sushi entree (regularly $7 to $9)"], ["What", "Select fresh rolls and combos from the in-store sushi counter"], ["Where", "Harris Teeter stores in Virginia, North and South Carolina, Maryland, DC, Delaware, Georgia and Florida with a sushi counter"], ["What you need", "The free VIC card"], ["Verified", "Re-checked weekly by DailyBite and listed in the daily deal feed every Friday"]],
    faq: [["Do all Harris Teeter stores do $5 sushi Friday?", "Most stores with a sushi counter do. A few markets run it on different terms, so check the sushi case sign or the weekly ad for your store."],
      ["Do I need the VIC card?", "Yes, the $5 price is a VIC price. The card is free, has no fees, and can be created at customer service or in the app in a minute."],
      ["Which sushi is $5?", "Select entrees, usually the classic rolls and small combo packs. Premium platters are excluded. The selection varies by store."],
      ["What time does it sell out?", "Counters make rolls in the morning, and Friday lunch is the peak. Late morning is the safest time; evening selection is thin at busy stores."]],
    more: `<p>For Northern Virginia, DC and the Carolinas, Harris Teeter's Friday deal and Safeway's $5 Friday overlap, so Friday is sushi day in the Mid-Atlantic. Wednesday belongs to Publix, Sprouts and Kroger. The full weekly calendar is on the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>; today's verified Harris Teeter deals are on the <a href="/harris-teeter-deals" style="color:var(--accent2)">Harris Teeter page</a>.</p>` },
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
];
const EXPLAINER_NAV = `<nav class="chains"><strong>Weekly deals explained:</strong> ${EXPLAINERS.map(x => `<a href="/${x.slug}">${esc(x.h1)}</a>`).join(" &middot; ")} &middot; <a href="/food-deals-by-day">Deals by day</a></nav>`;

function explainerPage(x, deals) {
  const live = deals.filter(d => canonBrand(d.brand) === canonBrand(x.brand));
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": x.faq.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) };
  const artLd = { "@context": "https://schema.org", "@type": "Article", "headline": x.title, "dateModified": iso, "author": { "@type": "Organization", "name": "DailyBite" }, "publisher": { "@type": "Organization", "name": "DailyBite", "url": SITE } };
  const todayNote = x.day != null ? (dowET === x.day ? `<div class="note" style="border-color:var(--accent)">Today is ${WEEKDAYS[x.day]}: this deal is on right now.</div>` : `<div class="note">Next ${WEEKDAYS[x.day]} is the next time this deal runs. The daily list shows it on the day.</div>`) : "";
  const liveBlock = live.length ? `<h2 style="font-size:19px;margin:26px 2px 8px">Verified ${esc(x.brand)} deals live today</h2><div class="grid">${groupCards(live)}</div>` : "";
  return pageHead(x.title, x.desc, x.slug, [faqLd, artLd]) + `
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>${esc(x.h1)}</h1>
  <p class="answer">${x.answer}</p>
  <div class="facts">${x.facts.map(([k, v]) => `<b>${esc(k)}</b><span>${esc(v)}</span>`).join("")}</div>
  ${todayNote}
  <div class="prose">${x.more}</div>
  <div class="faq"><h2 style="font-size:19px;margin:24px 2px 4px">Questions people ask</h2>${x.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("")}</div>
  ${liveBlock}
  <div class="note">How DailyBite verifies this: the daily refresh re-checks each weekly grocery deal against the store's own site, weekly ad or FAQ, and the owner tests deals in person. Prices vary by store and division, and counters sell out: the price you pay is the one on the shelf tag that day.</div>
  ${EMAIL_CAPTURE}
  ${EXPLAINER_NAV}
  <nav class="chains"><strong>More:</strong> <a href="/${x.chainSlug}">${esc(x.brand)} deals today</a> &middot; <a href="/sushi-deals">Grocery sushi days</a> &middot; <a href="/">All of today's deals</a></nav>
  ${GUIDES_NAV}
` + PAGE_FOOT;
}

// One page for the week (owner request, 2026-09-08): the seven day-of-week pages were
// near-duplicates that Google left in "discovered, not indexed"; they now redirect here.
function byDayPage(deals) {
  const title = "Food Deals by Day of the Week: Sushi Wednesday, $5 Friday, Taco Tuesday & More (2026)";
  const desc = `Which healthy food deals repeat on which weekday: Wednesday sushi days at Publix, Sprouts and Kroger, $5 Friday at Safeway and Harris Teeter, Taco Tuesdaze at Tijuana Flats, and what refreshes on Mondays. Updated ${prettyDate}.`;
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


function main() {
  const data = JSON.parse(readFileSync(join(root, "deals.json"), "utf8"));
  // EVERGREEN FLOOR (owner-verified deals; each self-expires on its date).
  // Injected only when the daily AI refresh did not supply a deal for that brand.
  const EVERGREEN = [
    // Owner request + officially verified (Chipotle newsroom press release, 2026-08-27):
    // one-day free double protein with code PROTEIN. Self-expires after today.
    { until: "2026-08-27", deal: { brand: "Chipotle", cat: "Bowls", color: "#a81612", ic: "Ch", deal: "Free Double Protein Today Only: Code PROTEIN", desc: "Today only (August 27): add a free second portion of meat or sofritas to any full-price burrito, bowl, or salad ordered in the Chipotle app or at chipotle.com with code PROTEIN at checkout. App and website orders only; not valid in-restaurant or on delivery platforms.", tags: ["free", "app"], value: 5, expires: "Today only, August 27", url: "https://www.chipotle.com/", best: true, region: "National" } },
    // (Chipotle free-delivery evergreen removed 2026-08-25: its until-date of 2026-08-15 passed.)
    { until: "2026-12-31", deal: { brand: "Panera", cat: "Sandwiches", color: "#4a7c2f", ic: "Pa", deal: "$4.99 Mix & Match Value Menu", desc: "Half- and cup-sized portions of soups, salads, and sandwiches from a 10-item menu for $4.99 each, and every item comes with a free side (baguette, chips, or apple). Pair any two for a full meal under $10 - in cafes and online, no membership needed.", tags: [], value: 5, expires: "Ongoing", url: "https://www.panerabread.com/", best: false, region: "National" } },
    // Verified 2026-08-27: Delicious Duos launched July 2025 and is a standing menu on
    // noodles.com; the daily refresh has independently verified it repeatedly.
    { until: "2026-12-31", deal: { brand: "Noodles & Company", cat: "Bowls", color: "#e8601c", ic: "NC", deal: "Delicious Duos: Entree + Side from $9.95", desc: "A small entree paired with a side (garden salad, Caesar, or lemon parmesan broccoli) from $9.95, or chef-curated duos with protein at $10.95, all day every day at participating locations. Price varies slightly by location.", tags: [], value: 3, expires: "Ongoing", url: "https://www.noodles.com/", best: false, region: "National" } },
    // Verified 2026-08-27: El Pollo Loco's $5 Fire-Grilled Combos value platform is
    // announced on the company's own investor site and current on 2026 menus.
    { until: "2026-12-31", deal: { brand: "El Pollo Loco", cat: "Chicken", color: "#f7c500", ic: "EP", deal: "$5 Fire-Grilled Combos: Rotating Value Menu", desc: "A rotating lineup of roughly $5 combos (Original Pollo Bowl, Classic Chicken Burrito, taquitos and more) built on citrus-marinated fire-grilled chicken, every day at participating locations. Lineup and pricing vary by market.", tags: [], value: 4, expires: "Ongoing", url: "https://www.elpolloloco.com/", best: false, region: "West & Southwest" } },
    // Owner request (Jacob, 2026-08-14): Tijuana Flats day specials, injected only on their active weekday (dow: 0=Sun..6=Sat).
    { until: "2026-12-31", dow: 2, deal: { brand: "Tijuana Flats", cat: "Mexican", color: "#d0342c", ic: "TF", deal: "Taco Tuesdaze: 2 Tacos + Chips + Drink for $7.99", desc: "Every Tuesday at participating locations: two tacos, chips, and a drink for $7.99 in-store, online, or in the app - no third-party delivery, and pricing varies slightly by location.", tags: [], value: 4, expires: "Tuesdays only", url: "https://www.tijuanaflats.com/promotions/specials-and-deals", best: false, region: "FL & Southeast" } },
    { until: "2026-12-31", dow: 4, deal: { brand: "Tijuana Flats", cat: "Mexican", color: "#d0342c", ic: "TF", deal: "Throwback Thursdaze: Burrito or Bowl + Chips + Drink for $8.99", desc: "Every Thursday at participating locations: a Tijuana Burrito or burrito bowl plus chips and a drink for $8.99 in-store, online, or in the app - no third-party delivery; pricing varies slightly by location.", tags: [], value: 4, expires: "Thursdays only", url: "https://www.tijuanaflats.com/promotions/specials-and-deals", best: false, region: "FL & Southeast" } },
    // Owner request (Jacob, 2026-08-20): grocery-store prepared-food deals are welcome when the value is real.
    // Publix $5 Sushi Wednesday, seen in store by the owner (spicy tuna and Philadelphia rolls at his Publix);
    // confirmed by Chowhound and the AFC/Zenshi sushi counters that run it. Wednesdays only (dow 3).
    // Sprouts "Sushi Wednesday": select Oumi rolls for $5 in most markets, per the official Sprouts FAQ (2026-08-20).
    { until: "2026-12-31", dow: 3, deal: { brand: "Sprouts", cat: "Sushi", color: "#00703c", ic: "SP", deal: "Sushi Wednesday: Select Oumi Rolls for $5", desc: "Every Wednesday in most Sprouts Farmers Market locations, select Oumi sushi rolls from the in-store sushi case are $5 each instead of the regular $7 to $10. Walk in and grab them: no coupon, app, or membership needed; participation and selection vary by store.", tags: [], value: 4, expires: "Wednesdays only", url: "https://www.sprouts.com/faqs/what-is-sushi-wednesday/", best: false, region: "Select states" } },
    // Kroger-family "Wednesday Only" Private Selection sushi by Snowfox: an official kroger.com promo
    // lineup (California, Spicy Tuna, Philly, Spicy Salmon, Vegetarian and more) with a promotional
    // price on Wednesdays only; kroger.com shows "Prices May Vary" (typically $5, some divisions $6).
    { until: "2026-12-31", dow: 3, deal: { brand: "Kroger", cat: "Sushi", color: "#0b3b8c", ic: "KR", deal: "Sushi Wednesday: Snowfox Promo Rolls, Typically $5", desc: "Every Wednesday, Kroger-family stores with a Snowfox or Zenshi sushi counter (Kroger, Fred Meyer, Fry's, King Soopers, Smith's, QFC, Ralphs) sell the Wednesday Only promo lineup, including spicy tuna, Philly, California and veggie rolls, at a flat promotional price, typically $5 (some divisions $6) versus $8 to $10 the rest of the week. Walk in; a free Kroger Plus card may be needed for the promo price.", tags: [], value: 4, expires: "Wednesdays only", url: "https://www.kroger.com/p/wednesday-only-private-selection-california-sushi-roll-by-snowfox-/0001111065967", best: false, region: "Select states" } },
    { until: "2026-12-31", dow: 3, deal: { brand: "Publix", cat: "Sushi", color: "#3d8a3a", ic: "PX", deal: "$5 Sushi Wednesday: Select Fresh Rolls for $5", desc: "Every Wednesday at Publix stores with a sushi counter, select fresh-made rolls (spicy tuna, California, spicy shrimp, cream cheese/Philadelphia-style, vegetable and more; selection varies by store) are $5 each instead of the usual $6 to $10. Walk in and grab them from the sushi case: no app, coupon, or membership needed, while supplies last.", tags: [], value: 4, expires: "Wednesdays only", url: "https://www.publix.com/locations", best: false, region: "FL & Southeast" } },
    // Verified 2026-08-24: Safeway's standing $5 Friday includes fresh sushi (safeway.com lists
    // dedicated "$5 Friday" sushi SKUs) plus other prepared foods; lineup posts Wednesdays in the
    // weekly ad and varies by division. Harris Teeter runs $5 Sushi Friday at most stores, VIC
    // card (free) required, in-store only, while supplies last. Fridays only (dow 5).
    { until: "2026-12-31", dow: 5, deal: { brand: "Safeway", cat: "Sushi", color: "#e31837", ic: "SF", deal: "$5 Friday: Fresh Sushi Rolls for $5", desc: "Every Friday, Safeway's $5 Friday lineup includes fresh sushi rolls from the in-store counter for $5 (regularly $8 to $10), alongside other prepared-food deals like an 8-piece chicken bag. Check the weekly ad for your division; a free Safeway for U account may be needed for the promo price.", tags: [], value: 4, expires: "Fridays only", url: "https://www.safeway.com/weeklyad/", best: false, region: "Select states" } },
    { until: "2026-12-31", dow: 5, deal: { brand: "Harris Teeter", cat: "Sushi", color: "#00529b", ic: "HT", deal: "$5 Sushi Friday: Select Rolls for $5", desc: "Most Harris Teeter stores sell select fresh sushi entrees for $5 every Friday (regularly $7 to $9), in-store only, while supplies last. Swipe the free VIC card at checkout for the promo price; selection varies by store.", tags: [], value: 4, expires: "Fridays only", url: "https://www.harristeeter.com/", best: false, region: "Southeast & Mid-Atlantic" } },
  ];
  const stripEmoji = (s) => typeof s === "string" ? s.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2300}-\u{23FF}\u{FE0F}]/gu, "").replace(/\s{2,}/g, " ").trim() : s;
  for (const d of (Array.isArray(data) ? data : data.deals) || []) for (const k of ["brand","deal","title","desc","expires","badge","cat","category","region"]) if (d[k]) d[k] = stripEmoji(d[k]);
  let deals = Array.isArray(data) ? data : data.deals;
  if (!Array.isArray(deals) || deals.length === 0) {
    throw new Error("deals.json has no deals array: refusing to build an empty page.");
  }
  {
    for (const e of EVERGREEN) {
      if (e.dow !== undefined && e.dow !== dowET) continue;
      if (iso <= e.until && !deals.some((d) => canonBrand(d.brand) === canonBrand(e.deal.brand))) deals.push({ ...e.deal });
    }
  }

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
      const dup = kept.some(k => {
        if (canonBrand(k.brand) !== b) return false;
        const kw = words(k.deal);
        let inter = 0; for (const x of w) if (kw.has(x)) inter++;
        const union = new Set([...w, ...kw]).size;
        return union > 0 && inter / union >= 0.6;
      });
      if (!dup) kept.push(d);
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

  // Exclude deals locked behind PAID subscriptions/memberships (DashPass, Uber One, etc.).
  const beforeSub = deals.length;
  deals = deals.filter(d => !/dashpass|uber one|grubhub\+|paid member|subscription|subscriber|prime member|prime[- ]exclusive|amazon prime|with prime\b|costco|sam's club|bj's/i.test(d.deal + " " + d.desc + " " + (d.expires || "")));
  // Delivery-app backstop (2026-09-03): platform promos are welcome only when open to
  // everyone. First-order, new-customer, referral and welcome offers are signup
  // bonuses, not deals - dropped here regardless of what the prompt let through.
  deals = deals.filter(d => !/first[- ]order|new customers? only|for new customers|new users? only|first[- ]time (?:users?|customers?|orders?)|welcome offer|sign[- ]?up bonus|referral (?:code|bonus|credit)/i.test(d.deal + " " + d.desc + " " + (d.expires || "")));

  // Exclude rewards-member-gated deals — every deal must be claimable with no membership of any kind.
  // Golden-brand exception (Jacob, 2026-07-21): Chipotle + Chick-fil-A may run free-app-account deals.
  const APPROVED = new Set(["Sweetgreen","CAVA","Chipotle","Chick-fil-A","Panera","Panera Bread","Potbelly","Noodles & Company","Just Salad","Qdoba","Naf Naf Grill","Smoothie King","Tropical Smoothie","Tropical Smoothie Cafe","Jamba","Salad and Go","El Pollo Loco","The Halal Guys","Kura Sushi","Sarku Japan","Rock N Roll Sushi","Sushi Maki","Pokeworks","Island Fin Poke","Subway","Starbucks","Tijuana Flats","Publix","DoorDash","Uber Eats","Grubhub","Pollo Tropical","Rubio's","Rubio's Coastal Grill","Rubios","Waba Grill","Pei Wei","Pei Wei Asian Kitchen","Teriyaki Madness","Honeygrow","Playa Bowls","Nekter Juice Bar","Nekter","Jason's Deli","Jasons Deli","McAlister's Deli","McAlisters Deli","Chicken Salad Chick","Taziki's","Taziki's Mediterranean Cafe","Tazikis","Chopt","Chopt Creative Salad","Chopt Creative Salad Co.","Saladworks","Salata","Salata Salad Kitchen","Crisp & Green","Crisp and Green","Bibibop","Bibibop Asian Grill","Cafe Zupas","Zupas","Clean Juice","Robeks","Luna Grill","Modern Market","Modern Market Eatery","Dig","Dig Inn","Bolay","Bolay Fresh Bold Kitchen","Fresh Kitchen","Little Greek Fresh Grill","Little Greek","The Great Greek Mediterranean Grill","Great Greek Mediterranean Grill","The Great Greek","Clean Eatz","Vitality Bowls","Everbowl","Rush Bowls","Pressed Juicery","Pressed","Flame Broiler","The Flame Broiler","Roti","Roti Modern Mediterranean","Garbanzo","Garbanzo Mediterranean Fresh","Pita Pit","Newk's Eatery","Newk's","Newks"].map(canonBrand)); // roster widened 2026-08-27 (healthy fast-casual), 2026-08-29 (salad/bowl expansion) and 2026-09-07 (healthy-only: Five Guys, Shake Shack, Wingstop, Chili's removed; bowl/Mediterranean/acai chains added)
  for (const g of GROCERY) APPROVED.add(g);
  deals = deals.filter(d => APPROVED.has(canonBrand(d.brand))); // owner: approved quality/healthy brands + grocery roster only

  // Deterministic REGIONAL HONESTY backstop (2026-08-29): the refresh prompt forbids
  // labeling these chains "National" and forbids marking them best, but the model can
  // and does slip - Naf Naf Grill shipped with NO region field and best:true today and
  // was shown to a Florida visitor (the chain has no Florida stores). Prompt rules are
  // requests; this map is the law. For each regional brand: a missing or "National"
  // region is replaced with the real footprint, and best is always stripped.
  const REGIONAL_DEFAULTS = Object.fromEntries(Object.entries({
    "Naf Naf Grill": "Midwest & East", "Just Salad": "Northeast & Select states",
    "Salad and Go": "AZ, TX, OK & NV", "El Pollo Loco": "West & Southwest",
    "The Halal Guys": "Select states", "Tijuana Flats": "FL & Southeast",
    "Kura Sushi": "Select states", "Pokeworks": "Select states",
    "Rock N Roll Sushi": "South & Southeast", "Sushi Maki": "South Florida",
    "Island Fin Poke": "FL & Southeast", "Pollo Tropical": "Florida",
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
  const DAY_SPECIAL_BRANDS = new Set(["tijuana flats", "chipotle", "chick-fil-a", ...GROCERY]);
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
  const HEALTHY = new Set(["sweetgreen","potbelly","noodles & company","cava","just salad","qdoba","panera","panera bread","chipotle","naf naf grill","smoothie king","tropical smoothie","tropical smoothie cafe","jamba","salad and go","el pollo loco","the halal guys","chick-fil-a","kura sushi","sarku japan","rock n roll sushi","sushi maki","pokeworks","island fin poke","pollo tropical","rubio's","rubio's coastal grill","waba grill","pei wei","pei wei asian kitchen","teriyaki madness","honeygrow","playa bowls","nekter juice bar","jason's deli","mcalister's deli","chicken salad chick","taziki's","taziki's mediterranean cafe","chopt","saladworks","salata","crisp & green","bibibop","cafe zupas","clean juice","robeks","luna grill","modern market eatery","dig","bolay","fresh kitchen","little greek fresh grill","great greek mediterranean grill","clean eatz","vitality bowls","everbowl","rush bowls","pressed juicery","flame broiler","roti","garbanzo","pita pit","newk's eatery"]);
  {
    for (const d of deals) d.best = false;
    const byBrand = new Set();
    // Regional-footprint chains never badge (most visitors cannot claim them); the three
    // regional sushi/poke chains from the prompt's REGIONAL HONESTY rule are listed too.
    const REGIONAL_ONLY = new Set(["Whataburger","Del Taco","El Pollo Loco","Salad and Go","Jack in the Box","In-N-Out","The Halal Guys","TCBY","Tijuana Flats","Rock N Roll Sushi","Sushi Maki","Island Fin Poke","Pollo Tropical","Rubio's","Rubio's Coastal Grill","Waba Grill","Honeygrow","Chicken Salad Chick","Taziki's","Taziki's Mediterranean Cafe","Bolay","Fresh Kitchen","Little Greek Fresh Grill","The Great Greek Mediterranean Grill","Clean Eatz","Vitality Bowls","Everbowl","Rush Bowls","Pressed Juicery","Flame Broiler","Roti","Garbanzo","Pita Pit","Newk's Eatery"].map(canonBrand));
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
  const htmlPath = join(root, "index.html");
  const html = readFileSync(htmlPath, "utf8");
  const START = "/* DEALS:START */", END = "/* DEALS:END */";
  const s = html.indexOf(START), e = html.indexOf(END);
  if (s === -1 || e === -1 || e < s) throw new Error("DEALS markers missing in index.html");
  writeFileSync(htmlPath, html.slice(0, s) + `${START}\nconst DEALS = ${JSON.stringify(deals, null, 2)};\nconst META = ${JSON.stringify({ verifiedAt: new Date().toISOString() })};\n${END}` + html.slice(e + END.length));
  console.log(`Built index.html with ${deals.length} deals.`);

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
    // Holiday banner: auto-show within 7 days of a food holiday, auto-hide after.
    const HB_START = "<!-- HOLIDAY:START -->", HB_END = "<!-- HOLIDAY:END -->";
    const hs2 = out.indexOf(HB_START), he2 = out.indexOf(HB_END);
    if (hs2 !== -1 && he2 !== -1) {
      const soon = HOLIDAYS.map(h => ({ h, diff: (new Date(h.date + "T12:00:00") - now) / 86400000 }))
        .filter(x => x.diff <= 7 && x.diff >= -0.5).sort((a, b) => a.diff - b.diff)[0];
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
  writeFileSync(join(root, "food-deals-by-day.html"), byDayPage(deals));
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
  const urls = [`${SITE}/`, `${SITE}/sushi-deals`, `${SITE}/trader-joes-healthy-meals`, `${SITE}/verification-log`, `${SITE}/about`, `${SITE}/privacy`, `${SITE}/birthday-freebies`, `${SITE}/best-fast-food-apps`, `${SITE}/5-dollar-meal-deals`, `${SITE}/student-food-deals`, `${SITE}/late-night-food-deals`, `${SITE}/fast-food-happy-hours`, `${SITE}/cheapest-fast-food-orders`, `${SITE}/fast-food-vs-groceries`, `${SITE}/delivery-vs-pickup`, `${SITE}/back-to-school-food-deals`, ...CHAINS.filter(c => !c.banned).map(c => `${SITE}/${c.slug}`), `${SITE}/food-deals-by-day`, ...EXPLAINERS.map(x => `${SITE}/${x.slug}`), `${SITE}/free-food-today`, ...activeHolidays.map(h => `${SITE}/${h.slug}`)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u}</loc><lastmod>${iso}</lastmod><changefreq>daily</changefreq></url>`).join("\n") +
    `\n</urlset>\n`;
  writeFileSync(join(root, "sitemap.xml"), sitemap);
  console.log("Built sitemap.xml.");
}

main();
