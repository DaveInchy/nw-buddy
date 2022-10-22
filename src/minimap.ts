
import { logError, logMessage } from './debug';
import { getCircularReplacer } from './global';
import Vector2 from './vector2';
import StorageInterface from './storage';
import CacheInterface from './cache';
import DataClient from './data';
import Pin from './pin';
import { playerModel } from './player';
/*
 * ClassName:       Minimap
 * Description:     A two dimensional Minimap Canvas object
 * Author:          Dave Inchy;
 * Updated:         2022-03-21
 * ------------------------------------------------- *\
 * @param null
 * ------------------------------------------------- */
export default class Minimap {

  public _once: boolean = true;

  public __ = {
    data: [],
    zoom: 1.0,

    canvas: undefined,
    canvasContext: undefined,

    playerName: undefined,
    playerDirection: undefined,
    playerMapCoords: undefined,

    canvasLeft: undefined,
    canvasRight: undefined,
    canvasTop: undefined,
    canvasBottom: undefined,
    canvasWidth: undefined,
    canvasHeight: undefined,

    mapLeft: undefined,
    mapRight: undefined,
    mapTop: undefined,
    mapBottom: undefined,
    mapWidth: undefined,
    mapHeight: undefined,

    mapToCanvasRatio: undefined,
    directionAngle: undefined
  };

  constructor(player: playerModel, canvas: HTMLCanvasElement) {
    var _ = this.__;

    this.cacheDownload();

    _.canvas = canvas;
    _.canvasContext = _.canvas.getContext("2d");

    _.playerName = player.user ? player.user : "Player";
    _.playerDirection = player.coords.direction;
    _.playerMapCoords = new Vector2(player.coords.x, player.coords.y);

    _.canvasLeft = 0;
    _.canvasRight = canvas.width * _.zoom;
    _.canvasTop = 0;
    _.canvasBottom = canvas.height * _.zoom;
    _.canvasWidth = _.canvasRight - _.canvasLeft;
    _.canvasHeight = _.canvasBottom - _.canvasTop;

    // map constants // DONT CHANGE THIS SHOULD WORK
    _.mapLeft = 4520; // West Min 5240
    _.mapRight = 14240; // East Max 14240
    _.mapTop = 10120; // North Max 10240 / 10100 / 10200
    _.mapBottom = 100; // South Min 0
    _.mapWidth = _.mapLeft - _.mapRight; // mapLeft - mapRight
    _.mapHeight = _.mapBottom - _.mapTop; // -mapTop - mapBottom
    // DONT DONT DONT DONT DONT DONT CHANGE CHANGE CHANGE CHANGE CHANGE //

    // tuning the numbers
    _.mapToCanvasRatio = new Vector2(
      _.canvasWidth * _.zoom / _.mapWidth,
      _.canvasHeight * _.zoom / _.mapHeight
    );

    return;
  }

  public async cacheDownload()
  {
    logMessage("cache", "Cache download ..");
    DataClient.getCache().then(json => {
      logMessage("cache", "Cache fully download ...");
      this.__.data = json;
      this.cacheData();
      this.refreshRender();
      logMessage("cache", "Cache rendered ..");
    }).catch(err => {
      logError("Cache Failed to Load.");
    });
  }

