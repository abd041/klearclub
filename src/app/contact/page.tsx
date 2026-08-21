import { ContactSupport } from "@/components/ContactSupport";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Peptide Research Support",
  description:
    "Contact Klear Club for peptide research support. Email support@klearclub.com for order inquiries, product questions, and quality verification. We respond within 24 hours on business days.",
};

export default function ContactPage() {
  return <ContactSupport />;
}
