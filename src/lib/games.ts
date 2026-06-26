export type Platform = "PC" | "PS5" | "PS4" | "Xbox" | "Switch" | "Mobile";

export interface Game {
  slug: string;
  title: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  genres: string[];
  platforms: Platform[];
  price: number | "Free";
  rating: number; // /10
  popularity: number; // 0-100
  trending?: boolean;
  upcoming?: boolean;
  topRated?: boolean;
  newRelease?: boolean;
  tags: string[];
  cover: { gradient: string; accent: string };
  description: string;
  features: string[];
  systemReq: { cpu: string; gpu: string; ram: string; storage: string };
  storeUrl: string;
  officialUrl: string;
  trailerUrl?: string;
}

const g = (
  slug: string,
  title: string,
  developer: string,
  publisher: string,
  releaseDate: string,
  genres: string[],
  platforms: Platform[],
  price: number | "Free",
  rating: number,
  popularity: number,
  description: string,
  storeUrl: string,
  officialUrl: string,
  gradient: string,
  accent: string,
  flags: Partial<Pick<Game, "trending" | "upcoming" | "topRated" | "newRelease">> = {},
  tags: string[] = [],
): Game => ({
  slug, title, developer, publisher, releaseDate, genres, platforms, price, rating, popularity,
  description,
  features: [
    "Stunning next-gen visuals",
    "Massive open world to explore",
    "Cross-platform multiplayer support",
    "Regular post-launch content updates",
  ],
  systemReq: {
    cpu: "Intel Core i5-10400 / AMD Ryzen 5 3600",
    gpu: "NVIDIA RTX 2060 / AMD RX 5700",
    ram: "16 GB",
    storage: "75 GB SSD",
  },
  storeUrl, officialUrl,
  trailerUrl: "https://www.youtube.com/results?search_query=" + encodeURIComponent(title + " trailer"),
  cover: { gradient, accent },
  tags: tags.length ? tags : [...genres, ...platforms].slice(0, 5),
  ...flags,
});

