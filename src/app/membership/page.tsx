import { Membership } from "@/components/Membership";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership",
  description: "Pick the Klear Club plan that fits how you shop. Earn points, unlock free shipping, and redeem cash back.",
};

export default function MembershipPage() {
  return <Membership />;
}
