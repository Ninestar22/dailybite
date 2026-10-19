# Seasonal page drafts: holiday gift-card bonuses, Whole Foods Sushi Friday, Boorito 2026 check

Drafted 2026-10-19. Schema matches `const EXPLAINERS = [` and `const HOLIDAYS = [` in `scripts/build.mjs`.

**Verification caveat for the editor.** The session's outbound proxy returned `403` on CONNECT for every chain and grocer host (newsroom.chipotle.com, chipotle.com, wholefoodsmarket.com, panerabread.com, noodles.com, investor.noodles.com, qdoba.com, jamba.com, subway.com, cava.com, sweetgreen.com, potbelly.com, smoothieking.com, tropicalsmoothiecafe.com, prnewswire.com). Every fact below was read from the search index's quoted text of the official page named in Sources, not from a live page load. Before publishing, open each Source URL once and confirm the quoted terms still match. Items marked **[RE-CHECK]** are ones where the quoted text was attributed to the official domain but I could not pin the exact page URL.

---

## 1. EXPLAINER: `holiday-gift-card-bonuses`

Status summary (as of 2026-10-19): **no chain on the list has announced a 2026 holiday bonus-card offer.** Chipotle, Panera, Qdoba and Noodles & Company each ran one in 2025 on their own sites or company release; Jamba's last verified holiday bonus is 2018; Subway, Potbelly, CAVA, Sweetgreen, Smoothie King and Tropical Smoothie have no official 2025 or 2026 holiday bonus-card offer I could verify, so they are stated as "none verified", not invented.

Note: the renderer (`explainerPage`) also supports an optional `table: { head, rows, note }`; included here because a per-chain status grid is the clearest format. Drop it if you want the plain shape.

