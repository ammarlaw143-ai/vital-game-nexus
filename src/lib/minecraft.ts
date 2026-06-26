export interface Mod {
  slug: string;
  name: string;
  author: string;
  category: string;
  description: string;
  downloads: string;
  version: string;
  officialUrl: string;
  accent: string;
}

export const mods: Mod[] = [
  { slug: "optifine", name: "OptiFine", author: "sp614x", category: "Performance",
    description: "The classic Minecraft performance optimization mod with HD textures, shaders and more.",
    downloads: "240M+", version: "1.21.x", officialUrl: "https://www.optifine.net/", accent: "#22c55e" },
  { slug: "jei", name: "Just Enough Items (JEI)", author: "mezz", category: "Utility",
    description: "View recipes and items easily without needing to memorize crafting layouts.",
    downloads: "350M+", version: "1.21.x", officialUrl: "https://www.curseforge.com/minecraft/mc-mods/jei", accent: "#84cc16" },
  { slug: "create", name: "Create", author: "simibubi", category: "Tech",
    description: "Aesthetic technology mod featuring rotational power, kinetic contraptions and incredible machines.",
    downloads: "60M+", version: "1.20.1", officialUrl: "https://www.curseforge.com/minecraft/mc-mods/create", accent: "#a16207" },
  { slug: "biomes-o-plenty", name: "Biomes O' Plenty", author: "Forstride", category: "World Gen",
    description: "Adds 50+ new biomes ranging from mystical realms to tropical lands.",
    downloads: "90M+", version: "1.21.x", officialUrl: "https://www.curseforge.com/minecraft/mc-mods/biomes-o-plenty", accent: "#10b981" },
  { slug: "iris-shaders", name: "Iris Shaders", author: "coderbot", category: "Shaders",
    description: "Modern shader loader for Minecraft that pairs with Sodium for buttery-smooth framerates.",
    downloads: "30M+", version: "1.21.x", officialUrl: "https://irisshaders.dev/", accent: "#06b6d4" },
  { slug: "twilight-forest", name: "The Twilight Forest", author: "Benimatic", category: "Adventure",
    description: "Adds a magical dimension full of dungeons, bosses, and unique items.",
    downloads: "70M+", version: "1.20.1", officialUrl: "https://www.curseforge.com/minecraft/mc-mods/the-twilight-forest", accent: "#7c3aed" },
  { slug: "applied-energistics-2", name: "Applied Energistics 2", author: "AlgorithmX2", category: "Tech",
    description: "Build advanced storage systems and autocrafting setups using ME networks.",
    downloads: "100M+", version: "1.20.1", officialUrl: "https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2", accent: "#3b82f6" },
  { slug: "tinkers-construct", name: "Tinkers' Construct", author: "mDiyo", category: "Tools",
    description: "Forge your own tools and weapons from a huge variety of materials.",
    downloads: "120M+", version: "1.20.1", officialUrl: "https://www.curseforge.com/minecraft/mc-mods/tinkers-construct", accent: "#ef4444" },
  { slug: "sodium", name: "Sodium", author: "CaffeineMC", category: "Performance",
    description: "Modern rendering engine that drastically improves frame rates while fixing graphical issues.",
    downloads: "45M+", version: "1.21.x", officialUrl: "https://modrinth.com/mod/sodium", accent: "#0ea5e9" },
  { slug: "alex-mobs", name: "Alex's Mobs", author: "sbom_xela", category: "Creatures",
    description: "Adds 95+ unique animals from every biome to make the world feel alive.",
    downloads: "20M+", version: "1.20.1", officialUrl: "https://www.curseforge.com/minecraft/mc-mods/alexs-mobs", accent: "#f97316" },
  { slug: "ice-and-fire", name: "Ice and Fire: Dragons", author: "Alexthe666", category: "Fantasy",
    description: "Inspired by mythology — adds dragons, dragonsteel, and a deep fantasy bestiary.",
    downloads: "40M+", version: "1.20.1", officialUrl: "https://www.curseforge.com/minecraft/mc-mods/ice-and-fire-dragons", accent: "#dc2626" },
  { slug: "mekanism", name: "Mekanism", author: "aidancbrady", category: "Tech",
    description: "High-tech mod with reactors, jetpacks, robots and powerful machinery.",
    downloads: "85M+", version: "1.20.1", officialUrl: "https://www.curseforge.com/minecraft/mc-mods/mekanism", accent: "#06b6d4" },
];

export interface MCCommand {
  command: string;
  description: string;
  example: string;
  category: string;
}

export const commands: MCCommand[] = [
  { command: "/give", description: "Gives an item to one or more players.", example: "/give @p diamond 64", category: "Player" },
  { command: "/tp", description: "Teleports entities (players, mobs, etc.) to coordinates or another entity.", example: "/tp @p 100 64 -200", category: "Movement" },
  { command: "/gamemode", description: "Sets a player's game mode (survival, creative, adventure, spectator).", example: "/gamemode creative @p", category: "Player" },
  { command: "/summon", description: "Summons an entity at a specified position.", example: "/summon minecraft:warden ~ ~ ~", category: "Mobs" },
  { command: "/weather", description: "Sets the weather. clear, rain, or thunder.", example: "/weather clear 10000", category: "World" },
  { command: "/time set", description: "Changes the time of day in your world.", example: "/time set day", category: "World" },
  { command: "/effect", description: "Applies a status effect to entities.", example: "/effect give @p night_vision 9999 1 true", category: "Player" },
  { command: "/enchant", description: "Enchants a player's held item.", example: "/enchant @p sharpness 5", category: "Items" },
  { command: "/fill", description: "Fills a region with a specific block.", example: "/fill ~ ~ ~ ~10 ~5 ~10 stone", category: "Building" },
  { command: "/setblock", description: "Places a block at a specific location.", example: "/setblock ~ ~1 ~ diamond_block", category: "Building" },
  { command: "/clone", description: "Copies blocks from one region to another.", example: "/clone 0 64 0 10 70 10 100 64 100", category: "Building" },
  { command: "/difficulty", description: "Sets the difficulty level for the world.", example: "/difficulty hard", category: "World" },
  { command: "/kill", description: "Kills entities (players, mobs, items).", example: "/kill @e[type=item]", category: "Player" },
  { command: "/locate", description: "Finds the nearest structure or biome.", example: "/locate structure minecraft:village", category: "World" },
  { command: "/give head", description: "Gives a custom player head.", example: "/give @p player_head{SkullOwner:Notch}", category: "Items" },
  { command: "/playsound", description: "Plays a sound to a player.", example: "/playsound minecraft:entity.ender_dragon.growl master @a", category: "Audio" },
];
