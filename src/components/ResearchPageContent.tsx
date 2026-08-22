"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { articles } from "@/data/articles";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";
import { cn } from "@/lib/cn";

const CATEGORIES = ["All", "Documentation", "Handling", "Quality", "Compliance"] as const;

export function ResearchPageContent() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return articles;
    return articles.filter((a) => a.category === active);
  }, [active]);

  return (
    <div className="bg-white">
      <section className="border-b border-[#f0f0f0] bg-[#fafafa] py-14 sm:py-20">
        <div className="site-container max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#9a9a9a]">Research library</p>
          <h1 className="mt-3 text-[36px] font-bold leading-[1.08] tracking-[-0.03em] text-black sm:text-[44px]">
            Notes for research teams
          </h1>
          <p className="mt-5 text-[16px] leading-[1.65] text-[#555]">
            Practical articles on documentation, storage, quality verification, and the limits of this catalog. For
            laboratory and research use only.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="site-container">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={cn(
                  "inline-flex h-9 shrink-0 items-center rounded-full border px-4 text-[13px] font-semibold whitespace-nowrap",
                  active === cat
                    ? "border-black bg-black text-white"
                    : "border-[#e6e6e6] bg-white font-medium text-black hover:border-[#cfcfcf]",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-12 rounded-[20px] border border-[#ececec] bg-[#fafafa] px-8 py-14 text-center">
              <p className="text-[17px] font-bold text-black">More articles coming soon</p>
              <p className="mx-auto mt-2 max-w-md text-[14px] text-[#666]">
                We are expanding the research library with additional documentation and handling guides.
              </p>
              <Link href="/contact" className="mt-6 inline-flex text-[14px] font-medium text-black underline underline-offset-2">
                Request a topic →
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {filtered.map((article) => (
                <Link
                  key={article.slug}
                  href={`/research/${article.slug}`}
                  className="group flex flex-col rounded-[20px] border border-[#ececec] bg-white p-6 no-underline shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_28px_rgba(15,23,42,0.08)] sm:p-7"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#f3f3f3] px-2.5 py-0.5 text-[11px] font-semibold text-[#555]">
                      {article.category}
                    </span>
                    <span className="text-[12px] text-[#9a9a9a]">{article.readTime}</span>
                  </div>
                  <h2 className="mt-4 text-[20px] font-bold leading-snug tracking-[-0.02em] text-black group-hover:opacity-80">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-[#666]">{article.excerpt}</p>
                  <span className="mt-5 text-[13px] font-medium text-black">Read article →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <HomeCtaSubscribeSection />
    </div>
  );
}