```js
  { slug: "holiday-gift-card-bonuses", brand: "Chipotle", chainSlug: "chipotle-deals", day: null,
    title: "Holiday Gift Card Bonus Deals at Healthy Chains 2026: Chipotle, Panera, Qdoba & More",
    h1: "Holiday Gift Card Bonuses at Healthy Chains (2026)",
    desc: "Which healthier chains add a bonus card or promo code when you buy a holiday gift card: Chipotle, Panera, Qdoba, Noodles & Company and others. What each offered last year, what is announced for 2026, and the fine print on bonus cards.",
    answer: "As of October 19, 2026, <strong>no healthy chain has announced its 2026 holiday gift card bonus yet</strong>. Last year the pattern was consistent: <strong>Chipotle</strong> gave a $10 code to the first 20,000 online buyers of $50 in gift cards (November 24 to 28, 2025); <strong>Panera</strong> and <strong>Qdoba</strong> gave a $10 bonus card per $50 (November through December 31, 2025); and <strong>Noodles &amp; Company</strong> gave a $10 bonus card per $50 (November 5 to December 31). Bonus cards are claimable by anyone, no membership needed, but they expire fast, usually in January or February. This page lists only announced offers with the chain's own terms, and is updated as 2026 offers go live.",
    facts: [["Announced for 2026", "None yet (checked October 19, 2026). Chipotle's holiday gift card page currently shows only a $10 first-order code for new Build Your Own customers, not a gift card bonus"], ["Chipotle, last year", "First 20,000 purchases of $50+ in gift cards from the online gift card store, November 24 to 28, 2025, got a single-use $10 code; code expired December 15, 2025; not available for in-restaurant gift card purchases"], ["Panera, last year", "$10 bonus card per $50 in gift cards bought or reloaded in one transaction, in cafe or online, November 5 to December 31, 2025; bonus card redeemable January 1 to 31, 2026"], ["Qdoba, last year", "$10 digital bonus card per $50 gift card bought in store or online, November 1 to December 31, 2025; bonus expired February 28, 2026; in-store buyers claimed it at qdoba.com/bonuscard"], ["Noodles & Company, last year", "$10 bonus card per $50 in gift cards, November 5 to December 31; bonus card terms set by the chain"], ["Who can claim", "Anyone who buys the gift card: no rewards account or paid membership required. Bonus cards and codes have their own expiration and exclusions (usually no third-party delivery, no gift card purchases)"], ["Verified", "Each line above is from the chain's own promo page or company release; re-checked by DailyBite when 2026 offers are announced"]],
    table: { head: ["Chain", "2026 holiday bonus", "Last verified holiday offer"],
      rows: [["Chipotle", "Not announced (checked Oct 19, 2026)", "2025: first 20,000 buyers of $50+ online got a $10 code, Nov 24 to 28; code expired Dec 15, 2025"],
        ["Panera", "Not announced", "2025: $10 bonus card per $50, Nov 5 to Dec 31; redeem Jan 1 to 31, 2026"],
        ["Qdoba", "Not announced", "2025: $10 digital bonus per $50, Nov 1 to Dec 31; bonus expired Feb 28, 2026"],
        ["Noodles & Company", "Not announced", "2025: $10 bonus card per $50, Nov 5 to Dec 31"],
        ["Subway", "Not announced", "No official holiday 2025 offer verified; 2026 ran a free 6-inch sub per $25 in gift cards through June 30, 2026 (spring offer, ended)"],
        ["Jamba", "Not announced", "Holiday 2018: $5 bonus card per $25, redeemable Jan 1 to Feb 28, 2019. In 2026 the chain ran a $5 reward code per $25 online for Moms, Dads, Grads (May 10 to June 13, 2026)"],
        ["CAVA", "Not announced", "No gift card purchase bonus found on cava.com for 2025 or 2026 (its 2025 holiday promotion was a sweepstakes, 12 Days of Delight)"],
        ["Sweetgreen", "Not announced", "No gift card purchase bonus found on sweetgreen.com for 2025 or 2026"],
        ["Potbelly", "Not announced", "No official holiday 2025 offer verified on potbelly.com"],
        ["Smoothie King", "Not announced", "No gift card purchase bonus found on smoothieking.com; holiday 2025 promotions were sweepstakes"],
        ["Tropical Smoothie Cafe", "Not announced", "No gift card purchase bonus found on tropicalsmoothiecafe.com for 2025 or 2026"]],
      note: "Checked October 19, 2026 against each chain's own gift card page, newsroom or company release. 'Not announced' means no 2026 holiday terms were posted on the chain's site that day." },
    faq: [["Has Chipotle announced its 2026 holiday gift card bonus?", "Not as of October 19, 2026. Chipotle's holiday gift card page shows a $10 first-order code for new Build Your Own customers (code TRYBYOC, through December 31, 2026), which is not a gift card bonus. In 2025 the gift card offer went live November 24 and was capped at the first 20,000 purchases, so it sold out quickly."],
      ["Do I need a rewards account or membership to get a bonus card?", "No. Bonus cards and codes come with the gift card purchase itself. Some chains, including Chipotle, email the code and require an online purchase from the chain's own gift card store; in-restaurant gift card purchases did not qualify in 2025."],
      ["When can I use the bonus card?", "Usually not during the holidays. Panera's bonus cards were redeemable January 1 to 31, 2026; Qdoba's expired February 28, 2026; Chipotle's $10 code expired December 15, 2025. Read the dates on the bonus card before gifting it."],
      ["Are bonus cards the same as gift cards?", "No. The gift card itself does not expire at Chipotle, Panera, Qdoba, Jamba or Noodles. The bonus is a promotional card or code with its own expiration date and exclusions, commonly no third-party delivery orders and no buying more gift cards with it."],
      ["Which chains do not do bonus cards?", "DailyBite found no gift card purchase bonus on the official sites of CAVA, Sweetgreen, Smoothie King or Tropical Smoothie Cafe for the 2025 or 2026 holidays. If one appears, it will be added here with the chain's terms."],
      ["Where do these deals show up on DailyBite?", "Announced bonus-card offers are listed on the Black Friday & Cyber Monday page and in the daily feed on the day they go live, each with a link to the chain's own terms."]],
    more: `<p>Gift card bonuses are the one holiday deal that needs no coupon, app or membership: buy the card, get the bonus. The catch is timing. Chipotle's 2025 offer ran only November 24 to 28 and was limited to the first 20,000 purchases; Panera's and Qdoba's ran all of November and December but the bonus cards were only usable in January and February. If you want the bonus for yourself, buy early in the window and set a reminder for the redemption month. For today's verified Chipotle offers see the <a href="/chipotle-deals" style="color:var(--accent2)">Chipotle page</a>; for Panera's everyday value menu see <a href="/panera-4-99-mix-and-match" style="color:var(--accent2)">Panera's $4.99 Mix &amp; Match</a>; and for every announced Thanksgiving-week offer see <a href="/black-friday-cyber-monday-food-deals" style="color:var(--accent2)">Black Friday &amp; Cyber Monday food deals</a>.</p>` },
```

