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
// `program` is the chain's loyalty/app program; `about` is unique evergreen
// copy rendered on the chain page so each URL has content beyond the deal
// cards themselves. Keep these general — no point values or prices that drift.
const CHAINS = [
  { slug: "mcdonalds-deals",   name: "McDonald's", program: "the McDonald's app (MyMcDonald's Rewards)",
    about: "McDonald's runs some of the most reliable app deals in fast food, including recurring weekly perks like Free Fries Friday and a rotating set of daily in-app offers. Most deals require ordering through the McDonald's app with a MyMcDonald's Rewards account, and points from every purchase can be redeemed for free menu items. Offers are typically limited to one redemption per day and vary slightly by location." },
  { slug: "taco-bell-deals",   name: "Taco Bell", program: "the Taco Bell app (Taco Bell Rewards)",
    about: "Taco Bell leans heavily on app exclusives: limited \"drops\", recurring weekday specials, and value boxes that are often cheaper in the app than at the counter. Taco Bell Rewards members earn points on every order and regularly get early or exclusive access to new menu items. The Cravings Value Menu is the go-to for cheap eats even when no promotion is running." },
  { slug: "wendys-deals",      name: "Wendy's", program: "the Wendy's app (Wendy's Rewards)",
    about: "Wendy's app offers rotate weekly and frequently include free items with a minimum purchase, discounted combos, and breakfast specials. The $5 Biggie Bag family of bundles is a long-running value staple, and Wendy's Rewards points accumulate toward free menu items. Most offers must be activated in the app before ordering." },
  { slug: "burger-king-deals", name: "Burger King", program: "the BK app (Royal Perks)",
    about: "Burger King's Royal Perks program awards \"crowns\" on every purchase, and the BK app carries a rotating weekly lineup of discounted combos and free-item offers. Burger King also runs frequent limited-time national promotions tied to holidays and new menu launches. App offers usually need to be added to your order before checkout." },
  { slug: "chipotle-deals",    name: "Chipotle", program: "the Chipotle app (Chipotle Rewards)",
    about: "Chipotle Rewards members earn points on every order that convert into free entrées and sides. Chipotle's promotions tend to be event-driven — think free delivery windows, BOGO codes around holidays, and free guac or queso offers for members — rather than a standing weekly schedule, so deals here can appear and disappear quickly." },
  { slug: "chick-fil-a-deals", name: "Chick-fil-A", program: "the Chick-fil-A One app",
    about: "Chick-fil-A One members earn points on every purchase that can be redeemed for free menu items, with higher membership tiers earning points faster. Chick-fil-A rarely discounts food outright; most freebies arrive as targeted in-app rewards or local restaurant offers, which is why verified national Chick-fil-A deals are less common than at other chains." },
  { slug: "starbucks-deals",   name: "Starbucks", program: "the Starbucks app (Starbucks Rewards)",
    about: "Starbucks Rewards revolves around earning stars that convert into free drinks and food. The best recurring value comes from member-only promotions: double-star days, limited-time BOGO drink windows (often midweek afternoons), and seasonal games with food and drink prizes. Most offers must be activated in the app before paying." },
  { slug: "panera-deals",      name: "Panera", program: "the Panera app (MyPanera)",
    about: "Panera's MyPanera program serves personalized rewards — free bagels, discounted entrées, and periodic sitewide promo codes. Panera also runs the Unlimited Sip Club drink subscription, which frequently comes with promotional trial periods. Value menus like Mix & Match make Panera cheaper than its sticker prices suggest." },
  { slug: "pizza-hut-deals",   name: "Pizza Hut", program: "the Pizza Hut app (Hut Rewards)",
    about: "Pizza Hut's best prices are almost always online or in-app: carryout specials, big-box bundles, and Hut Rewards points on digital orders that build toward free pizza. National limited-time offers rotate often, and third-party delivery apps periodically layer their own Pizza Hut promotions on top." },
  { slug: "popeyes-deals",     name: "Popeyes", program: "the Popeyes app (Popeyes Rewards)",
    about: "Popeyes Rewards members earn points on every order, and the app regularly carries exclusive bundle deals that beat in-store pricing. Popeyes is also known for aggressive limited-time value boxes and holiday promotions, which tend to be honored in-store, online, and in-app at participating locations." },
  { slug: "dunkin-deals",      name: "Dunkin'", program: "the Dunkin' app (Dunkin' Rewards)",
    about: "Dunkin' Rewards members earn points on every purchase and get member-exclusive offers in the app, from discounted espresso drinks to boosted-point challenges. Dunkin' runs frequent limited-time national promotions — often tied to holidays or new menu items — and the app is where nearly all of them are redeemed." },
  { slug: "sonic-deals",       name: "Sonic", program: "the SONIC app",
    about: "Sonic's signature perk is ordering through the SONIC app, which unlocks half-price drinks and slushes on every order. Beyond that standing benefit, Sonic rotates limited-time value menus and combo deals, and its Happy Hour pricing on drinks makes afternoon visits reliably cheap." },
  { slug: "arbys-deals",       name: "Arby's", program: "the Arby's app (Arby's Rewards)",
    about: "Arby's Rewards sends personalized offers through the app and email, and the chain regularly runs limited-time meal bundles and 2-for pricing on sandwiches. Most Arby's promotions require redeeming a coupon or app offer at checkout, so it pays to check the app before ordering." },
  { slug: "kfc-deals",         name: "KFC", program: "the KFC app (KFC Rewards)",
    about: "KFC Rewards members earn points on digital orders that can be redeemed for free menu items. KFC's deal cadence centers on limited-time bucket and box promotions — especially around holidays — plus app-exclusive bundles that undercut in-store menu prices at participating locations." },
  { slug: "dominos-deals",     name: "Domino's", program: "the Domino's app (Domino's Rewards)",
    about: "Domino's Rewards awards points on qualifying orders, and its standing online carryout and mix-and-match deals are among the most consistent values in pizza. The best prices at Domino's are nearly always digital — the app and website carry national coupons that in-store phone orders often miss." },
  { slug: "subway-deals",      name: "Subway", program: "the Subway app (MVP Rewards)",
    about: "Subway's MVP Rewards program earns points toward Subway Cash, and the chain is unusually generous with promo codes — footlong discounts, BOGO offers, and meal-deal codes rotate through the app and website almost constantly. Participation can vary by franchise, so codes occasionally fail at individual locations." },
  { slug: "sweetgreen-deals",  name: "Sweetgreen", program: "the sweetgreen app",
    about: "Sweetgreen's app rewards program offers earn-and-redeem progress on orders plus periodic member challenges and limited-time promotions. Outright discounts are rarer than at traditional fast food, so most sweetgreen deals take the form of app rewards, seasonal menu promotions, or delivery-platform offers." },
  { slug: "cava-deals",        name: "CAVA", program: "the CAVA app (CAVA Rewards)",
    about: "CAVA Rewards members earn on every order and can redeem for free food, with occasional bonus-earn windows and member-exclusive treats. Like most fast-casual bowls-and-pitas chains, CAVA discounts sparingly — deals usually arrive as app rewards or limited-time promotions rather than standing value menus." },
  { slug: "smoothie-king-deals", name: "Smoothie King", program: "the Smoothie King app (Healthy Rewards)",
    about: "Smoothie King's Healthy Rewards app earns points on every purchase and delivers member-exclusive discounts, often themed around fitness seasons like New Year and summer. The app also carries recurring weekday specials and size-upgrade offers that aren't advertised in-store." },
  { slug: "tropical-smoothie-deals", name: "Tropical Smoothie", program: "the Tropical Smoothie Cafe app (Tropic Rewards)",
    about: "Tropical Smoothie Cafe's Tropic Rewards program earns points toward free smoothies and food, and the app runs frequent flash deals — discounted smoothie days, combo offers, and seasonal promotions. National Smoothie Day and similar occasions usually bring the chain's biggest freebies of the year." },
  { slug: "jamba-deals",       name: "Jamba", program: "the Jamba app (Jamba Rewards)",
    about: "Jamba Rewards members earn points on every purchase and receive app-exclusive offers like discounted smoothie sizes and combo pricing. Jamba's promotions cluster around warm-weather months and wellness seasons, and the app is the main channel for both earning and redeeming." },
  { slug: "salad-and-go-deals", name: "Salad and Go", program: "the Salad and Go app",
    about: "Salad and Go competes on everyday low prices rather than heavy promotions — its salads, wraps, and drinks are priced well below most fast-casual rivals even without a coupon. Deals that do appear typically come through the app or seasonal specials, and the drive-thru-only format keeps its baseline pricing low." },
  { slug: "el-pollo-loco-deals", name: "El Pollo Loco", program: "the El Pollo Loco app (Loco Rewards)",
    about: "El Pollo Loco's Loco Rewards program pairs points-earning with recurring weekly app specials — discounted add-ons and meal deals that repeat on set weekdays. The chain also rotates limited-time family meal promotions, and most offers are redeemed through the app at participating locations." },
  { slug: "halal-guys-deals",  name: "The Halal Guys", program: "The Halal Guys app",
    about: "The Halal Guys' app rewards program earns points on platters, gyros, and sandwiches that convert into free food. As a smaller franchise chain, its promotions are less frequent and more location-dependent than the national giants — most verified deals are app rewards or grand-opening and holiday specials." },
];

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
const dealsFor = (name, deals) => deals.filter(d => {
  const b = norm(d.brand), n = norm(name);
  return b.includes(n) || n.includes(b);
});

