"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BoxAuthSheet } from "@/components/BoxAuthSheet";
import { BoxCheckoutSheet, type BoxLine } from "@/components/BoxCheckoutSheet";
import { useCart } from "@/context/CartContext";
import { getProductCoas } from "@/data/coas";
import { productImage } from "@/data/media";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";
import { pdpBackground, pdpPurity, pdpShortLabel } from "@/lib/product-pdp";
import type { Product, ProductVariant } from "@/types/catalog";

const BOX_SIZE = 4;
const BOX_OFF = 0.4;
const H2O_SLUG = "klear-h2o";
const H2O_RETAIL = 19.99;

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

type BoxSlot = {
  productSlug: string;
  variantId: string;
};

function emptyBox(): Array<BoxSlot | null> {
  return [null, null, null, null];
}

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

function boxPrice(retail: number) {
  return Math.round(retail * (1 - BOX_OFF) * 100) / 100;
}

function resolveSlot(slot: BoxSlot) {
  const product = products.find((item) => item.slug === slot.productSlug);
  const variant = product?.variants.find((item) => item.id === slot.variantId);
  if (!product || !variant) return null;
  return { product, variant };
}

export function BuildABox() {
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const [boxes, setBoxes] = useState<Array<Array<BoxSlot | null>>>([emptyBox()]);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const slots = boxes[activeBoxIndex] ?? emptyBox();

  const catalog = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      if (product.slug === H2O_SLUG) return false;
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

  const filled = slots.filter(Boolean) as BoxSlot[];
  const filledCount = filled.length;
  const complete = filledCount === BOX_SIZE;
  const retailTotal = filled.reduce((sum, slot) => {
    const resolved = resolveSlot(slot);
    return sum + (resolved?.variant.price ?? 0);
  }, 0);
  const boxTotal = boxPrice(retailTotal);

  const completeBoxes = useMemo(
    () => boxes.filter((box) => box.every(Boolean)) as Array<Array<BoxSlot>>,
    [boxes],
  );
  const completeBoxCount = completeBoxes.length;
  const completeBoxIndexes = useMemo(
    () => boxes.map((box, index) => (box.every(Boolean) ? index : -1)).filter((index) => index >= 0),
    [boxes],
  );

  const summaryLines = useMemo(() => {
    const lines: BoxLine[] = [];
    boxes.forEach((box, boxIndex) => {
      if (!box.every(Boolean)) return;
      box.forEach((slot, slotIndex) => {
        if (!slot) return;
        const resolved = resolveSlot(slot);
        if (!resolved) return;
        lines.push({
          key: `${boxIndex}-${slotIndex}-${slot.productSlug}-${slot.variantId}`,
          productSlug: slot.productSlug,
          variantId: slot.variantId,
          boxIndex,
          slotIndex,
          product: resolved.product,
          label: resolved.variant.label,
          retail: resolved.variant.price,
          sale: boxPrice(resolved.variant.price),
        });
      });
    });
    return lines;
  }, [boxes]);

  const summaryRetailPeptides = summaryLines.reduce((sum, line) => sum + line.retail, 0);
  const summaryRetailH2o = completeBoxCount * H2O_RETAIL;
  const summaryDiscount = Math.round(summaryRetailPeptides * BOX_OFF * 100) / 100;
  const summaryMonthly = boxPrice(summaryRetailPeptides);

  function variantFor(product: Product): ProductVariant {
    const id = selectedVariant[product.slug] ?? product.variants[0]?.id;
    return product.variants.find((item) => item.id === id) ?? product.variants[0];
  }

  function addToBox(product: Product) {
    if (complete) {
      setSummaryOpen(true);
      return;
    }
    const variant = variantFor(product);
    setBoxes((current) => {
      const next = current.map((box) => [...box]);
      const box = next[activeBoxIndex];
      const empty = box.findIndex((slot) => slot === null);
      if (empty < 0) return current;
      box[empty] = { productSlug: product.slug, variantId: variant.id };
      if (box.every(Boolean)) {
        queueMicrotask(() => {
          setMobileOpen(false);
          setSummaryOpen(true);
        });
      }
      return next;
    });
  }

  function removeItem(boxIndex: number, slotIndex: number) {
    setBoxes((current) => {
      const next = current.map((box) => [...box]);
      const box = next[boxIndex];
      if (!box) return current;
      box[slotIndex] = null;
      const compacted = box.filter(Boolean) as BoxSlot[];
      next[boxIndex] = [...compacted, ...Array.from({ length: BOX_SIZE - compacted.length }, () => null)];
      const stillComplete = next.some((item) => item.every(Boolean));
      if (!stillComplete) queueMicrotask(() => setSummaryOpen(false));
      return next;
    });
  }

  function removeFromSummary(boxIndex: number, slotIndex: number) {
    removeItem(boxIndex, slotIndex);
  }

  function removeBox(boxIndex: number) {
    setBoxes((current) => {
      if (current.length <= 1) {
        queueMicrotask(() => {
          setActiveBoxIndex(0);
          setSummaryOpen(false);
        });
        return [emptyBox()];
      }
      const next = current.filter((_, index) => index !== boxIndex);
      const nextActive = Math.min(activeBoxIndex, next.length - 1);
      queueMicrotask(() => {
        setActiveBoxIndex(Math.max(0, nextActive));
        if (!next.some((box) => box.every(Boolean))) setSummaryOpen(false);
      });
      return next.length ? next : [emptyBox()];
    });
  }

  function startNewBox() {
    setBoxes((current) => {
      const emptyIndex = current.findIndex((box) => box.every((slot) => slot === null));
      if (emptyIndex >= 0) {
        queueMicrotask(() => setActiveBoxIndex(emptyIndex));
        return current;
      }
      queueMicrotask(() => setActiveBoxIndex(current.length));
      return [...current, emptyBox()];
    });
    setSummaryOpen(false);
    setMobileOpen(false);
  }

  function openSummary() {
    if (completeBoxCount === 0 && !complete) return;
    if (complete || completeBoxCount > 0) setSummaryOpen(true);
  }

  function continueCheckout() {
    if (summaryLines.length === 0) return;
    setSummaryOpen(false);
    setAuthOpen(true);
  }

  function finishAuthCheckout() {
    for (const line of summaryLines) {
      addItem(line.productSlug, line.variantId, 1);
    }
    setAuthOpen(false);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-28 sm:px-6 lg:px-8 lg:pt-12 lg:pb-16">
        <header>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-gray-400 uppercase">Subscription box</p>
            <h1 className="sr-only">Build your box</h1>
            <p
              aria-hidden="true"
              className="mt-2 font-[family-name:var(--font-fraunces)] text-4xl leading-[1.05] text-[#131315] sm:text-5xl"
            >
              Build your box
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              Pick any 4 research compounds and we pack them into one monthly box with free 2-day delivery. 3
              deliveries to start, and you can swap anything once your first box ships.
            </p>
          </div>

          <section className="mt-6" aria-label="Why subscribe">
            <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
              <div className="flex min-h-[136px] flex-col justify-between rounded-[20px] bg-[#fefeca] p-4 lg:min-h-[160px]">
                <p className="font-[family-name:var(--font-fraunces)] text-5xl leading-none text-[#131315] lg:text-6xl">
                  40<span className="text-3xl lg:text-4xl">%</span>
                </p>
                <div>
                  <p className="text-xs leading-snug font-semibold text-[#131315]">off retail, every month</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#131315]/55">
                    locked in for as long as you subscribe
                  </p>
                </div>
              </div>

              <div className="relative flex min-h-[136px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#e9fce6] p-4 lg:min-h-[160px]">
                <div className="absolute -top-4 -right-4 h-24 w-24 rotate-6 overflow-hidden rounded-3xl shadow-md lg:h-28 lg:w-28">
                  <Image
                    src="/hero/h2o-box.png"
                    alt="Klear H2O"
                    fill
                    unoptimized
                    className="object-cover object-[80%_center]"
                    sizes="112px"
                  />
                </div>
                <span className="relative self-start rounded-full bg-white/80 px-2 py-1 text-[10px] font-bold tracking-wide text-green-700 uppercase">
                  Free
                </span>
                <div className="relative">
                  <p className="text-xs leading-snug font-semibold text-[#131315]">Klear H2O in every box</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#131315]/55">a $19.99 value, on us</p>
                </div>
              </div>

              <div className="flex min-h-[136px] flex-col justify-between rounded-[20px] bg-[#cbe5fc] p-4 lg:min-h-[160px]">
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

              <div className="flex min-h-[136px] flex-col justify-between rounded-[20px] bg-[#e8e5ff] p-4 lg:min-h-[160px]">
                <div className="flex items-center gap-1">
                  {["Mo 1", "Mo 2", "Mo 3"].map((label) => (
                    <span
                      key={label}
                      className="flex h-7 flex-1 items-center justify-center rounded-full bg-white/80 text-[10px] font-semibold text-[#131315]"
                    >
                      {label}
                    </span>
                  ))}
                  <span className="flex h-7 flex-1 items-center justify-center rounded-full border border-dashed border-[#131315]/30 text-[10px] font-medium text-[#131315]/50">
                    4+
                  </span>
                </div>
                <div>
                  <p className="text-xs leading-snug font-semibold text-[#131315]">3 months to start</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#131315]/55">
                    swap items anytime, cancel after month 3
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-2.5 lg:mt-3 lg:gap-3">
              <div className="flex items-center gap-3 rounded-[20px] border border-[#ececec] bg-white px-3.5 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5]">
                  <TruckIcon />
                </span>
                <div className="min-w-0">
                  <p className="text-xs leading-snug font-semibold text-[#131315]">Free 2-day delivery</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#131315]/55">on every box, every month</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-[20px] border border-[#ececec] bg-white px-3.5 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5]">
                  <SwapIcon />
                </span>
                <div className="min-w-0">
                  <p className="text-xs leading-snug font-semibold text-[#131315]">Swap anything</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#131315]/55">once your first box ships</p>
                </div>
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
                const sale = boxPrice(retail);
                const purity = pdpPurity(product.slug);
                const coa = getProductCoas(product.slug)[0];
                const multi = product.variants.length > 1;

                return (
                  <div
                    key={product.slug}
                    className="flex h-full flex-col overflow-hidden rounded-[20px] border border-transparent bg-[#f9f9f9] transition-colors"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                      <Image
                        src={productImage(product)}
                        alt={product.name}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain object-center p-3"
                      />
                      <a
                        href={coa?.href || `/coas/${product.slug}.svg`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2 left-2 inline-flex h-7 items-center gap-1 rounded-full border border-[#e0e0e0] bg-white pr-1.5 pl-2 text-[11px] text-[#131315] shadow-sm transition-colors hover:border-[#131315]/50"
                        aria-label={`View certificate of analysis for ${product.name}`}
                      >
                        <svg
                          className="h-3 w-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-semibold">{purity}%</span>
                        <span className="text-gray-500 underline underline-offset-2">COA</span>
                        <svg
                          className="h-3 w-3 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          aria-hidden="true"
                        >
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
                        <div className="flex flex-col gap-1.5" role="group" aria-label="Size">
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
                                <span>{item.label}</span>
                                <span className={active ? "text-white/70" : "text-gray-400"}>
                                  {formatMoney(boxPrice(item.price))}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div
                          className="flex h-9 w-full items-center justify-between rounded-full border border-[#131315] bg-[#131315] px-3 text-xs font-medium text-white"
                          data-testid="single-dosage"
                        >
                          <span>{variant.label}</span>
                          <span className="text-white/70">{formatMoney(sale)}</span>
                        </div>
                      )}

                      <div className="mt-auto pt-1">
                        <div className="mb-2 flex items-baseline gap-1.5">
                          <span className="text-lg leading-none font-semibold text-[#131315]">
                            {formatMoney(sale)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">{formatMoney(retail)}</span>
                          <span className="text-[11px] text-gray-500">in box</span>
                        </div>
                        <button
                          type="button"
                          disabled={complete}
                          onClick={() => addToBox(product)}
                          className={cn(
                            "flex h-10 w-full items-center justify-center gap-1.5 rounded-full text-sm font-semibold transition-colors",
                            complete
                              ? "cursor-not-allowed bg-neutral-200 text-gray-400"
                              : "bg-[#131315] text-white hover:bg-gray-800",
                          )}
                          aria-label={`Add to box: ${product.name} ${variant.label}`}
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          Add to box
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          <aside className="hidden lg:block">
              <BoxPanel
                boxes={boxes}
                activeBoxIndex={activeBoxIndex}
                onSelectBox={setActiveBoxIndex}
                completeBoxCount={completeBoxCount}
                retailPeptides={summaryRetailPeptides}
                retailH2o={summaryRetailH2o}
                discount={summaryDiscount}
                monthly={summaryMonthly}
                onRemoveItem={removeItem}
                onRemoveBox={removeBox}
                onNewBox={startNewBox}
                onContinue={openSummary}
              />
          </aside>
        </div>
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          className="fixed right-0 bottom-0 left-0 z-40 border-t border-[#e8e8e8] bg-white px-4 pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
          aria-label="View your box"
          aria-expanded={mobileOpen}
          onClick={() => (complete ? openSummary() : setMobileOpen(true))}
        >
          <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {Array.from({ length: BOX_SIZE }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-semibold",
                    slots[index]
                      ? "bg-[#131315] text-white"
                      : "border border-dashed border-[#d0d0d0] text-gray-400",
                  )}
                >
                  {index + 1}
                </span>
              ))}
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-dashed text-[9px] font-bold transition-colors",
                  complete
                    ? "border-green-600 bg-[#e9fce6] text-green-700"
                    : "border-[#cfe8cb] bg-[#e9fce6]/40 text-gray-400",
                )}
              >
                FREE
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="text-right">
                <p className="text-base leading-tight font-bold text-[#131315]" aria-live="polite">
                  {complete ? formatMoney(boxTotal) : `Pick ${BOX_SIZE - filledCount}`}
                </p>
                <p className="text-[10px] leading-tight text-gray-500">+1 free Klear H2O</p>
              </div>
              <svg className="h-5 w-5 text-[#131315]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </div>
        </button>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="Close box panel"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[24px] bg-white p-5 shadow-2xl">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#131315]">Your box</p>
                <button
                  type="button"
                  className="text-sm text-gray-500"
                  onClick={() => setMobileOpen(false)}
                >
                  Close
                </button>
              </div>
              <BoxPanel
                boxes={boxes}
                activeBoxIndex={activeBoxIndex}
                onSelectBox={setActiveBoxIndex}
                completeBoxCount={completeBoxCount}
                retailPeptides={summaryRetailPeptides}
                retailH2o={summaryRetailH2o}
                discount={summaryDiscount}
                monthly={summaryMonthly}
                onRemoveItem={removeItem}
                onRemoveBox={removeBox}
                onNewBox={() => {
                  setMobileOpen(false);
                  startNewBox();
                }}
                onContinue={() => {
                  setMobileOpen(false);
                  openSummary();
                }}
                sticky={false}
              />
            </div>
          </div>
        ) : null}
      </div>

      <BoxCheckoutSheet
        open={summaryOpen && summaryLines.length > 0}
        onClose={() => setSummaryOpen(false)}
        lines={summaryLines}
        boxCount={completeBoxCount}
        boxIndexes={completeBoxIndexes}
        retailPeptides={summaryRetailPeptides}
        retailH2o={summaryRetailH2o}
        discount={summaryDiscount}
        monthly={summaryMonthly}
        onRemove={removeFromSummary}
        onRemoveBox={removeBox}
        onNewBox={startNewBox}
        onContinue={continueCheckout}
      />

      <BoxAuthSheet
        open={authOpen && summaryLines.length > 0}
        onBack={() => {
          setAuthOpen(false);
          setSummaryOpen(true);
        }}
        onClose={() => setAuthOpen(false)}
        boxCount={completeBoxCount}
        itemCount={summaryLines.length}
        monthly={summaryMonthly}
        onComplete={finishAuthCheckout}
      />
    </div>
  );
}

