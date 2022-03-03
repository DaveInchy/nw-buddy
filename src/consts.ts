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

// Communication with the backend web server for sending/recieving data.
export const logMessage = async function (type, message) {
  return await fetch('http://localhost:8420/?method=GET&type=' + type.toString() + '&message=' + encodeURIComponent(`${message}`));
}