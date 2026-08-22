"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";
import { cn } from "@/lib/cn";

const FAQ = [
  {
    id: "response-time",
    q: "How quickly will I receive a response?",
    a: "We typically respond to all email inquiries within 24 hours on business days (Monday-Friday, 9am-6pm EST). For urgent order issues, please include your order number in the subject line for priority handling.",
  },
  {
    id: "order-status",
    q: "How can I track my order?",
    a: "Once your order ships, you'll receive a confirmation email with tracking information. You can also check your order status by emailing support@klearclub.com with your order number. Orders are processed within 0-2 business days, with most arriving within 1-4 business days from fulfillment. Every order includes free shipment protection.",
  },
  {
    id: "wrong-item",
    q: "I received the wrong item or my order is damaged. What should I do?",
    a: "We're sorry to hear that! Please email support@klearclub.com immediately with your order number and photos of the damage. Photo evidence is required for all claims. Once verified, we'll send a one-time replacement within 24 hours at no cost. One replacement per customer per order, subject to review.",
  },
  {
    id: "quality",
    q: "How can I verify the quality of my order?",
    a: "Every order includes a batch-specific Certificate of Analysis (CoA) verifying purity, identity, and quality. You can also access CoAs on each product page. If you have questions about a specific CoA or need additional documentation, our support team is happy to help at support@klearclub.com.",
  },
  {
    id: "bulk",
    q: "Do you offer bulk or wholesale pricing?",
    a: "Yes. Our self-serve bulk program at /bulk gives you 40% off 10+ units of a product and 50% off 50+ units, as a one-time purchase with free 2-day signed delivery (adult signature required). For quantities beyond that or custom requests, email support@klearclub.com and we'll put together a quote.",
  },
  {
    id: "recommend",
    q: "Can you recommend products for my research?",
    a: "While we cannot provide medical or therapeutic advice, our team can help you understand the specifications, purity levels, and research applications of our peptides. Email us with details about your research focus, and we'll point you toward relevant product information and published studies.",
  },
  {
    id: "coa",
    q: "How do I get a Certificate of Analysis (CoA) for my order?",
    a: "Every order includes access to batch-specific Certificates of Analysis. CoAs are available on each product page and in our full CoA library at /coa, and you can scan the QR code on your vial to open the CoA for its exact batch. If you need a specific CoA or have questions about lab results, email us with your order number and we'll send it right over.",
  },
  {
    id: "payment",
    q: "My payment was declined. What should I do?",
    a: "Payment declines can occur for several reasons. First, ensure your billing address matches your card exactly. If issues persist, try a different payment method or contact your bank to authorize the transaction. You can also email us and we'll help troubleshoot or provide alternative payment options.",
  },
];

