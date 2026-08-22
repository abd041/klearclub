import Image from "next/image";
import Link from "next/link";
import { productImage, productImageClass, PRODUCT_IMAGE_BG } from "@/data/media";
import { getProduct } from "@/data/products";
import { formatMoney } from "@/lib/format";

const BOX_ITEMS = [
  { slug: "glp-3", bg: "#ece8f7" },
  { slug: "glp-2", bg: "#dceaf8" },
  { slug: "glp-1", bg: "#f3e8e4" },
  { slug: "ghk-cu-spray", bg: "#d5e4f4" },
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
    <section className="grid bg-white lg:grid-cols-2">
      <div className="flex items-center bg-white px-5 py-14 sm:px-10 lg:px-16 xl:px-20">
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

      <div className="relative flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] via-[#eef8f1] to-[#e8f0f8] px-5 py-16 sm:px-10 lg:justify-end lg:pr-16 lg:pl-6">
        <div className="relative w-full max-w-[300px] rounded-[32px] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.10)] lg:-ml-4 lg:mr-2">
          <div className="absolute -right-4 -top-4 flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#fff3a3] text-center shadow-[0_8px_20px_rgba(180,150,20,0.18)]">
            <span className="font-serif text-[22px] font-bold leading-[0.95] text-black">
              40%
              <span className="mt-0.5 block font-sans text-[11px] font-bold tracking-[0.08em]">OFF</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 pr-12">
            <h3 className="text-[18px] font-bold text-black">Your box</h3>
            <span className="rounded-full bg-[#ececec] px-2.5 py-1 text-[10px] font-semibold tracking-[0.05em] text-black">
              4 ITEMS + 1 FREE
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {items.map((item) =>
              item.product ? (
                <div key={item.slug} className="overflow-hidden rounded-2xl" style={{ backgroundColor: PRODUCT_IMAGE_BG }}>
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={productImage(item.product)}
                      alt={item.product.name}
                      fill
                      unoptimized
                      sizes="160px"
                      className={productImageClass}
                    />
                  </div>
                  <p className="px-2 pb-2.5 text-center text-[11px] font-bold text-black">
                    {item.product.name}
                  </p>
                </div>
              ) : null,
            )}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-full bg-[#e8f5e9] px-4 py-2.5">
            <span className="text-[13px] text-[#6b6b6b]">
              <span className="font-bold text-black">Klear H2O</span> included
            </span>
            <span className="text-[13px] font-bold text-[#2e7d32]">FREE</span>
          </div>

          <div className="mt-4 flex items-end justify-between border-t border-[#eee] pt-4">
            <p className="text-[13px] text-[#9e9e9e] line-through">{formatMoney(retail)} retail</p>
            <p className="text-[28px] font-extrabold leading-none text-black">
              {formatMoney(sale)}
              <span className="ml-0.5 text-[15px] font-medium">/mo</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
