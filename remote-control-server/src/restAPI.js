const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const winston = require("winston");

let clientCollection;
let sendToClient;

let started = false;

exports.start = function(options, callback) {
    if (started) {
        throw new Error("restAPI already started");
    }
    if (!options.clientCollection) {
        throw new Error("Missing client collection");
    }
    if (!options.port) {
        throw new Error("Missing port");
    }
    if (!options.sendToClient) {
        throw new Error("Missing sendToClient");
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
    app.use("/", router);

    registerRoutes(router);

    app.listen(port, err => {
        if (err) {
            winston.log("error", err);
        } else {
            winston.log("info", "Listening on port: " + port);
        }
        callback();
    });

};


function registerRoutes(router) {
    router.get("/info", function (req, res) {
        res.json({connectedClients: clientCollection.getAll()});
    });

    router.get("/list-clients", function (req, res) {
        res.json(clientCollection.getAll());
    });

    //router.get("/send/:id/:message", function (req, res) {
        //const id = req.params.id;
        //const client = clientCollection.get(id);
        //if (!client) {
            //return res.json(new ErrorResponse("Client not found"));
        //}

        //sendToClient(id, 


    router.post("/alert/:id", (req, res) => handleRequest("ALERT", res.json.bind(res), req.params.id, {message: req.body.message}));

    router.get("/get-list/:id", (req, res) => handleRequest("GET-LIST", res.json.bind(res), req.params.id));
    router.get("/toggle/:id/:index", (req, res) => handleRequest("TOGGLE", res.json.bind(res), req.params.id, {index: req.params.index}));
    router.get("/delete/:id/:index", (req, res) => handleRequest("DELETE", res.json.bind(res), req.params.id, {index: req.params.index}));
    router.post("/add/:id", (req, res) => handleRequest("ADD", res.json.bind(res), req.params.id, req.body));
}


class ErrorResponse {
    constructor(err) {
        this.status = "ERROR";
        if (typeof err === "string") {
            this.message = err;
        } else {
            this.message = err.message;
        }
    }
}

function handleRequest(command, jsonResponse, id, options) {
    console.log(command, options);
    const client = clientCollection.get(id);
    if (!client) {
        return jsonResponse(new ErrorResponse("Client not found"));
    }

    sendToClient(id, command, options, (err, response) => {
        if (err) {
            jsonResponse(new ErrorResponse(err));
        } else {
            jsonResponse(response);
        }
    });
}

