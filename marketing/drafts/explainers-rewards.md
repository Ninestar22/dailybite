# Draft explainers: CAVA Rewards, sweetgreen SG Rewards, Tropic Rewards

Drafted 2026-10-19 for `const EXPLAINERS = [` in `scripts/build.mjs`. Each object matches the existing shape
(slug, brand, chainSlug, day, title, h1, desc, answer, facts, faq, more). All three are `day: null` pages.

**Verification note.** The sandbox's outbound proxy refused CONNECT to cava.com, support.cava.com, sweetgreen.com and
tropicalsmoothiecafe.com (HTTP 403), so none of these pages could be fetched directly. Every fact below was instead
checked against the official page's indexed text via domain-restricted search (official domains only: cava.com,
support.cava.com, investor.cava.com, sweetgreen.com, tropicalsmoothiecafe.com). No blogs or third-party sources were
used. Before publishing, a human should open each URL in the Sources lists once and eyeball the numbers; anything
that could not be confirmed on an official page is listed under "Could not verify" and was left out of the copy.

Site rules applied: no paid memberships are pitched (Sweetpass+ is mentioned only as the program that ended);
first-purchase and welcome offers are described in one neutral sentence or omitted.

---

## 1. cava-rewards

```js
  { slug: "cava-rewards", brand: "CAVA", chainSlug: "cava-deals", day: null,
    title: "CAVA Rewards Explained: Points per Dollar, Sea/Sand/Sun Tiers & What a Free Bowl Costs (2026)",
    h1: "CAVA Rewards, Explained",
    desc: "CAVA Rewards is free, pays 10 points per $1 (11 or 12 at higher tiers), and a free bowl or pita costs 2,100 points. How the Sea, Sand and Sun tiers work, what earns points, what doesn't, and when points expire.",
    answer: "CAVA Rewards is CAVA's free loyalty program. Every member starts at the <strong>Sea</strong> tier and earns <strong>10 points per $1</strong> on restaurant orders; reaching <strong>Sand</strong> (1,500 points in a calendar year) raises that to 11 and <strong>Sun</strong> (4,500 points) to 12. Rewards start at 500 points for a drink or side pita, and a <strong>full bowl or pita costs 2,100 points</strong>. Points come only from orders placed in the CAVA app, on cava.com, or in the restaurant when you scan your app or give your phone number; third-party delivery orders earn nothing. Points expire after 180 days without a qualifying purchase.",
    facts: [["Earning rate", "Sea: 10 points per $1. Sand: 11. Sun: 12 (restaurant orders; catering earns 10 at every tier)"], ["Tiers", "Sea (0 points), Sand (1,500 points), Sun (4,500 points), based on points earned in a calendar year; status lasts the rest of that year and all of the next"], ["Reward costs", "500: drink, pita chips, avocado or side pita. 700: dessert or chips & sauce. 1,200: kids meal or half-off bowl/pita. 2,100: full bowl or pita"], ["What earns", "Orders in the CAVA app, on cava.com, or in the restaurant with your app QR code or phone number; forgotten receipts can be submitted within 30 days"], ["What doesn't earn", "DoorDash, Uber Eats and other third-party delivery; gift card purchases; shop.cava.com"], ["Expiry", "Points expire 180 days after your last qualifying purchase; a redeemed reward expires 60 days after it loads unless stated otherwise"], ["Verified", "Checked by DailyBite against cava.com/rewards, CAVA's support pages and its newsroom"]],
    faq: [["How many points for a free bowl at CAVA?", "2,100 points for a full bowl or pita. At the base rate of 10 points per $1, that is about $210 of pre-tax spending; at the Sun tier (12 points per $1) it is about $175. A half-off bowl or pita costs 1,200 points."],
      ["Do I earn points on DoorDash or Uber Eats orders?", "No. CAVA's support page says points are not earned on orders placed through third parties such as Uber Eats and DoorDash, or on gift card purchases. Order in the CAVA app or on cava.com if you want the points, and rewards can only be redeemed there too."],
      ["How do I get points when I order at the counter?", "Scan the QR code in your CAVA app or give the cashier your phone number. If you forget, CAVA lets you submit the receipt on its Forgot to Scan page within 30 days of an in-restaurant visit, with limits on how many you can submit per day, week and month."],
      ["Does CAVA still do status matching?", "CAVA ran a one-time status match from October 13 to November 23, 2025, matching elite status in other companies' loyalty programs to its Sand or Sun tier through December 31, 2025. That window has closed, and CAVA has not announced a new one as of this writing."],
      ["Is there a birthday reward?", "Yes, at every tier. Sea and Sand members get a birthday drink, pita chips or dessert; Sun members get a half-off bowl or pita."],
      ["When do CAVA points expire?", "180 days after your last qualifying purchase. One order inside that window keeps the whole balance alive. Expired points don't affect your tier status."]],
    more: `<p>CAVA relaunched its loyalty program with the Sea, Sand and Sun tiers on October 6, 2025. The 2,100-point bowl is the headline redemption, but the 500-point tier (a drink, pita chips, avocado or a side pita) is the fastest way to turn points into food. CAVA also runs point-multiplier events for Sand (3x) and Sun (4x) members. For today's verified CAVA offers and app promos, see the <a href="/cava-deals" style="color:var(--accent2)">CAVA page</a>.</p>` },
