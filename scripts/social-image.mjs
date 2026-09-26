// scripts/social-image.mjs
// Renders today's deals from deals.json into share images for Pinterest (1000x1500)
// and Instagram (1080x1350), in the site's dark theme, plus the caption text used
// by post-social.mjs. No network needed. Run: node scripts/social-image.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "social");
mkdirSync(outDir, { recursive: true });

const ET = { timeZone: "America/New_York" };
const prettyDate = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", ...ET });
const shortDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", ...ET });

const data = JSON.parse(readFileSync(join(root, "deals.json"), "utf8"));
const all = (Array.isArray(data) ? data : data.deals) || [];
if (!all.length) { console.error("No deals in deals.json: not generating a social image."); process.exit(1); }
// Best first, then by value: the image leads with the same deals the site features.
const ranked = [...all].sort((a, b) => (b.best ? 1 : 0) - (a.best ? 1 : 0) || (b.value || 0) - (a.value || 0));

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function wrap(text, maxChars, maxLines) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars && line) { lines.push(line); line = w; }
    else line = (line + " " + w).trim();
    if (lines.length === maxLines) break;
  }
  if (lines.length < maxLines && line) lines.push(line);
  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, "") + "…";
  }
  return lines;
}

const FONT = "DejaVu Sans, Verdana, Arial, sans-serif";

