import type { CSSProperties } from "react";

export type ProductPalette = {
  top: string;
  bottom: string;
  label: string;
  accent: string;
  pedestal: string;
};

const PALETTES: ProductPalette[] = [
  { top: "#eee8fb", bottom: "#c4b5e8", label: "#ddd4f5", accent: "#2d2a6e", pedestal: "#b9a6e4" },
  { top: "#dbe8f8", bottom: "#7eb0f5", label: "#c8dcf8", accent: "#1a3a8a", pedestal: "#4d94ff" },
  { top: "#f6e4dc", bottom: "#e8a090", label: "#f2ddd4", accent: "#7a2e28", pedestal: "#e06c62" },
  { top: "#e6f1fb", bottom: "#9ec8ef", label: "#d4e8f8", accent: "#1e4a7a", pedestal: "#7eb6ea" },
  { top: "#e7f6ea", bottom: "#8fd4aa", label: "#d4f0dc", accent: "#1e5a40", pedestal: "#6dcaa0" },
  { top: "#fde8f0", bottom: "#e8a0b8", label: "#f8dce8", accent: "#7a2e48", pedestal: "#e889ab" },
  { top: "#fbf3d4", bottom: "#dfc860", label: "#f5ecc0", accent: "#6a5520", pedestal: "#e0c04a" },
  { top: "#e4f6f3", bottom: "#7dd4c8", label: "#d0f0ea", accent: "#1e5a52", pedestal: "#5ec4b8" },
];

