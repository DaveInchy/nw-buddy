import Vector2 from './vector2';
/*
 * ClassName:       Minimap
 * Description:     A two dimensional Minimap Canvas object
 * Author:          Dave Inchy;
 * Updated:         2022-03-21
 * ------------------------------------------------- *\
 * @param null
 * ------------------------------------------------- */
export default class Minimap {

    constructor() {
        return this;
    }

    static renderCanvas(canvas: HTMLCanvasElement, player: any) {

        var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

        // playerdata
        var playerName = player.user ? player.user : "Player";
        var playerDirection = player.direction;
        var playerMapCoords: Vector2 =
            new Vector2(
                player.x,
                player.y
            );

        // canvas data
        var canvasLeft: number = 0;
        var canvasRight: number = canvas.width;
        var canvasTop: number = 0;
        var canvasBottom: number = canvas.height;
        var canvasWidth: number = canvasRight - canvasLeft;
        var canvasHeight: number = canvasBottom - canvasTop;

        // map constants // DONT CHANGE THIS SHOULD WORK
        var mapLeft: number = 4520; // West Min 5240
        var mapRight: number = 14240; // East Max 14240
        var mapTop: number = 10120; // North Max 10240 / 10100 / 10200
        var mapBottom: number = 100; // South Min 0
        var mapWidth: number = mapLeft - mapRight; // mapLeft - mapRight
        var mapHeight: number = mapBottom - mapTop; // -mapTop - mapBottom
        // DONT DONT DONT DONT DONT DONT CHANGE CHANGE CHANGE CHANGE CHANGE //

        // tuning the numbers
        var mapToCanvasRatioWidth = canvasWidth / mapWidth;
        var mapToCanvasRatioHeight = canvasHeight / mapHeight;

        var playerCanvasCoords: Vector2 = new Vector2(
          //playerMapCoords.x > mapCorrectFrom.x ? (playerMapCorrection.x - mapLeft) * mapToCanvasRatioWidth : (playerMapCoords.x - mapLeft) * mapToCanvasRatioWidth,
          //playerMapCoords.y > mapCorrectFrom.y ? (mapTop - playerMapCorrection.y) * mapToCanvasRatioHeight : (mapTop - playerMapCoords.y) * mapToCanvasRatioHeight
          (playerMapCoords.x - mapLeft) * mapToCanvasRatioWidth, // X: (playerMapCoords.x - mapLeft) * mapToCanvasRatioWidth
          //(-mapHeight -
          (mapTop - playerMapCoords.y) * mapToCanvasRatioHeight // Y: (-mapHeight - (playerMapCoords.y)) * mapToCanvasRatioHeight
        );

        // move the canvas's center to the player position with relative position
        canvas.style.marginLeft = playerCanvasCoords.x + "px";
        canvas.style.marginTop = playerCanvasCoords.y + "px";

        // draw and animation of the player pointer
        this.rotateNeedle(this.getRotationFromDirection(playerDirection));

        // render a grid over the background of the canvas
        var once = true
        once ? this.renderGrid(
            canvasLeft, canvasRight, canvasWidth,
            canvasTop, canvasBottom, canvasHeight,
            ctx
        ) : once=false;

        return this;
    }

    static rotateNeedle(angle: number) {
        var needle: HTMLElement = document.getElementById("compassNeedle");
        needle.style.transform = "rotate(" + angle + "deg)";
        return;
    }


    static getRotationFromDirection(playerDirection: string) {
        switch(playerDirection) {
            case "N":
                return 0;
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

    static async renderGrid(
        canvasLeft: number, canvasRight: number, canvasWidth: number,
        canvasTop: number, canvasBottom: number, canvasHeight: number,
        canvasContext: CanvasRenderingContext2D
    ) {

        const chunksPerAxis = 100;

        function step(length) {
            return Math.floor(length / chunksPerAxis);
        }

        canvasContext.font = '32px Monospace'
        canvasContext.fillStyle = 'white'
        canvasContext.lineWidth = 1;

        for (let x = canvasLeft; x < canvasRight; x += step(canvasWidth)) {
            x % (step(canvasWidth) * 2) ? canvasContext.strokeStyle = '#fff' : canvasContext.strokeStyle = '#eee'

            canvasContext.beginPath()
            canvasContext.moveTo(x, 0)
            canvasContext.lineTo(x, canvasHeight)
            canvasContext.stroke()

            canvasContext.fillText(x.toString(), x, 15)
        }

        for (let y = canvasTop; y < canvasBottom; y += step(canvasHeight)) {
            y % (step(canvasHeight) * 2) ? canvasContext.strokeStyle = '#fff' : canvasContext.strokeStyle = '#fff'

            canvasContext.beginPath()
            canvasContext.moveTo(0, y)
            canvasContext.lineTo(canvasWidth, y)
            canvasContext.stroke()

            canvasContext.fillText(y.toString(), 0, y)
        }

        canvasContext.restore()

        return canvasContext;
    }

}