import Image from "next/image";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";
import { cn } from "@/lib/cn";

const HERO_VIALS = [
  {
    src: "/hero/h2o.png",
    alt: "Klear H2O",
    className:
      "absolute left-[4%] top-[12%] z-0 aspect-[1/1.5] w-[18%] animate-float-delayed pointer-events-none select-none lg:left-[7%] lg:w-[14%]",
    rotate: "-6deg",
  },
  {
    src: "/hero/tb.png",
    alt: "TB-500 Peptide vial",
    className:
      "absolute right-[5%] top-[18%] z-10 aspect-[1/1.5] w-[15%] animate-float pointer-events-none select-none lg:right-[9%] lg:w-[12%]",
    rotate: "14deg",
  },
  {
    src: "/hero/bpc.png",
    alt: "BPC-157 Peptide vial",
    className:
      "absolute bottom-[10%] left-[12%] z-0 aspect-[1/1.5] w-[16%] animate-float-slow pointer-events-none select-none lg:left-[16%] lg:w-[12%]",
    rotate: "-10deg",
  },
  {
    src: "/hero/h2o.png",
    alt: "Klear H2O",
    className:
      "absolute right-[8%] bottom-[5%] z-0 aspect-[1/1.5] w-[14%] animate-float pointer-events-none select-none lg:right-[12%] lg:w-[10%]",
    rotate: "18deg",
  },
] as const;

const SHIPPING_OPTIONS = [
  {
    title: "Standard Shipping",
    price: "Calculated at checkout",
    eta: "1-4 Business Days",
    blurb: "Reliable ground delivery with full tracking",
    features: [
      "FedEx or USPS Ground service",
      "Full tracking included",
      "Insured package",
      "Free on orders over $100",
    ],
    popular: false,
  },
  {
    title: "2-Day Shipping",
    price: "Calculated at checkout",
    eta: "2 Business Days",
    blurb: "Fast delivery when you need it sooner",
    features: [
      "Guaranteed 2-day delivery",
      "FedEx or USPS 2-Day service",
      "Full tracking included",
      "Insured package",
    ],
    popular: true,
  },
  {
    title: "Overnight Shipping",
    price: "Calculated at checkout",
    eta: "Next Business Day",
    blurb: "Fastest delivery option available",
    features: [
      "Next-day guarantee",
      "FedEx or USPS Overnight service",
      "Full tracking included",
      "Insured package",
    ],
    popular: false,
  },
] as const;

