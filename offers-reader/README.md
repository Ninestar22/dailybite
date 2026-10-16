# Offers reader

Reads the offers pages of DailyBite's signed-in chain accounts (Safeway for U, Giant, Harris
Teeter, Starbucks, Chipotle) from the owner's PC and commits `offers-pack.json` at the repo
root. The morning refresh reads it as an OFFERS PACK. Design notes are at the top of
`reader.mjs`; the operating notes are in `AUTOMATION.md`.

- `npm install` once (uses the installed Google Chrome; no browser download).
- `npm run login -- <site>` once per site: `safeway`, `giant`, `harristeeter`, `starbucks`, `chipotle`.
- `npm run read` reads and pushes; `run.cmd` is what Task Scheduler calls at 6:40 AM.
- `profile/` holds the signed-in Chrome sessions and `reader.log` the run history. Both stay on
  this PC (git-ignored).
