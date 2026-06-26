import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site-layout";
import { Mail, MessageSquare, Send, Twitter, Youtube } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nexus Gaming" },
      { name: "description", content: "Get in touch with the Nexus Gaming team. Press inquiries, tips, advertising and partnerships." },
      { property: "og:title", content: "Contact Nexus Gaming" },
      { property: "og:description", content: "Press, tips, advertising and partnership inquiries." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Tips, press inquiries, advertising opportunities or partnership ideas — we read everything."
        accent="violet"
      />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass rounded-xl p-8">
          {sent ? (
            <div className="text-center py-12">
              <div className="size-14 mx-auto rounded-full bg-neon/20 text-neon grid place-items-center mb-4">
                <Send className="size-6" />
              </div>
              <h2 className="font-display text-2xl font-bold uppercase">Message Sent</h2>
              <p className="text-white/60 mt-2">Thanks — we'll get back within 48 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl font-bold uppercase">Send a message</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Name" required>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-neon" />
                </Field>
                <Field label="Email" required>
                  <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-neon" />
                </Field>
              </div>
              <Field label="Subject" required>
                <select className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-neon">
                  <option className="bg-surface">News Tip</option>
                  <option className="bg-surface">Press / PR</option>
                  <option className="bg-surface">Advertising</option>
                  <option className="bg-surface">Partnership</option>
                  <option className="bg-surface">General</option>
                </select>
              </Field>
              <Field label="Message" required>
                <textarea required rows={6} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-neon" />
              </Field>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-background font-bold uppercase tracking-widest text-xs hover:brightness-110"
              >
                Send <Send className="size-4" />
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <ContactBlock icon={Mail} title="Email" value="press@nexusgaming.example" />
          <ContactBlock icon={MessageSquare} title="Discord" value="discord.gg/nexus" />
          <ContactBlock icon={Twitter} title="Twitter / X" value="@NexusGaming" />
          <ContactBlock icon={Youtube} title="YouTube" value="@NexusGaming" />
        </aside>
      </section>
    </SiteLayout>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-2 block">
        {label}{required && <span className="text-neon"> *</span>}
      </span>
      {children}
    </label>
  );
}

function ContactBlock({ icon: Icon, title, value }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string }) {
  return (
    <div className="glass rounded-lg p-5 flex items-start gap-4">
      <div className="size-10 rounded bg-violet/15 grid place-items-center text-violet shrink-0">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-white/40">{title}</p>
        <p className="font-mono text-sm mt-1">{value}</p>
      </div>
    </div>
  );
}
