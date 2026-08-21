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
    <article className="page-wrap max-w-2xl py-12">
      <Link href="/research" className="text-sm text-mute hover:text-ink">
        Library
      </Link>
      <p className="mt-6 text-xs uppercase tracking-[0.16em] text-soft">{article.readTime}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{article.title}</h1>
      <div className="mt-8 space-y-5 text-base leading-8 text-mute">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
