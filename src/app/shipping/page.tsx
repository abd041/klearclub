import type { Metadata } from "next";
import { ShippingPageContent } from "@/components/ShippingPageContent";

export const metadata: Metadata = {
  title: "Shipping Information | Fast Peptide Delivery",
  description:
    "Fast fulfillment within 0-2 business days. Free shipping on orders over $100. Every order includes free shipment protection. Secure peptide shipping with full tracking across the USA.",
};

export default function ShippingPage() {
  return <ShippingPageContent />;
}
