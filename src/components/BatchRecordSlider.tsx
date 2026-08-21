"use client";

import { useRef } from "react";
import { CoaOpenButton } from "@/components/CoaModal";
import { getProductCoas } from "@/data/coas";
import { cn } from "@/lib/cn";
import type { PdpLot } from "@/lib/product-pdp";

const CARD_SCROLL = 316;

export function BatchRecordSlider({
  productName,
  productSlug,
  lots,
  selectedVariantId,
}: {
  productName: string;
  productSlug: string;
  lots: PdpLot[];
  selectedVariantId: string | null;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const files = getProductCoas(productSlug);

  function scrollBy(dir: -1 | 1) {
    scroller.current?.scrollBy({ left: dir * CARD_SCROLL, behavior: "smooth" });
  }

  return (
    <section id="coa" className="mt-8 scroll-mt-24 border-t border-black/[0.06] pt-6 lg:mt-10 lg:pt-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base leading-none font-semibold tracking-tight text-[#131315] lg:text-lg">
            Every batch on record
          </h3>
          <p className="mt-1.5 max-w-md text-[12px] text-[#8998a4]">
            Open any lot&apos;s signed certificate. Your order ships with its own lot-specific report.
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] text-[#6b7280] transition-colors hover:border-[#131315] hover:text-[#131315]"
            aria-label="Previous certificate"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] text-[#6b7280] transition-colors hover:border-[#131315] hover:text-[#131315]"
            aria-label="Next certificate"
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory gap-3.5 overflow-x-auto overflow-y-visible pt-2 pr-8 pb-3 pl-[5px]"
          style={{ scrollbarWidth: "none" }}
        >
          {lots.map((lot, index) => {
            const selected = Boolean(selectedVariantId) && lot.variantId === selectedVariantId;
            const badge = lot.latest ? "Latest" : selected ? "Selected quantity" : null;
            const file = files.find((item) => item.lot === lot.id) ?? files[index] ?? files[0];

            return (
              <article
                key={`${lot.id}-${lot.variantId}`}
                className="relative flex w-[280px] shrink-0 snap-start flex-col rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_10px_28px_-14px_rgba(21,163,74,0.18)] ring-1 ring-[#e5e7eb] transition-transform duration-300 ease-out hover:-translate-y-1 sm:w-[300px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-[15px] leading-snug font-semibold text-[#131315]">
                    {productName} {lot.label}
                  </h4>
                  {badge ? (
                    <span
                      className={cn(
                        "mt-0.5 shrink-0 text-[10px] font-semibold tracking-wider uppercase",
                        lot.latest ? "text-[#15a34a]" : "text-[#6b7280]",
                      )}
                    >
                      {badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 font-mono text-[12px] tracking-tight text-[#9aa0a8]">LOT {lot.id}</p>

                <div className="mt-4 mb-4 flex items-center gap-3.5">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#eafaef" }}
                    aria-hidden="true"
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full border"
                      style={{ borderColor: "#15a34a" }}
                    >
                      <svg
                        className="h-[15px] w-[15px]"
                        style={{ color: "#15a34a" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-[30px] leading-none font-semibold tracking-tight tabular-nums text-[#15a34a]">
                        {lot.purity}
                      </span>
                      <span className="text-[15px] font-semibold text-[#15a34a]">%</span>
                    </div>
                    <p className="mt-1.5 text-[12px] text-[#6b7280]">HPLC purity · meets spec</p>
                  </div>
                </div>

                <dl className="border-t border-[#efefef]">
                  <Row label="Labeled" value={lot.label} mute />
                  <Row label="Measured" value={lot.measured} />
                  <Row label="Identity" value={lot.identity} />
                  <Row label="Heavy metals" value="Not Detected" />
                  <Row label="Sterility" value="No Growth" />
                  <Row label="Endotoxin" value="< 0.05 EU/mL" />
                  <Row label="Tested" value={lot.tested} mute />
                </dl>

                <p className="mt-auto mb-3 pt-4 text-[11px] leading-relaxed text-[#8a8f98]">
                  <span className="font-semibold text-[#6b7280] tabular-nums">{lot.assays}</span> assays passed
                  <span className="text-[#c9cdd2]"> · ISO/IEC 17025 accredited</span>
                </p>

                <CoaOpenButton
                  href={file?.href}
                  className="group/btn flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#131315] text-[13px] font-medium hover:bg-black"
                  style={{ color: "#ffffff" }}
                >
                  View certificate
                  <svg
                    className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </CoaOpenButton>
              </article>
            );
          })}
          <div className="w-3 shrink-0 sm:w-5" aria-hidden="true" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f6f7f9] to-transparent"
        />
      </div>
    </section>
  );
}

function Row({ label, value, mute }: { label: string; value: string; mute?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[#f4f4f4] py-2 last:border-0">
      <dt className="truncate text-[12px] text-[#8a8f98]">{label}</dt>
      <dd className={cn("shrink-0 text-right text-[13px] font-medium tabular-nums", mute ? "text-[#8a8f98]" : "text-[#131315]")}>
        {value}
      </dd>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      {dir === "left" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      )}
    </svg>
  );
}
