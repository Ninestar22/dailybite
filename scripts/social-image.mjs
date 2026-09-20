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

async function main() {
  await sharp(Buffer.from(renderSVG(1000, 1500, Math.min(6, ranked.length))), { density: 96 }).png().toFile(join(outDir, "pin.png"));
  await sharp(Buffer.from(renderSVG(1080, 1350, Math.min(5, ranked.length))), { density: 96 }).png().toFile(join(outDir, "ig.png"));

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
  };
  writeFileSync(join(outDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  console.log(`Wrote social/pin.png, social/ig.png, social/meta.json (${ranked.length} deals available).`);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
