# Draft explainers: Albertsons $5 Friday, Food Lion sushi Wednesday, Smoothie King Free Upsize Friday

Drafted 2026-10-19 for `const EXPLAINERS = [` in `scripts/build.mjs`. Each object matches the existing shape
(slug, brand, chainSlug, day, title, h1, desc, answer, facts, faq, more). Tone and length follow
`safeway-5-friday-sushi` and `publix-sub-of-the-week`; the facts block uses the "Checked" row that the
2026-10-02 entries (Hannaford, Dierbergs) introduced.

**Verification note.** The sandbox's outbound proxy refused CONNECT to albertsons.com, safeway.com, vons.com,
foodlion.com, hisshosushi.com and smoothieking.com (HTTP 403, network policy), and WebFetch could not resolve
those hosts, so no official page could be loaded directly. Every fact below was instead checked against the
official page's indexed text via domain-restricted search (official domains only: the Albertsons Companies banner
sites and albertsonscompanies.com; foodlion.com, newsroom.foodlion.com, stores.foodlion.com and the sushi
operator hisshosushi.com; smoothieking.com). No blogs, deal forums or social posts were used as sources. Before
publishing, a human should open each URL in the Sources lists once and eyeball the numbers; anything that could not
be confirmed on an official page is listed under "Could not verify" and was left out of the copy.

**Two deliberate deviations from the brief, both for accuracy:**

