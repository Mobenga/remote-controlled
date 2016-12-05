import {publish} from "./channel";
import {get as getTodoList} from "./todoList";

let stompClient = null;

function connect() {
    var socket = new SockJS(`http://localhost:8090/todo-websocket`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
        publish(`CONNECTED`);
        stompClient.subscribe(`/user/register`, callback);
    });
}

function callback(data) {
    data = JSON.parse(data.body);
    if (data.command === `LIST`) {
        const list = getTodoList();
        respond({
            messageId: data.messageId,
            status: `OK`,
            list,
        });
    } else {
        publish(data.command, data.value);
        respond({
            messageId: data.messageId,
            status: `OK`,
        });
    }
}

function respond(data) {
    stompClient.send(`/respond`, {}, JSON.stringify(data));
}

export {connect};