const today = new Date();
const iso = today.toISOString().slice(0, 10);

// Pull the latest date out of a free-text expiry string ("Through July 13, 2026",
// "July 3–5, 2026", "Today — July 4 only"). Returns epoch ms or null. For ranges
// the end date is used. Recurring/ongoing strings ("Every Friday") return null.
function parseExpiry(expires) {
  let best = null;
  const re = /([A-Z][a-z]+)\.?\s+(\d{1,2})(?:\s*[–—-]\s*(\d{1,2}))?(?:,\s*(\d{4}))?/g;
  for (const m of String(expires || "").matchAll(re)) {
    const t = Date.parse(`${m[1]} ${m[3] || m[2]}, ${m[4] || today.getUTCFullYear()}`);
    if (!isNaN(t) && (best === null || t > best)) best = t;
  }
  return best;
}

// schema.org Offer for a deal. Conservative: price only when the deal title
// names a single unambiguous dollar amount, validThrough only when parseable.
function offerLd(d) {
  const o = {
    "@type": "Offer",
    "name": d.deal,
    "description": d.desc,
    "url": d.url,
    "seller": { "@type": "Organization", "name": d.brand },
  };
  const t = parseExpiry(d.expires);
  if (t !== null) o.validThrough = new Date(t).toISOString().slice(0, 10);
  // Price only when the title names one clean dollar amount that is actually
  // the deal price — not a "$X+ purchase" minimum, and not a free-item deal.
  const prices = String(d.deal).match(/\$\d+(?:\.\d{2})?/g);
  if (prices && prices.length === 1 && !(d.tags || []).includes("free")
      && !/\$\d+(?:\.\d{2})?\s*\+/.test(d.deal)) {
    o.price = prices[0].slice(1);
    o.priceCurrency = "USD";
  }
  if (d.region && d.region !== "National") o.areaServed = d.region;
  return o;
}

