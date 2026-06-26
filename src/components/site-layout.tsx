import { type ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  accent = "neon",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  accent?: "neon" | "violet" | "mc" | "gta";
}) {
  const accentColor = {
    neon: "text-neon",
    violet: "text-violet",
    mc: "text-mc",
    gta: "text-gta",
  }[accent];
  const accentBg = {
    neon: "bg-neon",
    violet: "bg-violet",
    mc: "bg-mc",
    gta: "bg-gta",
  }[accent];

  return (
    <section className="relative border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
        {eyebrow && (
          <p className={`text-xs font-bold uppercase tracking-[0.3em] mb-4 ${accentColor}`}>
            {eyebrow}
          </p>
        )}
        <h1 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tight leading-none">
          {title}
        </h1>
        <div className={`h-1 w-20 mt-5 ${accentBg}`} />
        {description && (
          <p className="mt-6 text-white/60 max-w-2xl text-lg leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
