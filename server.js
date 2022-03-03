const http = require('http');
const express = require('express');

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

const Server = class {

    app = {};
    port = 0;

    constructor(port, callback) {

        this.app = express();
        this.port = parseInt(port, 10) ||  8420;
        this.app.listen(this.port);

        console.log(`Server started on port ${this.getUrl()}`);

        this.app.use(function (req, res) {

            req.get('/favicon.ico', function (req, res) {
                res.sendStatus(204);
            });

            var request = req;
            var hasQuery = Object.keys(request.query).length > 0;
            var data = hasQuery ? request.query : request;

            // console.log(hasQuery ? `[REQ] ${JSON.stringify(data, getCircularReplacer())}` : `[REQ] ${JSON.stringify(data, getCircularReplacer())}`);

            let result = callback(data);

            console.log(result && typeof result === 'object' ? `${JSON.stringify(result, getCircularReplacer())}` : `[RES] Message: ${result}`);

            res.setHeader('Content-Type', 'application/json')
            res.write(result && typeof result === 'object' ? JSON.stringify(result, getCircularReplacer()) : JSON.stringify(data, getCircularReplacer()));
        });

        return this;
    }

    stop() {
        this.app.close();
    }

    getApp() {
        return this.app;
    }

    getPort() {
        return this.port;
    }

    getUrl() {
        return `http://127.0.0.1:${this.port}`;
    }

    getUrlHttps() {
        return `https://127.0.0.1:${this.port}`;
    }

}

module.exports.default = Server;

new Server(8420, (data) => {
    return data.message.toString();
});