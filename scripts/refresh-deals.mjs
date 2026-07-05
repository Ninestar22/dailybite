// scripts/refresh-deals.mjs
// The "AI agent": regenerates deals.json using the Claude API with the web
// search tool, so deals are grounded in live results instead of model memory.
//
// It validates the model output HARD. If anything looks wrong, it exits
// non-zero WITHOUT writing — so a bad run leaves the last known-good
// deals.json untouched rather than publishing garbage.
//
// Env:
//   ANTHROPIC_API_KEY  (required)
//   CLAUDE_MODEL       (optional, default below — confirm the string in your Console)
//
// Run: node scripts/refresh-deals.mjs
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "deals.json");

// Confirm the current model string in your Anthropic Console; models change.
const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-4-6";
const MAX_SEARCHES = 8;
const ALLOWED_TAGS = new Set(["free", "app"]);
const MIN_DEALS = 6;
const MAX_DEALS = 24;

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

const PROMPT = `You maintain "DailyBite", a page listing the best current U.S. fast-food and coffee-chain app/rewards deals.

Use web search to find TODAY'S real, currently-active in-app or rewards deals from major national chains (e.g. McDonald's, Taco Bell, Wendy's, Burger King, Chipotle, Chick-fil-A, Starbucks, Panera, Pizza Hut, Popeyes, Dunkin', Sonic, Arby's, KFC, Domino's) AND healthier fast-casual chains (Sweetgreen, CAVA, Just Salad, Smoothie King, Tropical Smoothie Cafe, Jamba, Subway) AND healthier DRIVE-THRU chains (Salad and Go, El Pollo Loco) and halal-certified chains (The Halal Guys). Prefer official brand sources and reputable deal trackers (Brand Eating, EatDrinkDeals, The Krazy Coupon Lady).

Rules:
- Only include deals you found evidence for in search results. Do NOT invent deals, prices, or dates.
- If you cannot confirm a deal is current, leave it out.
- ${MIN_DEALS}-${MAX_DEALS} deals total. Mark up to 4 deals as "best": true — these are the site's featured Top Picks and must mean something: reserve them for genuinely outstanding-value deals from HEALTHIER chains (Sweetgreen, CAVA, Just Salad, Smoothie King, Tropical Smoothie Cafe, Jamba, Panera, halal-certified chains). Never mark traditional fast food (burgers, fried chicken, pizza) as "best" unless zero healthy deals qualify that day.
- "url" must be the brand's official https deals/rewards page.
- "value" is a 1-5 usefulness score (5 = free item, low friction).
- "tags" may only contain "free" and/or "app".
- "ic" is a 1-3 character brand initial; "color" is the brand's hex color.
- Include 2-5 deals from the healthier fast-casual chains whenever you can verify them, using natural categories like "Salads", "Bowls", or "Smoothies".
- Include deals from halal-certified national chains (e.g. The Halal Guys) whenever you can verify them, with "cat":"Halal". Use the "Halal" category ONLY for chains that are fully halal-certified — never for general chains that merely offer some halal options.
- HEALTHY DRIVE-THRU PRIORITY: actively search for current deals from Salad and Go and El Pollo Loco (e.g. "Salad and Go deals", "El Pollo Loco app deals") — healthy food you can get without leaving the car is exactly what our audience wants. Include every verifiable one, and Chick-fil-A grilled-item or Chipotle app deals also count toward healthier options.
- HOLIDAY AWARENESS: If today is a U.S. holiday or national food day (July 4th, Memorial Day, National French Fry Day, National Ice Cream Day, etc.), actively search for verified holiday specials (e.g. "July 4th food deals 2026"), include them, name the occasion in the deal title, and prefer strong holiday specials for "best" — they are exactly the timely, high-value deals visitors come for.
- PRACTICALITY FILTER — this site is for repeat, everyday savers. Do NOT include: first-order or new-customer-only promos (e.g. "15% off your first order", new-member signup bonuses, first catering-order codes); deals that require redeeming loyalty points (e.g. "free sandwich for 1,500 points") or that merely award bonus points (2x points days); birthday-only rewards; one-time-use codes tied to account creation. Every deal listed must be claimable TODAY by a typical person who already has (or can freely download) the brand's app.
- RECURRING member perks ARE allowed (e.g. "Free Upsize Friday for rewards members") since joining is free and instant. But ONE-TIME freebies for NEW members or FIRST purchases ("free item when you join", "free smoothie after first app purchase") count as signup bonuses: never include them and NEVER mark them "best".
- For "best" (Top Picks), additionally prioritize deals the MOST people can claim today AND again in the future, so visitors feel real value and come back.
- Add "region":"National" for nationwide deals, or the specific region if limited (e.g. "Texas only", "California"). Leave out unverifiable regional deals.

Output ONLY a single MINIFIED JSON object (no newlines or indentation), no prose, no markdown fences, exactly this shape:
{"deals":[{"brand":"...","cat":"Burgers|Chicken|Mexican|Pizza|Coffee|Cafe|...","color":"#rrggbb","ic":"M","deal":"...","desc":"one sentence","tags":["free","app"],"value":1-5,"expires":"e.g. This week | Every Friday | Ongoing","url":"https://...","best":true}]}`;

