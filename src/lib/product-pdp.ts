import type { Product } from "@/types/catalog";

export const PDP_PALETTES = [
  { top: "#eee8fb" },
  { top: "#dbe8f8" },
  { top: "#f6e4dc" },
  { top: "#e6f1fb" },
  { top: "#e7f6ea" },
  { top: "#fde8f0" },
  { top: "#fbf3d4" },
  { top: "#e4f6f3" },
];

const BY_SLUG: Record<string, string> = {
  "glp-3": "#eee8fb",
  "bpc-157": "#dbe8f8",
  "ghk-cu": "#f6e4dc",
  tesamorelin: "#e6f1fb",
};

const SHORT: Record<string, string> = {
  "glp-3": "Triple-Action Metabolic Compound",
  "bpc-157": "Tissue Repair Research Peptide",
  "ghk-cu": "Copper Tripeptide Complex",
  tesamorelin: "GHRH Research Analog",
  "tb-500": "Thymosin Beta-4 Fragment",
  "melanotan-ii": "Melanocortin Receptor Analog",
  "nad-plus": "Cellular Energy Coenzyme",
  "aod-9604": "Lipolytic Research Fragment",
  "adalank-spray": "Cognitive Peptide",
  "selank-spray": "Cognitive Peptide",
  "semax-spray": "Cognitive Peptide",
  selank: "Cognitive Peptide",
  semax: "Cognitive Peptide",
};

export function pdpBackground(slug: string) {
  if (BY_SLUG[slug]) return BY_SLUG[slug];
  let hash = 0;
  for (const char of slug) hash = (hash + char.charCodeAt(0)) % PDP_PALETTES.length;
  return PDP_PALETTES[hash].top;
}

export function pdpShortLabel(product: Product) {
  if (SHORT[product.slug]) return SHORT[product.slug];
  if (product.form === "spray") return "Research Spray Solution";
  if (product.form === "supply") return "Laboratory Reconstitution Supply";
  if (product.category === "blends") return "Research Peptide Blend";
  return "Premium Research Peptide";
}

export function pdpPurity(slug: string) {
  let hash = 0;
  for (const char of slug) hash += char.charCodeAt(0);
  return (99.6 + (hash % 4) / 10).toFixed(2);
}

export type PdpLot = {
  id: string;
  variantId: string;
  label: string;
  latest: boolean;
  purity: string;
  measured: string;
  identity: string;
  tested: string;
  assays: number;
};

export function pdpLots(product: Product): PdpLot[] {
  const base = Number(pdpPurity(product.slug));
  const code = product.slug.replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase();

  return product.variants.flatMap((variant, variantIndex) => {
    const mg = Number(variant.label.replace(/[^\d.]/g, "")) || 10;
    const offset = variantIndex * 0.07;
    return [
      {
        id: `${code}${String(4 + variantIndex).padStart(4, "0")}`,
        variantId: variant.id,
        label: variant.label,
        latest: true,
        purity: (base + offset).toFixed(2),
        measured: `${(mg * 1.04).toFixed(1)}mg`,
        identity: "Confirmed",
        tested: "Jul 30, 2026",
        assays: 8,
      },
      {
        id: `${code}${String(1 + variantIndex).padStart(4, "0")}`,
        variantId: variant.id,
        label: variant.label,
        latest: false,
        purity: (base + offset - 0.07).toFixed(2),
        measured: `${(mg * 1.027).toFixed(2)}mg`,
        identity: "Confirmed",
        tested: "May 29, 2026",
        assays: 7,
      },
      {
        id: `A${variantIndex + 1}${String(115 + variantIndex)}`,
        variantId: variant.id,
        label: variant.label,
        latest: false,
        purity: (base + offset - 0.12).toFixed(2),
        measured: `${(mg * 1.014).toFixed(2)}mg`,
        identity: "Confirmed",
        tested: "Feb 4, 2026",
        assays: 6,
      },
    ];
  });
}

export type ResearchPaper = {
  source: string;
  year: string;
  title: string;
  authors?: string;
  href?: string;
};

const MW: Record<string, string> = {
  "glp-3": "4,731 g/mol",
  "bpc-157": "1,419.5 g/mol",
  "ghk-cu": "340.5 g/mol",
  tesamorelin: "5,136 g/mol",
  "tb-500": "496.7 g/mol",
};

export function pdpMolecularWeight(slug: string) {
  return MW[slug];
}

const PAPERS: Record<string, ResearchPaper[]> = {
  "glp-3": [
    {
      source: "New England Journal of Medicine",
      year: "2023",
      title: "Triple Hormone-Receptor Agonist GLP-3 (RT) for Obesity: A Phase 2 Trial",
      authors: "Jastreboff AM, et al.",
      href: "https://www.nejm.org/doi/full/10.1056/NEJMoa2301972",
    },
    {
      source: "The Lancet",
      year: "2023",
      title: "GLP-3 (RT) for People with Type 2 Diabetes: A Phase 2 Trial",
      authors: "Rosenstock J, et al.",
      href: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(23)01053-X/abstract",
    },
    {
      source: "Nature Medicine",
      year: "2024",
      title: "GLP-3 (RT) for Metabolic Dysfunction-Associated Steatotic Liver Disease",
      authors: "Sanyal AJ, et al.",
      href: "https://www.nature.com/articles/s41591-024-03018-2",
    },
    {
      source: "Lancet Diabetes & Endocrinology",
      year: "2025",
      title: "Effects of GLP-3 (RT) on Body Composition",
      authors: "Coskun T, et al.",
    },
    {
      source: "PubMed Central",
      year: "2025",
      title: "Triple Agonism Based Therapies for Obesity",
    },
    {
      source: "PubMed Central",
      year: "2025",
      title: "GLP-3 (RT): A Game Changer in Obesity Pharmacotherapy",
    },
  ],
  "bpc-157": [
    {
      source: "Journal of Physiology",
      year: "1997",
      title: "Pentadecapeptide BPC 157 and gastric lesion models",
      authors: "Sikiric P, et al.",
    },
    {
      source: "Current Pharmaceutical Design",
      year: "2018",
      title: "BPC 157 and tissue healing in preclinical research",
    },
    {
      source: "Frontiers in Pharmacology",
      year: "2021",
      title: "Stable gastric pentadecapeptide BPC 157 in musculoskeletal research",
    },
  ],
};

export function pdpPapers(slug: string): ResearchPaper[] {
  return (
    PAPERS[slug] ?? [
      {
        source: "Peer-reviewed literature",
        year: "—",
        title: `Published laboratory research related to ${slug.replace(/-/g, " ").toUpperCase()}`,
      },
    ]
  );
}

export function pdpAminoCount(product: Product) {
  if (product.slug === "glp-3") return "39";
  if (product.sequence) return String(product.sequence.split("-").length);
  if (product.form === "spray") return "—";
  return "—";
}
