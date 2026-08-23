"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/store", label: "Products" },
  { href: "/build-a-box", label: "Build a Box", isNew: true },
  { href: "/bulk", label: "Bulk Orders", isNew: true },
  { href: "/coa", label: "COAs" },
  { href: "/membership", label: "Membership" },
  { href: "/partners", label: "Partner Program" },
  { href: "/bundles", label: "Research Bundles", isNew: true },
  { href: "/contact", label: "Contact us" },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#f0f0f0] bg-white">
      <div className="site-container flex h-16 items-center justify-between gap-3 xl:gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-[1.5px] w-4 bg-black" />
              <span className="block h-[1.5px] w-4 bg-black" />
              <span className="block h-[1.5px] w-4 bg-black" />
            </span>
          </button>
          <Logo className="shrink-0" compact />
        </div>

        <nav className="hidden items-center justify-center gap-x-2.5 text-[12px] lg:flex lg:gap-x-3 lg:text-[13px] xl:gap-x-4 xl:text-[14px]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex items-center whitespace-nowrap font-medium text-black no-underline transition-opacity hover:opacity-60",
                isActive(pathname, item.href) ? "opacity-70" : "",
              )}
            >
              {item.label}
              {"isNew" in item && item.isNew ? <NewBadge /> : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/account" className="flex h-10 w-10 items-center justify-center" aria-label="Account">
            <UserIcon />
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center"
            aria-label="Open cart"
          >
            <BagIcon />
            {count > 0 ? (
              <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-[#f0f0f0] bg-white lg:hidden">
          <nav className="site-container flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center border-b border-[#f5f5f5] py-3.5 text-[15px] font-medium no-underline last:border-0",
                  isActive(pathname, item.href) ? "text-black/60" : "text-black",
                )}
              >
                {item.label}
                {"isNew" in item && item.isNew ? <NewBadge /> : null}
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
    <span className="ml-1.5 rounded-full bg-[#dcfce7] px-[6px] py-[2px] text-[9px] font-bold uppercase leading-none tracking-wide text-black">
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
