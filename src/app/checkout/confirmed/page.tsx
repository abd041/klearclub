import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Order confirmed",
};

type PageProps = {
  searchParams: Promise<{ order?: string }>;
};

export default async function CheckoutConfirmedPage({ searchParams }: PageProps) {
  const { order } = await searchParams;

  return (
    <div className="min-h-full bg-[#f4f4f5]">
      <header className="relative flex h-[64px] items-center justify-center px-4 sm:px-8">
        <Link href="/store" className="absolute left-4 text-[14px] text-[#9a9a9a] sm:left-8">
          ← Back
        </Link>
        <Logo compact />
      </header>
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="text-[36px] font-bold tracking-[-0.04em] text-black">Order received</h1>
        <p className="mt-4 text-[15px] leading-7 text-[#6e6e73]">
          {order
            ? `Reference ${order} is held on the frontend until live payment is connected.`
            : "Your research order was recorded on this device."}
        </p>
        <Link
          href="/store"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-black px-6 text-[14px] font-medium"
          style={{ color: "#ffffff" }}
        >
          Back to catalog
        </Link>
      </div>
    </div>
  );
}
