# DailyBite: App Store listing kit (ASO)

App: DailyBite: Healthy Food Deals, iPhone, free, US storefront
App Store ID: 6802622518
URL: https://apps.apple.com/us/app/dailybite-healthy-food-deals/id6802622518
Website: https://dailybitedeals.com
Prepared: 2026-10-19

How to use this file: Section 1 is the baseline audit. Section 2 is the recommended metadata set to paste into App Store Connect (one title, one subtitle, one keyword field, description, promotional text). Section 3 explains the keyword reasoning. Sections 4-7 cover screenshots, preview video, What's New and the review prompt. Section 8 is the measurement plan.

---

## 1. Current listing audit (2026-10-19)

**Fetch status.** The live listing could not be read from this environment: `apps.apple.com` and `itunes.apple.com` (the public lookup API) both returned a proxy policy denial (403 on CONNECT), and third-party mirrors (appgoblin.info, appfollow.io) resolved to ENOTFOUND. Before publishing anything from Section 2, open App Store Connect > App Information and Version Information and fill in the "Current" column below. Everything in that column marked "unverified" is a gap in this audit, not a fact.

| Field | Current (as verifiable from the repo and web index) | Notes |
|---|---|---|
| Title | `DailyBite: Healthy Food Deals` (29/30 chars) | Confirmed from the site's own App Store links in `index.html`, `about.html`, `llms.txt`, and the `app.html` redirect page title. |
| Subtitle | unverified | Not present anywhere in the repo. |
| Keyword field | unverified (private to App Store Connect) | |
| Description | unverified | No copy of the App Store description exists in the repo. |
| Promotional text | unverified | |
| Screenshot count | unverified | Only `appstore-icon-1024.png` is in the repo; no screenshot exports. Target 6 (see Section 4). Minimum to look complete on an iPhone product page is 5. |
| Icon | Green "D" mark with a corner bite, matches the site logo (commit `9320be6`, "site logo and icons now match the live App Store icon"). | Good: icon and website are already consistent. |
| Category | unverified; should be Food & Drink (primary), Shopping (secondary). | Every competitor below sits in Food & Drink. Shopping as secondary adds a second browse surface for "deals"/"coupons" intent. |
| Ratings | unverified | |

**Web index finding.** Three different web searches for the exact title, the numeric ID and the title restricted to `apps.apple.com` returned no result for this app (they returned DailyBite: Calorie Counter, id6756306091, and Daily Bite: Save Recipes, id6779701143, instead). Two implications: (1) the listing is new or thin enough that search engines have not indexed it, which the website can fix by linking to it from more pages with descriptive anchor text ("DailyBite: Healthy Food Deals on the App Store" rather than "Get the iOS app"); (2) there is active name collision in the App Store with two other "DailyBite / Daily Bite" apps in adjacent food categories, so the title must carry the differentiator ("Healthy Food Deals") and the subtitle must not waste characters repeating the brand.

### Competitor listing patterns (from public listings and third-party ASO trackers)

| App | Title (chars) | Subtitle | Pattern worth copying or avoiding |
|---|---|---|---|
| Flipp | `Flipp: Shop Grocery Deals` | `Ads, Savings & Shopping List` | Brand + colon + 3-word category phrase. Subtitle lists features with no repeated word from the title. ~773K ratings, 4.7. Owns "weekly ads", "grocery deals", "shopping list". |
| Upside | `Upside: Gas & Food Cash Back` | varies; "Earn Cash Back on Gas" historically | Leads with the money mechanic ("cash back"), names categories (gas, food). Description quotes concrete numbers (up to 25c/gal, up to 45% at restaurants, $290/yr average). Lesson: numbers in line 1-3 convert. |
| Too Good To Go | `Too Good To Go: End Food Waste` | `Save meals at great prices` / `Save on tasty restaurant food` (varies by storefront) | Mission phrase in the title, price phrase in the subtitle. Shows subtitles are A/B-tested per storefront; verb-led subtitles ("Save...") are the category norm. |
| BuyVia Food Coupons Deal Fast Reward (id992483270) | `Food Coupons Deal Fast Reward` | n/a | Pure keyword-stuffed title (coupons, deal, fast, reward). 8.9K ratings, 4.6. This is the incumbent for "food coupons" and "fast food coupons" searches. Do not fight it on "coupons" in the title; capture it in the keyword field. |
| BuyVia Restaurant Coupons, Fast Food (id1243222763) | `Restaurant Coupons, Fast Food` | n/a | Same developer, second listing to double-dip on "restaurant coupons" and "fast food". Confirms "fast food" + "coupons" are the high-volume head terms in this niche. |
| Gravy Deals (id6756317520) | `Gravy Deals` | `Real-time deals` | New, 18 ratings. "Real-time", "near you", "no sign-up required". Closest positioning overlap (freshness + proximity + no account). DailyBite's edge is verification and the healthy filter. |
| MealsDeals (id6752559609) | `MealsDeals` | none visible | "Food promotions search engine" with a "Healthy" category among Burgers/Pizza/Desserts. Confirms "healthy" is a recognized sub-intent but no app owns it in the title. That is the opening. |
| Hooked Deals | `Hooked Deals` | n/a | Time-limited student deals, "USE IT NOW". Mostly dormant since 2019. Not a current threat. |

