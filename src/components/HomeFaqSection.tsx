"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "What purity level are your peptides and how is it verified?",
    a: "Every lot is released at 99%+ identity purity. Independent ISO 17025 laboratories run HPLC and the rest of our eight-assay panel before a batch ships. The COA for that lot is published with the catalog entry.",
  },
  {
    q: "What is a Certificate of Analysis (CoA) and how do I read it?",
    a: "A COA is the third-party lab report for a specific lot: identity, purity, net peptide content, and related screens. Match the lot number on the vial to the document. Full files live on the COAs page.",
  },
  {
    q: "What is Klear H2O?",
    a: "Klear H2O is our research-grade sterile water supplied for laboratory reconstitution and handling. It is not for human or veterinary use. Storage and handling notes are on the product page.",
  },
  {
    q: "How should I store the lyophilized product?",
    a: "Keep lyophilized peptides frozen, dry, and protected from light until use. Follow the storage range on the lot COA and the product page. Do not use these materials outside a laboratory setting.",
  },
  {
    q: "How long is the lyophilized product stable?",
    a: "Unopened, nitrogen-sealed lyophilized vials remain within spec through the dating on the lot documentation when stored as directed. Once reconstituted, follow the handling notes for that compound — stability is not the same as the dry form.",
  },
  {
    q: "How fast do you ship and is cold shipping required?",
    a: "Most U.S. research orders leave within 0–2 business days. Overnight is available at checkout. Cold-pack options keep peptides stable in transit; tracking is sent when the carrier scans the parcel.",
  },
  {
    q: "What is Klear Club and why should I trust you?",
    a: "Klear Club is a U.S.-based research supply catalog. Every lot is third-party tested, ships with a COA, and is sold strictly for laboratory use. Documentation is published with the batch — you do not have to take a marketing claim on faith.",
  },
  {
    q: "Are these peptides for human use?",
    a: "No. Everything on Klear Club is sold strictly for laboratory and in-vitro research. Products are not medicines, supplements, or cosmetics, and they are not for human, veterinary, or food use.",
  },
  {
    q: "What is your return and refund policy?",
    a: "Unopened vials in original condition may be reviewed for return within 14 days of delivery. Opened or reconstituted products cannot be restocked. Transit damage with photo evidence is replaced at no cost — see the returns page for the full process.",
  },
  {
    q: "How can I contact Klear Club support?",
    a: "Email support@klearclub.com or use the contact page. Include your order number and lot if you have one. Receiving teams that need a vendor packet can request it in the same thread.",
  },
];

export function HomeFaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="home-section-y bg-white px-5 font-sans sm:px-8">
      <div className="mx-auto w-full max-w-[860px]">
        <h2 className="text-center text-[28px] font-bold tracking-[-0.03em] text-[#111111] sm:text-[34px]">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-center text-[15px] text-[#6b6b6b]">
          Everything you need to know about peptide research
        </p>

        <div className="mt-10 overflow-hidden rounded-[16px] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08),0_2px_10px_rgba(15,23,42,0.04)]">
          {ITEMS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className={index < ITEMS.length - 1 ? "border-b border-[#ededed]" : ""}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7 sm:py-[22px]"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-bold leading-[1.4] text-black sm:text-[16px]">{item.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3f3f3] text-[#555555]">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M2.2 4.2L6 8l3.8-3.8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                {isOpen ? (
                  <p className="px-6 pb-5 text-[14px] leading-[1.7] text-[#5c5c5c] sm:px-7">{item.a}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
