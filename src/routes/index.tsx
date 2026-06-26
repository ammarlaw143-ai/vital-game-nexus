import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { GameCard } from "@/components/game-card";
import { NewsCard } from "@/components/news-card";
import { games, trendingGames, topRatedGames, upcomingGames, newReleases } from "@/lib/games";
import { news, featuredNews } from "@/lib/news";
import heroImg from "@/assets/hero-cyber.jpg";
import mcImg from "@/assets/hub-minecraft.jpg";
import gtaImg from "@/assets/hub-gta.jpg";
import { ArrowRight, ExternalLink, Play, Star, Flame, Trophy, Sparkles, Calendar } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexus Gaming — Where Every Gamer Belongs" },
      {
        name: "description",
        content: "Discover, buy, and master 1200+ games. Daily gaming news, Minecraft mods & commands, GTA guides, reviews and walkthroughs.",
      },
      { property: "og:title", content: "Nexus Gaming — Where Every Gamer Belongs" },
      { property: "og:description", content: "Discover 1200+ games, daily news, Minecraft mods & GTA guides." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = games.find((g) => g.slug === "cyberpunk-2077")!;
  const feature = featuredNews()[0] ?? news[0];
  const sideNews = news.filter((n) => n.slug !== feature.slug).slice(0, 4);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[640px] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 size-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-15" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pb-16 md:pb-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-2.5 py-1 bg-neon/15 border border-neon/40 text-neon text-[10px] font-bold uppercase tracking-[0.25em] rounded-sm animate-nexus-pulse">
                Featured
              </span>
              <span className="text-white/50 text-[10px] uppercase tracking-[0.25em]">
                Editor's Pick
              </span>
            </div>
            <h1 className="font-display font-bold text-6xl md:text-8xl leading-[0.85] uppercase tracking-tight">
              Where Every
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-violet">
                Gamer Belongs
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
              1,200+ titles across every platform. Daily news, official store links, Minecraft resources, GTA guides, and the deepest game database on the web.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/games"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-neon text-background font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all"
              >
                Explore Games <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 px-6 py-3.5 glass text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all"
              >
                <Play className="size-4" /> Latest News
              </Link>
            </div>
          </div>

          {/* Featured game pill */}
          <div className="mt-12 max-w-md glass rounded-xl p-4 flex gap-4 items-center">
            <div className="size-16 rounded shrink-0" style={{ background: featured.cover.gradient }} />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-widest text-neon font-bold">Trending #1</p>
              <p className="font-display font-bold uppercase truncate">{featured.title}</p>
              <p className="text-xs text-white/50">
                {featured.genres[0]} • <span className="text-neon">★ {featured.rating}</span>
              </p>
            </div>
            <Link
              to="/games/$slug"
              params={{ slug: featured.slug }}
              className="size-10 grid place-items-center rounded-full bg-neon text-background hover:scale-105 transition-transform"
            >
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/5 bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["1,200+", "Games Tracked"],
            ["45K", "Daily Visitors"],
            ["890", "MC Mods"],
            ["24/7", "Live Updates"],
          ].map(([n, l]) => (
            <div key={l} className="text-center md:text-left">
              <div className="font-display text-3xl md:text-4xl font-bold text-white">{n}</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <SectionRail
        eyebrow="Trending Now"
        title="What Everyone's Playing"
        icon={<Flame className="size-5" />}
        link={["/games", "All games"]}
        items={trendingGames()}
      />

      {/* Hubs: Minecraft + GTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HubCard
          to="/minecraft"
          image={mcImg}
          accent="mc"
          eyebrow="Resource Hub"
          title="Minecraft Central"
          desc="The web's biggest archive of mods, shaders, commands, redstone and tutorials — all linked to official sources."
          chips={["Mods", "Commands", "Shaders", "Tutorials", "Servers"]}
        />
        <HubCard
          to="/gta"
          image={gtaImg}
          accent="gta"
          eyebrow="Resource Hub"
          title="Los Santos Vault"
          desc="Heist walkthroughs, money guides, vehicle databases, cheats, businesses and the best settings for every platform."
          chips={["Heists", "Money", "Cars", "Tips", "GTA VI"]}
        />
      </section>

      {/* TOP RATED */}
      <SectionRail
        eyebrow="Critically Acclaimed"
        title="Top Rated Games"
        icon={<Trophy className="size-5 text-violet" />}
        accent="violet"
        link={["/games", "View all"]}
        items={topRatedGames().slice(0, 6)}
      />

      {/* NEWS GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet mb-3">Latest Briefing</p>
            <h2 className="font-display text-4xl font-bold uppercase">Gaming News</h2>
            <div className="h-1 w-20 bg-violet mt-3" />
          </div>
          <Link
            to="/news"
            className="text-xs font-bold uppercase tracking-widest text-neon hover:text-white transition-colors"
          >
            All articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <NewsCard article={feature} variant="feature" />
          </div>
          <div className="space-y-5">
            {sideNews.map((a) => (
              <NewsCard key={a.slug} article={a} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* NEW RELEASES + UPCOMING */}
      <SectionRail
        eyebrow="Just Dropped"
        title="New Releases"
        icon={<Sparkles className="size-5" />}
        items={newReleases().slice(0, 6)}
      />
      <SectionRail
        eyebrow="Coming Soon"
        title="Upcoming Releases"
        icon={<Calendar className="size-5 text-violet" />}
        accent="violet"
        items={upcomingGames()}
      />

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="relative overflow-hidden rounded-2xl glass p-10 md:p-16 text-center">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-neon/10 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neon mb-4">Stay Plugged In</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">Join The Nexus</h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">
              Weekly drops of the biggest news, reviews and game launches. No spam — just signal.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="mt-8 flex flex-col sm:flex-row max-w-md mx-auto gap-2"
            >
              <input
                type="email"
                required
                placeholder="you@gaming.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-neon"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-neon text-background font-bold uppercase tracking-widest text-xs hover:brightness-110"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionRail({
  eyebrow,
  title,
  icon,
  link,
  items,
  accent = "neon",
}: {
  eyebrow: string;
  title: string;
  icon?: React.ReactNode;
  link?: readonly [string, string];
  items: typeof games;
  accent?: "neon" | "violet";
}) {
  const accentColor = accent === "neon" ? "text-neon" : "text-violet";
  const accentBg = accent === "neon" ? "bg-neon" : "bg-violet";
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.3em] mb-3 ${accentColor} flex items-center gap-2`}>
            {icon} {eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight">{title}</h2>
          <div className={`h-1 w-20 mt-3 ${accentBg}`} />
        </div>
        {link && (
          <Link
            to={link[0]}
            className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-neon transition-colors"
          >
            {link[1]} →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {items.map((g) => (
          <GameCard key={g.slug} game={g} />
        ))}
      </div>
    </section>
  );
}

function HubCard({
  to, image, accent, eyebrow, title, desc, chips,
}: {
  to: string;
  image: string;
  accent: "mc" | "gta";
  eyebrow: string;
  title: string;
  desc: string;
  chips: string[];
}) {
  const cls = accent === "mc" ? "text-mc border-mc/40" : "text-gta border-gta/40";
  const btn = accent === "mc" ? "bg-mc" : "bg-gta";
  return (
    <Link
      to={to}
      className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
        width={1200}
        height={800}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-8">
        <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-3 ${cls.split(" ")[0]}`}>
          {eyebrow}
        </p>
        <h3 className="font-display text-3xl md:text-4xl font-bold uppercase">{title}</h3>
        <p className="mt-3 text-white/70 max-w-md leading-relaxed">{desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm border ${cls} bg-black/30`}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <span
            className={`inline-flex items-center gap-2 px-5 py-2.5 ${btn} text-black font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all`}
          >
            Enter Hub <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
