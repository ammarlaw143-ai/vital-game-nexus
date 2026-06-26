import { Link } from "@tanstack/react-router";
import type { Game } from "@/lib/games";
import { useFavorites } from "@/hooks/use-favorites";
import { Heart, Star } from "lucide-react";

export function GameCard({ game, large = false }: { game: Game; large?: boolean }) {
  const { has, toggle } = useFavorites();
  const fav = has(game.slug);
  const price = game.price === "Free" ? "FREE" : `$${game.price.toFixed(2)}`;

  return (
    <Link
      to="/games/$slug"
      params={{ slug: game.slug }}
      className="group block"
    >
      <div
        className={`relative aspect-[3/4] overflow-hidden rounded-lg border border-white/5 group-hover:border-neon/60 transition-all ${large ? "" : ""}`}
        style={{ background: game.cover.gradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-20" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <span
            className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm ${
              game.price === "Free"
                ? "bg-violet text-white"
                : "bg-black/60 text-white border border-white/15"
            }`}
          >
            {price}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggle(game.slug);
            }}
            className={`size-8 grid place-items-center rounded-full border transition-all ${
              fav
                ? "bg-violet/90 border-violet text-white"
                : "bg-black/40 border-white/15 text-white/70 hover:text-white hover:border-white/40"
            }`}
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className="size-4" fill={fav ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {game.rating > 0 && (
            <div className="flex items-center gap-1 mb-2 text-neon">
              <Star className="size-3.5" fill="currentColor" />
              <span className="text-xs font-bold">{game.rating.toFixed(1)}</span>
            </div>
          )}
          <h3 className="font-display font-bold uppercase tracking-tight text-lg leading-none text-white group-hover:text-neon transition-colors">
            {game.title}
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-white/60">
            {game.genres.slice(0, 2).join(" • ")}
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
        <span>{game.platforms.slice(0, 3).join(" / ")}</span>
        <span>{new Date(game.releaseDate).getFullYear()}</span>
      </div>
    </Link>
  );
}