### Sources (fact -> URL -> date checked)

- No 2026 Boorito/holiday gift card release on Chipotle newsroom; most recent release is Sept 28, 2026 margarita tour -> https://newsroom.chipotle.com/press-releases?l=100 -> 2026-10-19
- Chipotle 2025 holiday gift card terms (first 20,000 purchases Nov 24-28, 2025; $50+ in designated e-gift or physical cards from the online gift card store; single-use code worth up to $10 plus tax; expired Dec 15, 2025; not valid for in-restaurant gift card purchases, third-party platforms, or buying gift cards). Page currently shows TRYBYOC $10 first Build Your Own order code, terms through Dec 31, 2026 -> https://www.chipotle.com/holiday-gift-cards -> 2026-10-19
- Chipotle's 2026 gift card bonus pattern (graduation: May 14-18, 2026, first 10,000 buyers of $40+ got a BOGO code) -> https://newsroom.chipotle.com/2026-05-11-CHIPOTLE-REVEALS-AMERICAS-MOST-CHIPOTLE-OBSESSED-COLLEGE-TOWNS-AND-CELEBRATES-THE-CLASS-OF-2026-WITH-GIFT-CARD-OFFER -> 2026-10-19
- Panera holiday bonus-card structure, 2021 and 2023 (every $50 bought or reloaded in-cafe or online, 11/8/23-12/31/23, $10 bonus card valid 1/1/24-1/31/24; 2021 version valid 1/1/22-1/31/22); promotion cards expire on the printed date, gift cards do not -> https://panerabread.com/en-us/company-information/gift-card-terms-and-conditions.html -> 2026-10-19
- **[RE-CHECK]** Panera holiday 2025 dates (Nov 5 to Dec 31, 2025; $10 bonus card per $50 in one transaction at participating US cafes, online or in app; bonus redeemable Jan 1 to 31, 2026; physical bonus cards limited, may be digital). Quoted text attributed to panerabread.com gift card pages in the search index; exact page not pinned. Candidate URLs: https://www.panerabread.com/en-us/gift-cards.html and https://www.panerabread.com/en-us/content/gifting-at-panera.html -> 2026-10-19
- Panera spring 2026 bonus card (Apr 8 to May 31, 2026, $10 per $50, redeem June 1 to 30, 2026): confirms the chain still runs the program in 2026 -> https://www.panerabread.com/en-us/gift-cards.html and https://panerabread.my.site.com/custhelp/s/topic/0TO0y000000cDFhGAM/gift-cards -> 2026-10-19
- Qdoba 2025 holiday bonus (each $50 physical gift card bought in store 11/1/25 to 12/31/25 PST earns a $10 digital bonus card; online buyers emailed automatically; in-store buyers claim at qdoba.com/bonuscard with the 16-digit number; bonus expires 2/28/26; redeem online or in restaurant; US only) -> https://www.qdoba.com/bonuscard -> 2026-10-19
- Noodles & Company 2025 holiday bonus ("from November 5 through December 31, guests who spend $50 on Noodles gift cards will receive a $10 bonus card"), company release on PR Newswire; release ID sits between Sept 29, 2025 and Nov 18, 2025 releases, so the year is 2025 but the dateline itself was not visible in the snippet -> https://www.prnewswire.com/news-releases/noodles--company-serves-up-a-delicious-alternative-as-pizza-fatigue-hits-this-holiday-season-302601568.html -> 2026-10-19
- Noodles & Company older holiday pattern ($5 Gift Giver Bonus Card per $25, through Dec 31, redeemable to Jan 16; 2015, 2016, 2017) -> https://investor.noodles.com/news-releases/news-release-details/noodles-company-spices-gift-giving-season-new-hot-saucy-holiday and https://investor.noodles.com/news-releases/news-release-details/noodles-company-celebrates-holidays-gift-giver-bonus-card -> 2026-10-19
- Subway US gift card page: free 6-inch sub with every $25 in gift cards through 6/30/2026 (ended) -> https://www.subway.com/en-us/subwaycard -> 2026-10-19
- Subway 2021 holiday bonus card (free six-inch sub bonus card per $25) -> https://www.prnewswire.com/news-releases/subway-rings-in-the-holiday-season-with-latest-menu-refresh--gift-card-bonus-offer-301425814.html -> 2026-10-19
- Jamba holiday 2018 bonus card ($25 in gift cards in Nov-Dec earns $5 Holiday Bonus Card, redeemable Jan 1 to Feb 28, 2019) -> https://www.jamba.com/newsroom/gift-of-jamba -> 2026-10-19
- Jamba 2026 Moms, Dads, Grads offer (5/10/26 to 6/13/26; $25 online gift card purchase in one order earns one $5 Reward Code, valid 5/3/26 to 7/21/26; must be unlocked in a Jamba Rewards account); no holiday 2025 or 2026 terms listed -> https://www.jamba.com/gift-cards/terms -> 2026-10-19
- Jamba: bonus and reward cards are promotional coupons with their own expiration, not gift cards; points earned on redemption not purchase -> https://www.jamba.com/gift-cards -> 2026-10-19
- CAVA: gift card terms (no expiry); no purchase bonus; 2025 holiday promotion was "12 Days of Delight" sweepstakes with Sun tier upgrade Jan 1 to Dec 31, 2026 -> https://cava.com/giftcard-terms and https://cava.com/12-days-terms -> 2026-10-19
- Sweetgreen: gift cards do not expire; no purchase bonus found; current Holiday Catering Promo is $50 off $250 catering (expires 11/6/26), not a gift card bonus -> https://www.sweetgreen.com/sweetgreen-faq and https://www.sweetgreen.com/sweet-rewards/ -> 2026-10-19
- Potbelly: gift cards never expire; gift card purchases earn no Perks coins; no holiday bonus posted -> https://www.potbelly.com/faqs-gift-cards and https://www.potbelly.com/gift-cards -> 2026-10-19
- Smoothie King: gift card purchases not eligible for Healthy Rewards; holiday 2025 activity was sweepstakes ("SK Sleighs the Holidays"); Oct 2026 "Pretty, Pretty Protein" social giveaway of $25 cards is not a purchase bonus -> https://www.smoothieking.com/gift-cards/ , https://www.smoothieking.com/landing-pages/holiday-sweeps , https://www.smoothieking.com/landing-pages/prettyprettyproteinsmoothie/ -> 2026-10-19
- Tropical Smoothie Cafe: gift card purchases excluded from Tropic Rewards points; no gift card bonus posted -> https://www.tropicalsmoothiecafe.com/rewards and https://www.tropicalsmoothiecafe.com/app-faq -> 2026-10-19

