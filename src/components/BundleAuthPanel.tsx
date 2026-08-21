"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  itemCount: number;
  unitCount: number;
  pointsPerOrder: number;
  onBack: () => void;
  onComplete: () => void;
};

function maskContact(value: string) {
  const trimmed = value.trim();
  if (trimmed.includes("@")) {
    const [local, domain] = trimmed.split("@");
    if (!domain) return trimmed;
    if (local.length <= 2) return `${local[0] ?? ""}••••@${domain}`;
    return `${local[0]}••••${local[local.length - 1]}@${domain}`;
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 4) return trimmed;
  return `••• ••• ${digits.slice(-4)}`;
}

function isEmail(value: string) {
  return value.includes("@");
}

export function BundleAuthPanel({ itemCount, unitCount, pointsPerOrder, onBack, onComplete }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [contact, setContact] = useState("");
  const [code, setCode] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const codeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step !== 2 || resendIn <= 0) return;
    const timer = window.setTimeout(() => setResendIn((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [step, resendIn]);

  useEffect(() => {
    if (step === 2) {
      queueMicrotask(() => codeInputRef.current?.focus());
    }
  }, [step]);

  useEffect(() => {
    if (step === 2 && code.length === 6) {
      const timer = window.setTimeout(() => onComplete(), 250);
      return () => window.clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, step]);

  const canSend = contact.trim().length >= 5;
  const itemLabel = itemCount === 1 ? "1 item" : `${itemCount} items`;
  const unitLabel = unitCount === 1 ? "1 unit" : `${unitCount} units`;

  function sendCode(event?: FormEvent) {
    event?.preventDefault();
    const target = (contact.trim() || sentTo).trim();
    if (target.length < 5) return;
    setSentTo(target);
    setCode("");
    setResendIn(30);
    setStep(2);
  }

  function handleBack() {
    if (step === 1) onBack();
    else {
      setStep(1);
      setCode("");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white p-4 sm:p-5" data-testid="bundle-auth">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#555555]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Edit bundle
        </button>
        <span className="text-[11px] font-medium tracking-[0.08em] text-gray-400 uppercase">Step 1 of 2</span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] px-4 py-3.5">
        <p className="min-w-0 truncate text-sm text-[#6B7280]">
          <span className="font-semibold text-[#111417]">Your bundle</span>
          {" · "}
          {itemLabel} · {unitLabel}
        </p>
        <span className="shrink-0 rounded-full bg-[#EDF0FE] px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-[#2742F5]">
          ~{pointsPerOrder} pts / order
        </span>
      </div>

      {step === 1 ? (
        <form onSubmit={sendCode} className="mt-6">
          <h2 className="text-[26px] leading-tight font-bold tracking-tight text-[#111417] sm:text-[28px]">
            Sign in to save your bundle
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6B7280] sm:text-[15px]">
            Your bundle lives on your account: that&apos;s how we know where to send your points every time someone
            orders it. We&apos;ll text or email you a one-time code.
          </p>
          <input
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="Email or phone number"
            autoComplete="username"
            inputMode="email"
            className="mt-5 h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-[15px] text-[#111417] outline-none placeholder:text-[#9AA5A1] focus:border-[#2742F5] focus:ring-2 focus:ring-[#2742F5]/15"
          />
          <p className="mt-3 text-[12px] leading-relaxed text-[#9AA5A1]">
            If you enter a phone number, standard message and data rates may apply. Reply STOP to opt out at any time.
          </p>
          <button
            type="submit"
            disabled={!canSend}
            className={cn(
              "mt-5 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-bold transition-colors",
              canSend
                ? "bg-[#2742F5] text-white hover:bg-[#1D33C9]"
                : "cursor-not-allowed bg-[#9BA4FB] text-white",
            )}
          >
            Send my code
          </button>
        </form>
      ) : (
        <div className="mt-6">
          <h2 className="text-[26px] leading-tight font-bold tracking-tight text-[#111417] sm:text-[28px]">
            Enter your code
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6B7280] sm:text-[15px]">
            We {isEmail(sentTo) ? "emailed" : "texted"} a 6-digit code to{" "}
            <span className="font-medium text-[#111417]">{maskContact(sentTo)}</span>.
          </p>

          <button
            type="button"
            onClick={() => codeInputRef.current?.focus()}
            className="relative mt-5 block w-full cursor-text"
          >
            <input
              ref={codeInputRef}
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              aria-label="6-digit verification code"
              className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0"
            />
            <div className="flex h-14 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white">
              <div className="flex items-center gap-4">
                {Array.from({ length: 6 }).map((_, index) => {
                  const digit = code[index];
                  return (
                    <span
                      key={index}
                      className={cn(
                        "flex h-6 w-3 items-center justify-center text-[22px] leading-none",
                        digit ? "font-semibold text-[#111417]" : "text-[#C4C4C4]",
                      )}
                    >
                      {digit || "·"}
                    </span>
                  );
                })}
              </div>
            </div>
          </button>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              className="text-sm font-medium text-[#555] underline underline-offset-2"
              onClick={() => {
                setStep(1);
                setCode("");
              }}
            >
              Use a different email or phone
            </button>
            {resendIn > 0 ? (
              <span className="shrink-0 text-sm text-gray-400">Resend in {resendIn}s</span>
            ) : (
              <button
                type="button"
                className="shrink-0 text-sm font-medium text-[#111417] underline underline-offset-2"
                onClick={() => sendCode()}
              >
                Resend code
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
