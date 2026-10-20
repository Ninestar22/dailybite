# DailyBite paid campaign kit

Prepared 2026-10-19 for dailybitedeals.com and the free iPhone app
(App Store id 6802622518). Test budget: $300 to $500 a month, one operator,
no agency, no mobile measurement partner (MMP). Everything below is sized
for that. Facts about platforms were checked against October 2026 sources;
the list is at the end. Benchmarks are third-party medians, not promises.

What we are selling: a free, no-account list of today's verified healthy
food deals (fast-casual bowls, salads, smoothies, sushi and poke, Mediterranean,
grilled chicken, grocery prepared-food counters). Re-verified every morning
around 7 AM Eastern. No burger, wing, pizza or dessert chains. No paid-membership
perks, no first-order-only promos, no targeted app offers. The ads must say
that, because it is the only thing coupon aggregators cannot copy in a week.

Two things paid media must never do here:

- Send traffic to the legacy chain pages that contradict the editorial rule
  (`/burger-king-deals`, `/dominos-deals`, `/arbys-deals` still exist in the
  repo). Landing pages are limited to `/`, `/sushi-deals`,
  `/cheap-healthy-meals`, `/app`, `/food-deals-by-day` and the grocery sushi
  explainers.
- Use chain logos or trademarks in creative. Chain names in plain text as
  facts ("Publix $5 Sushi Wednesday") are fine; logos, brand colors and
  "official" framing are not.

---

## 1. Channel ranking for a $300 to $500 budget

| Rank | Channel | Monthly share | Role | Why |
|---|---|---|---|---|
| 1 | Apple Ads (Advanced) | 50%: $150 to $250 | App installs | The only channel where intent, placement and conversion all happen in one place. US Food & Drink search-results benchmarks run about $1.20 to $2.30 cost per tap and $2.20 to $5.50 cost per install, with ~40% tap-to-install conversion. No SDK or MMP needed: Apple attributes installs on-device and reports them in the Apple Ads dashboard and App Store Connect. No minimum spend. |
| 2 | Pinterest Ads | 30%: $90 to $150 | Site traffic, evergreen pages | Pinterest is a planning engine: "sushi wednesday", "cheap healthy meals", "meal prep on a budget" are saved and re-surfaced for weeks. No official minimum daily budget; $5 to $10 a day is workable. Food CPCs are roughly $0.50 to $1.00 and food CPMs $3 to $7. The daily pin pipeline in `SOCIAL.md` already renders 2:3 creative, so production cost is near zero. Promoted pins keep earning organic saves after the budget ends, which no other paid channel does. |
| 3 | Reddit Ads | 20%: $60 to $100 (run as a 14-day burst, not all month) | Site traffic, community fit | Subreddit targeting puts us in front of r/EatCheapAndHealthy, r/MealPrepSunday and chain subreddits where the question "what's the cheapest healthy thing at X" is asked daily. $5 a day minimum per ad group, consumer CPCs roughly $0.50 to $1.85. The audience is skeptical of hype, which suits a verification-log pitch. Promoted posts are allowed in r/Frugal even though organic self-promotion is banned there (`GROWTH.md` rule 8 is about organic posts). |
| 4 | Google Ads | 0% in month 1; $60 (about $2/day) in month 2 if budget is $500 | Brand protection, one high-intent generic | See "Why Google Search is weak" below. We run it only to own the brand query and to learn what "healthy food deals near me" costs, with strict exact match and a hard cap. |
| 5 | Meta (Instagram) | 0% in months 1 and 2 | Held in reserve | Instagram is already handled organically (`SOCIAL.md`). Paid Instagram for a free content site has no purchase event to optimize toward, so Meta's delivery system optimizes for cheap clicks, and food-deal clicks on Instagram skew toward people who want the junk-food chains we exclude. Use the four ads in section 4 only if Pinterest fails its kill criteria and the budget needs a second social channel. |

Budget plans:

| | $300 plan | $500 plan |
|---|---|---|
| Apple Ads | $150 ($5/day) | $220 (about $7.30/day) |
| Pinterest | $90 ($3/day, all month) | $150 ($5/day) |
| Reddit | $60 (12 days at $5/day) | $70 (14 days at $5/day) |
| Google | off | $60 ($2/day, brand + one generic) |
| Meta | off | off |

### Why Google Search is weak for a deal aggregator

1. The chains outbid us on their own names. "chipotle deals" is a Chipotle
   query; Chipotle, DoorDash, Uber Eats and Grubhub all bid, and they have a
   transaction to pay for the click. We have a free page.
2. "near me" queries are answered by the local pack and Maps before the
   first text ad. Google routes "healthy food near me" to restaurants, not to
   lists of restaurants.
3. Restaurant and food CPCs average about $2.05 in 2026 (WordStream/LocaliQ).
   A $2 click to a free page that earns at most a few cents of affiliate
   commission per thousand visits never pays back directly. The only
   payback is habit formation (a repeat visitor), which Google cannot
   optimize toward.
4. Google already sends us the queries that matter for free. The
   `GROWTH.md` playbook and `llms.txt` exist because organic and AI-search
   referrals are the real Google channel. Paying for the same queries
   cannibalizes clicks we would get anyway.
5. Established aggregators (Slickdeals, Krazy Coupon Lady, RetailMeNot) bid
   on generic "food deals" terms with far larger budgets, and Google's
   quality score favors their history.

