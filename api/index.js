const express = require('express');

var DataBase = {
    players: [],
};

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

class DataServer {

    app = {};
    port = 8080;

    constructor() {

        this.app = express();
        this.port = 8080 || 3000;

        console.log(`Server started on ${this.getUrl()}`);

        this.app.use('/api/player/add', function (request, response) {

            const hasQuery = Object.keys(request.query).length > 0;
            const hasHeaders = Object.keys(request.headers).length > 0;

            var player = hasQuery ? {
                "user": request.query.user,
                "x": request.query.x,
                "y": request.query.y,
                "z": request.query.z,
                "direction": request.query.direction,
            } : {};

            //check if database.player already has an existing player.user
            var playerExists = DataBase.players.find(function (element) {
                return element.user === player.user;
            });

            if (!playerExists) {
                DataBase.players.push(player);
                console.log("Added Player " + player.user.toString() + "...");
            }

            var data = hasQuery ? request.query : {};
                data.headers = hasHeaders ? request.headers : {};
                data.players = DataBase.players || [];

            console.log(`${request.url} => ${data.players}`);

            response.setHeader('Content-Type', 'application/json');
            response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.send(JSON.stringify(data.player, getCircularReplacer()));
            response.end();
            request.end();
        });

        this.app.use('/api/player/update', function (request, response) {

            const hasQuery = Object.keys(request.query).length > 0;
            const hasHeaders = Object.keys(request.headers).length > 0;

            var player = hasQuery ? {
                "user": request.query.user,
                "x": request.query.x,
                "y": request.query.y,
                "z": request.query.z,
                "direction": request.query.direction,
            } : {};

            console.log("Updating Player " + player.user.toString() + "...");
            DataBase.players.forEach(function(element, index) {
                if(element.user === player.user) {
                    DataBase.players[index] = player;
                    console.log("Updated Player Successfully...");
                }
            });

            var data = hasQuery ? request.query : {};
                data.headers = hasHeaders ? request.headers : {};
                data.players = DataBase.players || [];

            console.log(`${request.url} => ${data.players}`);

            response.setHeader('Content-Type', 'application/json');
            response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.send(JSON.stringify(data.players, getCircularReplacer()));
            response.end();
            request.end();
        });

        this.app.use('/api/player/list', function (request, response) {

            const hasQuery = Object.keys(request.query).length > 0;
            const hasHeaders = Object.keys(request.headers).length > 0;

            console.log("Retreiving all players in database...");

            var data = hasQuery ? request.query : {};
                data.headers = hasHeaders ? request.headers : {};
                data.players = DataBase.players || [];

            console.log(`${request.url} => ${data.players}`);

            response.setHeader('Accept', 'application/json');
            response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
            response.setHeader('Access-Control-Allow-Header', '*');
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.send(JSON.stringify(data.players, getCircularReplacer()));
            response.end();
            request.end();
        });

        this.app.listen(this.port);

        return this.app;
    }

    getUrl() {
        return `http://0.0.0.0:${this.port}`;
    }

    getUrlSecure() {
        return `https://0.0.0.0:${this.port}`;
    }
}

module.exports = new DataServer().app;