const BY_SLUG: Record<string, ProductPalette> = {
  "glp-3": { top: "#eee8fb", bottom: "#c4b5e8", label: "#ddd4f5", accent: "#7c3aed", pedestal: "#b9a6e4" },
  "glp-2": { top: "#dbe8f8", bottom: "#7eb0f5", label: "#c8dcf8", accent: "#2563eb", pedestal: "#4d94ff" },
  "glp-1": { top: "#fde8ea", bottom: "#f07178", label: "#fbd5d8", accent: "#dc2626", pedestal: "#ef4444" },
  "ghk-cu": { top: "#e6f1fb", bottom: "#9ec8ef", label: "#d4e8f8", accent: "#0ea5e9", pedestal: "#7eb6ea" },
  tesamorelin: { top: "#fbf3d4", bottom: "#dfc860", label: "#f5ecc0", accent: "#ca8a04", pedestal: "#e0c04a" },
  "mots-c": { top: "#eee8fb", bottom: "#c4b5e8", label: "#ddd4f5", accent: "#9333ea", pedestal: "#b9a6e4" },
  "nad-plus": { top: "#fde8ea", bottom: "#f07178", label: "#fbd5d8", accent: "#dc2626", pedestal: "#ef4444" },
  "cjc-ipa-no-dac": { top: "#e4f6f3", bottom: "#7dd4c8", label: "#d0f0ea", accent: "#0d9488", pedestal: "#5ec4b8" },
  "bpc-157": { top: "#e7f6ea", bottom: "#8fd4aa", label: "#d4f0dc", accent: "#16a34a", pedestal: "#6dcaa0" },
  "klear-h2o": { top: "#fde8f0", bottom: "#e8a0b8", label: "#f8dce8", accent: "#db2777", pedestal: "#e889ab" },
  kpv: { top: "#e4f6f3", bottom: "#5ec4b8", label: "#d0f0ea", accent: "#0f766e", pedestal: "#4db8a8" },
  klow: { top: "#dbe8f8", bottom: "#7eb0f5", label: "#c8dcf8", accent: "#2563eb", pedestal: "#4d94ff" },
  semax: { top: "#dbe8f8", bottom: "#6ba3f0", label: "#c8dcf8", accent: "#1d4ed8", pedestal: "#4d94ff" },
  glutathione: { top: "#e0f7fa", bottom: "#5ec4d4", label: "#ccfbf1", accent: "#0891b2", pedestal: "#4db8c8" },
  "melanotan-ii": { top: "#fbf3d4", bottom: "#e8b84a", label: "#f5ecc0", accent: "#ca8a04", pedestal: "#dfc860" },
  glow: { top: "#fde8f0", bottom: "#e8a0b8", label: "#f8dce8", accent: "#db2777", pedestal: "#e889ab" },
  selank: { top: "#eee8fb", bottom: "#c4b5e8", label: "#ddd4f5", accent: "#9333ea", pedestal: "#b9a6e4" },
  "melanotan-i": { top: "#f6e4dc", bottom: "#d4a574", label: "#f2ddd4", accent: "#b45309", pedestal: "#c9956a" },
  "tb-500": { top: "#e6f1fb", bottom: "#7eb6ea", label: "#d4e8f8", accent: "#0284c7", pedestal: "#5eb0e8" },
  "igf-1-lr3": { top: "#dbe8f8", bottom: "#6ba3f0", label: "#c8dcf8", accent: "#1e40af", pedestal: "#4d94ff" },
  "5-amino-1mq": { top: "#fbf3d4", bottom: "#dfc860", label: "#f5ecc0", accent: "#ca8a04", pedestal: "#e0c04a" },
  "wolverine-stack": { top: "#e4f6f3", bottom: "#5ec4b8", label: "#d0f0ea", accent: "#0f766e", pedestal: "#4db8a8" },
  "pt-141": { top: "#fde8f0", bottom: "#f472b6", label: "#f8dce8", accent: "#db2777", pedestal: "#ec4899" },
  cagrilintide: { top: "#f0ebe6", bottom: "#c4a882", label: "#e8dfd4", accent: "#92400e", pedestal: "#b8956a" },
  "aod-9604": { top: "#fbf3d4", bottom: "#d4b84a", label: "#f5ecc0", accent: "#b45309", pedestal: "#dfc860" },
  dsip: { top: "#eee8fb", bottom: "#a78bfa", label: "#ddd4f5", accent: "#7c3aed", pedestal: "#9f7aea" },
  epithalon: { top: "#e7f6ea", bottom: "#6dcaa0", label: "#d4f0dc", accent: "#059669", pedestal: "#5eb88a" },
  ipamorelin: { top: "#dbe8f8", bottom: "#5b9cf5", label: "#c8dcf8", accent: "#2563eb", pedestal: "#4d94ff" },
  "snap-8": { top: "#f0ebe6", bottom: "#c4a882", label: "#e8dfd4", accent: "#92400e", pedestal: "#b8956a" },
  "thymosin-alpha-1": { top: "#e7f6ea", bottom: "#8fd4aa", label: "#d4f0dc", accent: "#16a34a", pedestal: "#6dcaa0" },
  "ghk-cu-spray": { top: "#e6f1fb", bottom: "#9ec8ef", label: "#d4e8f8", accent: "#0ea5e9", pedestal: "#7eb6ea" },
  "nad-plus-spray": { top: "#fde8f0", bottom: "#f07178", label: "#f8dce8", accent: "#db2777", pedestal: "#ef4444" },
  "semax-spray": { top: "#eee8fb", bottom: "#a78bfa", label: "#ddd4f5", accent: "#7c3aed", pedestal: "#9f7aea" },
  "selank-spray": { top: "#f3eeff", bottom: "#c4b5e8", label: "#ede5ff", accent: "#9333ea", pedestal: "#b9a6e4" },
  "pt-141-spray": { top: "#fde8f0", bottom: "#f472b6", label: "#f8dce8", accent: "#db2777", pedestal: "#ec4899" },
  "melanotan-ii-spray": { top: "#fbf3d4", bottom: "#d4a574", label: "#f5ecc0", accent: "#b45309", pedestal: "#c9956a" },
  "ll-37": { top: "#fde8dc", bottom: "#f0a878", label: "#fbd9c8", accent: "#ea580c", pedestal: "#e8925a" },
  cartalax: { top: "#fde8f0", bottom: "#f472b6", label: "#f8dce8", accent: "#db2777", pedestal: "#ec4899" },
  sermorelin: { top: "#fde8dc", bottom: "#f0a878", label: "#fbd9c8", accent: "#ea580c", pedestal: "#e8925a" },
  kisspeptin: { top: "#fde8f0", bottom: "#f472b6", label: "#f8dce8", accent: "#db2777", pedestal: "#ec4899" },
  dihexa: { top: "#fde8dc", bottom: "#f0a878", label: "#fbd9c8", accent: "#ea580c", pedestal: "#e8925a" },
  vip: { top: "#fde8ea", bottom: "#f07178", label: "#fbd5d8", accent: "#dc2626", pedestal: "#ef4444" },
  "ara-290": { top: "#e7f6ea", bottom: "#6dcaa0", label: "#d4f0dc", accent: "#059669", pedestal: "#5eb88a" },
  "dsip-spray": { top: "#eee8fb", bottom: "#a78bfa", label: "#ddd4f5", accent: "#7c3aed", pedestal: "#9f7aea" },
  "adalank-spray": { top: "#f3eeff", bottom: "#c4b5e8", label: "#ede5ff", accent: "#9333ea", pedestal: "#b9a6e4" },
  "adamax-spray": { top: "#dbe8f8", bottom: "#6ba3f0", label: "#c8dcf8", accent: "#2563eb", pedestal: "#4d94ff" },
  "bpc-tb-spray": { top: "#e7f6ea", bottom: "#6dcaa0", label: "#d4f0dc", accent: "#059669", pedestal: "#5eb88a" },
  "bpc-spray": { top: "#e4f6f3", bottom: "#5ec4b8", label: "#d0f0ea", accent: "#0f766e", pedestal: "#4db8a8" },
  pinealon: { top: "#dbe8f8", bottom: "#6ba3f0", label: "#c8dcf8", accent: "#2563eb", pedestal: "#4d94ff" },
  "ahk-cu": { top: "#eee8fb", bottom: "#c4b5e8", label: "#ddd4f5", accent: "#9333ea", pedestal: "#b9a6e4" },
};

