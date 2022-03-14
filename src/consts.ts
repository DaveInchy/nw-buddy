export const GameClassId = 21816; // New world

export const GamesFeatures = new Map<number, string[]>([
  [
    GameClassId,
    [
      "gep_internal", // Events that are registered by the game
      "gep_external", // Events that are registered by the game
      "game_info", // Basic info about the game and installation
    ]
  ]
]);

export const GameClassIds = Array.from(GamesFeatures.keys());

export const WindowNames = {
  overlay: 'overlay',
  console: 'console'
};

export const Hotkeys = {
  console: 'showhide',
  overlay: 'showhide'
};

export const Config = [
  require('../package.json'),
  require('../public/manifest.json').meta,
];

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};