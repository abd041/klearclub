import { CoaLibrary } from "@/components/CoaLibrary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate of Analysis | Third-Party Identity Testing",
  description:
    "Every Klear Club research peptide comes with a Certificate of Analysis (COA) from an independent ISO 17025 accredited lab. Search the public certificate library by compound or lot.",
};

export default function CoaPage() {
  return <CoaLibrary />;
}
