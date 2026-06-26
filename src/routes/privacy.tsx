import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Nexus Gaming" },
      { name: "description", content: "Nexus Gaming's privacy policy: what we collect, how it's used, and your rights." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 prose prose-invert space-y-6 text-white/70 leading-relaxed">
        <p className="text-sm text-white/40 uppercase tracking-widest">Last updated: June 26, 2026</p>
        <Section title="1. Information We Collect">
          Nexus Gaming collects only the data needed to operate the site: anonymous analytics (page views, country, device), and the contents of any form you submit (contact, newsletter).
        </Section>
        <Section title="2. How We Use It">
          We use the data to improve content, deliver newsletters you've subscribed to, and respond to inquiries. We do not sell personal data to third parties.
        </Section>
        <Section title="3. Cookies & Local Storage">
          We use local storage to remember your favorites and reading progress. No third-party tracking cookies are set by default.
        </Section>
        <Section title="4. Third-Party Links">
          Game pages link to official stores (Steam, Epic, PlayStation, Xbox, Nintendo, publishers). Those sites have their own privacy policies — please review them when you visit.
        </Section>
        <Section title="5. Your Rights">
          You may request deletion of any data we hold by emailing privacy@nexusgaming.example. We respond within 30 days.
        </Section>
        <Section title="6. Updates">
          We may update this policy. Material changes will be highlighted on this page.
        </Section>
      </article>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold uppercase text-white mb-2">{title}</h2>
      <p>{children}</p>
    </section>
  );
}
