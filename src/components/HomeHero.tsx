"use client";

import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <>
      <div className="relative z-[1] flex min-w-0 items-center bg-white px-5 py-14 sm:px-10 lg:h-[600px] lg:px-16 xl:px-20">
        <div className="w-full max-w-[520px]">
          <h1 className="animate-fade-up font-sans text-[40px] font-bold leading-[1.06] tracking-[-0.04em] text-black sm:text-[48px] lg:text-[56px]">
            Researcher sign-in
            <br />
            required
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-[430px] text-[16px] leading-[1.65] text-[#555555]"
            style={{ animationDelay: "120ms" }}
          >
            Create an account or sign in to view our research peptide catalog. 99%+ identity purity with full documentation.
          </p>
          <Link
            href="/account"
            className="group animate-fade-up mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-black px-6 text-[14px] font-medium text-white no-underline"
            style={{ animationDelay: "240ms", color: "#ffffff" }}
          >
            Get Started
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>

      <div className="relative z-[2] h-[380px] min-w-0 bg-[#f2efff] sm:h-[460px] lg:h-[600px]">
        <div className="pointer-events-none absolute inset-y-0 -left-[19.5%] right-0">
          <Image
            src="/hero/cluster.png"
            alt="Research peptide vials"
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-left-bottom"
          />
        </div>
      </div>
    </>
  );
}
