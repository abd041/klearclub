"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BulkAuthPanel } from "@/components/BulkAuthSheet";
import { useCart } from "@/context/CartContext";
import { getProductCoas } from "@/data/coas";
import { productImage, productImageClass, PRODUCT_IMAGE_BG } from "@/data/media";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";
import { pdpBackground, pdpPurity, pdpShortLabel } from "@/lib/product-pdp";
import type { Product, ProductVariant } from "@/types/catalog";

const MIN_UNITS = 10;
const TIER_40 = 10;
const TIER_50 = 50;
const OFF_40 = 0.4;
const OFF_50 = 0.5;

type FilterId =
  | "all"
  | "sprays"
  | "tissue"
  | "dermal"
  | "metabolic"
  | "secretagogue"
  | "cellular"
  | "neuro"
  | "circadian";

type BulkLine = {
  productSlug: string;
  variantId: string;
  quantity: number;
};

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "All" },
  { id: "sprays", label: "Sprays" },
  { id: "tissue", label: "Tissue Repair" },
  { id: "dermal", label: "Dermal" },
  { id: "metabolic", label: "Metabolic" },
  { id: "secretagogue", label: "Secretagogue" },
  { id: "cellular", label: "Cellular" },
  { id: "neuro", label: "Neuro" },
  { id: "circadian", label: "Circadian" },
];

const AREAS: Record<Exclude<FilterId, "all" | "sprays">, string[]> = {
  tissue: [
    "bpc-157",
    "tb-500",
    "wolverine-stack",
    "glow",
    "klow",
    "kpv",
    "ll-37",
    "bpc-spray",
    "bpc-tb-spray",
    "ara-290",
    "cartalax",
    "thymosin-alpha-1",
  ],
  dermal: [
    "ghk-cu",
    "ahk-cu",
    "ghk-cu-spray",
    "snap-8",
    "melanotan-i",
    "melanotan-ii",
    "melanotan-ii-spray",
  ],
  metabolic: [
    "glp-3",
    "glp-2",
    "glp-1",
    "aod-9604",
    "mots-c",
    "5-amino-1mq",
    "cagrilintide",
    "nad-plus",
    "nad-plus-spray",
    "glutathione",
  ],
  secretagogue: ["tesamorelin", "cjc-ipa-no-dac", "ipamorelin", "sermorelin", "igf-1-lr3", "kisspeptin"],
  cellular: ["nad-plus", "glutathione", "5-amino-1mq", "epithalon", "thymosin-alpha-1", "pinealon", "vip"],
  neuro: [
    "semax",
    "selank",
    "semax-spray",
    "selank-spray",
    "dihexa",
    "adamax-spray",
    "adalank-spray",
    "pinealon",
  ],
  circadian: ["dsip", "dsip-spray", "epithalon"],
};

function bulkOff(qty: number) {
  if (qty >= TIER_50) return OFF_50;
  if (qty >= TIER_40) return OFF_40;
  return OFF_40;
}

function bulkUnitPrice(retail: number, productQty: number) {
  return Math.round(retail * (1 - bulkOff(productQty)) * 100) / 100;
}

function resolveLine(line: BulkLine) {
  const product = products.find((item) => item.slug === line.productSlug);
  const variant = product?.variants.find((item) => item.id === line.variantId);
  if (!product || !variant) return null;
  return { product, variant };
}

