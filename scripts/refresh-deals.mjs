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
// claude-sonnet-5 ($2/$10 per MTok, a third cheaper than sonnet-4-6). The 2026-08-27
// morning hang was the Sonnet 5 + web_search_20260209 COMBO with no request timeouts;
// this config isolates the variables: Sonnet 5 with the proven basic search tool, under
// the 8-minute request timeout and the workflow's 20-minute step cap. Supervised-tested
// the same day before being trusted with the schedule.
const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-5";
// JSON repair is mechanical clean-up: Haiku handles it at a fifth of Sonnet's price.
const REPAIR_MODEL = process.env.CLAUDE_REPAIR_MODEL || "claude-haiku-4-5";
const MAX_SEARCHES = 24; // 8 -> 14 (2026-08-18) -> 18 (2026-08-20) -> 24 (2026-08-24): owner wants a 12-18 deal list, so the budget covers chain-by-chain sweeps after the roundups
const ALLOWED_TAGS = new Set(["free", "app"]);
const MIN_DEALS = 6;
const MAX_DEALS = 24;

// Reads ANTHROPIC_API_KEY from env. The explicit timeout caps any single hung request
// at 8 minutes (the SDK's default scales far higher for large max_tokens, which let a
// stalled request eat 30+ minutes of the 2026-08-27 run); one retry, then fail closed.
const client = new Anthropic({ timeout: 8 * 60 * 1000, maxRetries: 1 });

// The model does not know the date: without it, day-of-week specials get listed on the wrong
// day (run #81 on Friday 2026-08-21 returned a Thursday-only deal) and day-specific grocery
// searches ($5 Friday, Sushi Wednesday) cannot be targeted. Real US-Eastern date via the IANA
// timezone (the old fixed UTC-4 offset was an hour off all winter under EST).
const ET = { timeZone: "America/New_York" };
const TODAY = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", ...ET });
const WEEKDAY = new Date().toLocaleDateString("en-US", { weekday: "long", ...ET });

