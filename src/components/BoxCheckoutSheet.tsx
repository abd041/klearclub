"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { productImage, productImageClass, PRODUCT_IMAGE_BG } from "@/data/media";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";
import { pdpBackground } from "@/lib/product-pdp";
import type { Product } from "@/types/catalog";

export type BoxLine = {
  key: string;
  productSlug: string;
  variantId: string;
  boxIndex: number;
  slotIndex: number;
  product: Product;
  label: string;
  retail: number;
  sale: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  lines: BoxLine[];
  boxCount: number;
  boxIndexes: number[];
  retailPeptides: number;
  retailH2o: number;
  discount: number;
  monthly: number;
  onRemove: (boxIndex: number, slotIndex: number) => void;
  onRemoveBox: (boxIndex: number) => void;
  onNewBox: () => void;
  onContinue: () => void;
};

const H2O_RETAIL = 19.99;
const BOX_SIZE = 4;

export function BoxCheckoutSheet({
  open,
  onClose,
  lines,
  boxCount,
  boxIndexes,
  retailPeptides,
  retailH2o,
  discount,
  monthly,
  onRemove,
  onRemoveBox,
  onNewBox,
  onContinue,
}: Props) {
  const [activeBoxIndex, setActiveBoxIndex] = useState<number | null>(null);

  const resolvedActive = useMemo(() => {
    if (boxIndexes.length === 0) return null;
    if (activeBoxIndex !== null && boxIndexes.includes(activeBoxIndex)) return activeBoxIndex;
    return boxIndexes[boxIndexes.length - 1] ?? boxIndexes[0];
  }, [activeBoxIndex, boxIndexes]);

  useEffect(() => {
    if (!open) return;
    setActiveBoxIndex(boxIndexes[boxIndexes.length - 1] ?? null);
  }, [open, boxIndexes]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const retailTotal = retailPeptides + retailH2o;
  const boxLabel = boxCount === 1 ? "1 box" : `${boxCount} boxes`;
  const activeLines = lines.filter((line) => line.boxIndex === resolvedActive);
  const activeTabNumber =
    resolvedActive === null ? 1 : boxIndexes.indexOf(resolvedActive) + 1;
  const pickedCount = activeLines.length;

  return (
    <div className="fixed inset-0 z-[80]">
      <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Box checkout"
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.18)] sm:inset-y-auto sm:top-1/2 sm:bottom-auto sm:max-h-[90vh] sm:-translate-y-1/2 sm:rounded-[28px]"
      >
        <div className="flex shrink-0 justify-center pt-3 pb-1 sm:hidden">
          <span className="h-1 w-10 rounded-full bg-[#d8d8d8]" />
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-4 pt-2 pb-4 sm:px-5 sm:pt-5">
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Your boxes">
            {boxIndexes.map((boxIndex, displayIndex) => {
              const active = boxIndex === resolvedActive;
              const count = lines.filter((line) => line.boxIndex === boxIndex).length;
              return (
                <button
                  key={boxIndex}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveBoxIndex(boxIndex)}
                  className={cn(
                    "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition-colors",
                    active
                      ? "bg-[#131315] text-white"
                      : "border border-[#e0e0e0] bg-white text-gray-400 hover:border-[#131315]/30 hover:text-[#131315]",
                  )}
                >
                  <span>Box {displayIndex + 1}</span>
                  <span className={cn("text-[12px] font-medium", active ? "text-white/55" : "text-gray-400")}>
                    {count}/{BOX_SIZE}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <h2 className="text-base font-semibold text-[#131315]">Box {activeTabNumber}</h2>
              <span className="text-sm text-gray-500">
                {pickedCount} of {BOX_SIZE} picked
              </span>
            </div>
            {resolvedActive !== null ? (
              <button
                type="button"
                onClick={() => onRemoveBox(resolvedActive)}
                className="text-sm text-gray-400 underline underline-offset-2 hover:text-[#131315]"
              >
                Remove box
              </button>
            ) : null}
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {activeLines.map((line) => (
              <div
                key={line.key}
                className="flex items-center gap-3 rounded-2xl bg-[#f5f5f5] px-2.5 py-2.5"
              >
                <div
                  className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl"
                  style={{ backgroundColor: PRODUCT_IMAGE_BG }}
                >
                  <Image
                    src={productImage(line.product)}
                    alt=""
                    fill
                    unoptimized
                    className={productImageClass}
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#131315]">{line.product.name}</p>
                  <p className="text-xs text-gray-500">{line.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#131315]">{formatMoney(line.sale)}</p>
                  <p className="text-xs text-gray-400 line-through">{formatMoney(line.retail)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(line.boxIndex, line.slotIndex)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-white hover:text-[#131315]"
                  aria-label={`Remove ${line.product.name}`}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            ))}

            <div className="flex items-center gap-3 rounded-2xl bg-[#e9fce6] px-2.5 py-2.5">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/70">
                <Image
                  src={productImage({ slug: "klear-h2o", form: "vial" })}
                  alt="Klear H2O"
                  fill
                  unoptimized
                  className="object-cover object-[80%_center]"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#131315]">Klear H2O 10ml</p>
                <p className="text-xs text-gray-500">Included in every delivery</p>
              </div>
              <div className="pr-1 text-right">
                <p className="text-sm font-bold text-[#16a34a]">Free</p>
                <p className="text-xs text-gray-400 line-through">{formatMoney(H2O_RETAIL)}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onNewBox}
            className="mt-4 flex h-11 w-full items-center justify-center rounded-full border border-[#d8d8d8] bg-white text-sm font-medium text-[#131315] transition-colors hover:border-[#131315]/40"
          >
            + New box, another free Klear H2O
          </button>

          <div className="mt-4 space-y-2.5 rounded-2xl bg-[#f5f5f5] px-4 py-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Retail value ({boxLabel})</span>
              <span>{formatMoney(retailTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-[#16a34a]">
              <span>Box discount (40% off)</span>
              <span>-{formatMoney(discount)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-[#16a34a]">
              <span>Free Klear H2O{boxCount > 1 ? ` x${boxCount}` : ""}</span>
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

          <div className="mt-4 rounded-2xl border border-[#ececec] p-3">
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
        </div>

        <div className="shrink-0 border-t border-[#ececec] bg-white px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-5 sm:pb-5">
          <button
            type="button"
            onClick={onContinue}
            className="flex h-12 w-full items-center justify-center rounded-full bg-[#131315] text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            style={{ color: "#ffffff" }}
          >
            Sign in and continue · {formatMoney(monthly)}/mo
          </button>
        </div>
      </div>
    </div>
  );
}
