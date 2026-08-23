"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAddToCart } from "@/lib/use-add-to-cart";
import { AddCartSpinner } from "@/components/AddCartSpinner";
import { productImage, productCardImageClass } from "@/data/media";
import { formatMoney } from "@/lib/format";
import { SALE_OFF, salePrice } from "@/lib/commerce";
import { ProductImageStage } from "@/components/ProductImageStage";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/catalog";

const SHORT: Record<string, string> = {
  "glp-3": "Triple-Action Metabolic Compound",
  "glp-2": "Metabolic Peptide",
  "glp-1": "Metabolic Peptide",
  "ghk-cu": "Dermal Compound",
  tesamorelin: "Secretagogue Peptide",
  "mots-c": "Metabolic Peptide",
  "nad-plus": "Cellular Peptide",
  "cjc-ipa-no-dac": "Secretagogue Peptide",
  "bpc-157": "Cellular Peptide",
  "klear-h2o": "Research Supplies",
  kpv: "Cellular Peptide",
  klow: "Cellular Peptide Blend",
  semax: "Cognitive & Neuroprotective Peptide",
  glutathione: "Antioxidant & Detoxification Peptide",
  "melanotan-ii": "Pigmentation Peptide",
  glow: "Cellular Peptide Blend",
  selank: "Cognitive & Anxiolytic Peptide",
  "melanotan-i": "Pigmentation Peptide",
  "tb-500": "Cellular Peptide",
  "igf-1-lr3": "Growth Factor Analog Peptide",
  "5-amino-1mq": "Metabolic Peptide",
  "wolverine-stack": "Cellular Peptide Blend",
  "pt-141": "Cellular Peptide",
  cagrilintide: "Metabolic Research Peptide",
  "aod-9604": "Cellular Factor",
  dsip: "Circadian Peptide",
  epithalon: "Cellular Peptide",
  ipamorelin: "GH Secretagogue Peptide",
  "snap-8": "Dermal Peptide",
  "thymosin-alpha-1": "Cellular Peptide",
  "ghk-cu-spray": "Dermal Spray",
  "nad-plus-spray": "Cellular Peptide Spray",
  "semax-spray": "Cognitive Neuro Spray",
  "selank-spray": "Anxiolytic Neuro Spray",
  "pt-141-spray": "Melanocortin Spray",
  "melanotan-ii-spray": "Pigmentation Spray",
  "ll-37": "Antimicrobial Peptide",
  cartalax: "Cartilage Research Peptide",
  sermorelin: "Secretagogue Peptide",
  kisspeptin: "Metabolic Peptide",
  dihexa: "Cognitive Peptide",
  vip: "Cellular Peptide",
  "ara-290": "Cellular Peptide",
  "dsip-spray": "Circadian Peptide",
  "adalank-spray": "Neuro Spray",
  "adamax-spray": "Neuro Spray",
  "bpc-tb-spray": "Cellular Peptide Blend",
  "bpc-spray": "Cellular Peptide",
  pinealon: "Cellular Peptide",
  "ahk-cu": "Dermal Compound",
};

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
  const { addToCart, isAdding, justAdded, isBusy } = useAddToCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const selected = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const retail = selected.price;
  const sale = salePrice(retail);
  const purity = purityFor(product.slug);
  const bestseller = product.slug === "glp-3";
  const multiVariant = product.variants.length > 1;

  function handleAdd() {
    addToCart(product.slug, selected.id, 1);
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-[#e8e8e8] bg-white">
      <ProductImageStage slug={product.slug} className="aspect-[5/6]">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-[1] no-underline" aria-label={`View ${product.name}`} />
        <Image
          src={productImage(product)}
          alt={product.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className={productCardImageClass}
        />

        {product.form === "spray" ? (
          <span className="absolute top-2.5 left-2.5 z-[2] inline-flex items-center gap-1 rounded-full bg-[#d8f4fb] px-2 py-0.5 text-[10px] font-semibold text-[#127a96]">
            <SprayIcon />
            Spray
          </span>
        ) : null}

        <span className="absolute top-2.5 right-2.5 z-[2] rounded-md bg-[#6b1a28] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
          -{Math.round(SALE_OFF * 100)}%
        </span>

        <div className="absolute inset-x-0 bottom-0 z-[2] flex items-center justify-between gap-2 px-2.5 pt-5 pb-2">
          <Link
            href={`/coa/${product.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex max-w-[62%] items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-black no-underline shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
          >
            <CheckIcon />
            <span className="truncate">{purity}% View COA</span>
            <span aria-hidden="true" className="text-[#666]">&gt;</span>
          </Link>
          {bestseller ? (
            <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-[#f6e59a] px-2.5 py-1 text-[10px] font-semibold text-black shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
              <StarIcon />
              #1 Bestseller
            </span>
          ) : (
            <span className="shrink-0" aria-hidden="true" />
          )}
        </div>
      </ProductImageStage>

      <div className="flex min-h-[168px] flex-1 flex-col px-3 pt-3 pb-3.5 sm:min-h-[172px] sm:px-3.5">
        <Link href={`/products/${product.slug}`} className="no-underline">
          <h3 className="line-clamp-2 text-[14px] font-bold leading-[1.15] tracking-[-0.02em] text-black sm:text-[15px]">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-[11px] leading-tight text-[#8a8a8a] sm:line-clamp-1 sm:text-[12px]">{shortLabel(product)}</p>
        </Link>

        {multiVariant ? (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {product.variants.map((variant) => {
              const active = variant.id === selected.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setVariantId(variant.id)}
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                    active
                      ? "border-black bg-black text-white"
                      : "border-[#dcdcdc] bg-white text-[#666] hover:border-[#999]",
                  )}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="mt-2.5 text-[11px] text-[#9a9a9a]">{selected.label}</p>
        )}

        <p className="mt-2 flex items-baseline gap-1.5 sm:mt-2.5 sm:gap-2">
          <span className="text-[11px] text-[#aaa] line-through sm:text-[12px]">{formatMoney(retail)}</span>
          <span className="text-[17px] font-bold leading-none text-[#c4122f] sm:text-[19px]">{formatMoney(sale)}</span>
        </p>

        <div className="mt-auto flex gap-1.5 pt-2.5 sm:gap-2 sm:pt-3">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex h-[34px] flex-1 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-[11px] font-medium text-black no-underline sm:h-[38px] sm:text-[12px]"
          >
            Details
          </Link>
          <button
            type="button"
            onClick={handleAdd}
            disabled={isBusy}
            className={cn(
              "inline-flex h-[34px] flex-[1.08] items-center justify-center rounded-full text-[11px] font-semibold text-white transition-colors disabled:opacity-90 sm:h-[38px] sm:text-[12px]",
              justAdded ? "bg-[#16a34a]" : "bg-black",
            )}
          >
            {isAdding ? <AddCartSpinner /> : justAdded ? "Added ✓" : "+ Add"}
          </button>
        </div>
      </div>
    </article>
  );
}

function SprayIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M5.2 1.2h1.6v1.4H8.2v1.2H3.8V2.6h1.4V1.2Z" fill="currentColor" />
      <rect x="3.6" y="3.8" width="4.8" height="7" rx="1.4" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true" className="shrink-0">
      <circle cx="6" cy="6" r="6" fill="#22c55e" />
      <path d="M3.4 6.2 5.1 7.9 8.6 4.2" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M6 1.2 7.2 4.3l3.3.4-2.5 2.3.7 3.3L6 8.7 3.3 10.3l.7-3.3L1.5 4.7l3.3-.4L6 1.2Z" />
    </svg>
  );
}
