import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

function GhostButton({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="relative z-10 inline-flex h-[34px] items-center rounded-full border border-black bg-white px-4 text-[13px] font-medium text-black no-underline transition hover:bg-[#fafafa]"
    >
      {children}
    </Link>
  );
}

function cardClassName(className?: string) {
  return cn(
    "relative overflow-hidden rounded-[24px] bg-white shadow-[0_8px_24px_rgba(16,24,40,0.05)] sm:rounded-[28px]",
    className,
  );
}

export function SucceedSection() {
  return (
    <section className="home-section-y bg-[#eef6e8] px-5 font-sans sm:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="text-center text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-black sm:text-[32px]">
          Everything you need to succeed
        </h2>

        <div className="mt-8 flex flex-col gap-4 sm:gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
          <article className={cardClassName("flex flex-col px-5 py-6 pb-24 sm:px-7 sm:pb-28 lg:min-h-[220px] lg:pb-6")}>
            <h3 className="max-w-[calc(100%-92px)] text-[18px] font-bold leading-[1.25] text-black sm:text-[19px]">
              Join a community of researchers
            </h3>
            <p className="mt-2.5 max-w-[calc(100%-92px)] text-[14px] font-normal leading-[1.55] text-[#1d1d1d]">
              Every purchase unlocks access to our research community. Connect with fellow researchers, share lab notes,
              and reference up-to-date documentation on each compound.
            </p>
            <div className="mt-5 lg:mt-auto">
              <GhostButton href="/store">Shop & Join Community</GhostButton>
            </div>
            <Image
              src="/succeed/tubes.png"
              alt=""
              width={110}
              height={120}
              unoptimized
              className="pointer-events-none absolute bottom-4 right-4 h-[72px] w-auto sm:bottom-5 sm:right-5 sm:h-[84px]"
            />
          </article>

          <article className={cardClassName("flex flex-col px-5 py-6 pb-24 sm:px-7 sm:pb-28 lg:min-h-[220px] lg:pb-6")}>
            <h3 className="max-w-[calc(100%-92px)] text-[18px] font-bold leading-[1.25] text-black sm:text-[19px]">
              Research-grade quality meets researcher-friendly pricing
            </h3>
            <p className="mt-2.5 max-w-[calc(100%-92px)] text-[14px] font-normal leading-[1.55] text-[#1d1d1d]">
              U.S.-based research supply company. Every batch undergoes rigorous third-party identity and content
              testing with full documentation. Documented quality procedures combined with research-grade pricing,
              keeping high identity purity research supply accessible.
            </p>
            <div className="mt-5 lg:mt-auto">
              <GhostButton href="/store">Shop USA tested Peptides</GhostButton>
            </div>
            <Image
              src="/succeed/dropper.png"
              alt=""
              width={198}
              height={167}
              unoptimized
              className="pointer-events-none absolute bottom-3 right-3 h-[76px] w-auto sm:bottom-4 sm:right-4 sm:h-[88px]"
            />
          </article>

          <article className={cardClassName("px-5 py-6 pb-20 sm:px-7 sm:pb-24 lg:min-h-[124px] lg:pb-6")}>
            <h3 className="max-w-[calc(100%-88px)] text-[18px] font-bold leading-[1.25] tracking-[-0.03em] text-black sm:max-w-[260px] sm:text-[19px]">
              Expert support whenever you need it
            </h3>
            <Image
              src="/succeed/magnifier.png"
              alt=""
              width={188}
              height={162}
              unoptimized
              className="pointer-events-none absolute bottom-3 right-3 h-[78px] w-auto sm:bottom-4 sm:right-4 sm:h-[96px] lg:h-[110px]"
            />
          </article>

          <article className={cardClassName("px-5 py-6 pb-20 sm:px-7 sm:pb-24 lg:min-h-[124px] lg:pb-6")}>
            <h3 className="max-w-[calc(100%-88px)] text-[18px] font-bold leading-[1.25] tracking-[-0.03em] text-black sm:max-w-[280px] sm:text-[19px]">
              Anywhere in the US, as fast as next day
            </h3>
            <Image
              src="/succeed/stopwatch.png"
              alt=""
              width={167}
              height={152}
              unoptimized
              className="pointer-events-none absolute bottom-3 right-3 h-[72px] w-auto sm:bottom-4 sm:right-4 sm:h-[88px] lg:h-[100px]"
            />
          </article>

          <article className={cardClassName("flex flex-col px-5 py-6 pb-24 sm:px-7 sm:pb-28 lg:col-span-2 lg:min-h-[268px] lg:pb-8")}>
            <h3 className="max-w-[calc(100%-96px)] text-[18px] font-bold leading-[1.25] tracking-[-0.03em] text-black sm:max-w-[320px] sm:text-[20px]">
              Extensive research library at your fingertips
            </h3>
            <p className="mt-3 max-w-[calc(100%-96px)] text-[14px] leading-[1.55] text-[#2b2b2b] sm:max-w-[420px] sm:text-[15px]">
              Access our comprehensive collection of research articles, studies, and educational resources. Stay
              informed with our regularly updated blog covering the latest peptide research and discoveries.
            </p>
            <div className="mt-5 lg:mt-auto">
              <GhostButton href="/research">Explore Research Library</GhostButton>
            </div>
            <Image
              src="/succeed/molecule.png"
              alt=""
              width={291}
              height={170}
              unoptimized
              className="pointer-events-none absolute bottom-3 right-3 h-[88px] w-auto sm:h-[112px]"
            />
          </article>

          <article className={cardClassName("px-5 py-6 pb-24 sm:px-7 sm:pb-28 lg:col-span-2 lg:flex lg:min-h-[160px] lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:pb-8")}>
            <div className="max-w-[560px]">
              <h3 className="text-[18px] font-bold leading-[1.25] tracking-[-0.03em] text-black sm:text-[20px]">
                Free shipment protection on every order
              </h3>
              <p className="mt-3 max-w-[500px] text-[14px] leading-[1.55] text-[#2b2b2b] sm:text-[15px]">
                Every order is protected against damage, loss, or theft in transit. If your product arrives damaged,
                we&apos;ll replace it at no cost.
              </p>
              <div className="mt-5 lg:hidden">
                <GhostButton href="/shipping">Shop With Confidence</GhostButton>
              </div>
            </div>
            <div className="relative mt-5 flex items-end justify-between gap-4 lg:mt-0 lg:min-h-[84px] lg:items-center">
              <div className="hidden lg:block">
                <GhostButton href="/shipping">Shop With Confidence</GhostButton>
              </div>
              <Image
                src="/succeed/truck.png"
                alt=""
                width={167}
                height={147}
                unoptimized
                className="pointer-events-none ml-auto h-[64px] w-auto sm:h-[76px] lg:ml-0 lg:h-[84px]"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
