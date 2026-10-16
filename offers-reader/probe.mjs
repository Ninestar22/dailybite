// Probe candidate account URLs in the same Chrome profile: prints where each lands and its title.
//   node probe.mjs https://... https://...
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const here = dirname(fileURLToPath(import.meta.url));
const ctx = await chromium.launchPersistentContext(join(here, "profile"), { channel: "chrome", headless: false, viewport: { width: 1280, height: 900 }, args: ["--disable-blink-features=AutomationControlled"] });
for (const u of process.argv.slice(2)) {
  const page = await ctx.newPage();
  try {
    const res = await page.goto(u, { waitUntil: "domcontentloaded", timeout: 40000 });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const text = await page.evaluate(() => document.body ? document.body.innerText : "");
    console.log(`${res ? res.status() : "?"} | ${u}\n   -> ${page.url()}\n   title: ${await page.title()} | ${text.length} chars | ${text.replace(/\s+/g, " ").slice(0, 140)}`);
  } catch (e) { console.log(`ERR | ${u} | ${String(e.message).slice(0, 120)}`); }
  await page.close();
}
await ctx.close();
