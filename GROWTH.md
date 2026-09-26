# DailyBite growth playbook (council review, 2026-09-26)

Four specialist reviews (SEO content gaps, technical SEO, Pinterest distribution, off-site
growth) were run on 2026-09-26. Everything that could be done in the repo was done that day
(see the commit history). This file is the part that needs a person. Budget: about two hours
a week. Ordered by expected traffic per hour of effort.

## Do once

1. **Bing Webmaster Tools.** Verify the domain, submit `sitemap.xml`. Bing feeds ChatGPT search
   and Copilot, which sent more visitors than Google in the first month. IndexNow is already
   wired; Bing WMT's "AI Performance" report shows what those assistants cite.
2. **Google Search Console.** Resubmit the sitemap after the honest-lastmod build lands. Watch
   the "Discovered, currently not indexed" bucket shrink.
3. **Claim the domain on Pinterest** and create theme boards (see `SOCIAL.md`). Add the
   `PINTEREST_*` secrets so the daily pin set starts.
4. **Flipboard publisher.** flipboard.com/publishers, "Add your content", submit `feed.xml`,
   create a "Healthy Food Deals" magazine. Near-zero effort.
5. **Google Discover hygiene.** Discover needs a 1200px-wide 16:9 image and a named author on
   each page. A per-page hero image and a "by Jacob Elsayed" byline on chain, explainer and
   holiday pages are the next build change worth making.
6. **Product Hunt** launch for the iOS app: Tuesday or Wednesday, 12:01 AM PT, maker comment
   leads with the verification log and the "no paid-membership perks" rule. One-day spike
   plus a permanent high-authority link.

## Do weekly

7. **Journalist requests** (Featured, Qwoted, Source of Sources): 20 minutes scanning for
   food-inflation and "healthy on a budget" asks; answer with one stat from `meals.json`
   (protein per dollar) and one verified deal. Never a pitch.
8. **Reddit, comment-first.** Answer "cheapest healthy option at X" questions in r/fastfood,
   r/EatCheapAndHealthy, the r/Fitness daily thread and r/washingtondc with the actual
   numbers; link only when asked. r/Frugal bans self-promotion entirely: do not post there.
   After a month, one disclosed original-content post: "I verified N healthy-chain deals for
   30 days; here is what actually exists", built on the verification log.
9. **Slickdeals is off limits** (no own-site posts; partner links disqualify). Krazy Coupon
   Lady, Hip2Save and The Freebie Guy have no tip form; treat them as competitors.

## Do quarterly

10. **Protein-per-dollar index release.** Publish a dated "Q4 2026 Restaurant Protein-per-Dollar
    Index" page with a chart, downloadable CSV, methodology and citation line. Every existing
    "cheapest protein" ranking covers grocery items only; none covers restaurant orders. Pitch
    to the outreach list below and to fitness press food writers.
11. **Local DC press.** Axios DC (tips.axios.com), PoPville, Washingtonian Cheap Eats: offer a
    weekly DC-filtered list from `deals.json`.

## Outreach targets (they already link to comparable pages)

- Chowhound: Publix $5 Sushi Wednesday and Sprouts/Whole Foods sushi articles. Pitch `/sushi-deals`.
- Cozymeal Magazine, The Penny Hoarder, ChooseFI: birthday-freebie lists. Pitch `/birthday-freebies`.
- Hey It's Free, The Freebie Guy: day-of-week deal pages. Pitch `/food-deals-by-day` as the healthy filter.
- Frugal For Less, ProteinBro: cheapest-protein rankings. Pitch `/cheap-healthy-meals` as the restaurant half.
- Sporked (weekly deal roundup), Brand Eating, MenuPriceToday.

## Pages worth writing next (need facts verified against official sources first)

Ranked by the content review. Each fits the `explainerPage` pattern in `scripts/build.mjs`
(facts table, FAQ, live deal block). Do not publish any without verifying every number.

1. `/albertsons-5-friday`: Vons, Jewel-Osco, Tom Thumb, ACME, Shaw's, Randalls, Pavilions. Same
   promo as the Safeway page, seven more banners of searchers, weak competition.
2. `/cava-rewards`: points per dollar per tier, redemption thresholds, status match.
3. `/sweetgreen-rewards`: the post-Sweetpass program; nobody has a consumer explainer.
4. `/holiday-gift-card-bonuses`: Chipotle, Panera, Subway bonus cards, Nov 15 to Dec 31.
5. `/smoothie-king-free-upsize-friday` (weekly recurring, explainer with `day: 5`).
6. `/food-lion-sushi-wednesday` (1,100 Southeast stores; extends the sushi cluster).
7. `/whole-foods-sushi-friday`: honest "it needs Prime, here are the no-membership alternatives".
8. `/tropical-smoothie-rewards`, `/chipotle-rewards` (FAQ block on the chain page is enough).

Seasonal pages already scheduled in `HOLIDAYS`: Taco Day (Oct 6), World Vegetarian Day
(Oct 1), Pasta Day (Oct 17), Halloween Boorito (Oct 31), Sandwich Day (Nov 3), Veterans Day
(Nov 11), Black Friday and Cyber Monday (Nov 27), El Pollo Loco 12 Days (Dec 1). They publish
21 days ahead and fill from verified deals automatically.

## Technical items deferred (medium effort, worth doing)

- Homepage weight: move the 30 KB `MEALS` array out of `index.html` (fetch `meals.json` on tab
  click) and minify the inline script; roughly 45 KB less to parse on the busiest page.
- `logo.svg` is a 29 KB PNG wrapped in SVG, loaded on every page; a true vector is 2 to 3 KB.
- Cache brand logos at build time under `/logos/` instead of 33 requests to Google's favicon
  service per page view.
- Two `impact-site-verification` metas with different values on the homepage: keep the live one.
