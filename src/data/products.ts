import type { Product, ProductVariant } from "@/types/catalog";

function variant(sku: string, label: string, price: number): ProductVariant {
  return { id: sku, sku, label, price };
}

const STORAGE_VIAL =
  "Keep lyophilized vials frozen and protected from light. Reconstitute only for laboratory protocols. Do not freeze-thaw repeatedly.";

const STORAGE_SPRAY =
  "Store upright in a cool, dark place. Do not expose research solutions to heat or direct sunlight.";

const STORAGE_WATER =
  "Store sealed at room temperature away from light. Discard according to laboratory protocol after opening.";

export const products: Product[] = [
  {
    slug: "glp-3",
    name: "GLP-3 (RT)",
    alsoKnownAs: ["LY3437943", "GLP-3"],
    tagline:
      "A 39-amino acid triple agonist studied for metabolic signaling in controlled research settings.",
    description:
      "GLP-3 (RT) is supplied as a lyophilized research peptide for laboratory investigation of GIP, GLP-1, and glucagon receptor pathways. Each batch is independently assayed and ships with a certificate of analysis.",
    category: "peptides",
    form: "vial",
    featured: true,
    cas: "2381089-83-2",
    storage: STORAGE_VIAL,
    variants: [
      variant("GLP3-10", "10mg", 69.99),
      variant("GLP3-20", "20mg", 134.99),
      variant("GLP3-30", "30mg", 199.99),
    ],
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    alsoKnownAs: ["Body Protection Compound-157", "PL-14736", "Bepecin"],
    tagline:
      "A 15-amino acid gastric-derived sequence used in tissue and cellular research models.",
    description:
      "BPC-157 is a synthetic pentadecapeptide provided for in-vitro and preclinical laboratory work. Klear Club vials are nitrogen-sealed and verified for identity and purity before release.",
    category: "peptides",
    form: "vial",
    featured: true,
    cas: "137525-51-0",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    storage: STORAGE_VIAL,
    variants: [variant("BPC157-5", "5mg", 39.99), variant("BPC157-10", "10mg", 69.99)],
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    alsoKnownAs: ["Copper Tripeptide-1", "Glycyl-L-histidyl-L-lysine Copper"],
    tagline:
      "A copper-binding tripeptide studied for extracellular matrix and remodeling assays.",
    description:
      "GHK-Cu is supplied for laboratory research into copper peptide signaling, collagen-related pathways, and tissue remodeling models. Appearance and identity are confirmed on every lot.",
    category: "peptides",
    form: "vial",
    featured: true,
    cas: "89030-95-5",
    storage: STORAGE_VIAL,
    variants: [variant("GHKCU-50", "50mg", 29.99), variant("GHKCU-100", "100mg", 49.99)],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    alsoKnownAs: ["EGRIFTA", "TH9507"],
    tagline:
      "A 44-amino acid GHRH analog investigated for pituitary signaling research.",
    description:
      "Tesamorelin is offered strictly for laboratory use. Each vial is HPLC-verified and accompanied by third-party documentation for identity and net peptide content.",
    category: "peptides",
    form: "vial",
    featured: true,
    cas: "218949-48-5",
    storage: STORAGE_VIAL,
    variants: [variant("TESA-5", "5mg", 69.99), variant("TESA-10", "10mg", 119.99)],
  },
  {
    slug: "tb-500",
    name: "TB-500",
    alsoKnownAs: ["Thymosin Beta-4 fragment", "Tβ4", "TB4"],
    tagline:
      "A synthetic thymosin fragment used in cell-migration and actin-related research.",
    description:
      "TB-500 is manufactured for research laboratories studying cytoskeletal dynamics and cell motility. Lots are screened for purity, identity, and residual contaminants before release.",
    category: "peptides",
    form: "vial",
    featured: true,
    cas: "77591-33-4",
    storage: STORAGE_VIAL,
    variants: [variant("TB500-5", "5mg", 39.99), variant("TB500-10", "10mg", 69.99)],
  },
  {
    slug: "melanotan-ii",
    name: "Melanotan II",
    alsoKnownAs: ["MT-II", "MT-2", "Melanotan 2"],
    tagline:
      "A cyclic α-MSH analog for melanocortin receptor research.",
    description:
      "Melanotan II is supplied as a lyophilized peptide for receptor-binding and pigmentation pathway studies. Not intended for human or veterinary use.",
    category: "peptides",
    form: "vial",
    featured: true,
    cas: "121062-08-6",
    storage: STORAGE_VIAL,
    variants: [variant("MT2-10", "10mg", 29.95)],
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    alsoKnownAs: ["Nicotinamide Adenine Dinucleotide", "Coenzyme I", "Beta-NAD"],
    tagline:
      "A dinucleotide cofactor used in cellular energy and sirtuin research.",
    description:
      "NAD+ is packaged for laboratory assays involving redox chemistry and mitochondrial function. Each lot includes a published certificate of analysis.",
    category: "peptides",
    form: "vial",
    featured: true,
    cas: "53-84-9",
    storage: STORAGE_VIAL,
    variants: [variant("NAD-100", "100mg", 69.99), variant("NAD-500", "500mg", 149.99)],
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    alsoKnownAs: ["hGH Fragment 177-191", "Tyr-hGH177-191"],
    tagline:
      "A modified hGH fragment studied in lipid-metabolism research models.",
    description:
      "AOD-9604 is provided for preclinical investigation of lipolytic signaling. Identity, purity, and appearance are verified before shipment.",
    category: "peptides",
    form: "vial",
    cas: "221231-10-3",
    storage: STORAGE_VIAL,
    variants: [variant("AOD-5", "5mg", 49.99), variant("AOD-10", "10mg", 84.99)],
  },
  {
    slug: "mots-c",
    name: "MOTS-C",
    alsoKnownAs: ["Mitochondrial ORF of the 12S rRNA type-c"],
    tagline:
      "A mitochondrial-encoded peptide used in metabolic research.",
    description:
      "MOTS-C is supplied for laboratory study of mitochondrial signaling and exercise-related metabolic pathways in research models.",
    category: "peptides",
    form: "vial",
    cas: "1627580-64-6",
    storage: STORAGE_VIAL,
    variants: [variant("MOTSC-10", "10mg", 39.99)],
  },
  {
    slug: "cjc-ipa-no-dac",
    name: "CJC-1295 / Ipamorelin",
    alsoKnownAs: ["Mod GRF 1-29 + Ipamorelin", "CJC/Ipa Blend"],
    tagline:
      "A dual GHRH and ghrelin-receptor research blend without DAC.",
    description:
      "This no-DAC blend is prepared for laboratories examining coordinated growth-hormone secretagogue signaling. Each component ratio is documented on the COA.",
    category: "blends",
    form: "vial",
    featured: true,
    storage: STORAGE_VIAL,
    variants: [
      variant("CJCIPA-55", "5mg / 5mg", 59.99),
      variant("CJCIPA-1010", "10mg / 10mg", 99.99),
    ],
  },
  {
    slug: "wolverine-stack",
    name: "BPC-157 / TB-500",
    alsoKnownAs: ["Wolverine Blend", "BPC + TB4"],
    tagline:
      "A dual regenerative-research stack for complementary cellular assays.",
    description:
      "The BPC-157 / TB-500 blend is intended for laboratories studying overlapping repair and migration pathways. Supplied lyophilized with full lot documentation.",
    category: "blends",
    form: "vial",
    featured: true,
    storage: STORAGE_VIAL,
    variants: [
      variant("WOLF-55", "5mg / 5mg", 79.99),
      variant("WOLF-1010", "10mg / 10mg", 139.99),
    ],
  },
  {
    slug: "glow",
    name: "GLOW",
    alsoKnownAs: ["BPC-157 / TB-500 / GHK-Cu", "Triple Regenerative Stack"],
    tagline:
      "A three-peptide combination for matrix and angiogenic research models.",
    description:
      "GLOW combines BPC-157, TB-500, and GHK-Cu in a single research vial. Designed for labs that prefer a documented triad rather than separate reconstitutions.",
    category: "blends",
    form: "vial",
    featured: true,
    storage: STORAGE_VIAL,
    variants: [variant("GLOW-1", "Standard", 89.99)],
  },
  {
    slug: "dsip",
    name: "DSIP",
    alsoKnownAs: ["Delta-Sleep Peptide", "Emideltide"],
    tagline: "A nonapeptide investigated in sleep-architecture research.",
    description:
      "DSIP is offered for laboratory protocols exploring neuropeptide signaling. Each vial is identity-confirmed and purity-tested.",
    category: "peptides",
    form: "vial",
    cas: "62568-57-4",
    storage: STORAGE_VIAL,
    variants: [variant("DSIP-5", "5mg", 29.99)],
  },
  {
    slug: "semax",
    name: "SEMAX",
    alsoKnownAs: ["ACTH 4-10 analog"],
    tagline: "A heptapeptide analog used in cognitive and neurochemistry research.",
    description:
      "SEMAX is supplied as a lyophilized research material. Intended only for qualified laboratory use with accompanying analytical data.",
    category: "peptides",
    form: "vial",
    cas: "80714-61-0",
    storage: STORAGE_VIAL,
    variants: [variant("SEMAX-10", "10mg", 29.95)],
  },
  {
    slug: "selank",
    name: "SELANK",
    alsoKnownAs: ["TP-7", "Thr-Lys-Pro-Arg-Pro-Gly-Pro"],
    tagline: "A tuftsin-derived heptapeptide for neurological research models.",
    description:
      "SELANK is packaged for in-vitro and preclinical laboratories. Third-party identity testing is completed on every batch.",
    category: "peptides",
    form: "vial",
    cas: "129954-34-3",
    storage: STORAGE_VIAL,
    variants: [variant("SELANK-10", "10mg", 29.95)],
  },
  {
    slug: "klow",
    name: "KLOW",
    alsoKnownAs: ["GLOW + KPV", "Quad Regenerative Stack"],
    tagline:
      "A four-peptide research stack combining GLOW constituents with KPV.",
    description:
      "KLOW is prepared for laboratories evaluating multi-pathway regenerative and inflammatory-signaling models in a single documented blend.",
    category: "blends",
    form: "vial",
    storage: STORAGE_VIAL,
    variants: [variant("KLOW-1", "Standard", 99.99)],
  },
  {
    slug: "kpv",
    name: "KPV",
    alsoKnownAs: ["Lysine-Proline-Valine", "α-MSH (11-13)"],
    tagline: "A tripeptide fragment studied in inflammatory-pathway assays.",
    description:
      "KPV is supplied for research into melanocortin-related signaling. Vials are sealed under nitrogen and released only after purity checks.",
    category: "peptides",
    form: "vial",
    cas: "67727-97-3",
    storage: STORAGE_VIAL,
    variants: [variant("KPV-10", "10mg", 39.99)],
  },
  {
    slug: "pt-141",
    name: "PT-141",
    alsoKnownAs: ["Bremelanotide", "Vyleesi"],
    tagline: "A cyclic melanocortin agonist for receptor research.",
    description:
      "PT-141 is provided exclusively for laboratory investigation of melanocortin receptors. Not for clinical, veterinary, or household use.",
    category: "peptides",
    form: "vial",
    cas: "189691-06-3",
    storage: STORAGE_VIAL,
    variants: [variant("PT141-10", "10mg", 29.99)],
  },
  {
    slug: "glutathione",
    name: "Glutathione",
    alsoKnownAs: ["GSH", "L-Glutathione", "Reduced Glutathione"],
    tagline: "A tripeptide cofactor used in oxidative-stress research.",
    description:
      "Reduced glutathione is offered for redox and detoxification-pathway studies in controlled laboratory environments.",
    category: "peptides",
    form: "vial",
    cas: "70-18-8",
    storage: STORAGE_VIAL,
    variants: [variant("GSH-600", "600mg", 59.99)],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    alsoKnownAs: ["NNC 26-0161"],
    tagline: "A selective ghrelin-receptor pentapeptide for GH-axis research.",
    description:
      "Ipamorelin is lyophilized for laboratories studying ghrelin receptor selectivity. Each lot includes HPLC and identity documentation.",
    category: "peptides",
    form: "vial",
    cas: "170851-70-4",
    storage: STORAGE_VIAL,
    variants: [variant("IPA-5", "5mg", 49.99), variant("IPA-10", "10mg", 79.99)],
  },
  {
    slug: "igf-1-lr3",
    name: "IGF-1 LR3",
    alsoKnownAs: ["Long R3 IGF-1", "LR3-IGF-1"],
    tagline: "A long-acting IGF analog for growth-factor research.",
    description:
      "IGF-1 LR3 is supplied for cell-culture and receptor-binding work. Handle according to institutional biosafety procedures.",
    category: "peptides",
    form: "vial",
    cas: "143045-27-6",
    storage: STORAGE_VIAL,
    variants: [variant("IGF1LR3-1", "1mg", 69.99)],
  },
  {
    slug: "klear-h2o",
    name: "Klear H2O",
    alsoKnownAs: ["Research reconstitution water"],
    tagline: "Sterile research water for laboratory reconstitution protocols.",
    description:
      "Klear H2O is a laboratory reconstitution solvent supplied in sealed vials. Use only under documented research procedures.",
    category: "supplies",
    form: "supply",
    storage: STORAGE_WATER,
    variants: [variant("H2O-10", "10ml", 19.99), variant("H2O-30", "30ml", 29.99)],
  },
  {
    slug: "cagrilintide",
    name: "Cagrilintide",
    alsoKnownAs: ["NN9838", "ZP8396"],
    tagline: "A long-acting amylin analog for metabolic research.",
    description:
      "Cagrilintide is packaged for laboratories investigating amylin receptor pharmacology. Third-party assays accompany every shipment.",
    category: "peptides",
    form: "vial",
    cas: "1415456-99-3",
    storage: STORAGE_VIAL,
    variants: [variant("CAGRI-5", "5mg", 69.99)],
  },
  {
    slug: "epithalon",
    name: "Epithalon",
    alsoKnownAs: ["Epitalon", "AEDG Peptide"],
    tagline: "A tetrapeptide studied in telomere and pineal research models.",
    description:
      "Epithalon is supplied lyophilized for qualified research use. Purity and identity are confirmed prior to release.",
    category: "peptides",
    form: "vial",
    cas: "307297-39-8",
    storage: STORAGE_VIAL,
    variants: [variant("EPI-10", "10mg", 29.99)],
  },
  {
    slug: "5-amino-1mq",
    name: "5-Amino-1MQ",
    alsoKnownAs: ["5A1MQ", "NNMTi"],
    tagline: "A small-molecule NNMT inhibitor for metabolic research.",
    description:
      "5-Amino-1MQ is provided to research institutions studying nicotinamide N-methyltransferase pathways.",
    category: "peptides",
    form: "vial",
    cas: "42464-96-0",
    storage: STORAGE_VIAL,
    variants: [variant("5A1MQ-50", "50mg", 49.99)],
  },
  {
    slug: "melanotan-i",
    name: "Melanotan I",
    alsoKnownAs: ["MT-1", "Afamelanotide analog (research)"],
    tagline: "A linear α-MSH analog for pigmentation-pathway research.",
    description:
      "Melanotan I is intended solely for laboratory investigation. Documentation for each lot is available from the product page.",
    category: "peptides",
    form: "vial",
    cas: "75921-69-6",
    storage: STORAGE_VIAL,
    variants: [variant("MT1-10", "10mg", 29.95)],
  },
  {
    slug: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    alsoKnownAs: ["Thymalfasin"],
    tagline: "A 28-amino acid thymic peptide for immune-signaling research.",
    description:
      "Thymosin Alpha-1 is lyophilized for laboratories studying T-cell related signaling in experimental systems.",
    category: "peptides",
    form: "vial",
    cas: "62304-98-7",
    storage: STORAGE_VIAL,
    variants: [variant("TA1-5", "5mg", 39.99)],
  },
  {
    slug: "snap-8",
    name: "SNAP-8",
    alsoKnownAs: ["Acetyl Octapeptide-3"],
    tagline: "An octapeptide used in SNARE-complex research assays.",
    description:
      "SNAP-8 is supplied for cosmetic-science and neuromuscular-junction research models. Research use only.",
    category: "peptides",
    form: "vial",
    cas: "868844-74-0",
    storage: STORAGE_VIAL,
    variants: [variant("SNAP8-10", "10mg", 29.99)],
  },
  {
    slug: "nad-plus-spray",
    name: "NAD+ Spray",
    alsoKnownAs: ["NAD+ research solution"],
    tagline: "A ready research solution of NAD+ in a metered spray format.",
    description:
      "NAD+ Spray is prepared as a laboratory research solution. Not a consumer or clinical product.",
    category: "sprays",
    form: "spray",
    storage: STORAGE_SPRAY,
    variants: [variant("NADSP-1", "15ml", 49.99)],
  },
  {
    slug: "selank-spray",
    name: "SELANK Spray",
    alsoKnownAs: ["SELANK research solution"],
    tagline: "SELANK provided as a research spray solution.",
    description:
      "Formulated for laboratories that prefer a solution format for SELANK handling protocols.",
    category: "sprays",
    form: "spray",
    storage: STORAGE_SPRAY,
    variants: [variant("SELSP-1", "15ml", 59.99)],
  },
  {
    slug: "semax-spray",
    name: "SEMAX Spray",
    alsoKnownAs: ["SEMAX research solution"],
    tagline: "SEMAX provided as a research spray solution.",
    description:
      "A solution format of SEMAX for documented laboratory procedures only.",
    category: "sprays",
    form: "spray",
    storage: STORAGE_SPRAY,
    variants: [variant("SEMSP-1", "15ml", 59.99)],
  },
  {
    slug: "ghk-cu-spray",
    name: "GHK-Cu Spray",
    alsoKnownAs: ["Copper peptide research solution"],
    tagline: "GHK-Cu in a laboratory spray presentation.",
    description:
      "Prepared for research teams evaluating topical or aerosol handling models in vitro. Research use only.",
    category: "sprays",
    form: "spray",
    storage: STORAGE_SPRAY,
    variants: [variant("GHKSP-1", "15ml", 49.99)],
  },
  {
    slug: "pt-141-spray",
    name: "PT-141 Spray",
    alsoKnownAs: ["Bremelanotide research solution"],
    tagline: "PT-141 supplied as a research spray solution.",
    description:
      "A solution presentation of PT-141 for qualified laboratories. Not for human use.",
    category: "sprays",
    form: "spray",
    storage: STORAGE_SPRAY,
    variants: [variant("PTSP-1", "15ml", 54.99)],
  },
  {
    slug: "sermorelin",
    name: "Sermorelin",
    alsoKnownAs: ["GHRH 1-29"],
    tagline: "A GHRH fragment for pituitary-signaling research.",
    description:
      "Sermorelin is lyophilized and batch-tested for laboratories studying growth-hormone releasing hormone pathways.",
    category: "peptides",
    form: "vial",
    cas: "86168-78-7",
    storage: STORAGE_VIAL,
    variants: [variant("SERM-5", "5mg", 59.99)],
  },
  {
    slug: "dihexa",
    name: "Dihexa",
    alsoKnownAs: ["PNB-0408"],
    tagline: "An angiotensin IV analog used in synaptic-plasticity research.",
    description:
      "Dihexa is supplied for neuroscience laboratories. Handle as a research chemical under institutional guidelines.",
    category: "peptides",
    form: "vial",
    cas: "1401708-83-5",
    storage: STORAGE_VIAL,
    variants: [variant("DIHEXA-10", "10mg", 59.99)],
  },
  {
    slug: "ara-290",
    name: "ARA-290",
    alsoKnownAs: ["Cibinetide"],
    tagline: "An EPO-derived peptide for innate-repair receptor research.",
    description:
      "ARA-290 is packaged for laboratories investigating tissue-protective receptor signaling in experimental systems.",
    category: "peptides",
    form: "vial",
    cas: "1208243-50-8",
    storage: STORAGE_VIAL,
    variants: [variant("ARA290-5", "5mg", 49.99)],
  },
  {
    slug: "kisspeptin",
    name: "Kisspeptin",
    alsoKnownAs: ["Kisspeptin-10", "Metastin fragment"],
    tagline: "A KISS1-derived peptide for reproductive-axis research.",
    description:
      "Kisspeptin is provided lyophilized for GPR54 / hypothalamic signaling studies in research models.",
    category: "peptides",
    form: "vial",
    cas: "222638-67-7",
    storage: STORAGE_VIAL,
    variants: [variant("KISS-10", "10mg", 49.99)],
  },
  {
    slug: "vip",
    name: "VIP",
    alsoKnownAs: ["Vasoactive Intestinal Peptide"],
    tagline: "A 28-amino acid neuropeptide for receptor pharmacology research.",
    description:
      "VIP is supplied for laboratories studying VPAC receptor pathways. Accompanied by a full certificate of analysis.",
    category: "peptides",
    form: "vial",
    cas: "40077-57-4",
    storage: STORAGE_VIAL,
    variants: [variant("VIP-5", "5mg", 49.99)],
  },
  {
    slug: "glp-2",
    name: "GLP-2 (TR)",
    alsoKnownAs: ["Teduglutide analog (research)"],
    tagline: "A GLP-2 analog for intestinal-signaling research.",
    description:
      "GLP-2 (TR) is intended for preclinical investigation of glucagon-like peptide-2 receptor activity.",
    category: "peptides",
    form: "vial",
    storage: STORAGE_VIAL,
    variants: [variant("GLP2-5", "5mg", 59.99)],
  },
  {
    slug: "glp-1",
    name: "GLP-1 (SM)",
    alsoKnownAs: ["Semaglutide analog (research)"],
    tagline: "A GLP-1 receptor research analog in lyophilized form.",
    description:
      "GLP-1 (SM) is sold only for laboratory analysis of incretin pathways. Not a medicine and not for compounding use.",
    category: "peptides",
    form: "vial",
    featured: true,
    storage: STORAGE_VIAL,
    variants: [variant("GLP1-5", "5mg", 49.99), variant("GLP1-10", "10mg", 89.99)],
  },
  {
    slug: "ahk-cu",
    name: "AHK-Cu",
    alsoKnownAs: ["Copper tripeptide AHK"],
    tagline: "A copper-binding tripeptide for dermal-matrix research.",
    description:
      "AHK-Cu is supplied for in-vitro work on follicle and extracellular-matrix models. Research use only.",
    category: "peptides",
    form: "vial",
    storage: STORAGE_VIAL,
    variants: [variant("AHKCU-50", "50mg", 34.99)],
  },
  {
    slug: "pinealon",
    name: "Pinealon",
    alsoKnownAs: ["Glu-Asp-Arg"],
    tagline: "A short pineal peptide for neuroprotective research models.",
    description:
      "Pinealon is lyophilized for laboratories studying short peptide bioregulators. Identity confirmed per lot.",
    category: "peptides",
    form: "vial",
    storage: STORAGE_VIAL,
    variants: [variant("PINE-10", "10mg", 49.99)],
  },
  {
    slug: "bpc-spray",
    name: "BPC-157 Spray",
    alsoKnownAs: ["BPC-157 research solution"],
    tagline: "BPC-157 presented as a laboratory spray solution.",
    description:
      "A solution format of BPC-157 for research teams with documented handling SOPs.",
    category: "sprays",
    form: "spray",
    storage: STORAGE_SPRAY,
    variants: [variant("BPCSP-1", "15ml", 59.99)],
  },
  {
    slug: "bpc-tb-spray",
    name: "BPC-157 / TB-500 Spray",
    alsoKnownAs: ["Wolverine research spray"],
    tagline: "A dual-peptide research solution in spray format.",
    description:
      "Combines BPC-157 and TB-500 in a laboratory solution for institutions that require a blended format.",
    category: "sprays",
    form: "spray",
    storage: STORAGE_SPRAY,
    variants: [variant("WOLFSP-1", "15ml", 99.99)],
  },
  {
    slug: "adamax-spray",
    name: "Adamax Spray",
    alsoKnownAs: ["Adamax research solution"],
    tagline: "Adamax supplied as a research spray solution.",
    description:
      "Prepared for neuroscience laboratories evaluating Adamax in solution-based protocols.",
    category: "sprays",
    form: "spray",
    storage: STORAGE_SPRAY,
    variants: [variant("ADAXSP-1", "15ml", 89.99)],
  },
  {
    slug: "adalank-spray",
    name: "Adalank Spray",
    alsoKnownAs: ["Adalank research solution"],
    tagline: "Adalank supplied as a research spray solution.",
    description:
      "A laboratory spray presentation for Adalank handling studies. Not for consumer use.",
    category: "sprays",
    form: "spray",
    storage: STORAGE_SPRAY,
    variants: [variant("ADALSP-1", "15ml", 89.99)],
  },
  {
    slug: "dsip-spray",
    name: "DSIP Spray",
    alsoKnownAs: ["DSIP research solution"],
    tagline: "DSIP in a metered research spray format.",
    description:
      "Solution presentation of DSIP for qualified research facilities.",
    category: "sprays",
    form: "spray",
    storage: STORAGE_SPRAY,
    variants: [variant("DSIPSP-1", "15ml", 59.99)],
  },
  {
    slug: "melanotan-ii-spray",
    name: "Melanotan II Spray",
    alsoKnownAs: ["MT-II research solution"],
    tagline: "Melanotan II as a laboratory spray solution.",
    description:
      "Supplied only for research into melanocortin pathways. Not a tanning or wellness product.",
    category: "sprays",
    form: "spray",
    storage: STORAGE_SPRAY,
    variants: [variant("MT2SP-1", "15ml", 59.99)],
  },
  {
    slug: "ll-37",
    name: "LL-37",
    alsoKnownAs: ["Cathelicidin LL-37"],
    tagline: "A human cathelicidin peptide for innate-immunity research.",
    description:
      "LL-37 is lyophilized for laboratories studying antimicrobial and immunomodulatory peptide biology.",
    category: "peptides",
    form: "vial",
    cas: "154947-66-7",
    storage: STORAGE_VIAL,
    variants: [variant("LL37-5", "5mg", 34.99)],
  },
  {
    slug: "cartalax",
    name: "Cartalax",
    alsoKnownAs: ["Cartilage bioregulator peptide"],
    tagline: "A short peptide used in cartilage-matrix research models.",
    description:
      "Cartalax is supplied for experimental study of cartilage-associated peptide signaling. Research use only.",
    category: "peptides",
    form: "vial",
    storage: STORAGE_VIAL,
    variants: [variant("CART-20", "20mg", 69.99)],
  },
];

export const categoryLabels: Record<Product["category"], string> = {
  peptides: "Peptides",
  blends: "Blends",
  sprays: "Sprays",
  supplies: "Supplies",
};

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((item) => item.featured);
}

export function getRelatedProducts(slug: string, limit = 4) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);

  const sameCategory = products.filter(
    (item) => item.slug !== slug && item.category === current.category,
  );
  const remainder = products.filter(
    (item) => item.slug !== slug && item.category !== current.category,
  );
  return [...sameCategory, ...remainder].slice(0, limit);
}

export function searchProducts(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return products;

  return products.filter((item) => {
    const haystack = [item.name, item.slug, ...item.alsoKnownAs, item.tagline]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