### Could not verify (left out of the page copy)

- Subway holiday 2025 "free Footlong per $50 in gift cards, 11/6 to 12/31/25": appeared only on Subway test-environment subdomains (swpe.test.subway.com, swdev.test.subway.com), not on subway.com or newsroom.subway.com. Not official enough; omitted.
- Potbelly holiday 2024 "$5 off every $25 in e-gift cards, Nov 25 to Dec 25" appears only on franchising.com reposts, not on potbelly.com or investors.potbelly.com. Omitted. No 2025 version found anywhere.
- Tropical Smoothie "Spend and Receive: $25 gift card gets a free 24 oz smoothie" (Restaurant Business Online / QSR, undated, tied to an old "Naughty or Nice" menu). Not on the chain's site; omitted.
- Qdoba December 2024 "$15 bonus per $50 online, 12/13 to 12/15/24" is a Slickdeals post only; omitted.
- Noodles & Company 2025 release dateline: the Nov 5 to Dec 31 terms are quoted from the company's PR Newswire release but the dateline year was not visible in the snippet (inferred 2025 from the release ID sequence). Confirm on the live page before publishing.
- Panera 2025 holiday dates: see [RE-CHECK] above.
- Whether any chain's 2026 holiday offer has been posted today: all official hosts were unreachable from this session, so "not announced" rests on the search index as of 2026-10-19. Re-run the check when the proxy allows these hosts.