const VIALS = [
  {
    src: "/hero/tb.png",
    alt: "TB-500 Peptide vial",
    className:
      "left-[5%] top-[15%] z-0 w-[15%] lg:left-[8%] lg:w-[12%] animate-float-slow",
    rotate: "-8deg",
  },
  {
    src: "/hero/bpc.png",
    alt: "BPC-157 Peptide vial",
    className: "right-[8%] top-[10%] z-10 w-[18%] lg:right-[12%] lg:w-[14%] animate-float",
    rotate: "12deg",
  },
  {
    src: "/hero/h2o.png",
    alt: "Klear H2O",
    className:
      "bottom-[5%] left-[15%] z-0 w-[20%] lg:bottom-[10%] lg:left-[20%] lg:w-[16%] animate-float-delayed",
    rotate: "-5deg",
  },
  {
    src: "/hero/tb.png",
    alt: "TB-500 Peptide vial",
    className: "right-[5%] bottom-[15%] z-0 w-[14%] lg:right-[8%] lg:w-[10%] animate-float-slow",
    rotate: "15deg",
  },
] as const;

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export function ContactSupport() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="relative w-full min-h-[60vh] overflow-hidden lg:min-h-[70vh]"
        aria-label="Contact Klear Club"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(232, 229, 255, 0.6) 0%, rgba(203, 229, 252, 0.6) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {VIALS.map((vial, index) => (
            <div
              key={`${vial.src}-${index}`}
              className={cn(
                "pointer-events-none absolute aspect-[1/1.5] select-none",
                vial.className,
              )}
            >
              <div className="relative h-full w-full" style={{ transform: `rotate(${vial.rotate})` }}>
                <Image src={vial.src} alt={vial.alt} fill unoptimized className="object-contain drop-shadow-lg" sizes="160px" />
              </div>
            </div>
          ))}
        </div>

        <div className="site-container relative z-20 flex h-full min-h-[60vh] items-center justify-center lg:min-h-[70vh]">
          <div className="mx-auto max-w-3xl py-16 text-center lg:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-sm font-medium text-gray-700">Typically respond within 24 hours</span>
            </div>
            <h1 className="mb-4 text-4xl leading-[1.05] font-semibold tracking-tight text-black sm:text-5xl lg:mb-6 lg:text-6xl xl:text-7xl">
              How can we help?
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-black/70 sm:text-xl lg:text-2xl">
              Our research support team is here to assist with orders, product questions, order support, and more.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:support@klearclub.com"
                className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-black px-8 text-base font-medium text-white transition-all hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 lg:h-14"
              >
                <MailIcon className="h-5 w-5" />
                Email Us
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg className="h-6 w-6 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Track order */}
      <section className="border-b border-gray-100 bg-white">
        <div className="site-container">
          <div className="mx-auto max-w-3xl py-6">
            <a
              href="mailto:support@klearclub.com?subject=Track%20my%20order"
              className="group flex items-center gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="mb-0.5 text-base font-semibold text-black">Looking for your order?</h3>
                <p className="text-sm text-gray-600">
                  Track your order status, shipping updates, and tracking number — no account needed.
                </p>
              </div>
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-400 transition-colors group-hover:text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Support FAQ */}
      <section className="bg-gray-50 py-16 lg:py-24" aria-labelledby="contact-faq-heading">
        <div className="site-container">
          <div className="mb-10 text-center lg:mb-14">
            <h2 id="contact-faq-heading" className="mb-4 text-3xl font-semibold text-black md:text-4xl">
              Support FAQ
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#4a5568]">Quick answers to common questions</p>
          </div>

          <div className="mx-auto max-w-3xl">
            {FAQ.map((item) => {
              const open = openFaq === item.id;
              return (
                <article key={item.id} className="mb-3 overflow-hidden rounded-2xl bg-white shadow-sm">
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between px-6 py-5 text-left"
                    aria-expanded={open}
                    aria-controls={`contact-faq-answer-${item.id}`}
                    onClick={() => setOpenFaq(open ? null : item.id)}
                  >
                    <h3 className="pr-4 text-base font-semibold text-black transition-colors group-hover:text-black/70 lg:text-lg">
                      {item.q}
                    </h3>
                    <span
                      className={cn(
                        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300",
                        open ? "bg-black text-white" : "bg-gray-100 group-hover:bg-gray-200",
                      )}
                      aria-hidden="true"
                    >
                      <svg
                        className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`contact-faq-answer-${item.id}`}
                    role="region"
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-out",
                      open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-sm leading-relaxed text-gray-600 lg:text-base">
                        {item.a.includes("/bulk") ? (
                          <>
                            Yes. Our self-serve bulk program at{" "}
                            <Link href="/bulk" className="underline underline-offset-2 hover:text-black">
                              /bulk
                            </Link>{" "}
                            gives you 40% off 10+ units of a product and 50% off 50+ units, as a one-time purchase with
                            free 2-day signed delivery (adult signature required). For quantities beyond that or custom
                            requests, email{" "}
                            <a href="mailto:support@klearclub.com" className="underline underline-offset-2 hover:text-black">
                              support@klearclub.com
                            </a>{" "}
                            and we&apos;ll put together a quote.
                          </>
                        ) : item.a.includes("/coa") ? (
                          <>
                            Every order includes access to batch-specific Certificates of Analysis. CoAs are available on
                            each product page and in our full CoA library at{" "}
                            <Link href="/coa" className="underline underline-offset-2 hover:text-black">
                              /coa
                            </Link>
                            , and you can scan the QR code on your vial to open the CoA for its exact batch. If you need
                            a specific CoA or have questions about lab results, email us with your order number and
                            we&apos;ll send it right over.
                          </>
                        ) : (
                          item.a
                        )}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-sm lg:mt-12 lg:p-10">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-black lg:text-2xl">Still have questions?</h3>
              <p className="mb-6 text-gray-600">
                Can&apos;t find what you&apos;re looking for? Our support team is ready to help with any questions about
                your research needs.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="mailto:support@klearclub.com"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-6 font-medium text-white transition-colors hover:bg-black/90"
                >
                  <MailIcon className="h-5 w-5" />
                  Email Support
                </a>
              </div>
            </div>
          </div>

          <div className="sr-only">
            <h2>Klear Club Contact and Support Information</h2>
            <p>
              Contact Klear Club for peptide research support. Email support@klearclub.com for order inquiries, product
              questions, and quality verification. We respond within 24 hours on business days.
            </p>
          </div>
        </div>
      </section>

      <HomeCtaSubscribeSection />
    </div>
  );
}
