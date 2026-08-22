/**
 * Remove soft lilac / near-white studio background from hero product cluster.
 * Keeps bottles + soft contact shadows; writes transparent PNG.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "..", "public", "hero", "hero-products.png");
const OUT = SRC;

function isBg(r, g, b, a) {
  if (a < 8) return true;
  // Soft lilac / periwinkle / off-white studio wash
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // Very light neutrals / lavenders
  if (lum > 215 && sat < 45) return true;
  if (lum > 200 && sat < 28) return true;
  // Pale blue-lavender (B slightly higher)
  if (lum > 190 && b >= g - 4 && b >= r - 8 && sat < 55 && r > 170 && g > 170) return true;
  // Near-white corners
  if (r > 235 && g > 235 && b > 235) return true;
  return false;
}

function softAlpha(r, g, b) {
  // Feather edge: partial transparency for near-bg pixels
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  if (lum > 205 && sat < 50) {
    const t = Math.min(1, (lum - 205) / 40 + (50 - sat) / 50);
    return Math.round(255 * (1 - Math.min(1, t * 0.85)));
  }
  return 255;
}

async function main() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.from(data);

  for (let i = 0; i < out.length; i += channels) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const a = out[i + 3];
    if (isBg(r, g, b, a)) {
      out[i + 3] = 0;
    } else {
      const fa = softAlpha(r, g, b);
      if (fa < a) out[i + 3] = fa;
    }
  }

  // Light despeckle: kill tiny bg islands inside transparent areas near edges
  // (skip — keep product detail)

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(OUT + ".tmp.png");

  fs.renameSync(OUT + ".tmp.png", OUT);

  const check = await sharp(OUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let opaque = 0;
  let trans = 0;
  for (let i = 0; i < check.data.length; i += 4) {
    if (check.data[i + 3] < 128) trans++;
    else opaque++;
  }
  console.log("Wrote", OUT);
  console.log(`${width}x${height} opaque=${opaque} transparent=${trans}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
