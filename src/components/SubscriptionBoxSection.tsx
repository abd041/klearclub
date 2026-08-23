import Image from "next/image";
import Link from "next/link";
import { productCardImageClass, productImage } from "@/data/media";
import { getProduct } from "@/data/products";
import { formatMoney } from "@/lib/format";
import { productCardStageStyle } from "@/lib/product-palette";

const BOX_ITEMS = [
  { slug: "glp-3" },
  { slug: "glp-2" },
  { slug: "glp-1" },
  { slug: "ghk-cu-spray" },
] as const;

const perks = [
  "Free Klear H2O in every single box",
  "Free 2-day delivery, every month",
  "Swap items anytime after your first delivery",
  "COA-verified batches, third-party tested",
];

export function SubscriptionBoxSection() {
  const items = BOX_ITEMS.map((item) => ({
    ...item,
    product: getProduct(item.slug),
  })).filter((item) => item.product);
  const retail = items.reduce((sum, item) => sum + (item.product?.variants[0]?.price ?? 0), 0);
  const sale = Math.round(retail * 0.6 * 100) / 100;

  return (
    <section className="home-section-y grid bg-white lg:grid-cols-2">
      <div className="flex items-center bg-white px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="w-full max-w-[560px]">
          <span className="inline-flex items-center rounded-full bg-[#dcfce7] px-3.5 py-1 text-[13px] font-medium text-[#15803d]">
            Membership savings
          </span>
          <h2 className="mt-6 text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#111111] sm:text-[42px]">
            Why researchers save 40% every month.
          </h2>
          <p className="mt-4 max-w-[520px] text-[16px] leading-[1.6] text-[#555555]">
            Build a box from any research compounds in the catalog and we pack and ship it monthly, at 40% off retail for as long as you subscribe.
          </p>
          <ul className="mt-7 flex flex-col gap-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-[16px] leading-6 text-[#444444]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dcfce7]">
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2.2 6.2 4.7 8.7 10 3.2" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {perk}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              href="/build-a-box"
              className="inline-flex h-12 items-center gap-2 rounded-[10px] bg-black px-7 text-[15px] font-semibold text-white no-underline"
              style={{ color: "#ffffff" }}
            >
              Start Today
              <span aria-hidden="true">→</span>
            </Link>
            <p className="text-[13px] leading-5 text-[#888888]">3 monthly deliveries to start, then cancel anytime.</p>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] via-[#eef8f1] to-[#e8f0f8] px-5 py-12 sm:px-10 sm:py-14 lg:justify-end lg:py-10 lg:pr-16 lg:pl-6">
        <div className="relative w-full max-w-[320px] rounded-[28px] bg-white px-5 pt-6 pb-8 shadow-[0_20px_50px_rgba(15,23,42,0.10)] sm:max-w-[300px] sm:rounded-[32px] sm:px-6 sm:pt-7 sm:pb-9 lg:-ml-4 lg:mr-2">
          <div className="absolute -right-3 -top-3 flex h-[78px] w-[78px] items-center justify-center rounded-full bg-[#fff3a3] text-center shadow-[0_8px_20px_rgba(180,150,20,0.18)] sm:-right-4 sm:-top-4 sm:h-[84px] sm:w-[84px]">
            <span className="font-serif text-[21px] font-bold leading-[0.95] text-black sm:text-[22px]">
              40%
              <span className="mt-0.5 block font-sans text-[10px] font-bold tracking-[0.08em] sm:text-[11px]">OFF</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pr-14 sm:gap-2.5 sm:pr-12">
            <h3 className="text-[18px] font-bold text-black">Your box</h3>
            <span className="rounded-full bg-[#ececec] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-[#2D4BF0]">
              4 ITEMS + 1 FREE
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3.5 sm:mt-6 sm:gap-4">
            {items.map((item) =>
              item.product ? (
                <div key={item.slug} className="min-w-0">
                  <div
                    className="relative aspect-square overflow-hidden rounded-[16px]"
                    style={productCardStageStyle(item.slug)}
                  >
                    <Image
                      src={productImage(item.product)}
                      alt={item.product.name}
                      fill
                      unoptimized
                      sizes="160px"
                      className={productCardImageClass}
                    />
                  </div>
                  <p className="mt-2.5 text-center text-[11px] font-medium leading-tight text-black sm:mt-3">
                    {item.product.name}
                  </p>
                </div>
              ) : null,
            )}
          </div>

          <div className="mt-5 flex items-center justify-between rounded-full bg-[#e8f5e9] px-4 py-3 sm:mt-6">
            <span className="text-[13px] text-[#6b6b6b]">
              <span className="font-bold text-black">Klear H2O</span> included
            </span>
            <span className="text-[13px] font-bold text-[#2e7d32]">FREE</span>
          </div>

          <div className="mt-5 flex items-end justify-between border-t border-[#eeeeee] pt-5 sm:mt-6">
            <p className="pb-1 text-[13px] text-[#9e9e9e] line-through">{formatMoney(retail)} retail</p>
            <p className="pb-0.5 text-[26px] font-extrabold leading-none tracking-[-0.02em] text-black sm:text-[28px]">
              {formatMoney(sale)}
              <span className="ml-0.5 text-[14px] font-medium sm:text-[15px]">/mo</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
