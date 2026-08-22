import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/articles";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article" };
  return { title: article.title, description: article.excerpt };
}

export default async function ResearchArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="bg-white py-10 sm:py-14">
      <div className="site-container max-w-2xl">
        <Link href="/research" className="text-[13px] font-medium text-[#666] no-underline hover:text-black">
          ← Research library
        </Link>
        <div className="mt-6 flex items-center gap-2">
          <span className="rounded-full bg-[#f3f3f3] px-2.5 py-0.5 text-[11px] font-semibold text-[#555]">
            {article.category}
          </span>
          <span className="text-[12px] text-[#9a9a9a]">{article.readTime}</span>
        </div>
        <h1 className="mt-4 text-[32px] font-bold leading-[1.12] tracking-[-0.03em] text-black sm:text-[40px]">
          {article.title}
        </h1>
        <p className="mt-4 text-[16px] leading-[1.65] text-[#666]">{article.excerpt}</p>
        <div className="mt-10 space-y-5 border-t border-[#ececec] pt-10 text-[16px] leading-[1.75] text-[#444]">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 rounded-[16px] border border-[#ececec] bg-[#fafafa] px-5 py-4">
          <p className="text-[13px] leading-[1.6] text-[#666]">
            <span className="font-semibold text-black">Research use only.</span> This article is provided for laboratory
            documentation purposes. It is not medical advice.
          </p>
        </div>
      </div>
    </article>
  );
}
