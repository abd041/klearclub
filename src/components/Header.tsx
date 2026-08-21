"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/store", label: "Products" },
  { href: "/build-a-box", label: "Build a Box", isNew: true },
  { href: "/bulk", label: "Bulk Orders", isNew: true },
  { href: "/coa", label: "COAs" },
  { href: "/membership", label: "Membership" },
  { href: "/partners", label: "Partner Program" },
  { href: "/bundles", label: "Research Bundles", isNew: true },
  { href: "/contact", label: "Contact us" },
];

export function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-[1.5px] w-4 bg-black" />
              <span className="block h-[1.5px] w-4 bg-black" />
              <span className="block h-[1.5px] w-4 bg-black" />
            </span>
          </button>
          <Logo className="shrink-0" compact />
        </div>

        <nav className="hidden items-center justify-center gap-x-5 text-[14px] xl:flex 2xl:gap-x-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex items-center whitespace-nowrap font-medium text-black transition-opacity hover:opacity-60",
                pathname === item.href ? "opacity-70" : "",
              )}
            >
              {item.label}
              {item.isNew ? <NewBadge /> : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/account"
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Account"
          >
            <UserIcon />
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center"
            aria-label="Open cart"
          >
            <BagIcon />
            <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
              {count}
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-100 bg-white xl:hidden">
          <nav className="flex flex-col px-6 py-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center py-3 text-[15px] font-medium">
                {item.label}
                {item.isNew ? <NewBadge /> : null}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function NewBadge() {
  return (
    <span className="ml-1.5 rounded-full bg-[#22c55e] px-[6px] py-[2px] text-[9px] font-bold uppercase leading-none tracking-wide text-white">
      New
    </span>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.4 19.2c.9-3.1 3.5-5 6.6-5s5.7 1.9 6.6 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.2 8h11.6l-.8 10.2A2 2 0 0 1 15 20H9a2 2 0 0 1-2-1.8L6.2 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 8V7.2A3 3 0 0 1 12 4.2 3 3 0 0 1 15 7.2V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
