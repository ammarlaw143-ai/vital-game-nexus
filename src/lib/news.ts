export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  author: string;
  date: string;
  readTime: number;
  tag: string; // for color
  featured?: boolean;
}

export const news: NewsArticle[] = [
  {
    slug: "gta-vi-trailer-2-confirmed",
    title: "GTA VI Trailer 2 Reportedly Set for Spring Reveal",
    excerpt:
      "Rockstar is said to be preparing a major marketing push for Grand Theft Auto VI, with a second trailer rumored for spring.",
    body: [
      "Sources close to Rockstar Games suggest the studio is preparing for the next major beat of its GTA VI marketing campaign. Following the explosive reception of the first trailer, all eyes are on Vice City.",
      "Industry analysts expect the second trailer to deepen the story, introduce key characters, and confirm the long-rumored late-2025 launch window across PlayStation 5 and Xbox Series X|S.",
      "Take-Two Interactive's recent earnings call hinted at a 'transformative' fiscal year, all but cementing GTA VI as the centerpiece of its release slate.",
    ],
    category: "Industry",
    author: "Marcus Chen",
    date: "2026-06-20",
    readTime: 6,
    tag: "violet",
    featured: true,
  },
  {
    slug: "minecraft-1-22-update",
    title: "Minecraft 1.22 'Tides' Update Adds Sailing Mechanics",
    excerpt: "Mojang unveils ocean overhaul with rideable ships, deeper biomes, and new aquatic mobs.",
    body: [
      "Mojang announced today that Minecraft's next major update will focus entirely on the seas. Code-named 'Tides,' the 1.22 update introduces real sailing mechanics, controllable ships, and a complete pass on every ocean biome.",
      "New mobs include the Tide Caller and the Deep Lurker, both of which guard ancient shipwrecks containing previously unseen enchantments.",
      "A first snapshot is available now in the Bedrock beta and Java snapshot channels.",
    ],
    category: "Minecraft",
    author: "Ava Knight",
    date: "2026-06-18",
    readTime: 5,
    tag: "mc",
  },
  {
    slug: "elden-ring-night-reign-review",
    title: "Elden Ring Nightreign Review: A Bold New Direction",
    excerpt: "FromSoftware experiments with co-op survival in this surprising spin-off — and it mostly works.",
    body: [
      "Nightreign takes the bones of Elden Ring and reshapes them into a tense three-player co-op survival experience. The result is a game that feels familiar yet wholly its own.",
      "Run-based structure replaces the open world, but boss encounters remain peak FromSoft.",
    ],
    category: "Review",
    author: "Liam Park",
    date: "2026-06-15",
    readTime: 9,
    tag: "neon",
  },
  {
    slug: "fortnite-chapter-6-roadmap",
    title: "Fortnite Chapter 6 Roadmap Leaks: Mecha Wars Return",
    excerpt: "Datamines suggest a massive seasonal arc kicking off with the return of Mecha-class vehicles.",
    body: [
      "Reliable Fortnite dataminers have surfaced a roadmap pointing to the return of player-controlled mechas, plus the long-awaited debut of a Marvel collaboration.",
      "Epic Games has yet to comment, but in-game files corroborate the leaks.",
    ],
    category: "Fortnite",
    author: "Jess Romero",
    date: "2026-06-14",
    readTime: 4,
    tag: "violet",
  },
  {
    slug: "ps5-pro-spider-man-3",
    title: "Spider-Man 3 Confirmed for PS5 Pro Launch Window",
    excerpt: "Insomniac officially announces the next web-slinging adventure, exclusive to PlayStation 5 hardware.",
    body: [
      "At today's PlayStation Showcase, Insomniac Games revealed Marvel's Spider-Man 3 with a brief teaser trailer.",
      "The studio confirmed the game runs natively at 4K/60fps on PS5 Pro, with a base PS5 performance mode also planned.",
    ],
    category: "PlayStation",
    author: "Dana Wu",
    date: "2026-06-12",
    readTime: 7,
    tag: "neon",
    featured: true,
  },
  {
    slug: "ea-cricket-2026-announcement",
    title: "EA Cricket 26 Officially Announced — First in 19 Years",
    excerpt: "EA Sports finally returns to cricket with a fully licensed, next-gen edition built on Frostbite.",
    body: [
      "EA Sports has confirmed the long-rumored return of its cricket series. EA Cricket 26 will arrive this fall on PC, PS5 and Xbox Series X|S.",
      "The game features full ICC licensing, a deep career mode, and online tours.",
    ],
    category: "Sports",
    author: "Rohan Mehta",
    date: "2026-06-10",
    readTime: 5,
    tag: "gta",
  },
  {
    slug: "best-gpus-2026",
    title: "The Best GPUs for 4K Gaming in 2026, Ranked",
    excerpt: "From the new RTX 5090 to AMD's RX 9000 series — our complete benchmark roundup.",
    body: [
      "It's a fantastic time to upgrade. Here's our complete breakdown of every flagship GPU released this year, ranked by price-to-performance.",
      "Spoiler: NVIDIA still leads at the top, but AMD's value proposition is stronger than ever.",
    ],
    category: "Hardware",
    author: "Tariq Owens",
    date: "2026-06-08",
    readTime: 12,
    tag: "neon",
  },
  {
    slug: "summer-game-fest-2026-recap",
    title: "Summer Game Fest 2026: Every Major Announcement",
    excerpt: "From shock reveals to surprise shadow-drops, here's everything you need to know.",
    body: [
      "Geoff Keighley's annual showcase delivered the goods. The biggest moments included a new Resident Evil, a confirmed release date for Silksong, and the surprise reveal of a Half-Life sequel.",
    ],
    category: "Events",
    author: "Ava Knight",
    date: "2026-06-06",
    readTime: 10,
    tag: "violet",
  },
];

export const findArticle = (slug: string) => news.find((n) => n.slug === slug);
export const featuredNews = () => news.filter((n) => n.featured);
