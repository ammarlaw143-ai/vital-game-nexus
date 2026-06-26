import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site-layout";
import { GameCard } from "@/components/game-card";
import { games } from "@/lib/games";
import { useFavorites } from "@/hooks/use-favorites";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Your Favorites — Nexus Gaming" },
      { name: "description", content: "Your saved games on Nexus Gaming." },
      { property: "og:url", content: "/favorites" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/favorites" }],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favs } = useFavorites();
  const list = games.filter((g) => favs.includes(g.slug));

  return (
    <SiteLayout>
      <PageHeader eyebrow="Your Library" title="Favorites" description="Games you've saved across the Nexus database." accent="violet" />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {list.length === 0 ? (
          <div className="glass rounded-xl py-16 text-center">
            <Heart className="size-10 mx-auto text-violet mb-4" />
            <p className="text-white/60">No favorites yet. Tap the heart on any game to save it here.</p>
            <Link to="/games" className="mt-6 inline-block px-6 py-3 bg-violet text-white font-bold uppercase tracking-widest text-xs">
              Browse Games
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {list.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
