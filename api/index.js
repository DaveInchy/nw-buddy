const express = require('express');

class DataServer {

    app = {};
    port = 8080;

    // realtime data
    players = [];

    constructor() {
        this.app = express();

        this.app.use('/api/player/add', this.addPlayer);
        this.app.use('/api/player/update', this.updatePlayer);
        this.app.use('/api/player/list', this.listPlayers);

        this.app.listen(this.port);

        return this.app;
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
            data.players    = DataBase.players || [];

        console.log(`${request.url} => ${data.players}`);

        response.setHeader('Content-Type', 'application/json');
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
                this.players[index] = player;
                console.log("updated player successfully ...");
            }
        });

        console.log("retreiving all players in database...");

        var data            = hasQuery ? request.query : {};
            data.headers    = hasHeaders ? request.headers : {};
            data.players    = this.players || [];

        console.log(`${request.url} => ${data.players}`);

        response.setHeader('Content-Type', 'application/json');
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