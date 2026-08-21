import type { Metadata } from "next";
import { PrivacyPageContent } from "@/components/PrivacyPageContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Data Protection",
  description:
    "How Klear Club collects, uses, and protects your personal information. Read our privacy policy covering data security, cookies, CCPA rights, and contact details.",
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
