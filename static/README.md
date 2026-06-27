# Nexus Gaming — Static Site

A 100% static build of Nexus Gaming. No frameworks, no build step, no server.

## Run locally
Just open `index.html` in any modern browser. Or serve the folder with any static host.

## Deploy to GitHub Pages
1. Push the contents of this folder (`static/`) to a repository (or set `static/` as the Pages source).
2. In **Settings → Pages**, pick your branch and `/ (root)` (or `/static`).
3. Done — the site is live.

## Stack
- Plain HTML files (one per page)
- Single CSS file: `assets/css/styles.css`
- Vanilla JS: `assets/js/data.js` (content) and `assets/js/app.js` (UI logic)
- Images in `assets/img/`

## Pages
- `index.html` — Home
- `games.html` / `game.html?slug=...` — Database + detail
- `news.html` / `article.html?slug=...` — News + article
- `minecraft.html` / `mods.html` / `commands.html` — Minecraft hub
- `gta.html` — GTA hub
- `about.html`, `contact.html`, `favorites.html`
- `privacy.html`, `terms.html`, `disclaimer.html`, `404.html`

Favorites are stored in `localStorage` under `nexus:favs`.
