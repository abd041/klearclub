import Image from "next/image";
import { productImage } from "@/data/media";
import { productPalette } from "@/lib/product-palette";

const cards = [
  {
    title: "99% Purity Guaranteed",
    subtitle: "Every batch verified",
    accent: "#c9ebc4",
    iconBg: "#eaf8e8",
    icon: "check" as const,
  },
  {
    title: "Shipment Protection",
    subtitle: "Every order fully covered",
    accent: "#c5defb",
    iconBg: "#e4f1fd",
    icon: "truck" as const,
    tip: "Every order is protected against damage in transit. Damaged products are replaced at no cost with photo evidence.",
  },
  {
    title: "CoA with Every Batch",
    subtitle: "Third Party tested in America",
    accent: "#f0e59a",
    iconBg: "#fbf8d6",
    icon: "tube" as const,
    tip: "Each lot ships with a third-party Certificate of Analysis covering identity, purity, and related assays.",
  },
];

function GuaranteeCopy() {
  return (
    <div className="w-full max-w-[540px]">
      <h2 className="text-[28px] font-bold leading-tight tracking-[-0.03em] text-black sm:text-[32px]">
        The Klear Club Guarantee
      </h2>
      <p className="mt-2.5 max-w-[470px] text-[15px] leading-[1.6] text-[#666666]">
        Documented quality for research and laboratory use. Every batch meets our internal purity standards.
      </p>

      <div className="mt-7 flex flex-col gap-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className="relative flex items-center gap-[14px] overflow-hidden rounded-[12px] bg-white py-4 pr-5 pl-3.5 shadow-[0_4px_16px_rgba(15,23,42,0.08)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[6px]"
              style={{ background: card.accent }}
            />
            <div
              className="ml-2 flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full"
              style={{ background: card.iconBg }}
            >
              <CardIcon name={card.icon} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                {card.tip ? (
                  <>
                    <h3 className="text-[15px] font-bold text-black">
                      <span className="border-b border-dotted border-[#b5b5b5] pb-px">{card.title}</span>
                    </h3>
                    <Hint text={card.tip} />
                  </>
                ) : (
                  <h3 className="text-[15px] font-bold text-black">{card.title}</h3>
                )}
              </div>
              <p className="mt-0.5 text-[13px] leading-5 text-[#6b6b6b]">{card.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function GuaranteeVial({ className }: { className?: string }) {
  return (
    <div className={`relative h-[280px] w-[180px] shrink-0 sm:h-[320px] sm:w-[210px] lg:h-[460px] lg:w-[290px] xl:h-[500px] xl:w-[310px] ${className ?? ""}`}>
      <Image
        src={productImage({ slug: "nad-plus", form: "vial" })}
        alt="NAD+ research vial"
        fill
        unoptimized
        className="origin-center -rotate-[14deg] object-contain object-[center_44%] drop-shadow-[0_32px_48px_rgba(15,23,42,0.18)] lg:rotate-[14deg]"
      />
    </div>
  );
}

/** Guarantee band: mobile stack (copy → vial), desktop split panel. */
export function GuaranteeSection() {
  const nadPalette = productPalette("nad-plus");
  const panelGradient = `linear-gradient(180deg, ${nadPalette.top} 0%, ${nadPalette.label} 48%, #f3eeff 100%)`;
  const desktopGradient = `linear-gradient(135deg, ${nadPalette.top} 0%, ${nadPalette.label} 42%, #f3eeff 100%)`;

  return (
    <section className="home-section-y relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 lg:block"
        style={{ background: desktopGradient }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55)_0%,transparent_68%)] lg:block"
      />

      <div className="site-container relative flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch">
        <div className="order-1 flex items-start bg-white px-0 pb-10 sm:pb-12 lg:order-2 lg:items-center lg:pb-0 lg:pl-8 lg:pr-2">
          <GuaranteeCopy />
        </div>

        <div className="relative order-2 -mx-5 w-[calc(100%+2.5rem)] sm:-mx-8 sm:w-[calc(100%+4rem)] lg:order-1 lg:mx-0 lg:w-auto">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{ background: panelGradient }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55)_0%,transparent_68%)] lg:hidden"
          />

          <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden sm:min-h-[380px] lg:min-h-[520px]">
            <GuaranteeVial />
          </div>
        </div>
      </div>
    </section>
  );
}

function Hint({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex shrink-0">
      <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#c9c9c9] text-[9px] font-semibold leading-none text-white">
        ?
      </span>
      <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 hidden w-[240px] -translate-x-1/2 rounded-md bg-slate-900 px-3 py-2 text-[12px] leading-5 text-white shadow-lg group-hover:block">
        {text}
      </span>
    </span>
  );
}

function CardIcon({ name }: { name: "check" | "truck" | "tube" }) {
  if (name === "check") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#5fa456"
          d="M12 1.6 14.2 3l2.5-.4.9 2.4 2.4.9-.4 2.5L21.4 12l-1.8 2.2.4 2.5-2.4.9-.9 2.4-2.5-.4L12 22.4 9.8 21l-2.5.4-.9-2.4-2.4-.9.4-2.5L2.6 12l1.8-2.2-.4-2.5 2.4-.9.9-2.4 2.5.4L12 1.6Z"
        />
        <path
          d="M7.4 12.2 10.3 15.2 16.6 8.6"
          fill="none"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "truck") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 7h11v8H3V7Z" stroke="#3b82f6" strokeWidth="1.6" />
        <path d="M14 10h3.2L20 13v2h-6v-5Z" stroke="#3b82f6" strokeWidth="1.6" />
        <circle cx="7" cy="17" r="1.6" stroke="#3b82f6" strokeWidth="1.5" />
        <circle cx="17" cy="17" r="1.6" stroke="#3b82f6" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3h6v3l2 3v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l2-3V3Z" stroke="#b45309" strokeWidth="1.6" />
      <path d="M9 10h6" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
