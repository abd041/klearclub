import Link from "next/link";
import { articles } from "@/data/articles";
import { PageHeader } from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research library",
};

export default function ResearchPage() {
  return (
    <div className="page-wrap py-12">
      <PageHeader
        eyebrow="Library"
        title="Notes for research teams"
        body="Short, practical articles on documentation, storage, and the limits of this catalog."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/research/${article.slug}`}
            className="rounded-[28px] bg-mist p-7 transition-colors hover:bg-hair"
          >
            <p className="text-xs text-soft">{article.readTime}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">{article.title}</h2>
            <p className="mt-3 text-sm leading-6 text-mute">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
