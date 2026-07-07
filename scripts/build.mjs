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
const CHAINS = [
  { slug: "mcdonalds-deals",   name: "McDonald's" },
  { slug: "taco-bell-deals",   name: "Taco Bell" },
  { slug: "wendys-deals",      name: "Wendy's" },
  { slug: "burger-king-deals", name: "Burger King" },
  { slug: "chipotle-deals",    name: "Chipotle" },
  { slug: "chick-fil-a-deals", name: "Chick-fil-A" },
  { slug: "starbucks-deals",   name: "Starbucks" },
  { slug: "panera-deals",      name: "Panera" },
  { slug: "pizza-hut-deals",   name: "Pizza Hut" },
  { slug: "popeyes-deals",     name: "Popeyes" },
  { slug: "dunkin-deals",      name: "Dunkin'" },
  { slug: "sonic-deals",       name: "Sonic" },
  { slug: "arbys-deals",       name: "Arby's" },
  { slug: "kfc-deals",         name: "KFC" },
  { slug: "dominos-deals",     name: "Domino's" },
  { slug: "subway-deals",      name: "Subway" },
  { slug: "sweetgreen-deals",  name: "Sweetgreen" },
  { slug: "cava-deals",        name: "CAVA" },
  { slug: "smoothie-king-deals", name: "Smoothie King" },
  { slug: "tropical-smoothie-deals", name: "Tropical Smoothie" },
  { slug: "jamba-deals",       name: "Jamba" },
  { slug: "salad-and-go-deals", name: "Salad and Go" },
  { slug: "el-pollo-loco-deals", name: "El Pollo Loco" },
  { slug: "halal-guys-deals",  name: "The Halal Guys" },
  { slug: "papa-johns-deals",  name: "Papa John's" },
  { slug: "einstein-bros-deals", name: "Einstein Bros." },
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
const monthYear = today.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const prettyDate = today.toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

function chainNav(current) {
  return CHAINS.map(c => c.slug === current
    ? `<strong>${esc(c.name)}</strong>`
    : `<a href="/${c.slug}">${esc(c.name)}</a>`).join(" &middot; ");
}

const BRAND_DOMAIN_OVERRIDES = {
  "chick-fil-a": "chick-fil-a.com",
  "dunkin": "dunkindonuts.com",
  "dunkin'": "dunkindonuts.com",
  "the halal guys": "thehalalguys.com",
  "einstein bros. bagels": "einsteinbros.com",
  "einstein bros.": "einsteinbros.com",
  "tropical smoothie": "tropicalsmoothiecafe.com",
  "sonic": "sonicdrivein.com",
};
function brandDomain(brand) {
  const key = String(brand).toLowerCase().trim();
  for (const k in BRAND_DOMAIN_OVERRIDES) { if (key === k || key.startsWith(k + " ") || k.startsWith(key)) return BRAND_DOMAIN_OVERRIDES[k]; }
  return key.replace(/['".,!]/g, "").replace(/[^a-z0-9]/g, "") + ".com";
}

function dealCard(d) {
  const tags = (d.tags || []).map(t =>
    `<span class="pill ${t === "free" ? "free" : "app"}">${t === "free" ? "FREE" : "APP ONLY"}</span>`).join("");
  return `<div class="card${d.best ? " best" : ""}">
  ${d.best ? `<div class="best-badge">&#9733; TOP PICK</div>` : ""}
  <div class="brandrow">
    <div class="brand-ic" style="background:${esc(d.color)}"><span>${esc(d.ic)}</span><img class="brand-logo" src="https://www.google.com/s2/favicons?domain=${brandDomain(d.brand)}&amp;sz=128" alt="${esc(d.brand)} logo" loading="lazy" onerror="this.remove()"></div>
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

const CHAIN_CSS = `:root{--bg:#0f1115;--card:#191c23;--card2:#20242d;--ink:#f4f5f7;--muted:#9aa3b2;--line:#2a2f3a;--accent:#ff5a3c;--accent2:#ffb020;--good:#2ec16b;--chip:#242935}*{box-sizing:border-box}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--ink)}header{padding:28px 20px 18px;text-align:center;background:radial-gradient(120% 100% at 50% 0%,rgba(255,90,60,.18),transparent 60%)}.logo{font-size:26px;font-weight:800}.logo a{display:inline-flex;align-items:center;gap:8px}.logo img{width:30px;height:30px}.logo a{color:var(--ink);text-decoration:none}.logo span{color:var(--accent)}.wrap{max-width:920px;margin:0 auto;padding:0 16px 60px}h1{font-size:24px;margin:18px 2px 6px}.tag{color:var(--muted);font-size:14px;margin:0 2px 14px}.date{display:inline-block;background:var(--chip);padding:6px 14px;border-radius:999px;font-size:13px;font-weight:600;margin-bottom:10px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:10px}@media(max-width:640px){.grid{grid-template-columns:1fr}}.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:10px;position:relative;overflow:hidden}.card.best{border-color:var(--accent2)}.best-badge{position:absolute;top:0;right:0;background:var(--accent2);color:#1a1200;font-size:11px;font-weight:800;padding:4px 10px;border-bottom-left-radius:10px}.brandrow{display:flex;align-items:center;gap:10px}.brand-ic{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;font-weight:800;font-size:15px;color:#fff;flex:0 0 auto}.brand-name{font-weight:700;font-size:15px}.brand-cat{color:var(--muted);font-size:12px}.deal{font-size:16px;font-weight:700;line-height:1.3}.desc{color:var(--muted);font-size:13px;line-height:1.45}.metarow{display:flex;flex-wrap:wrap;gap:6px}.pill{font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;background:var(--card2);color:var(--muted)}.pill.free{background:rgba(46,193,107,.15);color:var(--good)}.pill.app{background:rgba(255,176,32,.14);color:var(--accent2)}.pill.region{background:rgba(122,165,255,.15);color:#7aa5ff}.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:8px}.expires{font-size:12px;color:var(--muted)}.cta{background:var(--accent);color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:8px 12px;border-radius:9px;white-space:nowrap}.near{color:#7aa5ff;text-decoration:none;font-size:12px;font-weight:600;white-space:nowrap}.empty{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:24px;color:var(--muted);line-height:1.5}.note{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;margin-top:16px;color:var(--muted);font-size:13px;line-height:1.6}.chains{margin-top:22px;font-size:13px;color:var(--muted);line-height:2}.chains a{color:var(--accent2);text-decoration:none}footer{max-width:920px;margin:0 auto;padding:24px 16px 50px;color:var(--muted);font-size:12px;line-height:1.6}footer a{color:var(--accent2)}.brand-ic{position:relative;overflow:hidden}.brand-ic .brand-logo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:10px;background:#fff}`;

function chainPage(chain, deals) {
  const list = dealsFor(chain.name, deals);
  const title = `${chain.name} Deals & App Offers — ${monthYear} (Updated Daily)`;
  const desc = list.length
    ? `${list.length} verified ${chain.name} deal${list.length > 1 ? "s" : ""} today: ${list.slice(0, 2).map(d => d.deal).join("; ")}. Checked ${prettyDate}.`
    : `Current ${chain.name} app deals and rewards offers, checked daily. See today's verified fast-food deals from all major chains.`;
  const body = list.length
    ? `<div class="grid">${list.map(dealCard).join("\n")}</div>`
    : `<div class="empty">No verified ${esc(chain.name)} deals passed our checks today. That usually means nothing solid is running right now &mdash; check back tomorrow, or browse <a style="color:var(--accent2)" href="/">all of today&#39;s deals</a>.</div>
<h2 style="font-size:18px;margin:26px 2px 4px">Today&#39;s top deals from other chains</h2>
<div class="grid">${[...deals].filter(d => d.brand !== chain.name).sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, 6).map(dealCard).join("\n")}</div>`;
  const ld = {
    "@context": "https://schema.org", "@type": "ItemList",
    "name": `${chain.name} deals for ${prettyDate}`,
    "numberOfItems": list.length,
    "itemListElement": list.map((d, i) => ({
      "@type": "ListItem", "position": i + 1, "name": d.deal, "url": d.url
    }))
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
<link rel="canonical" href="${SITE}/${chain.slug}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/${chain.slug}">
<meta name="twitter:card" content="summary_large_image">
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
  <div class="note"><strong>Disclosure.</strong> Some links on this page are affiliate links &mdash; DailyBite may earn a commission at no extra cost to you.</div>
  <nav class="chains"><strong>Deals by restaurant:</strong> ${chainNav(chain.slug)} &middot; <a href="/">All deals</a></nav>
</div>
<footer>DailyBite is updated daily and is not affiliated with ${esc(chain.name)}. Some links may be affiliate links. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">📷 Instagram</a> &middot; <a href="https://www.pinterest.com/dailyb2026/" target="_blank" rel="noopener">📌 Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">🎵 TikTok</a></footer>
</body>
</html>`;
}

function freeFoodPage(deals) {
  const free = deals.filter(d => (d.tags || []).includes("free"));
  const rest = deals.filter(d => !(d.tags || []).includes("free")).sort((a, b) => b.value - a.value).slice(0, 8);
  const title = `Free Food Today \u2014 ${free.length} Verified Freebies & Deals (Updated ${prettyDate})`;
  const desc = free.length
    ? `${free.length} verified free food deals available today: ${free.slice(0, 2).map(d => d.deal).join("; ")}. Updated every morning \u2014 no signups, no points, no fine print.`
    : `Today's best verified food deals, updated every morning. No signups, no points, no fine print.`;
  const sec1 = free.length ? `<h2 style="font-size:19px;margin:20px 2px 8px">Free right now</h2><div class="grid">${free.map(dealCard).join("\n")}</div>` : "";
  const sec2 = rest.length ? `<h2 style="font-size:19px;margin:24px 2px 8px">Nearly free \u2014 today's best cheap deals</h2><div class="grid">${rest.map(dealCard).join("\n")}</div>` : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="max-image-preview:large">
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
<link rel="canonical" href="${SITE}/free-food-today">
<link rel="alternate" type="application/rss+xml" title="DailyBite Deals" href="${SITE}/feed.xml">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/free-food-today">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#0f1115">
<meta property="og:image" content="https://dailybitedeals.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<style>${CHAIN_CSS}</style>
</head>
<body>
<header><div class="logo"><a href="/"><img src="/icon-192.png" alt="DailyBite logo" width="30" height="30">Daily<span>Bite</span></a></div></header>
<div class="wrap">
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>Free Food Today</h1>
  <p class="tag">Every deal below is verified this morning and claimable by anyone on a single visit &mdash; no signups, no points, no fine print.</p>
  ${sec1}
  ${sec2}
  <div class="note"><strong>Disclosure.</strong> Some links on this page are affiliate links &mdash; DailyBite may earn a commission at no extra cost to you.</div>
  <nav class="chains"><strong>More:</strong> <a href="/">All of today&#39;s deals</a> &middot; ${DAYS.map(x => `<a href="/${x}-food-deals">${x[0].toUpperCase()+x.slice(1)}</a>`).join(" &middot; ")}</nav>
</div>
<footer>DailyBite is updated daily. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">\ud83d\udcf7 Instagram</a> &middot; <a href="https://www.pinterest.com/dailyb2026/" target="_blank" rel="noopener">📌 Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">🎵 TikTok</a></footer>
</body>
</html>`;
}

function rssFeed(deals) {
  const items = deals.map(d => `  <item>
    <title>${esc(d.brand)}: ${esc(d.deal)}</title>
    <link>${SITE}/</link>
    <guid isPermaLink="false">${esc(d.brand)}-${esc(d.deal).slice(0, 40)}-${iso}</guid>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <description>${esc(d.desc)} (${esc(d.expires)})</description>
  </item>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>DailyBite \u2014 Daily Food Deals</title>
  <link>${SITE}</link>
  <description>The best verified food deals, updated every morning.</description>
  <language>en-us</language>
${items}
</channel>
</rss>
`;
}

const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

// Food holidays: pages publish 21 days before the date and stay until 2 days after.
const HOLIDAYS = [
  { slug: "national-french-fry-day-deals", name: "National French Fry Day", date: "2026-07-13", emoji: "\u{1F35F}", kw: /fry|fries|frie/i,
    blurb: "Every year on July 13, chains across the country give away free or discounted fries — often no purchase required in their apps." },
  { slug: "national-ice-cream-day-deals", name: "National Ice Cream Day", date: "2026-07-19", emoji: "\u{1F366}", kw: /ice cream|cone|sundae|frosty|blizzard|milkshake|shake|slush/i,
    blurb: "The third Sunday of July brings free cones, cheap sundaes, and app-only frozen treat deals from national chains." },
  { slug: "national-cheeseburger-day-deals", name: "National Cheeseburger Day", date: "2026-09-18", emoji: "\u{1F354}", kw: /burger|whopper|cheeseburger/i,
    blurb: "September 18 is the biggest burger deal day of the year — expect free and $1 cheeseburgers in most major burger apps." },
];

function holidayPage(h, deals) {
  const matched = deals.filter(d => h.kw.test(d.deal + " " + d.desc));
  const rest = deals.filter(d => !matched.includes(d)).sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, 6);
  const dt = new Date(h.date + "T12:00:00");
  const pretty = dt.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const title = `${h.name} ${dt.getFullYear()} Deals & Freebies (${pretty})`;
  const desc = `${h.name} is ${pretty}. ${h.blurb} Verified deals list, updated every morning.`;
  const isDay = new Date().toDateString() === dt.toDateString();
  const matchedBlock = matched.length
    ? `<h2 style="font-size:18px;margin:26px 2px 4px">Deals live right now</h2><div class="grid">${matched.map(dealCard).join("\n")}</div>`
    : `<div class="empty">${isDay ? "We're re-checking deals throughout the morning — check back shortly." : `Chains usually announce their ${esc(h.name)} specials in the final days before ${esc(pretty)}. We re-check every morning and verified deals will appear here the moment they're live.`}</div>`;
  const ld = { "@context": "https://schema.org", "@type": "ItemList", "name": `${h.name} deals`, "numberOfItems": matched.length,
    "itemListElement": matched.map((d, i) => ({ "@type": "ListItem", "position": i + 1, "name": d.deal, "url": d.url })) };
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-T733JQ04GP"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-T733JQ04GP');</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="https://dailybitedeals.com/${h.slug}">
<link rel="icon" type="image/png" href="/favicon.png">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="https://dailybitedeals.com/og.png">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>${CHAIN_CSS}</style>
</head>
<body>
<header><div class="logo"><a href="/"><img src="/icon-192.png" alt="DailyBite logo">Daily<span>Bite</span></a></div></header>
<div class="wrap">
<span class="date">Updated ${prettyDate}</span>
<h1>${h.emoji} ${esc(h.name)} Deals &mdash; ${esc(pretty)}</h1>
<p class="tag">${esc(h.blurb)}</p>
${matchedBlock}
<h2 style="font-size:18px;margin:26px 2px 4px">More verified deals today</h2>
<div class="grid">${rest.map(dealCard).join("\n")}</div>
<div class="note">Bookmark this page &mdash; it re-checks and updates every morning through ${esc(pretty)}. For everything else, see <a style="color:var(--accent2)" href="/">all of today&#39;s deals</a>.</div>
<nav class="chains"><strong>More:</strong> <a href="/">All of today&#39;s deals</a> &middot; <a href="/free-food-today">Free Food Today</a></nav>
</div>
<footer>DailyBite is updated daily. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">\u{1F4F7} Instagram</a> &middot; <a href="https://www.pinterest.com/dailyb2026/" target="_blank" rel="noopener">\u{1F4CC} Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">\u{1F3B5} TikTok</a></footer>
</body>
</html>`;
}

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
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/${day}-food-deals">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#0f1115">
<meta property="og:image" content="https://dailybitedeals.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<style>${CHAIN_CSS}</style>
</head>
<body>
<header><div class="logo"><a href="/"><img src="/icon-192.png" alt="DailyBite logo" width="30" height="30">Daily<span>Bite</span></a></div></header>
<div class="wrap">
  <div class="date">Updated ${esc(prettyDate)}</div>
  <h1>${esc(cap)} Food Deals &amp; Freebies</h1>
  <p class="tag">Every deal below is verified each morning and claimable by anyone &mdash; no signups, no points, no fine print.</p>
  ${body}
  <div class="note"><strong>Disclosure.</strong> Some links on this page are affiliate links &mdash; DailyBite may earn a commission at no extra cost to you.</div>
  <nav class="chains"><strong>Deals by day:</strong> ${dayNav} &middot; <a href="/">All deals</a></nav>
</div>
<footer>DailyBite is updated daily. <a href="/about">About</a> &middot; <a href="/privacy">Privacy &amp; Disclosures</a> &middot; <a href="https://www.instagram.com/dailybitedeals" target="_blank" rel="noopener">📷 Instagram</a> &middot; <a href="https://www.pinterest.com/dailyb2026/" target="_blank" rel="noopener">📌 Pinterest</a> &middot; <a href="https://www.tiktok.com/@dailybitedeals" target="_blank" rel="noopener">🎵 TikTok</a></footer>
</body>
</html>`;
}

function main() {
  const data = JSON.parse(readFileSync(join(root, "deals.json"), "utf8"));
  let deals = Array.isArray(data) ? data : data.deals;
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
    const m = String(d.expires || "").match(/[A-Z][a-z]+\.? \d{1,2}(, ?\d{4})?/);
    if (m) {
      let ds = m[0].replace(".", "");
      if (!/\d{4}/.test(ds)) ds += ", " + new Date().getFullYear();
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
    for (const m of ex.matchAll(/[A-Z][a-z]+\.? \d{1,2}(, ?\d{4})?/g)) {
      let ds = m[0].replace(".", "");
      if (!/\d{4}/.test(ds)) ds += ", " + new Date().getFullYear();
      const t = Date.parse(ds);
      if (!isNaN(t) && (latest == null || t > latest)) latest = t;
    }
    if (latest == null) return true;
    return (latest - now) / 86400000 >= -1; // drop only after the end date's full day has passed
  });
  if (deals.length < beforeCount) console.log(`Excluded ${beforeCount - deals.length} expired deal(s).`);

  // Exclude deals locked behind PAID subscriptions/memberships (DashPass, Uber One, etc.).
  const beforeSub = deals.length;
  deals = deals.filter(d => !/dashpass|uber one|grubhub\+|paid member|subscription|subscriber/i.test(d.deal + " " + d.desc + " " + (d.expires || "")));

  // Exclude rewards-member-gated deals — every deal must be claimable with no membership of any kind.
  deals = deals.filter(d => !/rewards? member|loyalty member|perks member|members?[- ]only|member[- ]exclusive|exclusively (?:to|for) [^.]*members|refer a friend|join [^.]*rewards|rewards app member|unlock badges/i.test(d.deal + " " + d.desc + " " + (d.expires || "")));

  // Exclude recurring day-of-week / time-window deals ("Every Friday", "Whopper Wednesdays", happy hours).
  deals = deals.filter(d => !/every (?:mon|tues|wednes|thurs|fri|satur|sun)day|\b(?:mon|tues|wednes|thurs|fri|satur|sun)days\b|happy hour|every day \d|daily \d/i.test(d.deal + " " + d.desc + " " + (d.expires || "")));

  // Top Picks balance: max 1 "best" per brand, 4 max total; promote other brands if fewer than 3.
  {
    const seen = new Set();
    for (const d of deals) {
      if (!d.best) continue;
      const b = d.brand.toLowerCase();
      if (seen.has(b)) d.best = false; else seen.add(b);
    }
    let n = deals.filter(d => d.best).length;
    for (const d of deals) { if (d.best && n > 4) { d.best = false; n--; } }
    if (n < 3) {
      const cand = deals.filter(d => !d.best && !seen.has(d.brand.toLowerCase()))
        .sort((a, b) => (b.value || 0) - (a.value || 0));
      for (const d of cand) { if (n >= 3) break; d.best = true; seen.add(d.brand.toLowerCase()); n++; }
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

  // 2c. Free-food hub + RSS feed
  writeFileSync(join(root, "free-food-today.html"), freeFoodPage(deals));
  writeFileSync(join(root, "feed.xml"), rssFeed(deals));
  console.log("Built free-food-today.html and feed.xml.");

  // 3. Sitemap
  const urls = [`${SITE}/`, `${SITE}/about`, `${SITE}/privacy`, ...CHAINS.map(c => `${SITE}/${c.slug}`), ...DAYS.map(d => `${SITE}/${d}-food-deals`), `${SITE}/free-food-today`, ...activeHolidays.map(h => `${SITE}/${h.slug}`)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u}</loc><lastmod>${iso}</lastmod><changefreq>daily</changefreq></url>`).join("\n") +
    `\n</urlset>\n`;
  writeFileSync(join(root, "sitemap.xml"), sitemap);
  console.log("Built sitemap.xml.");
}

main();
