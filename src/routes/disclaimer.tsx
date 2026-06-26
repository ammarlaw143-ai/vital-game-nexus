import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site-layout";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Nexus Gaming" },
      { name: "description", content: "Editorial and affiliate disclaimer for Nexus Gaming." },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Disclaimer" accent="violet" />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-6 text-white/70 leading-relaxed">
        <p className="text-sm text-white/40 uppercase tracking-widest">Last updated: June 26, 2026</p>
        {[
          ["Editorial Independence", "All reviews, opinions and editorial content are independently produced. Publishers do not approve coverage prior to publication."],
          ["Affiliate Links", "Some links to official stores may earn Nexus Gaming a small commission at no extra cost to you. This never influences our editorial coverage or scores."],
          ["Trademarks", "All game titles, characters, cover art and logos are the property of their respective publishers and developers."],
          ["Accuracy", "We strive for accuracy. Prices, release dates and platform availability can change — always verify on the official store."],
          ["Modding Notice", "Modding content (Minecraft, GTA single-player, etc.) references community projects. We link only to trusted sources. Use mods at your own discretion and follow each publisher's terms of service."],
        ].map(([t, c]) => (
          <section key={t}>
            <h2 className="font-display text-xl font-bold uppercase text-white mb-2">{t}</h2>
            <p>{c}</p>
          </section>
        ))}
      </article>
    </SiteLayout>
  );
}
