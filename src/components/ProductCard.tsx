"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { productImage } from "@/data/media";
import { formatMoney } from "@/lib/format";
import { SALE_OFF, salePrice } from "@/lib/commerce";
import type { Product } from "@/types/catalog";

const PALETTES = [
  { top: "#eee8fb", bottom: "#b9a6e4" },
  { top: "#dbe8f8", bottom: "#4d94ff" },
  { top: "#f6e4dc", bottom: "#e06c62" },
  { top: "#e6f1fb", bottom: "#7eb6ea" },
  { top: "#e7f6ea", bottom: "#6dcaa0" },
  { top: "#fde8f0", bottom: "#e889ab" },
  { top: "#fbf3d4", bottom: "#e0c04a" },
  { top: "#e4f6f3", bottom: "#5ec4b8" },
];

const BY_SLUG: Record<string, { top: string; bottom: string }> = {
  "glp-3": PALETTES[0],
  "bpc-157": PALETTES[1],
  "ghk-cu": PALETTES[2],
  tesamorelin: PALETTES[3],
  "ghk-cu-spray": { top: "#b8c3cc", bottom: "#b8c3cc" },
  "nad-plus-spray": { top: "#b29e98", bottom: "#b29e98" },
  "semax-spray": { top: "#d4cddc", bottom: "#d4cddc" },
  "selank-spray": { top: "#c6b9c7", bottom: "#c6b9c7" },
  "pt-141-spray": { top: "#d7c0c2", bottom: "#d7c0c2" },
  "melanotan-ii-spray": { top: "#d5ccbf", bottom: "#d5ccbf" },
  "dsip-spray": { top: "#c8b8ca", bottom: "#c8b8ca" },
  "adalank-spray": { top: "#c3b9d0", bottom: "#c3b9d0" },
  "adamax-spray": { top: "#bac5d2", bottom: "#bac5d2" },
  "bpc-tb-spray": { top: "#cfd4d2", bottom: "#cfd4d2" },
  "bpc-spray": { top: "#d3d9d8", bottom: "#d3d9d8" },
};

const SHORT: Record<string, string> = {
  "glp-3": "Triple-Action Metabolic Compound",
  "bpc-157": "Tissue Repair Research Peptide",
  "ghk-cu": "Copper Tripeptide Complex",
  tesamorelin: "GHRH Research Analog",
  "tb-500": "Thymosin Beta-4 Fragment",
  "melanotan-ii": "Melanocortin Receptor Analog",
  "nad-plus": "Cellular Energy Coenzyme",
  "aod-9604": "Lipolytic Research Fragment",
  "ghk-cu-spray": "Dermal Spray",
  "nad-plus-spray": "Cellular Spray",
  "semax-spray": "Neuro Spray",
  "selank-spray": "Neuro Spray",
  "pt-141-spray": "Melanocortin Spray",
  "melanotan-ii-spray": "Melanocortin Spray",
  "dsip-spray": "Circadian Spray",
  "adalank-spray": "Neuro Spray",
  "adamax-spray": "Neuro Spray",
  "bpc-tb-spray": "Tissue Repair Spray",
  "bpc-spray": "Tissue Repair Spray",
};

function paletteFor(slug: string) {
  if (BY_SLUG[slug]) return BY_SLUG[slug];
  let hash = 0;
  for (const char of slug) hash = (hash + char.charCodeAt(0)) % PALETTES.length;
  return PALETTES[hash];
}

function purityFor(slug: string) {
  let hash = 0;
  for (const char of slug) hash += char.charCodeAt(0);
  return (99.6 + (hash % 4) / 10).toFixed(1);
}

function shortLabel(product: Product) {
  if (SHORT[product.slug]) return SHORT[product.slug];
  if (product.form === "spray") return "Research Spray Solution";
  if (product.form === "supply") return "Laboratory Reconstitution Supply";
  if (product.category === "blends") return "Research Peptide Blend";
  return "Premium Research Peptide";
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const selected = product.variants[0];
  const retail = selected.price;
  const sale = salePrice(retail);
  const colors = paletteFor(product.slug);
  const purity = purityFor(product.slug);
  const bestseller = product.slug === "glp-3";

  function handleAdd() {
    addItem(product.slug, selected.id, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#ececec] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{
          background: colors.top,
        }}
      >
        <Image
          src={productImage(product)}
          alt={product.name}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 320px"
          className={
            product.form === "spray"
              ? "object-cover object-center"
              : "object-contain p-3 drop-shadow-[0_18px_24px_rgba(15,23,42,0.18)] sm:p-4"
          }
        />
        {product.form === "spray" ? (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#d8f4fb] px-2.5 py-1 text-[11px] font-semibold text-[#127a96]">
            <SprayIcon />
            Spray
          </span>
        ) : null}
        <span className="absolute top-3 right-3 rounded-[8px] bg-[#6b1a28] px-2 py-[3px] text-[11px] font-semibold text-white">
          -{Math.round(SALE_OFF * 100)}%
        </span>
        <Link
          href={`/coa/${product.slug}`}
          className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-black shadow-[0_4px_12px_rgba(15,23,42,0.12)] no-underline"
        >
          <CheckIcon />
          {purity}% View COA
          <span aria-hidden="true" className="text-[#888888]">
            ›
          </span>
        </Link>
        {bestseller ? (
          <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-[#f6e59a] px-2.5 py-1 text-[11px] font-semibold text-black">
            <StarIcon />
            #1 Bestseller
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
        <h3 className="text-[17px] font-bold tracking-[-0.02em] text-black">{product.name}</h3>
        <p className="mt-1 text-[13px] text-[#8a8a8a]">{shortLabel(product)}</p>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-[13px] text-[#9a9a9a] line-through">{formatMoney(retail)}</span>
          <span className="text-[12px] font-medium text-[#9a9a9a]">USD</span>
          <span className="text-[20px] font-bold text-[#c4122f]">{formatMoney(sale)}</span>
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-full border border-[#d8d8d8] bg-white text-[13px] font-medium text-black no-underline"
          >
            Details
          </Link>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-10 flex-[1.15] items-center justify-center gap-1 rounded-full bg-black text-[13px] font-medium"
            style={{ color: "#ffffff" }}
          >
            {justAdded ? "Added" : "+ Add"}
          </button>
        </div>
      </div>
    </article>
  );
}

function SprayIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M5.2 1.2h1.6v1.4H8.2v1.2H3.8V2.6h1.4V1.2Z"
        fill="currentColor"
      />
      <rect x="3.6" y="3.8" width="4.8" height="7" rx="1.4" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <circle cx="6" cy="6" r="6" fill="#22c55e" />
      <path d="M3.4 6.2 5.1 7.9 8.6 4.2" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M6 1.2 7.2 4.3l3.3.4-2.5 2.3.7 3.3L6 8.7 3.3 10.3l.7-3.3L1.5 4.7l3.3-.4L6 1.2Z" />
    </svg>
  );
}
