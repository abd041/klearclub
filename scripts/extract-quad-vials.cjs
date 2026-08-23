/**
 * Extract 4 vials from quad strip → transparent PNGs per slug.
 * Usage: node scripts/extract-quad-vials.cjs [src.jpg] slug1 slug2 slug3 slug4
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const args = process.argv.slice(2);
const imageArg = args.find((a) => /\.(jpe?g|png)$/i.test(a));
const SRC = imageArg
  ? path.resolve(imageArg)
  : path.join(__dirname, "assets", "quad-vials-src.jpg");
const SLUGS = args.filter((a) => a !== imageArg);
const SLUG_LIST = SLUGS.length > 0 ? SLUGS : ["glp-3", "glp-2", "glp-1", "ghk-cu"];
const OUT_DIR = path.join(__dirname, "..", "public", "products");
const OUT_W = 640;
const OUT_H = 800;

function isNearBlack(r, g, b, a) {
  if (a < 8) return true;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  if (lum <= 22) return true;
  if (lum <= 38 && sat <= 20) return true;
  return false;
}

function isNearWhite(r, g, b) {
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  if (lum >= 248) return true;
  if (lum >= 235 && sat <= 18) return true;
  if (lum >= 220 && sat <= 10) return true;
  return false;
}

function detectBgMode(buffer, width, height, channels) {
  const samples = [];
  for (const [x, y] of [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ]) {
    const i = (y * width + x) * channels;
    samples.push(0.2126 * buffer[i] + 0.7152 * buffer[i + 1] + 0.0722 * buffer[i + 2]);
  }
  const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
  return avg > 180 ? "white" : "black";
}

function removeBg(buffer, width, height, channels, mode) {
  const isBg =
    mode === "white"
      ? (r, g, b) => isNearWhite(r, g, b)
      : (r, g, b, a) => isNearBlack(r, g, b, a);

  const out = Buffer.from(buffer);
  const N = width * height;
  const bg = new Uint8Array(N);
  const idx = (x, y) => y * width + x;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];
      const a = out[i + 3];
      const hit = mode === "white" ? isBg(r, g, b) : isBg(r, g, b, a);
      if (hit && (x < 2 || y < 2 || x >= width - 2 || y >= height - 2)) bg[idx(x, y)] = 1;
    }
  }

  const q = [];
  for (let i = 0; i < N; i++) if (bg[i]) q.push(i);
  let qi = 0;
  while (qi < q.length) {
    const p = q[qi++];
    const x = p % width;
    const y = (p / width) | 0;
    for (const [nx, ny] of [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ]) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const ni = idx(nx, ny);
      if (bg[ni]) continue;
      const o = ni * channels;
      const hit =
        mode === "white"
          ? isBg(out[o], out[o + 1], out[o + 2])
          : isBg(out[o], out[o + 1], out[o + 2], out[o + 3]);
      if (hit) {
        bg[ni] = 1;
        q.push(ni);
      }
    }
  }

  for (let p = 0; p < N; p++) {
    if (bg[p]) out[p * channels + 3] = 0;
  }
  return out;
}

function removeBlackBg(buffer, width, height, channels) {
  return removeBg(buffer, width, height, channels, "black");
}

async function normalizeVial(inputBuffer) {
  const meta = await sharp(inputBuffer).metadata();
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleaned = removeBg(data, info.width, info.height, info.channels, detectBgMode(data, info.width, info.height, info.channels));
  const trimmed = await sharp(cleaned, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 10 })
    .toBuffer({ resolveWithObject: true });

  const targetH = Math.round(OUT_H * 0.72);
  return sharp(trimmed.data, {
    raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 },
  })
    .resize({
      height: targetH,
      fit: "inside",
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .extend({
      top: Math.round((OUT_H - targetH) * 0.08),
      bottom: Math.round((OUT_H - targetH) * 0.92),
      left: 0,
      right: 0,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(OUT_W, OUT_H, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  const meta = await sharp(SRC).metadata();
  const panelW = Math.floor(meta.width / SLUG_LIST.length);

  for (let i = 0; i < SLUG_LIST.length; i++) {
    const left = i * panelW;
    const width = i === SLUG_LIST.length - 1 ? meta.width - left : panelW;
    const cropped = await sharp(SRC)
      .extract({ left, top: 0, width, height: meta.height })
      .png()
      .toBuffer();

    const normalized = await normalizeVial(cropped);
    const outPath = path.join(OUT_DIR, `${SLUG_LIST[i]}.png`);
    fs.writeFileSync(outPath, normalized);
    console.log("Wrote", outPath);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
