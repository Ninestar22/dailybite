// scripts/build.mjs
// Reads deals.json and injects it into index.html between the
// /* DEALS:START */ ... /* DEALS:END */ markers.
// Run: node scripts/build.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = join(root, "index.html");
const dataPath = join(root, "deals.json");

const START = "/* DEALS:START */";
const END = "/* DEALS:END */";

function main() {
  const data = JSON.parse(readFileSync(dataPath, "utf8"));
  const deals = Array.isArray(data) ? data : data.deals;
  if (!Array.isArray(deals) || deals.length === 0) {
    throw new Error("deals.json has no deals array — refusing to build an empty page.");
  }

  const html = readFileSync(htmlPath, "utf8");
  const startIdx = html.indexOf(START);
  const endIdx = html.indexOf(END);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error("Could not find DEALS:START / DEALS:END markers in index.html.");
  }

  // JSON is valid JS for object/array literals, so we can inject it directly.
  const block = `${START}\nconst DEALS = ${JSON.stringify(deals, null, 2)};\n${END}`;
  const out = html.slice(0, startIdx) + block + html.slice(endIdx + END.length);

  writeFileSync(htmlPath, out);
  console.log(`Built index.html with ${deals.length} deals.`);
}

main();
