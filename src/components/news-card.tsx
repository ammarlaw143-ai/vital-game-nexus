import { Link } from "@tanstack/react-router";
import type { NewsArticle } from "@/lib/news";

const tagColor: Record<string, string> = {
  neon: "text-neon border-neon/40 bg-neon/10",
  violet: "text-violet border-violet/40 bg-violet/10",
  mc: "text-mc border-mc/40 bg-mc/10",
  gta: "text-gta border-gta/40 bg-gta/10",
};

export function NewsCard({
  article,
  variant = "default",
}: {
  article: NewsArticle;
  variant?: "default" | "feature" | "compact";
}) {
  if (variant === "compact") {
    return (
      <Link
        to="/news/$slug"
        params={{ slug: article.slug }}
        className="flex gap-4 group"
      >
        <div
          className="size-20 shrink-0 rounded-md border border-white/5 grid-bg"
          style={{ background: `linear-gradient(135deg, var(--violet), var(--neon))` }}
        />
        <div className="min-w-0">
          <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border rounded-sm ${tagColor[article.tag] ?? tagColor.neon}`}>
            {article.category}
          </span>
          <h4 className="mt-2 font-display font-bold uppercase leading-tight text-sm group-hover:text-neon transition-colors line-clamp-2">
            {article.title}
          </h4>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
            {new Date(article.date).toLocaleDateString()} • {article.readTime} min
          </p>
        </div>
      </Link>
    );
  }

  const aspect = variant === "feature" ? "aspect-[16/9]" : "aspect-[16/10]";
  return (
    <Link
      to="/news/$slug"
      params={{ slug: article.slug }}
      className="group block"
    >
      <div
        className={`relative ${aspect} overflow-hidden rounded-xl border border-white/5 group-hover:border-neon/40 transition-all`}
        style={{ background: `linear-gradient(135deg, var(--violet), var(--neon))` }}
      >
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border rounded-sm ${tagColor[article.tag] ?? tagColor.neon}`}>
            {article.category}
          </span>
          <h3 className={`mt-3 font-display font-bold uppercase leading-tight text-white group-hover:text-neon transition-colors ${variant === "feature" ? "text-3xl md:text-4xl" : "text-xl"}`}>
            {article.title}
          </h3>
          {variant === "feature" && (
            <p className="mt-3 text-white/60 line-clamp-2 max-w-2xl">{article.excerpt}</p>
          )}
          <p className="mt-3 text-[10px] uppercase tracking-widest text-white/40">
            {article.author} • {new Date(article.date).toLocaleDateString()} • {article.readTime} min read
          </p>
        </div>
      </div>
    </Link>
  );
}
