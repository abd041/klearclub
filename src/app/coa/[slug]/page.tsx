import Link from "next/link";
import { notFound } from "next/navigation";
import { CoaSheet } from "@/components/CoaSheet";
import { getProduct, products } from "@/data/products";
import { productLot } from "@/data/media";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "COA" };
  return { title: `COA · ${product.name}` };
}

export default async function ProductCoaPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const lot = productLot(product.slug);

  return (
    <div className="page-wrap py-10">
      <Link href={`/products/${product.slug}`} className="text-sm text-slate-500 hover:text-slate-900">
        Back to {product.name}
      </Link>
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-32px_rgba(15,23,42,0.35)]">
        <CoaSheet product={product} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`/coas/${product.slug}.svg`}
          download
          className="inline-flex h-11 items-center rounded-full bg-slate-900 px-5 text-sm text-white"
        >
          Download COA ({lot})
        </a>
        <Link href="/coa" className="inline-flex h-11 items-center text-sm text-slate-500">
          All certificates
        </Link>
      </div>
    </div>
  );
}
