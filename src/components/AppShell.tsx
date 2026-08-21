"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CartBar } from "@/components/CartBar";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SaleBanner } from "@/components/SaleBanner";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const checkout = pathname.startsWith("/checkout");

  if (checkout) {
    return (
      <>
        {children}
        <CartDrawer />
      </>
    );
  }

  return (
    <>
      <Header />
      <SaleBanner />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartBar />
      <CartDrawer />
    </>
  );
}