function BoxPanel({
  boxes,
  activeBoxIndex,
  onSelectBox,
  completeBoxCount,
  retailPeptides,
  retailH2o,
  discount,
  monthly,
  onRemoveItem,
  onRemoveBox,
  onNewBox,
  onContinue,
  sticky = true,
}: {
  boxes: Array<Array<BoxSlot | null>>;
  activeBoxIndex: number;
  onSelectBox: (index: number) => void;
  completeBoxCount: number;
  retailPeptides: number;
  retailH2o: number;
  discount: number;
  monthly: number;
  onRemoveItem: (boxIndex: number, slotIndex: number) => void;
  onRemoveBox: (boxIndex: number) => void;
  onNewBox: () => void;
  onContinue: () => void;
  sticky?: boolean;
}) {
  const slots = boxes[activeBoxIndex] ?? emptyBox();
  const filledCount = slots.filter(Boolean).length;
  const complete = filledCount === BOX_SIZE;
  const showMulti = boxes.length > 1 || completeBoxCount > 0;
  const retailTotal = retailPeptides + retailH2o;
  const boxLabel = completeBoxCount === 1 ? "1 box" : `${completeBoxCount} boxes`;

  return (
    <div
      className={cn(
        "max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-[24px] border border-[#ececec] p-5",
        sticky && "sticky top-24",
      )}
    >
      <div className="flex flex-col gap-3">
        {showMulti ? (
          <div className="flex gap-2 overflow-x-auto pb-0.5" role="tablist" aria-label="Your boxes">
            {boxes.map((box, index) => {
              const count = box.filter(Boolean).length;
              const active = index === activeBoxIndex;
              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectBox(index)}
                  className={cn(
                    "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition-colors",
                    active
                      ? "bg-[#131315] text-white"
                      : "border border-[#e0e0e0] bg-white text-gray-400 hover:border-[#131315]/30 hover:text-[#131315]",
                  )}
                >
                  <span>Box {index + 1}</span>
                  <span className={cn("text-[12px] font-medium", active ? "text-white/55" : "text-gray-400")}>
                    {count}/{BOX_SIZE}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <h2 className="text-base font-semibold text-[#131315]">
              {showMulti ? `Box ${activeBoxIndex + 1}` : "Your box"}
            </h2>
            <span className="text-sm text-gray-500" aria-live="polite">
              {filledCount} of {BOX_SIZE} picked
            </span>
          </div>
          {showMulti ? (
            <button
              type="button"
              onClick={() => onRemoveBox(activeBoxIndex)}
              className="text-sm text-gray-400 underline underline-offset-2 hover:text-[#131315]"
            >
              Remove box
            </button>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          {slots.map((slot, index) => {
            if (!slot) {
              if (complete) return null;
              const firstEmpty = slots.findIndex((item) => item === null) === index;
              return (
                <div
                  key={`empty-${index}`}
                  className="flex h-14 items-center gap-3 rounded-2xl border border-dashed border-[#d8d8d8] px-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1f2f4] text-xs font-semibold text-gray-400">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-400">
                    {firstEmpty ? "Pick your next item" : "Empty slot"}
                  </span>
                </div>
              );
            }

            const resolved = resolveSlot(slot);
            if (!resolved) return null;
            const { product, variant } = resolved;
            return (
              <div
                key={`${slot.productSlug}-${slot.variantId}-${index}`}
                className="flex items-center gap-3 rounded-2xl bg-[#f5f5f5] px-2.5 py-2.5"
              >
                <div
                  className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl"
                  style={{ background: pdpBackground(product.slug) }}
                >
                  <Image
                    src={productImage(product)}
                    alt=""
                    fill
                    unoptimized
                    className="object-contain p-1"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#131315]">{product.name}</p>
                  <p className="text-xs text-gray-500">{variant.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#131315]">{formatMoney(boxPrice(variant.price))}</p>
                  <p className="text-xs text-gray-400 line-through">{formatMoney(variant.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveItem(activeBoxIndex, index)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-white hover:text-[#131315]"
                  aria-label={`Remove ${product.name}`}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            );
          })}

          <div
            className={cn(
              "flex items-center gap-3 rounded-2xl px-2.5 py-2.5 transition-all duration-500",
              complete
                ? "bg-[#e9fce6]"
                : "border border-dashed border-[#cfe8cb] bg-[#e9fce6]/30",
            )}
          >
            <div
              className={cn(
                "relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/70 transition-opacity",
                complete ? "opacity-100" : "opacity-50",
              )}
            >
              <Image
                src="/hero/h2o-box.png"
                alt="Klear H2O"
                fill
                unoptimized
                className="object-cover object-[80%_center]"
                sizes="48px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className={cn("text-sm font-semibold", complete ? "text-[#131315]" : "text-gray-500")}>
                Klear H2O 10ml
              </p>
              <p className="text-xs text-gray-500">
                {complete ? "Included in every delivery" : "Free when you pick 4"}
              </p>
            </div>
            <div className="pr-1 text-right">
              <p className={cn("text-sm font-bold", complete ? "text-[#16a34a]" : "text-gray-400")}>Free</p>
              <p className="text-xs text-gray-400 line-through">{formatMoney(H2O_RETAIL)}</p>
            </div>
          </div>
        </div>

        {completeBoxCount > 0 ? (
          <button
            type="button"
            onClick={onNewBox}
            className="flex h-11 w-full items-center justify-center rounded-full border border-[#d8d8d8] bg-white text-sm font-medium text-[#131315] transition-colors hover:border-[#131315]/40"
          >
            + New box, another free Klear H2O
          </button>
        ) : null}

        {completeBoxCount > 0 ? (
          <div className="space-y-2.5 rounded-2xl bg-[#f5f5f5] px-4 py-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Retail value ({boxLabel})</span>
              <span>{formatMoney(retailTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-[#16a34a]">
              <span>Box discount (40% off)</span>
              <span>-{formatMoney(discount)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-[#16a34a]">
              <span>Free Klear H2O{completeBoxCount > 1 ? ` x${completeBoxCount}` : ""}</span>
              <span>-{formatMoney(retailH2o)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-[#16a34a]">
              <span>2-day delivery</span>
              <span>Free</span>
            </div>
            <div className="flex items-end justify-between border-t border-[#e4e4e4] pt-3">
              <span className="text-base font-bold text-[#131315]">Per month</span>
              <p className="text-2xl leading-none font-bold text-[#131315]">
                {formatMoney(monthly)}
                <span className="text-sm font-medium">/mo</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#ececec] p-3">
            <div className="flex items-center gap-1.5">
              {["Month 1", "Month 2", "Month 3"].map((label) => (
                <span
                  key={label}
                  className="flex h-8 flex-1 items-center justify-center rounded-full bg-[#e8e5ff] text-[11px] font-semibold text-[#131315]"
                >
                  {label}
                </span>
              ))}
              <span className="flex h-8 flex-1 items-center justify-center rounded-full border border-dashed border-[#c9c9c9] text-[11px] font-medium text-gray-400">
                4+
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
              3 monthly deliveries to start, billed month by month with free 2-day delivery. Swap items anytime once
              your first box ships. Cancel anytime after month 3.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={completeBoxCount === 0 && !complete}
            onClick={onContinue}
            className={cn(
              "h-12 rounded-full text-sm font-semibold transition-colors",
              completeBoxCount > 0 || complete
                ? "bg-[#131315] text-white hover:bg-gray-800"
                : "cursor-not-allowed bg-neutral-200 text-gray-400",
            )}
            style={completeBoxCount > 0 || complete ? { color: "#ffffff" } : undefined}
          >
            {completeBoxCount > 0 || complete
              ? `Sign in and continue · ${formatMoney(monthly > 0 ? monthly : boxPrice(
                  slots.reduce((sum, slot) => sum + (slot ? resolveSlot(slot)?.variant.price ?? 0 : 0), 0),
                ))}/mo`
              : "Pick 4 items to start"}
          </button>
        </div>
      </div>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg className="h-[18px] w-[18px] text-[#131315]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg className="h-[18px] w-[18px] text-[#131315]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}
