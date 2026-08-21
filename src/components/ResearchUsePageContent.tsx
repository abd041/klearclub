"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BulkOrdersSection } from "@/components/BulkOrdersSection";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";
import { ProductCard } from "@/components/ProductCard";
import { SubscriptionBoxSection } from "@/components/SubscriptionBoxSection";
import { productCoas } from "@/data/coas";
import { getFeaturedProducts } from "@/data/products";
import { cn } from "@/lib/cn";

const CERT_COUNT = Object.values(productCoas).reduce((n, files) => n + files.length, 0);

const APPLICATIONS = [
  {
    n: "01",
    title: "Cell Culture Studies",
    body: "Investigate cellular responses and mechanisms in controlled laboratory environments.",
  },
  {
    n: "02",
    title: "Protein Analysis",
    body: "Study protein interactions, binding affinities, and structural characteristics.",
  },
  {
    n: "03",
    title: "Receptor Studies",
    body: "Examine receptor binding, signaling pathways, and molecular mechanisms.",
  },
  {
    n: "04",
    title: "Biochemical Assays",
    body: "Perform analytical tests to measure peptide activity and interactions.",
  },
] as const;

const STORAGE = [
  "Sealed lyophilized vials are heat-stable; room temperature storage is fine",
  "Refrigerating or freezing sealed vials is optional",
  "Protect from light and moisture",
  "Avoid repeated freeze-thaw cycles",
  "Keep sealed until ready for laboratory use",
] as const;

const HANDLING = [
  "Use appropriate personal protective equipment (PPE)",
  "Handle in a clean laboratory environment",
  "Follow standard laboratory safety protocols",
  "Avoid contamination with skin oils or foreign materials",
  "Dispose of materials according to local regulations",
] as const;

const QUALITY = [
  "Review the Certificate of Analysis (CoA) for each batch",
  "Verify peptide purity via HPLC results (should be 99%+)",
  "Confirm identity against the certified reference standard result",
  "Confirm the batch number matches the supplied CoA",
  "Report any quality concerns to support@klearclub.com",
] as const;

const FAQS = [
  {
    q: "Can Klear Club peptides be used on humans or animals?",
    a: "No. Every product is sold strictly for in-vitro research, laboratory experimentation, and educational use. Products are not intended for human, veterinary, or food use, and are not drugs or dietary supplements.",
  },
  {
    q: "Do your research peptides come with a Certificate of Analysis?",
    a: "Yes. Every batch is 8x tested at an independent ISO 17025 accredited U.S. laboratory, and a Certificate of Analysis with the full 8-assay panel is published for each lot. You can review current certificates on our CoA page before you order.",
  },
  {
    q: "How pure are Klear Club research peptides?",
    a: "Purity is verified at 99% or higher by HPLC, and identity is confirmed against certified reference standards at an independent ISO 17025 accredited US laboratory, alongside content, appearance, fentanyl, heavy metals, sterility, and endotoxin testing on every batch.",
  },
  {
    q: "How should research peptides be stored?",
    a: "Sealed lyophilized vials are heat-stable and can be kept at room temperature, refrigerated, or frozen; stability doesn't change much as long as the vial stays sealed. Protect from light and moisture, and refrigerate reconstituted solutions at 2-8°C.",
  },
  {
    q: "How quickly do orders ship?",
    a: "Orders are processed within 0-2 business days and standard delivery arrives in 1-4 business days, with 2-day and overnight options available. Every order includes shipment protection. See our shipping page for delivery options and rates.",
  },
  {
    q: "Who is eligible to purchase from Klear Club?",
    a: "By ordering, you confirm that you are a qualified researcher or are purchasing for legitimate research purposes, and you agree to handle all products in accordance with applicable laws and regulations.",
  },
] as const;

const STATS = [
  { value: "99%+", label: "Purity, HPLC verified" },
  { value: String(CERT_COUNT), label: "Published certificates" },
  { value: "3rd party", label: "Independent US labs" },
  { value: "ISO 17025", label: "Lab accreditation" },
] as const;

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/**
 * Live: aminoclub.com/us/research-use
 */
