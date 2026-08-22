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
  "glp-3": PALETTES[0],
  "bpc-157": PALETTES[1],
  "ghk-cu": PALETTES[2],
  tesamorelin: PALETTES[3],
};

export function productPalette(slug: string): ProductPalette {
  if (BY_SLUG[slug]) return BY_SLUG[slug];
  let hash = 0;
  for (const char of slug) hash = (hash + char.charCodeAt(0)) % PALETTES.length;
  return PALETTES[hash];
}
