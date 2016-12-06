let list = [];
const callbacks = [];
let isSubscribing = false;
let intervalId;


function subscribe(cb) {
    if (!isSubscribing) {
        startSubscibing();
    }
    callbacks.push(cb);
    return {
        dispose: function () {
            const index = callbacks.indexOf(cb);
            if (index >= 0) {
                callbacks.splice(index, 1);
            }
            if (isSubscribing && callbacks.length === 0) {
                stopSubscribing();
            }
        },
    };
}

function startSubscibing() {
    isSubscribing = true;
    intervalId = setInterval(() => {
        fetchClientList().then(newList => {
            list = newList;
            publish();
        }).catch(console.error.bind(console));
    }, 500);
}

function stopSubscribing() {
    isSubscribing = false;
    clearInterval(intervalId);
}

function publish() {
    callbacks.forEach(cb => cb(list));
}

function getList() {
    return list;
}

function fetchClientList() {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8100/list-clients`)
            .then(response => {
                return response.json();
            })
            .then(resolve)
            .catch(reject);
    });
}


export {getList, subscribe};
