import * as model from "./model";

let stompClient = null;
function connect() {
    fetch(`/websocketServerUrl`)
        .then(r => r.text())
        .then(baseUrl => {

            const socket = new SockJS(`${baseUrl}/todo-websocket`);
            stompClient = Stomp.over(socket);
            stompClient.connect({}, () => {
                model.setConnected();
                stompClient.subscribe(`/user/register`, callback);
            });
        });
}

function callback(data) {
    data = JSON.parse(data.body);
    const response = {
        messageId: data.messageId,
        status: `OK`,
    };
    switch (data.command) {
        case `LIST`:
            response.list = model.getTodoList();
            break;
        case `TOGGLE`:
            model.toggleCheckbox(data.value);
            break;
        case `DELETE`:
            model.deleteItem(data.value);
            break;
        case `ADD`:
            model.addItem(data.value);
            break;
        case `PING`:
            flashBackground();
            break;
        default:
            throw new Error(`Unknown command: ${data.command}`);
    }

    const stringResponse = JSON.stringify(response);
    stompClient.send(`/respond`, {}, stringResponse);
}

function flashBackground() {
    function wait() {
        return new Promise(resolve => {
            setTimeout(resolve, 50);
        });
    }
    document.body.style.background = `yellow`;
    wait(100)
        .then(() => document.body.style.background = `none`)
        .then(wait)
        .then(() => document.body.style.background = `yellow`)
        .then(wait)
        .then(() => document.body.style.background = `none`);
}

export {connect};
