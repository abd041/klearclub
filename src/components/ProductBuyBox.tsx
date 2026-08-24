"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AddCartSpinner } from "@/components/AddCartSpinner";
import { useAddToCart } from "@/lib/use-add-to-cart";
import { CoaOpenButton } from "@/components/CoaModal";
import { PaymentMarks } from "@/components/PaymentMarks";
import { productImage } from "@/data/media";
import { formatMoney } from "@/lib/format";
import { FREE_SHIPPING_AT, SALE_OFF, salePrice, volumeUnitPrice } from "@/lib/commerce";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/catalog";

const BUNDLES = [
  { qty: 1, title: "1 Bottle", off: null, badge: null as string | null, badgeClass: "" },
  { qty: 2, title: "2 Bottles", off: "3.6% OFF", badge: "Most Popular", badgeClass: "bg-[#0d9488] text-white" },
  { qty: 3, title: "3+ Bottles", off: "5.3% OFF", badge: "Best Value", badgeClass: "bg-[#e8a317] text-white" },
  { qty: 10, title: "10+ Bottles", off: "40% OFF", badge: "Bulk", badgeClass: "bg-[#131315] text-white" },
] as const;

function arrives() {
  const start = new Date();
  start.setDate(start.getDate() + 3);
  const end = new Date();
  end.setDate(end.getDate() + 6);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  return `${fmt(start)} - ${fmt(end)}`;
}

function unitPrice(retail: number, qty: number) {
  return volumeUnitPrice(retail, qty);
}

function bundleForQty(qty: number) {
  if (qty >= 10) return 10;
  if (qty >= 3) return 3;
  if (qty >= 2) return 2;
  return 1;
}

