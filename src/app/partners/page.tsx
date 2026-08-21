import { PartnerProgram } from "@/components/PartnerProgram";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral Partner Program | Refer Researchers",
  description:
    "Refer researchers and labs to Klear Club. Earn 20% on first orders and 10% lifetime recurring. Documented quality supply with CoA on every batch.",
};

export default function PartnersPage() {
  return <PartnerProgram />;
}
