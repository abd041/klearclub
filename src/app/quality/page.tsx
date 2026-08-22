import { QualityPageContent } from "@/components/QualityPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality Assurance",
  description:
    "Klear Club quality commitment: 8-assay third-party testing, ISO 17025 verification, and full Certificates of Analysis on every batch.",
};

export default function QualityPage() {
  return <QualityPageContent />;
}
