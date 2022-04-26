import { logMessage, logError } from './debug';
import { getCircularReplacer } from '../../archive/nw-buddy-r22/src/global';
import { createHash, Hash } from 'crypto';

class DataClient
{

    public host: string;

    private player: any = {};
    private playerList: [];
    private cache: any[];

    constructor(host: string = undefined)
    {
        this.host = host !== undefined ? host.toString() : process.env.API_REMOTE;
        return;
    }

    public setPlayer = (player: any) => {
        this.player = player;
        fetch(`${this.host}/api/player/set`
            + `?user=${encodeURIComponent(this.player.user)}`
            + `&x=${this.player.x}`
            + `&y=${this.player.y}`
            + `&z=${this.player.z}`
            + `&direction=${encodeURIComponent(this.player.direction)}`
            + `&group=${encodeURIComponent(this.player.group)}`, {
            method: 'POST',
            body: JSON.stringify(this.player)
        }).then(res => {
            res.json().then(data => {
                this.playerList = data;
            }).catch(err => {
                logError("res.json() => " + err);
            });
        }).catch(err => {
            logError("setPlayers() => " + err);
        });
        return this.playerList;
    }

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

    public async getCache() {
        var res = await fetch(`${this.host}/api/datasheet/pins`, {
            method: 'POST',
            body: JSON.stringify({})
        })
        return await res.json();
    }

}

export default new DataClient("https://nw-radar-api.vercel.app");