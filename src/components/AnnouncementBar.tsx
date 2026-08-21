import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-white">
      <div className="page-wrap flex h-9 items-center justify-center gap-3 text-[11px] tracking-[0.14em] uppercase sm:text-xs">
        <span>Research use only</span>
        <span className="hidden text-white/35 sm:inline">·</span>
        <span className="hidden sm:inline">Free shipping over $100</span>
        <span className="hidden text-white/35 md:inline">·</span>
        <Link href="/quality" className="hidden underline-offset-4 hover:underline md:inline">
          8× third-party tested
        </Link>
      </div>
    </div>
  );
}
