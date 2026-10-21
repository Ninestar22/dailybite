# Search Console in two minutes (items 1 and 2 of the Google-clicks plan)

Only the site owner can do these; everything else in the plan is done.

## 1. Verify ownership (pick one)

- **DNS (best, covers every subdomain):** Search Console > Add property > Domain > `dailybitedeals.com`. Add the TXT record it gives you at your DNS host. Verification usually completes within an hour.
- **HTML tag (no DNS access needed):** Add property > URL prefix > `https://dailybitedeals.com/` > HTML tag. Copy the `content="..."` value and paste it into `GOOGLE_SITE_VERIFICATION` in `scripts/build.mjs`. The next build puts the tag on every page. Then press Verify.

Then: Sitemaps > add `https://dailybitedeals.com/sitemap.xml`.

## 2. Request indexing, in this order

Console allows roughly a dozen manual requests a day, so do the first ten today and the rest tomorrow. Paste each URL into the top search bar ("Inspect any URL"), wait for the result, then press "Request indexing".

1. https://dailybitedeals.com/
2. https://dailybitedeals.com/sushi-deals
3. https://dailybitedeals.com/food-deals-by-day
4. https://dailybitedeals.com/publix-5-sushi-wednesday
5. https://dailybitedeals.com/safeway-5-friday-sushi
6. https://dailybitedeals.com/cheap-healthy-meals
7. https://dailybitedeals.com/free-food-today
8. https://dailybitedeals.com/birthday-freebies
9. https://dailybitedeals.com/app
10. https://dailybitedeals.com/press
11. https://dailybitedeals.com/chipotle-rewards
12. https://dailybitedeals.com/starbucks-rewards
13. https://dailybitedeals.com/chick-fil-a-one-rewards
14. https://dailybitedeals.com/cava-rewards
15. https://dailybitedeals.com/sweetgreen-rewards
16. https://dailybitedeals.com/panera-mypanera-rewards
17. https://dailybitedeals.com/subway-rewards
18. https://dailybitedeals.com/holiday-gift-card-bonuses
19. https://dailybitedeals.com/chipotle-boorito-halloween-deals
20. https://dailybitedeals.com/veterans-day-free-meals
21. https://dailybitedeals.com/kroger-sushi-wednesday
22. https://dailybitedeals.com/sprouts-sushi-wednesday
23. https://dailybitedeals.com/harris-teeter-5-sushi-friday
24. https://dailybitedeals.com/albertsons-5-friday
25. https://dailybitedeals.com/whole-foods-sushi-friday
26. https://dailybitedeals.com/chipotle-deals
27. https://dailybitedeals.com/chick-fil-a-deals
28. https://dailybitedeals.com/starbucks-deals
29. https://dailybitedeals.com/panera-deals
30. https://dailybitedeals.com/cava-deals

## 3. What to look at after a week

- **Pages > "Why pages aren't indexed":** anything under "Discovered, currently not indexed" is a crawl-budget symptom, not a content problem; it clears as links arrive.
- **Performance > Queries:** sort by impressions. Any query with impressions but a click-through rate under 2 percent gets its title rewritten to match the query wording.
- **Performance > Pages:** the homepage snippet should change from the old "fast food app deals" text to the current intro within a few days of the request above.

## Also worth five minutes

Bing Webmaster Tools (bing.com/webmasters) > Import from Google Search Console. Bing powers ChatGPT and Copilot search, which sent more visitors than Google in the site's first month.
