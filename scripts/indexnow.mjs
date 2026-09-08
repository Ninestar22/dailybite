// IndexNow (added 2026-09-08): tells Bing, DuckDuckGo, Yandex and other IndexNow engines
// which URLs changed, the moment the daily build lands. Bing matters more than it looks:
// it powers ChatGPT search and Copilot, which sent the site more visitors than Google in
// the first 30 days. The key file (<key>.txt) sits at the site root; one POST covers up
// to 10,000 URLs. Failures are logged, never fatal.
//
//   node scripts/indexnow.mjs            # submit every URL in sitemap.xml
//   node scripts/indexnow.mjs /a /b      # submit specific paths

import { readFileSync } from "node:fs";
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
  urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
}
if (!urls.length) { console.log("IndexNow: nothing to submit."); process.exit(0); }

const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls };
try {
  const res = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify(body) });
  // 200 = accepted, 202 = accepted (key validation pending). 4xx = a real problem.
  console.log(`IndexNow: submitted ${urls.length} URL(s): HTTP ${res.status} ${res.statusText}`);
  if (res.status >= 400) console.log(await res.text());
} catch (e) {
  console.log(`IndexNow: submission failed (non-fatal): ${e.message || e}`);
}
