"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { productImage } from "@/data/media";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";

type Props = {
  open: boolean;
  onBack: () => void;
  onClose: () => void;
  boxCount: number;
  itemCount: number;
  monthly: number;
  onComplete: () => void;
};

function maskContact(value: string) {
  const trimmed = value.trim();
  if (trimmed.includes("@")) {
    const [local, domain] = trimmed.split("@");
    if (!domain) return trimmed;
    if (local.length <= 2) return `${local[0] ?? ""}••@${domain}`;
    return `${local[0]}••${local[local.length - 1]}@${domain}`;
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 4) return trimmed;
  return `••• ••• ${digits.slice(-4)}`;
}

function isEmail(value: string) {
  return value.includes("@");
}

export function BoxAuthSheet({
  open,
  onBack,
  onClose,
  boxCount,
  itemCount,
  monthly,
  onComplete,
}: Props) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [contact, setContact] = useState("");
  const [code, setCode] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const codeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setContact("");
      setCode("");
      setSentTo("");
      setResendIn(0);
      return;
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

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

  if (!open) return null;

  const boxLabel = boxCount === 1 ? "1 box" : `${boxCount} boxes`;
  const h2oLabel = boxCount === 1 ? "1 free Klear H2O" : `${boxCount} free Klear H2O`;
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

  return (
    <div className="fixed inset-0 z-[85]">
      <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sign in to continue"
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[94vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.18)] sm:inset-y-auto sm:top-1/2 sm:bottom-auto sm:max-h-[90vh] sm:-translate-y-1/2 sm:rounded-[28px]"
      >
        <div className="flex shrink-0 justify-center pt-3 pb-1 sm:hidden">
          <span className="h-1 w-10 rounded-full bg-[#d8d8d8]" />
        </div>

        <div className="flex items-center justify-between px-4 pt-2 sm:px-5 sm:pt-5">
          <button
            type="button"
            onClick={() => {
              if (step === 1) onBack();
              else if (step === 2) setStep(1);
              else setStep(2);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#555555]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Edit box
          </button>
          <span className="text-sm text-gray-400">{progressLabel}</span>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-4 pt-4 pb-5 sm:px-5">
          <div className="flex items-center justify-between gap-3 rounded-full bg-[#f5f5f5] px-4 py-3">
            <p className="min-w-0 truncate text-sm text-gray-500">
              <span className="font-semibold text-[#131315]">{boxLabel}</span>
              {" · "}
              {itemCount} items + {h2oLabel}
            </p>
            <p className="shrink-0 text-sm font-bold text-[#131315]">{formatMoney(monthly)}/mo</p>
          </div>

          {step === 1 ? (
            <form onSubmit={sendCode} className="mt-7">
              <h2 className="text-[28px] leading-tight font-bold tracking-tight text-[#131315]">
                Sign in or sign up
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6b6b6b]">
                Your box is tied to your account so you can swap items, track deliveries, and manage billing. We&apos;ll
                send you a one-time code.
              </p>
              <input
                required
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                placeholder="Email or phone number"
                autoComplete="username"
                className="mt-6 h-14 w-full rounded-[18px] bg-[#f5f5f5] px-5 text-[15px] text-[#131315] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#131315]/15"
              />
              <p className="mt-3 text-[12px] leading-relaxed text-gray-400">
                If you enter a phone number, standard message and data rates may apply. Reply STOP to opt out at any
                time.
              </p>
              <button
                type="submit"
                disabled={!canSend}
                className={cn(
                  "mt-6 flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition-colors",
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
            <div className="mt-7">
              <h2 className="text-[28px] leading-tight font-bold tracking-tight text-[#131315]">Enter your code</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6b6b6b]">
                We {isEmail(sentTo) ? "emailed" : "texted"} a 6-digit code to{" "}
                <span className="font-semibold text-[#131315]">{maskContact(sentTo)}</span>.
              </p>

              <label className="relative mt-6 block cursor-text">
                <input
                  ref={codeInputRef}
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  aria-label="6-digit verification code"
                  className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0"
                />
                <div className="flex h-14 items-center justify-center rounded-[18px] bg-[#f5f5f5]">
                  <div className="flex items-center gap-3">
                    {Array.from({ length: 6 }).map((_, index) => {
                      const digit = code[index];
                      return (
                        <span
                          key={index}
                          className={cn(
                            "flex h-3 w-3 items-center justify-center",
                            digit ? "text-[22px] leading-none font-semibold text-[#131315]" : "",
                          )}
                        >
                          {digit ? digit : <span className="h-2 w-2 rounded-full bg-[#c4c4c4]" />}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </label>

              <div className="mt-4 flex items-center justify-between gap-3">
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
                  <span className="text-sm text-gray-400">Resend in {resendIn}s</span>
                ) : (
                  <button
                    type="button"
                    className="text-sm font-medium text-[#131315] underline underline-offset-2"
                    onClick={() => sendCode()}
                  >
                    Resend code
                  </button>
                )}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <form onSubmit={finish} className="mt-7">
              <h2 className="text-[28px] leading-tight font-bold tracking-tight text-[#131315]">
                Confirm your subscription
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6b6b6b]">
                You&apos;re set for {boxLabel} at {formatMoney(monthly)}/mo with free 2-day delivery and free Klear H2O
                in every box. 3 monthly deliveries to start — cancel anytime after month 3.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-[#444]">
                <li className="flex justify-between gap-3 rounded-2xl bg-[#f5f5f5] px-4 py-3">
                  <span>Monthly total</span>
                  <span className="font-semibold text-[#131315]">{formatMoney(monthly)}/mo</span>
                </li>
                <li className="flex justify-between gap-3 rounded-2xl bg-[#f5f5f5] px-4 py-3">
                  <span>Account</span>
                  <span className="truncate font-medium text-[#131315]">{maskContact(sentTo)}</span>
                </li>
              </ul>
              <button
                type="submit"
                className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#131315] text-sm font-semibold text-white hover:bg-gray-800"
                style={{ color: "#ffffff" }}
              >
                Continue to checkout · {formatMoney(monthly)}/mo
              </button>
            </form>
          ) : null}

          <div className="mt-8 flex items-center gap-3 rounded-[18px] bg-[#e9fce6] px-3.5 py-3.5">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/70">
              <Image
                src={productImage({ slug: "klear-h2o", form: "vial" })}
                alt="Klear H2O"
                fill
                unoptimized
                className="object-cover object-[80%_center]"
                sizes="48px"
              />
            </div>
            <p className="text-sm leading-snug text-[#3f3f3f]">
              Your free Klear H2O and 40% pricing are saved with this box.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
