"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BatchRecordSlider } from "@/components/BatchRecordSlider";
import { CoaModalProvider } from "@/components/CoaModal";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";
import { ProductBuyBox } from "@/components/ProductBuyBox";
import { VerifiedResultsPanel } from "@/components/VerifiedResultsPanel";
import { productImage, productImageClass, PRODUCT_IMAGE_BG } from "@/data/media";
import {
  pdpAminoCount,
  pdpLots,
  pdpMolecularWeight,
  pdpPapers,
  pdpPurity,
  pdpShortLabel,
} from "@/lib/product-pdp";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/catalog";

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const lots = useMemo(() => pdpLots(product), [product]);
  const papers = pdpPapers(product.slug);
  const featuredLot = lots.find((lot) => lot.variantId === variantId && lot.latest) ?? lots[0];
  const purity = pdpPurity(product.slug);
  const visiblePapers = papers.slice(0, 6);
  const extraPapers = papers.slice(6);
  const mw = pdpMolecularWeight(product.slug);

  return (
    <CoaModalProvider slug={product.slug} productName={product.name}>
    <div className="bg-white pb-[130px] font-sans text-[#131315] lg:pb-0">
      <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] px-4 py-3 text-center text-white">
        <p className="text-xs font-medium">
          <span className="font-bold tracking-[0.08em] text-[#ffb4b4]">FOR RESEARCH USE ONLY.</span> This compound is
          not FDA approved. All data presented is from clinical trials for educational reference.
        </p>
      </div>

      <section className="py-6 lg:py-8">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            <div
              className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[20px] border border-[#2a2a2a] p-4 lg:min-h-[450px] lg:rounded-[24px] lg:p-6"
              style={{ backgroundColor: PRODUCT_IMAGE_BG }}
            >
              <Image
                src={productImage(product)}
                alt={product.name}
                width={640}
                height={800}
                priority
                unoptimized
                className={`relative h-auto max-h-[280px] w-auto lg:max-h-[400px] ${productImageClass}`}
              />
              <div className="absolute right-3.5 bottom-3.5 left-3.5 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/85 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-black/60 uppercase backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                  8x tested · ISO 17025
                </span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-white/85 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-black/60 uppercase backdrop-blur">
                  99%+ purity
                </span>
                <span className="hidden items-center rounded-full border border-black/10 bg-white/85 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-black/60 uppercase backdrop-blur sm:inline-flex">
                  Research use only
                </span>
              </div>
            </div>

            <div className="flex flex-col rounded-[20px] border border-[#e8e8e8] bg-white p-5 lg:rounded-[24px] lg:p-7">
              <p className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-black/45 uppercase">
                {pdpShortLabel(product)}
              </p>
              <h1 className="mb-1 text-3xl leading-none font-bold text-black lg:text-5xl">{product.name}</h1>
              {product.alsoKnownAs.length > 0 ? (
                <div className="mb-4 flex flex-wrap gap-2">
                  {product.alsoKnownAs.map((alias) => (
                    <span
                      key={alias}
                      className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] text-black/50"
                    >
                      {alias}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="mb-5 text-sm leading-relaxed text-[#666]">
                {product.tagline} Premium Research Peptide.
              </p>
              <ProductBuyBox product={product} variantId={variantId} onVariantId={setVariantId} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 lg:py-6">
        <div className="site-container">
          <p className="mb-3 text-center text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
            More ways to save
          </p>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <SaveCard
              href="/build-a-box"
              percent="40"
              title="Build a Box"
              body="Any 4 compounds, 40% off monthly, free Klear H2O + free 2-day delivery."
              cta="Build yours"
              tint="mint"
            />
            <SaveCard
              href="/bulk"
              percent="50"
              title="Bulk Orders"
              body="40% off from 10 units per product, 50% off from 50 + free 2-day signed delivery."
              cta="Order bulk"
              tint="butter"
            />
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="site-container">
          <div className="rounded-[24px] bg-[#f6f7f9] px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
            <div className="mx-auto mb-8 max-w-2xl text-center lg:mb-10">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[#16a34a] uppercase">
                Verified Test Results
              </p>
              <h2 className="mt-3 text-[28px] leading-[1.1] font-bold tracking-tight text-[#131315] sm:text-4xl">
                Every batch, independently verified.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#5a5a5a] sm:text-base">
                Each batch is analyzed by an ISO/IEC 17025 accredited third-party laboratory before it ships. This is
                the released report for the current batch, exactly as the lab signed it.
              </p>
            </div>

            <VerifiedResultsPanel slug={product.slug} purity={purity} lot={featuredLot} />

            <BatchRecordSlider
              productName={product.name}
              productSlug={product.slug}
              lots={lots}
              selectedVariantId={variantId}
            />
          </div>
        </div>
      </section>

      <section className="py-8 lg:py-12" aria-labelledby="compound-heading">
        <div className="site-container max-w-[1200px]">
          <header className="mb-5 lg:mb-6">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-black/45 uppercase">
              Technical specifications
            </p>
            <h2 id="compound-heading" className="mt-2 text-2xl leading-tight font-semibold tracking-tight text-[#131315] lg:text-3xl">
              Compound{" "}
              <em className="font-[family-name:var(--font-fraunces)] font-medium italic">Information</em>
            </h2>
          </header>
          <div className="grid grid-cols-1 divide-y divide-black/[0.07] overflow-hidden rounded-[20px] border border-black/10 bg-white lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            <article className="flex flex-col bg-white p-5 lg:p-7">
              <div className="mb-1.5 text-[10px] font-semibold tracking-[0.16em] text-black/40 uppercase">
                Molecular Profile
              </div>
              <h3 className="text-lg leading-tight font-semibold text-[#131315]">What Is {product.name}?</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#666]">{product.description}</p>
              <dl className="mt-4 divide-y divide-black/[0.06]">
                <SpecRow
                  label="Type"
                  value={product.form === "spray" ? "Research solution" : "Synthetic peptide"}
                />
                {product.cas ? <SpecRow label="CAS Number" value={product.cas} /> : null}
                {mw ? <SpecRow label="Molecular Weight" value={mw} /> : null}
                <SpecRow label="Amino Acids" value={pdpAminoCount(product)} />
                {product.slug === "glp-3" ? <SpecRow label="Fatty Acid Chain" value="C20 diacid" /> : null}
                {product.sequence ? <SpecRow label="Sequence" value={product.sequence} /> : null}
              </dl>
            </article>
            <article className="flex flex-col bg-white p-5 lg:p-7">
              <div className="mb-1.5 text-[10px] font-semibold tracking-[0.16em] text-black/40 uppercase">
                Storage Requirements
              </div>
              <h3 className="text-lg leading-tight font-semibold text-[#131315]">Stability Information</h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Avoid freeze/thaw cycles", "Protect from light", "Keep refrigerated"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-black/10 px-2.5 py-1 text-[11px] font-medium text-[#4b5563]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-[#fbfbfc] px-3 py-2.5">
                  <span className="flex h-9 min-w-[54px] items-center justify-center rounded-lg bg-[#e9fce6] px-2 text-[12px] font-bold whitespace-nowrap tabular-nums">
                    -20°C
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] leading-tight font-medium text-[#131315]">Lyophilized (powder)</div>
                    <div className="mt-0.5 text-[12px] text-[#6b7280]">24+ months</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-[#fbfbfc] px-3 py-2.5">
                  <span className="flex h-9 min-w-[54px] items-center justify-center rounded-lg bg-[#cbe5fc] px-2 text-[12px] font-bold whitespace-nowrap tabular-nums">
                    2-8°C
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] leading-tight font-medium text-[#131315]">Reconstituted</div>
                    <div className="mt-0.5 text-[12px] text-[#6b7280]">~30 days</div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-[#8a8f98]">
                Sealed lyophilized vials are heat-stable; refrigerating or freezing sealed vials is optional. 2-8°C
                applies to reconstituted solutions.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#fafafa] py-10 lg:py-14">
        <div className="site-container max-w-[1200px]">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-black/45 uppercase">
              Peer-reviewed literature
            </p>
            <h2 className="mt-2 text-2xl leading-tight font-semibold text-black lg:text-3xl">
              The research behind this compound,{" "}
              <em className="font-[family-name:var(--font-fraunces)] font-medium italic">cited in full.</em>
            </h2>
            <p className="mt-2 text-sm text-black/55">
              Every research claim on this page traces back to one of the {papers.length} publications below.
            </p>
          </div>
          <ol className="mt-6 divide-y divide-black/[0.06] overflow-hidden rounded-2xl border border-black/10 bg-white">
            {visiblePapers.map((paper, index) => (
              <PaperRow key={paper.title} paper={paper} index={index + 1} />
            ))}
            {extraPapers.length > 0 ? (
              <li className="list-none">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-4 py-3.5 text-xs font-semibold tracking-[0.12em] text-black/60 uppercase hover:bg-black/[0.02] hover:text-black [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Show all {papers.length} references</span>
                    <span className="hidden group-open:inline">Show fewer</span>
                  </summary>
                  <ol className="divide-y divide-black/[0.06] border-t border-black/[0.06]">
                    {extraPapers.map((paper, index) => (
                      <PaperRow key={paper.title} paper={paper} index={index + 7} />
                    ))}
                  </ol>
                </details>
              </li>
            ) : null}
          </ol>
        </div>
      </section>

      <section className="py-8 lg:py-12">
        <div className="site-container max-w-[1200px]">
          <div className="rounded-2xl border border-black/10 bg-white p-6 lg:p-8">
            <h2 className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-black/45 uppercase">
              Important research notice
            </h2>
            <div className="space-y-3 text-[13px] leading-relaxed text-[#555]">
              <p>
                <strong className="text-[#1a1a1a]">Not for human, veterinary, or food use.</strong> This product is sold
                exclusively for research and educational purposes. It is not intended to diagnose, treat, cure, or
                prevent any disease.
              </p>
              <p>
                All clinical trial data and research findings presented on this page are sourced from peer-reviewed
                journals and official publications. They are provided for educational reference only and should not be
                interpreted as medical advice or product claims.
              </p>
              <p>
                By purchasing this product, you confirm that you are a qualified researcher and will use it in
                accordance with all applicable laws and regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HomeCtaSubscribeSection />
    </div>
    </CoaModalProvider>
  );
}

function SaveCard({
  href,
  percent,
  title,
  body,
  cta,
  tint,
}: {
  href: string;
  percent: string;
  title: string;
  body: string;
  cta: string;
  tint: "mint" | "butter";
}) {
  const mint = tint === "mint";
  return (
    <Link href={href} className="group block no-underline">
      <div
        className={cn(
          "relative overflow-hidden rounded-[20px] border px-4 py-3.5 sm:px-6 sm:py-4",
          mint ? "border-[#dff0da]" : "border-[#f0ecd3]",
        )}
        style={{
          background: mint
            ? "linear-gradient(90deg, rgba(232,245,225,0.7), #fff 48%, rgba(203,229,252,0.4))"
            : "linear-gradient(90deg, rgba(254,253,205,0.7), #fff 48%, rgba(234,230,253,0.4))",
        }}
      >
        <div className="flex items-center gap-3 sm:gap-5">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-full shadow-sm sm:h-14 sm:w-14",
              mint ? "-rotate-6 bg-[#fefdcd]" : "rotate-6 bg-[#e8f5e1]",
            )}
          >
            <span className="font-[family-name:var(--font-fraunces)] text-base leading-none sm:text-xl">
              {percent}%
            </span>
            <span className="text-[8px] font-bold tracking-wide uppercase sm:text-[9px]">off</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-sm leading-tight font-semibold sm:text-base">
              {title}
              <span
                className="rounded-full bg-black px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase"
                style={{ color: "#ffffff" }}
              >
                New
              </span>
            </p>
            <p className="mt-0.5 hidden text-sm leading-snug text-gray-600 sm:block">{body}</p>
          </div>
          <span
            className="hidden h-10 shrink-0 items-center justify-center rounded-full bg-[#131315] px-5 text-sm font-semibold sm:inline-flex"
            style={{ color: "#ffffff" }}
          >
            {cta}
          </span>
        </div>
        <p className="mt-2.5 text-xs leading-snug text-gray-600 sm:hidden">{body}</p>
      </div>
    </Link>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="text-[12px] text-black/45">{label}</dt>
      <dd className="text-right text-[13px] font-semibold text-[#131315]">{value}</dd>
    </div>
  );
}

function PaperRow({
  paper,
  index,
}: {
  paper: { source: string; year: string; title: string; authors?: string; href?: string };
  index: number;
}) {
  const inner = (
    <>
      <span className="w-6 shrink-0 pt-0.5 text-[11px] font-semibold text-black/30 tabular-nums">
        {String(index).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold tracking-[0.12em] text-black/40 uppercase">
          {paper.source} · {paper.year}
        </span>
        <span className="mt-0.5 block text-sm leading-snug font-medium text-black">{paper.title}</span>
        {paper.authors ? (
          <span className="mt-0.5 hidden text-xs text-black/40 italic sm:block">{paper.authors}</span>
        ) : null}
      </span>
    </>
  );

  if (paper.href) {
    return (
      <li className="list-none">
        <a
          href={paper.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 px-4 py-3 no-underline hover:bg-black/[0.02] sm:px-5"
        >
          {inner}
        </a>
      </li>
    );
  }

  return (
    <li className="list-none">
      <div className="flex items-start gap-3 px-4 py-3 sm:px-5">{inner}</div>
    </li>
  );
}



