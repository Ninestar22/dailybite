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
const MAX_SEARCHES = 14; // raised from 8 (2026-08-18): the rulebook mandates many per-brand checks and runs were coming back with too few deals
const ALLOWED_TAGS = new Set(["free", "app"]);
const MIN_DEALS = 6;
const MAX_DEALS = 24;

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

const PROMPT = `You maintain "DailyBite", a page listing the best current U.S. fast-food and coffee-chain app deals.

Use web search to find TODAY'S real, currently-active in-app and publicly claimable deals ONLY from this approved list of quality and healthy chains: Sweetgreen, CAVA, Chipotle, Chick-fil-A, Panera Bread, Potbelly, Noodles & Company, Just Salad, Qdoba, Wingstop, Naf Naf Grill, Smoothie King, Tropical Smoothie Cafe, Jamba, Salad and Go, El Pollo Loco, The Halal Guys, Tijuana Flats, Kura Sushi, Sarku Japan, Rock N Roll Sushi, Sushi Maki, Pokeworks, Island Fin Poke, Chili’s, Five Guys, Shake Shack, Subway, and Starbucks - plus national platform promos from DoorDash, Uber Eats, and Grubhub. Prefer official brand sources and reputable deal trackers (Brand Eating, EatDrinkDeals, The Krazy Coupon Lady).

SEARCH STRATEGY: your search budget is limited, so never spend it one brand at a time from the start. Use your FIRST 1-2 searches on multi-chain roundups (EatDrinkDeals, The Krazy Coupon Lady food deals calendar, Brand Eating current promotions) to harvest many verifiable deals at once, then spend remaining searches confirming details and covering priority chains a roundup did not mention. If a roundup already evidences a chain's deal, do not re-search that chain.

Rules:
- NO BONELESS ITEMS: never include any boneless wing deal from any brand, in any position. The owner has tried them and rejects them outright.
- NO DESSERT DEALS AT ALL: never include deals whose main item is custard, milkshakes, donuts, cookies, ice cream, froyo, or any dessert - not as picks, not as regular listings. Fries/drink combos are fine.
- NO ALCOHOL (owner request, 2026-08-18): never include deals on alcoholic drinks of any kind - no margaritas, beer, wine, cocktails, hard seltzer, drink-of-the-month promos, or bar/happy-hour drink specials. The site lists food, smoothies, and non-alcoholic drinks ONLY. A food bundle from a chain that happens to serve alcohol is fine; the discounted item itself must never be alcoholic.
- APPROVED BRANDS ONLY: deals may come ONLY from the approved list above. NEVER include any other restaurant - no McDonald’s, Burger King, KFC, Taco Bell, Wendy’s, Popeyes, Sonic, Arby’s, Dairy Queen, Domino’s, Pizza Hut, Papa Johns, Little Caesars, Jack in the Box, Whataburger, Del Taco, IHOP, Denny’s, Krispy Kreme, Insomnia Cookies, or TCBY, regardless of how good their deal looks. The owner eats healthy and this site reflects that.
- Only include deals you found evidence for in search results. Do NOT invent deals, prices, or dates.
- If you cannot confirm a deal is current, leave it out.
- ${MIN_DEALS}-${MAX_DEALS} deals total. Mark up to 4 deals as "best": true: these are the site's featured Top Picks and must mean something: reserve them for genuinely outstanding-value deals from HEALTHIER chains (Sweetgreen, CAVA, Just Salad, Smoothie King, Tropical Smoothie Cafe, Jamba, Panera, sushi and poke chains, halal-certified chains). Never mark traditional fast food (burgers, fried chicken, pizza) as "best" unless zero healthy deals qualify that day.
- "url" must be the brand's official https deals/rewards page.
- "value" is a 1-5 usefulness score (5 = free item, low friction).
- "tags" may only contain "free" and/or "app".
- "ic" is a 1-3 character brand initial; "color" is the brand's hex color.
- Include 2-5 deals from the healthier fast-casual chains whenever you can verify them, using natural categories like "Salads", "Bowls", or "Smoothies".
- Include deals from halal-certified national chains (e.g. The Halal Guys) whenever you can verify them, with "cat":"Halal". Use the "Halal" category ONLY for chains that are fully halal-certified: never for general chains that merely offer some halal options.
- LATE-NIGHT: within the approved list, note deals claimable late in the evening, but never add non-approved chains for late-night coverage.
- HEALTHY DRIVE-THRU PRIORITY: actively search for current deals from Salad and Go and El Pollo Loco (e.g. "Salad and Go deals", "El Pollo Loco app deals"): healthy food you can get without leaving the car is exactly what our audience wants. Include every verifiable one, and Chick-fil-A grilled-item or Chipotle app deals also count toward healthier options.
- SUSHI PRIORITY (owner request, 2026-08-18: sushi is the owner's favorite food): on EVERY refresh, search sushi and poke chains for current deals (e.g. "Kura Sushi deals", "Rock N Roll Sushi specials", "Pokeworks promo", "sushi deals this month"). Approved sushi/poke chains: Kura Sushi, Sarku Japan, Rock N Roll Sushi, Sushi Maki, Pokeworks, Island Fin Poke. Use cat "Sushi" or "Poke". Every standard rule still applies (no membership-gated offers, no recurring day-of-week specials, official URLs, regional honesty: Rock N Roll Sushi is "South & Southeast", Sushi Maki is "South Florida", Island Fin Poke is "FL & Southeast"; Kura Sushi and Sarku Japan operate in many states and may be "National" only if the specific deal is chainwide). Verified sushi and poke deals count toward the healthy quota and MAY be marked best when the value is genuinely strong and the footprint is broad.
- NO PAID SUBSCRIPTIONS: never include deals that require a paid subscription or membership to claim (DashPass, Uber One, Grubhub+, delivery-app member pricing, any monthly-fee program). Free-to-join rewards apps are fine; anything with a price tag to enter is not.
- EXPIRY: NEVER include a deal whose end date has already passed. Holiday specials must be dropped starting the day AFTER the holiday or stated end date: yesterday's "July 4th only" deal must not appear on July 5th.
- HOLIDAY AWARENESS: If today is a U.S. holiday or national food day (July 4th, Memorial Day, National French Fry Day, National Ice Cream Day, etc.), actively search for verified holiday specials (e.g. "July 4th food deals 2026"), include them, name the occasion in the deal title, and prefer strong holiday specials for "best": they are exactly the timely, high-value deals visitors come for.
- PRACTICALITY FILTER: this site is for repeat, everyday savers. Do NOT include: first-order or new-customer-only promos (e.g. "15% off your first order", new-member signup bonuses, first catering-order codes); ANY deal involving loyalty-point mechanics: redeeming points, earning bonus points, or multi-visit challenges (e.g. "free entree after 7 visits"): every listed deal must be claimable outright on a SINGLE visit by anyone; birthday-only rewards; one-time-use codes tied to account creation. Every deal listed must be claimable TODAY by a typical person who already has (or can freely download) the brand's app.
- FILLING MEALS FIRST: prioritize deals on real meals - sandwiches, bowls, salads, entrees, meal boxes. Desserts and sweets (donuts, cookies, custard, froyo, ice cream, milkshakes) are NEVER marked best - Top Picks are filling meals only - and sweets may be at most a small minority of the overall list. Label desserts with cat "Treats" honestly. Also search Potbelly on every refresh - their BOGO and sandwich promo codes are frequent and strong.
- CONCRETE SAVINGS: every deal must make the saving obvious in dollars - a stated price, a percent discount, a freebie with purchase, or a working code. Vague perks (free delivery, new or returning menu items, collabs, sweepstakes) are never marked best and are rarely worth listing.
- OWNER QUALITY BAR: the owner personally tests listed deals in-store. Every deal must hold up exactly as described. Never mark Wingstop boneless-wing promotions as best (owner-tested, quality complaint); bone-in wing deals are fine. Prefer deals a person would genuinely brag about finding.
- NOT A DEAL: new menu items, returning seasonal items, or product launches at regular price are NOT deals. Only list offers with a genuine discount, freebie, bundle value, or working promo code.
- OFFICIAL URLS ONLY: the url field must point to a page on the brand's own official domain (their deals/offers page, or homepage if no better page exists). Never link to coupon aggregators, news articles, or any third-party site.
- NO EMOJIS: never use emojis or decorative unicode symbols in any field (brand, title, desc, expires, badge). Plain professional text only.
- NO EM DASHES: never use the em dash character in any field. Where you would reach for one, use a colon, a comma, or parentheses instead. Example: write "BOGO $5: whole sandwiches, bowls and salads" not "BOGO $5" followed by an em dash.
- NO MEMBERSHIP-GATED DEALS: never include deals that require rewards/loyalty/app MEMBER status to claim: no "rewards members get...", "app members only", member-exclusive items, referral bonuses, badge/challenge programs, or perks unlocked by joining a program (even free-to-join ones). A deal that is simply redeemed through the brand's app or a public promo code is fine; a deal gated on membership status is not. Also never include ONE-TIME freebies for NEW members or FIRST purchases ("free item when you join"): those are signup bonuses.
- NO RECURRING DEALS: never include recurring day-of-week or time-window promos ("Every Friday", "Whopper Wednesdays", "Tuesday Drops", daily happy hours, "every day 2-5 PM"). Only include deals available ALL DAY TODAY to anyone: dated limited-time offers ("Through July 20") or standing everyday value menus ("Ongoing"). Single exception: Tijuana Flats day specials, see the TIJUANA FLATS rule.
- TIJUANA FLATS (owner request, 2026-08-14 - the owner is in Florida): search Tijuana Flats on every refresh. EXCEPTION to the no-recurring rule for this brand ONLY: its published day-of-week specials may be listed ON their active day only - Taco Tuesdaze (Tuesdays: two tacos, chips, and a drink, about $7.99) and Throwback Thursdaze (Thursdays: burrito or bowl, chips, and a drink, about $8.99). Verify current details on tijuanaflats.com, name the weekday plainly in the description, use cat "Mexican" and region "FL & Southeast", and never mark them "best" (regional chain). On other days include Tijuana Flats only if a normal all-day deal is verified.
- OWNER EXCLUSIONS: NEVER include McDonald's or Burger King deals at all - the owner removed them from the daily list to keep the site focused on quality value. Their names must not appear as deal brands.
- QUALITY CASUAL DINING: also search Chili's (3 For Me price tiers), Noodles & Company (promo codes and bowl deals), and Five Guys on every refresh. Sit-down value bundles with stated prices are excellent deals - use cat "Sit-Down". Five Guys rarely discounts, so only include verified offers.
- FEATURED BAN: NEVER mark deals from McDonald's, KFC, Dairy Queen, Taco Bell, or Domino's as "best" under any circumstances. Their deals may appear in the regular list, but Top Picks belongs to healthier chains.
- GOLDEN STANDARD BRANDS: Chipotle and Chick-fil-A set the quality bar for this site. On EVERY refresh, search these two chains FIRST and include their best currently-active deal whenever one exists. EXCEPTION for these two brands ONLY: deals requiring a FREE app account (Chipotle Rewards / Chick-fil-A One) ARE allowed - state "free account required" plainly in the description. Paid memberships remain banned everywhere, and the membership ban still applies to every other chain. Never invent or stretch a deal if nothing qualifies today.
- PLATFORM PICKUP DEALS: also search DoorDash, Uber Eats, and Grubhub for publicized NATIONAL promos anyone can claim - percent-off pickup events, sitewide promo codes, free-delivery weekends. Use brand "DoorDash" / "Uber Eats" / "Grubhub", cat "Pickup", and the platform's official page as the url. All the usual bans apply fully: no new-customer or first-order codes, no DashPass / Uber One / Grubhub+ member perks. Location- or user-personalized app offers never qualify - national and verifiable only.
- REGIONAL HONESTY: for chains that do not operate in most U.S. states (Whataburger, Del Taco, El Pollo Loco, Salad and Go, Jack in the Box, In-N-Out, The Halal Guys, Tijuana Flats), NEVER write region "National" - state the real footprint instead, e.g. "TX and the South", "West Coast", or "FL & Southeast" for Tijuana Flats. These regional chains are never marked best.
- HEALTHY QUOTA: aim for at least 4-6 verified deals per day from healthier chains (Sweetgreen, CAVA, Just Salad, Qdoba, Panera, Chipotle, Wingstop, Naf Naf Grill, Smoothie King, Tropical Smoothie, Jamba, Salad and Go, El Pollo Loco, The Halal Guys, Kura Sushi, Sarku Japan, Rock N Roll Sushi, Sushi Maki, Pokeworks, Island Fin Poke). Search these chains FIRST and most thoroughly: they are the site's identity. A day with zero healthy deals is a failed refresh.
- PORK-LIGHT FEATURED PICKS: never mark a pork-centric deal (bacon burgers, pepperoni pizza promos, ham/sausage items) as "best". Top Picks should favor chicken, Mediterranean, salad/bowl, smoothie, and plant-forward deals. Pork-centric deals may still appear in the regular list, just never featured.
- For "best" (Top Picks), additionally prioritize deals the MOST people can claim today AND again in the future, so visitors feel real value and come back.
- Never mark more than ONE deal per brand as "best": spread Top Picks across different chains.
- In "expires", always give an explicit end date when one is published ("Through July 20, 2026"); use "Ongoing" for standing menus. Only write "Limited time" if genuinely no end date is published anywhere.
- Add "region":"National" for nationwide deals, or the specific region if limited (e.g. "Texas only", "California"). Leave out unverifiable regional deals.

Output ONLY a single MINIFIED JSON object (no newlines or indentation), no prose, no markdown fences, exactly this shape:
{"deals":[{"brand":"...","cat":"Burgers|Chicken|Mexican|Pizza|Coffee|Cafe|...","color":"#rrggbb","ic":"M","deal":"...","desc":"one sentence","tags":["free","app"],"value":1-5,"expires":"e.g. Through July 20 | This week | Ongoing","url":"https://...","best":true}]}`;


