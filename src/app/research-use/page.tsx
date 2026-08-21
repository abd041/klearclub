import type { Metadata } from "next";
import { ResearchUsePageContent } from "@/components/ResearchUsePageContent";

export const metadata: Metadata = {
  title: "Research Use Only | Laboratory Peptides",
  description:
    "Information about research-use-only peptides and laboratory applications from Klear Club. 99%+ purity, third-party tested, Certificate of Analysis on every batch.",
};

export default function ResearchUsePage() {
  return <ResearchUsePageContent />;
}
