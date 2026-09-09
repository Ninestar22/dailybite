// Stable deal id (feed contract addition, 2026-09-08): an 8-character hex FNV-1a hash of
// the normalized brand plus the normalized deal title. Additive to deals.json and ignored
// by app versions that predate it. The iOS app's Pro tier diffs today's feed against
// yesterday's by this id to notify "a favorite has a NEW deal", so the id must be:
//   - deterministic: the same brand + title always yields the same id (no dates, no counters);
//   - tolerant of cosmetic drift: case, punctuation and spacing differences do not change it;
//   - changed when the deal itself changes: a new title (new price, new item) is a new id.
// The same function runs in refresh-deals.mjs (when the model output is saved) and in
// build.mjs (for evergreen deals and as a backstop), so both writers agree.

const norm = s => String(s || "").toLowerCase().replace(/[‘’“”]/g, "'").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");

export function dealId(brand, deal) {
  const key = `${norm(brand)}|${norm(deal)}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, "0");
}

// Assigns ids in place to every deal that lacks one; returns the count assigned.
export function assignDealIds(deals) {
  let n = 0;
  for (const d of deals || []) {
    if (!d || typeof d !== "object") continue;
    if (typeof d.id === "string" && /^[0-9a-f]{8}$/.test(d.id)) continue;
    d.id = dealId(d.brand, d.deal); n++;
  }
  return n;
}
