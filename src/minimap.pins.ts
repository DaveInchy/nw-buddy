import { logMessage } from "./debug";
import Vector2 from "./vector2";

export default class Pin {

    constructor(
        public readonly image: string = "default",
        public readonly x: number = 0,
        public readonly y: number = 0,
        public readonly user: string = undefined
    ) {
        this.user = user !== undefined ? user : "Map";
        this.x = x;
        this.y = y;
        this.image = image;
        logMessage("minimap", "<" + this.user + " ghost=\"true\" /> created pin at Vector2(" + this.x + ", " + this.y + ")");

        return this;
    }

    private getImageResource(imgName: string): ImageBitmapSource {
        var location = "./assets/images/minimap/" + imgName + ".png";
        return new ImageBitmap();
    }

}