export const games: Game[] = [
  g("cyberpunk-2077", "Cyberpunk 2077", "CD Projekt Red", "CD Projekt", "2020-12-10",
    ["RPG", "Action", "Open World"], ["PC", "PS5", "Xbox"], 39.99, 8.6, 95,
    "An open-world, action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    "https://store.steampowered.com/app/1091500/Cyberpunk_2077/", "https://www.cyberpunk.net/",
    "linear-gradient(135deg,#fcee0a,#ff0080)", "#fcee0a",
    { trending: true, topRated: true }),

  g("elden-ring", "Elden Ring", "FromSoftware", "Bandai Namco", "2022-02-25",
    ["RPG", "Souls-like", "Open World"], ["PC", "PS5", "Xbox"], 59.99, 9.6, 99,
    "A new fantasy action RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.",
    "https://store.steampowered.com/app/1245620/ELDEN_RING/", "https://en.bandainamcoent.eu/elden-ring/elden-ring",
    "linear-gradient(135deg,#c9a352,#1a0e08)", "#c9a352",
    { trending: true, topRated: true }),

  g("baldurs-gate-3", "Baldur's Gate 3", "Larian Studios", "Larian Studios", "2023-08-03",
    ["RPG", "Turn-based", "Co-op"], ["PC", "PS5", "Xbox"], 59.99, 9.7, 97,
    "Gather your party and return to the Forgotten Realms in a tale of fellowship, betrayal, sacrifice and survival.",
    "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/", "https://baldursgate3.game/",
    "linear-gradient(135deg,#7c2d12,#0c0a09)", "#f97316",
    { topRated: true }),

  g("gta-v", "Grand Theft Auto V", "Rockstar North", "Rockstar Games", "2013-09-17",
    ["Action", "Open World"], ["PC", "PS5", "Xbox"], 29.99, 9.5, 100,
    "Experience Rockstar Games' critically acclaimed open world game, Grand Theft Auto V.",
    "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/", "https://www.rockstargames.com/V",
    "linear-gradient(135deg,#10b981,#ec4899)", "#10b981",
    { trending: true, topRated: true }),

  g("gta-vi", "Grand Theft Auto VI", "Rockstar Games", "Rockstar Games", "2025-12-01",
    ["Action", "Open World"], ["PS5", "Xbox"], 69.99, 0, 100,
    "The next chapter in the Grand Theft Auto series, set in the state of Leonida.",
    "https://www.rockstargames.com/VI", "https://www.rockstargames.com/VI",
    "linear-gradient(135deg,#ec4899,#a21caf)", "#ec4899",
    { upcoming: true, trending: true }),

  g("minecraft", "Minecraft", "Mojang Studios", "Microsoft", "2011-11-18",
    ["Sandbox", "Survival", "Creative"], ["PC", "PS5", "Xbox", "Switch", "Mobile"], 29.99, 9.3, 98,
    "Minecraft is a game about placing blocks and going on adventures. Build anything you can imagine.",
    "https://www.minecraft.net/en-us/store", "https://www.minecraft.net/",
    "linear-gradient(135deg,#22c55e,#166534)", "#22c55e",
    { trending: true, topRated: true }),

  g("fortnite", "Fortnite", "Epic Games", "Epic Games", "2017-07-25",
    ["Battle Royale", "Shooter"], ["PC", "PS5", "Xbox", "Switch", "Mobile"], "Free", 8.5, 96,
    "Fortnite is the always free, always evolving, multiplayer game where you can play with friends across all platforms.",
    "https://store.epicgames.com/en-US/p/fortnite", "https://www.fortnite.com/",
    "linear-gradient(135deg,#8b5cf6,#06b6d4)", "#8b5cf6",
    { trending: true }),

  g("call-of-duty-mw3", "Call of Duty: Modern Warfare III", "Sledgehammer Games", "Activision", "2023-11-10",
    ["Shooter", "FPS", "Multiplayer"], ["PC", "PS5", "Xbox"], 69.99, 7.8, 88,
    "The ultimate FPS experience returns with the most ambitious Call of Duty yet.",
    "https://store.steampowered.com/app/2519060/", "https://www.callofduty.com/modernwarfareiii",
    "linear-gradient(135deg,#f97316,#1c1917)", "#f97316",
    { trending: true }),

  g("ea-sports-fc-24", "EA Sports FC 24", "EA Vancouver", "Electronic Arts", "2023-09-29",
    ["Sports", "Simulation"], ["PC", "PS5", "Xbox", "Switch"], 69.99, 7.5, 90,
    "The World's Game brings you closer to football than ever before with HyperMotionV technology.",
    "https://store.steampowered.com/app/2195250/EA_SPORTS_FC_24/", "https://www.ea.com/games/ea-sports-fc/fc-24",
    "linear-gradient(135deg,#0ea5e9,#1e293b)", "#0ea5e9",
    { trending: true }),

  g("the-witcher-3", "The Witcher 3: Wild Hunt", "CD Projekt Red", "CD Projekt", "2015-05-19",
    ["RPG", "Open World"], ["PC", "PS5", "Xbox", "Switch"], 39.99, 9.7, 94,
    "You are Geralt of Rivia, mercenary monster slayer. Hunt down a child of prophecy in a vast open world.",
    "https://store.steampowered.com/app/292030/", "https://www.thewitcher.com/",
    "linear-gradient(135deg,#dc2626,#1c1917)", "#dc2626",
    { topRated: true }),

  g("red-dead-redemption-2", "Red Dead Redemption 2", "Rockstar Games", "Rockstar Games", "2018-10-26",
    ["Action", "Open World", "Western"], ["PC", "PS5", "Xbox"], 59.99, 9.8, 95,
    "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run.",
    "https://store.steampowered.com/app/1174180/", "https://www.rockstargames.com/reddeadredemption2",
    "linear-gradient(135deg,#b45309,#451a03)", "#b45309",
    { topRated: true }),

  g("hogwarts-legacy", "Hogwarts Legacy", "Avalanche Software", "Warner Bros. Games", "2023-02-10",
    ["RPG", "Adventure", "Open World"], ["PC", "PS5", "Xbox", "Switch"], 59.99, 8.4, 87,
    "An immersive, open-world action RPG set in the world first introduced in the Harry Potter books.",
    "https://store.steampowered.com/app/990080/", "https://www.hogwartslegacy.com/",
    "linear-gradient(135deg,#7c3aed,#1e1b4b)", "#7c3aed",
    { topRated: true }),

  g("starfield", "Starfield", "Bethesda Game Studios", "Bethesda Softworks", "2023-09-06",
    ["RPG", "Sci-Fi", "Space"], ["PC", "Xbox"], 69.99, 7.1, 80,
    "Starfield is the first new universe in 25 years from Bethesda Game Studios.",
    "https://store.steampowered.com/app/1716740/", "https://bethesda.net/en/game/starfield",
    "linear-gradient(135deg,#1e40af,#020617)", "#1e40af"),

  g("apex-legends", "Apex Legends", "Respawn", "Electronic Arts", "2019-02-04",
    ["Battle Royale", "FPS"], ["PC", "PS5", "Xbox", "Switch"], "Free", 8.7, 89,
    "Conquer with character in Apex Legends, a free-to-play hero shooter where legendary characters battle.",
    "https://store.steampowered.com/app/1172470/", "https://www.ea.com/games/apex-legends",
    "linear-gradient(135deg,#dc2626,#0c0a09)", "#dc2626",
    { trending: true }),

  g("valorant", "Valorant", "Riot Games", "Riot Games", "2020-06-02",
    ["FPS", "Tactical", "Multiplayer"], ["PC"], "Free", 8.3, 91,
    "A 5v5 character-based tactical shooter. Outwit your opponents in lightning-fast gameplay.",
    "https://playvalorant.com/", "https://playvalorant.com/",
    "linear-gradient(135deg,#ef4444,#1c1917)", "#ef4444"),

  g("league-of-legends", "League of Legends", "Riot Games", "Riot Games", "2009-10-27",
    ["MOBA", "Strategy"], ["PC"], "Free", 8.0, 93,
    "Battle across an ever-expanding roster of champions with friends and foes alike.",
    "https://www.leagueoflegends.com/", "https://www.leagueoflegends.com/",
    "linear-gradient(135deg,#06b6d4,#0c4a6e)", "#06b6d4"),

  g("zelda-totk", "The Legend of Zelda: TOTK", "Nintendo EPD", "Nintendo", "2023-05-12",
    ["Action", "Adventure", "Open World"], ["Switch"], 69.99, 9.6, 92,
    "An epic adventure across the land and skies of Hyrule awaits in The Legend of Zelda: Tears of the Kingdom.",
    "https://www.nintendo.com/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/",
    "https://zelda.nintendo.com/tears-of-the-kingdom/",
    "linear-gradient(135deg,#10b981,#fbbf24)", "#10b981",
    { topRated: true }),

  g("super-mario-wonder", "Super Mario Bros. Wonder", "Nintendo EPD", "Nintendo", "2023-10-20",
    ["Platformer", "Family"], ["Switch"], 59.99, 9.0, 86,
    "Classic Mario side-scrolling gameplay is turned on its head with the addition of Wonder Flowers.",
    "https://www.nintendo.com/store/products/super-mario-bros-wonder-switch/", "https://supermariobroswonder.nintendo.com/",
    "linear-gradient(135deg,#ef4444,#fbbf24)", "#ef4444",
    { newRelease: true }),

  g("spider-man-2", "Marvel's Spider-Man 2", "Insomniac Games", "Sony", "2023-10-20",
    ["Action", "Adventure", "Open World"], ["PS5"], 69.99, 9.2, 91,
    "Spider-Men Peter Parker and Miles Morales return for a new chapter in Marvel's Spider-Man franchise.",
    "https://www.playstation.com/en-us/games/marvels-spider-man-2/", "https://insomniac.games/game/marvels-spider-man-2/",
    "linear-gradient(135deg,#1e40af,#dc2626)", "#dc2626",
    { topRated: true, newRelease: true }),

  g("rocket-league", "Rocket League", "Psyonix", "Psyonix", "2015-07-07",
    ["Sports", "Racing"], ["PC", "PS5", "Xbox", "Switch"], "Free", 8.6, 84,
    "High-powered hybrid of arcade-style soccer and vehicular mayhem.",
    "https://www.rocketleague.com/", "https://www.rocketleague.com/",
    "linear-gradient(135deg,#0ea5e9,#f97316)", "#0ea5e9"),

  g("roblox", "Roblox", "Roblox Corp.", "Roblox Corp.", "2006-09-01",
    ["Sandbox", "Multiplayer"], ["PC", "Xbox", "Mobile"], "Free", 7.5, 88,
    "Roblox is the ultimate virtual universe that lets you create, share experiences with friends, and be anything you can imagine.",
    "https://www.roblox.com/", "https://www.roblox.com/",
    "linear-gradient(135deg,#ef4444,#1f2937)", "#ef4444"),

  g("forza-horizon-5", "Forza Horizon 5", "Playground Games", "Xbox Game Studios", "2021-11-09",
    ["Racing", "Open World"], ["PC", "Xbox"], 59.99, 9.0, 85,
    "Your greatest Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico.",
    "https://store.steampowered.com/app/1551360/", "https://forzamotorsport.net/",
    "linear-gradient(135deg,#84cc16,#0c4a6e)", "#84cc16",
    { topRated: true }),

  g("alan-wake-2", "Alan Wake 2", "Remedy Entertainment", "Epic Games", "2023-10-27",
    ["Horror", "Action", "Story"], ["PC", "PS5", "Xbox"], 49.99, 9.0, 82,
    "A survival horror sequel 13 years in the making from Remedy Entertainment.",
    "https://store.epicgames.com/en-US/p/alan-wake-2", "https://www.alanwake.com/",
    "linear-gradient(135deg,#1e293b,#a855f7)", "#a855f7",
    { newRelease: true, topRated: true }),

  g("genshin-impact", "Genshin Impact", "HoYoverse", "HoYoverse", "2020-09-28",
    ["RPG", "Open World", "Gacha"], ["PC", "PS5", "Mobile"], "Free", 8.4, 87,
    "Step into Teyvat, a vast world teeming with life and flowing with elemental energy.",
    "https://genshin.hoyoverse.com/", "https://genshin.hoyoverse.com/",
    "linear-gradient(135deg,#06b6d4,#a855f7)", "#06b6d4"),

  g("counter-strike-2", "Counter-Strike 2", "Valve", "Valve", "2023-09-27",
    ["FPS", "Tactical", "Multiplayer"], ["PC"], "Free", 8.5, 92,
    "For over two decades, Counter-Strike has offered an elite competitive experience.",
    "https://store.steampowered.com/app/730/", "https://www.counter-strike.net/",
    "linear-gradient(135deg,#f59e0b,#1c1917)", "#f59e0b",
    { newRelease: true, trending: true }),

  g("fc-mobile", "EA Sports FC Mobile", "EA", "EA Mobile", "2023-09-26",
    ["Sports", "Mobile"], ["Mobile"], "Free", 7.6, 76,
    "Build your Ultimate Team and play matches on the go with EA Sports FC Mobile.",
    "https://www.ea.com/games/ea-sports-fc/fc-mobile", "https://www.ea.com/games/ea-sports-fc/fc-mobile",
    "linear-gradient(135deg,#0ea5e9,#22c55e)", "#0ea5e9"),

  g("helldivers-2", "Helldivers 2", "Arrowhead", "PlayStation", "2024-02-08",
    ["Shooter", "Co-op"], ["PC", "PS5"], 39.99, 9.0, 90,
    "A galactic-scale co-op shooter where managed democracy must be defended at all costs.",
    "https://store.steampowered.com/app/553850/HELLDIVERS_2/", "https://www.helldivers.com/",
    "linear-gradient(135deg,#facc15,#1c1917)", "#facc15",
    { topRated: true, newRelease: true, trending: true }),

  g("palworld", "Palworld", "Pocketpair", "Pocketpair", "2024-01-19",
    ["Survival", "Open World", "Creature"], ["PC", "Xbox"], 29.99, 8.3, 89,
    "Fight, farm, build and work alongside mysterious creatures called 'Pals' in this open-world survival game.",
    "https://store.steampowered.com/app/1623730/Palworld/", "https://www.pocketpair.jp/palworld",
    "linear-gradient(135deg,#22d3ee,#16a34a)", "#22d3ee",
    { newRelease: true, trending: true }),

  g("monster-hunter-wilds", "Monster Hunter Wilds", "Capcom", "Capcom", "2025-02-28",
    ["Action", "RPG", "Co-op"], ["PC", "PS5", "Xbox"], 69.99, 0, 88,
    "The next mainline entry in the Monster Hunter series. Track and hunt colossal monsters in a living world.",
    "https://store.steampowered.com/app/2246340/", "https://www.monsterhunter.com/wilds/",
    "linear-gradient(135deg,#dc2626,#a16207)", "#dc2626",
    { upcoming: true, trending: true }),

  g("death-stranding-2", "Death Stranding 2", "Kojima Productions", "Sony", "2025-06-26",
    ["Adventure", "Action"], ["PS5"], 69.99, 0, 84,
    "Hideo Kojima returns with the long-awaited sequel to Death Stranding.",
    "https://www.playstation.com/en-us/games/death-stranding-2/", "https://www.kojimaproductions.jp/en/ds2",
    "linear-gradient(135deg,#0c4a6e,#fbbf24)", "#fbbf24",
    { upcoming: true }),

  g("fable-2025", "Fable", "Playground Games", "Xbox Game Studios", "2025-10-01",
    ["RPG", "Fantasy"], ["PC", "Xbox"], 69.99, 0, 78,
    "A new beginning for the legendary fantasy franchise.",
    "https://www.xbox.com/en-US/games/fable", "https://www.xbox.com/en-US/games/fable",
    "linear-gradient(135deg,#65a30d,#1e3a8a)", "#65a30d",
    { upcoming: true }),

  g("hollow-knight-silksong", "Hollow Knight: Silksong", "Team Cherry", "Team Cherry", "2025-09-01",
    ["Metroidvania", "Indie"], ["PC", "PS5", "Xbox", "Switch"], 19.99, 0, 86,
    "Discover a vast haunted kingdom in the long-awaited sequel to Hollow Knight.",
    "https://store.steampowered.com/app/1030300/", "https://www.hollowknightsilksong.com/",
    "linear-gradient(135deg,#7c3aed,#0c0a09)", "#7c3aed",
    { upcoming: true, trending: true }),
];

export const findGame = (slug: string) => games.find((g) => g.slug === slug);
export const trendingGames = () => games.filter((g) => g.trending).slice(0, 8);
export const topRatedGames = () => [...games].filter((g) => g.topRated).sort((a, b) => b.rating - a.rating);
export const upcomingGames = () => games.filter((g) => g.upcoming);
export const newReleases = () => games.filter((g) => g.newRelease);
export const freeGames = () => games.filter((g) => g.price === "Free");
export const paidGames = () => games.filter((g) => g.price !== "Free");