Patterns across the set:
1. Title = Brand + colon + category phrase is the norm (Flipp, Upside, Too Good To Go). Keep it.
2. Subtitles are verb- or benefit-led and never repeat a title word.
3. Nobody in the US store owns "healthy" + "deals" in title or subtitle. The incumbents own "coupons", "fast food", "grocery deals", "cash back".
4. 2025 Food & Drink metadata reporting (Mobile Action 2026 ASO report) says category discovery is dominated by "food", "order", and a rising "meal". "Deals", "coupons", "cheap" are mid-tail, which is exactly where a new app with few ratings can rank.
5. Every competitor with ratings leads its description with a concrete number. DailyBite has them: ~7 AM ET re-verification, 53 chains and 493 verified listings in the 52-day Aug-Oct 2026 report window, a public verification log, $5 grocery sushi days, 60-meal protein-per-dollar index.

---

## 2. Recommended metadata (paste-ready)

### 2.1 Title options (30-char limit)

| # | Title | Chars | Targets | Recommendation |
|---|---|---|---|---|
| T1 | `DailyBite: Healthy Food Deals` | 29 | "healthy food deals", "food deals", "healthy food", "healthy deals" | **Use this.** Already live, matches the site and icon, and is the only title in the niche carrying "healthy". Changing a title resets ranking history; only do it with evidence. |
| T2 | `DailyBite: Verified Food Deals` | 30 | "food deals", "verified deals" | Fallback if "healthy" proves to attract diet/calorie-tracker intent (watch Search Ads conversion on "healthy" terms). Leans on the trust differentiator. |
| T3 | `DailyBite: Cheap Healthy Meals` | 30 | "cheap healthy meals", "cheap meals", "healthy meals" | Fallback if the Meals tab (protein per dollar index) becomes the main use case. "Meal" is the rising term in Food & Drink metadata; "cheap healthy meals" is a query people already type into Google for the site's `/cheap-healthy-meals` page. Loses "deals" from the title, which the subtitle would then have to carry. |

### 2.2 Subtitle options (30-char limit)

Rule applied: no word repeated from the title (Apple indexes title and subtitle together, so a repeat wastes the slot).

| # | Subtitle | Chars | Pairs with | Adds to the index | Recommendation |
|---|---|---|---|---|---|
| S1 | `Verified daily. Nearby & cheap` | 30 | T1 | verified, daily, nearby, cheap | **Use this.** Carries the three differentiators in order of importance: trust, freshness, proximity, price. Reads as a benefit in 4 beats. |
| S2 | `Salads, bowls, sushi near you` | 29 | T1 or T2 | salads, bowls, sushi, near, you | Best for pure search coverage (three food nouns with real volume) but says nothing about verification. Test as a second variant in Product Page Optimization. |
| S3 | `Cheap eats, verified each day` | 29 | T1 | cheap, eats, verified, day | "Cheap eats" is a strong query family (Yelp/Google term) and "eats" indexes "Uber Eats"-adjacent searches. Slightly weaker on proximity. |

Alternate if the team prefers a softer tone: `Fresh every morning, near you` (29). Weaker on keywords (only "fresh", "morning", "near").

