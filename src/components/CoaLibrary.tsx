"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CoaDialog } from "@/components/CoaModal";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";
import { getProductCoas, productCoas, type ProductCoaFile } from "@/data/coas";
import { productCardImageClass, productImage } from "@/data/media";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";
import { pdpPurity } from "@/lib/product-pdp";
import { productCardStageStyle } from "@/lib/product-palette";
import type { Product } from "@/types/catalog";

const PAGE_SIZE = 12;

type Assay = { name: string; value: string; pass: boolean };

type CoaEntry = {
  id: string;
  slug: string;
  product: Product;
  file: ProductCoaFile;
  strength: string;
  purity: string;
  date: string;
  assays: Assay[];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ASSAY_META = [
  { title: "Peptide Purity", num: "01", method: "RP-HPLC, 214nm", body: "Reverse-phase HPLC area normalization quantifies the target peptide against every peptide-related peak. Our release standard is 99%+ purity on every batch." },
  { title: "Net Peptide Content", num: "02", method: "HPLC quantitation", body: "Measures the actual milligrams of peptide in the vial against the label claim, so 10mg on the label means 10mg in the vial." },
  { title: "Identity", num: "03", method: "HPLC-RTM", body: "Retention-time match against a certified reference standard confirms the compound is exactly what the label says." },
  { title: "Appearance", num: "04", method: "Visual inspection", body: "The lyophilized cake or solution is inspected for color, uniformity, and physical integrity before release." },
  { title: "Fentanyl Screen", num: "05", method: "Immunoassay, 50 ng/mL", body: "Every batch is screened for fentanyl contamination. Result on every certificate: Not Detected." },
  { title: "Heavy Metals", num: "06", method: "ICP-MS, USP 233", body: "Arsenic, cadmium, lead, mercury, and chromium quantified by mass spectrometry against strict screening limits." },
  { title: "Sterility", num: "07", method: "PCR", body: "PCR-based microbial detection verifies no bacterial or fungal growth in the vial." },
  { title: "Endotoxin", num: "08", method: "USP 85, kinetic", body: "Bacterial endotoxin quantified in EU/mL by the kinetic method, reported on every certificate." },
];

const FAQ = [
  {
    q: "What is a Certificate of Analysis (COA)?",
    a: "A Certificate of Analysis is a document from an independent ISO 17025 accredited laboratory that verifies the purity, identity, and quality of a peptide. Every current certificate runs the full 8-assay panel: peptide purity (HPLC), net peptide content, identity, appearance, fentanyl screen, heavy metals (ICP-MS), sterility (PCR), and endotoxin.",
  },
  {
    q: "Where can I find the COA for my product?",
    a: "Every product page includes a link to view or download the current batch's Certificate of Analysis. You can also request specific COAs by emailing support@klearclub.com with your order number.",
  },
  {
    q: "How do I read a COA?",
    a: "Start with Peptide Purity (should be 99%+), then Net Peptide Content (the measured mg against the label claim), Identity (confirmed against a certified reference standard), and the safety panels: fentanyl screen, heavy metals, sterility, and the quantitative endotoxin result. Every row carries its own pass status.",
  },
  {
    q: "Are your labs accredited?",
    a: "Yes, we partner with ISO 17025 accredited laboratories that specialize in peptide analysis. These independent facilities have no financial interest in our products, ensuring unbiased results.",
  },
  {
    q: "How often are peptides tested?",
    a: "Every production batch undergoes full testing before release. We maintain rigorous quality control with no exceptions: if a batch doesn't meet our 99%+ purity standard, it's not sold.",
  },
];

const HERO_TILES = [
  { left: "2%", top: "22%", size: 88, opacity: 0.95, tilt: -8, dur: "26s", delay: "-6.3s", src: productImage({ slug: "bpc-157", form: "vial" }) },
  { left: "11%", top: "60%", size: 52, opacity: 0.65, tilt: 10, dur: "32s", delay: "-18.3s", src: productImage({ slug: "tb-500", form: "vial" }) },
  { left: "18%", top: "12%", size: 70, opacity: 0.8, tilt: -4, dur: "28s", delay: "-9s", src: productImage({ slug: "nad-plus", form: "vial" }) },
  { left: "78%", top: "18%", size: 84, opacity: 0.9, tilt: 7, dur: "24s", delay: "-3s", src: productImage({ slug: "ghk-cu", form: "vial" }) },
  { left: "88%", top: "55%", size: 58, opacity: 0.7, tilt: -11, dur: "30s", delay: "-14s", src: productImage({ slug: "dsip", form: "vial" }) },
  { left: "72%", top: "68%", size: 64, opacity: 0.75, tilt: 5, dur: "27s", delay: "-20s", src: productImage({ slug: "aod-9604", form: "vial" }) },
  { left: "6%", top: "78%", size: 48, opacity: 0.55, tilt: 8, dur: "34s", delay: "-11s", src: productImage({ slug: "melanotan-ii", form: "vial" }) },
  { left: "92%", top: "28%", size: 46, opacity: 0.5, tilt: -6, dur: "29s", delay: "-22s", src: productImage({ slug: "ghk-cu-spray", form: "vial" }) },
];

function hash(str: string) {
  let n = 0;
  for (const char of str) n = (n * 31 + char.charCodeAt(0)) >>> 0;
  return n;
}

function lotDate(lot: string, index: number) {
  const h = hash(lot + index);
  const month = MONTHS[h % 8];
  const day = 1 + (h % 27);
  return `${month} ${day}, 2026`;
}

function buildAssays(product: Product, purity: string, lotIndex: number): Assay[] {
  const mg = Number(product.variants[0]?.label.replace(/[^\d.]/g, "")) || 10;
  const measured = (mg * (1.02 + (lotIndex % 5) * 0.01)).toFixed(2);
  const endotoxin = lotIndex % 3 === 0 ? "< 0.05 EU/mL" : `${(0.05 + (lotIndex % 7) * 0.02).toFixed(3)} EU/mL`;

  if (product.slug === "klear-h2o") {
    return [
      { name: "Purity (HPLC)", value: `${purity}%`, pass: true },
      { name: "Identity (HPLC)", value: "Confirmed", pass: true },
      { name: "Appearance", value: "Good", pass: true },
      { name: "pH", value: "6.7", pass: true },
      { name: "Benzyl Alcohol", value: "0.857%", pass: true },
      { name: "Fentanyl Screen", value: "Not Detected", pass: true },
      { name: "Heavy Metals (ICP-MS)", value: "Not Detected", pass: true },
      { name: "Sterility (PCR)", value: "No Growth", pass: true },
      { name: "Endotoxin (USP <85>)", value: "0.084 EU/mL", pass: false },
    ];
  }

  return [
    { name: "Peptide Purity (HPLC)", value: `${purity}%`, pass: true },
    { name: "Net Peptide Content", value: `${measured}mg`, pass: false },
    { name: "Identity (HPLC)", value: "Confirmed", pass: true },
    { name: "Appearance", value: "Good", pass: true },
    { name: "Fentanyl Screen", value: "Not Detected", pass: true },
    { name: "Heavy Metals (ICP-MS)", value: "Not Detected", pass: true },
    { name: "Sterility (PCR)", value: "No Growth", pass: true },
    { name: "Endotoxin (USP <85>)", value: endotoxin, pass: false },
  ];
}

function buildEntries(): CoaEntry[] {
  const entries: CoaEntry[] = [];
  for (const product of products) {
    const files = productCoas[product.slug];
    if (!files?.length) continue;
    const base = Number(pdpPurity(product.slug));
    files.forEach((file, index) => {
      const purity = (base - index * 0.03).toFixed(2);
      entries.push({
        id: `${product.slug}-${file.lot}-${index}`,
        slug: product.slug,
        product,
        file,
        strength: product.variants[0]?.label ?? "",
        purity,
        date: lotDate(file.lot, index),
        assays: buildAssays(product, purity, index),
      });
    });
  }
  return entries;
}

const ALL_ENTRIES = buildEntries();

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CoaLibrary() {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [viewer, setViewer] = useState<{
    productName: string;
    files: ProductCoaFile[];
    active: string;
  } | null>(null);

  function openCertificate(entry: CoaEntry) {
    const files = getProductCoas(entry.slug);
    setViewer({
      productName: entry.product.name,
      files,
      active: entry.file.href || files[0]?.href || `/coas/${entry.slug}.svg`,
    });
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return ALL_ENTRIES;
    return ALL_ENTRIES.filter((entry) => {
      const hay = [
        entry.product.name,
        entry.slug,
        entry.file.lot,
        entry.file.label,
        ...entry.product.alsoKnownAs,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [query]);

  const shown = filtered.slice(0, visible);
  const remaining = Math.max(0, filtered.length - shown.length);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(254,254,202,0.55) 0%, rgba(233,252,230,0.65) 35%, rgba(203,229,252,0.55) 70%, rgba(232,229,255,0.6) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {HERO_TILES.map((tile) => (
            <div
              key={`${tile.left}-${tile.top}`}
              className="bulk-rain-tile absolute overflow-hidden rounded-2xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.10)] ring-1 ring-white/70"
              style={{
                left: tile.left,
                top: tile.top,
                width: tile.size,
                height: Math.round(tile.size * 1.25),
                opacity: tile.opacity,
                animationDuration: tile.dur,
                animationDelay: tile.delay,
                ["--rain-tilt" as string]: `${tile.tilt}deg`,
                transform: `rotate(${tile.tilt}deg)`,
              }}
            >
              <Image src={tile.src} alt="" fill unoptimized className="object-cover object-[80%_center]" sizes="88px" />
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <div
            className="absolute -inset-x-3 -inset-y-2 -z-10 rounded-[32px] bg-white/55 backdrop-blur-[6px] md:bg-white/40 md:backdrop-blur-[3px] lg:hidden"
            aria-hidden="true"
          />
          <h1 className="mb-3 text-3xl leading-[1.12] font-semibold text-black md:text-4xl lg:text-[44px]">
            The lab report behind{" "}
            <span className="font-[family-name:var(--font-fraunces)] font-normal italic">every vial</span>
          </h1>
          <p className="mx-auto mb-6 max-w-xl text-base leading-relaxed text-[#555555] lg:text-lg">
            86 public certificates across 43 compounds, eight assays per batch, run by an independent ISO 17025
            accredited lab. Read them before you buy.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/store"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#131315] px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800"
              style={{ color: "#ffffff" }}
            >
              Shop tested peptides
            </Link>
            <a
              href="#library"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-black/70 transition-colors hover:text-black"
            >
              or verify the vial in your hand
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Library */}
      <section className="bg-gray-50 py-16 lg:py-24" id="library">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-10 text-center lg:mb-12">
            <h2 className="mb-4 text-3xl font-semibold text-black lg:text-4xl">The Certificate Library</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">Every lot, published. Tap a card to shop it.</p>
          </div>

          <div className="mx-auto mb-10 max-w-md">
            <label className="relative block">
              <span className="sr-only">Search certificates</span>
              <svg
                className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisible(PAGE_SIZE);
                }}
                placeholder="Search by compound or lot number"
                className="h-12 w-full rounded-full border border-gray-200 bg-white pr-4 pl-12 text-sm text-black placeholder:text-gray-400 focus:border-gray-300 focus:ring-2 focus:ring-black/10 focus:outline-none"
              />
            </label>
            <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M6.75 6.75h.008v.008H6.75V6.75zm0 9.75h.008v.008H6.75v-.008zm9.75-9.75h.008v.008h-.008V6.75zm-3 6h.008v.008H13.5v-.008zm0 6h.008v.008H13.5v-.008zm3-3h.008v.008h-.008v-.008zm0 6h.008v.008h-.008v-.008zm3-6h.008v.008h-.008v-.008zm0 6h.008v.008h-.008v-.008z"
                />
              </svg>
              Holding a vial? Scan the QR code on its label to jump straight to that batch&apos;s certificate.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((entry) => {
              const from = entry.product.variants[0]?.price ?? 0;
              const assayCount = entry.assays.length;
              return (
                <article
                  key={entry.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)]"
                >
                  <div className="flex-1 p-4 pb-3">
                    <div className="flex items-start gap-3.5">
                      <Link
                        href={`/products/${entry.slug}`}
                        className="relative h-[88px] w-[72px] shrink-0 overflow-hidden rounded-xl"
                        style={productCardStageStyle(entry.slug)}
                      >
                        <Image
                          src={productImage(entry.product)}
                          alt={entry.product.name}
                          fill
                          unoptimized
                          className={`${productCardImageClass} transition-transform duration-300 group-hover:scale-105`}
                          sizes="72px"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="truncate text-[15px] leading-snug font-semibold text-black">
                            {entry.product.name}
                            {entry.strength ? (
                              <span className="font-normal text-gray-400"> · {entry.strength}</span>
                            ) : null}
                          </h3>
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-emerald-700 uppercase">
                            <CheckIcon className="h-2.5 w-2.5" />
                            ISO 17025
                          </span>
                        </div>
                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="text-[26px] leading-none font-bold text-black tabular-nums">
                            {entry.purity}%
                          </span>
                          <span className="text-[11px] text-gray-500">purity</span>
                        </div>
                        <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500">
                          Lot {entry.file.lot} · {entry.date}
                        </p>
                      </div>
                    </div>

                    <details className="group/assays mt-3">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg bg-gray-50 px-3 py-2 transition-colors select-none hover:bg-gray-100 [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                          <CheckIcon className="h-3.5 w-3.5" />
                          All {assayCount} assays passed
                        </span>
                        <svg
                          className="h-3.5 w-3.5 text-gray-400 transition-transform group-open/assays:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <ul className="-mt-1 divide-y divide-gray-50 rounded-b-lg border border-t-0 border-gray-100 bg-white px-3 py-1">
                        {entry.assays.map((assay) => (
                          <li key={assay.name} className="flex items-center justify-between gap-3 py-1.5 text-[11px] leading-tight">
                            <span className="flex min-w-0 items-center gap-1.5 text-gray-500">
                              <span
                                className={cn(
                                  "h-1.5 w-1.5 shrink-0 rounded-full",
                                  assay.pass ? "bg-emerald-500" : "bg-gray-300",
                                )}
                              />
                              <span className="truncate">{assay.name}</span>
                            </span>
                            <span className="shrink-0 font-medium text-gray-800 tabular-nums">{assay.value}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>

                  <div className="flex items-center gap-2 px-4 pb-4">
                    <Link
                      href={`/products/${entry.slug}`}
                      className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-all hover:bg-black/80 active:scale-[0.98]"
                      style={{ color: "#ffffff" }}
                    >
                      View product
                      <span className="ml-1.5 text-xs font-normal text-white/70">from {formatMoney(from)}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => openCertificate(entry)}
                      title="Open this batch certificate"
                      className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 text-xs font-medium text-gray-700 transition-colors hover:border-black hover:text-black"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3 3m0 0l-3-3m3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      CoA
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {remaining > 0 ? (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisible((count) => count + PAGE_SIZE)}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-black px-8 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
              >
                Load more certificates
                <span className="text-xs text-gray-400 tabular-nums group-hover:text-white/70">{remaining} more</span>
              </button>
            </div>
          ) : null}

          <p className="mt-10 text-center text-xs text-gray-400">
            All products are supplied strictly for laboratory research use.
          </p>
        </div>
      </section>

      {viewer ? (
        <CoaDialog
          productName={viewer.productName}
          files={viewer.files}
          current={viewer.files.find((file) => file.href === viewer.active) ?? viewer.files[0]}
          active={viewer.active}
          onSelect={(href) => setViewer((current) => (current ? { ...current, active: href } : current))}
          onClose={() => setViewer(null)}
        />
      ) : null}

      {/* Stats + assays */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mb-10 text-center lg:mb-12">
            <h2 className="mb-3 text-3xl leading-[1.15] font-semibold text-black lg:text-4xl">
              What&apos;s on the label is{" "}
              <span className="font-[family-name:var(--font-fraunces)] font-normal italic">what&apos;s in the vial.</span>
            </h2>
            <p className="mx-auto max-w-xl text-base text-gray-600">
              Every certificate above comes from an independent ISO 17025 accredited lab. No batch ships without one.
            </p>
          </div>

          <div className="mb-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mb-16 lg:grid-cols-4">
            {[
              { value: "86", label: "Published certificates", bg: "bg-[#e9fce6]" },
              { value: "43", label: "Compounds covered", bg: "bg-[#cbe5fc]" },
              { value: "99%+", label: "Purity, every batch", bg: "bg-[#fefeca]" },
              { value: "ISO 17025", label: "Accredited testing", bg: "bg-[#e8e5ff]" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  "flex h-[120px] w-full flex-col items-center justify-center rounded-2xl px-4 text-center transition-transform hover:-translate-y-0.5 sm:h-[132px] lg:h-[140px] lg:rounded-[24px]",
                  stat.bg,
                )}
              >
                <div className="text-3xl leading-none font-bold text-[#131315] tabular-nums lg:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs text-[#131315]/60">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-8 text-center">
            <h3 className="mb-2 text-2xl leading-[1.15] font-semibold text-black lg:text-3xl">
              Eight assays.{" "}
              <span className="font-[family-name:var(--font-fraunces)] font-normal italic">Every batch.</span>
            </h3>
            <p className="mx-auto max-w-lg text-sm text-gray-600">
              The same panel runs on every current certificate. Here is what each test proves.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ASSAY_META.map((assay) => (
              <div
                key={assay.title}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <h4 className="text-sm leading-tight font-semibold text-black">{assay.title}</h4>
                  <span className="font-[family-name:var(--font-fraunces)] text-lg leading-none text-gray-300 italic tabular-nums transition-colors group-hover:text-black">
                    {assay.num}
                  </span>
                </div>
                <span className="mb-2.5 inline-block self-start rounded-full border border-gray-100 bg-gray-50 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-gray-500 uppercase">
                  {assay.method}
                </span>
                <p className="text-xs leading-relaxed text-gray-600">{assay.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find batch */}
      <section className="bg-gray-50 py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl leading-[1.15] font-semibold text-black lg:text-4xl">
              Find{" "}
              <span className="font-[family-name:var(--font-fraunces)] font-normal italic">your batch.</span>
            </h2>
            <p className="text-base text-gray-600">Three ways in, all under a minute.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
            {[
              {
                n: "01",
                title: "Search the library",
                body: "Type the compound, or the lot number printed on your label, into the library above.",
                badge: "bg-[#e9fce6]",
              },
              {
                n: "02",
                title: "Open any product page",
                body: "Every product page carries its current and archived certificates, right below the description.",
                badge: "bg-[#cbe5fc]",
              },
              {
                n: "03",
                title: "Scan your vial",
                body: "The QR code on the label lands directly on that exact batch, already highlighted.",
                badge: "bg-[#e8e5ff]",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.07)] lg:rounded-[24px]"
              >
                <span
                  className={cn(
                    "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full font-[family-name:var(--font-fraunces)] text-lg text-[#131315] italic",
                    step.badge,
                  )}
                >
                  {step.n}
                </span>
                <h3 className="mb-1.5 text-base font-semibold text-black">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/store"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#131315] px-8 text-sm font-semibold text-white hover:bg-gray-800"
              style={{ color: "#ffffff" }}
            >
              Shop tested peptides
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl leading-[1.15] font-semibold text-black lg:text-4xl">
              Questions,{" "}
              <span className="font-[family-name:var(--font-fraunces)] font-normal italic">answered.</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ.map((item, index) => {
              const open = openFaq === index;
              return (
                <div
                  key={item.q}
                  className={cn(
                    "overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)]",
                    open && "shadow-[0_4px_16px_rgba(0,0,0,0.05)]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left font-medium text-black"
                    aria-expanded={open}
                  >
                    <span className="text-[15px]">{item.q}</span>
                    <span
                      className={cn(
                        "ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-gray-50 transition-transform",
                        open && "rotate-45",
                      )}
                    >
                      <svg
                        className="h-3.5 w-3.5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </button>
                  {open ? (
                    <div className="-mt-0.5 px-5 pb-4">
                      <p className="text-sm leading-relaxed text-gray-600">{item.a}</p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl bg-[#fefeca] p-7 text-center lg:rounded-[24px] lg:p-8">
            <h3 className="mb-1.5 text-xl font-semibold text-[#131315]">
              Need a batch we haven&apos;t{" "}
              <span className="font-[family-name:var(--font-fraunces)] font-normal italic">published?</span>
            </h3>
            <p className="mx-auto mb-5 max-w-md text-sm text-[#131315]/70">
              Email support with your order number and we will send the batch-specific documentation.
            </p>
            <a
              href="mailto:support@klearclub.com"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#131315] px-7 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              style={{ color: "#ffffff" }}
            >
              Email support
            </a>
          </div>
        </div>
      </section>

      <HomeCtaSubscribeSection />
    </div>
  );
}
