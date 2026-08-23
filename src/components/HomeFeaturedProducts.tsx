"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const FEATURED_SLUGS = [
  "glp-3",
  "glp-2",
  "glp-1",
  "ghk-cu",
  "tesamorelin",
  "mots-c",
  "nad-plus",
  "cjc-ipa-no-dac",
  "bpc-157",
  "klear-h2o",
  "kpv",
  "klow",
  "semax",
  "glutathione",
  "melanotan-ii",
  "glow",
  "selank",
  "melanotan-i",
  "tb-500",
  "igf-1-lr3",
  "5-amino-1mq",
  "wolverine-stack",
  "pt-141",
  "cagrilintide",
  "aod-9604",
  "dsip",
  "epithalon",
  "ipamorelin",
  "snap-8",
  "thymosin-alpha-1",
  "ghk-cu-spray",
  "nad-plus-spray",
  "semax-spray",
  "selank-spray",
  "pt-141-spray",
  "melanotan-ii-spray",
  "ll-37",
  "cartalax",
  "sermorelin",
  "kisspeptin",
  "dihexa",
  "vip",
  "ara-290",
  "dsip-spray",
  "adalank-spray",
  "adamax-spray",
  "bpc-tb-spray",
  "bpc-spray",
  "pinealon",
  "ahk-cu",
] as const;

const FEATURED_LIMIT = 8;

export function HomeFeaturedProducts() {
  const featured = FEATURED_SLUGS.slice(0, FEATURED_LIMIT)
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <section className="home-section-y bg-white">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8a93a0]">
              Research catalog
            </p>
            <h2 className="mt-1 text-[28px] font-bold tracking-[-0.03em] text-[#111111] sm:text-[34px]">
              Popular compounds
            </h2>
          </div>
          <Link
            href="/store"
            className="inline-flex h-10 items-center rounded-[10px] border border-[#d5dbe3] bg-white px-5 text-[13px] font-medium text-black no-underline hover:border-black"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product!.slug} product={product!} />
          ))}
        </div>
      </div>
    </section>
  );
}
