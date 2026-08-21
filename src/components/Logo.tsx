import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)} aria-label="Klear Club home">
      <Image
        src="/brand/logo.png"
        alt="klear. CLUB"
        width={1024}
        height={481}
        className={compact ? "h-[34px] w-auto" : "h-9 w-auto sm:h-10"}
        priority
        unoptimized
      />
    </Link>
  );
}
