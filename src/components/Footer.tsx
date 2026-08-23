import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";

const shop = [
  { href: "/store", label: "All Products" },
  { href: "/build-a-box", label: "Build a Box", isNew: true },
  { href: "/bulk", label: "Bulk Orders", isNew: true },
  { href: "/bundles", label: "Research Bundles", isNew: true },
  { href: "/membership", label: "Membership" },
];

const resources = [
  { href: "/coa", label: "Certificates of Analysis" },
  { href: "/quality", label: "Quality Assurance" },
  { href: "/research", label: "Research Library" },
];

const support = [
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/shipping", label: "Shipping Info" },
  { href: "/returns", label: "Returns & Refunds" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/affiliate-terms", label: "Affiliate Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/research-use", label: "Research Use Only" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0a1930] font-sans text-white">
      <div className="site-container pt-12 pb-8 sm:pt-14 lg:pt-16">
        <div className="lg:grid lg:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))] lg:items-start lg:gap-8">
          <div className="max-w-[320px]">
            <Logo className="[&_img]:brightness-0 [&_img]:invert" />
            <p className="mt-5 text-[13px] leading-[1.65] text-[#9aa8b5]">
              Premium research-grade peptides for controlled laboratory studies. Third-party tested with Certificate of
              Analysis.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <SocialPlaceholder label="Instagram">
                <InstagramIcon />
              </SocialPlaceholder>
              <SocialPlaceholder label="X">
                <XIcon />
              </SocialPlaceholder>
              <SocialPlaceholder label="YouTube">
                <YouTubeIcon />
              </SocialPlaceholder>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:contents lg:mt-0">
            <FooterCol title="Shop" links={shop} />
            <FooterCol title="Resources" links={resources} />
            <FooterCol title="Support" links={support} />
            <FooterCol title="Legal" links={legal} />
          </div>
        </div>

        <div
          role="region"
          aria-label="FDA research-use disclaimer"
          className="mt-10 rounded-md border-l-4 border-amber-400 bg-[#12243f] sm:mt-12"
        >
          <div className="flex gap-3 px-4 py-4 sm:px-5 sm:py-5">
            <svg
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div className="space-y-1.5">
              <p className="text-xs font-bold tracking-wider text-amber-300 uppercase">FDA Disclaimer</p>
              <p className="text-[12px] leading-relaxed text-white/85">
                Statements made regarding our products have{" "}
                <span className="font-semibold">not been evaluated by the U.S. Food and Drug Administration</span>. These
                products are{" "}
                <span className="font-semibold">not intended to diagnose, treat, cure, or prevent any disease</span>.
                Product information on this website is provided for laboratory research purposes only. All products are
                sold strictly for laboratory research use by qualified professionals and are{" "}
                <span className="font-semibold">not for human, veterinary, or food use in any form</span>.{" "}
                <Link href="/disclaimer" className="font-medium text-amber-300 underline-offset-2 hover:underline">
                  Read the full disclaimer →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[12px] text-[#9aa8b5] sm:mt-10">
          <span>We accept</span>
          <div className="flex flex-wrap items-center gap-4 text-white">
            <VisaMark />
            <AmexMark />
            <ApplePayMark />
            <GooglePayMark />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-[12px] text-[#8b99a6] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Klear Club. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <ShieldIcon /> SSL Secured
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BeakerIcon /> 99%+ Purity
            </span>
            <span className="inline-flex items-center gap-1.5">
              <TruckIcon /> Shipment Protection
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; isNew?: boolean }[];
}) {
  return (
    <div className="min-w-0">
      <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-white">{title}</p>
      <ul className="mt-3 space-y-2.5 sm:mt-4">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="inline-flex items-center text-[13px] text-[#d5dde4] no-underline hover:text-white"
            >
              {link.label}
              {link.isNew ? <NewBadge /> : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewBadge() {
  return (
    <span className="ml-2 rounded-full bg-[#c8f5d8] px-[7px] py-[2px] text-[9px] font-bold uppercase leading-none tracking-wide text-black">
      New
    </span>
  );
}

function SocialPlaceholder({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span
      role="img"
      aria-label={`${label} — coming soon`}
      title={`${label} — coming soon`}
      className="flex h-9 w-9 cursor-default items-center justify-center rounded-full bg-[#12243f] text-white/50"
    >
      {children}
    </span>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.6 3h2.7l-5.9 6.7L22 21h-6.3l-4.9-6.4L5.4 21H2.7l6.3-7.2L2 3h6.5l4.4 5.8L17.6 3zm-.9 16.2h1.5L7.4 4.7H5.8l10.9 14.5z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 24 18" fill="currentColor" aria-hidden="true">
      <path d="M23.5 3.2a3 3 0 0 0-2.1-2.1C19.5.6 12 .6 12 .6s-7.5 0-9.4.5A3 3 0 0 0 .5 3.2 31 31 0 0 0 0 9a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 9a31 31 0 0 0-.5-5.8zM9.6 12.6V5.4L15.8 9l-6.2 3.6z" />
    </svg>
  );
}

function VisaMark() {
  return (
    <svg width="38" height="14" viewBox="0 0 38 14" fill="currentColor" aria-label="Visa">
      <path d="M14.2 1.2h-3.3l-2.1 11.6h3.3L14.2 1.2zm11.7 7.5 1.7-4.6.9 4.6h-2.6zm3.6 4.1h3L31 1.2h-2.8c-.6 0-1.1.3-1.3.9L23 12.8h3.4l.5-1.4h4.1l.5 1.4zM21.3 1.2l-2.6 11.6h-3.2L18.1 1.2h3.2zM8.7 1.2 5.4 9.5 4.1 2.4c-.2-.8-.8-1.2-1.6-1.2H.1L0 1.4C.6 1.5 2 1.8 3.4 2.5c.8.4 1.1.8 1.3 1.5l2.2 8.8h3.4l5.2-11.6H8.7z" />
    </svg>
  );
}

function AmexMark() {
  return (
    <svg width="34" height="14" viewBox="0 0 34 14" fill="none" aria-label="American Express">
      <rect x="0.5" y="0.5" width="33" height="13" rx="2" stroke="currentColor" />
      <path
        d="M6.2 9.4V4.6H9.8L11 6.4 12.2 4.6h3.6v4.8h-2.1V6.6L12.4 9.4h-1.5L9.6 6.6v2.8H6.2zm12.6 0-1.6-2.2h-.9v2.2H14V4.6h4.1c1.4 0 2.3.8 2.3 1.9 0 .8-.4 1.4-1.2 1.7l1.8 1.2h-2.2zm-.3-3.3c0-.4-.3-.6-.8-.6h-1.4v1.3h1.4c.5 0 .8-.3.8-.7zM23.2 9.4V4.6h6.6v1.6h-4.4v.6h4.1v1.5h-4.1v.6h4.5v1.5h-6.7z"
        fill="currentColor"
      />
    </svg>
  );
}

function ApplePayMark() {
  return (
    <svg width="42" height="16" viewBox="0 0 42 16" fill="currentColor" aria-label="Apple Pay">
      <path d="M8.1 3.3c.5-.7 1-1.6.8-2.6-.8 0-1.8.5-2.3 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.4 2.3-1.1zM8.9 4.6c-1.3 0-2.3.8-2.9.8s-1.5-.7-2.5-.7c-1.3 0-2.5.8-3.1 1.9-1.4 2.3-.3 5.8 1 7.7.6.9 1.3 1.9 2.3 1.9s1.3-.8 2.5-.8 1.5.8 2.5.8 1.6-.9 2.3-1.9c.5-.7.9-1.5 1.1-2.3-2.9-1.1-3.4-5.2-.2-6.5-.6-.6-1.5-.9-2-1z" />
      <path d="M15.8 5.2c-2.2 0-3.6 1.2-3.6 2.9 0 1.8 1.6 2.6 2.7 3.1.5.2.8.5.8.9 0 .5-.6.9-1.4.9-.9 0-1.6-.3-2.1-.6l-.3 1.4c.6.3 1.5.6 2.5.6 2.3 0 3.8-1.2 3.8-3.1 0-1.9-1.7-2.7-2.7-3.2-.4-.2-.8-.5-.8-.9 0-.4.5-.8 1.2-.8.7 0 1.3.2 1.8.4l.3-1.3c-.5-.2-1.2-.3-2.2-.3zM21.8 5.3l-1.6 6.6h-1.7l.6-2.4-1.8-4.2h1.8l1 2.8.4-2.8h1.3zm2.6 0c2 0 3.3 1.1 3.3 3.3s-1.3 3.4-3.3 3.4h-2.6l.8-6.7h1.8zm-.3 5.3c.9 0 1.5-.6 1.5-2s-.6-1.9-1.5-1.9h-.3l-.5 3.9h.8zm6.6-5.3 1.4 6.7h-1.6l-.2-1.1h-2.2l-.5 1.1h-1.7l2.4-6.7h2.4zm-.6 4.3-.4-2.3-.6 2.3h1zM36.3 5.2c.8 0 1.5.2 2 .5l-.4 1.4c-.4-.3-1-.5-1.6-.5-1.2 0-2 .8-2 2.1s.8 2.1 2 2.1c.6 0 1.2-.2 1.6-.5l.4 1.3c-.5.3-1.3.6-2.2.6-2.2 0-3.7-1.5-3.7-3.5s1.6-3.5 3.9-3.5z" />
    </svg>
  );
}

function GooglePayMark() {
  return (
    <svg width="48" height="16" viewBox="0 0 48 16" fill="currentColor" aria-label="Google Pay">
      <path d="M19.6 11.6c-2.3 0-4.1-1.8-4.1-4.1S17.3 3.4 19.6 3.4c1.1 0 2 .4 2.7 1l-.9 1c-.5-.4-1.1-.7-1.8-.7-1.5 0-2.6 1.2-2.6 2.8s1.1 2.8 2.6 2.8c1.6 0 2.2-1 2.3-1.7h-2.3V7.4h3.7c0 .2.1.5.1.8 0 2.1-1.4 3.4-3.7 3.4z" />
      <path d="M25.2 11.5V6.7h-1.3v-.9l1.3-.6V3.8h1.3v1.4H28v1.5h-1.5v3.6c0 .6.2 1 .8 1 .3 0 .5 0 .7-.1v1.3c-.2.1-.6.2-1.1.2-1.4 0-1.7-.8-1.7-1.7zM29.7 13.3 31 11.5c.5.4 1.2.7 1.9.7 1 0 1.4-.5 1.4-1.1V6.7h1.3v4.4c0 1.8-1.1 2.7-2.7 2.7-.9 0-1.8-.3-2.5-.8z" />
      <path d="M34.2 8.8c0-1.7 1.3-3.1 3.1-3.1s3.1 1.4 3.1 3.1-1.3 3.1-3.1 3.1-3.1-1.4-3.1-3.1zm4.8 0c0-.9-.7-1.6-1.7-1.6s-1.7.7-1.7 1.6.7 1.6 1.7 1.6 1.7-.7 1.7-1.6zM8.3 3.5v9h-1.6l-3.7-5.4v5.4H1.4v-9h1.7l3.6 5.3V3.5h1.6z" />
      <path d="M13.4 12.6c-2.4 0-4.2-1.8-4.2-4.2s1.8-4.2 4.2-4.2c1.2 0 2.2.4 2.9 1.2l-1.2 1.1c-.4-.5-1-.8-1.7-.8-1.4 0-2.4 1.2-2.4 2.7s1 2.7 2.4 2.7c.9 0 1.4-.3 1.8-.7v-.9h-1.9V8.2h3.2v3.1c-.8.8-1.9 1.3-3.1 1.3z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.6 13.4 3.6v4.2c0 3.1-2.1 5.3-5.4 6.6C4.7 13.1 2.6 10.9 2.6 7.8V3.6L8 1.6Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="m5.4 8 1.7 1.7 3.5-3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BeakerIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 2.2h4M6.6 2.2v4.1L3.6 13h8.8l-3-6.7V2.2" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.2 9.4h5.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="14" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4.2h7.2v6.4H2V4.2Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9.2 6.2H12l1.8 2.4v2h-4.6V6.2Z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="4.4" cy="11.6" r="1.1" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11.4" cy="11.6" r="1.1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
