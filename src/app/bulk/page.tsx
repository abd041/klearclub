import { BulkOrders } from "@/components/BulkOrders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk Orders | Research Peptides in Bulk",
  description:
    "10 units minimum per product. 40% off from 10 units, 50% off at 50+. One-time order with free 2-day signed delivery.",
};

export default function BulkPage() {
  return <BulkOrders />;
}
