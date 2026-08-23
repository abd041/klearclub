"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";

const PACKS = [
  { pay: 100, bonus: 5 },
  { pay: 200, bonus: 10 },
  { pay: 400, bonus: 20 },
  { pay: 800, bonus: 25 },
] as const;

function formatPoints(value: number) {
  return value.toLocaleString("en-US");
}

function noteNumber(pay: number) {
  return pay.toString().padStart(4, "0");
}

function CreditNoteCard({
  pay,
  bonus,
  total,
  bonusPoints,
}: {
  pay: number;
  bonus: number;
  total: number;
  bonusPoints: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border-2 border-[#1b3022] bg-white p-5 shadow-[0_24px_60px_rgba(27,48,34,0.08)] sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(#ececea 1px, transparent 1px), linear-gradient(90deg, #ececea 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-8 h-56 w-56 rounded-full border border-[#ececea]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-12 top-20 h-40 w-40 rounded-full border border-[#ececea]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-24 top-32 h-24 w-24 rounded-full border border-[#ececea]" />

      <div className="relative flex items-start justify-between gap-4">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#9aa3a1]">
          Klear Club · Credit note
        </p>
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#9aa3a1]">
          No. {noteNumber(pay)}
        </p>
      </div>

      <div className="relative mt-7 flex items-start justify-between gap-4 sm:mt-8 sm:gap-6">
        <div className="min-w-0">
          <p
            aria-live="polite"
            className="font-serif text-[44px] font-medium leading-none tracking-[-0.03em] text-[#1b3022] sm:text-[58px]"
          >
            {formatPoints(total)} pts
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#9aa3a1]">
            you pay {formatMoney(pay)}
          </p>
        </div>

        <div className="flex h-[78px] w-[78px] shrink-0 flex-col items-center justify-center rounded-full border-2 border-[#1b3022] text-center sm:h-[88px] sm:w-[88px]">
          <span className="font-serif text-[22px] font-medium leading-none text-[#1b3022] sm:text-[26px]">+{bonus}%</span>
          <span className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[#6e7371]">Bonus</span>
        </div>
      </div>

      <div className="relative mt-8 flex items-center justify-between border-t border-[#eceeed] pt-4 sm:mt-10">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#1b3022]">
          +{formatPoints(bonusPoints)} pts free
        </p>
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#9aa3a1]">Spends like cash</p>
      </div>
    </div>
  );
}

export function HomeStoreCreditSection() {
  const [selected, setSelected] = useState(2);
  const pack = PACKS[selected];
  const points = useMemo(() => {
    const base = pack.pay * 100;
    const bonus = Math.round(base * (pack.bonus / 100));
    return { base, bonus, total: base + bonus };
  }, [pack]);

  return (
    <section className="home-section-y bg-[#f9f7f2] px-5 sm:px-8">
      <div className="site-container flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="max-w-[560px]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#8a8f8c]">
            Klear Club credit
          </p>
          <h2 className="mt-4 font-display text-[34px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#1b3022] sm:text-[42px]">
            Load points once.
            <br />
            We add up to <span className="text-[#a68966]">25% on top.</span>
          </h2>
          <p className="mt-4 max-w-[480px] text-[15px] leading-[1.7] text-[#6e7371] sm:text-[16px]">
            Store credit for your research supplies: 100 points = $1 at checkout, on any order. Slide higher, unlock a
            bigger bonus.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
            {PACKS.map((option, index) => {
              const active = index === selected;
              return (
                <button
                  key={option.pay}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors sm:px-4 sm:text-[14px]",
                    active
                      ? "bg-[#1b3022] text-white"
                      : "border border-[#d8ddd8] bg-white text-[#5f6762] hover:border-[#1b3022]",
                  )}
                >
                  {formatMoney(option.pay)} +{option.bonus}%
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3">
            <Link
              href="/membership"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#1b3022] px-8 text-[15px] font-semibold text-white no-underline transition hover:opacity-90 sm:w-auto"
            >
              Buy points
            </Link>
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#9aa3a1] sm:text-left">
              Visa · Amex · Apple Pay · Google Pay
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[520px] lg:mx-0 lg:justify-self-end">
          <CreditNoteCard key={pack.pay} pay={pack.pay} bonus={pack.bonus} total={points.total} bonusPoints={points.bonus} />

          <p className="mt-5 text-center font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#9aa3a1]">
            Instant · Nothing ships · Stacks with points you earn
          </p>
        </div>
      </div>
    </section>
  );
}
