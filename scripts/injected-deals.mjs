// Deals the BUILD injects on its own (grocery sushi days, standing value menus, dated
// owner-verified promos). Shared module (2026-09-30) so the morning refresh can see what is
// already covered and stop spending searches re-finding it. Each entry: { until, from?, dow?,
// alongside?, deal }. dow: 0=Sun..6=Sat (Eastern). Edit this file, never a generated page.
export const EVERGREEN = [
    // Owner request + officially verified (Chipotle newsroom press release, 2026-08-27):
    // one-day free double protein with code PROTEIN. Self-expires after today.
    { until: "2026-08-27", deal: { brand: "Chipotle", cat: "Bowls", color: "#a81612", ic: "Ch", deal: "Free Double Protein Today Only: Code PROTEIN", desc: "Today only (August 27): add a free second portion of meat or sofritas to any full-price burrito, bowl, or salad ordered in the Chipotle app or at chipotle.com with code PROTEIN at checkout. App and website orders only; not valid in-restaurant or on delivery platforms.", tags: ["free", "app"], value: 5, expires: "Today only, August 27", url: "https://www.chipotle.com/rewards", best: true, region: "National" } },
    // (Chipotle free-delivery evergreen removed 2026-08-25: its until-date of 2026-08-15 passed.)
    // National Quesadilla Day 2026 (owner request 2026-09-24; Chipotle newsroom release of
    // 2026-09-21): code NQD2026, Sept 24-25, US and Canada, app/website only, no Rewards
    // account required. "alongside" so a refresh-found Chipotle deal does not block it.
    { from: "2026-09-24", until: "2026-09-25", alongside: true, deal: { brand: "Chipotle", cat: "Mexican", color: "#a81612", ic: "Ch", deal: "National Quesadilla Day: Free Quesadilla with a $20 Digital Order, Code NQD2026", desc: "Thursday and Friday (September 24 to 25): add a free quesadilla entree to any Chipotle app or chipotle.com order of $20 or more with code NQD2026 at checkout. Open to everyone, no Rewards account needed. Digital orders only: not valid in restaurant or on delivery apps; no add-ons on the free quesadilla; one per order while supplies last.", tags: ["free", "app"], value: 5, est_savings: 11, expires: "Through September 25, 2026", url: "https://newsroom.chipotle.com/2026-09-21-CHIPOTLE-CELEBRATES-NATIONAL-QUESADILLA-DAY-2026-WITH-TWO-DAYS-OF-FREE-QUESADILLAS", best: true, region: "National" } },
    // Verified 2026-08-27: El Pollo Loco's $5 Fire-Grilled Combos value platform is
    // announced on the company's own investor site and current on 2026 menus.
    // El Pollo Loco "Fire-Grilled Combos from $5.99" removed 2026-11-04: regular combo pricing (varies by market), an
    // everyday value menu rather than a deal (owner rule). Also owner-rejected in build.mjs.
    // Owner request (Jacob, 2026-08-14): Tijuana Flats day specials, injected only on their active weekday (dow: 0=Sun..6=Sat).
    { until: "2026-12-31", dow: 2, deal: { brand: "Tijuana Flats", cat: "Mexican", color: "#d0342c", ic: "TF", deal: "2 Tacos, Chips and a Drink for $7.99", desc: "In store, online or in the app at participating locations.", tags: [], value: 4, expires: "Tuesdays only", url: "https://www.tijuanaflats.com/promotions/specials-and-deals", best: false, region: "FL & Southeast" } },
    { until: "2026-12-31", dow: 4, deal: { brand: "Tijuana Flats", cat: "Mexican", color: "#d0342c", ic: "TF", deal: "Burrito, Chips and a Drink for $8.99", desc: "A burrito or bowl with chips and a drink, in store, online or in the app.", tags: [], value: 4, expires: "Thursdays only", url: "https://www.tijuanaflats.com/promotions/specials-and-deals", best: false, region: "FL & Southeast" } },
    // Tijuana Flats Saturday special, read from tijuanaflats.com/promotions/offer-terms on 2026-11-14: "2 FOR $24 SATURDAZE.
    // Offer good for two entrees, two drinks and one starter for $24 on Saturdays. Valid on select menu items ... Valid for
    // in-store and app/online purchases ... participating locations." Standing weekly special; shows Saturdays only.
    { until: "2026-12-31", dow: 6, deal: { brand: "Tijuana Flats", cat: "Mexican", color: "#d0342c", ic: "TF", deal: "Two Entrees, Drinks and a Starter for $24", desc: "In store, online or in the app. Select menu items.", tags: [], value: 4, expires: "Saturdays only", url: "https://www.tijuanaflats.com/promotions/offer-terms", best: false, region: "FL & Southeast", est_savings: 8 } },
    // Owner request (Jacob, 2026-08-20): grocery-store prepared-food deals are welcome when the value is real.
    // Publix $5 Sushi Wednesday, seen in store by the owner (spicy tuna and Philadelphia rolls at his Publix);
    // confirmed by Chowhound and the AFC/Zenshi sushi counters that run it. Wednesdays only (dow 3).
    // Sprouts "Sushi Wednesday": select Oumi rolls. The official Sprouts FAQ (last edited 2020) still says $5; the
    // owner checked in store on 2026-10-07 and the Wednesday price is now $6 (same drift as Harris Teeter's $5 -> $6).
    // Re-read 2026-11-16: sprouts.com/healthy-living/sprouts-fresh-sushi says "$5* ON SUSHI WEDNESDAYS! *Select items only."
    // and the FAQ still says $5, so the card now gives both prices instead of only the $6 the owner saw in Herndon.
    { until: "2026-12-31", dow: 3, deal: { "brand":"Sprouts","cat":"Sushi","color":"#00703c","ic":"SP","deal":"$5 Sushi Rolls ($6 at Some Stores)","desc":"Select rolls from the sushi case, usually $8 to $10. No coupon or card needed.","tags":[],"value":4,"expires":"Wednesdays only","url":"https://www.sprouts.com/healthy-living/sprouts-fresh-sushi/","best":false,"region":"Select states","est_savings":3 } },
    // Kroger-family "Wednesday Only" Private Selection sushi by Snowfox: an official kroger.com promo
    // lineup (California, Spicy Tuna, Philly, Spicy Salmon, Vegetarian and more) with a promotional
    // price on Wednesdays only; kroger.com showed $6.00 and snowfox.com says "$6 sushi every Wednesday" on 2026-09-22 (was $5).
    { until: "2026-12-31", dow: 3, deal: { brand: "Kroger", cat: "Sushi", color: "#0b3b8c", ic: "KR", deal: "$6 Sushi Rolls", desc: "Wednesday-only rolls at Kroger-family sushi counters, usually $8 to $10. A free store card may be needed.", tags: [], value: 4, expires: "Wednesdays only", url: "https://www.kroger.com/p/wednesday-only-private-selection-california-sushi-roll-by-snowfox-/0001111065967", best: false, region: "Select states" } },
    { until: "2026-12-31", dow: 3, alongside: true, deal: { brand: "Publix", cat: "Sushi", color: "#3d8a3a", ic: "PX", deal: "$5 Sushi Rolls", desc: "Select fresh rolls at stores with a sushi counter, usually $6 to $10. No coupon or card needed.", tags: [], value: 4, expires: "Wednesdays only", url: "https://www.publix.com/savings/weekly-ad/deli", best: false, region: "FL & Southeast" } },
    // Verified 2026-08-24: Safeway's standing $5 Friday includes fresh sushi (safeway.com lists
    // dedicated "$5 Friday" sushi SKUs) plus other prepared foods; lineup posts Wednesdays in the
    // weekly ad and varies by division. Harris Teeter: $6 Sushi Friday, four Zenshi rolls, seen in
    // store by the owner in Reston, VA on 2026-10-02 (was $5 at the 2024 launch). Fridays only (dow 5).
    { until: "2026-12-31", dow: 5, deal: { brand: "Safeway", cat: "Sushi", color: "#e31837", ic: "SF", deal: "$5 Sushi Rolls", desc: "Part of $5 Friday at California stores. Needs a free Safeway for U account.", tags: [], value: 4, expires: "Fridays only", url: "https://www.safeway.com/weeklyad/", best: false, region: "California only" } },
    { until: "2026-12-31", dow: 5, deal: { brand: "Harris Teeter", cat: "Sushi", color: "#00529b", ic: "HT", deal: "$6 Sushi Rolls", desc: "California, Vegetable, Spicy Tuna and Spicy Salmon rolls, usually about $10. A free VIC card may be needed.", tags: [], value: 4, est_savings: 3.5, expires: "Fridays only", url: "https://www.harristeeter.com/", best: false, region: "Southeast & Mid-Atlantic" } },
    // Added 2026-09-08 (owner request: more weekly grocery deals), each source-checked that day:
    // Hy-Vee store news pages list "Nori Sushi Roll, select varieties - $6" on Wednesdays and
    // BOGO 50% on Fridays; H-E-B's own coupon copy names "Sushi Wednesdays" and "$7 Saturdays";
    // ShopRite store pages post "$5.99 Sushi Wednesday"; Publix's order-ahead weekly specials
    // page lists the Sub of the Week. Store-run promos: descriptions say so.
    // Hy-Vee Wednesday changed, read on hy-vee.com/deals/ads/812404 on 2026-11-16 ("Daily Dining Deals", Urbandale IA store,
    // "Valid 10/5/2026 - 1/2/2027"; the ad image says "WEDNESDAY ... NORI SUSHI All varieties of equal or lesser value, limit 4.
    // BUY ONE, GET ONE FREE" and "Valid on in-store and online orders placed through Jan. 3, 2027"). The older "$6 select
    // rolls" wording survives only on one undated store-news page. Friday in the same ad is fish and chips and a rice bowl,
    // so the Friday "buy one, get one 50% off" sushi card was retired the same day.
    { until: "2027-01-03", dow: 3, deal: { "brand":"Hy-Vee","cat":"Sushi","color":"#e31837","ic":"HV","deal":"Buy One Sushi Roll, Get One Free","desc":"Any Nori Sushi, limit 4, in store or online. Each store posts its own ad, so check yours.","tags":["free"],"value":5,"expires":"Wednesdays only","url":"https://www.hy-vee.com/deals/weekly-ads","best":false,"region":"Midwest","est_savings":8 } },
    // Hy-Vee "Sushi Friday: buy one, get one 50% off" retired 2026-11-16: not in the current Daily Dining Deals ad (see above).
    { until: "2026-12-31", dow: 3, deal: { brand: "H-E-B", cat: "Sushi", color: "#e01e26", ic: "HB", deal: "$7 Sushi Rolls", desc: "Select Sushiya rolls, usually $9 to $12. No coupon needed.", tags: [], value: 3, expires: "Wednesdays only", url: "https://www.heb.com/category/shop/deli-prepared-food/ready-meals-snacks/sushi/490061/490236", best: false, region: "Texas" } },
    // H-E-B "$7 Saturday" removed 2026-10-31: heb.com names "$7 Saturdays" only in coupon exclusions and never states the terms; Sushiya's stated program is $7 Sushi Wednesdays (kept above).
    { until: "2026-12-31", dow: 3, deal: { brand: "ShopRite", cat: "Sushi", color: "#c8102e", ic: "SR", deal: "$5.99 Sushi Rolls", desc: "Select rolls at participating stores, usually $8 to $10. In store only.", tags: [], value: 3, expires: "Wednesdays only", url: "https://www.shoprite.com/categories/prepared-foods/sushi-seafood-id-520585", best: false, region: "NJ, NY, PA, CT, DE & MD" } },
    // MORE SUSHI DAYS (owner request 2026-09-22, "more good value sushi deals"). Each one was
    // verified that day on an official channel (the chain's own site or its verified page,
    // or the vendor program built for that chain). Meijer, Giant Food, Giant Eagle, Stop &
    // Shop and Fresh Thyme could NOT be pinned to an official current price and stay out.
    { until: "2026-12-31", dow: 3, deal: { brand: "Weis Markets", cat: "Sushi", color: "#c8102e", ic: "W", deal: "$5 Sushi Rolls", desc: "Select Snowfox rolls marked in the case, usually $7 to $9. In store only.", tags: [], value: 3, expires: "Wednesdays only", url: "https://www.weismarkets.com/flyers", best: false, region: "PA, MD, NY, NJ, DE, WV & VA" } },
    { until: "2026-12-31", dow: 3, deal: { brand: "Food Lion", cat: "Sushi", color: "#1a4c9c", ic: "FL", deal: "$5 Sushi Rolls", desc: "Select Hissho rolls, usually $7 to $9. No card or coupon needed.", tags: [], value: 3, expires: "Wednesdays only", url: "https://www.foodlion.com/savings/weekly-ad", best: false, region: "Mid-Atlantic & Southeast" } },
    { until: "2026-12-31", dow: 3, deal: { brand: "Lowes Foods", cat: "Sushi", color: "#e4002b", ic: "LF", deal: "$4.99 Sushi Rolls", desc: "Select hand-rolled sushi, usually $7 to $9. In store only.", tags: [], value: 3, expires: "Wednesdays only", url: "https://www.lowesfoods.com/savings-and-rewards/weekly-ad", best: false, region: "NC & SC" } },
    { until: "2026-12-31", dow: 3, deal: { brand: "Hannaford", cat: "Sushi", color: "#7a1f1f", ic: "H", deal: "$5 Sushi Rolls", desc: "Five Wago rolls, including California and Classic Vegan, usually $7 to $8. In store only.", tags: [], value: 3, expires: "Wednesdays only", url: "https://www.wagosushi.com/faqs/", best: false, region: "ME, NH, VT, MA & NY" } },
    { until: "2026-12-31", dow: 2, deal: { brand: "Dierbergs", cat: "Sushi", color: "#00703c", ic: "D", deal: "$6 Sushi Rolls", desc: "Select hand-rolled Bento sushi, usually $8 to $10. In store.", tags: [], value: 3, expires: "Tuesdays only", url: "https://www.dierbergs.com/department/deli-and-prepared-foods", best: false, region: "St. Louis area" } },
    // Island Fin Poke publishes Topping Tuesday on its own Daily Specials page (verified 2026-09-22).
    // Retired 2026-11-20 (owner: deals must be easy to claim and give real value). Island Fin free topping: worth under $2.
    // Pokeworks September codes, from the chain's own 2026-09-02 press release (open to all
    // guests, in store and online). Each self-expires.
    { from: "2026-09-21", until: "2026-09-27", deal: { brand: "Pokeworks", cat: "Poke", color: "#1b3a6b", ic: "PW", deal: "Free Extra Scoop of Ahi or Chicken with Code POWERUP", desc: "Through September 27, order the High-Protein Surf & Turf bowl and add a free extra scoop of ahi tuna or chicken with code POWERUP, in store or online. Open to all guests, no rewards account needed.", tags: [], value: 4, expires: "Through September 27, 2026", url: "https://pokeworks.com/rewards/", best: false, region: "Select states" } },
    { from: "2026-09-28", until: "2026-09-30", deal: { brand: "Pokeworks", cat: "Poke", color: "#1b3a6b", ic: "PW", deal: "International Poke Day: Free Extra Protein Scoop with Code POKEDAY", desc: "September 28 to 30, get a free extra scoop of protein with any regular or large poke entree using code POKEDAY, in store or online. Open to all guests, no rewards account needed.", tags: [], value: 4, expires: "Through September 30, 2026", url: "https://pokeworks.com/rewards/", best: false, region: "Select states" } },
    // Retired 2026-11-20 (owner: deals must be easy to claim and give real value). Publix sub of the week: saves $2.
    // VALUE-MENU FLOOR (2026-09-15, cost + depth pass; Subway removed 2026-09-21, see
    // STANDING_MENU_BLOCK below). These standing value menus
    // were verified by the refresh itself on 2026-09-08 (titles, prices and URLs copied
    // from that run's deals.json) but only re-found on some days, so the list swung
    // between 8 and 11. Injected only when the morning refresh misses the brand (the
    // one-per-brand rule, no "alongside"), so a fresher refresh-found entry always wins.
    // Each expires 2026-10-15: re-verify the price then and bump the date, or drop it.
    { until: "2026-10-15", deal: { brand: "Rubio's Coastal Grill", cat: "Seafood", color: "#00a1e0", ic: "R", deal: "$7+ Meal Menu, including Fish & Chips for $7.99", desc: "Rubio's standing value menu runs meals from $7 to $10, headlined by Fish & Chips for $7.99, every day at participating locations.", tags: [], value: 3, expires: "Ongoing", url: "https://www.rubios.com/menu", est_savings: 3, best: false, region: "CA, AZ & NV" } },
    { until: "2026-10-15", deal: { brand: "WaBa Grill", cat: "Bowls", color: "#e4002b", ic: "W", deal: "Value-Bowl Combo: mini bowl, side and drink for $7.99", desc: "A permanent value item: a mini bowl with chicken, sweet and spicy chicken or tofu, plus a value side and a 12 oz drink for $7.99, every day at participating locations.", tags: [], value: 3, expires: "Ongoing", url: "https://www.wabagrill.com/menu", est_savings: 3, best: false, region: "CA & AZ" } },
    // Naf Naf Grill "$9.99 Pita Meal Deal" retired 2026-11-15: nafnafgrill.com shows it only as a January 2026 press headline
    // and the chain's own order menu (order.thanx.com/nafnafgrill) lists no meal deal (Stuffed Pita Sandwich $9.95 alone).
    // (Edit scripts used the old line as an insertion anchor: deal: "$9.99 Pita Meal Deal" -- insert new entries below.)
    // SoBoL (acai and smoothie bowls; 86 shops: NY 59, CT 6, MA 5, NJ 5, FL 4, NC 3, DE, MD, NH, PA and VA [Gainesville] 1 each),
    //   read on the mysobol.com homepage on 2026-11-24: "Every Tuesday at SoBoL: Kids Eat Free. Buy a classic bowl. Your kid's
    //   bowl is on us. 1 Come in on a Tuesday 2 Order a classic and kids size bowl 3 Kids get a free kids-size bowl. One free
    //   kids-size bowl per child, every Tuesday." Kids bowls run about $8.58 to $10.35 on the Astoria NY ordering menu. No end
    //   date: re-check monthly.
    { until: "2027-02-28", dow: 2, deal: { "brand":"SoBoL","cat":"Bowls","color":"#5d287f","ic":"SB","deal":"Kids Eat Free","desc":"Buy a classic acai or smoothie bowl in the shop and each child gets a free kids-size bowl.","tags":["free"],"value":4,"expires":"Tuesdays only","url":"https://mysobol.com/","best":false,"region":"NY, CT, MA, NJ, FL, NC & 5 more states","est_savings":9 } },
    // El Pollo Loco 12 Days of Pollo, read on elpolloloco.com/promotions/12-days-of-pollo-offer-terms on 2026-11-24: "On 12/1/26 only,
    //   buy an a la carte Burrito and get an a la carte Burrito free. Choose from Guacamole Chicken, Chipotle Chicken, or Queso
    //   Chicken. Offer available to valid Loco Rewards members, redeemable through the Loco Rewards account online or in the App by
    //   applying the reward at checkout, or in store by scanning the QR code ... Limit one offer per person, per day. Not valid on
    //   third-party delivery platforms." Other days were left off: $10 tostada combo (Dec 2), 20% off (Dec 4), $10 off $35 (Dec 5),
    //   3 tacos for $6 (Dec 8), $9 Double Chicken Bowl (Dec 11, regular price not checked).
    { from: "2026-12-01", until: "2026-12-01", alongside: true, deal: { "brand":"El Pollo Loco","cat":"Chicken","color":"#e4002b","ic":"EPL","deal":"Buy One Chicken Burrito, Get One Free","desc":"Tuesday only, for Loco Rewards members (free account). Apply the reward in the app or online, or scan the app in store.","tags":["free","app"],"value":5,"expires":"December 1, 2026 only","url":"https://www.elpolloloco.com/promotions/12-days-of-pollo-offer-terms","best":false,"region":"West & Southwest","est_savings":9 } },
    // Tropical Smoothie Cafe code SCORE, read on tropicalsmoothiecafe.com/football on 2026-11-24 (the page redirected to the
    //   homepage on Nov 17, and the owner's test on Oct 26 failed when no code was published): "$2 24 oz. smoothie with purchase
    //   of any regular price food item or Tropic Bowl (excludes sides, sweets, snacks and kids food items) when you use promo
    //   code SCORE at checkout on orders from participating locations every Sunday and Monday between September 13, 2026 and
    //   January 11, 2027. Must provide promo code at checkout online at tropicalsmoothiecafe.com or via the Tropical Smoothie
    //   Cafe app ... Not valid with any other reward, offer or discount, third-party services, or on in-cafe purchases."
    { until: "2027-01-11", dow: [0, 1], alongside: true, deal: { "brand":"Tropical Smoothie Cafe","cat":"Smoothies","color":"#00A651","ic":"TSC","deal":"$2 Smoothie with Any Food Item","desc":"A 24 oz smoothie for $2 when you buy a wrap, flatbread or bowl. Enter code SCORE online or in the app. Not valid in the cafe.","tags":["code"],"value":5,"expires":"Sundays and Mondays only","url":"https://www.tropicalsmoothiecafe.com/football","best":false,"region":"National","est_savings":5 } },
    // The Big Greek Cafe (12 Maryland stores; Virginia: Sterling, Leesburg, Oakton, Alexandria), read on biggreekcafe.com/menu/
    //   on 2026-11-23: "HOME OF THE $7 GYRO WEDNESDAYS. Every Wednesday we offer our famous Gyros for only $7!" The homepage
    //   menu also links "$7 GYRO WEDNESDAY". Regular price: "Our Famous Gyro Pita Sandwich" $11.99 on the Sterling store's
    //   ordering menu (biggreekcafesterling.hrpos.heartland.us/menu, read by the research pass on a Monday). No end date or
    //   fine print is posted: re-check monthly.
    { until: "2027-02-28", dow: 3, deal: { "brand":"The Big Greek Cafe","cat":"Mediterranean","color":"#1565c0","ic":"BG","deal":"$7 Gyros","desc":"Every Wednesday. A gyro pita is $11.99 on other days at the Sterling store. Just order as usual.","tags":[],"value":5,"expires":"Wednesdays only","url":"https://biggreekcafe.com/menu/","best":false,"region":"Maryland & Northern Virginia","est_savings":5 } },
    // Read on the chains' own pages on 2026-11-22 (sweep for easy, real-value deals for Thanksgiving week):
    // Crisp & Green 10th anniversary, crispandgreen.com/rewards: "Day Seven November 27. Enjoy a regular entree and a smoothie
    //   for just $10. Valid in-store only at participating locations on 11/27/2026. Must be an active loyalty member and check
    //   in at the register. Bundle includes one regular entree and one standard 16 oz smoothie for $10 plus tax ... Not valid on
    //   app, web, or 3rd-party orders." and "Day Eight November 28. Purchase an adult entree and receive a free kids meal".
    //   Locations page: MN 29, CO 5, FL 5, IL 5, IA 3, NE 3, TX 3, AR 2, ND 2, WI 2, IN, MT, OH, SD, TN, UT 1 each.
    // Smoothie King, its PR Newswire release of 2026-11-19: "stop by participating locations nationwide on December 1 for a
    //   free 12 oz. Vanilla Peppermint D-Lite Smoothie. New and existing Healthy Rewards members ... while supplies last."
    //   Not yet on smoothieking.com: re-check Nov 30.
    // Schlotzsky's, schlotzskys.com/offers: "$2.99 Small Original. Offer valid only on 12/3/26 for in-store and online orders at
    //   participating locations ... Valid only on Small Original, Cheese Original, Ham and Cheese Original, and Turkey Original
    //   ... Limit 10 per order."
    { from: "2026-11-27", until: "2026-11-27", alongside: true, deal: { "brand":"Crisp & Green","cat":"Bowls","color":"#2e7d32","ic":"CG","best":false,"region":"MN, CO, FL, IL, IA, NE, TX & 9 more states","url":"https://crispandgreen.com/rewards","deal":"Entree and a Smoothie for $10","desc":"Black Friday, in store only. Join CRISP Rewards (free) and check in at the register. One per member.","tags":["app"],"value":5,"expires":"November 27, 2026 only","est_savings":8 } },
    { from: "2026-11-28", until: "2026-11-28", alongside: true, deal: { "brand":"Crisp & Green","cat":"Bowls","color":"#2e7d32","ic":"CG","best":false,"region":"MN, CO, FL, IL, IA, NE, TX & 9 more states","url":"https://crispandgreen.com/rewards","deal":"Free Kids Meal with an Adult Entree","desc":"Saturday, in store only, for CRISP Rewards members (free). Check in at the register. Kids 12 and under.","tags":["free","app"],"value":4,"expires":"November 28, 2026 only","est_savings":7 } },
    { from: "2026-12-01", until: "2026-12-01", alongside: true, deal: { "brand":"Smoothie King","cat":"Smoothies","color":"#c8102e","ic":"SK","deal":"Free 12 oz Peppermint Smoothie","desc":"Tuesday, December 1, for Healthy Rewards members (free account), while supplies last. No purchase is mentioned.","tags":["free","app"],"value":5,"expires":"December 1, 2026 only","url":"https://www.smoothieking.com/","best":false,"region":"National","est_savings":5 } },
    { from: "2026-12-03", until: "2026-12-03", alongside: true, deal: { "brand":"Schlotzsky's","cat":"Sandwiches","color":"#c8202f","ic":"SZ","deal":"$2.99 Small Original Sandwich","desc":"Thursday, December 3, in store or online. Original, Cheese, Ham and Cheese or Turkey. Up to 10 per order.","tags":[],"value":5,"expires":"December 3, 2026 only","url":"https://www.schlotzskys.com/offers","best":false,"region":"24 states (TX, South & Midwest)","est_savings":4 } },
    // Chipotle "Back Home BOGO", read on chipotle.com/back-home-bogo on 2026-11-20: "BOGO exclusive to Chipotle Rewards members
    // who scan for Rewards at point of sale ... Limited to five free entree items per check ... Valid only on November 25, 2026,
    // 5 p.m. to 9 p.m. local time. Redeemable in-restaurant only ... not valid for ... mobile, online or delivery orders ... Kids'
    // meals do not count as an entree purchase." One-day card.
    { from: "2026-11-25", until: "2026-11-25", alongside: true, deal: { "brand":"Chipotle","cat":"Mexican","color":"#a81612","ic":"Ch","deal":"Buy One Entree, Get One Free","desc":"Wednesday from 5 to 9 PM, in the restaurant only. Scan your Chipotle Rewards account (free) at the register.","tags":["free","app"],"value":5,"expires":"November 25, 2026, 5 to 9 PM","url":"https://www.chipotle.com/back-home-bogo","best":false,"region":"National","est_savings":11 } },
    // Jason's Deli 50th birthday, from the chain's press release of 2026-11-18 (Beaumont, TX; read on restaurantnews.com on
    // 2026-11-20): "On Monday, Nov. 30, all Jason's Deli locations will celebrate with a special $5 Birthday Menu ($5 entrees
    // limited to one per guest), available for dine-in only and featuring eight favorites: The Plain Jane, Bowl of Chicken
    // Chili, California Club, Club Royale, Turkey Wrap, Amy's Turkey-O, Chipotle Chicken & Avocado Panini and the Garden-Fresh
    // Salad Bar." jasonsdeli.com showed only the member poll that day, so re-read it on Nov 28-29 before the day.
    { from: "2026-11-30", until: "2026-11-30", alongside: true, deal: { "brand":"Jason's Deli","cat":"Sandwiches","color":"#00703c","ic":"JD","deal":"$5 Sandwiches, Chili and Salad Bar","desc":"Eight $5 entrees for the chain's 50th birthday, including the Club Royale and the salad bar. Dine-in only, one per guest.","tags":[],"value":5,"expires":"November 30, 2026 only","url":"https://www.jasonsdeli.com/","best":false,"region":"27 states (South & Central)","est_savings":6 } },
    // EASY AND WORTH IT (owner, 2026-11-20, after the CAVA Community Day card: "you could not redeem the deal from their
    // own app even, there was no promo code, and people had to jump through hoops and hurdles to get a ticket ... I want
    // these deals to be easy accessible ones that provide real value"). A deal goes here only if (1) you claim it by
    // ordering as usual, by entering a code the chain publishes, or by tapping an offer every member sees in the chain's
    // own app, and (2) it saves about $4 or 25% on food that visit. Never: tickets, RSVP, first-N-in-line events, offers
    // for select members, free delivery alone, drink add-ons, toppings, points or a reward for a later visit.
    // WRITING RULE (owner, 2026-11-17: "too many words ... make it more simple to identify what the deal actually is"):
    // the headline says what you get in a few words ("$5 Sushi Rolls", "Buy 2 Tacos, Get 1 Free", "Kids Eat Free"), at most
    // about 40 characters, with no campaign name, day name or promo code. The description is one or two short sentences, at
    // most 150 characters: how to get it and the one catch. Sources and quotes go in these comments, never on the card.
    // No gift card deals.
    // Uncle Julio's 40th anniversary, read on unclejulios.com and unclejulios.com/anniversary on 2026-11-17: "40TH ANNIVERSARY
    // NOVEMBER 17, 2026 ... AT 1986 PRICES VEGETABLE $8.14 CHICKEN $9.25 SHRIMP $9.64 STEAK $9.95". Hours 11 a.m. to 9 p.m. come
    // from the chain's PR Newswire release of 2026-11-10. Locator: VA (Ashburn, Fairfax, Gainesville, Reston, Woodbridge), CO,
    // FL, IL, MD, NJ, OK, TN, TX, WI. A sit-down Tex-Mex chain added for this one day (owner, 2026-11-17: "deals that people
    // actually get excited about"); not in the HEALTHY set. One-day card.
    { from: "2026-11-17", until: "2026-11-17", deal: { "brand":"Uncle Julio's","cat":"Mexican","color":"#7a1f1f","ic":"UJ","deal":"40th Anniversary: Fajitas at 1986 Prices, from $8.14, Today Only","desc":"Tuesday, November 17 only: Uncle Julio's is selling its fajitas at 1986 prices for its 40th anniversary. Vegetable fajitas are $8.14, chicken $9.25, shrimp $9.64 and steak $9.95, served with guacamole, sour cream, cheese, rice, charro beans, peppers and onions and flour tortillas. No code or account is mentioned; the chain's announcement gives the hours as 11 AM to 9 PM. The Northern Virginia restaurants are in Reston, Fairfax, Ashburn, Gainesville and Woodbridge. Stated on Uncle Julio's own anniversary page.","tags":[],"value":5,"expires":"November 17, 2026 only","url":"https://unclejulios.com/anniversary/","best":false,"region":"VA, MD, TX, IL, FL, CO, NJ, OK, TN & WI","est_savings":12 } },
    // CAVA Community Day, read on CAVA's own Eventbrite listings on 2026-11-17 (organizer "CAVA", eventbrite.com/o/8584224871):
    // "Join us for Community Day at The Grove!" 4757 The Grove Drive, Windermere FL 34786, start times 2026-11-21 10:30 and
    // 2026-11-22 10:30 (event metadata); "Join us for a celebratory lunch or dinner on the house before our grand opening";
    // slots 10:30am-2pm, 2-5pm, 5-8pm; "Limit one bowl or pita per person"; each guest needs a digital ticket. Tickets were
    // available on both days. The same event at Westfield Montgomery Mall, Bethesda MD (Nov 23) showed SOLD OUT, so it is
    // not listed. Shows before the day because the ticket has to be reserved ahead. CAVA runs one of these for every new
    // restaurant: check the organizer page in each daily pass.
    // Retired 2026-11-20 (owner: deals must be easy to claim and give real value). CAVA Community Day free meal: needs an Eventbrite ticket, no promo code, not redeemable in CAVA's app.
    // MORE SUSHI DAYS (owner, 2026-11-16: the sushi-day pages are the site's top traffic source; "include the highest value
    // deals possible"). Each one read on the chain's own site on 2026-11-16:
    // Raley's, raleys.com/category/PMC271/sushi: rolls tagged "MEMBER PRICE $6 Sushi Wednesdays" (10 tags on the page; rolls
    //   listed at $7.49 to $11.99). Member price = free Something Extra account.
    // Lunds & Byerlys, lundsandbyerlys.com/daily-deals and /daily-deal-hissho-sushi-rolls: "WEDNESDAY: Hissho Sushi",
    //   "$3 OFF WEDNESDAYS!"; California and Philadelphia rolls $8.99, Dynamite $9.99.
    // Heinen's, heinens.com/weekday-meal-deals: "Wednesday $6 Select Sushi Rolls"; "Eligible rolls will be marked with $6
    //   stickers"; "available to all customers" (no Tasteful Rewards needed); available online. No regular price stated.
    // Earth Fare, earthfare.com/daily-deals: "$5.99 Sushi in Wednesday. Select varieties of fresh sushi from Earth Fare kitchen
    //   for only $5.99 (available only at select store locations)". Stores page: SC 5, TN 3, NC 2, VA 2, FL 1, GA 1.
    // Rouses Markets, rouses.com/our-food/prepared-foods: "And don't miss our $6 fresh Sushi Specials every Tuesday."
    // None is near Reston. Undated standing specials: re-check monthly.
    { until: "2026-12-31", dow: 3, deal: { "brand":"Raley's","cat":"Sushi","color":"#c8102e","ic":"RA","deal":"$6 Sushi Rolls","desc":"Select rolls, usually $7.49 to $11.99. Needs a free Something Extra account.","tags":[],"value":3,"expires":"Wednesdays only","url":"https://www.raleys.com/category/PMC271/sushi","best":false,"region":"CA & NV" } },
    { until: "2026-12-31", dow: 3, deal: { "brand":"Lunds & Byerlys","cat":"Sushi","color":"#00573d","ic":"LB","deal":"$3 Off Sushi Rolls","desc":"Hissho rolls drop to $5.99 to $6.99, in store or online.","tags":[],"value":4,"expires":"Wednesdays only","url":"https://www.lundsandbyerlys.com/daily-deals","best":false,"region":"Minnesota (Twin Cities)","est_savings":3 } },
    { until: "2026-12-31", dow: 3, deal: { "brand":"Heinen's","cat":"Sushi","color":"#7a1f2b","ic":"HN","deal":"$6 Sushi Rolls","desc":"Select rolls marked with a $6 sticker. No membership needed.","tags":[],"value":3,"expires":"Wednesdays only","url":"https://www.heinens.com/weekday-meal-deals/","best":false,"region":"Ohio & Illinois" } },
    { until: "2026-12-31", dow: 3, deal: { "brand":"Earth Fare","cat":"Sushi","color":"#d2232a","ic":"EF","deal":"$5.99 Sushi","desc":"Select fresh sushi at stores with a sushi case.","tags":[],"value":3,"expires":"Wednesdays only","url":"https://www.earthfare.com/daily-deals/","best":false,"region":"NC, SC, VA, TN, FL & GA" } },
    { until: "2026-12-31", dow: 2, deal: { "brand":"Rouses Markets","cat":"Sushi","color":"#d2232a","ic":"RM","deal":"$6 Sushi Specials","desc":"At Rouses sushi counters. Check the case for which rolls.","tags":[],"value":3,"expires":"Tuesdays only","url":"https://www.rouses.com/our-food/prepared-foods/","best":false,"region":"LA, MS & AL" } },
    // Moe's, read from the terms on moes.com/offers on 2026-11-16:
    // "Black Friday - BOGO Entrees. Offer valid in store on 11/27/26 for Buy one Entree (Burritos, Bowls, Stacks, Nachos,
    //   Quesadillas, Three Tacos, Salads, Loaded Fries or Grilled Burrito Dippers (2 ct.); excludes Moe Value Meal, One Taco,
    //   Kids Meals ...), receive a second Entree on Us ... Discount applies to item of least value. Single use. Redeeming online
    //   requires a Moe Rewards account ... Must mention offer at checkout to redeem in store." and "Offer valid for Moe Rewards
    //   Members from 11/27 - 11/29/26".
    // "Black Friday Gift Card. Starting 11/22/26 ... through 11/30/26 ... each online purchase of $25 in Gift Cards or eGift
    //   Cards ... will entitle the purchaser to three (3) $5 Reward Codes."
    // "Welcome to Moe's Day. Offer valid at participating locations on 12/9. Receive a $6 Burrito or Bowl (includes Regular
    //   Burritos, Bowls, and Jr. Burritos; excludes Homewrecker ..., Moe Protein ...). Limit of two (2) ... in-store, online, or
    //   in the Moe's Southwest Grill app." The page gives no year for 12/9: re-read it on Dec 7-8 before the day.
    // Moe's Black Friday gift card bonus removed 2026-11-17: owner asked for no gift card deals.
    // DC-area taco specials, read on the restaurants' own pages on 2026-11-16 (owner is in Reston and tests deals in person):
    // Surfside, surfsidedc.com/weekly-specials: "TACO TUESDAY. Buy two tacos and get the third one for FREE! Offer available
    //   for dine-in or take-out. NOT available for online ordering through Doordash or our website. EVERY TUESDAY". Locations:
    //   McLean (6218 Old Dominion Dr), Wharf, Dupont, Tenleytown. Page footer says 2025, so the card says to confirm.
    // Bandit Taco, bandittacodc.com specials page: "Tuesday November 17th. Taco Tuesday Special! Come join us for $2.75 taco
    //   specials each and every Tuesday!" Tacos are $4.00-$4.75 on the Tenleytown ordering page. U Street, Tenleytown,
    //   Leesburg, College Park.
    // Taco Rock, thetacorock.com/specials ("dine-in specials every day"): "Taco Tuesdays: Buy 3 Specialty Tacos, get 1 Classic
    //   Taco FREE"; "Fajita Fridays: $3 off Fajitas". Alexandria, Rosslyn, Falls Church, Oakton, Lorton.
    { until: "2026-12-31", dow: 2, deal: { "brand":"Surfside","cat":"Mexican","color":"#1ba3c6","ic":"SF","deal":"Buy 2 Tacos, Get 1 Free","desc":"Order at the counter, dine-in or take-out. Not valid online. Confirm at the register.","tags":["free"],"value":4,"expires":"Tuesdays only","url":"https://surfsidedc.com/weekly-specials/","best":false,"region":"DC & McLean, VA","est_savings":5 } },
    { until: "2026-12-31", dow: 2, deal: { "brand":"Bandit Taco","cat":"Mexican","color":"#d94f30","ic":"BT","deal":"$2.75 Tacos","desc":"The day's featured tacos, usually $4 to $4.75.","tags":[],"value":4,"expires":"Tuesdays only","url":"https://bandittacodc.com/washington-bandit-taco-happy-hours-specials","best":false,"region":"DC, Leesburg VA & College Park MD","est_savings":4 } },
    { until: "2026-12-31", dow: 2, deal: { "brand":"Taco Rock","cat":"Mexican","color":"#111111","ic":"TR","deal":"Buy 3 Tacos, Get 1 Free","desc":"Buy three specialty tacos and get a classic taco free. Dine-in only.","tags":["free"],"value":3,"expires":"Tuesdays only","url":"https://www.thetacorock.com/specials","best":false,"region":"Northern Virginia only","est_savings":4 } },
    { until: "2026-12-31", dow: 5, deal: { "brand":"Taco Rock","cat":"Mexican","color":"#111111","ic":"TR","deal":"$3 Off Fajitas","desc":"Dine-in only at Taco Rock's five Northern Virginia restaurants.","tags":[],"value":3,"expires":"Fridays only","url":"https://www.thetacorock.com/specials","best":false,"region":"Northern Virginia only","est_savings":3 } },
    // Pita Way, read from pitaway.com/specials on 2026-11-16 (56 locations: MI 47, OH 4, TN 3, IN 2): "MONDAY: LEGACY BOWL &
    // DRINK $9.99 ... Mondays only, online ordering"; "TUESDAY: DETROIT COMBO ... $9.99 ... Tuesdays only, online ordering";
    // "WEEKEND MINI COMBO $34.99 ... Serves up to 4 people. Regularly priced at $49.99. Available for pickup and delivery on
    // weekends only"; "KIDS EAT FREE! kids 12 and under eat free with every adult entree ... Dine-in only". A sweep the same
    // day saw the Monday item live on the Ann Arbor ordering menu, where a Legacy Bowl alone is $12.99. Undated page:
    // re-check monthly. All four run alongside each other so the standing kids card never blocks a day card.
    { until: "2026-12-31", alongside: true, deal: { "brand":"Pita Way","cat":"Mediterranean","color":"#e4572e","ic":"PW","tags":["free"],"best":false,"region":"MI, OH, TN & IN","url":"https://pitaway.com/specials","deal":"Kids Eat Free","desc":"Up to two free kids bowls per adult entree, ages 12 and under. Dine-in only.","value":4,"expires":"Ongoing","est_savings":6.5 } },
    { until: "2026-12-31", dow: 1, alongside: true, deal: { "brand":"Pita Way","cat":"Mediterranean","color":"#e4572e","ic":"PW","tags":[],"best":false,"region":"MI, OH, TN & IN","url":"https://pitaway.com/specials","deal":"Bowl and a Drink for $9.99","desc":"A Legacy Bowl, usually $12.99 on its own. Online or app orders only.","value":4,"expires":"Mondays only","est_savings":5 } },
    { until: "2026-12-31", dow: 2, alongside: true, deal: { "brand":"Pita Way","cat":"Mediterranean","color":"#e4572e","ic":"PW","tags":[],"best":false,"region":"MI, OH, TN & IN","url":"https://pitaway.com/specials","deal":"Pita, Side and a Drink for $9.99","desc":"A Detroit pita with hummus or fries and a drink. Online or app orders only.","value":4,"expires":"Tuesdays only","est_savings":5 } },
    { until: "2026-12-31", dow: [6, 0], alongside: true, deal: { "brand":"Pita Way","cat":"Mediterranean","color":"#e4572e","ic":"PW","tags":[],"best":false,"region":"MI, OH, TN & IN","url":"https://pitaway.com/specials","deal":"Platter for Four for $34.99","desc":"The Mini Combo Platter, usually $49.99. Pickup or delivery.","value":4,"expires":"Saturdays and Sundays only","est_savings":15 } },
    // Starbucks Red Cup Day, read from about.starbucks.com/stories/2026/starbucks-red-cup-day-2026 on 2026-11-16: "a free 2026
    // limited-edition reusable red cup with the purchase of a handcrafted holiday beverage on Nov. 17 at participating U.S.
    // Starbucks coffeehouses, while supplies last ... cafe and drive-thru, the Starbucks app and Starbucks delivery." No
    // account needed. One-day card, shows Nov 17 only.
    { from: "2026-11-17", until: "2026-11-17", alongside: true, deal: { "brand":"Starbucks","cat":"Coffee","color":"#00704a","ic":"SB","deal":"Red Cup Day: Free Reusable Holiday Cup with Any Handcrafted Holiday Drink","desc":"Tuesday, November 17 only: order any size handcrafted holiday or fall beverage, hot, iced or blended, and get a free 16 oz reusable red cup, while supplies last. Works in the cafe, the drive-thru, the Starbucks app and Starbucks delivery; no account needed. Brewed Christmas Blend coffee does not count. Cups usually run out by midday, so go early. Stated on Starbucks' own Red Cup Day page.","tags":["free"],"value":3,"expires":"November 17, 2026 only","url":"https://about.starbucks.com/stories/2026/starbucks-red-cup-day-2026/","best":false,"region":"National","est_savings":3 } },
    // Saladworks $6.99 Monday bowl, read from order.saladworks.com/menu/saladworks-fairfax on Monday 2026-11-16: menu category
    // "6.99 BYO Bowl", item "6.99 Build Your Own Bowl", $6.99, "Mondays just got better! Build your own 16 oz. bowl for
    // $6.99! Choose 1 base, 1 granola, 1 fruit + banana, and 1 topping." The category only renders on Mondays. A research
    // sweep on 2026-11-13 found it at 14 of 81 stores: VA Fairfax, Virginia Beach, Chesterfield, Newport News; NJ Menlo Park
    // Mall, Newark; PA West Chester; DE Middletown; FL Riverview, Stuart; NC Winterville; TN Spring Hill; TX Los Patios,
    // League City. Only Fairfax was verified first-hand. Shows Mondays only.
    { until: "2026-12-31", dow: 1, deal: { "brand":"Saladworks","cat":"Bowls","color":"#6ba539","ic":"SW","deal":"$6.99 Build Your Own Acai Bowl","desc":"At 14 stores that serve Frutta Bowls, including Fairfax. Usually $9.99 to $11.99.","tags":[],"value":4,"expires":"Mondays only","url":"https://order.saladworks.com/menu/saladworks-fairfax","best":false,"region":"Some stores only: VA, NJ, PA, DE, FL, NC, TN, TX","est_savings":4 } },
    // Roots Natural Kitchen kids eat free, read from rootsnaturalkitchen.com/locations/fairfax on 2026-11-15: a "Kids Eat Free"
    // badge with the HTML terms "With purchase of adult bowl. Child must be under 12 and present." in the footer of every page.
    // 23 locations (VA 9 incl. Fairfax, 9444 Fairfax Blvd; PA 7; OH 3; NC 2; DE 1; WV 1). Standing, no days stated: re-check monthly.
    { until: "2026-12-31", deal: { "brand":"Roots Natural Kitchen","cat":"Bowls","color":"#5b8c3e","ic":"RN","deal":"Kids Eat Free","desc":"One child under 12 eats free with each adult bowl. The child must be with you.","tags":["free"],"value":4,"expires":"Ongoing","url":"https://www.rootsnaturalkitchen.com/locations/","best":false,"region":"VA, PA, OH, NC, DE & WV","est_savings":7 } },
    // Pancheros, read from pancheros.com homepage on 2026-11-15: "GIVE THANKS. GET $5 OFF! ... Enjoy $5 off a $10+ order all
    // November long with code THANK5 in the Pancheros app." 75 locations in 12 states (IA 28, NJ 10, MN 9, MO 7 ...).
    { until: "2026-11-30", deal: { "brand":"Pancheros Mexican Grill","cat":"Mexican","color":"#c8102e","ic":"PA","deal":"$5 Off a $10 Order","desc":"Enter code THANK5 in the Pancheros app (free account).","tags":["code","app"],"value":5,"expires":"Through November 30, 2026","url":"https://pancheros.com/","best":false,"region":"12 states (IA, NJ, MN, MO & Midwest)","est_savings":5 } },
    // Cowboy Chicken, read from cowboychicken.com/kids-corral on 2026-11-15: "KIDS EAT FREE! AFTER 4PM ON MONDAY* *In store only.
    // One free kids meal with the purchase of an adult entree. Ages 10 and under. Limit 4 free kids meals per transaction."
    // 19 locations (TX 14, OK 3, GA 1, FL 1). Wood-fired rotisserie chicken. Shows Mondays only.
    { until: "2026-12-31", dow: 1, deal: { "brand":"Cowboy Chicken","cat":"Chicken","color":"#b5651d","ic":"CC","deal":"Kids Eat Free After 4 PM","desc":"One free kids meal per adult entree, ages 10 and under. Dine-in only.","tags":["free"],"value":4,"expires":"Mondays only, after 4 PM","url":"https://www.cowboychicken.com/kids-corral/","best":false,"region":"TX, OK, GA & FL","est_savings":6 } },
    // Protein Bar & Kitchen, read from theproteinbar.com homepage on 2026-11-15: "THIRSTY THURSDAY. Every Thursday, sip on a
    // different shake for just $6. PBK Rewards exclusive." 13 locations (12 Illinois, 1 Houston). Shows Thursdays only.
    { until: "2026-12-31", dow: 4, deal: { "brand":"Protein Bar & Kitchen","cat":"Smoothies","color":"#00a79d","ic":"PB","deal":"$6 Protein Shake","desc":"The week's featured shake for PBK Rewards members (free account).","tags":["app"],"value":3,"expires":"Thursdays only","url":"https://www.theproteinbar.com/","best":false,"region":"IL & TX (Chicago area and Houston airport)","est_savings":3 } },
    // Just Salad grand openings, read from justsalad.com/grandopening on 2026-11-15: "$5 Meals. Get a $5 chef-designed salad,
    // wrap, warm bowl, or market plate. In-store only at 280 W. Main Street, Unit #100 [Freehold, New Jersey]. From 11/20/2026 -
    // 11/21/2026 ... One per person." Same terms at 3085 Sheridan Drive, Suite #410, Amherst (Station Twelve). Two stores only.
    { from: "2026-11-20", until: "2026-11-21", alongside: true, deal: { "brand":"Just Salad","cat":"Salads","color":"#f15a29","ic":"JS","deal":"$5 Salads, Wraps and Bowls","desc":"November 20 and 21 at the new Freehold, NJ and Amherst, NY stores. One per person, in store.","tags":[],"value":5,"expires":"November 20 to 21, 2026","url":"https://www.justsalad.com/grandopening","best":false,"region":"Freehold, NJ & Amherst, NY only","est_savings":8 } },
    // Bento Asian Kitchen + Sushi, read from eatatbento.com/specials on 2026-11-14: "$5 SUSHI ROLLS, EVERY WEDNESDAY! Enjoy
    // fresh, made-to-order rolls, every Wednesday at select locations. In-store only. Spicy Tuna Roll-$5, Mex Roll-$5, Florida
    // Roll-$5, Veggie Roll-$5, Cali Roll-$5". 13 Florida locations; the page does not name the select locations. Shows
    // Wednesdays only. Owner asked for more poke and sushi places (2026-11-13).
    { until: "2026-12-31", dow: 3, deal: { brand: "Bento Asian Kitchen + Sushi", cat: "Sushi", color: "#e03a3e", ic: "BE", deal: "$5 Sushi Rolls", desc: "Spicy Tuna, California, Veggie, Florida and Mex rolls, in store at select locations. Ask before ordering.", tags: [], value: 4, expires: "Wednesdays only", url: "https://www.eatatbento.com/specials", best: false, region: "Florida only", est_savings: 3 } },
    // Blue Sushi Sake Grill, read from bluesushisakegrill.com/daily-specials on 2026-11-14: "VEGAN & SAKE TUESDAY. 25% OFF VEGAN
    // ITEMS (VG). all day. all vegan items. every tuesday." 24 full-service restaurants in 13 states. Shows Tuesdays only.
    { until: "2026-12-31", dow: 2, deal: { brand: "Blue Sushi Sake Grill", cat: "Sushi", color: "#1b75bc", ic: "BS", deal: "25% Off Vegan Sushi and Dishes", desc: "Every vegan item on the menu, all day, dine-in.", tags: [], value: 3, expires: "Tuesdays only", url: "https://bluesushisakegrill.com/daily-specials", best: false, region: "13 states (Midwest, TX, CO, AZ & South)", est_savings: 5 } },
    // Nando's PERi Buffalo Meal Deal, read from nandosperiperi.com/promotions/peri-buffalo on 2026-11-13: "Your choice of either
    // 6 PERi Buffalo wings or PERi Buffalo Pulled Chicken Sandwich + PERi Chips + Fountain Drink for $11.99 ... Here for now,
    // gone before OT." The sandwich alone is $10.00 on the same page. Limited time, no end date: re-check by 2026-12-15.
    { until: "2026-12-15", alongside: true, deal: { brand: "Nando's PERi-PERi", cat: "Chicken", color: "#d32a2a", ic: "N", deal: "Sandwich or Wings Meal for $11.99", desc: "A PERi Buffalo sandwich or six wings with chips and a drink. The sandwich alone is $10.", tags: [], value: 4, expires: "Limited time", url: "https://www.nandosperiperi.com/promotions/peri-buffalo", best: false, region: "DC, MD, VA, IL, TX & GA", est_savings: 5 } },
    // Blowfish Poke Monday special, read from blowfishpoke.com homepage ("Weekly Specials") on 2026-11-13: "Make Mondays
    // marvelous with our $9 regular size Poke bowls special, available at both our Clarksville and Marriottsville locations."
    // Regular bowl is $14.00 on blowfishpoke.com/menu/clarksville. Four locations (Clarksville, Marriottsville, Annapolis MD and
    // Washington DC); the special is only at the first two. Owner asked for more poke places (2026-11-13). Undated: re-check
    // monthly. Shows Mondays only.
    { until: "2026-12-31", dow: 1, deal: { brand: "Blowfish Poke", cat: "Poke", color: "#0e8fb5", ic: "BP", deal: "$9 Poke Bowl", desc: "A regular bowl, usually $14, at the Clarksville and Marriottsville, Maryland shops.", tags: [], value: 5, expires: "Mondays only", url: "https://blowfishpoke.com/", best: false, region: "Maryland only (Clarksville & Marriottsville)", est_savings: 5 } },
    // Freebirds World Burrito weekly lineup, read from the freebirds.com homepage banners on 2026-11-11 (banner images
    // wp-content/uploads/2026/10/2.png, 5.png, 8-1.png, 15-2.png): "$10 MONSTER MONDAYS BURRITOS & BOWLS. AVAILABLE IN-STORE WITH
    // MENTION OR ONLINE"; "TACO TUESDAY 2 TACOS + REG. CHIPS & DIP + REG. FOUNTAIN DRINK $8.00 FOR REWARDS MEMBERS $9.99 FOR
    // NON-REWARDS MEMBERS"; "ALL DAY FAMILY FRIDAY $40 MEAL KITS ... BUILD 5 BURRITOS OR 10 TACOS"; "KIDS EAT FREE all day
    // SATURDAY - SUNDAY. KIDS UNDER 12 EAT FREE WITH ADULT ENTREE PURCHASE IN-STORE OR ONLINE ... ONLINE CODE: KIDSEATFREE".
    // Texas-only chain. Standing weekday specials (owner exception 2026-09-30); each shows on its day only. No end dates.
    { until: "2026-12-31", dow: 1, deal: { brand: "Freebirds World Burrito", cat: "Mexican", color: "#f47b20", ic: "FB", deal: "$10 Monster Burrito or Bowl", desc: "The large size, usually about $14.75. Mention the deal in store, or order online.", tags: [], value: 4, expires: "Mondays only", url: "https://freebirds.com/", best: false, region: "Texas only", est_savings: 4.75 } },
    { until: "2026-12-31", dow: 2, deal: { brand: "Freebirds World Burrito", cat: "Mexican", color: "#f47b20", ic: "FB", deal: "2 Tacos, Chips and a Drink for $8", desc: "For Freebirds Rewards members (free account); $9.99 without one.", tags: ["app"], value: 4, expires: "Tuesdays only", url: "https://freebirds.com/", best: false, region: "Texas only", est_savings: 4 } },
    { until: "2026-12-31", dow: 5, deal: { brand: "Freebirds World Burrito", cat: "Mexican", color: "#f47b20", ic: "FB", deal: "$40 Meal Kit for Five", desc: "Builds five burritos or ten tacos. Mention the deal in store, or order online.", tags: [], value: 4, expires: "Fridays only", url: "https://freebirds.com/", best: false, region: "Texas only", est_savings: 10 } },
    { until: "2026-12-31", dow: [6, 0], deal: { brand: "Freebirds World Burrito", cat: "Mexican", color: "#f47b20", ic: "FB", deal: "Kids Eat Free", desc: "Kids under 12 with an adult entree. Online, use code KIDSEATFREE.", tags: ["code", "free"], value: 4, expires: "Saturdays and Sundays only", url: "https://freebirds.com/", best: false, region: "Texas only", est_savings: 6 } },
    // The Great Greek BOGO, read from the chain's own ordering page for Byron Center, MI on 2026-11-11 (also on the Ann Arbor,
    // West Bloomfield, Troy and Allen Park pages; not on the SC page or the corporate homepage): "Buy One, Get One FREE Items.
    // Valid on qualifying items for a limited time. Use promo code BOGO at checkout. Must add two qualifying items from the
    // same category (Appetizers, Sandwiches, or Trays). Cannot mix categories. Limit one BOGO offer per order." No end date:
    // re-check monthly.
    { until: "2026-12-31", deal: { brand: "The Great Greek Mediterranean Grill", cat: "Mediterranean", color: "#1f5fa8", ic: "GG", deal: "Buy One Gyro or Pita, Get One Free", desc: "Online orders at Michigan locations. Add two from the same category and enter code BOGO.", tags: ["code", "free"], value: 5, expires: "Limited time", url: "https://orders.thegreatgreekgrill.com/menu/the-great-greek-mediterranean-grill-byron-center-mi", best: false, region: "Michigan only", est_savings: 12 } },
    // Corner Bakery Choose Two, read from cornerbakerycafe.com/offers on 2026-11-10 (Fair Oaks VA and Capitol Hill DC selected):
    // "Choose Two for $8.99 - Any Half Pasta - Any Half Salad - Any Half Sandwich - Any Half Soup - Plus A Side of Your Choice.
    // Any Choose Two Combo all day. Use Code 1551 at online checkout or mention in-store to redeem. Offer not valid on
    // third-party delivery sites. Valid at selected location only. Promo code required. Limited-time offer." Offers are per
    // cafe: $8.99/1551 at cafes in DC, GA, IL, MD, PA, TN, TX and VA (Fair Oaks; not Innsbrook); most CA cafes show $9.99 with
    // code 806; CO/OR/UT/WA show a Tuesday-only $10.99. No end date: re-check the page monthly.
    // Retired 2026-11-23/24: Corner Bakery "Pick Two Plus a Side for $8.99" (code 1551). A bakery-cafe like Panera, which the owner
    // does not count as healthy, and the saving is about $3, under the value bar.
    // Moe's Birria Dipper, read from moes.com homepage on 2026-11-09: "Moe Rewards members can try a Grilled Burrito Dipper
    // with Birria on us with any purchase thru Nov. 22nd." Fine print (moes.com/media/birria): "From 11/4 - 11/22/2026 select
    // Moe Rewards members can get one (1) Grilled Burrito Dipper (1 ct.) on us with any purchase ... single use ... participating
    // locations." Was rejected Nov 4 when only Sporked reported it; the chain now states it. alongside: Moe Monday also runs.
    // Retired 2026-11-20 (owner: deals must be easy to claim and give real value). Moe's free birria dipper: only select members get it.
    // Chipotle "Tatted Like a Chipotle Bag" BOGO, read from newsroom.chipotle.com (Nov 9, 2026 release) on 2026-11-09:
    // "Valid only on November 13, 2026, from 3 to 4 p.m. local time. Redeemable in-restaurant only ... Permanent ink, temporary
    // tattoos and drawn-on designs all count." One-day deal, shows Nov 13 only.
    { from: "2026-11-13", until: "2026-11-13", deal: { brand: "Chipotle", cat: "Mexican", color: "#a81612", ic: "Ch", deal: "Friday the 13th Tattoo BOGO: Buy One Entree, Get One Free, 3 to 4 PM", desc: "Friday, November 13, from 3 to 4 PM local time only: show any tattoo at the register (a real one, a temporary one or a drawn-on one all count) and get a second entree of equal or lesser value free with each entree you buy, up to five free per check. In-restaurant only at participating U.S. and Canada locations; no account needed; not valid on app, online, delivery or catering orders, and kids' meals do not count as the purchased entree. Stated in Chipotle's own November 9 newsroom release.", tags: ["free"], value: 5, expires: "November 13, 2026, 3 to 4 PM only", url: "https://newsroom.chipotle.com/2026-11-09-CHIPOTLE-BRINGS-BACK-RECORD-BREAKING-TATTED-LIKE-A-CHIPOTLE-BAG-BOGO-ON-FRIDAY,-NOVEMBER-13", best: true, region: "National", est_savings: 11 } },
    // Schlotzsky's weekend pizzas, read from schlotzskys.com/offers on 2026-11-06: "Pizzas Starting at $5 after 5pm - Friday,
    // Saturday and Sunday ... Core Pizzas: $5 (Double Cheese, Pepperoni & Double Cheese), Premium Pizzas: $7 (Meaty, Supreme,
    // Veggie, BBQ Chicken & Jalapeno) after 5PM on Fri-Sun ... select locations while supplies last." Standing weekend special
    // of an approved chain (owner exception 2026-09-30); shows Fri/Sat/Sun only.
    // Retired 2026-11-23: pizza is not a healthy item (owner rule of 2026-09-07; owner asked again for quality healthy deals). Was: $5 and $7 Pizzas After 5 PM
    // Luna Grill Medi Mondays, read from lunagrill.com/rewards on 2026-11-06: "Club Luna members may choose from $5 off Build
    // Your Own Bowl or $10 off Family Meals every Monday." Free account; offer lives in the app. Shows Mondays only.
    { until: "2026-12-31", dow: 1, alongside: true, deal: { brand: "Luna Grill", cat: "Mediterranean", color: "#f26522", ic: "LG", deal: "$5 Off a Bowl or $10 Off a Family Meal", desc: "For Club Luna members (free account), in the Luna Grill app.", tags: ["app"], value: 4, expires: "Mondays only", url: "https://lunagrill.com/rewards/", best: false, region: "SoCal & Texas", est_savings: 5 } },
    // Yoshinoya coupons, read from yoshinoyaamerica.com/coupons on 2026-11-05 (coupon images on the chain's own site): "$5 OFF
    // 2 REGULAR RICE BOWLS" code CE41FLDF, "Add (2) Regular Bowls to cart to redeem ... Not valid on ribeye, salmon, or limited
    // time menu items ... valid in-store, online, or in-app ... Valid at participating locations." No end date printed; the
    // same page also carries $5 off 2 large (CRSA6MCE) or 2 combo bowls (C6Z88J4A) and 20%/25%/30% off $20/$25/$30 (up to $10).
    // Re-check the page monthly.
    { until: "2026-12-31", deal: { brand: "Yoshinoya", cat: "Asian", color: "#f58220", ic: "Y", deal: "$5 Off Two Rice Bowls", desc: "Regular chicken, beef or veggie bowls. Enter code CE41FLDF in store, online or in the app.", tags: ["code"], value: 4, expires: "Ongoing", url: "https://www.yoshinoyaamerica.com/coupons/", best: false, region: "California only", est_savings: 5 } },
    // Mezeh free delivery, read from mezeh.com homepage on 2026-11-05: "free delivery on every order / now through the end of
    // 2026 / ORDER NOW" (Mezeh's own app and site). No minimum stated. Mid-Atlantic Mediterranean chain (Herndon/Sterling VA).
    // Retired 2026-11-20 (owner: deals must be easy to claim and give real value). Mezeh free delivery: not a discount on food.
    // Schlotzsky's BOGO Wednesday, read from schlotzskys.com/about-us/faqs (BOGO Wednesdays terms) on 2026-11-04:
    // "Participating stores only. Available all day every Wednesday. Excludes kids pizzas. Free pizza, calzone, flatbread is
    // of equal or lesser value ... Cannot be combined with any other offer." Standing weekly special of an approved chain
    // (owner exception 2026-09-30); shows Wednesdays only.
    // Retired 2026-11-23: pizza is not a healthy item (owner rule of 2026-09-07; owner asked again for quality healthy deals). Was: Buy One Pizza, Get One Free
    // Flame Broiler Double Fire Deal, read from flamebroilerusa.com homepage on 2026-11-04: "Two charbroiled chicken or tofu
    // bowls with two add-ons for just $20. Available for a limited time at participating locations." No end date: re-check
    // the homepage before 2026-11-30 and extend or drop.
    { until: "2026-11-30", deal: { brand: "Flame Broiler", cat: "Bowls", color: "#d62e1f", ic: "FB", deal: "Two Bowls with Add-Ons for $20", desc: "Two chicken or tofu bowls plus two add-ons. Bowls are usually $11 to $12 each.", tags: [], value: 3, expires: "Limited time", url: "https://flamebroilerusa.com/", best: false, region: "CA & Southwest", est_savings: 6 } },
    // Playa Bowls free cold brew, read from playabowls.com/policies/current-promotions on 2026-11-04: "Receive a free 16oz
    // Playola Cold Brew or 16oz Sweet Cream Cold Brew with the purchase of a Chocolate Coconut Joy Bowl or Chocolate Covered
    // Strawberry Bowl ... Valid only from 11/9/2026 to 11/13/2026 ... Must be a Playa Rewards Loyalty member to redeem."
    { from: "2026-11-09", until: "2026-11-13", deal: { brand: "Playa Bowls", cat: "Bowls", color: "#1aa3a0", ic: "PB", deal: "Free 16 oz Cold Brew with a Chocolate Coconut Joy or Chocolate Covered Strawberry Bowl for Playa Rewards Members", desc: "Monday, November 9 through Friday, November 13: Playa Rewards members (free account) get a free 16 oz Playola or Sweet Cream Cold Brew with the purchase of a Chocolate Coconut Joy Bowl or Chocolate Covered Strawberry Bowl, in the shop, on playabowls.com or in the app for pickup. One redemption per member, modifiers extra, not valid on third-party delivery; participating shops while supplies last. Stated on Playa Bowls' own current-promotions page.", tags: ["app", "free"], value: 3, expires: "November 9 to 13, 2026", url: "https://www.playabowls.com/policies/current-promotions", best: false, region: "East Coast", est_savings: 5 } },
    // Teriyaki Madness National Chicken Teriyaki Day, read from teriyakimadness.com/national-chicken-teriyaki-day on
    // 2026-11-04: "FREE Chicken Teriyaki Bowl with the purchase of a 2nd bowl offer on Friday, Dec. 11, 2026", sent to Mad
    // Rewards members signed up by Dec 10 (footnote still carries 2025 dates). Re-verify Dec 9-10 before it shows.
    { from: "2026-12-11", until: "2026-12-11", deal: { brand: "Teriyaki Madness", cat: "Asian", color: "#e4002b", ic: "TM", deal: "Free Chicken Teriyaki Bowl", desc: "With any regular or large bowl for Mad Rewards members (free account; join by December 10).", tags: ["app", "free"], value: 4, expires: "December 11, 2026 only", url: "https://teriyakimadness.com/national-chicken-teriyaki-day/", best: false, region: "30+ states (West, Mountain, Midwest & South)", est_savings: 10 } },
    // Qdoba National Nacho Day, read from qdoba.com homepage on 2026-11-04: "$7 Chicken Nachos, 11/6 Only ... Use code
    // NACHODAY online at check-out or mention the promo in-restaurant." No account needed. One-day deal, shows Nov 6 only.
    { from: "2026-11-06", until: "2026-11-06", deal: { brand: "Qdoba", cat: "Mexican", color: "#8c1d40", ic: "Q", deal: "National Nacho Day: $7 Chicken Nachos with Code NACHODAY", desc: "Friday, November 6 only: an adult-size Create Your Own Nachos with Flame-Grilled Adobo Chicken or the new Chicken Tinga for $7. Use promo code NACHODAY at online or app checkout, or mention the promo in the restaurant; no account needed. One per customer, not valid on delivery or catering, cannot be combined with Rewards wallet items; participating U.S. and Puerto Rico locations. The code is printed on qdoba.com's homepage.", tags: ["code"], value: 4, expires: "November 6, 2026 only", url: "https://www.qdoba.com/", best: false, region: "National", est_savings: 5 } },
    // Nando's $1 bottomless drinks for PERi-Perks members, re-read on nandosperiperi.com/promotions and the homepage
    // on 2026-11-03 ("Join PERi-Perks and unlock $1 Bottomless Drinks with your meal"; no end date). The refresh had
    // found it on 11/1 and 11/2 but, being undated, it is never carried over, so it vanished on 11/3. Standing
    // injection until the chain pulls it. Regional chain: never National, never best.
    // Retired 2026-11-20 (owner: deals must be easy to claim and give real value). Nando's $1 fountain drink: a drink add-on, not a meal deal.
    // Jimmy John's National Sandwich Day BOGO, read from the jimmyjohns.com homepage pop-up on 2026-11-03: "JJ Rewards
    // members ... Today only, buy one Sandwich or Wrap and get a second on us with the promo code Sandwich." Terms:
    // "Valid for JJ Rewards members on web/app 11/3. Buy any 8\" Original, Favorite, Toasted (excl. Brisket), Plain
    // Slim, Little John, or Wrap & get one free with code: Sandwich. Limit 1." Free account; national chain.
    { from: "2026-11-03", until: "2026-11-03", deal: { brand: "Jimmy John's", cat: "Sandwiches", color: "#c8102e", ic: "JJ", deal: "National Sandwich Day: Buy One Sandwich or Wrap, Get One Free with Code SANDWICH for JJ Rewards Members", desc: "Tuesday, November 3 only: buy any 8-inch Original, Favorite, Toasted (except Brisket), Plain Slim, Little John or Wrap on jimmyjohns.com or in the app, signed in to a free JJ Rewards account, and get a second free with promo code SANDWICH. Limit one; online and app orders only; not valid with other offers, rewards or combos; add-ons, fees and tax extra. The code is in Jimmy John's own homepage announcement.", tags: ["code", "app", "free"], value: 4, expires: "November 3, 2026 only", url: "https://www.jimmyjohns.com/", best: false, region: "National", est_savings: 9 } },
    // Capriotti's National Sandwich Day, read from capriottis.com/page/deals (web.capriottis.com/deals) on 2026-11-02:
    // "In celebration of National Sandwich Day on Tuesday, November 3, Rewards Members get Buy One, Get One 50% Off ALL
    // subs - for one day only." Terms: "Valid 11/3/26 only ... second sub of equal or lesser value at 50% off. Cooper
    // Sharp Cheesesteak and Wagyu subs are excluded ... registered account. No Guest Checkouts ... one-time use". Free
    // Capriotti's Rewards account. 33-state chain: never National, never best.
    { from: "2026-11-03", until: "2026-11-03", deal: { brand: "Capriotti's", cat: "Sandwiches", color: "#a3202d", ic: "CP", deal: "National Sandwich Day: Buy One Sub, Get One 50% Off for Capriotti's Rewards Members", desc: "Tuesday, November 3 only: buy any full-price sub and get a second of equal or lesser value half off, for Capriotti's Rewards members (free account), ordering signed in online or in the app with the offer applied at checkout, no guest checkout. Excludes the Cooper Sharp Cheesesteak and Wagyu subs; add-ons extra; one-time use; not valid on party trays, catering or third-party delivery; participating locations while supplies last. Stated on Capriotti's own deals page.", tags: ["app"], value: 4, expires: "November 3, 2026 only", url: "https://capriottis.com/page/deals", best: false, region: "33 states (NV, AZ, CA, Mid-Atlantic & Midwest)", est_savings: 6 } },
    // Noodles & Company 2 for $12 Culinary Classics, read from noodles.com/offers-terms-conditions on 2026-11-02:
    // "Offer valid 11/6/2026 - 11/10/2026 only ... Noodles Rewards members who purchase two regular-sized Culinary
    // Classics entrées ... can receive both for a combined price of $12 ... reward must be applied on the 'my cart'
    // screen ... Limit one reward redemption per Rewards member during the Promotion Period." Free account, no code.
    // "alongside" because the RAMEN7 card (carried over daily through 11/15) already occupies the brand.
    { from: "2026-11-06", until: "2026-11-10", alongside: true, deal: { brand: "Noodles & Company", cat: "Noodles", color: "#a6192e", ic: "N", deal: "2 for $12 Culinary Classics Entrees for Noodles Rewards Members", desc: "Friday, November 6 through Tuesday, November 10: two regular-size Culinary Classics entrees (Creamy Cheddar Mac & Cheese, Baked Mac, Gochujang Carbonara Ramen and the rest of the line) for $12 together, for Noodles Rewards members (free account). Order signed in on noodles.com or in the app and apply the reward on the cart screen; one redemption per member during the promotion. Not valid on third-party delivery, call-in or catering orders; participating locations. Stated on Noodles' own offers terms page.", tags: ["app"], value: 4, expires: "November 6 to 10, 2026", url: "https://www.noodles.com/offers-terms-conditions", best: false, region: "National", est_savings: 8 } },
    // Moe Monday, read from moes.com/moemonday and the "Moe Monday Disclaimers" on moes.com/offers on 2026-11-02:
    // discounted full-size burrito or bowl for Moe Rewards members every Monday, "Pricing varies by location",
    // single use per Monday. Standing weekly special (owner exception, 2026-09-30). Not "alongside": when the
    // refresh returns its own Moe Monday card this one is skipped.
    { until: "2026-12-31", alongside: true, dow: 1, deal: { brand: "Moe's Southwest Grill", cat: "Mexican", color: "#5a9e3a", ic: "M", deal: "Discounted Burrito or Bowl", desc: "For Moe Rewards members (free account). The price varies by location, commonly $6.99 to $8.99.", tags: ["app"], value: 3, expires: "Mondays only", url: "https://www.moes.com/moemonday", best: false, region: "35 states (Southeast, Northeast & Midwest)", est_savings: 3 } },
    // Moe's National Nacho Day, read from moes.com/offers on 2026-11-02: "Offer valid in store on 11/6/26 for a
    // $5.99 Nacho Entree ... Must mention offer at check out to redeem in store" (anyone, no account) and the
    // loyalty twin "Moe Rewards Members from 11/6 - 11/8/26 for $5.99 Nacho Entrees". "alongside" so the Moe
    // Monday evergreen cannot block it on a Monday (it runs Fri-Sun, so this is belt and braces).
    { from: "2026-11-06", until: "2026-11-08", alongside: true, deal: { brand: "Moe's Southwest Grill", cat: "Mexican", color: "#5a9e3a", ic: "M", deal: "National Nacho Day: $5.99 Nachos Entree", desc: "Friday, November 6: a $5.99 Nachos entree in the restaurant for anyone who mentions the offer at checkout, no account needed. Moe Rewards members (free account) also get $5.99 Nachos entrees online or in the app from November 6 through Sunday, November 8 by applying the reward at checkout. Excludes add-ons, extras and premium proteins; single use; participating locations; not valid with other offers or third-party delivery. Stated on Moe's own offers page.", tags: ["app"], value: 4, expires: "November 6 to 8, 2026", url: "https://www.moes.com/offers", best: false, region: "35 states (Southeast, Northeast & Midwest)", est_savings: 5 } },
    // WaBa Grill Kids Eat Free, chain press release on wabagrill.com (2024-04-03, "Kids Eat Free at all Locations"):
    // "a complimentary Chicken or Tofu Mini Bowl" "with the purchase of any full-price entree" "on weekdays after
    // 4 p.m. and all day Saturday and Sunday." Homepage still carries the Kids Eat Free slide on 2026-11-01. Anyone,
    // no account. Standing offer (owner exception, 2026-09-30), shown daily; CA/AZ/NV/TX chain, never National.
    { until: "2026-12-31", deal: { brand: "Waba Grill", cat: "Bowls", color: "#e4002b", ic: "W", deal: "Kids Eat Free", desc: "A free kids mini bowl with each full-price entree, weekdays after 4 PM and all weekend.", tags: ["free"], value: 3, expires: "Weekdays after 4 PM, all day weekends", url: "https://www.wabagrill.com/", best: false, region: "CA, AZ, NV & TX", est_savings: 6 } },
    // Schlotzsky's National Sandwich Day, read from schlotzskys.com homepage banner on 2026-10-31: "NATIONAL SANDWICH DAY
    // $5 MEDIUM SANDWICHES ARE HERE. Why celebrate National Sandwich Day for just one day? Enjoy $5 Medium Sandwiches
    // Oct. 31 - Nov. 3 as a Schlotzsky's Deli Rewards member." Free account. Brand registered today (APPROVED,
    // REGIONAL_DEFAULTS, REGIONAL_ONLY, BRAND_STATES): 294 stores in 24 states, never National, never best.
    { from: "2026-10-31", until: "2026-11-03", deal: { brand: "Schlotzsky's", cat: "Sandwiches", color: "#c8202f", ic: "SZ", deal: "National Sandwich Day: $5 Medium Sandwiches for Schlotzsky's Rewards Members", desc: "October 31 through Tuesday, November 3: any medium sandwich for $5 with a free Schlotzsky's Deli Rewards account, in the restaurant or on the app. Stated on Schlotzsky's own homepage; participating locations, not combinable with other offers.", tags: ["app"], value: 4, expires: "Through November 3, 2026", url: "https://www.schlotzskys.com/", best: false, region: "24 states (TX, South & Midwest)", est_savings: 5 } },
    // Noodles & Company Halloween weekend, read from noodles.com/offers-terms on 2026-10-31: "Offer valid 10/28/2026 -
    // 11/1/2026 only ... Rewards Members enjoy $5 off $20 on their purchase. Must be signed in and have a valid Noodles
    // Rewards account ... Not valid on orders placed via third party delivery platforms, call in orders, or catering
    // orders." Free account; reward is applied on the My Cart screen. "alongside" so RAMEN7 still shows.
    { from: "2026-10-31", until: "2026-11-01", alongside: true, deal: { brand: "Noodles & Company", cat: "Noodles", color: "#a6192e", ic: "N", deal: "$5 Off Any $20 Order for Noodles Rewards Members", desc: "Through Sunday, November 1: Noodles Rewards members (free account) take $5 off any order of $20 or more on noodles.com or in the app. Sign in and apply the reward on the My Cart screen before checkout; not valid on third-party delivery, call-in or catering orders; participating locations. Terms are on Noodles' own offers page.", tags: ["app"], value: 3, expires: "Through November 1, 2026", url: "https://www.noodles.com/offers-terms-conditions", best: false, region: "National", est_savings: 5 } },
    // Rubio's Taco Tuesday, read from rubios.com/weekly-deals on 2026-10-30: "Stack up the savings every Tuesday!
    // $2.50 The Original Fish Taco or Classic Chicken Taco / $3 Fish Taco Especial or Classic Steak Taco / $10.99
    // Shrimp Trio ... *Prices may vary at some locations." Anyone, no account. Standing weekly special (owner
    // exception, 2026-09-30), Tuesdays only. "alongside" so a refresh-found Rubio's value-menu card does not block
    // it. CA/AZ/NV chain: never National, never best.
    { until: "2026-12-31", dow: 2, alongside: true, deal: { brand: "Rubio's Coastal Grill", cat: "Seafood", color: "#00a1e0", ic: "R", deal: "$2.50 Fish or Chicken Tacos", desc: "Steak and Especial tacos are $3. In the restaurant or online.", tags: [], value: 4, expires: "Tuesdays only", url: "https://rubios.com/weekly-deals/", best: false, region: "CA, AZ & NV", est_savings: 4 } },
    // Jamba Halloween code SPOOKY: mass Jamba Rewards email of 2026-10-30 ("31% off Your Online Order for
    // Halloween", every-member test passed by the noon inbox pass) and Today.com's Halloween 2026 roundup:
    // 31% off, up to $10, online or in-app orders on October 31 only, excludes catering, participating
    // locations. Shown on 10/31 only. Jamba's own homepage does not carry the code, so the email is the source.
    { from: "2026-10-31", until: "2026-10-31", deal: { brand: "Jamba", cat: "Smoothies", color: "#f58220", ic: "J", deal: "Halloween: 31% Off Online or App Orders with Code SPOOKY (Up to $10)", desc: "Halloween only: enter code SPOOKY at checkout on jamba.com or in the Jamba app for 31% off the order, up to $10, with a free Jamba Rewards account. Online and in-app orders only, excludes catering, participating locations, while supplies last. Jamba sent the code to every Rewards member by email on October 30.", tags: ["code", "app"], value: 3, expires: "October 31, 2026 only", url: "https://www.jamba.com/rewards", best: false, region: "National", est_savings: 4 } },
    // Salata code STACKED, read from salata.com (homepage promo card) on 2026-10-29: "Add a second protein to any salad
    // or wrap for $2. Use code STACKED." / "NOW THROUGH NOVEMBER 1". No account needed; the code is on the chain's own
    // page (owner's 2026-10-26 promo-code rule). Salata is TX/South: never National, never best.
    { from: "2026-10-29", until: "2026-11-01", deal: { brand: "Salata", cat: "Salads", color: "#6cb33f", ic: "S", deal: "$2 Second Protein on Any Salad or Wrap with Code STACKED", desc: "Through Sunday, November 1: double the protein on any salad or wrap for $2 instead of the usual add-on price. Enter code STACKED at salata.com or app checkout, or give it at the counter. Open to everyone, no account needed; participating locations. The code and dates are on Salata's own homepage.", tags: ["code"], value: 3, expires: "Through November 1, 2026", url: "https://www.salata.com/", best: false, region: "Texas & South", est_savings: 2 } },
    // Luna Grill Kids Eat Free, read from lunagrill.com/kids-eat-free on 2026-10-29: "Valid Mondays - Thursdays for Dine
    // In at all Luna Grill locations excluding the San Diego Airport location", ages 10 and under, limit one free kids
    // meal per adult entree and two per check, redeemed from the free Club Luna Rewards app. Standing weekly loyalty
    // special (owner exception, 2026-09-30), so it shows Mon-Thu only. SoCal & Texas chain: never National, never best.
    { until: "2026-12-31", alongside: true, dow: [1, 2, 3, 4], deal: { brand: "Luna Grill", cat: "Mediterranean", color: "#c8102e", ic: "LG", deal: "Kids Eat Free", desc: "One free kids meal per adult entree for Club Luna members (free app). Dine-in, ages 10 and under.", tags: ["free", "app"], value: 4, expires: "Mondays, Tuesdays, Wednesdays and Thursdays", url: "https://www.lunagrill.com/kids-eat-free", best: false, region: "SoCal & Texas", est_savings: 7 } },
    // Taziki's Halloween week, from the chain's own release (EIN Presswire, Birmingham AL, 2026-10-26, CEO Dan Simpson
    // quoted): "Receive a free Kids Meal with each adult entree purchase between Monday, October 26-Saturday,
    // October 31, 2026", dine-in only, ages 12 and under, one per guest, participating locations. Anyone, no account.
    { from: "2026-10-29", until: "2026-10-31", deal: { brand: "Taziki's Mediterranean Cafe", cat: "Mediterranean", color: "#0f4c81", ic: "TZ", deal: "Kids Eat Free: Free Kid'Zikis Meal with Each Adult Entree Through Halloween", desc: "Halloween week through Saturday, October 31: every adult entree comes with a free Kid'Zikis meal (grilled cheese, Child's Feast or Sneaky Taziki, plus a kids drink and a side) for children 12 and under, dine-in only, one per guest, no costume or account needed. Not available online; participating locations, so check yours. Announced by Taziki's on October 26.", tags: ["free"], value: 4, expires: "Through October 31, 2026", url: "https://www.tazikis.com/", best: false, region: "19 states (South & Southeast)", est_savings: 6 } },
    // McAlister's Deli $5 regular sandwich for McAlister's Rewards members, Fri 10/30 to Wed 11/3 (National Sandwich
    // Day week), reported by USA Today (Mike Snider, 2026-10-28): "From Friday, Oct. 30, to Wednesday, Nov. 3, members
    // of McAlister's Rewards can get a regular sandwich for $5." Not on mcalistersdeli.com/offers as of 10/29 (that
    // page only had the sign-up tea); the reward loads in the app. Shown from 10/30 only.
    { from: "2026-10-30", until: "2026-11-03", deal: { brand: "McAlister's Deli", cat: "Sandwiches", color: "#1b5e20", ic: "MD", deal: "$5 Regular Sandwich for McAlister's Rewards Members", desc: "Friday, October 30 through Wednesday, November 3: McAlister's Rewards members (free account) get any regular sandwich for $5, in the app or online with the reward applied at checkout. Listed on McAlister's own offers page (Halloween and National Sandwich Day $5 Regular Sandwich, valid 10/30 to 11/3/26); excludes Choose 2, 12-inch and King sandwiches and the $7.99 Value Meal; single use; participating locations.", tags: ["app"], value: 4, expires: "Through November 3, 2026", url: "https://www.mcalistersdeli.com/offers", best: false, region: "South, Midwest & Mid-Atlantic", est_savings: 5 } },
    // Pollo Tropical MyPollo Monday, read from pollotropical.com/mypollo-rewards-lp on 2026-10-29: "Members get an
    // original family meal for only $15 every Monday"; the homepage lists the family meal at $20.99. MyPollo Rewards
    // is the chain's free app program. Mondays only under the WEEKLY LOYALTY SPECIAL EXCEPTION (owner, 2026-09-30),
    // the same footing as Moe Monday. Florida chain: never National, never best.
    { until: "2026-12-31", dow: 1, deal: { brand: "Pollo Tropical", cat: "Chicken", color: "#f58220", ic: "PT", deal: "$15 Family Meal", desc: "The Original Family Meal, usually $20.99, for MyPollo Rewards members (free app).", tags: ["app"], value: 4, expires: "Mondays only", url: "https://www.pollotropical.com/mypollo-rewards-lp", best: false, region: "Florida", est_savings: 6 } },
    // Noodles & Company code RAMEN7, read from noodles.com/offers-terms-conditions on 2026-10-29: "Offer valid from
    // 10/14/2026-11/15/2026", any regular-sized ramen for $7 with the code online or given to a team member in the
    // restaurant, one per order, first 243,000 redemptions, no third-party delivery. No account needed. The code is
    // stated on the chain's own page, which the owner's 2026-10-26 promo-code rule requires.
    { from: "2026-10-29", until: "2026-11-15", alongside: true, deal: { brand: "Noodles & Company", cat: "Noodles", color: "#a6192e", ic: "N", deal: "$7 Regular Ramen with Code RAMEN7", desc: "Any regular-sized ramen bowl for $7 through November 15: enter code RAMEN7 at noodles.com checkout or give the code at the counter. Open to everyone, no account needed; one per order, not on third-party delivery or catering, participating locations, while the chain's redemption cap lasts. The code and its terms are on Noodles' own offers terms page.", tags: ["code"], value: 4, expires: "Through November 15, 2026", url: "https://www.noodles.com/offers-terms-conditions", best: false, region: "National", est_savings: 5 } },
    // Qdoba BOOGO, read from qdoba.com/boogo on 2026-10-29: "Rewards Members get a FREE Entree with entree & drink
    // purchase 10/31-11/1", "Valid at participating locations 10/31/2026-11/1/2026", reward added to every account
    // on Halloween. Free account, every member, no costume. Shown on its two days only (owner, 2026-10-23 rule).
    { from: "2026-10-31", until: "2026-11-01", deal: { brand: "Qdoba", cat: "Mexican", color: "#8c1d40", ic: "Q", deal: "BOOGO: Free Entree with Any Entree and Drink Purchase", desc: "Halloween weekend, October 31 and November 1: QDOBA Rewards members (free account) buy one entree and a drink and get a second entree of equal or lesser value free. The BOOGO reward is added to every member's account on Halloween; redeem in the app, at order.qdoba.com or by scanning in the restaurant. No quesadillas, no third-party delivery, one per customer.", tags: ["app", "free"], value: 5, expires: "October 31 and November 1 only", url: "https://www.qdoba.com/boogo", best: true, region: "National", est_savings: 10 } },
    // Tropical Smoothie Cafe Tropic Fan Fest, read from tropicalsmoothiecafe.com/tropic-fan-fest on 2026-10-29:
    // "FREE SMOOTHIE with a Tropic Bowl or food purchase, every day, all week", "beginning November 2, 2026 and ending
    // November 8, 2026", "Only for Tropic Rewards members", "Limit one Reward per day". The reward is loaded in the app
    // for every member (unlike the $2 smoothie the owner tested on 10/26, which had no reward anywhere).
    { from: "2026-11-02", until: "2026-11-08", deal: { brand: "Tropical Smoothie Cafe", cat: "Smoothies", color: "#00A651", ic: "TSC", deal: "Tropic Fan Fest: Free 24 oz Smoothie with Any Bowl or Food Purchase, Every Day", desc: "November 2 through 8: Tropic Rewards members (free account) get a free 24 oz smoothie with any Tropic Bowl or food item, once a day, all week. Add the food and a smoothie to an app or tropicalsmoothiecafe.com order and tap Apply on the Tropic Fan Fest reward, or scan the app in the cafe; the credit covers the lowest-priced 24 oz smoothie. Excludes Toasted Snack Rolls, the Sunshine Smoothie, sides, sweets and kids' items; participating cafes.", tags: ["app", "free"], value: 4, expires: "Through November 8, 2026", url: "https://www.tropicalsmoothiecafe.com/tropic-fan-fest", best: false, region: "National", est_savings: 7 } },
    // Moe's Southwest Grill, read from moes.com/offers on 2026-10-27 (the chain's own offers page lists dated,
    // chain-wide events for Moe Rewards members; a free account). Each shows only inside its window.
    // Moe's Halloween BOGO: "Halloween 10/30-11/1/26. Buy one entree, get the second free" (members, online or
    // in store); on 10/31 the in-store event needs no account, just mention it at checkout.
    { from: "2026-10-30", until: "2026-11-01", deal: { brand: "Moe's Southwest Grill", cat: "Mexican", color: "#5a9e3a", ic: "M", tags: ["app"], best: false, region: "35 states (Southeast, Northeast & Midwest)", deal: "Halloween BOGO: Buy One Entree, Get One Free (Oct 30 to Nov 1)", desc: "Burritos, bowls, salads, quesadillas and tacos: buy one entree and the second is free, October 30 through November 1 for Moe Rewards members (free account) online or in store; on October 31 anyone can get it in store by mentioning it at checkout. Listed on Moe's own offers page.", value: 4, expires: "Through November 1, 2026", url: "https://www.moes.com/offers", est_savings: 10 } },
    // Moe's Black Friday BOGO: "Black Friday 11/27-11/29/26. Buy one entree, get the second free" (members).
    { from: "2026-11-27", until: "2026-11-29", alongside: true, deal: { "brand":"Moe's Southwest Grill","cat":"Mexican","color":"#5a9e3a","ic":"M","best":false,"url":"https://www.moes.com/offers","region":"35 states (Southeast, Northeast & Midwest)","deal":"Buy One Entree, Get One Free","desc":"In store on Friday, November 27: just mention the offer. Moe Rewards members can also use it online through November 29.","tags":["free"],"value":5,"expires":"November 27 to 29, 2026","est_savings":11 } },
    // "Welcome to Moe's Day": "$6 Burrito or Bowl on 12/9, limit two per order. Applied at checkout."
    { from: "2026-12-09", until: "2026-12-09", alongside: true, deal: { "brand":"Moe's Southwest Grill","cat":"Mexican","color":"#5a9e3a","ic":"M","best":false,"url":"https://www.moes.com/offers","region":"35 states (Southeast, Northeast & Midwest)","deal":"$6 Burrito or Bowl","desc":"Regular size, limit two, in store, online or in the app. December 9 only.","tags":[],"value":5,"expires":"December 9, 2026 only","est_savings":5 } },
    // Chipotle Boorito (official newsroom, Oct 20, 2026): $6 entree for Rewards members in costume, 3 PM to close
    // on Halloween. Listed on Oct 31 ONLY (owner, 2026-10-23: the sweep had listed it on Oct 23, when nobody could
    // use it). The 3 PM start is an owner-approved exception to the all-day rule for this one-day event.
    { from: "2026-10-31", until: "2026-10-31", deal: { brand: "Chipotle", cat: "Mexican", color: "#A81612", ic: "C", deal: "Boorito: $6 Entree in Costume Today, 3 PM to Close", desc: "Halloween only: Chipotle Rewards members (free account) who come in costume from 3 PM to close get one entree for $6, in restaurant only. Announced on Chipotle's newsroom on October 20, 2026.", tags: ["app"], value: 4, expires: "October 31 only, 3 PM to close", url: "https://www.chipotle.com/boorito", best: false, region: "National", est_savings: 5 } },
    // Panera Mix & Match and Noodles Delicious Duos were injected here for one day (2026-10-13) and
    // removed again on 2026-10-14 (owner: "they are literally not special"). Everyday value menus
    // from Panera, Subway and Noodles stay off the site; the build drops them (STANDING_MENU_BLOCK).
    // Dated promo (owner request, 2026-09-11). Verified the same day on the chain4s own
    // offer-terms page, which reads "Rewards Members enjoy 2 regular sized noodle bowls
    // from the Culinary Classic category for $12" - note "Rewards Members", NOT the
    // "Select Rewards Members" wording that keeps the NFL free-side offer off the site.
    // Noodles Rewards is free to join, so this clears FREE ACCOUNTS ARE FINE. It runs
    // alongside the standing Delicious Duos entry and self-expires after 9/14.
    { from: "2026-09-10", until: "2026-09-14", alongside: true, deal: { brand: "Noodles & Company", cat: "Bowls", color: "#8dc63f", ic: "N", deal: "2 Culinary Classics Bowls for $12", desc: "Two regular-size bowls from the Culinary Classics menu for $12 together, about $19 bought separately: Pad Thai, Japanese Pan Noodles, Pasta Fresca, Basil Pesto Cavatappi, Creamy Cheddar Mac, Buttered Noodles or either tortelloni. Free Noodles Rewards account required: apply the offer on the cart screen before checkout, or scan at the register. Proteins and add-ons cost extra, one per account, at participating locations, and not valid on third-party delivery, call-in or catering orders.", tags: ["app"], value: 4, expires: "Through September 14, 2026", url: "https://www.noodles.com/offer-terms", est_savings: 7, best: false, region: "National" } },
    // Potbelly Week of Perks (owner request, 2026-09-30). Fifth annual event, Sep 28 to Oct 2,
    // a different deal each day for Potbelly Perks members (free account), announced in the
    // app each morning; DealNews (2026-09-28) lists buy-one-get-one 50% off entrees among
    // them. Sources: potbelly.com/perks, the 2026-09-16 press release (franchising.com),
    // QSR Magazine. Self-expires after 10/2. Potbelly is the closest roster chain to the owner.
    { from: "2026-09-30", until: "2026-10-02", deal: { brand: "Potbelly", cat: "Deli", color: "#7a1c1c", ic: "PB", deal: "Week of Perks: BOGO 50% Off Entrees and a New Deal Every Day Through October 2", desc: "Potbelly's fifth annual Week of Perks runs September 28 to October 2: a different deal each day for Potbelly Perks members (free account required), announced in the app each morning, including buy-one-get-one 50% off entrees. Order in the app, on potbelly.com, or scan your Perks account in shop.", tags: ["app"], value: 4, expires: "Through October 2, 2026", url: "https://www.potbelly.com/perks", best: false, region: "Select states", est_savings: 5 } },
    // Weekly loyalty special (owner rule 2026-09-30: allowed on its day). Smoothie King's rewards
    // terms name Free Upsize Fridays and say Healthy Rewards is free to join (smoothieking.com,
    // checked 2026-10-02); the size terms are from Smoothie King's own posts and Sept 2026 trackers.
    { until: "2026-12-31", dow: 5, deal: { brand: "Smoothie King", cat: "Smoothies", color: "#c8102e", ic: "SK", deal: "Free Upsize to a 32 oz Smoothie", desc: "Pay the 20 oz price when you order in the Smoothie King app (free account).", tags: ["app"], value: 3, expires: "Fridays only", url: "https://www.smoothieking.com/rewards/", best: false, region: "National" } },
    // ---- Added 2026-10-03 (owner: the Saturday list had nothing but standing deals). Sources:
    // starbucks.com homepage and about.starbucks.com (Free Mod Monday, Rewards members, up to
    // $2.25); the rest from The Krazy Coupon Lady's food-deals roundup updated 2026-10-02, a
    // tracker the refresh rules accept. Each entry is date- or weekday-gated so it self-expires.
    { from: "2026-10-05", until: "2026-10-05", deal: { brand: "Starbucks", cat: "Cafe", color: "#00704a", ic: "SB", deal: "Free Mod Monday: One Drink Customization Free, Up to $2.25", desc: "Monday, October 5 only: Starbucks Rewards members (free account required) get one drink customization free, up to $2.25 before tax: an extra espresso shot, a syrup or sauce, cold foam, protein cold foam or protein-boosted milk. Apply it in the app or ask the barista; not combinable with other Rewards or offers. Starbucks says members get one free customization each month.", tags: ["app"], value: 2, expires: "Monday, October 5 only", url: "https://www.starbucks.com/", best: false, region: "National", est_savings: 2.25 } },
    { from: "2026-10-06", until: "2026-10-06", deal: { brand: "Honeygrow", cat: "Bowls", color: "#e8572a", ic: "HG", deal: "National Noodle Day: Buy One Stir-Fry, Get One Free", desc: "Tuesday, October 6 only: Honeygrow rewards members (free account required) get a second stir-fry free with the purchase of one, ordering online or in the app. Listed by The Krazy Coupon Lady on October 2, 2026; confirm in the app before you order.", tags: ["app"], value: 5, expires: "Tuesday, October 6 only", url: "https://www.honeygrow.com/", best: false, region: "Northeast & Mid-Atlantic", est_savings: 12 } },
    // Saladworks "Tuesday Deal: Build-Your-Own Salad or Wrap for $6.99" removed 2026-11-02: roundup-only (KCL 2026-10-02);
    // saladworks.com has no Tuesday deal and /deals is a 404.
    // El Pollo Loco "Loco Rewards Monday: Chips and Guacamole for $1 with an $11.99 Order" removed 2026-11-02: it came
    // from The Krazy Coupon Lady's roundup only; elpolloloco.com (home, /offers, /promotions, /rewards) never states it.
    { from: "2026-10-03", until: "2026-10-26", deal: { brand: "Subway", cat: "Sandwiches", color: "#008c15", ic: "SUB", deal: "BOGO 50% Off Footlongs with Code BOGO50", desc: "Buy one footlong online or in the Subway app and get a second 50% off with code BOGO50 at participating locations. Listed by The Krazy Coupon Lady on October 2, 2026; the code has run since summer and may end without notice, so enter it before paying.", tags: ["app"], value: 4, expires: "Limited time", url: "https://www.subway.com/en-us", best: false, region: "National", est_savings: 4 } },
    // Qdoba Full Moon queso (official page qdoba.com/full-moon-queso, read 2026-10-04): free regular
    // queso and chips with a full-size entree for Rewards members on every 2026 full moon. One entry
    // per remaining date so each shows on its day only.
    { from: "2026-10-26", until: "2026-10-26", deal: { brand: "Qdoba", cat: "Mexican", color: "#8c1d40", ic: "Q", deal: "Full Moon: Free Regular Queso and Chips with Any Full-Size Entree", desc: "Monday, October 26 only: QDOBA Rewards members (free account required) get a free regular 4 oz queso and chips with a full-size entree, one per customer, in the app, online or by scanning the Rewards code in the restaurant. Qdoba runs this on every full moon in 2026; the remaining dates are October 26, November 24 and December 23. Not valid on delivery or catering.", tags: ["app", "free"], value: 3, expires: "Monday, October 26 only", url: "https://www.qdoba.com/full-moon-queso", best: false, region: "National", est_savings: 4.5 } },
    { from: "2026-11-24", until: "2026-11-24", deal: { "brand":"Qdoba","cat":"Mexican","color":"#8c1d40","ic":"Q","deal":"Free Queso and Chips","desc":"With any full-size entree for Qdoba Rewards members (free account), on the full moon.","tags":["app","free"],"value":3,"expires":"Tuesday, November 24 only","url":"https://www.qdoba.com/full-moon-queso","best":false,"region":"National","est_savings":4.5 } },
    { from: "2026-12-23", until: "2026-12-23", deal: { brand: "Qdoba", cat: "Mexican", color: "#8c1d40", ic: "Q", deal: "Free Queso and Chips", desc: "With any full-size entree for Qdoba Rewards members (free account), on the full moon.", tags: ["app", "free"], value: 3, expires: "Wednesday, December 23 only", url: "https://www.qdoba.com/full-moon-queso", best: false, region: "National", est_savings: 4.5 } },
];

// Entries the build will inject for a given Eastern date (iso YYYY-MM-DD) and weekday index.
export function injectedToday(iso, dow) {
  return EVERGREEN.filter(e => (e.dow === undefined || [].concat(e.dow).includes(dow)) && !(e.from && iso < e.from) && iso <= e.until).map(e => e.deal);
}