### 2.3 Keyword field (100-char limit, comma-separated, no spaces)

For the recommended pairing T1 + S1 (indexed words already covered: dailybite, healthy, food, deals, verified, daily, nearby, cheap):

```
coupons,restaurant,fast,lunch,discount,salad,bowl,sushi,smoothie,grocery,eats,meal,near,me,today
```

96 characters. Singulars only (Apple matches plural forms); no competitor or chain trademarks (App Review Guideline 2.3.7 risk, and chain names convert poorly to a non-chain app); no words already in title or subtitle; no "app", "free", "iphone" (Apple ignores them).

Alternates for the other pairings:

- T1 + S2 (salads, bowls, sushi, near, you already indexed): `coupons,restaurant,fast,lunch,discount,verified,smoothie,grocery,eats,meal,today,halal,poke,fresh` (97)
- T3 + S1 (healthy, meals, cheap, verified, daily, nearby already indexed): `deals,coupons,restaurant,fast,lunch,discount,salad,bowl,sushi,smoothie,grocery,eats,near,me,today` (97)

Second indexed locale (optional, advanced). The US storefront also indexes the Spanish (Mexico) localization's title, subtitle and keyword field. Adding an es-MX localization with the same screenshots gives 100 more characters that count in US search. Use it for overflow English terms and the few Spanish queries that matter: `poke,halal,bagel,deli,dinner,breakfast,fresh,protein,budget,saver,ofertas,comida,descuentos` (92 chars). Validate in Search Ads before relying on it.

### 2.4 Description (4000-char limit)

Only the first three lines show before "more" on iPhone. They must carry the pitch, the exclusions and the free/no-account promise. The description is not indexed for search on iOS, so it is written for conversion, not keywords.

```
Today's healthy food deals, re-verified this morning and sorted by distance from you.
Bowls, salads, smoothies, sushi, grilled chicken, halal and grocery prepared-food counters. Never burgers, pizza, wings or dessert chains.
Free, no account, and every deal is one anyone can walk in and claim: no paid-membership perks, no first-order-only promos.

WHAT YOU GET

• A fresh list every morning. Around 7 AM Eastern, every deal is re-checked against the chain's own app, website, newsroom or weekly ad. If it can't be confirmed as active today, it isn't shown. Every check is logged publicly at dailybitedeals.com/verification-log.
• Distance and open/closed status for each deal, so you know before you leave whether the location is open right now.
• One-tap ordering. Each deal opens in the chain's own app or site. DailyBite never sits between you and the restaurant.
• Regional deals labeled with their real footprint (for example "FL & Southeast" or "DC, MD, VA"), so you don't drive to a deal that only runs in another state.
• Weekly staples you can plan around: Publix $5 Sushi Wednesday, Sprouts and Kroger Sushi Wednesday, Safeway and Harris Teeter $5 sushi Friday, H-E-B $7 sushi days, Smoothie King Free Upsize Friday, Panera's $4.99 Mix & Match, Publix Sub of the Week.
• Cheapest healthy meals. A ranked index of specific orders at healthy chains and grocery counters with price, calories and protein from official sources, sorted by grams of protein per dollar.

WHO IS ON THE LIST

Chipotle, CAVA, Sweetgreen, Panera, Chick-fil-A, Starbucks, Tropical Smoothie Cafe, Smoothie King, Jamba, El Pollo Loco, Nando's, Just Salad, Saladworks, Salad and Go, Naf Naf Grill, The Halal Guys, Pokeworks, Kura Sushi, Potbelly, Noodles & Company, Subway, and grocery prepared-food counters at Publix, Kroger, Safeway, Harris Teeter, H-E-B, Hy-Vee, Meijer, ShopRite, Sprouts, Whole Foods, Wegmans, Trader Joe's and Target, with more added as they pass the bar.

WHAT WE LEAVE OUT, ON PURPOSE

• Burger, pizza, wing and dessert chains, no matter how good the promo looks.
• Deals locked behind paid subscriptions (DashPass, Uber One and similar).
• Rewards-member-exclusive or targeted app offers that not everyone can claim.
• First-order-only and new-customer-only promos.
• Anything we could not verify this morning.

If it's in DailyBite, you can walk in today and get it.

HOW VERIFICATION WORKS

An automated pipeline runs every morning, searches official brand sources and established deal trackers, discards anything it cannot confirm as currently active, and rebuilds the list. The owner also tests deals in person. Offers can still vary by location, so always confirm the price in the restaurant's own app before you order.

WHO MAKES IT

DailyBite is independent and run by one person, Jacob Elsayed. It is not affiliated with any restaurant or grocery chain. There are no display ads. Deal listings are never sponsored and every "Get deal" link goes straight to the chain. The app may earn a commission if you sign up for a clearly marked partner delivery or cash-back service; that never affects which deals are listed or how they are ordered.

PRIVACY

Your location is used only to sort deals by distance and show open/closed status. No account is required.

The app shows the exact same list as dailybitedeals.com, refreshed every morning.

Questions or corrections: jacob@dailybitedeals.com
```