  public reqAllPlayerNames = async () => {
    var axios = require('axios');
    return await axios.get("http://nw-radar-api.vercel.app/api/player/list", {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
        "Bearer-Token": StorageInterface.get("bearer").toString(),
      }
    }).then(res => {
      return res.data.players.map(player => {
        return player.user;
      });
    }).catch(err => {
      logError("Failed to get player list => \n" + err);
    });
  }

  public reqPlayerByName = async (username) => {
    var axios = require('axios');
    return await axios.get("http://nw-radar-api.vercel.app/api/player/get/" + username, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
        "Bearer-Token": StorageInterface.get("bearer").toString(),
      }
    }).then(res => {
      return res.data;
    }).catch(err => {
      logError("Failed to get player => \n" + err);
    });
  }

  public async renderCanvas(player: playerModel, playerList: playerModel[]) {

    this.__.playerMapCoords = new Vector2(player.coords.x, player.coords.y);

    var playerCanvasCoords: Vector2 = new Vector2(
      (this.__.playerMapCoords.x - this.__.mapLeft) *
        this.__.mapToCanvasRatio.x,
      (this.__.mapTop - this.__.playerMapCoords.y) *
        this.__.mapToCanvasRatio.y
    );

    // move the canvas's center to the player position with relative position
    this.__.canvas.style.marginLeft = playerCanvasCoords.x + "px";
    this.__.canvas.style.marginTop = playerCanvasCoords.y + "px";

    var ctx: CanvasRenderingContext2D = this.__.canvas.getContext("2d");
    const renderOtherPlayers = (otherPlayers: playerModel[]) =>
    {
      for (var i = 0; i < otherPlayers.length; i++)
      {
        var oPlayerMapCoords = new Vector2(otherPlayers[i].coords.x, otherPlayers[i].coords.y);

        var otherPlayer: playerModel = otherPlayers[i];

        var oPlayerCanvasCoords: Vector2 = new Vector2(
          (oPlayerMapCoords.x - this.__.mapLeft) * this.__.mapToCanvasRatio.x,
          (this.__.mapTop - oPlayerMapCoords.y) * this.__.mapToCanvasRatio.y
        );

        var icon: CanvasImageSource = new Image();
            icon.src = "./assets/img/compass-needle-yellow.svg";
            icon.style.position = "relative";
            icon.style.left = oPlayerCanvasCoords.x + "px";
            icon.style.top = oPlayerCanvasCoords.y + "px";
        ctx.drawImage(icon, oPlayerCanvasCoords.x, oPlayerCanvasCoords.y)
        // logMessage("render", "rendering player: " + otherPlayer.user)
      }
    }

    // draw and animation of the player pointer
    var a = this.getRotation(player.coords.direction);
    this.rotateNeedle(this.getDirectionAngle(player));
    this.__.directionAngle = a;

    this.renderLayers();

    renderOtherPlayers(playerList);

    return this;
  }

  public async setZoom(amount: number = 1) {
    this.__.zoom = amount

    this.__.canvasLeft = 0;
    this.__.canvasRight = this.__.canvas.width * this.__.zoom;
    this.__.canvasTop = 0;
    this.__.canvasBottom = this.__.canvas.height * this.__.zoom;
    this.__.canvasWidth = this.__.canvasRight - this.__.canvasLeft;
    this.__.canvasHeight = this.__.canvasBottom - this.__.canvasTop;

    this.__.canvas.style.width = parseInt(this.__.canvasWidth) + "px";
    this.__.canvas.style.height = parseInt(this.__.canvasHeight) + "px";

    this.__.mapToCanvasRatio = new Vector2(
      this.__.canvasWidth / this.__.mapWidth,
      this.__.canvasHeight / this.__.mapHeight
    );

    return;
  }

  private renderLayers = async () => {
    this._once
      ? this.renderGrid() &&
        this.renderPins() &&
        (this._once = false)
      : (this._once = false);

    return;
  };

  public async refreshRender() {
    this.__.canvasContext.clearRect(
      0,
      0,
      this.__.canvas.width,
      this.__.canvas.height
    );
    this._once = true;

    return;
  }

  private rotateNeedle(angle: number) {
    var needle: HTMLElement = document.getElementById("compassNeedle");
    needle.style.transform = 'rotate(' + angle + 'deg)'
    needle.style.animationDuration = '1ms'
    return;
  }

  public getRotation = (playerDirection: string = "N"): number => {
    let sequence = [
      "N", // 0
      "NE", // 45
      "E", // 90
      "SE", // 135
      "S", // 180
      "SW", // 225
      "W", // 270
      "NW", // 315
    ];

    return sequence.indexOf(playerDirection) * 45;
  }

  //@TODO fix this to actually work
  private getDirectionAngle(player: playerModel) {
    var prev = this.__.directionAngle;
    var curr = this.getRotation(player.coords.direction)
    var diff = prev-curr;

    this.__.directionAngle = curr;
    return curr;
  }

  public async cacheData() {
    const _ = this.__;
    const data: any = _.data;

    // StorageInterface.clear();
    for (let key in data) {
      if (key === typeof "object") {
        logMessage(key, `Object: ${JSON.stringify(data[key])}`);
      }
      if (data.hasOwnProperty(key)) {
        if (!key.toLowerCase().includes("areas") &&
          !key.toLowerCase().includes("documents") &&
          !key.toLowerCase().includes("events") &&
          !key.toLowerCase().includes("fishing") &&
          !key.toLowerCase().includes("monsters") &&
          !key.toLowerCase().includes("npc") &&
          !key.toLowerCase().includes("pois")) {

          for (let key2 in data[key]) {
            if (data[key][key2] === typeof "object") {
              logMessage(key, `${key2} Object: ${JSON.stringify(data[key][key2])}`);
            }
            if (data[key].hasOwnProperty(key2)) {

              for (let key3 in data[key][key2]) {
                if (data[key][key2].hasOwnProperty(key3)) {

                  if (key.toLowerCase() === "chests" && data[key][key2][key3].y !== undefined && data[key][key2][key3].x !== undefined) {

                    let getTier = (str) => {
                      let split = key2.split(/([0-9]+)/);
                      return parseInt(split[1]);;
                    };

                    let title = key3;
                    let type = key2.toLowerCase();

                    let pin = new Pin(
                      key.toLowerCase(),
                      getTier(type),
                      undefined,
                      data[key][key2][key3].x,
                      data[key][key2][key3].y,
                      1
                    )

                    CacheInterface.set(title, JSON.stringify(pin));
                    //logMessage(key, `${title} added to cache => ${JSON.stringify(pin)}`);
                  }

                  if (key.toLowerCase() === "ores" && data[key][key2][key3].y !== undefined && data[key][key2][key3].x !== undefined) {

                    let getTier = (str): number => {
                      switch (str) {
                        case "silver":
                          return 2;
                        case "gold":
                          return 3;
                        case "platinium":
                          return 4;
                        case "iron":
                          return 1;
                        case "starmetal":
                          return 4;
                        case "orichalcum":
                          return 5;
                        case "crystal":
                          return 3;
                        case "lodestone":
                          return 1;
                        case "saltpeter":
                          return 1;
                        case "seeping_stone":
                          return 1;
                        default:
                          return 1;
                      }
                    }

                    let id = key3;
                    let type = key2.toLowerCase();

                    let pin = new Pin(
                      type,
                      getTier(type),
                      undefined,
                      data[key][key2][key3].x,
                      data[key][key2][key3].y,
                      1
                    )

                    CacheInterface.set(id, JSON.stringify(pin));
                  }

                  if (key.toLowerCase() === "plants" && data[key][key2][key3].y !== undefined && data[key][key2][key3].x !== undefined) {

                    let getProps = (str): [string, number] => {
                      let type = "plant";
                      let tier = 1;
                      switch (str) {
                        case "herb":
                          type = "herb";
                          tier = 1;
                          break;
                        case "nut":
                          type = "nut";
                          tier = 1;
                          break;
                        case "honey":
                          type = "honey";
                          tier = 1;
                          break;
                        case "azoth_water":
                          type = "azoth";
                          tier = 5;
                          break;
                        case "barley":
                          type = "barley";
                          tier = 1;
                          break;
                        case "hemp":
                          type = "fiber";
                          tier = 1;
                          break;
                        case "hemp_t4":
                          type = "silk";
                          tier = 4;
                          break;
                        case "hemp_t5":
                          type = "wire";
                          tier = 5;
                          break;
                        case "berry":
                          type = "berry";
                          tier = 1;
                          break;
                        case "strawberries":
                          type = "strawberries";
                          tier = 1;
                          break;
                        case "blueberry":
                          type = "blueberry";
                          tier = 1;
                          break;
                        case "cranberry":
                          type = "cranberry";
                          tier = 1;
                          break;
                        case "Single_Pumpkin":
                          type = "pumpkin";
                          tier = 1;
                          break;
                        case "potato":
                          type = "potato";
                          tier = 1;
                          break;
                        case "squash":
                          type = "squash";
                          tier = 1;
                          break;
                        case "broccoli":
                          type = "broccoli";
                          tier = 1;
                          break;
                        case "cabbage":
                          type = "cabbage";
                          tier = 1;
                          break;
                        case "carrot":
                          type = "carrot";
                          tier = 1;
                          break;
                        case "corn":
                          type = "corn";
                          tier = 1;
                          break;
                      }
                      return [type, tier];
                    }

                    let id = key3;
                    let props = (key2.includes("_") && !key2.includes("azoth") && !key2.includes("hemp")) ? ["plant", 1] : getProps(key2);
                    let type: string = props[0].toString();
                    let tier: number = parseInt(props[1].toString());

                    let pin = new Pin(
                      type,
                      tier,
                      undefined,
                      data[key][key2][key3].x,
                      data[key][key2][key3].y,
                      1
                    );

                    CacheInterface.set(id, JSON.stringify(pin));
                  }

                  if (key.toLowerCase() === "woods" && data[key][key2][key3].y !== undefined && data[key][key2][key3].x !== undefined) {
                    let id = key3;
                    let type = key2.toLowerCase();
                    let tier = type === "wyrdwood" ? 4 : type === "ironwood" ? 5 : 1;

                    let pin = new Pin(
                      type,
                      tier,
                      undefined,
                      data[key][key2][key3].x,
                      data[key][key2][key3].y,
                      1
                    );

                    CacheInterface.set(id, JSON.stringify(pin));
                  }

                  if (key.toLowerCase() === "essences" && data[key][key2][key3].y !== undefined && data[key][key2][key3].x !== undefined) {

                    let getProps = (str: string): [string, string] => {
                      return [
                        str.split("_")[0],
                        str.split("_")[1]
                      ];
                    }

                    let id = key3;
                    let props = getProps(key2.toLowerCase());
                    let tier = props[1].toString() == "boid" ? 1 : props[1].toString() == "plant" ? 3 : 5;
                    let elem = props[0].toString();

                    let pin = new Pin(
                      elem + " mote",
                      tier,
                      undefined,
                      data[key][key2][key3].x,
                      data[key][key2][key3].y,
                      1
                    );

                    CacheInterface.set(id, JSON.stringify(pin));
                  }

                } // end key4 loop
              } // end key3 loop
            }
          } // end key2 loop
        } // filter end
      }
    } // end key loop
  }

  async renderPins() {

    // Reset the zoom because the pins are not in the right location (zoom value is not calculated)
    this.setZoom(1.0);

    // Get pins from localstorage
    var pins: [string, any][] = StorageInterface.getAll();
        // Add pins from local stored cache file
        pins = pins.concat(CacheInterface.getAll());

    // Loop through all the keyvalue pairs
    pins.forEach(([key, value]) => {

      let title: string = key;
      let pin: Pin = JSON.parse(value, getCircularReplacer());

      if (pin.icon === undefined || pin.icon === null) {
        return;
      }

      var pinX = -((pin.x - this.__.mapLeft) * this.__.mapToCanvasRatio.x);
      var pinY = -((this.__.mapTop - this.__.mapBottom - (pin.y - this.__.mapBottom)) * this.__.mapToCanvasRatio.y);

      // draw a little circle dot on the location
      this.__.canvasContext.fillStyle = "rgba(255,255,255,0.5)";
      this.__.canvasContext.fillRect(pinX - 1, pinY - 1, 3, 3);

      //draw text on top of the pin with the tag as title
      this.__.canvasContext.font = pin.size.width + "px 'New World', sans-serif";
      this.__.canvasContext.textAlign = "center";
      this.__.canvasContext.fillStyle = "#fff";
      this.__.canvasContext.fillText(pin.icon, pinX, pinY - (pin.size.height / 4));

      //@TODO add a label while debugging is turned on
      //@TODO implement global debugging switch
    });

    return true;
  }

  async renderGrid() {
    const chunksPerAxis = 100;

    function step(length) {
      return Math.floor(length / chunksPerAxis);
    }

    this.__.canvasContext.font = "24px 'New World'";
    this.__.canvasContext.lineWidth = 1;

    var rgba_dark = "rgba(0,0,0,0.1)";
    var rgba_red = "rgba(255,0,0,0.1)";
    var rgba_light = "rgba(255,255,255,0.2)";
    var rgba_yellow = "rgba(192,161,0,0.2)";

    for (
      let x = this.__.canvasLeft;
      x < this.__.canvasRight;
      x += step(this.__.canvasWidth)
    ) {
      x % (step(this.__.canvasWidth) * 2)
        ? (this.__.canvasContext.strokeStyle = rgba_light)
        : (this.__.canvasContext.strokeStyle = rgba_red);

      this.__.canvasContext.beginPath();
      this.__.canvasContext.moveTo(x, 0);
      this.__.canvasContext.lineTo(x, this.__.canvasHeight);
      this.__.canvasContext.stroke();

      this.__.canvasContext.fillText(x.toString(), x, 15);
    }

    for (
      let y = this.__.canvasTop;
      y < this.__.canvasBottom;
      y += step(this.__.canvasWidth)
    ) {
      y % (step(this.__.canvasWidth) * 2)
        ? (this.__.canvasContext.strokeStyle = rgba_red)
        : (this.__.canvasContext.strokeStyle = rgba_dark);

      this.__.canvasContext.beginPath();
      this.__.canvasContext.moveTo(0, y);
      this.__.canvasContext.lineTo(this.__.canvasWidth, y);
      this.__.canvasContext.stroke();

      this.__.canvasContext.fillText(y.toString(), 0, y);
    }

    this.__.canvasContext.restore();

    return true;
  }

}