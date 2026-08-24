"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SALE_END = new Date("2026-08-31T23:59:59");

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function remaining() {
  const diff = Math.max(0, SALE_END.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    d: pad(Math.floor(totalSeconds / 86400)),
    h: pad(Math.floor((totalSeconds % 86400) / 3600)),
    m: pad(Math.floor((totalSeconds % 3600) / 60)),
    s: pad(totalSeconds % 60),
  };
}

const CYAN = "#00e5ff";
const CYAN_DIM = "#00b8d4";

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[3px]">
      <span className="flex h-[36px] w-[40px] items-center justify-center rounded-lg border border-[#00e5ff]/20 bg-[#0a1628]/80 font-mono text-[18px] font-bold tabular-nums leading-none text-white sm:h-[40px] sm:w-[44px] sm:text-[20px]">
        {value}
      </span>
      <span className="text-[7px] font-semibold uppercase tracking-[0.14em] text-[#00e5ff]/50 sm:text-[8px]">{label}</span>
    </div>
  );
}

function BadgeIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true" className="shrink-0 sm:h-12 sm:w-12">
      <circle cx="21" cy="21" r="14" stroke={CYAN} strokeWidth="1.2" opacity="0.4" />
      <circle cx="21" cy="21" r="10" stroke={CYAN} strokeWidth="1" opacity="0.6" />
      <path d="M21 10L23.5 16H29L24.5 20L26 26L21 22.5L16 26L17.5 20L13 16H18.5L21 10Z" fill={CYAN} opacity="0.25" stroke={CYAN} strokeWidth="0.8" />
      <path d="M17.5 32L21 28L24.5 32" stroke={CYAN} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <path d="M15 33L21 29L27 33" stroke={CYAN} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

export function SaleBanner() {
  const [clock, setClock] = useState({ d: "07", h: "14", m: "01", s: "22" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function tick() {
      setClock(remaining());
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  function copyCode() {
    void navigator.clipboard.writeText("HEAT35");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #020a18 0%, #041428 30%, #061830 50%, #071a2e 70%, #0a1e38 100%)" }}>
      {/* Diagonal light streak */}
      <div className="pointer-events-none absolute -top-20 right-[15%] h-[200%] w-[1px] rotate-[25deg] bg-gradient-to-b from-transparent via-[#00e5ff]/15 to-transparent" />
      <div className="pointer-events-none absolute -top-20 right-[18%] h-[200%] w-[60px] rotate-[25deg] bg-gradient-to-b from-transparent via-[#00e5ff]/[0.03] to-transparent blur-md" />
      {/* Soft glow */}
      <div className="pointer-events-none absolute -bottom-12 left-1/2 h-32 w-[50%] -translate-x-1/2 rounded-full bg-[#00e5ff]/[0.04] blur-3xl" />
      {/* Edge lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/10 to-transparent" />

      <div className="site-container relative flex justify-center">
        {/* ── Mobile ── */}
        <div className="flex w-full flex-col items-center gap-2.5 py-3.5 sm:hidden">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: CYAN }}>End of summer</span>
            <span className="text-[22px] font-extrabold tracking-tight text-white">SALE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[18px] font-extrabold text-white">35%<span className="text-[14px]"> OFF</span></span>
            <div className="flex items-center gap-1.5 rounded-lg border border-[#00e5ff]/20 bg-[#0a1628]/60 px-3 py-[5px]">
              <span className="font-mono text-[12px] font-bold tracking-[0.06em] text-white">HEAT35</span>
              <button type="button" onClick={copyCode} className="ml-0.5 text-[#00e5ff]/50 transition hover:text-[#00e5ff]" aria-label="Copy code">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="5" width="9" height="9" rx="1.5" /><path d="M5 11H3.5A1.5 1.5 0 0 1 2 9.5V3.5A1.5 1.5 0 0 1 3.5 2h6A1.5 1.5 0 0 1 11 3.5V5" /></svg>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <TimeUnit value={clock.d} label="days" />
            <TimeUnit value={clock.h} label="hrs" />
            <TimeUnit value={clock.m} label="mins" />
            <TimeUnit value={clock.s} label="secs" />
          </div>
        </div>

        {/* ── Desktop ── */}
        <div className="relative hidden h-[78px] w-full items-center justify-center gap-x-6 sm:flex lg:gap-x-8">
          {/* Badge + title */}
          <div className="flex items-center gap-3">
            <BadgeIcon />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] lg:text-[11px]" style={{ color: CYAN }}>End of summer</span>
              <span className="text-[26px] font-extrabold leading-none tracking-tight text-white lg:text-[30px]">SALE</span>
            </div>
          </div>

          <span className="h-8 w-px bg-gradient-to-b from-transparent via-[#00e5ff]/15 to-transparent" />

          {/* 35% OFF */}
          <div className="flex flex-col items-center">
            <span className="text-[28px] font-extrabold leading-none tracking-tight text-white lg:text-[32px]">
              35%<span className="text-[20px] font-bold lg:text-[22px]"> OFF</span>
            </span>
            <span className="mt-1 rounded-full px-3 py-[2px] text-[8px] font-bold uppercase tracking-[0.2em] lg:text-[9px]" style={{ color: "#020a18", backgroundColor: CYAN }}>Sitewide</span>
          </div>

          <span className="h-8 w-px bg-gradient-to-b from-transparent via-[#00e5ff]/15 to-transparent" />

          {/* Code */}
          <div className="flex items-center gap-2.5">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35 lg:text-[10px]">Use code</span>
            <div className="flex items-center gap-2 rounded-lg border border-[#00e5ff]/20 bg-[#0a1628]/60 px-4 py-[7px]">
              <span className="font-mono text-[15px] font-bold tracking-[0.08em] text-white lg:text-[16px]">HEAT35</span>
              <button type="button" onClick={copyCode} className="text-[#00e5ff]/50 transition hover:text-[#00e5ff]" aria-label="Copy code">
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8.5L7 11.5L12 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="5" width="9" height="9" rx="1.5" /><path d="M5 11H3.5A1.5 1.5 0 0 1 2 9.5V3.5A1.5 1.5 0 0 1 3.5 2h6A1.5 1.5 0 0 1 11 3.5V5" /></svg>
                )}
              </button>
            </div>
          </div>

          <span className="h-8 w-px bg-gradient-to-b from-transparent via-[#00e5ff]/15 to-transparent" />

          {/* Countdown */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white/35 lg:text-[9px]">Ends in</span>
            <div className="flex items-center gap-1.5">
              <TimeUnit value={clock.d} label="days" />
              <TimeUnit value={clock.h} label="hrs" />
              <TimeUnit value={clock.m} label="mins" />
              <TimeUnit value={clock.s} label="secs" />
            </div>
          </div>

          <span className="h-8 w-px bg-gradient-to-b from-transparent via-[#00e5ff]/15 to-transparent" />

          {/* Shop Now */}
          <Link
            href="/products"
            className="flex items-center gap-1.5 rounded-lg px-5 py-[8px] text-[10px] font-bold uppercase tracking-[0.18em] transition hover:brightness-110 lg:text-[11px]"
            style={{ backgroundColor: CYAN, color: "#020a18" }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2.5 2h2l1.2 7h6.6l1.2-5H5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="12.5" r="1" fill="currentColor" />
              <circle cx="11.5" cy="12.5" r="1" fill="currentColor" />
            </svg>
            Shop now
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M4.5 2.5L8.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
