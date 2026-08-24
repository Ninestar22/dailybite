// scripts/post-social.mjs
// Posts today's deal image (from scripts/social-image.mjs) to Pinterest and Instagram.
// Each platform runs only when its secrets are configured; a missing platform is
// skipped with a log line, so this is safe to ship before any tokens exist.
//
// Pinterest (uploads the image directly, no hosting needed):
//   PINTEREST_BOARD_ID                       required
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

async function postPinterest() {
  const board = process.env.PINTEREST_BOARD_ID;
  const token = await pinterestToken().catch(e => { console.error(e.message); failures++; return null; });
  if (!board || !token) { console.log("Pinterest: credentials not configured, skipping."); return; }
  const image = readFileSync(join(root, "social", "pin.png")).toString("base64");
  const res = await fetch("https://api.pinterest.com/v5/pins", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      board_id: board,
      title: meta.pinTitle,
      description: meta.pinDescription,
      link: SITE + "/",
      media_source: { source_type: "image_base64", content_type: "image/png", data: image },
    }),
  });
  if (!res.ok) { console.error(`Pinterest pin failed (${res.status}): ${(await res.text()).slice(0, 300)}`); failures++; return; }
  console.log(`Pinterest: pinned (id ${(await res.json()).id}).`);
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
await postInstagram();
if (failures) { console.error(`${failures} social post(s) failed.`); process.exit(1); }
