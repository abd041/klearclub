import type { Metadata } from "next";
import { DisclaimerPageContent } from "@/components/DisclaimerPageContent";

export const metadata: Metadata = {
  title: "Disclaimer | Research Use Only",
  description:
    "Klear Club research-use disclaimer. Products are for laboratory research only — not for human, veterinary, or food use. Read buyer responsibilities and liability terms.",
};

export default function DisclaimerPage() {
  return <DisclaimerPageContent />;
}
