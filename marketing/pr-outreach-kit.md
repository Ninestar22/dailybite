# DailyBite PR and outreach kit

Prepared 2026-10-19 for Jacob Elsayed (jacob@dailybitedeals.com). Everything numeric below was
computed from the repo copies of `meals.json` (60 orders, 21 brands, updated October 4, 2026),
`deals.json` (nine verified deals on 2026-10-18), `verify-log.json` (53 daily runs, 2026-08-27 to
2026-10-18) and `report-data.json` (52-day deals report, 2026-08-10 to 2026-10-02). Re-run the
numbers before sending anything dated: the index and the log move daily.

Two repo problems to fix before any of this goes out: `deals.json` and `verification-log.html`
in the working tree contain unresolved git merge-conflict markers (`<<<<<<< HEAD`), so the live
site may be serving broken JSON if that tree was deployed. The numbers below were taken from the
HEAD side.

---

## 0. The numbers (source of truth for every document below)

### Protein-per-dollar index (`meals.json`, updated October 4, 2026)

| Fact | Value | How computed |
|---|---|---|
| Orders in the index | 60 at 21 chains and grocery counters | count of `meals` |
| Restaurant orders only (excluding Trader Joe's and Lidl) | 52 orders at 19 chains | filter by brand |
| Price source | 60 of 60 from official chain sources | `price_source_type` |
| Median protein per dollar, whole index | 4.0 g/$ | median of `protein_per_dollar` |
| Median protein per dollar, restaurants only | 3.65 g/$ | same, restaurant subset |
| Best value, whole index | Trader Joe's Vegan Pasta Bolognese Bowl: 30 g protein, $3.49, 8.6 g/$ | max |
| Best restaurant value | Subway Baja Chicken Protein Pocket: 24 g, $3.99, 6.0 g/$ (ties with Peppercorn Ranch Chicken pocket) | max, restaurant subset |
| Worst value | Sweetgreen Super Green Goddess Salad: 12 g, $11.05, 1.1 g/$ | min |
| Spread, best to worst | 7.8x | 8.6 / 1.1 |
| Cost of 30 g of protein, cheapest restaurant order | $4.99 (Subway protein pocket) | 30 x price / protein |
| Cost of 30 g of protein, priciest order | $27.62 (Sweetgreen Super Green Goddess) | same |
| Orders under $5 | 12 of 60 | count |
| Orders with 30 g protein or more | 33 of 60 | count |
| Orders with 30 g or more for under $10 | 13 of 60 (11 of them at restaurants) | count |
| Vegetarian orders | 13 of 60 | `vegetarian` |
| Highest-protein single order | Chipotle Double Chicken Burrito Bowl: 77 g, $14.20, 5.4 g/$ | max `protein` |
| Chain medians (g/$) | Subway 5.65, Chipotle 5.3, Potbelly 4.6, Chick-fil-A 4.1, CAVA 3.3, Panera 3.0, Smoothie King 3.0, Sweetgreen 2.8 | median per brand |
| Where prices were logged | Reston, Fairfax and Washington, DC (Union Station) stores, plus national list prices | `price_location` |

Lines you can quote: "A 30-gram serving of protein costs $4.99 at the cheapest restaurant order
in the index and $27.62 at the priciest, a 5.5x gap inside the same 'healthy fast-casual'
category." "The median healthy-chain order delivers about 4 grams of protein per dollar."

### Verification log (`verify-log.json`)

| Fact | Value |
|---|---|
| Daily runs logged | 53 (August 27 to October 18, 2026) |
| Deals that passed verification, total | 559 |
| Average per day | 10.5 (median 10, low 6, high 21) |
| Runs at the 7 AM Eastern slot | 44 of 53 (the rest were same-day re-runs) |
| Deals verified on October 18, 2026 | 9, from 9 chains; 7 of 9 regional, 2 national; 3 need a free app account |
| Median estimated saving on October 18 | $3.50 across the 8 deals with an estimate |

### 52-day deals report (`report-data.json`, August 10 to October 2, 2026)

493 verified listings from 53 chains, 9.5 per day on average. 35.5% needed a free account,
4.3% were free food, 20.1% were grocery counters, 52.5% were regional, median stated saving $3.
Wednesday averaged 12.8 deals, Thursday 7.9 (the grocery sushi days). Chipotle had a verified deal
on 12 of 52 days; CAVA on 1; Sweetgreen on 3. Dataset is CC BY 4.0 at
`/healthy-food-deals-dataset.csv`.

---

## 1. Press release (AP style, about 400 words)

FOR IMMEDIATE RELEASE

**DailyBite Launches Free iPhone App for Verified Healthy Food Deals, Publishes Daily Public Verification Log**

*One-person site re-checks every listed deal against official sources each morning; companion protein-per-dollar index ranks 60 restaurant and grocery orders*

WASHINGTON, Oct. 20, 2026 — DailyBite, an independent guide to healthy restaurant and grocery deals, today announced the release of DailyBite: Healthy Food Deals, a free iPhone app, alongside a public verification log that records how many deals passed its checks each day.

The app shows the same list published at dailybitedeals.com, with distance to each location, open-or-closed status and one-tap ordering through the chain's own app. The list covers fast-casual bowls and salads, smoothies, sushi and poke, Mediterranean, grilled chicken and grocery prepared-food counters. Burger, wing, pizza and dessert chains are excluded, as are deals that require a paid membership, first-order-only promotions and targeted app offers that not every customer can claim.

Every deal is re-verified each morning at about 7 a.m. Eastern against the chain's app, website, newsroom or weekly ad. Deals that cannot be confirmed are removed rather than carried forward. Since Aug. 27, the verification log has recorded 53 daily runs in which 559 deals passed, an average of 10.5 per day. On Oct. 18, nine deals passed, seven of them regional.

"[QUOTE PLACEHOLDER: Jacob Elsayed on why he publishes the log and excludes membership perks. Suggested shape: 'Most deal sites run on autopilot. I wanted a list I could stand behind at 7 a.m., and a log anyone can check when I get it wrong.']," said Jacob Elsayed, founder of DailyBite.

DailyBite also publishes a protein-per-dollar index of 60 specific orders at 21 chains and grocery counters, with prices and nutrition drawn from official sources. The index shows a median of 4.0 grams of protein per dollar and a 7.8-fold gap between the best value, a $3.49 Trader Joe's bowl with 30 grams of protein, and the worst, an $11.05 salad with 12 grams. Among restaurant orders, 30 grams of protein costs as little as $4.99 and as much as $27.62. The index is available as open JSON at dailybitedeals.com/meals.json.

The app is free, carries no display ads and does not sell deal placement. DailyBite may earn a commission from clearly marked partner links to delivery and cash-back apps.

DailyBite: Healthy Food Deals is available on the App Store at apps.apple.com/us/app/id6802622518.

**About DailyBite**
DailyBite (dailybitedeals.com) is a free, independent, daily-updated guide to verified healthy food deals in the United States, built and run by Jacob Elsayed in the Washington, D.C., area. Its deal pipeline is automated, but every inclusion rule, guide and verification standard is editorial. DailyBite is not affiliated with any restaurant chain. Its deals data and protein-per-dollar index are published as open JSON and CSV under CC BY 4.0.

**Media contact**
Jacob Elsayed, founder
jacob@dailybitedeals.com
dailybitedeals.com/about

###

---

## 2. Contact directory for outreach targets

Status key: **confirmed** = found on the outlet's own pages in search results; **reported** = third-party
or older source, verify before sending; **not found** = no public path surfaced, use the route given.
Direct page fetches were blocked from this environment, so re-open each contact page before sending.

### Targets from GROWTH.md

| Outlet | What they link to | Contact path | Status |
|---|---|---|---|
| Chowhound (Static Media) | Publix $5 Sushi Wednesday, Sprouts/Whole Foods sushi | About page (chowhound.com/about) links "Our Editors" and a Contact Us section; news editor Stephanie Dejak; Static Media food division editors Heather Clark (asst. managing editor) and Allie Miller (features). Static Media communicates only from @static addresses, never text. Human-written only; no AI copy. | reported |
| Cozymeal Magazine | Birthday-freebie lists | press@cozymeal.com (press team); no editorial inbox published. Ask them to forward to the magazine's Digital Content Editor. | confirmed (press address) |
| The Penny Hoarder | Birthday-freebie lists | Contact page at thepennyhoarder.com; no public pitch inbox found. Newsroom is in-house and topic-teamed; find the current food/saving writer's byline and use the site's contact form. | not found |
| ChooseFI | Birthday-freebie lists | Contact page at choosefi.com; no email surfaced. Alternative: the ChooseFI Facebook group and podcast feedback form. | not found |
| Hey It's Free | Day-of-week deal pages | Community-submitted freebies; site contact page and facebook.com/HeyItsFree. Submit a freebie rather than pitching a page. | reported |
| The Freebie Guy | Day-of-week deal pages | No tip form (per GROWTH.md). Treat as competitor; skip. | n/a |
| Frugal For Less | Cheapest-protein rankings | frugalforless.com contact page; no editor surfaced. Pitch as a data addendum to their existing ranking. | not found |
| ProteinBro | Cheapest-protein rankings | No site located under that name in search. Confirm the URL before pitching; nearest comparable is the Jacked Nerds newsletter (jacked-nerds.beehiiv.com), which ranked 100 grocery items by protein per dollar. | not found |
| Sporked (Mythical) | Deal roundups | sporked.com footer Contact link; editor-in-chief Justine Sterling; deal roundups by Ariana Losch and Jenna Clark. | reported |
| Brand Eating | Fast-food news | brandeating.com About/Contact page; no email surfaced. | not found |
| MenuPriceToday | Menu prices | No site located under that name. Confirm URL. | not found |
| Axios D.C. | Local newsletter | tips.axios.com (GROWTH.md); Axios D.C. newsletter authors have included Cuneyt Dil (also writes the weekly Town Talker column), Chelsea Cirruzzo and Paige Hopkins; Axios was hiring a D.C. reporter in August 2026, so bylines may have changed. Author pages list emails. | reported |
| PoPville | DC neighborhood blog | Older posts give princeofpetworth(at)gmail(dot)com for tips; the site has a Contact page under About. Confirm the current address there. | reported |
| Washingtonian | Cheap Eats | Jessica Sidman, Food Editor (people and trends); Ann Limpert, Executive Food Editor/Critic. Published "Our 10 Favorite Meals for Under $10 in the DC Area" on Aug. 27, 2026, so pitch a different angle (see section 5). Use author pages or the masthead for addresses. | confirmed (names) |

### Five additional targets

| Outlet | Why | Contact path | Status |
|---|---|---|---|
| Eat This, Not That! | Runs cheap-protein and fast-food nutrition pieces | FAQ says suggestions go to the editors by email (address masked in search); About page has Contact Us and an Editors and Staff list. Aggregators say they want practical, research-backed nutrition content. | reported |
| Men's Health (Hearst) | Health and fitness desk covers nutrition; editor Paul Kita has fronted "healthiest fast food" picks | Hearst masthead; health editor and associate health and fitness editor own nutrition. No public pitch inbox. | reported |
| Lifehacker (Ziff Davis) | Money and food service journalism | tips@lifehacker.com and submissions@lifehacker.com appear in third-party lists (2024); verify on lifehacker.com/about. | reported |
| The Kitchn | Groceries desk covers budget shopping | Senior Groceries Editor Mara Weinraub; pitch via the site's contact page. | confirmed (name) |
| The 51st (DC nonprofit newsroom) | Guides to living in DC | pitches@51st.news (2025 listing) | reported |
| Also: Washington City Paper | DC food | hungry@washcp.com surfaced only in an old forum post; check the current masthead. | reported |
| Also: WTOP | DC radio/news | News tip line 202-895-5000 or the WTOP app; web form at wtop.com/contact-us. | confirmed |

### Platform rules (as of October 2026, from search; verify on each site)

**Product Hunt.** Launch day resets at 12:01 a.m. Pacific (3:01 a.m. Eastern). Third-party guides
agree on: tagline capped at 60 characters, no trailing period; gallery images 1270 x 760 px (first
image is the social preview; at least three, up to about eight); square thumbnail 240 x 240 px, under
2 MB; maker comment posted within minutes, under 200 words, asking for feedback not votes. Product
Hunt explicitly prohibits asking for upvotes, paid upvotes and reciprocal vote rings. Curation to the
featured homepage is manual and only a minority of launches are featured; one January 2026 guide says
"Coming Soon" pages were retired and launch pages changed. Confirm specs in the live launch form.

**Featured.com (owns HARO).** Free tier exists but sources disagree on the limit (one says three answers
a month, another a daily credit allowance). Answers are reviewed before publishers see them. Check
featured.com/pricing.

**Qwoted.** Free Basic plan: 2 pitches a month, delivered with a 2-hour delay, individual use only; Pro
is 35 pitches a month, instant delivery, listed at $1,188 a year.

**Source of Sources (Peter Shankman).** Free email digest, historically three times a day (about 6 a.m.
and 1 p.m. Eastern). Zero tolerance for spam, AI-written replies and off-topic pitches; three short
paragraphs maximum. One 2026 check found the site down; confirm it is live before relying on it.

**Apple Featuring Nominations.** In App Store Connect: open the app, Featuring > Nominations > Create
Nomination. Requires Account Holder, Admin, App Manager or Marketing role. Nomination types: App
Launch, App Enhancements, New Content. Fields include a nomination name, description, device
platforms, launch or event dates and supplemental links. Drafts can be saved; third-party guides
suggest submitting at least three weeks ahead of the date. Third-party guides attribute "no fee, no download
minimum" to Apple's promote page; that wording was not verified here.

---

## 3. Six pitch emails

Each is 120 to 180 words, personalised, with one `meals.json` data point and one ask. Replace
bracketed names after checking the current byline.

### 3.1 Chowhound: grocery sushi days plus the index

**Subject:** The grocery sushi-day calendar your Publix $5 sushi piece is missing

Hi Stephanie,

Your Publix $5 Sushi Wednesday and Sprouts sushi stories keep ranking because readers want the
schedule, not the history. I run DailyBite, a one-person site that re-verifies healthy chain and
grocery deals every morning against the chain's own app or weekly ad, and I keep a single page that
lays out every grocery sushi day (Publix, Sprouts, Kroger, Safeway, Harris Teeter, H-E-B, Hy-Vee,
ShopRite, Meijer) with price, what the deal includes and whether a loyalty card is needed:
dailybitedeals.com/sushi-deals.

One number from the related index you might like: of 60 healthy-chain orders I priced from official
sources, a $3.49 Trader Joe's bowl delivers 30 grams of protein, 8.6 grams per dollar, more than any
restaurant order on the list.

Ask: would you consider linking the sushi-days page from your Publix and Sprouts articles as the
"when is it" reference? Happy to send the raw schedule as CSV.

Jacob Elsayed, DailyBite, jacob@dailybitedeals.com

### 3.2 The Penny Hoarder: what 30 grams of protein actually costs

**Subject:** $4.99 vs $27.62: the cost of 30 g of protein at healthy chains

Hi [Penny Hoarder food and saving writer],

Your readers already know eggs and lentils are cheap protein. What nobody has priced is the
restaurant side, so I did. DailyBite's protein-per-dollar index lists 60 specific orders at 21
healthy chains and grocery counters, every price and nutrition figure from the chain's official
page.

The spread is the story: 30 grams of protein costs $4.99 as a Subway Baja Chicken Protein Pocket and
$27.62 as a Sweetgreen Super Green Goddess Salad, a 5.5x gap inside the same "healthy fast-casual"
aisle. The median order delivers 4.0 grams of protein per dollar, and 13 of the 60 orders hit 30
grams for under $10.

I also keep a birthday-freebies list across 47 chains that excludes anything needing a paid
membership, which is the filter your current list does not have.

Ask: a short "we checked the restaurant math" item citing the index, with a link to
dailybitedeals.com/cheap-healthy-meals. I can supply the CSV and a one-paragraph methodology.

Jacob Elsayed, founder, DailyBite

### 3.3 Frugal For Less: the restaurant half of your cheapest-protein ranking

**Subject:** Your cheapest-protein ranking stops at the grocery door. Here is the other half.

Hi [editor],

Every cheapest-protein ranking online, including yours, prices grocery items. None prices the meals
people actually order when they are not cooking. DailyBite's index does: 52 restaurant orders at 19
chains (Chipotle, CAVA, Sweetgreen, Potbelly, Subway, Chick-fil-A, Panera and others), each with
price, calories and protein from the chain's official nutrition page, ranked by grams of protein per
dollar.

The restaurant median is 3.65 g per dollar. Subway's protein pockets lead at 6.0 g per dollar
($3.99, 24 g). Chipotle's chicken bowl is 5.3. Sweetgreen's median is 2.8. Eleven restaurant orders
reach 30 grams of protein for under $10, and I list each one.

Ask: add a "restaurant orders" section or a one-line addendum to your ranking that links
dailybitedeals.com/cheap-healthy-meals. The data is free to reuse with attribution, and the JSON
(dailybitedeals.com/meals.json) updates when prices change.

Jacob Elsayed, DailyBite

### 3.4 Sporked: a verified feed for your deal roundups

**Subject:** A deal feed that drops anything that fails a morning re-check

Hi Ariana,

Your 4/20 roundup was the longest list of deals you have put together for one day, and the hard
part of lists like that is the half that expire or turn out to be app-only before you publish.
DailyBite solves that for the healthy end of the menu: every deal is re-verified at 7 a.m. Eastern
against the chain's own source, and the day's count is posted to a public log (53 runs so far, 559
deals passed, about 10 a day).

It is machine-readable too: dailybitedeals.com/deals.json carries each deal's stable id, region,
expiry and whether it needs a free account. The companion index has a fun number for a roundup: a
Chipotle Double Chicken Burrito Bowl is 77 grams of protein for $14.20, the highest-protein order of
the 60 I priced.

Ask: use the feed as a source for your healthy-chain picks and credit DailyBite with a link. I will
flag anything DC-tested in person.

Jacob Elsayed, DailyBite

### 3.5 Axios D.C.: the DC-priced version

**Subject:** DC-priced: what 30 g of protein costs at Union Station vs Reston

Hi Cuneyt,

Local angle on a national dataset. I run DailyBite from the DC area and I price the
protein-per-dollar index at stores readers actually walk into: Jamba at Union Station ($7.39 for a
41-gram protein smoothie, 5.5 g per dollar), Chipotle and Potbelly in Reston, Smoothie King in
Fairfax. Across the 60 orders, 30 grams of protein runs from $4.99 to $27.62 depending on the chain,
all prices from official sources.

The deal side is local too: today's verified list includes Nando's BOGO wings for DC, Maryland and
Virginia dine-in through Oct. 20, and I can filter the daily feed to the DMV every morning.

Ask: a one-item mention in the newsletter's food section, or a weekly "cheapest healthy lunch in DC
this week" number I supply by 7:30 a.m. Fridays. Nothing sponsored, no ads, I test the DC deals in
person.

Jacob Elsayed, DailyBite, jacob@dailybitedeals.com

### 3.6 Men's Health (data-journalism pitch): the first protein-per-dollar index of restaurant orders

**Subject:** Data: a protein-per-dollar index of 60 restaurant orders, official prices, open JSON

Hi [Men's Health health and fitness editor],

Readers chasing a protein target are also watching price, and no published ranking covers what a
gram of protein costs when you order out. I built one. DailyBite's index covers 60 specific orders
(builds, not menus) at 21 healthy chains and grocery counters, with price, calories, protein and
sodium pulled from the chain's own nutrition and pricing pages, ranked by grams of protein per
dollar.

Findings a desk could chart: the median order is 4.0 g per dollar; the spread is 7.8x from the best
value (30 g for $3.49) to the worst (12 g for $11.05); 33 of 60 orders clear 30 g, but only 13 do it
under $10; chain medians run from Subway at 5.65 to Sweetgreen at 2.8.

Ask: an exclusive first look at the Q4 2026 edition, with the CSV, methodology and chart-ready data
two weeks before I publish. Attribution: "DailyBite protein-per-dollar index."

Jacob Elsayed, founder, DailyBite

---

## 4. Journalist-request answer templates

Rules that apply to all three: answer only requests that match; one stat from `meals.json`, one
verified deal from today's `deals.json`, no pitch; three short paragraphs maximum; sign with name,
title, site, and a one-line credential. Re-compute the numbers on the day.

### 4.1 Food inflation

**Credential line:** Jacob Elsayed, founder of DailyBite, which re-verifies healthy restaurant and
grocery deals against official sources every morning and publishes a protein-per-dollar index of 60
restaurant orders.

The clearest way to see restaurant inflation is cost per gram of protein rather than headline menu
price. In DailyBite's index of 60 orders at 21 healthy chains, all prices from official sources, the
median order delivers 4.0 grams of protein per dollar, and 30 grams of protein costs anywhere from
$4.99 (a $3.99 Subway protein pocket) to $27.62 (an $11.05 Sweetgreen salad). The gap is the
inflation story: the salad-bowl chains have priced out of the budget tier while sandwich and burrito
chains have not.

Discounts have not filled the gap. Across 52 days of daily checks, DailyBite verified 493 deals
from 53 chains, about 9.5 a day, and only 4.3% were free food. The deals that return reliably are
grocery sushi days and standing value menus, not the headline chains. [Insert today's deal: e.g.,
"Today's best verified deal is El Pollo Loco's $5.99 fire-grilled combos, ongoing in the West and
Southwest."]

Happy to share the CSV and methodology. Everything is CC BY 4.0.

### 4.2 Eating healthy on a budget

**Credential line:** as above.

The trick is to order by protein per dollar, not by what is labelled healthy. In DailyBite's index of
60 orders at healthy chains and grocery counters, 13 orders hit 30 grams of protein for under $10,
and 12 cost under $5. Examples from official prices: Potbelly's Skinny Grilled Chicken and Cheddar is
33 grams for $6.69; a Chick-fil-A Cool Wrap without dressing is 42 grams for $8.55; Trader Joe's
Chicken Burrito Bowl is 22 grams for $3.49.

Then stack a deal you can actually claim. Skip anything that needs a paid delivery membership or a
first-order code; in our 52-day sample, 35.5% of healthy-chain deals needed a free app account, so
the free account is usually worth it, the paid one is not. [Insert today's deal: e.g., "Tropical
Smoothie Cafe's $2 24-ounce smoothie with any food purchase runs Sundays and Mondays with code
SCORE."]

Full ranked list and the open data are at dailybitedeals.com/cheap-healthy-meals.

### 4.3 Best food apps

**Credential line:** as above, plus "I maintain a ranked guide to restaurant-app sign-up freebies."

Judge a food app by two things: whether its deals are claimable by anyone, and whether the offer is
still live when you get there. Chain apps win on the first point; many "deal" apps lose on the
second. In DailyBite's daily verification runs, the healthy-chain deals that passed averaged 10.5 a
day over 53 runs, and roughly a third of them lived inside a chain's free app where web search
cannot see them.

For value, pair the chain app with a protein-per-dollar check. Chipotle's app plus a loaded chicken
bowl is 54 grams of protein for $10.15 (5.3 grams per dollar); Sweetgreen's median order is 2.8
grams per dollar. [Insert today's app deal: e.g., "Subway's app is running BOGO 50% off footlongs
with code BOGO50."]

DailyBite's own free iPhone app shows only deals that passed that morning's check, with distance
and open status. Our ranked guide to app sign-up freebies: dailybitedeals.com/best-fast-food-apps.

---

## 5. Product Hunt launch kit

**Launch:** Tuesday or Wednesday, 12:01 a.m. Pacific (3:01 a.m. Eastern). Pick a day when the
morning refresh is scheduled normally so the "Verified today" badge is fresh when West Coast wakes.

### Tagline (60-character cap)

Primary (53 chars): `Verified healthy food deals, re-checked every morning`

Alternates:
- `Healthy food deals anyone can claim, verified daily` (51)
- `Today's healthy food deals, verified every morning at 7 AM` (58)

### Description

DailyBite is a free iPhone app that lists today's healthy food deals in the US: fast-casual bowls
and salads, smoothies, sushi and poke, Mediterranean, grilled chicken and grocery prepared-food
counters. Every deal is re-verified each morning against the chain's own app, website or weekly ad,
and the count that passed is posted to a public verification log (53 runs so far, about 10 deals a
day). No burger, pizza or dessert chains. No paid-membership perks, first-order-only promos or
targeted offers that not everyone can claim. The app shows distance, open-or-closed status and opens
each deal in the chain's own app. It reads the same open JSON the website publishes, and it ships
with a protein-per-dollar index of 60 orders priced from official sources. Built by one person in
the DC area who tests the local deals in person. No ads, no sponsored listings.

### First maker comment (under 200 words)

Hi Product Hunt, I'm Jacob. I built DailyBite because every deal app I tried listed offers that
were expired, membership-only or junk food. So the rules are strict: healthy chains only, every
deal re-checked each morning against the chain's own source, and anything that fails is dropped the
same day. The count is public at dailybitedeals.com/verification-log: 53 runs, 559 deals passed,
about 10 a day. Today it is 9.

Two things I'd love feedback on. First, the exclusion rules: no DashPass or Uber One perks, no
first-order codes, no targeted offers. Is that too strict? Second, the protein-per-dollar index: 60
real orders priced from official pages. Median is 4 grams of protein per dollar; 30 grams runs from
$4.99 to $27.62 depending on the chain. What orders should I add?

Everything is open: deals.json, meals.json and the 52-day dataset are CC BY 4.0. The app is free
with no ads. I am in the DC area and test the local deals in person, so tell me where you are and
I'll say how many of today's deals are near you.

### Five gallery image concepts (1270 x 760 px; first image is the social preview)

1. **"Verified today" hero.** Phone mockup of the deal list with the date badge and three cards,
   light background, brand green accent, headline "Re-checked every morning at 7 AM ET."
2. **The verification log as a bar chart.** 53 bars, one per day, deals passed per day (6 to 21),
   with the headline "559 deals passed. Everything else was dropped." Data from `verify-log.json`.
3. **Protein-per-dollar ladder.** Horizontal bars for eight chain medians (Subway 5.65 down to
   Sweetgreen 2.8 g/$), headline "What a gram of protein costs when you order out."
4. **The exclusion rules.** A plain list with strike-throughs: paid-membership perks, first-order
   codes, targeted offers, burger/pizza/dessert chains. Headline "If it's listed, anyone can claim it."
5. **Distance and open status.** Map-style screenshot with the nearest three deals, the open/closed
   pill and the "Get deal" button that opens the chain's app. Headline "Nearest open deal, one tap."

### Launch-day checklist (Eastern time; launch is 12:01 a.m. PT)

| Time (ET) | Action |
|---|---|
| Day before, 6 p.m. | Final check of listing: tagline, description, 5 gallery images, thumbnail, topics (iOS, Food and Drink, Health and Fitness), App Store link, website link. Maker comment drafted in a text file. Confirm `deals.json` is valid JSON and the site is deploying cleanly. |
| 3:01 a.m. | Launch goes live. Post the maker comment within 5 minutes. Screenshot the listing. |
| 3:15 a.m. | Post the launch link once to your own X/Threads/LinkedIn, Pinterest board and the DailyBite RSS/newsletter list. Ask for feedback, not votes. |
| 6:00 a.m. | Reply to every overnight comment. Note the first feature requests in a running list. |
| 7:00 a.m. | Morning refresh runs. Update the maker comment thread with "Today's count just posted: N deals passed." |
| 8:00 a.m. | Comment-first in r/EatCheapAndHealthy or r/fastfood only if a relevant thread exists; link only if asked. No r/Frugal. |
| 9:00 a.m. | Email the six pitch targets above with "launched today on Product Hunt" as the news hook (one line, not the subject). |
| 11:00 a.m. | Mid-morning check: reply to comments, thank reviewers by name, answer every "is X chain included" question with the actual rule. |
| 1:00 p.m. | Post one data image (the protein ladder) as a standalone social post, linking to the listing. |
| 3:00 p.m. | Second comment sweep. Add any clarifications to the maker comment as an edit, not a new comment. |
| 5:00 p.m. | Post the "what I learned" interim note in comments: top three requests, what will ship. |
| 8:00 p.m. | Final sweep. Screenshot the ranking. |
| 3:00 a.m. next day | Day closes. Capture final rank, upvotes, comments. Add a Product Hunt badge to /about and app.html. |
| Within 48 hours | Reply to every unanswered comment, email every commenter who asked a question you could not answer, and publish the request list as a short post on the site. |

### Ten reply templates

1. **"Why isn't [McDonald's / Taco Bell / Wendy's] on here?"** Deliberate. DailyBite only lists chains
   that fit the healthy roster (bowls, salads, smoothies, sushi, Mediterranean, grilled chicken,
   grocery counters). Burger, wing, pizza and dessert chains are excluded no matter how good the promo.
   The roster is at dailybitedeals.com/about.
2. **"Only 9 deals today? That's not many."** Correct, and that is the point. Nine passed this
   morning's check; the log shows the range is 6 to 21 a day over 53 runs. Lists with 200 deals are
   carrying expired and membership-only offers.
3. **"Android?"** Not yet. The app reads the same public JSON as the site, so the website works on any
   phone today, and an Android build is on the list if the iPhone app finds an audience.
4. **"How do you make money?"** No ads, no sponsored listings. A clearly marked commission link to a
   delivery or cash-back app may earn a fee; deal links go straight to the chain. Details at /privacy.
5. **"Is this just scraped from other deal sites?"** The pipeline searches official chain pages first
   and deal trackers second, then discards anything it cannot confirm against the chain's own source.
   I test DC-area deals in person. The 52-day dataset is public if you want to audit it.
6. **"Can I get the data?"** Yes: deals.json, meals.json, feed.xml and a 52-day CSV, all CC BY 4.0.
   Cite the deal's "expires" and "updated" dates together.
7. **"The price at my store is different."** Prices in the index are from official sources and tagged
   with the store or national list they came from; regional variation is real. Tell me the store and
   price and I will add it to the location notes.
8. **"Add [chain]."** If it fits the roster and publishes nutrition and prices officially, I can add
   it. Which order would you want priced?
9. **"Deals are mostly regional."** Seven of today's nine are. Each is labelled with its real
   footprint, and the app filters by distance so you only see what is near you.
10. **"Why trust a one-person operation?"** Because you do not have to: the log, the dataset and the
    JSON are public, and anything that fails a morning check is dropped the same day. Corrections go to
    jacob@dailybitedeals.com and get fixed in the next run.

---

## 6. App Store featuring nomination and DC local-press angle

### 6.1 Featuring nomination (App Store Connect > app > Featuring > Nominations > Create Nomination)

Requires the Account Holder, Admin, App Manager or Marketing role. Save as a draft, then submit
at least three weeks before the date you name.

**Nomination name:** DailyBite Q4 2026: Protein-per-Dollar Index in the app

**Type:** New Content (alternatively App Enhancements if the index tab ships as a feature update)

**Platforms:** iPhone

**Launch or event date:** [date the Q4 index edition goes live, at least 3 weeks out]

**Description (paste):**
DailyBite: Healthy Food Deals (id 6802622518) is a free, ad-free iPhone app that lists today's
verified healthy food deals in the US and, with this release, the Q4 2026 edition of the DailyBite
protein-per-dollar index inside the app. The index ranks 60 specific orders at 21 healthy chains and
grocery counters by grams of protein per dollar, with every price and nutrition figure sourced from
the chain's official pages. The deal list is re-verified each morning at 7 a.m. Eastern against the
chain's own app, website or weekly ad, and the daily count is published in a public verification log
(53 runs, 559 deals passed to date). The app excludes paid-membership perks, first-order-only
promotions and targeted offers, so every listed deal can be claimed by any customer. It shows
distance and open status for each location and hands off to the chain's own app to order. The app
reads the same open data the website publishes; the index and the deals feed are available as JSON
and CSV under CC BY 4.0 for anyone to reuse. Built and operated by a single independent developer in
the Washington, D.C., area who tests the local deals in person.

**Why it is timely:** Food prices and protein-focused eating are both mainstream news in Q4 2026;
this is the only consumer dataset that prices protein at the restaurant counter rather than the
grocery shelf, and it ships as a free, ad-free utility.

**Accessibility and design notes:** Dynamic Type, light and dark mode, VoiceOver labels on deal
cards, no account required.

**Supplemental links:** dailybitedeals.com/cheap-healthy-meals, dailybitedeals.com/verification-log,
dailybitedeals.com/healthy-food-deals-report

### 6.2 DC local-press angle

The hook is that DailyBite is a DC-area product with DC-area prices in a national dataset.
Washingtonian ran "10 Favorite Meals for Under $10 in the DC Area" on Aug. 27, 2026, so do not
pitch "cheap eats"; pitch the data and the daily log.

**Axios D.C.** (tips.axios.com; newsletter authors have included Cuneyt Dil, Chelsea Cirruzzo and
Paige Hopkins; confirm current bylines). Angle: "A DC developer priced what 30 grams of protein costs
at Union Station, Reston and Fairfax." One chart, three local numbers (Jamba Union Station $7.39 for
41 g; Potbelly Reston $6.69 for 33 g; Chipotle Reston $14.20 for 77 g), offer of a weekly DMV
filtered list by 7:30 a.m.

**PoPville** (confirm the current tips address on the site's Contact page; older posts give
princeofpetworth(at)gmail(dot)com). Angle: reader-service post, "Today's verified healthy deals in
DC, MD and VA," built from `deals.json` filtered to regions that cover the DMV (today: Nando's
BOGO wings dine-in through Oct. 20; Harris Teeter $7.99 rotisserie chicken this week; Subway BOGO
50% footlongs national). Offer a recurring Friday item.

**Washingtonian** (Jessica Sidman, Food Editor; Ann Limpert, Executive Food Editor). Angle for
Sidman's people-and-trends beat: "The DC guy who re-checks healthy food deals at 7 a.m. every day and
publishes the failures," with the verification log as the artifact. Secondary angle for the cheap-eats
franchise: the protein-per-dollar ladder as a sidebar, since all local prices came from official
sources at named DC-area stores.

**Also worth one email each:** The 51st (pitches@51st.news; guides to living in DC), Washington City
Paper food desk (confirm address), WTOP (tip line 202-895-5000 or the app).

---

## 7. One-page press kit outline (publish at dailybitedeals.com/press)

**Facts**
- DailyBite, dailybitedeals.com, founded and run by Jacob Elsayed, Washington, D.C., area. One person.
- Free iPhone app: DailyBite: Healthy Food Deals, App Store id 6802622518. No ads, no sponsored listings.
- Coverage: healthy restaurant chains and grocery prepared-food counters in the US. Burger, wing,
  pizza and dessert chains excluded. No paid-membership perks, first-order codes or targeted offers.
- Verification: every deal re-checked each morning at about 7 a.m. Eastern against the chain's own
  app, website, newsroom or weekly ad; failures dropped the same day; count published daily.

**Numbers (as of October 18, 2026; re-run before quoting)**
- 53 daily verification runs since August 27, 559 deals passed, 10.5 a day on average (range 6 to 21).
- 52-day deals report: 493 listings from 53 chains; 35.5% needed a free account; 4.3% free food;
  52.5% regional; median stated saving $3.
- Protein-per-dollar index: 60 orders, 21 chains and counters, 100% official prices; median 4.0 g/$;
  7.8x spread; 30 g of protein from $4.99 to $27.62; 13 orders with 30 g or more under $10.

**Open data**
- deals.json (today's verified deals), meals.json (the index), feed.xml (RSS),
  healthy-food-deals-dataset.csv (52-day dataset). License CC BY 4.0. Cite "expires" and "updated"
  dates together; link to the chain page or homepage, not to the JSON.

**Images available on request (or in /social and the repo root)**
- App icon 1024 px (`appstore-icon-1024.png`), logo (`logo.svg`), OG image 1200 x 630 (`og.png`).
- Founder photo (`profile-picture-1024.png`).
- Daily "today's deals" pin set and Instagram card (`social/pin-1.png` to `pin-4.png`, `ig.png`).
- Charts to produce for the kit: verification log bar chart (53 days), protein-per-dollar ladder
  by chain, cost-of-30-g range bar. All derivable from the JSON above.
- App screenshots: deal list with distance and open status, deal detail, index tab.

**Quotable lines**
- "If a deal cannot be verified this morning, it is not on the site today."
- "Nobody prices protein at the restaurant counter. Grocery rankings stop at the shelf."
- "If it is listed, anyone can walk in and claim it."

**Contact**
Jacob Elsayed, founder. jacob@dailybitedeals.com. dailybitedeals.com/about. Based in the
Washington, D.C., area; available for same-day comment on food prices, restaurant deals and
protein-per-dollar questions.

---

## Appendix: what could not be verified from here

Direct page fetches were blocked for every outlet domain, so contact details above come from search
snippets. Before sending: open each contact page, confirm the current byline on the most recent
relevant article, and check the Product Hunt launch form, featured.com/pricing, app.qwoted.com/pricing,
sourceofsources.com and App Store Connect's nomination screen for current limits. ProteinBro and
MenuPriceToday could not be located under those names; confirm their URLs or drop them.
