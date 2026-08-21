import { ResearchBundles } from "@/components/ResearchBundles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Bundles | Build & Share",
  description:
    "Build a research peptide bundle, share one link, and earn points. Buyers save 35% with free 2-day shipping.",
};

export default function BundlesPage() {
  return <ResearchBundles />;
}
