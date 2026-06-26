import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site-layout";
import { mods } from "@/lib/minecraft";
import { ExternalLink, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/minecraft/mods")({
  head: () => ({
    meta: [
      { title: "Minecraft Mods — Official Downloads | Nexus Gaming" },
      { name: "description", content: "Browse the best Minecraft mods. Each entry links to its official download page on CurseForge, Modrinth, or the mod author's site." },
      { property: "og:title", content: "Minecraft Mods — Nexus Gaming" },
      { property: "og:description", content: "Browse the best Minecraft mods. Official sources only." },
      { property: "og:url", content: "/minecraft/mods" },
    ],
    links: [{ rel: "canonical", href: "/minecraft/mods" }],
  }),
  component: ModsPage,
});

const cats = ["All", ...Array.from(new Set(mods.map((m) => m.category)))];

function ModsPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      mods.filter(
        (m) =>
          (cat === "All" || m.category === cat) &&
          (!q || m.name.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Minecraft Mods"
        title="Mod Database"
        description="Trusted mods only. Every download link goes to the mod author's official source — never reuploaded files."
        accent="mc"
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <Link to="/minecraft" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-mc mb-6">
          <ArrowLeft className="size-4" /> Minecraft Hub
        </Link>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search mods..."
            className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-mc"
          />
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                  cat === c
                    ? "bg-mc text-black border-mc"
                    : "border-white/15 text-white/70 hover:border-white/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((m) => (
            <article key={m.slug} className="glass rounded-xl p-6 hover:border-mc/40 transition-all">
              <div className="flex items-start justify-between mb-3">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm" style={{ background: `${m.accent}25`, color: m.accent }}>
                  {m.category}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">{m.version}</span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase">{m.name}</h3>
              <p className="text-xs text-white/40 mt-1">by {m.author}</p>
              <p className="text-sm text-white/70 mt-3 leading-relaxed">{m.description}</p>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/40">{m.downloads} downloads</span>
                <a
                  href={m.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-mc hover:underline"
                >
                  Official <ExternalLink className="size-3" />
                </a>
              </div>
              <details className="mt-4 text-xs text-white/60">
                <summary className="cursor-pointer text-mc font-bold uppercase tracking-widest">Installation</summary>
                <ol className="mt-2 space-y-1 list-decimal list-inside text-white/60">
                  <li>Install the matching mod loader (Forge / Fabric).</li>
                  <li>Download the mod from its official link above.</li>
                  <li>Place the .jar in your <code className="bg-black/40 px-1 rounded">.minecraft/mods</code> folder.</li>
                  <li>Launch Minecraft with the corresponding profile.</li>
                </ol>
              </details>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