Check before pasting: the PRIVACY paragraph must match the app's actual data-collection behavior and the App Privacy nutrition label; adjust if location is sent to a server.

### 2.5 Promotional text (170-char limit)

Promotional text can be changed without a new build, so use it for the current week's hook. It is not indexed.

Default (146 chars):

```
New every morning: today's verified healthy deals near you, from $5 grocery sushi days to $6.99 bowls. Free, no account, no paid-membership perks.
```

Rotations (each under 170):

- Wednesday push: `It's Sushi Wednesday: Publix, Sprouts, Kroger and Meijer sushi deals are live and verified this morning. See which counters near you are open now.`
- Friday push: `Friday: Safeway and Harris Teeter $5 sushi, Smoothie King free upsize. Every deal re-checked at 7 AM ET against the chain's own app.`
- Launch week / Product Hunt: `Just launched. Every healthy deal re-verified each morning, with a public log of every check. No burgers, no pizza, no paid-membership perks.`

---

## 3. Keyword reasoning (search-volume grounding)

Data caveat. No paid ASO tool (AppTweak, Sensor Tower, Mobile Action) or Apple Search Ads account was available in this session, and since October 2025 Apple's Search Ads API only returns a Search Popularity score for keywords scoring 35 or higher, so most niche "deals" terms show no public score at all. The volume tiers below are therefore reasoned from: (a) which terms incumbents put in their 30-character titles (developers only spend title characters on terms they have measured), (b) App Store autocomplete behavior for the US storefront, (c) Google query families the website already ranks for, and (d) Apple Search Ads category data reported for Food & Drink in 2025-2026. Step 1 of the measurement plan (Section 8) is to validate every tier with the free Apple Search Ads Keyword Planner, which shows popularity for terms scoring 35+ and "low" for everything below.

Apple's index combines words across title, subtitle and keyword field, so the goal is phrase coverage, not exact phrases. With T1 + S1 + the keyword field, the indexed word set is:

`dailybite, healthy, food, deals, verified, daily, nearby, cheap, coupons, restaurant, fast, lunch, discount, salad, bowl, sushi, smoothie, grocery, eats, meal, near, me, today`

### 3.1 Head terms (highest volume; the app will not rank top-10 for these at launch but needs to be indexed for them)

| Query family | Covered by | Why it matters | Expected difficulty |
|---|---|---|---|
| fast food deals, fast food coupons | fast + food + deals/coupons | The single biggest "deals" query in Food & Drink: two incumbent BuyVia listings put "Fast Food" in their titles. The website's own SEO already leans on "fast food app deals". Indexing "fast" costs 4 chars and unlocks the whole family. | High. Goal: indexed, then climb as ratings grow. |
| food deals, food deals near me | food + deals + near + me | Generic head term. "near me" is the dominant modifier on mobile for food; Gravy and BuyVia both lean on "near you". "me" may be treated as a stop word by Apple; it costs 2 chars, so it stays. | High. |
| restaurant deals, restaurant coupons | restaurant + deals/coupons | BuyVia's second title is literally "Restaurant Coupons". Users who type "restaurant" are deal-seekers, not orderers. | High for "coupons", medium for "deals". |
| grocery deals | grocery + deals | Flipp's title term. DailyBite is the only deals app covering grocery prepared-food counters, so it can rank for the long tail "grocery sushi deals", "grocery deli deals". | High on the head, low on the long tail. |

