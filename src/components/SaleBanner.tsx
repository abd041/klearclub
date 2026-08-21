"use client";

import { useEffect, useState } from "react";

const SALE_END = new Date("2026-08-31T23:59:59");

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function remaining() {
  const diff = Math.max(0, SALE_END.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    d: Math.floor(totalSeconds / 86400),
    h: pad(Math.floor((totalSeconds % 86400) / 3600)),
    m: pad(Math.floor((totalSeconds % 3600) / 60)),
    s: pad(totalSeconds % 60),
  };
}

export function SaleBanner() {
  const [clock, setClock] = useState({ d: 11, h: "14", m: "01", s: "22" });

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
  }

  return (
    <div className="relative overflow-hidden bg-[#3a0c0c] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_140%_at_50%_50%,#6b1c18_0%,#4a1010_42%,#2c0808_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#e8c56a] to-transparent" />

      <div className="pointer-events-none absolute bottom-0 left-0 hidden h-full w-40 sm:block">
        <LeftRays />
      </div>
      <div className="pointer-events-none absolute bottom-[-6px] right-3 hidden sm:block md:right-6">
        <SunMark />
      </div>

      <div className="relative mx-auto flex h-[48px] max-w-[1440px] items-center justify-center gap-x-3 overflow-hidden px-4 sm:h-[52px] sm:gap-x-5 sm:px-8">
        <p className="shrink-0 text-[10px] font-light uppercase tracking-[0.28em] text-white sm:text-[11px]">
          End of summer sale
        </p>
        <span aria-hidden="true" className="hidden h-4 w-px bg-white/80 sm:block" />
        <p className="shrink-0 font-[family-name:var(--font-fraunces)] text-[22px] italic leading-none text-[#e4c36a] sm:text-[26px]">
          35% Off Sitewide
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-[10px] font-light uppercase tracking-[0.22em] text-white sm:text-[11px]">
            Code
          </span>
          <button
            type="button"
            onClick={copyCode}
            className="rounded-full bg-gradient-to-r from-[#c9a227] via-[#f3e2a0] to-[#d4af37] px-3.5 py-[4px] text-[12px] font-bold tracking-[0.08em] text-black shadow-[0_0_12px_rgba(232,197,106,0.35)]"
          >
            HEAT35
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-[10px] font-light uppercase tracking-[0.22em] text-white sm:text-[11px]">
            Ends in
          </span>
          <span className="rounded-full border border-white/35 bg-black/70 px-3 py-[4px] font-mono text-[12px] font-medium tracking-wide text-white">
            {clock.d}d {clock.h}h {clock.m}m {clock.s}s
          </span>
        </div>
      </div>
    </div>
  );
}

function LeftRays() {
  return (
    <svg className="h-full w-full" viewBox="0 0 160 52" fill="none" aria-hidden="true" preserveAspectRatio="none">
      {Array.from({ length: 11 }).map((_, index) => {
        const x = 4 + index * 7;
        return (
          <line
            key={index}
            x1={x}
            y1="52"
            x2={18 + index * 11}
            y2="-8"
            stroke="#e8c56a"
            strokeOpacity={0.18 + (index % 3) * 0.04}
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

function SunMark() {
  return (
    <svg width="86" height="46" viewBox="0 0 86 46" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sale-sun" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3e2a0" />
          <stop offset="55%" stopColor="#e4c36a" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
      </defs>
      <circle cx="43" cy="40" r="16" fill="url(#sale-sun)" />
      {Array.from({ length: 11 }).map((_, index) => {
        const angle = -100 + index * 20;
        return (
          <rect
            key={index}
            x="42.15"
            y="2"
            width="1.7"
            height="14"
            rx="0.8"
            fill="url(#sale-sun)"
            transform={`rotate(${angle} 43 40)`}
          />
        );
      })}
    </svg>
  );
}
