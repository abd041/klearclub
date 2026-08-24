import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, Geist, Geist_Mono, Great_Vibes, Playfair_Display } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { Providers } from "@/components/Providers";
import { ResearcherGate } from "@/components/ResearcherGate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://klearclub.com"),
  title: {
    default: "Klear Club | Research Grade Peptides",
    template: "%s | Klear Club",
  },
  description:
    "USA-based research peptides with 99%+ purity, third-party testing, and a certificate of analysis on every lot.",
  applicationName: "Klear Club",
  authors: [{ name: "Klear Club" }],
  creator: "Klear Club",
  publisher: "Klear Club",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Klear Club",
    title: "Klear Club | Research Grade Peptides",
    description:
      "USA-based research peptides with 99%+ purity, third-party testing, and a certificate of analysis on every lot.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klear Club | Research Grade Peptides",
    description:
      "USA-based research peptides with 99%+ purity, third-party testing, and a certificate of analysis on every lot.",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${fraunces.variable} ${greatVibes.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-ink">
        <Providers>
          <ResearcherGate />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
