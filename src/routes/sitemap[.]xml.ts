import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { games } from "@/lib/games";
import { news } from "@/lib/news";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/games", changefreq: "daily", priority: "0.9" },
          { path: "/news", changefreq: "daily", priority: "0.9" },
          { path: "/minecraft", changefreq: "weekly", priority: "0.8" },
          { path: "/minecraft/mods", changefreq: "weekly", priority: "0.8" },
          { path: "/minecraft/commands", changefreq: "weekly", priority: "0.7" },
          { path: "/gta", changefreq: "weekly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          { path: "/disclaimer", changefreq: "yearly", priority: "0.3" },
        ];

        const gamePaths = games.map((g) => ({
          path: `/games/${g.slug}`,
          changefreq: "weekly",
          priority: "0.7",
        }));

        const newsPaths = news.map((n) => ({
          path: `/news/${n.slug}`,
          lastmod: n.date,
          changefreq: "monthly",
          priority: "0.6",
        }));

        const all = [...staticPaths, ...gamePaths, ...newsPaths];
        const urls = all.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            "lastmod" in e && e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
