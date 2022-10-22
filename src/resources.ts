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
    name: "mote",
    icon: `🉑`,
    size: { width: 24, height: 24 },
    types: [
      {
        name: "air",
        icon: `💨`,
        includes: ["air", "wind", "windy", "fart", "breath", "breathe", "breathing"],
      },
      {
        name: "earth",
        icon: `🏔️`,
        includes: ["earth", "earthy", "rock", "rocky"],
      },
      {
        name: "fire",
        icon: `🔥`,
        includes: ["fire", "flame", "burning", "burn", "hot", "heat", "heating"],
      },
      {
        name: "water",
        icon: `🌊`,
        includes: ["wet", "watery", "ocean", "oceans", "sea", "seas"],
      },
      {
        name: "death",
        icon: `💀`,
        includes: ["death", "deathly", "dead", "dying", "doom", "doomed"],
      },
      {
        name: "life",
        icon: `🧠`,
        includes: ["life", "lively", "living"],
      },
      {
        name: "soul",
        icon: `👻`,
        includes: ["soul", "spirit", "spiritual"],
      },
      {
        name: "essence",
        includes: ["mote", "motes", "essence", "essences"],
      },
    ],
  },
  {
    name: "loot",
    icon: `💰`,
    size: { width: 10, height: 10 },
    types: [
      {
        name: "coin",
        includes: ["coin", "money", "stash"],
      },
      {
        name: "chest",
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
    size: { width: 48, height: 48 },
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
          "firstl",
          "tlight",
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
    size: { width: 32, height: 32 },
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
    icon: `🎭`,
    size: { width: 24, height: 24 },
    types: [
      {
        name: "events",
        icon: `🎉`,
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
        icon: `🗿`,
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
        icon: `😈`,
        includes: ["corrupted", "cursed", "doomed", "diseased"],
      },
      {
        name: "angry_earth",
        icon: `🤢`,
        includes: ["mutated", "mutation", "angry", "earth", "poison"],
      },
      {
        name: "lost",
        icon: `👻`,
        includes: ["lost", "mutation", "soul", "spirit", "ghost"],
      },
      {
        name: "ancient",
        icon: `☠️`,
        includes: ["ancient", "mutation", "soul", "spirit", "ghost"],
      },
    ],
  },
  {
    name: "magical",
    icon: `🪄`,
    size: { width: 24, height: 24 },
    types: [
      {
        name: "azoth",
        icon: `🌀`,
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
    icon: `🌲`,
    size: { width: 24, height: 24 },
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
        icon: `🪵`,
        includes: ["wood", "woods", "tree", "dead", "mature", "greenwood"],
      },
    ],
  },
  {
    name: "ore",
    icon: `⛏️`,
    size: { width: 24, height: 24 },
    types: [
      {
        name: "ireon",
        icon: `🪨`,
        includes: ["iron", "steel", "ironium"],
      },
      {
        name: "starmetal",
        icon: `✨`,
        includes: ["star", "starmetal", "starumite"],
      },
      {
        name: "orichalcum",
        icon: `💥`,
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
        icon: `🪙`,
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
        name: "hemp",
        includes: ["hemp", "fiber", "thread"],
      },
      {
        name: "silkweed",
        icon: `🧶`,
        includes: ["silk", "silkweed", "silkweeds", "hemp_t4"],
      },
      {
        name: "wirefiber",
        icon: `🍁`,
        includes: ["wire", "wirefiber", "wireweed", "wireweeds", "hemp_t5"],
      },
    ],
  },
  {
    name: "stone",
    icon: `🗿`,
    size: { width: 24, height: 24 },
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
        icon: `💩`,
        includes: ["salt", "peter"],
      },
      {
        name: "seeping_stone",
        icon: `🕳️`,
        includes: ["seeping"],
      },
    ],
  },
  {
    name: "plant",
    icon: `🌱`,
    size: { width: 24, height: 24 },
    types: [
      {
        name: "dyes",
        icon: `🌼`,
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
    size: { width: 24, height: 24 },
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