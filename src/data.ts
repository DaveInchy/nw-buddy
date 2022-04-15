import { logMessage, logError } from './debug';

class DataClient
{

    public host: string;

    private player: any = {};
    private playerList: [];

    constructor(host: string = undefined)
    {
        this.host = host !== undefined ? host.toString() : process.env.API_REMOTE;
        return;
    }

    public addPlayer = (player: any) => {
        this.player = player;
        fetch(`${this.host}/api/player/add`
            + `?user=${encodeURIComponent(this.player.user)}`
            + `&x=${this.player.x}`
            + `&y=${this.player.y}`
            + `&z=${this.player.z}`
            + `&direction=${encodeURIComponent(this.player.direction)}`, {
            method: 'POST',
            body: JSON.stringify(this.player)
        }).then(res => {
            res.json().then(data => {
                this.playerList = data;
            }).catch(err => {
                logError("res.json() => " + err);
            });
        }).catch(err => {
            logError("addPlayers() => " + err);
        });
        return this.playerList;
    }

    public updatePlayer = (player: any) => {
        this.player = player;
        fetch(`${this.host}/api/player/update`
            + `?user=${encodeURIComponent(this.player.user)}`
            + `&x=${this.player.x}`
            + `&y=${this.player.y}`
            + `&z=${this.player.z}`
            + `&direction=${encodeURIComponent(this.player.direction)}`, {
            method: 'POST',
            body: JSON.stringify(this.player),
        }).then(res => {
            res.json().then(data => {
                this.playerList = data;
            }).catch(err => {
                logError("res.json() => " + err);
            });
        }).catch(err => {
            logError("updatePlayers() => " + err);
        });
        return this.playerList;
    };

    public getPlayers = () => {
        fetch(`${this.host}/api/player/list`, {
            method: 'POST',
            body: JSON.stringify({})
        }).then(res => {
            res.json().then(data => {
                this.playerList = data;
            }).catch(err => {
                logError("res.json() => " + err);
            });
        }).catch(err => {
            logError("getPlayers() => " + err);
        });
        return this.playerList;
    }

}

export default new DataClient();