So Google gets one small campaign: brand terms we must own (so no one
else buys "dailybite"), plus exact-match "healthy food deals near me"
variants where our page is the literal answer.

---

## 2. Apple Ads (formerly Apple Search Ads)

### Basic vs Advanced, and which to use

- **Apple Ads Basic**: pay per install, Apple picks keywords and bids,
  search results placement only, minimal reporting. Third-party guides
  cite a $10,000/month cap; Apple's own page does not state one. Fine for
  a developer who wants zero work, useless for learning.
- **Apple Ads Advanced**: pay per tap (CPT) with a max bid you set, daily
  budget at campaign level, no minimum or maximum spend, keyword control,
  Search Match (Apple adds matching queries automatically), ad variations
  using custom product pages (CPPs), and extra placements (Today tab,
  Search tab, product pages). Search results campaigns are now split into
  "Manage Bids" (you set keyword bids) and "Maximize Conversions"
  (auto-bidder).

**Use Advanced with Manage Bids.** We need keyword-level data to learn
what people actually type, and we need CPP ad variations to test angles.
Maximize Conversions needs more installs per day than $5 buys.

Settings for every campaign: Storefront United States, iPhone only (the
app is iPhone), all ages 18+, all genders, Search Match **off** except in
the Discovery ad group, dayparting off for month 1 (deal interest peaks
7 to 11 AM local, but we need the data first). Negative keywords across
every campaign: `burger`, `pizza`, `wings`, `mcdonalds`, `taco bell`,
`wendys`, `dominos`, `doordash`, `uber eats`, `grubhub`, `dashpass`,
`recipes`, `calorie counter`, `diet tracker`, `game`.

### Campaign structure

| Campaign | Ad group(s) | Match | Daily budget ($300 / $500 plan) | Default max CPT | CPA goal |
|---|---|---|---|---|---|
| **DB-US-Brand** | Brand exact | Exact | $1.00 / $1.30 | $0.60 | $1.00 |
| **DB-US-Competitor** | Deal apps exact; Grocery/coupon apps exact | Exact | $1.50 / $2.00 | $1.25 | $5.00 |
| **DB-US-Generic** | High-intent exact; Healthy exact; Discovery (broad + Search Match on) | Exact / Broad | $2.50 / $4.00 | $1.50 exact, $1.00 broad | $4.00 |

Why three: brand terms would otherwise be stolen by the generic campaign
at generic prices; competitor terms convert worse and must not drag the
generic campaign's averages; the Discovery ad group's only job is to feed
new exact-match keywords to the other two groups each week. Add every
search term that produces an install as an exact keyword in its proper
group, and add it as a negative in Discovery.

### 30 keywords with match type and starting bid

Starting bids sit at or under the low end of the US Food & Drink CPT
benchmark ($1.20 to $2.30). Apple's suggested bid will be higher; ignore it
for two weeks, then raise bids only on keywords with an install.

**DB-US-Brand (exact), 5 keywords, $0.60 max CPT**

| Keyword | Match | Start bid |
|---|---|---|
| dailybite | Exact | $0.60 |
| daily bite | Exact | $0.60 |
| dailybite deals | Exact | $0.60 |
| daily bite deals | Exact | $0.60 |
| dailybitedeals | Exact | $0.60 |

**DB-US-Competitor (exact), 10 keywords**

Bidding on another app's name is allowed in Apple Ads; using their name in
our creative is not, and we do not. Expect lower conversion: people typing
"flashfood" want Flashfood. We buy these to appear as the alternative that
does not need a membership.

| Keyword | Match | Start bid | Ad group |
|---|---|---|---|
| too good to go | Exact | $1.25 | Deal apps |
| flashfood | Exact | $1.25 | Deal apps |
| hooked deals | Exact | $1.10 | Deal apps |
| slickdeals | Exact | $0.90 | Deal apps |
| restaurant deals app | Exact | $1.40 | Deal apps |
| flipp | Exact | $0.90 | Grocery/coupon |
| ibotta | Exact | $1.00 | Grocery/coupon |
| fetch rewards | Exact | $0.90 | Grocery/coupon |
| krazy coupon lady | Exact | $1.10 | Grocery/coupon |
| retailmenot | Exact | $0.90 | Grocery/coupon |

**DB-US-Generic, 15 keywords**

| Keyword | Match | Start bid | Ad group |
|---|---|---|---|
| food deals | Exact | $1.50 | High-intent |
| food deals near me | Exact | $1.60 | High-intent |
| fast food deals | Exact | $1.40 | High-intent |
| restaurant deals | Exact | $1.50 | High-intent |
| restaurant coupons | Exact | $1.30 | High-intent |
| lunch deals | Exact | $1.40 | High-intent |
| meal deals | Exact | $1.30 | High-intent |
| healthy food deals | Exact | $1.60 | Healthy |
| cheap healthy meals | Exact | $1.50 | Healthy |
| healthy fast food | Exact | $1.40 | Healthy |
| cheap healthy food | Exact | $1.40 | Healthy |
| sushi deals | Exact | $1.50 | Healthy |
| grocery deals | Exact | $1.20 | Healthy |
| cheap eats | Broad | $1.00 | Discovery |
| discount food app | Broad | $1.00 | Discovery |

Discovery also runs Search Match on. Review its search terms every Monday.

### 5 ad variations (custom product page angles)

