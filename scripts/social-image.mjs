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
    const best = d.best ? `<rect x="${W - pad - Math.round(W * 0.17)}" y="${y}" width="${Math.round(W * 0.17)}" height="${Math.round(cardH * 0.24)}" rx="6" fill="#ffb020"/><text x="${W - pad - Math.round(W * 0.085)}" y="${y + Math.round(cardH * 0.17)}" font-family="${FONT}" font-size="${Math.round(cardH * 0.12)}" font-weight="bold" fill="#1a1200" text-anchor="middle">TOP PICK</text>` : "";
    return `<rect x="${pad}" y="${y}" width="${W - pad * 2}" height="${cardH}" rx="16" fill="#191c23" stroke="#2a2f3a" stroke-width="2"/>
${best}
<text x="${textX}" y="${brandY}" font-family="${FONT}" font-size="${brandFS}" font-weight="bold" fill="#ffb020">${esc(d.brand)}</text>
${lines.map((ln, j) => `<text x="${textX}" y="${firstLineY + j * Math.round(dealFS * 1.25)}" font-family="${FONT}" font-size="${dealFS}" font-weight="bold" fill="#f4f5f7">${esc(ln)}</text>`).join("\n")}`;
  }).join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#0f1115"/>
<rect width="${W}" height="${Math.round(H * 0.004)}" fill="#ff5a3c"/>
<text x="${W / 2}" y="${Math.round(headerH * 0.42)}" font-family="${FONT}" font-size="${Math.round(W * 0.062)}" font-weight="bold" text-anchor="middle"><tspan fill="#f4f5f7">Daily</tspan><tspan fill="#ff5a3c">Bite</tspan></text>
<text x="${W / 2}" y="${Math.round(headerH * 0.63)}" font-family="${FONT}" font-size="${Math.round(W * 0.03)}" text-anchor="middle" fill="#9aa3b2">Today's Verified Food Deals</text>
<text x="${W / 2}" y="${Math.round(headerH * 0.82)}" font-family="${FONT}" font-size="${Math.round(W * 0.026)}" font-weight="bold" text-anchor="middle" fill="#ffb020">${esc(prettyDate)}</text>
${cards}
<text x="${W / 2}" y="${H - Math.round(footerH * 0.4)}" font-family="${FONT}" font-size="${Math.round(W * 0.03)}" font-weight="bold" text-anchor="middle" fill="#ff5a3c">dailybitedeals.com</text>
</svg>`;
}

async function main() {
  await sharp(Buffer.from(renderSVG(1000, 1500, Math.min(6, ranked.length))), { density: 96 }).png().toFile(join(outDir, "pin.png"));
  await sharp(Buffer.from(renderSVG(1080, 1350, Math.min(5, ranked.length))), { density: 96 }).png().toFile(join(outDir, "ig.png"));

  const top = ranked.slice(0, 5);
  const caption = [
    `Today's verified food deals (${shortDate}):`,
    "",
    ...top.map(d => `- ${d.brand}: ${d.deal}`),
    "",
    "Every deal checked this morning against official sources. Full list at dailybitedeals.com (link in bio).",
    "",
    "#fooddeals #cheapeats #healthyfastfood #dealoftheday #foodie #savemoney",
  ].join("\n");
  const meta = {
    date: prettyDate,
    pinTitle: `Today's Verified Food Deals: ${shortDate}`,
    pinDescription: `${top.slice(0, 3).map(d => `${d.brand}: ${d.deal}`).join(". ")}. Updated every morning at dailybitedeals.com`.slice(0, 500),
    caption,
  };
  writeFileSync(join(outDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  console.log(`Wrote social/pin.png, social/ig.png, social/meta.json (${ranked.length} deals available).`);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
