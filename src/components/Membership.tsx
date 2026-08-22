"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";

type TierId = "member" | "insider" | "vip" | "founder";
type Cycle = "monthly" | "yearly";

type Perk = { label: string; included: boolean };

type Tier = {
  id: TierId;
  name: string;
  blurb: string;
  monthly: number | null;
  yearly: number | null;
  badge?: string;
  badgeTone?: "dark" | "mint";
  dark?: boolean;
  cta: string;
  disabled?: boolean;
  perks: Perk[];
};

const TIERS: Tier[] = [
  {
    id: "member",
    name: "Member",
    blurb: "Start earning points on every order.",
    monthly: null,
    yearly: null,
    badge: "Current plan",
    badgeTone: "dark",
    cta: "Your current plan",
    disabled: true,
    perks: [
      { label: "2.5× points per $1", included: true },
      { label: "Free standard shipping", included: false },
      { label: "Free 2-day shipping", included: false },
      { label: "Early access + member drops", included: false },
      { label: "Priority fulfillment (ships first)", included: false },
    ],
  },
  {
    id: "insider",
    name: "Insider",
    blurb: "Free standard shipping + boosted points.",
    monthly: 9.99,
    yearly: 99.9,
    cta: "Choose Insider",
    perks: [
      { label: "3.5× points per $1", included: true },
      { label: "Free standard shipping", included: true },
      { label: "Free 2-day shipping", included: false },
      { label: "Early access + member drops", included: false },
      { label: "Priority fulfillment (ships first)", included: false },
    ],
  },
  {
    id: "vip",
    name: "VIP",
    blurb: "Free 2-day shipping + early access.",
    monthly: 19.99,
    yearly: 199.9,
    badge: "Most popular",
    badgeTone: "mint",
    cta: "Choose VIP",
    perks: [
      { label: "5× points per $1", included: true },
      { label: "Free standard shipping", included: true },
      { label: "Free 2-day shipping", included: true },
      { label: "Early access + member drops", included: true },
      { label: "Priority fulfillment (ships first)", included: false },
    ],
  },
  {
    id: "founder",
    name: "Founder",
    blurb: "Priority shipping + 2,500 bonus points every month.",
    monthly: 99.99,
    yearly: 999.9,
    dark: true,
    cta: "Choose Founder",
    perks: [
      { label: "10× points per $1", included: true },
      { label: "Free standard shipping", included: true },
      { label: "Free 2-day shipping", included: true },
      { label: "Early access + member drops", included: true },
      { label: "Priority fulfillment (ships first)", included: true },
    ],
  },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6" />
    </svg>
  );
}