Ad variations in search results pull their screenshots and app preview
from a custom product page; the app name and subtitle stay fixed. Build
five CPPs in App Store Connect (the limit is far above five), each with a
different first-three-screenshot story, and pair each with the ad group it
was written for. Keep screenshot 1 readable at thumbnail size: one line of
copy, max six words, Poppins 700, on the app's dark green (#0e1310 /
#31c96e) or light (#f2f6f2 / #1f9e54) theme.

| # | CPP name | Angle | Screenshot 1 headline | Screenshot 2 | Screenshot 3 | Pair with |
|---|---|---|---|---|---|---|
| 1 | `cpp-verified` (default) | Trust | "Verified this morning" | Deal card with "updated 7:04 AM ET" badge and "Get deal" button | Verification log view: "31 of 38 deals passed today" | Brand; Generic High-intent |
| 2 | `cpp-healthy` | Filter | "Deals. Minus the junk." | List showing bowls, salads, sushi, smoothie deals; caption "No burger, wing, pizza or dessert chains" | Protein-per-dollar meal row | Generic Healthy |
| 3 | `cpp-nearby` | Utility | "Open now, 0.4 mi" | Map/list with distance and open/closed status | One-tap "Order in Chipotle app" sheet | Generic High-intent (food deals near me, lunch deals) |
| 4 | `cpp-sushi` | Niche hook | "$5 sushi. Which day?" | Grocery sushi day calendar (Publix Wed, Safeway Fri, H-E-B Wed/Sat) | Deal card for Sprouts Sushi Wednesday with region label | Generic Healthy (sushi deals, grocery deals) |
| 5 | `cpp-nomembership` | Anti-aggregator | "No account. No membership. Free." | Deal card with "Anyone can claim" label; caption "No DashPass, no Uber One, no rewards-only offers" | Side-by-side: "what we skip" list vs "what we list" | Competitor (all) |

Measure each CPP by tap-through rate and conversion rate in the Apple Ads
"Ad variations" report after 500 impressions. Promote the winner's
screenshots to the default product page after four weeks.

---

## 3. Pinterest Ads

Account prerequisites (all in `SOCIAL.md`): business account, domain
claimed, Pinterest tag installed on the site (needed for the Traffic
objective's "outbound click" optimization and for retargeting later).
Pinterest has no official minimum daily budget; we run $3 to $5 a day.

**Important limitation:** Pinterest's App Install objective requires an
approved MMP (AppsFlyer, Adjust, Singular, Branch, Kochava) to pass
install events back. We have none, and adding one is not worth it at
this budget. Campaign 3 therefore uses the Consideration (traffic)
objective to `dailybitedeals.com/app`, which carries the Smart App Banner
(`apple-itunes-app` meta) and a tracked App Store campaign link (section 6).
We measure installs through App Store Connect campaign links, not through
Pinterest.

### Campaigns

| Campaign | Objective | Landing page | Daily budget ($300 / $500) | Bid | Pins |
|---|---|---|---|---|---|
| **PIN-Sushi** | Consideration (outbound clicks) | `/sushi-deals` | $1.00 / $2.00 | Automatic, cap $0.60 CPC | P1, P2 |
| **PIN-CheapHealthy** | Consideration (outbound clicks) | `/cheap-healthy-meals` | $1.00 / $2.00 | Automatic, cap $0.60 CPC | P3, P4 |
| **PIN-App** | Consideration (outbound clicks) | `/app` | $1.00 / $1.00 | Automatic, cap $0.80 CPC | P5, P6 |

Schedule note: sushi deal days cluster on Wednesday and Friday. Weight
PIN-Sushi to Monday through Wednesday so people see it while planning.

### Targeting

All campaigns: United States, all genders, ages 18 to 54, English,
mobile and desktop, Pinterest's "expanded targeting" on (it is required
to make small budgets deliver). Exclude existing site visitors once the
tag has 30 days of data.

| Campaign | Interests | Keywords (positive) | Keywords (negative) |
|---|---|---|---|
| PIN-Sushi | Sushi; Japanese food; Grocery shopping; Meal planning; Frugal living; Weeknight dinners | sushi wednesday, publix sushi, grocery store sushi, $5 sushi, cheap sushi near me, sushi deals, sprouts sushi, kroger sushi, safeway sushi friday, heb sushi, sushi day, sushi on a budget | sushi recipe, how to make sushi, sushi rice, sushi mat, sushi cat, sushi costume |
| PIN-CheapHealthy | Healthy eating; Meal prep; High protein meals; Budget meals; Fast casual restaurants; Fitness nutrition; College food | cheap healthy meals, healthy fast food, high protein fast food, healthy fast food options, cheap high protein meals, healthy restaurant orders, chipotle healthy order, cava bowl, sweetgreen, panera healthy, healthy eating on a budget, protein per dollar | recipe, meal prep containers, slow cooker, air fryer, weight loss pills, keto snacks |
| PIN-App | Food deals; Coupons; Frugal living; Fast casual restaurants; Healthy eating; Money saving tips | food deals near me, restaurant deals, food deals today, healthy food deals, fast food deals, restaurant coupons, best food apps, free food today, lunch deals, deals app | pizza deals, burger deals, wing deals, dominos coupon, mcdonalds deals, taco bell deals, printable coupons |

### 6 pin ad copies (title max 100 characters, description max 500)

Only the first ~40 characters of a title show in the feed, so the hook is
up front. Descriptions are not shown on the ad; Pinterest uses them for
relevance, so they carry the keywords in plain sentences. Character counts
are in brackets.