async function validateDealUrls(deals) {
  // Replace any deal URL that hard-404s with the brand's homepage so "Get deal" never dead-ends.
  const domainFor = (brand) => brand.toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]/g, "") + ".com";
  for (const d of deals) {
    if (!d.url) { d.url = "https://www." + domainFor(d.brand) + "/"; continue; }
    try {
      const res = await fetch(d.url, { method: "GET", redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" }, signal: AbortSignal.timeout(12000) });
      if (res.status === 404 || res.status === 410) {
        console.log(`URL 404 for ${d.brand} (${d.url}) -> homepage fallback`);
        d.url = "https://www." + domainFor(d.brand) + "/";
      }
    } catch (e) {
      console.log(`URL check failed for ${d.brand} (${d.url}): ${e.message} -> homepage fallback`);
      d.url = "https://www." + domainFor(d.brand) + "/";
    }
  }
}

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

// Drop duplicate offers before validation so MIN_DEALS counts distinct deals and
// deals.json never carries the same offer twice. Same brand + same title (ignoring
// case/punctuation), or same brand + same promo code, is the same offer. First wins.
// build.mjs applies the same rule (with brand aliases) as the deterministic backstop.
function dedupe(deals) {
  if (!Array.isArray(deals)) return deals;
  const key = s => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const seen = new Set();
  const out = deals.filter(d => {
    const brand = key(d && d.brand);
    const keys = [brand + "|" + key(d && d.deal)];
    const code = String((d && d.deal) || "").concat(" ", (d && d.desc) || "").match(/\bcode[:\s]+(?!NEEDED\b|REQUIRED\b|NECESSARY\b|ONLY\b)([A-Z0-9]{3,14})\b/);
    if (code) keys.push(brand + "|code:" + code[1].toUpperCase());
    if (keys.some(k => seen.has(k))) return false;
    for (const k of keys) seen.add(k);
    return true;
  });
  if (out.length < deals.length) console.log(`Dropped ${deals.length - out.length} duplicate deal(s) from model output.`);
  return out;
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

  let deals = dedupe(await generate());
  let errors = validate(deals);
  if (errors.length) {
    // One retry: search variance sometimes yields a short list (e.g. 2026-08-17,
    // "too few deals (4 < 6)"). A fresh attempt usually recovers before failing closed.
    console.error("First attempt failed validation: retrying once:");
    for (const e of errors) console.error("  - " + e);
    deals = dedupe(await generate());
    errors = validate(deals);
  }
  if (errors.length) {
    console.error("Validation failed: NOT writing deals.json:");
    for (const e of errors) console.error("  - " + e);
    process.exit(1);
  }

  const out = { updated: new Date().toISOString().slice(0, 10), deals };
  await validateDealUrls(deals);
  writeFileSync(dataPath, JSON.stringify(out, null, 2) + "\n");
  console.log(`Wrote deals.json with ${deals.length} deals (updated ${out.updated}).`);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
