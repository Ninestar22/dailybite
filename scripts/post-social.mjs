// scripts/post-social.mjs
// Posts today's deal image (from scripts/social-image.mjs) to Pinterest and Instagram.
// Each platform runs only when its secrets are configured; a missing platform is
// skipped with a log line, so this is safe to ship before any tokens exist.
//
// Pinterest (uploads the image directly, no hosting needed):
//   PINTEREST_BOARD_ID                       required (default board)
//   PINTEREST_BOARDS                         optional JSON: {"<deal category>|evergreen": "<board id>"}
//   PINTEREST_ACCESS_TOKEN                   short-lived token, OR
//   PINTEREST_REFRESH_TOKEN + PINTEREST_APP_ID + PINTEREST_APP_SECRET
//                                            (the script exchanges the refresh token each run)
// Instagram (Meta fetches the image from the live site, so the daily commit must be
// pushed first; the workflow orders the steps that way):
//   IG_USER_ID + IG_ACCESS_TOKEN             required
//   IG_API_HOST                              optional: graph.facebook.com (default, for
//                                            FB-Page-linked setups) or graph.instagram.com
//                                            (for "Instagram API with Instagram Login" tokens)
// See SOCIAL.md for how to obtain each credential.
import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createHash } from "node:crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://dailybitedeals.com";
const meta = JSON.parse(readFileSync(join(root, "social", "meta.json"), "utf8"));

const sleep = ms => new Promise(r => setTimeout(r, ms));
let failures = 0;
// --pinterest-only (daily workflow, 2026-09-26): Instagram stays manual; only Pinterest runs.
const PINTEREST_ONLY = process.argv.includes("--pinterest-only");

async function pinterestToken() {
  if (process.env.PINTEREST_ACCESS_TOKEN) return process.env.PINTEREST_ACCESS_TOKEN;
  const { PINTEREST_REFRESH_TOKEN: rt, PINTEREST_APP_ID: id, PINTEREST_APP_SECRET: secret } = process.env;
  if (!rt || !id || !secret) return null;
  const res = await fetch("https://api.pinterest.com/v5/oauth/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: rt }),
  });
  if (!res.ok) throw new Error(`Pinterest token refresh failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  return (await res.json()).access_token;
}

// Board routing: PINTEREST_BOARDS (optional JSON secret) maps a deal category or the word
// "evergreen" to a board id, e.g. {"Sushi":"123","Smoothies":"456","evergreen":"789"};
// anything unmapped, and everything when the secret is absent, goes to PINTEREST_BOARD_ID.
function boardFor(key) {
  let map = {};
  try { map = JSON.parse(process.env.PINTEREST_BOARDS || "{}"); } catch {}
  const k = Object.keys(map).find(x => x.toLowerCase() === String(key || "").toLowerCase());
  return (k && map[k]) || process.env.PINTEREST_BOARD_ID;
}

async function postPinterest() {
  const token = await pinterestToken().catch(e => { console.error(e.message); failures++; return null; });
  if (!process.env.PINTEREST_BOARD_ID || !token) { console.log("Pinterest: credentials not configured, skipping."); return; }
  const auth = { Authorization: `Bearer ${token}` };
  // Pin set from social-image.mjs (deal pins linking to chain pages + one evergreen pin);
  // falls back to the single summary pin for an older meta.json.
  const pins = Array.isArray(meta.pins) && meta.pins.length ? meta.pins
    : [{ file: "pin.png", link: SITE + "/", board: "", title: meta.pinTitle, description: meta.pinDescription, alt: `DailyBite: today's verified healthy food deals for ${meta.date}` }];
  // Once per day, whatever fires the workflow: the daily job has retry slots and manual
  // runs, so read each board's newest pins and skip titles already posted today.
  const seen = new Map();
  async function existing(board) {
    if (seen.has(board)) return seen.get(board);
    let titles = new Set();
    try {
      const list = await fetch(`https://api.pinterest.com/v5/boards/${board}/pins?page_size=25`, { headers: auth });
      if (list.ok) titles = new Set(((await list.json()).items || []).map(p => p.title));
      else console.log(`Pinterest: could not list board ${board} pins (${list.status}); posting anyway.`);
    } catch (e) { console.log(`Pinterest: pin list check failed (${e.message}); posting anyway.`); }
    seen.set(board, titles);
    return titles;
  }
  let posted = 0;
  for (const pin of pins.slice(0, 6)) {                       // hard cap: 6 pins/day, well under spam heuristics
    const board = boardFor(pin.board);
    if ((await existing(board)).has(pin.title)) { console.log(`Pinterest: already pinned today: "${pin.title}"`); continue; }
    let image;
    try { image = readFileSync(join(root, "social", pin.file)).toString("base64"); }
    catch { console.log(`Pinterest: ${pin.file} missing, skipping.`); continue; }
    if (posted) await sleep(25000);                            // space the creates out; a burst looks automated
    const res = await fetch("https://api.pinterest.com/v5/pins", {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        board_id: board, title: pin.title, description: pin.description, link: pin.link, alt_text: pin.alt,
        media_source: { source_type: "image_base64", content_type: "image/png", data: image },
      }),
    });
    if (!res.ok) { console.error(`Pinterest pin failed (${res.status}): ${(await res.text()).slice(0, 300)}`); failures++; continue; }
    posted++;
    console.log(`Pinterest: pinned "${pin.title}" -> ${pin.link} (id ${(await res.json()).id}).`);
  }
  console.log(`Pinterest: ${posted} pin(s) created.`);
}