**P1 (PIN-Sushi), landing `/sushi-deals`**

Title [73]:
Grocery Sushi Deal Days: Which Chain Is $5 on Which Day (Verified Weekly)

Description [391]:
Every grocery store sushi deal day in one calendar: Publix $5 Sushi Wednesday, Sprouts and Kroger Sushi Wednesday, Safeway $5 Friday sushi, Harris Teeter $5 Sushi Friday, H-E-B Wednesday and Saturday, Hy-Vee BOGO, ShopRite, Meijer. Prices and days are checked against each store's weekly ad or site every morning, and regional deals are labeled. Free guide, no account. Cheap sushi near you.

**P2 (PIN-Sushi), landing `/sushi-deals`**

Title [70]:
$5 Sushi Wednesday vs $5 Friday Sushi: Plan Your Week by Grocery Store

Description [394]:
Sushi on a budget is a scheduling problem. Wednesday is Publix, Sprouts, Kroger, H-E-B and Hy-Vee; Friday is Safeway and Harris Teeter. This guide lists each store's sushi day, the price, what rolls are included, and which states the deal actually runs in. Re-verified every morning so expired promos are gone before you drive there. Grocery store sushi deals, cheap sushi, sushi deals near me.

**P3 (PIN-CheapHealthy), landing `/cheap-healthy-meals`**

Title [73]:
Cheapest Healthy Meals at Chain Restaurants, Ranked by Protein per Dollar

Description [432]:
Specific orders at Chipotle, CAVA, Sweetgreen, Panera, Chick-fil-A and grocery prepared-food counters, with price, calories and protein pulled from official nutrition pages and ranked by grams of protein per dollar. Cheap healthy meals and high protein fast food without guessing. Vegetarian options marked. Updated with current menu prices. Free, no sign-up, no junk-food chains. Healthy eating on a budget, done with real numbers.

**P4 (PIN-CheapHealthy), landing `/cheap-healthy-meals`**

Title [81]:
Healthy Fast-Casual Orders Under $10 With Real Calories and Protein (No Guessing)

Description [405]:
The exact build to order at each healthy chain, under $10, with calories and protein from the chain's own nutrition calculator and the price source linked. Sorted by protein per dollar so the best value is on top. Covers bowls, salads, grilled chicken, Mediterranean and grocery counter meals. For meal prep skippers, college budgets and lunch at work. Healthy fast food options, cheap high protein meals.

**P5 (PIN-App), landing `/app`**

Title [76]:
Free iPhone App: Today's Healthy Food Deals Near You, Verified Every Morning

Description [421]:
DailyBite is a free iPhone app that shows today's verified healthy food deals near you: fast-casual bowls, salads, smoothies, sushi and grocery counters. Each deal shows distance, whether the location is open right now, and opens in the chain's own app in one tap. Every deal is re-checked each morning against official sources. No account, no membership perks, no burger or pizza chains. Food deals near me, made honest.

**P6 (PIN-App), landing `/app`**

Title [81]:
Skip the Junk: A Food Deals App That Only Lists Healthy Chains (Free, No Account)

Description [400]:
Most deal apps are wall-to-wall burgers, pizza and wings. DailyBite lists only healthy chains and grocery counters, and only deals anyone can claim: no DashPass or Uber One perks, no first-order-only promos, no rewards-member exclusives. Verified every morning at 7 AM Eastern, with a public verification log. Free, no sign-up. Healthy food deals, restaurant deals and lunch deals near you on iPhone.

### Creative spec

- Static pin: 1000 x 1500 px, 2:3, PNG or JPEG, under 20 MB. Anything
  taller than 2:3 gets cropped in feed.
- Video pin (test one per campaign in month 2): 9:16, 1080 x 1920, 6 to
  15 seconds, MP4 or MOV, H.264, first 2 seconds carry the hook with no
  audio dependence (most Pinterest video plays muted).
- Layout, reusing the `social/pin.png` renderer from `SOCIAL.md`: top 20%
  is a headline overlay in Poppins 700, max six words, min 64 px; middle is
  a real deal card or the sushi calendar rendered from `deals.json`
  (actual data, never a stock photo of sushi with a logo); bottom 12% is
  the DailyBite wordmark plus "Verified today" and the date. No chain
  logos. Brand colors only: #31c96e accent on #0e1310, or #1f9e54 on #f2f6f2.
- Keep all text inside the central 80% safe area; Pinterest overlays the
  save button and title on the edges.
- One creative per copy block above (six pins). Refresh the deal card
  weekly so the ad never shows an expired price.
- Destination URLs carry the UTM scheme from section 6.

---

## 4. Meta (Instagram) and Reddit

### Meta (Instagram), held in reserve

If activated: one campaign, Traffic objective (Sales/App Promotion need
events we cannot send), Instagram-only placements (Reels, Stories, Feed),
Advantage+ audience with the suggestions below as hints, United States,
ages 22 to 45. Budget $5 a day, two weeks, then evaluate. Reels: 9:16,
1080 x 1920, 15 to 30 seconds. Feed: 1080 x 1350. Carousel: up to 10
cards at 1080 x 1080.

Targeting hints: interests Sweetgreen, CAVA, Chipotle Mexican Grill,
Panera Bread, Trader Joe's, Whole Foods Market, Healthy diet, Meal
preparation, Frugality, Couponing; behavior "Engaged shoppers"; exclude
people who like Domino's, Taco Bell, McDonald's (reduces the junk-food
deal seeker share).

