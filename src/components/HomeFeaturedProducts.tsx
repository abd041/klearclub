"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const FEATURED_SLUGS = ["glp-3", "bpc-157", "ghk-cu", "tb-500", "nad-plus", "wolverine-stack", "glow", "ghk-cu-spray"];

export function HomeFeaturedProducts() {
  const featured = FEATURED_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean);

  return (
    <section className="bg-[#fafafa] py-14 sm:py-16">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#9a9a9a]">
              Research catalog
            </p>
            <h2 className="mt-1 text-[28px] font-bold tracking-[-0.03em] text-black sm:text-[34px]">
              Popular <span className="font-serif italic">compounds</span>
            </h2>
          </div>
          <Link
            href="/store"
            className="inline-flex h-10 items-center rounded-full border border-[#d8d8d8] bg-white px-5 text-[13px] font-medium text-black no-underline hover:border-black"
          >
            View all products →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product!.slug} product={product!} />
          ))}
        </div>
      </div>
    </section>
  );
}