### 3.2 Core terms (mid volume, winnable within 60-90 days; this is where the title and subtitle spend their characters)

| Query family | Covered by | Why it matters |
|---|---|---|
| healthy food deals, healthy deals, healthy food near me | healthy + food + deals + near | No US app has "healthy" with "deals" in its title. MealsDeals offers "Healthy" only as a category. The phrase is the app's entire reason to exist and the website's brand term. Expect #1 quickly for the exact phrase and to pull in "healthy food" browse traffic, which is high volume (calorie trackers compete here, hence T2 as a fallback if that traffic does not convert). |
| cheap food, cheap eats, cheap healthy food, cheap lunch | cheap + food/eats/lunch | "Cheap" is the price intent word that "deals" users also type. "Cheap eats" is a Yelp/Google category. The website's `/cheap-healthy-meals` page already ranks for the Google version. |
| lunch deals, lunch deals near me, cheap lunch near me | lunch + deals + near | The app's peak usage window is the weekday lunch decision. "Lunch" is a time-intent word with meaningful volume and almost no deals-app competition (ordering apps own "lunch delivery", not "lunch deals"). |
| food discount, restaurant discount | discount + food/restaurant | Synonym coverage for users who do not type "deal" or "coupon". Cheap to include (8 chars) and uncontested. |
| verified deals, daily deals | verified + daily + deals | Low volume but zero competition; it is the trust story and it costs no extra characters because it is in the subtitle. "Daily deals" also catches a general shopping query. |
| deals near me, deals nearby | near + me + nearby + deals | Proximity modifier; "nearby" (subtitle) and "near" (keyword field) are indexed as different tokens, so both are covered. |

### 3.3 Food-noun terms (the long tail that converts best)

| Query family | Covered by | Why it matters |
|---|---|---|
| sushi deals, cheap sushi, grocery sushi, sushi wednesday | sushi + deals/cheap/grocery | The website's strongest content cluster (10 grocery sushi-day pages, `/sushi-deals`). "Sushi" has real App Store volume from ordering intent; adding "deals/cheap" filters to the right users. Nobody competes here. |
| salad deals, cheap salad, salad near me | salad + deals/cheap/near | Sweetgreen, Just Salad, Saladworks, CAVA users. Catches "healthy lunch" intent without the diet-app noise. |
| bowl deals, cheap bowls | bowl + deals/cheap | Chipotle/CAVA/poke bowl is the category's hero format and the app's core content. |
| smoothie deals, cheap smoothie | smoothie + deals | Three smoothie chains are on the roster with recurring weekly deals (Smoothie King Friday, Tropical Smoothie $2). Smoothie searchers skew healthy. |
| meal deals, cheap meals, healthy meals | meal + deals/cheap/healthy | "Meal" is the rising term in Food & Drink metadata per the 2026 ASO category report, and the Meals tab (protein per dollar) is a second product surface. |
| food today, deals today | today + food/deals | Catches "what's open today / deals today" intent and reinforces the freshness story. |

### 3.4 Deliberately excluded

| Term | Reason |
|---|---|
| Chain names (Chipotle, Panera, Publix, Sweetgreen, CAVA, Starbucks) | App Review Guideline 2.3.7 (metadata must not include third-party trademarks without permission) is enforced inconsistently but is a rejection risk; and a user searching "Chipotle" wants the Chipotle app, so conversion would be poor and would drag the conversion-rate signal down. Name them in the description and screenshots instead, which are not indexed. |
| coupon (singular) vs coupons | Apple matches plurals; one form is enough. "coupons" matches the incumbents' spelling. |
| free, app, iphone, best, new | Apple ignores these in the keyword field. |
| delivery, order | Ordering intent is owned by DoorDash/Uber Eats with millions of ratings; impossible to rank and attracts the wrong user. |
| rewards, points, cash back | Owned by chain apps (Chick-fil-A, Starbucks) and Upside. DailyBite explicitly excludes rewards-member offers, so ranking here would create mismatched expectations and bad reviews. |
| diet, calorie, nutrition, keto, vegan | The "healthy" word already risks pulling diet-tracker intent; adding these would make it worse and compete with DailyBite: Calorie Counter, a different app. |
| burger, pizza, wings | The app never lists them; indexing them would generate 1-star "no McDonald's deals" reviews. |

