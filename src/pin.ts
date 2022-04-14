import { logError, logMessage as log } from "./debug";
import { getCircularReplacer } from "./global";

import Resources from "./resources";

export default class Pin {

  public type: string;

  public size = {
    width: 24,
    height: 24,
  };

  constructor(
    public readonly name: string,
    public readonly tier: number,
    public readonly icon: string,

    public readonly x: number = 0,
    public readonly y: number = 0,
    public readonly z: number = 0,

    public readonly owner: string = undefined,
    public readonly token: string = Math.random() * 10 + "",
    public readonly color: string = "rgb(192, 161, 0, 1)",

    public readonly link: Pin = undefined,
  ) {
    let props = this.sortProperties(this.name);
    this.icon = props[0];
    this.type = props[1];

    if(this.type == "chest") {
      this.size = { width: props[2].width * this.tier, height: props[2].height * this.tier };
    } else {
      this.size = { width: props[2].width, height: props[2].height };
    }

    this.color = color !== undefined ? color : "rgba(192, 161, 0, 0)";
    this.token = token !== undefined ? token : Math.random().toString();
    this.owner = owner !== undefined ? owner : "private";
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  private sortProperties(tag: string) {
    try {

      let icon = `📍`;
      let size = { width: 16, height: 16 };
      let type = tag;
      let cache = [];

      Resources.forEach((element) => {
        icon = element.icon;
        size = element.size;
        element.types.forEach((element2) => {
          type = element2.name;
          icon = element2.icon !== undefined ? element2.icon : icon;
          element2.includes.forEach((element3) => {
            cache.push({ filter: element3, icon: icon, type: type, size: size });
          });
        });
      });

      for (let i = 0; i < cache.length; i++) {
        if (tag.includes(cache[i].filter)) {
          return [cache[i].icon, cache[i].type, { width: cache[i].size.width, height: cache[i].size.width }];
        }
      }

      return [`📍`, tag, { width: 16, height: 16 }];
    } catch (e) {
      logError(e);
      return ["⛔", e];
    }
  }
}