import type { ReactNode } from "react";

/** Compact official-looking payment badges for dark and light backgrounds. */
export function PaymentMarks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <Badge label="Visa">
        <VisaLogo />
      </Badge>
      <Badge label="Mastercard">
        <MastercardLogo />
      </Badge>
      <Badge label="Apple Pay">
        <ApplePayLogo />
      </Badge>
      <Badge label="Google Pay">
        <GooglePayLogo />
      </Badge>
    </div>
  );
}

function Badge({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span
      className="inline-flex h-7 min-w-[48px] items-center justify-center rounded-[5px] bg-white px-2 ring-1 ring-black/10"
      role="img"
      aria-label={label}
      title={label}
    >
      {children}
    </span>
  );
}

function VisaLogo() {
  return (
    <svg width="40" height="14" viewBox="0 0 40 14" aria-hidden="true">
      <text
        x="20"
        y="11.2"
        textAnchor="middle"
        fill="#1A1F71"
        fontFamily="Arial, Helvetica, sans-serif"
        fontStyle="italic"
        fontWeight="800"
        fontSize="12"
        letterSpacing="0.6"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg width="32" height="20" viewBox="0 0 32 20" aria-hidden="true">
      <circle cx="12.2" cy="10" r="7.4" fill="#EB001B" />
      <circle cx="19.8" cy="10" r="7.4" fill="#F79E1B" />
      <path d="M16 4.4a7.4 7.4 0 0 1 0 11.2 7.4 7.4 0 0 1 0-11.2Z" fill="#FF5F00" />
    </svg>
  );
}

function ApplePayLogo() {
  return (
    <svg width="44" height="16" viewBox="0 0 44 16" aria-hidden="true">
      <path
        fill="#111"
        d="M7.35 3.55c.42-.52.72-1.24.64-1.97-.62.03-1.37.42-1.82.94-.4.46-.75 1.2-.66 1.9.7.05 1.41-.36 1.84-.87ZM7.9 4.55c-1.02 0-1.84.6-2.32.6-.5 0-1.2-.57-1.98-.57-1.02 0-1.96.6-2.47 1.53-1.06 1.84-.27 4.56.75 6.06.5.73 1.08 1.54 1.84 1.51.74-.03 1.02-.48 1.91-.48.88 0 1.14.48 1.97.46.82-.01 1.33-.74 1.82-1.48.57-.83.8-1.62.81-1.66-.02 0-1.55-.6-1.57-2.36-.02-1.48 1.2-2.19 1.26-2.22-.7-1.03-1.78-1.15-2.16-1.18-.88-.07-1.62.53-2.02.53-.38 0-1.1-.5-1.84-.53Z"
      />
      <text
        x="13.4"
        y="12.4"
        fill="#111"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        fontSize="10.5"
        fontWeight="600"
        letterSpacing="-0.3"
      >
        Pay
      </text>
    </svg>
  );
}

function GooglePayLogo() {
  return (
    <svg width="54" height="16" viewBox="0 0 54 16" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M9.1 8.05c0-.48-.04-.94-.12-1.38H4.7v2.61h2.48A2.12 2.12 0 0 1 6.5 10.4v1.37h1.47A4.47 4.47 0 0 0 9.1 8.05Z"
      />
      <path
        fill="#34A853"
        d="M4.7 12.95c1.27 0 2.34-.42 3.12-1.14L6.35 10.4A2.83 2.83 0 0 1 4.7 10.9c-1.1 0-2.03-.74-2.36-1.74H.83v1.41A4.7 4.7 0 0 0 4.7 12.95Z"
      />
      <path
        fill="#FBBC05"
        d="M2.34 9.16A2.82 2.82 0 0 1 2.19 8c0-.4.07-.8.15-1.16V5.43H.83A4.7 4.7 0 0 0 0 8c0 .73.17 1.42.83 2.04l1.51-.88Z"
      />
      <path
        fill="#EA4335"
        d="M4.7 5.1c.7 0 1.32.24 1.81.71l1.36-1.36A4.48 4.48 0 0 0 4.7 3.05 4.7 4.7 0 0 0 .83 5.43l1.51 1.41C2.67 5.84 3.6 5.1 4.7 5.1Z"
      />
      <text
        x="12.2"
        y="12.3"
        fill="#3C4043"
        fontFamily="Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"
        fontSize="10.2"
        fontWeight="500"
      >
        Pay
      </text>
    </svg>
  );
}
