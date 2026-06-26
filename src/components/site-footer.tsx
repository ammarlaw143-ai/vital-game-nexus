import { Link } from "@tanstack/react-router";

const cols = [
  {
    title: "Platforms",
    links: [
      ["PC Gaming", "/games?platform=PC"],
      ["PlayStation", "/games?platform=PS5"],
      ["Xbox", "/games?platform=Xbox"],
      ["Nintendo", "/games?platform=Switch"],
      ["Mobile", "/games?platform=Mobile"],
    ],
  },
  {
    title: "Discover",
    links: [
      ["Trending", "/games?filter=trending"],
      ["Top Rated", "/games?filter=top-rated"],
      ["New Releases", "/games?filter=new"],
      ["Upcoming", "/games?filter=upcoming"],
      ["Free Games", "/games?filter=free"],
    ],
  },
  {
    title: "Minecraft",
    links: [
      ["Mods", "/minecraft/mods"],
      ["Commands", "/minecraft/commands"],
      ["Tutorials", "/minecraft"],
      ["Shaders", "/minecraft/mods"],
      ["Hub", "/minecraft"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Disclaimer", "/disclaimer"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-surface mt-24 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="size-6 rotate-45 bg-neon shadow-[0_0_20px_var(--color-neon)]" />
              <span className="font-display font-bold tracking-tight text-2xl uppercase">
                Nexus<span className="text-neon">.</span>
              </span>
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed mb-6">
              Where Every Gamer Belongs. The ultimate destination for news, guides, and the world's biggest gaming database.
            </p>
            <div className="flex gap-3">
              {["X", "DC", "YT", "TW", "IG"].map((s) => (
                <div
                  key={s}
                  className="size-9 rounded-full grid place-items-center bg-white/5 border border-white/10 hover:border-neon hover:text-neon transition-colors text-[10px] font-bold cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h5 className="font-display text-sm font-bold uppercase tracking-widest mb-5">
                {c.title}
              </h5>
              <ul className="space-y-3 text-sm text-white/50">
                {c.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="hover:text-neon transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between gap-4 items-center">
          <p className="text-[10px] uppercase tracking-widest text-white/40">
            © {new Date().getFullYear()} Nexus Gaming. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/40">
            Not affiliated with any game publisher. Trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
