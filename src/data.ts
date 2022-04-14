import { logMessage, logError } from './debug';

class DataClient
{

    public host: string;

    private player: any;
    private playerList: [];

    constructor(host: string = undefined)
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
        var http = await fetch(`${this.host}/api/player/add`
            + `?user=${encodeURIComponent(player.user)}`
            + `&x=${player.x}`
            + `&y=${player.y}`
            + `&z=${player.z}`
            + `&direction=${encodeURIComponent(player.direction)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let data = await http.json();
        return data;
    }

    public updatePlayer = async (player: any): Promise<any> => {
        var http = await fetch(`${this.host}/api/player/update`
            + `?user=${encodeURIComponent(player.user)}`
            + `&x=${player.x}`
            + `&y=${player.y}`
            + `&z=${player.z}`
            + `&direction=${encodeURIComponent(player.direction)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let data = await http.json();
        return data;
    };

    public getPlayers = async () => {
        let req = await fetch(`${this.host}/api/player/list`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'access-control-allow-headers': '*',
            }
        });
        let data = await req.json()
        return data;
    }

}

export default new DataClient("https://nw-radar-api.vercel.app");