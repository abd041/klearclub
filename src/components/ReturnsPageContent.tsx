import Image from "next/image";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";

const HERO_VIALS = [
  {
    src: "/hero/AminoH2ODesktop.png",
    alt: "Klear H2O",
    className:
      "left-[4%] top-[12%] z-0 w-[18%] animate-float-delayed lg:left-[7%] lg:w-[14%]",
    rotate: "-6deg",
  },
  {
    src: "/hero/TB500Desktop.webp",
    alt: "TB-500 Peptide vial",
    className: "right-[5%] top-[18%] z-10 w-[15%] animate-float lg:right-[9%] lg:w-[12%]",
    rotate: "14deg",
  },
  {
    src: "/hero/BPC157Desktop.webp",
    alt: "BPC-157 Peptide vial",
    className:
      "bottom-[10%] left-[12%] z-0 w-[16%] animate-float-slow lg:left-[16%] lg:w-[12%]",
    rotate: "-10deg",
  },
  {
    src: "/hero/AminoH2ODesktop.png",
    alt: "Klear H2O",
    className: "right-[8%] bottom-[5%] z-0 w-[14%] animate-float lg:right-[12%] lg:w-[10%]",
    rotate: "18deg",
  },
] as const;

const STEPS = [
  {
    n: "1",
    title: "Document the Damage",
    body: "Take clear photos of the damaged product and packaging as soon as it arrives. This evidence is required for all damage claims.",
  },
  {
    n: "2",
    title: "Contact Us",
    body: "Email support@klearclub.com with your order number and photos of the damage. We'll respond within 24 hours.",
  },
  {
    n: "3",
    title: "Get Your Replacement",
    body: "Once we verify the damage, we'll ship a one-time replacement at no cost to you. All claims are subject to review.",
  },
] as const;

const ELIGIBLE = [
  "Products damaged during shipping (with photo evidence), reported within 14 days of delivery",
  "Defective products that don't meet purity standards",
  "Incorrect items received",
] as const;