export function ResearchUsePageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f7ef] via-white to-white">
        <div className="mx-auto flex min-h-[52vh] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-16 text-center lg:min-h-[58vh] lg:items-start lg:py-24 lg:text-left">
          <div className="max-w-3xl">
            <h1 className="text-4xl leading-[1.08] font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl xl:text-7xl">
              Research Use Only,{" "}
              <span className="font-[family-name:var(--font-fraunces)] font-normal italic">proven pure.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#555555] lg:mx-0 lg:text-lg">
              Premium peptides for in-vitro research and laboratory applications. {CERT_COUNT} published lab certificates,
              99%+ purity, identity-verified, third-party tested in the USA.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/store"
                className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-semibold text-white no-underline"
                style={{ color: "#ffffff" }}
              >
                Shop research peptides
              </Link>
              <a href="#featured-compounds" className="text-sm font-medium text-black underline underline-offset-2">
                or see the featured compounds
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* For research only — dark band */}
      <section className="bg-[#0a1930] px-6 py-14 lg:py-16">
        <div className="mx-auto max-w-3xl text-center lg:text-left">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            For research and laboratory use{" "}
            <span className="font-[family-name:var(--font-fraunces)] font-normal italic">only.</span>
          </h2>
          <p className="mt-4 text-[13px] leading-relaxed text-white/70 sm:text-sm">
            All products sold by Klear Club are intended strictly for in-vitro research, laboratory experimentation, and
            educational purposes. Products are not intended for human or veterinary use.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
            {["Not for Human Use", "Not for Veterinary Use", "Not for Food Use"].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-white/90 ring-1 ring-white/15"
              >
                <XIcon className="h-3 w-3 text-red-400" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SubscriptionBoxSection />

      {/* Applications */}
      <section className="bg-white px-6 py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <h2 className="mb-10 text-center text-3xl font-semibold text-black lg:text-4xl">
            Intended research{" "}
            <span className="font-[family-name:var(--font-fraunces)] font-normal italic">applications.</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {APPLICATIONS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.07)]"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e9fce6] font-[family-name:var(--font-fraunces)] text-lg italic text-black">
                  {item.n}
                </span>
                <h3 className="mb-1.5 text-base font-semibold text-black">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research-grade with receipts */}
      <section className="bg-[#f7faf7] px-6 py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-black lg:text-4xl">
              Research-grade,{" "}
              <span className="font-[family-name:var(--font-fraunces)] font-normal italic">with receipts.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-gray-600">
              Every product meets rigorous quality standards to ensure reliable research results, and the lab reports are
              public.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-[#e9fce6] p-5 text-center transition-transform hover:-translate-y-0.5 lg:rounded-[24px] lg:p-6"
              >
                <p className="text-2xl font-semibold text-black lg:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-black/60 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/store"
              className="inline-flex h-11 items-center rounded-full bg-black px-6 text-sm font-semibold text-white no-underline"
              style={{ color: "#ffffff" }}
            >
              Shop tested peptides
            </Link>
            <Link
              href="/coa"
              className="inline-flex h-11 items-center rounded-full border border-black bg-white px-6 text-sm font-medium text-black no-underline"
            >
              Browse the certificate library
            </Link>
          </div>
        </div>
      </section>

      {/* Proper handling */}
      <section className="bg-gray-50 px-6 py-14 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-3xl font-semibold leading-[1.15] text-black lg:text-4xl">
            Proper handling,{" "}
            <span className="font-[family-name:var(--font-fraunces)] font-normal italic">by the book.</span>
          </h2>
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
            <HandlingCard title="Storage Requirements" items={STORAGE} />
            <HandlingCard title="Handling Precautions" items={HANDLING} />
            <HandlingCard title="Quality Verification" items={QUALITY} />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white px-6 py-14 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-black lg:text-4xl">
              Research peptide{" "}
              <span className="font-[family-name:var(--font-fraunces)] font-normal italic">FAQs.</span>
            </h2>
            <p className="mt-3 text-base text-gray-600">Answers to the questions researchers ask before ordering.</p>
          </div>
          <div className="space-y-4">
            {FAQS.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.q} className="border-b border-black/10 pb-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between py-2 text-left"
                    aria-expanded={open}
                  >
                    <span className="pr-4 font-medium text-black">{item.q}</span>
                    <svg
                      className={cn(
                        "h-5 w-5 shrink-0 text-black/40 transition-transform duration-200",
                        open && "rotate-180",
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {open ? <p className="pt-2 pb-2 text-sm leading-relaxed text-black/70">{item.a}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Researcher responsibility */}
      <section className="bg-[#e9fce6] px-6 py-14 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-black lg:text-4xl">
            Researcher{" "}
            <span className="font-[family-name:var(--font-fraunces)] font-normal italic">responsibility.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-black/70 sm:text-base">
            By purchasing from Klear Club, you acknowledge that you are a qualified researcher or are purchasing for
            legitimate research purposes, and you agree to use all products in accordance with applicable laws and
            regulations.
          </p>
          <p className="mt-5 text-xs font-medium tracking-wide text-black/50 uppercase sm:text-sm">
            99%+ purity · 3rd Party US lab tested · CoA every batch · 1-4 Days standard delivery
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/store"
              className="inline-flex h-11 items-center rounded-full bg-black px-6 text-sm font-semibold text-white no-underline"
              style={{ color: "#ffffff" }}
            >
              Browse products
            </Link>
            <Link
              href="/disclaimer"
              className="inline-flex h-11 items-center rounded-full border border-black bg-white px-6 text-sm font-medium text-black no-underline"
            >
              Read the full disclaimer
            </Link>
          </div>
        </div>
      </section>

      <BulkOrdersSection />

      {/* Featured compounds */}
      <section id="featured-compounds" className="bg-white px-6 py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold text-black lg:text-4xl">
                The compounds researchers{" "}
                <span className="font-[family-name:var(--font-fraunces)] font-normal italic">order most.</span>
              </h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                Each third-party identity tested to 99%+ purity, certificate included.
              </p>
            </div>
            <Link href="/store" className="text-sm font-medium text-black underline underline-offset-2">
              View all compounds
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            Every vial above ships with its lab report. 0-2 business day processing, free shipment protection included.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/store"
              className="inline-flex h-12 items-center rounded-full bg-black px-8 text-sm font-semibold text-white no-underline"
              style={{ color: "#ffffff" }}
            >
              Shop research peptides
            </Link>
          </div>
        </div>
      </section>

      <HomeCtaSubscribeSection />
    </div>
  );
}

function HandlingCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="mb-4 text-base font-semibold text-black">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span className="text-sm text-gray-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
