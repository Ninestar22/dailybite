# DailyBite — daily refresh automation

## How it works

```
deals.json  ──(scripts/build.mjs)──▶  index.html   (the DEALS array between the DEALS:START/END markers)
   ▲
   └──(scripts/refresh-deals.mjs)── Claude API + web search  (regenerates deals.json each day)
```

- **`deals.json`** is the single source of truth for deal data.
- **`scripts/build.mjs`** injects `deals.json` into `index.html`. No network, no key needed.
- **`scripts/refresh-deals.mjs`** is the "AI agent." It calls the Claude API with the
  web search tool to find current deals, validates the result hard, and rewrites `deals.json`.
  If validation fails, it exits non-zero and writes nothing, so the last good file survives.
- **`.github/workflows/daily-refresh.yml`** runs refresh → build → commit TWICE a day
  (owner decision, 2026-08-23): at about **5:05 AM Eastern**, so the site is fresh for
  early risers with the day's specials already in place, and at about **11:05 AM**, to
  catch deals announced during the morning before the lunch crowd decides. GitHub cron is
  UTC-only, so each window gets several UTC slots and a guard step runs a slot only when
  the Eastern clock is inside its window (5-7 AM or 11 AM-1 PM) and deals.json has not
  been refreshed since the window opened: each window runs once, the later slots retry
  automatically if the first attempt fails, and daylight-saving time needs no edits.
- The homepage re-checks for a newer build whenever it is reopened, comes back online, or
  every 15 minutes, and reloads itself, so the installed home-screen app and the website
  always show the same build (see the sync script at the bottom of `index.html`).

## One-time setup

1. **Get an API key** at https://console.anthropic.com and enable **Web search**
   for your org (Console → Settings; the web search tool must be enabled or the
   refresh call errors).
2. In the repo: **Settings → Secrets and variables → Actions**
   - Add a **secret** named `ANTHROPIC_API_KEY`.
   - (Optional) Add a **variable** named `CLAUDE_MODEL` if you want to override the
     default model string. Confirm the current model name in your Console — model
     names change over time.
3. Commit these files. The workflow refreshes every day at about 5:05 AM and 11:05 AM
   Eastern (see above), or on demand via **Actions → Daily Deal Refresh → Run workflow**
   (manual runs always do a full refresh, whatever the time).

## Run it locally

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...
npm run update      # refresh + build
# or individually:
npm run refresh     # regenerate deals.json (needs the key)
npm run build       # rebuild index.html from deals.json (no key)
```

## Costs

Web search is billed at about **$10 per 1,000 searches** plus token usage. Each daily
run uses up to `MAX_SEARCHES` (18) searches; at two runs a day a full year is well under
~13,500 searches (≈ $135/yr) plus a small amount of token cost. Lower `MAX_SEARCHES` in `refresh-deals.mjs`
to reduce it further.

## Important caveats

- **Accuracy.** Deals are grounded in live web search, but an LLM can still misread a
  page or surface an offer that's regional or expired. You have affiliate links next to
  these, so bad data is a trust/compliance risk. The validator enforces structure, not
  truth. If you want a human in the loop, see "Review mode" below.
- **This is auto-commit to `main`.** Whatever passes validation goes live. That matches
  the "auto-updated daily" goal but means no human sees it first.

### Review mode (safer alternative)

If you'd rather approve each day's deals before they publish, replace the commit step in
the workflow with a pull-request action (e.g. `peter-evans/create-pull-request`) so the
refresh opens a PR instead of pushing to `main`. You then merge when it looks right.

## Swapping the data source

`scripts/refresh-deals.mjs` is the only piece that decides *where deals come from*. To use
a different source (a scraper, a manual curator, a partner feed), replace `generate()` so it
returns an array of deal objects in the same shape. `build.mjs`, the schema in `validate()`,
and the workflow stay the same.