function breadcrumbLd(pageName, pageUrl) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "DailyBite", "item": `${SITE}/` },
      { "@type": "ListItem", "position": 2, "name": pageName, "item": pageUrl },
    ],
  };
}
const monthYear = today.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const prettyDate = today.toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

function chainNav(current) {
  return CHAINS.map(c => c.slug === current
    ? `<strong>${esc(c.name)}</strong>`
    : `<a href="/${c.slug}">${esc(c.name)}</a>`).join(" &middot; ");
}

function dealCard(d) {
  const tags = (d.tags || []).map(t =>
    `<span class="pill ${t === "free" ? "free" : "app"}">${t === "free" ? "FREE" : "APP ONLY"}</span>`).join("");
  return `<div class="card${d.best ? " best" : ""}">
  ${d.best ? `<div class="best-badge">&#9733; TOP PICK</div>` : ""}
  <div class="brandrow">
    <div class="brand-ic" style="background:${esc(d.color)}">${esc(d.ic)}</div>
    <div><div class="brand-name">${esc(d.brand)}</div><div class="brand-cat">${esc(d.cat)}</div></div>
  </div>
  <div class="deal">${esc(d.deal)}</div>
  <div class="desc">${esc(d.desc)}</div>
  <div class="metarow">${d.region && d.region !== "National" ? `<span class="pill region">&#128205; ${esc(d.region.toUpperCase())}</span>` : ""}${tags}</div>
  <div class="foot">
    <span class="expires">&#128337; ${esc(d.expires)}</span>
    <a class="near" href="https://www.google.com/maps/search/${encodeURIComponent(d.brand)}+near+me" target="_blank" rel="noopener">&#128205; Nearest</a>
    <a class="cta" href="${esc(d.url)}" target="_blank" rel="noopener">Get deal &rarr;</a>
  </div>
</div>`;
}

const CHAIN_CSS = `:root{--bg:#0f1115;--card:#191c23;--card2:#20242d;--ink:#f4f5f7;--muted:#9aa3b2;--line:#2a2f3a;--accent:#ff5a3c;--accent2:#ffb020;--good:#2ec16b;--chip:#242935}*{box-sizing:border-box}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--ink)}header{padding:28px 20px 18px;text-align:center;background:radial-gradient(120% 100% at 50% 0%,rgba(255,90,60,.18),transparent 60%)}.logo{font-size:26px;font-weight:800}.logo a{display:inline-flex;align-items:center;gap:8px}.logo img{width:30px;height:30px}.logo a{color:var(--ink);text-decoration:none}.logo span{color:var(--accent)}.wrap{max-width:920px;margin:0 auto;padding:0 16px 60px}h1{font-size:24px;margin:18px 2px 6px}.tag{color:var(--muted);font-size:14px;margin:0 2px 14px}.date{display:inline-block;background:var(--chip);padding:6px 14px;border-radius:999px;font-size:13px;font-weight:600;margin-bottom:10px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:10px}@media(max-width:640px){.grid{grid-template-columns:1fr}}.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:10px;position:relative;overflow:hidden}.card.best{border-color:var(--accent2)}.best-badge{position:absolute;top:0;right:0;background:var(--accent2);color:#1a1200;font-size:11px;font-weight:800;padding:4px 10px;border-bottom-left-radius:10px}.brandrow{display:flex;align-items:center;gap:10px}.brand-ic{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;font-weight:800;font-size:15px;color:#fff;flex:0 0 auto}.brand-name{font-weight:700;font-size:15px}.brand-cat{color:var(--muted);font-size:12px}.deal{font-size:16px;font-weight:700;line-height:1.3}.desc{color:var(--muted);font-size:13px;line-height:1.45}.metarow{display:flex;flex-wrap:wrap;gap:6px}.pill{font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;background:var(--card2);color:var(--muted)}.pill.free{background:rgba(46,193,107,.15);color:var(--good)}.pill.app{background:rgba(255,176,32,.14);color:var(--accent2)}.pill.region{background:rgba(122,165,255,.15);color:#7aa5ff}.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:8px}.expires{font-size:12px;color:var(--muted)}.cta{background:var(--accent);color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:8px 12px;border-radius:9px;white-space:nowrap}.near{color:#7aa5ff;text-decoration:none;font-size:12px;font-weight:600;white-space:nowrap}.empty{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:24px;color:var(--muted);line-height:1.5}.note{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;margin-top:16px;color:var(--muted);font-size:13px;line-height:1.6}.chains{margin-top:22px;font-size:13px;color:var(--muted);line-height:2}.chains a{color:var(--accent2);text-decoration:none}footer{max-width:920px;margin:0 auto;padding:24px 16px 50px;color:var(--muted);font-size:12px;line-height:1.6}footer a{color:var(--accent2)}.seo-sec{margin-top:28px}.seo-sec h2{font-size:19px;margin:0 2px 10px}.seo-sec>p{color:var(--muted);font-size:14px;line-height:1.65;margin:0 2px}.faq details{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin-bottom:8px}.faq summary{cursor:pointer;font-weight:600;font-size:14px}.faq details p{color:var(--muted);font-size:13px;line-height:1.6;margin:10px 0 0}`;

function chainPage(chain, deals) {
  const list = dealsFor(chain.name, deals);
  const title = `${chain.name} Deals & App Offers — ${monthYear} (Updated Daily)`;
  const desc = list.length
    ? `${list.length} verified ${chain.name} deal${list.length > 1 ? "s" : ""} today: ${list.slice(0, 2).map(d => d.deal).join("; ")}. Checked ${prettyDate}.`
    : `Current ${chain.name} app deals and rewards offers, checked daily. See today's verified fast-food deals from all major chains.`;
  const body = list.length
    ? `<div class="grid">${list.map(dealCard).join("\n")}</div>`
    : `<div class="empty">No verified ${esc(chain.name)} deals passed our checks today. That usually means nothing solid is running right now &mdash; check back tomorrow, or browse <a style="color:var(--accent2)" href="/">all of today&#39;s deals</a>.</div>`;
  const pageUrl = `${SITE}/${chain.slug}`;

  // FAQ content is rendered visibly below AND emitted as FAQPage JSON-LD —
  // Google requires the markup to match on-page content.
  const dealSummary = list.slice(0, 5).map(d => d.deal).join("; ");
  const faqs = [
    {
      q: `What ${chain.name} deals are available today?`,
      a: list.length
        ? `As of ${prettyDate}, we've verified ${list.length} ${chain.name} deal${list.length > 1 ? "s" : ""}: ${dealSummary}${list.length > 5 ? "; and more" : ""}. See the full details above.`
        : `No ${chain.name} deals passed our verification on ${prettyDate}. ${chain.name} promotions come and go quickly — this page is re-checked every morning, so check back tomorrow.`,
    },
    {
      q: `How do I claim ${chain.name} deals?`,
      a: `Most current ${chain.name} offers are redeemed through ${chain.program}. Download the app, sign in, add the offer to your order before checkout, and redeem at a participating location. Offers can vary by region and are subject to the chain's terms.`,
    },
    {
      q: `How often is this ${chain.name} deals page updated?`,
      a: `Every morning. Each deal is re-checked daily against official sources, and expired or unverifiable offers are removed. This page was last updated on ${prettyDate}.`,
    },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        "url": pageUrl,
        "name": title,
        "description": desc,
        "dateModified": iso,
        "isPartOf": { "@id": `${SITE}/#website` },
      },
      breadcrumbLd(`${chain.name} Deals`, pageUrl),
      ...(list.length ? [{
        "@type": "ItemList",
        "name": `${chain.name} deals for ${prettyDate}`,
        "numberOfItems": list.length,
        "itemListElement": list.map((d, i) => ({
          "@type": "ListItem", "position": i + 1, "item": offerLd(d),
        })),
      }] : []),
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  const aboutSec = `<section class="seo-sec"><h2>About ${esc(chain.name)} deals</h2><p>${esc(chain.about)}</p></section>`;
  const faqSec = `<section class="seo-sec faq"><h2>${esc(chain.name)} deals &mdash; FAQ</h2>
${faqs.map(f => `  <details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("\n")}
</section>`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-T733JQ04GP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-T733JQ04GP');
</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}/${chain.slug}">
<meta property="og:site_name" content="DailyBite">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/${chain.slug}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#0f1115">
<meta property="og:image" content="https://dailybitedeals.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>${CHAIN_CSS}</style>
</head>
<body>
<header><div class="logo"><a href="/"><img src="/icon-192.png" alt="DailyBite logo" width="30" height="30">Daily<span>Bite</span></a></div></header>
<div class="wrap">
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>${esc(chain.name)} Deals &amp; App Offers &mdash; ${esc(monthYear)}</h1>
  <p class="tag">Today&#39;s verified ${esc(chain.name)} in-app and rewards deals, re-checked every morning against official sources.</p>
  ${body}
  ${aboutSec}
  ${faqSec}
  <div class="note"><strong>Disclosure.</strong> Some links on this page are affiliate links &mdash; DailyBite may earn a commission at no extra cost to you.</div>
  <nav class="chains"><strong>Deals by restaurant:</strong> ${chainNav(chain.slug)} &middot; <a href="/">All deals</a></nav>
</div>
<footer>DailyBite is updated daily and is not affiliated with ${esc(chain.name)}. Some links may be affiliate links. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">📷 Instagram</a></footer>
</body>
</html>`;
}

const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

// Unique evergreen intro per day page — keeps each URL from being a pure
// template swap of the others.
const DAY_INTROS = {
  monday: "Monday is reset day: several chains kick off their recurring weekly app specials at the start of the week, making it a surprisingly good day for add-on deals and cheap combos.",
  tuesday: "Tuesday is one of the busiest days of the week for recurring fast-food promotions — a tradition that started with taco specials and has spread to pizza, chicken, and burger chains alike.",
  wednesday: "Midweek is a sweet spot for app-only offers: chains often schedule Wednesday bundles and coffee deals to pull traffic into the slowest stretch of the week.",
  thursday: "Several chains run recurring Thursday specials, often app-exclusive and limited to afternoon or evening hours — worth checking before you plan dinner.",
  friday: "Friday is the strongest recurring-deal day in fast food, anchored by long-running weekly app perks and weekend-kickoff promotions.",
  saturday: "Weekend deals lean toward family bundles, delivery promotions, and limited-time offers that chains launch to capture Saturday traffic.",
  sunday: "Sunday favors family-size bundles and delivery offers, and it's the last call for many week-long promotions that expire before Monday.",
};

function dayPage(day, deals) {
  const cap = day[0].toUpperCase() + day.slice(1);
  const rx = new RegExp(day, "i");
  const todays = deals.filter(d => rx.test(d.expires || "") || rx.test(d.deal || ""));
  const everyday = deals.filter(d => !todays.includes(d) && /ongoing|every day|daily/i.test(d.expires || "")).slice(0, 6);
  const title = `${cap} Food Deals & Freebies — Updated Daily`;
  const desc = todays.length
    ? `${todays.length} verified ${cap} food deal${todays.length > 1 ? "s" : ""}: ${todays.slice(0, 2).map(d => d.deal).join("; ")}. Plus everyday deals — checked ${prettyDate}.`
    : `The best verified food deals available on ${cap}s, updated every morning. Checked ${prettyDate}.`;
  const sec1 = todays.length ? `<h2 style="font-size:19px;margin:20px 2px 8px">Deals that repeat every ${cap}</h2><div class="grid">${todays.map(dealCard).join("\n")}</div>` : "";
  const sec2 = everyday.length ? `<h2 style="font-size:19px;margin:24px 2px 8px">Great any day of the week</h2><div class="grid">${everyday.map(dealCard).join("\n")}</div>` : "";
  const body = (sec1 + sec2) || `<div class="empty">No ${cap}-specific deals verified today — check the <a href="/" style="color:var(--accent2)">full list</a>.</div>`;
  const dayNav = DAYS.map(x => x === day ? `<strong>${x[0].toUpperCase()+x.slice(1)}</strong>` : `<a href="/${x}-food-deals">${x[0].toUpperCase()+x.slice(1)}</a>`).join(" &middot; ");
  const pageUrl = `${SITE}/${day}-food-deals`;
  const listed = [...todays, ...everyday];
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        "url": pageUrl,
        "name": title,
        "description": desc,
        "dateModified": iso,
        "isPartOf": { "@id": `${SITE}/#website` },
      },
      breadcrumbLd(`${cap} Food Deals`, pageUrl),
      ...(listed.length ? [{
        "@type": "ItemList",
        "name": `${cap} food deals for ${prettyDate}`,
        "numberOfItems": listed.length,
        "itemListElement": listed.map((d, i) => ({
          "@type": "ListItem", "position": i + 1, "item": offerLd(d),
        })),
      }] : []),
    ],
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-T733JQ04GP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-T733JQ04GP');
</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}/${day}-food-deals">
<meta property="og:site_name" content="DailyBite">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/${day}-food-deals">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#0f1115">
<meta property="og:image" content="https://dailybitedeals.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>${CHAIN_CSS}</style>
</head>
<body>
<header><div class="logo"><a href="/"><img src="/icon-192.png" alt="DailyBite logo" width="30" height="30">Daily<span>Bite</span></a></div></header>
<div class="wrap">
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>${esc(cap)} Food Deals &amp; Freebies</h1>
  <p class="tag">${esc(DAY_INTROS[day])} Every deal below is verified each morning against official sources.</p>
  ${body}
  <div class="note"><strong>Disclosure.</strong> Some links on this page are affiliate links &mdash; DailyBite may earn a commission at no extra cost to you.</div>
  <nav class="chains"><strong>Deals by day:</strong> ${dayNav} &middot; <a href="/">All deals</a></nav>