```

### Sources (all checked 2026-10-19)

| Fact | Official source |
|---|---|
| Free to join; Sea tier requires zero points; Sea earns $1 = 10 points | https://cava.com/rewards |
| Sand unlocked at 1,500 points, $1 = 11 points on restaurant orders, 3x multiplier events, birthday drink/pita chips/dessert | https://cava.com/rewards ; https://investor.cava.com/news/news-details/2025/CAVA-Brings-Status-Matching-to-the-Table-as-an-Industry-First--Because-Mediterranean-Means-More-Rewards-for-CAVA-Loyalty-Members/default.aspx |
| Sun unlocked at 4,500 points, $1 = 12 points, 4x multiplier events, exclusive events, half-off bowl or pita birthday gift | https://cava.com/rewards ; same investor release |
| Catering orders earn 10 points per $1 at every tier; rewards cannot be applied to catering | https://cava.com/rewards ; https://support.cava.com/en_us/will-my-catering-order-apply-to-my-cava-rewards-SkHe_bs1A |
| Status based on points accrued in a calendar year; kept for the rest of that year and the following year | https://cava.com/rewards |
| Sea tier birthday gift (drink, pita chips or dessert) | https://cava.com/rewards |
| Redemption catalog: 500 / 700 / 1,200 / 2,100 points | https://investor.cava.com/news/news-details/2025/CAVA-Brings-Status-Matching-to-the-Table-as-an-Industry-First--Because-Mediterranean-Means-More-Rewards-for-CAVA-Loyalty-Members/default.aspx (Oct 2025) |
| New program launched October 6, 2025 | same investor release |
| In-restaurant earning: show app QR code or give phone number; Forgot to Scan receipt submission within 30 days, in-restaurant only, capped 1/day, 2/week, 4/month; points post within 48 hours | https://cava.com/rewards ; https://support.cava.com/en_us/missing-points-on-an-order-HJ1iJfm8C |
| Third-party delivery (Uber Eats, DoorDash) and gift card sales earn no points; shop.cava.com earns none; rewards redeemable only on cava.com or app orders | https://support.cava.com/en_us/can-i-earn-cava-rewards-points-on-third-party-delivery-orders-doordash-uber-eats-etc-B1XmMpPg ; https://shop.cava.com/pages/frequently-asked-questions |
| Points expire 180 days after last qualifying purchase; rewards expire 60 days after loading unless specified; expired points don't affect status | https://support.cava.com/en_us/when-do-my-cava-rewards-points-expire-HymFqvaPZe ; https://cava.com/rewards |
| Redemptions are final; points not returned | https://support.cava.com/en_us/i-redeemed-the-wrong-item-in-cava-rewards-can-i-get-my-points-back-BkJFjCoPl |
| Status match: window Oct 13 to Nov 23, 2025; matched tier in effect through 11:59 PM ET Dec 31, 2025; proof via screenshots; listed programs matched to Sun, others to Sand at CAVA's discretion | https://cava.com/status-match-terms ; same investor release |
| $0 delivery fee on $15+ orders: Sand once per quarter, Sun three times per quarter (not used in copy; verified) | https://cava.com/rewards |

### Could not verify (left out of copy)
- Whether the 500/700/1,200/2,100 catalog is printed on cava.com/rewards itself (it was confirmed only in the Oct 2025 investor release; the rewards page text that surfaced covered rules, not prices). Human check of the live app catalog recommended before publishing.
- Any status-match window after December 31, 2025. The copy says none has been announced "as of this writing"; re-check cava.com/status-match-terms before publishing.
- Whether first-party CAVA delivery (ordered in the app) earns points at the same rate as pickup. Official pages say app/website orders earn; nothing explicitly carved out native delivery, so the copy says "orders in the CAVA app or on cava.com" without naming delivery.
- Whether the point-expiry clock (180 days) also resets on catering orders. Not stated; omitted.
- The catering.cava.com page still describes an older "Stripes" ($1 = 1 Stripe) scheme. Treated as stale and ignored.

---

## 2. sweetgreen-rewards

```js
  { slug: "sweetgreen-rewards", brand: "Sweetgreen", chainSlug: "sweetgreen-deals", day: null,
    title: "Sweetgreen Rewards Explained: SG Rewards Points, What Replaced Sweetpass & How to Earn In Store (2026)",
    h1: "Sweetgreen Rewards (SG Rewards), Explained",
    desc: "Sweetgreen replaced its paid Sweetpass+ subscription with SG Rewards, a free points program: 10 points per eligible $1, one reward per order, points good for 180 days. What earns, what doesn't (third-party delivery, catering), and how to scan in store.",
    answer: "Sweetgreen's loyalty program is <strong>SG Rewards</strong>, the free points program that replaced the paid Sweetpass+ subscription when it ended on <strong>April 1, 2025</strong>. Members earn <strong>10 points for every eligible $1</strong> spent in the sweetgreen app, at order.sweetgreen.com, or in store by scanning the QR code in the app. Points are redeemed one reward per order from a chart in the app; sweetgreen's own example is a <strong>free drink for 700 points</strong>. Taxes, tips, fees, gift cards, merchandise, third-party delivery and catering do not earn, and points expire 180 days after they are deposited.",
    facts: [["Program", "SG Rewards, free; replaced the paid Sweetpass+ subscription, which ended April 1, 2025 (members were moved over automatically with a prorated refund)"], ["Earning rate", "10 points per eligible $1, excluding taxes, tips, fees, gift card purchases, merchandise, third-party delivery and catering"], ["Where points count", "Pickup, sweetgreen's own delivery and Outpost orders in the app or at order.sweetgreen.com; in-store orders when you scan the app's QR code"], ["Redeeming", "One reward per transaction, chosen from the point chart in the app or website; sweetgreen's example is a free drink for 700 points"], ["Expiry", "Points expire 180 days after the date they are deposited"], ["Posting time", "Points appear within 24 to 48 hours of purchase"], ["Verified", "Checked by DailyBite against sweetgreen.com's SG Rewards FAQ and program agreement"]],
    faq: [["Did Sweetpass end?", "Yes. Sweetgreen's own FAQ says the paid Sweetpass+ subscription went away on April 1 (2025), that subscribers were automatically enrolled in the new free program, and that membership fees were refunded pro rata. The free program is SG Rewards."],
      ["How do I earn points when I order at the counter?", "Open the sweetgreen app and scan its QR code at checkout. Sweetgreen's FAQ says in-store purchases earn only when the QR code is scanned, so there is no phone-number lookup to fall back on."],
      ["Do DoorDash or Uber Eats orders earn sweetgreen points?", "No. Third-party delivery orders are excluded from earning and from redeeming. Delivery ordered inside the sweetgreen app (sweetgreen's own delivery) does earn."],
      ["How many points do I need for a reward?", "It depends on the item. Sweetgreen publishes the chart in the app and at order.sweetgreen.com and says items and point values can change; the one figure sweetgreen states in its FAQ is 700 points for a free drink. You can use one reward per order, and a reward cannot be worth more than the order it is applied to."],
      ["Do sweetgreen points expire?", "Yes, 180 days after they are deposited. Each deposit has its own clock, so points earned in different months expire at different times."],
      ["What is Goat Status?", "An invitation-only tier on top of SG Rewards. Its published perks include double points on Fridays, $0 delivery fee on qualifying sweetgreen-native delivery orders, and a complimentary birthday salad, bowl or plate up to $18, provided a birthday is on file before the day. It cannot be purchased or applied for."]],
    more: `<p>SG Rewards is a simpler program than the Sweetpass it replaced: no fee, one earning rate, one reward per order. The main thing to remember is where you order. Points only post for orders placed in sweetgreen's app or website or scanned in store, so a sweetgreen bowl bought through a third-party app earns nothing. For today's verified sweetgreen offers and app promos, see the <a href="/sweetgreen-deals" style="color:var(--accent2)">sweetgreen page</a>.</p>` },
