"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BundleAuthPanel } from "@/components/BundleAuthPanel";
import { ProductImageStage } from "@/components/ProductImageStage";
import { getProductCoas } from "@/data/coas";
import { productCardImageClass, productImage, productImageClass, PRODUCT_IMAGE_BG } from "@/data/media";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";
import { pdpPurity, pdpShortLabel } from "@/lib/product-pdp";
import type { Product } from "@/types/catalog";

const MIN_VIALS = 3;
const MAX_VIALS = 8;
const LINK_OFF = 0.35;
const POINTS_RATE = 0.1;
const H2O_SLUG = "klear-h2o";

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

type TicketItem = {
  id: string;
  productSlug: string;
  variantId: string;
};

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "all" },
  { id: "sprays", label: "sprays" },
  { id: "tissue", label: "tissue repair" },
  { id: "dermal", label: "dermal" },
  { id: "metabolic", label: "metabolic" },
  { id: "secretagogue", label: "secretagogue" },
  { id: "cellular", label: "cellular" },
  { id: "neuro", label: "neuro" },
  { id: "circadian", label: "circadian" },
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

function linkPrice(retail: number) {
  return Math.round(retail * (1 - LINK_OFF) * 100) / 100;
}

function resolveItem(item: TicketItem) {
  const product = products.find((entry) => entry.slug === item.productSlug);
  const variant = product?.variants.find((entry) => entry.id === item.variantId);
  if (!product || !variant) return null;
  return { product, variant };
}

function PlusIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
}

