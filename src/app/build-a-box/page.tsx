import { BuildABox } from "@/components/BuildABox";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Your Box | Peptide Subscription Box",
  description:
    "Pick any 4 research peptides and get a free Klear H2O in every box, 40% off retail, and free 2-day delivery, billed monthly. Swap items anytime after your first delivery.",
};

export default function BuildABoxPage() {
  return <BuildABox />;
}
