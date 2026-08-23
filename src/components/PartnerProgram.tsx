"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { productImage } from "@/data/media";
import { cn } from "@/lib/cn";

const FAQ = [
  {
    q: "How does the referral value work?",
    a: "You receive 20% on a referred researcher's first order and 10% on their subsequent orders placed with your code or with no other discount code applied. Orders redeemed with a non-partner discount code are not eligible for referral value. There's no cap and no limit on how many researchers or labs you can refer.",
  },
  {
    q: "How and when do I get paid?",
    a: "Payouts start processing on the 1st of each month for the previous month's delivered orders. Processing continues up until the 2nd to last business day of the month, unless that day falls on a Friday. Payouts may take 1-7 days to process and 1-5 business days to reflect in your bank. The minimum payout threshold is $1. Only delivered orders count. If an order is cancelled before shipment it will not be counted, out of fairness to all parties.",
  },
  {
    q: "What does the researcher receive?",
    a: "Referred researchers receive 20% off their first research peptide order when using your unique referral code.",
  },
  {
    q: "How long does the referral tracking window last?",
    a: "The referral tracking window lasts 30 days, giving researchers time to evaluate the catalog and supporting documentation before their first order.",
  },
  {
    q: "Who is this program for?",
    a: "This program is for people who want to help researchers, colleagues, or lab teams find a quality-documented supply of research peptides. This is not a consumer affiliate program. All referrals must be researchers or labs purchasing for legitimate laboratory or educational use.",
  },
  {
    q: "Is there a minimum referral requirement?",
    a: "No minimum. Your account remains active as long as you're referring researchers to Klear Club in accordance with the partner terms.",
  },
];

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="10" viewBox="0 0 45 15" fill="none" className={className} aria-hidden="true">
      <path
        d="M44.7071 8.20711C45.0976 7.81658 45.0976 7.18342 44.7071 6.79289L38.3431 0.428932C37.9526 0.0384078 37.3195 0.0384078 36.9289 0.428932C36.5384 0.819457 36.5384 1.45262 36.9289 1.84315L42.5858 7.5L36.9289 13.1569C36.5384 13.5474 36.5384 14.1805 36.9289 14.5711C37.3195 14.9616 37.9526 14.9616 38.3431 14.5711L44.7071 8.20711ZM0 8.5H44V6.5H0V8.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

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

