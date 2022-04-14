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

const log = (data) => {

    var time = data.time;
    var type = data.type;
    var subject = data.subject;
    var message = data.message;

    return `[${time.toString()}|${(type === 'error' ? 'error' : subject).toString().toUpperCase()}] ${message}`;
}

class DebugServer {

    app = {};
    port = 8420;

    constructor(port) {

        this.app = express();
        this.port = parseInt(port, 10) ||  8420;
        this.app.listen(this.port);

        console.log(`Server started on port ${this.getUrl()}`);

        this.app.use(
            function (req, res)
            {

                req.get('/favicon.ico', function (req2, res2)
                    {
                        res2.sendStatus(204);
                        res2.end();
                    }
                );

                const hasQuery          = Object.keys(req.query).length > 0;
                const hasHeaders        = Object.keys(req.headers).length > 0;

                var data                = hasQuery ? req.query : {};
                    data.headers        = hasHeaders ? req.headers : {}; // headers

                var output              = log(data); // create output for console

                console.log(
                    output && typeof output === 'object' ? // if output is an object
                    `${JSON.stringify(data, getCircularReplacer())}` : // true => json data
                    `${output}` // false => message
                );

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(JSON.stringify(data, getCircularReplacer()));
                res.end();
            }
        );

        return this;
    }

    stop = () => {
        this.app.close();
    }

    getApp = () => {
        return this.app;
    }

    getPort = () => {
        return this.port;
    }

    getUrl = () => {
        return `http://0.0.0.0:${this.port}`;
    }

    getUrlSecure = () => {
        return `https://0.0.0.0:${this.port}`;
    }

}

module.exports.default = new DebugServer(8420);