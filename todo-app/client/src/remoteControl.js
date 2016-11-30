import {publish} from "./messageBus";
import {get as getTodoList} from "./todoList";

let stompClient = null;

function setConnected(connected) {
    if (connected) {
        publish(`CONNECTED`);
    } else {
        publish(`DISCONNECTED`);
    }
}

function connect() {
    var socket = new SockJS(`http://localhost:8090/todo-websocket`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
        setConnected(true);
        stompClient.subscribe(`/user/register`, callback);
    });
}

function callback(data) {
    data = JSON.parse(data.body);
    if (data.command === `LIST`) {
        const list = getTodoList();
        send({
            messageId: data.messageId,
            status: `OK`,
            list,
        });
    } else {
        publish(data.command, data.value);
        send({
            messageId: data.messageId,
            status: `OK`,
        });
    }
}

function send(data) {
    stompClient.send(`/send`, {}, JSON.stringify(data));
}

export {connect, send};
