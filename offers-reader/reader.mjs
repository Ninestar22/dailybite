// Offers reader (owner decision, 2026-10-16: "Build option A with those five accounts").
//
// Healthy chains load their real promotions into rewards accounts and announce them in the
// app; the same offers show on the chain's WEBSITE once the account is signed in. This script
// runs on the owner's PC (residential IP, real Google Chrome, a persistent profile in which the
// owner signed in once by hand), opens each account's offers page, keeps the offer-like lines,
// writes offers-pack.json at the repo root and pushes it. The morning refresh reads that file
// as an OFFERS PACK next to the inbox and leads packs. No passwords are stored anywhere: the
// Chrome profile holds the sessions, and a site that logs the account out shows up in the log
// as "not signed in" until `npm run login -- <site>` is run again.
//
//   npm run login -- safeway      opens a visible Chrome on that site's sign-in page; sign in,
//                                 then press Enter in this window. Sessions persist in ./profile.
//   npm run read                  reads every site, writes ../offers-pack.json, commits and pushes
//                                 (scheduled daily at 6:40 AM by run.cmd via Task Scheduler).
//   npm run read -- --no-push     same without the git step (for testing).
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";
import { createInterface } from "node:readline";

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, "..");
const profileDir = join(here, "profile");
const outPath = join(repo, "offers-pack.json");

// Each site: where the offers live once signed in, where to sign in, and how to tell the two
// apart. `loggedOutUrl` matches the URL a signed-out visit lands on; `loggedInText` matches
// something only a signed-in page shows. Either signal is enough to decide.
export const SITES = [
  { key: "safeway", name: "Safeway for U", url: "https://www.safeway.com/foru/coupons-deals.html", login: "https://www.safeway.com/account/sign-in.html",
    loggedOutUrl: /sign-in|signin|login/i, loggedInText: /\b(clip|clipped|my list|sign out)\b/i },
  { key: "giant", name: "Giant Food (Flexible Rewards)", url: "https://giantfood.com/savings/coupons/browse", login: "https://giantfood.com/login",
    loggedOutUrl: /login|sign-?in/i, loggedInText: /\b(load to card|loaded|clipped|my account|sign out)\b/i },
  { key: "harristeeter", name: "Harris Teeter (e-VIC coupons)", url: "https://www.harristeeter.com/savings/cl/coupons/", login: "https://www.harristeeter.com/signin",
    loggedOutUrl: /signin|sign-in|login/i, loggedInText: /\b(clip|clipped|my coupons|sign out)\b/i },
  // Probed 2026-10-16: /account/offers is a 404; /account/rewards is the signed-in home and bounces to auth.starbucks.com when signed out.
  { key: "starbucks", name: "Starbucks Rewards offers", url: "https://www.starbucks.com/account/rewards", login: "https://www.starbucks.com/account/signin",
    loggedOutUrl: /auth\.starbucks\.com|signin|sign-in|login/i, loggedInText: /\b(stars|your offers|sign out)\b/i },
  // Probed 2026-10-16: /account/login is a 404; sign in from the "SIGN IN / JOIN" link on the rewards page.
  { key: "chipotle", name: "Chipotle Rewards", url: "https://www.chipotle.com/rewards", login: "https://www.chipotle.com/rewards",
    loggedOutUrl: /login|sign-?in/i, loggedInText: /\b(points|your rewards|sign out|my account)\b/i },
];

// Same filter as the source pack: a line earns its place with a price, a percent, a date or
// deal wording. Kept in step with scripts/source-pack.mjs by hand.
const OFFER_LINE = /\$\s?\d|\d+\s?%|\b20(?:26|27)\b|\b(?:january|february|march|april|may|june|july|august|september|october|november|december)\b|\b(free|bogo|deal|deals|offer|offers|promo|promotion|code|special|specials|limited[- ]time|reward|rewards|coupon|coupons|clip|save|off|expires?|through|thru|ends?)\b/i;
const PER_SITE_CHARS = 3000, PER_LINE_CHARS = 200, SETTLE_MS = 4000;

function condenseText(text) {
  const seen = new Set(), keep = [];
  for (const raw of String(text).split(/\n+/)) {
    const line = raw.replace(/\s+/g, " ").trim();
    if (line.length < 8 || seen.has(line) || !OFFER_LINE.test(line)) continue;
    seen.add(line);
    keep.push(line.length > PER_LINE_CHARS ? line.slice(0, PER_LINE_CHARS) + "…" : line);
  }
  let out = keep.join("\n");
  return out.length > PER_SITE_CHARS ? out.slice(0, PER_SITE_CHARS) + "…" : out;
}