```

### Sources (all checked 2026-10-19)

| Fact | Official source |
|---|---|
| Program name "SG Rewards"; offered by sweetgreen, Inc. | https://www.sweetgreen.com/sg-rewards-faq ; https://www.sweetgreen.com/sg-rewards-program-agreement-1 |
| Sweetpass+ "going away on 4/1"; automatic enrollment in the new free program; opt-out allowed; prorated refund, with fallback contact if not received by April 9, 2025 (fixes the year as 2025) | https://www.sweetgreen.com/sweetpass-subscription-faqs |
| 10 points per eligible $1; exclusions: taxes, tips, fees, gift card purchases, merchandise, third-party delivery orders, catering orders | https://www.sweetgreen.com/sg-rewards-faq ; https://www.sweetgreen.com/sg-rewards-program-agreement-1 |
| Points earned on delivery, pick-up and Outpost purchases in the app or order.sweetgreen.com, and in-store by scanning the app QR code | https://www.sweetgreen.com/sg-rewards-faq |
| Points post within 24 to 48 hours (FAQ) / within 24 hours (agreement) | https://www.sweetgreen.com/sg-rewards-faq ; https://www.sweetgreen.com/sg-rewards-program-agreement-1 |
| Points expire 180 days after deposit | https://www.sweetgreen.com/sg-rewards-faq ; https://www.sweetgreen.com/sg-rewards-program-agreement-1 ; https://www.sweetgreen.com/privacy-policy |
| One reward per transaction; redemption value cannot exceed order total; points not transferable or redeemable for cash; rewards and point values subject to change | https://www.sweetgreen.com/sg-rewards-faq ; https://www.sweetgreen.com/sg-rewards-program-agreement-1 |
| Example redemption: free drink for 700 points | https://www.sweetgreen.com/sg-rewards-faq |
| Points redeemable only on pickup, sweetgreen native delivery and Outpost orders via app/website or in-store QR; not on third-party delivery or catering | https://www.sweetgreen.com/sg-rewards-faq |
| Catering orders earn no points | https://www.sweetgreen.com/sweet-rewards/ |
| Goat Status: invitation-only; 2x Point Fridays; $0 delivery fee on qualifying native delivery; birthday salad/bowl/plate up to $18, birthday must be on file beforehand | https://www.sweetgreen.com/goat-status-program-terms |

### Could not verify (left out of copy)
- The full redemption ladder (point costs for sides, proteins, bowls, etc.). Only the 700-point drink appears on an official page; the chart lives inside the app / order.sweetgreen.com, which could not be reached. The copy says so rather than guessing.
- The exact official brand casing of the program name. The FAQ and agreement say "SG Rewards"; a sibling page is titled "Sweet Rewards". Copy uses "SG Rewards".
- Whether any standard (non-Goat) birthday reward exists. None found on official pages; copy attributes the birthday perk to Goat Status only.
- The Sweet Rewards page mentions a $5 welcome reward for members who joined January 1 to September 30, 2026. It is a join-window promo that has already closed (today is Oct 19, 2026) and the site does not pitch welcome offers, so it is omitted.
- An official newsroom/press release dated April 2025 announcing SG Rewards. Not surfaced on sweetgreen.com or investor.sweetgreen.com; the FAQ pages above are sufficient for the end date and replacement.
- Whether Goat Status has a published points threshold or is purely invitation. Terms describe it as invitation-only; no threshold found.

---

## 3. tropical-smoothie-rewards

```js
  { slug: "tropical-smoothie-rewards", brand: "Tropical Smoothie", chainSlug: "tropical-smoothie-deals", day: null,
    title: "Tropic Rewards Explained: Points per Dollar, Free Smoothie Threshold, Birthday & Referral Rewards (2026)",
    h1: "Tropical Smoothie Cafe's Tropic Rewards, Explained",
    desc: "Tropic Rewards pays 10 points per $1 at Tropical Smoothie Cafe. A free smoothie costs 1,200 points, small add-ons start at 150, and points stay alive as long as you order every 6 months. Birthday reward, referrals, and what doesn't earn.",
    answer: "Tropic Rewards is Tropical Smoothie Cafe's free loyalty program. Members earn <strong>10 points per $1</strong> (before tax, tips and fees) in the app, online, or in the cafe by scanning the app's QR code or giving a phone number. Rewards start at 150 points for a smoothie-bowl topping, and a <strong>free smoothie costs 1,200 points</strong>, about $120 of spending. Members also get a <strong>surprise birthday reward</strong> and a free smoothie for each friend they refer who spends $5. Points never expire as long as you place an order at least once every 6 months; six months of inactivity forfeits them.",
    facts: [["Earning rate", "10 points per $1 spent, excluding tax, tips, service and delivery fees, gift cards and donations"], ["Reward ladder", "150: smoothie-bowl topping. 200: supplement or add-in. 350: side or cookie. 400: $2 off. 900: $5 off. 1,200: free smoothie. 1,300: flatbread or 'dilla. 1,400: sandwich or wrap. 1,500: Tropic Bowl"], ["How to earn in the cafe", "Scan the QR code in the app, have a crew member look up your phone number, or scan the receipt in the app within 14 days"], ["What doesn't earn", "Third-party delivery and third-party catering orders, gift card purchases, tips, fees and tax"], ["Birthday and referrals", "A surprise birthday reward if your birth date is on file at least 7 days before your birthday; a free smoothie for each referred friend who spends $5 as a member (the friend gets one too)"], ["Expiry", "Points are forfeited after 6 months with no purchase; any order resets the clock. Each redeemed reward carries its own expiration date"], ["Verified", "Checked by DailyBite against tropicalsmoothiecafe.com's rewards page, app FAQ and Tropic Rewards terms"]],
    faq: [["How many points for a free smoothie?", "1,200 points. At 10 points per $1 that is about $120 of pre-tax spending. Cheaper redemptions exist: a smoothie-bowl topping is 150 points, a supplement or add-in is 200, and a side or cookie is 350."],
      ["Is there a birthday reward?", "Yes, a surprise birthday reward. Your birth date (month and day) must be in your account at least 7 days before your birthday; join inside that 7-day window and you wait until next year."],
      ["How does the referral work?", "Share your referral link from the app. When the friend signs up and makes a purchase of at least $5 on their Tropic Rewards account, you each get a free smoothie reward."],
      ["Do my points expire?", "Only if you stop ordering. Tropical Smoothie's terms void points after 6 months of inactivity; any purchase on your account restarts the 6-month clock."],
      ["Do I earn points on DoorDash or Uber Eats?", "No. Third-party delivery and third-party catering orders do not earn Tropic Rewards points. Order in the Tropical Smoothie Cafe app or website, or scan in the cafe."],
      ["Is there a sign-up offer?", "Tropical Smoothie's terms describe a one-time free smoothie reward loaded after a new member's first purchase of $5 or more, which can take up to 24 hours to appear. It is a one-time welcome offer, not an ongoing deal."]],
    more: `<p>Tropic Rewards is a single-tier points program: every member earns at the same rate and the official rewards page lists no status levels. The 150- to 400-point rewards are the practical ones for a regular, since a topping or a $2 credit lands after one or two visits. For today's verified Tropical Smoothie Cafe offers and app promos, see the <a href="/tropical-smoothie-deals" style="color:var(--accent2)">Tropical Smoothie page</a>.</p>` },
