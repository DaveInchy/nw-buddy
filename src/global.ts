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
      "game_info", // Basic info about the game and installation
    ]
  ]
]);

export const GameClassIds = Array.from(GamesFeatures.keys());

export const WindowNames = {
  minimap: 'minimap',
  worldmap: 'worldmap',
  welcome: 'welcome',
  service: 'service',
};

export const Hotkeys = {
  minimap: 'minimap',
  create: 'create',
  editor: 'editor',
  worldmap: 'worldmap',
  routes: 'routes',
  zoomIn: 'zoomIn',
  zoomOut: 'zoomOut',
  restart: 'restart',
};

export const Config = {
  package: require('../package.json'),
  metadata: require('../public/manifest.json').meta,
  server: {
    domain: "nw-buddy-private.vercel.app",
    ssl: true,
  },
  debug: {
    standalone: true,
    start: "/bin/bash npm run debug",
    host: "0.0.0.0",
    port: 8433,
    ssl: false,
  },
  build: {
    standalone: true,
    start: "/bin/bash npm run build",
  },
}