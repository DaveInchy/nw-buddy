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

    players = [{}];

    constructor() {
        this.app = express();

        this.app.use('/api/player/set', this.setPlayer);
        this.app.use('/api/player/update', this.setPlayer);
        this.app.use('/api/player/list', this.listPlayers);

        this.app.use('/api/datasheet/pins', this.getPinsJSON);

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

    setPlayer = (request, response) => {
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
        var playerExists = this.players ? this.players.find( element => element.user === player.user ) : never;

        if (!playerExists)
        {
            this.players.push(new Player(player.user, "untested", player));
            console.log("added player " + player.user.toString() + " to live data ...");
        }
        else
        {
            this.players.forEach(function(element, index, array) {
                if(element.user === player.user) {
                    array[index] = new Player(player.user, "untested", player);
                    console.log("updated " + player.user.toString() + " in live data ...");
                }
            });
        }

        console.log("retreiving all players in database...");

        var data            = hasQuery ? request.query : {};
            data.headers    = hasHeaders ? request.headers : {};
            data.players    = this.players || [];

        console.log(`${request.url} => ${data.players}`);

        response.setHeader('Accept', 'application/json');
        response.setHeader('Cache-Control', 's-max-age=1, no-cache');
        response.setHeader('Access-Control-Allow-Header', '*');
        response.setHeader('Access-Control-Allow-Origin', '*');

        response.send(JSON.stringify(data, getCircularReplacer()));
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