| # | Format | Headline (max 40) | Primary text | CTA | Landing |
|---|---|---|---|---|---|
| IG1 | Reel, 15 s screen recording | Verified this morning | We re-check every healthy food deal in the US at 7 AM ET against the chain's own app or site, then publish only what passed. Today: 31 of 38. Free, no account. | Learn more | `/` |
| IG2 | Carousel, 5 cards (one chain order each) | Protein per dollar, ranked | The cheapest healthy orders at Chipotle, CAVA, Sweetgreen, Panera and Chick-fil-A, with price, calories and protein from the official nutrition pages. Swipe for the best value. | Learn more | `/cheap-healthy-meals` |
| IG3 | Story, 9:16 static | $5 sushi, which day? | Publix Wednesday. Safeway Friday. H-E-B Wednesday and Saturday. The full grocery sushi calendar, verified weekly, with the states each deal actually runs in. | Learn more | `/sushi-deals` |
| IG4 | Reel, 12 s app demo | Deals. Minus the junk. | A free deals app with no burger, pizza or wing chains, no membership perks and no account. Shows distance and open-now status, opens the deal in the chain's own app. iPhone. | Download | App Store campaign link (section 6) |

### Reddit Ads

Campaign: Traffic objective, one campaign, three ad groups, $5 a day each
is the platform minimum, so run one ad group at a time for 4 to 5 days
each (12 to 14 days total). Format: promoted post with image (1200 x 628
or 1:1) or free-form text. Placement: feed only, conversations off for
the test. Devices: all. Location: United States. Turn off Reddit's
"expand audience" setting so spend stays in the chosen communities.

| Ad group | Communities | Interest / keyword backup |
|---|---|---|
| RD-Frugal-Healthy | r/EatCheapAndHealthy, r/MealPrepSunday, r/fitmeals, r/Volumeeating, r/1200isplenty, r/HealthyFood, r/Frugal, r/budgetfood | Interests: Healthy Eating, Frugal Living. Keywords: cheap healthy, high protein cheap, eat healthy on a budget |
| RD-Chains | r/Chipotle, r/Panera, r/sweetgreen, r/CAVA, r/ChickFilA, r/fastfood, r/starbucks | Keywords: chipotle deal, panera deal, cava deal, bogo, free entree |
| RD-Grocery-Sushi | r/Publix, r/Kroger, r/HEB, r/Safeway, r/HyVee, r/sprouts, r/sushi, r/GroceryStores | Keywords: sushi wednesday, publix sushi, $5 sushi, grocery sushi |

Reddit copy rule: the first line must contain a verifiable number or a
specific fact. Redditors downvote adjectives.

| # | Ad group | Headline | Body (free-form) | CTA | Landing |
|---|---|---|---|---|---|
| R1 | RD-Frugal-Healthy | I verify every healthy-chain food deal in the US at 7 AM ET. Here is what actually exists today. | One person, one script, one public log. Every deal on the list was checked this morning against the chain's own app, site or weekly ad. Nothing behind DashPass or Uber One, no first-order-only promos, no rewards-only offers. No burger, pizza or wing chains either; that is the point. Free, no account, no newsletter popup. | Learn More | `/` |
| R2 | RD-Frugal-Healthy | Ranked by grams of protein per dollar: the cheapest healthy orders at chain restaurants, from official nutrition data. | Chipotle, CAVA, Sweetgreen, Panera, Chick-fil-A and grocery counters. Price, calories and protein for a specific build, with the nutrition page and price source linked for each row. Vegetarian builds marked. It is a table, not a listicle. | Learn More | `/cheap-healthy-meals` |
| R3 | RD-Grocery-Sushi | Grocery sushi deal days, all chains, one page: Publix Wed, Safeway Fri, H-E-B Wed and Sat, Hy-Vee BOGO, and the rest. | Prices and which states each deal runs in are checked every morning against the store's weekly ad. If your store's deal is wrong or missing, reply here and I will fix it. | Learn More | `/sushi-deals` |
| R4 | RD-Chains | A free iPhone app for food deals that skips the junk-food chains and anything you need a membership to claim. | Same verified list as the website, plus distance and open-now status, and it opens the deal in the chain's own app. No account. No ads in the app. Reads the same JSON feed the site publishes, so what you see is what was verified this morning. | Install | App Store campaign link (section 6) |

---

## 5. Google Ads: one exact-match campaign

Campaign **GA-Brand-Intent**, Search only, no Display Expansion, no
Search Partners, United States, English, manual CPC with $1.50 max for
generic keywords and $0.50 for brand, $2.00 daily budget (about $60 a
month). Conversions: import GoatCounter cannot feed Google, so set the
campaign to optimize for clicks and judge it on GoatCounter engaged
sessions. Ad schedule: 6 AM to 2 PM local, every day (deal-seeking and
lunch planning hours). Landing pages: brand to `/`, "near me" and generic
to `/`, sushi to `/sushi-deals`.

### 10 keywords (all exact match)

