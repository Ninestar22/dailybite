// IndexNow (added 2026-09-08): tells Bing, DuckDuckGo, Yandex and other IndexNow engines
// which URLs changed, the moment the daily build lands. Bing matters more than it looks:
// it powers ChatGPT search and Copilot, which sent the site more visitors than Google in
// the first 30 days. The key file (<key>.txt) sits at the site root; one POST covers up
// to 10,000 URLs. Failures are logged, never fatal.
//
//   node scripts/indexnow.mjs            # submit the sitemap URLs whose <lastmod> is today
//   node scripts/indexnow.mjs /a /b      # submit specific paths
//   INDEXNOW_ALL=1 node scripts/indexnow.mjs   # submit every sitemap URL (first run, re-key)
//
// Only-changed submission (2026-09-26): sitemap.xml now carries an honest per-page lastmod
// (see build.mjs), so this submits just the pages whose content changed in today's build.
// Re-submitting 60+ unchanged URLs every morning is the pattern IndexNow's guidelines ask
// engines to down-weight; a short, accurate list keeps the signal trusted.

import { readFileSync, existsSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "dailybitedeals.com";
const KEY = "c4f1e9a7b2d84c6f9e3a1b5d7f0c2e8a";

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map(p => `https://${HOST}${p.startsWith("/") ? p : "/" + p}`);
} else {
  const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
  // "Recent" = lastmod within the last 2 days (the build can run a day after a merge lands,
  // and a late or skipped run must not strand a changed page). A one-off full submission:
  // commit an empty .indexnow-all file; this run submits everything and deletes the marker.
  const dayMs = 86400000, now = Date.now();
  const recent = d => now - Date.parse(d + "T12:00:00Z") <= 2 * dayMs;
  // build.mjs consumes the committed .indexnow-all marker and leaves this untracked flag.
  const flagPath = join(root, ".indexnow-force");
  const forceAll = !!process.env.INDEXNOW_ALL || existsSync(flagPath);
  if (existsSync(flagPath)) { try { unlinkSync(flagPath); console.log("IndexNow: full submission flag consumed."); } catch {} }
  const all = [...sitemap.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)];
  urls = all.filter(m => forceAll || recent(m[2])).map(m => m[1]);
  console.log(`IndexNow: ${all.length} sitemap URLs, ${urls.length} ${forceAll ? "submitted (all)" : "changed in the last 2 days"}.`);
}
if (!urls.length) { console.log("IndexNow: nothing changed recently; nothing to submit."); process.exit(0); }

const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls };
try {
  const res = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify(body) });
  // 200 = accepted, 202 = accepted (key validation pending). 4xx = a real problem.
  console.log(`IndexNow: submitted ${urls.length} URL(s): HTTP ${res.status} ${res.statusText}`);
  if (res.status >= 400) console.log(await res.text());
} catch (e) {
  console.log(`IndexNow: submission failed (non-fatal): ${e.message || e}`);
}
