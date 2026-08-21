import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality",
};

const assays = [
  "Purity (HPLC)",
  "Net peptide content",
  "Identity",
  "Appearance",
  "Fentanyl screen",
  "Heavy metals (ICP-MS)",
  "Sterility (PCR)",
  "Endotoxin",
];

const path = [
  "Raw material verification — partners verify materials before synthesis.",
  "Controlled synthesis — documented cleanroom procedures.",
  "HPLC purification — multiple purification passes.",
  "Third-party 8-assay testing — ISO 17025 laboratory verification.",
  "COA documentation — full results published with the lot.",
  "Sealed packaging — nitrogen-sealed vials for lyophilized peptides.",
];

export default function QualityPage() {
  return (
    <div className="page-wrap py-12">
      <PageHeader
        eyebrow="Quality"
        title="Eight assays. Then it ships."
        body="Every batch is independently tested. If a lot misses the specification, it is not released to the catalog."
      />
      <ol className="mt-14 grid gap-4 sm:grid-cols-2">
        {assays.map((assay, index) => (
          <li key={assay} className="rounded-2xl border border-slate-200 bg-white px-6 py-5">
            <span className="text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-2 text-lg font-medium tracking-tight">{assay}</p>
          </li>
        ))}
      </ol>
      <h2 className="mt-16 text-2xl font-semibold tracking-tight">Quality path</h2>
      <ol className="mt-6 space-y-4">
        {path.map((item, index) => (
          <li key={item} className="flex gap-4 text-sm leading-6 text-slate-600">
            <span className="font-medium text-slate-900">{String(index + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ol>
      <Link href="/coa" className="mt-12 inline-flex text-sm font-medium text-klear-deep">
        Certificates of analysis
      </Link>
    </div>
  );
}
