import Image from "next/image";
import Link from "next/link";
import { productImage, productImageClass, PRODUCT_IMAGE_BG } from "@/data/media";
import { getProduct } from "@/data/products";
import { formatMoney } from "@/lib/format";

const localImages = [
  "/hero/bpc.png",
  "/hero/tb.png",
  "/hero/nad.png",
  "/hero/h2o.png",
  "/hero/dsip.png",
  "/hero/ghk.png",
  "/hero/tesamorelin.png",
  "/hero/melanotan.png",
  "/hero/aod.png",
  "/hero/spray.png",
  "/hero/GHK-Cu.png",
  "/hero/AminoH2o.png",
];

const tileBgs = ["#ece8f7", "#fde8e8", "#e3f2fd", "#fff4cc", "#e8f5e9", "#fce4ec", "#e0f2fe", "#f3e8ff", "#f3e8e4", "#dceaf8"];

const tiles = [
  { left: "2%", size: 92, opacity: 0.72, tilt: -8, dur: "16s", delay: "-2s" },
  { left: "8%", size: 68, opacity: 0.42, tilt: 11, dur: "21s", delay: "-11s" },
  { left: "14%", size: 84, opacity: 0.58, tilt: -5, dur: "18s", delay: "-6s" },
  { left: "20%", size: 56, opacity: 0.32, tilt: 14, dur: "24s", delay: "-17s" },
  { left: "26%", size: 96, opacity: 0.7, tilt: -12, dur: "15s", delay: "-4s" },
  { left: "32%", size: 62, opacity: 0.36, tilt: 7, dur: "22s", delay: "-13s" },
  { left: "38%", size: 78, opacity: 0.5, tilt: -10, dur: "19s", delay: "-8s" },
  { left: "44%", size: 54, opacity: 0.28, tilt: 9, dur: "25s", delay: "-19s" },
  { left: "50%", size: 88, opacity: 0.55, tilt: -6, dur: "17s", delay: "-3s" },
  { left: "56%", size: 64, opacity: 0.38, tilt: 12, dur: "20s", delay: "-14s" },
  { left: "62%", size: 80, opacity: 0.6, tilt: -9, dur: "16s", delay: "-7s" },
  { left: "68%", size: 58, opacity: 0.3, tilt: 6, dur: "23s", delay: "-16s" },
  { left: "74%", size: 94, opacity: 0.68, tilt: -11, dur: "14s", delay: "-5s" },
  { left: "80%", size: 70, opacity: 0.44, tilt: 8, dur: "21s", delay: "-12s" },
  { left: "86%", size: 86, opacity: 0.62, tilt: -7, dur: "18s", delay: "-1s" },
  { left: "91%", size: 60, opacity: 0.34, tilt: 13, dur: "24s", delay: "-18s" },
  { left: "5%", size: 48, opacity: 0.24, tilt: -4, dur: "26s", delay: "-9s" },
  { left: "17%", size: 72, opacity: 0.46, tilt: 10, dur: "19s", delay: "-20s" },
  { left: "29%", size: 52, opacity: 0.26, tilt: -13, dur: "27s", delay: "-10s" },
  { left: "41%", size: 76, opacity: 0.48, tilt: 5, dur: "17s", delay: "-15s" },
  { left: "53%", size: 50, opacity: 0.25, tilt: -8, dur: "25s", delay: "-21s" },
  { left: "65%", size: 90, opacity: 0.64, tilt: 11, dur: "15s", delay: "-6s" },
  { left: "77%", size: 66, opacity: 0.4, tilt: -6, dur: "22s", delay: "-22s" },
  { left: "89%", size: 74, opacity: 0.52, tilt: 9, dur: "18s", delay: "-8s" },
  { left: "11%", size: 58, opacity: 0.3, tilt: -14, dur: "20s", delay: "-23s" },
  { left: "71%", size: 82, opacity: 0.56, tilt: 4, dur: "16s", delay: "-9s" },
];

