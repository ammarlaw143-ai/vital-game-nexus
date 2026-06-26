import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site-layout";
import { GameCard } from "@/components/game-card";
import { games, type Platform } from "@/lib/games";
import { Filter } from "lucide-react";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "All Games — Browse the Nexus Database" },
      { name: "description", content: "Browse 1200+ games across PC, PlayStation, Xbox, Nintendo and mobile. Filter by genre, platform, price and more." },
      { property: "og:title", content: "All Games — Nexus Gaming" },
      { property: "og:description", content: "Browse the complete Nexus Gaming database." },
      { property: "og:url", content: "/games" },
    ],
    links: [{ rel: "canonical", href: "/games" }],
  }),
  component: GamesPage,
});

const platforms: Platform[] = ["PC", "PS5", "Xbox", "Switch", "Mobile"];
const genres = Array.from(new Set(games.flatMap((g) => g.genres))).sort();
const filters = [
  ["all", "All Games"],
  ["trending", "Trending"],
  ["top-rated", "Top Rated"],
  ["new", "New Releases"],
  ["upcoming", "Upcoming"],
  ["free", "Free"],
  ["paid", "Paid"],
] as const;

function GamesPage() {
  const [filter, setFilter] = useState<(typeof filters)[number][0]>("all");
  const [platform, setPlatform] = useState<Platform | "All">("All");
  const [genre, setGenre] = useState<string>("All");
  const [sort, setSort] = useState<"popularity" | "rating" | "name" | "release">("popularity");

  const filtered = useMemo(() => {
    let list = [...games];
    if (filter === "trending") list = list.filter((g) => g.trending);
    if (filter === "top-rated") list = list.filter((g) => g.topRated);
    if (filter === "new") list = list.filter((g) => g.newRelease);
    if (filter === "upcoming") list = list.filter((g) => g.upcoming);
    if (filter === "free") list = list.filter((g) => g.price === "Free");
    if (filter === "paid") list = list.filter((g) => g.price !== "Free");
    if (platform !== "All") list = list.filter((g) => g.platforms.includes(platform));
    if (genre !== "All") list = list.filter((g) => g.genres.includes(genre));
    list.sort((a, b) => {
      if (sort === "name") return a.title.localeCompare(b.title);
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "release") return b.releaseDate.localeCompare(a.releaseDate);
      return b.popularity - a.popularity;
    });
    return list;
  }, [filter, platform, genre, sort]);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Games Database"
        title="Browse All Games"
        description="Explore the complete Nexus database — filter by platform, genre, price and more. Every link goes to an official store."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                filter === key
                  ? "bg-neon text-background border-neon"
                  : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Secondary filters */}
        <div className="flex flex-wrap gap-3 items-center mb-8 p-4 glass rounded-lg">
          <Filter className="size-4 text-white/40" />
          <Select label="Platform" value={platform} onChange={(v) => setPlatform(v as Platform | "All")} options={["All", ...platforms]} />
          <Select label="Genre" value={genre} onChange={setGenre} options={["All", ...genres]} />
          <Select
            label="Sort"
            value={sort}
            onChange={(v) => setSort(v as typeof sort)}
            options={["popularity", "rating", "name", "release"]}
            labels={{ popularity: "Popularity", rating: "Rating", name: "Name", release: "Release Date" }}
          />
          <div className="ml-auto text-xs uppercase tracking-widest text-white/40">
            {filtered.length} game{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 glass rounded-lg">
            <p className="text-white/50">No games match your filters.</p>
            <Link to="/games" className="mt-4 inline-block text-neon font-bold uppercase tracking-widest text-sm">
              Reset filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filtered.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function Select({
  label, value, onChange, options, labels,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  labels?: Record<string, string>;
}) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="text-white/40 uppercase tracking-widest">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surface-2 border border-white/10 rounded px-3 py-1.5 text-white text-xs focus:outline-none focus:border-neon"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-surface text-white">
            {labels?.[o] ?? o}
          </option>
        ))}
      </select>
    </label>
  );
}
