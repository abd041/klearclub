"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";

type Props = {
  totalUnits: number;
  productCount: number;
  total: number;
  onBack: () => void;
  onComplete: () => void;
  sticky?: boolean;
};

function maskContact(value: string) {
  const trimmed = value.trim();
  if (trimmed.includes("@")) {
    const [local, domain] = trimmed.split("@");
    if (!domain) return trimmed;
    const first = local[0] ?? "";
    return `${first}***@${domain}`;
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 4) return trimmed;
  return `••• ••• ${digits.slice(-4)}`;
}

function isEmail(value: string) {
  return value.includes("@");
}

export function BulkAuthPanel({
  totalUnits,
  productCount,
  total,
  onBack,
  onComplete,
  sticky = true,
}: Props) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
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
      const timer = window.setTimeout(() => setStep(3), 250);
      return () => window.clearTimeout(timer);
    }
  }, [code, step]);

  const productLabel = productCount === 1 ? "1 product" : `${productCount} products`;
  const unitLabel = totalUnits === 1 ? "1 unit" : `${totalUnits} units`;
  const canSend = contact.trim().length >= 5;
  const progressLabel = step === 3 ? "Step 2 of 3" : "Step 1 of 3";

  function sendCode(event?: FormEvent) {
    event?.preventDefault();
    if (!canSend && !sentTo) return;
    const target = (contact.trim() || sentTo).trim();
    if (target.length < 5) return;
    setSentTo(target);
    setCode("");
    setResendIn(30);
    setStep(2);
  }

  function finish(event: FormEvent) {
    event.preventDefault();
    onComplete();
    router.push("/checkout");
  }

  function handleBack() {
    if (step === 1) onBack();
    else if (step === 2) setStep(1);
    else setStep(2);
  }

  return (
    <div
      className={cn(
        "max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-[24px] border border-[#ececec] p-5",
        sticky && "sticky top-24",
      )}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#555555]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Edit order
        </button>
        <span className="text-sm text-gray-400">{progressLabel}</span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-full bg-[#f5f5f5] px-4 py-3">
        <p className="min-w-0 truncate text-sm text-gray-500">
          <span className="font-semibold text-[#131315]">Bulk order</span>
          {" · "}
          {unitLabel} · {productLabel}
        </p>
        <p className="shrink-0 text-sm font-bold text-[#131315]">{formatMoney(total)}</p>
      </div>

      {step === 1 ? (
        <form onSubmit={sendCode} className="mt-6">
          <h2 className="text-[26px] leading-tight font-bold tracking-tight text-[#131315]">
            Sign in or sign up
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6b6b6b]">
            Your order is tied to your account so you can track delivery and reorder in one tap. We&apos;ll send you a
            one-time code.
          </p>
          <input
            required
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="Email or phone number"
            autoComplete="username"
            className="mt-5 h-12 w-full rounded-[16px] bg-[#f5f5f5] px-4 text-[15px] text-[#131315] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#131315]/15"
          />
          <p className="mt-3 text-[11px] leading-relaxed text-gray-400">
            If you enter a phone number, standard message and data rates may apply. Reply STOP to opt out at any time.
          </p>
          <button
            type="submit"
            disabled={!canSend}
            className={cn(
              "mt-5 flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition-colors",
              canSend
                ? "bg-[#131315] text-white hover:bg-gray-800"
                : "cursor-not-allowed bg-[#bdbdbd] text-white",
            )}
            style={{ color: "#ffffff" }}
          >
            Send my code
          </button>
        </form>
      ) : null}

      {step === 2 ? (
        <div className="mt-6">
          <h2 className="text-[26px] leading-tight font-bold tracking-tight text-[#131315]">Enter your code</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6b6b6b]">
            We {isEmail(sentTo) ? "emailed" : "texted"} a 6-digit code to {maskContact(sentTo)}.
          </p>

          <label className="relative mt-5 block cursor-text">
            <input
              ref={codeInputRef}
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              aria-label="6-digit verification code"
              className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0"
            />
            <div className="flex h-12 items-center justify-center rounded-[16px] bg-[#f5f5f5]">
              <div className="flex items-center gap-3.5">
                {Array.from({ length: 6 }).map((_, index) => {
                  const digit = code[index];
                  return (
                    <span
                      key={index}
                      className={cn(
                        "flex h-5 w-4 items-center justify-center",
                        digit ? "text-[20px] leading-none font-semibold text-[#131315]" : "",
                      )}
                    >
                      {digit ? digit : <span className="h-2.5 w-2.5 rounded-full bg-[#c4c4c4]" />}
                    </span>
                  );
                })}
              </div>
            </div>
          </label>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="text-left text-sm font-medium text-[#555] underline underline-offset-2"
              onClick={() => {
                setStep(1);
                setCode("");
              }}
            >
              Use a different email or phone
            </button>
            {resendIn > 0 ? (
              <span className="text-sm text-gray-400">Resend in {resendIn}s</span>
            ) : (
              <button
                type="button"
                className="text-left text-sm font-medium text-[#131315] underline underline-offset-2 sm:text-right"
                onClick={() => sendCode()}
              >
                Resend code
              </button>
            )}
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <form onSubmit={finish} className="mt-6">
          <h2 className="text-[26px] leading-tight font-bold tracking-tight text-[#131315]">
            Confirm your bulk order
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6b6b6b]">
            You&apos;re set for {unitLabel} across {productLabel} at {formatMoney(total)}, with free 2-day signed
            delivery.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-[#444]">
            <li className="flex justify-between gap-3 rounded-2xl bg-[#f5f5f5] px-4 py-3">
              <span>Order total</span>
              <span className="font-semibold text-[#131315]">{formatMoney(total)}</span>
            </li>
            <li className="flex justify-between gap-3 rounded-2xl bg-[#f5f5f5] px-4 py-3">
              <span>Account</span>
              <span className="truncate font-medium text-[#131315]">{maskContact(sentTo)}</span>
            </li>
          </ul>
          <button
            type="submit"
            className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-[#131315] text-sm font-semibold text-white hover:bg-gray-800"
            style={{ color: "#ffffff" }}
          >
            Continue to checkout · {formatMoney(total)}
          </button>
        </form>
      ) : null}
    </div>
  );
}