const PROMPT = `You maintain "DailyBite", a page listing the best current U.S. fast-food and coffee-chain app deals.

TODAY is ${TODAY} (US Eastern). Every deal must be claimable today; a day-of-week special may only appear if its day is ${WEEKDAY}.

Use web search to find TODAY'S real, currently-active in-app and publicly claimable deals ONLY from this approved list of quality and healthy chains: Sweetgreen, CAVA, Chipotle, Chick-fil-A, Panera Bread, Potbelly, Noodles & Company, Just Salad, Qdoba, Wingstop, Naf Naf Grill, Smoothie King, Tropical Smoothie Cafe, Jamba, Salad and Go, El Pollo Loco, The Halal Guys, Tijuana Flats, Kura Sushi, Sarku Japan, Rock N Roll Sushi, Sushi Maki, Pokeworks, Island Fin Poke, Pollo Tropical, Rubio's Coastal Grill, Waba Grill, Pei Wei, Teriyaki Madness, Honeygrow, Playa Bowls, Nekter Juice Bar, Jason's Deli, McAlister's Deli, Chicken Salad Chick, Taziki's Mediterranean Cafe, Chopt Creative Salad Co., Saladworks, Salata Salad Kitchen, Crisp & Green, Bibibop Asian Grill, Cafe Zupas, Clean Juice, Robeks, Luna Grill, Modern Market Eatery, Dig, Chili’s, Five Guys, Shake Shack, Subway, and Starbucks - plus national platform promos from DoorDash, Uber Eats, and Grubhub, and the prepared-food counters of these grocery chains (see the GROCERY rule): Publix, Sprouts, Kroger and its banners (Fred Meyer, Ralphs, Fry's, King Soopers, Smith's, QFC), Harris Teeter, Safeway, Albertsons, Vons, Jewel-Osco, ACME Markets, Shaw's, Tom Thumb, Randalls, Food Lion, Lowe's Foods, Wegmans, H-E-B, Hy-Vee, Meijer, Giant Eagle, Whole Foods Market, Winn-Dixie, ShopRite, Stop & Shop, Giant Food, and Walmart. Prefer official brand sources and reputable deal trackers (Brand Eating, EatDrinkDeals, The Krazy Coupon Lady).

SEARCH STRATEGY: your search budget is limited, so never spend it one brand at a time from the start. Use your FIRST 1-2 searches on multi-chain roundups (EatDrinkDeals, The Krazy Coupon Lady food deals calendar, Brand Eating current promotions) to harvest many verifiable deals at once, then spend remaining searches confirming details and covering priority chains a roundup did not mention. If a roundup already evidences a chain's deal, do not re-search that chain.

LIST SIZE (owner request, 2026-08-24): aim for 12 to 18 deals every day: a 6-deal day is a weak page. If the roundups leave the list short, spend the remaining search budget going chain by chain through the approved list ("Sweetgreen promo code", "CAVA deal this week", "Wingstop promo", "El Pollo Loco app deals", "Qdoba coupon") until the list fills out. Standing value menus with stated prices (Chili's 3 For Me, Subway Sub of the Day, Noodles Delicious Duo) count and are worth re-verifying daily. Never pad with vague, expired, or dollar-less offers to hit the number: stated-dollars quality first, then quantity.

WEEKEND DEPTH (owner report, 2026-08-30: a Sunday list left a Florida visitor only 3 claimable deals): weekend lists run thin because weekday roundups go stale. On Saturday and Sunday, spend extra searches on weekend-specific angles: "weekend food deals", "[chain] weekend promo code", flash codes posted Friday-Sunday (Chipotle and Panera run these often), and app-offer tabs of the healthy roster. Also remember FLORIDA VISITORS specifically (the owner is one): verified deals from FL-footprint chains (Tijuana Flats, Pollo Tropical, Publix, Playa Bowls, Island Fin Poke, Chicken Salad Chick) are extra valuable because national-only lists leave FL thin - search at least one of them every weekend run.
SEARCH DISCIPLINE (cost control): every web search costs real money, but a THIN LIST COSTS MORE: the site's whole value is deal count and quality. STOP searching the moment you hold 15 or more verified, dollars-stated deals: unspent budget is pure savings. But while you hold FEWER than 12 deals, KEEP SEARCHING until the budget is spent: never end a run early with a short list (a 7-deal day, 2026-08-27, made the site look weak). Never search to re-confirm a detail you already have evidence for, never re-search a chain a roundup already covered, and never spend a search out of curiosity about a non-approved brand.

Rules:
- NO BONELESS ITEMS: never include any boneless wing deal from any brand, in any position. The owner has tried them and rejects them outright.
- NO DESSERT DEALS AT ALL: never include deals whose main item is custard, milkshakes, donuts, cookies, ice cream, froyo, or any dessert - not as picks, not as regular listings. Fries/drink combos are fine.
- NO ALCOHOL (owner request, 2026-08-18): never include deals on alcoholic drinks of any kind - no margaritas, beer, wine, cocktails, hard seltzer, drink-of-the-month promos, or bar/happy-hour drink specials. The site lists food, smoothies, and non-alcoholic drinks ONLY. A food bundle from a chain that happens to serve alcohol is fine; the discounted item itself must never be alcoholic.
- APPROVED BRANDS ONLY: deals may come ONLY from the approved list above. NEVER include any other restaurant - no McDonald’s, Burger King, KFC, Taco Bell, Wendy’s, Popeyes, Sonic, Arby’s, Dairy Queen, Domino’s, Pizza Hut, Papa Johns, Little Caesars, Jack in the Box, Whataburger, Del Taco, IHOP, Denny’s, Krispy Kreme, Insomnia Cookies, or TCBY, regardless of how good their deal looks. The owner eats healthy and this site reflects that.
- Only include deals you found evidence for in search results. Do NOT invent deals, prices, or dates.
- If you cannot confirm a deal is current, leave it out.
- ${MIN_DEALS}-${MAX_DEALS} deals total. Mark up to 4 deals as "best": true: these are the site's featured Top Picks and must mean something: reserve them for genuinely outstanding-value deals from HEALTHIER chains (Sweetgreen, CAVA, Just Salad, Smoothie King, Tropical Smoothie Cafe, Jamba, Panera, sushi and poke chains, halal-certified chains). Never mark traditional fast food (burgers, fried chicken, pizza) as "best" unless zero healthy deals qualify that day.
- "url" must be the brand's official https deals/rewards page.
- "value" scores the dollars a typical visitor actually keeps: 5 = free food item or $5+ saved, 4 = roughly $3-5 saved, 3 = $1-3 saved, 1-2 = marginal. Score what stays in the visitor's pocket, not how exciting the promo sounds.
- "est_savings" (owner request, 2026-08-28, read by the iOS app: keep this exact name and meaning): OPTIONAL number, US dollars, the editorial estimate of what a customer saves by using this deal versus paying regular price. Round to the nearest $0.50. Keep it in 0-100. Verify it against the deal's official source page (the url field) the same way the deals themselves are verified. Owner's computation rules, per deal type: '$X off' -> X. 'N% off orders of $M or more' -> N% x M (the minimum-spend case, e.g. 20% off $20+ -> 4). BOGO / 'buy one get one free (or for $X)' -> the regular price of the second item (minus X if it isn't free). Fixed-price bundles and value menus ('2 tacos, chips and a drink for $7.99', '3 For Me from $10.99') -> typical a-la-carte total of the included items minus the bundle price. Flat-price specials ('$5 sushi Friday') -> typical regular price minus the deal price. If a deal's savings genuinely can't be estimated, omit the field for that deal rather than inventing a number: but that should be rare. Since every listed deal already states its dollars (DOLLARS IN THE TITLE rule), nearly every deal IS estimable under the rules above: include est_savings on EVERY deal unless estimation is truly impossible (the first run, 2026-08-29, wrongly omitted it on 4 of 6 plainly-estimable bundles: do not repeat that). These estimates get shown to users labeled 'estimated,' so they need to be defensible, not inflated.
- "tags" may only contain "free" and/or "app".
- "ic" is a 1-3 character brand initial; "color" is the brand's hex color.
- Include 2-5 deals from the healthier fast-casual chains whenever you can verify them, using natural categories like "Salads", "Bowls", or "Smoothies".
- Include deals from halal-certified national chains (e.g. The Halal Guys) whenever you can verify them, with "cat":"Halal". Use the "Halal" category ONLY for chains that are fully halal-certified: never for general chains that merely offer some halal options.
- LATE-NIGHT: within the approved list, note deals claimable late in the evening, but never add non-approved chains for late-night coverage.
- HEALTHY DRIVE-THRU PRIORITY: actively search for current deals from Salad and Go and El Pollo Loco (e.g. "Salad and Go deals", "El Pollo Loco app deals"): healthy food you can get without leaving the car is exactly what our audience wants. Include every verifiable one, and Chick-fil-A grilled-item or Chipotle app deals also count toward healthier options.
- SUSHI PRIORITY (owner request, 2026-08-18: sushi is the owner's favorite food): on EVERY refresh, search sushi and poke chains for current deals (e.g. "Kura Sushi deals", "Rock N Roll Sushi specials", "Pokeworks promo", "sushi deals this month"). Approved sushi/poke chains: Kura Sushi, Sarku Japan, Rock N Roll Sushi, Sushi Maki, Pokeworks, Island Fin Poke, plus the grocery-store sushi counters and their weekly sushi days (GROCERY rule). Use cat "Sushi" or "Poke". Every standard rule still applies (no membership-gated offers, no recurring day-of-week specials, official URLs, regional honesty: Rock N Roll Sushi is "South & Southeast", Sushi Maki is "South Florida", Island Fin Poke is "FL & Southeast", Kura Sushi and Pokeworks are "Select states"; only Sarku Japan may be "National" and only if the specific deal is chainwide). Verified sushi and poke deals count toward the healthy quota and MAY be marked best when the value is genuinely strong and the footprint is broad.
- TROPICAL SMOOTHIE PRIORITY (owner request, 2026-08-29): search Tropical Smoothie Cafe on EVERY refresh ("Tropical Smoothie Cafe deals", "Tropical Smoothie app promo"): the chain runs frequent app offers and limited-time smoothie and flatbread promos that fit the site perfectly. Include every verifiable one; the footprint is national, so region "National" is correct, and genuinely strong offers may be marked best.
- SALAD AND BOWL EXPANSION (owner request, 2026-08-29): the approved list now also includes Chopt Creative Salad Co., Saladworks, Salata Salad Kitchen, Crisp & Green, Bibibop Asian Grill, Cafe Zupas, Clean Juice, Robeks, Luna Grill, Modern Market Eatery, and Dig. These are healthy fast-casual chains with frequent app promos and stated-price bundles: include their deals whenever verifiable, and rotate 1-2 of them into the chain-by-chain sweep each day. All are REGIONAL (see REGIONAL HONESTY): never label them "National" and never mark them best.
- NO PAID SUBSCRIPTIONS: never include deals that require a paid subscription or membership to claim (DashPass, Uber One, Grubhub+, delivery-app member pricing, any monthly-fee program). Free-to-join rewards apps are fine; anything with a price tag to enter is not.
- EXPIRY: NEVER include a deal whose end date has already passed. Holiday specials must be dropped starting the day AFTER the holiday or stated end date: yesterday's "July 4th only" deal must not appear on July 5th.
- HOLIDAY AWARENESS: If today is a U.S. holiday or national food day (July 4th, Memorial Day, National French Fry Day, National Ice Cream Day, etc.), actively search for verified holiday specials (e.g. "July 4th food deals 2026"), include them, name the occasion in the deal title, and prefer strong holiday specials for "best": they are exactly the timely, high-value deals visitors come for.
- PRACTICALITY FILTER: this site is for repeat, everyday savers. Do NOT include: first-order or new-customer-only promos (e.g. "15% off your first order", new-member signup bonuses, first catering-order codes); ANY deal involving loyalty-point mechanics: redeeming points, earning bonus points, or multi-visit challenges (e.g. "free entree after 7 visits"): every listed deal must be claimable outright on a SINGLE visit by anyone; birthday-only rewards; one-time-use codes tied to account creation. Every deal listed must be claimable TODAY by a typical person who already has (or can freely download) the brand's app.
- FILLING MEALS FIRST: prioritize deals on real meals - sandwiches, bowls, salads, entrees, meal boxes. Desserts and sweets (donuts, cookies, custard, froyo, ice cream, milkshakes) are NEVER marked best - Top Picks are filling meals only - and sweets may be at most a small minority of the overall list. Label desserts with cat "Treats" honestly. Also search Potbelly on every refresh - their BOGO and sandwich promo codes are frequent and strong.
- DOLLARS IN THE TITLE (owner request, 2026-08-24): the deal title itself must state the money: a price ("3 For Me from $10.99"), a discount ("BOGO $5", "20% off"), or a named free FOOD item ("Free Avocado with Any Entree"). A visitor must know what they will spend or save WITHOUT reading the description. If you cannot state the dollars or the free item plainly, do not list the deal. Vague perks (free delivery, new or returning menu items, collabs, sweepstakes) are never deals.
- NO MYSTERY REWARDS (owner request, 2026-08-24): never list mystery or surprise rewards, "special prizes", collectible or capsule-toy prizes, merch drops, or collab menu items sold at regular price. Example of what NOT to list: the Kura Sushi x Persona collab (2026-08), themed rolls at regular price plus a free Bikkura-Pon capsule prize after 15 plates: that is SPENDING roughly $45, not saving. Free food with a stated value is a deal; free toys and unspecified surprises never are.
- OWNER QUALITY BAR: the owner personally tests listed deals in-store. Every deal must hold up exactly as described. Never mark Wingstop boneless-wing promotions as best (owner-tested, quality complaint); bone-in wing deals are fine. Prefer deals a person would genuinely brag about finding.
- NOT A DEAL: new menu items, returning seasonal items, or product launches at regular price are NOT deals. Only list offers with a genuine discount, freebie, bundle value, or working promo code.
- OFFICIAL URLS ONLY: the url field must point to a page on the brand's own official domain (their deals/offers page, or homepage if no better page exists). Never link to coupon aggregators, news articles, or any third-party site. NEVER construct or guess a deep URL from memory: use only URLs you actually saw in this run's search results (a guessed Panera "value-menu.html" path was a dead 404 on the live site for a full day, 2026-08-25). When no evidenced deep link exists, use the brand's homepage.
- NO EMOJIS: never use emojis or decorative unicode symbols in any field (brand, title, desc, expires, badge). Plain professional text only.
- NO EM DASHES: never use the em dash character in any field. Where you would reach for one, use a colon, a comma, or parentheses instead. Example: write "BOGO $5: whole sandwiches, bowls and salads" not "BOGO $5" followed by an em dash.
- VALID JSON ONLY: the reply must parse with JSON.parse. Never put a double-quote character inside any field value (write Chili's 3 For Me or Chili's '3 For Me', never Chili's "3 For Me"), no trailing commas, no comments, and no text before or after the JSON object.
- FREE ACCOUNTS ARE FINE, PAID MEMBERSHIPS ARE NOT (owner decision, 2026-08-30, expanded from the old golden-brand-only exception): deals that require a FREE rewards/app account (Tropic Rewards, Chipotle Rewards, Chick-fil-A One, MyPanera, Wingstop, etc.) ARE allowed from EVERY approved brand: anyone can join free in a minute, so the deal is claimable today. Always state "free account required" plainly in the description. STILL BANNED for everyone: anything with a price tag to enter (paid memberships, see NO PAID SUBSCRIPTIONS), referral bonuses, badge/challenge programs, points-redemption or multi-visit mechanics (PRACTICALITY FILTER), and ONE-TIME freebies for NEW members or FIRST purchases ("free item when you join"): those are signup bonuses, not deals.
- NO RECURRING DEALS: never include recurring day-of-week or time-window promos ("Every Friday", "Whopper Wednesdays", "Tuesday Drops", daily happy hours, "every day 2-5 PM"). Only include deals available ALL DAY TODAY to anyone: dated limited-time offers ("Through July 20") or standing everyday value menus ("Ongoing"). Only two exceptions: Tijuana Flats day specials (TIJUANA FLATS rule) and grocery-store day deals (GROCERY rule), each listed ON its day only.
- TIJUANA FLATS (owner request, 2026-08-14 - the owner is in Florida): search Tijuana Flats on every refresh. EXCEPTION to the no-recurring rule for this brand ONLY: its published day-of-week specials may be listed ON their active day only - Taco Tuesdaze (Tuesdays: two tacos, chips, and a drink, about $7.99) and Throwback Thursdaze (Thursdays: burrito or bowl, chips, and a drink, about $8.99). Verify current details on tijuanaflats.com, name the weekday plainly in the description, use cat "Mexican" and region "FL & Southeast", and never mark them "best" (regional chain). On other days include Tijuana Flats only if a normal all-day deal is verified.
- GROCERY (owner request, 2026-08-20): the best value often comes from a grocery store's prepared-food counter, so the approved grocery chains above count as brands. Only READY-TO-EAT prepared food qualifies (sushi, poke, deli and hot-bar meals, rotisserie chicken, fresh pizza, salads, meal deals): never packaged groceries, never BOGO shelf items. Evidence must be the store's own site, weekly ad, press release or FAQ, or the official page/social account of the sushi vendor that runs its counter (AFC, Zenshi, Snowfox, Oumi, Hissho); one viral post is not evidence. Many grocers run a weekly SUSHI DAY: list it ON that day only (EXCEPTION to the no-recurring rule, for grocery chains only), with the weekday named in the title or description, cat "Sushi" (or "Deli"/"Grocery" for other counters). Known sushi days to re-verify every week: Publix $5 Sushi Wednesday (FL & Southeast, no card needed), Sprouts Sushi Wednesday (select Oumi rolls $5, most markets, no card needed), Kroger-family Sushi Wednesday (Snowfox/Zenshi rolls, usually $5 to $6, "Wednesday Only" SKUs on kroger.com), Safeway/Albertsons Sushi Wednesday ($5.99 to $6 Zenshi rolls) and $5 Friday (sushi and 8-piece chicken in many divisions), Harris Teeter $5 Friday sushi (VIC card, some markets), Food Lion and Lowe's Foods $5 Sushi Wednesday (select Carolinas stores). Prices differ by division: state the price you verified and the real footprint in "region" (e.g. "Texas only", "Northeast", "FL & Southeast", "Select states"); only Walmart and Whole Foods Market may be "National". A FREE store loyalty card or app (Kroger Plus, VIC, for U, Hy-Vee Fuel Saver) is acceptable for grocery deals: say "free [card] required" in the description. Amazon Prime perks at Whole Foods and warehouse clubs (Costco, Sam's, BJ's) are paid memberships and stay banned. Grocery deals are never "best" unless national. Spend at least 2 searches on grocery counters every day: one roundup ("grocery store sushi deals ${WEEKDAY}" or "grocery prepared food deals this week") plus the day's known specials (Wednesday: Publix, Sprouts, Kroger-family and Safeway sushi; Friday: Safeway/Albertsons $5 Friday and Harris Teeter $5 Friday sushi; other days: Walmart/Wegmans/H-E-B meal deals). WARNING (verified 2026-08-24): Whole Foods' Tuesday and Friday "Days of Deals" (rotisserie chicken, $12 pizza, BOGO sushi) are Amazon Prime-member-only and therefore BANNED under the no-paid-subscription rule: never list them. Trader Joe's runs no sales or promos at all (everyday-price policy): never list Trader Joe's.
- QUALITY CASUAL DINING: also search Chili's (3 For Me price tiers), Noodles & Company (promo codes and bowl deals), and Five Guys on every refresh. Sit-down value bundles with stated prices are excellent deals - use cat "Sit-Down". Five Guys rarely discounts, so only include verified offers.
- GOLDEN STANDARD BRANDS: Chipotle and Chick-fil-A set the quality bar for this site. On EVERY refresh, search these two chains FIRST and include their best currently-active deal whenever one exists. (Free-account deals are allowed for every approved brand: see FREE ACCOUNTS ARE FINE.) Never invent or stretch a deal if nothing qualifies today.
- PLATFORM PICKUP DEALS: also search DoorDash, Uber Eats, and Grubhub for publicized NATIONAL promos anyone can claim - percent-off pickup events, sitewide promo codes, free-delivery weekends. Use brand "DoorDash" / "Uber Eats" / "Grubhub", cat "Pickup", and the platform's official page as the url. All the usual bans apply fully: no new-customer or first-order codes, no DashPass / Uber One / Grubhub+ member perks. Location- or user-personalized app offers never qualify - national and verifiable only.
- REGIONAL HONESTY: for chains that do not operate in most U.S. states (El Pollo Loco, Salad and Go, The Halal Guys, Tijuana Flats, Rock N Roll Sushi, Sushi Maki, Island Fin Poke, Pokeworks, Kura Sushi, Naf Naf Grill, Just Salad, Pollo Tropical (Florida), Rubio's (CA/AZ/NV), Waba Grill (CA/AZ), Honeygrow (Mid-Atlantic & Northeast), Playa Bowls (East Coast), Chicken Salad Chick (South), Taziki's (South), Jason's Deli (South & Central), Chopt (East Coast), Saladworks (Northeast & Mid-Atlantic), Salata (Texas & South), Crisp & Green (Midwest & select states), Bibibop (Midwest & select states), Cafe Zupas (Mountain West & Midwest), Clean Juice (South & East), Robeks (Select states), Luna Grill (SoCal & Texas), Modern Market Eatery (CO & TX, select states), Dig (Northeast), and every grocery chain except Walmart and Whole Foods Market), NEVER write region "National" - state the real footprint instead, e.g. "West Coast", "South Florida", "Select states" (Pokeworks: 22 states, mostly TX/CA/Northeast/Southeast, NOT the Mid-Atlantic), or "FL & Southeast" for Tijuana Flats. A visitor in a state without the chain must never be told the deal is national (Pokeworks was mislabeled "National" and shown to a Virginia visitor, 2026-08-24). For every chain in this list the region field is REQUIRED: OMITTING region on a regional chain is the same lie as writing National (Naf Naf Grill shipped with no region field on 2026-08-29 and its deal was shown to a Florida visitor; the chain's real footprint is Midwest & East, nowhere near Florida). Never describe a regional chain's price as "nationwide" in the description either. These regional chains are never marked best: leave best out entirely, never true.
- HEALTHY QUOTA: aim for at least 6-8 verified deals per day from healthier chains (Sweetgreen, CAVA, Just Salad, Qdoba, Panera, Chipotle, Wingstop, Naf Naf Grill, Smoothie King, Tropical Smoothie, Jamba, Salad and Go, El Pollo Loco, The Halal Guys, Kura Sushi, Sarku Japan, Rock N Roll Sushi, Sushi Maki, Pokeworks, Island Fin Poke, Pollo Tropical, Rubio's Coastal Grill, Waba Grill, Pei Wei, Teriyaki Madness, Honeygrow, Playa Bowls, Nekter Juice Bar, Jason's Deli, McAlister's Deli, Chicken Salad Chick, Taziki's Mediterranean Cafe, Chopt, Saladworks, Salata, Crisp & Green, Bibibop, Cafe Zupas, Clean Juice, Robeks, Luna Grill, Modern Market Eatery, Dig). Search these chains FIRST and most thoroughly: they are the site's identity. The roster is wide so a thin day never happens: teriyaki and grilled-bowl chains (Waba Grill, Teriyaki Madness, Flame-grilled Pollo Tropical), deli-salad chains (Jason's Deli, McAlister's, Chicken Salad Chick), Mediterranean (Taziki's), stir-fry (Honeygrow, Pei Wei), acai and juice (Playa Bowls, Nekter) all run frequent app promos and stated-price value menus. A day with zero healthy deals is a failed refresh. When two similar-value deals compete for a list slot or a Top Pick, the healthier chain ALWAYS wins it.
- PORK-LIGHT FEATURED PICKS: never mark a pork-centric deal (bacon burgers, pepperoni pizza promos, ham/sausage items) as "best". Top Picks should favor chicken, Mediterranean, salad/bowl, smoothie, and plant-forward deals. Pork-centric deals may still appear in the regular list, just never featured.
- For "best" (Top Picks), additionally prioritize deals the MOST people can claim today AND again in the future, so visitors feel real value and come back.
- Never mark more than ONE deal per brand as "best": spread Top Picks across different chains.
- In "expires", always give an explicit end date when one is published ("Through July 20, 2026"); use "Ongoing" for standing menus. Only write "Limited time" if genuinely no end date is published anywhere.
- Add "region":"National" for nationwide deals, or the specific region if limited (e.g. "Texas only", "California"). Leave out unverifiable regional deals.

Output ONLY a single MINIFIED JSON object (no newlines or indentation), no prose, no markdown fences, exactly this shape:
{"deals":[{"brand":"...","cat":"Burgers|Chicken|Mexican|Pizza|Coffee|Cafe|...","color":"#rrggbb","ic":"M","deal":"...","desc":"one sentence","tags":["free","app"],"value":1-5,"expires":"e.g. Through July 20 | This week | Ongoing","url":"https://...","best":true,"est_savings":4}]}`;


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
    // Same brand + same dollar amounts in the TITLE = the same offer worded twice.
    // The top-up sweep merge produced 4 paraphrase duplicates on 2026-08-27 ("3 For
    // Me: Drink, Starter and Entree From $10.99" vs "3 For Me Combo from $10.99")
    // that exact-title dedupe cannot catch; titles always state dollars (owner rule).
    const prices = (String((d && d.deal) || "").match(/\$\s?\d+(?:\.\d{2})?/g) || []).map(p => p.replace(/[^0-9.]/g, "")).sort().join(",");
    if (prices) keys.push(brand + "|$" + prices);
    const code = String((d && d.deal) || "").concat(" ", (d && d.desc) || "").match(/\bcode[:\s]+(?!NEEDED\b|REQUIRED\b|NECESSARY\b|ONLY\b)([A-Z0-9]{3,14})\b/);
    if (code) keys.push(brand + "|code:" + code[1].toUpperCase());
    if (keys.some(k => seen.has(k))) return false;
    for (const k of keys) seen.add(k);
    return true;
  });
  // Second pass: same-brand titles sharing most of their words are the same offer even
  // when the stated PRICE conflicts ("Throwback Thursdaze ... for $8.99" vs the same
  // sentence at $7.99 survived the price key, 2026-08-27). First listing wins.
  const words = t => new Set(String(t || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length >= 3 && !/^\d+$/.test(w)));
  const kept = [];
  for (const d of out) {
    const w = words(d && d.deal), b = key(d && d.brand);
    const dup = kept.some(k => {
      if (key(k.brand) !== b) return false;
      const kw = words(k.deal);
      let inter = 0; for (const x of w) if (kw.has(x)) inter++;
      const union = new Set([...w, ...kw]).size;
      return union > 0 && inter / union >= 0.6;
    });
    if (dup) console.log(`Dropped near-duplicate: ${d.brand}: ${d.deal}`);
    else kept.push(d);
  }
  if (kept.length < deals.length) console.log(`Dropped ${deals.length - kept.length} duplicate deal(s) from model output.`);
  return kept;
}

