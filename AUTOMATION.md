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
- **`.github/workflows/daily-refresh.yml`** runs refresh → build → commit ONCE a day
  (owner decision, 2026-08-24) at about **7:05 AM Eastern**. GitHub cron is UTC-only,
  so the window gets several UTC slots and a guard step runs a slot only when the
  Eastern clock is inside the window (7-9 AM) and deals.json has not been refreshed
  since the window opened: the window runs once, the later slots retry automatically
  if the first attempt fails, and daylight-saving time needs no edits.
- The homepage re-checks for a newer build whenever it is reopened, comes back online, or
  every 15 minutes, and reloads itself, so the installed home-screen app and the website
  always show the same build (see the sync script at the bottom of `index.html`).
- After a successful refresh, the workflow also generates a "today's deals" share image
  (`scripts/social-image.mjs`) and posts it to Pinterest and Instagram
  (`scripts/post-social.mjs`) once their API secrets are configured: see `SOCIAL.md`.

## One-time setup

1. **Get an API key** at https://console.anthropic.com and enable **Web search**
   for your org (Console → Settings; the web search tool must be enabled or the
   refresh call errors).
2. In the repo: **Settings → Secrets and variables → Actions**
   - Add a **secret** named `ANTHROPIC_API_KEY`.
   - (Optional) Add a **variable** named `CLAUDE_MODEL` if you want to override the
     default model string. Confirm the current model name in your Console — model
     names change over time.
3. Commit these files. The workflow refreshes every day at about 7:05 AM Eastern
   (see above), or on demand via **Actions → Daily Deal Refresh → Run workflow**
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
run uses up to `MAX_SEARCHES` (24) searches; at one run a day a full year is well under
~8,800 searches (≈ $88/yr) plus a small amount of token cost. Lower `MAX_SEARCHES` in `refresh-deals.mjs`
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
