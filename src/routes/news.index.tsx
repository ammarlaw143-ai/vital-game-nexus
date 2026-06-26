import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site-layout";
import { NewsCard } from "@/components/news-card";
import { news } from "@/lib/news";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "Gaming News — Daily Industry Briefings | Nexus Gaming" },
      { name: "description", content: "The latest gaming news, leaks, reviews and announcements — updated daily across every major franchise and platform." },
      { property: "og:title", content: "Gaming News — Nexus Gaming" },
      { property: "og:description", content: "Daily gaming industry news, leaks, reviews and announcements." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsIndex,
});

const cats = ["All", ...Array.from(new Set(news.map((n) => n.category)))];

function NewsIndex() {
  const [cat, setCat] = useState("All");
  const filtered = useMemo(
    () => (cat === "All" ? news : news.filter((n) => n.category === cat)),
    [cat],
  );
  const [feature, ...rest] = filtered;

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Briefing"
        title="Gaming News"
        description="The latest industry news, leaks, reviews, and announcements — updated daily."
        accent="violet"
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                cat === c
                  ? "bg-violet text-white border-violet"
                  : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {feature && (
          <div className="mb-8">
            <NewsCard article={feature} variant="feature" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
