"use client";

import { CoaOpenButton } from "@/components/CoaModal";
import { getProductCoas } from "@/data/coas";
import { cn } from "@/lib/cn";
import type { PdpLot } from "@/lib/product-pdp";

const QC_ROWS = [
  ["Appearance", "Visual", "Good", "Pass"],
  ["Purity", "HPLC · spec ≥ 95%", "purity", "Pass"],
  ["Net Peptide Content", "HPLC", "measured", "Reported"],
  ["Identity", "HPLC", "Confirmed", "Pass"],
  ["Fentanyl Screen", "Immunoassay", "Not Detected", "Pass"],
  ["Heavy Metals", "ICP-MS", "Not Detected", "Pass"],
  ["Sterility", "PCR", "No Growth", "Pass"],
  ["Endotoxin", "USP <85>", "< 0.05 EU/mL", "Reported"],
] as const;

const FEATURED: Record<string, { purity: string }> = {
  "glp-3": { purity: "99.86" },
};

export function VerifiedResultsPanel({
  slug,
  purity,
  lot,
}: {
  slug: string;
  purity: string;
  lot: PdpLot;
}) {
  const featured = getProductCoas(slug)[0];
  const stats = FEATURED[slug];
  const lotId = featured?.lot || lot.id;
  const shownPurity = stats?.purity ?? purity;
  const labeled = lot.label;
  const measured = lot.measured;
  const tested = lot.tested;

  return (
    <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-6">
      <div className="relative flex flex-col overflow-hidden rounded-[20px] bg-[#131315] p-6 sm:p-7">
        <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#cbe5fc] via-[#e8e5ff] to-[#e9fce6]" />
        <svg
          className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 text-white/[0.04]"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 1.5l2.61 2.03 3.26-.44 1.27 3.04 3.04 1.27-.44 3.26L23.77 13l-2.03 2.61.44 3.26-3.04 1.27-1.27 3.04-3.26-.44L12 24.77l-2.61-2.03-3.26.44-1.27-3.04-3.04-1.27.44-3.26L.23 13l2.03-2.61-.44-3.26 3.04-1.27 1.27-3.04 3.26.44L12 1.5zm-1.2 14.05l6.04-6.04-1.41-1.41-4.63 4.62-2.23-2.23-1.41 1.42 3.64 3.64z" />
        </svg>

        <div className="relative flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#cbe5fc] text-[13px] font-bold text-[#131315]">
            ILS
          </span>
          <span className="min-w-0">
            <span className="block leading-tight font-semibold text-white">ILS Laboratories</span>
            <span className="block text-[11px] leading-tight text-white/45">
              Independent, ISO/IEC 17025 accredited
            </span>
          </span>
        </div>

        <div className="relative mt-6">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-white/50 uppercase">
            Certificate of Analysis
          </p>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-[56px] leading-none font-bold tracking-tight text-white tabular-nums sm:text-[64px]">
              {shownPurity}
            </span>
            <span className="text-3xl leading-none font-bold text-[#9fe6a0]">%</span>
          </div>
          <p className="mt-1.5 text-[11px] font-semibold tracking-[0.18em] text-white/50 uppercase">
            Purity by HPLC
          </p>
        </div>

        <dl className="relative mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/10 pt-5">
          <div>
            <dt className="text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">Lot</dt>
            <dd className="mt-1 text-sm font-semibold text-white">{lotId}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">Tested</dt>
            <dd className="mt-1 text-sm font-semibold text-white">{tested}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">Labeled</dt>
            <dd className="mt-1 text-sm font-semibold text-white">{labeled}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">Measured</dt>
            <dd className="mt-1 text-sm font-semibold text-[#9fe6a0]">{measured}</dd>
          </div>
        </dl>

        <div className="relative mt-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold tracking-wider text-white/90 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            ISO 17025 Accredited
          </span>
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold tracking-wider text-white/90 uppercase">
            8× Tested
          </span>
        </div>

        <div className="relative mt-auto pt-6">
          <CoaOpenButton
            href={featured?.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold whitespace-nowrap text-[#131315] hover:bg-[#f1f2f4]"
          >
            View signed certificate (PDF)
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </CoaOpenButton>
        </div>
      </div>

      <div className="relative flex flex-col overflow-hidden rounded-[20px] border border-[#e6e8ec] bg-white">
        <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#cbe5fc] via-[#e8e5ff] to-[#e9fce6]" />
        <div className="flex items-center justify-between gap-3 border-b border-[#eef0f3] px-4 pt-5 pb-4 sm:px-6">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#8998a4] uppercase">Full QC panel</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16a34a]/10 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-[#15803d]">
            <CheckMini className="h-3 w-3" />
            6 passed · 2 reported
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          {QC_ROWS.map(([name, method, valueKey, status], index) => {
            const value =
              valueKey === "purity" ? `${shownPurity}%` : valueKey === "measured" ? measured : valueKey;
            return (
              <div
                key={name}
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-3 sm:px-6",
                  index > 0 && "border-t border-[#eef0f3]",
                )}
              >
                <div className="min-w-0">
                  <p className="text-sm leading-tight font-semibold text-[#131315]">{name}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-[#8998a4]">{method}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
                  <span
                    className={cn(
                      "text-right text-sm tabular-nums",
                      name === "Purity" ? "font-bold text-[#131315]" : "font-medium text-[#3f4650]",
                    )}
                  >
                    {value}
                  </span>
                  {status === "Pass" ? (
                    <span className="inline-flex w-[76px] items-center justify-center gap-1 rounded-full bg-[#16a34a]/10 px-2 py-1 text-[10px] font-bold tracking-wide text-[#15803d] uppercase">
                      <CheckMini className="h-2.5 w-2.5" strokeWidth={3.5} />
                      Pass
                    </span>
                  ) : (
                    <span className="inline-flex w-[76px] items-center justify-center rounded-full bg-[#f1f2f4] px-2 py-1 text-[10px] font-bold tracking-wide text-[#6b7280] uppercase">
                      Reported
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CheckMini({ className, strokeWidth = 3 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
