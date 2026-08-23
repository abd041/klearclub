"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { productCardImageClass, productImage } from "@/data/media";
import { getProduct } from "@/data/products";
import { cn } from "@/lib/cn";

const TABS = [
  {
    id: "potency",
    label: "Potency",
    icon: "bolt",
    title: "Verified Potency",
    badge: "HPLC Analysis",
    body: "Every vial is tested to confirm it contains exactly what the label says, down to the microgram.",
    why: "No guessing games. You get the exact concentration you paid for, every single time.",
  },
  {
    id: "purity",
    label: "Purity",
    icon: "shield",
    title: "Verified Purity",
    badge: "99%+ HPLC",
    body: "Independent HPLC confirms identity and purity before a lot is released. Batches below spec never ship.",
    why: "You are not relying on a manufacturer claim. Third-party results sit with every lot.",
  },
  {
    id: "stability",
    label: "Stability",
    icon: "clock",
    title: "Verified Stability",
    badge: "Sealed storage",
    body: "Lyophilized peptides ship nitrogen-sealed with documented storage conditions so the lot stays within spec.",
    why: "A clean COA means little if the vial degrades in transit. Sealing and handling are part of the check.",
  },
  {
    id: "safety",
    label: "Safety",
    icon: "check",
    title: "Verified Safety screens",
    badge: "8-assay panel",
    body: "Each batch is screened for identity, heavy metals, sterility, endotoxin, and related assays at accredited labs.",
    why: "Research supply should arrive with the same documentation a lab would file — not a marketing PDF.",
  },
  {
    id: "consistency",
    label: "Consistency",
    icon: "refresh",
    title: "Verified Consistency",
    badge: "Lot records",
    body: "Every reorder traces to a published lot and COA, so the vial in the next box matches the documentation you already have.",
    why: "Repeat work needs the same identity and content. Lot-level records keep that trail intact.",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

function QualityVisualPanel({ className }: { className?: string }) {
  const product = getProduct("tb-500");

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[24px] bg-gradient-to-b from-[#dce8f4] to-[#eef3f8] sm:rounded-[28px]",
        "aspect-[1.08/1] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[520px]",
        className,
      )}
    >
      <div className="absolute right-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:right-5 sm:top-5 sm:px-3 sm:py-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-white">
          <CheckMini light />
        </span>
        <p className="min-w-0 text-[11px] leading-[1.25] text-black sm:text-[12px]">
          <span className="block font-bold">99%+ Purity</span>
          <span className="text-[#6b6b6b]">Verified by HPLC</span>
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-[14%] pb-[18%] pt-[10%] sm:px-[12%] sm:pb-[16%]">
        <div className="relative h-full w-full max-h-[320px] max-w-[220px] rotate-[14deg] sm:max-h-[360px] sm:max-w-[250px] sm:rotate-[16deg] lg:max-h-[420px] lg:max-w-[280px]">
          {product ? (
            <Image
              src={productImage(product)}
              alt={product.name}
              fill
              unoptimized
              className={`${productCardImageClass} drop-shadow-[0_28px_40px_rgba(15,23,42,0.18)]`}
            />
          ) : null}
        </div>
      </div>

      <Link
        href="/quality"
        className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2.5 rounded-full bg-white px-3 py-2.5 no-underline shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:inset-x-5 sm:bottom-4 sm:gap-3 sm:px-4 sm:py-3"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f3f3f3] text-[#555555] sm:h-9 sm:w-9">
          <DocIcon />
        </span>
        <span className="min-w-0 flex-1 text-[12px] leading-[1.3] text-black sm:text-[13px]">
          <span className="block font-bold">See the Proof</span>
          <span className="block truncate text-[#6b6b6b] sm:whitespace-normal">View our quality procedures</span>
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f3f3f3] text-black sm:h-8 sm:w-8">
          ›
        </span>
      </Link>
    </div>
  );
}

