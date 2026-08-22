"use client";

import Image from "next/image";
import Link from "next/link";

const TRUST = [
  {
    title: "99%+ Purity Guaranteed",
    subtitle: "Every batch independently verified",
    accent: "#c9ebc4",
    iconBg: "#eaf8e8",
  },
  {
    title: "Shipment Protection",
    subtitle: "Every order fully covered",
    accent: "#c5defb",
    iconBg: "#e4f1fd",
  },
  {
    title: "CoA with Every Batch",
    subtitle: "Third-party tested in America",
    accent: "#f0e59a",
    iconBg: "#fbf8d6",
  },
];

export function HomeHero() {
  return (
    <section className="bg-white">
      <div className="site-container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div className="max-w-[540px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#9a9a9a]">
            8x tested · 99%+ purity · ships in 0–2 days
          </p>
          <h1 className="animate-fade-up mt-3 text-[36px] font-bold leading-[1.06] tracking-[-0.04em] text-black sm:text-[44px] lg:text-[52px]">
            Premium research peptides,{" "}
            <span className="font-serif italic">documented batch by batch.</span>
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-[460px] text-[16px] leading-[1.65] text-[#555555]"
            style={{ animationDelay: "120ms" }}
          >
            USA-based supply for qualified researchers and laboratories. Every lot ships with third-party testing and a
            full Certificate of Analysis.
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/store"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-6 text-[14px] font-medium text-white no-underline"
            >
              Shop catalog
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/coa"
              className="inline-flex h-11 items-center rounded-full border border-[#d8d8d8] bg-white px-6 text-[14px] font-medium text-black no-underline"
            >
              View COAs
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-[24px] bg-[#f2efff] lg:max-w-none lg:aspect-auto lg:h-[480px]">
          <Image
            src="/hero/cluster.png"
            alt="Research peptide vials"
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-left-bottom"
          />
        </div>
      </div>

      <div className="site-container pb-12 sm:pb-16">
        <div className="grid gap-3 sm:grid-cols-3">
          {TRUST.map((card) => (
            <article
              key={card.title}
              className="relative flex items-center gap-3 overflow-hidden rounded-[16px] border border-[#ececec] bg-white px-4 py-4 shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
            >
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5" style={{ background: card.accent }} />
              <span
                className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: card.iconBg }}
              >
                <CheckDot />
              </span>
              <div className="min-w-0">
                <h2 className="text-[14px] font-bold text-black">{card.title}</h2>
                <p className="mt-0.5 text-[12px] text-[#6b6b6b]">{card.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckDot() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#5fa456"
        d="M12 1.6 14.2 3l2.5-.4.9 2.4 2.4.9-.4 2.5L21.4 12l-1.8 2.2.4 2.5-2.4.9-.9 2.4-2.5-.4L12 22.4 9.8 21l-2.5.4-.9-2.4-2.4-.9.4-2.5L2.6 12l1.8-2.2-.4-2.5 2.4-.9.9-2.4 2.5.4L12 1.6Z"
      />
      <path
        d="M7.4 12.2 10.3 15.2 16.6 8.6"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
