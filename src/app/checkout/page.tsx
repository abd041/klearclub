"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useCart } from "@/context/CartContext";
import { productImage } from "@/data/media";
import { getProduct } from "@/data/products";
import { formatMoney } from "@/lib/format";
import { localCommerceAdapter } from "@/lib/commerce";

export default function CheckoutPage() {
  const router = useRouter();
  const { resolved, count, subtotal, openCart } = useCart();
  const [contact, setContact] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [promoOpen, setPromoOpen] = useState(false);
  const [protectInfo, setProtectInfo] = useState(false);

  const points = Math.round(subtotal * 2.5);

  function sendCode(event: FormEvent) {
    event.preventDefault();
    if (!contact.trim()) return;
    setError("");
    setStep("code");
  }

  async function verifyCode(event: FormEvent) {
    event.preventDefault();
    if (code.trim().length < 4) {
      setError("Enter the one-time code from your email or phone.");
      return;
    }
    if (resolved.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setPending(true);
    setError("");
    try {
      const result = await localCommerceAdapter.createOrder({
        email: contact.includes("@") ? contact : `${contact}@checkout.klearclub.com`,
        firstName: "Researcher",
        lastName: "Account",
        address: "On file",
        city: "—",
        region: "—",
        postalCode: "—",
        country: "United States",
        researchAcknowledged: true,
        lines: resolved.map((line) => ({
          productSlug: line.productSlug,
          variantId: line.variantId,
          quantity: line.quantity,
        })),
      });
      router.push(`/checkout/confirmed?order=${result.orderId}`);
    } catch {
      setError("Checkout could not be completed. Please try again.");
      setPending(false);
    }
  }

  return (
    <div className="min-h-full bg-[#f4f4f5] text-black">
      <header className="relative flex h-[64px] items-center justify-center px-4 sm:px-8">
        <Link
          href="/store"
          className="absolute left-4 inline-flex items-center gap-1.5 text-[14px] text-[#9a9a9a] sm:left-8"
        >
          <span aria-hidden="true">←</span> Back
        </Link>
        <Logo compact />
        <div className="absolute right-4 sm:right-8">
          <SecureBadge />
        </div>
      </header>

      <div className="mx-auto grid max-w-[1120px] gap-8 px-4 pt-2 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start lg:gap-10">
        <section>
          <h1 className="text-[40px] leading-none font-bold tracking-[-0.04em] text-black">Checkout</h1>
          <p className="mt-3 text-[16px] text-[#8a8a8a]">Complete your order securely</p>

          <div className="mt-8 rounded-[24px] bg-white px-6 py-12 shadow-[0_8px_40px_rgba(15,23,42,0.06)] sm:px-10 sm:py-14">
            {step === "email" ? (
              <form onSubmit={sendCode} className="mx-auto max-w-[420px] text-center">
                <p className="text-[13px] text-[#9a9a9a]">Sign in to complete your order — no password needed.</p>
                <div className="mt-6 flex justify-center">
                  <Logo compact />
                </div>
                <h2 className="mt-5 text-[22px] font-bold tracking-[-0.03em] text-black">Sign in or sign up</h2>
                <p className="mt-2 text-[14px] text-[#9a9a9a]">We&apos;ll send you a one-time code.</p>
                <input
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  required
                  placeholder="Email or phone number"
                  className="mt-7 h-12 w-full rounded-[10px] bg-[#f3f3f3] px-4 text-[15px] text-black outline-none placeholder:text-[#9a9a9a]"
                />
                <button
                  type="submit"
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2f2f2f] text-[15px] font-medium"
                  style={{ color: "#ffffff" }}
                >
                  Sign in or sign up
                  <span aria-hidden="true">→</span>
                </button>
                <p className="mt-5 text-[12px] leading-5 text-[#9a9a9a]">
                  By continuing you agree to our{" "}
                  <Link href="/terms" className="underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            ) : (
              <form onSubmit={verifyCode} className="mx-auto max-w-[420px] text-center">
                <p className="text-[13px] text-[#9a9a9a]">We sent a one-time code to</p>
                <p className="mt-1 text-[15px] font-semibold text-black">{contact}</p>
                <h2 className="mt-6 text-[22px] font-bold tracking-[-0.03em] text-black">Enter your code</h2>
                <input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="One-time code"
                  className="mt-7 h-12 w-full rounded-[10px] bg-[#f3f3f3] px-4 text-center text-[18px] tracking-[0.2em] text-black outline-none placeholder:text-[15px] placeholder:tracking-normal placeholder:text-[#9a9a9a]"
                />
                {error ? <p className="mt-3 text-[13px] text-red-600">{error}</p> : null}
                <button
                  type="submit"
                  disabled={pending}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2f2f2f] text-[15px] font-medium disabled:opacity-60"
                  style={{ color: "#ffffff" }}
                >
                  {pending ? "Placing order…" : "Continue"}
                  <span aria-hidden="true">→</span>
                </button>
                <button
                  type="button"
                  className="mt-4 text-[13px] text-[#9a9a9a]"
                  onClick={() => {
                    setStep("email");
                    setCode("");
                    setError("");
                  }}
                >
                  Use a different email or phone
                </button>
              </form>
            )}
          </div>
        </section>

        <aside className="lg:sticky lg:top-8">
          <div className="rounded-[16px] border border-[#e8e8e8] bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-black">Order Summary</h2>
              <p className="text-[12px] text-[#9a9a9a]">
                {count} {count === 1 ? "item" : "items"}{" "}
                <button type="button" onClick={openCart} className="underline">
                  Edit
                </button>
              </p>
            </div>

            <ul className="mt-4 space-y-3">
              {resolved.length === 0 ? (
                <li className="py-4 text-[13px] text-[#9a9a9a]">Your cart is empty.</li>
              ) : (
                resolved.map((line) => {
                  const product = getProduct(line.productSlug);
                  return (
                    <li key={`${line.productSlug}-${line.variantId}`} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[8px] bg-[#f4f4f4]">
                        {product ? (
                          <Image
                            src={productImage(product)}
                            alt={line.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-bold text-black">{line.name}</p>
                        <p className="text-[12px] text-[#9a9a9a]">Qty: {line.quantity}</p>
                      </div>
                      <p className="text-[14px] font-bold text-black">{formatMoney(line.lineTotal)}</p>
                    </li>
                  );
                })
              )}
            </ul>

            <div className="mt-4 border-t border-[#eeeeee] pt-4">
              {promoOpen ? (
                <div className="flex gap-2">
                  <input
                    placeholder="Promo code"
                    className="h-9 flex-1 rounded-full border border-[#e4e4e4] px-3 text-[13px] outline-none"
                  />
                  <button
                    type="button"
                    className="h-9 rounded-full bg-black px-3 text-[12px] font-semibold"
                    style={{ color: "#ffffff" }}
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPromoOpen(true)}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-black"
                >
                  <TagIcon />
                  Add promo code
                </button>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-[10px] bg-[#eaf8ef] px-3 py-2.5 text-[13px]">
              <span className="text-[#146c3a]">Sign in to redeem points</span>
              <button
                type="button"
                className="font-medium text-[#146c3a] underline"
                onClick={() => document.querySelector<HTMLInputElement>("input")?.focus()}
              >
                Sign in
              </button>
            </div>

            <dl className="mt-4 space-y-2.5 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-[#8a8a8a]">Subtotal</dt>
                <dd className="font-medium text-black">{formatMoney(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#8a8a8a]">Shipping</dt>
                <dd className="font-semibold text-[#22a45a]">Free</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center gap-1 text-[#8a8a8a]">
                  Shipment Protection
                  <button
                    type="button"
                    className="inline-flex h-[14px] w-[14px] items-center justify-center rounded-full border border-[#d0d0d0] text-[9px] text-[#9a9a9a]"
                    onClick={() => setProtectInfo((open) => !open)}
                    aria-label="Shipment protection info"
                  >
                    ?
                  </button>
                </dt>
                <dd className="font-semibold text-[#22a45a]">Free</dd>
              </div>
              {protectInfo ? (
                <p className="text-[12px] leading-5 text-[#8a8a8a]">
                  Replacement coverage if a shipment is damaged in transit.
                </p>
              ) : null}
              <div className="flex justify-between">
                <dt className="text-[#8a8a8a]">Taxes</dt>
                <dd className="font-medium text-black">{formatMoney(0)}</dd>
              </div>
            </dl>

            <div className="mt-4 border-t border-[#eeeeee] pt-4">
              <div className="flex items-end justify-between">
                <span className="text-[18px] font-bold text-black">Total</span>
                <span className="text-[22px] leading-none font-bold text-black">{formatMoney(subtotal)}</span>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#8a8a8a]">
                <StarIcon />
                Earn {points} points credited with your order
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <SecureBadge />
          </div>
        </aside>
      </div>
    </div>
  );
}

function SecureBadge() {
  return (
    <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#b7e4c7] bg-[#eaf8ef] px-3.5 text-[13px] font-medium text-[#1f8a4c]">
      <LockIcon />
      Secure Checkout
    </span>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="3.2" y="7" width="9.6" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.2 7V5.2a2.8 2.8 0 0 1 5.6 0V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
