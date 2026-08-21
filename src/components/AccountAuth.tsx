"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";

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

function safeRedirect(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/store";
  return value;
}

export function AccountAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirect"));

  const [step, setStep] = useState<1 | 2>(1);
  const [contact, setContact] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [code, setCode] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const codeInputRef = useRef<HTMLInputElement>(null);

  const canSubmit = contact.trim().length >= 5;

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
      const timer = window.setTimeout(() => router.push(redirectTo), 250);
      return () => window.clearTimeout(timer);
    }
  }, [code, step, redirectTo, router]);

  function sendCode(event?: FormEvent) {
    event?.preventDefault();
    const target = (contact.trim() || sentTo).trim();
    if (target.length < 5) return;
    setSentTo(target);
    setCode("");
    setResendIn(30);
    setStep(2);
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-start justify-center bg-white sm:items-center">
      <div className="mx-auto w-full max-w-md px-4 py-8">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="Klear Club home">
            <Image
              src="/brand/logo.png"
              alt="Klear Club"
              width={280}
              height={80}
              className="h-7 w-auto"
              priority
              unoptimized
            />
          </Link>
        </div>

        {step === 1 ? (
          <>
            <h1 className="text-center text-2xl font-semibold tracking-tight text-black">Sign in or sign up</h1>
            <p className="mt-2 text-center text-sm text-[#666]">We&apos;ll send you a one-time code.</p>

            <form className="mt-7 space-y-3" onSubmit={sendCode}>
              <input
                type="text"
                inputMode="tel"
                autoComplete="tel"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="go"
                autoFocus
                name="phone"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                placeholder="Email or phone number"
                aria-label="Email or phone number"
                className="block h-14 w-full rounded-2xl border border-transparent bg-[#f5f5f5] px-4 text-base text-black transition-colors placeholder:text-black/40 focus:border-black focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className={cn(
                  "group relative inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black text-base font-medium text-white transition-all duration-100",
                  "hover:bg-black/90 active:scale-[0.99] active:bg-black/80",
                  "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
                )}
                style={{ color: "#ffffff" }}
              >
                <span>Sign in or sign up</span>
                <svg
                  className="h-4 w-4 -mr-0.5 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </form>

            <p className="mt-8 text-center text-[11px] leading-relaxed text-[#999]">
              By continuing you agree to our{" "}
              <Link href="/terms" className="text-[#666] underline hover:text-black">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#666] underline hover:text-black">
                Privacy Policy
              </Link>
              .
            </p>
          </>
        ) : (
          <>
            <h1 className="text-center text-2xl font-semibold tracking-tight text-black">Enter your code</h1>
            <p className="mt-2 text-center text-sm text-[#666]">
              We {isEmail(sentTo) ? "emailed" : "texted"} a 6-digit code to{" "}
              <span className="font-medium text-black">{maskContact(sentTo)}</span>.
            </p>

            <button
              type="button"
              onClick={() => codeInputRef.current?.focus()}
              className="relative mt-7 block w-full cursor-text"
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
              <div className="flex h-14 items-center justify-center rounded-2xl border border-transparent bg-[#f5f5f5]">
                <div className="flex items-center gap-4">
                  {Array.from({ length: 6 }).map((_, index) => {
                    const digit = code[index];
                    return (
                      <span
                        key={index}
                        className={cn(
                          "flex h-6 w-3 items-center justify-center text-[22px] leading-none",
                          digit ? "font-semibold text-black" : "text-[#C4C4C4]",
                        )}
                      >
                        {digit || "·"}
                      </span>
                    );
                  })}
                </div>
              </div>
            </button>

            <div className="mt-6 flex items-center justify-between gap-3">
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
                  className="shrink-0 text-sm font-medium text-black underline underline-offset-2"
                  onClick={() => sendCode()}
                >
                  Resend code
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
