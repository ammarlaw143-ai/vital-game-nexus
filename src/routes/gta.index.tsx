import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { findGame } from "@/lib/games";
import gtaImg from "@/assets/hub-gta.jpg";
import { ArrowRight, DollarSign, Car, Crosshair, Gamepad2, MapPin, Trophy } from "lucide-react";

export const Route = createFileRoute("/gta/")({
  head: () => ({
    meta: [
      { title: "GTA Hub — Guides, Heists & GTA VI News | Nexus Gaming" },
      { name: "description", content: "The complete GTA resource: money guides, businesses, cars, weapons, heists, hidden secrets, the latest GTA VI news and more." },
      { property: "og:title", content: "GTA Hub — Nexus Gaming" },
      { property: "og:description", content: "Money guides, heists, vehicles, secrets and GTA VI news." },
      { property: "og:url", content: "/gta" },
    ],
    links: [{ rel: "canonical", href: "/gta" }],
  }),
  component: GTAHub,
});

const sections = [
  { icon: DollarSign, title: "Money Guides", desc: "The fastest, most reliable ways to print legitimate cash in GTA Online." },
  { icon: Car, title: "Vehicles", desc: "Every car, bike, jet and tank — with prices, top speeds and where to find them." },
  { icon: Crosshair, title: "Weapons", desc: "Complete arsenal breakdown with stats and unlock requirements." },
  { icon: MapPin, title: "Hidden Locations", desc: "Easter eggs, secret areas and collectible hunts across Los Santos." },
  { icon: Trophy, title: "Heists", desc: "Step-by-step walkthroughs for every heist — solo and crew strategies." },
  { icon: Gamepad2, title: "Best Settings", desc: "Optimal graphics, controller and FOV settings for every platform." },
];

const topics = [
  "Businesses", "Story Mode", "GTA Online", "Performance", "Controller Setup",
  "Achievements", "Collectibles", "Tips", "Secrets", "Single-Player Mods",
];

function GTAHub() {
  const gtaV = findGame("gta-v");
  const gtaVI = findGame("gta-vi");

  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={gtaImg} alt="" className="absolute inset-0 size-full object-cover" loading="eager" width={1200} height={800} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 flex flex-col justify-end pb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gta mb-4">Los Santos Vault</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none tracking-tight">
            Master The
            <br />
            <span className="text-gta">GTA Universe</span>
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-lg">
            The most complete GTA V and GTA Online resource — plus everything we know about GTA VI.
          </p>
        </div>
      </section>

      {/* Featured GTA games */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[gtaV, gtaVI].filter((g): g is NonNullable<typeof g> => !!g).map((g) => (
          <Link
            key={g.slug}
            to="/games/$slug"
            params={{ slug: g.slug }}
            className="group relative aspect-[16/10] rounded-xl overflow-hidden"
            style={{ background: g.cover.gradient }}
          >
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-8">
              {g.upcoming && (
                <span className="self-start px-2.5 py-1 bg-gta text-black text-[10px] font-bold uppercase tracking-widest mb-3">
                  Upcoming
                </span>
              )}
              <h3 className="font-display text-3xl font-bold uppercase">{g.title}</h3>
              <p className="text-white/70 mt-2">{g.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gta group-hover:gap-3 transition-all">
                View Game <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <h2 className="font-display text-3xl font-bold uppercase mb-2">Guides & Resources</h2>
        <div className="h-1 w-20 bg-gta mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((s) => (
            <div key={s.title} className="glass rounded-xl p-6 hover:border-gta/40 transition-all">
              <div className="size-12 rounded-lg bg-gta/15 grid place-items-center mb-4 text-gta">
                <s.icon className="size-6" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <h2 className="font-display text-3xl font-bold uppercase mb-2">More Topics</h2>
        <div className="h-1 w-20 bg-gta mb-8" />
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <span
              key={t}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-gta/50 text-sm cursor-pointer transition-all"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-8 border-gta/20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gta mb-3">Important</p>
          <h3 className="font-display text-2xl font-bold uppercase mb-3">Official Sources Only</h3>
          <p className="text-white/70 max-w-2xl">
            All Nexus GTA resources reference and link only to official Rockstar Games sources and trusted, well-known
            single-player modding communities. We never host or distribute pirated content.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
