import {publish} from "./messageBus";

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
        stompClient.subscribe(`/register`, callback);
    });
}

function callback(data) {
    data = JSON.parse(data);
    publish(data.command, data.value);
    send({status: `OK`});
}

function send(data) {
    console.log(`/message`, {}, JSON.stringify(data));
}

export {connect, send};
