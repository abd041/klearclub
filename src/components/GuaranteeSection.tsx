import Image from "next/image";

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

export function GuaranteeSection() {
  return (
    <>
      <div className="relative z-0 h-[380px] min-w-0 overflow-hidden bg-gradient-to-b from-[#eeebfe] to-[#faeff2] sm:h-[460px] lg:h-auto lg:min-h-[360px]">
        <Image
          src="/hero/nad.png"
          alt="NAD+ research vial"
          width={380}
          height={800}
          unoptimized
          className="absolute left-[6%] top-[14%] h-[68%] w-auto max-w-none rotate-[18deg] object-contain drop-shadow-[0_24px_36px_rgba(15,23,42,0.16)]"
        />
      </div>

      <div className="relative z-10 flex min-w-0 items-start overflow-visible bg-white px-5 pt-8 pb-12 sm:px-8 lg:min-h-[360px] lg:pl-12 lg:pr-16 lg:pt-10 lg:pb-10">
        <div className="w-full max-w-[540px]">
          <h2 className="text-[30px] font-bold leading-tight tracking-[-0.03em] text-black sm:text-[32px]">
            The Klear Club Guarantee
          </h2>
          <p className="mt-2.5 max-w-[470px] text-[15px] leading-[1.6] text-[#6b6b6b]">
            Documented quality for research and laboratory use. Every batch meets our internal purity standards.
          </p>

          <div className="mt-7 -ml-16 w-[calc(100%+4rem)] flex flex-col gap-3 sm:-ml-20 sm:w-[calc(100%+5rem)] lg:-ml-[3.5rem] lg:w-[calc(100%+3.5rem)]">
            {cards.map((card) => (
              <article
                key={card.title}
                className="relative flex items-center gap-[14px] overflow-hidden rounded-md bg-white py-5 pr-5 pl-3.5 shadow-[0_4px_16px_rgba(15,23,42,0.08)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-2"
                  style={{ background: card.accent }}
                />
                <div
                  className="ml-2 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full"
                  style={{ background: card.iconBg }}
                >
                  <CardIcon name={card.icon} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    {card.tip ? (
                      <>
                        <h3 className="text-[15px] font-bold text-black">
                          <span className="border-b border-dotted border-[#b5b5b5] pb-px">
                            {card.title}
                          </span>
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
      </div>
    </>
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
        <path d="M3 7.2h10.2v8.2H3V7.2Z" fill="#2e74ba" />
        <path d="M13.2 10.1h3.8l2.4 2.8v2.5h-6.2v-5.3Z" fill="#2e74ba" />
        <circle cx="6.6" cy="17.2" r="1.55" fill="#2e74ba" />
        <circle cx="16.4" cy="17.2" r="1.55" fill="#2e74ba" />
      </svg>
    );
  }

  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g transform="rotate(-22 12 13)">
        <path
          d="M10.4 3.2h3.2v8.4l2 6.2a2.35 2.35 0 0 1-2.25 3h-2.7a2.35 2.35 0 0 1-2.25-3l2-6.2V3.2Z"
          fill="#8d6e3a"
        />
      </g>
      <circle cx="17.4" cy="18.8" r="1.2" fill="#8d6e3a" />
    </svg>
  );
}