| Ad group | Keyword | Max CPC | Landing |
|---|---|---|---|
| Brand | [dailybite] | $0.50 | `/` |
| Brand | [daily bite deals] | $0.50 | `/` |
| Brand | [dailybite deals] | $0.50 | `/` |
| Brand | [dailybite app] | $0.50 | `/app` |
| Near me | [healthy food deals near me] | $1.50 | `/` |
| Near me | [healthy food deals] | $1.50 | `/` |
| Near me | [healthy fast food deals] | $1.50 | `/` |
| Near me | [cheap healthy meals near me] | $1.30 | `/cheap-healthy-meals` |
| Sushi | [sushi deals near me] | $1.20 | `/sushi-deals` |
| Sushi | [grocery store sushi deals] | $1.00 | `/sushi-deals` |

### Negative keywords (campaign level, phrase match unless noted)

Chains and categories we never list: `burger`, `burgers`, `pizza`,
`wings`, `dessert`, `donut`, `donuts`, `ice cream`, `mcdonalds`,
`mcdonald's`, `taco bell`, `wendys`, `burger king`, `dominos`, `papa johns`,
`little caesars`, `arbys`, `sonic`, `dairy queen`, `krispy kreme`,
`dunkin`.
Membership and delivery perks: `dashpass`, `uber one`, `doordash`,
`grubhub`, `uber eats`, `promo code`, `coupon code`, `gift card`.
Wrong intent: `recipe`, `recipes`, `jobs`, `careers`, `hiring`,
`franchise`, `menu prices`, `calories in`, `near me open now 24 hours`,
`catering`, `delivery`.
Competitors we do not want to pay to disambiguate: `slickdeals`,
`groupon`, `restaurant.com`, `krazy coupon lady`, `hip2save`.
Exact negatives: `[free food]`, `[food]`, `[deals]`.

### 3 responsive search ads

Headlines are 30 characters max, descriptions 90 max. Pin headline 1 of
each RSA to position 1 so the ad always leads with the promise.
Character counts in brackets.

**RSA 1, Brand ad group, final URL `/`**

Headlines:
1. DailyBite Healthy Food Deals [28] (pin 1)
2. Verified Every Morning [22]
3. Free, No Account Needed [23]
4. Today's Healthy Food Deals [26]
5. No Burger or Pizza Chains [25]
6. Deals Anyone Can Claim [22]
7. Sweetgreen, CAVA, Chipotle [26]
8. Grocery Sushi Deal Days [23]
9. Re-Checked Daily at 7 AM ET [27]
10. No Membership Perks Listed [26]
11. One Page, 30+ Chains [20]
12. Free iPhone App Available [25]
13. Public Verification Log [23]
14. Eat Healthy for Less Today [26]
15. DailyBite: Deals Near You [25]

Descriptions:
1. Healthy food deals from fast-casual and grocery chains, re-verified every morning. [82]
2. No junk-food chains, no membership perks, no first-order-only promos. Anyone can claim. [87]
3. Filter by location for today's bowls, salads, smoothies and sushi deals. Free, no sign-up. [90]
4. Built by one person who checks deals in person. Read the public verification log first. [87]

**RSA 2, Near me ad group, final URL `/`**

Headlines:
1. Healthy Food Deals Near Me [26] (pin 1)
2. Today's Verified Deals [22]
3. Bowls, Salads, Sushi & More [27]
4. Cheap Healthy Meals Today [25]
5. Checked This Morning [20]
6. See Deals by Location [21]
7. No Junk Food Chains [19]
8. Free. No Sign-Up. No Ads. [25]
9. Fast-Casual & Grocery Deals [27]
10. Protein per Dollar Ranked [25]
11. Chipotle, CAVA, Panera Deals [28]
12. Walk In and Claim It [20]
13. Daily Verified Food Deals [25]
14. Healthy Deals, Not Coupons [26]
15. Open Now, Near You [18]

Descriptions:
1. Today's healthy food deals near you: fast-casual bowls, salads, smoothies, sushi, grocery. [90]
2. Re-verified every morning against each chain's own app or site. Expired deals are removed. [90]
3. We skip burger, pizza, wing and dessert chains, and anything behind a paid membership. [86]
4. Free site and free iPhone app with distance and open-now status. No account needed. [83]

**RSA 3, Sushi ad group, final URL `/sushi-deals`**

Headlines:
1. Grocery Sushi Deal Days [23] (pin 1)
2. $5 Sushi Wednesday Guide [24]
3. Publix, Kroger, Sprouts Sushi [29]
4. Which Day Is Sushi Cheap? [25]
5. Verified Weekly Sushi Deals [27]
6. Safeway $5 Friday Sushi [23]
7. H-E-B & Hy-Vee Sushi Days [25]
8. Sushi Deals by Store & Day [26]
9. Checked Every Morning [21]
10. Free, No Account Needed [23]
11. Harris Teeter Sushi Friday [26]
12. Real Prices, Official Sources [29]
13. Regional Deals Labeled [22]
14. Plan Your Sushi Week [20]
15. Cheap Sushi Near You [20]

Descriptions:
1. Every grocery chain's sushi day in one place: Publix, Kroger, Sprouts, Safeway, H-E-B. [86]
2. Prices and days verified against each store's weekly ad or site, re-checked every morning. [90]
3. Which store runs $5 sushi on which day, what is included, and where the deal is offered. [88]
4. Free guide, no sign-up. Also in the free DailyBite iPhone app with distance and open-now. [89]

Trademark note: Google allows retailer names in ad text for informational
sites that provide information about the trademarked goods, and these
pages do. If a headline is disapproved, swap in the generic from the same
RSA ("Grocery Sushi Deal Days") and appeal once.

