import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";

const points = [
  {
    title: "99%+ purity",
    body: "If a lot misses specification, it does not ship.",
  },
  {
    title: "USA-based",
    body: "Sourcing, QC review, support, and dispatch from the United States.",
  },
  {
    title: "8× tested",
    body: "Independent ISO 17025 assays, published with every batch.",
  },
  {
    title: "COA with every vial",
    body: "Lot numbers on the label match the certificate you receive.",
  },
];

export function TrustGrid() {
  return (
    <section className="page-wrap py-16">
      <div className="grid gap-8 md:grid-cols-4">
        {points.map((point) => (
          <div key={point.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">{point.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{point.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeaturedGrid() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <section className="page-wrap pb-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Catalog</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Popular peptides</h2>
        </div>
        <Link href="/store" className="text-sm font-medium text-klear-deep">
          Shop all
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
