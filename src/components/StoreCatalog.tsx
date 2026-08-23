"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/cn";

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

type SortId = "popular" | "price-asc" | "price-desc" | "name";

const FILTERS: Array<{ id: FilterId; label: string; spray?: boolean }> = [
  { id: "all", label: "All" },
  { id: "tissue", label: "Tissue Repair" },
  { id: "dermal", label: "Dermal" },
  { id: "metabolic", label: "Metabolic" },
  { id: "secretagogue", label: "Secretagogue" },
  { id: "cellular", label: "Cellular" },
  { id: "neuro", label: "Neuro" },
  { id: "circadian", label: "Circadian" },
  { id: "sprays", label: "Sprays", spray: true },
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

function midnightCountdown() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  const diff = Math.max(0, end.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function ClubSaleBar() {
  const [clock, setClock] = useState("00:00:00");

  useEffect(() => {
    function tick() {
      setClock(midnightCountdown());
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-3 rounded-[16px] bg-[#1b3022] px-4 py-3.5 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4">
      <div className="min-w-0">
        <p className="text-[14px] font-bold leading-tight sm:text-[15px]">
          The Club Sale <span className="font-normal text-white/75">| 10 compounds · 50% off</span>
        </p>
        <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#b8d4bc]">
          Resets in {clock}
        </p>
      </div>
      <Link
        href="/store?sort=popular"
        className="inline-flex h-9 shrink-0 items-center self-start rounded-full bg-white/12 px-4 text-[13px] font-semibold text-white no-underline ring-1 ring-white/20 sm:self-auto"
      >
        View the ten →
      </Link>
    </div>
  );
}

function SortSelect({ sort, onChange, className }: { sort: SortId; onChange: (value: SortId) => void; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={sort}
        onChange={(event) => onChange(event.target.value as SortId)}
        aria-label="Sort products"
        className="h-10 w-full appearance-none rounded-full border border-[#e8e8e8] bg-[#f7f7f7] pr-9 pl-3.5 text-[13px] text-[#555555] outline-none sm:h-12 sm:pr-10 sm:pl-4 sm:text-[14px]"
      >
        <option value="popular">Most Popular</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name">Name A–Z</option>
      </select>
      <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[#9a9a9a] sm:right-4">
        <ChevronIcon />
      </span>
    </div>
  );
}

export function StoreCatalog() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("popular");
  const [filter, setFilter] = useState<FilterId>(initial === "sprays" ? "sprays" : "all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "sprays"
            ? product.form === "spray"
            : AREAS[filter].includes(product.slug);
      const haystack = [product.name, ...product.alsoKnownAs].join(" ").toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      return matchesFilter && matchesQuery;
    });

    return [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      const pa = a.variants[0]?.price ?? 0;
      const pb = b.variants[0]?.price ?? 0;
      if (sort === "price-asc") return pa - pb;
      if (sort === "price-desc") return pb - pa;
      if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
      return 0;
    });
  }, [filter, query, sort]);

  return (
    <div className="site-container pb-20 pt-4 sm:pb-24 sm:pt-6">
      {/* Mobile header */}
      <div className="lg:hidden">
        <div className="flex items-start justify-between gap-3">
          <p className="pt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#9a9a9a]">
            8x tested · 99%+ purity · ships in 0-2 days
          </p>
          <SortSelect sort={sort} onChange={setSort} className="w-[148px] shrink-0" />
        </div>

        <h1 className="mt-3 text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-black">
          All <span className="font-serif italic">Products</span>
        </h1>

        <label className="relative mt-4 block w-full">
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#b0b0b0]">
            <SearchIcon />
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            className="h-12 w-full rounded-full border border-[#e8e8e8] bg-[#f7f7f7] pr-4 pl-11 text-[14px] text-black outline-none placeholder:text-[#b0b0b0]"
          />
        </label>

        <div className="mt-4">
          <ClubSaleBar />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[12px] font-semibold whitespace-nowrap sm:px-4 sm:text-[13px]",
                  item.spray
                    ? active
                      ? "border-transparent text-white shadow-[0_4px_10px_rgba(33,209,237,0.35)]"
                      : "border-transparent bg-[#21d1ed] text-white shadow-[0_4px_10px_rgba(33,209,237,0.35)]"
                    : active
                      ? "border-black bg-black text-white"
                      : "border-[#e6e6e6] bg-white font-medium text-black hover:border-[#cfcfcf]",
                )}
                style={active && !item.spray ? { color: "#ffffff" } : item.spray ? { color: "#ffffff" } : undefined}
              >
                {item.spray ? <DropIcon /> : null}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden lg:grid lg:grid-cols-[auto_minmax(280px,560px)_auto] lg:items-center lg:gap-8">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#9a9a9a]">
            8x tested · 99%+ purity · ships in 0-2 days
          </p>
          <h1 className="mt-1 text-[42px] font-bold tracking-[-0.03em] text-black">
            All <span className="font-serif italic">Products</span>
          </h1>
        </div>

        <label className="relative w-full">
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#b0b0b0]">
            <SearchIcon />
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            className="h-12 w-full rounded-full border border-[#e8e8e8] bg-[#f7f7f7] pr-4 pl-11 text-[14px] text-black outline-none placeholder:text-[#b0b0b0]"
          />
        </label>

        <SortSelect sort={sort} onChange={setSort} className="w-[168px] justify-self-end" />
      </div>

      <div className="mt-4 hidden lg:block">
        <ClubSaleBar />
      </div>

      <div className="no-scrollbar mt-5 hidden gap-2 overflow-x-auto pb-1 lg:flex">
        {FILTERS.map((item) => {
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={cn(
                "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[13px] font-semibold whitespace-nowrap",
                item.spray
                  ? "border-transparent text-white shadow-[0_4px_10px_rgba(33,209,237,0.35)]"
                  : active
                    ? "border-black bg-black text-white"
                    : "border-[#e6e6e6] bg-white font-medium text-black hover:border-[#cfcfcf]",
              )}
              style={
                item.spray
                  ? { background: "#21d1ed", color: "#ffffff" }
                  : active
                    ? { color: "#ffffff" }
                    : undefined
              }
            >
              {item.spray ? <DropIcon /> : null}
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 hidden gap-3 lg:grid lg:grid-cols-3">
        <PromoCard
          href="/build-a-box"
          title="Build a Box"
          isNew
          body="Any 4 compounds, 40% off monthly, free Klear H2O + free 2-day delivery."
          cta="Build yours"
          badge="40% OFF"
          badgeBg="#fff3a3"
          background="linear-gradient(90deg, #eaf8e4 0%, #e4f1fb 100%)"
        />
        <PromoCard
          href="/bulk"
          title="Bulk Orders"
          isNew
          body="40% off from 10 units per product, 50% off from 50 + free 2-day signed delivery."
          cta="Order bulk"
          badge="50% OFF"
          badgeBg="#d8f5e3"
          background="linear-gradient(90deg, #fbf6d6 0%, #ece6f7 100%)"
        />
        <PromoCard
          href="/store?category=sprays"
          title="Ready-to-use sprays"
          body="The same 8x tested compounds, supplied as research solutions."
          cta="Shop sprays"
          background="linear-gradient(90deg, #e4eefb 0%, #ece6f7 100%)"
          onClick={() => setFilter("sprays")}
        />
      </div>

      <p className="mt-5 text-[13px] text-[#8a8a8a] lg:mt-8">{visible.length} products</p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

function PromoCard({
  href,
  title,
  body,
  cta,
  isNew,
  badge,
  badgeBg,
  background,
  onClick,
}: {
  href: string;
  title: string;
  body: string;
  cta: string;
  isNew?: boolean;
  badge?: string;
  badgeBg?: string;
  background: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] px-4 py-4 sm:gap-4 sm:px-5" style={{ background }}>
      <span
        className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full"
        style={{ background: badgeBg ?? "#ffffff" }}
      >
        {badge ? (
          <span className="font-serif text-center text-[13px] font-bold leading-[1.05] text-black">
            {badge.split(" ").map((part) => (
              <span key={part} className="block">
                {part}
              </span>
            ))}
          </span>
        ) : (
          <span className="text-black">
            <DropIcon large />
          </span>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-1.5 text-[15px] font-bold text-black">
          {title}
          {isNew ? (
            <span className="rounded-full bg-black px-[7px] py-[2px] text-[9px] font-bold tracking-wide text-white">
              NEW
            </span>
          ) : null}
        </p>
        <p className="mt-1 text-[12px] leading-[1.45] text-[#5c5c5c]">{body}</p>
      </div>
      <Link
        href={href}
        onClick={onClick}
        className="hidden h-9 shrink-0 items-center rounded-full bg-black px-4 text-[13px] font-medium no-underline sm:inline-flex"
        style={{ color: "#ffffff" }}
      >
        {cta}
      </Link>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.4 10.4 13.2 13.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.2 4.2 6 8l3.8-3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DropIcon({ large = false }: { large?: boolean }) {
  const size = large ? 22 : 12;
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M6 1.2c.2 0 2.8 2.8 3.5 4.6A3.6 3.6 0 1 1 2.5 5.8C3.2 4 5.8 1.2 6 1.2Z" />
    </svg>
  );
}
