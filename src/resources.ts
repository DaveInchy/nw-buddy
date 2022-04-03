const Resources: Array<{
  name: string;
  icon: string;
  size: { width: number; height: number };
  types: { name: string; icon?: string; includes: string[] }[];
}> = [
  {
    name: "landmark",
    icon: `👁️‍🗨️`,
    size: { width: 32, height: 32 },
    types: [
      {
        name: "farms",
        includes: ["farming", "field", "pasture", "orchard", "vineyard"],
      },
      {
        name: "boat",
        includes: [
          "boat",
          "dock",
          "pier",
          "wharf",
          "harbor",
          "ship",
          "wreck",
          "sunken",
        ],
      },
    ],
  },
  {
    name: "loot",
    icon: `💰`,
    size: { width: 8, height: 8 },
    types: [
      {
        name: "coin",
        includes: ["coin", "money", "stash"],
      },
      {
        name: "chest",
        icon: `📦`,
        includes: [
          "chest",
          "chests",
          "treasure",
          "treasure chest",
          "treasure-chest",
        ],
      },
    ],
  },
  {
    name: "regions",
    icon: `🗺️`,
    size: { width: 64, height: 64 },
    types: [
      {
        name: "outposts",
        icon: `🛡️`,
        includes: [
          "outpost",
          "village",
          "hamlet",
          "township",
          "borough",
          "metropolis",
          "settlement",
        ],
      },
      {
        name: "wars",
        icon: `⚔️`,
        includes: [
          "war",
          "battle",
          "battlef",
          "site",
          "fort",
          "fortress",
          "fortification",
          "fortifications",
        ],
      },
      {
        name: "towns",
        icon: `🛖`,
        includes: [
          "settlement",
          "town",
          "everf",
          "rfall",
          "winds",
          "sward",
          "brightwood",
          "reekw",
          "kwater",
          "ebonscale",
          "first",
          "light",
          "monarch",
          "bluffs",
          "cutlass",
          "keys",
          "restless",
          "weaver",
          "fen",
          "mourning",
          "dale",
          "eden",
          "cleave",
          "shattered",
        ],
      },
    ],
  },
  {
    name: "housing",
    icon: `🏡`,
    size: { width: 24, height: 24 },
    types: [
      {
        name: "homes",
        includes: [
          "home",
          "house",
          "apartment",
          "condo",
          "loft",
          "penthouse",
          "townhouse",
          "villa",
          "yurt",
        ],
      },
    ],
  },
  {
    name: "poi",
    icon: `💡`,
    size: { width: 32, height: 32 },
    types: [
      {
        name: "events",
        icon: `🎭`,
        includes: [
          "event",
          "festival",
          "celebration",
          "ceremony",
          "ceremonial",
          "ceremonies",
        ],
      },
      {
        name: "teleport",
        icon: `🧿`,
        includes: ["portal", "shrine", "temple", "sanctum", "altar"],
      },
      {
        name: "caves",
        icon: `🕸️`,
        includes: ["cave", "cavern", "tunnel", "chamber"],
      },
    ],
  },
  {
    name: "mutation",
    icon: `💀`,
    size: { width: 32, height: 32 },
    types: [
      {
        name: "corruption",
        includes: ["corrupted", "cursed", "doomed", "diseased"],
      },
      {
        name: "angry_earth",
        includes: ["mutated", "mutation", "angry", "earth", "poison"],
      },
      {
        name: "lost",
        icon: `👻`,
        includes: ["lost", "mutation", "soul", "spirit", "ghost"],
      },
      {
        name: "ancient",
        includes: ["ancient", "mutation", "soul", "spirit", "ghost"],
      },
    ],
  },
  {
    name: "magical",
    icon: `✨`,
    size: { width: 24, height: 24 },
    types: [
      {
        name: "azoth",
        includes: ["azoth"],
      },
      {
        name: "magic",
        icon: `🧙‍♂️`,
        includes: [
          "magic",
          "mage",
          "sage",
          "spell",
          "wizard",
          "witch",
          "warlock",
          "necromancer",
          "alchemist",
          "sorcerer",
          "conjurer",
        ],
      },
    ],
  },
  {
    name: "woods",
    icon: `🪵`,
    size: { width: 16, height: 16 },
    types: [
      {
        name: "wyrdwood",
        icon: `🍃`,
        includes: ["wyr", "wyrd", "wyrdw", "wyrdwood"],
      },
      {
        name: "ironwood",
        icon: `🍂`,
        includes: ["ronw", "ironwood", "redwood"],
      },
      {
        name: "wood",
        includes: ["wood", "woods", "tree", "dead", "mature", "greenwood"],
      },
    ],
  },
  {
    name: "ore",
    icon: `⛏️`,
    size: { width: 16, height: 16 },
    types: [
      {
        name: "ireon",
        icon: `🪨`,
        includes: ["iron", "steel", "ironium"],
      },
      {
        name: "starmetal",
        icon: `💠`,
        includes: ["star", "starmetal", "starumite"],
      },
      {
        name: "orichalcum",
        icon: `🎀`,
        includes: [
          "ori",
          "orri",
          "orichalcum",
          "orichalcumite",
          "chilium",
          "chillium",
        ],
      },
      {
        name: "silver",
        icon: `💿`,
        includes: ["silver", "sliver"],
      },
      {
        name: "gold",
        icon: `📀`,
        includes: ["gold", "golden"],
      },
      {
        name: "platinum",
        icon: `💎`,
        includes: ["platinium", "plat", "platinumite", "platina", "platinum"],
      },
    ],
  },
  {
    name: "fiber",
    icon: `🌾`,
    size: { width: 24, height: 24 },
    types: [
      {
        name: "silkweed",
        icon: `🧶`,
        includes: ["silk", "silkweed", "silkweeds"],
      },
      {
        name: "wirefiber",
        icon: `🍁`,
        includes: ["wire", "wirefiber", "wireweed", "wireweeds"],
      },
      {
        name: "hemp",
        icon: `🌾`,
        includes: ["weed", "hemp", "fiber", "thread"],
      },
      {
        name: "fiber",
        includes: [
          "fiber",
          "fibers",
          "thread",
          "threads",
          "hemp",
          "silk",
          "weed",
        ],
      },
    ],
  },
  {
    name: "stone",
    icon: `🗿`,
    size: { width: 16, height: 16 },
    types: [
      {
        name: "lodestone",
        icon: `🧱`,
        includes: ["lode", "lodes"],
      },
      {
        name: "crystal",
        icon: `🔮`,
        includes: ["crystal", "crystals"],
      },
      {
        name: "saltpeter",
        icon: `⛏️`,
        includes: ["salt", "peter"],
      },
      {
        name: "seeping_stone",
        icon: `🕳️`,
        includes: ["seeping", "stone"],
      },
    ],
  },
  {
    name: "plant",
    icon: `🌱`,
    size: { width: 16, height: 16 },
    types: [
      {
        name: "dyes",
        icon: `🌹`,
        includes: ["dye", "flowers", "flower", "pigment"],
      },
      {
        name: "herbs",
        icon: `🌿`,
        includes: ["herbs", "herb"],
      },
      {
        name: "fruit",
        icon: `🫐`,
        includes: ["blueberr", "cranberr", "berry", "berries", "strawberr"],
      },
      {
        name: "nuts",
        icon: `🥜`,
        includes: ["nuts", "nut"],
      },
      {
        name: "honey",
        icon: `🍯`,
        includes: ["honey", "honeycomb"],
      },
      {
        name: "barley",
        icon: `🥬`,
        includes: ["barley", "grain", "wheat"],
      },
      {
        name: "mushrooms",
        icon: `🍄`,
        includes: [
          "toad",
          "toadstool",
          "toadstools",
          "toads",
          "shroom",
          "shrooms",
          "mushroom",
          "mushrooms",
          "spine",
        ],
      },
      {
        name: "plants",
        includes: ["plant", "plants"],
      },
    ],
  },
  {
    name: "vegetable",
    icon: `🍆`,
    size: { width: 16, height: 16 },
    types: [
      {
        name: "carrot",
        icon: `🥕`,
        includes: ["carro", "carrots"],
      },
      {
        name: "broccoli",
        icon: `🥦`,
        includes: ["brocc", "oli", "broccolis"],
      },
      {
        name: "cabbage",
        icon: `🥬`,
        includes: ["cabba", "cabbages"],
      },
      {
        name: "cauliflower",
        icon: `🌺`,
        includes: ["cauli", "cauliflowers"],
      },
      {
        name: "cucumber",
        icon: `🥒`,
        includes: ["cucum", "cucumbers"],
      },
      {
        name: "onion",
        icon: `🧅`,
        includes: ["onio", "onions"],
      },
      {
        name: "squash",
        icon: `🌽`,
        includes: ["squas", "squashes"],
      },
      {
        name: "corn",
        icon: `🌽`,
        includes: ["corn", "corns"],
      },
      {
        name: "potato",
        icon: `🥔`,
        includes: ["potat", "potatoes"],
      },
      {
        name: "pumpkin",
        icon: `🎃`,
        includes: ["pumpk", "pumpkins"],
      },
    ],
  },
];
export default Resources;