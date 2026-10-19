# DailyBite: copy for /app and /press

Prepared 2026-10-19 for the `explainerPage` template in `scripts/build.mjs` (one `h1`, `p.answer`, `div.facts` grid, `div.prose` with `h2` sections, `div.faq` with `h3` questions). Every number below is computed from files in this repo as of the 2026-10-18 refresh; the "Sources and what could not be verified" section at the end lists where each came from and what still needs a human check.

Conventions: `[PLACEHOLDER: ...]` must be replaced before publishing. `[CONFIRM: ...]` is a factual claim that is true per the site's own copy but should be checked against the live App Store listing or the app build before it goes on a conversion page.

---

## 1. /app : app landing page

### Build notes (read first)

- `app.html` today is a `noindex` meta-refresh redirect to the App Store with the App Store URL as canonical. The new page replaces it: canonical becomes `https://dailybitedeals.com/app`, robots becomes `max-image-preview:large`, and the redirect is removed. Keep the `<meta name="apple-itunes-app" content="app-id=6802622518">` tag that every page already carries; on this page add `app-argument=https://dailybitedeals.com/` so Safari's Smart App Banner opens the installed app instead of the store for people who already have it (the banner only shows in iOS Safari, so the page still needs its own visible CTA).
- One dominant action on the page: the App Store badge. No newsletter box (`EMAIL_CAPTURE` was retired in September 2026 anyway), no affiliate `promo` block, no delivery-app buttons. The guides nav can stay at the bottom.
- Install CTA appears three times: above the fold (badge plus one line), after the feature grid, and after the FAQ. Same wording each time.
- Non-iPhone visitors (Android, desktop): detect with `navigator.userAgent` or `matchMedia`; on desktop show the QR code next to the badge (see QR note below); on Android swap the badge for "iPhone only for now. The same list is on this site every morning." linking to `/`.
- Screenshots: the page needs two or three real device screenshots from the shipped build (list with distance and open/closed pills, a deal detail with the chain's ordering button, and the location permission screen or empty state). `[PLACEHOLDER: there are no app screenshots in the repo; export from the App Store Connect media set or capture from a device.]`
- Schema: keep `FAQPage` from the template and add `SoftwareApplication` (`name`, `operatingSystem: "iOS"`, `applicationCategory: "FoodApplication"`, `offers.price: 0`, `url` of the App Store listing). Do not add `aggregateRating` until there are real ratings to cite.

### Meta title and description (exact)

Title (58 chars):
`DailyBite iPhone App: Verified Healthy Food Deals Near You`

Description (154 chars):
`Free iPhone app with today's verified healthy food deals, sorted by distance, with open-now status and one-tap ordering. No account. Same list as the site.`

OG title: `DailyBite for iPhone: today's verified healthy deals, near you`
OG description: same as meta description.

### Headline options (h1), pick one

1. Today's verified healthy deals, sorted by how far you are from them
2. The healthy food deals you can actually walk to right now
3. One list of real healthy deals. Checked this morning. Nearest first.
4. Eat healthier for less, starting with the deal closest to you
5. Every verified healthy deal near you, in one free app

Recommended: option 1. It states the two things the website cannot do (distance, "today") and keeps the word "verified", which is the brand's whole argument. Option 3 is the fallback if the h1 needs to be shorter on phones.

### Subhead (`p.answer`)

DailyBite for iPhone shows the same list of healthy food deals the website re-verifies every morning, then adds what a website can't: how far each deal is from where you're standing, whether that location is open right now, and a button that opens the deal in the chain's own app so you can order in one tap. It's free, there's no account, and it never lists burger, wing, pizza or dessert chains.

### Facts grid (`div.facts`)

| Key | Value |
|---|---|
| Price | Free. No in-app purchases, no ads, no account. `[CONFIRM: no in-app purchases against the App Store listing]` |
| Platform | iPhone, on the App Store (app id 6802622518). `[CONFIRM: minimum iOS version from the listing]` |
| What it shows | The same verified deal list as dailybitedeals.com, refreshed every morning at about 7 AM Eastern |
| Added in the app | Distance to each deal, open or closed right now, one-tap ordering in the chain's own app |
| What it never lists | Burger, wing, pizza and dessert chains; paid-membership perks; first-order-only promos; targeted app offers not everyone can claim |
| Your data | Location is used to sort deals by distance. `[CONFIRM: that location stays on the device and matches the App Store privacy label before publishing this line]` |

### Feature blocks (prose section, h2 "What the app does that the website can't")

Render as six short blocks: a bold one-line title, then one sentence of benefit. Keep each sentence under 25 words.

1. **Distance to every deal.** Deals sort by how far they are from you, so the first card is the one you can get to before lunch ends.
2. **Open or closed, right now.** Each location shows whether it's open at this moment, so you never drive to a sushi counter that closed at 8.
3. **One tap to order.** Every deal opens in the chain's own app or site, where the deal actually lives, with no middleman and no markup.
4. **The exact list the website publishes.** The app reads the same feed that builds dailybitedeals.com, so the deal you saw at breakfast is the deal in your pocket, verified the same morning.
5. **No account, nothing to sign up for.** Open it and the deals are there. No email, no password, no points program to join.
6. **No junk-food chains, ever.** Burger, wing, pizza and dessert chains are excluded on purpose, no matter how good the promo looks. Thirty-seven healthier chains and grocery counters are in; twenty-five fast-food chains are out by name.

Optional seventh block if the grid needs an even row: **Free, and it stays free.** No ads, no paid tier, no sponsored listings. DailyBite earns a commission only from clearly marked partner links on the website; deal listings are never paid for.

### "How verification works" strip (prose section, h2 "Every deal is checked before it reaches your phone")

Render as a four-step horizontal strip on desktop, stacked on phones. Each step: a number, a four-word label, one sentence.

1. **Checked every morning.** An automated run at about 7 AM Eastern re-checks every deal against the chain's own app, website, newsroom or weekly ad.
2. **Unverifiable deals are dropped.** If a price or end date can't be confirmed from an official source that day, the deal doesn't publish. The list shrinks rather than pads.
3. **Tested in person.** The owner checks grocery sushi counters and chain offers in store and corrects the record when the sign disagrees with the website.
4. **Logged in public.** Every morning's count is in the public verification log: 53 dated checks since August 27, 2026, averaging 10.5 verified deals a day.

Link under the strip: "Read the verification log" to `/verification-log`.

### Install CTA copy (use the same block three times)

Button: App Store badge (Apple's official "Download on the App Store" artwork; do not restyle it).

Line above the badge: **Free on the App Store.**
Line below the badge (13px, muted): No account. No ads. The same list as this site, sorted by distance.

Text-link alternative for places the badge won't fit (footer, homepage header): `Get the free iPhone app`

Desktop variant: badge on the left, QR code on the right, and the muted line reads: Point your iPhone camera at the code to open the App Store.

### QR code placement note

- Generate one QR code that encodes `https://dailybitedeals.com/app?src=qr` (a short self-hosted URL, not the long App Store URL, so the destination can change and installs from print can be counted in GoatCounter). The /app page then forwards iPhone visitors to the App Store via the badge; the Smart App Banner handles people who already have it.
- Show the QR code only when the viewport is 900px or wider or the user agent is not iOS; on an iPhone a QR code is useless and takes the badge's space.
- Minimum rendered size 160 by 160 CSS px with a 16px quiet zone, dark modules on the `--card` background in both themes (do not invert it in dark mode; a light QR on a dark card scans fine, but a theme-swapped one often does not).
- Reuse the same code on the birthday-freebies PDF, Pinterest pin templates and any printed table card. Caption on print: "Scan for today's verified healthy deals near you."

### FAQ (`div.faq`, six questions, also emitted as FAQPage schema)

**Is the DailyBite app free?**
Yes. The app is free on the App Store, has no ads and no paid tier, and never charges for a deal. DailyBite earns a commission only from clearly marked partner links on the website, and those never affect which deals are listed.

**Do I need an account?**
No. Open the app and today's deals are there. There is no sign-up, no email address and no password. Deals that require a paid membership, a first-order promo or a targeted offer are excluded, so everything in the list is claimable by anyone.

**Is it the same list as the website?**
Yes, exactly. The app reads the feed that builds dailybitedeals.com each morning, so the deals, prices and expiry dates match. The app adds distance, open-or-closed status and one-tap ordering.

**Why does it ask for my location?**
To sort deals by how far away they are and to tell you whether the nearest location is open right now. If you decline, the app still shows the full list, just without distances. `[CONFIRM: that the app works without location permission, and what it shows in that case]`

**Is there an Android version?**
Not yet. The website shows the same verified list in any browser, and you can filter it by city or ZIP. If an Android app ships, it will be announced on the homepage.

**Which chains are in the app?**
Thirty-seven healthier chains and grocery counters: fast-casual bowls and salads such as Chipotle, Sweetgreen, CAVA and Panera, smoothie and juice chains, sushi and poke, Mediterranean and grilled chicken, and grocery prepared-food counters such as Publix, Kroger, Safeway and Harris Teeter. Burger, wing, pizza and dessert chains are excluded by name, and that list is public on the About page.

### Homepage header button pitch (plain English, two sentences)

For the `.appbtn` in the homepage header, as a `title` attribute or a one-line tooltip next to "Get the iOS app":

The free iPhone app shows this same verified list sorted by how far each deal is from you, with open-now status and one-tap ordering. No account, no ads, and it never lists junk-food chains.

Shorter variant if space is tight (one sentence): Same verified deals, sorted by distance, with one-tap ordering. Free, no account.

---

## 2. /press : press page

### Build notes

- Title: `DailyBite Press Kit: Facts, Data and Images for Journalists`
- Meta description (152 chars): `Press resources for DailyBite, the daily-verified healthy food deal list and free iPhone app: key facts, public verification log, open JSON data and logos.`
- Canonical `https://dailybitedeals.com/press`, indexable. Add `Organization` schema with `sameAs` links to Instagram, Pinterest, TikTok and the App Store (already in `index.html` on the HEAD side of the merge).
- Everything downloadable must be a direct link to a file in this repo, not a request form. The image set exists today except for screenshots and a founder headshot (see placeholders).
- Add `/press` to the footer next to About and Privacy.

### h1

DailyBite press kit

### Who, what, why (`p.answer`, 120 words)

DailyBite is a free, independent guide to today's healthy food deals in the United States, published at dailybitedeals.com and as a free iPhone app. Every morning at about 7 AM Eastern an automated check re-verifies each deal against the chain's own app, website, newsroom or weekly ad; anything that can't be confirmed is dropped, and the day's count is logged in public. The site covers 37 healthier chains and grocery prepared-food counters and deliberately excludes burger, wing, pizza and dessert chains, paid-membership perks and targeted offers. It was built by Jacob Elsayed, who runs it alone from the Washington, DC area and tests deals in person, because the real discounts at healthier chains had scattered across a dozen apps where nobody could compare them.

### Key facts (`div.facts`)

All figures computed from this repository's data files on 2026-10-19; recompute at build time where noted.

| Key | Value |
|---|---|
| What | Daily-verified list of healthy food deals in the US, as a website, an RSS feed, open JSON and a free iPhone app |
| Founded | 2026. Daily verification log begins August 27, 2026. `[PLACEHOLDER: public launch date of the site and the App Store release date]` |
| Who | Jacob Elsayed, independent, one person. Not affiliated with any restaurant chain. |
| Based | Washington, DC area (in-person checks documented in Reston, Virginia) |
| Chains covered | 37 approved healthier chains and grocery counters; 25 fast-food chains excluded by name, each with a public "we don't list this, on purpose" page |
| Verification record | 53 consecutive daily checks logged from August 27 to October 18, 2026; 559 deal-verifications in total; 10.5 verified deals a day on average, ranging from 6 to 21 (recompute from `verify-log.json` at build) |
| Deals report | 52 days (August 10 to October 2, 2026): 493 verified deal listings across 53 chains; 58% standing value menus, 28.6% dated promotions, 13.4% weekly day specials; only 4.3% free food; median stated saving $3 |
| Best deal day | Wednesday, 12.8 verified deals on average versus 7.9 on Thursday, almost entirely grocery sushi days |
| Cheapest healthy meals index | 60 specific orders at 21 chains, $3.49 to $14.29 (median $8.99), 1.1 to 8.6 grams of protein per dollar, every price and nutrition figure from the chain's official source |
| Price | Free. No ads, no account, no paid tier. Revenue only from clearly marked partner links; deal listings are never sponsored. |
| Contact | jacob@dailybitedeals.com |

### What journalists can use (prose, h2 "What you can use")

Everything below is public, free to cite and updated by the same morning run that builds the site. Please cite the deal's verification date alongside its expiry date, and link to the chain page or the homepage rather than to a JSON file.

**The verification log.** `/verification-log` is the dated record of every morning check since August 27, 2026, with the time it ran and how many deals passed. It is the only public, day-by-day record of how many healthy-chain deals actually exist on a given day, and the honest answer is "about ten".

**Open data.** `/deals.json` is today's list with stable IDs, expiry, region and estimated savings; `/meals.json` is the cheapest-healthy-meals index with price, calories, protein and protein per dollar; `/feed.xml` is the RSS feed; `/healthy-food-deals-dataset.csv` and `/report-data.json` are the 52-day dataset behind the deals report at `/healthy-food-deals-report`. All are free to download and quote with attribution.

**The protein-per-dollar index.** `/cheap-healthy-meals` ranks 60 real orders at 21 healthier chains and grocery counters by grams of protein per dollar, using only official menu prices and nutrition pages. Existing "cheapest protein" rankings cover grocery items; this is the restaurant half. A dated quarterly edition with a CSV and methodology is planned. `[PLACEHOLDER: link the Q4 2026 index page when it exists]`

**Weekly deal explainers.** Sixteen pages document recurring grocery and chain promotions (Publix $5 Sushi Wednesday, Safeway $5 Friday, Harris Teeter's $6 Friday rolls, Panera's $4.99 Mix & Match and more), including where the current price differs from what older articles still quote.

**Images.** Direct downloads, no form:
- App icon, 1024 by 1024 PNG: `/appstore-icon-1024.png`
- Site icon, 512 by 512 PNG: `/icon-512.png` (maskable variant `/icon-maskable-512.png`)
- Wordmark: `/logo.svg` `[CONFIRM: GROWTH.md notes this is a PNG wrapped in SVG; export a true vector before listing it as the logo file]`
- Social card, 1200 by 630 PNG: `/og.png`
- App screenshots: `[PLACEHOLDER: add three device screenshots from the shipped build, PNG, with alt text]`
- Founder headshot: `[PLACEHOLDER: /press/jacob-elsayed.jpg, 1200px square]`

Usage: the DailyBite name and marks may be used in editorial coverage of DailyBite. Do not imply endorsement by any restaurant chain; DailyBite is not affiliated with any of them.

### Founder bio (prose, h2 "About the founder")

`[PLACEHOLDER, third person, 60 to 90 words. Verified facts available to use: Jacob Elsayed built and runs DailyBite alone; the deal pipeline is automated but every editorial rule and inclusion standard is his; he is based in the Washington, DC area and checks deals in person, including grocery sushi counters in Northern Virginia; the site reflects how he actually eats, which is why burger, wing, pizza and dessert chains are excluded. Add: day job or background, one sentence on why food prices pushed him to build it, and anything he is willing to be quoted on. Nothing else about him is in the repo, so do not invent credentials.]`

Quote for attribution: `[PLACEHOLDER: one or two sentences from Jacob, in his words, on the "smaller honest list over a padded one" rule]`

### Contact line

Press, corrections and data questions: **jacob@dailybitedeals.com**. Replies usually within one business day. `[CONFIRM: response-time promise with Jacob]` For a DC-area or regional cut of today's list, ask; `deals.json` carries a region field for every deal.

### Five suggested story angles (prose, h2 "Story angles")

1. **How many healthy food deals actually exist on a given day? About ten.** Fifty-three consecutive mornings of checks say the national count of verifiable healthy-chain deals runs between 6 and 21, averaging 10.5. The best-known healthy chains almost never discount; the dependable deals are grocery sushi counters. Source: the verification log and the 52-day report.

2. **The $5 sushi roll is quietly becoming $6.** Publix still holds $5 on Wednesdays, but Harris Teeter moved to $6, Kroger to $6, Sprouts to $6 while its own FAQ still says $5, H-E-B to $7. DailyBite's explainer pages document each change with the date it was checked in store. A clean, local-adaptable food-inflation story.

3. **The cheapest protein in a restaurant isn't where you think.** The protein-per-dollar index puts Trader Joe's $3.49 Vegan Pasta Bolognese Bowl at 30 grams of protein, or 8.6 grams per dollar, ahead of every fast-casual chain order; the median healthy order is $8.99. Fitness and personal-finance writers get a ranked list built only from official prices and nutrition pages.

4. **Over a third of "deals" need an app account, and the best ones hide there.** In the 52-day dataset, 35.5% of verified listings required a free account and 52.5% were regional. Healthier chains put their discounts inside their own apps, where web search can't see them, which is the gap DailyBite and its iPhone app exist to close.

5. **One person, no ads, a public log: what it takes to run a deal site honestly.** DailyBite excludes 25 fast-food chains by name, refuses paid-membership perks and targeted offers, publishes every morning's count, and shrinks the list rather than pad it. A founder profile with a built-in tension: the honest list is often short, and short lists don't go viral.

---

## 3. Social-proof placeholders (six)

Rule: never publish a fabricated review. Each slot below is a layout placeholder with the shape of a real App Store review, to be replaced verbatim with real ones (reviewer first name or App Store nickname, star count, date, and the review text unedited except for length with an ellipsis). If fewer than three real reviews exist at launch, drop the section entirely and run the verification-log stat in its place; a half-empty testimonial row hurts more than none.

Source real reviews from App Store Connect (Ratings and Reviews, US storefront). Reviews may be quoted on the developer's own site; do not quote reviews from other apps or from social posts as if they were App Store reviews.

1. `[PLACEHOLDER REVIEW 1: 5-star review that mentions distance or "near me". Reviewer nickname, date. Replace before publish.]`
2. `[PLACEHOLDER REVIEW 2: review that mentions the open/closed status or saving a wasted trip. Reviewer nickname, date. Replace before publish.]`
3. `[PLACEHOLDER REVIEW 3: review that mentions no account or no sign-up. Reviewer nickname, date. Replace before publish.]`
4. `[PLACEHOLDER REVIEW 4: review that mentions a specific chain or deal, e.g. a grocery sushi day. Reviewer nickname, date. Replace before publish.]`
5. `[PLACEHOLDER REVIEW 5: review that mentions trusting the list or the daily verification. Reviewer nickname, date. Replace before publish.]`
6. `[PLACEHOLDER REVIEW 6: review that contrasts it with coupon or deal apps that list junk food. Reviewer nickname, date. Replace before publish.]`

Social-proof lines that are true today and can run without any reviews (use these instead of a ratings badge until there are ratings):

- "53 mornings checked in public, every count logged." (links to `/verification-log`)
- "559 deal-verifications since August 27, 2026." (recompute from `verify-log.json` at build)
- "37 healthier chains in. 25 fast-food chains out, by name."
- "Zero ads. Zero accounts. Zero sponsored listings."

Do not show an App Store star rating, rating count or "#N in Food & Drink" on the page until it can be read from the live listing and confirmed; Apple's own badge artwork is the only App Store element to use before then.

---

## Sources and what could not be verified

Read for this brief: `llms.txt`, `about.html`, `app.html`, `verification-log.html`, `index.html` (head and header), `privacy.html` (data claims), `GROWTH.md`, `scripts/build.mjs` (explainerPage template and the CHAINS roster), the Publix explainer page as a rendered template example, and the data files `verify-log.json`, `report-data.json`, `meals.json`, `deals.json` (the committed version at `origin/main`; the working-tree copy has unresolved merge-conflict markers and does not parse), plus `healthy-food-deals-report.html` and `cheap-healthy-meals.html` meta text.

Computed figures: 53 log entries, 559 total verified, 10.5 average, 6 to 21 range (from `verify-log.json`); 37 approved and 25 banned chains, 62 total (from `CHAINS` in `scripts/build.mjs`); 80 chain pages and 16 weekly explainer pages (file count); 60 meals, 21 brands, $3.49 to $14.29, median $8.99, 1.1 to 8.6 g/$ (from `meals.json`); 9 deals from 9 brands on 2026-10-18 (from `deals.json`). Report figures are quoted from `report-data.json`.

Not verified, and why: the App Store listing at apps.apple.com/us/app/dailybite-healthy-food-deals/id6802622518 could not be fetched from this environment (the outbound proxy refuses `apps.apple.com` and `itunes.apple.com` with a 403, and web search has not indexed the listing). The feature claims above are therefore taken from the site's own description of the app in `llms.txt` and `about.html` (distance, open or closed status, one-tap ordering into the chain's app, same feed as the site). Everything the listing alone would establish is marked `[CONFIRM]`: minimum iOS version, release date, in-app purchases, the privacy label, what the app does without location permission, and the real screenshot set. Nobody should ship the `/app` page until someone opens the listing on a phone and ticks those off.

Web research consulted for structure (vendor sources, treated as guidance not evidence): u2l.ai on Smart App Banners and web-to-app deep links (2026), trysonar.app on app landing pages, Branch.io on smart banners with deep linking, Presspage and ContentGrip on press-kit pages (2026), PR News and StartupNation on press-kit contents. Common ground: one dominant CTA above the fold, real screenshots, social proof only when genuine, a self-hosted short URL behind any QR code, Smart App Banner with `app-argument` for installed users, and a press page at one stable URL with direct-download assets, a two-length boilerplate and story angles rather than brochure copy.
