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

const PROMPT = `You maintain "DailyBite", a page listing the best current U.S. fast-food and coffee-chain app deals.

Use web search to find TODAY'S real, currently-active in-app and publicly claimable deals from major national chains (e.g. McDonald's, Taco Bell, Wendy's, Burger King, Chipotle, Chick-fil-A, Starbucks, Panera, Pizza Hut, Popeyes, Dunkin', Sonic, Arby's, KFC, Domino's) AND healthier fast-casual chains (Sweetgreen, CAVA, Just Salad, Qdoba, Wingstop, Naf Naf Grill, Smoothie King, Tropical Smoothie Cafe, Jamba, Subway) AND healthier DRIVE-THRU chains (Salad and Go, El Pollo Loco) AND late-night chains (Jack in the Box, Whataburger, Del Taco, IHOP, Denny's, Insomnia Cookies) and halal-certified chains (The Halal Guys, Naf Naf Grill) and treat chains with frequent free-item promos (Krispy Kreme, Insomnia Cookies). Prefer official brand sources and reputable deal trackers (Brand Eating, EatDrinkDeals, The Krazy Coupon Lady).

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
- LATE-NIGHT PRIORITY: actively search for current deals from chains open late or 24 hours (Taco Bell, Jack in the Box, Whataburger, Del Taco, IHOP, Denny's, Sonic, Insomnia Cookies — e.g. "Jack in the Box app deals", "Denny's deals"). Night owls are a core audience: include every verifiable late-night deal, and aim for at least 3-4 deals from late-open chains each day when they can be verified.
- HEALTHY DRIVE-THRU PRIORITY: actively search for current deals from Salad and Go and El Pollo Loco (e.g. "Salad and Go deals", "El Pollo Loco app deals") — healthy food you can get without leaving the car is exactly what our audience wants. Include every verifiable one, and Chick-fil-A grilled-item or Chipotle app deals also count toward healthier options.
- NO PAID SUBSCRIPTIONS: never include deals that require a paid subscription or membership to claim (DashPass, Uber One, Grubhub+, delivery-app member pricing, any monthly-fee program). Free-to-join rewards apps are fine; anything with a price tag to enter is not.
- EXPIRY: NEVER include a deal whose end date has already passed. Holiday specials must be dropped starting the day AFTER the holiday or stated end date — yesterday's "July 4th only" deal must not appear on July 5th.
- HOLIDAY AWARENESS: If today is a U.S. holiday or national food day (July 4th, Memorial Day, National French Fry Day, National Ice Cream Day, etc.), actively search for verified holiday specials (e.g. "July 4th food deals 2026"), include them, name the occasion in the deal title, and prefer strong holiday specials for "best" — they are exactly the timely, high-value deals visitors come for.
- PRACTICALITY FILTER — this site is for repeat, everyday savers. Do NOT include: first-order or new-customer-only promos (e.g. "15% off your first order", new-member signup bonuses, first catering-order codes); ANY deal involving loyalty-point mechanics — redeeming points, earning bonus points, or multi-visit challenges (e.g. "free entree after 7 visits") — every listed deal must be claimable outright on a SINGLE visit by anyone; birthday-only rewards; one-time-use codes tied to account creation. Every deal listed must be claimable TODAY by a typical person who already has (or can freely download) the brand's app.
- NO MEMBERSHIP-GATED DEALS: never include deals that require rewards/loyalty/app MEMBER status to claim — no "rewards members get...", "app members only", member-exclusive items, referral bonuses, badge/challenge programs, or perks unlocked by joining a program (even free-to-join ones). A deal that is simply redeemed through the brand's app or a public promo code is fine; a deal gated on membership status is not. Also never include ONE-TIME freebies for NEW members or FIRST purchases ("free item when you join") — those are signup bonuses.
- NO RECURRING DEALS: never include recurring day-of-week or time-window promos ("Every Friday", "Whopper Wednesdays", "Tuesday Drops", daily happy hours, "every day 2-5 PM"). Only include deals available ALL DAY TODAY to anyone: dated limited-time offers ("Through July 20") or standing everyday value menus ("Ongoing").
- PORK-LIGHT FEATURED PICKS: never mark a pork-centric deal (bacon burgers, pepperoni pizza promos, ham/sausage items) as "best". Top Picks should favor chicken, Mediterranean, salad/bowl, smoothie, and plant-forward deals. Pork-centric deals may still appear in the regular list, just never featured.
- For "best" (Top Picks), additionally prioritize deals the MOST people can claim today AND again in the future, so visitors feel real value and come back.
- Never mark more than ONE deal per brand as "best" — spread Top Picks across different chains.
- In "expires", always give an explicit end date when one is published ("Through July 20, 2026"); use "Ongoing" for standing menus. Only write "Limited time" if genuinely no end date is published anywhere.
- Add "region":"National" for nationwide deals, or the specific region if limited (e.g. "Texas only", "California"). Leave out unverifiable regional deals.

Output ONLY a single MINIFIED JSON object (no newlines or indentation), no prose, no markdown fences, exactly this shape:
{"deals":[{"brand":"...","cat":"Burgers|Chicken|Mexican|Pizza|Coffee|Cafe|...","color":"#rrggbb","ic":"M","deal":"...","desc":"one sentence","tags":["free","app"],"value":1-5,"expires":"e.g. Through July 20 | This week | Ongoing","url":"https://...","best":true}]}`;

function extractJson(text) {
  let t = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  try { return JSON.parse(t); } catch {}
  // Fallback: scan for the FIRST balanced JSON object, respecting strings/escapes,
  // so trailing prose or stray braces after the object can't break parsing.
  const first = t.indexOf("{");
  if (first === -1) throw new Error("No JSON object found in model output.");
  let depth = 0, inStr = false, esc = false;
  for (let i = first; i < t.length; i++) {
    const c = t[i];
    if (esc) { esc = false; continue; }
    if (inStr) {
      if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return JSON.parse(t.slice(first, i + 1));
    }
  }
  throw new Error("No complete JSON object found in model output.");
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