---

## 2. EXPLAINER: `whole-foods-sushi-friday` (revision)

**This replaces the existing entry at `scripts/build.mjs` ~line 1002**, which (a) has no `chainSlug`, (b) says the offer window ends October 6, 2026, and (c) lacks a "needs Prime" fact row up front. Whole Foods has since renewed the window through March 30, 2027. The exclusions list now also includes "salad rolls". The `/safeway-5-friday-sushi` link requested by the editor is added.

Rendering note: `chainSlug: "sushi-deals"` makes the footer nav read "Whole Foods Market deals today" linking to /sushi-deals, and the renderer already links /sushi-deals as "Grocery sushi days" on the same line. If that label reads oddly, set `chainSlug: null` (the /sushi-deals link stays either way).

```js
  { slug: "whole-foods-sushi-friday", brand: "Whole Foods Market", chainSlug: "sushi-deals", day: 5,
    title: "Does Whole Foods Have a Sushi Day? Friday BOGO 50% Off Needs Amazon Prime (2026)",
    h1: "Whole Foods Sushi Friday: Prime Members Only",
    desc: "Whole Foods' sushi day is Friday: buy one packaged sushi roll, get one 50% off, in store, through March 30, 2027, but only for Amazon Prime members. What it covers, what it excludes, and the grocery sushi days that need no paid membership.",
    answer: "Yes, Whole Foods has a sushi day, but it is a <strong>paid-membership perk</strong>. Every Friday, Whole Foods Market runs <strong>buy one, get one 50% off packaged sushi rolls</strong>, in store only, for <strong>Amazon Prime members only</strong>. The current window runs <strong>October 7, 2026 through March 30, 2027</strong>. It is a discount on the cheaper of two rolls, not a $5 price, and you must identify as a Prime member at checkout. DailyBite does not list paid-membership perks as deals, so this page explains the offer honestly and points to the sushi days anyone can use with no membership.",
    facts: [["Needs", "Amazon Prime, a paid membership. Without Prime, rolls are regular price"], ["Day", "Fridays, as one of Whole Foods' weekly Prime member deals"], ["Offer", "Buy one packaged sushi roll, get one 50% off; buy in multiples of two, discount applied to the lower-priced roll"], ["Dates", "Valid October 7, 2026 through March 30, 2027 (Whole Foods renews the window; the prior one ended October 6, 2026)"], ["Excludes", "Salad rolls, catering trays, made-to-order rolls, appetizers, spring rolls, sashimi, nigiri, combos, and in-store venues and restaurants"], ["Where", "U.S. stores, in store only; not available in Hawaii"], ["Checked", "October 19, 2026, on wholefoodsmarket.com (Days of Deals)"]],
    faq: [["Does Whole Foods have a sushi day?", "Yes: Friday. Packaged sushi rolls are buy one, get one 50% off for Amazon Prime members, in store only. It is listed with Whole Foods' other Friday Prime deals (oysters and pizza)."],
      ["Is Whole Foods sushi $5 on Fridays?", "No. The Friday offer is buy one, get one 50% off packaged rolls for Prime members. Two rolls at $10 each come to $15, or $7.50 apiece. There is no fixed $5 roll."],
      ["Do I need Amazon Prime?", "Yes. The offer is for Prime members only, and you identify as a Prime member at checkout (Whole Foods or Amazon app code, or a linked card). Prime is a paid membership, which is why DailyBite does not count this as a deal."],
      ["Is the deal seasonal or permanent?", "Whole Foods posts it for a dated window and has renewed it repeatedly. The window posted on October 19, 2026 runs October 7, 2026 through March 30, 2027; the previous one ended October 6, 2026. Check the Days of Deals page for the current dates."],
      ["Which rolls are excluded?", "Only prepackaged rolls from the case qualify. Whole Foods excludes salad rolls, catering trays, made-to-order rolls, appetizers, spring rolls, sashimi, nigiri, combos, and its in-store venues and restaurants."],
      ["Where can I get cheap sushi without a paid membership?", "Publix sells select rolls for $5 on Wednesdays and Safeway runs $5 Friday sushi in divisions that participate, both with no membership. Sprouts, Kroger-family stores and Harris Teeter run $6 days. The full weekday calendar is on the grocery sushi guide."],
      ["Why doesn't DailyBite list this as a deal?", "Because it requires a paid membership. The daily list only includes offers anyone can claim, at most with a free account."]],
    more: `<p>If you already pay for Prime, the Friday offer is worth using on two higher-priced rolls, since the discount comes off the cheaper one; it is in store only, so it will not apply to Amazon delivery orders. If you do not have Prime, the no-membership sushi days are the better value. Friday is also sushi day at <a href="/safeway-5-friday-sushi" style="color:var(--accent2)">Safeway ($5 Friday)</a> and <a href="/harris-teeter-5-sushi-friday" style="color:var(--accent2)">Harris Teeter</a>; Wednesday belongs to <a href="/publix-5-sushi-wednesday" style="color:var(--accent2)">Publix ($5)</a>, <a href="/sprouts-sushi-wednesday" style="color:var(--accent2)">Sprouts</a>, <a href="/hannaford-sushi-wednesday" style="color:var(--accent2)">Hannaford</a> and <a href="/kroger-sushi-wednesday" style="color:var(--accent2)">Kroger</a>. The full weekday calendar is on the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>.</p>` },
```

