/**
 * Remove white halos left from studio-bg extraction on transparent PNGs.
 * Usage: node scripts/clean-product-fringe.cjs [slug.png ...]
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const OUT_DIR = path.join(__dirname, "..", "public", "products");
const targets = process.argv.slice(2);

function defringe(data, channels) {
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    let a = data[i + 3];
    if (a === 0) continue;
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max - min;
    // Kill leftover white/light-gray studio fringe
    if (lum >= 248 || (lum >= 238 && sat <= 12)) {
      data[i + 3] = 0;
      continue;
    }
    if (lum >= 220 && sat <= 18 && a < 255) {
      const t = Math.min(1, (lum - 220) / 35);
      data[i + 3] = Math.round(a * (1 - t * 0.95));
    }
  }
}

async function clean(file) {
  const p = file.includes(path.sep) || file.includes("/") ? path.resolve(file) : path.join(OUT_DIR, file.endsWith(".png") ? file : `${file}.png`);
  const { data, info } = await sharp(p).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  defringe(data, info.channels);
  await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png({ compressionLevel: 9 })
    .toFile(p + ".tmp");
  fs.renameSync(p + ".tmp", p);
  console.log("Cleaned", p);
}

async function main() {
  const files =
    targets.length > 0
      ? targets
      : fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".png"));
  for (const f of files) await clean(f);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
