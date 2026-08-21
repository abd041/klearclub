import Image from "next/image";
import Link from "next/link";
import { productImage } from "@/data/media";
import { getProduct } from "@/data/products";

const TICKER = "YOU EARN 10% IN POINTS  ·  FREE 2-DAY SHIPPING  ·  THIRD-PARTY COAs  ·  ONE LINK  ·  THEY SAVE 35%";

const LINES = [
  { slug: "glp-3", qty: "x2", bg: "#ece8f7" },
  { slug: "glp-2", qty: "x1", bg: "#dceaf8" },
  { slug: "glp-1", qty: "x1", bg: "#f3e8e4" },
] as const;

export function ResearchBundlesSection() {
  const items = LINES.map((line) => ({
    ...line,
    product: getProduct(line.slug),
  }));

  return (
    <section className="relative overflow-hidden bg-[#f7f8f7]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_70%_45%,rgba(167,184,255,0.28),transparent_58%),radial-gradient(ellipse_at_82%_38%,rgba(214,201,255,0.22),transparent_52%)]"
      />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_680px] lg:py-16 xl:px-10">
        <div className="max-w-[520px]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#b4bab8]">
            Research Bundles · New
          </p>
          <h2 className="mt-4 font-display text-[34px] font-extrabold leading-[1.06] tracking-[-0.045em] text-[#111111] sm:text-[42px]">
            Good research travels by link.
          </h2>
          <p className="mt-4 max-w-[460px] text-[15px] leading-[1.7] text-[#6e7371] sm:text-[16px]">
            Load 3+ vials onto one ticket and send a single link. Everyone who orders through it pays 35% less with
            free 2-day shipping, and 10% of every order comes back to you in points.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              href="/bundles"
              className="inline-flex h-12 items-center rounded-full bg-[#2D4BF0] px-7 text-[15px] font-semibold shadow-[0_10px_24px_rgba(45,75,240,0.28)] no-underline transition hover:brightness-110"
              style={{ color: "#ffffff" }}
            >
              Build a bundle
            </Link>
            <p className="font-mono text-[11px] tracking-[0.01em] text-[#b4bab8]">about a minute, sign-in only to save</p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[680px] overflow-x-auto lg:mx-0 lg:overflow-visible">
          <div className="relative h-[400px] w-[680px]">
            <div className="pointer-events-none absolute left-[28%] top-[6%] h-56 w-56 rounded-full bg-[#9db0ff]/35 blur-[70px]" />
            <div className="pointer-events-none absolute right-[6%] top-[16%] h-52 w-52 rounded-full bg-[#c9b8ff]/30 blur-[80px]" />

            <div className="animate-bundle-float-slow absolute left-[343px] top-[22px] h-[100px] w-[240px] rounded-[28px] border border-white/70 bg-white/75 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-md">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#c5cbc9]">Bundle ticket</p>
              <div className="mt-3 space-y-2">
                <div className="h-[7px] w-[72%] rounded-full bg-[#eceeed]" />
                <div className="h-[7px] w-[54%] rounded-full bg-[#f3f4f3]" />
              </div>
            </div>

            <div className="animate-bundle-float absolute left-[123px] top-[18px] z-10 flex h-[279px] w-[275px] flex-col rounded-[28px] bg-white px-5 py-4 shadow-[0_24px_60px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.03]">
              <div className="flex items-start justify-between">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#b4bab8]">
                  Research bundle
                </p>
                <span className="rounded-full bg-[#e8ecfe] px-2 py-0.5 text-[11px] font-semibold text-[#2D4BF0]">
                  -35%
                </span>
              </div>
              <p className="mt-1 text-[21px] font-bold leading-tight tracking-[-0.03em] text-[#111111]">Shared with you</p>

              <ul className="mt-2.5 flex-1">
                {items.map((item, index) => (
                  <li
                    key={item.slug}
                    className={`flex items-center gap-2.5 py-[7px] ${index < items.length - 1 ? "border-b border-[#f1f2f1]" : ""}`}
                  >
                    <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg" style={{ background: item.bg }}>
                      {item.product ? (
                        <Image
                          src={productImage(item.product)}
                          alt=""
                          fill
                          unoptimized
                          className="object-contain p-[2px]"
                        />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1 text-[13px] font-medium text-[#111111]">
                      {item.product?.name ?? item.slug}
                    </span>
                    <span className="font-mono text-[12px] text-[#9aa3a1]">{item.qty}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-1 flex items-center justify-between border-t border-dashed border-[#e6e8e7] pt-2.5">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#9aa3a1]">
                  2-day shipping
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.04em] text-[#1f9d53]">Free</span>
              </div>
            </div>

            <div className="animate-bundle-float-delayed absolute left-[58px] top-[345px] z-20 flex h-[31px] items-center rounded-full bg-[#111111] px-[18px] font-mono text-[11px] font-medium tracking-[0.01em] text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)]">
              one link · shared anywhere
            </div>

            <div className="animate-bundle-sway absolute left-[498px] top-[289px] z-20 flex h-[59px] w-[183px] flex-col justify-center rounded-[18px] bg-[#2D4BF0] px-4 text-white shadow-[0_16px_36px_rgba(45,75,240,0.42)]">
              <p className="text-[16px] font-bold leading-none tracking-[-0.02em]">+10% back</p>
              <p className="mt-1 text-[11px] leading-none text-white/88">in points, every order</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-[#eceeed]/80 py-2.5">
        <div className="animate-bundle-marquee flex w-max whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#8d9491]">
          <span className="px-8">{TICKER}  ·  {TICKER}  ·  </span>
          <span className="px-8">{TICKER}  ·  {TICKER}  ·  </span>
        </div>
      </div>
    </section>
  );
}
