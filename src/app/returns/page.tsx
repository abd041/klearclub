import type { Metadata } from "next";
import { ReturnsPageContent } from "@/components/ReturnsPageContent";

export const metadata: Metadata = {
  title: "Returns & Refunds | Damage Protection",
  description:
    "Every order is protected against damage in transit. Report damage with photos for a one-time replacement. Learn eligibility, timelines, and how returns work at Klear Club.",
};

export default function ReturnsPage() {
  return <ReturnsPageContent />;
}
