import { useEffect, useState } from "react";

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("nexus:favs");
      if (raw) setFavs(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: string[]) => {
    setFavs(next);
    try {
      localStorage.setItem("nexus:favs", JSON.stringify(next));
    } catch {}
  };

  const toggle = (slug: string) => {
    persist(favs.includes(slug) ? favs.filter((s) => s !== slug) : [...favs, slug]);
  };
  const has = (slug: string) => favs.includes(slug);

  return { favs, toggle, has };
}
