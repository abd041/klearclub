"use client";

import { FormEvent, useState } from "react";

const COUNTRIES = [
  "Pakistan",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "United Arab Emirates",
  "Germany",
  "France",
];

type GooglePayCardModalProps = {
  onBack: () => void;
  onClose: () => void;
  onSaved: (details: { name: string; address: string; city: string; postalCode: string; country: string }) => void;
};

export function GooglePayCardModal({ onBack, onClose, onSaved }: GooglePayCardModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [help, setHelp] = useState<"card" | "cvc" | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    onSaved({
      name: name.trim(),
      address: [street.trim(), apt.trim()].filter(Boolean).join(", "),
      city: city.trim() || suburb.trim(),
      postalCode: postal.trim(),
      country,
    });
  }

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center px-4">
      <button type="button" className="absolute inset-0 bg-black/45" aria-label="Close Google Pay" onClick={onClose} />
      <div className="relative flex max-h-[88vh] w-full max-w-[480px] flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.28)]">
        <div className="relative border-b border-[#e8eaed]">
          <p className="py-2.5 text-center text-[12px] text-[#5f6368]">pay.google.com</p>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-1.5 right-2 flex h-8 w-8 items-center justify-center rounded-full text-[18px] text-[#5f6368] hover:bg-[#f1f3f4]"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-4 pb-5">
            <div className="mb-5 flex items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#3c4043] hover:bg-[#f1f3f4]"
                aria-label="Back"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M11.5 3.5 6 9l5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              <h3 className="text-[20px] font-medium tracking-[-0.01em] text-[#202124]">Add credit or debit card</h3>
            </div>

            <p className="mb-3 text-[12px] text-[#5f6368]">All fields required</p>

            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#80868b]">
                <CardGlyph />
              </span>
              <input
                required
                inputMode="numeric"
                autoComplete="off"
                placeholder="Card number"
                value={cardNumber}
                onChange={(event) => setCardNumber(formatCard(event.target.value))}
                className="h-12 w-full rounded-[6px] border border-[#dadce0] pr-10 pl-11 text-[15px] outline-none placeholder:text-[#80868b] focus:border-[#1a73e8]"
              />
              <HelpButton active={help === "card"} onClick={() => setHelp(help === "card" ? null : "card")} />
            </div>
            {help === "card" ? (
              <p className="mt-1 text-[12px] text-[#5f6368]">Enter the number on the front of your card.</p>
            ) : null}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <input
                required
                inputMode="numeric"
                autoComplete="off"
                placeholder="MM/YY"
                value={expiry}
                onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                className="h-12 rounded-[6px] border border-[#dadce0] px-3 text-[15px] outline-none placeholder:text-[#80868b] focus:border-[#1a73e8]"
              />
              <div className="relative">
                <input
                  required
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="Security code"
                  value={cvc}
                  onChange={(event) => setCvc(event.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="h-12 w-full rounded-[6px] border border-[#dadce0] px-3 pr-10 text-[15px] outline-none placeholder:text-[#80868b] focus:border-[#1a73e8]"
                />
                <HelpButton active={help === "cvc"} onClick={() => setHelp(help === "cvc" ? null : "cvc")} />
              </div>
            </div>
            {help === "cvc" ? (
              <p className="mt-1 text-[12px] text-[#5f6368]">3 or 4 digit code on the back of your card.</p>
            ) : null}

            <FloatingField label="Cardholder name" value={name} onChange={setName} required />

            <label className="relative mt-4 block">
              <span className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#5f6368]">Country/region</span>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="h-12 w-full appearance-none rounded-[6px] border border-[#dadce0] bg-white px-3 pr-9 text-[15px] outline-none focus:border-[#1a73e8]"
              >
                {COUNTRIES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#5f6368]">▾</span>
            </label>

            <PlainField placeholder="Street address" value={street} onChange={setStreet} required />
            <PlainField placeholder="Apt, suite, etc. (optional)" value={apt} onChange={setApt} />
            <PlainField placeholder="Suburb" value={suburb} onChange={setSuburb} />
            <PlainField placeholder="City" value={city} onChange={setCity} required />
            <PlainField placeholder="Postal code" value={postal} onChange={setPostal} required />

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="inline-flex h-12 w-[72px] shrink-0 items-center justify-center gap-1 rounded-[6px] border border-[#dadce0] text-[18px]"
                aria-label="Phone country"
              >
                🇵🇰
                <span className="text-[11px] text-[#5f6368]">▾</span>
              </button>
              <input
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="h-12 min-w-0 flex-1 rounded-[6px] border border-[#dadce0] px-3 text-[15px] outline-none placeholder:text-[#80868b] focus:border-[#1a73e8]"
              />
            </div>

            <p className="mt-5 text-[12px] leading-5 text-[#3c4043]">
              By continuing, you create a Google Payments account and agree to the Google Payments{" "}
              <a
                href="https://payments.google.com/payments/apis-secure/u/0/get_legal_document?ldo=0&ldt=buyertos"
                target="_blank"
                rel="noreferrer"
                className="text-[#1a73e8] underline"
              >
                Terms of Service
              </a>
              . The{" "}
              <a
                href="https://payments.google.com/payments/apis-secure/u/0/get_legal_document?ldo=0&ldt=privacynotice"
                target="_blank"
                rel="noreferrer"
                className="text-[#1a73e8] underline"
              >
                Privacy Notice
              </a>{" "}
              describes how your data is handled.
            </p>
          </div>

          <div className="border-t border-[#e8eaed] px-6 py-4">
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#1a73e8] text-[15px] font-medium text-white hover:bg-[#1765cc]"
            >
              Save card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PlainField({
  placeholder,
  value,
  onChange,
  required,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <input
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="mt-4 h-12 w-full rounded-[6px] border border-[#dadce0] px-3 text-[15px] outline-none placeholder:text-[#80868b] focus:border-[#1a73e8]"
    />
  );
}

function FloatingField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="relative mt-4 block">
      <span className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#5f6368]">{label}</span>
      <input
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-[6px] border border-[#dadce0] px-3 text-[15px] outline-none focus:border-[#1a73e8]"
      />
    </label>
  );
}

function HelpButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border text-[11px] ${
        active ? "border-[#1a73e8] text-[#1a73e8]" : "border-[#80868b] text-[#80868b]"
      }`}
      aria-label="Help"
    >
      ?
    </button>
  );
}

function CardGlyph() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
      <rect x="0.7" y="1.2" width="18.6" height="13.6" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1 5.2h18" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function formatCard(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}