---

## 4. Screenshot set (6, in order)

Format: 6.9" (1320x2868) and 6.5" (1284x2778) portrait, device frame on brand green (#31c96e accent on #0e1310 dark, or the light palette #1f9e54 on #f2f6f2). Headline in Poppins 700 to match the site logo, 2 lines max; subline in the system font. Show real deal cards with real brands and real prices from `deals.json`, never mockups with placeholder text. Only the first 3 screenshots are visible without scrolling in search results, so 1-3 must each stand alone.

| # | Headline | Subline | What's on screen |
|---|---|---|---|
| 1 | Today's healthy deals, verified this morning | Re-checked at 7 AM ET against the chain's own app | Home list, 6-8 real cards, "Updated today 7:06 AM ET" badge visible at top. |
| 2 | Sorted by how close they are | Open now or closed, before you leave | Same list zoomed: distance chips ("0.4 mi") and green "Open until 9 PM" / grey "Closed" states. |
| 3 | Bowls, salads, sushi, smoothies | Never burgers, pizza, wings or dessert | Category filter row selected, cards from CAVA/Sweetgreen/Publix sushi/Tropical Smoothie. |
| 4 | One tap to order | Opens the deal in the chain's own app | Deal detail with the "Get deal" button and the chain app opening (split or stacked frame). |
| 5 | Grocery sushi days and weekly staples | Publix $5 Wednesday, Safeway $5 Friday, Smoothie King upsize | Cards for the recurring weekly deals with weekday tags. |
| 6 | If it's listed, anyone can claim it | No paid-membership perks, no first-order promos, no account | A "What we leave out" card or the exclusion rules rendered as a checklist, plus the public verification log count ("493 deals verified across 52 days"). |

Optional 7th if the Meals tab is in the shipping build: "Cheapest healthy meals, ranked" / "Protein per dollar from official nutrition pages" showing the Trader Joe's and Subway rows.

Caption lines double as the alt text and the Product Page Optimization variants: test Set A (above) against Set B where screenshot 1 leads with "Healthy food deals near you" to see whether proximity or verification wins the first impression.

---

## 5. App preview video shot list (15-30 s, no voiceover, captions burned in)

Portrait, captured on device via screen recording, 1080x1920 or 886x1920. First frame must be the list, not a logo. Mute-safe: all meaning carried by on-screen captions. Apple allows text overlays but not device frames or hands.

| Time | Shot | Caption |
|---|---|---|
| 0-3 s | App opens straight to today's list; "Updated today 7:06 AM ET" badge pulses once. | "Today's healthy food deals. Verified this morning." |
| 3-7 s | Slow scroll through 4-5 cards: CAVA, Sweetgreen, Publix sushi, Tropical Smoothie, El Pollo Loco. Distance chips visible. | "Bowls, salads, sushi, smoothies. Sorted by distance." |
| 7-11 s | Tap a card. Detail shows price, expiry, region label, "Open until 9 PM". | "Open now? Regional? You'll know before you go." |
| 11-15 s | Tap "Get deal". Chain app opens with the offer. Cut back to DailyBite. | "One tap, straight to the chain's own app." |
| 15-20 s | Tap the category filter; burger/pizza are simply not options. Quick cut to the exclusions card. | "Never burgers, pizza, wings or dessert. No paid-membership perks." |
| 20-25 s | Pull to refresh; verification log entry appears ("Oct 19, 7:06 AM ET, 9 deals passed"). | "Every check is public. If we can't verify it, it isn't here." |
| 25-28 s | End card: icon, "DailyBite", "Free. No account." | "Free. No account. New every morning." |

Cut a 15-second version (shots 1, 2, 4, 7) for the search-results autoplay, where only the first few seconds are seen.

---

## 6. "What's New" template

Release notes are indexed by nobody and read by few, but they appear on the product page and signal maintenance. Keep to 4-6 lines; lead with something a user can feel. Template:

```
[Version X.Y]

• [One user-visible improvement in plain words, e.g. "Deals now show whether the location is open right now, not just its hours."]
• [Second improvement or new chain/region, e.g. "Added H-E-B and Hy-Vee sushi days for Texas and the Midwest."]
• [Fix, e.g. "Fixed distance sorting when location permission is set to 'While Using'."]

Still true in every version: every deal is re-verified each morning at about 7 AM Eastern, nothing requires a paid membership, and the app stays free with no ads.

Found a deal that didn't hold up? Email jacob@dailybitedeals.com and it will be re-checked.
```

Rules: never write "bug fixes and performance improvements" alone; never announce a deal that expires before the review window closes; keep the standing paragraph so the trust story appears on every version.

---

## 7. In-app review prompt (SKStoreReviewController / StoreKit `requestReview`)

Constraints from Apple: the system prompt can be shown at most 3 times per 365 days per device; it must come from the StoreKit API, never a custom "Rate us" button that calls the API on tap; it must not interrupt a task; it does not appear in debug builds. Apple discourages, and reviewers sometimes reject, "Do you like the app?" pre-gates that hide the prompt from unhappy users, so do not gate.

Trigger when all of the following are true, then show the prompt once and record the version:

1. Install age at least 7 days and the app has been opened on at least 3 distinct days (a user who comes back on a third morning has formed the habit the prompt is asking them to endorse).
2. The user has tapped "Get deal" at least once and has just returned to DailyBite from the chain's app or site (the return-to-foreground event after an outbound tap is the natural end of a completed task, and the user has just received value).
3. The current session is at least 20 seconds old and the list loaded successfully, with at least 6 deals shown (never prompt on an empty, thin or failed list, and never on the very first screen of a session).
4. No permission dialog (location, notifications) has been shown in this session, and the user did not just dismiss one.
5. Local time is between 7:30 AM and 1:30 PM (the fresh-list, lunch-decision window, when the app is most useful and the user is least rushed; avoid late-night sessions).
6. Not previously prompted on this app version, and at most 2 prompts per year from the app's own counter (leave Apple's third slot unused so a future major release can use it).