// The Pages CDN caches aggressively, so the image URL carries a content hash: a new
// image is a new URL, and polling it confirms today's file (not a stale copy) is live.
async function waitForLiveImage() {
  const local = join(root, "social", "ig.png");
  const hash = createHash("sha1").update(readFileSync(local)).digest("hex").slice(0, 12);
  const url = `${SITE}/social/ig.png?v=${hash}`;
  const size = statSync(local).size;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok && Number(res.headers.get("content-length")) === size) return url;
    } catch {}
    await sleep(10000);
  }
  throw new Error(`Image never went live at ${url} (waited 5 min): is the daily commit pushed and Pages deployed?`);
}

async function postInstagram() {
  const { IG_USER_ID: user, IG_ACCESS_TOKEN: token } = process.env;
  if (!user || !token) { console.log("Instagram: credentials not configured, skipping."); return; }
  const host = process.env.IG_API_HOST || "graph.facebook.com";
  const base = `https://${host}/v23.0`;
  try {
    const imageUrl = await waitForLiveImage();
    let res = await fetch(`${base}/${user}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ image_url: imageUrl, caption: meta.caption, access_token: token }),
    });
    if (!res.ok) throw new Error(`container create failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
    const creationId = (await res.json()).id;
    // The container needs a moment to ingest the image before it can publish.
    for (let i = 0; i < 10; i++) {
      res = await fetch(`${base}/${creationId}?fields=status_code&access_token=${encodeURIComponent(token)}`);
      const status = res.ok ? (await res.json()).status_code : "IN_PROGRESS";
      if (status === "FINISHED") break;
      if (status === "ERROR") throw new Error("container ingest failed (Meta could not fetch or accept the image).");
      await sleep(6000);
    }
    res = await fetch(`${base}/${user}/media_publish`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ creation_id: creationId, access_token: token }),
    });
    if (!res.ok) throw new Error(`publish failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
    console.log(`Instagram: posted (id ${(await res.json()).id}).`);
  } catch (e) {
    console.error(`Instagram: ${e.message}`);
    failures++;
  }
}

await postPinterest();
if (PINTEREST_ONLY) console.log("Instagram: skipped (--pinterest-only)."); else await postInstagram();
if (failures) { console.error(`${failures} social post(s) failed.`); process.exit(1); }
