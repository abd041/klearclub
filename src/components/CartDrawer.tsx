"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GooglePayCardModal } from "@/components/GooglePayCardModal";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/format";
import { FREE_SHIPPING_AT, SALE_OFF, localCommerceAdapter } from "@/lib/commerce";
import { productImage, productImageClass, PRODUCT_IMAGE_BG } from "@/data/media";
import { getProduct } from "@/data/products";

const WATER_SLUG = "klear-h2o";
const WATER_PRICE = 19.99;

function monthDay(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function cutoffRemaining() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now.getTime());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return `${h}h ${m}m`;
}

export function CartDrawer() {
  const router = useRouter();
  const { resolved, count, isOpen, closeCart, removeItem, setQuantity, addItem, clear, subtotal } = useCart();
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [upsellHidden, setUpsellHidden] = useState(false);
  const [showProtectInfo, setShowProtectInfo] = useState(false);
  const [orderWindow, setOrderWindow] = useState("6h 20m");
  const [gpayOpen, setGpayOpen] = useState(false);
  const [gpayCardOpen, setGpayCardOpen] = useState(false);
  const [confirmAge, setConfirmAge] = useState(false);
  const [confirmPowder, setConfirmPowder] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    function tick() {
      setOrderWindow(cutoffRemaining());
    }
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => {
      document.body.style.overflow = "";
      window.clearInterval(id);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setGpayOpen(false);
      setGpayCardOpen(false);
      setConfirmAge(false);
      setConfirmPowder(false);
    }
  }, [isOpen]);

  const water = getProduct(WATER_SLUG);
  const hasWater = resolved.some((line) => line.productSlug === WATER_SLUG);
  const showUpsell = Boolean(water) && !hasWater && !upsellHidden && resolved.length > 0;

  const priced = resolved;
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);
  const points = Math.round(subtotal * 2.5);
  const arrivesStart = new Date();
  arrivesStart.setDate(arrivesStart.getDate() + 3);
  const arrivesEnd = new Date();
  arrivesEnd.setDate(arrivesEnd.getDate() + 6);

  if (!isOpen) return null;

  function applyHeat35() {
    setPromoCode("HEAT35");
    setPromoApplied(true);
    setPromoOpen(false);
  }

  function applyTypedPromo() {
    if (promoCode.trim().toUpperCase() === "HEAT35") {
      setPromoApplied(true);
      setPromoOpen(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        className="absolute inset-0 animate-cart-backdrop-in bg-black/20"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[400px] animate-cart-drawer-in flex-col bg-white font-sans shadow-[-8px_0_32px_rgba(0,0,0,0.08)]">
        <header className="relative flex h-[52px] shrink-0 items-center border-b border-[#eeeeee]">
          <button
            type="button"
            onClick={closeCart}
            className="absolute left-1 flex h-11 w-11 items-center justify-center text-[#111]"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11.2 3.5 5.7 9l5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2 className="mx-auto flex items-center gap-1.5 text-[14px] font-bold tracking-[0.12em] text-black">
            YOUR CART
            {count > 0 ? (
              <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#d8f5e3] px-1 text-[11px] font-bold text-[#146c3a]">
                {count}
              </span>
            ) : null}
          </h2>
        </header>

        <div className="flex-1 overflow-y-auto px-5">
          {resolved.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-[15px] text-black">Your cart is empty.</p>
              <Link
                href="/store"
                onClick={closeCart}
                className="mt-5 inline-flex h-11 items-center rounded-full bg-black px-5 text-[13px] font-medium no-underline"
                style={{ color: "#ffffff" }}
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <>
              <ul>
                {priced.map((line) => {
                  const product = getProduct(line.productSlug);
                  return (
                    <li
                      key={`${line.productSlug}-${line.variantId}`}
                      className="relative flex gap-3.5 border-b border-[#eeeeee] py-4"
                    >
                      <div className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-[14px]" style={{ backgroundColor: PRODUCT_IMAGE_BG }}>
                        {product ? (
                          <Image
                            src={productImage(product)}
                            alt={line.name}
                            fill
                            unoptimized
                            className={productImageClass}
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1 pr-5">
                        <p className="text-[18px] leading-[1.15] font-bold text-black">{line.name}</p>
                        <p className="mt-0.5 text-[13px] text-[#9a9a9a]">{line.variantLabel}</p>
                        <div className="mt-2.5 flex items-center justify-between">
                          <label className="relative inline-flex h-[32px] min-w-[54px] items-center justify-center rounded-full border border-[#e2e2e2] bg-white pl-3.5 pr-2.5 text-[13px] font-medium text-black">
                            {line.quantity}
                            <svg className="ml-1" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                              <path d="M2 3.4 5 6.6 8 3.4" fill="none" stroke="#888" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                            <select
                              className="absolute inset-0 cursor-pointer opacity-0"
                              value={line.quantity}
                              onChange={(event) =>
                                setQuantity(line.productSlug, line.variantId, Number(event.target.value))
                              }
                              aria-label="Quantity"
                            >
                              {Array.from({ length: Math.max(50, line.quantity) }, (_, index) => index + 1).map((qty) => (
                                <option key={qty} value={qty}>
                                  {qty}
                                </option>
                              ))}
                            </select>
                          </label>
                          <p className="text-[17px] font-bold text-black">{formatMoney(line.lineTotal)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="absolute top-3.5 right-0 text-[16px] leading-none text-[#c0c0c0]"
                        aria-label={`Remove ${line.name}`}
                        onClick={() => removeItem(line.productSlug, line.variantId)}
                      >
                        ×
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-2.5 border-b border-[#eeeeee] py-[18px]">
                <ShieldIcon />
                <p className="flex-1 text-[14px] font-medium text-black">
                  Shipment Protection
                  <button
                    type="button"
                    className="ml-1.5 inline-flex h-[15px] w-[15px] translate-y-[-1px] items-center justify-center rounded-full border border-[#d0d0d0] text-[9px] text-[#9a9a9a]"
                    aria-label="Shipment protection info"
                    onClick={() => setShowProtectInfo((open) => !open)}
                  >
                    ?
                  </button>
                </p>
                <span className="text-[14px] font-bold text-[#22a45a]">Free</span>
              </div>
              {showProtectInfo ? (
                <p className="pt-2 text-[12px] leading-5 text-[#7a7a7a]">
                  Every order includes free replacement if a shipment is damaged in transit.
                </p>
              ) : null}

              <div className="mt-4 flex items-center gap-3 rounded-[22px] bg-[#4d1218] py-3 pr-3 pl-3">
                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-dashed border-[#e4c36a] text-center text-[10px] leading-[1.05] font-bold tracking-wide text-[#e4c36a]">
                  35%
                  <br />
                  OFF
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-[#e4c36a]">
                    END OF SUMMER SALE
                  </p>
                  <p className="mt-0.5 text-[13px] leading-snug font-semibold text-white">
                    {Math.round(SALE_OFF * 100)}% off this whole cart with HEAT35
                  </p>
                </div>
                <button
                  type="button"
                  onClick={applyHeat35}
                  className="h-[34px] shrink-0 rounded-full bg-[#e6d5a8] px-4 text-[13px] font-semibold text-black"
                >
                  {promoApplied ? "Applied" : "Apply"}
                </button>
              </div>

              {showUpsell && water ? (
                <div className="relative mt-5 rounded-[18px] border border-[#e3eaf3] bg-[linear-gradient(180deg,#eef6ff_0%,#f7fbff_55%,#ffffff_100%)] px-3 py-3">
                  <button
                    type="button"
                    className="absolute -top-1.5 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#d8d8d8] bg-white text-[11px] text-[#9a9a9a]"
                    aria-label="Dismiss upsell"
                    onClick={() => setUpsellHidden(true)}
                  >
                    ×
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-[12px] shadow-[0_1px_4px_rgba(0,0,0,0.06)]" style={{ backgroundColor: PRODUCT_IMAGE_BG }}>
                      <Image src={productImage(water)} alt={water.name} fill unoptimized className={productImageClass} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold tracking-[0.12em] text-[#22a45a]">
                        COMPLETE YOUR ORDER
                      </p>
                      <p className="mt-0.5 text-[14px] leading-tight font-bold text-black">{water.name}</p>
                      <p className="text-[12px] text-[#9a9a9a]">Reconstitution solution</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addItem(water.slug, water.variants[0].id, 1)}
                      className="h-[36px] shrink-0 rounded-full bg-black px-3.5 text-[13px] font-semibold"
                      style={{ color: "#ffffff" }}
                    >
                      + {formatMoney(WATER_PRICE)}
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="mt-5 border-b border-[#eeeeee] pb-4">
                {promoOpen ? (
                  <div className="flex gap-2">
                    <input
                      value={promoCode}
                      onChange={(event) => setPromoCode(event.target.value)}
                      placeholder="Promo code"
                      className="h-10 flex-1 rounded-full border border-[#e4e4e4] px-4 text-[13px] outline-none"
                    />
                    <button
                      type="button"
                      onClick={applyTypedPromo}
                      className="h-10 rounded-full bg-black px-4 text-[12px] font-semibold"
                      style={{ color: "#ffffff" }}
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPromoOpen(true)}
                    className="inline-flex items-center gap-2 text-[13px] text-[#8a8a8a]"
                  >
                    <TagIcon />
                    {promoApplied ? "HEAT35 applied" : "Add promo code"}
                  </button>
                )}
              </div>

              <div className="py-4">
                <div className="h-[5px] overflow-hidden rounded-full bg-[#ececec]">
                  <div className="h-full rounded-full bg-[#22c55e]" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-[13px]">
                  <span className="text-[#8a8a8a]">Free shipping</span>
                  <span className="font-bold text-black">
                    {remaining === 0 ? "Unlocked" : `${formatMoney(remaining)} away`}
                  </span>
                </div>
                <div className="mt-2 flex items-start justify-between gap-3 text-[12px] text-[#8a8a8a]">
                  <p>
                    Ships today · order in <span className="font-semibold text-black">{orderWindow}</span>
                  </p>
                  <p className="text-right">
                    Arrives <span className="font-semibold text-[#555]">{monthDay(arrivesStart)} - {monthDay(arrivesEnd)}</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {resolved.length > 0 ? (
          <div className="shrink-0 px-5 pt-2 pb-4">
            <div className="flex items-end justify-between">
              <span className="pb-0.5 text-[16px] font-bold text-black">Subtotal</span>
              <span className="text-[22px] leading-none font-bold tracking-[-0.02em] text-black">
                {formatMoney(subtotal)}
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#8a8a8a]">
              <StarIcon />
              <span>
                Earn <span className="font-semibold text-[#666]">{points} points</span> · credited with your order
              </span>
            </p>
            <div className="mt-3.5 space-y-2.5">
              <button
                type="button"
                onClick={() => setGpayOpen(true)}
                className="flex h-[52px] w-full items-center justify-center rounded-full bg-black"
                style={{ color: "#ffffff" }}
              >
                <GooglePayMark />
              </button>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex h-[52px] items-center justify-center gap-2 rounded-full bg-black text-[15px] font-semibold no-underline"
                style={{ color: "#ffffff" }}
              >
                Proceed to Checkout
                <span aria-hidden="true" className="text-[16px]">
                  →
                </span>
              </Link>
            </div>
          </div>
        ) : null}
      </aside>

      {gpayOpen ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Dismiss confirmation"
            onClick={() => {
              setGpayOpen(false);
              setConfirmAge(false);
              setConfirmPowder(false);
            }}
          />
          <div className="relative w-full max-w-[540px] rounded-[18px] bg-white px-8 pt-8 pb-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <h3 className="text-[22px] font-bold tracking-[-0.03em] text-black">Confirm to continue</h3>
            <p className="mt-2 text-[14px] text-[#8a8a8a]">
              Please confirm the following before paying with Google Pay.
            </p>

            <label className="mt-6 flex items-start gap-3">
              <input
                type="checkbox"
                checked={confirmAge}
                onChange={(event) => setConfirmAge(event.target.checked)}
                className="mt-[3px] h-[16px] w-[16px] shrink-0 rounded-[3px] border-[#cfcfcf] accent-black"
              />
              <span className="text-[13px] leading-[1.55] text-[#444]">
                I confirm that I am at least 21 years of age and am purchasing these products for{" "}
                <strong className="font-semibold text-black">research purposes only</strong>. These peptides are{" "}
                <strong className="font-semibold text-black">not intended for human consumption</strong>, veterinary
                use, therapeutic applications, or any diagnostic purposes. I understand and accept full
                responsibility for the proper handling and use of these products.{" "}
                <strong className="font-semibold text-black">
                  Klear Club is not liable for any misuse of these products.
                </strong>
              </span>
            </label>

            <label className="mt-5 flex items-start gap-3">
              <input
                type="checkbox"
                checked={confirmPowder}
                onChange={(event) => setConfirmPowder(event.target.checked)}
                className="mt-[3px] h-[16px] w-[16px] shrink-0 rounded-[3px] border-[#cfcfcf] accent-black"
              />
              <span className="text-[13px] leading-[1.55] text-[#444]">
                I understand that all products are shipped as{" "}
                <strong className="font-semibold text-black">freeze-dried powder</strong>. Freeze-drying preserves
                product stability, ensures sterility, and protects products during transit.{" "}
                <strong className="font-semibold text-black">
                  Klear Club does not provide, solicit, or endorse any usage instructions, dosage guidance, or
                  administration protocols for any products sold.
                </strong>
              </span>
            </label>

            <p className="mt-5 text-[12px] leading-5 text-[#9a9a9a]">
              By tapping Buy with Google Pay, you also confirm that you have read, understand and accept our{" "}
              <Link href="/terms" className="underline">
                Terms of Use
              </Link>
              ,{" "}
              <Link href="/terms" className="underline">
                Terms of Sale and Returns Policy
              </Link>
              , and acknowledge our{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>

            <div className="mt-6 flex items-center justify-end gap-6">
              <button
                type="button"
                className="text-[14px] text-[#9a9a9a]"
                onClick={() => {
                  setGpayOpen(false);
                  setConfirmAge(false);
                  setConfirmPowder(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!confirmAge || !confirmPowder}
                onClick={() => {
                  setGpayOpen(false);
                  setGpayCardOpen(true);
                }}
                className="inline-flex h-[48px] min-w-[220px] items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium disabled:cursor-not-allowed disabled:bg-[#cfcfcf] disabled:text-white"
                style={{
                  color: "#ffffff",
                  background: confirmAge && confirmPowder ? "#000000" : undefined,
                }}
              >
                Buy with
                <GooglePayMark />
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {gpayCardOpen ? (
        <GooglePayCardModal
          onBack={() => {
            setGpayCardOpen(false);
            setGpayOpen(true);
          }}
          onClose={() => {
            setGpayCardOpen(false);
            setConfirmAge(false);
            setConfirmPowder(false);
          }}
          onSaved={async (details) => {
            const parts = details.name.split(" ");
            const result = await localCommerceAdapter.createOrder({
              email: "research@klearclub.com",
              firstName: parts[0] || "Researcher",
              lastName: parts.slice(1).join(" ") || "Account",
              address: details.address,
              city: details.city,
              region: "—",
              postalCode: details.postalCode,
              country: details.country,
              researchAcknowledged: true,
              lines: resolved.map((line) => ({
                productSlug: line.productSlug,
                variantId: line.variantId,
                quantity: line.quantity,
              })),
            });
            setGpayCardOpen(false);
            clear();
            closeCart();
            router.push(`/checkout/confirmed?order=${result.orderId}`);
          }}
        />
      ) : null}
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.2 5.5 5.6v5.3c0 4.2 2.7 7.9 6.5 9.3 3.8-1.4 6.5-5.1 6.5-9.3V5.6L12 3.2Z"
        stroke="#22a45a"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9.2 12.1 11 13.9l3.8-4.2" stroke="#22a45a" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 8.2 8.1 2.6h4.8v4.8L7.3 13a1.2 1.2 0 0 1-1.7 0L2.5 9.9a1.2 1.2 0 0 1 0-1.7Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="11.1" cy="4.9" r="0.8" fill="currentColor" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M6 1.1 7.3 4.2l3.4.4-2.5 2.3.7 3.3L6 8.7 3.1 10.2l.7-3.3L1.3 4.6l3.4-.4L6 1.1Z"
        fill="#e0b84e"
      />
    </svg>
  );
}

function GooglePayMark() {
  return (
    <span className="inline-flex items-center gap-[5px]">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62Z" />
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18Z" />
        <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.16.27-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.03l2.99-2.33Z" />
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58Z" />
      </svg>
      <span className="text-[18px] font-medium tracking-tight">Pay</span>
    </span>
  );
}
