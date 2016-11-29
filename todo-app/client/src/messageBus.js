const subscribers = [];

function subscribe(cb) {
    subscribers.push(cb);
    return {
        dispose: function () {
            const index = subscribers.indexOf(cb);
            if (index >= 0) {
                subscribers.splice(index, 1);
            }
        },
    };
}

function send(name, value) {
    subscribers.forEach(cb => cb(name, value));
}

export {subscribe, send};
