const express = require(`express`);
const cors = require(`cors`);
const bodyParser = require(`body-parser`);
const winston = require(`winston`);

let clientCollection;
let sendToClient;

let started = false;

exports.start = function(options, callback) {
    if (started) {
        throw new Error(`restAPI already started`);
    }
    if (!options.clientCollection) {
        throw new Error(`Missing client collection`);
    }
    if (!options.port) {
        throw new Error(`Missing port`);
    }
    if (!options.sendToClient) {
        throw new Error(`Missing sendToClient`);
    }

    started = true;

    sendToClient = options.sendToClient;
    clientCollection = options.clientCollection;
    const port = options.port;

    const app = express();

    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    const router = express.Router();
    app.use(`/`, router);

    registerRoutes(router);

    app.listen(port, err => {
        if (err) {
            winston.log(`error`, err);
        } else {
            winston.log(`info`, `Listening on port: ` + port);
        }
        callback();
    });

};


function registerRoutes(router) {
    router.get(`/info`, (req, res) => {
        res.json({connectedClients: clientCollection.getAll()});
    });
    router.get(`/list-clients`, (req, res) => {
        res.json(clientCollection.getAll());
    });
    router.get(`/get-list/:id`, (req, res) => {
        handleRequest(`LIST`, res.json.bind(res), req.params.id);
    });
    router.get(`/toggle/:id/:index`, (req, res) => {
        handleRequest(`TOGGLE`, res.json.bind(res), req.params.id, {value: parseInt(req.params.index, 10)});
    });
    router.get(`/delete/:id/:index`, (req, res) => {
        handleRequest(`DELETE`, res.json.bind(res), req.params.id, {value: parseInt(req.params.index, 10)});
    });
    router.post(`/add/:id`, (req, res) => {
        handleRequest(`ADD`, res.json.bind(res), req.params.id, req.body);
    });
    router.get(`/ping/:id`, (req, res) => {
        handleRequest(`PING`, res.json.bind(res), req.params.id);
    });
}


class ErrorResponse {
    constructor(err) {
        this.status = `ERROR`;
        if (typeof err === `string`) {
            this.message = err;
        } else {
            this.message = err.message;
        }
    }
}

function handleRequest(command, jsonResponse, id, options) {
    const client = clientCollection.get(id);
    if (!client) {
        return jsonResponse(new ErrorResponse(`Client not found`));
    }

    sendToClient(id, command, options, (err, response) => {
        if (err) {
            jsonResponse(new ErrorResponse(err));
        } else {
            jsonResponse(response);
        }
    });
}


