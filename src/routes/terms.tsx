import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site-layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Nexus Gaming" },
      { name: "description", content: "Terms of service for Nexus Gaming." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-6 text-white/70 leading-relaxed">
        <p className="text-sm text-white/40 uppercase tracking-widest">Last updated: June 26, 2026</p>
        {[
          ["1. Acceptance", "By accessing Nexus Gaming you agree to these terms. If you do not agree, please do not use the site."],
          ["2. Use of Content", "All editorial content is © Nexus Gaming unless otherwise noted. You may share and link to articles freely but may not republish in full without permission."],
          ["3. User Conduct", "Comments, tips, and other submissions must be lawful, respectful, and free of personal data of third parties."],
          ["4. Game Information", "Game metadata, cover art and trademarks belong to their respective publishers. Nexus Gaming is not affiliated with any publisher unless explicitly stated."],
          ["5. External Links", "We link to official stores and trusted partners. We are not responsible for the content of external sites."],
          ["6. Disclaimers", "The site is provided 'as is' without warranties of any kind."],
          ["7. Limitation of Liability", "Nexus Gaming is not liable for any indirect, incidental or consequential damages arising from use of the site."],
          ["8. Changes", "We may modify these terms. Continued use of the site constitutes acceptance of the updated terms."],
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
