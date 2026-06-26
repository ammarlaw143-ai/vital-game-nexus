import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { NewsCard } from "@/components/news-card";
import { findArticle, news } from "@/lib/news";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const article = findArticle(params.slug);
    if (!article) throw notFound();
    return { article } as { article: NonNullable<ReturnType<typeof findArticle>> };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return {};
    return {
      meta: [
        { title: `${a.title} | Nexus Gaming` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/news/${a.slug}` },
      ],
      links: [{ rel: "canonical", href: `/news/${a.slug}` }],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = news.filter((n) => n.slug !== article.slug && n.category === article.category).slice(0, 3);

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-neon mb-8"
        >
          <ArrowLeft className="size-4" /> All News
        </Link>
        <span className="inline-block px-3 py-1 bg-violet/15 border border-violet/40 text-violet text-[10px] font-bold uppercase tracking-widest rounded-sm">
          {article.category}
        </span>
        <h1 className="mt-5 font-display font-bold text-4xl md:text-6xl uppercase leading-tight tracking-tight">
          {article.title}
        </h1>
        <p className="mt-6 text-xs uppercase tracking-widest text-white/40">
          By {article.author} • {new Date(article.date).toLocaleDateString()} • {article.readTime} min read
        </p>

        <div
          className="mt-10 aspect-[16/9] rounded-xl border border-white/10 grid-bg"
          style={{ background: `linear-gradient(135deg, var(--violet), var(--neon))` }}
        />

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/80">
          <p className="text-xl text-white/90 font-medium">{article.excerpt}</p>
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 border-t border-white/5">
          <h2 className="font-display text-3xl font-bold uppercase mb-6">Related News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
