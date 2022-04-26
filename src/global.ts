export const GameClassId = 21816; // New world

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
  overlay: 'overlay'
};

export const Hotkeys = {
  minimap: 'minimap',
  create: 'create',
  editor: 'editor',
  groups: 'groups',
  routes: 'routes',
  zoomIn: 'zoomIn',
  zoomOut: 'zoomOut',
};

export const Config = [
  {
    config: require('../package.json'),
    metadata: require('../public/manifest.json').meta
  }
];
