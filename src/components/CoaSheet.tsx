import { productLot } from "@/data/media";
import type { Product } from "@/types/catalog";

const assays = [
  ["Purity (HPLC)", "≥ 99.0%"],
  ["Net peptide content", "Pass"],
  ["Identity", "Confirmed"],
  ["Appearance", "White lyophilized powder"],
  ["Fentanyl screen", "Not detected"],
  ["Heavy metals (ICP-MS)", "Pass"],
  ["Sterility (PCR)", "Pass"],
  ["Endotoxin", "Pass"],
];

export function CoaSheet({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const lot = productLot(product.slug);

  return (
    <div className={compact ? "p-5 sm:p-7" : "p-8 sm:p-12"} id="coa-sheet">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Klear Club</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
            Certificate of Analysis
          </h2>
        </div>
        <p className="text-xs text-slate-500">ISO 17025 panel</p>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-400">Material</dt>
          <dd className="font-medium text-slate-900">{product.name}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Lot</dt>
          <dd className="font-medium text-slate-900">{lot}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Form</dt>
          <dd className="text-slate-900">{product.form === "spray" ? "Research solution" : "Lyophilized powder"}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Use</dt>
          <dd className="text-slate-900">Laboratory research only</dd>
        </div>
      </dl>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-slate-400">
            <th className="py-2 font-medium">Assay</th>
            <th className="py-2 font-medium">Result</th>
          </tr>
        </thead>
        <tbody>
          {assays.map(([name, result]) => (
            <tr key={name} className="border-b border-slate-100">
              <td className="py-2 text-slate-700">{name}</td>
              <td className="py-2 text-slate-900">{result}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-5 text-xs leading-5 text-slate-500">
        Representative report for lot {lot} ({product.name}). Orders ship with a matching lot-specific file.
        Not for human, veterinary, or food use.
      </p>
    </div>
  );
}
