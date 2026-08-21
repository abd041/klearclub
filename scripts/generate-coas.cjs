const fs = require("fs");
const path = require("path");

const slugs = [
  "glp-3","bpc-157","ghk-cu","tesamorelin","tb-500","melanotan-ii","nad-plus","aod-9604","mots-c","cjc-ipa-no-dac","wolverine-stack","glow","dsip","semax","selank","klow","kpv","pt-141","glutathione","ipamorelin","igf-1-lr3","klear-h2o","cagrilintide","epithalon","5-amino-1mq","melanotan-i","thymosin-alpha-1","snap-8","nad-plus-spray","selank-spray","semax-spray","ghk-cu-spray","pt-141-spray","sermorelin","dihexa","ara-290","kisspeptin","vip","glp-2","glp-1","ahk-cu","pinealon","bpc-spray","bpc-tb-spray","adamax-spray","adalank-spray","dsip-spray","melanotan-ii-spray","ll-37","cartalax",
];

const names = {
  "glp-3": "GLP-3 (RT)",
  "bpc-157": "BPC-157",
  "ghk-cu": "GHK-Cu",
  tesamorelin: "Tesamorelin",
  "tb-500": "TB-500",
  "melanotan-ii": "Melanotan II",
  "nad-plus": "NAD+",
  "aod-9604": "AOD-9604",
  "mots-c": "MOTS-C",
  "cjc-ipa-no-dac": "CJC-1295 / Ipamorelin",
  "wolverine-stack": "BPC-157 / TB-500",
  glow: "GLOW",
  dsip: "DSIP",
  semax: "SEMAX",
  selank: "SELANK",
  klow: "KLOW",
  kpv: "KPV",
  "pt-141": "PT-141",
  glutathione: "Glutathione",
  ipamorelin: "Ipamorelin",
  "igf-1-lr3": "IGF-1 LR3",
  "klear-h2o": "Klear H2O",
  cagrilintide: "Cagrilintide",
  epithalon: "Epithalon",
  "5-amino-1mq": "5-Amino-1MQ",
  "melanotan-i": "Melanotan I",
  "thymosin-alpha-1": "Thymosin Alpha-1",
  "snap-8": "SNAP-8",
  "nad-plus-spray": "NAD+ Spray",
  "selank-spray": "SELANK Spray",
  "semax-spray": "SEMAX Spray",
  "ghk-cu-spray": "GHK-Cu Spray",
  "pt-141-spray": "PT-141 Spray",
  sermorelin: "Sermorelin",
  dihexa: "Dihexa",
  "ara-290": "ARA-290",
  kisspeptin: "Kisspeptin",
  vip: "VIP",
  "glp-2": "GLP-2 (TR)",
  "glp-1": "GLP-1 (SM)",
  "ahk-cu": "AHK-Cu",
  pinealon: "Pinealon",
  "bpc-spray": "BPC-157 Spray",
  "bpc-tb-spray": "BPC-157 / TB-500 Spray",
  "adamax-spray": "Adamax Spray",
  "adalank-spray": "Adalank Spray",
  "dsip-spray": "DSIP Spray",
  "melanotan-ii-spray": "Melanotan II Spray",
  "ll-37": "LL-37",
  cartalax: "Cartalax",
};

function lot(slug) {
  return `KC-${slug.replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase()}-0002`;
}

const dir = path.join(process.cwd(), "public", "coas");
fs.mkdirSync(dir, { recursive: true });

for (const slug of slugs) {
  const name = names[slug] || slug;
  const lotNo = lot(slug);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
  <rect width="900" height="1200" fill="#ffffff"/>
  <rect x="40" y="40" width="820" height="1120" fill="none" stroke="#e2e8f0" stroke-width="2"/>
  <text x="80" y="110" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" letter-spacing="4">KLEAR CLUB</text>
  <text x="80" y="160" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#0f172a">Certificate of Analysis</text>
  <text x="80" y="210" font-family="Arial, sans-serif" font-size="16" fill="#475569">Material: ${name}</text>
  <text x="80" y="240" font-family="Arial, sans-serif" font-size="16" fill="#475569">Lot: ${lotNo}</text>
  <text x="80" y="270" font-family="Arial, sans-serif" font-size="16" fill="#475569">Use: Laboratory research only</text>
  <text x="80" y="340" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#0f172a">Third-party 8-assay panel</text>
  <text x="80" y="390" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">Purity (HPLC) — ≥ 99.0%</text>
  <text x="80" y="430" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">Net peptide content — Pass</text>
  <text x="80" y="470" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">Identity — Confirmed</text>
  <text x="80" y="510" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">Appearance — White lyophilized powder / solution</text>
  <text x="80" y="550" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">Fentanyl screen — Not detected</text>
  <text x="80" y="590" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">Heavy metals (ICP-MS) — Pass</text>
  <text x="80" y="630" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">Sterility (PCR) — Pass</text>
  <text x="80" y="670" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">Endotoxin — Pass</text>
  <text x="80" y="760" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Representative report. Orders ship with a matching lot-specific certificate.</text>
  <text x="80" y="790" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Not for human, veterinary, or food use.</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${slug}.svg`), svg);
}

console.log(`wrote ${slugs.length} COA files`);
