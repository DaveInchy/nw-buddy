const express = require('express');
const cache = require("./pins.json");

class Player {

    user = undefined;
    data = undefined;
    group = undefined;

    constructor(user, group, data) {

        this.user = user;
        this.data = data;
        this.group = group;

        console.log(`new Player() => ${this.user} has been constructed with data: ${this.data}`);

        return new Object ({
            "type": "player",
            "user": this.user,
            "group": this.group,
            "coords": {
                "x": this.data.x,
                "y": this.data.y,
                "z": this.data.z,
                "direction": this.data.direction,
            },
        });
    }
}

class DataServer {

    app = undefined;

    port = 8080;

    players = new Array();

    constructor() {
        this.app = express();

        this.app.use('/api/datasheet/pins', this.getPinsJSON);

        this.app.use('/api/player/set', this.setPlayer);
        this.app.use('/api/player/get/:username', this.getPlayer);
        this.app.use('/api/player/list', this.listPlayers);
        this.app.use('/api/player/list/:group', this.listGroup);

        this.app.listen(this.port);
        return this;
    }

    getPinsJSON = (request, response) => {
        let text = JSON.stringify(cache, getCircularReplacer());

        console.log(`${request.url} => ${text}`);

        response.setHeader('Access-Control-Allow-Header', '*');
        response.setHeader('Access-Control-Allow-Origin', '*');

        response.setHeader('Accept', 'application/json');
        response.setHeader('Content-Type', 'application/json');

        response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

        response.status(200).send(text);
        return;
    }

    getPlayer = (request, response) => {
        let username = request.params.username;
        this.players.forEach((element, index) => {
            if (element.user === username) {
                response.setHeader('Access-Control-Allow-Header', '*');
                response.setHeader('Access-Control-Allow-Origin', '*');

                response.setHeader('Accept', 'application/json');
                response.setHeader('Content-Type', 'application/json');

                response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

                response.status(200).send(JSON.stringify(element, getCircularReplacer()));
                return;
            }
        });
        return;
    }

    setPlayer = (request, response) => {
        const hasQuery      = Object.keys(request.query).length > 0;
        const hasHeaders    = Object.keys(request.headers).length > 0;

        var player = new Player(
            request.query.user ? request.query.user : "propabot",
            request.query.group ? request.query.group : "public",
            hasQuery ? {
                "user": request.query.user ? request.query.user : "propabot",
                "x": request.query.x ? request.query.x : 0,
                "y": request.query.y ? request.query.y : 0,
                "z": request.query.z ? request.query.z : 0,
                "direction": request.query.direction ? request.query.direction : "N",
                "group": request.query.group ? request.query.group : "public"
            } : undefined
        );

        console.log("checking if " + player.user.toString() + " already exists in live data ...");

        var playerFound = this.players
            ? this.players.find( element => element.user === player.user )
            : false;

        if (!playerFound)
        {
            this.players.push(player);
            console.log("added player " + player.user.toString() + " to live data ...");
        } else {
            this.players.forEach(function(element, index, array) {
                if(element.user === player.user) {
                    array[index] = player;
                    console.log("updated " + player.user.toString() + " in live data ...");
                }
            });
        }

        console.log("retreiving all players in database...");

        var headers         = hasHeaders ? request.headers : {};
        var data            = hasQuery ? request.query : {};
            data.players    = this.players ? this.players : [];

        console.log(`${request.url} => ${headers}`);

        response.setHeader('Accept', 'application/json');
        response.setHeader('Cache-Control', 's-max-age=1, no-cache');
        response.setHeader('Access-Control-Allow-Header', '*');
        response.setHeader('Access-Control-Allow-Origin', '*');

        response.send(JSON.stringify(data.players, getCircularReplacer()));
        return;
    }

    listGroup = (request, response) => {
        response.status(200).send(JSON.stringify(this.players, getCircularReplacer()));
        return;
    }

    listPlayers = (request, response) => {
        const hasQuery      = Object.keys(request.query).length > 0;
        const hasHeaders    = Object.keys(request.headers).length > 0;

        console.log("retreiving all players in database...");

        var data            = hasQuery ? request.query : {};
            data.headers    = hasHeaders ? request.headers : {};
            data.players    = this.players || [];

        console.log(`${request.url} => ${data.players}`);

        response.setHeader('Accept', 'application/json');
        response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        response.setHeader('Access-Control-Allow-Header', '*');
        response.setHeader('Access-Control-Allow-Origin', '*');

        response.send(JSON.stringify(data.players, getCircularReplacer()));
        return;
    }

    getUrl() {
        return `http://0.0.0.0:${this.port}`;
    }

    getUrlSecure() {
        return `https://0.0.0.0:${this.port}`;
    }
}

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

module.exports.default = new DataServer().app;