export function QualityVerifySection() {
  const [active, setActive] = useState<TabId>("potency");
  const tab = TABS.find((item) => item.id === active) ?? TABS[0];

  return (
    <section className="home-section-y bg-white font-sans">
      <div className="site-container">
        <div className="grid w-full items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-14">
          <QualityVisualPanel className="order-1 lg:order-2 lg:sticky lg:top-24" />

          <div className="order-2 min-w-0 lg:order-1">
            <h2 className="max-w-[520px] text-[28px] font-bold leading-[1.12] tracking-[-0.035em] text-[#111111] sm:text-[36px] lg:text-[40px]">
              Quality you can verify, not just trust
            </h2>
            <p className="mt-3 max-w-[480px] text-[15px] leading-[1.65] text-[#6b6b6b] sm:mt-4">
              Every batch is 8x tested by accredited U.S. laboratories. We don&apos;t ask you to take our word for it: we
              give you the proof.
            </p>

            <div className="mt-6 grid max-w-[520px] grid-cols-3 sm:mt-8">
              <Stat value="99%+" label="Purity Guaranteed" />
              <Stat value="5" label="Quality Checks" bordered />
              <Stat value="100%" label="U.S. Verified" bordered />
            </div>

            <div className="relative mt-6 sm:mt-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent lg:hidden"
              />
              <div className="-mx-5 flex gap-2 overflow-x-auto scroll-smooth px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
                {TABS.map((item) => {
                  const on = item.id === active;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActive(item.id)}
                      className={cn(
                        "inline-flex h-10 shrink-0 snap-start items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition",
                        on
                          ? "bg-black text-white"
                          : "border border-[#e5e5e5] bg-white text-[#3f3f3f] hover:border-[#cfcfcf]",
                      )}
                      style={on ? { color: "#ffffff" } : undefined}
                    >
                      <TabIcon name={item.icon} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 rounded-[20px] bg-[#f4f4f5] p-4 sm:rounded-[22px] sm:p-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-[17px] font-bold text-black sm:text-[18px]">{tab.title}</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e7f8ee] px-2.5 py-1 text-[11px] font-semibold text-[#16a34a]">
                  <CheckMini />
                  {tab.badge}
                </span>
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#666666]">{tab.body}</p>
              <div className="mt-4 rounded-[14px] border-l-[5px] border-[#22c55e] bg-white px-3.5 py-3 sm:px-4 sm:py-3.5">
                <p className="text-[13px] leading-[1.55] text-[#333333] sm:text-[13.5px]">
                  <span className="font-bold">Why it matters:</span> {tab.why}
                </p>
              </div>
            </div>

            <form
              action="/coa"
              method="get"
              className="mt-6 hidden max-w-[480px] overflow-hidden rounded-[12px] border border-[#d8dde5] bg-white shadow-[0_4px_16px_rgba(15,23,42,0.05)] lg:flex"
            >
              <label className="sr-only" htmlFor="home-batch-search">
                Search batch number
              </label>
              <input
                id="home-batch-search"
                name="q"
                type="search"
                placeholder="Look up a batch number…"
                className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-[14px] text-[#111111] outline-none placeholder:text-[#9aa3ae]"
              />
              <button type="submit" className="shrink-0 bg-black px-4 text-[13px] font-semibold text-white">
                Search
              </button>
            </form>

            <div className="mt-5 flex flex-col items-start gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/store"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-black px-6 text-[14px] font-medium no-underline sm:w-auto"
                style={{ color: "#ffffff" }}
              >
                Shop Now
                <span aria-hidden="true">→</span>
              </Link>
              <p className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#16a34a]">
                <CheckMini />
                Free COA included with every order
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, bordered = false }: { value: string; label: string; bordered?: boolean }) {
  return (
    <div className={cn("min-w-0 px-2 first:pl-0 last:pr-0 sm:px-4", bordered && "border-l border-[#e5e5e5]")}>
      <p className="text-[24px] font-bold leading-none tracking-[-0.03em] text-black sm:text-[32px]">{value}</p>
      <p className="mt-1.5 text-[11px] leading-[1.3] text-[#7a7a7a] sm:mt-2 sm:text-[12px]">{label}</p>
    </div>
  );
}

function CheckMini({ light = false }: { light?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.2 6.2l2.4 2.4 5.2-5.4"
        stroke={light ? "#ffffff" : "currentColor"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 2.5h5.2L12 5.4V13.5H4V2.5z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 2.6V5.6h3" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function TabIcon({ name }: { name: string }) {
  const common = { width: 14, height: 14, viewBox: "0 0 14 14", fill: "none", "aria-hidden": true as const };
  if (name === "bolt") {
    return (
      <svg {...common}>
        <path d="M7.8 1.5L3.2 8h3.2L6.2 12.5 10.8 6H7.6L7.8 1.5z" fill="currentColor" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M7 1.6l4.2 1.5v3.6c0 2.5-1.8 4.2-4.2 5.3C4.6 10.9 2.8 9.2 2.8 6.7V3.1L7 1.6z" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="7" cy="7.2" r="4.4" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 4.8V7.2l2 1.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "check") {
    return (
      <svg {...common}>
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4.6 7.1l1.7 1.7 3.2-3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        d="M10.6 4.2A4.2 4.2 0 0 0 3.4 6M3.4 9.8A4.2 4.2 0 0 0 10.6 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M3.2 3.2v3h3M10.8 10.8v-3h-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
