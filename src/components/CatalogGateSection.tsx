import Link from "next/link";

export function CatalogGateSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f3f3] px-3 py-1 text-[13px] font-medium text-[#4b4b4b]">
          <LockIcon />
          Verified Researchers Only
        </span>

        <h2 className="mt-5 text-[26px] font-bold leading-[1.2] tracking-[-0.025em] text-black sm:text-[30px] lg:text-[32px]">
          Sign in to access the research catalog
        </h2>

        <p className="mt-3 max-w-[540px] text-[15px] leading-[1.6] text-[#666666]">
          Create an account or sign in to view our complete research peptide catalog. Available to verified researchers
          and labs for laboratory and research use only.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href="/account?mode=create"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-5 text-[14px] font-medium no-underline"
            style={{ color: "#ffffff" }}
          >
            Create Account
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/account"
            className="inline-flex h-11 items-center rounded-full border border-black bg-white px-5 text-[14px] font-medium text-black no-underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="2.2" y="5.2" width="7.6" height="5.1" rx="1.15" stroke="currentColor" strokeWidth="1.15" />
      <path d="M4.05 5.2V3.65a1.95 1.95 0 0 1 3.9 0V5.2" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
    </svg>
  );
}
