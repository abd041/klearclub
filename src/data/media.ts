import type { Product } from "@/types/catalog";

const HERO = {
  bpc: "/hero/bpc.png",
  tb: "/hero/tb.png",
  nad: "/hero/nad.png",
  ghk: "/hero/ghk.png",
  dsip: "/hero/dsip.png",
  water: "/hero/h2o.png",
  tesamorelin: "/hero/tesamorelin.png",
  melanotan: "/hero/melanotan.png",
  aod: "/hero/aod.png",
  spray: "/hero/spray.png",
  vial: "/products/vial.png",
} as const;

/** Light backdrop for cart / checkout thumbnails. */
export const PRODUCT_IMAGE_BG = "#ffffff";

export function productImage(product: Pick<Product, "slug" | "form">) {
  return `/products/${product.slug}.png`;
}

/** Transparent vial on gradient card background. */
export const productImageClass = "object-contain object-center p-3 sm:p-4";

export function productLot(slug: string) {
  const code = slug.replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase();
  return `KC-${code}-0002`;
}

export const floatingHeroImages = [
  { src: HERO.bpc, alt: "BPC-157" },
  { src: HERO.tb, alt: "TB-500" },
  { src: HERO.nad, alt: "NAD+" },
  { src: HERO.water, alt: "Klear H2O" },
  { src: HERO.dsip, alt: "DSIP" },
  { src: HERO.ghk, alt: "GHK-Cu" },
  { src: HERO.tesamorelin, alt: "Tesamorelin" },
  { src: HERO.melanotan, alt: "Melanotan II" },
  { src: HERO.aod, alt: "AOD-9604" },
];