---

## 6. Measurement

### UTM scheme

GoatCounter strips query strings from paths, so UTMs will not fragment
page stats. It records a campaign only from the query parameters listed
in Settings > Site settings > "Campaign parameters" (defaults include
`utm_campaign` and `utm_source`), and it stores the first match as the
referrer. So the channel and creative must both live inside
`utm_campaign`, or the creative is lost. Scheme:

```
utm_source   = apple_ads | pinterest | reddit | instagram | google
utm_medium   = cpc (Apple, Google) | paid_social (Pinterest, Reddit, Instagram)
utm_campaign = {src}-{objective}-{page}-{creative}-{yymm}
utm_content  = creative id (duplicate of the campaign segment, for exports)
utm_term     = {keyword} (Google only; use ValueTrack {keyword})
```

Examples:

```
https://dailybitedeals.com/sushi-deals?utm_source=pinterest&utm_medium=paid_social&utm_campaign=pin-traffic-sushi-p1-2611&utm_content=p1
https://dailybitedeals.com/?utm_source=reddit&utm_medium=paid_social&utm_campaign=rd-traffic-home-r1-2611&utm_content=r1
https://dailybitedeals.com/?utm_source=google&utm_medium=cpc&utm_campaign=ga-brand-home-rsa1-2611&utm_term={keyword}
```

Add `utm_content` to the GoatCounter campaign-parameter list only if you
want it instead of `utm_campaign`; do not list both, it records one.

### GoatCounter event setup

GoatCounter is already loaded on every page
(`https://dailybite.goatcounter.com/count`). Events are paths with
`event: true`; the path doubles as the event name and may not start with
`/`. The no-JavaScript route is the `data-goatcounter-click` attribute,
which GoatCounter binds automatically. Three events are enough:

1. **`get-deal/{brand-slug}`**: on every "Get deal" link. In
   `scripts/build.mjs` the deal card CTA is rendered with `class="cta"`
   (line 257). Add to that anchor:
   `data-goatcounter-click="get-deal/${slug}" data-goatcounter-title="Get deal: ${brand}" data-goatcounter-referrer=""`.
   This is the site's conversion. A paid session that clicks Get deal is an
   "engaged session".
2. **`app-badge/{placement}`**: on every App Store link (`footer`,
   `hero`, `app-page`). The footer link is in the same build file (lines
   442, 545, 598, 680, 766 render it). Add
   `data-goatcounter-click="app-badge/footer"` to those anchors and
   `app-badge/app-page` on `/app`.
3. **`order/{brand-slug}`**: on the `order_url` links in
   `/cheap-healthy-meals`.

For dynamic cases (filter changes, the location picker) use the JS form:

```html
<script>
  window.goatcounter = window.goatcounter || {};
  function dbEvent(name) {
    if (window.goatcounter && window.goatcounter.count)
      window.goatcounter.count({ path: name, event: true, title: name });
  }
</script>
<!-- e.g. dbEvent('filter/location-set') -->
```

Reading it: in the GoatCounter dashboard, filter paths by `get-deal` and
toggle "Show events" to see conversion counts; the referrer panel on the
same view shows the campaign segment (`pin-traffic-sushi-p1-2611`) that
drove them. For a proper channel-by-event table, export the CSV weekly
(Settings > Export) and pivot `Referrer` by `Path`. Keep a sheet with
columns: week, campaign, spend, clicks (platform), sessions (GoatCounter
referrer count), get-deal events, app-badge events, cost per engaged
session.

### App Store Connect attribution

- **Apple Ads**: no SDK required. Installs appear in the Apple Ads
  dashboard by campaign, ad group, keyword and ad variation, and in App
  Store Connect > App Analytics > Acquisition > Sources as "Apple Ads".
  Compare that cohort's retention (Day 1, Day 7) and "Sessions per active
  device" against the organic "App Store Search" cohort. If paid users
  retain at half the organic rate, the keywords are wrong, not the app.
- **Pinterest, Reddit, Instagram** (anything without an MMP): use App
  Store Connect **campaign links**. App Analytics > Acquisition >
  Campaigns > generate a link with a provider token (`pt`) and a campaign
  token (`ct`), e.g.
  `https://apps.apple.com/app/apple-store/id6802622518?pt=<pt>&ct=pin-app-p5-2611&mt=8`.
  Installs attributed to each `ct` show under Campaigns. Use one `ct` per
  creative. These links are the final URL for IG4, R4 and the App Store
  button on `/app` (vary `ct` by the page's `utm_campaign` with a tiny
  script that reads `location.search`).
- **AdAttributionKit**: not needed for this test. Add it later only if
  you want post-install conversion values (first Get deal tap) reported
  back to Apple Ads for Maximize Conversions bidding.

### Weekly budget-shift rules (every Monday, 20 minutes)

Primary metric per channel:

- Apple Ads: cost per install (CPI). Target under $4.00, hard ceiling $6.00.
- Site channels (Pinterest, Reddit, Google): cost per engaged session
  (a GoatCounter session with a `get-deal` or `app-badge` event). Target
  under $2.00, hard ceiling $3.00.
- App-destination social ads (P5, P6, IG4, R4): cost per campaign-link
  install from App Store Connect. Target under $5.00.

Rules:

1. Do not touch anything with fewer than 100 clicks (site) or 10 installs
   (app) that week. Small numbers lie.
