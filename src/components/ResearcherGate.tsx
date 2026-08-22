"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { floatingHeroImages } from "@/data/media";

const KEY = "klear.researcher.ok";

const drifts = [
  { duration: 28, delay: -2, rotate: 14, cls: "animate-float-slow" },
  { duration: 26, delay: -16, rotate: -10, cls: "animate-float-delayed" },
  { duration: 34, delay: -8, rotate: 9, cls: "animate-float" },
  { duration: 38, delay: -22, rotate: 6, cls: "animate-float-delayed" },
  { duration: 30, delay: -12, rotate: -13, cls: "animate-float-slow" },
  { duration: 32, delay: -26, rotate: 10, cls: "animate-float" },
  { duration: 30, delay: -19, rotate: -8, cls: "animate-float-delayed" },
  { duration: 28, delay: -5, rotate: 12, cls: "animate-float-slow" },
  { duration: 36, delay: -27, rotate: -7, cls: "animate-float" },
  { duration: 40, delay: -10, rotate: 8, cls: "animate-float-delayed" },
  { duration: 31, delay: -24, rotate: -11, cls: "animate-float-slow" },
  { duration: 33, delay: -14, rotate: 9, cls: "animate-float" },
];

export function ResearcherGate() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(window.localStorage.getItem(KEY) !== "1");
    setReady(true);
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem(KEY, "1");
    setOpen(false);
  }

  if (!ready || !open) return null;

  const vials = [...floatingHeroImages, ...floatingHeroImages].slice(0, 12);

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden bg-[#fafafa]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {vials.map((item, index) => {
          const drift = drifts[index % drifts.length];
          return (
            <div
              key={`${item.src}-${index}`}
              className="absolute bottom-[-30%] will-change-transform"
              style={{
                left: `${3 + index * 8}%`,
                width: `clamp(56px, ${7.2 + (index % 3)}vw, 118px)`,
                opacity: 0.55,
                animation: `vial-drift ${drift.duration}s ${drift.delay}s linear infinite`,
                ["--drift-rot" as string]: `${drift.rotate}deg`,
              }}
            >
              <div className={drift.cls}>
                <Image
                  src={item.src}
                  alt=""
                  width={160}
                  height={220}
                  className="h-auto w-full select-none object-contain drop-shadow-[0_25px_45px_rgba(15,23,42,0.1)]"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      <main className="relative z-10 flex min-h-full items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="mb-6 flex justify-center">
            <Image src="/brand/logo.png" alt="klear. CLUB" width={350} height={115} className="h-12 w-auto md:h-14" />
          </div>
          <form
            onSubmit={onSubmit}
            className="rounded-[20px] border border-[#ececec] bg-white p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.12)] md:p-8"
          >
            <h1 className="text-[24px] font-bold tracking-[-0.03em] text-black md:text-[28px]">
              Researcher verification
            </h1>
            <p className="mt-2 text-[14px] leading-[1.55] text-[#666]">
              Klear Club sells research peptides exclusively to qualified researchers and laboratories for in vitro and
              laboratory use. Please confirm before continuing.
            </p>
            <label className="mt-6 flex items-start gap-3 text-[14px] leading-[1.55] text-[#444]">
              <input required type="checkbox" className="mt-1 accent-black" />
              I am at least 21 years of age.
            </label>
            <label className="mt-3 flex items-start gap-3 text-[14px] leading-[1.55] text-[#444]">
              <input required type="checkbox" className="mt-1 accent-black" />
              I confirm I am a qualified researcher purchasing for in vitro / laboratory research only — not for human
              or veterinary use.
            </label>
            <button
              type="submit"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-black text-[14px] font-medium text-white transition hover:opacity-90"
            >
              Enter Klear Club
            </button>
            <p className="mt-4 text-[12px] leading-[1.55] text-[#9a9a9a]">
              By proceeding you affirm the statements above are true. Products are not for human or veterinary use, not
              for use in diagnostic procedures, and have not been evaluated by the U.S. Food and Drug Administration.{" "}
              <Link href="/disclaimer" className="text-black underline underline-offset-2">
                Full disclaimer.
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