export function Membership() {
  const [selected, setSelected] = useState<TierId>("vip");
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const [planOpen, setPlanOpen] = useState(false);

  const activeTier = useMemo(() => TIERS.filter((tier) => tier.id !== "member"), []);
  const plan = TIERS.find((tier) => tier.id === selected) ?? TIERS[2];
  const price = cycle === "monthly" ? plan.monthly : plan.yearly;
  const priceLabel =
    cycle === "monthly"
      ? `${formatMoney(plan.monthly ?? 0)}`
      : `${formatMoney(plan.yearly ?? 0)}`;

  function chooseTier(id: TierId) {
    if (id === "member") return;
    setSelected(id);
    queueMicrotask(() => {
      document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="bg-white">
      {/* Plans */}
      <section className="bg-white pt-10 pb-12 lg:pt-16 lg:pb-20">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {TIERS.map((tier) => {
              const popular = tier.id === "vip";
              const dark = tier.dark;
              return (
                <article
                  key={tier.id}
                  className={cn(
                    "relative flex flex-col rounded-3xl transition-all",
                    dark
                      ? "bg-gradient-to-br from-[#131315] via-[#1a1a1f] to-[#2d2d35] text-white shadow-[0px_15px_50px_-20px_rgba(0,0,0,0.4)]"
                      : popular
                        ? "border-2 border-[#131315] bg-white shadow-[0px_15px_50px_-25px_rgba(151,201,143,0.6)]"
                        : "border border-[#e8e8e8] bg-white",
                  )}
                >
                  {tier.badge ? (
                    <div className="absolute inset-x-0 -top-3 flex justify-center">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase",
                          tier.badgeTone === "mint"
                            ? "bg-[#e9fce6] text-[#131315]"
                            : "bg-[#131315] text-white",
                        )}
                        style={tier.badgeTone === "dark" ? { color: "#ffffff" } : undefined}
                      >
                        {tier.badge}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex h-full flex-col p-6 lg:p-7">
                    <h3
                      className={cn(
                        "text-2xl font-semibold tracking-tight",
                        dark ? "text-white" : "text-[#131315]",
                      )}
                    >
                      {tier.name}
                    </h3>
                    <p className={cn("mt-1.5 text-sm", dark ? "text-white/70" : "text-[#131315]/60")}>
                      {tier.blurb}
                    </p>

                    <div className="mt-6 border-b border-current/10 pb-5">
                      {tier.monthly == null ? (
                        <p className="text-4xl font-semibold tracking-tight text-[#131315] tabular-nums">Free</p>
                      ) : (
                        <>
                          <p
                            className={cn(
                              "text-4xl font-semibold tracking-tight tabular-nums",
                              dark ? "text-white" : "text-[#131315]",
                            )}
                          >
                            {formatMoney(tier.monthly)}
                            <span
                              className={cn(
                                "ml-1 text-base font-normal",
                                dark ? "text-white/60" : "text-[#131315]/60",
                              )}
                            >
                              /mo
                            </span>
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span
                              className={cn(
                                "text-xs tabular-nums",
                                dark ? "text-white/60" : "text-[#131315]/60",
                              )}
                            >
                              {formatMoney(tier.yearly ?? 0)} billed yearly
                            </span>
                            <span
                              className={cn(
                                "rounded-full px-2.5 py-1 text-[11px] font-medium tracking-normal",
                                dark ? "bg-[#e9fce6]/20 text-[#e9fce6]" : "bg-green-50 text-green-700",
                              )}
                            >
                              2 Months Free
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    <ul className="flex-1 space-y-2.5 py-5 text-sm">
                      {tier.perks.map((perk) => (
                        <li key={perk.label} className="flex items-start gap-2.5">
                          <span
                            className={cn(
                              "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                              perk.included
                                ? dark
                                  ? "bg-[#e9fce6] text-[#131315]"
                                  : "bg-[#131315] text-white"
                                : "bg-[#e8e8e8]/50 text-[#131315]/30",
                            )}
                          >
                            {perk.included ? (
                              <CheckIcon className="h-3 w-3" />
                            ) : (
                              <CrossIcon className="h-2.5 w-2.5" />
                            )}
                          </span>
                          <span
                            className={cn(
                              "leading-snug",
                              perk.included
                                ? dark
                                  ? "text-white"
                                  : "text-[#131315]"
                                : dark
                                  ? "text-white/40 line-through"
                                  : "text-[#131315]/40 line-through",
                            )}
                          >
                            {perk.label}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {tier.disabled ? (
                      <button
                        type="button"
                        disabled
                        className="h-12 cursor-not-allowed rounded-full bg-[#f5f5f5] text-sm font-medium text-[#131315]/40"
                      >
                        {tier.cta}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => chooseTier(tier.id)}
                        className={cn(
                          "inline-flex h-12 items-center justify-center rounded-full text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.99]",
                          dark
                            ? "bg-[#e9fce6] text-[#131315] hover:bg-white"
                            : "bg-[#131315] text-white hover:bg-[#131315]/90",
                        )}
                        style={!dark ? { color: "#ffffff" } : undefined}
                      >
                        {tier.cta}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join */}
      <section id="join" className="scroll-mt-20 bg-[#f5f5f5]/60 py-12 lg:py-20">
        <div className="site-container max-w-2xl">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#131315]/60 uppercase">Sign up</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#131315] lg:text-4xl">
              Start your membership
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-[#131315]/60">
              Sign in or create your account, then enter your card. Cancel anytime, no penalty.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-[#e8e8e8] bg-white p-6 shadow-[0px_8px_30px_-15px_rgba(0,0,0,0.1)] lg:p-8">
            <div className="space-y-5">
              <div className="flex items-center justify-between rounded-2xl bg-[#f5f5f5] p-4">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-[#131315]/60 uppercase">Plan</p>
                  <p className="text-base font-semibold text-[#131315]">
                    {plan.name} · {cycle === "monthly" ? "Monthly" : "Annual"}
                  </p>
                </div>
                <p className="text-2xl font-semibold text-[#131315] tabular-nums">{priceLabel}</p>
              </div>

              <div className="space-y-3 rounded-2xl border border-[#e8e8e8] p-5 text-center">
                <p className="text-sm text-[#131315]">
                  Sign in or create your account to start your membership.
                </p>
                <Link
                  href={`/account?mode=create&redirect=/membership?tier=${selected}&cycle=${cycle}#join`}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#131315] text-sm font-semibold text-white transition-colors hover:bg-[#131315]/90"
                  style={{ color: "#ffffff" }}
                >
                  Continue
                </Link>
                <p className="text-[11px] text-[#131315]/60">
                  Takes 20 seconds. We&apos;ll bring you right back here to enter your card.
                </p>
              </div>

              <details
                className="rounded-2xl border border-[#e8e8e8] p-4"
                open={planOpen}
                onToggle={(event) => setPlanOpen((event.target as HTMLDetailsElement).open)}
              >
                <summary className="cursor-pointer list-none text-xs font-medium text-[#131315]/70 hover:text-[#131315] [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={cn(
                        "inline-block text-[10px] leading-none transition-transform",
                        planOpen && "rotate-90",
                      )}
                      aria-hidden="true"
                    >
                      ▶
                    </span>
                    Change plan or billing cycle
                  </span>
                </summary>

                <div className="mt-4 space-y-3">
                  <div>
                    <p className="mb-2 text-xs font-semibold tracking-wider text-[#131315]/60 uppercase">Plan</p>
                    <div className="grid grid-cols-3 gap-2">
                      {activeTier.map((tier) => {
                        const on = selected === tier.id;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setSelected(tier.id)}
                            className={cn(
                              "rounded-xl border p-2.5 text-left transition-all",
                              on
                                ? "border-[#131315] bg-[#131315] text-white"
                                : "border-[#e8e8e8] bg-white text-[#131315]",
                            )}
                            style={on ? { color: "#ffffff" } : undefined}
                          >
                            <p className="text-sm font-semibold">{tier.name}</p>
                            <p className={cn("text-[11px]", on ? "text-white/70" : "text-[#131315]/60")}>
                              {formatMoney(tier.monthly ?? 0)}/mo
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold tracking-wider text-[#131315]/60 uppercase">
                      Billing
                    </p>
                    <div className="inline-flex rounded-full bg-[#f5f5f5] p-1">
                      <button
                        type="button"
                        onClick={() => setCycle("monthly")}
                        className={cn(
                          "h-9 rounded-full px-4 text-xs font-medium transition-colors",
                          cycle === "monthly"
                            ? "bg-white text-[#131315] shadow-sm"
                            : "text-[#131315]/60",
                        )}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => setCycle("yearly")}
                        className={cn(
                          "relative inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-xs font-medium transition-colors",
                          cycle === "yearly"
                            ? "bg-white text-[#131315] shadow-sm"
                            : "text-[#131315]/60",
                        )}
                      >
                        Annual
                        <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-semibold text-green-700">
                          2 mo free
                        </span>
                      </button>
                    </div>
                  </div>

                  {cycle === "yearly" && price != null ? (
                    <p className="text-xs text-[#131315]/60">
                      Billed {formatMoney(price)} once per year for {plan.name}.
                    </p>
                  ) : null}
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Points */}
      <section className="scroll-mt-20 border-t border-[#e8e8e8]/50 bg-white py-14 lg:py-20">
        <div className="site-container max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#131315]/60 uppercase">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#131315] lg:text-4xl">
              Points are cash back.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#131315]/70 lg:text-lg">
              Every order earns points, and 100 points are worth $1 off a future order. Think of it as cash back that
              stacks automatically: the more you order, the more you save on what comes next.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                label: "Earn",
                title: "On every order",
                body: "5 to 10 points per dollar based on your tier, plus any active Double Points bonus. Points are credited to your balance when your order ships.",
                bg: "bg-[#e9fce6]",
              },
              {
                label: "Bonuses",
                title: "+100 signup, +250 phone",
                body: "One-time bonuses for setting up your account so you start with points already banked.",
                bg: "bg-[#fefeca]",
              },
              {
                label: "Redeem like cash",
                title: "100 pts = $1 off",
                body: "Apply your points at cart or checkout in 100-point ($1) increments. They come off your total like store credit, and if you return an order the points come back first.",
                bg: "bg-[#e8e5ff]",
              },
            ].map((card) => (
              <div
                key={card.label}
                className={cn("flex h-full flex-col rounded-3xl p-7 lg:min-h-[220px] lg:p-8", card.bg)}
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-[#131315]/60 uppercase">
                  {card.label}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#131315]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#131315]/70">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