```

### Sources (all checked 2026-10-19)

| Fact | Official source |
|---|---|
| 10 points per $1, excluding tax, tips and delivery fees; points only earned while signed in | https://www.tropicalsmoothiecafe.com/tropic-rewards-terms-and-conditions ; https://www.tropicalsmoothiecafe.com/rewards |
| Not earned on gift cards, donations, tips, service or delivery fees, tax, third-party delivery or third-party catering orders | https://www.tropicalsmoothiecafe.com/rewards |
| Reward ladder: 150 topping, 200 supplement/add-in, 350 side or cookie, 400 $2 reward, 900 $5 reward, 1,200 free smoothie, 1,300 flatbread or 'dilla, 1,400 sandwich or wrap, 1,500 Tropic Bowl | https://www.tropicalsmoothiecafe.com/rewards |
| In-cafe earning: scan app QR code, phone-number lookup by crew member, or scan receipt in app within 14 days | https://www.tropicalsmoothiecafe.com/rewards ; https://www.tropicalsmoothiecafe.com/app-faq |
| Redeeming: Rewards page in app, tap Redeem, use in-cafe QR or at checkout | https://www.tropicalsmoothiecafe.com/app-faq |
| Points never expire if you order every 6 months / voided and forfeited after 6 months of inactivity | https://www.tropicalsmoothiecafe.com/rewards ; https://www.tropicalsmoothiecafe.com/tropic-rewards-terms-and-conditions ; https://www.tropicalsmoothiecafe.com/app-faq |
| Each redeemed reward has its own expiration date | https://www.tropicalsmoothiecafe.com/app-faq |
| Birthday reward: must join at least 7 days before birthday with birth date on account; birth date optional but required for birthday reward; joining within 7 days defers to next year | https://www.tropicalsmoothiecafe.com/tropic-rewards-terms-and-conditions ; https://www.tropicalsmoothiecafe.com/app-faq |
| Referral: friend signs up and makes a minimum $5 purchase on their Tropic Rewards account, then both get a free smoothie | https://www.tropicalsmoothiecafe.com/rewards ; https://www.tropicalsmoothiecafe.com/tropic-rewards-terms-and-conditions |
| First-purchase free smoothie after a $5 minimum purchase; may take up to 24 hours to appear | https://www.tropicalsmoothiecafe.com/rewards ; https://www.tropicalsmoothiecafe.com/tropic-rewards-terms-and-conditions |
| Rewards page lists no status or tier system (basis for "single-tier" wording) | https://www.tropicalsmoothiecafe.com/rewards |

### Could not verify (left out of copy)
- The exact item at the 600-point tier. The rewards page shows a 600 PTS reward in the flatbread/breakfast category but the wording that surfaced was ambiguous ("a free breakfast item" vs. "flatbread"), so the 600 tier is omitted from the ladder in the copy. Confirm on the live page and add it.
- The value cap on a redeemed free smoothie. The app FAQ (old) says the reward applies to the lowest-priced 24 oz smoothie ordered; the terms say the first-purchase smoothie applies to the highest-priced smoothie up to a $9 value. Conflicting and version-dependent, so no cap is stated.
- Whether the referral offer is still running. Current rewards page and terms describe it in the present tense, but one older promo page carried a 12/31/22 end date. Copy keeps the referral; re-check before publishing.
- The app FAQ's older figure of 250 points for a supplement conflicts with the rewards page's 200. Copy uses the newer rewards-page value.
- Absence of tiers can only be inferred (no official page mentions any); phrased as "the official rewards page lists no status levels".
