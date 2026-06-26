import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site-layout";
import { mods, commands } from "@/lib/minecraft";
import mcImg from "@/assets/hub-minecraft.jpg";
import { ArrowRight, Pickaxe, Terminal, Sparkles, Map, Hammer, Users } from "lucide-react";

export const Route = createFileRoute("/minecraft/")({
  head: () => ({
    meta: [
      { title: "Minecraft Hub — Mods, Commands & Tutorials | Nexus Gaming" },
      { name: "description", content: "The biggest Minecraft resource on the web: 890+ mods, commands, shaders, redstone, building, server and seed guides — all linked to official sources." },
      { property: "og:title", content: "Minecraft Hub — Nexus Gaming" },
      { property: "og:description", content: "Minecraft mods, commands, shaders, tutorials and more." },
      { property: "og:url", content: "/minecraft" },
    ],
    links: [{ rel: "canonical", href: "/minecraft" }],
  }),
  component: MinecraftHub,
});

const categories = [
  { to: "/minecraft/mods", label: "Mods", icon: Pickaxe, desc: "890+ trusted mods, only from official sources" },
  { to: "/minecraft/commands", label: "Commands", icon: Terminal, desc: "Full command reference with examples" },
  { to: "/minecraft", label: "Shaders", icon: Sparkles, desc: "Best shader packs for stunning visuals" },
  { to: "/minecraft", label: "Maps & Seeds", icon: Map, desc: "Hand-picked worlds worth exploring" },
  { to: "/minecraft", label: "Redstone & Farms", icon: Hammer, desc: "Automation, contraptions and engineering" },
  { to: "/minecraft", label: "Servers", icon: Users, desc: "Top public servers across every genre" },
];

const topics = [
  "Beginner Guides", "Advanced Tutorials", "Enchantments", "Villagers", "Bosses",
  "Biomes", "Dimensions", "Texture Packs", "Resource Packs", "Command Blocks",
  "Building Guides", "Version Guides", "FAQs", "Automation",
];

function MinecraftHub() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={mcImg} alt="" className="absolute inset-0 size-full object-cover" loading="eager" width={1200} height={800} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 flex flex-col justify-end pb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-mc mb-4">Minecraft Central</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none tracking-tight">
            The Ultimate
            <br />
            <span className="text-mc">Minecraft Vault</span>
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-lg">
            Mods, commands, shaders, tutorials, servers, redstone and more — every link goes to an official source.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <h2 className="font-display text-3xl font-bold uppercase mb-2">Explore Resources</h2>
        <div className="h-1 w-20 bg-mc mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className="group relative glass rounded-xl p-6 border-mc/0 hover:border-mc/50 transition-all"
            >
              <div className="size-12 rounded-lg bg-mc/15 grid place-items-center mb-4 text-mc">
                <c.icon className="size-6" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">{c.label}</h3>
              <p className="mt-2 text-sm text-white/60">{c.desc}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mc group-hover:gap-3 transition-all">
                Open <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top mods preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-mc mb-3">Most Downloaded</p>
            <h2 className="font-display text-3xl font-bold uppercase">Top Mods Right Now</h2>
          </div>
          <Link to="/minecraft/mods" className="text-xs font-bold uppercase tracking-widest text-mc">
            All mods →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mods.slice(0, 6).map((m) => (
            <div key={m.slug} className="glass rounded-lg p-5 hover:border-mc/40 transition-all">
              <div className="flex items-start justify-between mb-3">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm" style={{ background: `${m.accent}25`, color: m.accent }}>
                  {m.category}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">{m.version}</span>
              </div>
              <h3 className="font-display text-lg font-bold uppercase">{m.name}</h3>
              <p className="text-xs text-white/40 mb-3">by {m.author} • {m.downloads} downloads</p>
              <p className="text-sm text-white/70 line-clamp-2 mb-4">{m.description}</p>
              <a
                href={m.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest text-mc hover:underline"
              >
                Official download →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <h2 className="font-display text-3xl font-bold uppercase mb-2">All Topics</h2>
        <div className="h-1 w-20 bg-mc mb-8" />
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <span
              key={t}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-mc/50 text-sm cursor-pointer transition-all"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Quick command preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-mc mb-3">Command Quick Ref</p>
            <h2 className="font-display text-3xl font-bold uppercase">Popular Commands</h2>
          </div>
          <Link to="/minecraft/commands" className="text-xs font-bold uppercase tracking-widest text-mc">
            All commands →
          </Link>
        </div>
        <div className="glass rounded-lg overflow-hidden">
          <div className="divide-y divide-white/5">
            {commands.slice(0, 6).map((c) => (
              <div key={c.command} className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <code className="font-mono text-mc font-bold">{c.command}</code>
                <p className="text-sm text-white/70">{c.description}</p>
                <code className="text-xs text-white/40 font-mono bg-black/40 px-2 py-1 rounded">{c.example}</code>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
