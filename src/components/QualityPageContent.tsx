import Link from "next/link";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";

const DIFFERENCE = [
  {
    title: "USA-Based Operations",
    body: "Klear Club handles sourcing coordination, quality documentation, customer support, and shipping from United States operations.",
  },
  {
    title: "Qualified Manufacturing Partners",
    body: "Every peptide is produced by qualified manufacturing partners under documented quality procedures, then independently verified batch by batch.",
  },
  {
    title: "Third-Party Testing",
    body: "Every batch is 8x tested by ISO 17025 accredited laboratories before release. Full Certificates of Analysis are published for transparency.",
  },
  {
    title: "99%+ Purity Standard",
    body: "If a batch does not meet our internal purity specification, it is not released to the catalog. No exceptions.",
  },
];

const ASSAYS = [
  { num: "01", name: "Purity (HPLC)", detail: "Reverse-phase HPLC confirms the target peptide meets our 99%+ release standard." },
  { num: "02", name: "Net peptide content", detail: "Quantifies actual milligrams of peptide against the label claim." },
  { num: "03", name: "Identity", detail: "Retention-time match against a certified reference standard." },
  { num: "04", name: "Appearance", detail: "Visual inspection of lyophilized cake or solution before release." },
  { num: "05", name: "Fentanyl screen", detail: "Immunoassay screen on every batch for supply-chain safety." },
  { num: "06", name: "Heavy metals (ICP-MS)", detail: "Arsenic, cadmium, lead, mercury, and chromium quantified by mass spectrometry." },
  { num: "07", name: "Sterility (PCR)", detail: "PCR-based microbial detection verifies no bacterial or fungal growth." },
  { num: "08", name: "Endotoxin", detail: "Bacterial endotoxin quantified and reported on every certificate." },
];

const PROCESS = [
  {
    step: "01",
    title: "Raw Material Verification",
    body: "Manufacturing partners verify all raw materials before synthesis begins.",
  },
  {
    step: "02",
    title: "Controlled Synthesis",
    body: "Partner facilities run cleanroom manufacturing with documented procedures.",
  },
  {
    step: "03",
    title: "HPLC Purification",
    body: "Multiple purification passes at partner facilities before third-party release testing.",
  },
  {
    step: "04",
    title: "Independent 8-Assay Testing",
    body: "ISO 17025 accredited laboratory verification on every production batch.",
  },
  {
    step: "05",
    title: "COA Documentation",
    body: "Full test results published with the lot in our certificate library.",
  },
  {
    step: "06",
    title: "Sealed Packaging",
    body: "Lyophilized peptides ship nitrogen-sealed. Proper storage instructions included.",
  },
];

const COMMITMENTS = [
  {
    title: "Qualified Sourcing",
    body: "We work only with manufacturing partners that maintain documented quality procedures.",
  },
  {
    title: "Batch Traceability",
    body: "Every vial label carries a lot number that maps to a published Certificate of Analysis.",
  },
  {
    title: "Continuous Improvement",
    body: "Testing panels and release criteria are reviewed as standards evolve.",
  },
  {
    title: "Transparent Communication",
    body: "Purchasing teams can request lot files and supporting documentation by email.",
  },
];

export function QualityPageContent() {
  return (
    <div className="bg-white">
      <section className="border-b border-[#f0f0f0] bg-[#fafafa] py-14 sm:py-20">
        <div className="site-container max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#9a9a9a]">Quality assurance</p>
          <h1 className="mt-3 text-[36px] font-bold leading-[1.08] tracking-[-0.03em] text-black sm:text-[44px]">
            Our quality commitment
          </h1>
          <p className="mt-5 text-[16px] leading-[1.65] text-[#555]">
            Every batch is independently tested before it ships. If a lot misses our specification, it is not released to
            the catalog. We publish the full Certificate of Analysis so your lab can verify identity before opening a
            vial.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="site-container">
          <h2 className="text-[24px] font-bold tracking-[-0.02em] text-black sm:text-[28px]">The Klear Club difference</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {DIFFERENCE.map((item) => (
              <article key={item.title} className="rounded-[20px] border border-[#ececec] bg-white p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
                <h3 className="text-[17px] font-bold text-black">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#666]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fafafa] py-14 sm:py-16">
        <div className="site-container">
          <h2 className="text-[24px] font-bold tracking-[-0.02em] text-black sm:text-[28px]">Eight assays. Every batch.</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-[1.6] text-[#666]">
            The full panel runs at an independent ISO 17025 accredited laboratory. Results appear on every Certificate of
            Analysis.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ASSAYS.map((assay) => (
              <article key={assay.num} className="rounded-[16px] border border-[#ececec] bg-white p-5">
                <span className="text-[11px] font-semibold tracking-[0.12em] text-[#9a9a9a]">{assay.num}</span>
                <h3 className="mt-2 text-[15px] font-bold text-black">{assay.name}</h3>
                <p className="mt-2 text-[13px] leading-[1.55] text-[#666]">{assay.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="site-container">
          <h2 className="text-[24px] font-bold tracking-[-0.02em] text-black sm:text-[28px]">Our quality process</h2>
          <ol className="mt-8 space-y-0 divide-y divide-[#ececec] rounded-[20px] border border-[#ececec] bg-white">
            {PROCESS.map((step) => (
              <li key={step.step} className="flex gap-5 px-6 py-5 sm:px-8">
                <span className="shrink-0 text-[13px] font-bold tabular-nums text-[#9a9a9a]">{step.step}</span>
                <div>
                  <h3 className="text-[16px] font-bold text-black">{step.title}</h3>
                  <p className="mt-1 text-[14px] leading-[1.6] text-[#666]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#fafafa] py-14 sm:py-16">
        <div className="site-container">
          <h2 className="text-[24px] font-bold tracking-[-0.02em] text-black sm:text-[28px]">Our commitments to you</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {COMMITMENTS.map((item) => (
              <article key={item.title} className="rounded-[16px] border border-[#ececec] bg-white p-6">
                <h3 className="text-[16px] font-bold text-black">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#666]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="site-container">
          <div className="rounded-[24px] bg-[#0a1930] px-8 py-10 text-center text-white sm:px-12 sm:py-14">
            <h2 className="text-[24px] font-bold sm:text-[28px]">See our quality in action</h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-[1.6] text-[#9aa8b5]">
              Browse the full certificate library or open any product page to view lot-specific test results.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/coa"
                className="inline-flex h-11 items-center rounded-full bg-white px-6 text-[14px] font-medium text-black no-underline"
              >
                Certificate library
              </Link>
              <Link
                href="/store"
                className="inline-flex h-11 items-center rounded-full border border-white/30 px-6 text-[14px] font-medium text-white no-underline hover:bg-white/10"
              >
                Shop catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeCtaSubscribeSection />
    </div>
  );
}