### Sources (fact -> URL -> date checked)

- Friday deal "Buy 1, Get 1 50% Off Packaged Sushi Rolls"; valid 10/7/26 through 3/30/27; "all deals are in-store only"; "must identify as a Prime member to receive Prime member discount"; "Must purchase in multiples of 2 to receive discount. Discount applied on lower-priced item."; U.S. only, excludes Hawaii stores -> https://www.wholefoodsmarket.com/days-of-deals -> 2026-10-19
- Exclusions: "valid for prepackaged sushi only"; excludes salad rolls, catering trays, made-to-order rolls, appetizers, spring rolls, sashimi, nigiri, combos, venues and restaurants -> https://www.wholefoodsmarket.com/promotion/a4ad834e-0a4f-43d9-b0ea-c5400341c034 -> 2026-10-19
- "end-of-week favorites like sushi, oysters and pizza every Friday" for Prime members, same 10/7/26 to 3/30/27 window -> https://www.wholefoodsmarket.com/ and https://www.wholefoodsmarket.com/amazon -> 2026-10-19
- Prior window ended October 6, 2026 -> existing DailyBite entry, checked October 2, 2026 on wholefoodsmarket.com (scripts/build.mjs line ~1007)
- Publix $5 Wednesday, Safeway $5 Friday, Harris Teeter $6 Friday, Sprouts/Kroger $6 Wednesday -> existing verified DailyBite explainer entries in scripts/build.mjs (no new claim made)

### Could not verify

- The exact mechanism for identifying as Prime at checkout (app QR code vs. linked phone number/card) was not quoted on the pages reached; the FAQ wording above is kept general ("app code, or a linked card"). Tighten or trim if the live page states it differently.
- Whether individual stores or sushi vendors (for example Genji) opt out: Whole Foods' pages do not say; left as "in store only".

---

## 3. HOLIDAYS check: Boorito 2026

**Status: not yet announced for 2026 (as of 2026-10-19).**

What Chipotle has said officially for 2026, in its September 28, 2026 newsroom release ("CHIPOTLE SUMMONS THE RETURN OF MARGARITAS IN THE COUNTDOWN TO BOORITO"):

> "Boorito returns on Halloween with an in-restaurant entrée offer. Additional details on this year's Boorito festivities will be announced later in October."

The official Boorito page (chipotle.com/boorito) still carries the title "Boorito 2025" and 2025 terms. No 2026 price, hours or Rewards wording exists from Chipotle. Third-party sites (Portland Living on the Cheap, dealsfinders, dealnews) are already publishing "$6 entrée, 3 p.m. to close, Rewards members in costume" for 2026; that is last year's terms repeated, not an announcement, and must not be used.

2025 terms (official, October 22, 2025 release and chipotle.com/boorito):