function shipLabel(now: Date) {
  const etParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = Number(etParts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(etParts.find((p) => p.type === "minute")?.value ?? "0");
  const remain = 15 * 60 - (hour * 60 + minute);
  if (remain <= 0) return "Order by 3pm ET tomorrow · ships next business day";
  const h = Math.floor(remain / 60);
  const m = remain % 60;
  return `Order within ${h}h ${m}m · ships today`;
}

export function ProductBuyBox({
  product,
  variantId,
  onVariantId,
}: {
  product: Product;
  variantId: string;
  onVariantId: (id: string) => void;
}) {
  const { addToCart, isAdding, justAdded, isBusy } = useAddToCart();
  const [qty, setQty] = useState(1);
  const [heatApplied, setHeatApplied] = useState(false);
  const [orderLine, setOrderLine] = useState("Order by 3pm ET to ship same day");
  const selected = product.variants.find((item) => item.id === variantId) ?? product.variants[0];
  const retail = selected.price;
  const sale = salePrice(retail);
  const total = Math.round(unitPrice(retail, qty) * qty * 100) / 100;
  const activeBundle = bundleForQty(qty);
  const image = productImage(product);
  const unitWord = product.form === "spray" ? "Spray" : product.form === "supply" ? "Unit" : "Bottle";

  useEffect(() => {
    function tick() {
      setOrderLine(shipLabel(new Date()));
    }
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  function add() {
    addToCart(product.slug, selected.id, qty);
  }

  return (
    <>
      <div className="mt-5 border-t border-black/[0.06] pt-5 lg:mt-1">
        <div className="lg:hidden">
          <div className="min-w-0">
            <p className="mb-2.5 text-[11px] font-semibold tracking-[0.14em] text-[#9ca3af] uppercase">Mass</p>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {product.variants.map((variant) => {
                const on = variant.id === selected.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => onVariantId(variant.id)}
                    className={cn(
                      "shrink-0 rounded-xl border px-4 py-2.5 text-[13px] font-semibold tracking-[0.04em]",
                      on ? "border-[#131315] bg-[#131315]" : "border-[#e5e7eb] bg-white text-[#4b5563]",
                    )}
                    style={on ? { color: "#ffffff" } : undefined}
                  >
                    {variant.label.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="text-left">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-[#9a9a9a] line-through">{formatMoney(retail)}</span>
                <span className="text-[28px] leading-none font-extrabold tracking-tight text-[#c2183a]">
                  {formatMoney(sale)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setHeatApplied(true);
                  void navigator.clipboard.writeText("HEAT35");
                }}
                className="mt-1.5 text-left text-[11px] leading-snug text-[#666]"
              >
                Save {Math.round(SALE_OFF * 100)}% with code <span className="font-semibold text-black">HEAT35</span> ·{" "}
                <span className="underline decoration-dotted underline-offset-2">
                  {heatApplied ? "applied" : "tap to apply"}
                </span>
              </button>
            </div>

            <div className="flex h-11 shrink-0 items-center rounded-full border border-[#e0e0e0]">
              <button
                type="button"
                className="flex h-full w-11 items-center justify-center text-lg text-[#555]"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                type="button"
                className="flex h-full w-11 items-center justify-center text-lg text-[#555]"
                onClick={() => setQty((n) => Math.min(50, n + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="hidden items-start justify-between gap-4 lg:flex">
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-black/45 uppercase">Mass</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => {
                const on = variant.id === selected.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => onVariantId(variant.id)}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-sm font-medium",
                      on
                        ? "border-[#131315] bg-[#131315] text-white"
                        : "border-[#e0e0e0] bg-white text-[#555] hover:border-[#999]",
                    )}
                    style={on ? { color: "#ffffff" } : undefined}
                  >
                    {variant.label.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-sm text-[#9a9a9a] line-through">{formatMoney(retail)}</span>
              <span className="text-[28px] leading-none font-extrabold tracking-tight text-[#c2183a]">
                {formatMoney(sale)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setHeatApplied(true);
                void navigator.clipboard.writeText("HEAT35");
              }}
              className="mt-1 text-[11px] leading-snug text-[#666]"
            >
              Save {Math.round(SALE_OFF * 100)}% with code <span className="font-semibold text-black">HEAT35</span> ·{" "}
              <span className="underline decoration-dotted underline-offset-2">
                {heatApplied ? "applied" : "tap to apply"}
              </span>
            </button>
          </div>
        </div>

        <p className="mt-5 mb-2 hidden text-[11px] font-semibold tracking-[0.14em] text-black/45 uppercase lg:block">Quantity</p>
        <div className="hidden h-11 max-w-[220px] items-center rounded-full border border-[#e0e0e0] lg:flex">
          <button
            type="button"
            className="flex h-full w-12 items-center justify-center text-lg text-[#555]"
            onClick={() => setQty((n) => Math.max(1, n - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="flex-1 text-center text-sm font-medium">{qty}</span>
          <button
            type="button"
            className="flex h-full w-12 items-center justify-center text-lg text-[#555]"
            onClick={() => setQty((n) => Math.min(50, n + 1))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <p className="mt-5 mb-2 text-[11px] font-semibold tracking-[0.14em] text-black/45 uppercase">
          Bundle &amp; save
        </p>
        <div className="grid grid-cols-4 gap-2">
          {BUNDLES.map((bundle) => {
            const on = activeBundle === bundle.qty;
            const title = bundle.title.replace("Bottle", unitWord).replace("Bottles", `${unitWord}s`);
            return (
              <button
                key={bundle.qty}
                type="button"
                onClick={() => setQty(bundle.qty)}
                className={cn(
                  "relative flex flex-col items-center rounded-xl border px-1 pb-2.5 pt-4 text-center",
                  on ? "border-[#9fd4b3] bg-[#eef8f1]" : "border-[#e8e8e8] bg-white hover:border-[#ccc]",
                )}
              >
                {bundle.badge ? (
                  <span
                    className={cn(
                      "absolute -top-2 left-1/2 z-[1] -translate-x-1/2 rounded-full px-1.5 py-0.5 text-[8px] font-bold tracking-wide whitespace-nowrap uppercase",
                      bundle.badgeClass,
                    )}
                    style={bundle.badge ? { color: "#ffffff" } : undefined}
                  >
                    {bundle.badge}
                  </span>
                ) : null}
                <BottleStack src={image} count={bundle.qty} name={product.name} />
                <span className="mt-1.5 text-[10px] leading-tight font-semibold tracking-wide uppercase sm:text-[11px]">
                  {title}
                </span>
                {bundle.off ? (
                  <span className="mt-0.5 text-[10px] font-semibold text-[#0f766e]">{bundle.off}</span>
                ) : (
                  <span className="mt-0.5 text-[10px] text-transparent">.</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <CoaOpenButton className="inline-flex h-12 items-center rounded-full border border-[#e0e0e0] px-5 text-sm font-medium text-[#555] hover:border-[#999]">
            CoA
          </CoaOpenButton>
          <button
            type="button"
            onClick={add}
            disabled={isBusy}
            className={cn(
              "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium disabled:opacity-90",
              justAdded ? "bg-[#16a34a]" : "bg-[#131315]",
            )}
            style={{ color: "#ffffff" }}
          >
            {isAdding ? (
              <AddCartSpinner />
            ) : justAdded ? (
              "Added ✓"
            ) : (
              <>
                {`Add to cart · ${formatMoney(total)}`}
                <CartIcon />
              </>
            )}
          </button>
        </div>

        <Link
          href="/account"
          className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#131315] text-sm font-semibold text-[#131315] no-underline hover:bg-[#131315] hover:text-white"
        >
          <RefreshIcon />
          Subscribe &amp; Save Up to 10%
        </Link>

        <div className="mt-3 rounded-xl bg-[#eef8ee] px-4 py-1">
          <TrustRow icon={<ClockIcon />} title={orderLine} subtitle="Cutoff 3:00 PM ET (12:00 PM PT)" />
          <TrustRow
            icon={<TruckIcon />}
            title={`Arrives ${arrives()}`}
            subtitle={`Free standard shipping on orders over ${formatMoney(FREE_SHIPPING_AT)}`}
          />
          <TrustRow
            icon={<ShieldIcon />}
            title="Free shipment protection"
            subtitle="Lost, stolen, or damaged? We replace it, on us."
          />
          <TrustRow
            icon={<ZapIcon />}
            title="Overnight and 2-day options"
            subtitle="Pick your speed at checkout"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-1">
          <span className="inline-flex items-center gap-2 text-[11px] text-[#8a8f98]">
            We accept
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-[0.08em] text-[#6b7280] uppercase">
              <LockIcon />
              Secure 256-bit checkout
            </span>
          </span>
          <PaymentMarks />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div className="border-t border-[#e8e8e8] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col gap-y-2 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{product.name}</span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-xs text-[#999] line-through">{formatMoney(retail)}</span>
                <span className="font-bold text-[#c2183a]">{formatMoney(sale)}</span>
              </span>
            </div>
            <div className="flex items-center gap-x-3">
              <div className="flex flex-wrap gap-x-2">
                {product.variants.map((variant) => {
                  const on = variant.id === selected.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => onVariantId(variant.id)}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm font-semibold",
                        on ? "border-[#131315] bg-[#131315]" : "border-gray-300 text-[#555]",
                      )}
                      style={on ? { color: "#ffffff" } : undefined}
                    >
                      {variant.label.toUpperCase()}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={add}
                disabled={isBusy}
                className={cn(
                  "inline-flex h-10 flex-1 items-center justify-center rounded-full px-4 text-sm font-medium disabled:opacity-90",
                  justAdded ? "bg-[#16a34a]" : "bg-[#131315]",
                )}
                style={{ color: "#ffffff" }}
              >
                {isAdding ? <AddCartSpinner /> : justAdded ? "Added ✓" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BottleStack({ src, count, name }: { src: string; count: number; name: string }) {
  const shown = count >= 10 ? 3 : Math.min(count, 3);
  return (
    <div className="relative h-11 w-[52px]">
      {Array.from({ length: shown }).map((_, index) => (
        <Image
          key={index}
          src={src}
          alt=""
          width={22}
          height={44}
          unoptimized
          className="absolute bottom-0 h-10 w-auto object-contain drop-shadow-sm"
          style={{ left: 4 + index * 10, zIndex: shown - index }}
        />
      ))}
      {count >= 10 ? (
        <span className="absolute -right-0.5 -bottom-0.5 rounded bg-black px-1 text-[8px] font-bold" style={{ color: "#ffffff" }}>
          10+
        </span>
      ) : null}
      <span className="sr-only">{name}</span>
    </div>
  );
}

function TrustRow({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className="mt-0.5 shrink-0 text-[#16a34a]">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[13px] leading-tight font-medium text-[#131315]">{title}</span>
        <span className="mt-0.5 block text-[11px] leading-tight text-[#8a8f98]">{subtitle}</span>
      </span>
    </div>
  );
}

function CartIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M6 6 5 3H2" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M20 9a8 8 0 00-14.32-3M4 15a8 8 0 0014.32 3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-3 w-3 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.25">
      <circle cx="12" cy="16" r="1" />
      <rect x="3" y="10" width="18" height="12" rx="2" />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
    </svg>
  );
}
