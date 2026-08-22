import type { Article } from "@/types/catalog";

export const articles: Article[] = [
  {
    slug: "how-to-read-a-coa",
    title: "How to read a certificate of analysis",
    excerpt:
      "A plain-language walkthrough of HPLC purity, net peptide content, and the assays we publish with every lot.",
    readTime: "6 min",
    category: "Documentation",
    body: [
      "A certificate of analysis is the document that tells a laboratory what was actually measured in a given batch. Klear Club publishes third-party results so purchasing teams can verify identity before a vial is opened.",
      "Start with the lot number. It should match the label on the vial. Then review HPLC purity, which reports the percentage of the target sequence versus residual related substances.",
      "Net peptide content tells you how much actual peptide is in the powder after accounting for salts and residual moisture. Identity testing confirms the sequence, not just a similar-looking compound.",
      "If a result is missing or a lot number does not match, do not use the material. Contact support and we will resolve the documentation before anything ships again.",
    ],
  },
  {
    slug: "storage-and-handling",
    title: "Storage and handling for lyophilized peptides",
    excerpt: "Temperature, light, and reconstitution notes for research teams receiving sealed vials.",
    readTime: "5 min",
    category: "Handling",
    body: [
      "Lyophilized peptides are more stable than solutions, but they are still sensitive to heat, humidity, and repeated freeze-thaw cycles.",
      "Keep unopened vials frozen and away from light. Allow a vial to reach ambient temperature before opening so moisture does not condense on the cake.",
      "Reconstitute only with a solvent specified by your protocol. Aliquot immediately if your design requires multiple time points. Do not return unused solution to the original vial.",
      "These notes are laboratory guidance, not medical instruction. Follow your institution's chemical hygiene plan.",
    ],
  },
  {
    slug: "why-third-party-testing",
    title: "Why every batch is tested off-site",
    excerpt: "The eight assays we require from ISO 17025 laboratories before a peptide is released.",
    readTime: "7 min",
    category: "Quality",
    body: [
      "In-house checks are useful for process control. Independent laboratories are useful for trust. Klear Club does not release a lot until an accredited lab has completed the agreed panel.",
      "The panel covers purity, identity, appearance, net peptide content, heavy metals, sterility screening, endotoxin, and a fentanyl screen. The last item exists because the research-chemical supply chain has to stay boringly clean.",
      "Publishing the full packet means a purchasing officer does not have to take marketing copy at face value. The numbers are the product.",
    ],
  },
  {
    slug: "research-use-boundaries",
    title: "Research use, stated clearly",
    excerpt: "What our catalog is for, and what it is not for. Read this before you place an order.",
    readTime: "4 min",
    category: "Compliance",
    body: [
      "Every product on Klear Club is sold for laboratory and research use only. Nothing in the catalog is a drug, supplement, cosmetic, or veterinary product.",
      "We do not provide dosing advice, reconstitution recipes for personal use, or clinical interpretation. Those questions are outside the purpose of this store.",
      "If your institution needs additional documentation for receiving, email support and we will provide the lot file that matches your order.",
    ],
  },
  {
    slug: "batch-traceability",
    title: "Matching vial labels to published lot records",
    excerpt: "How to verify that the lot on your label corresponds to the certificate in our library.",
    readTime: "5 min",
    category: "Documentation",
    body: [
      "Every vial ships with a lot number printed on the label. That number should match exactly to an entry in the Klear Club certificate library or the COA section on the product page.",
      "If you receive a vial whose lot number is not yet published, email support@klearclub.com with your order number. We will provide the matching certificate before you proceed with your protocol.",
      "Do not use material when the lot documentation is missing, incomplete, or does not match the label.",
    ],
  },
  {
    slug: "receiving-lab-documentation",
    title: "Documentation for institutional receiving teams",
    excerpt: "What purchasing and receiving teams typically need when onboarding a new peptide supplier.",
    readTime: "5 min",
    category: "Compliance",
    body: [
      "Institutional buyers often need a research-use statement, batch-specific COA, and contact information for quality questions. All of this is available on the Klear Club website or by email.",
      "The disclaimer, terms of service, and research-use page describe the intended use boundaries for every product in the catalog.",
      "For vendor packet requests, email support@klearclub.com with your institution name and the compounds you plan to order.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((item) => item.slug === slug);
}
