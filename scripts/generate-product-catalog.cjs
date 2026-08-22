/**
 * Premium studio product renders — photorealistic SVG vial/spray scenes per SKU.
 * GLP-3 uses the approved reference photograph; all others share the same studio session look.
 *
 * Run: node scripts/generate-product-catalog.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const PRODUCTS_TS = path.join(ROOT, "src", "data", "products.ts");
const OUT_DIR = path.join(ROOT, "public", "products");
const REF_GLP3 = path.join(ROOT, "scripts", "assets", "glp-3-reference.jpg");

const OUT_W = 640;
const OUT_H = 800;
const RENDER_W = 1600;
const RENDER_H = 2000;

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function purityFor(slug) {
  let hash = 0;
  for (const char of slug) hash += char.charCodeAt(0);
  return (99.6 + (hash % 4) / 10).toFixed(1);
}

function parseProducts(source) {
  const blocks = source.split(/\n  \{\n    slug: "/).slice(1);
  return blocks.map((block) => {
    const slug = block.match(/^([^"]+)"/)[1];
    const name = block.match(/name: "([^"]+)"/)[1];
    const form = block.match(/form: "([^"]+)"/)[1];
    const doseMatch = block.match(/variants: \[\s*variant\([^,]+,\s*"([^"]+)"/);
    const dose = doseMatch ? doseMatch[1] : "";
    return { slug, name, form, dose };
  });
}

function wrapTitle(name, max = 15) {
  const t = name.trim();
  if (t.length <= max) return [t];
  const parts = t.split(/\s+/);
  if (parts.length > 1 && parts[0].length <= max) {
    return [parts[0], parts.slice(1).join(" ").slice(0, max)];
  }
  return [t.slice(0, max - 1) + "…"];
}

function uid(slug) {
  return slug.replace(/[^a-z0-9]/gi, "x");
}

function labelBlock(product, x, y, w, h) {
  const lines = wrapTitle(product.name, 14);
  const dose = escapeXml((product.dose || "Research").toUpperCase());
  const purity = purityFor(product.slug);
  const purityText = `Purity \u2265 ${purity}%`;
  const doseW = Math.min(w - 40, Math.max(64, dose.length * 11 + 26));
  const purityW = Math.min(w - 40, Math.max(108, purityText.length * 6.8 + 26));
  const titleSize = lines[0].length > 12 ? 36 : lines[0].length > 9 ? 40 : 44;
  const titleY = lines.length > 1 ? y + 112 : y + 122;
  const line2 = lines.length > 1 ? `<tspan x="${x + 28}" dy="44">${escapeXml(lines[1])}</tspan>` : "";
  const doseY = lines.length > 1 ? y + 176 : y + 166;
  const purityY = doseY + 38;

  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#ffffff"/>
  <text x="${x + 28}" y="${y + 40}" font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="800" fill="#111111">klear.</text>
  <text x="${x + 104}" y="${y + 40}" font-family="Arial,Helvetica,sans-serif" font-size="17" font-weight="600" letter-spacing="1.4" fill="#111111">CLUB</text>
  <text x="${x + 28}" y="${titleY}" font-family="Arial,Helvetica,sans-serif" font-size="${titleSize}" font-weight="800" fill="#111111">${escapeXml(lines[0])}${line2}</text>
  <rect x="${x + 28}" y="${doseY}" width="${doseW}" height="38" rx="19" fill="#111111"/>
  <text x="${x + 40}" y="${doseY + 27}" font-family="Arial,Helvetica,sans-serif" font-size="23" font-weight="700" fill="#ffffff">${dose}</text>
  <rect x="${x + 28}" y="${purityY}" width="${purityW}" height="34" rx="17" fill="none" stroke="#111111" stroke-width="2.2"/>
  <text x="${x + 40}" y="${purityY + 24}" font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="600" fill="#111111">${purityText}</text>
  <text x="${x + 28}" y="${y + h - 30}" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="500" fill="#333333">Research Use Only</text>
  <rect x="${x}" y="${y + h - 16}" width="${w}" height="16" fill="#111111"/>`;
}

function vialSceneSvg(product) {
  const id = uid(product.slug);
  const cx = RENDER_W / 2;
  const bodyW = 248;
  const bodyH = 980;
  const bodyTop = 520;
  const labelW = 232;
  const labelH = 300;
  const labelX = cx - labelW / 2;
  const labelY = bodyTop + 268;

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${RENDER_W}" height="${RENDER_H}" viewBox="0 0 ${RENDER_W} ${RENDER_H}">
  <defs>
    <linearGradient id="glassEdge-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="8%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.02"/>
      <stop offset="92%" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.42"/>
    </linearGradient>
    <linearGradient id="glassInner-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.14"/>
    </linearGradient>
    <linearGradient id="leftGloss-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="rightGloss-${id}" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="metal-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8f9fb"/>
      <stop offset="14%" stop-color="#d5dbe2"/>
      <stop offset="48%" stop-color="#9aa4af"/>
      <stop offset="78%" stop-color="#d8dde4"/>
      <stop offset="100%" stop-color="#8b939d"/>
    </linearGradient>
    <linearGradient id="cap-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#eceff3"/>
    </linearGradient>
    <linearGradient id="powder-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#eceff2"/>
    </linearGradient>
    <clipPath id="glassClip-${id}">
      <rect x="${cx - bodyW / 2 + 2}" y="${bodyTop + 2}" width="${bodyW - 4}" height="${bodyH - 4}" rx="16"/>
    </clipPath>
  </defs>

  <rect width="${RENDER_W}" height="${RENDER_H}" fill="#000000"/>

  <g>
    <!-- glass vessel -->
    <rect x="${cx - bodyW / 2}" y="${bodyTop}" width="${bodyW}" height="${bodyH}" rx="18" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.18" stroke-width="2.5"/>
    <rect x="${cx - bodyW / 2 + 1}" y="${bodyTop + 1}" width="${bodyW - 2}" height="${bodyH - 2}" rx="17" fill="url(#glassInner-${id})"/>
    <rect x="${cx - bodyW / 2}" y="${bodyTop}" width="${bodyW}" height="${bodyH}" rx="18" fill="url(#glassEdge-${id})" opacity="0.75"/>

    <!-- lyophilized cake -->
    <g clip-path="url(#glassClip-${id})">
      <rect x="${cx - bodyW / 2 + 18}" y="${bodyTop + bodyH - 230}" width="${bodyW - 36}" height="190" fill="url(#powder-${id})"/>
      <ellipse cx="${cx}" cy="${bodyTop + bodyH - 230}" rx="${bodyW / 2 - 28}" ry="18" fill="#ffffff"/>
      <ellipse cx="${cx}" cy="${bodyTop + bodyH - 48}" rx="${bodyW / 2 - 22}" ry="24" fill="#ffffff" opacity="0.96"/>
    </g>

    ${labelBlock(product, labelX, labelY, labelW, labelH)}

    <!-- specular highlights -->
    <rect x="${cx - bodyW / 2 + 10}" y="${bodyTop + 12}" width="28" height="${bodyH - 24}" rx="12" fill="url(#leftGloss-${id})" opacity="0.62"/>
    <rect x="${cx + bodyW / 2 - 24}" y="${bodyTop + 60}" width="14" height="${bodyH - 140}" rx="7" fill="url(#rightGloss-${id})" opacity="0.5"/>

    <!-- crimp + cap -->
    <rect x="${cx - 98}" y="${bodyTop - 58}" width="196" height="58" rx="5" fill="url(#metal-${id})"/>
    ${Array.from({ length: 7 }, (_, i) => `<rect x="${cx - 94}" y="${bodyTop - 52 + i * 7}" width="188" height="1.2" fill="#ffffff" opacity="0.12"/>`).join("")}
    <rect x="${cx - 84}" y="${bodyTop - 118}" width="168" height="68" rx="11" fill="url(#cap-${id})"/>
    <rect x="${cx - 80}" y="${bodyTop - 122}" width="160" height="20" rx="9" fill="#ffffff"/>
    <rect x="${cx - 98}" y="${bodyTop - 58}" width="196" height="8" fill="#ffffff" opacity="0.22"/>

    <ellipse cx="${cx}" cy="${bodyTop + bodyH}" rx="${bodyW / 2 - 6}" ry="12" fill="#ffffff" opacity="0.07"/>
  </g>
</svg>`);
}

function spraySceneSvg(product) {
  const id = uid(product.slug);
  const cx = RENDER_W / 2;
  const bodyW = 220;
  const bodyH = 820;
  const bodyTop = 560;
  const labelW = 214;
  const labelH = 286;
  const labelX = cx - labelW / 2;
  const labelY = bodyTop + 240;

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${RENDER_W}" height="${RENDER_H}" viewBox="0 0 ${RENDER_W} ${RENDER_H}">
  <defs>
    <linearGradient id="sb-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
      <stop offset="18%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.25"/>
    </linearGradient>
    <linearGradient id="sc-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="sg-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${RENDER_W}" height="${RENDER_H}" fill="#000000"/>

  <g>
    <rect x="${cx - 58}" y="${bodyTop - 188}" width="116" height="128" rx="24" fill="url(#sc-${id})"/>
    <rect x="${cx - 36}" y="${bodyTop - 232}" width="72" height="56" rx="18" fill="url(#sc-${id})"/>
    <rect x="${cx - 20}" y="${bodyTop - 272}" width="40" height="48" rx="14" fill="#2563eb"/>
    <rect x="${cx - bodyW / 2}" y="${bodyTop}" width="${bodyW}" height="${bodyH}" rx="32" fill="#f8fafc"/>
    <rect x="${cx - bodyW / 2}" y="${bodyTop}" width="${bodyW}" height="${bodyH}" rx="32" fill="url(#sb-${id})"/>
    <rect x="${cx - bodyW / 2 + 12}" y="${bodyTop + 18}" width="26" height="${bodyH - 36}" rx="12" fill="url(#sg-${id})" opacity="0.65"/>
    <rect x="${cx - bodyW / 2 + 20}" y="${bodyTop + bodyH - 190}" width="${bodyW - 40}" height="160" rx="18" fill="#ffffff" opacity="0.18"/>
    ${labelBlock(product, labelX, labelY, labelW, labelH)}
  </g>
</svg>`);
}

async function rasterize(svgBuffer) {
  return sharp(svgBuffer)
    .resize(OUT_W, OUT_H, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.5, m1: 0.35, m2: 1.5 })
    .png({ quality: 98, compressionLevel: 6 })
    .toBuffer();
}

async function renderFromReference(refPath) {
  return sharp(refPath)
    .resize(OUT_W, OUT_H, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 }, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.35, m1: 0.25, m2: 1 })
    .png({ quality: 98 })
    .toBuffer();
}

async function renderCatalogImage(product) {
  if (product.slug === "glp-3" && fs.existsSync(REF_GLP3)) {
    return renderFromReference(REF_GLP3);
  }
  const svg = product.form === "spray" ? spraySceneSvg(product) : vialSceneSvg(product);
  return rasterize(svg);
}

async function main() {
  const source = fs.readFileSync(PRODUCTS_TS, "utf8");
  const products = parseProducts(source);
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let count = 0;
  for (const product of products) {
    const png = await renderCatalogImage(product);
    fs.writeFileSync(path.join(OUT_DIR, `${product.slug}.png`), png);
    count++;
    process.stdout.write(`\rGenerated ${count}/${products.length}`);
  }
  console.log(`\nDone — ${count} premium studio renders (${OUT_W}x${OUT_H})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
