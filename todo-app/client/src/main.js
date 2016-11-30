import React from "react";
import ReactDOM from "react-dom";
import {subscribe} from "./messageBus";
import App from "./components/App";
import {connect} from "./remoteControl";

import * as todoList from "./todoList";

let isConnected = false;

render();
connect();

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
        default:
            console.error(`Unknown command`, name);
            break;
    }
});


function render() {
    ReactDOM.render(<App list={todoList.get()} isConnected={isConnected}/>, document.getElementById(`root`));
}

