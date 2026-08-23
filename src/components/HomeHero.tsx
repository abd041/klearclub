"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Homepage hero — mobile: image-first centered stack on lavender gradient.
 * Desktop: white left copy + lavender right product cluster.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-t border-[#c5a059]/70 bg-[#eef0fe] lg:bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_85%_at_50%_-5%,#ffffff_0%,#f6f7ff_32%,#eef0fe_68%,#e8ecfc_100%)] lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[50%] bg-[#eef0fe] lg:block"
      />

      <div className="site-container home-section-y relative flex flex-col items-center pt-5 sm:pt-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-6 lg:pt-20 xl:gap-10">
        <div className="relative z-10 order-1 w-full lg:order-2 lg:max-w-none lg:justify-self-end">
          <div className="animate-hero-float relative mx-auto aspect-[5/4] w-full max-w-[340px] will-change-transform sm:max-w-[400px] lg:ml-auto lg:mr-[-4%] lg:aspect-[6/5] lg:max-w-[680px] lg:-translate-y-6 lg:scale-[1.18] xl:mr-[-2%] xl:max-w-[720px] xl:-translate-y-7 xl:scale-[1.22]">
            <Image
              src="/hero/hero-products.png"
              alt="Klear Club research peptides"
              fill
              priority
              unoptimized
              sizes="(min-width: 1280px) 48vw, (min-width: 1024px) 52vw, 92vw"
              className="object-contain object-center drop-shadow-[0_24px_40px_rgba(15,23,42,0.12)] lg:object-[center_42%] lg:drop-shadow-[0_28px_48px_rgba(15,23,42,0.14)]"
            />
          </div>
        </div>

        <div className="relative z-10 order-2 mt-7 w-full max-w-[520px] text-center sm:mt-8 lg:order-1 lg:mt-0 lg:text-left">
          <h1 className="animate-fade-up text-[34px] font-bold leading-[1.08] tracking-[-0.04em] text-black sm:text-[38px] lg:text-[56px] lg:leading-[1.05] lg:tracking-[-0.045em]">
            Research Peptides
            <br />
            You Can Trust
          </h1>
          <p
            className="animate-fade-up mx-auto mt-4 max-w-[318px] text-[15px] leading-[1.65] text-[#555555] sm:max-w-[360px] sm:text-[16px] lg:mx-0 lg:mt-5 lg:max-w-[440px] lg:text-[17px]"
            style={{ animationDelay: "90ms" }}
          >
            Research-grade peptides with Certificate of Analysis on every batch. 99%+ identity purity, third-party
            tested.
          </p>
          <div
            className="animate-fade-up mt-7 flex justify-center lg:mt-8 lg:justify-start"
            style={{ animationDelay: "180ms" }}
          >
            <Link
              href="/store"
              className="inline-flex h-[48px] min-w-[200px] items-center justify-center gap-2 rounded-full bg-black px-8 text-[15px] font-semibold tracking-[-0.01em] text-white no-underline transition-opacity hover:opacity-90 sm:min-w-0"
            >
              Browse Catalog
              <span aria-hidden="true" className="text-[16px] leading-none">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