1. `food-lion-sushi-wednesday` is drafted with `day: null`, not `day: 3`. No Food Lion page, weekly ad, newsroom
   release or Hissho page names a Wednesday sushi price, which matches the 2026-10-02 comment already in build.mjs
   ("Chains whose sushi day could NOT be confirmed on a current official page (Food Lion, ...) deliberately have no
   page"). With `day: 3` the template would print "Today is Wednesday: this deal is on right now" on a deal we cannot
   confirm exists. The page is therefore written as an honest "is there a deal?" answer (the same pattern as the
   Whole Foods Sushi Friday entry). Flip it to `day: 3` only once an official page or an in-store check confirms it.
2. `chainSlug: "sushi-deals"` on the Food Lion entry follows the brief, but note the template renders it as
   `<a href="/sushi-deals">Food Lion deals today</a>`, which is a mislabeled link. The Hannaford and Dierbergs
   entries already omit `chainSlug` and the template handles that (`x.chainSlug ? ... : ""`), so omitting the key is
   the cleaner option if the brief's "null is not allowed" was about `null` specifically rather than a missing key.

---

## 1. albertsons-5-friday

```js
  { slug: "albertsons-5-friday", brand: "Albertsons", chainSlug: "safeway-deals", day: 5,
    title: "Albertsons $5 Friday: Which Banners Run It, $5 Sushi & Whether You Need for U (2026)",
    h1: "Albertsons $5 Friday",
    desc: "Albertsons Companies banners (Vons, Pavilions, Safeway, Tom Thumb, Randalls, Albertsons) run $5 Friday: a Friday-only list of $5 items that regularly includes a $5 Zenshi sushi pack. Which banners show it, what the free for U account does, and where the list posts.",
    answer: "On Fridays, Albertsons Companies stores that run <strong>$5 Friday</strong> sell a short list of items at $5 for that day, and sushi is the prepared-food regular: the shopping sites for Vons, Pavilions, Safeway, Tom Thumb, Randalls and Albertsons all list a <strong>Zenshi 10-piece sushi pack at $5</strong>, in store only and available after 11 a.m., and Vons lists a <strong>\"Pada Sushi Chef 5 Dollar Friday\"</strong> item outright. The list appears in each banner's weekly ad and app. <strong>for U</strong> is one free loyalty account that works at every banner, and the ad's member prices need it.",
    facts: [["Day", "Fridays, in store, while supplies last; the $5 sushi packs are available after 11 a.m."], ["Price", "$5 for the Zenshi 10-piece promo pack (Zenshi specialty rolls list at $8.99 to $9.99 on albertsons.com)"], ["What", "Select sushi (Zenshi 10-piece promo pack; at Vons also a Pada Sushi Chef $5 Friday item) plus whatever else is on that week's $5 Friday list"], ["Where", "Confirmed on the shopping sites of Vons, Pavilions, Safeway, Tom Thumb, Randalls and Albertsons; not confirmed for Jewel-Osco, ACME or Shaw's"], ["What you need", "A free for U account for the ad's member prices: no purchase is required to join, and the same account works at every Albertsons Companies banner"], ["Checked", "October 19, 2026, against the banners' own product listings, the for U FAQ and terms, and each banner's weekly ad page"]],
    faq: [["Which stores run $5 Friday?", "DailyBite found the $5 sushi promo pack listed on the shopping sites of Vons, Pavilions, Safeway, Tom Thumb, Randalls and Albertsons, and Vons names a $5 Friday sushi item directly. Jewel-Osco, ACME and Shaw's belong to the same company and the same for U program, but their sites showed no $5 Friday item when checked, so treat those as unconfirmed."],
      ["Do I need a for U account?", "For the ad's member prices, yes. for U is free, no purchase is required to join, and one account covers Albertsons, Safeway, Vons, Pavilions, Tom Thumb, Randalls, Jewel-Osco, ACME, Shaw's, Star Market, Carrs, Andronico's, Kings and Balducci's. Sign up in the app or at the register with a phone number."],
      ["Is the sushi $5 every Friday?", "The $5 promo pack is a standing item on the shopping sites, but each week's $5 Friday list is set by the division and published in the weekly ad. Check the ad or the app's deals section before you go."],
      ["Is the 8-piece chicken $5 too?", "Not confirmed. On the banners' shopping sites the hot 8-piece fried chicken lists at its regular price ($8.99 at albertsons.com). If it is on your division's $5 Friday list, the weekly ad will show it."],
      ["Where do I find the list?", "In the weekly ad on each banner's site and in its app, both updated every week. The $5 sushi is sold in store only, after 11 a.m., and is not available for delivery."]],
    more: `<p>$5 Friday is the same event across the Albertsons Companies banners, which is why the <a href="/safeway-5-friday-sushi" style="color:var(--accent2)">Safeway $5 Friday page</a> and this one describe one program under different store names. The sushi counters are run by Zenshi (and at some Vons stores by Pada), which is why the $5 pack is a dedicated promo item rather than a markdown on a regular roll. For the other chains' sushi days, see the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>; today's verified Safeway and Albertsons listings are on the <a href="/safeway-deals" style="color:var(--accent2)">Safeway page</a>.</p>` },
```

### Sources (all checked 2026-10-19)

| Fact | Official source |
|---|---|
| Vons lists a sushi item named "Pada Sushi Chef 5 Dollar Friday - EA" (shown out of stock when indexed) | https://www.vons.com/shop/pd/pada-sushi-chef-5-dollar-friday-ea/970071652 |
| "ZENSHI Sushi 5.00 Promo* - 10 Pc (Available After 11 AM)", $5 each, in-store only, at Vons | https://www.vons.com/shop/product-details.970070223.html |
| Same Zenshi $5 promo pack listed at Pavilions | https://www.pavilions.com/shop/product-details.970070223.html |
| Same Zenshi $5 promo pack listed at Safeway | https://www.safeway.com/shop/product-details.970070223.html |
| Same Zenshi $5 promo pack listed at Tom Thumb | https://www.tomthumb.com/shop/product-details.970070223.html |
| Same Zenshi $5 promo pack listed at Randalls | https://www.randalls.com/shop/pd/zenshi-sushi-5-00-promo-10-pc/970070223 |
| Same Zenshi promo pack listed at Albertsons (structured data showed $5.49, so the price varies by store/date) | https://www.albertsons.com/shop/pd/zenshi-sushi-5-00-promo-10-pc/970070223 |
| "Yummi Sushi Basic Roll 5.00 Dollar* - 8 Oz (Available After 11 AM)", $5, at Vons | https://www.vons.com/shop/product-details.970071083.html |
| Zenshi regular prices: Special Dragon Roll 7 oz $9.99; Seaside Combo 16 ct $8.99 (albertsons.com) | https://www.albertsons.com/shop/product-details.970070862.html and https://www.albertsons.com/shop/product-details.970070792.html |
| Hot 8-piece fried chicken at regular price $8.99 (albertsons.com), used only to say the chicken is not confirmed at $5 | https://www.albertsons.com/shop/product-details.970029151.html |
| for U is free; "No purchase is required to become a Program Member" | https://www.albertsons.com/faq/foru.html |
| for U includes "member pricing, sale pricing, store coupons and digital coupons" | https://www.albertsons.com/foru-guest.html |
| Banner list covered by the one for U program: Albertsons, Jewel-Osco, Acme, Carrs, Shaws, Star Market, Safeway, Andronico's, Vons, Pavilions, Randalls, Tom Thumb, Kings, Balducci's | https://www.albertsons.com/mobile/banner-for-u-terms-and-conditions.html |
| Safeway for U is "a free customer loyalty program offered by Albertsons Companies, Inc." | https://www.safeway.com/faq/foru.html |
| Weekly ad pages exist per banner and are "updated every week" (Albertsons, Jewel-Osco, Tom Thumb, Pavilions, Randalls, Safeway) | https://www.albertsons.com/weeklyad/ , https://www.jewelosco.com/weeklyad , https://www.tomthumb.com/weeklyad/ , https://www.pavilions.com/weeklyad/ , https://www.randalls.com/weeklyad/ , https://www.safeway.com/weeklyad/ |

### Could not verify (left out of copy)

- **A program page describing "$5 Friday" rules.** No albertsons.com, safeway.com or albertsonscompanies.com page
  describing the program itself was found via search; the Friday association rests on the Vons SKU name "5 Dollar
  Friday" and the $5 promo pack listings. The existing `safeway-5-friday-sushi` entry asserts more (lineup rotates
  weekly, posts Wednesdays, 8-piece chicken, family salad, pizza, divisions in "most of the West, Mountain states and
  Mid-Atlantic"); none of that was reproducible from an official page this session, so this draft does not repeat it.
- **Jewel-Osco, ACME and Shaw's participation.** Searches of jewelosco.com, acmemarkets.com, shaws.com and
  starmarket.com for "$5 Friday", "5 Dollar Friday" or "Friday Only" returned only store-locator and for U pages. The
  copy says "not confirmed" rather than "do not run it".
- **Whether for U is required for the $5 Friday price specifically.** Only a third-party deal post (not a permitted
  source) says the $5 Friday items are member prices. The copy says only that the ad's member prices need for U, which
  the for U page supports.
- **The 8-piece chicken as a $5 Friday item.** Only third-party posts mention it; the official sites list the chicken
  at regular price. Written as "not confirmed" in the FAQ.
- **Weekly ad posting on Wednesday.** The ad pages say "updated every week" with no day. A safeway.com "Ways to Shop"
  page showed a promo window "Wed 10/14/26 - Tues 10/20/2026", which suggests a Wednesday-to-Tuesday ad week, but it is
  one promo, not the ad calendar. Left out.
- **Regular sushi price "$8 to $10".** Supported for Zenshi specialty items ($8.99 to $9.99 on albertsons.com) but not
  for the specific rolls in the $5 pack, so the copy quotes the Zenshi list prices rather than a generic range.
- **Brand field.** `brand: "Albertsons"` means the `liveBlock` will show deals whose brand canonicalizes to Albertsons;
  if the feed files these under "Safeway", the live block will be empty on this page. Editor's call.

---

## 2. food-lion-sushi-wednesday

```js
  { slug: "food-lion-sushi-wednesday", brand: "Food Lion", chainSlug: "sushi-deals", day: null,
    title: "Food Lion Sushi Wednesday: Is There a Deal? Hissho Prices, MVP Card & States (2026)",
    h1: "Food Lion Sushi Wednesday",
    desc: "Food Lion sells Hissho Sushi in store from 11 a.m. to 7 p.m., with everyday prices from $6 for a Spicy Roll. Whether there is a chain-wide Wednesday sushi deal, what the free MVP card does, and which 10 states Food Lion serves.",
    answer: "Food Lion sells <strong>Hissho Sushi</strong> at its in-store counters, available 11 a.m. to 7 p.m., but as of October 19, 2026, DailyBite could not find a standing <strong>Wednesday sushi price</strong> on Food Lion's site, weekly ad or newsroom, or on Hissho's site. Everyday prices on foodlion.com run from <strong>$6 for a Spicy Roll</strong> and $6.99 for a Veggie Roll to $10.99 for specialty rolls, and vary by store. If your Food Lion runs a Wednesday special, it is a store-level sign at the sushi case, not a chain-wide ad deal, so check before you make the trip.",
    facts: [["Day", "No chain-wide Wednesday deal verified; any Wednesday special is store-level"], ["Price", "Everyday foodlion.com prices: Spicy Roll $6.00, Veggie Roll $6.99, California Roll $7.99, Philadelphia Roll $8.99, Spicy Salmon and Crunchy Shrimp $9.99, Tempura Shrimp and Sunset $10.99 (vary by store)"], ["What", "Hissho Sushi rolls and combos made in store, sold 11 a.m. to 7 p.m."], ["Where", "Food Lion stores with a sushi department across its 10 states: Delaware, Georgia, Kentucky, Maryland, North Carolina, Pennsylvania, South Carolina, Tennessee, Virginia and West Virginia (1,100+ stores)"], ["What you need", "Nothing for shelf prices; the free MVP card (sign up in store or online) for weekly ad and digital coupon prices, scanned at checkout"], ["Checked", "October 19, 2026, on foodlion.com product and weekly ad pages, newsroom.foodlion.com, stores.foodlion.com and hisshosushi.com"]],
    faq: [["Does Food Lion have $5 sushi on Wednesdays?", "DailyBite could not confirm one. Food Lion's site, weekly ad pages and newsroom do not mention a Wednesday sushi price, and Hissho, the company that runs the counters, does not list one for Food Lion. Hissho does promote Wednesday pricing at some other grocers it serves, which is likely where the idea comes from. If your store has a Wednesday sign, treat it as that store's deal."],
      ["Who makes Food Lion's sushi?", "Hissho Sushi, a grocery sushi company that lists Food Lion among its retail partners. The rolls are made in store and sold from 11 a.m. to 7 p.m., so an evening visit may find the case empty."],
      ["What does Food Lion sushi cost?", "On foodlion.com, the Spicy Roll is $6.00, the Veggie Roll $6.99, the California Roll $7.99 and the Philadelphia Roll $8.99; Spicy Salmon, Crunchy Shrimp, Tempura Shrimp and Sunset rolls run $9.99 to $10.99, and combos more. Prices are set per store, so your store may differ."],
      ["Do I need an MVP card?", "Not for the shelf price. The MVP card is free, you can sign up in store or online, and it unlocks the weekly ad prices and digital coupons when scanned at checkout. The weekly flyer is in the Food Lion app and can be emailed to a digital MVP account."],
      ["Which states have Food Lion?", "Ten: Delaware, Georgia, Kentucky, Maryland, North Carolina, Pennsylvania, South Carolina, Tennessee, Virginia and West Virginia, with more than 1,100 stores. Not every store has a sushi department; the store pages on foodlion.com list departments."]],
    more: `<p>Food Lion is the largest grocer in the Carolinas without a verified chain-wide sushi day, which is why it has no entry in the Wednesday section of the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>. In the same footprint, Harris Teeter prices select Zenshi rolls at $6 on Fridays and Publix runs $5 Sushi Wednesday at stores with a counter, both verified. DailyBite will add a dated Food Lion deal to the feed the day an official page or an in-store check confirms one.</p>` },
```

### Sources (all checked 2026-10-19)

| Fact | Official source |
|---|---|
| Hissho Sushi Spicy Roll Raw (Avail. 11am - 7pm), 7 oz, $6.00 | https://foodlion.com/product/hissho-sushi-spicy-roll-raw-avail.-11am-7pm-7-oz-pkg/257716 |
| Hissho Sushi Veggie Roll Cooked, 7 oz, $6.99 | https://foodlion.com/product/hissho-sushi-veggie-roll-cooked-avail.-11am-7pm-7-oz-pkg/257737 |
| Hissho Sushi California Roll Cooked, 7 oz, $7.99 | https://foodlion.com/product/hissho-sushi-california-roll-cooked-avail.-11am-7pm-7-oz-pkg/257619 |
| Hissho Sushi Philadelphia Roll Raw, 7 oz, $8.99 | https://foodlion.com/product/hissho-sushi-philadelphia-roll-raw-avail.-11am-7pm-7-oz-pkg/257685 |
| Hissho Sushi Crunchy Shrimp Roll Cooked, 7 oz, $9.99 | https://foodlion.com/product/hissho-sushi-crunchy-shrimp-roll-cooked-avail.-11am-7pm-7-oz-pkg/257641 |
| Hissho Sushi Spicy Salmon Roll Raw, 9.7 oz, $9.99 | https://foodlion.com/product/hissho-sushi-spicy-salmon-roll-raw-avail.-11am-7pm-9.7-oz-pkg/353961 |
| Hissho Sushi Tempura Shrimp Roll Cooked, 9 oz, $10.99 | https://foodlion.com/product/hissho-sushi-tempura-shrimp-roll-cooked-avail.-11am-7pm-9-oz-pkg/257733 |
| Hissho Sushi Sunset Roll Raw, 7 oz, $10.99 | https://foodlion.com/product/hissho-sushi-sunset-roll-raw-avail.-11am-7pm-7-oz-pkg/257722 |
| Combos and specialty rolls (Rainbow Roll $12.99, Nagano Special Combo $14.99, Dynamite Roll $9.99) | https://foodlion.com/pages/easy-meals?tab=lunch |
| Sushi listed as an in-store department on store pages (e.g. Colonial Heights, VA; Sunset Beach, NC) | https://stores.foodlion.com/va/colonial-heights/11-dunlop-village , https://stores.foodlion.com/nc/sunset-beach/1775-clippers-way-sw |
| MVP enrollment is free, in store or online; discounts require scanning the personal MVP card at checkout | https://newsroom.foodlion.com/news-releases/news-release-details/mvp-fall-haul-food-lion-provides-extra-savings-preparation/ |
| Weekly flyer in the app; emailed with a Digital MVP Account | https://foodlion.com/pages/mobile-app |
| Weekly specials page exists (per-store) | https://www.foodlion.com/weekly-specials/ |
| Store locator lists the 10 states (DE, GA, KY, MD, NC, PA, SC, TN, VA, WV) | https://stores.foodlion.com/ |
| "10-state footprint" (September 2026 release) | https://newsroom.foodlion.com/news-releases/news-release-details/food-lion-accelerates-growth-six-additional-new-store-openings |
| 1,100+ stores, 82,000+ associates | https://newsroom.foodlion.com/quick-facts |
| Hissho lists Food Lion among its retail partners | https://hisshosushi.com/franchise/ (and https://hisshosushi.com/retail-partners/) |
| Hissho promotes "special pricing on Wednesdays" at another grocer (Lowes Foods / Stop & Shop page), not Food Lion | https://hisshosushi.com/our-story/hla-myo-swe/ |

### Could not verify (left out of copy)

- **Any Food Lion Wednesday sushi price.** Searched foodlion.com, ad.foodlion.com, newsroom.foodlion.com,
  stores.foodlion.com and hisshosushi.com for "sushi Wednesday", "Sushi Wednesday", "sushi special", "$5", "$6".
  Nothing official names a Wednesday price at Food Lion. Hissho's own Wednesday mentions are a franchisee page about
  a Stop & Shop / Lowes Foods location (about 900 days old) and social posts, which are not permitted sources.
- **"Participating states" for a Wednesday deal.** Moot without a deal; the copy gives Food Lion's full footprint instead.
- **MVP card required for a sushi price.** No sushi price is MVP-gated on the product pages found; the copy limits the
  MVP card to weekly ad and digital coupon prices, which the newsroom supports.
- **Price consistency.** The product prices above are for whichever store foodlion.com defaulted to when indexed and
  are labeled "vary by store". The March 4-10, 2026 weekly ad found (ad.foodlion.com) did not show sushi.
- **Brief asked for `day: 3`.** Left as `day: null` for the reason in the header. If the owner confirms a Wednesday
  price in store (as was done for Harris Teeter on 2026-10-02), change `day`, rewrite `answer`, the first `facts` row
  and the first FAQ, and add the "Checked" detail.

---

## 3. smoothie-king-free-upsize-friday

```js
  { slug: "smoothie-king-free-upsize-friday", brand: "Smoothie King", chainSlug: "smoothie-king-deals", day: 5,
    title: "Smoothie King Free Upsize Friday: 32 oz for the 20 oz Price & How Healthy Rewards Works (2026)",
    h1: "Smoothie King Free Upsize Friday",
    desc: "Every Friday, Smoothie King serves a 32 oz smoothie for the price of a 20 oz. Open to all guests since May 30, 2025, no account needed. How Healthy Rewards points work (100 per $1, $2 per 2,500), and the one thing you can't do on Friday.",
    answer: "Every Friday, Smoothie King gives you a <strong>32 oz smoothie for the price of a 20 oz</strong>. Free Upsize Friday began as a Healthy Rewards perk and has been <strong>open to all guests since May 30, 2025</strong>, so no account is needed. Smoothie King still lists it among member perks, and a Healthy Rewards member's Friday order earns the usual <strong>100 Purpose Points per $1</strong>; the only catch is that a <strong>$2 Healthy Reward cannot be redeemed on a Free Upsize Friday order</strong>. Healthy Rewards is free, lives in the Smoothie King app, and converts every 2,500 points into a $2 reward.",
    facts: [["Day", "Every Friday"], ["Offer", "A 32 oz smoothie for the price of a 20 oz (Smoothie King's FAQ wording: upgrade any 20 oz smoothie to a 32 oz for free)"], ["What you need", "Nothing since May 30, 2025; a free Healthy Rewards account (Smoothie King app required) earns points on the order"], ["Points", "100 Purpose Points per $1 (125 for Champion members, who earn 35,000+ points in a year); every 2,500 points becomes a $2 Healthy Reward; points expire after six months without a purchase"], ["Fine print", "Healthy Rewards cannot be redeemed on a Free Upsize Friday order, but the order still earns points; Blender Bucks can pay for it; gift card and catering purchases earn no points"], ["Checked", "October 19, 2026, on smoothieking.com (newsroom release of May 20, 2025, the rewards page, the Healthy Rewards FAQ and the Rewards Terms & Conditions)"]],
    faq: [["Is Free Upsize Friday still running in 2026?", "Smoothie King's rewards page and its Rewards Terms & Conditions still list Free Upsize Friday as of October 19, 2026, and its newsroom has announced no end to it. DailyBite could not load the live FAQ page this month, so the Smoothie King app is the final word for your store."],
      ["Do I need a Healthy Rewards account?", "No. Smoothie King's May 20, 2025 announcement made the perk available to all guests starting May 30, 2025, after years as a members-only benefit. Joining is still worth it on Friday: the account is free and the 32 oz order earns 100 Purpose Points per $1."],
      ["Does it work on bowls?", "Smoothie King's FAQ describes the perk as upgrading any 20 oz smoothie to a 32 oz. Bowls are not mentioned, so expect it to apply to smoothies only."],
      ["Can I use a $2 reward on Friday?", "No. The Rewards Terms say Program Rewards may not be used on Free Upsize Fridays, though points still accrue on anything you buy that day. Save the reward for another day; Blender Bucks (the app's prepaid balance) can be used on Friday."],
      ["How do Healthy Rewards points work?", "100 Purpose Points per $1 on smoothies, bowls and food (not gift cards or catering), capped at $100 of spending a day. Every 2,500 points automatically becomes a $2 Healthy Reward, which you can use right away or bank. Points expire after six months with no purchase."],
      ["What is Champion status?", "Members who earn 35,000 or more Purpose Points in a year become Champions for the following year: 125 points per $1 instead of 100, and a free 20 oz smoothie on their birthday instead of the standard $2 birthday reward."]],
    more: `<p>At the 20 oz price, the Friday upsize is 12 extra ounces for nothing, which makes Friday the day to order a meal-replacement blend rather than a snack size. Because the perk is open to everyone, it is one of the few chain deals DailyBite lists without an app condition; the <a href="/smoothie-king-deals" style="color:var(--accent2)">Smoothie King page</a> carries it every Friday alongside any app offer that every member can claim. For a smoothie alternative on other days, Tropical Smoothie and Jamba have their own pages.</p>` },
```

### Sources (all checked 2026-10-19)

| Fact | Official source |
|---|---|
| Free Upsize Friday "available to ALL for the first time ever" starting May 30; "32oz smoothie for the price of a 20oz"; "previously only available to SK Healthy Rewards loyalty members"; "every Friday" (release dated May 20, 2025) | https://www.smoothieking.com/news/smoothie-king-unveils-new-hydration-category/ |
| Healthy Rewards perks list includes "Sign Up Bonus", "Free Upsize Friday's", "Exclusive birthday deal"; tier table (under 35,000 points: 100 pts/$1 and $2 birthday bonus; 35,000+: 125 pts/$1 and free 20 oz birthday smoothie) | https://www.smoothieking.com/rewards/ |
| FAQ: members "can upgrade any 20 oz smoothie to a 32 oz smoothie for free every Friday"; 100 Purpose Points per $1, Champions 125; 35,000 points in a year for Champion status; every 2,500 Purpose Points unlocks a $2 Healthy Reward; rewards can be used right away or saved in Banked Rewards; points expire after six months of inactivity; Blender Bucks can be used with Free Upsize Friday; Blender Bucks auto-reload adds $25 when the balance falls below $10 | https://www.smoothieking.com/healthy-rewards/healthy-rewards-faqs |
| Healthy Rewards membership is free; the Smoothie King app is required to create an account; members receive "a reward just for joining" | https://www.smoothieking.com/faqs/ |
| Terms: 100 Program Points per $1, capped at $100.00 per day; 2,500 points convert to a $2 Program Reward; "Program Rewards may not be used on $1 Up Fridays/(Free Upsize Fridays), though Program Points will accrue on any purchases made on $1 Up Fridays"; points under 2,500 expire after 180 days without a transaction; Champion birthday reward is one free 20 oz smoothie up to $7.75, valid 7 days | https://www.smoothieking.com/rewards/rewards-terms-conditions/ |
| Eligible purchases: smoothies, bowls and food; gift cards and catering excluded | https://www.smoothieking.com/healthy-rewards/healthy-rewards-faqs |
| Most recent newsroom items (June 17, 2026 National Smoothie Day; late September 2026 National Coffee Day) do not mention any change to Free Upsize Friday | https://www.smoothieking.com/news/ |

### Could not verify (left out of copy)

- **A 2026-dated official statement that Free Upsize Friday is still running.** The rewards page and Terms list it
  currently and nothing in the newsroom ends it, but no 2026 release names it. The FAQ phrases it as "still listed,
  app is the final word" rather than asserting it outright.
- **Press-release date.** The search index reports the hydration release as dated May 20, 2025 but also as "142 days
  old" (which would be late May 2026). The title, the Hydration-category launch and trade coverage match May 2025, and
  the copy uses "since May 30, 2025". A human should confirm the dateline on the page.
- **The sign-up bonus amount.** The rewards page says "Sign Up Bonus" and the FAQ says "a reward just for joining",
  with no amount found. Mentioned only as "free to join" in the copy.
- **Whether the upsize applies to online/app orders, delivery or bowls, and whether franchisees can opt out.** No
  official wording found. The bowls FAQ answer sticks to the FAQ's "any 20 oz smoothie" phrasing.
- **"$1 Up Friday".** The Terms use "$1 Up Fridays/(Free Upsize Fridays)" interchangeably; no official page explains
  whether an older $1 upsize version still exists anywhere. Left out.
- **Points-expiry wording.** FAQ says "six months of inactivity"; Terms say 180 days without a transaction. The copy
  uses "six months", the FAQ's phrasing.
