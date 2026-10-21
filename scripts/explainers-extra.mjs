// scripts/explainers-extra.mjs
// Rewards-program explainers (marketing pass, 2026-10-19). Drafted and fact-checked against official
// pages only (see marketing/drafts/explainers-rewards.md for the per-fact source table and the list of
// claims left out because they could not be confirmed). Same object shape as EXPLAINERS in build.mjs;
// each page ends with its official-source links so readers can check the numbers themselves.

export const EXTRA_EXPLAINERS = [
  { slug: "cava-rewards", brand: "CAVA", chainSlug: "cava-deals", day: null,
    title: "CAVA Rewards: Points, Tiers and What a Free Bowl Costs (2026)",
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
    more: `<p>CAVA relaunched its loyalty program with the Sea, Sand and Sun tiers on October 6, 2025. The 2,100-point bowl is the headline redemption, but the 500-point tier (a drink, pita chips, avocado or a side pita) is the fastest way to turn points into food. CAVA also runs point-multiplier events for Sand (3x) and Sun (4x) members. For today's verified CAVA offers and app promos, see the <a href="/cava-deals" style="color:var(--accent2)">CAVA page</a>.</p><p class="tag" style="font-size:12px">Official sources checked (2026-10-19): <a href="https://cava.com/rewards" target="_blank" rel="noopener" style="color:var(--accent2)">cava.com/rewards</a> &middot; <a href="https://investor.cava.com/news/news-details/2025/CAVA-Brings-Status-Matching-to-the-Table-as-an-Industry-First--Because-Mediterranean-Means-More-Rewards-for-CAVA-Loyalty-Members/default.aspx" target="_blank" rel="noopener" style="color:var(--accent2)">investor.cava.com/news</a> &middot; <a href="https://support.cava.com/en_us/will-my-catering-order-apply-to-my-cava-rewards-SkHe_bs1A" target="_blank" rel="noopener" style="color:var(--accent2)">support.cava.com/en_us</a> &middot; <a href="https://support.cava.com/en_us/missing-points-on-an-order-HJ1iJfm8C" target="_blank" rel="noopener" style="color:var(--accent2)">support.cava.com/en_us</a> &middot; <a href="https://support.cava.com/en_us/can-i-earn-cava-rewards-points-on-third-party-delivery-orders-doordash-uber-eats-etc-B1XmMpPg" target="_blank" rel="noopener" style="color:var(--accent2)">support.cava.com/en_us</a> &middot; <a href="https://shop.cava.com/pages/frequently-asked-questions" target="_blank" rel="noopener" style="color:var(--accent2)">shop.cava.com/pages</a> &middot; <a href="https://support.cava.com/en_us/when-do-my-cava-rewards-points-expire-HymFqvaPZe" target="_blank" rel="noopener" style="color:var(--accent2)">support.cava.com/en_us</a> &middot; <a href="https://support.cava.com/en_us/i-redeemed-the-wrong-item-in-cava-rewards-can-i-get-my-points-back-BkJFjCoPl" target="_blank" rel="noopener" style="color:var(--accent2)">support.cava.com/en_us</a>.</p>` },
  { slug: "sweetgreen-rewards", brand: "Sweetgreen", chainSlug: "sweetgreen-deals", day: null,
    title: "Sweetgreen Rewards: How SG Rewards Works After Sweetpass (2026)",
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
    more: `<p>SG Rewards is a simpler program than the Sweetpass it replaced: no fee, one earning rate, one reward per order. The main thing to remember is where you order. Points only post for orders placed in sweetgreen's app or website or scanned in store, so a sweetgreen bowl bought through a third-party app earns nothing. For today's verified sweetgreen offers and app promos, see the <a href="/sweetgreen-deals" style="color:var(--accent2)">sweetgreen page</a>.</p><p class="tag" style="font-size:12px">Official sources checked (2026-10-19): <a href="https://www.sweetgreen.com/sg-rewards-faq" target="_blank" rel="noopener" style="color:var(--accent2)">sweetgreen.com/sg-rewards-faq</a> &middot; <a href="https://www.sweetgreen.com/sg-rewards-program-agreement-1" target="_blank" rel="noopener" style="color:var(--accent2)">sweetgreen.com/sg-rewards-program-agreement-1</a> &middot; <a href="https://www.sweetgreen.com/sweetpass-subscription-faqs" target="_blank" rel="noopener" style="color:var(--accent2)">sweetgreen.com/sweetpass-subscription-faqs</a> &middot; <a href="https://www.sweetgreen.com/privacy-policy" target="_blank" rel="noopener" style="color:var(--accent2)">sweetgreen.com/privacy-policy</a> &middot; <a href="https://www.sweetgreen.com/sweet-rewards/" target="_blank" rel="noopener" style="color:var(--accent2)">sweetgreen.com/sweet-rewards</a> &middot; <a href="https://www.sweetgreen.com/goat-status-program-terms" target="_blank" rel="noopener" style="color:var(--accent2)">sweetgreen.com/goat-status-program-terms</a>.</p>` },
  { slug: "tropical-smoothie-rewards", brand: "Tropical Smoothie", chainSlug: "tropical-smoothie-deals", day: null,
    title: "Tropic Rewards: Points per Dollar and the Free Smoothie (2026)",
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
    more: `<p>Tropic Rewards is a single-tier points program: every member earns at the same rate and the official rewards page lists no status levels. The 150- to 400-point rewards are the practical ones for a regular, since a topping or a $2 credit lands after one or two visits. For today's verified Tropical Smoothie Cafe offers and app promos, see the <a href="/tropical-smoothie-deals" style="color:var(--accent2)">Tropical Smoothie page</a>.</p><p class="tag" style="font-size:12px">Official sources checked (2026-10-19): <a href="https://www.tropicalsmoothiecafe.com/tropic-rewards-terms-and-conditions" target="_blank" rel="noopener" style="color:var(--accent2)">tropicalsmoothiecafe.com/tropic-rewards-terms-and-conditions</a> &middot; <a href="https://www.tropicalsmoothiecafe.com/rewards" target="_blank" rel="noopener" style="color:var(--accent2)">tropicalsmoothiecafe.com/rewards</a> &middot; <a href="https://www.tropicalsmoothiecafe.com/app-faq" target="_blank" rel="noopener" style="color:var(--accent2)">tropicalsmoothiecafe.com/app-faq</a>.</p>` },
  { slug: "holiday-gift-card-bonuses", brand: "Chipotle", chainSlug: "chipotle-deals", day: null,
    title: "Holiday Gift Card Bonuses at Healthy Chains (2026)",
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
    more: `<p>Gift card bonuses are the one holiday deal that needs no coupon, app or membership: buy the card, get the bonus. The catch is timing. Chipotle's 2025 offer ran only November 24 to 28 and was limited to the first 20,000 purchases; Panera's and Qdoba's ran all of November and December but the bonus cards were only usable in January and February. If you want the bonus for yourself, buy early in the window and set a reminder for the redemption month. For today's verified Chipotle offers see the <a href="/chipotle-deals" style="color:var(--accent2)">Chipotle page</a>; for Panera's everyday value menu see <a href="/panera-4-99-mix-and-match" style="color:var(--accent2)">Panera's $4.99 Mix &amp; Match</a>; and for every announced Thanksgiving-week offer see <a href="/black-friday-cyber-monday-food-deals" style="color:var(--accent2)">Black Friday &amp; Cyber Monday food deals</a>.</p><p class="tag" style="font-size:12px">Official sources checked (2026-10-19): <a href="https://www.chipotle.com/holiday-gift-cards" target="_blank" rel="noopener" style="color:var(--accent2)">chipotle.com</a> &middot; <a href="https://www.panerabread.com/en-us/gift-cards.html" target="_blank" rel="noopener" style="color:var(--accent2)">panerabread.com</a> &middot; <a href="https://www.qdoba.com/bonuscard" target="_blank" rel="noopener" style="color:var(--accent2)">qdoba.com</a> &middot; <a href="https://www.prnewswire.com/news-releases/noodles--company-serves-up-a-delicious-alternative-as-pizza-fatigue-hits-this-holiday-season-302601568.html" target="_blank" rel="noopener" style="color:var(--accent2)">prnewswire.com</a> &middot; <a href="https://www.subway.com/en-us/subwaycard" target="_blank" rel="noopener" style="color:var(--accent2)">subway.com</a> &middot; <a href="https://www.jamba.com/gift-cards/terms" target="_blank" rel="noopener" style="color:var(--accent2)">jamba.com</a> &middot; <a href="https://cava.com/giftcard-terms" target="_blank" rel="noopener" style="color:var(--accent2)">cava.com</a> &middot; <a href="https://www.sweetgreen.com/sweetgreen-faq" target="_blank" rel="noopener" style="color:var(--accent2)">sweetgreen.com</a> &middot; <a href="https://www.potbelly.com/gift-cards" target="_blank" rel="noopener" style="color:var(--accent2)">potbelly.com</a> &middot; <a href="https://www.smoothieking.com/gift-cards/" target="_blank" rel="noopener" style="color:var(--accent2)">smoothieking.com</a> &middot; <a href="https://www.tropicalsmoothiecafe.com/rewards" target="_blank" rel="noopener" style="color:var(--accent2)">tropicalsmoothiecafe.com</a>.</p>` },
  { slug: "albertsons-5-friday", brand: "Albertsons", chainSlug: "safeway-deals", day: 5,
    title: "Albertsons $5 Friday: Vons, Tom Thumb, Randalls Sushi (2026)",
    h1: "Albertsons $5 Friday",
    desc: "Albertsons Companies banners (Vons, Pavilions, Safeway, Tom Thumb, Randalls, Albertsons) run $5 Friday: a Friday-only list of $5 items that regularly includes a $5 Zenshi sushi pack. Which banners show it, what the free for U account does, and where the list posts.",
    answer: "On Fridays, Albertsons Companies stores that run <strong>$5 Friday</strong> sell a short list of items at $5 for that day, and sushi is the prepared-food regular: the shopping sites for Vons, Pavilions, Safeway, Tom Thumb, Randalls and Albertsons all list a <strong>Zenshi 10-piece sushi pack at $5</strong>, in store only and available after 11 a.m., and Vons lists a <strong>\"Pada Sushi Chef 5 Dollar Friday\"</strong> item outright. The list appears in each banner's weekly ad and app. <strong>for U</strong> is one free loyalty account that works at every banner, and the ad's member prices need it.",
    facts: [["Day", "Fridays, in store, while supplies last; the $5 sushi packs are available after 11 a.m."], ["Price", "$5 for the Zenshi 10-piece promo pack (Zenshi specialty rolls list at $8.99 to $9.99 on albertsons.com)"], ["What", "Select sushi (Zenshi 10-piece promo pack; at Vons also a Pada Sushi Chef $5 Friday item) plus whatever else is on that week's $5 Friday list"], ["Where", "Confirmed on the shopping sites of Vons, Pavilions, Safeway, Tom Thumb, Randalls and Albertsons; not confirmed for Jewel-Osco, ACME or Shaw's"], ["What you need", "A free for U account for the ad's member prices: no purchase is required to join, and the same account works at every Albertsons Companies banner"], ["Checked", "October 19, 2026, against the banners' own product listings, the for U FAQ and terms, and each banner's weekly ad page"]],
    faq: [["Which stores run $5 Friday?", "DailyBite found the $5 sushi promo pack listed on the shopping sites of Vons, Pavilions, Safeway, Tom Thumb, Randalls and Albertsons, and Vons names a $5 Friday sushi item directly. Jewel-Osco, ACME and Shaw's belong to the same company and the same for U program, but their sites showed no $5 Friday item when checked, so treat those as unconfirmed."],
      ["Do I need a for U account?", "For the ad's member prices, yes. for U is free, no purchase is required to join, and one account covers Albertsons, Safeway, Vons, Pavilions, Tom Thumb, Randalls, Jewel-Osco, ACME, Shaw's, Star Market, Carrs, Andronico's, Kings and Balducci's. Sign up in the app or at the register with a phone number."],
      ["Is the sushi $5 every Friday?", "The $5 promo pack is a standing item on the shopping sites, but each week's $5 Friday list is set by the division and published in the weekly ad. Check the ad or the app's deals section before you go."],
      ["Is the 8-piece chicken $5 too?", "Not confirmed. On the banners' shopping sites the hot 8-piece fried chicken lists at its regular price ($8.99 at albertsons.com). If it is on your division's $5 Friday list, the weekly ad will show it."],
      ["Where do I find the list?", "In the weekly ad on each banner's site and in its app, both updated every week. The $5 sushi is sold in store only, after 11 a.m., and is not available for delivery."]],
    more: `<p>$5 Friday is the same event across the Albertsons Companies banners, which is why the <a href="/safeway-5-friday-sushi" style="color:var(--accent2)">Safeway $5 Friday page</a> and this one describe one program under different store names. The sushi counters are run by Zenshi (and at some Vons stores by Pada), which is why the $5 pack is a dedicated promo item rather than a markdown on a regular roll. For the other chains' sushi days, see the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>; today's verified Safeway and Albertsons listings are on the <a href="/safeway-deals" style="color:var(--accent2)">Safeway page</a>.</p><p class="tag" style="font-size:12px">Official sources checked (2026-10-19): <a href="https://www.vons.com/shop/pd/pada-sushi-chef-5-dollar-friday-ea/970071652" target="_blank" rel="noopener" style="color:var(--accent2)">vons.com</a> &middot; <a href="https://www.vons.com/shop/product-details.970070223.html" target="_blank" rel="noopener" style="color:var(--accent2)">vons.com</a> &middot; <a href="https://www.pavilions.com/shop/product-details.970070223.html" target="_blank" rel="noopener" style="color:var(--accent2)">pavilions.com</a> &middot; <a href="https://www.safeway.com/shop/product-details.970070223.html" target="_blank" rel="noopener" style="color:var(--accent2)">safeway.com</a> &middot; <a href="https://www.tomthumb.com/shop/product-details.970070223.html" target="_blank" rel="noopener" style="color:var(--accent2)">tomthumb.com</a> &middot; <a href="https://www.randalls.com/shop/pd/zenshi-sushi-5-00-promo-10-pc/970070223" target="_blank" rel="noopener" style="color:var(--accent2)">randalls.com</a> &middot; <a href="https://www.albertsons.com/shop/pd/zenshi-sushi-5-00-promo-10-pc/970070223" target="_blank" rel="noopener" style="color:var(--accent2)">albertsons.com</a> &middot; <a href="https://www.vons.com/shop/product-details.970071083.html" target="_blank" rel="noopener" style="color:var(--accent2)">vons.com</a>.</p>` },
  { slug: "food-lion-sushi-wednesday", brand: "Food Lion", chainSlug: null, day: null,
    title: "Food Lion Sushi Wednesday: Is There a Deal? (2026)",
    h1: "Food Lion Sushi Wednesday",
    desc: "Food Lion sells Hissho Sushi in store from 11 a.m. to 7 p.m., with everyday prices from $6 for a Spicy Roll. Whether there is a chain-wide Wednesday sushi deal, what the free MVP card does, and which 10 states Food Lion serves.",
    answer: "Food Lion sells <strong>Hissho Sushi</strong> at its in-store counters, available 11 a.m. to 7 p.m., but as of October 19, 2026, DailyBite could not find a standing <strong>Wednesday sushi price</strong> on Food Lion's site, weekly ad or newsroom, or on Hissho's site. Everyday prices on foodlion.com run from <strong>$6 for a Spicy Roll</strong> and $6.99 for a Veggie Roll to $10.99 for specialty rolls, and vary by store. If your Food Lion runs a Wednesday special, it is a store-level sign at the sushi case, not a chain-wide ad deal, so check before you make the trip.",
    facts: [["Day", "No chain-wide Wednesday deal verified; any Wednesday special is store-level"], ["Price", "Everyday foodlion.com prices: Spicy Roll $6.00, Veggie Roll $6.99, California Roll $7.99, Philadelphia Roll $8.99, Spicy Salmon and Crunchy Shrimp $9.99, Tempura Shrimp and Sunset $10.99 (vary by store)"], ["What", "Hissho Sushi rolls and combos made in store, sold 11 a.m. to 7 p.m."], ["Where", "Food Lion stores with a sushi department across its 10 states: Delaware, Georgia, Kentucky, Maryland, North Carolina, Pennsylvania, South Carolina, Tennessee, Virginia and West Virginia (1,100+ stores)"], ["What you need", "Nothing for shelf prices; the free MVP card (sign up in store or online) for weekly ad and digital coupon prices, scanned at checkout"], ["Checked", "October 19, 2026, on foodlion.com product and weekly ad pages, newsroom.foodlion.com, stores.foodlion.com and hisshosushi.com"]],
    faq: [["Does Food Lion have $5 sushi on Wednesdays?", "DailyBite could not confirm one. Food Lion's site, weekly ad pages and newsroom do not mention a Wednesday sushi price, and Hissho, the company that runs the counters, does not list one for Food Lion. Hissho does promote Wednesday pricing at some other grocers it serves, which is likely where the idea comes from. If your store has a Wednesday sign, treat it as that store's deal."],
      ["Who makes Food Lion's sushi?", "Hissho Sushi, a grocery sushi company that lists Food Lion among its retail partners. The rolls are made in store and sold from 11 a.m. to 7 p.m., so an evening visit may find the case empty."],
      ["What does Food Lion sushi cost?", "On foodlion.com, the Spicy Roll is $6.00, the Veggie Roll $6.99, the California Roll $7.99 and the Philadelphia Roll $8.99; Spicy Salmon, Crunchy Shrimp, Tempura Shrimp and Sunset rolls run $9.99 to $10.99, and combos more. Prices are set per store, so your store may differ."],
      ["Do I need an MVP card?", "Not for the shelf price. The MVP card is free, you can sign up in store or online, and it unlocks the weekly ad prices and digital coupons when scanned at checkout. The weekly flyer is in the Food Lion app and can be emailed to a digital MVP account."],
      ["Which states have Food Lion?", "Ten: Delaware, Georgia, Kentucky, Maryland, North Carolina, Pennsylvania, South Carolina, Tennessee, Virginia and West Virginia, with more than 1,100 stores. Not every store has a sushi department; the store pages on foodlion.com list departments."]],
    more: `<p>Food Lion is the largest grocer in the Carolinas without a verified chain-wide sushi day, which is why it has no entry in the Wednesday section of the <a href="/sushi-deals" style="color:var(--accent2)">grocery sushi guide</a>. In the same footprint, Harris Teeter prices select Zenshi rolls at $6 on Fridays and Publix runs $5 Sushi Wednesday at stores with a counter, both verified. DailyBite will add a dated Food Lion deal to the feed the day an official page or an in-store check confirms one.</p><p class="tag" style="font-size:12px">Official sources checked (2026-10-19): <a href="https://foodlion.com/product/hissho-sushi-spicy-roll-raw-avail.-11am-7pm-7-oz-pkg/257716" target="_blank" rel="noopener" style="color:var(--accent2)">foodlion.com</a> &middot; <a href="https://foodlion.com/product/hissho-sushi-veggie-roll-cooked-avail.-11am-7pm-7-oz-pkg/257737" target="_blank" rel="noopener" style="color:var(--accent2)">foodlion.com</a> &middot; <a href="https://foodlion.com/product/hissho-sushi-california-roll-cooked-avail.-11am-7pm-7-oz-pkg/257619" target="_blank" rel="noopener" style="color:var(--accent2)">foodlion.com</a> &middot; <a href="https://foodlion.com/product/hissho-sushi-philadelphia-roll-raw-avail.-11am-7pm-7-oz-pkg/257685" target="_blank" rel="noopener" style="color:var(--accent2)">foodlion.com</a> &middot; <a href="https://foodlion.com/product/hissho-sushi-crunchy-shrimp-roll-cooked-avail.-11am-7pm-7-oz-pkg/257641" target="_blank" rel="noopener" style="color:var(--accent2)">foodlion.com</a> &middot; <a href="https://foodlion.com/product/hissho-sushi-spicy-salmon-roll-raw-avail.-11am-7pm-9.7-oz-pkg/353961" target="_blank" rel="noopener" style="color:var(--accent2)">foodlion.com</a> &middot; <a href="https://foodlion.com/product/hissho-sushi-tempura-shrimp-roll-cooked-avail.-11am-7pm-9-oz-pkg/257733" target="_blank" rel="noopener" style="color:var(--accent2)">foodlion.com</a> &middot; <a href="https://foodlion.com/product/hissho-sushi-sunset-roll-raw-avail.-11am-7pm-7-oz-pkg/257722" target="_blank" rel="noopener" style="color:var(--accent2)">foodlion.com</a>.</p>` },
  {
    "slug": "starbucks-rewards",
    "brand": "Starbucks",
    "chainSlug": "starbucks-deals",
    "day": null,
    "title": "Starbucks Rewards: Stars per Dollar and Redemptions (2026)",
    "h1": "Starbucks Rewards, Explained",
    "desc": "Since March 10, 2026, Starbucks Rewards pays Stars by status, not payment method: Green 1 Star per $1, Gold 1.2, Reserve 1.7. What 25, 60, 100, 200, 300 and 400 Stars buy, when Green Stars expire, how the birthday reward works, and how to earn at the counter.",
    "answer": "Starbucks Rewards is Starbucks' free loyalty program, reworked on <strong>March 10, 2026</strong>. Earning now depends on your status level, not how you pay: <strong>Green</strong> members earn <strong>1 Star per $1</strong>, <strong>Gold</strong> (500 Stars in 12 months) earns 1.2 and <strong>Reserve</strong> (2,500 Stars) earns 1.7, whether you pay with a Starbucks Card, cash, credit or debit. Stars are spent in fixed tiers: 25 for a drink customization, 60 for $2 off, <strong>100 for brewed coffee, tea, a bakery item or a packaged snack</strong>, <strong>200 for a handcrafted drink or hot breakfast item</strong>, 300 for a packaged sandwich, salad or protein box, and 400 for select merchandise. Green Stars expire six months after the month they were earned; Gold and Reserve Stars do not expire while you keep status. Members get one free birthday treat a year if they joined at least 7 days before their birthday and made a Star-earning purchase that year.",
    "facts": [
      [
        "Earning rate",
        "Green: 1 Star per $1. Gold: 1.2. Reserve: 1.7. Status, not payment method, sets the rate (since March 10, 2026); no Stars on Starbucks Card purchases or reloads, alcohol, tax or tips"
      ],
      [
        "Status levels",
        "Green (0 to 499 Stars), Gold (500 Stars in a 12-month period), Reserve (2,500 Stars in 12 months). To keep Gold or Reserve you must earn 500 or 2,500 new Stars in the following 12 months, or you drop a level and your level balance resets to zero"
      ],
      [
        "Redemption tiers",
        "25: a drink customization such as an espresso shot or syrup (not a standalone drink). 60: $2 off a qualifying item. 100: hot or iced brewed coffee or tea, bakery item or packaged snack, up to $6. 200: handcrafted beverage or hot breakfast item, up to $10. 300: packaged sandwich, salad, protein box or packaged coffee, up to $16. 400: select merchandise or packaged Starbucks Reserve coffee, up to $20 (all pre-tax)"
      ],
      [
        "Bonus Stars for reloads",
        "A digital reload of $30 or more to a Starbucks Card (app or web, auto-reload included) earns 10 Bonus Stars; $50 or more earns 25, the maximum per reload"
      ],
      [
        "How to earn in store",
        "Scan the member barcode in the Starbucks app at the register and pay any way you like (cash, credit or debit, mobile wallet or Starbucks Card), or order ahead in the app"
      ],
      [
        "Expiry",
        "Green Stars expire 6 months after the calendar month they were earned; a purchase, a redemption or a $30+ digital reload in the month before expiry pushes all expiring Stars back one month. Gold and Reserve Stars do not expire while you keep status. Oldest Stars are redeemed first"
      ],
      [
        "Birthday",
        "One free birthday treat a year if you joined at least 7 days before your birthday, have the date on file and made a Star-earning purchase earlier that year. Green: redeem on the birthday only. Gold: 7 days. Reserve: 30 days"
      ],
      [
        "Verified",
        "Checked by DailyBite against starbucks.com/rewards, the Starbucks Rewards Terms of Use and the Starbucks newsroom FAQ and March 2026 releases"
      ]
    ],
    "faq": [
      [
        "Do I earn more Stars when I pay with a Starbucks Card?",
        "Not anymore. Before March 10, 2026, paying with a preloaded Starbucks Card or the app earned 2 Stars per $1 and other payment methods 1 Star. Starbucks' FAQ now says your status level, not your method of payment, sets the rate: 1 Star per $1 at Green, 1.2 at Gold and 1.7 at Reserve. Loading the card still earns a one-time bonus of 10 Bonus Stars for a digital reload of $30 or more, or 25 for $50 or more."
      ],
      [
        "How many Stars for a free drink?",
        "200 Stars for a handcrafted beverage up to $10 pre-tax, the same tier as a hot breakfast item. Brewed coffee or tea costs 100 Stars. At the Green rate of 1 Star per $1, 200 Stars is about $200 of pre-tax spending before bonus events; at Reserve (1.7 Stars per $1) it is about $118. Starbucks notes that some stores offer only the 200-Star tier."
      ],
      [
        "When do Stars expire?",
        "At Green, 6 months after the calendar month they were earned. Make a qualifying purchase, redeem a reward or digitally reload $30 or more in the month before they expire and Starbucks extends every expiring Star by one month. Gold and Reserve Stars do not expire as long as you maintain that status."
      ],
      [
        "How do I reach Gold or Reserve?",
        "Gold takes 500 Stars in a 12-month period; Reserve takes 2,500. You then have 12 months to earn the same number of new Stars to keep the level. Fall short and you move down (to Gold if you earned 500 to 2,499, to Green if under 500) and your level balance resets to zero. Gold earns 1.2 Stars per $1 and at least four extra Double Star Days a year; Reserve earns 1.7 and at least six."
      ],
      [
        "Is there a birthday reward?",
        "Yes, one free birthday treat per year. You must have joined at least 7 days before your birthday, have your birthday in your account and have made at least one Star-earning transaction earlier in the year. Green members redeem on the birthday itself; Gold members have 7 days and Reserve members 30 days, starting on the birthday."
      ],
      [
        "How do I earn Stars when I order at the counter?",
        "Scan the barcode in the Starbucks app before you pay; you earn at your status rate however you pay. Mobile orders earn automatically. Stars are not earned on tax, tips, alcohol, gift card purchases or Starbucks Card reloads, and Starbucks' pages describe no way to add a receipt after the fact."
      ],
      [
        "What is Free Mod Mondays?",
        "A perk added in the March 2026 refresh: on one Monday a month that Starbucks designates, members get one free beverage customization worth up to $2 pre-tax, selected as a coupon at checkout or mentioned to the barista. It cannot be combined with other Rewards or offers."
      ]
    ],
    "more": "<p>The March 2026 refresh dropped the old 50- and 150-Star tiers, added a 60-Star $2-off option and tied earning to status instead of payment method, so preloading a Starbucks Card no longer doubles your Stars. Starting levels in March 2026 were set from 2025 activity; after that, levels run on a rolling 12-month window. The 100-Star tier (brewed coffee, tea, a bakery item or a packaged snack) is the fastest way to turn Stars into something, and Double Star Days are the fastest way to earn them. For today's verified Starbucks offers and app promos, see the <a href=\"/starbucks-deals\" style=\"color:var(--accent2)\">Starbucks page</a>.</p><p class=\"tag\" style=\"font-size:12px\">Official sources checked (2026-10-20): <a href=\"https://www.starbucks.com/rewards\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">starbucks.com/rewards</a> &middot; <a href=\"https://www.starbucks.com/rewards/terms/\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">starbucks.com/rewards/terms</a> &middot; <a href=\"https://about.starbucks.com/starbucks-rewards-faq/\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">about.starbucks.com/starbucks-rewards-faq</a> &middot; <a href=\"https://about.starbucks.com/press/2026/starbucks-unveils-reimagined-loyalty-program-to-deliver-more-meaningful-value-personalization-and-engagement-to-members/\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">about.starbucks.com/press/2026</a> &middot; <a href=\"https://about.starbucks.com/press/2026/reimagined-starbucks-rewards-loyalty-program-launches-with-new-member-benefits/\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">about.starbucks.com/press/2026</a> &middot; <a href=\"https://investor.starbucks.com/news/financial-releases/news-details/2026/Starbucks-Unveils-Reimagined-Loyalty-Program-to-Deliver-More-Meaningful-Value-Personalization-and-Engagement-for-Members/default.aspx\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">investor.starbucks.com/news</a>.</p>"
  },
  {
    "slug": "chick-fil-a-one-rewards",
    "brand": "Chick-fil-A",
    "chainSlug": "chick-fil-a-deals",
    "day": null,
    "title": "Chick-fil-A One: Points per Dollar, Tiers and Rewards (2026)",
    "h1": "Chick-fil-A One, Explained",
    "desc": "Chick-fil-A One is free and pays 10 points per $1 (11 at Silver, 12 at Red, 13 at Signature). Silver starts at 1,000 points in a calendar year, Red at 4,000, Signature at 10,000. What rewards cost, why points never expire but rewards do, the birthday reward at each tier, and how to claim a missed scan within 30 days.",
    "answer": "Chick-fil-A One is Chick-fil-A's free loyalty program. Every member earns <strong>10 points per $1</strong> on qualifying orders, rising to <strong>11 at Silver</strong> (1,000 points in a calendar year), <strong>12 at Red</strong> (4,000) and <strong>13 at Signature</strong> (10,000). Rewards start at 200 points for an Icedream cone; Chick-fil-A's own examples run to 400 for medium Waffle Potato Fries, 600 for 2-count Chick-n-Strips and 1,200 for 12-count Nuggets. Points come from orders in the Chick-fil-A app or on chick-fil-a.com, or from scanning your account's QR code at the counter or in the drive-thru; orders on third-party delivery apps earn nothing. <strong>Points never expire</strong>, though redeemed rewards do and tier progress resets to zero every January 1. If you forget to scan, you have 30 days to submit the receipt.",
    "facts": [
      [
        "Earning rate",
        "Member: 10 points per $1. Silver: 11. Red: 12. Signature: 13. Not earned on delivery fees, small-order fees, tips or tax"
      ],
      [
        "Tiers",
        "Member (on joining), Silver (1,000 points), Red (4,000), Signature (10,000), based on points earned in a calendar year. Status is reassessed every year: requalify by December 31 or lose it, and tier points reset to zero on January 1. Reward points are a separate balance and do not reset"
      ],
      [
        "Reward examples",
        "200: Icedream cone. 400: medium Waffle Potato Fries. 600: 2-count Chick-n-Strips. 1,200: 12-count Chick-fil-A Nuggets. The full catalog is in the Rewards tab of the app; each reward covers one of the items listed under it"
      ],
      [
        "How to earn",
        "Order in the Chick-fil-A app or at chick-fil-a.com, or scan your Chick-fil-A One QR code at the front counter or in the drive-thru. Delivery earns when it is ordered in the Chick-fil-A app, including DoorDash selected inside the app"
      ],
      [
        "What doesn't earn",
        "Orders placed on DoorDash, Uber Eats, Grubhub or other third-party apps and sites; buying a gift card (paying with a digital gift card in the app on a qualifying order does earn)"
      ],
      [
        "Forgot to scan",
        "Submit the receipt's restaurant number, date, order number and total in the app (Account, Transactions, Transaction history, Forgot to scan?) or on the Missed Transaction form, within 30 days. One transaction per submission per day, a lifetime cap per account, and approved points post within 48 hours"
      ],
      [
        "Expiry",
        "Points do not expire. Rewards do; each one shows its expiration date under My Rewards in the app"
      ],
      [
        "Birthday",
        "Member: Chocolate Chunk Cookie or Chocolate Fudge Brownie. Silver: choice from a dessert list (cookie, brownie, small Milkshake, small Frosted Lemonade, small Frosted Coffee or small Icedream). Red: a sandwich (grilled or original) or 8- or 12-count Nuggets. Signature: any entree. Issued on your birthday, valid 30 days; birthday must be on the account at least 24 hours ahead"
      ],
      [
        "Verified",
        "Checked by DailyBite against chick-fil-a.com/one and Chick-fil-A's customer-support pages"
      ]
    ],
    "faq": [
      [
        "How many points per dollar does each tier earn?",
        "10 points per $1 as a Member, 11 at Silver, 12 at Red and 13 at Signature, on the food subtotal of qualifying orders. Delivery fees, small-order fees, tips and tax do not earn. Those are the only rate differences between tiers; the rewards themselves cost the same points at every level."
      ],
      [
        "What are the tier thresholds, and how long does status last?",
        "Silver starts at 1,000 points earned in a calendar year, Red at 4,000 and Signature at 10,000. Chick-fil-A reassesses status annually: you have until December 31 to hit the threshold again, and on January 1 your points toward status reset to zero. The My Status section of the app or website shows where you stand."
      ],
      [
        "Do Chick-fil-A One points expire?",
        "No. Chick-fil-A's FAQ says points do not expire, so a 200-point reward can wait as long as you like. Rewards you have already redeemed do expire; each one shows its date under My Rewards in the app. Only your count toward tier status resets each January 1."
      ],
      [
        "How do I earn points at the counter or drive-thru?",
        "Open the Chick-fil-A app and scan your Chick-fil-A One QR code at the front counter or in the drive-thru before you pay. You do not need to pay with the app; Chick-fil-A's FAQ says points are earned on qualifying purchases whenever the account is scanned. Ordering in the app or on the website earns automatically."
      ],
      [
        "I forgot to scan. Can I still get the points?",
        "Yes, within 30 days. Sign in and submit the restaurant number, transaction date, order number and order total from the receipt, either in the app (Account, then Transactions, Transaction history and Forgot to scan?) or on Chick-fil-A's Missed Transaction form. Chick-fil-A accepts one transaction per submission per day, says it cannot credit a lost or unreadable receipt or one 30 days or older, caps approved submissions over the life of the account, and posts approved points within 48 hours."
      ],
      [
        "What is the birthday reward?",
        "It depends on your tier on your birthday. Members choose a Chocolate Chunk Cookie or Chocolate Fudge Brownie; Silver members pick from a dessert list that adds a small Milkshake, Frosted Lemonade, Frosted Coffee or Icedream; Red members get a sandwich or 8- or 12-count Nuggets; Signature members get any entree. The reward lands on your birthday (the Saturday before if your birthday is a Sunday), lasts 30 days, cannot be swapped, and requires your birthday to be on the account at least 24 hours in advance."
      ],
      [
        "Do DoorDash or Uber Eats orders earn points?",
        "Not if you order on their apps or sites. Chick-fil-A's FAQ says orders started on third-party platforms, DoorDash included, are not eligible for points or rewards. Delivery ordered inside the Chick-fil-A app does earn, even when the app hands the order to DoorDash."
      ]
    ],
    "more": "<p>The rule that sets Chick-fil-A One apart is that points never expire, so an occasional customer can bank 200-point rewards with no deadline; the clock is on the tier side, where the count restarts every January 1. Signature members also get the perks Chick-fil-A lists on its program page, including gifting rewards to friends and family and a free Backstage Tour at the Home Office for up to five guests. One housekeeping change: the minimum age to join rose from 13 to 18 on March 23, 2026. For today's verified Chick-fil-A offers and app promos, see the <a href=\"/chick-fil-a-deals\" style=\"color:var(--accent2)\">Chick-fil-A page</a>.</p><p class=\"tag\" style=\"font-size:12px\">Official sources checked (2026-10-20): <a href=\"https://www.chick-fil-a.com/one\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/one</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/chick-fil-a-one-membership-program/benefits-and-tiers/what-are-the-chick-fil-a-one-membership-tiers\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/chick-fil-a-one-membership-program/benefits-and-tiers/once-i-receive-status-as-a-chick-fil-a-one-silver-red-or-signature-member-how-long-does-it-last\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/chick-fil-a-one-membership-program/benefits-and-tiers/do-chick-fil-a-one-reward-points-expire-at-the-end-of-the-year\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/chick-fil-a-one-membership-program/points-and-rewards/do-chick-fil-a-one-points-expire\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/chick-fil-a-one-membership-program/points-and-rewards/how-do-i-receive-points-towards-rewards-of-my-choice\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/chick-fil-a-one-membership-program/points-and-rewards/can-i-receive-points-in-the-drive-thru\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/chick-fil-a-one-membership-program/points-and-rewards/can-i-receive-chick-fil-a-one-points-by-placing-an-order-through-a-third-party-delivery-platform\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/ordering-and-payment/missed-transactions/can-i-receive-points-for-my-purchase-if-i-forgot-to-scan\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/chick-fil-a-one-membership-program/creating-and-managing-your-account/what-is-the-birthday-reward-for-each-membership-tier\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/chick-fil-a-one-membership-program/creating-and-managing-your-account/how-long-can-i-use-the-birthday-reward\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/chick-fil-a-one-membership-program/points-and-rewards/what-are-chick-fil-a-one-rewards-and-how-do-i-redeem-them\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a> &middot; <a href=\"https://www.chick-fil-a.com/customer-support/chick-fil-a-one-membership-program/creating-and-managing-your-account/i-received-a-notification-that-chick-fil-a-has-made-updates-to-their-terms-conditions\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chick-fil-a.com/customer-support</a>.</p>"
  },
  {
    "slug": "panera-mypanera-rewards",
    "brand": "Panera",
    "chainSlug": "panera-deals",
    "day": null,
    "title": "MyPanera Rewards: How the Points Program Works (2026)",
    "h1": "MyPanera Rewards, Explained",
    "desc": "MyPanera switched from visit-based surprise rewards to points in August 2026: 10 points per $1, a free bagel or mini bakery treat at 250 points, a full entree at 2,000. How to earn in cafe (your phone number) and online, the free birthday bakery treat, the MyPanera+ tier at $300 a year, 180-day point expiry, and what the paid Sip Club is.",
    "answer": "MyPanera is Panera's free loyalty program, and it changed in <strong>August 2026</strong>: instead of surprise rewards unlocked by counting visits, members now earn <strong>10 points per $1</strong> of food and beverage subtotal and spend them on menu items of their choice, from <strong>250 points for a bagel or mini bakery treat</strong> up to <strong>2,000 points for a full entree</strong>. In the cafe you earn by giving the cashier the phone number on your account; online, in the app or at a kiosk you earn by ordering while signed in. Every member with a birthday on file gets a <strong>free individual bakery treat</strong> for their birthday, and members who spend $300 in a calendar year reach <strong>MyPanera+</strong>, which upgrades that to a free You Pick Two. Points expire after 180 days without a purchase or redemption. The Unlimited Sip Club is a separate paid subscription for self-serve drinks and is not needed to earn or redeem points.",
    "facts": [
      [
        "Earning rate",
        "10 points per verified $1 of food or beverage subtotal, after rewards and discounts. Nothing on tax, fees, tips, gift cards, catering, orders placed on third-party sites, Panera at Home grocery products, Panera Shop purchases or Sip Club fees"
      ],
      [
        "Redeeming",
        "Points buy menu items you choose; Panera's stated range runs from 250 points for a free bagel or mini bakery treat to 2,000 points for a full entree"
      ],
      [
        "Tiers",
        "MyPanera (free), MyPanera+ ($300 or more in verified food and beverage purchases in a calendar year) and MyPanera+ Sip Club (for Unlimited Sip Club subscribers). MyPanera+ adds a free birthday You Pick Two and 2 extra points per $1 on delivery orders"
      ],
      [
        "How to earn in cafe",
        "Give the cashier the phone number linked to your MyPanera account before you pay; an order checked out without your account information earns nothing. Retroactive credit is at Panera's discretion and limited to the previous 30 days"
      ],
      [
        "How to earn online",
        "Order while signed in to your MyPanera account on panerabread.com, in the app or at an in-cafe kiosk; points post about 24 hours after the order is fulfilled"
      ],
      [
        "Expiry",
        "All points expire after 180 days without 'Active Membership', which Panera defines as a purchase linked to your account, a points redemption or a Sip Club beverage redemption. Birthday rewards expire 7 days after they load"
      ],
      [
        "Birthday",
        "MyPanera: one free individual bakery treat (bagel, cookie, muffin, scone or pastry), no purchase needed, valid 7 days, not applied automatically. MyPanera+: a free You Pick Two worth up to $18. Your birthday (month and day) must be on the account, and your tier on the day before your birthday applies"
      ],
      [
        "Sip Club",
        "Unlimited Sip Club is a paid add-on, $14.99 a month plus tax or $119.99 a year plus tax (terms effective April 15, 2026), for one self-serve beverage every two hours with free refills; the subscription fee earns no points"
      ],
      [
        "Verified",
        "Checked by DailyBite against Panera's August 2026 press release, the MyPanera terms on panerabread.com and the Unlimited Sip Club terms and FAQ"
      ]
    ],
    "faq": [
      [
        "Is MyPanera still visit-based?",
        "No. Under the old program your receipt showed how many visits were left until the next reward, and Panera chose the surprise (a free bakery item, a preview, a tasting). The program Panera announced in August 2026 is points-based: 10 points per $1, redeemed on items you pick. Panera's release says rewards earned under the old system carried over to the new one."
      ],
      [
        "How many points for a free bagel or a free entree?",
        "Panera's own range is 250 points for a free bagel or mini bakery treat and 2,000 points for a full entree. At 10 points per $1, that is about $25 of pre-tax spending for the bagel and about $200 for the entree. The point cost of every item is shown in the app and on panerabread.com when you are signed in."
      ],
      [
        "How do I get points when I order at the counter?",
        "Tell the cashier the phone number on your MyPanera account before you pay. Panera's terms say points are not earned on orders checked out without your account information, and that credit added after the fact is discretionary and limited to the prior 30 days, so it is worth doing every time. At a kiosk, sign in to your account before ordering."
      ],
      [
        "Do DoorDash orders or catering earn points?",
        "Orders placed on third-party sites and apps do not earn, and neither do catering orders, gift card purchases, Panera at Home grocery products, Panera Shop purchases or Sip Club fees. Delivery ordered on panerabread.com or in the Panera app, while signed in, does earn; MyPanera+ members get 2 extra points per $1 on those delivery orders. Panera runs a separate MyPanera Catering Rewards program for catering."
      ],
      [
        "What is the birthday reward?",
        "For every member with a birthday on file: one free individual bakery treat (a bagel, cookie, muffin, scone or pastry), no purchase required, valid for 7 days from when it loads. You must select it when ordering; it is not applied automatically. MyPanera+ and MyPanera+ Sip Club members instead get a free You Pick Two worth up to $18, also valid 7 days. The tier you hold the day before your birthday decides which one you get."
      ],
      [
        "Do MyPanera points expire?",
        "Yes, after 180 days without activity. Panera's terms define activity as a purchase linked to your account, a points redemption or a Sip Club beverage redemption; any one of those restarts the 180 days for the whole balance. Individual rewards, including the birthday reward, carry their own shorter expiration dates."
      ],
      [
        "What is the Unlimited Sip Club, and do I need it?",
        "It is Panera's paid beverage subscription, $14.99 a month plus tax or $119.99 a year, for one self-serve drink (drip coffee, iced coffee, hot or iced tea, lemonade or fountain soda) every two hours with free refills at participating cafes. It is optional: MyPanera points, rewards and the birthday treat work the same without it, and the subscription fee itself earns no points."
      ],
      [
        "Is there a sign-up offer?",
        "Panera's terms describe a one-time 500-point welcome offer for new members who make a qualifying purchase within 14 days of joining; it is a welcome offer, not an ongoing deal."
      ]
    ],
    "more": "<p>Panera's switch to points puts MyPanera in line with most chain programs and makes the math visible: at 10 points per $1, the 250-point bagel is about $25 of spending and the 2,000-point entree about $200. The phone-number habit matters more than it used to, because the terms say orders checked out without account information earn nothing and retroactive credit stops at 30 days. For today's verified Panera offers see the <a href=\"/panera-deals\" style=\"color:var(--accent2)\">Panera page</a>; for the everyday value menu see <a href=\"/panera-4-99-mix-and-match\" style=\"color:var(--accent2)\">Panera's $4.99 Mix &amp; Match</a>.</p><p class=\"tag\" style=\"font-size:12px\">Official sources checked (2026-10-20): <a href=\"https://www.panerabread.com/en-us/press/press-room/panera-unveils-all-new-points-based-mypanera-rewards-program.html\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">panerabread.com/en-us/press</a> &middot; <a href=\"https://www.panerabread.com/en-us/legal/terms-of-use.html\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">panerabread.com/en-us/legal/terms-of-use</a> &middot; <a href=\"https://www.panerabread.com/en-us/mypanera/meet-mypanera.html\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">panerabread.com/en-us/mypanera</a> &middot; <a href=\"https://www.panerabread.com/en-us/mypanera/subscription.html\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">panerabread.com/en-us/mypanera/subscription</a> &middot; <a href=\"https://www.panerabread.com/en-us/mypanera/subscription/terms-and-conditions.html\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">panerabread.com/en-us/mypanera/subscription/terms-and-conditions</a> &middot; <a href=\"https://www.panerabread.com/en-us/mypanera/subscription/faqs.html\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">panerabread.com/en-us/mypanera/subscription/faqs</a> &middot; <a href=\"https://www.panerabread.com/en-us/catering/catering-rewards-faq.html\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">panerabread.com/en-us/catering</a> &middot; <a href=\"https://www-beta.panerabread.com/en-us/mypanera/mypanera-faqs.html\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">panerabread.com (older MyPanera FAQ)</a>.</p>"
  },
  {
    "slug": "chipotle-rewards",
    "brand": "Chipotle",
    "chainSlug": "chipotle-deals",
    "day": null,
    "title": "Chipotle Rewards: Points per Dollar and Free Entree Cost (2026)",
    "h1": "Chipotle Rewards, Explained",
    "desc": "Chipotle Rewards is free and pays 10 points per $1 in the restaurant, in the app or on chipotle.com. A free entrée costs 1,625 points in the Rewards Exchange, points stay alive with one purchase a year, and the birthday reward is your pick of guac, queso, chips or a drink. What earns, what doesn't, and how Extras work.",
    "answer": "Chipotle Rewards is Chipotle's free loyalty program. Members earn <strong>10 points per $1</strong> on qualifying purchases in the restaurant, in the Chipotle app or on chipotle.com (college students verified through Chipotle U earn 12). Points are spent in the <strong>Rewards Exchange</strong>, where a <strong>free entrée costs 1,625 points</strong> and smaller items cost less: 350 for chips and salsa, 400 for a side of guac or a fountain drink. Since the April 2026 relaunch, points stay active as long as you make <strong>one qualifying purchase a year</strong>; the terms put the cutoff at 365 days of inactivity. On your birthday you pick a free guac, queso, chips or fountain drink, and <strong>Extras</strong> challenges add bonus points and badges. Points come only from purchases made while scanned or logged in to your account, and Chipotle's rewards are not valid on third-party delivery orders.",
    "facts": [
      [
        "Earning rate",
        "10 points per $1 on qualifying purchases, before tax, tip and any delivery, service or bag fees; Chipotle U members (college students verified through ID.me) earn 12 points per $1 and get 1,000 bonus points at sign-up"
      ],
      [
        "Rewards Exchange",
        "1,625 points: free entrée (Chipotle's own example is a free quesadilla). 400 points: side of guac or a fountain drink. 350 points: chips and salsa. The April 2026 refresh added lower point thresholds, a 50%-off-an-entrée reward and group Build Your Own options; current prices are in the app"
      ],
      [
        "Expiry",
        "Points expire after 365 days without a qualifying purchase, so one purchase a year keeps the whole balance alive (up from the old six-month window). A reward added to your account expires 60 days later unless its own terms say otherwise"
      ],
      [
        "Birthday reward",
        "Your choice of guac, queso, chips or a fountain drink, with 30 days to redeem it"
      ],
      [
        "Extras and badges",
        "Challenges in your app or chipotle.com profile that pay bonus points and digital badges; Chipotle made Extras always-on in April 2026 and layers seasonal versions on top, such as Summer of Extras (June 1 to August 31, 2026, opt-in, with monthly streaks ending in a free entrée or 1,625 points)"
      ],
      [
        "What earns",
        "Purchases at U.S. Chipotle restaurants when you scan your account at the register, and app or chipotle.com orders placed while logged in (guest checkout earns nothing); catering counts only when ordered logged in on Chipotle's own site or app; paying with a Chipotle gift card still earns"
      ],
      [
        "What doesn't earn",
        "Buying or reloading gift cards; tax, tips and fees; the portion of an order paid with a reward or promotional credit; anything past three qualifying purchases a day. Third-party delivery apps are not an earning channel in the terms, and Chipotle's rewards and promos are not valid on third-party delivery orders"
      ],
      [
        "Verified",
        "Checked by DailyBite against chipotle.com/rewards, the Chipotle Rewards terms and Chipotle's newsroom"
      ]
    ],
    "faq": [
      [
        "How many points for a free entrée at Chipotle?",
        "1,625 points in the Rewards Exchange. At 10 points per $1 that is about $163 of pre-tax spending, or about $135 for Chipotle U members earning 12 per $1. Chipotle's National Quesadilla Day page uses the same 1,625-point figure for a free quesadilla, and the 2026 Summer of Extras streak paid out either a free entrée or 1,625 points, which Chipotle treated as equivalent."
      ],
      [
        "Do I earn points on DoorDash or Uber Eats orders?",
        "Chipotle's terms award points for purchases at its restaurants with your account scanned, or on chipotle.com and in the Chipotle app while logged in; third-party apps are not listed as a way to earn, and every Chipotle reward and promotion DailyBite checked says it is not valid on orders placed through third-party delivery platforms. Order in the Chipotle app or on chipotle.com if you want the points."
      ],
      [
        "When do Chipotle points expire?",
        "After 365 days with no qualifying purchase. Chipotle extended the window from six months to a year in its April 2026 relaunch, so one order a year keeps every point you have. Individual rewards are different: once a reward lands in your account you have 60 days to use it, and some promotional rewards are shorter (the new-member chips and guac, for example, lasts 7 days)."
      ],
      [
        "What is the birthday reward?",
        "You choose it: a free guac, queso, chips or a fountain drink, loaded for your birthday with a 30-day window to redeem. Your birth date needs to be in your account for it to appear."
      ],
      [
        "What are Extras?",
        "Extras are challenges for rewards members, found under your profile in the app or on chipotle.com, that pay bonus points and digital badges when you complete them. Chipotle made Extras an always-on feature in April 2026 and runs seasonal programs on top; Summer of Extras 2026 ran June 1 to August 31 with monthly streaks and local leaderboards for members who opted in, capped by a choice of a free entrée or 1,625 points."
      ],
      [
        "Is there a sign-up offer?",
        "Chipotle's terms describe a one-time free chips and guac for new members, redeemable with a purchase of $5 or more within 7 days of being added to the account. Separately, Chipotle committed in April 2026 to monthly free-food drops for members (the Freepotle program), each with a $5 minimum purchase."
      ]
    ],
    "more": "<p>Chipotle relaunched the program as \"Rewards on Repeat\" on April 13, 2026: longer point life, a cheaper Rewards Exchange and monthly Freepotle drops. The practical rule is unchanged: scan or log in on every order, since guest checkouts and third-party apps leave points on the table, and watch the 60-day clock on anything you redeem. For today's verified Chipotle offers and app promos, see the <a href=\"/chipotle-deals\" style=\"color:var(--accent2)\">Chipotle page</a>.</p><p class=\"tag\" style=\"font-size:12px\">Official sources checked (2026-10-20): <a href=\"https://www.chipotle.com/rewards\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chipotle.com/rewards</a> &middot; <a href=\"https://www.chipotle.com/rewards-terms\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chipotle.com/rewards-terms</a> &middot; <a href=\"https://newsroom.chipotle.com/2026-04-13-CHIPOTLE-RELAUNCHES-REWARDS-WITH-REWARDS-ON-REPEAT,-DELIVERING-MORE-VALUE-WITHOUT-TRADE-OFFS\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">newsroom.chipotle.com</a> &middot; <a href=\"https://newsroom.chipotle.com/2026-05-28-CHIPOTLES-SUMMER-OF-EXTRAS-RETURNS,-WITH-STREAK-BASED-REWARDS-AND-LOCAL-RANKINGS-TO-GAMIFY-THE-REWARDS-EXPERIENCE\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">newsroom.chipotle.com</a> &middot; <a href=\"https://www.chipotle.com/summer-of-extras-terms\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chipotle.com/summer-of-extras-terms</a> &middot; <a href=\"https://www.chipotle.com/national-quesadilla-day\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chipotle.com/national-quesadilla-day</a> &middot; <a href=\"https://www.chipotle.com/chipotle-u-rewards\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chipotle.com/chipotle-u-rewards</a> &middot; <a href=\"https://www.chipotle.com/free-chips-guac\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">chipotle.com/free-chips-guac</a>.</p>"
  },
  {
    "slug": "subway-rewards",
    "brand": "Subway",
    "chainSlug": "subway-deals",
    "day": null,
    "title": "Subway Sub Club: Points, $2 Subway Cash, Free Footlong (2026)",
    "h1": "Subway Sub Club (formerly MVP Rewards), Explained",
    "desc": "Subway's U.S. loyalty program is now Sub Club, launched December 2025: 10 points per $1, 400 points = $2 Subway Cash, 250 points for joining and every fourth footlong free. How it differs from the Pro, Captain and All-Star tiers of MVP Rewards, what doesn't earn, and when points expire.",
    "answer": "Subway's U.S. loyalty program is <strong>Sub Club</strong>, which launched in December 2025 and has replaced MVP Rewards on subway.com. Members earn <strong>10 points per $1</strong> on eligible purchases, and <strong>400 points converts to $2 in Subway Cash</strong> to spend on a later order; new members get 250 bonus points for joining. The headline perk is that <strong>every fourth footlong is free</strong>, with the free footlong landing in your account within 24 hours. Points expire after <strong>six months with no activity</strong> on the account. Gift cards, alcohol, tax, tips, fees, catering and third-party delivery orders earn nothing. The Pro, Captain and All-Star tiers belonged to MVP Rewards (2023 to 2025); Subway's current U.S. page and terms do not list tiers.",
    "facts": [
      [
        "Program",
        "Sub Club, free; launched December 2025 and now the program on subway.com's U.S. rewards page. MVP Rewards (launched September 2023) was the previous U.S. program, and the MVP name continues in Canada"
      ],
      [
        "Earning rate",
        "10 points per $1 on eligible purchases at participating restaurants, in the app or online, after discounts and excluding tax, tips and fees; identify yourself by phone number, the QR code in the Subway app or a registered card before paying"
      ],
      [
        "Redeeming",
        "400 points = $2 in Subway Cash, redeemed in $2 increments against a future order; Subway Cash can cover up to $50 per order and works only at participating Subway restaurants"
      ],
      [
        "Free fourth footlong",
        "Every fourth footlong is free for Sub Club members; the free footlong appears in your account within 24 hours of the qualifying purchase, and Free Footlong coupons expire on the date printed on them. Not available on third-party delivery, catering or gift card purchases"
      ],
      [
        "Sign-up",
        "250 bonus points for joining, no purchase required"
      ],
      [
        "What doesn't earn",
        "Gift card purchases, alcohol, taxes, tips and fees, catering, and orders placed through third-party delivery apps"
      ],
      [
        "Expiry",
        "Points expire after six months with no activity on the account; any activity resets the clock. Points, Subway Cash and rewards are all forfeited if the account is closed"
      ],
      [
        "Former MVP tiers",
        "Pro (under $200 a year, 10 points per $1), Captain ($200 a year, 10% more points), All-Star ($400 a year, 20% more points plus free chips on Fridays with purchase), as published by Subway at the 2023 launch; not shown on Subway's current U.S. Sub Club page or terms"
      ],
      [
        "Verified",
        "Checked by DailyBite against subway.com's U.S. rewards page and Sub Club terms, Subway's newsroom and its Canadian MVP Rewards pages"
      ]
    ],
    "faq": [
      [
        "Is Subway MVP Rewards still a thing?",
        "Not in the United States. Subway's U.S. rewards page now says \"Join Sub Club\", its U.S. terms are titled Sub Club Terms of Use, and Subway's January 2026 newsroom release says Sub Club launched in December 2025. MVP Rewards, with its Pro, Captain and All-Star tiers, launched in September 2023 and is still the program name on Subway's Canadian site. Subway has not published a page explaining how existing MVP members or their status moved over, so if you held Captain or All-Star status, check your account in the app."
      ],
      [
        "How much is 400 Subway points worth?",
        "$2 in Subway Cash. At 10 points per $1, 400 points is about $40 of pre-tax spending, so Sub Club returns roughly 5% of what you spend. Points convert to Subway Cash only when you redeem them, in $2 steps, and a single order can use at most $50 of Subway Cash."
      ],
      [
        "How does the free fourth footlong work?",
        "Subway's wording is that every fourth footlong is free for Sub Club members. After the qualifying footlong purchase, a Free Footlong coupon appears in your account within 24 hours; each coupon has its own expiration date printed on it. Subway's restaurant pages say there is no limit to how many free footlongs you can earn. Footlongs bought through DoorDash, Uber Eats or other third-party apps, catering orders and gift card purchases do not count."
      ],
      [
        "Do my Subway points expire?",
        "Yes, after six months with no activity on your Sub Club account. Any activity in that window, earning or redeeming, resets the six months for your whole balance. Closing the account forfeits all points, Subway Cash and rewards."
      ],
      [
        "Is there a birthday reward in Sub Club?",
        "Subway's U.S. Sub Club page and terms, as indexed when DailyBite checked, do not describe a birthday reward. Under MVP Rewards, Subway said birthday rewards varied by tier (a free six-inch, cookie or drink). Subway's FAQ notes that your birthday month and day must be in your profile for any birthday reward to be issued, so add it; DailyBite will update this page if Subway publishes Sub Club birthday terms."
      ],
      [
        "Do I earn points when I order at the counter?",
        "Yes, if you identify yourself before you pay: give your phone number, scan the QR code in the Subway app, or swipe a registered card. Subway's terms say to do this even on orders where you are not redeeming anything, or the purchase will not earn."
      ]
    ],
    "more": "<p>Sub Club is simpler than MVP Rewards: one earning rate, one conversion (400 points to $2) and a free footlong every fourth one, with no spend tiers published. The things that trip people up are the same as under MVP: only orders placed through Subway's own app, site or counter with your account identified count, and six quiet months wipe the balance. Subway's U.S. terms page carries a November 3, 2026 effective date, so re-check it after that date. For today's verified Subway offers and app promo codes, see the <a href=\"/subway-deals\" style=\"color:var(--accent2)\">Subway page</a>.</p><p class=\"tag\" style=\"font-size:12px\">Official sources checked (2026-10-20): <a href=\"https://www.subway.com/en-us/rewards\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">subway.com/en-us/rewards</a> &middot; <a href=\"https://www.subway.com/en-us/legal/rewards\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">subway.com/en-us/legal/rewards</a> &middot; <a href=\"https://newsroom.subway.com/2026-01-07-Resolution-Ready-Subways-New-Year-Lineup-Delivers-Protein-Power-and-Bold-Flavor-at-Unbeatable-Value\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">newsroom.subway.com</a> &middot; <a href=\"https://restaurants.subway.com/united-states/pa/media/1491-n-providence-road\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">restaurants.subway.com</a> &middot; <a href=\"https://newsroom.subway.com/2023-09-07-Introducing-Subway-R-MVP-Rewards,-a-New-Loyalty-Program-with-More-Points,-More-Ways-to-Earn-and-of-Course,-More-Subs\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">newsroom.subway.com</a> &middot; <a href=\"https://newsroom.subway.com/2024-09-25-Subway-R-Celebrates-A-Year-of-MVP-Rewards-Savings-and-Unique-Guest-Perks\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">newsroom.subway.com</a> &middot; <a href=\"https://www.subway.com/en-ca/rewards\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">subway.com/en-ca/rewards</a> &middot; <a href=\"https://www.subway.com/en-us/legal/subway-card\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">subway.com/en-us/legal/subway-card</a>.</p>"
  },
  {
    "slug": "potbelly-perks",
    "brand": "Potbelly",
    "chainSlug": "potbelly-deals",
    "day": null,
    "title": "Potbelly Perks: Coins per Dollar, Tiers and Rewards (2026)",
    "h1": "Potbelly Perks, Explained",
    "desc": "Potbelly Perks pays 10 coins per $1 (11 at Pro Level, 12 at Boss Level). A cookie costs 300 coins, an Original sandwich 1,250, and coins last 365 days. How the Rookie, Pro and Boss tiers work, the birthday reward, what earns, what doesn't (third-party delivery), and what Week of Perks actually is.",
    "answer": "Potbelly Perks is Potbelly's free loyalty program, and its currency is <strong>coins</strong>. Every member starts at <strong>Rookie Level</strong> earning <strong>10 coins per $1</strong>; earning 2,000 coins in a Rewards Year moves you to <strong>Pro Level</strong> (11 coins per $1) and 5,000 to <strong>Boss Level</strong> (12 coins per $1). Rewards start at 200 coins for a pickle and 300 for a cookie or bag of chips; a <strong>skinny sandwich costs 1,000 coins</strong> and an <strong>Original sandwich or entrée salad 1,250</strong>. Coins come from orders in the Potbelly app, on potbelly.com or in the shop when you scan your app or give your account details; DoorDash, Grubhub and Uber Eats orders earn nothing. Each coin expires <strong>365 days</strong> after it is earned, and every tier gets a birthday treat, starting with a free cookie at Rookie Level.",
    "facts": [
      [
        "Earning rate",
        "Rookie Level: 10 coins per $1. Pro Level: 11. Boss Level: 12. Calculated on food and drink only, excluding gift card purchases, tax, tip, delivery and small-order fees and surcharges"
      ],
      [
        "Tiers",
        "Rookie (0 to 1,999 coins), Pro (2,000 to 4,999) and Boss (5,000 or more), based on coins earned in a Rewards Year; coins from one Rewards Year do not roll over toward the next year's tier. A new tier lasts the rest of that year and the following full calendar year"
      ],
      [
        "Reward costs",
        "200: pickle. 300: cookie or bag of chips. 400: fountain drink. 700: shake, or a cup of mac & cheese or soup. 1,000: skinny sandwich, bowl of mac & cheese or soup, or half salad. 1,250: Original sandwich or entrée salad. 1,500: Big sandwich. You need 200 coins banked before your first redemption"
      ],
      [
        "Birthday reward",
        "Terms: a cookie at Rookie Level, a cookie or shake at Pro, a cookie, shake or entrée at Boss. Potbelly's FAQ words the same tiers as a cookie or Dream Bar, a dessert, and a dessert or entrée. Your birthday must be on file at least 7 days ahead, and the reward is valid on the day itself"
      ],
      [
        "What earns",
        "Orders in the Potbelly app or on potbelly.com while logged in, and in-shop orders when you scan your app code or give your account details at checkout; up to three Perks transactions a day; coins can take 24 hours or more to post, and a missed receipt can be submitted through Potbelly's Talk To Us page"
      ],
      [
        "What doesn't earn",
        "Orders through DoorDash, Grubhub, Uber Eats and other third-party platforms (they also do not count toward tier status), gift card purchases, tax, tip and fees; rewards cannot be redeemed through third-party apps either"
      ],
      [
        "Expiry",
        "Each coin expires 365 days after it is earned, and expired coins are not reinstated; a reward you redeem is valid for 30 days"
      ],
      [
        "Verified",
        "Checked by DailyBite against potbelly.com/perks, Potbelly's Perks FAQ and the Potbelly Perks terms of use"
      ]
    ],
    "faq": [
      [
        "How many coins for a free sandwich at Potbelly?",
        "1,000 coins for a skinny sandwich, 1,250 for an Original, 1,500 for a Big. At the Rookie rate of 10 coins per $1 an Original is about $125 of pre-tax spending; at Boss Level (12 per $1) about $104. Cheaper rewards come sooner: a pickle at 200, a cookie or chips at 300, a fountain drink at 400."
      ],
      [
        "What are the Potbelly Perks tiers?",
        "Rookie, Pro and Boss. You start at Rookie; 2,000 coins earned in a Rewards Year makes you Pro, 5,000 makes you Boss. The higher tiers earn 11 and 12 coins per $1 instead of 10 and get a better birthday reward. Once reached, a tier lasts the rest of that year and all of the next, and coins from one year do not carry into the next year's tier count."
      ],
      [
        "Is there a birthday reward?",
        "Yes. Potbelly's terms list a cookie for Rookie members, a cookie or shake for Pro, and a cookie, shake or entrée for Boss; its FAQ describes the same tiers as a cookie or Dream Bar, a dessert, and a dessert or entrée. Either way, join and add your birthday at least 7 days before the day, and use the reward on your birthday, since the terms say it is valid only on that date."
      ],
      [
        "Do my coins expire?",
        "Yes, each coin lasts 365 days from the day it was earned, so a balance built over several months expires in pieces rather than all at once. Expired coins cannot be reinstated. Separately, once you redeem coins for a reward you have 30 days to use it."
      ],
      [
        "Do I earn coins on DoorDash or Grubhub orders?",
        "No. Potbelly's terms say orders placed on third-party platforms such as DoorDash, Grubhub and Uber Eats are not qualifying purchases, do not earn coins and do not count toward your tier, and rewards cannot be redeemed through those apps. Order in the Potbelly app or on potbelly.com, or scan in the shop."
      ],
      [
        "What is Potbelly's Week of Perks?",
        "The only Week of Perks on Potbelly's site when DailyBite checked was a gift card giveaway run on Instagram from September 28 to October 2, 2026 (follow @potbelly and the partner account, no purchase needed, winners drawn around October 5 and prizes sent to the winner's Perks email). It is a sweepstakes, not a standing program benefit, so treat any Week of Perks offer you see as a dated promotion and check Potbelly's terms page for that year's rules."
      ],
      [
        "Is there a sign-up offer?",
        "Potbelly's homepage describes a free Original sandwich for new members after their first order. It is a one-time welcome offer, not an ongoing deal."
      ]
    ],
    "more": "<p>Potbelly Perks is a straightforward spend-and-redeem program with three tiers that change only the earning rate and the birthday treat. The quickest value for a regular is the 300-coin cookie or chips, about three visits at Rookie Level, and the 1,000-coin skinny sandwich. Potbelly converted leftover 2023 points into coins when it moved to the coin system, and the terms allow it to change tier thresholds and reward prices, so the app's Perks tab is the final word on current costs. For today's verified Potbelly offers and app promos, see the <a href=\"/potbelly-deals\" style=\"color:var(--accent2)\">Potbelly page</a>.</p><p class=\"tag\" style=\"font-size:12px\">Official sources checked (2026-10-20): <a href=\"https://www.potbelly.com/perks\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">potbelly.com/perks</a> &middot; <a href=\"https://www.potbelly.com/faqs-potbelly-perks\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">potbelly.com/faqs-potbelly-perks</a> &middot; <a href=\"https://www.potbelly.com/terms-of-use\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">potbelly.com/terms-of-use</a> &middot; <a href=\"https://www.potbelly.com/\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">potbelly.com</a>.</p>"
  },
  {
    "slug": "qdoba-rewards",
    "brand": "Qdoba",
    "chainSlug": "qdoba-deals",
    "day": null,
    "title": "Qdoba Rewards: Free Entree at 125 Points, Gold Status (2026)",
    "h1": "QDOBA Rewards, Explained",
    "desc": "QDOBA Rewards pays 1 point per $1 and turns 125 points into a free entrée automatically. Gold Status after 12 visits in a year, a birthday chips-and-queso reward (a free entrée for Gold members), 60-day reward expiry, 12-month point expiry, and what doesn't earn.",
    "answer": "QDOBA Rewards is QDOBA's free loyalty program. Members earn <strong>1 point per $1</strong> on eligible purchases, and <strong>125 points converts automatically into a Free Entrée Reward</strong> (160 points in Canada), so there is no catalog of smaller rewards to pick from. Visit <strong>12 times in a calendar year</strong> and you reach <strong>Gold Status</strong> for the rest of that year and all of the next, with $2 Chips and Dip once per transaction and a free birthday entrée; every other member gets <strong>free chips and queso on their birthday</strong>. Points only post when you scan the app, give your phone number, order online while signed in, or enter the receipt code within 30 days. Third-party delivery orders earn nothing, and a Free Entrée Reward expires 60 days after it is issued.",
    "facts": [
      [
        "Earning rate",
        "1 point per $1 on eligible purchases; alcohol and gift card (Q-Cash) purchases do not earn"
      ],
      [
        "Reward threshold",
        "125 points = one Free Entrée Reward, converted automatically and placed in your app wallet (160 points in Canada)"
      ],
      [
        "Gold Status",
        "12 visits within a calendar year; status lasts the rest of that year plus the following year. Perks, which QDOBA says can change during the year, include $2 Chips and Dip (queso, guac or salsa) once per transaction, a free birthday entrée and surprise mystery offers"
      ],
      [
        "Birthday",
        "Free chips and queso for members; Gold Status members get a free entrée"
      ],
      [
        "How to earn",
        "Scan the app's QR code or barcode at the register, give the phone number on your account, order in the app or at order.qdoba.com while signed in, or enter the 23-digit code from the bottom of a receipt under 'Forgot to scan? Claim Your Points' within 30 days of the visit"
      ],
      [
        "What doesn't earn",
        "Orders placed through third-party delivery services (rewards can't be redeemed on them either), gift card purchases and alcohol; catering orders are tracked in a separate catering-points program"
      ],
      [
        "Expiry",
        "All unused points expire after 12 consecutive months with no qualifying transaction; a Free Entrée Reward expires 60 days after it is issued"
      ],
      [
        "Verified",
        "Checked by DailyBite against qdoba.com's rewards FAQ, Terms of Use, catering FAQ and newsroom"
      ]
    ],
    "faq": [
      [
        "How many points for a free entrée at QDOBA?",
        "125 points (160 in Canada). At 1 point per $1 that is about $125 of eligible spending. You don't choose when to redeem: the points convert into a Free Entrée Reward on their own, the reward lands in your wallet, and you have 60 days to use it."
      ],
      [
        "Do I earn points on DoorDash or Uber Eats orders?",
        "No. QDOBA's terms say points are not earned, and rewards may not be redeemed, on orders placed through a third-party delivery service. Order in the QDOBA app, at order.qdoba.com or in the restaurant if you want the points."
      ],
      [
        "I forgot to scan. Can I still get the points?",
        "Yes, within 30 days. Keep the receipt: the 23-digit code at the bottom goes into the Scan tab of the app under 'Forgot to scan? Claim Your Points', or into the same section at order.qdoba.com. Catering receipts don't print a code; QDOBA asks you to email a copy of the receipt to guest relations instead."
      ],
      [
        "What is Gold Status?",
        "QDOBA's upper tier, based on visits rather than points. Your 12th visit in a calendar year converts you automatically, and the status runs for the rest of that year and the whole of the next. Gold perks listed on qdoba.com are $2 Chips and Dip once per transaction for as long as you hold the status, a free birthday entrée and surprise offers; QDOBA says the perks can vary and change during the year."
      ],
      [
        "Is there a birthday reward?",
        "Yes. Members get free chips and queso as their birthday reward; Gold Status members get a free entrée instead."
      ],
      [
        "When do QDOBA points and rewards expire?",
        "Points expire if you go 12 consecutive months without a qualifying transaction; any eligible visit resets the clock. A Free Entrée Reward expires 60 days after it is issued, and the sign-up chips-and-queso reward also expires 60 days after it is earned."
      ],
      [
        "Is there a sign-up offer?",
        "QDOBA's rewards page offers new members one free order of chips and queso with their first purchase of a full-sized entrée; it expires 60 days after it is earned and is not available on third-party delivery orders. It is a one-time welcome offer, not an ongoing deal."
      ]
    ],
    "more": "<p>QDOBA relaunched the program in February 2022 with the 1-point-per-$1 rate and the 125-point entrée; the upper tier it announced then as \"Chef\" is called Gold Status on qdoba.com today. Because points convert automatically, there is no cheap redemption to aim for: every 125 points is an entrée, and the practical perk for regulars is Gold Status's $2 Chips and Dip, which works on every transaction for more than a year. Catering orders live in a separate catering-points program (QDOBA's catering FAQ lists a free entrée at 100 catering points) and do not feed your regular balance. For today's verified QDOBA offers and app promos, see the <a href=\"/qdoba-deals\" style=\"color:var(--accent2)\">QDOBA page</a>.</p><p class=\"tag\" style=\"font-size:12px\">Official sources checked (2026-10-20): <a href=\"https://www.qdoba.com/rewards\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">qdoba.com/rewards</a> &middot; <a href=\"https://www.qdoba.com/terms-of-use\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">qdoba.com/terms-of-use</a> &middot; <a href=\"https://www.qdoba.com/media/new-qdoba-rewards\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">qdoba.com/media/new-qdoba-rewards</a> &middot; <a href=\"https://www.qdoba.com/catering-faqs\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">qdoba.com/catering-faqs</a>.</p>"
  },
  {
    "slug": "noodles-rewards",
    "brand": "Noodles & Company",
    "chainSlug": "noodles-and-company-deals",
    "day": null,
    "title": "Noodles Rewards: Points per Dollar, Tiers and Expiry (2026)",
    "h1": "Noodles & Company's Noodles Rewards, Explained",
    "desc": "Noodles Rewards pays 8 points per $1 at the Classic tier, 10 at Signature (1,601 points) and 12 at Premier (6,601). Rewards run from a 150-point add-on to a 2,075-point regular protein bowl, points expire after 210 days, and there is no receipt scanner: missed points go through Noodles' feedback form.",
    "answer": "Noodles Rewards is Noodles &amp; Company's free three-tier loyalty program. New members start at <strong>Classic</strong> and earn <strong>8 points per $1</strong>; <strong>Signature</strong> (1,601 points) earns 10 and <strong>Premier</strong> (6,601 points) earns 12, with tier status based on points earned over a rolling 365 days. Rewards start at <strong>150 points for an extra add-on</strong>; a <strong>regular Culinary Classic bowl is 1,500 points</strong> and a regular Chef Curated bowl with protein is 2,075. The birthday reward scales with tier, from a free dessert at Classic to a free regular entrée at Premier. Points expire <strong>210 days</strong> after they are earned, a reward bought with points must be used within 60 days, and Noodles' current pages describe no receipt scanning: if you forget to scan the app, you ask for the points through Noodles' feedback form within 3 months.",
    "facts": [
      [
        "Earning rate",
        "Classic: 8 points per $1 (0 to 1,600 points). Signature: 10 (1,601 to 6,600). Premier: 12 (6,601+). Points can take up to 48 hours to post"
      ],
      [
        "Tiers",
        "Based on Qualifying Points earned in a rolling 365-day window; reaching a tier issues a Tier Grant that holds the status for 365 days, and you drop back if you don't requalify. Spending points does not reduce tier progress"
      ],
      [
        "Reward ladder",
        "150: extra add-on (sauce, veggies or cheese; one per entrée). 300: dessert (Rice Crispy or cookie). 1,100: small Culinary Classic bowl. 1,500: regular Culinary Classic bowl. 1,675: small Chef Curated bowl with protein. 2,075: regular Chef Curated bowl with protein"
      ],
      [
        "Birthday",
        "Classic: free dessert. Signature: free small entrée. Premier: free regular entrée. Added to your account on your birthday"
      ],
      [
        "How to earn",
        "Order online or in the app while signed in, scan the app at the register, or give the Ambassador the phone number on your account. Forgot to scan? Send Noodles' general feedback form with your order ID within 3 months; Noodles says the points are added within 48 hours"
      ],
      [
        "What doesn't earn",
        "Gift card purchases, alcohol, delivery fees, tips, and sales and other taxes"
      ],
      [
        "Expiry",
        "Points expire 210 days after they are earned, on the first day of the month, with a reminder email 14 days before; a reward bought with points must be redeemed within 60 days or the points are lost"
      ],
      [
        "Verified",
        "Checked by DailyBite against noodles.com's rewards page, program terms, FAQ and rewards blog, and the company's investor newsroom"
      ]
    ],
    "faq": [
      [
        "How many points for a free bowl at Noodles & Company?",
        "1,500 points for a regular Culinary Classic bowl, or 1,100 for a small. At the Classic rate of 8 points per $1 that is about $188 of spending for the regular bowl; at Premier (12 per $1) about $125. Bowls with protein in the name cost more: 1,675 points small, 2,075 regular. The ladder lives in the Rewards Store in the app, and Noodles says point values can change."
      ],
      [
        "How do the tiers work?",
        "Everyone starts at Classic. Earning 1,601 points moves you to Signature and 6,601 to Premier, counted over a rolling 365 days. Hitting a tier issues a Tier Grant that keeps the status for 365 days; if you don't earn enough in the next window, you drop back. Redeeming points does not cost you tier progress."
      ],
      [
        "Can I scan a receipt for missed points?",
        "Not on the current program. Noodles' official pages list three ways to earn (signed-in online orders, scanning the app at the register, or giving your phone number) and no receipt scanner; the receipt-scan option from the program's 2017 launch is gone. If you forgot to scan, submit the general feedback form on noodles.com with your order ID. Noodles says it adds the points within 48 hours and accepts requests up to 3 months after the order."
      ],
      [
        "What is the birthday reward?",
        "It depends on your tier: a free dessert at Classic, a free small entrée at Signature, and a free regular entrée of your choice at Premier. Noodles adds it to your account on your birthday."
      ],
      [
        "When do Noodles points expire?",
        "210 days after they are earned, with the oldest points used first; the expiry lands on the first day of a month and Noodles emails a reminder 14 days ahead. A reward you buy with points is good for 60 days, and the points are not returned if it goes unused."
      ],
      [
        "Do DoorDash or Uber Eats orders earn points?",
        "Noodles' terms name signed-in online orders, app scans and phone-number lookups as the ways to earn, and its rewards blog says a delivery order placed on noodles.com or in the app while signed in earns automatically. The official pages don't address third-party apps either way, and Noodles' bonus-point promotions exclude third-party delivery, call-in and catering orders, so treat those as not earning unless Noodles says otherwise."
      ],
      [
        "Is there a sign-up offer?",
        "Noodles' terms describe a welcome offer: a free regular entrée after a $10 purchase made while signed in within 30 days of joining, valid for 30 days after it is issued. It is a one-time offer, not an ongoing deal."
      ]
    ],
    "more": "<p>Noodles Rewards has the steepest ladder of the chains DailyBite has covered, and the tiers are the point: a regular at Premier earns 50% more per dollar than a new member, and the birthday reward grows from a dessert to a full entrée. The 150-point add-on and the 300-point dessert are the only redemptions that arrive after a visit or two. Noodles also runs Extra Goodness, a rotating members-only daily perk announced as a $1 dessert with a qualifying purchase; the current offer changes monthly and shows in the app. For today's verified Noodles &amp; Company offers and app promos, see the <a href=\"/noodles-and-company-deals\" style=\"color:var(--accent2)\">Noodles &amp; Company page</a>.</p><p class=\"tag\" style=\"font-size:12px\">Official sources checked (2026-10-20): <a href=\"https://www.noodles.com/rewards\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">noodles.com/rewards</a> &middot; <a href=\"https://www.noodles.com/rewards/rewards-terms-conditions\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">noodles.com/rewards/rewards-terms-conditions</a> &middot; <a href=\"https://www.noodles.com/app-termsandconditions\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">noodles.com/app-termsandconditions</a> &middot; <a href=\"https://www.noodles.com/faqs\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">noodles.com/faqs</a> &middot; <a href=\"https://www.noodles.com/faq/when-do-rewards-expire\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">noodles.com/faq</a> &middot; <a href=\"https://www.noodles.com/blog/rewards\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">noodles.com/blog/rewards</a> &middot; <a href=\"https://www.noodles.com/blog/top-10-questions\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">noodles.com/blog/top-10-questions</a> &middot; <a href=\"https://investor.noodles.com/news-releases/news-release-details/noodles-company-continues-expand-its-loyalty-program-extra\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">investor.noodles.com</a> &middot; <a href=\"https://investor.noodles.com/news-releases/news-release-details/crave-customize-and-collect-noodles-company-rolls-out-new\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent2)\">investor.noodles.com</a>.</p>"
  },
];