// The D brand mark (same geometry as /logo.svg: white D on a green rounded tile
// with one bite out of the top-right corner), inlined so the social image
// carries the logo without a raster.
// x, y = top-left of the mark's box; size = box width/height in output pixels.
function brandMark(x, y, size) {
  const s = size / 456;
  return `<g transform="translate(${x} ${y}) scale(${s}) translate(-28 -28)">
<mask id="bite"><rect x="0" y="0" width="512" height="512" fill="#fff"/><circle cx="428" cy="80" r="80" fill="#000"/></mask>
<rect x="36" y="36" width="440" height="440" rx="104" fill="#1f9e54" mask="url(#bite)"/>
<path fill="#fff" fill-rule="evenodd" d="M154 144H240A112 112 0 0 1 240 368H154ZM216 200H240A56 56 0 0 1 240 312H216Z"/>
</g>`;
}
function renderSVG(W, H, count) {
  const deals = ranked.slice(0, count);
  const pad = Math.round(W * 0.05);
  const headerH = Math.round(H * 0.16);
  const footerH = Math.round(H * 0.07);
  const gap = Math.round(H * 0.012);
  const cardH = Math.floor((H - headerH - footerH - gap * (deals.length - 1) - pad) / deals.length);
  const brandFS = Math.round(cardH * 0.16);
  const dealFS = Math.round(cardH * 0.19);
  const cards = deals.map((d, i) => {
    const y = headerH + i * (cardH + gap);
    const lines = wrap(d.deal, Math.floor((W - pad * 2.8) / (dealFS * 0.66)), 2);
    const textX = pad + Math.round(W * 0.02);
    const brandY = y + Math.round(cardH * 0.3);
    const firstLineY = y + Math.round(cardH * 0.56);
    const best = d.best ? `<rect x="${W - pad - Math.round(W * 0.17)}" y="${y}" width="${Math.round(W * 0.17)}" height="${Math.round(cardH * 0.24)}" rx="6" fill="#ffd166"/><text x="${W - pad - Math.round(W * 0.085)}" y="${y + Math.round(cardH * 0.17)}" font-family="${FONT}" font-size="${Math.round(cardH * 0.12)}" font-weight="bold" fill="#1a1200" text-anchor="middle">TOP PICK</text>` : "";
    return `<rect x="${pad}" y="${y}" width="${W - pad * 2}" height="${cardH}" rx="16" fill="#161f19" stroke="#27352c" stroke-width="2"/>
${best}
<text x="${textX}" y="${brandY}" font-family="${FONT}" font-size="${brandFS}" font-weight="bold" fill="#ffd166">${esc(d.brand)}</text>
${lines.map((ln, j) => `<text x="${textX}" y="${firstLineY + j * Math.round(dealFS * 1.25)}" font-family="${FONT}" font-size="${dealFS}" font-weight="bold" fill="#f2f7f3">${esc(ln)}</text>`).join("\n")}`;
  }).join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#0e1310"/>
<rect width="${W}" height="${Math.round(H * 0.004)}" fill="#31c96e"/>
${brandMark(W / 2 - Math.round(W * 0.036), Math.round(headerH * 0.05), Math.round(W * 0.072))}
<text x="${W / 2}" y="${Math.round(headerH * 0.56)}" font-family="${FONT}" font-size="${Math.round(W * 0.058)}" font-weight="bold" text-anchor="middle"><tspan fill="#f2f7f3">Daily</tspan><tspan fill="#31c96e">Bite</tspan></text>
<text x="${W / 2}" y="${Math.round(headerH * 0.73)}" font-family="${FONT}" font-size="${Math.round(W * 0.03)}" text-anchor="middle" fill="#9ab3a3">Today's Verified Healthy Food Deals</text>
<text x="${W / 2}" y="${Math.round(headerH * 0.89)}" font-family="${FONT}" font-size="${Math.round(W * 0.026)}" font-weight="bold" text-anchor="middle" fill="#ffd166">${esc(prettyDate)}</text>
${cards}
<text x="${W / 2}" y="${H - Math.round(footerH * 0.4)}" font-family="${FONT}" font-size="${Math.round(W * 0.03)}" font-weight="bold" text-anchor="middle" fill="#31c96e">dailybitedeals.com</text>
</svg>`;
}

// ---- Pinterest: one deal per pin (council review 2026-09-26). A six-card dark image is
// unreadable at feed size; Pinterest rewards fresh, distinct images with a matching deep
// link. Light background, brand accent bar, 2-3 huge lines, "verified today" badge.
import { existsSync } from "node:fs";
const slugify = b => String(b).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// Site chain page for a brand, when one exists and is a real page (redirect stubs are <1 KB).
function chainPageFor(brand) {
  const cands = [slugify(brand), slugify(brand).replace(/-(cafe|coastal-grill|mexican-grill|bread)$/, ""), slugify(brand).replace(/^the-/, "")];
  for (const c of cands) {
    const f = join(root, `${c}-deals.html`);
    if (existsSync(f) && statSync(f).size > 2000) return `https://dailybitedeals.com/${c}-deals`;
  }
  return "https://dailybitedeals.com/";
}
import { statSync } from "node:fs";
function renderDealPin(d, W = 1000, H = 1500) {
  const accent = /^#[0-9a-f]{6}$/i.test(d.color || "") ? d.color : "#1f9e54";
  const pad = 70;
  const lines = wrap(d.deal, 18, 4);
  const dealFS = lines.length > 3 ? 78 : lines.length > 2 ? 88 : 100;
  const startY = 520;
  const sub = wrap((d.desc || "").split(/(?<=[.!?])\s/)[0] || "", 42, 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#f7f8f5"/>
<rect width="${W}" height="18" fill="${accent}"/>
${brandMark(pad, 90, 96)}
<text x="${pad + 120}" y="150" font-family="${FONT}" font-size="54" font-weight="bold"><tspan fill="#18211b">Daily</tspan><tspan fill="#1f9e54">Bite</tspan></text>
<text x="${pad + 120}" y="196" font-family="${FONT}" font-size="26" fill="#54655a">Verified healthy food deals</text>
<rect x="${pad}" y="270" width="${W - pad * 2}" height="70" rx="14" fill="${accent}" fill-opacity="0.12"/>
<text x="${pad + 24}" y="318" font-family="${FONT}" font-size="40" font-weight="bold" fill="${accent}">${esc(d.brand)}</text>
${lines.map((ln, j) => `<text x="${pad}" y="${startY + j * Math.round(dealFS * 1.18)}" font-family="${FONT}" font-size="${dealFS}" font-weight="bold" fill="#18211b">${esc(ln)}</text>`).join("\n")}
${sub.map((ln, j) => `<text x="${pad}" y="${startY + lines.length * Math.round(dealFS * 1.18) + 40 + j * 44}" font-family="${FONT}" font-size="34" fill="#54655a">${esc(ln)}</text>`).join("\n")}
<rect x="${pad}" y="${H - 300}" width="420" height="62" rx="31" fill="#1f9e54"/>
<text x="${pad + 210}" y="${H - 258}" font-family="${FONT}" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">VERIFIED ${esc(shortDate.toUpperCase())}</text>
<text x="${pad}" y="${H - 190}" font-family="${FONT}" font-size="30" fill="#54655a">${esc(String(d.expires || "").slice(0, 48))}</text>
<rect y="${H - 120}" width="${W}" height="120" fill="#18211b"/>
<text x="${W / 2}" y="${H - 48}" font-family="${FONT}" font-size="40" font-weight="bold" text-anchor="middle" fill="#31c96e">dailybitedeals.com</text>
</svg>`;
}
// Evergreen explainer pins: one per day, chosen by weekday so sushi days pin ahead of the day.
const EVERGREEN = [
  { url: "/publix-5-sushi-wednesday", title: "Publix $5 Sushi Wednesday: Which Rolls, Which Stores, When to Go", days: [1, 2, 3], kicker: "Every Wednesday" },
  { url: "/sprouts-sushi-wednesday", title: "Sprouts Sushi Wednesday: $5 Rolls Explained", days: [1, 2, 3], kicker: "Every Wednesday" },
  { url: "/kroger-sushi-wednesday", title: "Kroger Sushi Wednesday: The Weekly Roll Deal Explained", days: [2, 3], kicker: "Every Wednesday" },
  { url: "/safeway-5-friday-sushi", title: "Safeway $5 Friday Sushi: Rules, Rolls and Tips", days: [4, 5], kicker: "Every Friday" },
  { url: "/harris-teeter-5-sushi-friday", title: "Harris Teeter $5 Sushi Friday, Explained", days: [4, 5], kicker: "Every Friday" },
  { url: "/food-deals-by-day", title: "Healthy Food Deals by Day of the Week: The Weekly Cheat Sheet", days: [0, 6], kicker: "Weekly calendar" },
  { url: "/sushi-deals", title: "Every Grocery Store $5 Sushi Day in One Place", days: [0, 1, 6], kicker: "All sushi days" },
  { url: "/cheap-healthy-meals", title: "Cheapest Healthy Fast-Casual Meals, Ranked by Protein per Dollar", days: [0, 4, 6], kicker: "Protein per dollar" },
  { url: "/free-food-today", title: "Free Food Today: Verified Freebies at Healthy Chains", days: [0, 1, 2, 3, 4, 5, 6], kicker: "Updated daily" },
];
function pickEvergreen() {
  const dow = new Date(new Date().toLocaleString("en-US", ET)).getDay();
  const pool = EVERGREEN.filter(e => e.days.includes(dow));
  const dayNum = Math.floor(Date.now() / 86400000);
  return pool[dayNum % pool.length];
}
function renderEvergreenPin(e, W = 1000, H = 1500) {
  // Vary hue by date so re-pins of the same page are distinct images.
  const hues = ["#1f9e54", "#0e7f74", "#b9830a", "#2d6cdf", "#a8326e"];
  const accent = hues[Math.floor(Date.now() / 86400000) % hues.length];
  const lines = wrap(e.title, 18, 5);
  const fs = lines.length > 4 ? 76 : 88;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#f7f8f5"/>
<rect width="${W}" height="${H * 0.28}" fill="${accent}"/>
${brandMark(70, 70, 96)}
<text x="190" y="130" font-family="${FONT}" font-size="54" font-weight="bold" fill="#fff">DailyBite</text>
<text x="190" y="176" font-family="${FONT}" font-size="26" fill="#ffffffcc">Verified healthy food deals</text>
<text x="70" y="${H * 0.28 - 50}" font-family="${FONT}" font-size="36" font-weight="bold" fill="#fff">${esc(e.kicker.toUpperCase())}</text>
${lines.map((ln, j) => `<text x="70" y="${H * 0.28 + 150 + j * Math.round(fs * 1.18)}" font-family="${FONT}" font-size="${fs}" font-weight="bold" fill="#18211b">${esc(ln)}</text>`).join("\n")}
<text x="70" y="${H - 220}" font-family="${FONT}" font-size="32" fill="#54655a">Re-checked every morning. Updated ${esc(shortDate)}.</text>
<rect y="${H - 120}" width="${W}" height="120" fill="#18211b"/>
<text x="${W / 2}" y="${H - 48}" font-family="${FONT}" font-size="40" font-weight="bold" text-anchor="middle" fill="#31c96e">dailybitedeals.com</text>
</svg>`;
}

async function main() {
  await sharp(Buffer.from(renderSVG(1000, 1500, Math.min(6, ranked.length))), { density: 96 }).png().toFile(join(outDir, "pin.png"));
  await sharp(Buffer.from(renderSVG(1080, 1350, Math.min(5, ranked.length))), { density: 96 }).png().toFile(join(outDir, "ig.png"));

  // Pinterest set: up to 4 deal pins (Top Picks first) + 1 evergreen pin. Each has its own image and link.
  const pins = [];
  for (const [i, d] of ranked.slice(0, 4).entries()) {
    const file = `pin-${i + 1}.png`;
    await sharp(Buffer.from(renderDealPin(d)), { density: 96 }).png().toFile(join(outDir, file));
    const firstSentence = (d.desc || "").split(/(?<=[.!?])\s/)[0];
    const chainUrl = chainPageFor(d.brand);
    pins.push({
      file, link: chainUrl, board: d.cat || "",
      title: `${d.brand} Deal: ${d.deal} (${shortDate})`.slice(0, 100),
      description: `${d.brand} ${d.cat ? d.cat.toLowerCase() + " " : ""}deal verified ${prettyDate.split(",")[0]}: ${d.deal}. ${firstSentence} ${d.expires ? d.expires + "." : ""} See every current ${d.brand} deal, app offer and reward on our ${d.brand} deals page, plus today's other healthy food deals, checked each morning against official sources. dailybitedeals.com`.replace(/\s+/g, " ").slice(0, 500),
      alt: `Text graphic: ${d.brand}, ${d.deal}, verified healthy food deal for ${prettyDate} from DailyBite`.slice(0, 500),
    });
  }
  const ev = pickEvergreen();
  await sharp(Buffer.from(renderEvergreenPin(ev)), { density: 96 }).png().toFile(join(outDir, "pin-evergreen.png"));
  pins.push({
    file: "pin-evergreen.png", link: "https://dailybitedeals.com" + ev.url, board: "evergreen",
    title: ev.title.slice(0, 100),
    description: `${ev.title}. Which stores, what qualifies, when it runs, and how to stack it with free rewards. Updated ${shortDate}. Cheap healthy lunch and dinner ideas for busy weeks. More grocery sushi days and daily verified healthy food deals at dailybitedeals.com`.slice(0, 500),
    alt: `Text graphic: ${ev.title}, from DailyBite`.slice(0, 500),
  });

  const top = ranked.slice(0, 5);
  const caption = [
    `Today's verified healthy food deals (${shortDate}):`,
    "",
    ...top.map(d => `- ${d.brand}: ${d.deal}${Number.isFinite(d.est_savings) && d.est_savings > 0 ? ` (save ~$${d.est_savings % 1 ? d.est_savings.toFixed(2) : d.est_savings})` : ""}`),
    "",
    "Every deal checked this morning against official sources. Healthy chains only, no junk food. Full list at dailybitedeals.com (link in bio).",
    "",
    "#healthyfooddeals #healthyeating #fooddeals #dealoftheday #healthyfastfood #mealdeals #savemoney",
  ].join("\n");
  const meta = {
    date: prettyDate,
    pinTitle: `Today's Verified Healthy Food Deals: ${shortDate}`,
    pinDescription: `${top.slice(0, 3).map(d => `${d.brand}: ${d.deal}`).join(". ")}. Updated every morning at dailybitedeals.com`.slice(0, 500),
    caption,
    pins,
  };
  writeFileSync(join(outDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  console.log(`Wrote social/pin.png, social/ig.png, ${pins.length} Pinterest pins and social/meta.json (${ranked.length} deals available).`);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
