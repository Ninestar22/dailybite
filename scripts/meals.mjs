// MEAL INDEX (owner decision, 2026-09-18). The site's unit of value moves from "deals"
// (scarce at healthy chains, so the same three repeated daily) to MEALS: the cheapest
// genuinely healthy orders at each chain, ranked by grams of protein per dollar. Deals
// stay on the site; this index sits above them and does not depend on promotions.
//
// Source of truth: meals-data.json (repo root). Every entry carries its sources:
//   nutrition_url  = the chain's OFFICIAL nutrition page / calculator / PDF
//   price_url      = where the price was read (official menu, or a marked third party)
// Nutrition is exact; prices are typical and vary by store, and the UI says so.
// Nothing here is estimated: an entry that fails validation is dropped, never patched.

import { readFileSync } from "node:fs";
import { dealId } from "./deal-id.mjs";
import { dealPageFor } from "./deal-pages.mjs";

const num = v => (typeof v === "number" && Number.isFinite(v)) ? v : NaN;
const isHttps = u => typeof u === "string" && /^https:\/\/[^\s"<>]+$/i.test(u);

export function loadMeals(path) {
  let raw;
  try { raw = JSON.parse(readFileSync(path, "utf8")); } catch { return { updated: null, meals: [], dropped: [] }; }
  const dropped = [];
  const meals = [];
  for (const m of raw.meals || []) {
    const errs = [];
    const price = num(m.price), calories = num(m.calories), protein = num(m.protein);
    if (!m.brand || !m.meal) errs.push("missing brand/meal");
    if (!(price >= 2 && price <= 25)) errs.push(`price out of range (${m.price})`);
    if (!(calories >= 100 && calories <= 1400)) errs.push(`calories out of range (${m.calories})`);
    if (!(protein >= 3 && protein <= 120)) errs.push(`protein out of range (${m.protein})`);
    if (protein * 4 > calories * 1.05) errs.push("protein calories exceed total calories"); // arithmetic sanity check
    if (!isHttps(m.nutrition_url)) errs.push("no nutrition_url");
    if (!isHttps(m.price_url)) errs.push("no price_url");
    if (errs.length) { dropped.push(`${m.brand || "?"}: ${m.meal || "?"} (${errs.join("; ")})`); continue; }
    const ppd = Math.round((protein / price) * 10) / 10;
    meals.push({
      id: dealId(m.brand, m.meal),
      brand: String(m.brand), meal: String(m.meal), build: String(m.build || ""),
      kind: ["cheapest-filling", "high-protein", "lighter"].includes(m.kind) ? m.kind : "cheapest-filling",
      price, calories: Math.round(calories), protein: Math.round(protein),
      ...(Number.isFinite(num(m.carbs)) ? { carbs: Math.round(m.carbs) } : {}),
      ...(Number.isFinite(num(m.fat)) ? { fat: Math.round(m.fat) } : {}),
      ...(Number.isFinite(num(m.sugar)) ? { sugar: Math.round(m.sugar) } : {}),
      protein_per_dollar: ppd,
      vegetarian: m.vegetarian === true,
      price_source_type: m.price_source_type === "official" ? "official" : "third-party",
      price_location: String(m.price_location || ""),
      nutrition_url: m.nutrition_url, price_url: m.price_url,
      order_url: isHttps(m.order_url) ? m.order_url : (dealPageFor(m.brand) || m.price_url),
      ...(m.region ? { region: String(m.region) } : {}),
    });
  }
  meals.sort((a, b) => b.protein_per_dollar - a.protein_per_dollar || a.price - b.price);
  return { updated: raw.updated || null, meals, dropped };
}

export const money = p => "$" + (p % 1 ? p.toFixed(2) : p.toFixed(0));

// One compact row. `esc` and `brandDomain` come from build.mjs so logos and escaping match the deal cards.
export function mealRow(m, rank, { esc, brandDomain }) {
  return `<div class="meal">
  <div class="mrank">${rank}</div>
  <div class="brand-ic mic"><span>${esc(m.brand[0])}</span><img class="brand-logo" src="https://www.google.com/s2/favicons?domain=${brandDomain(m.brand)}&amp;sz=128" alt="${esc(m.brand)} logo" loading="lazy" onerror="this.remove()"></div>
  <div class="mmain"><div class="mname">${esc(m.meal)}</div><div class="mbrand">${esc(m.brand)}${m.build ? `<span class="mbuild"> &middot; ${esc(m.build)}</span>` : ""}</div></div>
  <div class="mstats"><span class="mprice" title="Typical price, varies by location">~${money(m.price)}</span><span>${m.calories} cal</span><span>${m.protein}g protein</span></div>
  <div class="mscore"><b>${m.protein_per_dollar.toFixed(1)}</b><small>g protein per $1</small></div>
  <a class="cta mcta" href="${esc(m.order_url)}" target="_blank" rel="noopener">Order direct &rarr;</a>
</div>`;
}
