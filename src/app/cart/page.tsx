"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/format";
import { CartQty } from "@/components/QuantityStepper";
import { ProductVisual } from "@/components/ProductVisual";
import { getProduct } from "@/data/products";

export default function CartPage() {
  const { resolved, subtotal, remainingForFreeShipping, removeItem } = useCart();

  return (
    <div className="page-wrap py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Bag</h1>
      {resolved.length === 0 ? (
        <div className="mt-12 max-w-md">
          <p className="text-mute">Nothing in the bag yet.</p>
          <Link
            href="/store"
            className="mt-6 inline-flex h-12 items-center rounded-full bg-ink px-6 text-sm text-white"
          >
            Continue browsing
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <ul className="divide-y divide-hair">
            {resolved.map((line) => {
              const product = getProduct(line.productSlug);
              return (
                <li key={`${line.productSlug}-${line.variantId}`} className="flex gap-5 py-6">
                  <div className="relative h-28 w-24 overflow-hidden rounded-[22px] bg-mist">
                    {product ? (
                      <ProductVisual product={product} className="h-full w-full" branded={false} />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/products/${line.productSlug}`} className="font-medium">
                          {line.name}
                        </Link>
                        <p className="mt-1 text-sm text-mute">{line.variantLabel}</p>
                      </div>
                      <p className="font-medium">{formatMoney(line.lineTotal)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <CartQty
                        productSlug={line.productSlug}
                        variantId={line.variantId}
                        quantity={line.quantity}
                      />
                      <button
                        type="button"
                        className="text-sm text-mute hover:text-ink"
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
          <aside className="h-fit rounded-[28px] bg-mist p-6">
            <div className="flex items-center justify-between">
              <span className="text-mute">Subtotal</span>
              <span className="text-xl font-semibold">{formatMoney(subtotal)}</span>
            </div>
            <p className="mt-3 text-sm text-mute">
              {remainingForFreeShipping === 0
                ? "This order qualifies for free shipping."
                : `${formatMoney(remainingForFreeShipping)} more for free shipping.`}
            </p>
            <Link
              href="/checkout"
              className="mt-6 flex h-12 items-center justify-center rounded-full bg-ink text-sm font-medium text-white"
            >
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