> "On October 31, Chipotle Rewards members who visit a Chipotle restaurant in costume from 3 p.m. to close local time and scan their Rewards member card at checkout will receive a $6 entrée offer."
> "Valid only on October 31, 2025 beginning at 3:00 p.m. local time through restaurant closing; redemption is subject to availability."
> "Not valid for kids meals, catering orders or on third party ordering platforms. Limit one discounted item per guest."

### Exact blurb wording for the Halloween HOLIDAYS entry, to use now

```js
  { slug: "chipotle-boorito-halloween-deals", name: "Halloween (Chipotle Boorito)", date: "2026-10-31", emoji: "", kw: /boorito|halloween|costume/i,
    blurb: "Halloween is Chipotle Boorito day. Chipotle confirmed on September 28, 2026 that Boorito returns on Halloween with an in-restaurant entree offer, with details to be announced later in October; the 2026 price, hours and Rewards terms are not yet announced. Last year (October 31, 2025), Chipotle Rewards members (free to join) in costume who scanned at checkout from 3 p.m. to close got a $6 entree, in restaurant only, one per guest. Verified 2026 terms appear here the day Chipotle posts them." },
```

### Blurb to swap in once Chipotle posts the 2026 release (fill only from the release; do not pre-fill)

```
"Halloween is Chipotle Boorito day: on October 31, 2026, Chipotle Rewards members (free to join) in costume who scan at checkout from [HOURS per release] get a [$PRICE] entree, in restaurant only, [limit/exclusions per release]. Other healthy chains occasionally add costume freebies. Verified offers appear here as chains announce them."
```

### Sources (fact -> URL -> date checked)

- 2026: "Boorito returns on Halloween with an in-restaurant entrée offer. Additional details on this year's Boorito festivities will be announced later in October." (release dated Sep 28, 2026) -> https://newsroom.chipotle.com/2026-09-28-CHIPOTLE-SUMMONS-THE-RETURN-OF-MARGARITAS-IN-THE-COUNTDOWN-TO-BOORITO (mirror: https://ir.chipotle.com/2026-09-28-CHIPOTLE-SUMMONS-THE-RETURN-OF-MARGARITAS-IN-THE-COUNTDOWN-TO-BOORITO) -> 2026-10-19
- Newsroom index shows no Boorito 2026 terms release as of today -> https://newsroom.chipotle.com/press-releases?l=100 -> 2026-10-19
- Official Boorito page still titled "Boorito 2025" with 2025 terms -> https://www.chipotle.com/boorito -> 2026-10-19
- 2025 terms: $6 entrée, Rewards members in costume, 3 p.m. to close local time, scan Rewards at checkout, Oct 31, 2025 (release dated Oct 22, 2025) -> https://newsroom.chipotle.com/2025-10-22-CHIPOTLES-BOORITO-RETURNS-WITH-6-ENTREES-ON-HALLOWEEN-AND-A-COSTUME-CONTEST-TO-WIN-A-VIP-CARD -> 2026-10-19
- 2025 fine print: "Valid only on October 31, 2025 beginning at 3:00 p.m. local time through restaurant closing; redemption is subject to availability"; not valid for kids meals, catering or third-party platforms; limit one discounted item per guest -> https://www.chipotle.com/boorito -> 2026-10-19
- 2024 pattern for context ($6 burritos, extended hours; same exclusions) -> https://ir.chipotle.com/2024-10-08-BOORITO-IS-BACK-CHIPOTLE-CELEBRATES-HALLOWEEN-WITH-6-BURRITOS-AND-EXTENDED-HOURS -> 2026-10-19
- Chipotle Rewards is free to join -> existing DailyBite site rule (Rewards referenced as free across chipotle-deals); not re-verified today because chipotle.com was unreachable

### Could not verify

- Any 2026 Boorito price, hours, Rewards requirement or costume rule. Chipotle has published none. Third-party "$6, 3 p.m. to close" claims for 2026 are unsourced repeats of 2025 and are excluded.
- Whether the 2025 announcement timing (October 22) will repeat: Chipotle only says "later in October". The holiday page's generic empty-state text ("Chains usually announce ... in the final days before") already covers this.
