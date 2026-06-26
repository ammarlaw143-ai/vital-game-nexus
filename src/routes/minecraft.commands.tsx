import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site-layout";
import { commands } from "@/lib/minecraft";
import { ArrowLeft, Copy, Check } from "lucide-react";

export const Route = createFileRoute("/minecraft/commands")({
  head: () => ({
    meta: [
      { title: "Minecraft Commands — Full Reference | Nexus Gaming" },
      { name: "description", content: "The complete Minecraft command reference. Every command with description, syntax and copy-ready examples." },
      { property: "og:title", content: "Minecraft Commands — Nexus Gaming" },
      { property: "og:description", content: "Complete Minecraft command reference with examples." },
      { property: "og:url", content: "/minecraft/commands" },
    ],
    links: [{ rel: "canonical", href: "/minecraft/commands" }],
  }),
  component: CommandsPage,
});

const cats = ["All", ...Array.from(new Set(commands.map((c) => c.category)))];

function CommandsPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      commands.filter(
        (c) =>
          (cat === "All" || c.category === cat) &&
          (!q || c.command.includes(q.toLowerCase()) || c.description.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  const copy = (s: string) => {
    navigator.clipboard?.writeText(s);
    setCopied(s);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Minecraft Commands"
        title="Command Reference"
        description="Every command, complete with description and a working example you can copy with one click."
        accent="mc"
      />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <Link to="/minecraft" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-mc mb-6">
          <ArrowLeft className="size-4" /> Minecraft Hub
        </Link>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search commands..."
            className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm font-mono focus:outline-none focus:border-mc"
          />
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                  cat === c ? "bg-mc text-black border-mc" : "border-white/15 text-white/70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c.command + c.example} className="glass rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <code className="font-mono text-mc text-lg font-bold">{c.command}</code>
                <span className="text-[10px] uppercase tracking-widest text-white/40">{c.category}</span>
              </div>
              <p className="text-sm text-white/70 mb-3">{c.description}</p>
              <div className="flex items-center gap-2 bg-black/50 rounded p-3">
                <code className="flex-1 font-mono text-xs text-white/90 break-all">{c.example}</code>
                <button
                  onClick={() => copy(c.example)}
                  className="size-8 grid place-items-center rounded bg-white/5 hover:bg-mc/20 hover:text-mc text-white/60"
                  aria-label="Copy command"
                >
                  {copied === c.example ? <Check className="size-4" /> : <Copy className="size-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