export function PartnerProgram() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-white">
      {/* Hero — referral partner program */}
      <section
        className="relative w-full min-h-fit overflow-hidden lg:min-h-[450px] xl:min-h-[520px] 2xl:min-h-[580px]"
        aria-label="Klear Club Referral Partner Program - Help researchers find quality supply"
      >
        <div className="absolute inset-0 flex flex-col lg:flex-row" aria-hidden="true">
          <div className="hidden bg-white lg:block lg:w-1/2" />
          <div
            className="flex-1 lg:w-2/3"
            style={{
              background: "linear-gradient(180deg, rgba(232, 229, 255, 0.6) 0%, rgba(203, 229, 252, 0.6) 100%)",
            }}
          />
        </div>

        <div className="site-container relative h-full min-h-fit lg:min-h-[450px] xl:min-h-[520px] 2xl:min-h-[580px]">
          <div className="flex h-full min-h-fit flex-col lg:grid lg:min-h-[inherit] lg:grid-cols-2">
            <div className="z-20 order-2 flex flex-col items-center justify-center gap-2 pt-4 pb-8 text-center lg:order-1 lg:items-start lg:gap-4 lg:py-8 lg:text-left xl:py-10">
              <h1 className="max-w-lg text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-black sm:text-5xl md:text-6xl lg:max-w-xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                Help researchers find quality supply
              </h1>
              <p className="max-w-sm text-base leading-relaxed text-black/80 sm:text-lg md:text-xl lg:max-w-md lg:text-lg xl:text-xl">
                Refer colleagues, labs, or research teams to Klear Club. Share a trusted source; share in the value.
              </p>

              <div className="grid w-full max-w-sm grid-cols-2 gap-4 py-4 lg:max-w-md">
                <div className="text-left">
                  <p className="text-2xl font-semibold text-black lg:text-3xl">20%</p>
                  <p className="text-sm text-black/60">First order commission</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-semibold text-black lg:text-3xl">10%</p>
                  <p className="text-sm text-black/60">Lifetime recurring</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-semibold text-black lg:text-3xl">30 days</p>
                  <p className="text-sm text-black/60">Cookie window</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-semibold text-black lg:text-3xl">Monthly</p>
                  <p className="text-sm text-black/60">Payouts via bank deposit</p>
                </div>
              </div>

              <div className="pt-2 lg:pt-3">
                <Link
                  href="/account?mode=create"
                  className="group inline-flex h-11 items-center justify-center gap-3 rounded-full bg-black px-6 text-sm leading-none font-medium text-white transition-all hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 lg:h-12 lg:px-8 lg:text-base"
                >
                  Apply as a Referral Partner
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div
              className="relative order-1 flex aspect-[1.35/1] h-auto max-h-[40svh] min-h-[20svh] justify-center lg:order-2 lg:aspect-[4/3] lg:h-full lg:max-h-none lg:min-h-0 lg:flex-1"
              aria-label="Referral partner program showcase"
              role="img"
            >
              <div className="relative h-full w-full max-w-[609px] lg:max-w-none">
                <div className="animate-float-slow pointer-events-none absolute top-[15%] right-[8%] z-10 w-[18%] select-none sm:top-[5%] sm:right-[10%] sm:w-[25%] lg:top-[10%] lg:right-[15%] lg:w-[15%]">
                  <div className="relative aspect-[1/1.5] w-full" style={{ transform: "rotate(-8deg)" }}>
                    <Image
                      src={productImage({ slug: "tb-500", form: "vial" })}
                      alt="TB-500 Peptide vial"
                      fill
                      unoptimized
                      className="object-contain drop-shadow-lg"
                      sizes="160px"
                    />
                  </div>
                </div>
                <div className="animate-float pointer-events-none absolute top-[8%] left-[5%] z-10 w-[20%] select-none sm:top-[15%] sm:left-[8%] sm:w-[30%] lg:top-[20%] lg:left-[10%] lg:w-[18%]">
                  <div className="relative aspect-[1/1.5] w-full" style={{ transform: "rotate(12deg)" }}>
                    <Image
                      src={productImage({ slug: "bpc-157", form: "vial" })}
                      alt="BPC-157 Peptide vial"
                      fill
                      unoptimized
                      className="object-contain drop-shadow-lg"
                      sizes="180px"
                    />
                  </div>
                </div>
                <div className="animate-float-delayed pointer-events-none absolute right-[6%] bottom-[20%] z-10 w-[22%] select-none sm:right-[5%] sm:bottom-[10%] sm:w-[35%] lg:right-[8%] lg:bottom-[15%] lg:w-[20%]">
                  <div className="relative aspect-[1/1.5] w-full" style={{ transform: "rotate(-5deg)" }}>
                    <Image
                      src={productImage({ slug: "klear-h2o", form: "vial" })}
                      alt="Klear H2O"
                      fill
                      unoptimized
                      className="object-contain drop-shadow-lg"
                      sizes="200px"
                    />
                  </div>
                </div>

                <div className="animate-float-slow absolute top-[50%] left-[10%] z-20 w-[45%] rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur sm:top-[55%] sm:right-[20%] sm:left-auto sm:w-56 sm:p-5 lg:top-[40%] lg:right-[35%] lg:w-64 lg:p-6">
                  <p className="mb-1 text-xs text-black/60 sm:text-sm">Example monthly referral value</p>
                  <p className="text-xl font-bold text-black sm:text-2xl lg:text-3xl">$1,250</p>
                  <div className="mt-2 border-t border-black/10 pt-2 sm:mt-3 sm:pt-3">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-black/60">10 referrals</span>
                      <span className="font-medium text-green-600">+$500</span>
                    </div>
                    <div className="mt-1 flex justify-between text-xs sm:text-sm">
                      <span className="text-black/60">Recurring</span>
                      <span className="font-medium text-blue-600">+$750</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for research referrals */}
      <section className="bg-white py-16 lg:py-20">
        <div className="site-container">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="mb-4 text-3xl leading-tight font-semibold text-black md:text-4xl lg:text-5xl">
              Built for research referrals
            </h2>
            <p className="mx-auto max-w-2xl text-base text-black/70 lg:text-lg">
              Help researchers find a supply chain with the documentation they need
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {[
              ["20%", "First Order", "Referral value on new researchers"],
              ["10%", "Recurring", "On every reorder"],
              ["99%+", "Purity", "Third-party identity tested"],
              ["CoA", "Every Batch", "Certificate of Analysis"],
            ].map(([value, title, body]) => (
              <div key={title} className="text-center">
                <div className="mb-2 text-3xl font-bold text-black md:text-4xl lg:text-5xl">{value}</div>
                <div className="mb-1 text-lg font-medium text-black">{title}</div>
                <div className="text-sm text-black/60">{body}</div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-4xl lg:mt-20">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Research-grade supply",
                  body: "Consistent quality and documented batch records for reproducible research",
                },
                {
                  title: "Simple to share",
                  body: "Get a unique referral link to share with researchers, colleagues, or labs",
                },
                {
                  title: "Real-time tracking",
                  body: "Monitor referrals and referral value in your partner dashboard",
                },
              ].map((item) => (
                <div key={item.title} className="text-center md:text-left">
                  <h3 className="mb-2 text-lg font-semibold text-black">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-black/70">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gradient-to-b from-[#faf9ff] to-white py-16 lg:py-20">
        <div className="site-container">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="mb-4 text-3xl leading-tight font-semibold text-black md:text-4xl lg:text-5xl">
              How it works
            </h2>
            <p className="mx-auto max-w-2xl text-base text-black/70 lg:text-lg">
              A simple four-step process for referring researchers to quality supply
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {[
              {
                n: "01",
                title: "Apply",
                body: "Create your account and get a unique referral code for sharing with researchers and labs",
              },
              {
                n: "02",
                title: "Refer",
                body: "Share your referral link with researchers, colleagues, or research teams who need quality supply",
              },
              {
                n: "03",
                title: "Share in the value",
                body: "Receive 20% on first orders and 10% on recurring orders from researchers you refer",
              },
              {
                n: "04",
                title: "Get paid",
                body: "Payouts start on the 1st for the previous month's delivered orders",
              },
            ].map((step) => (
              <div key={step.n} className="relative">
                <div className="text-center lg:text-left">
                  <div className="mb-4 text-5xl font-bold text-black/10 lg:text-6xl">{step.n}</div>
                  <h3 className="mb-2 text-xl font-semibold text-black">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-black/60">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl lg:mt-20">
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm lg:p-10">
              <h3 className="mb-8 text-center text-2xl font-semibold text-black">Example referral value</h3>
              <div>
                <div className="flex items-center justify-between border-b border-black/5 py-5">
                  <span className="text-black/70">10 new researchers × $250</span>
                  <span className="font-semibold text-black">$500</span>
                </div>
                <div className="flex items-center justify-between border-b border-black/5 py-5">
                  <span className="text-black/70">50 recurring orders × $150</span>
                  <span className="font-semibold text-black">$750</span>
                </div>
                <div className="flex items-center justify-between py-5">
                  <span className="font-semibold text-black">Monthly referral value</span>
                  <span className="text-xl font-bold text-black">$1,250</span>
                </div>
              </div>
              <p className="mt-2 text-center text-xs text-black/50">Based on average referral partner activity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why refer researchers to us */}
      <section className="bg-white py-16 lg:py-20">
        <div className="site-container">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="mb-4 text-3xl leading-tight font-semibold text-black md:text-4xl lg:text-5xl">
              Why refer researchers to us
            </h2>
            <p className="mx-auto max-w-2xl text-base text-black/70 lg:text-lg">
              A quality supply chain with the documentation researchers expect
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <div>
              <h3 className="mb-3 text-xl font-semibold text-black">Documented quality</h3>
              <p className="text-sm leading-relaxed text-black/70">
                Certificate of Analysis with every batch. Third-party identity tested at accredited U.S. laboratories.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-semibold text-black">99%+ identity purity</h3>
              <p className="text-sm leading-relaxed text-black/70">
                A full 8-assay panel at an ISO 17025 accredited lab on every batch for consistent research results.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-semibold text-black">Reliable fulfillment</h3>
              <p className="text-sm leading-relaxed text-black/70">
                Fast processing with free shipment protection ensures research timelines stay on track.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-semibold text-black">30-day referral window</h3>
              <p className="text-sm leading-relaxed text-black/70">
                Long attribution period ensures you get credit for researchers who take time to evaluate.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-semibold text-black">Recurring on reorders</h3>
              <p className="text-sm leading-relaxed text-black/70">
                10% on every subsequent order from researchers you refer, for the lifetime of their account.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-semibold text-black">Quick approval</h3>
              <p className="text-sm leading-relaxed text-black/70">
                Get started immediately with your unique referral code - no waiting period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple, transparent referral value */}
      <section className="bg-gradient-to-b from-white to-[#faf9ff] py-16 lg:py-20">
        <div className="site-container">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="mb-4 text-3xl leading-tight font-semibold text-black md:text-4xl lg:text-5xl">
              Simple, transparent referral value
            </h2>
            <p className="mx-auto max-w-2xl text-base text-black/70 lg:text-lg">
              No hidden fees, $1 minimum payout, just straightforward referral value sharing
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
              <div className="mb-6 text-center">
                <div className="mb-2 text-5xl font-bold text-black lg:text-6xl">20%</div>
                <h3 className="text-xl font-semibold text-black">First Order Commission</h3>
              </div>
              <p className="mb-6 text-center text-sm text-black/70">
                Receive value on every researcher&apos;s first order. Referred researchers and labs also get 20% off.
              </p>
              <div className="space-y-2 text-sm">
                {["Researcher gets 20% off first order", "Average order: $250", "Average referral value: $50"].map(
                  (line) => (
                    <div key={line} className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-black/40" />
                      <span className="text-black/70">{line}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
              <div className="mb-6 text-center">
                <div className="mb-2 text-5xl font-bold text-black lg:text-6xl">10%</div>
                <h3 className="text-xl font-semibold text-black">Lifetime Recurring</h3>
              </div>
              <p className="mb-6 text-center text-sm text-black/70">
                10% on every reorder from researchers you refer, for the lifetime of their account.
              </p>
              <div className="space-y-2 text-sm">
                {["No time limit", "High researcher reorder rate", "Recurring on every reorder"].map((line) => (
                  <div key={line} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-black/40" />
                    <span className="text-black/70">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center lg:mt-16">
            <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-black/70 sm:gap-8">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Monthly payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>$1 minimum</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>14-day approval</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently asked questions */}
      <section className="bg-gradient-to-b from-white to-[#faf9ff] py-16 lg:py-20">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl leading-tight font-semibold text-black md:text-4xl lg:text-5xl">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-4">
              {FAQ.map((item, index) => {
                const open = openFaq === index;
                return (
                  <div key={item.q} className="border-b border-black/10 pb-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between py-2 text-left transition-colors hover:text-black/70"
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
                    {open ? (
                      <div className="pt-2 pb-4">
                        <p className="text-sm leading-relaxed text-black/70">{item.a}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="mt-12 text-center lg:mt-16">
              <p className="mb-3 text-base text-black/60">Still have questions?</p>
              <a
                href="mailto:support@klearclub.com"
                className="text-base font-medium text-black underline underline-offset-2 hover:no-underline"
              >
                Contact our partner team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner + subscribe — matches live affiliate footer CTA */}
      <div className="relative overflow-x-clip">
        <section
          className="relative w-full bg-gradient-to-b from-[#e8e5ff] to-[#cbe5fc] pt-12 pb-20 sm:pb-24 lg:pt-20 lg:pb-28"
          aria-label="Become a referral partner with Klear Club"
        >
          <div className="pointer-events-none absolute top-[-25px] left-[-15px] z-10 h-[100px] w-[50px] sm:top-[-25px] sm:left-[-10px] sm:h-[120px] sm:w-[60px] lg:top-[-40px] lg:left-[20px] lg:h-[160px] lg:w-[80px] xl:left-[60px] xl:h-[180px] xl:w-[90px]">
            <div className="relative h-full w-full rotate-[12deg]">
              <Image
                src={productImage({ slug: "ghk-cu", form: "vial" })}
                alt=""
                fill
                unoptimized
                className="object-contain drop-shadow-lg"
                sizes="90px"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute right-[-10px] bottom-[-30px] z-[70] h-[90px] w-[45px] sm:right-[-5px] sm:h-[110px] sm:w-[55px] lg:right-[40px] lg:bottom-[-50px] lg:h-[140px] lg:w-[70px] xl:right-[80px] xl:h-[160px] xl:w-[80px]">
            <div className="relative h-full w-full rotate-[-8deg]">
              <Image
                src={productImage({ slug: "melanotan-ii", form: "vial" })}
                alt=""
                fill
                unoptimized
                className="object-contain drop-shadow-lg"
                sizes="80px"
              />
            </div>
          </div>

          <div className="relative z-20 site-container">
            <div className="mx-auto max-w-3xl px-8 text-center sm:px-12 lg:px-16">
              <h2 className="mb-6 text-xl leading-[1.35] font-semibold text-black sm:text-2xl md:text-3xl lg:mb-8 lg:text-4xl">
                Refer researchers to{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Klear Club</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[4px] overflow-hidden rounded-full lg:h-[5px]"
                  >
                    <span className="absolute inset-0 origin-left scale-x-100 rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4]" />
                  </span>
                </span>{" "}
                as a referral partner.
              </h2>
              <p className="mb-8 text-base text-black/70 lg:text-lg">
                Help researchers find a trusted supply chain with documented quality
              </p>
              <Link
                href="/account?mode=create"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:gap-3 hover:scale-105 hover:shadow-xl hover:shadow-black/20 lg:px-7 lg:py-3.5 lg:text-base"
              >
                Become a Partner
                <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-black/60">
                <span>✓ Free to join</span>
                <span>✓ $1 minimum payout</span>
                <span>✓ Instant approval</span>
              </div>
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
                  <p className="text-xs text-black/70 lg:text-sm">For researchers and labs. No spam, unsubscribe anytime.</p>
                </div>
                <PartnerSubscribeForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartnerSubscribeForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return done ? (
    <p className="text-sm font-medium text-black lg:min-w-[340px]">You&apos;re on the list.</p>
  ) : (
    <form
      className="w-full flex-shrink-0 lg:w-auto lg:min-w-[340px]"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.trim()) return;
        setDone(true);
      }}
    >
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
  );
}