function dealFieldErrors(d, i) {
  const errors = [];
  const at = `deal[${i}]`;
  for (const f of ["brand", "cat", "ic", "deal", "desc", "expires", "url"]) {
    if (typeof d[f] !== "string" || !d[f].trim()) errors.push(`${at}.${f} missing/empty`);
  }
  if (typeof d.color !== "string" || !/^#[0-9a-fA-F]{6}$/.test(d.color)) errors.push(`${at}.color not a hex color`);
  if (typeof d.url === "string" && !/^https:\/\//i.test(d.url)) errors.push(`${at}.url not https`);
  if (!Array.isArray(d.tags) || d.tags.some(t => !ALLOWED_TAGS.has(t))) errors.push(`${at}.tags invalid`);
  if (!Number.isFinite(d.value) || d.value < 1 || d.value > 5) errors.push(`${at}.value out of range`);
  if ("best" in d && typeof d.best !== "boolean") errors.push(`${at}.best not boolean`);
  if ("region" in d && (typeof d.region !== "string" || d.region.length > 48)) errors.push(`${at}.region invalid`);
  return errors;
}

// Cost control (2026-08-25): a retry re-spends the ENTIRE search budget, so a run is
// only allowed to fail when it is truly unusable. One malformed deal is dropped with a
// log line, cosmetic overflows are trimmed, an over-long list keeps its highest-value
// deals, and extra "best" flags are cleared (build.mjs recomputes Top Picks anyway).
// Only a list that ends up below MIN_DEALS still triggers the retry.
function salvage(deals) {
  if (!Array.isArray(deals)) return { deals: null, errors: ["top-level 'deals' is not an array"] };
  deals.forEach(d => { if (d && typeof d.ic === "string") d.ic = d.ic.trim().slice(0, 3); });
  // est_savings (additive feed field, 2026-08-28; the iOS app reads it as a finite
  // number 0-100): optional editorial savings estimate in US dollars. Normalize to
  // the nearest $0.50 within 0-100; anything non-numeric or out of range is
  // STRIPPED, never invented and never fatal - the field is optional per deal.
  deals.forEach(d => {
    if (d && "est_savings" in d) {
      const n = Number(d.est_savings);
      if (Number.isFinite(n) && n >= 0 && n <= 100) d.est_savings = Math.round(n * 2) / 2;
      else { delete d.est_savings; console.error(`Stripped invalid est_savings on ${(d && d.brand) || "unknown deal"}`); }
    }
  });
  const kept = deals.filter((d, i) => {
    const errs = d ? dealFieldErrors(d, i) : ["not an object"];
    if (errs.length) console.error(`Dropping ${(d && d.brand) || `deal[${i}]`} instead of retrying: ${errs.join("; ")}`);
    return errs.length === 0;
  });
  if (kept.length > MAX_DEALS) {
    kept.sort((a, b) => (b.value || 0) - (a.value || 0));
    kept.length = MAX_DEALS;
    console.error(`Trimmed to the ${MAX_DEALS} highest-value deals instead of retrying.`);
  }
  let best = 0;
  for (const d of kept) if (d.best === true && ++best > 4) d.best = false;
  const errors = kept.length < MIN_DEALS ? [`too few valid deals (${kept.length} < ${MIN_DEALS})`] : [];
  return { deals: kept, errors };
}

async function generate() {
  const messages = [{ role: "user", content: PROMPT }];
  // web_search_20250305: the basic variant that ran reliably for months. Deliberately
  // NOT the 20260209 dynamic-filtering variant: that was half of the combo that hung
  // the 2026-08-27 morning run. Searches bill the same either way.
  const tools = [{ type: "web_search_20250305", name: "web_search", max_uses: MAX_SEARCHES }];

  // Server tools can return stop_reason "pause_turn" for long chains; resend
  // the accumulated turn until the model finishes.
  let response;
  for (let step = 0; step < 6; step++) {
    // effort "medium" trims thinking/output tokens: this is extraction over search
    // results, not deep reasoning, and the validator + build backstops catch slips.
    // cache_control (2026-08-27): each pause_turn round RESENDS the whole accumulated
    // conversation (prompt + every search result so far) at full input price: that,
    // not the searches, is most of the ~$3/run cost. Top-level auto-caching marks the
    // latest prefix each round, so the next round reads it back at ~10% of the price.
    response = await client.messages.create({ model: MODEL, max_tokens: 16000, output_config: { effort: "medium" }, cache_control: { type: "ephemeral" }, tools, messages });
    if (response.stop_reason === "pause_turn") {
      messages.push({ role: "assistant", content: response.content });
      continue;
    }
    break;
  }

  const text = response.content.filter(b => b.type === "text").map(b => b.text).join("\n").trim();
  if (!text) throw new Error("Model returned no text output.");
  let parsed;
  try {
    parsed = extractJson(text);
  } catch (e) {
    // A stray double quote inside one field ("Expected ',' or '}' after property value",
    // run #78 on 2026-08-20) used to throw away a whole 14-search run. Ask the model to
    // repair its own output first: one cheap call, no web search, same deals.
    console.error(`Model output was not valid JSON (${e.message}): asking the model to repair it.`);
    parsed = extractJson(await repairJson(text));
  }
  return Array.isArray(parsed) ? parsed : parsed.deals;
}

async function repairJson(text) {
  const res = await client.messages.create({
    model: REPAIR_MODEL, max_tokens: 16000,
    messages: [{ role: "user", content: `The text below was meant to be ONE minified JSON object of the shape {"deals":[...]} but it does not parse. Return the SAME content as a single valid minified JSON object: escape or remove stray double quotes inside string values, remove trailing commas, comments, markdown fences and any prose. Do not add, drop, or reword deals. Output ONLY the JSON.\n\n${text}` }],
  });
  return res.content.filter(b => b.type === "text").map(b => b.text).join("\n").trim();
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not set.");

  // One attempt = generate (with JSON repair) + dedupe + salvage. Only an unusable run
  // (API error, unparseable output, or fewer than MIN_DEALS valid deals) gets the single
  // retry, because a retry re-spends the full search budget: individually-broken deals
  // are dropped by salvage() rather than failing the run (cost cleanup, 2026-08-25).
  async function attempt() {
    try {
      return salvage(dedupe(await generate()));
    } catch (e) {
      return { deals: null, errors: [e.message || String(e)] };
    }
  }
  let { deals, errors } = await attempt();
  if (errors.length) {
    console.error("First attempt failed: retrying once:");
    for (const e of errors) console.error("  - " + e);
    // Merge the first attempt's valid deals into the retry (cost control, 2026-08-26):
    // a "too few deals" first attempt still found real deals with real search spend,
    // so the retry only has to top the list up, never rebuild it from zero.
    const firstDeals = deals || [];
    const second = await attempt();
    ({ deals, errors } = salvage(dedupe([...firstDeals, ...(second.deals || [])])));
  } else if (deals.length < 12) {
    // Deterministic top-up (owner, 2026-08-27): prompt-level "keep searching" pleas
    // still produced 7-deal sweeps, so a short-but-valid first sweep now always gets a
    // second independent sweep, merged and deduped. Prompt caching keeps it cheap, and
    // a top-up can only grow the list: if it underperforms, the first sweep stands.
    console.log(`Only ${deals.length} deals from the first sweep: running a top-up sweep.`);
    const second = await attempt();
    const merged = salvage(dedupe([...deals, ...(second.deals || [])]));
    if (merged.deals && merged.deals.length > deals.length) deals = merged.deals;
  }
  if (errors.length) {
    console.error("Refresh failed: NOT writing deals.json:");
    for (const e of errors) console.error("  - " + e);
    process.exit(1);
  }

  // Effective US-Eastern date (same convention as build.mjs): the workflow's morning guard
  // compares this to today's Eastern date, so a late-evening manual run must not stamp
  // tomorrow's UTC date and silently cancel the next morning's refresh.
  // updatedAt (exact UTC timestamp) lets the workflow's noon guard tell "refreshed this morning
  // by hand" from "refreshed since noon", so the scheduled noon check always happens.
  const out = { updated: new Date().toLocaleDateString("en-CA", ET), updatedAt: new Date().toISOString(), deals };
  await validateDealUrls(deals);
  writeFileSync(dataPath, JSON.stringify(out, null, 2) + "\n");
  console.log(`Wrote deals.json with ${deals.length} deals (updated ${out.updated}).`);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
