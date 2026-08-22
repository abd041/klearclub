"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export function HomeCtaSubscribeSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <div className="relative overflow-x-clip">
      <section
        className="relative w-full bg-gradient-to-b from-[#fffde7] to-[#fef9c3] pt-12 pb-20 sm:pb-24 lg:pt-20 lg:pb-28"
        aria-label="Call to action"
      >
        {/* DSIP — top left */}
        <div className="pointer-events-none absolute top-[-20px] left-[-15px] z-10 h-[110px] w-[55px] sm:left-[-5px] sm:h-[130px] sm:w-[65px] lg:top-[-35px] lg:left-[35px] lg:h-[170px] lg:w-[85px] xl:left-[75px] xl:h-[200px] xl:w-[100px]">
          <div className="relative h-full w-full rotate-[18deg]">
            <Image
              src="/hero/dsip.png"
              alt="DSIP peptide vial"
              fill
              unoptimized
              className="object-contain drop-shadow-[0_18px_28px_rgba(15,23,42,0.14)]"
              sizes="100px"
            />
          </div>
        </div>

        {/* NAD+ — bottom right, overlaps subscribe card */}
        <div className="pointer-events-none absolute right-[-20px] bottom-[-40px] z-[70] h-[120px] w-[60px] sm:right-[-10px] sm:h-[150px] sm:w-[75px] lg:right-[40px] lg:bottom-[-70px] lg:h-[190px] lg:w-[95px] xl:right-[80px] xl:h-[220px] xl:w-[110px]">
          <div className="relative h-full w-full rotate-[-8deg]">
            <Image
              src="/hero/nad.png"
              alt="NAD+ peptide vial"
              fill
              unoptimized
              className="object-contain drop-shadow-[0_18px_28px_rgba(15,23,42,0.14)]"
              sizes="110px"
            />
          </div>
        </div>

        <div className="relative z-20 site-container">
          <div className="mx-auto max-w-3xl px-8 text-center sm:px-12 lg:px-16">
            <h2 className="mb-6 text-xl leading-[1.35] font-semibold text-black sm:text-2xl md:text-3xl lg:mb-8 lg:text-4xl">
              All the research peptides you need, with the{" "}
              <span className="relative inline-block">
                <span className="relative z-10">peace of mind</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[4px] overflow-hidden rounded-full lg:h-[5px]"
                >
                  <span className="absolute inset-0 origin-left scale-x-100 rounded-full bg-gradient-to-r from-[#b8e03f] via-[#7dd87d] to-[#4ade80]" />
                </span>
              </span>{" "}
              and research community at your fingertips.
            </h2>

            <Link
              href="/store"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:gap-3 hover:scale-105 hover:shadow-xl hover:shadow-black/20 lg:px-7 lg:py-3.5 lg:text-base"
            >
              Shop Now
              <svg
                width="32"
                height="10"
                viewBox="0 0 45 12"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M44.5303 6.53033C44.8232 6.23744 44.8232 5.76256 44.5303 5.46967L39.7574 0.696699C39.4645 0.403806 38.9896 0.403806 38.6967 0.696699C38.4038 0.989593 38.4038 1.46447 38.6967 1.75736L42.9393 6L38.6967 10.2426C38.4038 10.5355 38.4038 11.0104 38.6967 11.3033C38.9896 11.5962 39.4645 11.5962 39.7574 11.3033L44.5303 6.53033ZM0 6.75H44V5.25H0V6.75Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-30 -mt-8 pb-12 sm:-mt-10 lg:-mt-12">
        <div className="site-container">
          <div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#e8e5ff] to-[#f8eaed] px-5 py-6 sm:px-8 lg:rounded-3xl lg:px-10 lg:py-8"
            style={{ boxShadow: "0 -4px 40px rgba(0, 0, 0, 0.06)" }}
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <div className="max-w-md flex-1">
                <h3 className="mb-1.5 text-xl leading-tight font-semibold text-black md:text-2xl lg:mb-2 lg:text-[28px]">
                  Research updates from Klear Club
                </h3>
                <p className="mb-1.5 text-sm leading-relaxed text-[#797979] lg:text-base">
                  Subscribe for catalog updates, new research compounds, and quality documentation news
                </p>
                <p className="text-xs text-black/70 lg:text-sm">
                  For researchers and labs. No spam, unsubscribe anytime.
                </p>
              </div>

              {done ? (
                <p className="text-sm font-medium text-black lg:min-w-[340px]">You&apos;re on the list.</p>
              ) : (
                <form className="w-full flex-shrink-0 lg:w-auto lg:min-w-[340px]" onSubmit={onSubmit}>
                  <div className="flex items-center rounded-full border border-[#dedede] bg-white p-1 shadow-sm lg:p-1.5">
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter your email"
                      className="min-w-0 flex-1 bg-transparent px-4 py-2 text-base text-black placeholder:text-black/40 focus:outline-none"
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      className="flex-shrink-0 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-black/90 lg:px-6 lg:py-2.5"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
