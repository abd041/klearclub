/**
 * Replace hero cluster: black-studio JPEG → transparent PNG.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "..", "public", "hero", "_hero-src.jpg");
const OUT = path.join(__dirname, "..", "public", "hero", "hero-products.png");

function isNearBlack(r, g, b) {
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  // Pure / near-black studio backdrop
  if (lum <= 18) return true;
  if (lum <= 32 && sat <= 18) return true;
  if (lum <= 42 && sat <= 10 && max <= 48) return true;
  return false;
}

function softAlpha(r, g, b) {
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  // Feather dark edge into BG (keeps glass rim highlights)
  if (lum < 55 && sat < 28) {
    const t = Math.min(1, (55 - lum) / 40);
    return Math.round(255 * (1 - t * 0.92));
  }
  return 255;
}

async function main() {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data);
  const N = width * height;
  const bg = new Uint8Array(N); // 1 = background seed

  // Seed from edges + any near-black
  const idx = (x, y) => y * width + x;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (isNearBlack(out[i], out[i + 1], out[i + 2])) {
        // Only flood from image border region OR contiguous from border
        if (x < 2 || y < 2 || x >= width - 2 || y >= height - 2) {
          bg[idx(x, y)] = 1;
        }
      }
    }
  }

  // BFS flood fill of near-black connected to border
  const q = [];
  for (let i = 0; i < N; i++) if (bg[i]) q.push(i);
  let qi = 0;
  while (qi < q.length) {
    const p = q[qi++];
    const x = p % width;
    const y = (p / width) | 0;
    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const ni = idx(nx, ny);
      if (bg[ni]) continue;
      const o = ni * channels;
      if (isNearBlack(out[o], out[o + 1], out[o + 2])) {
        bg[ni] = 1;
        q.push(ni);
      }
    }
  }

  for (let p = 0; p < N; p++) {
    const i = p * channels;
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    if (bg[p]) {
      out[i + 3] = 0;
    } else {
      // Also clear isolated near-black speckles far from product? skip
      const fa = softAlpha(r, g, b);
      // Only apply soft alpha if neighbor has bg (edge feather)
      const x = p % width;
      const y = (p / width) | 0;
      let nearBg = false;
      for (let dy = -2; dy <= 2 && !nearBg; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          if (bg[idx(nx, ny)]) {
            nearBg = true;
            break;
          }
        }
      }
      if (nearBg && fa < 255) out[i + 3] = Math.min(out[i + 3], fa);
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  let opaque = 0;
  let trans = 0;
  for (let i = 0; i < out.length; i += 4) {
    if (out[i + 3] < 128) trans++;
    else opaque++;
  }
  console.log("Wrote", OUT);
  console.log(`${width}x${height} opaque=${opaque} transparent=${trans}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
