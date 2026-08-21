const cards = [
  {
    title: "Always in Stock",
    body: "Top research peptides like BPC-157, TB-500, and Ipamorelin ready to ship. No backorders, no waiting.",
    bg: "#eee6fb",
    fg: "#7b5cff",
    icon: "boxes" as const,
  },
  {
    title: "Volume Pricing",
    body: "Bulk pricing available for larger research orders. Lower per-vial cost at higher volumes.",
    bg: "#e5f8ea",
    fg: "#22a35a",
    icon: "percent" as const,
  },
  {
    title: "Safe & Protected Shipping",
    body: "Cold-pack shipping keeps peptides stable. Discreet packaging with full tracking on every USA order.",
    bg: "#fbf3d6",
    fg: "#d4a017",
    icon: "truck" as const,
  },
  {
    title: "Researcher Community",
    body: "Connect with fellow researchers. Share peer insights and discuss peptide research applications.",
    bg: "#fde8f0",
    fg: "#e85a8a",
    icon: "globe" as const,
  },
  {
    title: "99%+ Purity Guaranteed",
    body: "Every batch 8x tested by an ISO 17025 accredited US lab. Full Certificate of Analysis included free.",
    bg: "#e7eefc",
    fg: "#4d7cff",
    icon: "star" as const,
  },
  {
    title: "Shipment Protection",
    body: "Every order includes free shipment protection. Lost, damaged, or stolen packages are reshipped at no cost.",
    bg: "#e6f7f4",
    fg: "#2bb8a8",
    icon: "bolt" as const,
  },
];

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-16 font-sans sm:px-8 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/why-choose/molecules.svg')] bg-[length:1200px_auto] bg-[position:center_20px] bg-no-repeat"
      />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <h2 className="text-center text-[28px] font-bold tracking-[-0.03em] text-black sm:text-[34px]">
          Why choose Klear Club?
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[20px] border border-[#eeeeef] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.10),0_2px_10px_rgba(15,23,42,0.05)] sm:p-7"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-[12px]"
                style={{ background: card.bg, color: card.fg }}
              >
                <CardIcon name={card.icon} />
              </span>
              <h3 className="mt-5 text-[18px] font-bold tracking-[-0.02em] text-black">{card.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[#6b6b6b]">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardIcon({ name }: { name: (typeof cards)[number]["icon"] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 22 22",
    fill: "none",
    "aria-hidden": true as const,
  };

  if (name === "boxes") {
    return (
      <svg {...common}>
        <path d="M4 12.5l7 3.2 7-3.2v4.2L11 20l-7-3.3v-4.2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 8.4L11 5l7 3.4-7 3.2L4 8.4z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "percent") {
    return (
      <svg {...common}>
        <circle cx="7" cy="7.2" r="1.6" fill="currentColor" />
        <circle cx="15" cy="14.8" r="1.6" fill="currentColor" />
        <path d="M15.5 6.2L6.5 15.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "truck") {
    return (
      <svg {...common}>
        <path d="M3 13.5V7h8.5v6.5H3zM11.5 9.2H16l2.5 3.3v1H11.5V9.2z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="6.2" cy="15.6" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15.4" cy="15.6" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15.2 6.2l1.6 1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "globe") {
    return (
      <svg {...common}>
        <circle cx="10" cy="10.2" r="5.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 5v10.4M5 10.2h10" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="15.2" cy="15.4" r="3.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 16.6l2.6 2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "star") {
    return (
      <svg {...common}>
        <path
          d="M11 5.2l1.2 2.6 2.8.3-2.1 1.9.6 2.8L11 11.4 8.5 12.8l.6-2.8-2.1-1.9 2.8-.3L11 5.2z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M5.2 13.2c1.4 2.6 3.4 4 5.8 4.8 2.4-.8 4.4-2.2 5.8-4.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12.2 3.5L6.4 12h4.2L9.6 18.5 15.6 10h-4.2L12.2 3.5z" fill="currentColor" />
      <path d="M3.4 9.2h2.6M3 11.4h2.2M3.6 13.5h2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
