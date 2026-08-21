import type { Metadata } from "next";
import { FaqPageContent } from "@/components/FaqPageContent";

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions About Peptides",
  description:
    "Everything you need to know about research peptides, ordering, shipping, quality testing, and more from Klear Club.",
};

export default function FaqPage() {
  return <FaqPageContent />;
}
