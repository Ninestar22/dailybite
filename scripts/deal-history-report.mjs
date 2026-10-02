// Deal-history report generator (2026-10-02).
// Reads one deals.json snapshot per calendar day from the git history (the last commit of
// each day) and writes two static files at the repo root:
//   report-data.json                   the numbers the /healthy-food-deals-report page shows
//   healthy-food-deals-dataset.csv     every daily listing, one row each (the open dataset)
// Run by hand when a new edition is wanted (the page is a dated snapshot, not a live view):
//   node scripts/deal-history-report.mjs 2026-08-10 2026-10-02
// Nothing here calls the network or an API. Numbers describe what the daily check FOUND and
// VERIFIED under the site's rules; they are not a census of every promotion that existed.
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sh = c => execSync(c, { cwd: root, encoding: "utf8", maxBuffer: 1 << 28 });
const START = process.argv[2] || "2026-08-10";
const END = process.argv[3] || "9999-12-31";

// One name per chain: the refresh has spelled a few brands more than one way.
const CANON = { "panera": "Panera Bread", "noodles and company": "Noodles & Company", "chilis": "Chili's", "sprouts": "Sprouts Farmers Market", "rubio's": "Rubio's Coastal Grill", "waba grill": "WaBa Grill", "halal guys": "The Halal Guys", "lowe's foods": "Lowes Foods" };
const canon = b => { const t = String(b || "").replace(/’/g, "'").trim(); return CANON[t.toLowerCase()] || t; };
const GROCERY = new Set(["Publix", "Sprouts Farmers Market", "Kroger", "Safeway", "Harris Teeter", "H-E-B", "Hy-Vee", "Meijer", "ShopRite", "Stop & Shop", "Food Lion", "Weis Markets", "Lowes Foods", "Hannaford", "Dierbergs", "Giant Food", "Giant Eagle", "Wegmans", "Walmart", "Whole Foods Market", "Albertsons", "Fresh Thyme"]);
const WD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const wdOf = d => WD[new Date(d + "T12:00:00Z").getUTCDay()];
const med = a => { const s = [...a].sort((x, y) => x - y); return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : null; };
const pct = (n, d) => d ? Math.round(1000 * n / d) / 10 : 0;

const byDay = new Map(); // git log is newest first, so the first hash seen for a date is that day's last commit
for (const l of sh(`git log --format="%H %ad" --date=short -- deals.json`).trim().split("\n")) {
  const [h, d] = l.split(" ");
  if (!byDay.has(d)) byDay.set(d, h);
}
const snaps = [];
for (const [d, h] of [...byDay.entries()].filter(([d]) => d >= START && d <= END).sort()) {
  try {
    const j = JSON.parse(sh(`git show ${h}:deals.json`));
    snaps.push({ d, deals: (Array.isArray(j) ? j : j.deals || []).map(x => ({ ...x, brand: canon(x.brand) })) });
  } catch { /* a day whose file does not parse is skipped, not guessed */ }
}

const rows = [], brandDays = {}, wdTotals = {}, sushi = {};
let free = 0, account = 0, grocery = 0, regional = 0, standing = 0, weekly = 0, dated = 0;
const savings = [];
for (const s of snaps) {
  const wd = wdOf(s.d);
  (wdTotals[wd] ||= []).push(s.deals.length);
  const seen = new Set();
  for (const x of s.deals) {
    if (!seen.has(x.brand)) { seen.add(x.brand); brandDays[x.brand] = (brandDays[x.brand] || 0) + 1; }
    const isFree = (x.tags || []).includes("free");
    const needsAccount = (x.tags || []).includes("app") || /free account|rewards member|perks member|free .{0,20}card/i.test(x.desc || "");
    const isGrocery = GROCERY.has(x.brand);
    const ex = String(x.expires || "");
    const kind = /ongoing|every ?day/i.test(ex) ? "standing" : /days only|today only/i.test(ex) ? "weekly-day" : "dated";
    if (isFree) free++;
    if (needsAccount) account++;
    if (isGrocery) grocery++;
    if (x.region && !/national/i.test(x.region)) regional++;
    if (kind === "standing") standing++; else if (kind === "weekly-day") weekly++; else dated++;
    if (Number.isFinite(x.est_savings) && x.est_savings > 0) savings.push(x.est_savings);
    if (isGrocery && /sushi/i.test(x.cat || "")) {
      const m = String(x.deal || "").match(/\$\s?(\d+(?:\.\d{2})?)/);
      if (m) { const k = x.brand + "|" + wd; (sushi[k] ||= { prices: new Set(), days: 0 }); sushi[k].prices.add(Number(m[1])); sushi[k].days++; }
    }
    rows.push([s.d, wd, x.brand, x.deal, x.cat || "", x.region || "National", ex, Number.isFinite(x.est_savings) ? x.est_savings : "", isFree ? "yes" : "no", needsAccount ? "yes" : "no", kind, x.url || ""]);
  }
}
const listings = rows.length;
const data = {
  edition: `${snaps[0].d} to ${snaps[snaps.length - 1].d}`,
  start: snaps[0].d, end: snaps[snaps.length - 1].d,
  generated: new Date().toISOString().slice(0, 10),
  days: snaps.length, listings, chains: Object.keys(brandDays).length,
  perDay: { average: Math.round(10 * listings / snaps.length) / 10, median: med(snaps.map(s => s.deals.length)), min: Math.min(...snaps.map(s => s.deals.length)), max: Math.max(...snaps.map(s => s.deals.length)) },
  byWeekday: WD.map(w => ({ day: w, average: wdTotals[w] ? Math.round(10 * wdTotals[w].reduce((a, b) => a + b, 0) / wdTotals[w].length) / 10 : null })),
  shares: { free: pct(free, listings), needsFreeAccount: pct(account, listings), grocery: pct(grocery, listings), regional: pct(regional, listings), standing: pct(standing, listings), weeklyDay: pct(weekly, listings), dated: pct(dated, listings) },
  medianStatedSaving: med(savings), listingsWithSaving: savings.length,
  chainDays: Object.entries(brandDays).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([chain, days]) => ({ chain, days })),
  sushi: Object.entries(sushi).map(([k, v]) => { const [chain, day] = k.split("|"); const p = [...v.prices].sort((a, b) => a - b); return { chain, day, low: p[0], high: p[p.length - 1], daysSeen: v.days }; }).sort((a, b) => WD.indexOf(a.day) - WD.indexOf(b.day) || a.low - b.low || a.chain.localeCompare(b.chain)),
};
writeFileSync(join(root, "report-data.json"), JSON.stringify(data, null, 2) + "\n");
const q = v => { const t = String(v ?? ""); return /[",\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t; };
writeFileSync(join(root, "healthy-food-deals-dataset.csv"), ["date,weekday,chain,deal,category,region,expires,est_savings_usd,free,needs_free_account,kind,source_url", ...rows.map(r => r.map(q).join(","))].join("\n") + "\n");
console.log(`Report data: ${data.days} days, ${listings} listings, ${data.chains} chains (${data.edition}).`);
console.log(`Wrote report-data.json and healthy-food-deals-dataset.csv (${rows.length} rows).`);