export function productPalette(slug: string): ProductPalette {
  if (BY_SLUG[slug]) return BY_SLUG[slug];
  let hash = 0;
  for (const char of slug) hash = (hash + char.charCodeAt(0)) % PALETTES.length;
  return PALETTES[hash];
}

function lightenHex(hex: string, amount: number) {
  const n = Number.parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const mix = (channel: number) => Math.round(channel + (255 - channel) * amount);
  return `#${[mix(r), mix(g), mix(b)].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

/** Soft studio cyclorama — smooth pastel wall-to-floor transition, no banding. */
export function productCardStageStyle(slug: string): CSSProperties {
  const { top, label, bottom } = productPalette(slug);
  const wall = lightenHex(top, 0.22);
  const mid = lightenHex(label, 0.18);
  const floor = lightenHex(bottom, 0.12);
  return {
    backgroundColor: wall,
    backgroundImage: [
      "radial-gradient(ellipse 68% 20% at 50% 92%, rgba(15,23,42,0.07) 0%, rgba(15,23,42,0.02) 50%, transparent 72%)",
      "radial-gradient(ellipse 105% 75% at 50% -8%, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.28) 38%, transparent 65%)",
      `linear-gradient(180deg, ${wall} 0%, ${mid} 50%, ${floor} 100%)`,
    ].join(", "),
  };
}

/** @deprecated Use productCardStageStyle — kept for any legacy inline usage. */
export function productCardGradient(slug: string): string {
  const { top, label, bottom } = productPalette(slug);
  return `linear-gradient(180deg, ${top} 0%, ${label} 42%, ${bottom} 100%)`;
}
