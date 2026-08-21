import type { Metadata } from "next";
import { AffiliateTermsPageContent } from "@/components/AffiliateTermsPageContent";

export const metadata: Metadata = {
  title: "Partner Program Terms",
  description:
    "Referral Partner Program Terms for Klear Club. Eligibility, commissions, disclosures, enforcement, arbitration, and contact details for partners.",
};

export default function AffiliateTermsPage() {
  return <AffiliateTermsPageContent />;
}
