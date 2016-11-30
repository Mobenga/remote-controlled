module.exports = ClientCollection;

function ClientCollection() {
    let clients = {};

    this.getAll = function () {
        return Object.keys(clients).map(key => clients[key]);
    };

    this.get = function (id) {
        return clients[id];
    };

    this.add = function (id) {
        clients[id] = {
            id,
            timestamp: Date.now()
        };
    };

    this.remove = function (id) {
        delete clients[id];
    };
}
