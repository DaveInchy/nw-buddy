import { logMessage, logError } from './debug.client';

class DataClient
{

    public host: string;

    private player: any;
    private playerList: [];

    constructor(host = undefined)
    {
        this.host = host !== undefined ? host.toString() : process.env.API_REMOTE;
        return;
    }

    public setPlayer = (player: any): any =>
    {
        this.player = {
            "user": player.user,
            "x": player.x,
            "y": player.y,
            "z": player.z,
            "direction": player.direction
        };
        return this.player.length > 0 ? true : false;
    }

    public addPlayer = async (player: any): Promise<any> =>
    {
        var http: Response = await fetch(`${this.host}/player/add`
            + `?user=${encodeURIComponent(player.user)}`
            + `&x=${player.x}`
            + `&y=${player.y}`
            + `&z=${player.z}`
            + `&direction=${encodeURIComponent(player.direction)}`);
        return http.json();
    }

    public updatePlayer = async (player: any): Promise<any> => {
        var http: Response = await fetch(`${this.host}/player/update`
            + `?user=${encodeURIComponent(player.user)}`
            + `&x=${player.x}`
            + `&y=${player.y}`
            + `&z=${player.z}`
            + `&direction=${encodeURIComponent(player.direction)}`);
        return http.json();
    }

    public getPlayers = async (): Promise<any> => {
        var http: Response = await fetch(`${this.host}/player/list`);
        return http.json();
    }

}

export default new DataClient() as DataClient;