async function launch(headless) {
  mkdirSync(profileDir, { recursive: true });
  return chromium.launchPersistentContext(profileDir, {
    channel: "chrome", headless, viewport: { width: 1280, height: 900 },
    args: ["--disable-blink-features=AutomationControlled"],
  });
}

async function readSite(ctx, site) {
  const page = await ctx.newPage();
  const t0 = Date.now();
  try {
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(SETTLE_MS);
    // Lazy lists render on scroll.
    for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 1500); await page.waitForTimeout(600); }
    const url = page.url();
    const text = await page.evaluate(() => document.body ? document.body.innerText : "");
    const blocked = /access denied|request blocked|verify you are human|unusual traffic|pardon our interruption/i.test(text.slice(0, 4000));
    // Signed in = not bounced to a sign-in or guest page AND the page shows an account marker.
    // The account's first name is the most reliable marker across chains ("Hi, Jacob"); the
    // 2026-10-16 test run proved page length is not (guest coupon pages are long too).
    const ACCOUNT = /\bjacob\b|\bsign out\b|\blog out\b|\blogout\b/i;
    const loggedIn = !site.loggedOutUrl.test(url) && !/guest/i.test(url) && (ACCOUNT.test(text) || site.loggedInText.test(text)) && ACCOUNT.test(text);
    if (process.argv.includes("--debug")) writeFileSync(join(here, `debug-${site.key}.txt`), `${url}\n\n${text}`);
    const kept = condenseText(text);
    return { key: site.key, name: site.name, url, loggedIn, blocked, chars: text.length, kept: kept.length, text: loggedIn && !blocked ? kept : "", ms: Date.now() - t0 };
  } catch (e) {
    return { key: site.key, name: site.name, url: site.url, loggedIn: false, blocked: false, error: String(e && e.message || e).slice(0, 160), text: "", ms: Date.now() - t0 };
  } finally { await page.close().catch(() => {}); }
}

async function loginMode(key) {
  const site = SITES.find(s => s.key === key);
  if (!site) { console.error(`Unknown site "${key}". Sites: ${SITES.map(s => s.key).join(", ")}`); process.exit(1); }
  const ctx = await launch(false);
  const page = await ctx.newPage();
  await page.goto(site.login, { waitUntil: "domcontentloaded", timeout: 45000 }).catch(() => {});
  console.log(`\nA Chrome window is open on ${site.name}. Sign in there with the deals mailbox account.`);
  console.log("When the account page shows you are signed in, come back here and press Enter.");
  await new Promise(res => createInterface({ input: process.stdin, output: process.stdout }).question("", () => res()));
  await page.close().catch(() => {});
  const r = await readSite(ctx, site);
  await ctx.close();
  console.log(r.loggedIn ? `Signed in: ${site.name} read ${r.kept} chars of offers. The session is saved in the profile.` : `Still not signed in on ${site.name} (landed on ${r.url}). Run the login step again.`);
}

async function readMode(push) {
  const ctx = await launch(false);
  const sites = [];
  for (const s of SITES) { const r = await readSite(ctx, s); sites.push(r); console.log(`${r.loggedIn ? "ok " : "OUT"} ${r.blocked ? "BLOCKED " : ""}${s.name}: ${r.kept || 0} chars kept of ${r.chars || 0}${r.error ? " (" + r.error + ")" : ""} in ${(r.ms / 1000).toFixed(1)}s`); }
  await ctx.close();
  const out = { fetchedAt: new Date().toISOString(), host: "owner PC", sites: sites.map(s => ({ key: s.key, name: s.name, url: s.url, loggedIn: s.loggedIn, blocked: s.blocked, error: s.error, text: s.text })) };
  writeFileSync(outPath, JSON.stringify(out, null, 1) + "\n");
  const ok = sites.filter(s => s.text).length;
  console.log(`Wrote offers-pack.json: ${ok} of ${sites.length} sites signed in and read.`);
  if (!push) return;
  const git = cmd => execSync(`git ${cmd}`, { cwd: repo, stdio: "pipe" }).toString().trim();
  try {
    git("pull --rebase --autostash origin main");
    git("add offers-pack.json");
    if (git("status --porcelain offers-pack.json")) {
      git(`commit -m "chore: offers pack (${new Date().toLocaleString("en-US", { timeZone: "America/New_York", hour12: false })} ET)"`);
      git("push origin main");
      console.log("Pushed offers-pack.json.");
    } else console.log("offers-pack.json unchanged: nothing to push.");
  } catch (e) { console.error("git step failed:", String(e.stderr || e.message || e).slice(0, 400)); process.exitCode = 1; }
}

const args = process.argv.slice(2);
if (args[0] === "--login") await loginMode(args[1]);
else await readMode(!args.includes("--no-push"));