2. If the best channel's cost per outcome is less than half the worst
   channel's, move 20% of the worst channel's weekly budget to the best.
   One move per week, never more than 20%.
3. Never trim a channel below its platform minimum. Reddit at $5/day is
   either on or paused.
4. Brand campaigns (Apple Ads Brand, Google Brand) keep fixed caps and are
   excluded from shifting.
5. Scale a winner by at most 30% a week; CPCs rise with budget.
6. Inside Apple Ads: raise bids 15% on keywords with an install at or
   under target CPI; cut 20% on keywords over $2.50 CPT with no install
   after 40 taps; graduate any Discovery search term with an install to
   exact match in its home ad group.
7. Inside Pinterest: pause the weaker of each campaign's two pins once
   both pass 5,000 impressions; replace it with a new variant of the winner.
8. Month-end: the two channels with the best cost per outcome get the full
   next-month budget; the third gets a new angle or a rest.

### Kill criteria

Keyword, pin or ad level:

- Apple Ads keyword: 100 taps and 0 installs, or 20 installs at CPI over
  $8. Pause.
- Apple Ads CPP ad variation: after 500 impressions, conversion rate below
  60% of the best variation. Pause and rewrite screenshot 1.
- Pinterest pin: CTR below 0.3% after 5,000 impressions, or $40 spent with
  cost per engaged session above $3. Pause.
- Reddit ad: CTR below 0.3% after 10,000 impressions, or an ad group that
  spends $20 with zero engaged sessions. Pause the group.
- Google keyword: $15 spent with zero engaged sessions, or Quality Score
  of 3 or lower after two weeks. Pause.

Channel level (evaluate after four weeks and at least $120 spent):

- Apple Ads: CPI above $6, or paid-cohort Day 7 retention below half the
  organic cohort. Pause everything except Brand.
- Pinterest: cost per engaged session above $3, or paid pins earning
  fewer than 1 organic save per 100 paid impressions (the evergreen bonus
  is the whole reason to be here). Pause.
- Reddit: cost per engaged session above $3, or comment sentiment on the
  promoted post is majority negative (that is a brand cost, not just a
  media cost). Pause and go back to comment-first organic per `GROWTH.md`.
- Google: generic ad group cost per engaged session above $4. Pause the
  generic groups; keep Brand at $0.50/day indefinitely.

Program level: if, after two full months, blended paid cost per engaged
session is more than three times the implied cost of an hour of the
organic playbook (`GROWTH.md` budgets two hours a week; price it at what
the operator's time is worth), stop paid media and put the money into
the quarterly protein-per-dollar index release instead.

---

## Launch checklist

- [ ] App Store Connect: build five CPPs (section 2), generate campaign
      links for `pin-app-p5`, `pin-app-p6`, `ig4`, `r4`, `app-page`.
- [ ] `scripts/build.mjs`: add `data-goatcounter-click` attributes to the
      `.cta` deal links, footer App Store links and `/app` button; rebuild.
- [ ] GoatCounter: confirm "Campaign parameters" includes `utm_campaign`.
- [ ] Pinterest: install the Pinterest tag; confirm the domain claim;
      render six pin creatives from the `social/pin.png` pipeline.
- [ ] Apple Ads Advanced: three campaigns, 30 keywords, negatives, five ad
      variations, daily budgets per the plan you chose.
- [ ] Reddit: one campaign, three ad groups, schedule them back to back.
- [ ] Spreadsheet with the weekly columns from section 6; calendar reminder
      every Monday.
- [ ] Week 1 is observation only. First budget shift is on the second Monday.

## Sources checked (October 2026)

- Apple Ads Basic vs Advanced: https://ads.apple.com/app-store/help/apple-ads-basic/0001-compare-apple-ads-solutions and https://searchads.apple.com/help/advanced/0003-how-pricing-works ; rename reported at https://searchengineland.com/apple-search-ads-apple-ads-454356
- Apple Ads Food & Drink benchmarks (US, Apr to Jun 2026): https://splitmetrics.com/apple-search-ads-search-results-benchmarks/ ; 2025 data: https://www.mobileaction.co/?p=16483
- Custom product pages and ad variations: https://www.apptweak.com/en/aso-blog/apple-search-ads-custom-product-pages-best-practices and https://adapty.io/blog/custom-product-pages-app-store/
- Pinterest budgets and costs: https://trackbee.io/blog/pinterest-ads-cost , https://metricool.com/how-to-create-pinterest-ads/ , https://www.hubfluence.io/resources/pinterest-cpm-rates
- Pinterest specs: https://services.warroominc.com/en/knowledgebase/pinterest-image-ad-specs
- Reddit minimums and CPC: https://stackmatix.com/blog/reddit-ads-cost-guide-2026 , https://www.omneky.com/blog/how-much-do-reddit-ads-cost ; targeting: https://befoundonline.com/blog/the-reddit-targeting-playbook-you-shouldve-had-all-along
- Google Ads restaurant CPC 2026: https://www.wordstream.com/blog/2026-google-ads-benchmarks , https://www.webtonic.io/blog/food-service-catering-google-ads-statistics
- Meta/Instagram formats: https://www.webtonic.io/blog/instagram-ads , https://metricool.com/meta-ad-formats/
- GoatCounter events and JS API: https://goatcounter.com/help/events , https://goatcounter.com/help/js
- AdAttributionKit overview: https://moburst.com/blog/adattributionkit