const NOT_ELIGIBLE = [
  { text: "Anything reported more than ", highlight: "14 days after delivery" },
  { text: "Reconstituted products" },
  { text: "Damage claims without photo evidence" },
  { text: "Products improperly stored after delivery" },
  { text: "Products without proof of purchase" },
] as const;

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function ReturnsPageContent() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[50vh] w-full overflow-hidden lg:min-h-[60vh]" aria-label="Returns">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(237, 233, 254, 0.7) 0%, rgba(221, 214, 254, 0.5) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {HERO_VIALS.map((vial, index) => (
            <div
              key={`${vial.src}-${index}`}
              className={`pointer-events-none absolute aspect-[1/1.5] select-none ${vial.className}`}
            >
              <div className="relative h-full w-full" style={{ transform: `rotate(${vial.rotate})` }}>
                <Image
                  src={vial.src}
                  alt={vial.alt}
                  fill
                  unoptimized
                  className="object-contain drop-shadow-[0_22px_28px_rgba(15,23,42,0.16)]"
                  sizes="20vw"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-20 mx-auto flex h-full min-h-[50vh] max-w-[1440px] items-center justify-center px-6 lg:min-h-[60vh]">
          <div className="mx-auto max-w-3xl py-16 text-center lg:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-2 backdrop-blur-sm">
              <ShieldCheckIcon className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Damage Protection</span>
            </div>
            <h1 className="mb-4 text-4xl leading-[1.05] font-semibold tracking-tight text-black sm:text-5xl lg:mb-6 lg:text-6xl xl:text-7xl">
              Returns &amp; Refunds
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-black/70 sm:text-xl lg:text-2xl">
              Every order is protected against damage in transit.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24" aria-label="Damage protection policy">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <div className="mx-auto max-w-4xl">
            <div
              className="mb-12 rounded-3xl border border-green-100 p-8 text-center lg:p-12"
              style={{
                background: "linear-gradient(to bottom right, #f0fdf4, #ecfdf5)",
              }}
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h2 className="mb-4 text-3xl font-semibold text-black lg:text-4xl">Damage Protection Policy</h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700">
                Every order is protected against damage in transit. If your product arrives damaged, we&apos;ll send a
                one-time replacement. All damage claims must include photo evidence and are subject to review. One
                replacement per customer per order.
              </p>
            </div>

            <div className="mb-16">
              <h2 className="mb-10 text-center text-2xl font-semibold text-black lg:text-3xl">How Returns Work</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {STEPS.map((step) => (
                  <div key={step.n} className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
                      {step.n}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-black">{step.title}</h3>
                    <p className="text-gray-600">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-black">Eligible for Return</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  {ELIGIBLE.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-gray-50 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <XIcon className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-black">Not Eligible for Return</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  {NOT_ELIGIBLE.map((item) => (
                    <li key={item.text + (item.highlight ?? "")} className="flex items-start gap-2">
                      <XIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                      <span>
                        {item.text}
                        {"highlight" in item && item.highlight ? (
                          <span className="font-medium text-black">{item.highlight}</span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24" aria-labelledby="damaged-heading">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm lg:p-12">
              <div className="mb-8 text-center">
                <h2 id="damaged-heading" className="mb-4 text-2xl font-semibold text-black lg:text-3xl">
                  Received a Damaged or Defective Product?
                </h2>
                <p className="mx-auto max-w-2xl text-gray-600">
                  We take quality seriously. If your order arrives damaged in transit, we&apos;ll send a one-time
                  replacement at no cost to you. Photo evidence is required and all claims are subject to review. One
                  replacement per customer per order.
                </p>
              </div>

              <div className="mb-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl bg-gray-50 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="mb-2 font-semibold text-black">Take Photos</h4>
                  <p className="text-sm text-gray-600">Document the damage or issue with clear photos</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="mb-2 font-semibold text-black">Email Us</h4>
                  <p className="text-sm text-gray-600">
                    Send photos and order number to support@klearclub.com
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h4 className="mb-2 font-semibold text-black">Get Replacement</h4>
                  <p className="text-sm text-gray-600">We&apos;ll ship a replacement within 24 hours</p>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="mailto:support@klearclub.com?subject=Damaged/Defective%20Order"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-8 font-medium text-white transition-colors hover:bg-black/90"
                  style={{ color: "#ffffff" }}
                >
                  Report an Issue
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24" aria-labelledby="timeline-heading">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="timeline-heading" className="mb-6 text-2xl font-semibold text-black lg:text-3xl">
              Replacement Timeline
            </h2>

            <div className="rounded-2xl bg-gray-50 p-8 text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 py-3">
                  <span className="text-gray-700">Damage claim submitted with photos</span>
                  <span className="font-medium text-black">Day 1</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 py-3">
                  <span className="text-gray-700">Claim reviewed &amp; verified</span>
                  <span className="font-medium text-black">1-2 business days</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-700">Replacement shipped</span>
                  <span className="font-medium text-black">Within 24 hours of approval</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                Note: One replacement per customer per order. All claims are subject to review and may be denied if
                evidence is insufficient or suspicious activity is detected. Klear Club reserves the right to deny
                replacement requests at its sole discretion.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-gray-50 p-8 text-left">
              <h3 className="mb-3 font-semibold text-black">Important Disclaimer</h3>
              <ul className="list-none space-y-2 p-0 text-sm text-gray-600">
                <li>
                  All products are sold strictly for research purposes. Klear Club is not responsible for any misuse,
                  improper storage, or reconstitution of products.
                </li>
                <li>
                  Replacements are offered as a courtesy for verified transit damage only. We do not offer refunds for
                  change of mind, dissatisfaction, or any reason other than documented damage.
                </li>
                <li>
                  Excessive or suspicious claims may result in account review and denial of future replacements.
                </li>
                <li>By placing an order, you acknowledge and agree to this policy.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <HomeCtaSubscribeSection />
    </div>
  );
}
