// Nexus Gaming — shared app JS
(function(){
  const games = window.NEXUS_GAMES || [];
  const news = window.NEXUS_NEWS || [];
  const mods = window.NEXUS_MODS || [];
  const cmds = window.NEXUS_COMMANDS || [];

  // ---------- favorites ----------
  const FAV_KEY = "nexus:favs";
  const getFavs = () => { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch { return []; } };
  const setFavs = (a) => localStorage.setItem(FAV_KEY, JSON.stringify(a));
  const toggleFav = (slug) => {
    const f = getFavs();
    const i = f.indexOf(slug);
    if (i >= 0) f.splice(i,1); else f.push(slug);
    setFavs(f); return f.includes(slug);
  };
  window.NexusFavs = { get: getFavs, toggle: toggleFav, has: s => getFavs().includes(s) };

  // ---------- icons ----------
  const heart = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>`;
  const star = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>`;
  const search = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;

  // ---------- header ----------
  function renderHeader(active){
    const navItems = [
      ["Home","index.html"],["Games","games.html"],["News","news.html"],
      ["Minecraft","minecraft.html"],["GTA","gta.html"],["Favorites","favorites.html"]
    ];
    return `<header class="site-header"><div class="container inner">
      <a href="index.html" class="logo"><span class="diamond"></span>Nexus<span style="color:var(--neon)">.</span></a>
      <nav class="nav-links">${navItems.map(([l,h])=>`<a href="${h}" class="${active===h?'active':''}">${l}</a>`).join('')}</nav>
      <div class="search-wrap">
        <span class="icon">${search}</span>
        <input id="globalSearch" type="search" placeholder="Search games, news…" autocomplete="off"/>
        <div id="searchResults" class="search-results hidden"></div>
      </div>
    </div></header>`;
  }

  function renderFooter(){
    const cols = [
      ["Platforms",[["PC Gaming","games.html?platform=PC"],["PlayStation","games.html?platform=PS5"],["Xbox","games.html?platform=Xbox"],["Nintendo","games.html?platform=Switch"],["Mobile","games.html?platform=Mobile"]]],
      ["Discover",[["Trending","games.html?filter=trending"],["Top Rated","games.html?filter=top-rated"],["New Releases","games.html?filter=new"],["Upcoming","games.html?filter=upcoming"],["Free Games","games.html?filter=free"]]],
      ["Minecraft",[["Mods","mods.html"],["Commands","commands.html"],["Hub","minecraft.html"]]],
      ["Company",[["About","about.html"],["Contact","contact.html"],["Privacy","privacy.html"],["Terms","terms.html"],["Disclaimer","disclaimer.html"]]]
    ];
    return `<footer class="site-footer"><div class="container">
      <div class="cols">
        <div class="brand">
          <div class="logo" style="margin-bottom:1.25rem"><span class="diamond"></span>Nexus<span style="color:var(--neon)">.</span></div>
          <p style="font-size:.875rem;color:rgba(255,255,255,.5);max-width:20rem;line-height:1.65;margin:0 0 1.5rem">Where Every Gamer Belongs. The ultimate destination for news, guides, and the world's biggest gaming database.</p>
          <div class="socials">${["X","DC","YT","TW","IG"].map(s=>`<div>${s}</div>`).join('')}</div>
        </div>
        ${cols.map(([t,ls])=>`<div><h5>${t}</h5><ul>${ls.map(([l,h])=>`<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>`).join('')}
      </div>
      <div class="bottom">
        <p>© ${new Date().getFullYear()} Nexus Gaming. All rights reserved.</p>
        <p>Not affiliated with any game publisher. Trademarks belong to their respective owners.</p>
      </div>
    </div></footer>`;
  }

  // ---------- cards ----------
  function imgFor(seed, w, h){
    return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
  }
  function gameImg(g, w, h){
    if (g && g.image) return g.image;
    const q = encodeURIComponent((g && g.title ? g.title : 'video game') + ' video game');
    // loremflickr returns a Flickr photo tagged with the query — much more relevant than random
    return `https://loremflickr.com/${w}/${h}/${q}?lock=${Math.abs(hashStr(g.slug||g.title||'x'))%10000}`;
  }
  function newsImg(a, w, h){
    if (a && a.image) return a.image;
    const q = encodeURIComponent((a && a.title ? a.title : 'gaming news') + ' gaming');
    return `https://loremflickr.com/${w}/${h}/${q}?lock=${Math.abs(hashStr(a.slug||a.title||'x'))%10000}`;
  }
  function hashStr(s){ let h=0; for(let i=0;i<s.length;i++){ h=((h<<5)-h)+s.charCodeAt(i); h|=0;} return h; }

  function gameCardHTML(g){
    const price = g.price === "Free" ? "FREE" : `$${g.price.toFixed(2)}`;
    const fav = window.NexusFavs.has(g.slug);
    return `<a class="game-card" href="game.html?slug=${g.slug}">
      <div class="cover">
        <img class="cover-img" src="${imgFor('nexus-'+g.slug, 480, 640)}" alt="${g.title}" loading="lazy"/>
        <div class="cover-grad" style="background:${g.gradient};mix-blend-mode:overlay;opacity:.55"></div>
        <div class="cover-grid grid-bg"></div>
        <div class="cover-fade"></div>
        <div class="top-bar">
          <span class="price-badge ${g.price==='Free'?'free':''}">${price}</span>
          <button class="fav-btn ${fav?'active':''}" data-fav="${g.slug}" aria-label="Favorite">${heart}</button>
        </div>
        <div class="meta">
          ${g.rating>0?`<div class="rating">${star}<span>${g.rating.toFixed(1)}</span></div>`:''}
          <h3>${g.title}</h3>
          <p class="genres">${g.genres.slice(0,2).join(' • ')}</p>
        </div>
      </div>
      <div class="footer"><span>${g.platforms.slice(0,3).join(' / ')}</span><span>${new Date(g.releaseDate).getFullYear()}</span></div>
    </a>`;
  }

  function newsCardHTML(a, variant){
    const v = variant || "default";
    if (v === "compact") {
      return `<a class="news-compact" href="article.html?slug=${a.slug}">
        <img class="thumb" src="${imgFor('news-'+a.slug, 160, 160)}" alt="${a.title}"/>
        <div style="min-width:0">
          <span class="badge ${a.tag||'neon'}">${a.category}</span>
          <h4>${a.title}</h4>
          <p style="margin-top:.25rem;font-size:.625rem;text-transform:uppercase;letter-spacing:.2em;color:rgba(255,255,255,.4)">${new Date(a.date).toLocaleDateString()} • ${a.readTime} min</p>
        </div>
      </a>`;
    }
    const w = v==='feature'?1280:800, h = v==='feature'?720:500;
    return `<a class="news-card ${v==='feature'?'feature':''}" href="article.html?slug=${a.slug}">
      <div class="cover">
        <img class="cover-img" src="${imgFor('news-'+a.slug, w, h)}" alt="${a.title}" loading="lazy"/>
        <div class="cover-grad" style="background:linear-gradient(135deg,var(--violet),var(--neon));mix-blend-mode:overlay;opacity:.45"></div>
        <div class="cover-fade"></div>
        <div class="body">
          <span class="badge ${a.tag||'neon'}">${a.category}</span>
          <h3>${a.title}</h3>
          ${v==='feature'?`<p class="excerpt line-clamp-2">${a.excerpt}</p>`:''}
          <p class="byline">${a.author} • ${new Date(a.date).toLocaleDateString()} • ${a.readTime} min read</p>
        </div>
      </div>
    </a>`;
  }

  // ---------- mount layout ----------
  function mountLayout(active){
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    if (header) header.innerHTML = renderHeader(active);
    if (footer) footer.innerHTML = renderFooter();
    wireFavButtons();
    wireSearch();
  }

  function wireFavButtons(){
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-fav]");
      if (!btn) return;
      e.preventDefault();
      const slug = btn.getAttribute("data-fav");
      const on = window.NexusFavs.toggle(slug);
      document.querySelectorAll(`[data-fav="${slug}"]`).forEach(b => b.classList.toggle("active", on));
    });
  }

  function wireSearch(){
    const input = document.getElementById("globalSearch");
    const results = document.getElementById("searchResults");
    if (!input || !results) return;
    const close = () => { results.classList.add("hidden"); results.innerHTML=""; };
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) return close();
      const gMatches = games.filter(g => g.title.toLowerCase().includes(q)).slice(0,5);
      const nMatches = news.filter(n => n.title.toLowerCase().includes(q)).slice(0,3);
      if (!gMatches.length && !nMatches.length) { results.innerHTML = `<div style="padding:.75rem 1rem;font-size:.85rem;color:rgba(255,255,255,.5)">No results</div>`; results.classList.remove("hidden"); return; }
      results.innerHTML =
        gMatches.map(g => `<a href="game.html?slug=${g.slug}"><strong>${g.title}</strong> <span style="color:rgba(255,255,255,.4);font-size:.7rem;margin-left:.5rem">${g.genres[0]}</span></a>`).join('') +
        nMatches.map(n => `<a href="article.html?slug=${n.slug}"><strong>${n.title}</strong> <span style="color:rgba(255,255,255,.4);font-size:.7rem;margin-left:.5rem">News</span></a>`).join('');
      results.classList.remove("hidden");
    });
    document.addEventListener("click", (e) => { if (!e.target.closest(".search-wrap")) close(); });
  }

  // ---------- expose ----------
  window.Nexus = {
    games, news, mods, cmds,
    mountLayout, gameCardHTML, newsCardHTML,
    findGame: s => games.find(g => g.slug === s),
    findArticle: s => news.find(n => n.slug === s),
    qs: (k) => new URLSearchParams(location.search).get(k),
  };
})();
