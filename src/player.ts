
import Vector2 from './vector2';

export type playerModel = {
    type: string;
    user: string;
    group: string;
    coords: {
        x: number;
        y: number;
        z: number;
        direction: string | "N" | "E" | "S" | "W" | "NE" | "SE" | "SW" | "NW";
    };
    map: string;
}

export class playerClass {

    public user: string;
    public data: any;
    public group: string;
    public mapPos: Vector2;

    public Model = (): playerModel => {
        return {
            "type": "player",
            "user": this.user,
            "group": this.group,
            "coords": {
                "x": this.data.x,
                "y": this.data.y,
                "z": this.data.z,
                "direction": this.data.direction,
            },
            "map": this.data.map ? this.data.map : "mainland",
        };
    }

    constructor(user, group, data) {

        this.user = user;
        this.data = data;
        this.group = group;
        this.mapPos = new Vector2(0, 0);

        return this;
    }
}

export default function Player(user, group, data): playerModel
{
    return new playerClass(user, group, data).Model();
}

export function otherPlayer(user, group, data): playerClass
{
    return new playerClass(user, group, data);
}