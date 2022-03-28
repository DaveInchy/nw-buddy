import { logMessage } from "./debug";
import Vector2 from "./vector2";
import StorageInterface from './storage';

export default class Pin {
  public readonly ctxDrawCall: void;

  private readonly types = {
    default: {
      icon: "./img/pins/icon/default.png",
      color: "rgba(192, 161, 0, 0)",
    },
    stone: {
      icon: "./img/pins/icon/stone.png",
      types: {
        default: {
          includes: ["stone", "rock"],
        },
        boulder: {
          includes: ["stone", "boulder"],
        },
        lodestone: {
          includes: ["lode", "lodes"],
        },
      },
    },
    ore: {
      icon: "./img/pins/icon/ore.png",
      types: {
        default: {
          includes: ["ore"],
        },
        iron: {
          includes: ["iron", "steel", "copper", "ironium"],
        },
        starmetal: {
          includes: ["star", "starmetal", "starumite"],
        },
        orichalcum: {
          includes: [
            "ori",
            "orri",
            "orichalcum",
            "orichalcumite",
            "chilium",
            "chillium",
          ],
        },
        silver: {
          includes: ["silver", "sliver"],
        },
        gold: {
          includes: ["gold", "golden"],
        },
        platinum: {
          includes: ["platinum", "plat", "platinumite", "platina"],
        },
      },
    },
    wood: {
      icon: "./img/pins/icon/wood.png",
      types: {
        default: {
          includes: ["wood", "log", "tree"],
        },
        green: {
          includes: ["green", "greenwood"],
        },
        mature: {
            includes: ["mature", "horny", "ofnie", "mom", "mommy", "milf"],
        },
        dead: {
            includes: ["green", "dead", "coal"],
        },
        wyrdwood: {
            includes: ["wyr", "wyrd", "wyrdwood"],
        },
        ironwood: {
            includes: ["iron", "ironwood", "red", "redwood"],
        },
      },
    },
    fiber: {
      types: {
        default: {
            includes: ["fiber", "fibers", "thread", "threads", "hemp", "silk", "weed"],
        },
        hemp: {
            includes: ["weed", "hemp", "fiber", "thread"],
        },
        silkweed: {
            includes: ["silk", "silkweed", "thread", "fiber"],
        },
        wireweed: {
            includes: ["wire", "wireweed", "thread", "fiber"],
        },
      },
    },
    other: {
      types: {
        default: {
            includes: [""],
        },
        herbs: {},
        flint: {},
      },
    },
  };

  constructor(
    public readonly source: string = "default",
    public readonly x: number = 0,
    public readonly y: number = 0,
    public readonly owner: string = undefined
  ) {
    this.owner = owner !== undefined ? owner : "Map";
    this.source = this.getImageFileLocation(source);

    this.x = x;
    this.y = y;

    logMessage(
      "minimap",
      "Minimap.Pin() instance created for " +
        this.owner +
        " at " +
        this.x +
        "," +
        this.y
    );

    return this;
  }

  private getImageFileLocation(imgName: string = "default") {
    var sourceLocation = "./img/pins/default.png";
    if (imgName !== "default") {
      sourceLocation = "./img/pins/" + imgName + ".png";
    }
    return sourceLocation;
  }
}