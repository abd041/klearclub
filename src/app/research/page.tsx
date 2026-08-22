import { ResearchPageContent } from "@/components/ResearchPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Library",
  description:
    "Practical research articles on COA documentation, peptide storage, quality verification, and research-use compliance from Klear Club.",
};

export default function ResearchPage() {
  return <ResearchPageContent />;
}
