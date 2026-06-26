import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { GameCard } from "@/components/game-card";
import { findGame, games } from "@/lib/games";
import { useFavorites } from "@/hooks/use-favorites";
import { ArrowLeft, ExternalLink, Heart, Play, Star } from "lucide-react";

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => {
    const game = findGame(params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    const g = loaderData?.game;
    if (!g) return {};
    return {
      meta: [
        { title: `${g.title} — Nexus Gaming` },
        { name: "description", content: g.description.slice(0, 160) },
        { property: "og:title", content: `${g.title} — Nexus Gaming` },
        { property: "og:description", content: g.description.slice(0, 160) },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/games/${g.slug}` },
      ],
      links: [{ rel: "canonical", href: `/games/${g.slug}` }],
    };
  },
  component: GameDetail,
});

function GameDetail() {
  const { game } = Route.useLoaderData();
  const { has, toggle } = useFavorites();
  const fav = has(game.slug);
  const related = games
    .filter((g) => g.slug !== game.slug && g.genres.some((x) => game.genres.includes(x)))
    .slice(0, 5);

  return (
    <SiteLayout>
      {/* Banner */}
      <section
        className="relative h-[60vh] min-h-[420px]"
        style={{ background: game.cover.gradient }}
      >
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 h-full flex flex-col justify-end pb-10">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-neon mb-6 w-fit"
          >
            <ArrowLeft className="size-4" /> All Games
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {game.upcoming && (
              <span className="px-2.5 py-1 bg-violet text-white text-[10px] font-bold uppercase tracking-widest">
                Upcoming
              </span>
            )}
            {game.trending && (
              <span className="px-2.5 py-1 bg-neon text-background text-[10px] font-bold uppercase tracking-widest">
                Trending
              </span>
            )}
            <span className="text-[10px] uppercase tracking-widest text-white/60">
              {game.developer} • {new Date(game.releaseDate).toLocaleDateString()}
            </span>
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl uppercase leading-none tracking-tight max-w-4xl">
            {game.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Rating" value={game.rating > 0 ? `★ ${game.rating}` : "TBA"} accent />
            <Stat label="Price" value={game.price === "Free" ? "FREE" : `$${game.price}`} />
            <Stat label="Genre" value={game.genres[0]} />
            <Stat label="Platforms" value={game.platforms.length.toString()} />
          </div>

          <Block title="About">
            <p className="text-white/70 leading-relaxed">{game.description}</p>
          </Block>

          <Block title="Key Features">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {game.features.map((f) => (
                <li key={f} className="flex gap-3 items-start glass p-3 rounded">
                  <Star className="size-4 text-neon shrink-0 mt-0.5" />
                  <span className="text-sm text-white/80">{f}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="System Requirements">
            <div className="glass rounded-lg p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(game.systemReq).map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">{k.toUpperCase()}</p>
                  <p className="text-sm text-white/90 mt-1">{v}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Tags">
            <div className="flex flex-wrap gap-2">
              {game.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </Block>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="glass rounded-xl p-6 sticky top-24">
            <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Buy from official store</div>
            <div className="font-display text-3xl font-bold mb-4">
              {game.price === "Free" ? "FREE TO PLAY" : `$${game.price}`}
            </div>
            <a
              href={game.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-neon text-background font-bold uppercase tracking-widest text-xs hover:brightness-110"
            >
              Buy / Play <ExternalLink className="size-4" />
            </a>
            <a
              href={game.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10"
            >
              <Play className="size-4" /> Watch Trailer
            </a>
            <button
              onClick={() => toggle(game.slug)}
              className={`mt-2 w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-bold uppercase tracking-widest text-xs border transition-all ${
                fav
                  ? "bg-violet/20 border-violet text-violet"
                  : "bg-white/5 border-white/10 hover:border-violet/50 text-white"
              }`}
            >
              <Heart className="size-4" fill={fav ? "currentColor" : "none"} />
              {fav ? "Saved" : "Save to Favorites"}
            </button>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm">
              <Row k="Developer" v={game.developer} />
              <Row k="Publisher" v={game.publisher} />
              <Row k="Released" v={new Date(game.releaseDate).toLocaleDateString()} />
              <Row k="Platforms" v={game.platforms.join(", ")} />
              <Row k="Genres" v={game.genres.join(", ")} />
              <a
                href={game.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neon font-bold uppercase tracking-widest text-xs hover:underline"
              >
                Official Website <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 border-t border-white/5">
          <h2 className="font-display text-3xl font-bold uppercase mb-6">Related Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {related.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="glass rounded-lg p-4">
      <p className="text-[10px] uppercase tracking-widest text-white/40">{label}</p>
      <p className={`mt-1 font-display text-2xl font-bold ${accent ? "text-neon" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-4 flex items-center gap-3">
        <span className="size-2 bg-neon" />
        {title}
      </h2>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/40 text-xs uppercase tracking-widest">{k}</span>
      <span className="text-white/90 text-right">{v}</span>
    </div>
  );
}
