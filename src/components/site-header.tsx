import { Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { Search, Menu, X, Heart } from "lucide-react";
import { games } from "@/lib/games";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/games", label: "Games" },
  { to: "/news", label: "News" },
  { to: "/minecraft", label: "Minecraft", accent: "text-mc" },
  { to: "/gta", label: "GTA", accent: "text-gta" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return games
      .filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.genres.some((x) => x.toLowerCase().includes(q)) ||
          g.developer.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowResults(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="size-6 rotate-45 bg-neon shadow-[0_0_20px_var(--color-neon)]" />
          <span className="font-display font-bold tracking-tight text-xl uppercase">
            Nexus<span className="text-neon">.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-widest text-white/60">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "!text-white" }}
              activeOptions={{ exact: l.to === "/" }}
              className={`hover:text-neon transition-colors ${("accent" in l && (l as { accent?: string }).accent) || ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <div ref={ref} className="relative hidden md:block w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder="Search 1200+ games..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 h-9 text-xs tracking-wide placeholder:text-white/40 focus:outline-none focus:border-neon/50 focus:bg-white/10 transition-all"
          />
          {showResults && results.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 glass rounded-lg overflow-hidden divide-y divide-white/5 max-h-96 overflow-y-auto">
              {results.map((g) => (
                <Link
                  key={g.slug}
                  to="/games/$slug"
                  params={{ slug: g.slug }}
                  onClick={() => {
                    setShowResults(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-white/5"
                >
                  <div className="size-10 rounded shrink-0" style={{ background: g.cover.gradient }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">{g.title}</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">{g.genres[0]}</p>
                  </div>
                  <span className="text-[10px] text-neon font-bold">
                    {g.price === "Free" ? "FREE" : `$${g.price}`}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/favorites"
          className="hidden md:grid size-9 place-items-center rounded-full bg-white/5 border border-white/10 hover:border-violet/60 hover:text-violet transition-colors text-white/70"
          aria-label="Favorites"
        >
          <Heart className="size-4" />
        </Link>

        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 px-4 py-4 space-y-1 bg-background">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded text-sm font-semibold uppercase tracking-widest text-white/70 hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/favorites"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded text-sm font-semibold uppercase tracking-widest text-white/70 hover:bg-white/5"
          >
            ❤ Favorites
          </Link>
        </div>
      )}
    </header>
  );
}
