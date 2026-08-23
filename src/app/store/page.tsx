import { StoreCatalog } from "@/components/StoreCatalog";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse Klear Club research peptides and add to cart without leaving the catalog.",
};

export default function StorePage() {
  return (
    <div className="pb-24">
      <Suspense fallback={<p className="page-wrap text-sm text-slate-500">Loading catalog…</p>}>
        <StoreCatalog />
      </Suspense>
    </div>
  );
}
