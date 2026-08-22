import Image from "next/image";
import Link from "next/link";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";
import { faqSections } from "@/data/faq";

const HERO_VIALS = [
  {
    src: "/hero/h2o.png",
    alt: "Klear H2O",
    className:
      "absolute left-[4%] top-[12%] z-0 aspect-[1/1.5] w-[18%] animate-float-delayed pointer-events-none select-none lg:left-[7%] lg:w-[14%]",
    rotate: "-6deg",
  },
  {
    src: "/hero/tb.png",
    alt: "TB-500 Peptide vial",
    className:
      "absolute right-[5%] top-[18%] z-10 aspect-[1/1.5] w-[15%] animate-float pointer-events-none select-none lg:right-[9%] lg:w-[12%]",
    rotate: "14deg",
  },
  {
    src: "/hero/bpc.png",
    alt: "BPC-157 Peptide vial",
    className:
      "absolute bottom-[10%] left-[12%] z-0 aspect-[1/1.5] w-[16%] animate-float-slow pointer-events-none select-none lg:bottom-[10%] lg:left-[16%] lg:w-[12%]",
    rotate: "-10deg",
  },
  {
    src: "/hero/h2o.png",
    alt: "Klear H2O",
    className:
      "absolute right-[8%] bottom-[5%] z-0 aspect-[1/1.5] w-[14%] animate-float pointer-events-none select-none lg:right-[12%] lg:w-[10%]",
    rotate: "18deg",
  },
] as const;

function LinkArrow({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

export function FaqPageContent() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[50vh] w-full overflow-hidden lg:min-h-[60vh]" aria-label="FAQ">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(219, 234, 254, 0.7) 0%, rgba(191, 219, 254, 0.5) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {HERO_VIALS.map((vial, index) => (
            <div key={`${vial.src}-${index}`} className={vial.className} style={{ transform: `rotate(${vial.rotate})` }}>
              <div className="relative h-full w-full">
                <Image src={vial.src} alt={vial.alt} fill unoptimized className="object-contain" sizes="20vw" />
              </div>
            </div>
          ))}
        </div>

        <div className="site-container relative z-20 flex h-full min-h-[50vh] items-center justify-center lg:min-h-[60vh]">
          <div className="mx-auto max-w-3xl py-16 text-center lg:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-2 backdrop-blur-sm">
              <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Quick Answers</span>
            </div>
            <h1 className="mb-4 text-4xl leading-[1.05] font-semibold tracking-tight text-black sm:text-5xl lg:mb-6 lg:text-6xl xl:text-7xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-black/70 sm:text-xl lg:text-2xl">
              Everything you need to know about research peptides, ordering, shipping, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24" aria-label="FAQ categories">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            {faqSections.map((section) => (
              <div key={section.title} className="mb-12 last:mb-0">
                <h2 className="mb-6 text-2xl font-semibold text-black">{section.title}</h2>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <details
                      key={item.question}
                      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 text-left font-medium text-black transition-colors hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
                        <span>{item.question}</span>
                        <svg
                          className="ml-4 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-5">
                        <p className="leading-relaxed text-gray-600">{item.answer}</p>
                        {item.link ? (
                          <Link
                            href={item.link.href}
                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-black underline-offset-2 hover:underline"
                          >
                            {item.link.label}
                            <LinkArrow className="h-4 w-4" />
                          </Link>
                        ) : null}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}

            <div className="mx-auto mt-16 max-w-2xl text-center">
              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm lg:p-10">
                <h3 className="mb-3 text-xl font-semibold text-black lg:text-2xl">Still have questions?</h3>
                <p className="mb-6 text-gray-600">Our support team is here to help with any questions not covered above.</p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="mailto:support@klearclub.com"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-6 font-medium text-white transition-colors hover:bg-black/90"
                    style={{ color: "#ffffff" }}
                  >
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeCtaSubscribeSection />
    </div>
  );
}
