import type { Metadata } from "next";
import { TermsPageContent } from "@/components/TermsPageContent";

export const metadata: Metadata = {
  title: "Terms of Service | Legal Agreement",
  description:
    "Read our Terms of Service governing the use of Klear Club website and purchase of research peptides. Understand your rights and responsibilities as a customer.",
};

export default function TermsPage() {
  return <TermsPageContent />;
}