export function BulkOrdersSection() {
  const product = getProduct("glp-3");
  const unit = product?.variants[0]?.price ?? 69.99;
  const qty = 10;
  const retail = Math.round(unit * qty * 100) / 100;
  const sale = Math.round(retail * 0.6 * 100) / 100;
  const saved = Math.round((retail - sale) * 100) / 100;

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#f4f7c4] via-[#eaf6ec] to-[#dceaf8] px-5 py-24 sm:px-8 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {tiles.map((tile, index) => (
          <div
            key={`${tile.left}-${index}`}
            className="bulk-rain-tile absolute top-1/2"
            style={{
              left: tile.left,
              width: tile.size,
              height: tile.size,
              marginTop: -tile.size / 2,
              opacity: tile.opacity,
              animationDuration: tile.dur,
              animationDelay: tile.delay,
              ["--rain-tilt" as string]: `${tile.tilt}deg`,
            }}
          >
            <div
              className="h-full w-full overflow-hidden rounded-[22px] shadow-[0_10px_24px_rgba(15,23,42,0.10)]"
              style={{ background: tileBgs[index % tileBgs.length] }}
            >
              <Image
                src={localImages[index % localImages.length]}
                alt=""
                width={tile.size}
                height={tile.size}
                unoptimized
                className="h-full w-full select-none object-contain p-1.5"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center text-center">
        <span className="inline-flex items-center rounded-full bg-[#fef9c3] px-3.5 py-1 text-[13px] font-medium text-[#3f3f3f]">
          New
          <span className="mx-1.5 text-[10px] leading-none">•</span>
          Bulk orders
        </span>
        <h2 className="mt-5 max-w-[560px] font-serif text-[34px] font-bold leading-[1.15] tracking-[-0.02em] text-black sm:text-[44px]">
          Stocking up? Up to 50% off in bulk.
        </h2>
        <p className="mt-4 max-w-[520px] text-[16px] leading-[1.65] text-[#6b7280]">
          10+ units of any compound unlocks 40% off. Hit 50 and the whole product drops to 50%. Same COA-verified vials, one-time order.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-black px-3.5 py-1.5 text-[13px] font-medium text-white">10+ units - 40% off</span>
          <span className="rounded-full bg-[#d1fae5] px-3.5 py-1.5 text-[13px] font-medium text-[#065f46]">50+ units - 50% off</span>
          <span className="rounded-full border border-[#e5e7eb] bg-white px-3.5 py-1.5 text-[13px] font-medium text-black">
            Free 2-day signed delivery
          </span>
        </div>

        <div className="mt-8 flex w-full max-w-[560px] items-center gap-4 rounded-[32px] bg-white p-4 text-left shadow-[0_18px_50px_rgba(15,23,42,0.10)] sm:gap-5 sm:p-5">
          <div className="relative aspect-[4/5] w-[92px] shrink-0 overflow-hidden rounded-2xl sm:w-[108px]" style={{ backgroundColor: PRODUCT_IMAGE_BG }}>
            {product ? (
              <Image
                src={productImage(product)}
                alt={product.name}
                fill
                unoptimized
                className={productImageClass}
              />
            ) : null}
            <span className="absolute bottom-2 right-2 rounded-full bg-black px-2 py-0.5 text-[11px] font-semibold text-white">
              ×10
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[16px] font-bold text-black">{product?.name ?? "GLP-3 (RT)"}</p>
            <p className="mt-0.5 text-[13px] text-[#6b7280]">{qty} units</p>
            <span className="mt-2 inline-flex rounded-full bg-[#d1fae5] px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] text-[#065f46]">
              40% OFF APPLIED
            </span>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[13px] text-[#9ca3af] line-through">{formatMoney(retail)}</p>
            <p className="mt-0.5 text-[22px] font-extrabold leading-none text-black sm:text-[26px]">{formatMoney(sale)}</p>
            <p className="mt-1 text-[13px] font-medium text-[#16a34a]">Save {formatMoney(saved)}</p>
          </div>
        </div>

        <Link
          href="/bulk"
          className="mt-8 inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-[10px] bg-black px-10 text-[15px] font-semibold text-white no-underline"
          style={{ color: "#ffffff" }}
        >
          Buy Now
          <span aria-hidden="true">→</span>
        </Link>
        <p className="mt-3 text-[13px] text-[#9ca3af]">No subscription. An adult signs on delivery.</p>
      </div>
    </section>
  );
}
