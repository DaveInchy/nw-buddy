import Vector2 from './vector2';
import Pin from './pin';
import StorageInterface from './storage';
import { logMessage } from './debug';
import { getCircularReplacer } from './global';
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

  private __ = {
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
  };

  constructor(player: any, canvas: HTMLCanvasElement) {
      var _ = this.__;

      _.canvas = canvas;
      _.canvasContext = _.canvas.getContext("2d");

      _.playerName = player.user ? player.user : "Player";
      _.playerDirection = player.direction;
      _.playerMapCoords = new Vector2(player.x, player.y);

      _.canvasLeft = 0;
      _.canvasRight = canvas.width;
      _.canvasTop = 0;
      _.canvasBottom = canvas.height;
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
        _.canvasWidth / _.mapWidth,
        _.canvasHeight / _.mapHeight
      );

      return;
  }

  public async renderCanvas(player: any) {

    this.__.playerMapCoords = new Vector2(player.x, player.y);

    var playerCanvasCoords: Vector2 = new Vector2(
      (this.__.playerMapCoords.x - this.__.mapLeft) *
        this.__.mapToCanvasRatio.x,
      (this.__.mapTop - this.__.playerMapCoords.y) *
        this.__.mapToCanvasRatio.y
    );

    // move the canvas's center to the player position with relative position
    this.__.canvas.style.marginLeft = playerCanvasCoords.x + "px";
    this.__.canvas.style.marginTop = playerCanvasCoords.y + "px";

    // draw and animation of the player pointer
    this.rotateNeedle(this.getRotationFromDirection(player.direction));

    // render a grid over the background of the canvas
    this.renderLayers(player);

    return this;
  }

  private renderLayers = async (player: any) => {
    this._once
      ? this.renderGrid(player) &&
        this.renderPins(player) &&
        (this._once = false)
      : (this._once = false);
  };

  public refreshRender() {
    this.__.canvasContext.clearRect(
      0,
      0,
      this.__.canvas.width,
      this.__.canvas.height
    );
    this._once = true;
  }

  private rotateNeedle(angle: number) {
    var needle: HTMLElement = document.getElementById("compassNeedle");
    needle.style.transform = "rotate(" + angle + "deg)";
    return;
  }

  private getRotationFromDirection(playerDirection: string) {
    switch (playerDirection) {
      case "N":
        return 360;
      case "NE":
        return 45;
      case "E":
        return 90;
      case "SE":
        return 135;
      case "S":
        return 180;
      case "SW":
        return 225;
      case "W":
        return 270;
      case "NW":
        return 315;
      default:
        return 360;
    }
  }

  async renderPins(player: any) {

    var pins: [string, any][] = StorageInterface.getAll();
    pins.forEach(([key, value]) => {

      var tag: string = key;
      var pin: Pin = JSON.parse(value, getCircularReplacer());

      var img: CanvasImageSource = new Image();
      img.translate = true;
      img.id = tag;
      img.alt = tag + " marker";
      img.src = pin.source;

      var pinX = -((pin.x - this.__.mapLeft) * this.__.mapToCanvasRatio.x);
      var pinY = -(
        (this.__.mapTop - this.__.mapBottom - (pin.y - this.__.mapBottom)) *
        this.__.mapToCanvasRatio.y
      );

      img.onload = () =>
        this.__.canvasContext.drawImage(img, pinX - 15, pinY - 40);

      // draw a little circle dot on the location
      this.__.canvasContext.fillStyle = "transparent";
      this.__.canvasContext.fillRect(pinX - 1, pinY - 1, 3, 3);

      //draw text on top of the pin with the tag as title
      this.__.canvasContext.font = "18px 'New World'";
      this.__.canvasContext.fillStyle = "#fff";
      this.__.canvasContext.fillText(tag, pinX + 20, pinY - 15);

    });

    return true;
  }

  async renderGrid(player: any) {
    const chunksPerAxis = 100;

    function step(length) {
      return Math.floor(length / chunksPerAxis);
    }

    this.__.canvasContext.font = "24px Monospace";
    this.__.canvasContext.fillStyle = "white";
    this.__.canvasContext.lineWidth = 0.5;

    for (
      let x = this.__.canvasLeft;
      x < this.__.canvasRight;
      x += step(this.__.canvasWidth)
    ) {
      x % (step(this.__.canvasWidth) * 2)
        ? (this.__.canvasContext.strokeStyle = "#fff")
        : (this.__.canvasContext.strokeStyle = "#eee");

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
        ? (this.__.canvasContext.strokeStyle = "#fff")
        : (this.__.canvasContext.strokeStyle = "#eee");

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