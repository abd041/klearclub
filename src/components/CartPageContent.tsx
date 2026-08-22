"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/format";
import { FREE_SHIPPING_AT } from "@/lib/commerce";
import { CartQty } from "@/components/QuantityStepper";
import { ProductVisual } from "@/components/ProductVisual";
import { getProduct } from "@/data/products";

export function CartPageContent() {
  const { resolved, subtotal, remainingForFreeShipping, removeItem, openCart } = useCart();

  if (resolved.length === 0) {
    return (
      <div className="site-container py-14 sm:py-20">
        <h1 className="text-[32px] font-bold tracking-[-0.03em] text-black sm:text-[40px]">Your bag</h1>
        <div className="mt-12 max-w-md rounded-[20px] border border-[#ececec] bg-[#fafafa] px-8 py-12 text-center">
          <p className="text-[17px] font-bold text-black">Nothing in your bag yet</p>
          <p className="mt-2 text-[14px] text-[#666]">Browse the catalog and add research compounds to get started.</p>
          <Link
            href="/store"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-black px-6 text-[14px] font-medium text-white no-underline"
          >
            Shop catalog
          </Link>
        </div>
      </div>
    );
  }

  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  return (
    <div className="site-container py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-[32px] font-bold tracking-[-0.03em] text-black sm:text-[40px]">Your bag</h1>
        <p className="text-[14px] text-[#666]">{resolved.length} item{resolved.length === 1 ? "" : "s"}</p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
        <ul className="divide-y divide-[#ececec] rounded-[20px] border border-[#ececec] bg-white">
          {resolved.map((line) => {
            const product = getProduct(line.productSlug);
            return (
              <li key={`${line.productSlug}-${line.variantId}`} className="flex gap-4 p-5 sm:gap-5 sm:p-6">
                <Link
                  href={`/products/${line.productSlug}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[16px] bg-[#f7f7f7] no-underline sm:h-28 sm:w-24"
                >
                  {product ? <ProductVisual product={product} className="h-full w-full" branded={false} /> : null}
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        href={`/products/${line.productSlug}`}
                        className="text-[16px] font-bold text-black no-underline hover:opacity-70"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-1 text-[13px] text-[#666]">{line.variantLabel}</p>
                    </div>
                    <p className="shrink-0 text-[16px] font-bold text-black">{formatMoney(line.lineTotal)}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CartQty productSlug={line.productSlug} variantId={line.variantId} quantity={line.quantity} />
                    <button
                      type="button"
                      className="text-[13px] text-[#666] underline-offset-2 hover:text-black hover:underline"
                      onClick={() => removeItem(line.productSlug, line.variantId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-[20px] border border-[#ececec] bg-white p-6 sm:p-7">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#9a9a9a]">Order summary</h2>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-[15px] text-[#666]">Subtotal</span>
              <span className="text-[22px] font-bold text-black">{formatMoney(subtotal)}</span>
            </div>

            {remainingForFreeShipping > 0 ? (
              <div className="mt-4">
                <p className="text-[13px] text-[#666]">
                  Add <span className="font-semibold text-black">{formatMoney(remainingForFreeShipping)}</span> for free
                  standard shipping
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#ececec]">
                  <div className="h-full rounded-full bg-black transition-all" style={{ width: `${shippingProgress}%` }} />
                </div>
              </div>
            ) : (
              <p className="mt-4 text-[13px] font-medium text-[#16a34a]">This order qualifies for free standard shipping.</p>
            )}

            <p className="mt-4 text-[12px] leading-[1.5] text-[#9a9a9a]">
              Taxes and shipping calculated at checkout. Every order includes free shipment protection.
            </p>

            <Link
              href="/checkout"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-black text-[14px] font-medium text-white no-underline"
            >
              Checkout
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="mt-3 flex h-10 w-full items-center justify-center text-[13px] font-medium text-[#666] hover:text-black"
            >
              Quick view bag
            </button>
            <Link href="/store" className="mt-2 block text-center text-[13px] font-medium text-black underline-offset-2 hover:underline">
              Continue shopping
            </Link>
          </div>

          <div className="mt-4 rounded-[16px] border border-[#ececec] bg-[#fafafa] px-5 py-4">
            <p className="text-[12px] leading-[1.55] text-[#666]">
              <span className="font-semibold text-black">Research use only.</span> All products are sold strictly for
              laboratory research. Not for human, veterinary, or food use.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
