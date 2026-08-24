# DailyBite: automatic daily Pinterest + Instagram posts

Every successful morning refresh now generates a branded "today's deals" image
(`social/pin.png` for Pinterest, `social/ig.png` for Instagram, built by
`scripts/social-image.mjs`) and posts it (`scripts/post-social.mjs`) right after the
site deploys. **Nothing posts until you add the credentials below** as repository
secrets (GitHub repo → Settings → Secrets and variables → Actions → New repository
secret). Each platform activates independently: add Pinterest's secrets and only
Pinterest posts; the other is skipped with a log line.

## Pinterest setup (about 15 minutes)

1. Go to https://developers.pinterest.com → create an app (Trial access is enough
   to post to your own account; request Standard access later for higher limits).
2. Generate a token with the `pins:write` and `boards:read` scopes. The easiest
   path is the "Try it" OAuth flow in the API docs, or any OAuth helper: you will
   end up with an **access token** (lasts ~30 days) and a **refresh token**
   (lasts ~1 year).
3. Get the board ID for the board you want the daily pin on:
   `GET https://api.pinterest.com/v5/boards` with the token (the `id` field), or
   from the board's page source.
4. Add these repository secrets:
   - `PINTEREST_BOARD_ID` (required)
   - EITHER `PINTEREST_ACCESS_TOKEN` (simple, but you must replace it monthly)
   - OR (recommended, yearly maintenance instead of monthly):
     `PINTEREST_REFRESH_TOKEN`, `PINTEREST_APP_ID`, `PINTEREST_APP_SECRET`
     — the workflow exchanges the refresh token for a fresh access token on every
     run. Re-do the OAuth flow about once a year when the refresh token expires.

## Instagram setup (about 30 minutes; requires a Business or Creator account)

Meta's API only posts to **Professional** Instagram accounts. In the Instagram app:
Settings → Account type → switch to Business (free).

Then choose ONE of these routes:

**Route A: Instagram API with Instagram Login (simpler, no Facebook Page).**
1. https://developers.facebook.com → create an app → add the
   "Instagram API with Instagram Login" product.
2. Connect your @dailybitedeals account and generate a long-lived access token
   (valid 60 days) with the `instagram_business_content_publish` permission.
3. Add secrets `IG_USER_ID` (shown with the token) and `IG_ACCESS_TOKEN`, and a
   repository **variable** `IG_API_HOST` = `graph.instagram.com`.
4. Maintenance: regenerate the token roughly every 2 months (Meta shows the expiry).

**Route B: Facebook-Page-linked (classic; tokens can be made permanent).**
1. Link the Instagram account to a Facebook Page you own, create a Meta app with
   `instagram_content_publish`, and use Business Manager to create a **System User**
   token (never expires) for the Page.
2. `IG_USER_ID` is the Instagram Business Account ID found on the Page's settings
   (or `GET /me/accounts` then `?fields=instagram_business_account`).
3. Add secrets `IG_USER_ID` and `IG_ACCESS_TOKEN`; leave `IG_API_HOST` unset.

## How the daily flow works

refresh → build → generate image → commit + push (image goes live on the site) →
post. Posting is skipped when the refresh failed (so yesterday's deals are never
re-posted), and a social failure never blocks the site refresh (`continue-on-error`).
The Instagram step waits up to 5 minutes for GitHub Pages to serve the new image
before publishing.

## Testing without waiting for tomorrow

Actions → Daily Deal Refresh → Run workflow. A manual run does a full refresh and,
if the secrets are in place, posts to both platforms.
