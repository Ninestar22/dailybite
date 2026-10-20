// scripts/og-images.mjs
// Per-page Open Graph share cards (marketing pass, 2026-10-19). Every chain, explainer,
// holiday and guide page gets its own 1200x630 card built from its H1, so a shared link
// shows "Publix $5 Sushi Wednesday" instead of the generic site card. Cards live in og/
// (committed) and are re-rendered only when a page's H1 changes (og/manifest.json keeps
// the hash), so the daily commit does not churn images. build.mjs points og:image at
// og/<slug>.png when the file exists and falls back to /og.png otherwise, which means the
// first run after adding a page uses the generic card and the next build picks up the new
// one. Run after build: node scripts/og-images.mjs   (needs sharp; CI installs it)
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "og");
mkdirSync(outDir, { recursive: true });
const SITE = "https://dailybitedeals.com";
const FONT = "DejaVu Sans, Verdana, Arial, sans-serif";
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const unent = s => String(s).replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&middot;/g, "·").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");

function wrap(text, maxChars, maxLines) {
  const words = String(text).split(/\s+/); const lines = []; let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars && line) { lines.push(line); line = w; } else line = (line + " " + w).trim();
    if (lines.length === maxLines) break;
  }
  if (lines.length < maxLines && line) lines.push(line);
  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, "") + "…";
  return lines;
}
function brandMark(x, y, size) {
  const s = size / 456;
  return `<g transform="translate(${x} ${y}) scale(${s}) translate(-28 -28)"><mask id="bite"><rect x="0" y="0" width="512" height="512" fill="#fff"/><circle cx="428" cy="80" r="80" fill="#000"/></mask><rect x="36" y="36" width="440" height="440" rx="104" fill="#1f9e54" mask="url(#bite)"/><path fill="#fff" fill-rule="evenodd" d="M154 144H240A112 112 0 0 1 240 368H154ZM216 200H240A56 56 0 0 1 240 312H216Z"/></g>`;
}
function kickerFor(slug) {
  if (/-deals$/.test(slug)) return "TODAY'S VERIFIED DEALS";
  if (/sushi|friday|wednesday|tuesday|mix-and-match|sub-of-the-week/.test(slug)) return "WEEKLY DEAL, EXPLAINED";
  if (/day-deals|free-meals|black-friday|12-days|boorito/.test(slug)) return "SEASONAL DEALS";
  return "GUIDE";
}
function card(h1, slug) {
  const W = 1200, H = 630;
  const lines = wrap(h1, 24, 3);
  const fs = lines.length > 2 ? 60 : lines.length > 1 ? 68 : 74;
  const startY = 290 - (lines.length - 1) * Math.round(fs * 0.55);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#f7f8f5"/>
<rect width="${W}" height="14" fill="#1f9e54"/>
${brandMark(64, 56, 72)}
<text x="156" y="104" font-family="${FONT}" font-size="40" font-weight="bold"><tspan fill="#18211b">Daily</tspan><tspan fill="#1f9e54">Bite</tspan></text>
<text x="64" y="190" font-family="${FONT}" font-size="22" font-weight="bold" fill="#1f9e54" letter-spacing="2">${esc(kickerFor(slug))}</text>
${lines.map((ln, i) => `<text x="64" y="${startY + i * Math.round(fs * 1.18)}" font-family="${FONT}" font-size="${fs}" font-weight="bold" fill="#18211b">${esc(ln)}</text>`).join("\n")}
<rect x="64" y="${H - 130}" width="440" height="48" rx="24" fill="#1f9e54"/>
<text x="284" y="${H - 97}" font-family="${FONT}" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle">RE-VERIFIED EVERY MORNING</text>
<text x="${W - 64}" y="${H - 92}" font-family="${FONT}" font-size="30" font-weight="bold" fill="#54655a" text-anchor="end">dailybitedeals.com</text>
</svg>`;
}

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const slugs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].slice(SITE.length + 1)).filter(Boolean);
const manPath = join(outDir, "manifest.json");
let manifest = {};
try { manifest = JSON.parse(readFileSync(manPath, "utf8")); } catch {}
let made = 0, kept = 0;
for (const slug of slugs) {
  let html; try { html = readFileSync(join(root, `${slug}.html`), "utf8"); } catch { continue; }
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!m) continue;
  const h1 = unent(m[1].replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
  const hash = createHash("sha1").update(h1).digest("hex").slice(0, 12);
  const file = join(outDir, `${slug}.png`);
  if (manifest[slug] === hash && existsSync(file)) { kept++; continue; }
  await sharp(Buffer.from(card(h1, slug)), { density: 96 }).png({ compressionLevel: 9, palette: true }).toFile(file);
  manifest[slug] = hash; made++;
}
for (const k of Object.keys(manifest)) if (!slugs.includes(k)) delete manifest[k];
writeFileSync(manPath, JSON.stringify(manifest, null, 1) + "\n");
console.log(`OG cards: ${made} rendered, ${kept} unchanged, ${slugs.length} pages.`);
