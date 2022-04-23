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
        return new Object ({
            "type": "player",
            "user": user,
            "group": group,
            "x": data.x,
            "y": data.y,
            "z": data.z,
            "direction": data.direction,
        });
    }
}

class DataServer {

    app = undefined;

    port = 8080;

    players = [];

    constructor() {
        this.app = express();

        this.app.use('/api/player/add', this.addPlayer);
        this.app.use('/api/player/update', this.updatePlayer);
        this.app.use('/api/player/list', this.listPlayers);

        this.app.use('/api/player/get/:username', this.getPlayer);
        this.app.use('/api/player/set/:username/:group', this.setPlayer);

        this.app.use('/api/datasheet/pins', this.getPinsJSON);

        this.app.listen(this.port);

        return this.app;
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

    setPlayer = (request, response) => {

        let method          = request.method;
        let username        = request.params.username;
        let group           = request.params.group;
        let data            = Object.keys(request.body).length > 0;
            data            = data && method === 'POST'
                            ? request.body
                            : response.status(400).send('[{ type: "error", message: "post method without body" }]');
        let player          = new Player(username, group, data);
        let playerFound     = this.players.find(element => element.user === player.user);

        if (!playerFound && player)
        {

            this.players.push(player);
            console.log("added player " + player.user.toString() + " to data ...");

        }
        else if (playerFound && player)
        {

            this.players.forEach((element, index) => {
                if (element.user === player.user) {
                    this.players[index] = player;
                    console.log("updated player " + player.user.toString() + " in data ...");
                }
            });

        }

        console.log(`${request.url} => ${this.players}`);

        response.setHeader('Access-Control-Allow-Header', '*');
        response.setHeader('Access-Control-Allow-Origin', '*');

        response.setHeader('Accept', 'application/json');
        response.setHeader('Content-Type', 'application/json');

        response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

        response.status(200).send(JSON.stringify(this.players, getCircularReplacer()));
        return;
    }

    getPlayer = (request, response) => {
        let username        = request.params.username;
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

    addPlayer = (request, response) => {
        const hasQuery      = Object.keys(request.query).length > 0;
        const hasHeaders    = Object.keys(request.headers).length > 0;

        var player = hasQuery ? {
            "user": request.query.user,
            "x": request.query.x,
            "y": request.query.y,
            "z": request.query.z,
            "direction": request.query.direction,
        } : {};

        console.log("checking if " + player.user.toString() + " already exists in live data ...");
        var playerExists = this.players.find( element => element.user === player.user );
        if (!playerExists) {
            this.players.push(player);
            console.log("added player " + player.user.toString() + " to live data ...");
        }

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

    updatePlayer = (request, response) => {
        const hasQuery      = Object.keys(request.query).length > 0;
        const hasHeaders    = Object.keys(request.headers).length > 0;

        var player = hasQuery
        ? {
            "user": request.query.user,
            "x": request.query.x,
            "y": request.query.y,
            "z": request.query.z,
            "direction": request.query.direction,
        }
        : {};

        console.log("updating player " + player.user.toString() + " in live data ...");

        this.players.forEach(function(element, index) {
            if(element.user === player.user) {
                element = player;
                console.log("updated player successfully ...");
            }
        });

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

module.exports = new DataServer().app;