const INFO_CARDS = [
  {
    title: "Processing Time",
    body: "Orders are processed within 0-2 business days. Orders placed before 3:00 PM ET (12:00 PM PT) on a business day typically ship the same day; orders after the cutoff, or on weekends and holidays, enter processing the next business day. Every order includes free shipment protection.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    icon: "clock" as const,
    bullets: [
      { label: "Cut-off time:", value: "3:00 PM ET (12:00 PM PT)" },
      { label: "Business days:", value: "Monday - Friday only" },
      {
        label: "Holidays:",
        value:
          "Federal bank holidays observed (New Year's, MLK Day, Presidents' Day, Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving, Christmas)",
      },
    ],
  },
  {
    title: "Secure Packaging",
    body: "All lyophilized peptides are carefully packaged to ensure they arrive safely. Each vial is cushioned and protected for secure transit.",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    icon: "box" as const,
    bullets: [
      { label: "Protection:", value: "Vials securely cushioned" },
      { label: "Packaging:", value: "Sturdy shipping boxes" },
      { label: "Stability:", value: "Lyophilized for shelf stability" },
    ],
  },
  {
    title: "Order Tracking",
    body: "Every order includes full tracking. You'll receive tracking information via email as soon as your order ships. Track your package in real-time through our carrier partners.",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    icon: "clipboard" as const,
    bullets: [
      { label: "Email updates:", value: "Shipped & delivered notifications" },
      { label: "Real-time tracking:", value: "Via carrier website" },
      { label: "Support:", value: "Contact us for any issues" },
    ],
  },
  {
    title: "Delivery Areas",
    body: "We currently ship to all 50 US states, including Alaska and Hawaii. PO Boxes and APO/FPO addresses are also supported for standard shipping and are delivered via USPS.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    icon: "map" as const,
    bullets: [
      { label: "Continental US:", value: "Full service" },
      { label: "Alaska & Hawaii:", value: "Extended transit times" },
      { label: "International:", value: "Coming soon" },
    ],
  },
] as const;

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function InfoIcon({ name, className }: { name: (typeof INFO_CARDS)[number]["icon"]; className?: string }) {
  if (name === "clock") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (name === "box") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    );
  }
  if (name === "clipboard") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export function ShippingPageContent() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[50vh] w-full overflow-hidden lg:min-h-[60vh]" aria-label="Shipping">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(220, 252, 231, 0.6) 0%, rgba(187, 247, 208, 0.5) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {HERO_VIALS.map((vial, index) => (
            <div key={`${vial.src}-${index}`} className={vial.className} style={{ transform: `rotate(${vial.rotate})` }}>
              <div className="relative h-full w-full">
                <Image src={vial.src} alt={vial.alt} fill unoptimized className="object-contain" sizes="20vw" />
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-20 mx-auto flex h-full min-h-[50vh] max-w-[1440px] items-center justify-center px-6 lg:min-h-[60vh]">
          <div className="mx-auto max-w-3xl py-16 text-center lg:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-2 backdrop-blur-sm">
              <ShieldCheckIcon className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">Shipment Protection</span>
            </div>
            <h1 className="mb-4 text-4xl leading-[1.05] font-semibold tracking-tight text-black sm:text-5xl lg:mb-6 lg:text-6xl xl:text-7xl">
              Shipping Information
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-black/70 sm:text-xl lg:text-2xl">
              Fast, secure delivery with careful packaging to protect your research peptides.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24" aria-labelledby="shipping-options-heading">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <div className="mb-12 text-center">
            <h2 id="shipping-options-heading" className="mb-4 text-3xl font-semibold text-black lg:text-4xl">
              Shipping Options
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Choose the shipping speed that works best for your research timeline. Free shipping on orders over $100.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {SHIPPING_OPTIONS.map((option) => (
              <div
                key={option.title}
                className={cn(
                  "relative rounded-3xl border bg-white p-8",
                  option.popular ? "border-black shadow-lg" : "border-gray-200",
                )}
              >
                {option.popular ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">Most Popular</span>
                  </div>
                ) : null}
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-xl font-semibold text-black">{option.title}</h3>
                  <div className="mb-1 text-3xl font-bold text-black">{option.price}</div>
                  <div className="text-sm text-gray-500">{option.eta}</div>
                </div>
                <p className="mb-6 text-center text-gray-600">{option.blurb}</p>
                <ul className="space-y-3">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-6 text-center lg:p-8">
              <div className="mb-3 flex items-center justify-center gap-3">
                <CheckIcon className="h-6 w-6 text-green-600" />
                <span className="text-lg font-semibold text-green-800">Free Standard Shipping on Orders Over $100</span>
              </div>
              <p className="text-green-700">Automatically applied at checkout when your order qualifies.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24" aria-label="Shipping details">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {INFO_CARDS.map((card) => (
              <div key={card.title} className="rounded-2xl border border-gray-100 bg-white p-8">
                <div className={cn("mb-5 flex h-12 w-12 items-center justify-center rounded-xl", card.iconBg)}>
                  <InfoIcon name={card.icon} className={cn("h-6 w-6", card.iconColor)} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-black">{card.title}</h3>
                <p className="mb-4 text-gray-600">{card.body}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {card.bullets.map((bullet) => (
                    <li key={bullet.label}>
                      <strong>{bullet.label}</strong> {bullet.value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24" aria-labelledby="shipping-questions-heading">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="shipping-questions-heading" className="mb-4 text-2xl font-semibold text-black lg:text-3xl">
              Questions About Shipping?
            </h2>
            <p className="mb-8 text-gray-600">
              Our support team is happy to help with any shipping questions or concerns about your order.
            </p>
            <a
              href="mailto:support@klearclub.com"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-8 font-medium text-white transition-colors hover:bg-black/90"
              style={{ color: "#ffffff" }}
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <HomeCtaSubscribeSection />
    </div>
  );
}