function extractJson(text) {
  let t = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  try { return JSON.parse(t); } catch {}
  const first = t.indexOf("{");
  const last = t.lastIndexOf("}");
  if (first !== -1 && last > first) return JSON.parse(t.slice(first, last + 1));
  throw new Error("No JSON object found in model output.");
}

function validate(deals) {
  const errors = [];
  if (!Array.isArray(deals)) return ["top-level 'deals' is not an array"];

  // Normalize cosmetic fields before validating — don't fail a whole run
  // over a brand initial that's a character too long.
  deals.forEach(d => {
    if (typeof d.ic === "string") d.ic = d.ic.trim().slice(0, 3);
  });
  if (deals.length < MIN_DEALS) errors.push(`too few deals (${deals.length} < ${MIN_DEALS})`);
  if (deals.length > MAX_DEALS) errors.push(`too many deals (${deals.length} > ${MAX_DEALS})`);

  deals.forEach((d, i) => {
    const at = `deal[${i}]`;
    for (const f of ["brand", "cat", "ic", "deal", "desc", "expires", "url"]) {
      if (typeof d[f] !== "string" || !d[f].trim()) errors.push(`${at}.${f} missing/empty`);
    }
    if (typeof d.color !== "string" || !/^#[0-9a-fA-F]{6}$/.test(d.color)) errors.push(`${at}.color not a hex color`);
    if (typeof d.url === "string" && !/^https:\/\//i.test(d.url)) errors.push(`${at}.url not https`);
    if (typeof d.ic === "string" && d.ic.length > 3) errors.push(`${at}.ic too long`);
    if (!Array.isArray(d.tags) || d.tags.some(t => !ALLOWED_TAGS.has(t))) errors.push(`${at}.tags invalid`);
    if (!Number.isFinite(d.value) || d.value < 1 || d.value > 5) errors.push(`${at}.value out of range`);
    if ("best" in d && typeof d.best !== "boolean") errors.push(`${at}.best not boolean`);
    if ("region" in d && (typeof d.region !== "string" || d.region.length > 48)) errors.push(`${at}.region invalid`);
  });

  const bestCount = deals.filter(d => d.best === true).length;
  if (bestCount > 4) errors.push(`too many 'best' deals (${bestCount})`);
  return errors;
}

async function generate() {
  const messages = [{ role: "user", content: PROMPT }];
  const tools = [{ type: "web_search_20250305", name: "web_search", max_uses: MAX_SEARCHES }];

  // Server tools can return stop_reason "pause_turn" for long chains; resend
  // the accumulated turn until the model finishes.
  let response;
  for (let step = 0; step < 6; step++) {
    response = await client.messages.create({ model: MODEL, max_tokens: 16000, tools, messages });
    if (response.stop_reason === "pause_turn") {
      messages.push({ role: "assistant", content: response.content });
      continue;
    }
    break;
  }

  const text = response.content.filter(b => b.type === "text").map(b => b.text).join("\n").trim();
  if (!text) throw new Error("Model returned no text output.");
  const parsed = extractJson(text);
  return Array.isArray(parsed) ? parsed : parsed.deals;
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not set.");

  const deals = await generate();
  const errors = validate(deals);
  if (errors.length) {
    console.error("Validation failed — NOT writing deals.json:");
    for (const e of errors) console.error("  - " + e);
    process.exit(1);
  }

  const out = { updated: new Date().toISOString().slice(0, 10), deals };
  writeFileSync(dataPath, JSON.stringify(out, null, 2) + "\n");
  console.log(`Wrote deals.json with ${deals.length} deals (updated ${out.updated}).`);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
