/**
 * Temporarily use the TB-500 product photo for every catalog SKU.
 * Run: node scripts/apply-tb500-to-all.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PRODUCTS_TS = path.join(ROOT, "src", "data", "products.ts");
const OUT_DIR = path.join(ROOT, "public", "products");
const SRC = path.join(OUT_DIR, "tb-500.png");

if (!fs.existsSync(SRC)) {
  console.error("Missing source:", SRC);
  process.exit(1);
}

const source = fs.readFileSync(PRODUCTS_TS, "utf8");
const slugs = [...source.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const buf = fs.readFileSync(SRC);

let count = 0;
for (const slug of slugs) {
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.png`), buf);
  count++;
}

console.log(`Applied tb-500.png to ${count} product images`);
