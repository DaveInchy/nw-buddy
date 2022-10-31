import { logMessage, logError } from './debug';
import { Config } from './global';
import { getCircularReplacer } from './utils';
import { createHash, Hash } from 'crypto';
import { playerModel } from './player';

class DataClient
{

    public host: string;

    private player: playerModel;
    private playerList: playerModel[];

    constructor(host: string = undefined)
    {
        this.host = host !== undefined ? host.toString() : process.env.API_REMOTE;
        return;
    }

    public setPlayer = (player: playerModel) => {
        fetch(`${this.host}/api/player/set`
            + `?user=${encodeURIComponent(player.user)}`
            + `&group=${encodeURIComponent(player.group)}`
            + `&x=${player.coords.x}`
            + `&y=${player.coords.y}`
            + `&z=${player.coords.z}`
            + `&direction=${encodeURIComponent(player.coords.direction)}`
            + `&map=${encodeURIComponent(player.map)}`, {
            method: 'POST',
            body: JSON.stringify(player)
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

export default new DataClient((Config.server.ssl ? "https://" : "http://") + Config.server.domain);