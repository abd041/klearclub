"use client";

import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/format";

export function CartBar() {
  const pathname = usePathname();
  const { count, subtotal, isOpen, openCart } = useCart();
  const hidden =
    count === 0 || isOpen || pathname === "/cart" || pathname === "/checkout";

  if (hidden) return null;

  return (
    <div className="pointer-events-none fixed right-5 bottom-5 z-[45] flex justify-end">
      <button
        type="button"
        onClick={openCart}
        className="pointer-events-auto inline-flex h-[56px] items-center rounded-full bg-black px-5 shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
        style={{ color: "#ffffff" }}
        aria-label="View cart"
      >
        <span className="relative mr-3 flex h-8 w-8 items-center justify-center">
          <CartIcon />
          <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#d4f5e2] px-1 text-[10px] font-bold text-black">
            {count}
          </span>
        </span>
        <span className="text-[16px] font-semibold tracking-[-0.02em]">{formatMoney(subtotal)}</span>
        <span className="mx-4 h-6 w-px bg-white/25" />
        <span className="text-[13px] font-bold tracking-[0.08em]">VIEW CART</span>
        <span aria-hidden="true" className="ml-2 text-[16px]">
          →
        </span>
      </button>
    </div>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 5.25h1.38c.4 0 .75.27.86.65l.28 1.02M7.02 6.92h11.2c.62 0 1.08.6.94 1.2l-1.18 5.1a1 1 0 0 1-.97.78H8.55a1 1 0 0 1-.97-.76L6.4 6.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.2" cy="18.3" r="1.35" fill="currentColor" />
      <circle cx="16.6" cy="18.3" r="1.35" fill="currentColor" />
    </svg>
  );
}
