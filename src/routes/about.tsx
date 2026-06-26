import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site-layout";
import { Gamepad2, Globe2, Trophy, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nexus Gaming" },
      { name: "description", content: "Nexus Gaming is the premium gaming destination built by gamers, for gamers. Learn about our mission, values, and team." },
      { property: "og:title", content: "About Nexus Gaming" },
      { property: "og:description", content: "Built by gamers, for gamers. Our mission and values." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: Gamepad2, title: "Gamers First", desc: "Every decision is made through the lens of what serves the player." },
  { icon: Globe2, title: "Official Only", desc: "We link to legitimate stores and trusted creators — never pirated content." },
  { icon: Trophy, title: "Quality Coverage", desc: "Editorial standards on par with the biggest names in games journalism." },
  { icon: Users, title: "Community Driven", desc: "Our roadmap is shaped by the community we serve." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About Us"
        title="Built By Gamers,
For Gamers."
        description="Nexus Gaming is a premium destination for news, guides, reviews and a database that spans every major platform — built by a small team of passionate writers and engineers."
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 space-y-12">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase mb-4">Our Mission</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            We exist to help every gamer find their next obsession — whether that's the next AAA blockbuster, a hidden
            indie gem, the perfect Minecraft mod, or the most efficient GTA Online business. We connect players to
            <strong className="text-white"> official sources</strong> with editorial integrity at the center of
            everything we publish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {values.map((v) => (
            <div key={v.title} className="glass rounded-xl p-6">
              <div className="size-10 rounded-lg bg-neon/15 grid place-items-center text-neon mb-4">
                <v.icon className="size-5" />
              </div>
              <h3 className="font-display text-lg font-bold uppercase">{v.title}</h3>
              <p className="text-sm text-white/60 mt-2">{v.desc}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-display text-3xl font-bold uppercase mb-4">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["1,200+", "Games"],
              ["890", "MC Mods"],
              ["45K", "Daily Readers"],
              ["24/7", "Live Updates"],
            ].map(([n, l]) => (
              <div key={l} className="glass rounded-lg p-5 text-center">
                <p className="font-display text-3xl font-bold text-neon">{n}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
