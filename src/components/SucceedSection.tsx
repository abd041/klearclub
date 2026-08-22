import Image from "next/image";
import Link from "next/link";

function GhostButton({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="relative z-10 inline-flex h-[34px] items-center rounded-full border border-black bg-white px-4 text-[13px] font-medium text-black no-underline"
    >
      {children}
    </Link>
  );
}

export function SucceedSection() {
  return (
    <section className="bg-[#eef6e8] px-5 py-16 font-sans sm:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="text-center text-[28px] font-bold tracking-[-0.03em] text-black sm:text-[32px]">
          Everything you need to succeed
        </h2>

        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-2">
          <article className="relative flex h-[220px] flex-col rounded-[24px] bg-white px-7 py-6">
            <h3 className="pr-[88px] text-[19px] font-bold leading-[1.25] text-black">
              Join a community of researchers
            </h3>
            <p className="mt-2 max-w-[72%] text-[14px] font-normal leading-[1.5] text-[#1d1d1d]">
              Every purchase unlocks access to our research community. Connect with fellow researchers, share lab notes,
              and reference up-to-date documentation on each compound.
            </p>
            <div className="mt-auto">
              <GhostButton href="/store">Shop & Join Community</GhostButton>
            </div>
            <Image
              src="/succeed/tubes.png"
              alt=""
              width={110}
              height={120}
              unoptimized
              className="pointer-events-none absolute bottom-[18px] right-[18px] h-[76px] w-auto"
            />
          </article>

          <article className="relative flex h-[220px] flex-col rounded-[24px] bg-white px-7 py-6">
            <h3 className="pr-[88px] text-[19px] font-bold leading-[1.25] text-black">
              Research-grade quality meets researcher-friendly pricing
            </h3>
            <p className="mt-2 max-w-[72%] text-[14px] font-normal leading-[1.5] text-[#1d1d1d]">
              U.S.-based research supply company. Every batch undergoes rigorous third-party identity and content
              testing with full documentation. Documented quality procedures combined with research-grade pricing,
              keeping high identity purity research supply accessible.
            </p>
            <div className="mt-auto">
              <GhostButton href="/store">Shop USA tested Peptides</GhostButton>
            </div>
            <Image
              src="/succeed/dropper.png"
              alt=""
              width={198}
              height={167}
              unoptimized
              className="pointer-events-none absolute bottom-[14px] right-[16px] h-[80px] w-auto"
            />
          </article>
        </div>

        <div className="mt-4 grid items-stretch gap-4 lg:mt-5 lg:grid-cols-2 lg:gap-5">
          <div className="grid gap-4 lg:gap-5">
            <article className="relative flex min-h-[124px] items-center overflow-hidden rounded-[32px] bg-white px-8 py-7 shadow-[0_8px_24px_rgba(16,24,40,0.05)]">
              <h3 className="max-w-[240px] text-[19px] font-bold leading-[1.2] tracking-[-0.03em] text-black">
                Expert support whenever you need it
              </h3>
              <Image
                src="/succeed/magnifier.png"
                alt=""
                width={188}
                height={162}
                unoptimized
                className="pointer-events-none absolute right-5 top-1/2 h-[153px] w-auto -translate-y-1/2"
              />
            </article>
            <article className="relative flex min-h-[124px] items-center overflow-hidden rounded-[32px] bg-white px-8 py-7 shadow-[0_8px_24px_rgba(16,24,40,0.05)]">
              <h3 className="max-w-[260px] text-[19px] font-bold leading-[1.2] tracking-[-0.03em] text-black">
                Anywhere in the US, as fast as next day
              </h3>
              <Image
                src="/succeed/stopwatch.png"
                alt=""
                width={167}
                height={152}
                unoptimized
                className="pointer-events-none absolute right-5 top-1/2 h-[110px] w-auto -translate-y-1/2"
              />
            </article>
          </div>

          <article className="relative flex min-h-[268px] flex-col overflow-hidden rounded-[32px] bg-white p-8 shadow-[0_8px_24px_rgba(16,24,40,0.05)] sm:p-10">
            <h3 className="max-w-[300px] text-[22px] font-bold leading-[1.2] tracking-[-0.03em] text-black">
              Extensive research library at your fingertips
            </h3>
            <p className="mt-3 max-w-[400px] pr-8 text-[15px] leading-[1.55] text-[#2b2b2b]">
              Access our comprehensive collection of research articles, studies, and educational resources. Stay
              informed with our regularly updated blog covering the latest peptide research and discoveries.
            </p>
            <div className="mt-auto pt-8">
              <GhostButton href="/research">Explore Research Library</GhostButton>
            </div>
            <Image
              src="/succeed/molecule.png"
              alt=""
              width={291}
              height={170}
              unoptimized
              className="pointer-events-none absolute bottom-3 right-3 h-[110px] w-auto"
            />
          </article>
        </div>

        <article className="relative mt-4 overflow-hidden rounded-[32px] bg-white px-8 py-8 shadow-[0_8px_24px_rgba(16,24,40,0.05)] sm:mt-5 sm:flex sm:min-h-[160px] sm:items-center sm:justify-between sm:gap-10 sm:px-10">
          <div className="max-w-[560px]">
            <h3 className="text-[22px] font-bold leading-[1.2] tracking-[-0.03em] text-black">
              Free shipment protection on every order
            </h3>
            <p className="mt-3 max-w-[500px] text-[15px] leading-[1.55] text-[#2b2b2b]">
              Every order is protected against damage, loss, or theft in transit. If your product arrives damaged,
              we&apos;ll replace it at no cost.
            </p>
          </div>
          <div className="relative mt-6 flex min-h-[84px] items-center gap-4 pr-2 sm:mt-0">
            <GhostButton href="/shipping">Shop With Confidence</GhostButton>
            <Image
              src="/succeed/truck.png"
              alt=""
              width={167}
              height={147}
              unoptimized
              className="pointer-events-none h-[72px] w-auto"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