Re-prompt policy: after a major version (new tab, new region coverage), reset the version flag so returning users who upgraded can be asked again, still subject to the yearly cap.

Fallback path for feedback: a "Report a deal problem" link in Settings that opens an email to jacob@dailybitedeals.com, so frustrated users have somewhere to go that is not the review form. A "Rate DailyBite" row in Settings is allowed if it deep-links to the App Store write-review URL (`https://apps.apple.com/app/id6802622518?action=write-review`) rather than calling the StoreKit prompt.

Expected effect: with the website's 9-21 deals per day and a Wednesday/Friday sushi cadence, most qualified prompts will land on a Wednesday or Friday morning, which is also when the list is longest and the user mood is best.

---

## 8. Measurement plan and sequencing

1. Week 0: In App Store Connect, record the current subtitle, keyword field, description and screenshot count into Section 1. Set primary category Food & Drink, secondary Shopping.
2. Week 0: Open the free Apple Search Ads Keyword Planner and look up every term in Section 3. Any head term returning a popularity score below 35 (shown as "low") is cheaper to rank for than assumed; move it from 3.1 to 3.2 in this file. Any 3.3 term showing 35+ is a bigger opportunity than assumed and may deserve subtitle placement.
3. Week 1: Publish T1 + S1 + the 96-char keyword field, the description, promo text and the 6 screenshots in the same version. Do not change the title.
4. Weeks 2-8: Track keyword ranks weekly for: healthy food deals, healthy deals, food deals near me, cheap healthy food, lunch deals, sushi deals, salad deals, fast food deals, restaurant coupons, grocery deals. Expect top-10 on the "healthy" and food-noun terms within 4 weeks and indexed-only on head terms.
5. Week 4: Start a Product Page Optimization test: screenshot Set A vs Set B (Section 4). Run until 90% confidence or 8 weeks.
6. Week 8: If "healthy" terms show impressions but weak conversion, test subtitle S2 or S3 against S1. Only consider title T2/T3 after two subtitle tests.
7. Ongoing: rotate promotional text on Wednesday and Friday mornings to match the sushi cadence; publish a release at least every 6 weeks so "What's New" stays dated within the current quarter.
8. Add the es-MX localization (Section 2.3) once the English set has 4 weeks of rank data, so its effect can be isolated.
