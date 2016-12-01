const redis = require(`redis`);
const uuid = require(`uuid`);
const subscribable = require(`./subscribable`);
const ClientCollection = require(`./client-collection`);
const winston = require(`winston`);

const port = 8100;
const redisHost = process.env[`REDIS_HOST`] || `localhost`;
const redisPort = process.env[`REDIS_PORT`] || 6379;
const redisSubscriber = redis.createClient(redisPort, redisHost);
const redisPublisher = redis.createClient(redisPort, redisHost);
const pubsub = subscribable.mixin({});
const clientCollection = new ClientCollection();
const redisTimeout = 5000;
const redisMessage = {
    fromServerPrefix: `rc_from_server_`,
    fromClientPrefix: `rc_from_client_`,
    clientConnect: `CLIENT_CONNECT`,
    clientDisconnect: `CLIENT_DISCONNECT`
};


setupRedisSubscriber();
startRestAPI();

// END

function setupRedisSubscriber() {
    const idRegexp = new RegExp(`${redisMessage.fromClientPrefix}(.*)`);
    redisSubscriber.psubscribe(`rc_from_client_*`);
    redisSubscriber.on(`error`, err => {
        winston.log(`error`, err);
    });

    redisSubscriber.on(`pmessage`, function (pattern, channel, message) {
        const clientId = idRegexp.exec(channel)[1];

        if (message === redisMessage.clientConnect) {
            clientCollection.add(clientId);
            winston.log(`info`, `Client connected`, {clientId});
        } else if (!clientCollection.get(clientId)) {
            winston.log(`info`, `Discarding message from unknown user`, {clientId, message});
        } else if (message === redisMessage.clientDisconnect) {
            clientCollection.remove(clientId);
            winston.log(`info`, `Client disconnected`, {clientId});
        } else {
            winston.log(`info`, `Message from client`, {clientId, message});
            const data = JSON.parse(message);
            if (!data.messageId) {
                winston.log(`error`, `Missing messageId in response from client`);
            }
            const messageId = data.messageId;

            pubsub.publish(clientId + `_` + messageId, JSON.parse(message));
        }
    });
}

function startRestAPI() {
    const restAPI = require(`./restAPI`);
    restAPI.start({
        port,
        clientCollection,
        sendToClient
    }, () => {
    });
}

function sendToClient(clientId, command, options, callback) {
    const messageId = uuid.v4();
    const payload = options || {};
    payload.command = command;
    payload.messageId = messageId;
    const subscription = pubsub.subscribe(`${clientId}_${messageId}`, data => {
        callback(null, data);
        subscription.dispose();
        clearTimeout(timer);
    });
    const timer = setTimeout(() => {
        winston.log(`warn`, `Request timed out`, {payload});
        subscription.dispose();
        callback(new Error(`Timeout`));
    }, redisTimeout);

    const channel = redisMessage.fromServerPrefix + clientId;
    redisPublisher.publish(channel, JSON.stringify(payload));
}


