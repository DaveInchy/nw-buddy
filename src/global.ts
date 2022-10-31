export const GameClassId = 21816; // New world

import owWindowState = overwolf.windows.WindowStateEx;
import owEvents = overwolf.games.events;
import owGames = overwolf.games;
import owUtils = overwolf.utils;

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
    host: "localhost",
    port: 8443,
    ssl: false,
  },
  build: {
    standalone: true,
    start: "/bin/bash npm run build",
  },
  games: [GameClassId],
}

export const WindowNames = {
  generic: 'generic',
  welcome: 'welcome',
  overlay: 'overlay',
  service: 'service',
};

export const Hotkeys = {
  minimap: 'minimap',
  create: 'create',
  routes: 'routes',
  zoomIn: 'zoomIn',
  zoomOut: 'zoomOut',
  restart: 'restart',
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

