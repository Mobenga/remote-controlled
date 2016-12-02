import React from "react";
import ReactDOM from "react-dom";
import {publish, subscribe} from "./messageBus";
import App from "./components/App";
import {connect} from "./remoteControl";

import * as todoList from "./todoList";

let isConnected = false;

render();
connect();

window.publish = publish;

subscribe((name, value) => {
    switch (name) {
        case `DELETE`: 
            todoList.deleteItem(value);
            render();
            break;
        case `TOGGLE`:
            todoList.toggleItem(value);
            render();
            break;
        case `ADD`:
            todoList.addItem(value);
            render();
            break;
        case `CONNECTED`:
            isConnected = true;
            render();
            break;
        case `DISCONNECTED`:
            isConnected = false;
            render();
            break;
        case `PING`:
            flashBackground();
            break;
        default:
            console.error(`Unknown command`, name);
            break;
    }
});


function render() {
    ReactDOM.render(<App list={todoList.get()} isConnected={isConnected}/>, document.getElementById(`root`));
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