export function BulkOrders() {
  const { addItems } = useCart();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});
  const [lines, setLines] = useState<BulkLine[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const catalog = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      if (product.slug === "klear-h2o") return false;
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "sprays"
            ? product.form === "spray"
            : AREAS[filter].includes(product.slug);
      const haystack = [product.name, ...product.alsoKnownAs, product.tagline].join(" ").toLowerCase();
      return matchesFilter && (!needle || haystack.includes(needle));
    });
  }, [filter, query]);

  const qtyByProduct = useMemo(() => {
    const map: Record<string, number> = {};
    for (const line of lines) {
      map[line.productSlug] = (map[line.productSlug] ?? 0) + line.quantity;
    }
    return map;
  }, [lines]);

  const totalUnits = lines.reduce((sum, line) => sum + line.quantity, 0);
  const productCount = Object.keys(qtyByProduct).length;
  const ready = lines.length > 0 && Object.values(qtyByProduct).every((qty) => qty >= MIN_UNITS);

  const retailTotal = lines.reduce((sum, line) => {
    const resolved = resolveLine(line);
    return sum + (resolved ? resolved.variant.price * line.quantity : 0);
  }, 0);

  const saleTotal = lines.reduce((sum, line) => {
    const resolved = resolveLine(line);
    if (!resolved) return sum;
    const productQty = qtyByProduct[line.productSlug] ?? line.quantity;
    return sum + bulkUnitPrice(resolved.variant.price, productQty) * line.quantity;
  }, 0);

  const discountTotal = Math.round((retailTotal - saleTotal) * 100) / 100;

  function variantFor(product: Product): ProductVariant {
    const id = selectedVariant[product.slug] ?? product.variants[0]?.id;
    return product.variants.find((item) => item.id === id) ?? product.variants[0];
  }

  function addUnits(product: Product, amount = MIN_UNITS) {
    const variant = variantFor(product);
    setLines((current) => {
      const match = current.find(
        (line) => line.productSlug === product.slug && line.variantId === variant.id,
      );
      if (match) {
        return current.map((line) =>
          line === match ? { ...line, quantity: line.quantity + amount } : line,
        );
      }
      return [...current, { productSlug: product.slug, variantId: variant.id, quantity: amount }];
    });
  }

  function setLineQty(productSlug: string, variantId: string, quantity: number) {
    setLines((current) => {
      if (quantity <= 0) {
        return current.filter((line) => !(line.productSlug === productSlug && line.variantId === variantId));
      }
      return current.map((line) =>
        line.productSlug === productSlug && line.variantId === variantId ? { ...line, quantity } : line,
      );
    });
  }

  function openAuth() {
    if (!ready) return;
    setAuthOpen(true);
  }

  function finishAuthCheckout() {
    addItems(
      lines.map((line) => ({
        productSlug: line.productSlug,
        variantId: line.variantId,
        quantity: line.quantity,
      })),
    );
    setAuthOpen(false);
  }

  return (
    <div className="bg-white">
      <div className="site-container pb-28 pt-8 sm:pb-20 lg:pb-16">
        <header>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-gray-400 uppercase">Bulk orders</p>
            <h1 className="sr-only">Buy research peptides in bulk</h1>
            <p
              aria-hidden="true"
              className="mt-2 font-[family-name:var(--font-fraunces)] text-4xl leading-[1.05] text-[#131315] sm:text-5xl"
            >
              Buy in bulk. Save up to 50%.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              10 units minimum per product. Every unit is 40% off from 10 units, and 50% off once a product hits 50.
              One-time order, free 2-day signed delivery.
            </p>
          </div>

          <section className="mt-6 grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3" aria-label="Bulk pricing tiers">
            <div className="flex min-h-[128px] flex-col justify-between rounded-[20px] bg-[#fefeca] p-4 lg:min-h-[150px]">
              <p className="font-[family-name:var(--font-fraunces)] text-5xl leading-none text-[#131315] lg:text-6xl">
                40<span className="text-3xl lg:text-4xl">%</span>
              </p>
              <div>
                <p className="text-xs leading-snug font-semibold text-[#131315]">off every unit at 10+</p>
                <p className="mt-0.5 text-[11px] leading-snug text-[#131315]/55">
                  per product, mix vial strengths freely
                </p>
              </div>
            </div>
            <div className="flex min-h-[128px] flex-col justify-between rounded-[20px] bg-[#e9fce6] p-4 lg:min-h-[150px]">
              <p className="font-[family-name:var(--font-fraunces)] text-5xl leading-none text-[#131315] lg:text-6xl">
                50<span className="text-3xl lg:text-4xl">%</span>
              </p>
              <div>
                <p className="text-xs leading-snug font-semibold text-[#131315]">off everything at 50+</p>
                <p className="mt-0.5 text-[11px] leading-snug text-[#131315]/55">
                  the whole product, not just the extra units
                </p>
              </div>
            </div>
            <div className="flex min-h-[128px] flex-col justify-between rounded-[20px] bg-[#cbe5fc] p-4 lg:min-h-[150px]">
              <div className="self-start rounded-xl bg-white px-3 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none font-bold text-[#131315]">99.9%</span>
                  <span className="rounded bg-green-50 px-1.5 py-0.5 text-[8px] font-bold text-green-700">PASS</span>
                </div>
                <p className="mt-0.5 text-[9px] text-gray-400">Purity (HPLC)</p>
              </div>
              <div>
                <p className="text-xs leading-snug font-semibold text-[#131315]">COA on every batch</p>
                <p className="mt-0.5 text-[11px] leading-snug text-[#131315]/55">
                  third-party tested, one tap away
                </p>
              </div>
            </div>
            <div className="flex min-h-[128px] flex-col justify-between rounded-[20px] bg-[#e8e5ff] p-4 lg:min-h-[150px]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80">
                <svg className="h-5 w-5 text-[#131315]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </span>
              <div>
                <p className="text-xs leading-snug font-semibold text-[#131315]">Free 2-day signed delivery</p>
                <p className="mt-0.5 text-[11px] leading-snug text-[#131315]/55">
                  adult signature required on arrival
                </p>
              </div>
            </div>
          </section>
        </header>

        <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
          <main>
            <div className="relative">
              <svg
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search compounds"
                aria-label="Search compounds"
                className="h-11 w-full rounded-full bg-[#f5f5f5] pr-4 pl-11 text-sm text-[#131315] placeholder:text-gray-400 focus:ring-2 focus:ring-[#131315]/20 focus:outline-none"
              />
            </div>

            <div
              className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:flex-wrap lg:overflow-visible"
              role="group"
              aria-label="Filter by research type"
            >
              {FILTERS.map((item) => {
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(item.id)}
                    className={cn(
                      "h-9 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors",
                      active
                        ? "border-[#131315] bg-[#131315] text-white"
                        : "border-[#e0e0e0] bg-white text-[#131315] hover:border-[#131315]/50",
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
              {catalog.map((product) => {
                const variant = variantFor(product);
                const retail = variant.price;
                const sale = bulkUnitPrice(retail, TIER_40);
                const purity = pdpPurity(product.slug);
                const coa = getProductCoas(product.slug)[0];
                const multi = product.variants.length > 1;
                return (
                  <div
                    key={product.slug}
                    className="flex h-full flex-col overflow-hidden rounded-[20px] border border-transparent bg-[#f9f9f9] transition-colors"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: PRODUCT_IMAGE_BG }}>
                      <Image
                        src={productImage(product)}
                        alt={product.name}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={productImageClass}
                      />
                      <a
                        href={coa?.href || `/coas/${product.slug}.svg`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2 left-2 inline-flex h-7 items-center gap-1 rounded-full border border-[#e0e0e0] bg-white pr-1.5 pl-2 text-[11px] text-[#131315] shadow-sm transition-colors hover:border-[#131315]/50"
                        aria-label={`View certificate of analysis for ${product.name}`}
                      >
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-semibold">{purity}%</span>
                        <span className="text-gray-500 underline underline-offset-2">COA</span>
                        <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </a>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 p-3">
                      <div>
                        <h3 className="line-clamp-1 text-sm leading-tight font-semibold text-[#131315] sm:text-base">
                          {product.name}
                        </h3>
                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">{pdpShortLabel(product)}</p>
                      </div>

                      {multi ? (
                        <div className="flex flex-col gap-1.5" role="group" aria-label="Strength">
                          {product.variants.map((item) => {
                            const active = item.id === variant.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                aria-pressed={active}
                                onClick={() =>
                                  setSelectedVariant((current) => ({ ...current, [product.slug]: item.id }))
                                }
                                className={cn(
                                  "flex h-9 w-full items-center justify-between rounded-full border px-3 text-xs font-medium transition-colors",
                                  active
                                    ? "border-[#131315] bg-[#131315] text-white"
                                    : "border-[#e0e0e0] bg-white text-[#131315] hover:border-[#131315]/50",
                                )}
                              >
                                <span className="min-w-0 truncate">{item.label}</span>
                                <span className={cn("whitespace-nowrap", active ? "text-white/70" : "text-gray-400")}>
                                  {formatMoney(bulkUnitPrice(item.price, TIER_40))}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex h-9 w-full items-center justify-between rounded-full bg-[#131315] px-3 text-xs font-medium text-white">
                          <span>{variant.label}</span>
                          <span className="whitespace-nowrap text-white/70">{formatMoney(sale)}</span>
                        </div>
                      )}

                      <div className="mt-auto pt-1">
                        <div className="mb-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                          <span className="text-lg leading-none font-semibold whitespace-nowrap text-[#131315]">
                            {formatMoney(sale)}
                            <span className="text-[11px] font-normal text-gray-500">/unit</span>
                          </span>
                          <span className="text-xs whitespace-nowrap text-gray-400 line-through">
                            {formatMoney(retail)}
                          </span>
                          <span className="text-[11px] whitespace-nowrap text-gray-500">at 40% off</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => addUnits(product, MIN_UNITS)}
                          className="flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-[#131315] text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                          style={{ color: "#ffffff" }}
                          aria-label={`Add ${MIN_UNITS} units of ${product.name} ${variant.label}`}
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          Add {MIN_UNITS} units
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          <aside className="hidden lg:block">
            {authOpen ? (
              <BulkAuthPanel
                totalUnits={totalUnits}
                productCount={productCount}
                total={saleTotal}
                onBack={() => setAuthOpen(false)}
                onComplete={finishAuthCheckout}
              />
            ) : (
              <BulkPanel
                lines={lines}
                qtyByProduct={qtyByProduct}
                totalUnits={totalUnits}
                ready={ready}
                retailTotal={retailTotal}
                saleTotal={saleTotal}
                discountTotal={discountTotal}
                onSetQty={setLineQty}
                onContinue={openAuth}
              />
            )}
          </aside>
        </div>
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          className="fixed right-0 bottom-0 left-0 z-40 border-t border-[#e8e8e8] bg-white px-4 pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
          aria-label="View your bulk order"
          onClick={() => setMobileOpen(true)}
        >
          <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
            <div className="text-left">
              <p className="text-base leading-tight font-bold text-[#131315]">
                {totalUnits > 0 ? `${totalUnits} units` : "Bulk order"}
              </p>
              <p className="text-[10px] leading-tight text-gray-500">
                {ready ? formatMoney(saleTotal) : "10+ units per product, up to 50% off"}
              </p>
            </div>
            <svg className="h-5 w-5 text-[#131315]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </button>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="Close"
              onClick={() => {
                setMobileOpen(false);
                setAuthOpen(false);
              }}
            />
            <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[24px] bg-white p-5 shadow-2xl">
              {authOpen ? (
                <BulkAuthPanel
                  totalUnits={totalUnits}
                  productCount={productCount}
                  total={saleTotal}
                  sticky={false}
                  onBack={() => setAuthOpen(false)}
                  onComplete={() => {
                    finishAuthCheckout();
                    setMobileOpen(false);
                  }}
                />
              ) : (
                <>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#131315]">Your bulk order</p>
                    <button type="button" className="text-sm text-gray-500" onClick={() => setMobileOpen(false)}>
                      Close
                    </button>
                  </div>
                  <BulkPanel
                    lines={lines}
                    qtyByProduct={qtyByProduct}
                    totalUnits={totalUnits}
                    ready={ready}
                    retailTotal={retailTotal}
                    saleTotal={saleTotal}
                    discountTotal={discountTotal}
                    onSetQty={setLineQty}
                    onContinue={openAuth}
                    sticky={false}
                  />
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function BulkPanel({
  lines,
  qtyByProduct,
  totalUnits,
  ready,
  retailTotal,
  saleTotal,
  discountTotal,
  onSetQty,
  onContinue,
  sticky = true,
}: {
  lines: BulkLine[];
  qtyByProduct: Record<string, number>;
  totalUnits: number;
  ready: boolean;
  retailTotal: number;
  saleTotal: number;
  discountTotal: number;
  onSetQty: (productSlug: string, variantId: string, quantity: number) => void;
  onContinue: () => void;
  sticky?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-[24px] border border-[#ececec] p-5",
        sticky && "sticky top-24",
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-[#131315]">Your bulk order</h2>
          <span className="text-sm text-gray-500" aria-live="polite">
            {totalUnits} units
          </span>
        </div>

        {lines.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d8d8d8] px-4 py-6 text-center">
            <p className="text-sm leading-relaxed text-gray-500">
              Pick any products, 10 units minimum each.
              <br />
              40% off from 10 units, 50% off from 50.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {lines.map((line) => {
              const resolved = resolveLine(line);
              if (!resolved) return null;
              const { product, variant } = resolved;
              const productQty = qtyByProduct[line.productSlug] ?? line.quantity;
              const unit = bulkUnitPrice(variant.price, productQty);
              const belowMin = productQty < MIN_UNITS;
              return (
                <div
                  key={`${line.productSlug}-${line.variantId}`}
                  className="rounded-2xl bg-[#f5f5f5] px-2.5 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl"
                      style={{ backgroundColor: PRODUCT_IMAGE_BG }}
                    >
                      <Image
                        src={productImage(product)}
                        alt=""
                        fill
                        unoptimized
                        className={productImageClass}
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#131315]">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        {variant.label}
                        {belowMin ? ` · need ${MIN_UNITS - productQty} more` : ` · ${Math.round(bulkOff(productQty) * 100)}% off`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#131315]">{formatMoney(unit * line.quantity)}</p>
                      <p className="text-xs text-gray-400 line-through">
                        {formatMoney(variant.price * line.quantity)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-full border border-[#e0e0e0] bg-white">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center text-[#131315]"
                        onClick={() => onSetQty(line.productSlug, line.variantId, line.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center text-[#131315]"
                        onClick={() => onSetQty(line.productSlug, line.variantId, line.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-gray-400 underline underline-offset-2 hover:text-[#131315]"
                      onClick={() => onSetQty(line.productSlug, line.variantId, 0)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {lines.length > 0 ? (
          <div className="space-y-2 rounded-2xl bg-[#f5f5f5] px-4 py-4 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Retail</span>
              <span className="line-through">{formatMoney(retailTotal)}</span>
            </div>
            <div className="flex justify-between text-[#16a34a]">
              <span>Bulk discount</span>
              <span>-{formatMoney(discountTotal)}</span>
            </div>
            <div className="flex justify-between text-[#16a34a]">
              <span>2-day signed delivery</span>
              <span>Free</span>
            </div>
            <div className="flex items-end justify-between border-t border-[#e4e4e4] pt-3">
              <span className="font-bold text-[#131315]">Total</span>
              <span className="text-2xl leading-none font-bold text-[#131315]">{formatMoney(saleTotal)}</span>
            </div>
          </div>
        ) : null}

        <div className="rounded-2xl border border-[#ececec] p-3">
          <div className="flex items-center gap-1.5">
            <span className="flex h-8 flex-1 items-center justify-center rounded-full bg-[#131315] text-[11px] font-semibold text-white">
              10+ units · 40%
            </span>
            <span className="flex h-8 flex-1 items-center justify-center rounded-full bg-[#e9fce6] text-[11px] font-semibold text-green-800">
              50+ units · 50%
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
            Minimums and discounts apply per product, counted across its strengths. Mix strengths freely.
          </p>
        </div>

        <button
          type="button"
          disabled={!ready}
          onClick={onContinue}
          className={cn(
            "h-12 rounded-full text-sm font-semibold transition-colors",
            ready
              ? "bg-[#131315] text-white hover:bg-gray-800"
              : "cursor-not-allowed bg-neutral-200 text-gray-400",
          )}
          style={ready ? { color: "#ffffff" } : undefined}
        >
          {ready ? `Continue · ${formatMoney(saleTotal)}` : "Add 10+ units to start"}
        </button>
      </div>
    </div>
  );
}
