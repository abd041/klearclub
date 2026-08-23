"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Amino Club–matched homepage hero:
 * left white + right solid lavender panel + product cluster.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-t border-[#c5a059]/70 bg-white">
      {/* Right lavender panel — matches Amino solid block */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[50%] bg-[#eef0fe] lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#eef0fe] lg:hidden"
      />

      <div className="site-container relative grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:gap-6 lg:py-[72px] xl:gap-10">
        <div className="relative z-10 max-w-[520px] rounded-[20px] bg-white px-1 lg:bg-transparent lg:px-0">
          <h1 className="animate-fade-up text-[42px] font-bold leading-[1.05] tracking-[-0.045em] text-black sm:text-[50px] lg:text-[56px]">
            Research Peptides
            <br className="hidden sm:block" /> You Can Trust
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-[440px] text-[16px] leading-[1.65] text-[#555555] sm:text-[17px]"
            style={{ animationDelay: "90ms" }}
          >
            Research-grade peptides with Certificate of Analysis on every batch. 99%+ identity purity, third-party
            tested.
          </p>
          <div className="animate-fade-up mt-8" style={{ animationDelay: "180ms" }}>
            <Link
              href="/store"
              className="inline-flex h-[48px] items-center gap-2 rounded-full bg-black px-8 text-[15px] font-semibold tracking-[-0.01em] text-white no-underline transition-opacity hover:opacity-90"
            >
              Browse Catalog
              <span aria-hidden="true" className="text-[16px] leading-none">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none">
          <div className="animate-hero-float relative mx-auto aspect-[2/3] w-full max-w-[340px] will-change-transform sm:max-w-[380px] lg:ml-auto lg:mr-0 lg:max-w-[420px]">
            <Image
              src="/hero/hero-products.png"
              alt="Klear Club NAD+ research peptide vial"
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 28vw, 70vw"
              className="object-contain object-center drop-shadow-[0_28px_48px_rgba(15,23,42,0.14)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