function TicketPanel({
  items,
  onRemove,
  onClear,
  onUnlock,
}: {
  items: TicketItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onUnlock: () => void;
}) {
  const count = items.length;
  const remaining = Math.max(0, MIN_VIALS - count);
  const unlocked = count >= MIN_VIALS;
  const retailTotal = items.reduce((sum, item) => sum + (resolveItem(item)?.variant.price ?? 0), 0);
  const saleTotal = linkPrice(retailTotal);
  const points = Math.round(saleTotal * POINTS_RATE * 100);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white" data-testid="stack-panel">
      <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-[#5C6663] uppercase">Bundle ticket</p>
          <p className="font-display mt-0.5 text-xl leading-tight font-bold text-[#111417]">
            {count === 0 ? "Nothing loaded yet" : unlocked ? "Ready to share" : `${remaining} more to unlock`}
          </p>
        </div>
        <span className="font-mono rounded-md bg-[#F4F7F6] px-2 py-1 text-[10px] whitespace-nowrap text-[#5C6663]">
          {count}/{MAX_VIALS} items
        </span>
      </div>

      {count === 0 ? (
        <div className="px-4">
          <div className="rounded-xl bg-[#F4F7F6] px-4 py-7 text-center">
            <p className="text-[13px] leading-relaxed text-[#5C6663]">
              Add at least {MIN_VIALS} vials from the catalog (any mix, or {MIN_VIALS} of one compound). Your ticket
              fills in as you go.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-h-[280px] space-y-2 overflow-y-auto px-4">
          {items.map((item) => {
            const resolved = resolveItem(item);
            if (!resolved) return null;
            const { product, variant } = resolved;
            return (
              <div key={item.id} className="flex items-center gap-3 rounded-xl border border-[#EEF2F0] bg-[#F4F7F6]/50 px-3 py-2.5">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg" style={{ backgroundColor: PRODUCT_IMAGE_BG }}>
                  <Image src={productImage(product)} alt="" fill unoptimized className={productImageClass} sizes="40px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-[#111417]">{product.name}</p>
                  <p className="font-mono text-[11px] text-[#5C6663]">
                    {variant.label} · {formatMoney(linkPrice(variant.price))} via link
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="font-mono text-[11px] text-[#9AA5A1] underline-offset-2 hover:text-[#111417] hover:underline"
                >
                  remove
                </button>
              </div>
            );
          })}
          {count > 0 ? (
            <button type="button" onClick={onClear} className="font-mono w-full py-1 text-[11px] text-[#9AA5A1] hover:text-[#111417]">
              clear ticket
            </button>
          ) : null}
        </div>
      )}

      <div className="relative mt-3" aria-hidden="true">
        <div className="mx-4 border-t border-dashed border-[#D8DFDC]" />
        <span className="absolute top-1/2 left-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E2E8E5] bg-[#F4F7F6]" />
        <span className="absolute top-1/2 right-0 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E2E8E5] bg-[#F4F7F6]" />
      </div>

      <div className="px-4 pt-3 pb-4">
        {count > 0 ? (
          <div className="mb-3 space-y-1.5 text-[12px]">
            <div className="flex justify-between text-[#5C6663]">
              <span>Retail</span>
              <span className="tabular-nums line-through">{formatMoney(retailTotal)}</span>
            </div>
            <div className="flex justify-between font-semibold text-[#111417]">
              <span>Via your link (−35%)</span>
              <span className="tabular-nums">{formatMoney(saleTotal)}</span>
            </div>
            <div className="flex justify-between text-[#2742F5]">
              <span>You earn in points</span>
              <span className="tabular-nums">{points} pts</span>
            </div>
          </div>
        ) : null}

        <div className="pt-1">
          {unlocked ? (
            <button
              type="button"
              onClick={onUnlock}
              className="font-display flex h-12 w-full items-center justify-center rounded-xl bg-[#2742F5] text-[15px] font-bold text-white transition-colors hover:bg-[#1D33C9]"
              data-testid="stack-save"
            >
              Unlock your share link
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="font-display h-12 w-full rounded-xl bg-[#2742F5] text-[15px] font-bold text-white transition-colors hover:bg-[#1D33C9] disabled:cursor-not-allowed disabled:bg-[#E2E8E5] disabled:text-[#9AA5A1]"
              data-testid="stack-save"
            >
              Add {remaining} more vial{remaining === 1 ? "" : "s"} to unlock your link
            </button>
          )}
          <p className="mt-2 text-center text-[10px] leading-relaxed text-[#9AA5A1]">
            Laboratory research use only. Not for human, veterinary, or food use.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ResearchBundles() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const [ticket, setTicket] = useState<TicketItem[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

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

  const retailTotal = ticket.reduce((sum, item) => sum + (resolveItem(item)?.variant.price ?? 0), 0);
  const saleTotal = linkPrice(retailTotal);
  const pointsPerOrder = Math.round(saleTotal * POINTS_RATE * 100);
  const uniqueProducts = new Set(ticket.map((item) => item.productSlug)).size;

  function variantFor(product: Product) {
    const preferred = selectedVariant[product.slug];
    return product.variants.find((item) => item.id === preferred) ?? product.variants[0];
  }

  function addToTicket(product: Product) {
    if (ticket.length >= MAX_VIALS) return;
    const variant = variantFor(product);
    setTicket((current) => [
      ...current,
      {
        id: `${product.slug}-${variant.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        productSlug: product.slug,
        variantId: variant.id,
      },
    ]);
  }

  function removeOneOfProduct(productSlug: string, preferVariantId?: string) {
    setTicket((current) => {
      let index = -1;
      if (preferVariantId) {
        index = current.findIndex(
          (item) => item.productSlug === productSlug && item.variantId === preferVariantId,
        );
      }
      if (index < 0) {
        index = current.findIndex((item) => item.productSlug === productSlug);
      }
      if (index < 0) return current;
      return [...current.slice(0, index), ...current.slice(index + 1)];
    });
  }

  function removeFromTicket(id: string) {
    setTicket((current) => current.filter((item) => item.id !== id));
  }

  function loadedCount(productSlug: string) {
    return ticket.filter((item) => item.productSlug === productSlug).length;
  }

  function openUnlock() {
    setMobileOpen(false);
    setAuthOpen(true);
  }

  function finishAuth() {
    setAuthOpen(false);
  }

  const count = ticket.length;
  const remaining = Math.max(0, MIN_VIALS - count);

  return (
    <div className="bg-[#F4F7F6]">
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-28 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#5C6663] uppercase">
            Klear Club · research bundles
          </p>
          <h1 className="sr-only">Build and share a research peptide bundle</h1>
          <p
            aria-hidden="true"
            className="font-display mt-3 text-[44px] leading-[0.98] font-extrabold tracking-tight text-[#111417] sm:text-6xl"
          >
            Build a bundle
            <br />
            worth sharing.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#3E4744] sm:text-base">
            Load {MIN_VIALS}+ vials onto one ticket (up to {MAX_VIALS} different compounds) and send a single link.
            Everyone who orders through it pays {Math.round(LINK_OFF * 100)}% less, and {Math.round(POINTS_RATE * 100)}%
            of every order comes back to you in points.
          </p>

          <ol className="mt-6 divide-y divide-[#EEF2F0] rounded-2xl border border-[#E2E8E5] bg-white">
            {[
              {
                n: "1",
                title: "Assemble",
                body: `${MIN_VIALS}+ vials, up to ${MAX_VIALS} compounds, any strengths, all third-party tested`,
              },
              {
                n: "2",
                title: "Share the link",
                body: "your people pay 35% less than retail, shipped free in 2 days",
              },
              {
                n: "3",
                title: "Collect points",
                body: "10% of every order, credited when it ships, 100 pts = $1",
              },
            ].map((step) => (
              <li key={step.n} className="flex items-center gap-4 px-4 py-3">
                <span className="font-mono flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#EDF0FE] text-[12px] font-semibold text-[#2742F5]">
                  {step.n}
                </span>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <p className="font-display text-[15px] font-bold text-[#111417]">{step.title}</p>
                  <p className="text-[12px] text-[#5C6663]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </header>

        <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
          <main>
            <div className="relative">
              <svg
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#9AA5A1]"
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
                data-testid="stack-search"
                className="h-11 w-full rounded-xl border border-[#E2E8E5] bg-white pr-4 pl-11 text-sm text-[#111417] placeholder:text-[#9AA5A1] transition-colors focus:border-[#2742F5] focus:ring-2 focus:ring-[#2742F5]/15 focus:outline-none"
              />
            </div>

            <div
              className="no-scrollbar -mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:flex-wrap lg:overflow-visible"
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
                      "font-mono h-8 flex-shrink-0 rounded-lg border px-3.5 text-[12px] transition-colors",
                      active
                        ? "border-[#111417] bg-[#111417] text-white"
                        : "border-[#E2E8E5] bg-white text-[#3E4744] hover:border-[#B9C2BE]",
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
                const sale = linkPrice(retail);
                const purity = pdpPurity(product.slug);
                const coa = getProductCoas(product.slug)[0];
                const multi = product.variants.length > 1;
                const full = ticket.length >= MAX_VIALS;
                const qty = loadedCount(product.slug);
                const loaded = qty > 0;

                return (
                  <div
                    key={product.slug}
                    className={cn(
                      "flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-colors",
                      loaded ? "border-[#2742F5] shadow-[0_0_0_1px_rgba(39,66,245,0.12)]" : "border-[#E2E8E5]",
                    )}
                    data-testid="stack-picker-card"
                    data-handle={product.slug}
                  >
                    <ProductImageStage slug={product.slug} className="relative aspect-[4/5]">
                      <Image
                        src={productImage(product)}
                        alt={product.name}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={productCardImageClass}
                      />
                      {loaded ? (
                        <span className="font-mono absolute top-2 right-2 z-[2] rounded-md bg-[#2742F5] px-2 py-1 text-[10px] font-bold text-white">
                          ×{qty} loaded
                        </span>
                      ) : null}
                      <a
                        href={coa?.href || `/coas/${product.slug}.svg`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono absolute bottom-2 left-2 z-[2] inline-flex h-7 items-center gap-1 rounded-md border border-[#E2E8E5] bg-white px-2 text-[10px] text-[#111417] shadow-sm transition-colors hover:border-[#2742F5]"
                        data-testid="coa-chip"
                        aria-label={`View certificate of analysis for ${product.name}`}
                      >
                        <DocIcon />
                        <span className="font-semibold">{purity}%</span>
                        <span className="text-[#5C6663] underline underline-offset-2">COA</span>
                      </a>
                    </ProductImageStage>

                    <div className="flex flex-1 flex-col gap-2 p-3">
                      <div>
                        <h3 className="font-display line-clamp-1 text-[15px] leading-tight font-semibold text-[#111417]">
                          {product.name}
                        </h3>
                        <p className="mt-0.5 line-clamp-1 text-xs text-[#5C6663]">{pdpShortLabel(product)}</p>
                      </div>

                      <div className="flex flex-col gap-1" role="group" aria-label="Strength">
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
                                "font-mono flex h-8 w-full items-center justify-between rounded-lg border px-2.5 text-[11px] transition-colors",
                                active
                                  ? "border-[#2742F5] bg-[#EDF0FE] text-[#111417]"
                                  : "border-[#E2E8E5] bg-white text-[#111417] hover:border-[#B9C2BE]",
                              )}
                            >
                              <span className="min-w-0 truncate">
                                {item.label}
                                {loaded && active ? ` ×${qty}` : ""}
                              </span>
                              <span className={active ? "text-[#2742F5]" : "text-[#9AA5A1]"}>
                                {formatMoney(item.price)}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-auto pt-1">
                        <div className="font-mono mb-2 flex items-baseline justify-between gap-1">
                          <span className="text-[15px] font-semibold whitespace-nowrap text-[#111417] tabular-nums">
                            {formatMoney(retail)}
                          </span>
                          <span className="text-[10px] whitespace-nowrap text-[#2742F5]">
                            {formatMoney(sale)} via link
                          </span>
                        </div>

                        {loaded ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => removeOneOfProduct(product.slug, variant.id)}
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8E5] bg-white text-[#111417] transition-colors hover:border-[#2742F5]"
                              aria-label={`Remove one ${product.name}`}
                            >
                              <MinusIcon />
                            </button>
                            <div className="font-mono flex h-10 flex-1 items-center justify-center rounded-xl border border-[#2742F5] bg-[#EDF0FE] text-sm font-bold text-[#111417]">
                              ×{qty}
                            </div>
                            <button
                              type="button"
                              disabled={full}
                              onClick={() => addToTicket(product)}
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8E5] bg-white text-[#111417] transition-colors hover:border-[#2742F5] disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Add another ${product.name}`}
                            >
                              <PlusIcon />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            disabled={full}
                            onClick={() => addToTicket(product)}
                            className="font-display flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-[#111417] text-sm font-semibold text-white transition-colors hover:bg-[#2742F5] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#111417]"
                            data-testid="stack-add"
                            aria-label={`Add ${product.name} ${variant.label} to your stack`}
                          >
                            <PlusIcon />
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          <aside className="mt-8 hidden lg:mt-0 lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7.5rem)] overflow-y-auto">
              {authOpen ? (
                <BundleAuthPanel
                  itemCount={uniqueProducts}
                  unitCount={count}
                  pointsPerOrder={pointsPerOrder}
                  onBack={() => setAuthOpen(false)}
                  onComplete={finishAuth}
                />
              ) : (
                <TicketPanel
                  items={ticket}
                  onRemove={removeFromTicket}
                  onClear={() => setTicket([])}
                  onUnlock={openUnlock}
                />
              )}
            </div>
          </aside>
        </div>
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          className="fixed right-0 bottom-0 left-0 z-40 bg-[#111417] px-4 pt-3"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
          aria-label="View your bundle ticket"
          data-testid="stack-tray"
          aria-haspopup="dialog"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
            <div className="text-left">
              <p className="font-display text-[15px] leading-tight font-bold text-white" aria-live="polite">
                {count === 0
                  ? "Your ticket is empty"
                  : remaining > 0
                    ? `Add ${remaining} more to unlock`
                    : "Ready to share"}
              </p>
              <p className="font-mono mt-0.5 text-[10px] leading-tight text-white/50">they save 35% / you earn 10%</p>
            </div>
            <span className="font-display flex h-9 flex-shrink-0 items-center rounded-xl bg-[#2742F5] px-4 text-[13px] font-bold text-white">
              Open
            </span>
          </div>
        </button>
      </div>

      {mobileOpen || authOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close"
            onClick={() => {
              setMobileOpen(false);
              setAuthOpen(false);
            }}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-[#F4F7F6] p-4 pb-8 shadow-2xl">
            {authOpen ? (
              <BundleAuthPanel
                itemCount={uniqueProducts}
                unitCount={count}
                pointsPerOrder={pointsPerOrder}
                onBack={() => setAuthOpen(false)}
                onComplete={finishAuth}
              />
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-display text-lg font-bold text-[#111417]">Your ticket</p>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="font-mono rounded-lg bg-white px-3 py-1.5 text-[12px] text-[#5C6663]"
                  >
                    close
                  </button>
                </div>
                <TicketPanel
                  items={ticket}
                  onRemove={removeFromTicket}
                  onClear={() => setTicket([])}
                  onUnlock={openUnlock}
                />
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
