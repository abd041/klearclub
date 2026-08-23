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

/** Thumbnails on flat white backgrounds. */
export const productImageClass = "object-contain object-center p-3 sm:p-4";

/** Gradient product cards — anchor image lower to reduce empty space below the vial. */
export const productCardImageClass =
  "object-contain object-bottom px-3 pt-2 pb-0.5 sm:px-4 sm:pt-3 sm:pb-1";

export function productLot(slug: string) {
  const code = slug.replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase();
  return `KC-${code}-0002`;
}

/** Klear catalog assets for floating vial animations (researcher gate, etc.). */
export const floatingProductSlugs = [
  "bpc-157",
  "tb-500",
  "nad-plus",
  "klear-h2o",
  "dsip",
  "ghk-cu",
  "tesamorelin",
  "melanotan-ii",
  "aod-9604",
  "glp-3",
  "semax",
  "ipamorelin",
] as const;

export const floatingHeroImages = floatingProductSlugs.map((slug) => ({
  src: productImage({ slug, form: "vial" }),
  alt: slug,
}));
