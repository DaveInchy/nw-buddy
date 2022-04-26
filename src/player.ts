type playerModel = {
    type: string;
    user: string;
    group: string;
    coords: {
        x: number;
        y: number;
        z: number;
        direction: "N" | "E" | "S" | "W" | "NE" | "SE" | "SW" | "NW";
    }
}

class playerClass {

    private user: string;
    private data: any;
    private group: string;

    _instance: playerModel;

    private init = (): playerModel => {
        var player: playerModel = {
            "type": "player",
            "user": this.user,
            "group": this.group,
            "coords": {
                "x": this.data.x,
                "y": this.data.y,
                "z": this.data.z,
                "direction": this.data.direction,
            },
        };
        return player;
    }

    constructor(user, group, data) {

        this.user = user;
        this.data = data;
        this.group = group;

        this._instance = this.init();

        return this;
    }
}

export default function Player(user, group, data): playerModel
{
    return new playerClass(user, group, data)._instance;
}