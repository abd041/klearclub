import { CartPageContent } from "@/components/CartPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Bag",
};

export default function CartPage() {
  return <CartPageContent />;
}