</div>
<footer>DailyBite is updated daily. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">📷 Instagram</a></footer>
</body>
</html>`;
}

function main() {
  const data = JSON.parse(readFileSync(join(root, "deals.json"), "utf8"));
  const deals = Array.isArray(data) ? data : data.deals;
  if (!Array.isArray(deals) || deals.length === 0) {
    throw new Error("deals.json has no deals array — refusing to build an empty page.");
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
    const t = parseExpiry(d.expires);
    if (t !== null) {
      const diff = (t - now) / 86400000;
      if (diff >= -0.5 && diff <= 2) d.endingSoon = true;
    }
  }

  // 1. Homepage injection
  const htmlPath = join(root, "index.html");
  const html = readFileSync(htmlPath, "utf8");
  const START = "/* DEALS:START */", END = "/* DEALS:END */";
  const s = html.indexOf(START), e = html.indexOf(END);
  if (s === -1 || e === -1 || e < s) throw new Error("DEALS markers missing in index.html");
  writeFileSync(htmlPath, html.slice(0, s) + `${START}\nconst DEALS = ${JSON.stringify(deals, null, 2)};\nconst META = ${JSON.stringify({ verifiedAt: new Date().toISOString() })};\n${END}` + html.slice(e + END.length));
  console.log(`Built index.html with ${deals.length} deals.`);

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

  // 3. Sitemap
  const urls = [`${SITE}/`, `${SITE}/about`, `${SITE}/privacy`, ...CHAINS.map(c => `${SITE}/${c.slug}`), ...DAYS.map(d => `${SITE}/${d}-food-deals`)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u}</loc><lastmod>${iso}</lastmod><changefreq>daily</changefreq></url>`).join("\n") +
    `\n</urlset>\n`;
  writeFileSync(join(root, "sitemap.xml"), sitemap);
  console.log("Built sitemap.xml.");
}

main();
